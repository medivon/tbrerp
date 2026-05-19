import type { OrderConfirmationInput } from "@thaiboran/domain";

import {
  orderEntryFixture,
  type OrderLineFixture,
  type OrderReviewScenarioId,
} from "@/features/orders/fixtures/orders";

export type OrderEntrySource = "fixture" | "in-memory";

export type OrderEntryCustomerOption = {
  address: string;
  id: string;
  name: string;
  primaryPhone: string;
  recipientName: string;
  recipientPhone: string;
  socialContact?: string;
  tier: string;
};

export type ReadyStockOption = {
  color: string;
  dimensions: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  productModelName: string;
  sellableStock: number;
  skuCode: string;
  unitPriceBaht: number;
};

export type OrderEntryReadyStockLine = {
  color: string;
  dimensions: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  lineTotalBaht: number;
  optionId: string;
  quantity: number;
  readyForShipment: false;
  sellableStockBefore: number;
  shipmentState: string;
  skuCode: string;
  skuName: string;
  stockWarning?: string;
  title: string;
  type: "ready-stock";
  unitPriceBaht: number;
};

export type CustomWorkLineDraft = {
  colorDetail: string;
  coloringDetail: string;
  deliveryDate: string;
  internalNote: string;
  materialDetail: string;
  quantity: number;
  rakSamukDetail: string;
  referenceImageNote: string;
  sizeDetail: string;
  unitPriceBaht: number;
  woodworkDetail: string;
  workName: string;
};

export type OrderEntryCustomWorkLine = {
  colorDetail: string;
  coloringDetail: string;
  customDetail: string;
  deliveryDate?: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  internalNote: string;
  lineTotalBaht: number;
  materialDetail: string;
  quantity: number;
  rakSamukDetail: string;
  readyForShipment: false;
  referenceImageNote: string;
  shipmentState: string;
  sizeDetail: string;
  title: string;
  type: "custom-work";
  unitPriceBaht: number;
  woodworkDetail: string;
  workName: string;
};

export type OrderEntryState = {
  address: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerTier: string;
  customLines: OrderEntryCustomWorkLine[];
  optionalPaymentRecord?: {
    amountBaht: number;
    method: string;
    note: string;
  };
  paymentTerm: string;
  readyStockLines: OrderEntryReadyStockLine[];
  recipientName: string;
  recipientPhone: string;
  shipmentIntent?: string;
  socialContact?: string;
  source: OrderEntrySource;
};

export type OrderEntrySummary = {
  addressStatus: string;
  customDetailStatus: string;
  customerStatus: string;
  hasMixedLineTypes: boolean;
  isComplete: boolean;
  lineCount: number;
  paymentTermStatus: string;
  readySkuSummary: string;
  reviewBlockReasons: string[];
  stockWarnings: string[];
  totalBaht: number;
  totalQuantity: number;
};

export const orderEntryCustomerOptions: OrderEntryCustomerOption[] = [
  {
    address: orderEntryFixture.address,
    id: "customer-malee",
    name: orderEntryFixture.customerName,
    primaryPhone: orderEntryFixture.customerPhone,
    recipientName: orderEntryFixture.recipientName,
    recipientPhone: orderEntryFixture.recipientPhone,
    socialContact: orderEntryFixture.socialContact,
    tier: orderEntryFixture.customerTier,
  },
  {
    address: "88/15 หมู่ 7 ต.สันผีเสื้อ อ.เมือง จ.เชียงใหม่ 50300",
    id: "customer-prinya",
    name: "คุณปริญญา ศรีนคร",
    primaryPhone: "080-000-0220",
    recipientName: "คุณปริญญา ศรีนคร",
    recipientPhone: "080-000-0220",
    socialContact: "Line: prinya-home",
    tier: "ลูกค้าปกติ",
  },
  {
    address: "12/8 ถ.เจริญเมือง ต.วัดเกต อ.เมือง จ.เชียงใหม่ 50000",
    id: "customer-nicha",
    name: "คุณณิชา ธรรมวัฒน์",
    primaryPhone: "080-000-0330",
    recipientName: "คุณณิชา ธรรมวัฒน์",
    recipientPhone: "080-000-0330",
    socialContact: "Facebook: Nicha House",
    tier: "ลูกค้าโครงการ",
  },
];

