import {
  confirmOrderFromReview,
  type GeneratedJobReadModel,
  type OrderConfirmationInput,
  type OrderConfirmationResult,
  type ReadyStockReservationOutcome,
} from "@thaiboran/domain";

export const orderStatusLabels = [
  "กำลังดำเนินการ",
  "กำลังผลิต",
  "พร้อมสร้างรอบจัดส่ง",
  "ส่งบางส่วน",
  "จัดส่งครบแล้ว",
  "ยกเลิก",
] as const;

export type OrderStatus = (typeof orderStatusLabels)[number];

export type DraftOrderStatus =
  | "ร่างออเดอร์"
  | "ข้อมูลยังไม่ครบ"
  | "พร้อมตรวจสอบ";

export type OrderLineType = "ready-stock" | "custom-work";

export type ShipmentSummaryKind =
  | "none"
  | "round-without-tracking"
  | "waiting-confirmation"
  | "partial"
  | "tracked"
  | "delivered";

export type OrderLineFixture = {
  id: string;
  type: OrderLineType;
  title: string;
  imageAlt: string;
  imageSrc: string;
  quantity: number;
  skuCode?: string;
  skuName?: string;
  color?: string;
  dimensions?: string;
  lineTotalBaht: number;
  shipmentState: string;
  shipmentNo?: string;
  stockWarning?: string;
  customDetail?: string;
  deliveryDate?: string;
  job?: {
    currentDepartment: string;
    id: string;
    status: string;
  };
  readyForShipment: boolean;
  sellableStockBefore?: number;
  shipmentBlockedReason?: string;
  editable: boolean;
  editBlockedReason?: string;
  cancelledReason?: string;
};

export type ShipmentRoundFixture = {
  carrier: string;
  createdDate: string;
  sentOutDate?: string;
  shipmentNo: string;
  status: string;
  tracking?: string;
};

export type OrderFixture = {
  address: string;
  createdDate: string;
  createdDateShort: string;
  customerName: string;
  customerPhone: string;
  customerTier: string;
  fixtureOnlyNotice?: string;
  hasCustomWork: boolean;
  id: string;
  lines: OrderLineFixture[];
  netTotalBaht: number;
  orderStatus: OrderStatus;
  payment: {
    followUpStatus: string;
    outstandingBaht: number;
    paidBaht: number;
    term: string;
  };
  recipientName: string;
  recipientPhone: string;
  shipmentRounds: ShipmentRoundFixture[];
  shipmentSummary: {
    detail: string;
    kind: ShipmentSummaryKind;
    label: string;
  };
  socialContact?: string;
  sourceDraftNo?: string;
  timeline: Array<{
    detail: string;
    title: string;
  }>;
};

export type DraftOrderFixture = {
  customerName: string;
  customerPhone: string;
  draftNo: string;
  hasCustomWork: boolean;
  itemCount: number;
  itemSummary: string;
  lastUpdated: string;
  missingData: string[];
  ownerName: string;
  recipientName: string;
  status: DraftOrderStatus;
};

export type OrderEntryFixture = {
  address: string;
  customerName: string;
  customerPhone: string;
  customerTier: string;
  customLines: OrderLineFixture[];
  optionalPaymentRecord?: {
    amountBaht: number;
    method: string;
    note: string;
  };
  paymentTerm: string;
  readyStockLines: OrderLineFixture[];
  recipientName: string;
  recipientPhone: string;
  shipmentIntent?: string;
  socialContact?: string;
  stockWarnings: string[];
};

const imageSources = {
  cabinet: "/sector-1-thumbnails/teak-display-cabinet.png",
  chairSet: "/sector-1-thumbnails/shipment-chair-set.png",
  consoleTable: "/sector-1-thumbnails/carved-console-table.png",
};

