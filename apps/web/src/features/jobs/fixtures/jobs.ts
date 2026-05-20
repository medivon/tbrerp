import {
  getRakSamukWorkerVisibleWork,
  receiveRakSamukWorkBack,
  type RakSamukWorkerVisibleWork,
  type RakSamukWorkerWorkInput,
} from "@thaiboran/domain";
import type { StatusChipProps } from "@thaiboran/ui";

export type JobSourceCode = "JOB-O" | "JOB-P";
export type JobDepartment =
  | "ช่างไม้"
  | "ฝ่ายสี"
  | "รักสมุก"
  | "รอรับเข้าโรงงานสี";

export type JobFixture = {
  activityPreview: Array<{
    detail: string;
    title: string;
  }>;
  adminContext?: {
    customerName?: string;
    orderId?: string;
    productionLot?: string;
  };
  ageLabel: string;
  currentDepartment: JobDepartment;
  deliveryDate?: string;
  departmentAgeLabel: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  instructions: {
    coloring: string;
    rakSamuk: string;
    woodwork: string;
  };
  notices: {
    hold?: string;
    revision?: string;
    waitingMaterial?: string;
  };
  quantity: number;
  sourceCode: JobSourceCode;
  sourceLabel: "งานลูกค้า" | "ผลิตเข้าสต๊อก" | "งานผลิตพิเศษ";
  status: string;
  urgent: boolean;
  waitingMaterial: boolean;
  workName: string;
};

export type WorkerQueueJob = {
  ageLabel: string;
  currentStatus: string;
  deliveryDate?: string;
  disabledReasons?: Partial<Record<string, string>>;
  id: string;
  imageAlt: string;
  imageSrc: string;
  instructionPreview: string;
  quantity: number;
  sourceCode: JobSourceCode;
  sourceLabel: JobFixture["sourceLabel"];
  urgent: boolean;
  waitingMaterial: boolean;
  workName: string;
};

export type ColoringIntakeJob = WorkerQueueJob & {
  arrivalGroup: "ด่วน / ใกล้ส่ง" | "วันนี้" | "ก่อนหน้า";
  fromSource: "จากช่างไม้" | "จากรักสมุก";
};

export type RakSamukWorkerFixture = {
  active: boolean;
  displayName: string;
  id: string;
  note: string;
};

export type RakSamukAssignmentFixture = {
  id: string;
  missingPriceSignal: boolean;
  sourceDepartment: "จากช่างไม้" | "จากฝ่ายสี";
  work: JobFixture;
};

export type RakSamukPriceApprovalFixture = {
  id: string;
  imageAlt: string;
  imageSrc: string;
  instructionSummary: string;
  productModelLinked: boolean;
  proposedPerPieceBaht: number;
  quantity: number;
  status: "รออนุมัติราคา";
  standardRatePrompt: string;
  workName: string;
  workerName: string;
};

const imageSources = {
  cabinet: "/sector-1-thumbnails/teak-display-cabinet.png",
  chairSet: "/sector-1-thumbnails/shipment-chair-set.png",
  consoleTable: "/sector-1-thumbnails/carved-console-table.png",
};