export const readyStockOptions: ReadyStockOption[] = [
  {
    color: "สีธรรมชาติ",
    dimensions: "4 ที่นั่ง",
    id: "ready-chair-natural",
    imageAlt: "ชุดเก้าอี้รับแขกไม้สัก",
    imageSrc: "/sector-1-thumbnails/shipment-chair-set.png",
    productModelName: "ชุดเก้าอี้รับแขกไม้สัก",
    sellableStock: 1,
    skuCode: "TBR-CHR-SET-NAT",
    unitPriceBaht: 24500,
  },
  {
    color: "โอ๊คเข้ม",
    dimensions: "120 x 38 x 80 ซม.",
    id: "ready-console-oak",
    imageAlt: "โต๊ะคอนโซลแกะลาย",
    imageSrc: "/sector-1-thumbnails/carved-console-table.png",
    productModelName: "โต๊ะคอนโซลแกะลายพร้อมส่ง",
    sellableStock: 3,
    skuCode: "TBR-CNS-CRV-OAK",
    unitPriceBaht: 22000,
  },
  {
    color: "วอลนัทเข้ม",
    dimensions: "55 x 45 x 58 ซม.",
    id: "ready-side-table-dark",
    imageAlt: "โต๊ะข้างไม้สักสีวอลนัท",
    imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
    productModelName: "โต๊ะข้างไม้สักพร้อมส่ง",
    sellableStock: 2,
    skuCode: "TBR-SID-DRK",
    unitPriceBaht: 12500,
  },
  {
    color: "แดงชาด / ทอง",
    dimensions: "100 x 42 x 86 ซม.",
    id: "ready-rak-cabinet-sold-out",
    imageAlt: "ตู้เตี้ยลงรักสมุกสีแดงชาด",
    imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
    productModelName: "ตู้เตี้ยลงรักสมุกพร้อมส่ง",
    sellableStock: 0,
    skuCode: "TBR-CAB-RAK-RED",
    unitPriceBaht: 38500,
  },
];

export function createInitialOrderEntryState(): OrderEntryState {
  return {
    address: orderEntryFixture.address,
    customerId: orderEntryCustomerOptions[0]?.id,
    customerName: orderEntryFixture.customerName,
    customerPhone: orderEntryFixture.customerPhone,
    customerTier: orderEntryFixture.customerTier,
    customLines: orderEntryFixture.customLines.map((line) =>
      createCustomWorkLineFromFixture(line),
    ),
    optionalPaymentRecord: orderEntryFixture.optionalPaymentRecord,
    paymentTerm: orderEntryFixture.paymentTerm,
    readyStockLines: orderEntryFixture.readyStockLines.map((line) =>
      createReadyStockLineFromFixture(line),
    ),
    recipientName: orderEntryFixture.recipientName,
    recipientPhone: orderEntryFixture.recipientPhone,
    shipmentIntent: orderEntryFixture.shipmentIntent,
    socialContact: orderEntryFixture.socialContact,
    source: "fixture",
  };
}

export function markOrderEntryInMemory(
  state: OrderEntryState,
): OrderEntryState {
  return {
    ...state,
    source: "in-memory",
  };
}

export function selectOrderEntryCustomer(
  state: OrderEntryState,
  customerId: string,
): OrderEntryState {
  const customer = orderEntryCustomerOptions.find(
    (candidate) => candidate.id === customerId,
  );

  if (!customer) {
    return state;
  }

  return {
    ...state,
    address: customer.address,
    customerId: customer.id,
    customerName: customer.name,
    customerPhone: customer.primaryPhone,
    customerTier: customer.tier,
    recipientName: customer.recipientName,
    recipientPhone: customer.recipientPhone,
    socialContact: customer.socialContact,
  };
}

export function addReadyStockLine(state: OrderEntryState): OrderEntryState {
  const option =
    readyStockOptions[state.readyStockLines.length % readyStockOptions.length];

  return addReadyStockLineFromSelection(state, {
    optionId: option.id,
    quantity: 1,
  });
}