export const orderFixtures: OrderFixture[] = [
  {
    id: "ORD-240522-018",
    customerName: "คุณศิริพร วงศ์ไม้",
    customerPhone: "080-000-0018",
    socialContact: "Facebook: Siriporn Wood Home",
    customerTier: "ลูกค้า VIP",
    recipientName: "คุณศิริพร วงศ์ไม้",
    recipientPhone: "080-000-0018",
    address: "99/12 หมู่ 4 ต.หางดง อ.หางดง จ.เชียงใหม่ 50230",
    createdDate: "22 พ.ค. 67",
    createdDateShort: "22 พ.ค. 67",
    orderStatus: "กำลังผลิต",
    shipmentSummary: {
      kind: "none",
      label: "ยังไม่ได้จัดส่ง",
      detail: "ยังไม่มีรอบจัดส่ง เพราะงานสั่งทำยังผลิตไม่เสร็จ",
    },
    netTotalBaht: 58500,
    hasCustomWork: true,
    payment: {
      term: "มัดจำ 50% ก่อนเริ่มงาน ส่วนที่เหลือก่อนจัดส่ง",
      paidBaht: 29250,
      outstandingBaht: 29250,
      followUpStatus: "มีรายการติดตามการเงิน",
    },
    lines: [
      {
        id: "line-ready-chair-018",
        type: "ready-stock",
        title: "ชุดเก้าอี้รับแขกไม้สักพร้อมส่ง",
        skuName: "ชุดเก้าอี้รับแขก",
        skuCode: "TBR-CHR-SET-NAT",
        color: "สีธรรมชาติ",
        dimensions: "4 ที่นั่ง",
        imageSrc: imageSources.chairSet,
        imageAlt: "ชุดเก้าอี้รับแขกไม้สัก",
        quantity: 1,
        lineTotalBaht: 18500,
        shipmentState: "พร้อมรอส่งพร้อมงานสั่งทำ",
        readyForShipment: true,
        shipmentBlockedReason:
          "ออเดอร์ผสมตั้งต้นเป็นส่งพร้อมกัน เลือกส่งแยกได้จากหน้า Shipment Builder ในภายหลัง",
        editable: true,
      },
      {
        id: "line-custom-cabinet-018",
        type: "custom-work",
        title: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
        customDetail:
          "รายละเอียดงานสั่งทำ: ไม้สัก สีโอ๊คเข้ม ลายแกะดอกพิกุล มีไฟในตู้",
        imageSrc: imageSources.cabinet,
        imageAlt: "ตู้โชว์ไม้สักแกะลาย",
        quantity: 1,
        lineTotalBaht: 40000,
        shipmentState: "ยังผลิตไม่เสร็จ",
        deliveryDate: "26 พ.ค. 67",
        job: {
          id: "JOB-O-0241",
          status: "กำลังผลิต",
          currentDepartment: "ฝ่ายสี",
        },
        readyForShipment: false,
        shipmentBlockedReason: "ยังผลิตไม่เสร็จ",
        editable: false,
        editBlockedReason: "มี JOB-O แล้ว ต้องแก้รายละเอียดผลิตจากหน้า Job",
      },
    ],
    shipmentRounds: [],
    timeline: [
      {
        title: "สร้างออเดอร์",
        detail: "แอดมินฝ่ายขายสร้างออเดอร์และส่งงานสั่งทำเข้าสู่คิวผลิต",
      },
      {
        title: "สร้าง JOB-O",
        detail: "JOB-O-0241 ถูกสร้างจากรายการงานสั่งทำหลังยืนยันออเดอร์",
      },
    ],
  },
  {
    id: "ORD-240528-014",
    customerName: "คุณมาลี จันทร์หอม",
    customerPhone: "080-000-0014",
    socialContact: "Facebook: Malee Living",
    customerTier: "ลูกค้าปกติ",
    recipientName: "คุณภพ เรืองศิลป์",
    recipientPhone: "080-000-0114",
    address: "12/8 ถ.เจริญเมือง ต.ในเมือง อ.เมือง จ.ลำพูน 51000",
    createdDate: "28 พ.ค. 67",
    createdDateShort: "28 พ.ค. 67",
    orderStatus: "พร้อมสร้างรอบจัดส่ง",
    shipmentSummary: {
      kind: "none",
      label: "ยังไม่ได้จัดส่ง",
      detail: "ยังไม่มีรอบจัดส่ง รายการพร้อมให้เลือกจาก Order Detail",
    },
    netTotalBaht: 24500,
    hasCustomWork: false,
    payment: {
      term: "ชำระเต็มจำนวนก่อนจัดส่ง",
      paidBaht: 24500,
      outstandingBaht: 0,
      followUpStatus: "ไม่มีรายการติดตามการเงิน",
    },
    lines: [
      {
        id: "line-ready-chair-014",
        type: "ready-stock",
        title: "ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ",
        skuName: "ชุดเก้าอี้รับแขก",
        skuCode: "TBR-CHR-SET-NAT",
        color: "สีธรรมชาติ",
        dimensions: "4 ที่นั่ง",
        imageSrc: imageSources.chairSet,
        imageAlt: "ชุดเก้าอี้ไม้สักพร้อมส่ง",
        quantity: 1,
        lineTotalBaht: 24500,
        shipmentState: "พร้อมสร้างรอบจัดส่ง",
        readyForShipment: true,
        editable: true,
      },
    ],
    shipmentRounds: [],
    timeline: [
      {
        title: "สร้างออเดอร์",
        detail: "สร้างออเดอร์พร้อมสินค้าพร้อมส่ง 1 รายการ",
      },
    ],
  },
  {
    id: "ORD-240531-006",
    customerName: "คุณนภัส พิทักษ์เรือน",
    customerPhone: "080-000-0006",
    customerTier: "ลูกค้า VIP",
    recipientName: "คุณนภัส พิทักษ์เรือน",
    recipientPhone: "080-000-0006",
    address: "88/5 หมู่ 2 ต.สันกำแพง อ.สันกำแพง จ.เชียงใหม่ 50130",
    createdDate: "31 พ.ค. 67",
    createdDateShort: "31 พ.ค. 67",
    orderStatus: "ส่งบางส่วน",
    shipmentSummary: {
      kind: "partial",
      label: "จัดส่งยังไม่ครบ",
      detail: "รอบแรกส่งออกแล้ว เหลืองานสั่งทำที่ยังอยู่ฝ่ายสี",
    },
    netTotalBaht: 72000,
    hasCustomWork: true,
    payment: {
      term: "เก็บปลายทางเฉพาะรอบสุดท้าย",
      paidBaht: 20000,
      outstandingBaht: 52000,
      followUpStatus: "มีรายการติดตามการเงิน",
    },
    lines: [
      {
        id: "line-ready-console-006",
        type: "ready-stock",
        title: "โต๊ะคอนโซลแกะลายพร้อมส่ง",
        skuName: "โต๊ะคอนโซลแกะลาย",
        skuCode: "TBR-CNS-CRV-OAK",
        color: "โอ๊คเข้ม",
        dimensions: "120 x 38 x 80 ซม.",
        imageSrc: imageSources.consoleTable,
        imageAlt: "โต๊ะคอนโซลแกะลาย",
        quantity: 1,
        lineTotalBaht: 22000,
        shipmentState: "ส่งแล้ว",
        shipmentNo: "SHP-240601-004",
        readyForShipment: false,
        shipmentBlockedReason: "ส่งแล้ว",
        editable: false,
        editBlockedReason: "รายการนี้ส่งออกแล้ว",
      },
      {
        id: "line-custom-cabinet-006",
        type: "custom-work",
        title: "ตู้พระไม้สักสั่งทำ",
        customDetail:
          "รายละเอียดงานสั่งทำ: ขนาด 180 ซม. สีโอ๊คเข้ม ช่องเก็บของล่าง",
        imageSrc: imageSources.cabinet,
        imageAlt: "ตู้พระไม้สักสั่งทำ",
        quantity: 1,
        lineTotalBaht: 50000,
        shipmentState: "ยังผลิตไม่เสร็จ",
        deliveryDate: "05 มิ.ย. 67",
        job: {
          id: "JOB-O-0250",
          status: "รอวัตถุดิบ",
          currentDepartment: "ช่างไม้",
        },
        readyForShipment: false,
        shipmentBlockedReason: "ยังผลิตไม่เสร็จ",
        editable: false,
        editBlockedReason: "มี JOB-O แล้ว ต้องแก้รายละเอียดผลิตจากหน้า Job",
      },
    ],
    shipmentRounds: [
      {
        shipmentNo: "SHP-240601-004",
        createdDate: "01 มิ.ย. 67",
        sentOutDate: "01 มิ.ย. 67",
        carrier: "Kerry",
        tracking: "KR240601004",
        status: "ปิดรอบจัดส่งแล้ว",
      },
    ],
    timeline: [
      {
        title: "สร้างรอบจัดส่ง",
        detail: "SHP-240601-004 สำหรับโต๊ะคอนโซล",
      },
      {
        title: "ส่งออก",
        detail: "รอบจัดส่งแรกส่งออกแล้ว งานสั่งทำยังผลิตต่อ",
      },
    ],
  },
  {
    id: "ORD-240602-009",
    customerName: "คุณอรุณ แก้วเมือง",
    customerPhone: "080-000-0009",
    customerTier: "ลูกค้าปกติ",
    recipientName: "คุณอรุณ แก้วเมือง",
    recipientPhone: "080-000-0009",
    address: "45/3 ต.ช้างเผือก อ.เมือง จ.เชียงใหม่ 50300",
    createdDate: "02 มิ.ย. 67",
    createdDateShort: "02 มิ.ย. 67",
    orderStatus: "กำลังดำเนินการ",
    shipmentSummary: {
      kind: "waiting-confirmation",
      label: "รอยืนยันการจัดส่ง",
      detail: "SHP-240603-002 ส่งออกแล้ว รอแอดมินยืนยันหลักฐานจัดส่ง",
    },
    netTotalBaht: 16800,
    hasCustomWork: false,
    payment: {
      term: "ชำระเต็มจำนวนก่อนจัดส่ง",
      paidBaht: 16800,
      outstandingBaht: 0,
      followUpStatus: "ไม่มีรายการติดตามการเงิน",
    },
    lines: [
      {
        id: "line-ready-cabinet-009",
        type: "ready-stock",
        title: "ตู้โชว์ไม้สักขนาดเล็กพร้อมส่ง",
        skuName: "ตู้โชว์ไม้สักขนาดเล็ก",
        skuCode: "TBR-CAB-SM-NAT",
        color: "สีธรรมชาติ",
        dimensions: "90 x 40 x 140 ซม.",
        imageSrc: imageSources.cabinet,
        imageAlt: "ตู้โชว์ไม้สักขนาดเล็ก",
        quantity: 1,
        lineTotalBaht: 16800,
        shipmentState: "รอยืนยันการจัดส่ง",
        shipmentNo: "SHP-240603-002",
        readyForShipment: false,
        shipmentBlockedReason: "อยู่ในรอบจัดส่งแล้ว",
        editable: false,
        editBlockedReason: "อยู่ในรอบจัดส่งแล้ว",
      },
    ],
    shipmentRounds: [
      {
        shipmentNo: "SHP-240603-002",
        createdDate: "03 มิ.ย. 67",
        sentOutDate: "03 มิ.ย. 67",
        carrier: "ขนส่งร้าน",
        status: "รอยืนยันการจัดส่ง",
      },
    ],
    timeline: [
      {
        title: "สร้างรอบจัดส่ง",
        detail: "SHP-240603-002 ถูกปล่อยให้ฝ่ายจัดส่ง",
      },
      {
        title: "ส่งออก",
        detail: "ฝ่ายจัดส่งบันทึกว่าส่งออกแล้ว รอแอดมินปิดรอบ",
      },
    ],
  },
  {
    id: "ORD-240604-002",
    customerName: "คุณพิมพ์ วัฒนาชัย",
    customerPhone: "080-000-0002",
    customerTier: "ลูกค้า VVIP",
    recipientName: "คุณพิมพ์ วัฒนาชัย",
    recipientPhone: "080-000-0002",
    address: "19/9 ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200",
    createdDate: "04 มิ.ย. 67",
    createdDateShort: "04 มิ.ย. 67",
    orderStatus: "จัดส่งครบแล้ว",
    shipmentSummary: {
      kind: "tracked",
      label: "Kerry : KR240604001",
      detail: "จัดส่งครบแล้วด้วยรอบจัดส่ง SHP-240604-001",
    },
    netTotalBaht: 42000,
    hasCustomWork: true,
    payment: {
      term: "ชำระเต็มจำนวนก่อนจัดส่ง",
      paidBaht: 42000,
      outstandingBaht: 0,
      followUpStatus: "ปิดการติดตามแล้ว",
    },
    lines: [
      {
        id: "line-custom-table-002",
        type: "custom-work",
        title: "โต๊ะคอนโซลแกะลายสั่งทำ",
        customDetail:
          "รายละเอียดงานสั่งทำ: ลายแกะขอบโต๊ะ สีโอ๊คเข้ม เคลือบด้าน",
        imageSrc: imageSources.consoleTable,
        imageAlt: "โต๊ะคอนโซลแกะลายสั่งทำ",
        quantity: 1,
        lineTotalBaht: 42000,
        shipmentState: "ส่งแล้ว",
        shipmentNo: "SHP-240604-001",
        deliveryDate: "04 มิ.ย. 67",
        job: {
          id: "JOB-O-0262",
          status: "พร้อมส่ง",
          currentDepartment: "เสร็จแล้ว",
        },
        readyForShipment: false,
        shipmentBlockedReason: "ส่งแล้ว",
        editable: false,
        editBlockedReason:
          "ออเดอร์จัดส่งครบแล้ว ต้นฉบับอ่านอย่างเดียวในขั้นตอนปกติ",
      },
    ],
    shipmentRounds: [
      {
        shipmentNo: "SHP-240604-001",
        createdDate: "04 มิ.ย. 67",
        sentOutDate: "04 มิ.ย. 67",
        carrier: "Kerry",
        tracking: "KR240604001",
        status: "ปิดรอบจัดส่งแล้ว",
      },
    ],
    timeline: [
      {
        title: "ปิดรอบจัดส่ง",
        detail: "จัดส่งครบทุก active line แล้ว ออเดอร์เป็นอ่านอย่างเดียว",
      },
    ],
  },
  {
    id: "ORD-240605-004",
    customerName: "คุณลลิตา สายทอง",
    customerPhone: "080-000-0004",
    customerTier: "ลูกค้าปกติ",
    recipientName: "คุณลลิตา สายทอง",
    recipientPhone: "080-000-0004",
    address: "7/2 ต.แม่ริม อ.แม่ริม จ.เชียงใหม่ 50180",
    createdDate: "05 มิ.ย. 67",
    createdDateShort: "05 มิ.ย. 67",
    orderStatus: "ยกเลิก",
    shipmentSummary: {
      kind: "none",
      label: "ยังไม่ได้จัดส่ง",
      detail: "ออเดอร์ถูกยกเลิกก่อนสร้างรอบจัดส่ง",
    },
    netTotalBaht: 12000,
    hasCustomWork: false,
    payment: {
      term: "ชำระก่อนจัดส่ง",
      paidBaht: 0,
      outstandingBaht: 0,
      followUpStatus: "ยกเลิกแล้ว ไม่มีรายการติดตามการเงิน",
    },
    lines: [
      {
        id: "line-cancelled-chair-004",
        type: "ready-stock",
        title: "เก้าอี้ไม้สักสีธรรมชาติ",
        skuName: "เก้าอี้ไม้สัก",
        skuCode: "TBR-CHR-NAT",
        color: "สีธรรมชาติ",
        dimensions: "45 x 45 x 92 ซม.",
        imageSrc: imageSources.chairSet,
        imageAlt: "เก้าอี้ไม้สักสีธรรมชาติ",
        quantity: 2,
        lineTotalBaht: 12000,
        shipmentState: "ยกเลิกรายการแล้ว",
        readyForShipment: false,
        editable: false,
        cancelledReason: "ลูกค้าขอยกเลิกก่อนยืนยันรอบจัดส่ง",
        editBlockedReason: "ออเดอร์ยกเลิกแล้ว",
      },
    ],
    shipmentRounds: [],
    timeline: [
      {
        title: "ยกเลิกออเดอร์",
        detail: "ยกเลิกก่อนเกิดงานต่อเนื่อง",
      },
    ],
  },
];

