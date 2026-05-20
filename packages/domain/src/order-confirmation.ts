export type OrderConfirmationRoleId =
  | "owner"
  | "manager"
  | "admin-sales"
  | "staff-base"
  | "outsource-base"
  | string;

export type ConfirmationWarningType = "stock-insufficient" | "customer-caution";

export type ConfirmationWarning = {
  id: string;
  lineId?: string;
  message: string;
  type: ConfirmationWarningType;
};

export type OrderConfirmationCustomer = {
  name: string;
  primaryPhone: string;
  socialContact?: string;
  tier?: string;
};

export type OrderConfirmationRecipient = {
  address: string;
  name: string;
  phone: string;
};

export type ReadyStockReviewLine = {
  color?: string;
  dimensions?: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  lineTotalBaht: number;
  quantity: number;
  sellableStockBefore: number;
  skuCode: string;
  skuName: string;
  title: string;
};

export type CustomWorkDetailInput = {
  colorDetail: string;
  deliveryDate?: string;
  deliveryDateRequired?: boolean;
  materialDetail: string;
  productionDetail: string;
  referenceImageCount?: number;
  sizeDetail: string;
  workName: string;
};

export type CustomWorkReviewLine = {
  customWorkDetail: CustomWorkDetailInput;
  deliveryDate?: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  lineTotalBaht: number;
  quantity: number;
  title: string;
};

export type OrderConfirmationInput = {
  acknowledgement: {
    customerCautionAccepted?: boolean;
    stockShortageAccepted?: boolean;
  };
  confirmedAt: string;
  confirmedBy: {
    displayName: string;
    roleId: OrderConfirmationRoleId;
  };
  customer: OrderConfirmationCustomer | null;
  customWorkLines: CustomWorkReviewLine[];
  fixtureIdSeed: {
    jobIdPrefix: string;
    jobStart: number;
    orderId: string;
  };
  optionalPaymentRecord?: {
    amountBaht: number;
    method: string;
    note?: string;
  };
  paymentTerm?: string;
  readyStockLines: ReadyStockReviewLine[];
  recipient: OrderConfirmationRecipient | null;
  reviewId: string;
  shipmentIntent?: string;
  sourceDraftNo?: string;
  stale?: boolean;
  warnings: ConfirmationWarning[];
};

export type ConfirmationBlockCode =
  | "missing-customer"
  | "missing-recipient"
  | "missing-payment-term"
  | "missing-order-lines"
  | "incomplete-custom-work-detail"
  | "stock-acknowledgement-required"
  | "customer-caution-acknowledgement-required"
  | "stale-review"
  | "unauthorized";

export type ConfirmationBlock = {
  code: ConfirmationBlockCode;
  lineId?: string;
  message: string;
};

export type GeneratedJobReadModel = {
  colorDetail: string;
  currentDepartment: string;
  deliveryDate?: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  materialDetail: string;
  productionDetail: string;
  quantity: number;
  safeProductionContextOnly: true;
  sourceLineId: string;
  sourceType: "Order";
  status: string;
  workName: string;
};

export type ReadyStockReservationOutcome = {
  lineId: string;
  lineTitle: string;
  outcome: "reserved" | "shortage-acknowledged";
  projectedSellableAfter: number;
  quantity: number;
  sellableStockBefore: number;
  skuCode: string;
};

export type ConfirmedOrderLineReadModel = {
  color?: string;
  customDetail?: string;
  dimensions?: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  job?: {
    currentDepartment: string;
    id: string;
    status: string;
  };
  lineTotalBaht: number;
  quantity: number;
  readyForShipment: boolean;
  shipmentBlockedReason?: string;
  shipmentState: string;
  skuCode?: string;
  skuName?: string;
  stockWarning?: string;
  title: string;
  type: "ready-stock" | "custom-work";
};

export type ConfirmedOrderReadModel = {
  address: string;
  confirmedAt: string;
  confirmedBy: string;
  customerName: string;
  customerPhone: string;
  customerTier: string;
  fixtureOnlyNotice: string;
  hasCustomWork: boolean;
  id: string;
  lines: ConfirmedOrderLineReadModel[];
  netTotalBaht: number;
  orderStatus: "กำลังผลิต" | "พร้อมสร้างรอบจัดส่ง";
  payment: {
    followUpStatus: string;
    outstandingBaht: number;
    paidBaht: number;
    term: string;
  };
  recipientName: string;
  recipientPhone: string;
  shipmentIntent?: string;
  shipmentSummary: {
    detail: string;
    kind: "none";
    label: "ยังไม่ได้จัดส่ง";
  };
  socialContact?: string;
  sourceDraftNo?: string;
};