export function addReadyStockLineFromSelection(
  state: OrderEntryState,
  selection: {
    optionId: string;
    quantity: number;
  },
): OrderEntryState {
  if (!getReadyStockOption(selection.optionId)) {
    return state;
  }

  const lineNumber = nextLineNumber(
    state.readyStockLines.map((line) => line.id),
    "entry-ready-added-",
  );

  return {
    ...state,
    readyStockLines: [
      ...state.readyStockLines,
      createReadyStockLine({
        id: `entry-ready-added-${lineNumber}`,
        optionId: selection.optionId,
        quantity: selection.quantity,
      }),
    ],
  };
}

export function createBlankCustomWorkLineDraft(): CustomWorkLineDraft {
  return {
    colorDetail: "",
    coloringDetail: "",
    deliveryDate: "",
    internalNote: "",
    materialDetail: "ไม้สัก",
    quantity: 1,
    rakSamukDetail: "",
    referenceImageNote: "",
    sizeDetail: "",
    unitPriceBaht: 18000,
    woodworkDetail: "",
    workName: "",
  };
}

export function createCustomWorkDraftFromLine(
  line: OrderEntryCustomWorkLine,
): CustomWorkLineDraft {
  return {
    colorDetail: line.colorDetail,
    coloringDetail: line.coloringDetail,
    deliveryDate: line.deliveryDate ?? "",
    internalNote: line.internalNote,
    materialDetail: line.materialDetail,
    quantity: line.quantity,
    rakSamukDetail: line.rakSamukDetail,
    referenceImageNote: line.referenceImageNote,
    sizeDetail: line.sizeDetail,
    unitPriceBaht: line.unitPriceBaht,
    woodworkDetail: line.woodworkDetail,
    workName: line.workName,
  };
}

export function addCustomWorkLine(state: OrderEntryState): OrderEntryState {
  return addCustomWorkLineFromDraft(state, createBlankCustomWorkLineDraft());
}

export function addCustomWorkLineFromDraft(
  state: OrderEntryState,
  draft: CustomWorkLineDraft,
): OrderEntryState {
  const lineNumber = nextLineNumber(
    state.customLines.map((line) => line.id),
    "entry-custom-added-",
  );
  const line = normalizeCustomWorkLine({
    ...draft,
    id: `entry-custom-added-${lineNumber}`,
    imageAlt: "งานสั่งทำไม้สัก",
    imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
    title: getCustomWorkDisplayTitle(draft.workName, lineNumber),
    type: "custom-work",
  });

  return {
    ...state,
    customLines: [...state.customLines, line],
  };
}

export function updateCustomWorkLineFromDraft(
  state: OrderEntryState,
  lineId: string,
  draft: CustomWorkLineDraft,
): OrderEntryState {
  return {
    ...state,
    customLines: state.customLines.map((line) =>
      line.id === lineId
        ? normalizeCustomWorkLine({
            ...draft,
            id: line.id,
            imageAlt: line.imageAlt,
            imageSrc: line.imageSrc,
            title:
              draft.workName.trim().length > 0
                ? draft.workName.trim()
                : line.title,
            type: "custom-work",
          })
        : line,
    ),
  };
}

export function removeOrderEntryLine(
  state: OrderEntryState,
  lineId: string,
): OrderEntryState {
  return {
    ...state,
    customLines: state.customLines.filter((line) => line.id !== lineId),
    readyStockLines: state.readyStockLines.filter((line) => line.id !== lineId),
  };
}

export function updateReadyStockLineOption(
  state: OrderEntryState,
  lineId: string,
  optionId: string,
): OrderEntryState {
  if (!getReadyStockOption(optionId)) {
    return state;
  }

  return {
    ...state,
    readyStockLines: state.readyStockLines.map((line) =>
      line.id === lineId
        ? createReadyStockLine({
            id: line.id,
            optionId,
            quantity: line.quantity,
          })
        : line,
    ),
  };
}

