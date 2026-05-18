import { describe, expect, it } from "vitest";

import {
  criticalPreviewItems,
  dashboardCards,
} from "@/shared/fixtures/admin-dashboard";

describe("admin dashboard fixtures", () => {
  it("renders exactly the six approved dashboard card titles", () => {
    expect(dashboardCards.map((card) => card.title)).toEqual([
      "ออเดอร์ที่ต้องติดตาม",
      "งานกำลังผลิต",
      "รอสร้างรอบจัดส่ง",
      "ยืนยันการจัดส่ง",
      "งานผลิตต้องติดตาม",
      "ติดตาม COD / Payment",
    ]);
  });

  it("keeps sensitive values out of read-only dashboard fixtures", () => {
    const serializedFixtures = JSON.stringify({
      criticalPreviewItems,
      dashboardCards,
    });

    expect(serializedFixtures).not.toMatch(/บาท|฿|cost|profit|payout/i);
    expect(serializedFixtures).not.toMatch(/Owner|Current Handler|Audit Log/i);
    expect(serializedFixtures).not.toMatch(/เลขบัญชี|สลิป|หลักฐานรับเงิน/);
  });

  it("keeps the critical preview to three visible fixture items", () => {
    expect(criticalPreviewItems).toHaveLength(3);
  });
});
