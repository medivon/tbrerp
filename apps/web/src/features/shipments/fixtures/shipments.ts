import {
  canViewShipmentForRole,
  createDeliveryNotePrintModel,
  createShippingSheetPrintModel,
  getShipmentCodVisibility,
  type ShipmentCodVisibility,
} from "@thaiboran/domain";

import type { FixtureUser } from "@/shared/fixtures/users";

const imageSources = {
  cabinet: "/sector-1-thumbnails/teak-display-cabinet.png",
  chairSet: "/sector-1-thumbnails/shipment-chair-set.png",
  consoleTable: "/sector-1-thumbnails/carved-console-table.png",
};

export type ShipmentSourceKind = "stock" | "custom" | "service";

export type ShipmentItemFixture = {
  color?: string;
  imageAlt: string;
  imageSrc: string;
  jobId?: string;
  note?: string;
  quantity: number;
  skuCode?: string;
  source: ShipmentSourceKind;
  stockWarning?: string;
  title: string;
};

export type ReadyToShipOrderFixture = {
  address: string;
  ageLabel: string;
  bulkEligible: boolean;
  carrier: string;
  codAmountBaht?: number;
  customerName: string;
  deliveryDate?: string;
  id: string;
  isFinalOrderClosingRound: boolean;
  items: ShipmentItemFixture[];
  note: string;
  phone: string;
  recipientName: string;
  requiresSeparateReview: boolean;
};

export type ReadyToShipOrderView = ReadyToShipOrderFixture & {
  codVisibility: ShipmentCodVisibility;
};

export type ShipmentBuilderFixture = ReadyToShipOrderFixture & {
  previewShipmentId: string;
  saveAddressPrompt?: string;
};

export type DeliveryShipmentFixture = {
  address: string;
  carrier: string;
  codAmountBaht?: number;
  deliveryDate?: string;
  deliveryNote: string;
  evidencePhotoCount: number;
  id: string;
  isFinalOrderClosingRound: boolean;
  itemSummary: string;
  items: ShipmentItemFixture[];
  orderId: string;
  phone: string;
  recipientName: string;
  responsibleUserId: string;
  sentOut: boolean;
  sentOutTime?: string;
  shortAddress: string;
  tracking?: string;
};

export type DeliveryShipmentView = Omit<
  DeliveryShipmentFixture,
  "codAmountBaht"
> & {
  codVisibility: ShipmentCodVisibility;
};

export type ConfirmationShipmentView = DeliveryShipmentView & {
  closeBlockedReason?: string;
  evidenceStatus: "หลักฐานครบ" | "หลักฐานไม่ครบ";
  trackingStatus: "มี Tracking" | "รอเลขพัสดุ";
};

export type PrintPreviewShipmentFixture = DeliveryShipmentFixture & {
  builderPreview?: boolean;
};

