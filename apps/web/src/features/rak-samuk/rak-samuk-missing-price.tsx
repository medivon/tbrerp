"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { submitRakSamukProposedPrice } from "@thaiboran/domain";
import { Button, EmptyState, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  getRakSamukWorkInput,
  getRakSamukWorkerWork,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function RakSamukMissingPrice({
  currentUser,
  workId,
}: {
  currentUser: FixtureUser;
  workId?: string;
}) {
  const selectedWorkId = workId ?? "RS-WORK-001";
  const visibleWork = getRakSamukWorkerWork(selectedWorkId, currentUser.id);
  const workInput = getRakSamukWorkInput(selectedWorkId);
  const [perPiecePrice, setPerPiecePrice] = useState("500");
  const [note, setNote] = useState("");
  const [submittedLabel, setSubmittedLabel] = useState<string | null>(
    visibleWork?.ownPriceState.kind === "submitted"
      ? "ส่งราคาแล้ว / รออนุมัติ"
      : null,
  );
  const [error, setError] = useState<string | null>(null);

  if (!visibleWork || !workInput) {
    return (
      <EmptyState
        action={
          <Button asChild size="sm" variant="outline">
            <Link href={jobHref(jobRoutes.rakSamukWorker, currentUser)}>
              กลับไปงานที่ต้องทำ
            </Link>
          </Button>
        }
        title="ไม่พบงานที่ต้องแจ้งราคา"
      />
    );
  }

  const alreadyPriced = visibleWork.ownPriceState.kind === "approved";

  return (
    <div className="grid gap-5">
      <SurfaceCard className="overflow-hidden p-0" padding="none">
        <div className="grid gap-0 lg:grid-cols-[minmax(300px,42%)_minmax(0,1fr)]">
          <div className="relative aspect-[16/10] min-h-[240px] bg-subtle lg:aspect-auto">
            <Image
              alt={visibleWork.imageAlt}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={visibleWork.imageSrc}
            />
          </div>
          <div className="grid gap-4 p-5">
            <div className="flex flex-wrap gap-2">
              <StatusChip variant="warning">ไม่มีราคา / ให้แจ้งราคา</StatusChip>
              {visibleWork.urgent ? (
                <StatusChip variant="danger">งานด่วน</StatusChip>
              ) : null}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold leading-9 text-foreground">
                {visibleWork.workName}
              </h2>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                จำนวน {visibleWork.quantity} ชิ้น • เสนอราคาเป็นราคาต่อชิ้น
              </p>
            </div>
            <p className="rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-7 text-foreground">
              {visibleWork.instructionSummary}
            </p>
          </div>
        </div>
      </SurfaceCard>

      {submittedLabel ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <StatusChip variant="success">{submittedLabel}</StatusChip>
          <p className="mt-2 text-sm font-bold leading-6 text-[#166534]">
            ราคาเสนอถูกส่งในสถานะ fixture แล้ว รอ Owner/Manager อนุมัติ
          </p>
        </SurfaceCard>
      ) : (
        <SurfaceCard padding="md">
          <h2 className="text-lg font-extrabold text-foreground">ขอเสนอราคา</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
            <label className="grid gap-2 text-sm font-bold text-foreground">
              กรอกราคาต่อชิ้น
              <input
                className="min-h-11 rounded-md border border-border bg-surface px-3 text-base font-semibold tabular-nums outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                inputMode="numeric"
                onChange={(event) => setPerPiecePrice(event.target.value)}
                value={perPiecePrice}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-foreground">
              หมายเหตุ
              <textarea
                className="min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(event) => setNote(event.target.value)}
                placeholder="ใส่เหตุผลสั้น ๆ ถ้าจำเป็น"
                value={note}
              />
            </label>
          </div>
          {error ? (
            <p className="mt-3 text-sm font-bold text-[#B42318]">{error}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              disabled={alreadyPriced}
              onClick={() => {
                const result = submitRakSamukProposedPrice({
                  perPieceBaht: Number(perPiecePrice),
                  submittedByWorkerId: currentUser.id,
                  work: workInput,
                });

                if (result.status === "blocked") {
                  setError(result.reason);
                  return;
                }

                setError(null);
                setSubmittedLabel(result.label);
              }}
              title={alreadyPriced ? "รายการนี้มีราคาแล้ว" : undefined}
              type="button"
            >
              ส่งราคา
            </Button>
            <Button asChild variant="outline">
              <Link href={jobHref(jobRoutes.rakSamukWorker, currentUser)}>
                กลับ
              </Link>
            </Button>
          </div>
        </SurfaceCard>
      )}
    </div>
  );
}
