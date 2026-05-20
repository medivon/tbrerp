"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Palette } from "lucide-react";
import {
  simulateProductionAction,
  type ProductionAction,
} from "@thaiboran/domain";
import { Button, EmptyState, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  getColoringIntakeJobs,
  getColoringQueueJobs,
  type WorkerQueueJob,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import { WorkerJobCard } from "@/features/worker/components/worker-job-card";
import type { FixtureUser } from "@/shared/fixtures/users";

type WorkerFilter = "ทั้งหมด" | "งานด่วน" | "รอวัตถุดิบ";

export function ColoringWorkQueue({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const [filter, setFilter] = useState<WorkerFilter>("ทั้งหมด");
  const [jobs, setJobs] = useState<WorkerQueueJob[]>(() =>
    getColoringQueueJobs(),
  );
  const intakeCount = getColoringIntakeJobs().length;
  const [result, setResult] = useState<string | null>(null);
  const visibleJobs = useMemo(
    () =>
      jobs.filter((job) =>
        filter === "ทั้งหมด"
          ? true
          : filter === "งานด่วน"
            ? job.urgent
            : job.waitingMaterial,
      ),
    [filter, jobs],
  );

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
          {(["ทั้งหมด", "งานด่วน", "รอวัตถุดิบ"] as const).map((filterName) => (
            <button
              aria-pressed={filter === filterName}
              className={`min-h-10 cursor-pointer rounded-full border px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                filter === filterName
                  ? "border-accent bg-accent/15 text-shell-foreground"
                  : "border-shell-border bg-shell-surface text-shell-muted hover:border-accent/70 hover:text-shell-foreground"
              }`}
              key={filterName}
              onClick={() => setFilter(filterName)}
              type="button"
            >
              {filterName}
            </button>
          ))}
          <StatusChip variant="warning">รอรับเข้า {intakeCount} งาน</StatusChip>
        </div>
      </SurfaceCard>

      {result ? (
        <SurfaceCard className="border-[#B9D1FF] bg-[#E0ECFF]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#1D4ED8]">{result}</p>
          {result.includes("รอสร้างรอบจัดส่ง") ? (
            <p className="mt-1 text-sm font-semibold leading-6 text-[#1D4ED8]">
              JOB-O ที่เสร็จแล้วไปที่แอดมิน รอสร้างรอบจัดส่ง
              ไม่ส่งตรงให้ฝ่ายจัดส่ง
            </p>
          ) : null}
        </SurfaceCard>
      ) : null}

      {visibleJobs.length > 0 ? (
        <section aria-label="รายการงานฝ่ายสี" className="grid gap-4">
          {visibleJobs.map((job) => (
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
              onAction={(action, jobId, note) => {
                handleLocalAction(action, jobId, note);
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
    </div>
  );

  function handleLocalAction(
    action: ProductionAction,
    jobId: string,
    note?: string,
  ) {
    const actionResult = simulateProductionAction(action);

    setJobs((currentJobs) =>
      actionResult.removesFromCurrentQueue
        ? currentJobs.filter((job) => job.id !== jobId)
        : currentJobs.map((job) =>
            job.id === jobId
              ? applyColoringActionToJob(
                  job,
                  action,
                  actionResult.resultingLabel,
                )
              : job,
          ),
    );
    setResult(
      note
        ? `${actionResult.message} • หมายเหตุ: ${note}`
        : actionResult.message,
    );
  }
}

function applyColoringActionToJob(
  job: WorkerQueueJob,
  action: ProductionAction,
  resultingLabel: string,
): WorkerQueueJob {
  if (action === "รอวัตถุดิบ") {
    return {
      ...job,
      currentStatus: resultingLabel,
      disabledReasons: {
        "งานเสร็จ/พร้อมส่ง": "งานนี้รอวัตถุดิบ",
        ส่งไปรักสมุก: "งานนี้รอวัตถุดิบ",
      },
      waitingMaterial: true,
    };
  }

  return {
    ...job,
    currentStatus: resultingLabel,
  };
}
