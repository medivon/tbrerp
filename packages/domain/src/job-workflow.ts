export type ProductionRoleId =
  | "owner"
  | "manager"
  | "admin-sales"
  | "finance"
  | "woodwork"
  | "coloring"
  | "rak-samuk-worker"
  | "staff-base"
  | "outsource-base"
  | string;

export type ProductionAction =
  | "รับงาน"
  | "รอวัตถุดิบ"
  | "ส่งไปสี"
  | "ส่งไปรักสมุก"
  | "กำลังส่งไปแกะสลัก"
  | "รับเข้าโรงงานสี"
  | "งานเสร็จ/พร้อมส่ง";

export type FixtureActionResult = {
  action: ProductionAction;
  message: string;
  persisted: false;
  resultingLabel: string;
};

export type RakSamukPriceState =
  | {
      kind: "approved";
      perPieceBaht: number;
    }
  | {
      kind: "missing";
    }
  | {
      kind: "submitted";
      proposedPerPieceBaht: number;
    };

export type RakSamukWorkerWorkInput = {
  assignedWorkerId: string;
  imageAlt: string;
  imageSrc: string;
  instructionSummary: string;
  payableFinalized?: boolean;
  priceState: RakSamukPriceState;
  quantity: number;
  urgent?: boolean;
  workId: string;
  workName: string;
};

export type RakSamukWorkerVisibleWork = {
  imageAlt: string;
  imageSrc: string;
  instructionSummary: string;
  ownPriceState:
    | {
        kind: "approved";
        label: "ราคางานของฉัน";
        perPieceBaht: number;
      }
    | {
        kind: "missing";
        label: "ไม่มีราคา / ให้แจ้งราคา";
      }
    | {
        kind: "submitted";
        label: "ส่งราคาแล้ว / รออนุมัติ";
        proposedPerPieceBaht: number;
      };
  quantity: number;
  urgent: boolean;
  workId: string;
  workName: string;
};

export type RakSamukProposalInput = {
  perPieceBaht: number;
  submittedByWorkerId: string;
  work: RakSamukWorkerWorkInput;
};

export type RakSamukProposalResult =
  | {
      status: "submitted";
      label: "ส่งราคาแล้ว / รออนุมัติ";
      perPieceBaht: number;
      totalPreviewBaht: number;
    }
  | {
      reason: string;
      status: "blocked";
    };

export type RakSamukReceiveBackInput = {
  approvedPerPieceBaht?: number;
  quantity: number;
  rakSamukWorkId: string;
};

export type RakSamukReceiveBackResult = {
  destinationPickerShown: false;
  evidenceRequired: false;
  nextDepartment: "รอรับเข้าโรงงานสี";
  nextStatus: "รอรับเข้าโรงงานสี";
  payableItem: {
    created: true;
    quantity: number;
    status: "มีราคาแล้ว" | "ยังไม่มีราคา";
    workId: string;
  };
};

const jobOverviewRoleIds = new Set(["owner", "manager", "admin-sales"]);
const woodworkRoleIds = new Set([
  "owner",
  "manager",
  "admin-sales",
  "woodwork",
]);
const coloringRoleIds = new Set([
  "owner",
  "manager",
  "admin-sales",
  "coloring",
]);
const rakSamukSenderRoleIds = new Set([
  "owner",
  "manager",
  "admin-sales",
  "woodwork",
  "coloring",
]);
const rakSamukReceiveBackRoleIds = new Set([
  "owner",
  "manager",
  "admin-sales",
  "coloring",
]);
const rakSamukWorkerRoleIds = new Set(["rak-samuk-worker"]);
const rakSamukPriceApproverRoleIds = new Set(["owner", "manager"]);

export function canAccessJobOverview(roleId: ProductionRoleId): boolean {
  return jobOverviewRoleIds.has(roleId);
}

export function canAccessJobDetail(roleId: ProductionRoleId): boolean {
  return (
    jobOverviewRoleIds.has(roleId) ||
    woodworkRoleIds.has(roleId) ||
    coloringRoleIds.has(roleId)
  );
}

export function canAccessWoodworkQueue(roleId: ProductionRoleId): boolean {
  return woodworkRoleIds.has(roleId);
}

export function canAccessColoringQueue(roleId: ProductionRoleId): boolean {
  return coloringRoleIds.has(roleId);
}