export const draftOrderFixtures: DraftOrderFixture[] = [
  {
    draftNo: "DRAFT-00034",
    customerName: "คุณมาลี จันทร์หอม",
    customerPhone: "080-000-0034",
    recipientName: "คุณภพ เรืองศิลป์",
    itemSummary: "ตู้โชว์ไม้สักสั่งทำ + 1 รายการ",
    itemCount: 2,
    ownerName: "แอดมินฝ่ายขาย",
    lastUpdated: "วันนี้ 14:20",
    status: "ข้อมูลยังไม่ครบ",
    missingData: ["ยังไม่มีเงื่อนไขชำระเงิน"],
    hasCustomWork: true,
  },
  {
    draftNo: "DRAFT-00035",
    customerName: "คุณปริญญา ศรีนคร",
    customerPhone: "080-000-0035",
    recipientName: "คุณปริญญา ศรีนคร",
    itemSummary: "ชุดเก้าอี้รับแขกพร้อมส่ง",
    itemCount: 1,
    ownerName: "แอดมินฝ่ายขาย",
    lastUpdated: "เมื่อวาน 16:10",
    status: "พร้อมตรวจสอบ",
    missingData: [],
    hasCustomWork: false,
  },
  {
    draftNo: "DRAFT-00036",
    customerName: "คุณณิชา ธรรมวัฒน์",
    customerPhone: "080-000-0036",
    recipientName: "คุณณิชา ธรรมวัฒน์",
    itemSummary: "โต๊ะคอนโซลแกะลายสั่งทำ",
    itemCount: 1,
    ownerName: "คุณผู้จัดการ",
    lastUpdated: "3 วันก่อน",
    status: "ร่างออเดอร์",
    missingData: ["รายละเอียดงานสั่งทำยังไม่ครบ"],
    hasCustomWork: true,
  },
];