export function updateReadyStockLineQuantity(
  state: OrderEntryState,
  lineId: string,
  quantity: number,
): OrderEntryState {
  return {
    ...state,
    readyStockLines: state.readyStockLines.map((line) =>
      line.id === lineId
        ? createReadyStockLine({
            id: line.id,
            optionId: line.optionId,
            quantity,
          })
        : line,
    ),
  };
}

export function updateCustomWorkLineDetail(
  state: OrderEntryState,
  lineId: string,
  customDetail: string,
): OrderEntryState {
  return {
    ...state,
    customLines: state.customLines.map((line) =>
      line.id === lineId
        ? normalizeCustomWorkLine({
            ...line,
            woodworkDetail: customDetail,
          })
        : line,
    ),
  };
}

export function updateCustomWorkLineQuantity(
  state: OrderEntryState,
  lineId: string,
  quantity: number,
): OrderEntryState {
  return {
    ...state,
    customLines: state.customLines.map((line) =>
      line.id === lineId
        ? normalizeCustomWorkLine({
            ...line,
            quantity,
          })
        : line,
    ),
  };
}

export function updatePaymentTerm(
  state: OrderEntryState,
  paymentTerm: string,
): OrderEntryState {
  return {
    ...state,
    paymentTerm,
  };
}

export function calculateOrderEntrySummary(
  state: OrderEntryState,
): OrderEntrySummary {
  const lineCount = state.readyStockLines.length + state.customLines.length;
  const totalQuantity = getOrderEntryLines(state).reduce(
    (total, line) => total + line.quantity,
    0,
  );
  const totalBaht = getOrderEntryLines(state).reduce(
    (total, line) => total + line.lineTotalBaht,
    0,
  );
  const incompleteCustomLines = state.customLines.filter(
    (line) => !isCustomWorkLineComplete(line),
  );
  const stockWarnings = state.readyStockLines
    .filter((line) => line.stockWarning)
    .map((line) => `${line.title}: ${line.stockWarning}`);
  const paymentTermComplete = !isBlank(state.paymentTerm);
  const customerComplete =
    !isBlank(state.customerName) && !isBlank(state.customerPhone);
  const addressComplete =
    !isBlank(state.recipientName) &&
    !isBlank(state.recipientPhone) &&
    !isBlank(state.address);
  const reviewBlockReasons: string[] = [];

  if (!customerComplete) {
    reviewBlockReasons.push("ต้องเลือกลูกค้าก่อนเข้าสู่ Review");
  }

  if (!addressComplete) {
    reviewBlockReasons.push("ต้องมีผู้รับ เบอร์ผู้รับ และที่อยู่จัดส่ง");
  }

  if (lineCount === 0) {
    reviewBlockReasons.push("ต้องมีรายการในออเดอร์อย่างน้อย 1 รายการ");
  }

  if (!paymentTermComplete) {
    reviewBlockReasons.push("ต้องระบุ Payment Term");
  }

  if (incompleteCustomLines.length > 0) {
    reviewBlockReasons.push(
      `รายละเอียดงานสั่งทำยังไม่ครบ ${incompleteCustomLines.length} รายการ`,
    );
  }

  const customDetailStatus =
    state.customLines.length === 0
      ? "ไม่มีงานสั่งทำ"
      : incompleteCustomLines.length === 0
        ? "ครบ"
        : `${incompleteCustomLines.length} รายการยังไม่ครบ`;

  return {
    addressStatus: addressComplete ? "ครบ" : "ยังไม่ครบ",
    customDetailStatus,
    customerStatus: customerComplete ? state.customerName : "ยังไม่ได้เลือก",
    hasMixedLineTypes:
      state.readyStockLines.length > 0 && state.customLines.length > 0,
    isComplete: reviewBlockReasons.length === 0,
    lineCount,
    paymentTermStatus: paymentTermComplete ? "ครบ" : "ยังไม่มี",
    readySkuSummary:
      state.readyStockLines.length > 0
        ? state.readyStockLines
            .map((line) => `${line.skuCode} / ${line.color}`)
            .join(", ")
        : "ยังไม่มีสินค้าพร้อมส่ง",
    reviewBlockReasons,
    stockWarnings,
    totalBaht,
    totalQuantity,
  };
}

