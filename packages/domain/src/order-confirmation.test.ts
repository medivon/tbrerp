import { describe, expect, it } from "vitest";

import {
  canConfirmOrder,
  confirmOrderFromReview,
  type OrderConfirmationInput,
} from "./order-confirmation";

const validInput: OrderConfirmationInput = {
  acknowledgement: {
    stockShortageAccepted: true,
  },
  confirmedAt: "2026-05-19T09:00:00.000Z",
  confirmedBy: {
    displayName: "แอดมินฝ่ายขาย",
    roleId: "admin-sales",
  },
  customer: {
    name: "คุณมาลี ตัวอย่าง",
    primaryPhone: "080-000-0099",
    socialContact: "Facebook: Malee Sample Living",
    tier: "ลูกค้า VIP",
  },
  customWorkLines: [
    {
      customWorkDetail: {
        colorDetail: "สีโอ๊คเข้ม",
        deliveryDate: "20 มิ.ย. 67",
        materialDetail: "ไม้สัก",
        productionDetail: "ลายแกะดอกพิกุล มีไฟในตู้",
        referenceImageCount: 1,
        sizeDetail: "160 x 45 x 210 ซม.",
        workName: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
      },
      deliveryDate: "20 มิ.ย. 67",
      id: "entry-custom-cabinet",
      imageAlt: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
      imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
      lineTotalBaht: 42000,
      quantity: 1,
      title: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
    },
  ],
  fixtureIdSeed: {
    jobIdPrefix: "JOB-O-FIX-S4-",
    jobStart: 1,
    orderId: "ORD-FIX-S4-0001",
  },
  optionalPaymentRecord: {
    amountBaht: 30000,
    method: "โอนเงิน",
  },
  paymentTerm: "มัดจำ 50% ก่อนเริ่มงาน ส่วนที่เหลือก่อนจัดส่ง",
  readyStockLines: [
    {
      color: "สีธรรมชาติ",
      dimensions: "4 ที่นั่ง",
      id: "entry-ready-chair",
      imageAlt: "ชุดเก้าอี้รับแขกไม้สัก",
      imageSrc: "/sector-1-thumbnails/shipment-chair-set.png",
      lineTotalBaht: 49000,
      quantity: 2,
      sellableStockBefore: 1,
      skuCode: "TBR-CHR-SET-NAT",
      skuName: "ชุดเก้าอี้รับแขก",
      title: "ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ",
    },
  ],
  recipient: {
    address: "55/10 หมู่ 1 ต.หนองควาย อ.หางดง จ.เชียงใหม่ 50230",
    name: "คุณภพ ตัวอย่าง",
    phone: "080-000-0199",
  },
  reviewId: "review-fixture-valid",
  shipmentIntent: "ส่งพร้อมกัน",
  sourceDraftNo: "DRAFT-00035",
  warnings: [
    {
      id: "stock-entry-ready-chair",
      lineId: "entry-ready-chair",
      message: "ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ จำนวนเกินที่ขายได้",
      type: "stock-insufficient",
    },
  ],
};