export const orderEntryFixture: OrderEntryFixture = {
  customerName: "คุณมาลี จันทร์หอม",
  customerPhone: "080-000-0099",
  socialContact: "Facebook: Malee Living",
  customerTier: "ลูกค้า VIP",
  recipientName: "คุณภพ เรืองศิลป์",
  recipientPhone: "080-000-0199",
  address: "55/10 หมู่ 1 ต.หนองควาย อ.หางดง จ.เชียงใหม่ 50230",
  readyStockLines: [
    {
      id: "entry-ready-chair",
      type: "ready-stock",
      title: "ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ",
      skuName: "ชุดเก้าอี้รับแขก",
      skuCode: "TBR-CHR-SET-NAT",
      color: "สีธรรมชาติ",
      dimensions: "4 ที่นั่ง",
      imageSrc: imageSources.chairSet,
      imageAlt: "ชุดเก้าอี้รับแขกไม้สัก",
      quantity: 2,
      lineTotalBaht: 49000,
      shipmentState: "ยังไม่สร้างรอบจัดส่ง",
      stockWarning: "จำนวนเกินที่ขายได้: ขายได้ 1 ชิ้น",
      sellableStockBefore: 1,
      readyForShipment: false,
      editable: true,
    },
  ],
  customLines: [
    {
      id: "entry-custom-cabinet",
      type: "custom-work",
      title: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
      customDetail:
        "รายละเอียดงานสั่งทำ: สีโอ๊คเข้ม ลายแกะดอกพิกุล ขนาด 160 x 45 x 210 ซม.",
      imageSrc: imageSources.cabinet,
      imageAlt: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
      quantity: 1,
      lineTotalBaht: 42000,
      deliveryDate: "20 มิ.ย. 67",
      shipmentState: "ยังไม่สร้างรอบจัดส่ง",
      readyForShipment: false,
      editable: true,
    },
  ],
  paymentTerm: "มัดจำ 50% ก่อนเริ่มงาน ส่วนที่เหลือก่อนจัดส่ง",
  optionalPaymentRecord: {
    amountBaht: 30000,
    method: "โอนเงิน",
    note: "รับมัดจำตามเงื่อนไขชำระเงิน",
  },
  shipmentIntent: "ส่งพร้อมกัน",
  stockWarnings: ["ชุดเก้าอี้รับแขกไม้สักสีธรรมชาติ จำนวนเกินที่ขายได้"],
};

