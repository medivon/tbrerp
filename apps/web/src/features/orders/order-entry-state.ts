import type { OrderConfirmationInput } from "@thaiboran/domain";

import {
  orderEntryFixture,
  type OrderLineFixture,
  type OrderReviewScenarioId,
} from "@/features/orders/fixtures/orders";

export type OrderEntrySource = "fixture" | "in-memory";

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

export type OrderEntryCustomWorkLine = {
  colorDetail: string;
  customDetail: string;
  deliveryDate?: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  lineTotalBaht: number;
  materialDetail: string;
  quantity: number;
  readyForShipment: false;
  shipmentState: string;
  sizeDetail: string;
  title: string;
  type: "custom-work";
  unitPriceBaht: number;
};

export type OrderEntryState = {
  address: string;
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
  customDetailStatus: string;
  hasMixedLineTypes: boolean;
  isComplete: boolean;
  lineCount: number;
  paymentTermStatus: string;
  readySkuSummary: string;
  stockWarnings: string[];
  totalBaht: number;
  totalQuantity: number;
};

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
];

export function createInitialOrderEntryState(): OrderEntryState {
  return {
    address: orderEntryFixture.address,
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

export function addReadyStockLine(state: OrderEntryState): OrderEntryState {
  const option =
    readyStockOptions[state.readyStockLines.length % readyStockOptions.length];
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
        optionId: option.id,
        quantity: 1,
      }),
    ],
  };
}

export function addCustomWorkLine(state: OrderEntryState): OrderEntryState {
  const lineNumber = nextLineNumber(
    state.customLines.map((line) => line.id),
    "entry-custom-added-",
  );
  const line = normalizeCustomWorkLine({
    colorDetail: "รอระบุสี",
    customDetail: "",
    deliveryDate: "ยังไม่ระบุ",
    id: `entry-custom-added-${lineNumber}`,
    imageAlt: "งานสั่งทำไม้สักตัวอย่าง",
    imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
    materialDetail: "ไม้สัก",
    quantity: 1,
    sizeDetail: "รอระบุขนาด",
    title: `งานสั่งทำเพิ่มใหม่ ${lineNumber}`,
    type: "custom-work",
    unitPriceBaht: 18000,
  });

  return {
    ...state,
    customLines: [...state.customLines, line],
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
            customDetail,
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
  const incompleteCustomLines = state.customLines.filter((line) =>
    isBlank(line.customDetail),
  );
  const stockWarnings = state.readyStockLines
    .filter((line) => line.stockWarning)
    .map((line) => `${line.title}: ${line.stockWarning}`);
  const paymentTermComplete = !isBlank(state.paymentTerm);
  const customDetailStatus =
    state.customLines.length === 0
      ? "ไม่มีงานสั่งทำ"
      : incompleteCustomLines.length === 0
        ? "ครบ"
        : `${incompleteCustomLines.length} รายการยังไม่ครบ`;

  return {
    customDetailStatus,
    hasMixedLineTypes:
      state.readyStockLines.length > 0 && state.customLines.length > 0,
    isComplete:
      !isBlank(state.customerName) &&
      !isBlank(state.address) &&
      paymentTermComplete &&
      lineCount > 0 &&
      incompleteCustomLines.length === 0,
    lineCount,
    paymentTermStatus: paymentTermComplete ? "ครบ" : "ยังไม่มี",
    readySkuSummary:
      state.readyStockLines.length > 0
        ? state.readyStockLines
            .map((line) => `${line.skuCode} / ${line.color}`)
            .join(", ")
        : "ยังไม่มีสินค้าพร้อมส่ง",
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

export function getOrderEntrySourceLabel(state: OrderEntryState): string {
  return state.source === "in-memory"
    ? "ข้อมูลจากหน้าสร้างออเดอร์ในหน่วยความจำ"
    : "ข้อมูลตัวอย่างจาก fixture";
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
    customWorkLines: entryState.customLines.map((line) => ({
      customWorkDetail: {
        colorDetail: line.colorDetail,
        deliveryDate: line.deliveryDate,
        materialDetail: line.materialDetail,
        productionDetail: line.customDetail,
        referenceImageCount: line.customDetail ? 1 : 0,
        sizeDetail: line.sizeDetail,
        workName: line.title,
      },
      deliveryDate: line.deliveryDate,
      id: line.id,
      imageAlt: line.imageAlt,
      imageSrc: line.imageSrc,
      lineTotalBaht: line.lineTotalBaht,
      quantity: line.quantity,
      title: line.title,
    })),
    fixtureIdSeed: {
      jobIdPrefix: "JOB-O-FIX-S4-",
      jobStart: 1,
      orderId: "ORD-FIX-S4-0001",
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
        ? "sector-3-order-review-in-memory"
        : "sector-3-order-review-fixture",
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
    customDetail: stripCustomDetailPrefix(line.customDetail ?? ""),
    deliveryDate: line.deliveryDate,
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    materialDetail: "ไม้สัก",
    quantity: line.quantity,
    sizeDetail: line.dimensions ?? "160 x 45 x 210 ซม.",
    title: line.title,
    type: "custom-work",
    unitPriceBaht,
  });
}

function normalizeCustomWorkLine(
  line: Omit<
    OrderEntryCustomWorkLine,
    "lineTotalBaht" | "readyForShipment" | "shipmentState"
  >,
): OrderEntryCustomWorkLine {
  const quantity = normalizeQuantity(line.quantity);

  return {
    ...line,
    customDetail: stripCustomDetailPrefix(line.customDetail),
    lineTotalBaht: line.unitPriceBaht * quantity,
    quantity,
    readyForShipment: false,
    shipmentState: isBlank(line.customDetail)
      ? "รายละเอียดงานสั่งทำยังไม่ครบ"
      : "ยังไม่สร้างรอบจัดส่ง",
  };
}

function getReadyStockOption(optionId: string): ReadyStockOption | undefined {
  return readyStockOptions.find((option) => option.id === optionId);
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

function stripCustomDetailPrefix(value: string): string {
  return value.replace(/^รายละเอียดงานสั่งทำ:\s*/, "").trim();
}

function isBlank(value: string | undefined): boolean {
  return value === undefined || value.trim().length === 0;
}
