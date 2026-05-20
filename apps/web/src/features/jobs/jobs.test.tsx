import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JobTabs } from "@/features/jobs/components/job-tabs";
import { ColoringWorkQueue } from "@/features/jobs/coloring-work-queue";
import { getReceiveBackPreview } from "@/features/jobs/fixtures/jobs";
import { JobDetail } from "@/features/jobs/job-detail";
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

describe("Job / Worker / Rak Samuk repair", () => {
  it("renders an image-led Job overview without finance-sensitive fields", () => {
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
    expect(screen.queryByText(/ตัวอย่าง|SAMPLE/)).toBeNull();
  });

  it("filters the Job overview by search, source, and department state", () => {
    render(<JobOverview currentUser={adminUser} />);

    fireEvent.change(screen.getByLabelText("ค้นหา Job"), {
      target: { value: "JOB-P-0107" },
    });

    expect(screen.getAllByText("JOB-P-0107").length).toBeGreaterThan(0);
    expect(screen.queryByText("JOB-O-0241")).toBeNull();

    fireEvent.change(screen.getByLabelText("ค้นหา Job"), {
      target: { value: "" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "ผลิตเข้าสต๊อก (JOB-P)" }),
    );

    expect(screen.getAllByText("JOB-P-0107").length).toBeGreaterThan(0);
    expect(screen.queryByText("JOB-O-0241")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "ทั้งหมด" }));
    fireEvent.click(screen.getByRole("button", { name: "รอวัตถุดิบ" }));

    expect(screen.getAllByText("JOB-O-0250").length).toBeGreaterThan(0);
    expect(screen.queryByText("JOB-P-0107")).toBeNull();
  });

  it("keeps Woodwork worker visibility free of customer, Order, finance, payout, and restricted log data", () => {
    render(<WoodworkQueue currentUser={woodworkUser} />);

    expect(screen.getByRole("heading", { name: "งานที่ต้องทำ" })).toBeTruthy();
    expect(screen.getByText("JOB-O-0250")).toBeTruthy();
    expect(screen.queryByText(/คุณมาลี|ORD-2569|Payment|ชำระเงิน/)).toBeNull();
    expect(
      screen.queryByText(
        /ต้นทุน|กำไร|payout|ราคาจ่าย|Management Log|Audit Log/i,
      ),
    ).toBeNull();
  });

  it("keeps worker action surfaces business-facing", () => {
    render(<WoodworkQueue currentUser={woodworkUser} />);

    fireEvent.click(screen.getAllByRole("button", { name: "รับงาน" })[0]);

    expect(screen.getByText("รับงานแล้ว")).toBeTruthy();
    expect(screen.getAllByText("รอวัตถุดิบ").length).toBeGreaterThan(0);
    expect(screen.queryByText(/fixture|ฐานข้อมูล|in-memory/i)).toBeNull();
  });

  it("requires a note before using the waiting-material worker action", () => {
    render(<WoodworkQueue currentUser={woodworkUser} />);

    expect(
      (
        screen.getAllByRole("button", {
          name: "ส่งไปรักสมุก",
        })[0] as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(screen.getAllByText("งานนี้รอวัตถุดิบ").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /ส่งไปรักสมุก/ }).length).toBe(
      1,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "รอวัตถุดิบ" })[1]);

    expect(screen.getByLabelText("หมายเหตุรอวัตถุดิบ *")).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: "บันทึกรอวัตถุดิบ",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(screen.queryByText("บันทึกรอวัตถุดิบแล้ว")).toBeNull();

    fireEvent.change(screen.getByLabelText("หมายเหตุรอวัตถุดิบ *"), {
      target: { value: "รอไม้บัว" },
    });
    fireEvent.click(screen.getByRole("button", { name: "บันทึกรอวัตถุดิบ" }));

    expect(screen.getByText(/บันทึกรอวัตถุดิบแล้ว/)).toBeTruthy();
    expect(screen.getByText(/หมายเหตุ: รอไม้บัว/)).toBeTruthy();
  });

  it("routes completed Coloring JOB-O visually to admin waiting shipment, not Delivery Team", () => {
    render(<ColoringWorkQueue currentUser={coloringUser} />);

    fireEvent.click(screen.getByRole("button", { name: "งานเสร็จ/พร้อมส่ง" }));
    fireEvent.click(
      screen.getByRole("button", { name: "ยืนยันงานเสร็จ/พร้อมส่ง" }),
    );

    expect(screen.getAllByText(/รอสร้างรอบจัดส่ง/).length).toBeGreaterThan(0);
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

  it("hides missing-permission Job workspace navigation and receive-back action", () => {
    const { unmount } = render(
      <JobTabs activeTab="rak-samuk" currentUser={woodworkUser} />,
    );

    expect(screen.getByRole("link", { name: "คิวช่างไม้" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "รักสมุก" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "งานทั้งหมด" })).toBeNull();
    expect(
      screen.queryByRole("link", { name: "รอรับเข้าโรงงานสี" }),
    ).toBeNull();

    unmount();
    render(<RakSamukAssignment currentUser={woodworkUser} />);

    expect(
      screen.queryByRole("link", { name: "รับงานรักสมุกกลับ" }),
    ).toBeNull();
  });

  it("hides department shortcuts the current worker cannot access on Job detail", () => {
    render(<JobDetail currentUser={woodworkUser} jobId="JOB-O-0250" />);

    expect(screen.getByRole("link", { name: /เปิดคิวช่างไม้/ })).toBeTruthy();
    expect(
      (
        screen.getByRole("button", {
          name: /ส่งไปรักสมุก/,
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(screen.getByText("งานนี้รอวัตถุดิบ")).toBeTruthy();
    expect(
      screen.queryByRole("link", { name: /เปิดรอรับเข้าโรงงานสี/ }),
    ).toBeNull();
  });

  it("does not render status-moving controls for Rak Samuk Worker", () => {
    render(
      <RakSamukWorkerWorkList
        currentUser={rakWorkerUser}
        workId="RS-WORK-001"
      />,
    );

    expect(
      screen.getByText(/ดูรายละเอียดงานและราคาของตัวเองได้เท่านั้น/),
    ).toBeTruthy();
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
    expect(screen.getByText("กรุณากรอกราคา")).toBeTruthy();

    fireEvent.change(screen.getByLabelText("กรอกราคาต่อชิ้น"), {
      target: { value: "500" },
    });
    fireEvent.click(screen.getByRole("button", { name: "ส่งราคา" }));
    fireEvent.click(screen.getByRole("button", { name: "ยืนยันส่งราคา" }));

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
    expect(screen.queryByText(/Finance ไม่ใช่ผู้อนุมัติราคา/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "อนุมัติราคา" }));
    expect(
      screen.getByText("กรุณาเลือกว่าจะอัปเดตราคามาตรฐานหรือไม่"),
    ).toBeTruthy();
    fireEvent.click(screen.getByLabelText("ไม่อัปเดตราคามาตรฐาน"));
    fireEvent.click(screen.getByRole("button", { name: "อนุมัติราคา" }));
    fireEvent.click(screen.getByRole("button", { name: "ยืนยันอนุมัติราคา" }));
    expect(screen.getByText("อนุมัติราคาแล้ว")).toBeTruthy();
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
