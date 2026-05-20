"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  simulateProductionAction,
  type ProductionAction,
} from "@thaiboran/domain";
import { EmptyState, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  getWoodworkQueueJobs,
  type WorkerQueueJob,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import { WorkerJobCard } from "@/features/worker/components/worker-job-card";
import type { FixtureUser } from "@/shared/fixtures/users";

type WorkerFilter = "ทั้งหมด" | "งานด่วน" | "รอวัตถุดิบ";

export function WoodworkQueue({ currentUser }: { currentUser: FixtureUser }) {
  const [filter, setFilter] = useState<WorkerFilter>("ทั้งหมด");
  const [jobs, setJobs] = useState<WorkerQueueJob[]>(() =>
    getWoodworkQueueJobs(),
  );
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
          <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-shell-border bg-shell-surface px-4 text-sm font-bold text-shell-muted">
            <RefreshCw aria-hidden className="h-4 w-4" />
            ข้อมูลล่าสุด
          </span>
        </div>
      </SurfaceCard>

      {result ? (
        <SurfaceCard className="border-[#B9D1FF] bg-[#E0ECFF]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#1D4ED8]">{result}</p>
        </SurfaceCard>
      ) : null}

      {visibleJobs.length > 0 ? (
        <section aria-label="รายการงานช่างไม้" className="grid gap-4">
          {visibleJobs.map((job) => (
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
              onAction={(action, jobId, note) => {
                handleLocalAction(action, jobId, note);
              }}
            />
          ))}
        </section>
      ) : (
        <EmptyState title="ไม่มีงานที่ต้องทำตอนนี้" />
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
              ? applyWorkerActionToJob(job, action, actionResult.resultingLabel)
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

function applyWorkerActionToJob(
  job: WorkerQueueJob,
  action: ProductionAction,
  resultingLabel: string,
): WorkerQueueJob {
  if (action === "รอวัตถุดิบ") {
    return {
      ...job,
      currentStatus: resultingLabel,
      disabledReasons: {
        กำลังส่งไปแกะสลัก: "งานนี้รอวัตถุดิบ",
        ส่งไปสี: "งานนี้รอวัตถุดิบ",
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
