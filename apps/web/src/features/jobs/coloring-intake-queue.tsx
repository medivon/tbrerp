"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { simulateProductionAction } from "@thaiboran/domain";
import { Button, EmptyState, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  getColoringIntakeJobs,
  getSourceChipVariant,
  type ColoringIntakeJob,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function ColoringIntakeQueue({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const jobs = getColoringIntakeJobs();
  const [result, setResult] = useState<string | null>(null);
  const groups = ["ด่วน / ใกล้ส่ง", "วันนี้", "ก่อนหน้า"] as const;

  return (
    <div className="grid gap-5">
      <SurfaceCard className="border-[#FAD980] bg-[#FEF3C7]" padding="md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-[#92400E]">
              คิว staging ก่อนเข้าฝ่ายสี
            </p>
            <h2 className="text-2xl font-extrabold text-[#17231F]">
              รอรับเข้าโรงงานสี
            </h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#92400E]">
              รายการนี้ยังไม่ใช่งาน active ฝ่ายสี ต้องกดรับเข้าโรงงานสีก่อน
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={jobHref(jobRoutes.coloring, currentUser)}>
              ไปงานที่ต้องทำ
            </Link>
          </Button>
        </div>
      </SurfaceCard>

      {result ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#166534]">{result}</p>
        </SurfaceCard>
      ) : null}

      {jobs.length > 0 ? (
        <section className="grid gap-5" aria-label="งานรอรับเข้าโรงงานสี">
          {groups.map((group) => {
            const groupJobs = jobs.filter((job) => job.arrivalGroup === group);

            if (groupJobs.length === 0) {
              return null;
            }

            return (
              <div className="grid gap-3" key={group}>
                <h3 className="text-base font-extrabold text-foreground">
                  {group}
                </h3>
                <div className="grid gap-4">
                  {groupJobs.map((job) => (
                    <IntakeCard
                      currentUser={currentUser}
                      job={job}
                      key={job.id}
                      onReceive={() => {
                        const actionResult =
                          simulateProductionAction("รับเข้าโรงงานสี");
                        setResult(actionResult.message);
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <EmptyState
          action={
            <Button asChild size="sm" variant="outline">
              <Link href={jobHref(jobRoutes.coloring, currentUser)}>
                ดูงานที่ต้องทำ
              </Link>
            </Button>
          }
          title="ไม่มีงานรอรับเข้าโรงงานสี"
        />
      )}
    </div>
  );
}

function IntakeCard({
  currentUser,
  job,
  onReceive,
}: {
  currentUser: FixtureUser;
  job: ColoringIntakeJob;
  onReceive: () => void;
}) {
  return (
    <SurfaceCard className="overflow-hidden p-0" padding="none">
      <article className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative aspect-[16/10] min-h-[190px] bg-subtle md:aspect-auto">
          <Image
            alt={job.imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 220px, 100vw"
            src={job.imageSrc}
          />
        </div>
        <div className="grid gap-4 p-4">
          <div className="flex flex-wrap gap-2">
            <StatusChip variant={getSourceChipVariant(job)}>
              {job.sourceCode} / {job.sourceLabel}
            </StatusChip>
            <StatusChip>{job.id}</StatusChip>
            <StatusChip variant="warning">{job.fromSource}</StatusChip>
            {job.urgent ? (
              <StatusChip variant="danger">งานด่วน</StatusChip>
            ) : null}
          </div>
          <div>
            <h2 className="text-xl font-extrabold leading-8 text-foreground">
              {job.workName}
            </h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
              จำนวน {job.quantity} ชิ้น
              {job.deliveryDate ? ` • กำหนดส่ง ${job.deliveryDate}` : ""}
              {` • ${job.ageLabel}`}
            </p>
          </div>
          <p className="rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-6">
            {job.instructionPreview}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button onClick={onReceive} size="lg" type="button">
              รับเข้าโรงงานสี
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={jobHref(jobRoutes.detail(job.id), currentUser)}>
                เปิดงาน
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </SurfaceCard>
  );
}