export function getOrderEntryLines(
  state: OrderEntryState,
): Array<OrderEntryReadyStockLine | OrderEntryCustomWorkLine> {
  return [...state.readyStockLines, ...state.customLines];
}

export function getCustomWorkDraftMissingFields(
  draft: CustomWorkLineDraft,
): string[] {
  const missingFields: string[] = [];

  if (isBlank(draft.workName)) {
    missingFields.push("ชื่องาน");
  }

  if (draft.quantity <= 0) {
    missingFields.push("จำนวน");
  }

  if (isBlank(draft.sizeDetail)) {
    missingFields.push("ขนาด");
  }

  if (isBlank(draft.deliveryDate)) {
    missingFields.push("กำหนดส่ง");
  }

  if (isBlank(draft.materialDetail)) {
    missingFields.push("วัสดุ");
  }

  if (isBlank(draft.colorDetail)) {
    missingFields.push("สี");
  }

  if (isBlank(draft.woodworkDetail)) {
    missingFields.push("รายละเอียดช่างไม้");
  }

  if (isBlank(draft.coloringDetail)) {
    missingFields.push("รายละเอียดฝ่ายสี/ตกแต่ง");
  }

  if (isBlank(draft.rakSamukDetail)) {
    missingFields.push("รายละเอียดรักสมุก");
  }

  if (isBlank(draft.referenceImageNote)) {
    missingFields.push("รูปอ้างอิง");
  }

  if (draft.unitPriceBaht <= 0) {
    missingFields.push("ราคา");
  }

  return missingFields;
}

export function getCustomWorkLineMissingFields(
  line: OrderEntryCustomWorkLine,
): string[] {
  return getCustomWorkDraftMissingFields(createCustomWorkDraftFromLine(line));
}

export function isCustomWorkLineComplete(
  line: OrderEntryCustomWorkLine,
): boolean {
  return getCustomWorkLineMissingFields(line).length === 0;
}

export function buildCustomWorkProductionDetail(
  line: OrderEntryCustomWorkLine,
): string {
  return [
    line.woodworkDetail ? `ช่างไม้: ${line.woodworkDetail}` : undefined,
    line.coloringDetail ? `ฝ่ายสี/ตกแต่ง: ${line.coloringDetail}` : undefined,
    line.rakSamukDetail ? `รักสมุก: ${line.rakSamukDetail}` : undefined,
    line.internalNote ? `หมายเหตุภายใน: ${line.internalNote}` : undefined,
  ]
    .filter(Boolean)
    .join(" / ");
}

