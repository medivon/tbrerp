import { describe, expect, it } from "vitest";

import {
  canCloseShipmentWithEvidence,
  canDeliveryTeamAddTracking,
  canDeliveryTeamCloseCodFollowUp,
  canDeliveryTeamCloseShipment,
  canDeliveryTeamCreateOrSplitShipment,
  canEditCodInShipmentBuilder,
  createDeliveryNotePrintModel,
  createShippingSheetPrintModel,
  getShipmentCloseBlockedReason,
  getShipmentCodVisibility,
  markShipmentsSentOut,
} from "./shipment-workflow";

describe("shipment workflow helpers", () => {
  it("does not allow Shipment Builder to edit COD", () => {
    expect(canEditCodInShipmentBuilder()).toBe(false);
  });

  it("disables COD on non-final Shipment rounds with the approved reason", () => {
    expect(
      getShipmentCodVisibility("admin-sales", {
        codAmountBaht: 12000,
        isFinalOrderClosingRound: false,
        responsibleUserId: "delivery-team",
      }),
    ).toEqual({
      kind: "disabled",
      label: "เปิด COD ไม่ได้",
      reason: "เปิด COD ได้เฉพาะรอบสุดท้าย",
    });
  });

  it("shows COD to Delivery Team only for responsible Shipments", () => {
    expect(
      getShipmentCodVisibility("delivery-team", {
        codAmountBaht: 12000,
        isFinalOrderClosingRound: true,
        responsibleUserId: "delivery-team",
      }),
    ).toMatchObject({
      amountBaht: 12000,
      kind: "visible",
    });

    expect(
      getShipmentCodVisibility("delivery-team", {
        codAmountBaht: 12000,
        isFinalOrderClosingRound: true,
        responsibleUserId: "other-delivery-user",
      }),
    ).toEqual({ kind: "hidden" });
  });

  it("keeps Delivery Team out of Shipment close, tracking, split, and COD follow-up close", () => {
    expect(canDeliveryTeamCreateOrSplitShipment("delivery-team")).toBe(false);
    expect(canDeliveryTeamAddTracking("delivery-team")).toBe(false);
    expect(canDeliveryTeamCloseShipment("delivery-team")).toBe(false);
    expect(canDeliveryTeamCloseCodFollowUp("delivery-team")).toBe(false);
  });

  it("moves sent-out Shipments out of the active local list", () => {
    const result = markShipmentsSentOut(
      [
        { id: "SHP-001", sentOut: false },
        { id: "SHP-002", sentOut: false },
      ],
      ["SHP-001"],
    );

    expect(result.persisted).toBe(false);
    expect(result.activeShipments).toEqual([{ id: "SHP-002", sentOut: false }]);
    expect(result.sentOutToday).toEqual([{ id: "SHP-001", sentOut: true }]);
  });

  it("blocks admin close without tracking or evidence and allows either one", () => {
    expect(
      getShipmentCloseBlockedReason({
        evidencePhotoCount: 0,
        tracking: "",
      }),
    ).toBe("กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง");
    expect(
      canCloseShipmentWithEvidence({
        evidencePhotoCount: 0,
        tracking: "TH-SAMPLE-001",
      }),
    ).toBe(true);
    expect(
      canCloseShipmentWithEvidence({
        evidencePhotoCount: 1,
        tracking: "",
      }),
    ).toBe(true);
  });

  it("never includes COD on Delivery Note print model", () => {
    const model = createDeliveryNotePrintModel({
      id: "SHP-001",
      items: [
        {
          imageAlt: "สินค้า",
          imageSrc: "/sample.png",
          name: "ตู้โชว์ตัวอย่าง",
          quantity: 1,
        },
      ],
      orderId: "ORD-001",
    });

    expect(model.hasCod).toBe(false);
    expect(model.codAmountBaht).toBeUndefined();
    expect(JSON.stringify(model)).not.toMatch(/COD|12000|บาท/);
  });

  it("includes Shipping Sheet COD only when permission-visible", () => {
    const shipment = {
      address: "99/12 ถนนตัวอย่าง กรุงเทพฯ",
      carrier: "รถร้าน",
      codAmountBaht: 12000,
      id: "SHP-001",
      isFinalOrderClosingRound: true,
      itemSummary: "ตู้โชว์ตัวอย่าง 1 ชิ้น",
      phone: "080-000-0001",
      recipient: "คุณตัวอย่าง",
      responsibleUserId: "delivery-team",
    };

    expect(
      createShippingSheetPrintModel("delivery-team", shipment).codAmountBaht,
    ).toBe(12000);
    expect(
      createShippingSheetPrintModel("woodwork", shipment).codAmountBaht,
    ).toBeUndefined();
  });
});
