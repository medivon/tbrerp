"use client";

import Image from "next/image";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button, StatusChip } from "@thaiboran/ui";

import type {
  OrderEntryCustomWorkLine,
  OrderEntryReadyStockLine,
  ReadyStockOption,
} from "@/features/orders/order-entry-state";
import { formatBaht } from "@/features/orders/fixtures/orders";

export function OrderEntryLineEditor({
  customLines,
  onCustomDetailChange,
  onCustomQuantityChange,
  onReadyQuantityChange,
  onReadySkuChange,
  onRemoveLine,
  readyOptions,
  readyStockLines,
}: {
  customLines: OrderEntryCustomWorkLine[];
  onCustomDetailChange: (lineId: string, value: string) => void;
  onCustomQuantityChange: (lineId: string, quantity: number) => void;
  onReadyQuantityChange: (lineId: string, quantity: number) => void;
  onReadySkuChange: (lineId: string, optionId: string) => void;
  onRemoveLine: (lineId: string) => void;
  readyOptions: ReadyStockOption[];
  readyStockLines: OrderEntryReadyStockLine[];
}) {
  const hasNoLines = readyStockLines.length === 0 && customLines.length === 0;

  if (hasNoLines) {
    return (
      <div className="rounded-md border border-dashed border-border bg-subtle px-4 py-6 text-center text-sm font-semibold leading-6 text-muted-foreground">
        ยังไม่มีรายการในออเดอร์
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface">
      {readyStockLines.map((line) => (
        <ReadyStockLineEditor
          key={line.id}
          line={line}
          onQuantityChange={onReadyQuantityChange}
          onRemoveLine={onRemoveLine}
          onSkuChange={onReadySkuChange}
          readyOptions={readyOptions}
        />
      ))}
      {customLines.map((line) => (
        <CustomWorkLineEditor
          key={line.id}
          line={line}
          onCustomDetailChange={onCustomDetailChange}
          onQuantityChange={onCustomQuantityChange}
          onRemoveLine={onRemoveLine}
        />
      ))}
    </div>
  );
}

function ReadyStockLineEditor({
  line,
  onQuantityChange,
  onRemoveLine,
  onSkuChange,
  readyOptions,
}: {
  line: OrderEntryReadyStockLine;
  onQuantityChange: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
  onSkuChange: (lineId: string, optionId: string) => void;
  readyOptions: ReadyStockOption[];
}) {
  const quantityId = `${line.id}-quantity`;
  const skuId = `${line.id}-sku`;

  return (
    <article
      className="grid gap-4 border-b border-border p-4 last:border-b-0 xl:grid-cols-[76px_minmax(0,1fr)_220px] xl:items-start"
      data-testid={line.id}
    >
      <LineImage alt={line.imageAlt} src={line.imageSrc} />

      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip variant="action">สินค้าพร้อมส่ง</StatusChip>
          <StatusChip
            variant={line.sellableStockBefore > 0 ? "success" : "warning"}
          >
            {line.sellableStockBefore > 0
              ? `ขายได้ ${line.sellableStockBefore} ชิ้น`
              : "หมด"}
          </StatusChip>
          {line.stockWarning ? (
            <StatusChip variant="warning">{line.stockWarning}</StatusChip>
          ) : null}
        </div>

        <div>
          <h3 className="text-base font-bold leading-7 text-foreground">
            {line.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {line.color} • {line.dimensions} • {line.skuCode}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_140px]">
          <label
            className="grid gap-1 text-sm font-bold text-foreground"
            htmlFor={skuId}
          >
            สินค้า / SKU
            <select
              className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              id={skuId}
              onChange={(event) => onSkuChange(line.id, event.target.value)}
              value={line.optionId}
            >
              {readyOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.productModelName} / {option.color} / {option.skuCode}{" "}
                  / ขายได้ {option.sellableStock} ชิ้น
                </option>
              ))}
            </select>
          </label>

          <label
            className="grid gap-1 text-sm font-bold text-foreground"
            htmlFor={quantityId}
          >
            จำนวน
            <input
              className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
        </div>

        {line.stockWarning ? (
          <p className="inline-flex items-start gap-2 rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E]">
            <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            คำเตือนนี้เป็นการแสดงผลในหน้ากรอกเท่านั้น ยังไม่จองสต๊อกจริง
          </p>
        ) : null}
      </div>

      <LineActions
        lineTotalBaht={line.lineTotalBaht}
        onRemoveLine={() => onRemoveLine(line.id)}
        removeLabel={`ลบรายการ ${line.title}`}
        unitPriceBaht={line.unitPriceBaht}
      />
    </article>
  );
}

