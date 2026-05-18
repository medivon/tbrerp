"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button, PageHeader, StatusChip, SurfaceCard } from "@thaiboran/ui";

import { JobTabs } from "@/features/jobs/components/job-tabs";
import {
  getSourceChipVariant,
  rakSamukAssignmentFixtures,
  rakSamukWorkers,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function RakSamukAssignment({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const assignment = rakSamukAssignmentFixtures[0];
  const work = assignment.work;
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const selectedWorker = rakSamukWorkers.find(
    (worker) => worker.id === selectedWorkerId,
  );

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <Button asChild variant="outline">
            <Link href={jobHref(jobRoutes.rakSamukReceiveBack, currentUser)}>
              รับงานรักสมุกกลับ
            </Link>
          </Button>
        }
        description="ส่งงานให้ช่างรักสมุกต้องเลือกช่างทันที ถ้าไม่รู้ช่าง งานจะยังไม่ถูกส่ง"
        meta={<StatusChip variant="revision">เลือกช่างรักสมุก</StatusChip>}
        title="รักสมุก"
      />

      <JobTabs activeTab="rak-samuk" currentUser={currentUser} />

      {sentMessage ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#166534]">
            {sentMessage}
          </p>
        </SurfaceCard>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <SurfaceCard className="overflow-hidden" padding="none">
          <div className="grid gap-0 md:grid-cols-[240px_minmax(0,1fr)]">
            <div className="relative aspect-[16/10] min-h-[220px] bg-subtle md:aspect-auto">
              <Image
                alt={work.imageAlt}
                className="object-cover"
                fill
                sizes="(min-width: 768px) 240px, 100vw"
                src={work.imageSrc}
              />
            </div>
            <div className="grid content-start gap-4 p-5">
              <div className="flex flex-wrap gap-2">
                <StatusChip variant={getSourceChipVariant(work)}>
                  {work.sourceCode} / {work.sourceLabel}
                </StatusChip>
                <StatusChip>{work.id}</StatusChip>
                <StatusChip variant="revision">
                  {assignment.sourceDepartment}
                </StatusChip>
                {work.urgent ? (
                  <StatusChip variant="danger">งานด่วน</StatusChip>
                ) : null}
                {assignment.missingPriceSignal ? (
                  <StatusChip variant="warning">
                    ไม่มีราคา / ให้แจ้งราคา
                  </StatusChip>
                ) : null}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold leading-9 text-foreground">
                  {work.workName}
                </h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                  จำนวน {work.quantity} ชิ้น • รายละเอียดรักสมุก
                </p>
              </div>
              <p className="rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-6 text-foreground">
                {work.instructions.rakSamuk}
              </p>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard padding="md">
          <h2 className="text-lg font-extrabold text-foreground">
            เลือกช่างรักสมุก
          </h2>
          <label className="mt-4 grid gap-2 text-sm font-bold text-foreground">
            ช่างรักสมุก
            <select
              className="min-h-11 cursor-pointer rounded-md border border-border bg-surface px-3 text-sm font-semibold outline-none transition hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
              onChange={(event) => {
                setSelectedWorkerId(event.target.value);
                setConfirming(false);
              }}
              value={selectedWorkerId}
            >
              <option value="">ยังไม่เลือกช่าง</option>
              {rakSamukWorkers
                .filter((worker) => worker.active)
                .map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.displayName}
                  </option>
                ))}
            </select>
          </label>
          {selectedWorker ? (
            <p className="mt-2 rounded-md bg-subtle px-3 py-2 text-sm font-semibold leading-6 text-muted-foreground">
              {selectedWorker.note}
            </p>
          ) : (
            <p className="mt-2 text-sm font-semibold leading-6 text-[#92400E]">
              ต้องเลือกช่างก่อน งานจึงจะถูกส่งได้
            </p>
          )}

          <div className="mt-4 grid gap-2">
            <Button
              disabled={!selectedWorker}
              onClick={() => setConfirming(true)}
              title={!selectedWorker ? "ต้องเลือกช่างรักสมุกก่อน" : undefined}
              type="button"
            >
              <Send aria-hidden className="mr-2 h-4 w-4" />
              ส่งงานให้ช่าง
            </Button>
            {!selectedWorker ? (
              <p className="text-xs font-semibold leading-5 text-[#92400E]">
                ไม่เลือกช่าง = ยังไม่ส่งงาน
              </p>
            ) : null}
          </div>

          {confirming && selectedWorker ? (
            <div
              aria-label="ยืนยันส่งงานรักสมุก"
              className="mt-4 grid gap-3 rounded-lg border border-[#D9D3FD] bg-[#ECE9FE] p-4"
              role="dialog"
            >
              <h3 className="text-base font-extrabold text-[#5B21B6]">
                ยืนยันส่งงานให้ช่าง
              </h3>
              <p className="text-sm font-semibold leading-6 text-[#5B21B6]">
                ส่ง {work.id} ให้ {selectedWorker.displayName} ใน fixture
                เท่านั้น ไม่มี persistence จริง
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    setSentMessage(
                      `ส่งงานให้ ${selectedWorker.displayName} แล้วในหน้านี้เท่านั้น ยังไม่บันทึก workflow จริง`,
                    );
                    setConfirming(false);
                  }}
                  type="button"
                >
                  ยืนยันส่งงาน
                </Button>
                <Button
                  onClick={() => setConfirming(false)}
                  type="button"
                  variant="outline"
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          ) : null}
        </SurfaceCard>
      </section>
    </div>
  );
}
