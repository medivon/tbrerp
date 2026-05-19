import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DeliveryNotePreview } from "@/features/print-preview/delivery-note-preview";
import { ShippingSheetPreview } from "@/features/print-preview/shipping-sheet-preview";
import { AdminShipmentConfirmationQueue } from "@/features/shipments/admin-confirmation-queue";
import { DeliveryDashboard } from "@/features/shipments/delivery-dashboard";
import {
  readyToShipOrders,
  releasedDeliveryShipments,
  sentOutConfirmationShipments,
} from "@/features/shipments/fixtures/shipments";
import { ReadyToShipQueue } from "@/features/shipments/ready-to-ship-queue";
import { ShipmentBuilder } from "@/features/shipments/shipment-builder";
import { getFixtureUser } from "@/shared/fixtures/users";

const adminUser = getFixtureUser("admin-sales");
const deliveryUser = getFixtureUser("delivery-team");
const woodworkUser = getFixtureUser("woodwork");

describe("Shipment / Delivery foundation", () => {
  it("renders the ready-to-ship queue as Order-grouped work and opens builder actions", () => {
    render(<ReadyToShipQueue currentUser={adminUser} />);

    expect(
      screen.getByRole("heading", { name: "รอสร้างรอบจัดส่ง" }),
    ).toBeTruthy();
    expect(screen.getAllByText("ORD-240528-014").length).toBeGreaterThan(0);
    expect(screen.getAllByText("สินค้าพร้อมส่ง").length).toBeGreaterThan(0);
    expect(screen.getAllByText("สร้างรอบจัดส่ง").length).toBeGreaterThan(0);
  });

  it("has no Draft Shipment action in Shipment Builder", () => {
    render(
      <ShipmentBuilder currentUser={adminUser} orderId="ORD-240522-018" />,
    );

    expect(screen.queryByText("บันทึกเป็นร่าง")).toBeNull();
    expect(
      screen.queryByText(/Draft Shipment|saved shipment draft/i),
    ).toBeNull();
  });

  it("keeps COD read-only and disabled with reason on non-final round", () => {
    render(
      <ShipmentBuilder currentUser={adminUser} orderId="ORD-240522-018" />,
    );

    expect(screen.getByText("เปิด COD ได้เฉพาะรอบสุดท้าย")).toBeTruthy();
    expect(screen.getByText("COD read-only")).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: /COD/i })).toBeNull();
    expect(
      screen.queryByRole("button", { name: /แก้.*COD|ปิด.*COD/ }),
    ).toBeNull();
  });

  it("shows stock-negative acknowledgement before release without reason or manager approval", () => {
    render(
      <ShipmentBuilder currentUser={adminUser} orderId="ORD-240522-018" />,
    );

    fireEvent.click(screen.getByRole("button", { name: "พร้อมจัดส่ง" }));

    expect(
      screen.getByRole("dialog", { name: "รับทราบสต๊อกติดลบ" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", {
        name: "รับทราบและสร้างรอบจัดส่งต่อ",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "กลับไปตรวจสต๊อก" }),
    ).toBeTruthy();
    expect(screen.queryByLabelText(/เหตุผล/)).toBeNull();
    expect(screen.queryByText(/Manager|ผู้จัดการอนุมัติ/)).toBeNull();
  });

  it("Delivery Team sees COD only for responsible shipments", () => {
    const { unmount } = render(
      <DeliveryDashboard currentUser={deliveryUser} initialTab="today" />,
    );

    expect(screen.getByText("COD 18,000 บาท")).toBeTruthy();

    unmount();
    render(
      <DeliveryDashboard currentUser={deliveryUser} initialTab="waiting" />,
    );

    expect(screen.queryByText("COD 9,500 บาท")).toBeNull();
  });

  it("Delivery Team cannot close Shipment, add Tracking, or close COD/payment follow-up", () => {
    render(<DeliveryDashboard currentUser={deliveryUser} />);

    expect(
      screen.queryByRole("button", { name: "ยืนยันและปิดรอบจัดส่ง" }),
    ).toBeNull();
    expect(screen.queryByLabelText("Tracking")).toBeNull();
    expect(
      screen.queryByText(/ปิด.*COD|ปิด.*Payment|ปิดติดตามการเงิน/),
    ).toBeNull();
  });

  it("moves sent-out shipment from active today list into sent-out history", () => {
    render(<DeliveryDashboard currentUser={deliveryUser} />);

    expect(screen.getByText("SHP-240606-001")).toBeTruthy();

    const firstCard = screen.getByText("SHP-240606-001").closest("article");
    expect(firstCard).not.toBeNull();
    fireEvent.click(
      within(firstCard as HTMLElement).getByRole("button", {
        name: "ส่งออกแล้ว",
      }),
    );
    const dialog = screen.getByRole("dialog", { name: "ส่งออกแล้ว" });
    fireEvent.click(
      within(dialog).getByRole("button", {
        name: "ส่งออกแล้ว",
      }),
    );

    expect(screen.getByText(/ส่งออกแล้ว 1 รอบ/)).toBeTruthy();
    expect(screen.getByText("SHP-240606-001")).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "รายการต้องจัดส่งวันนี้" }),
    );
    expect(screen.queryByText("SHP-240606-001")).toBeNull();
  });

  it("blocks admin close without tracking/evidence and allows close after tracking exists", () => {
    render(<AdminShipmentConfirmationQueue currentUser={adminUser} />);

    expect(
      screen.getByText(
        "กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง",
      ),
    ).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: "ยืนยันและปิดรอบจัดส่ง",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);

    fireEvent.change(screen.getByLabelText("Tracking"), {
      target: { value: "TH-TEST-0001" },
    });

    const closeButton = screen.getByRole("button", {
      name: "ยืนยันและปิดรอบจัดส่ง",
    }) as HTMLButtonElement;
    expect(closeButton.disabled).toBe(false);
    fireEvent.click(closeButton);
    expect(
      screen.getByText(/ปิดรอบจัดส่งใน local fixture เท่านั้น/),
    ).toBeTruthy();
  });

  it("allows admin close when evidence photo exists", () => {
    render(<AdminShipmentConfirmationQueue currentUser={adminUser} />);

    fireEvent.click(screen.getByRole("button", { name: "เพิ่มรูป" }));

    const closeButton = screen.getByRole("button", {
      name: "ยืนยันและปิดรอบจัดส่ง",
    }) as HTMLButtonElement;
    expect(closeButton.disabled).toBe(false);
  });

  it("keeps Delivery Note free of COD", () => {
    render(
      <DeliveryNotePreview
        currentUser={adminUser}
        shipmentId="SHP-240606-001"
      />,
    );

    const preview = screen.getByText(
      /เอกสารนี้ใช้ตรวจรายการสินค้าเท่านั้น/,
    ).parentElement;
    expect(preview?.textContent).not.toMatch(/COD|18,000|บาท/);
    expect(screen.queryByText(/COD/)).toBeNull();
  });

  it("shows Shipping Sheet COD only where allowed", () => {
    const { unmount } = render(
      <ShippingSheetPreview
        currentUser={deliveryUser}
        shipmentId="SHP-240606-001"
      />,
    );

    expect(screen.getAllByText(/18,000 บาท/).length).toBeGreaterThan(0);

    unmount();
    render(
      <ShippingSheetPreview
        currentUser={woodworkUser}
        shipmentId="SHP-240606-001"
      />,
    );

    expect(screen.queryByText(/18,000 บาท/)).toBeNull();
  });

  it("keeps sensitive cost, profit, payout, payment evidence, Management Log, and Audit Log out of fixtures", () => {
    const serializedFixtures = JSON.stringify({
      readyToShipOrders,
      releasedDeliveryShipments,
      sentOutConfirmationShipments,
    });

    expect(serializedFixtures).not.toMatch(
      /ต้นทุน|กำไร|ราคาทุน|payout|profit|cost|Management Log|Audit Log/i,
    );
    expect(serializedFixtures).not.toMatch(/หลักฐานรับเงิน|สลิป|เลขบัญชี/);
  });
});
