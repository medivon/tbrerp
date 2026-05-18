import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DraftOrderQueue } from "@/features/orders/draft-order-queue";
import { OrderDetail } from "@/features/orders/order-detail";
import { OrderList } from "@/features/orders/order-list";
import { OrderReview } from "@/features/orders/order-review";
import {
  confirmedOrderFixture,
  confirmedOrderFixtureResult,
  draftOrderFixtures,
  orderFixtures,
} from "@/features/orders/fixtures/orders";
import { getFixtureUser } from "@/shared/fixtures/users";

const currentUser = getFixtureUser("admin-sales");

describe("Order read/create foundation", () => {
  it("renders fixture rows in the all orders list", () => {
    render(<OrderList currentUser={currentUser} mode="all" />);

    expect(screen.getAllByText("ORD-240522-018").length).toBeGreaterThan(0);
    expect(screen.getAllByText("คุณศิริพร ตัวอย่าง").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ตู้โชว์ไม้สักแกะลาย/).length).toBeGreaterThan(
      0,
    );
  });

  it("keeps shipment status filters separate from Order status filters", () => {
    render(<OrderList currentUser={currentUser} mode="all" />);

    const orderStatusFilters = screen.getByRole("group", {
      name: "สถานะออเดอร์",
    });
    const shipmentStatusFilters = screen.getByRole("group", {
      name: "สถานะจัดส่ง",
    });

    expect(
      within(orderStatusFilters).queryByText("รอยืนยันการจัดส่ง"),
    ).toBeNull();
    expect(
      within(shipmentStatusFilters).getByText("รอยืนยันการจัดส่ง"),
    ).toBeTruthy();
  });

  it("keeps Draft Orders separate from real Order IDs", () => {
    render(<DraftOrderQueue currentUser={currentUser} />);

    expect(screen.getAllByText("DRAFT-00034").length).toBeGreaterThan(0);
    expect(screen.queryByText("เลขออเดอร์")).toBeNull();
    expect(screen.queryByText(/ORD-\d/)).toBeNull();
    expect(draftOrderFixtures.every((draft) => !("orderId" in draft))).toBe(
      true,
    );
  });

  it("enables Review confirmation only after required acknowledgement and shows fixture result", () => {
    render(<OrderReview currentUser={currentUser} />);

    const confirmButton = screen.getByRole("button", {
      name: "ยืนยันสร้างออเดอร์",
    });

    expect((confirmButton as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByText("ORD-FIX-S4-0001")).toBeNull();
    expect(screen.getAllByText("จะสร้าง JOB-O").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ยังไม่สร้างรอบจัดส่ง").length).toBeGreaterThan(
      0,
    );

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /รับทราบคำเตือนสต๊อกไม่พอ/,
      }),
    );

    expect((confirmButton as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(confirmButton);

    expect(screen.getByText("ORD-FIX-S4-0001")).toBeTruthy();
    expect(screen.getByText("JOB-O-FIX-S4-0001")).toBeTruthy();
    expect(screen.getByText(/คาดขายได้หลังจอง -1 ชิ้น/)).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /เปิด Order Detail/ })
        .getAttribute("href"),
    ).toBe("/modules/orders/ORD-FIX-S4-0001?user=admin-sales");
  });

  it("keeps Order Review as the final confirmation surface with no second modal", () => {
    render(<OrderReview currentUser={currentUser} />);

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /รับทราบคำเตือนสต๊อกไม่พอ/,
      }),
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "ยืนยันสร้างออเดอร์",
      }),
    );

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText(/สร้างออเดอร์สำเร็จใน fixture/)).toBeTruthy();
  });

  it("shows blocked Review fixture reasons inline", () => {
    render(
      <OrderReview
        currentUser={currentUser}
        scenarioId="missing-payment-term"
      />,
    );

    expect(
      screen.getByText("ต้องระบุเงื่อนไขการชำระเงินก่อนยืนยันออเดอร์"),
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /รับทราบคำเตือนสต๊อกไม่พอ/,
      }),
    );

    expect(
      (
        screen.getByRole("button", {
          name: "ยืนยันสร้างออเดอร์",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });

  it("renders incomplete custom-work Review data as incomplete", () => {
    render(
      <OrderReview
        currentUser={currentUser}
        scenarioId="incomplete-custom-detail"
      />,
    );

    expect(
      screen.getByText(
        "ตู้โชว์ไม้สักแกะลายสั่งทำ: รายละเอียดงานสั่งทำยังไม่ครบ (รายละเอียดผลิต, ขนาด)",
      ),
    ).toBeTruthy();
    expect(
      screen.getAllByText("รายละเอียดงานสั่งทำยังไม่ครบ").length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText(/ลายแกะดอกพิกุล มีไฟในตู้/)).toBeNull();

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /รับทราบคำเตือนสต๊อกไม่พอ/,
      }),
    );

    expect(
      (
        screen.getByRole("button", {
          name: "ยืนยันสร้างออเดอร์",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });

  it("separates Order status from Shipment status on Order Detail", () => {
    render(<OrderDetail currentUser={currentUser} orderId="ORD-240602-009" />);

    const orderStatusBlock = screen.getByText("สถานะออเดอร์").parentElement;
    const shipmentStatusBlock = screen.getByText("สถานะจัดส่ง").parentElement;

    expect(orderStatusBlock).not.toBeNull();
    expect(shipmentStatusBlock).not.toBeNull();
    expect(
      within(orderStatusBlock as HTMLElement).getByText("กำลังดำเนินการ"),
    ).toBeTruthy();
    expect(
      within(shipmentStatusBlock as HTMLElement).getByText("รอยืนยันการจัดส่ง"),
    ).toBeTruthy();
    expect(
      within(orderStatusBlock as HTMLElement).queryByText("รอยืนยันการจัดส่ง"),
    ).toBeNull();
  });

  it("keeps sensitive finance/cost/payout data out of general Order fixtures", () => {
    const serializedFixtures = JSON.stringify({
      confirmedOrderFixture,
      confirmedOrderFixtureResult,
      draftOrderFixtures,
      orderFixtures,
    });

    expect(serializedFixtures).not.toMatch(
      /ต้นทุน|กำไร|ราคาทุน|payout|profit|cost|Audit Log|Management Log/i,
    );
    expect(serializedFixtures).not.toMatch(/เลขบัญชี|สลิป|หลักฐานรับเงิน/);
  });
});
