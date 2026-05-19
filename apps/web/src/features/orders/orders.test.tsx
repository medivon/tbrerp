import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { DraftOrderQueue } from "@/features/orders/draft-order-queue";
import { OrderDetail } from "@/features/orders/order-detail";
import { OrderLineEdit } from "@/features/orders/order-line-edit";
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
  addReadyStockLineFromSelection,
  createInitialOrderEntryState,
  markOrderEntryInMemory,
} from "@/features/orders/order-entry-state";
import { getFixtureUser } from "@/shared/fixtures/users";

const currentUser = getFixtureUser("admin-sales");

function fillCustomWorkDialog(dialog: HTMLElement) {
  fireEvent.change(within(dialog).getByLabelText("ชื่องาน / รายการ"), {
    target: { value: "ตู้เตี้ยไม้สักสั่งทำ" },
  });
  fireEvent.change(within(dialog).getByLabelText("จำนวน"), {
    target: { value: "2" },
  });
  fireEvent.change(within(dialog).getByLabelText("ขนาด / หมายเหตุขนาด"), {
    target: { value: "180 x 45 x 90 ซม." },
  });
  fireEvent.change(within(dialog).getByLabelText("กำหนดส่งที่คุยไว้"), {
    target: { value: "30 มิ.ย. 67" },
  });
  fireEvent.change(within(dialog).getByLabelText("สี / งานตกแต่งหลัก"), {
    target: { value: "โอ๊คอ่อน เคลือบด้าน" },
  });
  fireEvent.change(within(dialog).getByLabelText("รายละเอียดช่างไม้"), {
    target: { value: "ทำโครงตู้เตี้ย บานเลื่อน และชั้นวางสองระดับ" },
  });
  fireEvent.change(within(dialog).getByLabelText("รายละเอียดฝ่ายสี/ตกแต่ง"), {
    target: { value: "ทำสีโอ๊คอ่อน เคลือบด้าน ให้เห็นลายไม้" },
  });
  fireEvent.change(within(dialog).getByLabelText("รายละเอียดรักสมุก"), {
    target: { value: "ไม่มีงานรักสมุกสำหรับรายการนี้" },
  });
  fireEvent.change(within(dialog).getByLabelText("รูปอ้างอิง"), {
    target: { value: "ใช้ภาพตู้เตี้ย fixture เป็น reference" },
  });
}

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

  it("filters the Order list by local search and clears filters", () => {
    render(<OrderList currentUser={currentUser} mode="all" />);

    fireEvent.change(screen.getByLabelText("ค้นหาออเดอร์"), {
      target: { value: "อรุณ" },
    });

    expect(screen.getAllByText("ORD-240602-009").length).toBeGreaterThan(0);
    expect(screen.queryByText("ORD-240522-018")).toBeNull();
    expect(screen.getByText("1 จาก 6 รายการ")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "ล้างตัวกรอง" }));

    expect(screen.getAllByText("ORD-240522-018").length).toBeGreaterThan(0);
    expect(screen.getByText("6 จาก 6 รายการ")).toBeTruthy();
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

    fireEvent.click(
      within(orderStatusFilters).getByRole("button", { name: "กำลังผลิต" }),
    );

    expect(screen.getAllByText("ORD-240522-018").length).toBeGreaterThan(0);
    expect(screen.queryByText("ORD-240602-009")).toBeNull();

    fireEvent.click(
      within(orderStatusFilters).getByRole("button", { name: "ทั้งหมด" }),
    );
    fireEvent.click(
      within(shipmentStatusFilters).getByRole("button", {
        name: "รอยืนยันการจัดส่ง",
      }),
    );

    expect(screen.getAllByText("ORD-240602-009").length).toBeGreaterThan(0);
    expect(screen.queryByText("ORD-240522-018")).toBeNull();
  });

  it("shows local pagination controls with disabled boundaries", () => {
    render(<OrderList currentUser={currentUser} mode="all" />);

    const previousButton = screen.getByRole("button", { name: "ก่อนหน้า" });
    const nextButton = screen.getByRole("button", { name: "ถัดไป" });

    expect((previousButton as HTMLButtonElement).disabled).toBe(true);
    expect((nextButton as HTMLButtonElement).disabled).toBe(true);

    fireEvent.change(screen.getByLabelText(/ต่อหน้า/), {
      target: { value: "50" },
    });

    expect(screen.getByText("1 / 1")).toBeTruthy();
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

  it("filters Draft Orders with local search and clears filters", () => {
    render(<DraftOrderQueue currentUser={currentUser} />);

    fireEvent.change(screen.getByLabelText("ค้นหาร่างออเดอร์"), {
      target: { value: "ปริญญา" },
    });

    expect(screen.getAllByText("DRAFT-00035").length).toBeGreaterThan(0);
    expect(screen.queryByText("DRAFT-00034")).toBeNull();
    expect(screen.queryByText(/ORD-\d/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "ล้างตัวกรอง" }));

    expect(screen.getAllByText("DRAFT-00034").length).toBeGreaterThan(0);
    expect(screen.queryByText(/ORD-\d/)).toBeNull();
  });

  it("opens customer selection modal and updates Order Create state", () => {
    render(<OrderCreate currentUser={currentUser} />);

    fireEvent.click(screen.getByRole("button", { name: "เลือกลูกค้า" }));

    const dialog = screen.getByRole("dialog", { name: "เลือกลูกค้า" });
    expect(within(dialog).getByLabelText("ค้นหาลูกค้า")).toBeTruthy();

    fireEvent.change(within(dialog).getByLabelText("ค้นหาลูกค้า"), {
      target: { value: "ปริญญา" },
    });
    fireEvent.click(
      within(dialog).getByRole("option", {
        name: /คุณปริญญา ตัวอย่าง/,
      }),
    );

    expect(screen.queryByRole("dialog", { name: "เลือกลูกค้า" })).toBeNull();
    expect(
      screen.getAllByDisplayValue("คุณปริญญา ตัวอย่าง").length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("คุณปริญญา ตัวอย่าง").length).toBeGreaterThan(0);
    expect(
      screen.queryByRole("button", { name: "เพิ่มลูกค้าในออเดอร์" }),
    ).toBeNull();
  });

  it("opens product search modal and adds ready-stock lines from SKU selection", () => {
    render(<OrderCreate currentUser={currentUser} />);

    expect(screen.getByText("2 รายการ / 3 ชิ้น")).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "เพิ่มสินค้าพร้อมส่ง" }),
    );

    const dialog = screen.getByRole("dialog", {
      name: "เลือกสินค้าพร้อมส่ง",
    });
    expect(within(dialog).getByLabelText("ค้นหาสินค้าพร้อมส่ง")).toBeTruthy();
    expect(within(dialog).getByText("ขายได้ 2 ชิ้น")).toBeTruthy();
    expect(within(dialog).getByText("หมด")).toBeTruthy();
    expect(
      within(dialog).queryByText(/จำนวน โต๊ะข้างไม้สักพร้อมส่ง/),
    ).toBeNull();
    expect(
      within(dialog).getByLabelText(/จำนวน โต๊ะข้างไม้สักพร้อมส่ง TBR-SID-DRK/),
    ).toBeTruthy();

    fireEvent.change(
      within(dialog).getByLabelText(/จำนวน โต๊ะข้างไม้สักพร้อมส่ง TBR-SID-DRK/),
      {
        target: { value: "3" },
      },
    );
    fireEvent.click(
      within(dialog).getByRole("button", {
        name: /เพิ่มรายการ โต๊ะข้างไม้สักพร้อมส่ง TBR-SID-DRK/,
      }),
    );

    const addedLine = within(screen.getByTestId("entry-ready-added-1"));
    expect(addedLine.getByText("โต๊ะข้างไม้สักพร้อมส่ง")).toBeTruthy();
    expect(
      screen.queryByRole("dialog", { name: "เลือกสินค้าพร้อมส่ง" }),
    ).toBeNull();
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

    fireEvent.click(
      addedLine.getByRole("button", {
        name: "ลบรายการ โต๊ะข้างไม้สักพร้อมส่ง",
      }),
    );

    expect(screen.queryByText("โต๊ะข้างไม้สักพร้อมส่ง")).toBeNull();
    expect(screen.getByText("2 รายการ / 3 ชิ้น")).toBeTruthy();
  });

  it("opens structured custom-work entry and keeps incomplete details visibly blocked", () => {
    render(<OrderCreate currentUser={currentUser} />);

    fireEvent.click(screen.getByRole("button", { name: "เพิ่มงานสั่งทำ" }));

    const dialog = screen.getByRole("dialog", {
      name: "รายละเอียดงานสั่งทำ",
    });
    expect(within(dialog).getByLabelText("ชื่องาน / รายการ")).toBeTruthy();
    expect(within(dialog).getByLabelText("รายละเอียดช่างไม้")).toBeTruthy();
    expect(
      within(dialog).getByLabelText("รายละเอียดฝ่ายสี/ตกแต่ง"),
    ).toBeTruthy();
    expect(within(dialog).getByLabelText("รายละเอียดรักสมุก")).toBeTruthy();
    expect(within(dialog).getByLabelText("รูปอ้างอิง")).toBeTruthy();
    expect(within(dialog).getByText("รูปอ้างอิงงานสั่งทำ")).toBeTruthy();
    expect(within(dialog).getByText("รูปหลัก")).toBeTruthy();
    expect(within(dialog).getByText("รูปสำหรับช่างไม้")).toBeTruthy();
    expect(within(dialog).getByText("รูปสำหรับฝ่ายสี/ตกแต่ง")).toBeTruthy();
    expect(within(dialog).getByText("รูปสำหรับรักสมุก")).toBeTruthy();
    expect(
      within(dialog).getByRole("button", {
        name: "เพิ่มรูปอ้างอิง รูปหลัก",
      }),
    ).toBeTruthy();
    expect(
      within(dialog).getByText(/ยังไม่มีการ upload หรือบันทึกรูปจริง/),
    ).toBeTruthy();

    fireEvent.click(
      within(dialog).getByRole("button", {
        name: "เพิ่มรูปอ้างอิง รูปหลัก",
      }),
    );
    expect(within(dialog).getByText("เพิ่มแล้วใน modal นี้")).toBeTruthy();
    expect(within(dialog).getByLabelText("รูปอ้างอิง")).toHaveProperty(
      "value",
      expect.stringContaining("รูปหลัก"),
    );

    fireEvent.change(within(dialog).getByLabelText("ชื่องาน / รายการ"), {
      target: { value: "ตู้เตี้ยไม้สักสั่งทำ" },
    });
    fireEvent.click(
      within(dialog).getByRole("button", { name: "เพิ่มรายการสั่งทำ" }),
    );

    const addedLine = within(screen.getByTestId("entry-custom-added-1"));
    expect(addedLine.getByText("ตู้เตี้ยไม้สักสั่งทำ")).toBeTruthy();
    expect(screen.getByText("3 รายการ / 4 ชิ้น")).toBeTruthy();
    expect(screen.getByText("1 รายการยังไม่ครบ")).toBeTruthy();
    expect(screen.getAllByText(/ยังไป Review ไม่ได้/).length).toBeGreaterThan(
      0,
    );
    expect(
      screen
        .getAllByRole("button", { name: "ตรวจสอบก่อนสร้างออเดอร์" })
        .some((button) => (button as HTMLButtonElement).disabled),
    ).toBe(true);
  });

  it("adds complete custom-work detail, edits quantity, and removes the line", () => {
    render(<OrderCreate currentUser={currentUser} />);

    fireEvent.click(screen.getByRole("button", { name: "เพิ่มงานสั่งทำ" }));

    const dialog = screen.getByRole("dialog", {
      name: "รายละเอียดงานสั่งทำ",
    });

    fillCustomWorkDialog(dialog);
    fireEvent.click(
      within(dialog).getByRole("button", { name: "เพิ่มรายการสั่งทำ" }),
    );

    const addedLine = within(screen.getByTestId("entry-custom-added-1"));
    expect(addedLine.getByText("ตู้เตี้ยไม้สักสั่งทำ")).toBeTruthy();
    expect(screen.getByText("3 รายการ / 5 ชิ้น")).toBeTruthy();
    expect(screen.queryByText("1 รายการยังไม่ครบ")).toBeNull();

    fireEvent.change(addedLine.getByLabelText("จำนวน"), {
      target: { value: "3" },
    });

    expect(screen.getByText("3 รายการ / 6 ชิ้น")).toBeTruthy();

    fireEvent.click(
      addedLine.getByRole("button", { name: "ลบรายการ ตู้เตี้ยไม้สักสั่งทำ" }),
    );

    expect(screen.queryByText("ตู้เตี้ยไม้สักสั่งทำ")).toBeNull();
    expect(screen.getByText("2 รายการ / 3 ชิ้น")).toBeTruthy();
  });

  it("shows current in-memory Order Create state on Review", () => {
    const withSelectedSku = addReadyStockLineFromSelection(
      createInitialOrderEntryState(),
      {
        optionId: "ready-side-table-dark",
        quantity: 3,
      },
    );

    setOrderEntryMemoryState(markOrderEntryInMemory(withSelectedSku));

    render(<OrderReview currentUser={currentUser} />);

    expect(
      screen.getByText("ข้อมูลจากหน้าสร้างออเดอร์ในหน่วยความจำ"),
    ).toBeTruthy();
    expect(screen.getAllByText(/TBR-SID-DRK/).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/โต๊ะข้างไม้สักพร้อมส่ง/).length,
    ).toBeGreaterThan(0);
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
      screen.getAllByText(/รายละเอียดงานสั่งทำยังไม่ครบ/).length,
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

  it("updates Order Detail shipment selection locally before opening builder", () => {
    render(<OrderDetail currentUser={currentUser} orderId="ORD-240528-014" />);

    expect(screen.getByText(/เลือก 1 รายการพร้อมส่ง/)).toBeTruthy();
    expect(screen.getByText("เลือกแล้ว")).toBeTruthy();

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ/,
      }),
    );

    expect(screen.getByText(/เลือก 0 รายการพร้อมส่ง/)).toBeTruthy();
    expect(screen.getByText("เลือกได้")).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: "สร้างรอบจัดส่งจากรายการที่เลือก",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });

  it("shows visible reasons for disabled future-sector Order actions", () => {
    render(
      <OrderLineEdit currentUser={currentUser} orderId="ORD-240522-018" />,
    );

    expect(
      screen.getByText(
        "ปุ่มนี้เป็น foundation เท่านั้น ยังไม่บันทึกการแก้ไขจริง",
      ),
    ).toBeTruthy();
    expect(
      screen.getAllByText(
        "เพิ่มรายการหลังยืนยันจะทำใน Sector ถัดไปผ่าน Review Changes",
      ).length,
    ).toBeGreaterThan(0);
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
