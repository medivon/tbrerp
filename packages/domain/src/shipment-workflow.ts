export type ShipmentRoleId =
  | "owner"
  | "manager"
  | "admin-sales"
  | "finance"
  | "delivery-team"
  | "woodwork"
  | "coloring"
  | "rak-samuk-worker"
  | "staff-base"
  | "outsource-base"
  | string;

export type ShipmentCodVisibility =
  | {
      amountBaht: number;
      kind: "visible";
      label: "COD";
    }
  | {
      kind: "disabled";
      label: "เปิด COD ไม่ได้";
      reason: "เปิด COD ได้เฉพาะรอบสุดท้าย";
    }
  | {
      kind: "hidden";
    }
  | {
      kind: "none";
    };

export type ShipmentCodContext = {
  codAmountBaht?: number;
  isFinalOrderClosingRound: boolean;
  responsibleUserId?: string;
};

export type ShipmentViewContext = {
  responsibleUserId?: string;
};

export type CloseShipmentEvidenceInput = {
  evidencePhotoCount: number;
  tracking?: string;
};

export type LocalDeliveryShipment = {
  id: string;
  sentOut: boolean;
};

export type LocalSendOutResult<TShipment extends LocalDeliveryShipment> = {
  activeShipments: TShipment[];
  persisted: false;
  selectedCount: number;
  sentOutToday: TShipment[];
};

export type DeliveryNoteShipmentInput = {
  id: string;
  items: Array<{
    imageAlt: string;
    imageSrc: string;
    name: string;
    note?: string;
    quantity: number;
    skuCode?: string;
  }>;
  orderId: string;
};

export type ShippingSheetShipmentInput = {
  address: string;
  carrier: string;
  codAmountBaht?: number;
  deliveryDate?: string;
  deliveryNote?: string;
  id: string;
  isFinalOrderClosingRound: boolean;
  itemSummary: string;
  phone: string;
  recipient: string;
  responsibleUserId?: string;
};

const shipmentAdminRoleIds = new Set(["owner", "manager", "admin-sales"]);
const codVisibleRoleIds = new Set([
  "owner",
  "manager",
  "admin-sales",
  "finance",
]);

export function canAccessReadyToShipQueue(roleId: ShipmentRoleId): boolean {
  return shipmentAdminRoleIds.has(roleId);
}

export function canAccessShipmentBuilder(roleId: ShipmentRoleId): boolean {
  return shipmentAdminRoleIds.has(roleId);
}

export function canAccessShipmentConfirmationQueue(
  roleId: ShipmentRoleId,
): boolean {
  return shipmentAdminRoleIds.has(roleId);
}

export function canAccessDeliveryDashboard(roleId: ShipmentRoleId): boolean {
  return shipmentAdminRoleIds.has(roleId) || roleId === "delivery-team";
}

export function canDeliveryTeamCreateOrSplitShipment(
  roleId: ShipmentRoleId,
): boolean {
  return roleId !== "delivery-team" && shipmentAdminRoleIds.has(roleId);
}

export function canDeliveryTeamEditShipmentMasterData(
  roleId: ShipmentRoleId,
): boolean {
  return roleId !== "delivery-team" && shipmentAdminRoleIds.has(roleId);
}

export function canDeliveryTeamAddTracking(roleId: ShipmentRoleId): boolean {
  return roleId !== "delivery-team" && shipmentAdminRoleIds.has(roleId);
}

export function canDeliveryTeamCloseShipment(roleId: ShipmentRoleId): boolean {
  return roleId !== "delivery-team" && shipmentAdminRoleIds.has(roleId);
}

export function canDeliveryTeamCloseCodFollowUp(
  roleId: ShipmentRoleId,
): boolean {
  return roleId !== "delivery-team" && codVisibleRoleIds.has(roleId);
}

export function canEditCodInShipmentBuilder(): false {
  return false;
}

export function canViewShipmentForRole(
  roleId: ShipmentRoleId,
  context: ShipmentViewContext,
): boolean {
  return (
    shipmentAdminRoleIds.has(roleId) ||
    (roleId === "delivery-team" && context.responsibleUserId === roleId)
  );
}

export function getShipmentCodVisibility(
  roleId: ShipmentRoleId,
  context: ShipmentCodContext,
): ShipmentCodVisibility {
  if (!context.codAmountBaht) {
    return { kind: "none" };
  }

  if (codVisibleRoleIds.has(roleId)) {
    if (!context.isFinalOrderClosingRound) {
      return {
        kind: "disabled",
        label: "เปิด COD ไม่ได้",
        reason: "เปิด COD ได้เฉพาะรอบสุดท้าย",
      };
    }

    return {
      amountBaht: context.codAmountBaht,
      kind: "visible",
      label: "COD",
    };
  }

  if (
    roleId === "delivery-team" &&
    context.responsibleUserId === "delivery-team"
  ) {
    if (!context.isFinalOrderClosingRound) {
      return {
        kind: "disabled",
        label: "เปิด COD ไม่ได้",
        reason: "เปิด COD ได้เฉพาะรอบสุดท้าย",
      };
    }

    return {
      amountBaht: context.codAmountBaht,
      kind: "visible",
      label: "COD",
    };
  }

  return { kind: "hidden" };
}

export function canCloseShipmentWithEvidence(
  input: CloseShipmentEvidenceInput,
): boolean {
  return Boolean(input.tracking?.trim()) || input.evidencePhotoCount > 0;
}

export function getShipmentCloseBlockedReason(
  input: CloseShipmentEvidenceInput,
): string | undefined {
  return canCloseShipmentWithEvidence(input)
    ? undefined
    : "กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง";
}

export function markShipmentsSentOut<TShipment extends LocalDeliveryShipment>(
  shipments: TShipment[],
  selectedIds: string[],
): LocalSendOutResult<TShipment> {
  const selectedIdSet = new Set(selectedIds);
  const sentOutToday = shipments
    .filter((shipment) => shipment.sentOut || selectedIdSet.has(shipment.id))
    .map((shipment) => ({ ...shipment, sentOut: true }));

  return {
    activeShipments: shipments.filter(
      (shipment) => !shipment.sentOut && !selectedIdSet.has(shipment.id),
    ),
    persisted: false,
    selectedCount: selectedIdSet.size,
    sentOutToday,
  };
}

export function createDeliveryNotePrintModel(
  shipment: DeliveryNoteShipmentInput,
) {
  return {
    codAmountBaht: undefined,
    documentTitle: "ใบส่งของ" as const,
    hasCod: false,
    items: shipment.items,
    orderId: shipment.orderId,
    shipmentId: shipment.id,
  };
}

export function createShippingSheetPrintModel(
  roleId: ShipmentRoleId,
  shipment: ShippingSheetShipmentInput,
) {
  const codVisibility = getShipmentCodVisibility(roleId, {
    codAmountBaht: shipment.codAmountBaht,
    isFinalOrderClosingRound: shipment.isFinalOrderClosingRound,
    responsibleUserId: shipment.responsibleUserId,
  });

  return {
    address: shipment.address,
    carrier: shipment.carrier,
    codAmountBaht:
      codVisibility.kind === "visible" ? codVisibility.amountBaht : undefined,
    codVisibilityKind: codVisibility.kind,
    deliveryDate: shipment.deliveryDate,
    deliveryNote: shipment.deliveryNote,
    documentTitle: "ใบจัดส่ง" as const,
    itemSummary: shipment.itemSummary,
    phone: shipment.phone,
    recipient: shipment.recipient,
    shipmentId: shipment.id,
  };
}
