import { describe, expect, it } from "vitest";

import {
  canApproveRakSamukPrice,
  canReceiveRakSamukBack,
  canRakSamukWorkerMoveWorkflow,
  getRakSamukWorkerVisibleWork,
  receiveRakSamukWorkBack,
  simulateProductionAction,
  submitRakSamukProposedPrice,
  type RakSamukWorkerWorkInput,
} from "./job-workflow";

const rakSamukWorks: RakSamukWorkerWorkInput[] = [
  {
    assignedWorkerId: "rak-worker-somchai",
    imageAlt: "ลายรักสมุกบนหน้าบานตู้",
    imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
    instructionSummary: "ลายดอกพิกุลหน้าบาน",
    priceState: { kind: "missing" },
    quantity: 2,
    urgent: true,
    workId: "RS-WORK-001",
    workName: "ตู้โชว์ไม้สักแกะลาย",
  },
  {
    assignedWorkerId: "rak-worker-malee",
    imageAlt: "ลายรักสมุกบนโต๊ะ",
    imageSrc: "/sector-1-thumbnails/carved-console-table.png",
    instructionSummary: "ลายเครือเถาขอบโต๊ะ",
    priceState: { kind: "approved", perPieceBaht: 420 },
    quantity: 1,
    workId: "RS-WORK-002",
    workName: "โต๊ะคอนโซลรักสมุก",
  },
];

describe("Job / worker / Rak Samuk domain helpers", () => {
  it("returns only the assigned Rak Samuk worker's own work and own price state", () => {
    const visibleWork = getRakSamukWorkerVisibleWork(
      rakSamukWorks,
      "rak-worker-somchai",
    );

    expect(visibleWork).toEqual([
      expect.objectContaining({
        ownPriceState: {
          kind: "missing",
          label: "ไม่มีราคา / ให้แจ้งราคา",
        },
        workId: "RS-WORK-001",
      }),
    ]);
    expect(JSON.stringify(visibleWork)).not.toContain("RS-WORK-002");
    expect(JSON.stringify(visibleWork)).not.toMatch(
      /customer|Order ID|standardRate|payout|Management Log|Audit Log/i,
    );
  });

  it("does not allow Rak Samuk Worker to move workflow status", () => {
    expect(canRakSamukWorkerMoveWorkflow("rak-samuk-worker")).toBe(false);
    expect(canRakSamukWorkerMoveWorkflow("owner")).toBe(true);
  });

  it("submits proposed price per piece for own assigned work", () => {
    const result = submitRakSamukProposedPrice({
      perPieceBaht: 500,
      submittedByWorkerId: "rak-worker-somchai",
      work: rakSamukWorks[0],
    });

    expect(result).toEqual({
      label: "ส่งราคาแล้ว / รออนุมัติ",
      perPieceBaht: 500,
      status: "submitted",
      totalPreviewBaht: 1000,
    });
  });

  it("blocks proposed price for another worker's work", () => {
    expect(
      submitRakSamukProposedPrice({
        perPieceBaht: 500,
        submittedByWorkerId: "rak-worker-somchai",
        work: rakSamukWorks[1],
      }),
    ).toMatchObject({
      status: "blocked",
    });
  });

  it("routes receive-back to coloring intake without evidence or destination picker", () => {
    expect(
      receiveRakSamukWorkBack({
        quantity: 2,
        rakSamukWorkId: "RS-WORK-001",
      }),
    ).toEqual({
      destinationPickerShown: false,
      evidenceRequired: false,
      nextDepartment: "รอรับเข้าโรงงานสี",
      nextStatus: "รอรับเข้าโรงงานสี",
      payableItem: {
        created: true,
        quantity: 2,
        status: "ยังไม่มีราคา",
        workId: "RS-WORK-001",
      },
    });
  });

  it("keeps Owner/Manager as price approvers and excludes Finance", () => {
    expect(canApproveRakSamukPrice("owner")).toBe(true);
    expect(canApproveRakSamukPrice("manager")).toBe(true);
    expect(canApproveRakSamukPrice("finance")).toBe(false);
  });

  it("allows receive-back for Coloring/Admin/Manager/Owner but excludes Woodwork", () => {
    expect(canReceiveRakSamukBack("coloring")).toBe(true);
    expect(canReceiveRakSamukBack("admin-sales")).toBe(true);
    expect(canReceiveRakSamukBack("woodwork")).toBe(false);
  });

  it("marks production action simulation as memory-only", () => {
    expect(simulateProductionAction("รับงาน")).toEqual({
      action: "รับงาน",
      message: "รับงาน แสดงผลเฉพาะในหน้านี้ ยังไม่บันทึกลงฐานข้อมูล",
      persisted: false,
      resultingLabel: "รับงาน",
    });
    expect(simulateProductionAction("งานเสร็จ/พร้อมส่ง")).toMatchObject({
      persisted: false,
      resultingLabel: "รอสร้างรอบจัดส่ง",
    });
  });
});