export function canAccessRakSamukAssignment(roleId: ProductionRoleId): boolean {
  return rakSamukSenderRoleIds.has(roleId);
}

export function canAccessRakSamukWorkerWork(roleId: ProductionRoleId): boolean {
  return rakSamukWorkerRoleIds.has(roleId);
}

export function canReceiveRakSamukBack(roleId: ProductionRoleId): boolean {
  return rakSamukReceiveBackRoleIds.has(roleId);
}

export function canApproveRakSamukPrice(roleId: ProductionRoleId): boolean {
  return rakSamukPriceApproverRoleIds.has(roleId);
}

export function canRakSamukWorkerMoveWorkflow(
  roleId: ProductionRoleId,
): boolean {
  return roleId !== "rak-samuk-worker";
}

export function getRakSamukWorkerVisibleWork(
  works: RakSamukWorkerWorkInput[],
  workerId: string,
): RakSamukWorkerVisibleWork[] {
  return works
    .filter((work) => work.assignedWorkerId === workerId)
    .map((work) => ({
      imageAlt: work.imageAlt,
      imageSrc: work.imageSrc,
      instructionSummary: work.instructionSummary,
      ownPriceState: toWorkerPriceState(work.priceState),
      quantity: work.quantity,
      urgent: work.urgent ?? false,
      workId: work.workId,
      workName: work.workName,
    }));
}

export function canSubmitRakSamukProposal(
  work: RakSamukWorkerWorkInput,
  workerId: string,
): boolean {
  return (
    work.assignedWorkerId === workerId &&
    work.priceState.kind !== "approved" &&
    work.payableFinalized !== true
  );
}

export function submitRakSamukProposedPrice(
  input: RakSamukProposalInput,
): RakSamukProposalResult {
  if (!canSubmitRakSamukProposal(input.work, input.submittedByWorkerId)) {
    return {
      reason: "เสนอราคาได้เฉพาะงานของตัวเองที่ยังไม่ถูกรวมใน PV",
      status: "blocked",
    };
  }

  if (!Number.isFinite(input.perPieceBaht) || input.perPieceBaht <= 0) {
    return {
      reason: "กรุณากรอกราคาต่อชิ้น",
      status: "blocked",
    };
  }

  return {
    label: "ส่งราคาแล้ว / รออนุมัติ",
    perPieceBaht: input.perPieceBaht,
    status: "submitted",
    totalPreviewBaht: input.perPieceBaht * input.work.quantity,
  };
}

export function receiveRakSamukWorkBack(
  input: RakSamukReceiveBackInput,
): RakSamukReceiveBackResult {
  return {
    destinationPickerShown: false,
    evidenceRequired: false,
    nextDepartment: "รอรับเข้าโรงงานสี",
    nextStatus: "รอรับเข้าโรงงานสี",
    payableItem: {
      created: true,
      quantity: input.quantity,
      status: input.approvedPerPieceBaht ? "มีราคาแล้ว" : "ยังไม่มีราคา",
      workId: input.rakSamukWorkId,
    },
  };
}

export function simulateProductionAction(
  action: ProductionAction,
): FixtureActionResult {
  const resultingLabel =
    action === "งานเสร็จ/พร้อมส่ง"
      ? "รอสร้างรอบจัดส่ง"
      : action === "ส่งไปสี" || action === "รับเข้าโรงงานสี"
        ? "รอรับเข้าโรงงานสี"
        : action;

  return {
    action,
    message: `${action} แสดงผลเฉพาะในหน้านี้ ยังไม่บันทึกลงฐานข้อมูล`,
    persisted: false,
    resultingLabel,
  };
}

function toWorkerPriceState(
  priceState: RakSamukPriceState,
): RakSamukWorkerVisibleWork["ownPriceState"] {
  if (priceState.kind === "approved") {
    return {
      kind: "approved",
      label: "ราคางานของฉัน",
      perPieceBaht: priceState.perPieceBaht,
    };
  }

  if (priceState.kind === "submitted") {
    return {
      kind: "submitted",
      label: "ส่งราคาแล้ว / รออนุมัติ",
      proposedPerPieceBaht: priceState.proposedPerPieceBaht,
    };
  }

  return {
    kind: "missing",
    label: "ไม่มีราคา / ให้แจ้งราคา",
  };
}