export function createOrderConfirmationInputFromEntryState({
  actor,
  entryState,
  scenarioId = "valid",
  stockShortageAccepted,
}: {
  actor: {
    displayName: string;
    id: string;
  };
  entryState: OrderEntryState;
  scenarioId?: OrderReviewScenarioId;
  stockShortageAccepted: boolean;
}): OrderConfirmationInput {
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
      name: entryState.customerName,
      primaryPhone: entryState.customerPhone,
      socialContact: entryState.socialContact,
      tier: entryState.customerTier,
    },
    customWorkLines: entryState.customLines.map((line) => {
      const isComplete = isCustomWorkLineComplete(line);

      return {
        customWorkDetail: {
          colorDetail: line.colorDetail,
          deliveryDate: line.deliveryDate,
          materialDetail: line.materialDetail,
          productionDetail: isComplete
            ? buildCustomWorkProductionDetail(line)
            : "",
          referenceImageCount: isBlank(line.referenceImageNote) ? 0 : 1,
          sizeDetail: line.sizeDetail,
          workName: line.workName,
        },
        deliveryDate: line.deliveryDate,
        id: line.id,
        imageAlt: line.imageAlt,
        imageSrc: line.imageSrc,
        lineTotalBaht: line.lineTotalBaht,
        quantity: line.quantity,
        title: line.title,
      };
    }),
    fixtureIdSeed: {
      jobIdPrefix: "JOB-O-",
      jobStart: 271,
      orderId: "ORD-240606-010",
    },
    optionalPaymentRecord: entryState.optionalPaymentRecord,
    paymentTerm: entryState.paymentTerm,
    readyStockLines: entryState.readyStockLines.map((line) => ({
      color: line.color,
      dimensions: line.dimensions,
      id: line.id,
      imageAlt: line.imageAlt,
      imageSrc: line.imageSrc,
      lineTotalBaht: line.lineTotalBaht,
      quantity: line.quantity,
      sellableStockBefore: line.sellableStockBefore,
      skuCode: line.skuCode,
      skuName: line.skuName,
      title: line.title,
    })),
    recipient: {
      address: entryState.address,
      name: entryState.recipientName,
      phone: entryState.recipientPhone,
    },
    reviewId:
      entryState.source === "in-memory"
        ? "order-review-entry"
        : "order-review-default",
    shipmentIntent:
      entryState.readyStockLines.length > 0 && entryState.customLines.length > 0
        ? entryState.shipmentIntent
        : undefined,
    warnings: entryState.readyStockLines
      .filter((line) => line.stockWarning)
      .map((line, index) => ({
        id: `stock-warning-${index + 1}`,
        lineId: line.id,
        message: `${line.title} ${line.stockWarning}`,
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
        address: "",
        name: entryState.recipientName,
        phone: entryState.recipientPhone,
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

function createReadyStockLineFromFixture(
  line: OrderLineFixture,
): OrderEntryReadyStockLine {
  const option =
    readyStockOptions.find((candidate) => candidate.skuCode === line.skuCode) ??
    readyStockOptions[0];

  return createReadyStockLine({
    id: line.id,
    optionId: option.id,
    quantity: line.quantity,
  });
}

function createReadyStockLine({
  id,
  optionId,
  quantity,
}: {
  id: string;
  optionId: string;
  quantity: number;
}): OrderEntryReadyStockLine {
  const option = getReadyStockOption(optionId) ?? readyStockOptions[0];
  const normalizedQuantity = normalizeQuantity(quantity);
  const stockWarning =
    normalizedQuantity > option.sellableStock
      ? `จำนวนเกินที่ขายได้: ขายได้ ${option.sellableStock} ชิ้น`
      : undefined;

  return {
    color: option.color,
    dimensions: option.dimensions,
    id,
    imageAlt: option.imageAlt,
    imageSrc: option.imageSrc,
    lineTotalBaht: option.unitPriceBaht * normalizedQuantity,
    optionId: option.id,
    quantity: normalizedQuantity,
    readyForShipment: false,
    sellableStockBefore: option.sellableStock,
    shipmentState: "ยังไม่สร้างรอบจัดส่ง",
    skuCode: option.skuCode,
    skuName: option.productModelName,
    stockWarning,
    title: option.productModelName,
    type: "ready-stock",
    unitPriceBaht: option.unitPriceBaht,
  };
}

function createCustomWorkLineFromFixture(
  line: OrderLineFixture,
): OrderEntryCustomWorkLine {
  const unitPriceBaht = Math.round(
    line.lineTotalBaht / Math.max(line.quantity, 1),
  );

  return normalizeCustomWorkLine({
    colorDetail: line.color ?? "สีโอ๊คเข้ม",
    coloringDetail: "ทำสีโอ๊คเข้ม เคลือบด้าน เน้นให้เห็นลายไม้",
    deliveryDate: line.deliveryDate ?? "20 มิ.ย. 67",
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    internalNote: "ยืนยันขนาดจริงกับลูกค้าก่อนส่งแบบเข้าผลิต",
    materialDetail: "ไม้สัก",
    quantity: line.quantity,
    rakSamukDetail: "ไม่มีงานรักสมุกในรายการนี้",
    referenceImageNote: "ใช้รูปหลักและรูปช่างไม้เป็นภาพอ้างอิง",
    sizeDetail: line.dimensions ?? "160 x 45 x 210 ซม.",
    title: line.title,
    type: "custom-work",
    unitPriceBaht,
    woodworkDetail:
      stripCustomDetailPrefix(line.customDetail ?? "") ||
      "โครงตู้โชว์ไม้สัก หน้าบานแกะดอกพิกุล และติดไฟในตู้",
    workName: line.title,
  });
}

function normalizeCustomWorkLine(
  line: Omit<
    OrderEntryCustomWorkLine,
    "customDetail" | "lineTotalBaht" | "readyForShipment" | "shipmentState"
  >,
): OrderEntryCustomWorkLine {
  const quantity = normalizeQuantity(line.quantity);
  const normalizedLine = {
    ...line,
    colorDetail: line.colorDetail.trim(),
    coloringDetail: line.coloringDetail.trim(),
    deliveryDate: normalizeOptionalText(line.deliveryDate),
    internalNote: line.internalNote.trim(),
    materialDetail: line.materialDetail.trim(),
    quantity,
    rakSamukDetail: line.rakSamukDetail.trim(),
    referenceImageNote: line.referenceImageNote.trim(),
    sizeDetail: line.sizeDetail.trim(),
    title: line.title.trim(),
    unitPriceBaht: Math.max(0, Math.floor(line.unitPriceBaht)),
    woodworkDetail: line.woodworkDetail.trim(),
    workName: line.workName.trim(),
  };
  const customDetail = buildCustomWorkSummary(normalizedLine);
  const complete =
    getCustomWorkDraftMissingFields({
      colorDetail: normalizedLine.colorDetail,
      coloringDetail: normalizedLine.coloringDetail,
      deliveryDate: normalizedLine.deliveryDate ?? "",
      internalNote: normalizedLine.internalNote,
      materialDetail: normalizedLine.materialDetail,
      quantity: normalizedLine.quantity,
      rakSamukDetail: normalizedLine.rakSamukDetail,
      referenceImageNote: normalizedLine.referenceImageNote,
      sizeDetail: normalizedLine.sizeDetail,
      unitPriceBaht: normalizedLine.unitPriceBaht,
      woodworkDetail: normalizedLine.woodworkDetail,
      workName: normalizedLine.workName,
    }).length === 0;

  return {
    ...normalizedLine,
    customDetail,
    lineTotalBaht: normalizedLine.unitPriceBaht * quantity,
    readyForShipment: false,
    shipmentState: complete
      ? "ยังไม่สร้างรอบจัดส่ง"
      : "รายละเอียดงานสั่งทำยังไม่ครบ",
  };
}

function buildCustomWorkSummary(
  line: Pick<
    OrderEntryCustomWorkLine,
    | "colorDetail"
    | "coloringDetail"
    | "materialDetail"
    | "rakSamukDetail"
    | "sizeDetail"
    | "woodworkDetail"
  >,
): string {
  const parts = [
    line.woodworkDetail,
    line.coloringDetail,
    line.rakSamukDetail,
    line.sizeDetail ? `ขนาด ${line.sizeDetail}` : undefined,
    line.materialDetail ? `วัสดุ ${line.materialDetail}` : undefined,
    line.colorDetail ? `สี ${line.colorDetail}` : undefined,
  ].filter(Boolean);

  return parts.length > 0 ? `รายละเอียดงานสั่งทำ: ${parts.join(" / ")}` : "";
}

function getReadyStockOption(optionId: string): ReadyStockOption | undefined {
  return readyStockOptions.find((option) => option.id === optionId);
}

function getCustomWorkDisplayTitle(
  workName: string,
  lineNumber: number,
): string {
  return workName.trim().length > 0
    ? workName.trim()
    : `งานสั่งทำยังไม่ระบุชื่อ ${lineNumber}`;
}

function nextLineNumber(ids: string[], prefix: string): number {
  const usedNumbers = ids
    .filter((id) => id.startsWith(prefix))
    .map((id) => Number(id.slice(prefix.length)))
    .filter((value) => Number.isFinite(value));

  return usedNumbers.length === 0 ? 1 : Math.max(...usedNumbers) + 1;
}

function normalizeQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) {
    return 1;
  }

  return Math.max(1, Math.floor(quantity));
}

function normalizeOptionalText(value: string | undefined): string | undefined {
  const normalized = value?.trim();

  return normalized ? normalized : undefined;
}

function stripCustomDetailPrefix(value: string): string {
  return value.replace(/^รายละเอียดงานสั่งทำ:\s*/, "").trim();
}

function isBlank(value: string | undefined): boolean {
  return value === undefined || value.trim().length === 0;
}
