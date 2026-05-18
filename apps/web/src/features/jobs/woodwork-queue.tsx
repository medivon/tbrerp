"use client";

import Link from "next/link";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { simulateProductionAction } from "@thaiboran/domain";
import { Button, EmptyState, StatusChip, SurfaceCard } from "@thaiboran/ui";

import { getWoodworkQueueJobs } from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import { WorkerJobCard } from "@/features/worker/components/worker-job-card";
import type { FixtureUser } from "@/shared/fixtures/users";

export function WoodworkQueue({ currentUser }: { currentUser: FixtureUser }) {
  const jobs = getWoodworkQueueJobs();
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="grid gap-5">
      <SurfaceCard
        className="border-shell-border bg-shell text-shell-foreground"
        padding="md"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-shell-muted">คิวช่างไม้</p>
            <h2 className="text-2xl font-extrabold">งานที่ต้องทำ</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="neutral">{jobs.length} งาน</StatusChip>
            <StatusChip variant="danger">
              งานด่วน {jobs.filter((job) => job.urgent).length}
            </StatusChip>
            <StatusChip variant="warning">
              รอวัตถุดิบ {jobs.filter((job) => job.waitingMaterial).length}
            </StatusChip>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["ทั้งหมด", "งานด่วน", "รอวัตถุดิบ"].map((filter) => (
            <button
              className="min-h-10 cursor-pointer rounded-full border border-shell-border bg-shell-surface px-4 text-sm font-bold text-shell-muted transition hover:border-accent/70 hover:text-shell-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              key={filter}
              type="button"
            >
              {filter}
            </button>
          ))}
          <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-shell-border bg-shell-surface px-4 text-sm font-bold text-shell-muted">
            <RefreshCw aria-hidden className="h-4 w-4" />
            fixture ล่าสุด
          </span>
        </div>
      </SurfaceCard>

      {result ? (
        <SurfaceCard className="border-[#B9D1FF] bg-[#E0ECFF]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#1D4ED8]">{result}</p>
        </SurfaceCard>
      ) : null}

      {jobs.length > 0 ? (
        <section aria-label="รายการงานช่างไม้" className="grid gap-4">
          {jobs.map((job) => (
            <WorkerJobCard
              actions={[
                {
                  href: jobHref(jobRoutes.detail(job.id), currentUser),
                  label: "เปิดงาน",
                },
                { label: "รับงาน" },
                { label: "รอวัตถุดิบ" },
                { label: "ส่งไปสี" },
                {
                  href: jobHref(jobRoutes.rakSamuk, currentUser),
                  label: "ส่งไปรักสมุก",
                },
                { label: "กำลังส่งไปแกะสลัก" },
              ]}
              job={job}
              key={job.id}
              onAction={(action) => {
                const actionResult = simulateProductionAction(action);
                setResult(actionResult.message);
              }}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          action={
            <Button asChild size="sm" variant="outline">
              <Link href={jobHref(jobRoutes.overview, currentUser)}>
                ดูภาพรวมงาน
              </Link>
            </Button>
          }
          title="ไม่มีงานที่ต้องทำตอนนี้"
        />
      )}

      <SurfaceCard padding="md">
        <p className="text-sm font-bold text-foreground">ประวัติงานของฉัน</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          พื้นที่ประวัติงานช่างไม้เป็น foundation เท่านั้น
          ยังไม่เปิดรายละเอียดจริง
        </p>
      </SurfaceCard>
    </div>
  );
}