export const jobFixtures: JobFixture[] = [
  {
    activityPreview: [
      {
        detail: "ช่างไม้รับงานแล้ว ส่งต่อเข้าโรงงานสี",
        title: "ส่งไปสี",
      },
      {
        detail: "ฝ่ายสีรอรับเข้าโรงงานสี",
        title: "รอรับเข้าโรงงานสี",
      },
    ],
    adminContext: {
      customerName: "คุณศิริพร",
      orderId: "ORD-2569-0522-018",
    },
    ageLabel: "ค้าง 18 วัน",
    currentDepartment: "ฝ่ายสี",
    deliveryDate: "26 พ.ค. 67",
    departmentAgeLabel: "ค้างในแผนก 2 วัน",
    id: "JOB-O-0241",
    imageAlt: "ตู้โชว์ไม้สักแกะลาย",
    imageSrc: imageSources.cabinet,
    instructions: {
      coloring: "สีโอ๊คเข้ม เคลือบด้าน ระวังขอบบานคู่ให้สีเสมอกัน",
      rakSamuk: "ลายดอกพิกุลหน้าบานกลาง ใช้แนวเส้นเดียวกับรูปอ้างอิง",
      woodwork: "ทำบานคู่ ขอบโค้ง เพิ่มช่องไฟในตู้",
    },
    notices: {
      revision: "Revision: ปรับสีจากโอ๊คอ่อนเป็นโอ๊คเข้ม",
    },
    quantity: 1,
    sourceCode: "JOB-O",
    sourceLabel: "งานลูกค้า",
    status: "รอรับเข้าโรงงานสี",
    urgent: true,
    waitingMaterial: false,
    workName: "ตู้โชว์ไม้สักแกะลายสั่งทำ",
  },
  {
    activityPreview: [
      {
        detail: "ช่างไม้แจ้งรายการไม้บัวและบานพับที่ต้องรอ",
        title: "รอวัตถุดิบ",
      },
    ],
    adminContext: {
      customerName: "คุณมาลี",
      orderId: "ORD-2569-0531-006",
    },
    ageLabel: "ค้าง 12 วัน",
    currentDepartment: "ช่างไม้",
    deliveryDate: "05 มิ.ย. 67",
    departmentAgeLabel: "ค้างในแผนก 6 วัน",
    id: "JOB-O-0250",
    imageAlt: "ตู้พระไม้สักสั่งทำ",
    imageSrc: imageSources.cabinet,
    instructions: {
      coloring: "สีโอ๊คเข้ม เก็บงานหลังประกอบ",
      rakSamuk: "ไม่มีลายรักสมุกในรอบนี้",
      woodwork: "ขนาด 180 ซม. ช่องเก็บของล่าง เพิ่มบัวบน",
    },
    notices: {
      waitingMaterial: "รอไม้บัวขนาด 4 ซม. และบานพับทองเหลือง",
    },
    quantity: 1,
    sourceCode: "JOB-O",
    sourceLabel: "งานลูกค้า",
    status: "รอวัตถุดิบ",
    urgent: true,
    waitingMaterial: true,
    workName: "ตู้พระไม้สักสั่งทำ",
  },
  {
    activityPreview: [
      {
        detail: "สร้างจาก Production เพื่อเข้าสต๊อก",
        title: "สร้าง JOB-P",
      },
    ],
    adminContext: {
      productionLot: "LOT-2569-006",
    },
    ageLabel: "ค้าง 5 วัน",
    currentDepartment: "ช่างไม้",
    deliveryDate: undefined,
    departmentAgeLabel: "ค้างในแผนก 1 วัน",
    id: "JOB-P-0107",
    imageAlt: "โต๊ะคอนโซลแกะลาย",
    imageSrc: imageSources.consoleTable,
    instructions: {
      coloring: "สีโอ๊คกลาง เคลือบด้าน",
      rakSamuk: "ลายเครือเถาขอบหน้าโต๊ะ",
      woodwork: "ผลิต 3 ชิ้นตามแบบ SKU หลัก ขอบลายแกะเหมือนต้นแบบ",
    },
    notices: {},
    quantity: 3,
    sourceCode: "JOB-P",
    sourceLabel: "ผลิตเข้าสต๊อก",
    status: "รอรับงาน",
    urgent: false,
    waitingMaterial: false,
    workName: "โต๊ะคอนโซลแกะลายผลิตเข้าสต๊อก",
  },
  {
    activityPreview: [
      {
        detail: "ส่งงานให้ช่างรักสมุกแล้ว",
        title: "ส่งไปรักสมุก",
      },
    ],
    adminContext: {
      customerName: "คุณกานต์",
      orderId: "ORD-2569-0602-021",
    },
    ageLabel: "ค้าง 9 วัน",
    currentDepartment: "รักสมุก",
    deliveryDate: "31 พ.ค. 67",
    departmentAgeLabel: "อยู่รักสมุก 3 วัน",
    id: "JOB-O-0264",
    imageAlt: "ลายรักสมุกบนหน้าบานตู้",
    imageSrc: imageSources.cabinet,
    instructions: {
      coloring: "หลังกลับจากรักสมุกให้เข้าฝ่ายสีเพื่อเคลือบด้าน",
      rakSamuk: "ลายดอกพิกุลหน้าบาน 2 บาน งานเส้นละเอียด",
      woodwork: "ประกอบบานแล้ว รอรักสมุก",
    },
    notices: {},
    quantity: 2,
    sourceCode: "JOB-O",
    sourceLabel: "งานลูกค้า",
    status: "ส่งไปรักสมุก",
    urgent: false,
    waitingMaterial: false,
    workName: "ตู้โชว์รักสมุกสองบาน",
  },
  {
    activityPreview: [
      {
        detail: "รับงานกลับจากรักสมุกแล้ว รอฝ่ายสีรับเข้า",
        title: "รับงานรักสมุกกลับ",
      },
    ],
    adminContext: {
      customerName: "คุณอร",
      orderId: "ORD-2569-0604-010",
    },
    ageLabel: "ค้าง 7 วัน",
    currentDepartment: "รอรับเข้าโรงงานสี",
    deliveryDate: "02 มิ.ย. 67",
    departmentAgeLabel: "รอรับเข้า 1 วัน",
    id: "JOB-O-0270",
    imageAlt: "โต๊ะคอนโซลกลับจากรักสมุก",
    imageSrc: imageSources.consoleTable,
    instructions: {
      coloring: "รับเข้าโรงงานสีแล้วเก็บสีเข้ม เคลือบด้าน",
      rakSamuk: "ลายเครือเถาขอบโต๊ะเสร็จแล้ว",
      woodwork: "ส่งออกจากช่างไม้แล้ว",
    },
    notices: {},
    quantity: 1,
    sourceCode: "JOB-O",
    sourceLabel: "งานลูกค้า",
    status: "รอรับเข้าโรงงานสี",
    urgent: true,
    waitingMaterial: false,
    workName: "โต๊ะคอนโซลรักสมุกกลับเข้าโรงงานสี",
  },
];