function CustomWorkLineEditor({
  line,
  onCustomDetailChange,
  onQuantityChange,
  onRemoveLine,
}: {
  line: OrderEntryCustomWorkLine;
  onCustomDetailChange: (lineId: string, value: string) => void;
  onQuantityChange: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
}) {
  const quantityId = `${line.id}-quantity`;
  const detailId = `${line.id}-detail`;

  return (
    <article
      className="grid gap-4 border-b border-border bg-subtle p-4 last:border-b-0 xl:grid-cols-[76px_minmax(0,1fr)_220px] xl:items-start"
      data-testid={line.id}
    >
      <LineImage alt={line.imageAlt} src={line.imageSrc} />

      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip variant="revision">งานสั่งทำ</StatusChip>
          <StatusChip variant="neutral">{line.shipmentState}</StatusChip>
          <StatusChip variant="revision">จะสร้าง JOB-O / งานลูกค้า</StatusChip>
        </div>

        <div>
          <h3 className="text-base font-bold leading-7 text-foreground">
            {line.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            กำหนดส่ง {line.deliveryDate ?? "ยังไม่ระบุ"} • {line.materialDetail}{" "}
            • {line.colorDetail}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[140px_minmax(0,1fr)]">
          <label
            className="grid gap-1 text-sm font-bold text-foreground"
            htmlFor={quantityId}
          >
            จำนวน
            <input
              className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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

          <label
            className="grid gap-1 text-sm font-bold text-foreground"
            htmlFor={detailId}
          >
            รายละเอียดงานสั่งทำ
            <textarea
              className="min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              id={detailId}
              onChange={(event) =>
                onCustomDetailChange(line.id, event.target.value)
              }
              placeholder="ระบุรายละเอียดผลิต ขนาด สี วัสดุ และลายตกแต่ง"
              value={line.customDetail}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusChip variant="neutral">รูปหลัก</StatusChip>
          <StatusChip variant="neutral">รูปสำหรับช่างไม้</StatusChip>
          <StatusChip variant="neutral">รูปฝ่ายสี/ตกแต่ง</StatusChip>
          <StatusChip variant="neutral">รูปรักสมุก</StatusChip>
        </div>
      </div>

      <LineActions
        lineTotalBaht={line.lineTotalBaht}
        onRemoveLine={() => onRemoveLine(line.id)}
        removeLabel={`ลบรายการ ${line.title}`}
        unitPriceBaht={line.unitPriceBaht}
      />
    </article>
  );
}

function LineImage({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="relative h-20 w-20 overflow-hidden rounded-md border border-border bg-surface md:h-[76px] md:w-[76px]">
      <Image alt={alt} className="object-cover" fill sizes="76px" src={src} />
    </div>
  );
}

function LineActions({
  lineTotalBaht,
  onRemoveLine,
  removeLabel,
  unitPriceBaht,
}: {
  lineTotalBaht: number;
  onRemoveLine: () => void;
  removeLabel: string;
  unitPriceBaht: number;
}) {
  return (
    <div className="grid gap-3 xl:justify-items-end">
      <div className="rounded-md border border-border bg-surface px-3 py-2 text-sm">
        <p className="font-extrabold text-foreground">
          {formatBaht(lineTotalBaht)}
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 text-muted-foreground">
          หน่วยละ {formatBaht(unitPriceBaht)}
        </p>
      </div>
      <Button
        aria-label={removeLabel}
        onClick={onRemoveLine}
        size="sm"
        type="button"
        variant="outline"
      >
        <Trash2 aria-hidden className="mr-2 h-4 w-4" />
        ลบรายการ
      </Button>
    </div>
  );
}
