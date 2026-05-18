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
  const [updateStandardRate, setUpdateStandardRate] = useState("ask-later");
  const total = approval.proposedPerPieceBaht * approval.quantity;

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        description="Owner/Manager อนุมัติราคาต่อชิ้นของงานรักสมุก Finance จ่ายจากราคาที่อนุมัติภายหลัง"
        meta={<StatusChip variant="warning">รออนุมัติราคา</StatusChip>}
        title="อนุมัติราคา"
      />

      <JobTabs activeTab="rak-samuk" currentUser={currentUser} />

      {approved ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#166534]">
            อนุมัติราคาแล้วใน fixture เท่านั้น ยังไม่มี Management Log
            จริงและยังไม่สร้าง PV
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
            Finance ไม่ใช่ผู้อนุมัติราคาในขั้นตอนนี้ และ PV ยังไม่ถูกสร้างใน
            sector นี้
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
                ["ask-later", "ยังไม่ตัดสินใจใน foundation นี้"],
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
            onClick={() => setApproved(true)}
            type="button"
          >
            <CheckCircle2 aria-hidden className="mr-2 h-4 w-4" />
            อนุมัติราคา
          </Button>
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
