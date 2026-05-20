"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, PageHeader, StatusChip, SurfaceCard } from "@thaiboran/ui";

import { JobTabs } from "@/features/jobs/components/job-tabs";
import { rakSamukPriceApprovalFixtures } from "@/features/jobs/fixtures/jobs";
import type { FixtureUser } from "@/shared/fixtures/users";

export function RakSamukPriceApproval({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const approval = rakSamukPriceApprovalFixtures[0];
  const [approved, setApproved] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateStandardRate, setUpdateStandardRate] = useState("");
  const total = approval.proposedPerPieceBaht * approval.quantity;

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        description="Owner/Manager อนุมัติราคาต่อชิ้นของงานรักสมุก"
        meta={<StatusChip variant="warning">รออนุมัติราคา</StatusChip>}
        title="อนุมัติราคา"
      />

      <JobTabs activeTab="rak-samuk" currentUser={currentUser} />

      {approved ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#166534]">
            อนุมัติราคาแล้ว
          </p>
        </SurfaceCard>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <SurfaceCard className="overflow-hidden" padding="none">
          <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="relative aspect-[16/10] min-h-[240px] bg-subtle md:aspect-auto">
              <Image
                alt={approval.imageAlt}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 768px) 260px, 100vw"
                src={approval.imageSrc}
              />
            </div>
            <div className="grid gap-4 p-5">
              <div className="flex flex-wrap gap-2">
                <StatusChip variant="revision">รักสมุก</StatusChip>
                <StatusChip variant="warning">{approval.status}</StatusChip>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold leading-9 text-foreground">
                  {approval.workName}
                </h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                  ช่างรักสมุก {approval.workerName} • จำนวน {approval.quantity}{" "}
                  ชิ้น
                </p>
              </div>
              <p className="rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-7">
                {approval.instructionSummary}
              </p>

              <div className="grid gap-3 md:grid-cols-3">
                <PriceFact
                  label="ขอเสนอราคา"
                  value={`${approval.proposedPerPieceBaht.toLocaleString(
                    "th-TH",
                  )} บาท/ชิ้น`}
                />
                <PriceFact
                  label="จำนวน"
                  value={`${approval.quantity.toLocaleString("th-TH")} ชิ้น`}
                />
                <PriceFact
                  label="ยอดรวมจากราคาที่เสนอ"
                  value={`${total.toLocaleString("th-TH")} บาท`}
                />
              </div>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard padding="md">
          <h2 className="text-lg font-extrabold text-foreground">การอนุมัติ</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
            อนุมัติราคางานต่อชิ้นก่อนนำไปใช้ในขั้นตอนจ่ายเงินตามสิทธิ์
          </p>

          {approval.productModelLinked ? (
            <fieldset className="mt-4 grid gap-3 rounded-lg border border-border p-3">
              <legend className="px-1 text-sm font-extrabold text-foreground">
                ราคามาตรฐานรักสมุก
              </legend>
              <p className="text-sm font-semibold leading-6 text-muted-foreground">
                {approval.standardRatePrompt}
              </p>
              {[
                ["update", "อัปเดตราคามาตรฐานสำหรับงานอนาคต"],
                ["keep", "ไม่อัปเดตราคามาตรฐาน"],
              ].map(([value, label]) => (
                <label
                  className="flex cursor-pointer items-start gap-2 text-sm font-semibold leading-6 text-foreground"
                  key={value}
                >
                  <input
                    checked={updateStandardRate === value}
                    className="mt-1 h-4 w-4"
                    name="standard-rate"
                    onChange={() => setUpdateStandardRate(value)}
                    type="radio"
                  />
                  {label}
                </label>
              ))}
            </fieldset>
          ) : null}

          <label className="mt-4 grid gap-2 text-sm font-bold text-foreground">
            หมายเหตุอนุมัติ
            <textarea
              className="min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="เพิ่มหมายเหตุถ้าจำเป็น"
            />
          </label>

          <Button
            className="mt-4 w-full"
            disabled={approved}
            onClick={() => {
              if (approval.productModelLinked && !updateStandardRate) {
                setError("กรุณาเลือกว่าจะอัปเดตราคามาตรฐานหรือไม่");
                return;
              }

              setError(null);
              setConfirming(true);
            }}
            title={approved ? "รายการนี้อนุมัติแล้ว" : undefined}
            type="button"
          >
            <CheckCircle2 aria-hidden className="mr-2 h-4 w-4" />
            อนุมัติราคา
          </Button>
          {error ? (
            <p className="mt-3 text-sm font-bold text-[#B42318]">{error}</p>
          ) : null}
          {confirming ? (
            <div
              aria-label="ยืนยันอนุมัติราคา"
              className="mt-4 grid gap-3 rounded-lg border border-[#D9D3FD] bg-[#ECE9FE] p-3"
              role="dialog"
            >
              <h3 className="text-base font-extrabold text-[#5B21B6]">
                ยืนยันอนุมัติราคา
              </h3>
              <p className="text-sm font-semibold leading-6 text-[#5B21B6]">
                อนุมัติ {approval.proposedPerPieceBaht.toLocaleString("th-TH")}{" "}
                บาท/ชิ้น สำหรับ {approval.workerName}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    setApproved(true);
                    setConfirming(false);
                  }}
                  type="button"
                >
                  ยืนยันอนุมัติราคา
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

function PriceFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-bold text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-foreground">{value}</p>
    </div>
  );
}