export type ConfirmationActivityEvent = {
  detail: string;
  title: string;
};

export type OrderConfirmationBlockedResult = {
  blockingReasons: ConfirmationBlock[];
  canConfirm: false;
  status: "blocked";
  warnings: ConfirmationWarning[];
};

export type OrderConfirmationSuccessResult = {
  acknowledgedWarnings: ConfirmationWarning[];
  activityEvents: ConfirmationActivityEvent[];
  canConfirm: true;
  confirmedOrder: ConfirmedOrderReadModel;
  convertedDraft?: {
    draftNo: string;
    status: "แปลงเป็นออเดอร์แล้ว";
  };
  generatedJobs: GeneratedJobReadModel[];
  readyStockReservationOutcomes: ReadyStockReservationOutcome[];
  status: "confirmed";
};

export type OrderConfirmationResult =
  | OrderConfirmationBlockedResult
  | OrderConfirmationSuccessResult;

const confirmationRoleIds = new Set(["owner", "manager", "admin-sales"]);

const fixtureOnlyNotice = "สร้างออเดอร์แล้วจากหน้าตรวจสอบก่อนสร้างออเดอร์";

export function canConfirmOrder(roleId: OrderConfirmationRoleId): boolean {
  return confirmationRoleIds.has(roleId);
}

export function confirmOrderFromReview(
  input: OrderConfirmationInput,
): OrderConfirmationResult {
  const blockingReasons = validateConfirmation(input);

  if (blockingReasons.length > 0) {
    return {
      blockingReasons,
      canConfirm: false,
      status: "blocked",
      warnings: input.warnings,
    };
  }

  const generatedJobs = input.customWorkLines.map((line, index) =>
    createGeneratedJob(
      line,
      input.fixtureIdSeed.jobIdPrefix,
      input.fixtureIdSeed.jobStart + index,
    ),
  );
  const readyStockReservationOutcomes = input.readyStockLines.map(
    createReservationOutcome,
  );
  const netTotalBaht = [
    ...input.readyStockLines,
    ...input.customWorkLines,
  ].reduce((total, line) => total + line.lineTotalBaht, 0);
  const paidBaht = input.optionalPaymentRecord?.amountBaht ?? 0;
  const confirmedOrder: ConfirmedOrderReadModel = {
    address: input.recipient?.address ?? "",
    confirmedAt: input.confirmedAt,
    confirmedBy: input.confirmedBy.displayName,
    customerName: input.customer?.name ?? "",
    customerPhone: input.customer?.primaryPhone ?? "",
    customerTier: input.customer?.tier ?? "ลูกค้าปกติ",
    fixtureOnlyNotice,
    hasCustomWork: input.customWorkLines.length > 0,
    id: input.fixtureIdSeed.orderId,
    lines: [
      ...input.readyStockLines.map((line) =>
        createConfirmedReadyStockLine(line),
      ),
      ...input.customWorkLines.map((line, index) =>
        createConfirmedCustomWorkLine(line, generatedJobs[index]),
      ),
    ],
    netTotalBaht,
    orderStatus:
      input.customWorkLines.length > 0 ? "กำลังผลิต" : "พร้อมสร้างรอบจัดส่ง",
    payment: {
      followUpStatus:
        paidBaht > 0 ? "มีรายการรับเงิน" : "ยังไม่มีรายการรับเงิน",
      outstandingBaht: Math.max(netTotalBaht - paidBaht, 0),
      paidBaht,
      term: input.paymentTerm ?? "",
    },
    recipientName: input.recipient?.name ?? "",
    recipientPhone: input.recipient?.phone ?? "",
    shipmentIntent: input.shipmentIntent,
    shipmentSummary: {
      detail: "ยังไม่สร้างรอบจัดส่งจากการยืนยันออเดอร์",
      kind: "none",
      label: "ยังไม่ได้จัดส่ง",
    },
    socialContact: input.customer?.socialContact,
    sourceDraftNo: input.sourceDraftNo,
  };
  const acknowledgedWarnings = input.warnings.filter((warning) =>
    isWarningAcknowledged(warning, input),
  );

  return {
    acknowledgedWarnings,
    activityEvents: createActivityEvents(
      input,
      generatedJobs,
      readyStockReservationOutcomes,
    ),
    canConfirm: true,
    confirmedOrder,
    convertedDraft: input.sourceDraftNo
      ? {
          draftNo: input.sourceDraftNo,
          status: "แปลงเป็นออเดอร์แล้ว",
        }
      : undefined,
    generatedJobs,
    readyStockReservationOutcomes,
    status: "confirmed",
  };
}

