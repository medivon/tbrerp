"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProductionAction } from "@thaiboran/domain";
import { Button, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  getSourceChipVariant,
  type WorkerQueueJob,
} from "@/features/jobs/fixtures/jobs";

export function WorkerJobCard({
  actions,
  job,
  onAction,
}: {
  actions: Array<{
    href?: string;
    label: ProductionAction | "เปิดงาน";
  }>;
  job: WorkerQueueJob;
  onAction: (action: ProductionAction, jobId: string, note?: string) => void;
}) {
  const [waitingMaterialNote, setWaitingMaterialNote] = useState("");
  const [showWaitingMaterialNote, setShowWaitingMaterialNote] = useState(false);

  return (
    <SurfaceCard className="overflow-hidden p-0" padding="none">
      <article className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative aspect-[16/10] min-h-[190px] overflow-hidden bg-subtle md:aspect-auto md:min-h-full">
          <Image
            alt={job.imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 220px, 100vw"
            src={job.imageSrc}
          />
        </div>
        <div className="grid gap-4 p-4">
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-2">
              <StatusChip variant={getSourceChipVariant(job)}>
                {job.sourceCode} / {job.sourceLabel}
              </StatusChip>
              <StatusChip>{job.id}</StatusChip>
              <StatusChip variant={job.waitingMaterial ? "warning" : "neutral"}>
                {job.currentStatus}
              </StatusChip>
              {job.urgent ? (
                <StatusChip variant="danger">งานด่วน</StatusChip>
              ) : null}
              {job.waitingMaterial ? (
                <StatusChip variant="warning">รอวัตถุดิบ</StatusChip>
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

            <p className="rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-6 text-foreground">
              {job.instructionPreview}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {actions.map((action) => {
              const disabledReason =
                "label" in action
                  ? job.disabledReasons?.[action.label]
                  : undefined;
              const key = `${job.id}-${action.label}`;

              if (action.href) {
                return (
                  <Button asChild key={key} size="lg" variant="outline">
                    <Link href={action.href}>
                      {action.label}
                      <ArrowUpRight aria-hidden className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                );
              }

              return (
                <div className="grid gap-1" key={key}>
                  <Button
                    disabled={Boolean(disabledReason)}
                    onClick={() => {
                      if (action.label === "รอวัตถุดิบ") {
                        setShowWaitingMaterialNote(true);
                        return;
                      }

                      onAction(action.label as ProductionAction, job.id);
                    }}
                    size="lg"
                    title={disabledReason}
                    type="button"
                    variant={action.label === "เปิดงาน" ? "outline" : "default"}
                  >
                    {action.label}
                  </Button>
                  {disabledReason ? (
                    <p className="text-xs font-semibold leading-5 text-[#92400E]">
                      {disabledReason}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          {showWaitingMaterialNote ? (
            <div className="grid gap-3 rounded-lg border border-[#FAD980] bg-[#FEF3C7] p-3">
              <label className="grid gap-2 text-sm font-extrabold text-[#92400E]">
                หมายเหตุรอวัตถุดิบ *
                <textarea
                  className="min-h-24 rounded-md border border-[#FAD980] bg-surface px-3 py-2 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  onChange={(event) =>
                    setWaitingMaterialNote(event.target.value)
                  }
                  placeholder="ระบุวัตถุดิบที่ขาด เช่น ไม้บัว สีทอง หรือบานพับ"
                  value={waitingMaterialNote}
                />
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  disabled={waitingMaterialNote.trim().length === 0}
                  onClick={() => {
                    onAction("รอวัตถุดิบ", job.id, waitingMaterialNote.trim());
                    setShowWaitingMaterialNote(false);
                    setWaitingMaterialNote("");
                  }}
                  title={
                    waitingMaterialNote.trim().length === 0
                      ? "ต้องระบุหมายเหตุรอวัตถุดิบ"
                      : undefined
                  }
                  type="button"
                >
                  บันทึกรอวัตถุดิบ
                </Button>
                <Button
                  onClick={() => {
                    setShowWaitingMaterialNote(false);
                    setWaitingMaterialNote("");
                  }}
                  type="button"
                  variant="outline"
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </SurfaceCard>
  );
}
