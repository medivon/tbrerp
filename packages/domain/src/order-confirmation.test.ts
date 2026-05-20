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
    name: "คุณมาลี จันทร์หอม",
    primaryPhone: "080-000-0099",
    socialContact: "Facebook: Malee Living",
    tier: "ลูกค้า VIP",
  },
  customWorkLines: [
    {
      customWorkDetail: {
        colorDetail: "สีโอ๊คเข้ม",
        coloringDetail: "ทำสีโอ๊คเข้ม เคลือบด้าน เน้นให้เห็นลายไม้",
        deliveryDate: "20 มิ.ย. 67",
        materialDetail: "ไม้สัก",
        productionDetail: "ลายแกะดอกพิกุล มีไฟในตู้",
        rakSamukDetail: "ไม่มีงานรักสมุกในรายการนี้",
        referenceImageCount: 1,
        sizeDetail: "160 x 45 x 210 ซม.",
        woodworkDetail: "โครงตู้โชว์ไม้สักแกะลายและติดไฟในตู้",
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
    jobIdPrefix: "JOB-O-",
    jobStart: 271,
    orderId: "ORD-240606-010",
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
    name: "คุณภพ เรืองศิลป์",
    phone: "080-000-0199",
  },
  reviewId: "order-review-valid",
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

    expect(result.confirmedOrder.id).toBe("ORD-240606-010");
    expect(result.confirmedOrder.customerName).toBe("คุณมาลี จันทร์หอม");
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
      colorDetail: "สีโอ๊คเข้ม",
      coloringDetail: "ทำสีโอ๊คเข้ม เคลือบด้าน เน้นให้เห็นลายไม้",
      currentDepartment: "ช่างไม้",
      id: "JOB-O-0271",
      materialDetail: "ไม้สัก",
      rakSamukDetail: "ไม่มีงานรักสมุกในรายการนี้",
      referenceImageCount: 1,
      safeProductionContextOnly: true,
      sizeDetail: "160 x 45 x 210 ซม.",
      sourceLineId: "entry-custom-cabinet",
      sourceType: "Order",
      status: "รอรับงาน",
      woodworkDetail: "โครงตู้โชว์ไม้สักแกะลายและติดไฟในตู้",
      workName: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
    });
    expect("productionDetail" in result.generatedJobs[0]).toBe(false);
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

  it("uses one acknowledgement for multiple stock warnings", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      readyStockLines: [
        ...validInput.readyStockLines,
        {
          color: "แดงชาด / ทอง",
          dimensions: "100 x 42 x 86 ซม.",
          id: "entry-ready-rak-cabinet",
          imageAlt: "ตู้เตี้ยลงรักสมุกสีแดงชาด",
          imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
          lineTotalBaht: 38500,
          quantity: 1,
          sellableStockBefore: 0,
          skuCode: "TBR-CAB-RAK-RED",
          skuName: "ตู้เตี้ยลงรักสมุกพร้อมส่ง",
          title: "ตู้เตี้ยลงรักสมุกพร้อมส่ง",
        },
      ],
      warnings: [
        ...validInput.warnings,
        {
          id: "stock-entry-ready-rak-cabinet",
          lineId: "entry-ready-rak-cabinet",
          message: "ตู้เตี้ยลงรักสมุกพร้อมส่ง จำนวนเกินที่ขายได้",
          type: "stock-insufficient",
        },
      ],
    });

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.acknowledgedWarnings).toHaveLength(2);
    expect(result.readyStockReservationOutcomes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          lineId: "entry-ready-rak-cabinet",
          outcome: "shortage-acknowledged",
          projectedSellableAfter: -1,
        }),
      ]),
    );
    expect(JSON.stringify(result.acknowledgedWarnings)).not.toMatch(
      /manager|approval|reason/i,
    );
  });

  it("preserves acknowledged customer caution warnings in the confirmation result", () => {
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

  it("blocks missing Order Lines", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      customWorkLines: [],
      readyStockLines: [],
      warnings: [],
    });

    expect(result.status).toBe("blocked");

    if (result.status !== "blocked") {
      throw new Error("expected confirmation to block");
    }

    expect(result.blockingReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "missing-order-lines",
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
    expect(JSON.stringify(result)).not.toMatch(/fixtureOnlyNotice/);
  });

  it("keeps sensitive cost/profit/payout/payment evidence and restricted logs out", () => {
    const result = confirmOrderFromReview(validInput);
    const serialized = JSON.stringify(result);

    expect(serialized).not.toMatch(
      /ต้นทุน|กำไร|ราคาทุน|profit|cost|payout|หลักฐานรับเงิน|payment evidence|Management Log|Audit Log/i,
    );
  });

  it("keeps internal admin notes out of generated JOB-O production context", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      customWorkLines: [
        {
          ...validInput.customWorkLines[0],
          customWorkDetail: {
            ...validInput.customWorkLines[0].customWorkDetail,
            productionDetail:
              "ช่างไม้: ทำโครงตู้ / หมายเหตุภายใน: โทรย้ำลูกค้าก่อนผลิต",
            woodworkDetail: "ทำโครงตู้",
          },
        },
      ],
    });

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(JSON.stringify(result.generatedJobs)).not.toMatch(/หมายเหตุภายใน/);
  });

  it("does not fall back to unstructured production detail for generated JOB-O output", () => {
    const result = confirmOrderFromReview({
      ...validInput,
      customWorkLines: [
        {
          ...validInput.customWorkLines[0],
          customWorkDetail: {
            ...validInput.customWorkLines[0].customWorkDetail,
            productionDetail:
              "ช่างไม้: ทำโครงตู้ / หมายเหตุภายใน: โทรย้ำลูกค้าก่อนผลิต",
            woodworkDetail: undefined,
          },
        },
      ],
    });

    expect(result.status).toBe("confirmed");

    if (result.status !== "confirmed") {
      throw new Error("expected confirmation to succeed");
    }

    expect(result.generatedJobs[0]?.woodworkDetail).toBe("");
    expect(JSON.stringify(result.generatedJobs)).not.toMatch(
      /โทรย้ำลูกค้า|หมายเหตุภายใน/,
    );
    expect(result.confirmedOrder.lines[1]?.customDetail).not.toMatch(
      /โทรย้ำลูกค้า|หมายเหตุภายใน/,
    );
  });
});
