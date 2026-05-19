"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type Ref } from "react";
import { AlertTriangle, ClipboardList, ImageIcon } from "lucide-react";
import { Button, StatusChip } from "@thaiboran/ui";

import { OrderEntryModalShell } from "@/features/orders/components/order-entry-modal-shell";
import { formatBaht } from "@/features/orders/fixtures/orders";
import {
  createBlankCustomWorkLineDraft,
  getCustomWorkDraftMissingFields,
  type CustomWorkLineDraft,
} from "@/features/orders/order-entry-state";

export function CustomWorkEntryModal({
  initialDraft,
  mode,
  onClose,
  onConfirm,
  open,
}: {
  initialDraft?: CustomWorkLineDraft;
  mode: "add" | "edit";
  onClose: () => void;
  onConfirm: (draft: CustomWorkLineDraft) => void;
  open: boolean;
}) {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [draft, setDraft] = useState<CustomWorkLineDraft>(
    () => initialDraft ?? createBlankCustomWorkLineDraft(),
  );
  const missingFields = useMemo(
    () => getCustomWorkDraftMissingFields(draft),
    [draft],
  );

  useEffect(() => {
    if (open) {
      setDraft(initialDraft ?? createBlankCustomWorkLineDraft());
    }
  }, [initialDraft, open]);

  function updateDraft<K extends keyof CustomWorkLineDraft>(
    field: K,
    value: CustomWorkLineDraft[K],
  ) {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const isComplete = missingFields.length === 0;

  return (
    <OrderEntryModalShell
      description="กรอกรายละเอียดงานสั่งทำแบบแยกฝ่ายเพื่อให้ Review เห็นความพร้อมก่อน Sector ถัดไป ยังไม่สร้าง JOB-O"
      initialFocusRef={nameInputRef}
      onClose={onClose}
      open={open}
      size="wide"
      title="รายละเอียดงานสั่งทำ"
    >
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip variant="revision">งานสั่งทำ</StatusChip>
          <StatusChip variant={isComplete ? "success" : "warning"}>
            {isComplete ? "รายละเอียดครบสำหรับ Review" : "ยังไม่ครบ"}
          </StatusChip>
          <StatusChip variant="neutral">ยังไม่สร้าง JOB-O</StatusChip>
        </div>

        {isComplete ? (
          <div className="rounded-md border border-[#BFE5C9] bg-[#E6F4EA] px-3 py-2 text-sm font-semibold leading-6 text-[#166534]">
            รายละเอียดครบพอให้ไป Review แบบ fixture/in-memory ได้
          </div>
        ) : (
          <div className="rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E]">
            <div className="flex items-start gap-2">
              <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                ยังไม่ครบสำหรับ Review: {missingFields.join(", ")}
                {" — "}
                เพิ่มลงรายการได้เพื่อกรอกต่อ แต่ปุ่ม Review
                จะถูกบล็อกจนกว่าจะครบ
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              <TextInput
                id="custom-work-name"
                inputRef={nameInputRef}
                label="ชื่องาน / รายการ"
                onChange={(value) => updateDraft("workName", value)}
                placeholder="เช่น ตู้เตี้ยไม้สักสั่งทำ"
                value={draft.workName}
              />
              <NumberInput
                id="custom-work-quantity"
                label="จำนวน"
                onChange={(value) => updateDraft("quantity", value)}
                value={draft.quantity}
              />
              <TextInput
                id="custom-work-size"
                label="ขนาด / หมายเหตุขนาด"
                onChange={(value) => updateDraft("sizeDetail", value)}
                placeholder="เช่น 180 x 45 x 90 ซม. หรือ วัดหน้างานอีกครั้ง"
                value={draft.sizeDetail}
              />
              <TextInput
                id="custom-work-delivery-date"
                label="กำหนดส่งที่คุยไว้"
                onChange={(value) => updateDraft("deliveryDate", value)}
                placeholder="เช่น 30 มิ.ย. 67"
                value={draft.deliveryDate}
              />
              <TextInput
                id="custom-work-material"
                label="วัสดุหลัก"
                onChange={(value) => updateDraft("materialDetail", value)}
                placeholder="เช่น ไม้สัก"
                value={draft.materialDetail}
              />
              <TextInput
                id="custom-work-color"
                label="สี / งานตกแต่งหลัก"
                onChange={(value) => updateDraft("colorDetail", value)}
                placeholder="เช่น โอ๊คเข้ม เคลือบด้าน"
                value={draft.colorDetail}
              />
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              <TextArea
                id="custom-work-woodwork"
                label="รายละเอียดช่างไม้"
                onChange={(value) => updateDraft("woodworkDetail", value)}
                placeholder="โครงสร้าง ลิ้นชัก หน้าบาน แกะลาย จุดที่ต้องวัด"
                value={draft.woodworkDetail}
              />
              <TextArea
                id="custom-work-coloring"
                label="รายละเอียดฝ่ายสี/ตกแต่ง"
                onChange={(value) => updateDraft("coloringDetail", value)}
                placeholder="โทนสี เคลือบ เงา/ด้าน งานแต่งผิว"
                value={draft.coloringDetail}
              />
              <TextArea
                id="custom-work-rak-samuk"
                label="รายละเอียดรักสมุก"
                onChange={(value) => updateDraft("rakSamukDetail", value)}
                placeholder="ลายรักสมุก จุดลงทอง หรือระบุว่าไม่มีงานรักสมุก"
                value={draft.rakSamukDetail}
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <TextArea
                id="custom-work-reference-image"
                label="รูปอ้างอิง"
                onChange={(value) => updateDraft("referenceImageNote", value)}
                placeholder="เช่น ใช้รูปตัวอย่างตู้โชว์จาก fixture เป็นภาพอ้างอิง"
                value={draft.referenceImageNote}
              />
              <TextArea
                id="custom-work-internal-note"
                label="หมายเหตุภายใน"
                onChange={(value) => updateDraft("internalNote", value)}
                placeholder="หมายเหตุสำหรับแอดมิน ไม่ใช่คำสั่งผลิตหลัก"
                value={draft.internalNote}
              />
            </div>
          </div>

          <aside className="grid gap-3 rounded-md border border-border bg-subtle p-3">
            <div className="relative h-40 overflow-hidden rounded-md border border-border bg-surface">
              <Image
                alt="ภาพอ้างอิง fixture สำหรับงานสั่งทำ"
                className="object-cover"
                fill
                sizes="280px"
                src="/sector-1-thumbnails/teak-display-cabinet.png"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                <ImageIcon aria-hidden className="h-4 w-4" />
                ภาพอ้างอิง fixture
              </div>
              <p className="text-sm font-semibold leading-6 text-muted-foreground">
                รอบงานนี้ไม่มี upload จริง
                ใช้บล็อกนี้เพื่อแสดงตำแหน่งรูปอ้างอิงก่อนสร้าง JOB-O ใน Sector
                ถัดไป
              </p>
            </div>
            <div className="rounded-md border border-border bg-surface px-3 py-2 text-sm">
              <p className="font-bold text-muted-foreground">ยอดขายตัวอย่าง</p>
              <p className="mt-1 text-base font-extrabold text-foreground">
                {formatBaht(draft.unitPriceBaht * Math.max(1, draft.quantity))}
              </p>
              <p className="mt-1 text-xs font-semibold leading-5 text-muted-foreground">
                ใช้สำหรับ summary เท่านั้น ไม่ใช่ต้นทุนหรือข้อมูล Finance
              </p>
            </div>
          </aside>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-4">
          <Button onClick={onClose} type="button" variant="outline">
            ยกเลิก
          </Button>
          <Button onClick={() => onConfirm(draft)} type="button">
            <ClipboardList aria-hidden className="mr-2 h-4 w-4" />
            {mode === "edit" ? "บันทึกรายละเอียดสั่งทำ" : "เพิ่มรายการสั่งทำ"}
          </Button>
        </div>
      </div>
    </OrderEntryModalShell>
  );
}

function TextInput({
  id,
  inputRef,
  label,
  onChange,
  placeholder,
  value,
}: {
  id: string;
  inputRef?: Ref<HTMLInputElement>;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label
      className="grid gap-1 text-sm font-bold text-foreground"
      htmlFor={id}
    >
      {label}
      <input
        className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={value}
      />
    </label>
  );
}

function NumberInput({
  id,
  label,
  onChange,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <label
      className="grid gap-1 text-sm font-bold text-foreground"
      htmlFor={id}
    >
      {label}
      <input
        className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        id={id}
        inputMode="numeric"
        min={1}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        value={value}
      />
    </label>
  );
}

function TextArea({
  id,
  label,
  onChange,
  placeholder,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label
      className="grid gap-1 text-sm font-bold text-foreground"
      htmlFor={id}
    >
      {label}
      <textarea
        className="min-h-28 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}