export const rakSamukWorkers: RakSamukWorkerFixture[] = [
  {
    active: true,
    displayName: "ช่างสมชาย รักสมุก",
    id: "rak-samuk-worker",
    note: "ถนัดลายดอกพิกุลและเส้นละเอียด",
  },
  {
    active: true,
    displayName: "ช่างมาลี รักสมุก",
    id: "rak-worker-malee",
    note: "ถนัดลายเครือเถา",
  },
];

export const rakSamukAssignmentFixtures: RakSamukAssignmentFixture[] = [
  {
    id: "RS-ASSIGN-001",
    missingPriceSignal: true,
    sourceDepartment: "จากช่างไม้",
    work: jobFixtures[3],
  },
];

export const rakSamukWorkInputs: RakSamukWorkerWorkInput[] = [
  {
    assignedWorkerId: "rak-samuk-worker",
    imageAlt: "ลายรักสมุกบนหน้าบานตู้",
    imageSrc: imageSources.cabinet,
    instructionSummary: "ลายดอกพิกุลหน้าบาน 2 บาน งานเส้นละเอียด",
    priceState: { kind: "missing" },
    quantity: 2,
    urgent: true,
    workId: "RS-WORK-001",
    workName: "ตู้โชว์รักสมุกสองบาน",
  },
  {
    assignedWorkerId: "rak-samuk-worker",
    imageAlt: "ลายรักสมุกบนโต๊ะคอนโซล",
    imageSrc: imageSources.consoleTable,
    instructionSummary: "ลายเครือเถาขอบโต๊ะตามรูปอ้างอิง",
    priceState: { kind: "approved", perPieceBaht: 450 },
    quantity: 1,
    urgent: false,
    workId: "RS-WORK-002",
    workName: "โต๊ะคอนโซลรักสมุก",
  },
  {
    assignedWorkerId: "rak-samuk-worker",
    imageAlt: "ลายรักสมุกบนชุดเก้าอี้",
    imageSrc: imageSources.chairSet,
    instructionSummary: "ลายเส้นขอบพนักเก้าอี้ 4 ตัว",
    priceState: { kind: "submitted", proposedPerPieceBaht: 320 },
    quantity: 4,
    urgent: false,
    workId: "RS-WORK-003",
    workName: "ชุดเก้าอี้ลายรักสมุก",
  },
  {
    assignedWorkerId: "rak-worker-malee",
    imageAlt: "งานรักสมุกของช่างคนอื่น",
    imageSrc: imageSources.consoleTable,
    instructionSummary: "ลายสำหรับช่างคนอื่น",
    priceState: { kind: "approved", perPieceBaht: 380 },
    quantity: 1,
    urgent: false,
    workId: "RS-WORK-OTHER",
    workName: "งานของช่างคนอื่น",
  },
];

