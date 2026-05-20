import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
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
import { ShipmentDetail } from "@/features/shipments/shipment-detail";
import { ReadyToShipQueue } from "@/features/shipments/ready-to-ship-queue";
import { ShipmentBuilder } from "@/features/shipments/shipment-builder";
import { getFixtureUser } from "@/shared/fixtures/users";

const adminUser = getFixtureUser("admin-sales");
const deliveryUser = getFixtureUser("delivery-team");
const woodworkUser = getFixtureUser("woodwork");
const forbiddenStaffCopy =
  /fixture|local state|local fixture|placeholder|Foundation|print backend|persistence|sector|optional|Delivery Team|Admin|ตัวอย่าง|SAMPLE|mock|database|in-memory|future|not implemented|ยังไม่เชื่อม|ฐานข้อมูล|Shipment Builder แสดง|COD read-only|บันทึกเป็นร่าง/i;

describe("Shipment / Delivery foundation", () => {
  it("renders the ready-to-ship queue as Order-grouped work and opens builder actions", () => {
    render(<ReadyToShipQueue currentUser={adminUser} />);

    expect(
      screen.getByRole("heading", { name: "รอสร้างรอบจัดส่ง" }),
    ).toBeTruthy();
    expect(screen.getAllByText("ORD-240528-014").length).toBeGreaterThan(0);
    expect(screen.getAllByText("สินค้าพร้อมส่ง").length).toBeGreaterThan(0);
    expect(screen.getAllByText("สร้างรอบจัดส่ง").length).toBeGreaterThan(0);
    expect(screen.queryByText("รอบจัดส่งพิเศษ")).toBeNull();
    expect(screen.queryByText("ไม่กระทบสต๊อก")).toBeNull();
  });

  it("visibly filters ready-to-ship queue by search and chips", () => {
    render(<ReadyToShipQueue currentUser={adminUser} />);

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "ค้นหาลูกค้า ผู้รับ เบอร์ เลขออเดอร์ หรือ Job",
      }),
      { target: { value: "แพรว" } },
    );

    expect(screen.getAllByText("SVC-240608-003").length).toBeGreaterThan(0);
    expect(screen.queryByText("ORD-240528-014")).toBeNull();

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "ค้นหาลูกค้า ผู้รับ เบอร์ เลขออเดอร์ หรือ Job",
      }),
      { target: { value: "" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "งานบริการ" }));

    expect(screen.getAllByText("SVC-240608-003").length).toBeGreaterThan(0);
    expect(screen.queryByText("ORD-240528-014")).toBeNull();
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
    expect(screen.getByText("COD อ่านอย่างเดียว")).toBeTruthy();
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
    expect(screen.queryByText("SHP-240609-004")).toBeNull();
  });

  it("shows responsible COD on Shipment Detail from the shipment fixture itself", () => {
    render(
      <ShipmentDetail currentUser={deliveryUser} shipmentId="SHP-240604-007" />,
    );

    expect(screen.getByText("COD 12,500 บาท")).toBeTruthy();
  });

  it("blocks Delivery Team detail and print access for unrelated shipments", () => {
    const { unmount } = render(
      <ShipmentDetail currentUser={deliveryUser} shipmentId="SHP-240609-004" />,
    );

    expect(screen.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeTruthy();

    unmount();
    render(
      <ShippingSheetPreview
        currentUser={deliveryUser}
        shipmentId="SHP-240609-004"
      />,
    );

    expect(screen.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeTruthy();
    expect(screen.queryByText(/9,500 บาท/)).toBeNull();
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

  it("updates delivery evidence and note locally without requiring proof before send-out", () => {
    render(<DeliveryDashboard currentUser={deliveryUser} />);

    const firstCard = screen.getByText("SHP-240606-001").closest("article");
    expect(firstCard).not.toBeNull();

    fireEvent.click(
      within(firstCard as HTMLElement).getByRole("button", {
        name: "เพิ่มรูปหลักฐานจัดส่ง (ถ้ามี)",
      }),
    );
    expect(
      within(firstCard as HTMLElement).getByText("รูปหลักฐานจัดส่ง 1 รูป"),
    ).toBeTruthy();

    fireEvent.click(
      within(firstCard as HTMLElement).getByRole("button", {
        name: "เพิ่มหมายเหตุ",
      }),
    );
    expect(
      within(firstCard as HTMLElement).getByText(
        /ฝ่ายจัดส่งบันทึกหมายเหตุแล้ว/,
      ),
    ).toBeTruthy();
  });

  it("filters admin confirmation queue by search and active chips", () => {
    render(<AdminShipmentConfirmationQueue currentUser={adminUser} />);

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "ค้นหาเลขรอบจัดส่ง Order ผู้รับ หรือ Tracking",
      }),
      { target: { value: "กานต์" } },
    );

    expect(screen.getAllByText("SHP-240604-008").length).toBeGreaterThan(0);
    expect(screen.queryByText("SHP-240603-002")).toBeNull();

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "ค้นหาเลขรอบจัดส่ง Order ผู้รับ หรือ Tracking",
      }),
      { target: { value: "" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "COD" }));

    expect(screen.getAllByText("SHP-240604-007").length).toBeGreaterThan(0);
    expect(screen.queryByText("SHP-240603-002")).toBeNull();
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
    expect(screen.getByText(/ปิดรอบจัดส่งแล้ว/)).toBeTruthy();
  });

  it("returns admin confirmation status to evidence missing when Tracking is cleared", () => {
    render(<AdminShipmentConfirmationQueue currentUser={adminUser} />);

    fireEvent.change(screen.getByLabelText("Tracking"), {
      target: { value: "TH-TEST-0001" },
    });
    fireEvent.change(screen.getByLabelText("Tracking"), {
      target: { value: "" },
    });

    expect(screen.getAllByText("หลักฐานไม่ครบ").length).toBeGreaterThan(0);
    expect(
      (
        screen.getByRole("button", {
          name: "ยืนยันและปิดรอบจัดส่ง",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
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
    expect(screen.queryByText("ไม่แสดง")).toBeNull();
    expect(screen.queryByText("ไม่มี COD ที่มองเห็นได้")).toBeNull();
  });

  it("enables print only for released document previews", () => {
    const { unmount } = render(
      <DeliveryNotePreview
        currentUser={adminUser}
        shipmentId="SHP-240606-001"
      />,
    );

    expect(
      (
        screen.getByRole("button", {
          name: "พิมพ์ใบส่งของ",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(false);

    unmount();
    render(
      <DeliveryNotePreview
        currentUser={adminUser}
        shipmentId="BUILD-ORD-240522-018"
      />,
    );

    const printButton = screen.getByRole("button", {
      name: "พิมพ์ใบส่งของ",
    }) as HTMLButtonElement;
    expect(printButton.disabled).toBe(true);
    expect(printButton.title).toBe("พิมพ์ได้หลังปล่อยให้ฝ่ายจัดส่งแล้ว");
  });

  it("keeps rendered Sector 6 screens free of implementation copy", () => {
    const screens = [
      <ReadyToShipQueue currentUser={adminUser} key="ready" />,
      <ShipmentBuilder
        currentUser={adminUser}
        key="builder"
        orderId="ORD-240522-018"
      />,
      <DeliveryDashboard
        currentUser={deliveryUser}
        initialTab="today"
        key="delivery"
      />,
      <AdminShipmentConfirmationQueue
        currentUser={adminUser}
        key="confirmation"
      />,
      <ShipmentDetail
        currentUser={deliveryUser}
        key="detail"
        shipmentId="SHP-240604-007"
      />,
      <DeliveryNotePreview
        currentUser={adminUser}
        key="delivery-note"
        shipmentId="SHP-240606-001"
      />,
      <ShippingSheetPreview
        currentUser={deliveryUser}
        key="shipping-sheet"
        shipmentId="SHP-240606-001"
      />,
    ];

    for (const ui of screens) {
      const { container } = render(ui);
      expect(collectVisibleAndAccessibleCopy(container)).not.toMatch(
        forbiddenStaffCopy,
      );
      cleanup();
    }
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

function collectVisibleAndAccessibleCopy(container: HTMLElement): string {
  const parts = [container.textContent ?? ""];

  container.querySelectorAll("*").forEach((element) => {
    for (const attribute of [
      "aria-label",
      "alt",
      "placeholder",
      "title",
      "value",
    ]) {
      const value = element.getAttribute(attribute);

      if (value) {
        parts.push(value);
      }
    }
  });

  return parts.join("\n");
}