export const orderReviewScenarioIds = [
  "valid",
  "missing-customer",
  "missing-address",
  "missing-payment-term",
  "incomplete-custom-detail",
  "stale-review",
] as const;

export type OrderReviewScenarioId = (typeof orderReviewScenarioIds)[number];

export type OrderConfirmationFixtureResult = OrderConfirmationResult;
export type GeneratedJobFixture = GeneratedJobReadModel;
export type ReadyStockReservationFixture = ReadyStockReservationOutcome;

type ConfirmationFixtureActor = {
  displayName: string;
  id: string;
};

export function getOrderReviewScenarioId(
  scenarioId?: string | string[],
): OrderReviewScenarioId {
  const normalizedScenarioId = Array.isArray(scenarioId)
    ? scenarioId[0]
    : scenarioId;

  return orderReviewScenarioIds.includes(
    normalizedScenarioId as OrderReviewScenarioId,
  )
    ? (normalizedScenarioId as OrderReviewScenarioId)
    : "valid";
}

export function getOrderConfirmationInput({
  actor,
  scenarioId = "valid",
  stockShortageAccepted,
}: {
  actor: ConfirmationFixtureActor;
  scenarioId?: OrderReviewScenarioId;
  stockShortageAccepted: boolean;
}): OrderConfirmationInput {
  const readyStockLines = orderEntryFixture.readyStockLines.map((line) => ({
    color: line.color,
    dimensions: line.dimensions,
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    lineTotalBaht: line.lineTotalBaht,
    quantity: line.quantity,
    sellableStockBefore: line.sellableStockBefore ?? line.quantity,
    skuCode: line.skuCode ?? "SKU-FIXTURE-MISSING",
    skuName: line.skuName ?? line.title,
    title: line.title,
  }));
  const customWorkLines = orderEntryFixture.customLines.map((line) => ({
    customWorkDetail: {
      colorDetail: "สีโอ๊คเข้ม",
      deliveryDate: line.deliveryDate,
      materialDetail: "ไม้สัก",
      productionDetail: "ลายแกะดอกพิกุล มีไฟในตู้",
      referenceImageCount: 1,
      sizeDetail: "160 x 45 x 210 ซม.",
      workName: line.title,
    },
    deliveryDate: line.deliveryDate,
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    lineTotalBaht: line.lineTotalBaht,
    quantity: line.quantity,
    title: line.title,
  }));
  const input: OrderConfirmationInput = {
    acknowledgement: {
      stockShortageAccepted,
    },
    confirmedAt: "2026-05-19T09:00:00.000Z",
    confirmedBy: {
      displayName: actor.displayName,
      roleId: actor.id,
    },
    customer: {
      name: orderEntryFixture.customerName,
      primaryPhone: orderEntryFixture.customerPhone,
      socialContact: orderEntryFixture.socialContact,
      tier: orderEntryFixture.customerTier,
    },
    customWorkLines,
    fixtureIdSeed: {
      jobIdPrefix: "JOB-O-",
      jobStart: 271,
      orderId: "ORD-240606-010",
    },
    optionalPaymentRecord: orderEntryFixture.optionalPaymentRecord,
    paymentTerm: orderEntryFixture.paymentTerm,
    readyStockLines,
    recipient: {
      address: orderEntryFixture.address,
      name: orderEntryFixture.recipientName,
      phone: orderEntryFixture.recipientPhone,
    },
    reviewId: "order-review-default",
    shipmentIntent: orderEntryFixture.shipmentIntent,
    sourceDraftNo: "DRAFT-00035",
    warnings: orderEntryFixture.stockWarnings.map((warning, index) => ({
      id: `stock-warning-${index + 1}`,
      lineId: orderEntryFixture.readyStockLines[index]?.id,
      message: warning,
      type: "stock-insufficient",
    })),
  };

  if (scenarioId === "missing-customer") {
    return {
      ...input,
      customer: null,
    };
  }

  if (scenarioId === "missing-address") {
    return {
      ...input,
      recipient: {
        name: orderEntryFixture.recipientName,
        phone: orderEntryFixture.recipientPhone,
        address: "",
      },
    };
  }

  if (scenarioId === "missing-payment-term") {
    return {
      ...input,
      paymentTerm: "",
    };
  }

  if (scenarioId === "incomplete-custom-detail") {
    return {
      ...input,
      customWorkLines: input.customWorkLines.map((line) => ({
        ...line,
        customWorkDetail: {
          ...line.customWorkDetail,
          productionDetail: "",
          sizeDetail: "",
        },
      })),
    };
  }

  if (scenarioId === "stale-review") {
    return {
      ...input,
      stale: true,
    };
  }

  return input;
}