export const readyToShipOrders: ReadyToShipOrderFixture[] = [
  {
    id: "ORD-240528-014",
    customerName: "คุณมาลี วงศ์ไม้",
    recipientName: "คุณภพ กาญจนกุล",
    phone: "081-240-0114",
    address: "12/8 ถ.รอบเมือง ต.ในเมือง อ.เมือง จ.ลำพูน 51000",
    deliveryDate: "วันนี้",
    carrier: "รถร้าน",
    note: "โทรก่อนส่ง 30 นาที",
    ageLabel: "รอ 1 วัน",
    bulkEligible: true,
    requiresSeparateReview: false,
    isFinalOrderClosingRound: true,
    items: [
      {
        color: "สีธรรมชาติ",
        imageAlt: "ชุดเก้าอี้ไม้สักพร้อมส่ง",
        imageSrc: imageSources.chairSet,
        note: "ตรวจผ้าคลุมก่อนขึ้นรถ",
        quantity: 1,
        skuCode: "TBR-CHR-SET-NAT",
        source: "stock",
        title: "ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ",
      },
    ],
  },
  {
    id: "ORD-240522-018",
    customerName: "คุณศิริพร วงศ์ไม้",
    recipientName: "คุณศิริพร วงศ์ไม้",
    phone: "081-522-0018",
    address: "99/12 หมู่ 4 ต.หางดง อ.หางดง จ.เชียงใหม่ 50230",
    deliveryDate: "26 พ.ค. 67",
    carrier: "รอระบุในรอบจัดส่ง",
    codAmountBaht: 29250,
    note: "ลูกค้าขอส่งบางรายการก่อน งานสั่งทำยังไม่เสร็จ",
    ageLabel: "ใกล้กำหนด",
    bulkEligible: false,
    requiresSeparateReview: true,
    isFinalOrderClosingRound: false,
    items: [
      {
        color: "สีธรรมชาติ",
        imageAlt: "ชุดเก้าอี้รับแขกไม้สัก",
        imageSrc: imageSources.chairSet,
        note: "รอส่งพร้อมงานสั่งทำได้ แต่เลือกส่งแยกได้",
        quantity: 1,
        skuCode: "TBR-CHR-SET-NAT",
        source: "stock",
        stockWarning: "สต๊อกติดลบ 1 ชิ้น",
        title: "ชุดเก้าอี้รับแขกไม้สักพร้อมส่ง",
      },
    ],
  },
  {
    id: "ORD-240607-012",
    customerName: "คุณธนา ภักดี",
    recipientName: "คุณธนา ภักดี",
    phone: "081-607-0712",
    address: "41/6 ต.บางกร่าง อ.เมือง จ.นนทบุรี 11000",
    deliveryDate: "พรุ่งนี้",
    carrier: "ไปรษณีย์ไทย EMS",
    codAmountBaht: 18000,
    note: "ห่อกันกระแทกเพิ่มสำหรับกระจก",
    ageLabel: "รอ 2 วัน",
    bulkEligible: false,
    requiresSeparateReview: true,
    isFinalOrderClosingRound: true,
    items: [
      {
        color: "โอ๊คเข้ม",
        imageAlt: "ตู้โชว์ไม้สักแกะลาย",
        imageSrc: imageSources.cabinet,
        jobId: "JOB-O-0271",
        note: "งานสั่งทำเสร็จจากฝ่ายสี",
        quantity: 1,
        source: "custom",
        title: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
      },
    ],
  },
  {
    id: "SVC-240608-003",
    customerName: "คุณแพรว ลานนา",
    recipientName: "คุณแพรว ลานนา",
    phone: "081-608-0803",
    address: "66/4 ต.รอบเวียง อ.เมือง จ.เชียงราย 57000",
    carrier: "รถร้าน",
    note: "ส่งชิ้นส่วนบริการกลับลูกค้า ไม่กระทบออเดอร์เดิม",
    ageLabel: "งานบริการ",
    bulkEligible: false,
    requiresSeparateReview: true,
    isFinalOrderClosingRound: false,
    items: [
      {
        imageAlt: "โต๊ะคอนโซลบริการหลังการขาย",
        imageSrc: imageSources.consoleTable,
        note: "งานบริการพร้อมส่งกลับ",
        quantity: 1,
        source: "service",
        title: "แผ่นชั้นตู้สำหรับงานบริการ",
      },
    ],
  },
];

export const releasedDeliveryShipments: DeliveryShipmentFixture[] = [
  {
    id: "SHP-240606-001",
    orderId: "ORD-240607-012",
    recipientName: "คุณธนา ภักดี",
    phone: "081-607-0712",
    address: "41/6 ต.บางกร่าง อ.เมือง จ.นนทบุรี 11000",
    shortAddress: "บางกร่าง, นนทบุรี",
    carrier: "ไปรษณีย์ไทย EMS",
    deliveryDate: "วันนี้",
    codAmountBaht: 18000,
    deliveryNote: "โทรก่อนส่งและวางชิ้นงานในพื้นที่แห้ง",
    evidencePhotoCount: 0,
    isFinalOrderClosingRound: true,
    itemSummary: "ตู้โชว์ไม้สักแกะลาย 1 ชิ้น",
    items: readyToShipOrders[2].items,
    responsibleUserId: "delivery-team",
    sentOut: false,
  },
  {
    id: "SHP-240606-002",
    orderId: "ORD-240528-014",
    recipientName: "คุณภพ กาญจนกุล",
    phone: "081-240-0114",
    address: "12/8 ถ.รอบเมือง ต.ในเมือง อ.เมือง จ.ลำพูน 51000",
    shortAddress: "เมืองลำพูน, ลำพูน",
    carrier: "รถร้าน",
    deliveryDate: undefined,
    deliveryNote: "โทรก่อนส่ง 30 นาที",
    evidencePhotoCount: 0,
    isFinalOrderClosingRound: true,
    itemSummary: "ชุดเก้าอี้รับแขก 1 ชุด",
    items: readyToShipOrders[0].items,
    responsibleUserId: "delivery-team",
    sentOut: false,
  },
  {
    id: "SHP-240609-004",
    orderId: "ORD-240609-004",
    recipientName: "คุณอร พาณิชย์",
    phone: "081-609-0904",
    address: "8/10 ต.ป่าตัน อ.เมือง จ.เชียงใหม่ 50300",
    shortAddress: "เมืองเชียงใหม่, เชียงใหม่",
    carrier: "Kerry",
    deliveryDate: "24 มิ.ย. 67",
    codAmountBaht: 9500,
    deliveryNote: "รอวันจัดส่งตามนัด",
    evidencePhotoCount: 0,
    isFinalOrderClosingRound: true,
    itemSummary: "โต๊ะคอนโซลแกะลาย 1 ชิ้น",
    items: [
      {
        color: "โอ๊คเข้ม",
        imageAlt: "โต๊ะคอนโซลแกะลาย",
        imageSrc: imageSources.consoleTable,
        quantity: 1,
        skuCode: "TBR-CNS-CRV-OAK",
        source: "stock",
        title: "โต๊ะคอนโซลแกะลายพร้อมส่ง",
      },
    ],
    responsibleUserId: "other-delivery-user",
    sentOut: false,
  },
];

