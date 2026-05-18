"use client";

import Link from "next/link";
import { useState } from "react";
import { Palette } from "lucide-react";
import { simulateProductionAction } from "@thaiboran/domain";
import { Button, EmptyState, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  getColoringIntakeJobs,
  getColoringQueueJobs,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import { WorkerJobCard } from "@/features/worker/components/worker-job-card";
import type { FixtureUser } from "@/shared/fixtures/users";

export function ColoringWorkQueue({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const jobs = getColoringQueueJobs();
  const intakeCount = getColoringIntakeJobs().length;
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="grid gap-5">
      <SurfaceCard
        className="border-shell-border bg-shell text-shell-foreground"
        padding="md"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-shell-muted">คิวฝ่ายสี</p>
            <h2 className="text-2xl font-extrabold">งานที่ต้องทำ</h2>
          </div>
          <Button asChild variant="outline">
            <Link href={jobHref(jobRoutes.coloringIntake, currentUser)}>
              <Palette aria-hidden className="mr-2 h-4 w-4" />
              รอรับเข้าโรงงานสี
            </Link>
          </Button>
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
          <StatusChip variant="warning">รอรับเข้า {intakeCount} งาน</StatusChip>
        </div>
      </SurfaceCard>

      {result ? (
        <SurfaceCard className="border-[#B9D1FF] bg-[#E0ECFF]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#1D4ED8]">{result}</p>
          {result.includes("งานเสร็จ/พร้อมส่ง") ? (
            <p className="mt-1 text-sm font-semibold leading-6 text-[#1D4ED8]">
              JOB-O ที่เสร็จแล้วไปที่แอดมิน รอสร้างรอบจัดส่ง
              ไม่ส่งตรงให้ฝ่ายจัดส่ง
            </p>
          ) : null}
        </SurfaceCard>
      ) : null}

      {jobs.length > 0 ? (
        <section aria-label="รายการงานฝ่ายสี" className="grid gap-4">
          {jobs.map((job) => (
            <WorkerJobCard
              actions={[
                {
                  href: jobHref(jobRoutes.detail(job.id), currentUser),
                  label: "เปิดงาน",
                },
                { label: "รับงาน" },
                { label: "รอวัตถุดิบ" },
                {
                  href: jobHref(jobRoutes.rakSamuk, currentUser),
                  label: "ส่งไปรักสมุก",
                },
                { label: "งานเสร็จ/พร้อมส่ง" },
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
              <Link href={jobHref(jobRoutes.coloringIntake, currentUser)}>
                ดูรอรับเข้าโรงงานสี
              </Link>
            </Button>
          }
          title="ไม่มีงานที่ต้องทำในฝ่ายสีตอนนี้"
        />
      )}

      <SurfaceCard padding="md">
        <p className="text-sm font-bold text-foreground">ประวัติงานของฉัน</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          พื้นที่ประวัติงานฝ่ายสีเป็น foundation เท่านั้น
          ยังไม่เปิดรายละเอียดจริง
        </p>
      </SurfaceCard>
    </div>
  );
}
