import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ColoringWorkQueue } from "@/features/jobs/coloring-work-queue";
import { getReceiveBackPreview } from "@/features/jobs/fixtures/jobs";
import { JobOverview } from "@/features/jobs/job-overview";
import { WoodworkQueue } from "@/features/jobs/woodwork-queue";
import { RakSamukAssignment } from "@/features/rak-samuk/rak-samuk-assignment";
import { RakSamukMissingPrice } from "@/features/rak-samuk/rak-samuk-missing-price";
import { RakSamukPriceApproval } from "@/features/rak-samuk/rak-samuk-price-approval";
import { RakSamukWorkerWorkList } from "@/features/rak-samuk/rak-samuk-worker-work-list";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canApproveRakSamukPrice } from "@/shared/permissions/access";

const adminUser = getFixtureUser("admin-sales");
const ownerUser = getFixtureUser("owner");
const financeUser = getFixtureUser("finance");
const woodworkUser = getFixtureUser("woodwork");
const coloringUser = getFixtureUser("coloring");
const rakWorkerUser = getFixtureUser("rak-samuk-worker");

describe("Job / Worker / Rak Samuk foundation", () => {
  it("renders an image-led active Job overview without finance-sensitive fields", () => {
    render(<JobOverview currentUser={adminUser} />);

    expect(screen.getByRole("heading", { name: "งานกำลังผลิต" })).toBeTruthy();
    expect(screen.getAllByText("JOB-O-0241").length).toBeGreaterThan(0);
    expect(screen.getAllByText("JOB-P / ผลิตเข้าสต๊อก").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getAllByRole("link", { name: "เปิด Job" }).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText(/ต้นทุน|กำไร|payout|profit|cost/i)).toBeNull();
  });

  it("keeps Woodwork worker visibility free of customer, Order, finance, payout, and restricted log data", () => {
    render(<WoodworkQueue currentUser={woodworkUser} />);

    expect(screen.getByRole("heading", { name: "งานที่ต้องทำ" })).toBeTruthy();
    expect(screen.getByText("JOB-O-0250")).toBeTruthy();
    expect(
      screen.queryByText(/ลูกค้าตัวอย่าง|ORD-SAMPLE|Payment|ชำระเงิน/),
    ).toBeNull();
    expect(
      screen.queryByText(
        /ต้นทุน|กำไร|payout|ราคาจ่าย|Management Log|Audit Log/i,
      ),
    ).toBeNull();
  });

  it("keeps worker action surfaces in-memory only", () => {
    render(<WoodworkQueue currentUser={woodworkUser} />);

    fireEvent.click(screen.getAllByRole("button", { name: "รับงาน" })[0]);

    expect(
      screen.getByText("รับงาน แสดงผลเฉพาะในหน้านี้ ยังไม่บันทึกลงฐานข้อมูล"),
    ).toBeTruthy();
    expect(screen.getAllByText("รอวัตถุดิบ").length).toBeGreaterThan(0);
  });

  it("routes completed Coloring JOB-O visually to admin waiting shipment, not Delivery Team", () => {
    render(<ColoringWorkQueue currentUser={coloringUser} />);

    fireEvent.click(screen.getByRole("button", { name: "งานเสร็จ/พร้อมส่ง" }));

    expect(screen.getByText(/รอสร้างรอบจัดส่ง/)).toBeTruthy();
    expect(screen.queryByText("Delivery Team")).toBeNull();
  });

  it("shows Rak Samuk Worker only assigned work and own price state", () => {
    render(<RakSamukWorkerWorkList currentUser={rakWorkerUser} />);

    expect(screen.getByText("ตู้โชว์รักสมุกสองบาน")).toBeTruthy();
    expect(screen.getByText("ราคางานของฉัน 450 บาท/ชิ้น")).toBeTruthy();
    expect(screen.queryByText("งานของช่างคนอื่น")).toBeNull();
    expect(
      screen.queryByText(/ราคามาตรฐาน|standard rate|payout|Order ID/i),
    ).toBeNull();
  });

  it("requires immediate Rak Samuk worker selection before send and hides rates", () => {
    render(<RakSamukAssignment currentUser={adminUser} />);

    expect(
      (
        screen.getByRole("button", {
          name: "ส่งงานให้ช่าง",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(screen.queryByText(/บาท\/ชิ้น|ราคามาตรฐาน/)).toBeNull();

    fireEvent.change(screen.getByLabelText("ช่างรักสมุก"), {
      target: { value: "rak-samuk-worker" },
    });
    fireEvent.click(screen.getByRole("button", { name: "ส่งงานให้ช่าง" }));

    expect(
      screen.getByRole("dialog", { name: "ยืนยันส่งงานรักสมุก" }),
    ).toBeTruthy();
  });

  it("does not render workflow-moving controls for Rak Samuk Worker", () => {
    render(
      <RakSamukWorkerWorkList
        currentUser={rakWorkerUser}
        workId="RS-WORK-001"
      />,
    );

    expect(screen.getByText(/ไม่ย้ายสถานะ workflow/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "ส่งไปสี" })).toBeNull();
    expect(
      screen.queryByRole("button", { name: "งานเสร็จ/พร้อมส่ง" }),
    ).toBeNull();
  });

  it("uses ขอเสนอราคา as a per-piece worker proposal and shows submitted state", () => {
    render(
      <RakSamukMissingPrice currentUser={rakWorkerUser} workId="RS-WORK-001" />,
    );

    expect(screen.getAllByText("ขอเสนอราคา").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ราคาต่อชิ้น/).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "ส่งราคา" }));

    expect(
      screen.getAllByText("ส่งราคาแล้ว / รออนุมัติ").length,
    ).toBeGreaterThan(0);
  });

  it("shows Owner/Manager price approval and keeps Finance out of approver role", () => {
    render(<RakSamukPriceApproval currentUser={ownerUser} />);

    expect(screen.getByRole("heading", { name: "อนุมัติราคา" })).toBeTruthy();
    expect(screen.getByText("ขอเสนอราคา")).toBeTruthy();
    expect(screen.getByText("1,000 บาท")).toBeTruthy();
    expect(canApproveRakSamukPrice(ownerUser)).toBe(true);
    expect(canApproveRakSamukPrice(financeUser)).toBe(false);
    expect(screen.getByText(/Finance ไม่ใช่ผู้อนุมัติราคา/)).toBeTruthy();
  });

  it("keeps receive-back destination fixed to coloring intake", () => {
    expect(getReceiveBackPreview()).toMatchObject({
      destinationPickerShown: false,
      evidenceRequired: false,
      nextDepartment: "รอรับเข้าโรงงานสี",
      nextStatus: "รอรับเข้าโรงงานสี",
    });
  });
});