export const sentOutConfirmationShipments: DeliveryShipmentFixture[] = [
  {
    id: "SHP-240603-002",
    orderId: "ORD-240602-009",
    recipientName: "คุณอรุณ ศรีนคร",
    phone: "081-602-0009",
    address: "45/3 ต.ช้างเผือก อ.เมือง จ.เชียงใหม่ 50300",
    shortAddress: "ช้างเผือก, เชียงใหม่",
    carrier: "ขนส่งร้าน",
    deliveryDate: "วันนี้",
    deliveryNote: "ลูกค้ารอรับหน้าบ้าน",
    evidencePhotoCount: 0,
    isFinalOrderClosingRound: true,
    itemSummary: "ตู้โชว์ไม้สักขนาดเล็ก 1 ชิ้น",
    items: [
      {
        color: "สีธรรมชาติ",
        imageAlt: "ตู้โชว์ไม้สักขนาดเล็ก",
        imageSrc: imageSources.cabinet,
        quantity: 1,
        skuCode: "TBR-CAB-SM-NAT",
        source: "stock",
        title: "ตู้โชว์ไม้สักขนาดเล็กพร้อมส่ง",
      },
    ],
    responsibleUserId: "delivery-team",
    sentOut: true,
    sentOutTime: "วันนี้ 10:25",
  },
  {
    id: "SHP-240604-007",
    orderId: "ORD-240604-007",
    recipientName: "คุณวิภา ธารทอง",
    phone: "081-604-0407",
    address: "90/1 ต.บ้านสวน อ.เมือง จ.ชลบุรี 20000",
    shortAddress: "บ้านสวน, ชลบุรี",
    carrier: "Kerry",
    codAmountBaht: 12500,
    deliveryDate: "วันนี้",
    deliveryNote: "ฝากร้านรับของข้างบ้านได้",
    evidencePhotoCount: 1,
    isFinalOrderClosingRound: true,
    itemSummary: "ชุดเก้าอี้รับแขก 1 ชุด",
    items: readyToShipOrders[0].items,
    responsibleUserId: "delivery-team",
    sentOut: true,
    sentOutTime: "วันนี้ 11:10",
  },
  {
    id: "SHP-240604-008",
    orderId: "ORD-240604-008",
    recipientName: "คุณกานต์ ไม้งาม",
    phone: "081-604-0408",
    address: "11/3 ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000",
    shortAddress: "เมืองนครราชสีมา",
    carrier: "ไปรษณีย์ไทย EMS",
    deliveryDate: "วันนี้",
    deliveryNote: "ส่งผ่านขนส่ง",
    evidencePhotoCount: 0,
    isFinalOrderClosingRound: true,
    itemSummary: "โต๊ะคอนโซลแกะลาย 1 ชิ้น",
    items: [
      {
        color: "โอ๊คเข้ม",
        imageAlt: "โต๊ะคอนโซลแกะลาย",
        imageSrc: imageSources.consoleTable,
        quantity: 1,
        skuCode: "TBR-CNS-CRV-OAK",
        source: "stock",
        title: "โต๊ะคอนโซลแกะลายพร้อมส่ง",
      },
    ],
    responsibleUserId: "delivery-team",
    sentOut: true,
    sentOutTime: "วันนี้ 12:30",
    tracking: "TH240604008",
  },
];