export function validateConfirmation(
  input: OrderConfirmationInput,
): ConfirmationBlock[] {
  const blocks: ConfirmationBlock[] = [];

  if (!canConfirmOrder(input.confirmedBy.roleId)) {
    blocks.push({
      code: "unauthorized",
      message: "ไม่มีสิทธิ์ยืนยันสร้างออเดอร์",
    });
  }

  if (input.stale) {
    blocks.push({
      code: "stale-review",
      message: "ข้อมูลมีการเปลี่ยนแปลง กรุณาตรวจสอบอีกครั้ง",
    });
  }

  if (
    !input.customer ||
    isBlank(input.customer.name) ||
    isBlank(input.customer.primaryPhone)
  ) {
    blocks.push({
      code: "missing-customer",
      message: "ต้องเลือกลูกค้าและเบอร์หลักลูกค้าก่อนยืนยันออเดอร์",
    });
  }

  if (
    !input.recipient ||
    isBlank(input.recipient.name) ||
    isBlank(input.recipient.phone) ||
    isBlank(input.recipient.address)
  ) {
    blocks.push({
      code: "missing-recipient",
      message: "ต้องมีผู้รับ เบอร์ผู้รับ และที่อยู่จัดส่งก่อนยืนยันออเดอร์",
    });
  }

  if (isBlank(input.paymentTerm)) {
    blocks.push({
      code: "missing-payment-term",
      message: "ต้องระบุเงื่อนไขการชำระเงินก่อนยืนยันออเดอร์",
    });
  }

  if (input.readyStockLines.length + input.customWorkLines.length === 0) {
    blocks.push({
      code: "missing-order-lines",
      message: "ต้องมีรายการในออเดอร์อย่างน้อย 1 รายการ",
    });
  }

  for (const line of input.customWorkLines) {
    const missingFields = getMissingCustomWorkFields(line);

    if (missingFields.length > 0) {
      blocks.push({
        code: "incomplete-custom-work-detail",
        lineId: line.id,
        message: `${line.title}: รายละเอียดงานสั่งทำยังไม่ครบ (${missingFields.join(", ")})`,
      });
    }
  }

  const hasStockShortage = input.readyStockLines.some(
    (line) => line.quantity > line.sellableStockBefore,
  );

  if (hasStockShortage && !input.acknowledgement.stockShortageAccepted) {
    blocks.push({
      code: "stock-acknowledgement-required",
      message: "ต้องรับทราบคำเตือนสต๊อกไม่พอก่อนยืนยันออเดอร์",
    });
  }

  const hasCustomerCaution = input.warnings.some(
    (warning) => warning.type === "customer-caution",
  );

  if (hasCustomerCaution && !input.acknowledgement.customerCautionAccepted) {
    blocks.push({
      code: "customer-caution-acknowledgement-required",
      message: "ต้องรับทราบคำเตือนลูกค้าระวังเป็นพิเศษก่อนยืนยันออเดอร์",
    });
  }

  return blocks;
}

function createGeneratedJob(
  line: CustomWorkReviewLine,
  jobIdPrefix: string,
  jobNumber: number,
): GeneratedJobReadModel {
  return {
    colorDetail: line.customWorkDetail.colorDetail,
    currentDepartment: "ช่างไม้",
    deliveryDate: line.deliveryDate ?? line.customWorkDetail.deliveryDate,
    id: `${jobIdPrefix}${String(jobNumber).padStart(4, "0")}`,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    materialDetail: line.customWorkDetail.materialDetail,
    productionDetail: line.customWorkDetail.productionDetail,
    quantity: line.quantity,
    safeProductionContextOnly: true,
    sourceLineId: line.id,
    sourceType: "Order",
    status: "รอรับงาน",
    workName: line.customWorkDetail.workName,
  };
}

function createReservationOutcome(
  line: ReadyStockReviewLine,
): ReadyStockReservationOutcome {
  const projectedSellableAfter = line.sellableStockBefore - line.quantity;

  return {
    lineId: line.id,
    lineTitle: line.title,
    outcome: projectedSellableAfter < 0 ? "shortage-acknowledged" : "reserved",
    projectedSellableAfter,
    quantity: line.quantity,
    sellableStockBefore: line.sellableStockBefore,
    skuCode: line.skuCode,
  };
}