describe("Order confirmation domain logic", () => {
  it("confirms valid review data into a confirmed Order read model", () => {
    const result = confirmOrderFromReview(validInput);

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.confirmedOrder.id).toBe("ORD-FIX-S4-0001");
    expect(result.confirmedOrder.customerName).toBe("คุณมาลี ตัวอย่าง");
    expect(result.confirmedOrder.orderStatus).toBe("กำลังผลิต");
    expect(result.confirmedOrder.shipmentSummary.label).toBe("ยังไม่ได้จัดส่ง");
    expect(result.convertedDraft).toEqual({
      draftNo: "DRAFT-00035",
      status: "แปลงเป็นออเดอร์แล้ว",
    });
  });

  it("creates JOB-O read models for complete custom-work lines", () => {
    const result = confirmOrderFromReview(validInput);

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.generatedJobs).toHaveLength(1);
    expect(result.generatedJobs[0]).toMatchObject({
      currentDepartment: "ช่างไม้",
      id: "JOB-O-FIX-S4-0001",
      safeProductionContextOnly: true,
      sourceLineId: "entry-custom-cabinet",
      sourceType: "Order",
      status: "รอรับงาน",
      workName: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
    });
  });

  it("blocks incomplete custom-work detail", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      customWorkLines: [
        {
          ...validInput.customWorkLines[0],
          customWorkDetail: {
            ...validInput.customWorkLines[0].customWorkDetail,
            colorDetail: "",
            productionDetail: "",
          },
        },
      ],
    });

    expect(result.status).toBe("blocked");

    if (result.status !== "blocked") {
      throw new Error("expected confirmation to block");
    }

    expect(result.blockingReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "incomplete-custom-work-detail",
          lineId: "entry-custom-cabinet",
        }),
      ]),
    );
  });

  it("produces ready-stock reservation outcome records", () => {
    const result = confirmOrderFromReview(validInput);

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.readyStockReservationOutcomes).toEqual([
      {
        lineId: "entry-ready-chair",
        lineTitle: "ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ",
        outcome: "shortage-acknowledged",
        projectedSellableAfter: -1,
        quantity: 2,
        sellableStockBefore: 1,
        skuCode: "TBR-CHR-SET-NAT",
      },
    ]);
  });

  it("allows acknowledged stock warning without manager approval or reason", () => {
    const result = confirmOrderFromReview(validInput);

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.acknowledgedWarnings).toHaveLength(1);
    expect(result.activityEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "รับทราบสต๊อกไม่พอ",
        }),
      ]),
    );
  });

  it("preserves acknowledged customer caution warnings in the fixture result", () => {
    const customerCautionWarning = {
      id: "customer-caution-malee",
      message: "ลูกค้าต้องตรวจแบบละเอียดก่อนผลิต",
      type: "customer-caution" as const,
    };
    const result = confirmOrderFromReview({
      ...validInput,
      acknowledgement: {
        customerCautionAccepted: true,
        stockShortageAccepted: true,
      },
      warnings: [...validInput.warnings, customerCautionWarning],
    });

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.acknowledgedWarnings).toEqual(
      expect.arrayContaining([customerCautionWarning]),
    );
  });

  it("blocks customer caution warning without acknowledgement", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      warnings: [
        ...validInput.warnings,
        {
          id: "customer-caution-malee",
          message: "ลูกค้าต้องตรวจแบบละเอียดก่อนผลิต",
          type: "customer-caution" as const,
        },
      ],
    });

    expect(result.status).toBe("blocked");

    if (result.status !== "blocked") {
      throw new Error("expected confirmation to block");
    }

    expect(result.blockingReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "customer-caution-acknowledgement-required",
        }),
      ]),
    );
  });

  it("blocks missing stock acknowledgement", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      acknowledgement: {},
    });

    expect(result.status).toBe("blocked");

    if (result.status !== "blocked") {
      throw new Error("expected confirmation to block");
    }

    expect(result.blockingReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "stock-acknowledgement-required",
        }),
      ]),
    );
  });

  it("blocks missing Payment Term", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      paymentTerm: "",
    });

    expect(result.status).toBe("blocked");

    if (result.status !== "blocked") {
      throw new Error("expected confirmation to block");
    }

    expect(result.blockingReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "missing-payment-term",
        }),
      ]),
    );
  });

  it("blocks missing customer, recipient, and stale review input", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      customer: null,
      recipient: null,
      stale: true,
    });

    expect(result.status).toBe("blocked");

    if (result.status !== "blocked") {
      throw new Error("expected confirmation to block");
    }

    expect(result.blockingReasons.map((reason) => reason.code)).toEqual(
      expect.arrayContaining([
        "missing-customer",
        "missing-recipient",
        "stale-review",
      ]),
    );
  });

  it("blocks base roles from confirmation", () => {
    expect(canConfirmOrder("owner")).toBe(true);
    expect(canConfirmOrder("manager")).toBe(true);
    expect(canConfirmOrder("admin-sales")).toBe(true);
    expect(canConfirmOrder("staff-base")).toBe(false);
    expect(canConfirmOrder("outsource-base")).toBe(false);

    const result = confirmOrderFromReview({
      ...validInput,
      confirmedBy: {
        displayName: "พนักงานไทยโบราณ",
        roleId: "staff-base",
      },
    });

    expect(result.status).toBe("blocked");

    if (result.status !== "blocked") {
      throw new Error("expected confirmation to block");
    }

    expect(result.blockingReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "unauthorized",
        }),
      ]),
    );
  });

  it("does not create shipment/payment/stock/database side-effect models", () => {
    const result = confirmOrderFromReview(validInput);

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.confirmedOrder.shipmentSummary.detail).toBe(
      "ยังไม่สร้างรอบจัดส่งจากการยืนยันออเดอร์",
    );
    expect("shipmentRounds" in result.confirmedOrder).toBe(false);
    expect(JSON.stringify(result)).not.toMatch(/Prisma|migration|database/i);
    expect(JSON.stringify(result)).not.toMatch(/PaymentEvidence|StockMovement/);
  });

  it("keeps sensitive cost/profit/payout/payment evidence and restricted logs out", () => {
    const result = confirmOrderFromReview(validInput);
    const serialized = JSON.stringify(result);

    expect(serialized).not.toMatch(
      /ต้นทุน|กำไร|ราคาทุน|profit|cost|payout|หลักฐานรับเงิน|payment evidence|Management Log|Audit Log/i,
    );
  });
});
