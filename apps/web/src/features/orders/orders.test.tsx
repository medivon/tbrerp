import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DraftOrderQueue } from "@/features/orders/draft-order-queue";
import { OrderDetail } from "@/features/orders/order-detail";
import { OrderList } from "@/features/orders/order-list";
import { OrderReview } from "@/features/orders/order-review";
import {
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

  it("does not perform real confirmation on Order Review", () => {
    render(<OrderReview currentUser={currentUser} />);

    const confirmButton = screen.getByRole("button", {
      name: "ยืนยันสร้างออเดอร์",
    });

    expect((confirmButton as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByText(/ORD-\d/)).toBeNull();
    expect(screen.getAllByText("จะสร้าง JOB-O").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ยังไม่สร้างรอบจัดส่ง").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByText(
        "ปุ่มนี้ปิดไว้ใน foundation รอบนี้ จึงยังไม่สร้างออเดอร์จริง ไม่สร้าง JOB-O ไม่จองสต๊อก และไม่สร้างรอบจัดส่ง",
      ),
    ).toBeTruthy();
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
      draftOrderFixtures,
      orderFixtures,
    });

    expect(serializedFixtures).not.toMatch(
      /ต้นทุน|กำไร|ราคาทุน|payout|profit|cost|Audit Log|Management Log/i,
    );
    expect(serializedFixtures).not.toMatch(/เลขบัญชี|สลิป|หลักฐานรับเงิน/);
  });
});