function createConfirmedReadyStockLine(
  line: ReadyStockReviewLine,
): ConfirmedOrderLineReadModel {
  const reservation = createReservationOutcome(line);
  const hasShortage = reservation.outcome === "shortage-acknowledged";

  return {
    color: line.color,
    dimensions: line.dimensions,
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    lineTotalBaht: line.lineTotalBaht,
    quantity: line.quantity,
    readyForShipment: true,
    shipmentState: hasShortage
      ? "พร้อมสร้างรอบจัดส่ง / สต๊อกติดลบ"
      : "พร้อมสร้างรอบจัดส่ง",
    skuCode: line.skuCode,
    skuName: line.skuName,
    stockWarning: hasShortage
      ? `รับทราบขายเกินสต๊อก: ขายได้ก่อนยืนยัน ${line.sellableStockBefore} ชิ้น, จอง ${line.quantity} ชิ้น, คาดขายได้หลังจอง ${reservation.projectedSellableAfter} ชิ้น`
      : undefined,
    title: line.title,
    type: "ready-stock",
  };
}

function createConfirmedCustomWorkLine(
  line: CustomWorkReviewLine,
  job: GeneratedJobReadModel,
): ConfirmedOrderLineReadModel {
  return {
    customDetail: [
      line.customWorkDetail.productionDetail,
      line.customWorkDetail.sizeDetail,
      line.customWorkDetail.materialDetail,
      line.customWorkDetail.colorDetail,
    ].join(" / "),
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    job: {
      currentDepartment: job.currentDepartment,
      id: job.id,
      status: job.status,
    },
    lineTotalBaht: line.lineTotalBaht,
    quantity: line.quantity,
    readyForShipment: false,
    shipmentBlockedReason: "ยังผลิตไม่เสร็จ",
    shipmentState: "ยังผลิตไม่เสร็จ",
    title: line.title,
    type: "custom-work",
  };
}

function createActivityEvents(
  input: OrderConfirmationInput,
  generatedJobs: GeneratedJobReadModel[],
  reservationOutcomes: ReadyStockReservationOutcome[],
): ConfirmationActivityEvent[] {
  const events: ConfirmationActivityEvent[] = [
    {
      title: "สร้างออเดอร์",
      detail: `${input.confirmedBy.displayName} ยืนยันสร้างออเดอร์จากหน้าตรวจสอบก่อนสร้างออเดอร์`,
    },
  ];

  if (input.sourceDraftNo) {
    events.push({
      title: "แปลงร่างออเดอร์",
      detail: `${input.sourceDraftNo} แปลงเป็นออเดอร์แล้ว`,
    });
  }

  for (const outcome of reservationOutcomes) {
    events.push({
      title:
        outcome.outcome === "shortage-acknowledged"
          ? "รับทราบสต๊อกไม่พอ"
          : "บันทึกผลจองสต๊อก",
      detail: `${outcome.lineTitle}: จอง ${outcome.quantity} ชิ้น, คาดขายได้หลังจอง ${outcome.projectedSellableAfter} ชิ้น`,
    });
  }

  for (const job of generatedJobs) {
    events.push({
      title: "สร้าง JOB-O",
      detail: `${job.id} ถูกสร้างจากรายละเอียดงานสั่งทำที่ครบถ้วน`,
    });
  }

  return events;
}

function getMissingCustomWorkFields(line: CustomWorkReviewLine): string[] {
  const missingFields: string[] = [];
  const detail = line.customWorkDetail;

  if (isBlank(detail.workName) || isBlank(line.title)) {
    missingFields.push("ชื่องาน");
  }

  if (isBlank(detail.productionDetail)) {
    missingFields.push("รายละเอียดผลิต");
  }

  if (line.quantity <= 0) {
    missingFields.push("จำนวน");
  }

  if (line.lineTotalBaht <= 0) {
    missingFields.push("ราคา");
  }

  if (isBlank(detail.sizeDetail)) {
    missingFields.push("ขนาด");
  }

  if (isBlank(detail.materialDetail)) {
    missingFields.push("วัสดุ");
  }

  if (isBlank(detail.colorDetail)) {
    missingFields.push("สี");
  }

  if (line.imageSrc && (detail.referenceImageCount ?? 0) <= 0) {
    missingFields.push("รูปอ้างอิง");
  }

  if (
    detail.deliveryDateRequired !== false &&
    isBlank(line.deliveryDate ?? detail.deliveryDate)
  ) {
    missingFields.push("กำหนดส่ง");
  }

  return missingFields;
}

function isWarningAcknowledged(
  warning: ConfirmationWarning,
  input: OrderConfirmationInput,
): boolean {
  if (warning.type === "stock-insufficient") {
    return input.acknowledgement.stockShortageAccepted === true;
  }

  if (warning.type === "customer-caution") {
    return input.acknowledgement.customerCautionAccepted === true;
  }

  return false;
}

function isBlank(value: string | undefined): boolean {
  return value === undefined || value.trim().length === 0;
}
