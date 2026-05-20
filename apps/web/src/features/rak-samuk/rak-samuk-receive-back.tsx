"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PackageCheck } from "lucide-react";
import { Button, PageHeader, StatusChip, SurfaceCard } from "@thaiboran/ui";

import { JobTabs } from "@/features/jobs/components/job-tabs";
import {
  getReceiveBackPreview,
  rakSamukWorkInputs,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function RakSamukReceiveBack({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const work = rakSamukWorkInputs[0];
  const receiveBack = getReceiveBackPreview();
  const [confirming, setConfirming] = useState(false);
  const [received, setReceived] = useState(false);

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        description="รับงานรักสมุกกลับแล้วส่งต่อไปที่รอรับเข้าโรงงานสีเสมอ"
        meta={<StatusChip variant="warning">รับงานรักสมุกกลับ</StatusChip>}
        title="รับงานรักสมุกกลับ"
      />

      <JobTabs activeTab="rak-samuk" currentUser={currentUser} />

      {received ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#166534]">
            รับงานกลับแล้ว ปลายทางถัดไปคือรอรับเข้าโรงงานสี
          </p>
        </SurfaceCard>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <SurfaceCard className="overflow-hidden" padding="none">
          <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="relative aspect-[16/10] min-h-[240px] bg-subtle md:aspect-auto">
              <Image
                alt={work.imageAlt}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 768px) 260px, 100vw"
                src={work.imageSrc}
              />
            </div>
            <div className="grid gap-4 p-5">
              <div className="flex flex-wrap gap-2">
                <StatusChip variant="revision">รักสมุก</StatusChip>
                <StatusChip variant="warning">
                  ปลายทาง {receiveBack.nextDepartment}
                </StatusChip>
                <StatusChip variant="neutral">หลักฐานไม่บังคับ</StatusChip>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold leading-9 text-foreground">
                  {work.workName}
                </h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                  จำนวน {work.quantity} ชิ้น • {work.instructionSummary}
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <FoundationFact
                  label="เส้นทางหลังรับกลับ"
                  value={receiveBack.nextStatus}
                />
                <FoundationFact label="หลักฐาน" value="ไม่บังคับ" />
              </div>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard padding="md">
          <h2 className="text-lg font-extrabold text-foreground">
            ยืนยันรับกลับ
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
            ไม่มีตัวเลือกปลายทาง และไม่ต้องแนบหลักฐาน
          </p>
          <label className="mt-4 grid gap-2 text-sm font-bold text-foreground">
            หมายเหตุ (ไม่บังคับ)
            <textarea
              className="min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="บันทึกสั้น ๆ ถ้ามี"
            />
          </label>
          <div className="mt-4 rounded-lg border border-dashed border-border bg-subtle p-4 text-sm font-semibold leading-6 text-muted-foreground">
            <label className="grid cursor-pointer gap-2">
              รูปงานกลับ (ไม่บังคับ)
              <input
                accept="image/*"
                aria-label="รูปงานกลับ"
                className="text-sm"
                type="file"
              />
            </label>
          </div>
          <Button
            className="mt-4 w-full"
            disabled={received}
            onClick={() => setConfirming(true)}
            title={received ? "รับงานกลับแล้ว" : undefined}
            type="button"
          >
            <PackageCheck aria-hidden className="mr-2 h-4 w-4" />
            {received ? "รับงานกลับแล้ว" : "รับงานรักสมุกกลับ"}
          </Button>
          {confirming ? (
            <div
              aria-label="ยืนยันรับงานรักสมุกกลับ"
              className="mt-4 grid gap-3 rounded-lg border border-[#D9D3FD] bg-[#ECE9FE] p-3"
              role="dialog"
            >
              <h3 className="text-base font-extrabold text-[#5B21B6]">
                ยืนยันรับงานรักสมุกกลับ
              </h3>
              <p className="text-sm font-semibold leading-6 text-[#5B21B6]">
                งานจะเข้าสู่รอรับเข้าโรงงานสี
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    setReceived(true);
                    setConfirming(false);
                  }}
                  type="button"
                >
                  ยืนยันรับกลับ
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
          <Button asChild className="mt-2 w-full" variant="outline">
            <Link href={jobHref(jobRoutes.coloringIntake, currentUser)}>
              เปิดรอรับเข้าโรงงานสี
            </Link>
          </Button>
        </SurfaceCard>
      </section>
    </div>
  );
}

function FoundationFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <p className="text-xs font-bold text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-extrabold text-foreground">{value}</p>
    </div>
  );
}
