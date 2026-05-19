import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { Button, StatusChip, SurfaceCard } from "@thaiboran/ui";

export function ReviewImpactPanel({
  canConfirm,
  customWorkCount,
  confirmDisabledReason,
  hasStockWarning = false,
  onConfirm,
  readyStockCount,
  stockWarningAcknowledged = false,
}: {
  canConfirm: boolean;
  customWorkCount: number;
  confirmDisabledReason: string;
  hasStockWarning?: boolean;
  onConfirm: () => void;
  readyStockCount: number;
  stockWarningAcknowledged?: boolean;
}) {
  return (
    <SurfaceCard
      className="grid gap-4 lg:sticky lg:top-24"
      padding="md"
      variant="shell"
    >
      <div className="min-w-0">
        <p className="break-words text-base font-extrabold text-shell-foreground [overflow-wrap:anywhere]">
          ผลหลังยืนยันสร้างออเดอร์
        </p>
        <p className="mt-1 break-words text-sm leading-6 text-shell-muted [overflow-wrap:anywhere]">
          ตรวจสอบผลที่จะเกิดหลังยืนยันสร้างออเดอร์
        </p>
      </div>

      <div className="grid gap-2">
        <ImpactRow
          icon={<PackageCheck aria-hidden className="h-4 w-4" />}
          label={
            readyStockCount > 0
              ? `จะจองสต๊อก ${readyStockCount} รายการ`
              : "ไม่มีสินค้าพร้อมส่งให้จอง"
          }
          previewLabel={readyStockCount > 0 ? "จะเกิดขึ้น" : "ไม่เกี่ยวข้อง"}
          tone={readyStockCount > 0 ? "success" : "neutral"}
        />
        <ImpactRow
          icon={<CheckCircle2 aria-hidden className="h-4 w-4" />}
          label={
            customWorkCount > 0
              ? `จะสร้าง JOB-O ${customWorkCount} รายการ`
              : "ไม่มี JOB-O ที่ต้องสร้าง"
          }
          previewLabel={customWorkCount > 0 ? "จะเกิดขึ้น" : "ไม่เกี่ยวข้อง"}
          tone={customWorkCount > 0 ? "revision" : "neutral"}
        />
        <ImpactRow
          icon={<Truck aria-hidden className="h-4 w-4" />}
          label="ยังไม่สร้างรอบจัดส่ง"
          previewLabel="ไม่เกี่ยวข้อง"
          tone="neutral"
        />
      </div>

      {hasStockWarning ? (
        <div className="min-w-0 rounded-md border border-[#FAD980] bg-[#FEF3C7] p-3 text-[#92400E]">
          <div className="flex items-start gap-2">
            <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="min-w-0">
              <p className="break-words text-sm font-bold [overflow-wrap:anywhere]">
                ต้องรับทราบคำเตือนสต๊อก
              </p>
              <p className="mt-1 break-words text-sm font-semibold leading-6 [overflow-wrap:anywhere]">
                {stockWarningAcknowledged
                  ? "รับทราบแล้วใน Review"
                  : "ต้องติ๊ก acknowledgement ในคำเตือนก่อนกดยืนยัน"}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-2 border-t border-shell-border pt-4">
        <Button
          disabled={!canConfirm}
          onClick={onConfirm}
          title={canConfirm ? undefined : confirmDisabledReason}
          type="button"
        >
          ยืนยันสร้างออเดอร์
        </Button>
        <p className="break-words text-xs font-semibold leading-5 text-shell-muted [overflow-wrap:anywhere]">
          {canConfirm
            ? "Review นี้เป็นจุดยืนยันสุดท้าย ไม่มี modal ยืนยันซ้ำ"
            : confirmDisabledReason}
        </p>
      </div>
    </SurfaceCard>
  );
}

function ImpactRow({
  icon,
  label,
  previewLabel,
  tone,
}: {
  icon: ReactNode;
  label: string;
  previewLabel: string;
  tone: "neutral" | "revision" | "success";
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-md border border-shell-border bg-shell px-3 py-2">
      <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-shell-foreground">
        <span className="shrink-0">{icon}</span>
        <span className="min-w-0 break-words [overflow-wrap:anywhere]">
          {label}
        </span>
      </div>
      <span className="min-w-0">
        <StatusChip size="sm" variant={tone}>
          {previewLabel}
        </StatusChip>
      </span>
    </div>
  );
}
