import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { Button, StatusChip, SurfaceCard } from "@thaiboran/ui";

export function ReviewImpactPanel({
  confirmDisabledReason,
  hasStockWarning = false,
}: {
  confirmDisabledReason: string;
  hasStockWarning?: boolean;
}) {
  return (
    <SurfaceCard
      className="grid gap-4 lg:sticky lg:top-24"
      padding="md"
      variant="shell"
    >
      <div>
        <p className="text-base font-extrabold text-shell-foreground">
          ผลหลังยืนยันสร้างออเดอร์
        </p>
        <p className="mt-1 text-sm leading-6 text-shell-muted">
          แสดงผลที่จะเกิดหลังยืนยันจริงในรอบงานถัดไป
        </p>
      </div>

      <div className="grid gap-2">
        <ImpactRow
          icon={<PackageCheck aria-hidden className="h-4 w-4" />}
          label="จะจองสต๊อก"
          tone="success"
        />
        <ImpactRow
          icon={<CheckCircle2 aria-hidden className="h-4 w-4" />}
          label="จะสร้าง JOB-O"
          tone="revision"
        />
        <ImpactRow
          icon={<Truck aria-hidden className="h-4 w-4" />}
          label="ยังไม่สร้างรอบจัดส่ง"
          tone="neutral"
        />
      </div>

      {hasStockWarning ? (
        <div className="rounded-md border border-[#FAD980] bg-[#FEF3C7] p-3 text-[#92400E]">
          <div className="flex items-start gap-2">
            <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="text-sm font-bold">ต้องรับทราบคำเตือนสต๊อก</p>
              <label className="mt-2 flex items-start gap-2 text-sm font-semibold leading-6">
                <input
                  checked
                  className="mt-1 h-4 w-4 rounded border-[#FAD980]"
                  disabled
                  readOnly
                  type="checkbox"
                />
                รับทราบคำเตือนสต๊อกไม่พอ
              </label>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-2 border-t border-shell-border pt-4">
        <Button disabled title={confirmDisabledReason}>
          ยืนยันสร้างออเดอร์
        </Button>
        <p className="text-xs font-semibold leading-5 text-shell-muted">
          {confirmDisabledReason}
        </p>
      </div>
    </SurfaceCard>
  );
}

function ImpactRow({
  icon,
  label,
  tone,
}: {
  icon: ReactNode;
  label: string;
  tone: "neutral" | "revision" | "success";
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-shell-border bg-shell px-3 py-2">
      <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-shell-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <StatusChip size="sm" variant={tone}>
        Preview
      </StatusChip>
    </div>
  );
}