export function getReadyToShipOrdersForUser(
  currentUser: FixtureUser,
): ReadyToShipOrderView[] {
  return readyToShipOrders.map((order) => ({
    ...order,
    codVisibility: getShipmentCodVisibility(currentUser.id, {
      codAmountBaht: order.codAmountBaht,
      isFinalOrderClosingRound: order.isFinalOrderClosingRound,
      responsibleUserId: "delivery-team",
    }),
  }));
}

export function getShipmentBuilderFixture(
  orderId: string,
  currentUser: FixtureUser,
):
  | (ShipmentBuilderFixture & { codVisibility: ShipmentCodVisibility })
  | undefined {
  const order = readyToShipOrders.find(
    (readyOrder) => readyOrder.id === orderId,
  );

  if (!order) {
    return undefined;
  }

  return {
    ...order,
    codVisibility: getShipmentCodVisibility(currentUser.id, {
      codAmountBaht: order.codAmountBaht,
      isFinalOrderClosingRound: order.isFinalOrderClosingRound,
      responsibleUserId: "delivery-team",
    }),
    previewShipmentId: `BUILD-${order.id}`,
    saveAddressPrompt:
      "บันทึกที่อยู่นี้เป็นที่อยู่จัดส่งรองของลูกค้า โดยไม่เปลี่ยนที่อยู่หลัก",
  };
}

export function getDeliveryShipmentsForUser(
  currentUser: FixtureUser,
): DeliveryShipmentView[] {
  return filterDeliveryShipmentsForUser(releasedDeliveryShipments, currentUser);
}

export function getSentOutShipmentsForUser(
  currentUser: FixtureUser,
): DeliveryShipmentView[] {
  return filterDeliveryShipmentsForUser(
    sentOutConfirmationShipments,
    currentUser,
  );
}

export function getConfirmationShipmentsForUser(
  currentUser: FixtureUser,
): ConfirmationShipmentView[] {
  return sentOutConfirmationShipments.map((shipment) => {
    const trackingStatus = shipment.tracking ? "มี Tracking" : "รอเลขพัสดุ";
    const evidenceStatus =
      shipment.tracking || shipment.evidencePhotoCount > 0
        ? "หลักฐานครบ"
        : "หลักฐานไม่ครบ";

    return {
      ...toDeliveryShipmentView(shipment, currentUser),
      closeBlockedReason:
        evidenceStatus === "หลักฐานครบ"
          ? undefined
          : "กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง",
      evidenceStatus,
      trackingStatus,
    };
  });
}

export function getPrintPreviewShipment(
  shipmentId: string,
): PrintPreviewShipmentFixture | undefined {
  const builderOrderId = shipmentId.startsWith("BUILD-")
    ? shipmentId.replace("BUILD-", "")
    : undefined;
  const builderOrder = builderOrderId
    ? readyToShipOrders.find((order) => order.id === builderOrderId)
    : undefined;

  if (builderOrder) {
    return {
      address: builderOrder.address,
      carrier: builderOrder.carrier,
      codAmountBaht: builderOrder.codAmountBaht,
      deliveryDate: builderOrder.deliveryDate,
      deliveryNote: builderOrder.note,
      evidencePhotoCount: 0,
      id: shipmentId,
      isFinalOrderClosingRound: builderOrder.isFinalOrderClosingRound,
      itemSummary: summarizeItems(builderOrder.items),
      items: builderOrder.items,
      orderId: builderOrder.id,
      phone: builderOrder.phone,
      recipientName: builderOrder.recipientName,
      responsibleUserId: "delivery-team",
      sentOut: false,
      shortAddress: builderOrder.address,
      builderPreview: true,
    };
  }

  return [...releasedDeliveryShipments, ...sentOutConfirmationShipments].find(
    (shipment) => shipment.id === shipmentId,
  );
}