export const confirmedOrderFixtureResult = confirmOrderFromReview(
  getOrderConfirmationInput({
    actor: {
      displayName: "แอดมินฝ่ายขาย",
      id: "admin-sales",
    },
    stockShortageAccepted: true,
  }),
);

export const confirmedOrderFixture =
  confirmedOrderFixtureResult.status === "confirmed"
    ? toOrderFixture(confirmedOrderFixtureResult)
    : undefined;

function toOrderFixture(
  result: Extract<OrderConfirmationResult, { status: "confirmed" }>,
): OrderFixture {
  return {
    address: result.confirmedOrder.address,
    createdDate: "19 พ.ค. 69",
    createdDateShort: "19 พ.ค. 69",
    customerName: result.confirmedOrder.customerName,
    customerPhone: result.confirmedOrder.customerPhone,
    customerTier: result.confirmedOrder.customerTier,
    fixtureOnlyNotice: result.confirmedOrder.fixtureOnlyNotice,
    hasCustomWork: result.confirmedOrder.hasCustomWork,
    id: result.confirmedOrder.id,
    lines: result.confirmedOrder.lines.map((line) => {
      const generatedJob = result.generatedJobs.find(
        (job) => job.sourceLineId === line.id,
      );

      return {
        color: line.color,
        customDetail: line.customDetail,
        deliveryDate: generatedJob?.deliveryDate,
        dimensions: line.dimensions,
        editable: line.type === "ready-stock",
        editBlockedReason:
          line.type === "custom-work"
            ? "มี JOB-O แล้ว ต้องแก้รายละเอียดผลิตจากหน้า Job"
            : undefined,
        id: line.id,
        imageAlt: line.imageAlt,
        imageSrc: line.imageSrc,
        job: line.job,
        lineTotalBaht: line.lineTotalBaht,
        quantity: line.quantity,
        readyForShipment: line.readyForShipment,
        shipmentBlockedReason: line.shipmentBlockedReason,
        shipmentState: line.shipmentState,
        skuCode: line.skuCode,
        skuName: line.skuName,
        stockWarning: line.stockWarning,
        title: line.title,
        type: line.type,
      };
    }),
    netTotalBaht: result.confirmedOrder.netTotalBaht,
    orderStatus: result.confirmedOrder.orderStatus,
    payment: result.confirmedOrder.payment,
    recipientName: result.confirmedOrder.recipientName,
    recipientPhone: result.confirmedOrder.recipientPhone,
    shipmentRounds: [],
    shipmentSummary: result.confirmedOrder.shipmentSummary,
    socialContact: result.confirmedOrder.socialContact,
    sourceDraftNo: result.confirmedOrder.sourceDraftNo,
    timeline: result.activityEvents,
  };
}

export function getOrderById(orderId: string): OrderFixture | undefined {
  if (confirmedOrderFixture?.id === orderId) {
    return confirmedOrderFixture;
  }

  return orderFixtures.find((order) => order.id === orderId);
}

export function getFollowUpOrders(): OrderFixture[] {
  return orderFixtures.filter(
    (order) =>
      order.orderStatus !== "จัดส่งครบแล้ว" && order.orderStatus !== "ยกเลิก",
  );
}

export function getClosedAndCancelledOrders(): OrderFixture[] {
  return orderFixtures.filter(
    (order) =>
      order.orderStatus === "จัดส่งครบแล้ว" || order.orderStatus === "ยกเลิก",
  );
}

export function formatBaht(amount: number): string {
  return `${new Intl.NumberFormat("th-TH").format(amount)} บาท`;
}
