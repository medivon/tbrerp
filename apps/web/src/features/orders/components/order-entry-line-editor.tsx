"use client";

import Image from "next/image";
import { AlertTriangle, PenLine, Trash2 } from "lucide-react";
import { Button, StatusChip } from "@thaiboran/ui";

import { formatBaht } from "@/features/orders/fixtures/orders";
import {
  buildCustomWorkProductionDetail,
  getCustomWorkLineMissingFields,
  type OrderEntryCustomWorkLine,
  type OrderEntryReadyStockLine,
} from "@/features/orders/order-entry-state";

export function OrderEntryLineEditor({
  customLines,
  onCustomQuantityChange,
  onEditCustomLine,
  onReadyQuantityChange,
  onRemoveLine,
  readyStockLines,
}: {
  customLines: OrderEntryCustomWorkLine[];
  onCustomQuantityChange: (lineId: string, quantity: number) => void;
  onEditCustomLine: (lineId: string) => void;
  onReadyQuantityChange: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
  readyStockLines: OrderEntryReadyStockLine[];
}) {
  const hasNoLines = readyStockLines.length === 0 && customLines.length === 0;

  if (hasNoLines) {
    return (
      <div className="break-words rounded-md border border-dashed border-border bg-subtle px-4 py-6 text-center text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
        ยังไม่มีรายการในออเดอร์
      </div>
    );
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-md border border-border bg-surface">
      {readyStockLines.map((line) => (
        <ReadyStockLineEditor
          key={line.id}
          line={line}
          onQuantityChange={onReadyQuantityChange}
          onRemoveLine={onRemoveLine}
        />
      ))}
      {customLines.map((line) => (
        <CustomWorkLineEditor
          key={line.id}
          line={line}
          onEditCustomLine={onEditCustomLine}
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
}: {
  line: OrderEntryReadyStockLine;
  onQuantityChange: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
}) {
  const quantityId = `${line.id}-quantity`;

  return (
    <article
      className="grid min-w-0 gap-4 border-b border-border p-4 last:border-b-0 xl:grid-cols-[76px_minmax(0,1fr)_220px] xl:items-start"
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
          <h3 className="break-words text-base font-bold leading-7 text-foreground [overflow-wrap:anywhere]">
            {line.title}
          </h3>
          <p className="mt-1 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            {line.color} • {line.dimensions} • {line.skuCode}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_140px]">
          <ReadOnlyLineFact label="สินค้า / SKU" value={line.skuCode} />
          <label
            className="grid min-w-0 gap-1 text-sm font-bold text-foreground"
            htmlFor={quantityId}
          >
            <span className="break-words [overflow-wrap:anywhere]">จำนวน</span>
            <input
              className="min-h-10 min-w-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
          <p className="inline-flex min-w-0 items-start gap-2 break-words rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E] [overflow-wrap:anywhere]">
            <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0">
              ตรวจสอบจำนวนสินค้าในหน้าตรวจสอบก่อนสร้างออเดอร์
            </span>
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
  onEditCustomLine,
  onQuantityChange,
  onRemoveLine,
}: {
  line: OrderEntryCustomWorkLine;
  onEditCustomLine: (lineId: string) => void;
  onQuantityChange: (lineId: string, quantity: number) => void;
  onRemoveLine: (lineId: string) => void;
}) {
  const quantityId = `${line.id}-quantity`;
  const missingFields = getCustomWorkLineMissingFields(line);
  const isComplete = missingFields.length === 0;

  return (
    <article
      className="grid min-w-0 gap-4 border-b border-border bg-subtle p-4 last:border-b-0 xl:grid-cols-[76px_minmax(0,1fr)_220px] xl:items-start"
      data-testid={line.id}
    >
      <LineImage alt={line.imageAlt} src={line.imageSrc} />

      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip variant="revision">งานสั่งทำ</StatusChip>
          <StatusChip variant={isComplete ? "neutral" : "warning"}>
            {line.shipmentState}
          </StatusChip>
          <StatusChip variant="revision">จะสร้าง JOB-O / งานลูกค้า</StatusChip>
        </div>

        <div>
          <h3 className="break-words text-base font-bold leading-7 text-foreground [overflow-wrap:anywhere]">
            {line.title}
          </h3>
          <p className="mt-1 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            กำหนดส่ง {line.deliveryDate ?? "ยังไม่ระบุ"} •{" "}
            {line.materialDetail || "ยังไม่ระบุวัสดุ"} •{" "}
            {line.colorDetail || "ยังไม่ระบุสี"}
          </p>
        </div>

        {!isComplete ? (
          <p className="inline-flex min-w-0 items-start gap-2 break-words rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E] [overflow-wrap:anywhere]">
            <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0">
              ยังไม่ครบ: {missingFields.join(", ")}
            </span>
          </p>
        ) : null}

        <div className="grid gap-3 md:grid-cols-[140px_minmax(0,1fr)]">
          <label
            className="grid min-w-0 gap-1 text-sm font-bold text-foreground"
            htmlFor={quantityId}
          >
            <span className="break-words [overflow-wrap:anywhere]">จำนวน</span>
            <input
              className="min-h-10 min-w-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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

          <div className="grid min-w-0 gap-2">
            <p className="break-words text-sm font-bold text-foreground [overflow-wrap:anywhere]">
              รายละเอียดงานสั่งทำ
            </p>
            <div className="grid gap-2 lg:grid-cols-3">
              <DetailBlock
                label="รายละเอียดช่างไม้"
                value={line.woodworkDetail}
              />
              <DetailBlock
                label="รายละเอียดฝ่ายสี/ตกแต่ง"
                value={line.coloringDetail}
              />
              <DetailBlock
                label="รายละเอียดรักสมุก"
                value={line.rakSamukDetail}
              />
            </div>
            <div className="break-words rounded-md border border-border bg-surface px-3 py-2 text-sm leading-6 text-foreground [overflow-wrap:anywhere]">
              {buildCustomWorkProductionDetail(line) ||
                "ยังไม่มีรายละเอียดผลิต"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusChip variant="neutral">รูปหลัก</StatusChip>
          <StatusChip variant="neutral">รูปสำหรับช่างไม้</StatusChip>
          <StatusChip variant="neutral">รูปฝ่ายสี/ตกแต่ง</StatusChip>
          <StatusChip variant="neutral">รูปรักสมุก</StatusChip>
          <StatusChip variant={line.referenceImageNote ? "success" : "warning"}>
            {line.referenceImageNote ? "มีรูปอ้างอิง" : "ยังไม่มีรูปอ้างอิง"}
          </StatusChip>
        </div>
      </div>

      <div className="grid min-w-0 gap-3 xl:justify-items-end">
        <LineTotal
          lineTotalBaht={line.lineTotalBaht}
          unitPriceBaht={line.unitPriceBaht}
        />
        <Button
          onClick={() => onEditCustomLine(line.id)}
          size="sm"
          type="button"
          variant="outline"
        >
          <PenLine aria-hidden className="mr-2 h-4 w-4" />
          แก้ไขรายละเอียด
        </Button>
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

function ReadOnlyLineFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 gap-1 text-sm font-bold text-foreground">
      <span className="break-words [overflow-wrap:anywhere]">{label}</span>
      <div className="flex min-h-10 min-w-0 items-center break-words rounded-md border border-border bg-subtle px-3 text-sm font-semibold text-foreground [overflow-wrap:anywhere]">
        {value}
      </div>
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  const hasValue = value.trim().length > 0;

  return (
    <div
      className={`min-w-0 rounded-md border px-3 py-2 text-sm leading-6 ${
        hasValue
          ? "border-border bg-surface text-foreground"
          : "border-[#FAD980] bg-[#FEF3C7] text-[#92400E]"
      }`}
    >
      <p className="break-words font-bold [overflow-wrap:anywhere]">{label}</p>
      <p className="mt-1 break-words font-semibold [overflow-wrap:anywhere]">
        {hasValue ? value : `${label}ยังไม่ครบ`}
      </p>
    </div>
  );
}

function LineImage({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-surface md:h-[76px] md:w-[76px]">
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
    <div className="grid min-w-0 gap-3 xl:justify-items-end">
      <LineTotal lineTotalBaht={lineTotalBaht} unitPriceBaht={unitPriceBaht} />
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

function LineTotal({
  lineTotalBaht,
  unitPriceBaht,
}: {
  lineTotalBaht: number;
  unitPriceBaht: number;
}) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-surface px-3 py-2 text-sm">
      <p className="break-words font-extrabold text-foreground [overflow-wrap:anywhere]">
        {formatBaht(lineTotalBaht)}
      </p>
      <p className="mt-1 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere]">
        หน่วยละ {formatBaht(unitPriceBaht)}
      </p>
    </div>
  );
}
