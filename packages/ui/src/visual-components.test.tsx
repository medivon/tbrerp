import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./empty-state";
import { NoAccessState } from "./no-access-state";
import { QueueLauncherCard } from "./queue-launcher-card";
import { StaleStateBanner } from "./stale-state-banner";
import { WorkPreviewCard } from "./work-preview-card";

describe("THAIBORAN visual components", () => {
  it("renders the shared queue launcher without owning navigation", () => {
    render(
      <QueueLauncherCard
        actionLabel="เปิดรายการ"
        count={6}
        statusLabel="ต้องติดตาม"
        statusVariant="warning"
        title="คิวตัวอย่าง"
        unit="รายการ"
      />,
    );

    expect(screen.getByText("คิวตัวอย่าง")).toBeTruthy();
    expect(screen.getByText("6")).toBeTruthy();
    expect(screen.getByText("เปิดรายการ")).toBeTruthy();
  });

  it("keeps no-access state limited to the approved message and action", () => {
    render(
      <NoAccessState action={<a href="/personal">กลับหน้าแรกของฉัน</a>} />,
    );

    expect(screen.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeTruthy();
    expect(screen.getByText("กลับหน้าแรกของฉัน").getAttribute("href")).toBe(
      "/personal",
    );
  });

  it("uses the approved stale-state message by default", () => {
    render(<StaleStateBanner />);

    expect(screen.getByText("ข้อมูลมีการเปลี่ยนแปลง กรุณารีเฟรช")).toBeTruthy();
  });

  it("renders empty and preview states from caller-provided safe content only", () => {
    render(
      <>
        <EmptyState title="ไม่มีรายการตามตัวกรองนี้" />
        <WorkPreviewCard
          chips={[{ label: "พร้อมใช้งาน", variant: "success" }]}
          metadata={[{ emphasis: true, value: "REF-SAFE-001" }]}
          title="รายการตัวอย่าง"
        />
      </>,
    );

    expect(screen.getByText("ไม่มีรายการตามตัวกรองนี้")).toBeTruthy();
    expect(screen.getByText("รายการตัวอย่าง")).toBeTruthy();
    expect(screen.getByText("REF-SAFE-001")).toBeTruthy();
  });
});