export function canViewPrintPreviewShipment(
  shipmentId: string,
  currentUser: FixtureUser,
): boolean {
  const shipment = getPrintPreviewShipment(shipmentId);

  if (!shipment) {
    return false;
  }

  if (shipment.builderPreview) {
    return (
      currentUser.id === "owner" ||
      currentUser.id === "manager" ||
      currentUser.id === "admin-sales"
    );
  }

  return canViewShipmentForRole(currentUser.id, {
    responsibleUserId: shipment.responsibleUserId,
  });
}

export function getDeliveryNoteModel(shipmentId: string) {
  const shipment = getPrintPreviewShipment(shipmentId);

  if (!shipment) {
    return undefined;
  }

  return createDeliveryNotePrintModel({
    id: shipment.id,
    items: shipment.items.map((item) => ({
      imageAlt: item.imageAlt,
      imageSrc: item.imageSrc,
      name: item.title,
      note: item.note,
      quantity: item.quantity,
      skuCode: item.skuCode,
    })),
    orderId: shipment.orderId,
  });
}

export function getShippingSheetModel(
  shipmentId: string,
  currentUser: FixtureUser,
) {
  const shipment = getPrintPreviewShipment(shipmentId);

  if (!shipment) {
    return undefined;
  }

  return createShippingSheetPrintModel(currentUser.id, {
    address: shipment.address,
    carrier: shipment.carrier,
    codAmountBaht: shipment.codAmountBaht,
    deliveryDate: shipment.deliveryDate,
    deliveryNote: shipment.deliveryNote,
    id: shipment.id,
    isFinalOrderClosingRound: shipment.isFinalOrderClosingRound,
    itemSummary: shipment.itemSummary,
    phone: shipment.phone,
    recipient: shipment.recipientName,
    responsibleUserId: shipment.responsibleUserId,
  });
}

export function getSourceLabel(source: ShipmentSourceKind): string {
  if (source === "custom") {
    return "งานสั่งทำเสร็จแล้ว";
  }

  if (source === "service") {
    return "งานบริการ";
  }

  return "สินค้าพร้อมส่ง";
}

export function getSourceVariant(source: ShipmentSourceKind) {
  if (source === "custom") {
    return "revision" as const;
  }

  if (source === "service") {
    return "action" as const;
  }

  return "neutral" as const;
}

export function formatBaht(amount: number): string {
  return `${new Intl.NumberFormat("th-TH").format(amount)} บาท`;
}

function toDeliveryShipmentView(
  shipment: DeliveryShipmentFixture,
  currentUser: FixtureUser,
): DeliveryShipmentView {
  return {
    address: shipment.address,
    carrier: shipment.carrier,
    codVisibility: getShipmentCodVisibility(currentUser.id, {
      codAmountBaht: shipment.codAmountBaht,
      isFinalOrderClosingRound: shipment.isFinalOrderClosingRound,
      responsibleUserId: shipment.responsibleUserId,
    }),
    deliveryDate: shipment.deliveryDate,
    deliveryNote: shipment.deliveryNote,
    evidencePhotoCount: shipment.evidencePhotoCount,
    id: shipment.id,
    isFinalOrderClosingRound: shipment.isFinalOrderClosingRound,
    itemSummary: shipment.itemSummary,
    items: shipment.items,
    orderId: shipment.orderId,
    phone: shipment.phone,
    recipientName: shipment.recipientName,
    responsibleUserId: shipment.responsibleUserId,
    sentOut: shipment.sentOut,
    sentOutTime: shipment.sentOutTime,
    shortAddress: shipment.shortAddress,
    tracking: shipment.tracking,
  };
}

function filterDeliveryShipmentsForUser(
  shipments: DeliveryShipmentFixture[],
  currentUser: FixtureUser,
): DeliveryShipmentView[] {
  return shipments
    .filter(
      (shipment) =>
        currentUser.id !== "delivery-team" ||
        shipment.responsibleUserId === currentUser.id,
    )
    .map((shipment) => toDeliveryShipmentView(shipment, currentUser));
}

function summarizeItems(items: ShipmentItemFixture[]): string {
  const [firstItem, ...remainingItems] = items;

  if (!firstItem) {
    return "ไม่มีรายการสินค้า";
  }

  return `${firstItem.title} ${firstItem.quantity} ชิ้น${
    remainingItems.length > 0 ? ` +${remainingItems.length} รายการ` : ""
  }`;
}
