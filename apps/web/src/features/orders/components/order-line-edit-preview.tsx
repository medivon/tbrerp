import { PackagePlus, Trash2 } from "lucide-react";
import { Button, StatusChip, SurfaceCard } from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import {
  formatBaht,
  type OrderLineFixture,
} from "@/features/orders/fixtures/orders";
import type { LineEditImpact } from "@/features/orders/order-line-edit-state";

export function EditGroup({
  lines,
  onQuantityChange,
  onRemoveLine,
  title,
}: {
  lines: OrderLineFixture[];
  onQuantityChange: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
  title: string;
}) {
  return (
    <SurfaceCard className="overflow-hidden" padding="none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-subtle px-4 py-3">
        <p className="break-words text-base font-extrabold text-foreground [overflow-wrap:anywhere]">
          {title}
        </p>
      </div>
      {lines.map((line) =>
        line.editable ? (
          <EditableLineRow
            key={line.id}
            line={line}
            onQuantityChange={onQuantityChange}
            onRemoveLine={onRemoveLine}
          />
        ) : (
          <OrderLineCard key={line.id} line={line} showEditState />
        ),
      )}
    </SurfaceCard>
  );
}

export function ReviewChangesPanel({
  impact,
  onBackToEdit,
  orderId,
}: {
  impact: LineEditImpact;
  onBackToEdit: () => void;
  orderId: string;
}) {
  return (
    <SurfaceCard className="grid gap-4 border-primary/30" padding="md">
      <div className="flex min-w-0 items-start gap-3">
        <PackagePlus
          aria-hidden
          className="mt-1 h-5 w-5 shrink-0 text-primary"
        />
        <div className="min-w-0">
          <p className="break-words text-base font-extrabold text-foreground [overflow-wrap:anywhere]">
            ผลการตรวจสอบการแก้ไข {orderId}
          </p>
          <p className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            ตรวจรายการที่เพิ่ม ลบ หรือเปลี่ยนจำนวน ก่อนกลับไปแก้ไขต่อ
          </p>
        </div>
      </div>
      <ImpactSummary impact={impact} />
      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button onClick={onBackToEdit} type="button" variant="outline">
          กลับไปแก้ไข
        </Button>
        <Button
          disabled
          title="ต้องตรวจผลกระทบการเงิน งานต่อเนื่อง และรอบจัดส่งให้ครบก่อนบันทึก"
        >
          บันทึกการแก้ไข
        </Button>
      </div>
    </SurfaceCard>
  );
}

export function ImpactSummary({ impact }: { impact: LineEditImpact }) {
  return (
    <div className="grid gap-2">
      <ImpactLine
        label="รายการที่เพิ่ม"
        value={`${impact.addedCount} รายการ`}
      />
      <ImpactLine label="รายการที่ลบ" value={`${impact.removedCount} รายการ`} />
      <ImpactLine
        label="จำนวนที่เปลี่ยน"
        value={`${impact.quantityChangedCount} รายการ`}
      />
      <ImpactLine
        label="รายการที่ยังแก้ไม่ได้"
        value={`${impact.blockedCount} รายการ`}
      />
      <ImpactLine
        label="ผลต่อยอดรวม"
        value={`${formatBaht(impact.originalTotalBaht)} → ${formatBaht(
          impact.nextTotalBaht,
        )}`}
      />
      <ImpactLine
        label="ผลต่อสต๊อก"
        value={
          impact.stockWarningCount > 0
            ? `${impact.stockWarningCount} รายการต้องรับทราบคำเตือน`
            : "ไม่มีคำเตือนสต๊อก"
        }
      />
      <ImpactLine label="ผลต่อ JOB-O" value="ยังไม่เปลี่ยนงานผลิตที่มีอยู่" />
      <ImpactLine label="ผลต่อรอบจัดส่ง" value="ยังไม่สร้างหรือแก้รอบจัดส่ง" />
    </div>
  );
}

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 gap-1 rounded-md border border-shell-border bg-shell px-3 py-2 text-sm">
      <span className="break-words font-semibold text-shell-muted [overflow-wrap:anywhere]">
        {label}
      </span>
      <span className="break-words font-extrabold text-shell-foreground [overflow-wrap:anywhere]">
        {value}
      </span>
    </div>
  );
}

function EditableLineRow({
  line,
  onQuantityChange,
  onRemoveLine,
}: {
  line: OrderLineFixture;
  onQuantityChange: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
}) {
  const quantityId = `${line.id}-line-edit-quantity`;
  const unitPriceBaht = Math.round(
    line.lineTotalBaht / Math.max(line.quantity, 1),
  );

  return (
    <article
      className="grid min-w-0 gap-4 border-b border-border p-4 last:border-b-0 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-start"
      data-testid={line.id}
    >
      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip
            variant={line.type === "ready-stock" ? "action" : "revision"}
          >
            {line.type === "ready-stock" ? "สินค้าพร้อมส่ง" : "งานสั่งทำ"}
          </StatusChip>
          {line.stockWarning ? (
            <StatusChip variant="warning">{line.stockWarning}</StatusChip>
          ) : null}
          <StatusChip variant="success">แก้ไขได้</StatusChip>
        </div>
        <div>
          <p className="break-words text-base font-extrabold leading-7 text-foreground [overflow-wrap:anywhere]">
            {line.title}
          </p>
          <p className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            {[line.skuCode, line.color, line.dimensions, line.shipmentState]
              .filter(Boolean)
              .join(" • ")}
          </p>
        </div>
        {line.customDetail ? (
          <p className="break-words rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-6 text-foreground [overflow-wrap:anywhere]">
            {line.customDetail}
          </p>
        ) : null}
      </div>
      <div className="grid min-w-0 gap-3 xl:justify-items-end">
        <label
          className="grid w-full min-w-0 gap-1 text-sm font-bold text-foreground"
          htmlFor={quantityId}
        >
          <span className="break-words [overflow-wrap:anywhere]">จำนวน</span>
          <input
            className="min-h-10 w-full min-w-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            id={quantityId}
            inputMode="numeric"
            min={1}
            onChange={(event) =>
              onQuantityChange(line.id, Number(event.target.value))
            }
            type="number"
            value={line.quantity}
          />
        </label>
        <div className="w-full min-w-0 rounded-md border border-border bg-subtle px-3 py-2 text-sm">
          <p className="break-words font-extrabold text-foreground [overflow-wrap:anywhere]">
            {formatBaht(line.lineTotalBaht)}
          </p>
          <p className="mt-1 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere]">
            หน่วยละ {formatBaht(unitPriceBaht)}
          </p>
        </div>
        <Button
          aria-label={`ลบรายการ ${line.title}`}
          onClick={() => onRemoveLine(line.id)}
          size="sm"
          type="button"
          variant="outline"
        >
          <Trash2 aria-hidden className="mr-2 h-4 w-4" />
          ลบรายการ
        </Button>
      </div>
    </article>
  );
}

function ImpactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 gap-1 rounded-md border border-border bg-subtle px-3 py-2 text-sm sm:grid-cols-[150px_minmax(0,1fr)]">
      <span className="break-words font-semibold text-muted-foreground [overflow-wrap:anywhere]">
        {label}
      </span>
      <span className="break-words font-bold text-foreground [overflow-wrap:anywhere] sm:text-right">
        {value}
      </span>
    </div>
  );
}