export const rakSamukPriceApprovalFixtures: RakSamukPriceApprovalFixture[] = [
  {
    id: "RS-PRICE-001",
    imageAlt: "ลายรักสมุกบนหน้าบานตู้",
    imageSrc: imageSources.cabinet,
    instructionSummary: "ลายดอกพิกุลหน้าบาน 2 บาน งานเส้นละเอียด",
    productModelLinked: true,
    proposedPerPieceBaht: 500,
    quantity: 2,
    standardRatePrompt:
      "งานนี้ผูกกับ SKU หลัก ให้เลือกว่าจะอัปเดตราคามาตรฐานรักสมุกสำหรับงานในอนาคตหรือไม่",
    status: "รออนุมัติราคา",
    workName: "ตู้โชว์รักสมุกสองบาน",
    workerName: "ช่างสมชาย รักสมุก",
  },
];

export function getActiveJobs(): JobFixture[] {
  return jobFixtures;
}

export function getJobById(jobId: string): JobFixture | undefined {
  return jobFixtures.find((job) => job.id === jobId);
}

export function getJobSourceLabel(job: JobFixture): string {
  return `${job.sourceCode} / ${job.sourceLabel}`;
}

export function getSourceChipVariant(
  job: Pick<JobFixture, "sourceCode">,
): StatusChipProps["variant"] {
  return job.sourceCode === "JOB-O" ? "action" : "success";
}

export function getDepartmentChipVariant(
  department: JobDepartment,
): StatusChipProps["variant"] {
  if (department === "รักสมุก") {
    return "revision";
  }

  if (department === "รอรับเข้าโรงงานสี") {
    return "warning";
  }

  return "neutral";
}

export function getWoodworkQueueJobs(): WorkerQueueJob[] {
  return jobFixtures
    .filter((job) => job.currentDepartment === "ช่างไม้")
    .map((job) => toWorkerQueueJob(job, job.instructions.woodwork));
}

export function getColoringIntakeJobs(): ColoringIntakeJob[] {
  return jobFixtures
    .filter((job) => job.currentDepartment === "รอรับเข้าโรงงานสี")
    .map((job) => ({
      ...toWorkerQueueJob(job, job.instructions.coloring),
      arrivalGroup: job.urgent ? "ด่วน / ใกล้ส่ง" : "วันนี้",
      fromSource: job.id === "JOB-O-0270" ? "จากรักสมุก" : "จากช่างไม้",
    }));
}

export function getColoringQueueJobs(): WorkerQueueJob[] {
  return jobFixtures
    .filter((job) => job.currentDepartment === "ฝ่ายสี")
    .map((job) => toWorkerQueueJob(job, job.instructions.coloring));
}

export function getRakSamukWorkerWorksForUser(
  userId: string,
): RakSamukWorkerVisibleWork[] {
  return getRakSamukWorkerVisibleWork(rakSamukWorkInputs, userId);
}

export function getRakSamukWorkerWork(
  workId: string,
  userId: string,
): RakSamukWorkerVisibleWork | undefined {
  return getRakSamukWorkerWorksForUser(userId).find(
    (work) => work.workId === workId,
  );
}

export function getRakSamukWorkInput(
  workId: string,
): RakSamukWorkerWorkInput | undefined {
  return rakSamukWorkInputs.find((work) => work.workId === workId);
}

export function getReceiveBackPreview() {
  return receiveRakSamukWorkBack({
    quantity: rakSamukWorkInputs[0].quantity,
    rakSamukWorkId: rakSamukWorkInputs[0].workId,
  });
}

function toWorkerQueueJob(
  job: JobFixture,
  instructionPreview: string,
): WorkerQueueJob {
  return {
    ageLabel: job.departmentAgeLabel,
    currentStatus: job.status,
    deliveryDate: job.deliveryDate,
    disabledReasons: job.waitingMaterial
      ? {
          กำลังส่งไปแกะสลัก: "งานนี้รอวัตถุดิบ",
          ส่งไปสี: "งานนี้รอวัตถุดิบ",
          ส่งไปรักสมุก: "งานนี้รอวัตถุดิบ",
          "งานเสร็จ/พร้อมส่ง": "งานนี้รอวัตถุดิบ",
        }
      : undefined,
    id: job.id,
    imageAlt: job.imageAlt,
    imageSrc: job.imageSrc,
    instructionPreview,
    quantity: job.quantity,
    sourceCode: job.sourceCode,
    sourceLabel: job.sourceLabel,
    urgent: job.urgent,
    waitingMaterial: job.waitingMaterial,
    workName: job.workName,
  };
}
