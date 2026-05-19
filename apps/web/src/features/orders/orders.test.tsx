import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { DraftOrderQueue } from "@/features/orders/draft-order-queue";
import { OrderDetail } from "@/features/orders/order-detail";
import { OrderList } from "@/features/orders/order-list";
import { OrderCreate } from "@/features/orders/order-create";
import { OrderReview } from "@/features/orders/order-review";
import {
  confirmedOrderFixture,
  confirmedOrderFixtureResult,
  draftOrderFixtures,
  orderFixtures,
} from "@/features/orders/fixtures/orders";
import {
  resetOrderEntryMemoryState,
  setOrderEntryMemoryState,
} from "@/features/orders/order-entry-memory-store";
import {
  addReadyStockLine,
  createInitialOrderEntryState,
  markOrderEntryInMemory,
  updateReadyStockLineOption,
} from "@/features/orders/order-entry-state";
import { getFixtureUser } from "@/shared/fixtures/users";

const currentUser = getFixtureUser("admin-sales");

describe("Order read/create foundation", () => {
  beforeEach(() => {
    resetOrderEntryMemoryState();
  });

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

  it("adds and edits ready-stock lines in the Order Create in-memory state", () => {
    render(<OrderCreate currentUser={currentUser} />);

    expect(screen.getByText("2 รายการ / 3 ชิ้น")).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "เพิ่มสินค้าพร้อมส่ง" }),
    );

    const addedLine = within(screen.getByTestId("entry-ready-added-1"));
    expect(addedLine.getByText("โต๊ะคอนโซลแกะลายพร้อมส่ง")).toBeTruthy();
    expect(screen.getByText("3 รายการ / 4 ชิ้น")).toBeTruthy();

    fireEvent.change(addedLine.getByLabelText("สินค้า / SKU"), {
      target: { value: "ready-side-table-dark" },
    });
    fireEvent.change(addedLine.getByLabelText("จำนวน"), {
      target: { value: "3" },
    });

    expect(addedLine.getAllByText(/TBR-SID-DRK/).length).toBeGreaterThan(0);
    expect(screen.getByText(/TBR-SID-DRK \/ วอลนัทเข้ม/)).toBeTruthy();
    expect(screen.getByText("3 รายการ / 6 ชิ้น")).toBeTruthy();
    expect(
      screen.getAllByText(/จำนวนเกินที่ขายได้: ขายได้ 2 ชิ้น/).length,
    ).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText("Payment Term"), {
      target: { value: "" },
    });
    expect(screen.getAllByText("ยังไม่มี").length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText("Payment Term"), {
      target: { value: "ชำระเต็มจำนวนก่อนจัดส่ง" },
    });
    expect(screen.getAllByText("ครบ").length).toBeGreaterThan(0);
  });

  it("adds, edits, and removes custom-work lines in the Order Create in-memory state", () => {
    render(<OrderCreate currentUser={currentUser} />);

    fireEvent.click(screen.getByRole("button", { name: "เพิ่มงานสั่งทำ" }));

    const addedLine = within(screen.getByTestId("entry-custom-added-1"));
    expect(addedLine.getByText("งานสั่งทำเพิ่มใหม่ 1")).toBeTruthy();
    expect(screen.getByText("3 รายการ / 4 ชิ้น")).toBeTruthy();
    expect(screen.getByText("1 รายการยังไม่ครบ")).toBeTruthy();

    fireEvent.change(addedLine.getByLabelText("รายละเอียดงานสั่งทำ"), {
      target: { value: "เพิ่มลิ้นชักซ่อน สีโอ๊คอ่อน ขนาดตามพื้นที่จริง" },
    });
    fireEvent.change(addedLine.getByLabelText("จำนวน"), {
      target: { value: "2" },
    });

    expect(screen.queryByText("1 รายการยังไม่ครบ")).toBeNull();
    expect(screen.getByText("3 รายการ / 5 ชิ้น")).toBeTruthy();

    fireEvent.click(
      addedLine.getByRole("button", { name: "ลบรายการ งานสั่งทำเพิ่มใหม่ 1" }),
    );

    expect(screen.queryByText("งานสั่งทำเพิ่มใหม่ 1")).toBeNull();
    expect(screen.getByText("2 รายการ / 3 ชิ้น")).toBeTruthy();
  });

  it("shows current in-memory Order Create state on Review", () => {
    const withReadyLine = addReadyStockLine(createInitialOrderEntryState());
    const withSelectedSku = updateReadyStockLineOption(
      withReadyLine,
      "entry-ready-added-1",
      "ready-side-table-dark",
    );

    setOrderEntryMemoryState(markOrderEntryInMemory(withSelectedSku));

    render(<OrderReview currentUser={currentUser} />);

    expect(
      screen.getByText("ข้อมูลจากหน้าสร้างออเดอร์ในหน่วยความจำ"),
    ).toBeTruthy();
    expect(screen.getByText(/TBR-SID-DRK/)).toBeTruthy();
    expect(screen.getByText(/โต๊ะข้างไม้สักพร้อมส่ง/)).toBeTruthy();
  });

  it("labels direct Review data as fixture-backed when no in-memory edit exists", () => {
    render(<OrderReview currentUser={currentUser} />);

    expect(screen.getByText("ข้อมูลตัวอย่างจาก fixture")).toBeTruthy();
    expect(screen.getByText("ไม่ใช่การบันทึกจริง")).toBeTruthy();
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
