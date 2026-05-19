"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type Ref } from "react";
import {
  AlertTriangle,
  Check,
  ClipboardList,
  ImageIcon,
  Plus,
} from "lucide-react";
import { Button, StatusChip } from "@thaiboran/ui";

import { OrderEntryModalShell } from "@/features/orders/components/order-entry-modal-shell";
import { formatBaht } from "@/features/orders/fixtures/orders";
import {
  createBlankCustomWorkLineDraft,
  getCustomWorkDraftMissingFields,
  type CustomWorkLineDraft,
} from "@/features/orders/order-entry-state";

const customWorkImageSlots = [
  {
    description: "ภาพรวมรายการที่ลูกค้าใช้อ้างอิง",
    id: "main",
    label: "รูปหลัก",
    previewAlt: "ภาพหลักสำหรับงานสั่งทำ",
    previewSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
  },
  {
    description: "มุมโครงสร้าง ขนาด จุดประกอบ และรายละเอียดช่างไม้",
    id: "woodwork",
    label: "รูปสำหรับช่างไม้",
  },
  {
    description: "โทนสี ผิว เคลือบ และงานตกแต่งที่ต้องเทียบ",
    id: "coloring",
    label: "รูปสำหรับฝ่ายสี/ตกแต่ง",
  },
  {
    description: "ลายรักสมุก จุดลงทอง หรือลายเฉพาะ",
    id: "rak-samuk",
    label: "รูปสำหรับรักสมุก",
  },
] as const;

type CustomWorkImageSlotId = (typeof customWorkImageSlots)[number]["id"];
type CustomWorkImageSlot = (typeof customWorkImageSlots)[number];

const generatedReferenceImageNotePrefix = "เลือก ";
const generatedReferenceImageNoteSuffix = " เป็นภาพอ้างอิง";

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
  const [selectedImageSlots, setSelectedImageSlots] = useState<
    Partial<Record<CustomWorkImageSlotId, boolean>>
  >({});
  const missingFields = useMemo(
    () => getCustomWorkDraftMissingFields(draft),
    [draft],
  );

  useEffect(() => {
    if (open) {
      const nextDraft = initialDraft ?? createBlankCustomWorkLineDraft();

      setDraft(nextDraft);
      setSelectedImageSlots(
        createSelectedImageSlotState(
          getGeneratedReferenceImageSlotIds(nextDraft.referenceImageNote),
        ),
      );
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

  function markReferenceImageSlot(slot: CustomWorkImageSlot) {
    const previousSlotIds = getSelectedImageSlotIds(selectedImageSlots);

    if (previousSlotIds.includes(slot.id)) {
      return;
    }

    const nextSlotIds = getSelectedImageSlotIds({
      ...selectedImageSlots,
      [slot.id]: true,
    });

    setSelectedImageSlots((current) => ({
      ...current,
      [slot.id]: true,
    }));

    setDraft((current) => {
      if (
        !shouldAutoManageReferenceImageNote(
          current.referenceImageNote,
          previousSlotIds,
        )
      ) {
        return current;
      }

      return {
        ...current,
        referenceImageNote: buildGeneratedReferenceImageNote(nextSlotIds),
      };
    });
  }

  const isComplete = missingFields.length === 0;

  return (
    <OrderEntryModalShell
      description="กรอกรายละเอียดงานสั่งทำแบบแยกฝ่ายเพื่อให้ Review เห็นความพร้อมก่อนยืนยันออเดอร์"
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
          <div className="break-words rounded-md border border-[#BFE5C9] bg-[#E6F4EA] px-3 py-2 text-sm font-semibold leading-6 text-[#166534] [overflow-wrap:anywhere]">
            รายละเอียดครบพอสำหรับตรวจสอบก่อนสร้างออเดอร์
          </div>
        ) : (
          <div className="rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E]">
            <div className="flex items-start gap-2">
              <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="min-w-0 break-words [overflow-wrap:anywhere]">
                ยังไม่ครบสำหรับ Review: {missingFields.join(", ")}
                {" — "}
                เพิ่มลงรายการได้เพื่อกรอกต่อ แต่ปุ่ม Review
                จะถูกบล็อกจนกว่าจะครบ
              </p>
            </div>
          </div>
        )}

        <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid min-w-0 gap-4">
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
                placeholder="เช่น ใช้รูปตู้โชว์เป็นภาพอ้างอิง"
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

            <section
              aria-label="ตำแหน่งเพิ่มภาพงานสั่งทำ"
              className="grid min-w-0 gap-3 rounded-md border border-border bg-subtle p-3"
            >
              <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3
                    className="break-words text-sm font-extrabold leading-6 text-foreground [overflow-wrap:anywhere]"
                    id="custom-work-reference-images-heading"
                  >
                    รูปอ้างอิงงานสั่งทำ
                  </h3>
                  <p className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                    เลือกตำแหน่งภาพอ้างอิงให้ทีมงานเห็นรูปที่เกี่ยวข้อง
                  </p>
                </div>
                <StatusChip variant="neutral">ภาพอ้างอิง</StatusChip>
              </div>

              <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                {customWorkImageSlots.map((slot) => (
                  <ReferenceImageTile
                    added={Boolean(selectedImageSlots[slot.id])}
                    key={slot.id}
                    onAdd={() => markReferenceImageSlot(slot)}
                    slot={slot}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="grid gap-3 rounded-md border border-border bg-subtle p-3">
            <div className="relative h-40 overflow-hidden rounded-md border border-border bg-surface">
              <Image
                alt="ภาพอ้างอิงสำหรับงานสั่งทำ"
                className="object-cover"
                fill
                sizes="280px"
                src="/sector-1-thumbnails/teak-display-cabinet.png"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex min-w-0 items-center gap-2 text-sm font-extrabold text-foreground">
                <ImageIcon aria-hidden className="h-4 w-4 shrink-0" />
                <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                  ภาพอ้างอิง
                </span>
              </div>
              <p className="break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                เลือกตำแหน่งรูปอ้างอิงเพื่อช่วยแยกรายละเอียดให้แต่ละฝ่าย
              </p>
            </div>
            <div className="rounded-md border border-border bg-surface px-3 py-2 text-sm">
              <p className="break-words font-bold text-muted-foreground [overflow-wrap:anywhere]">
                ยอดขายรายการนี้
              </p>
              <p className="mt-1 break-words text-base font-extrabold text-foreground [overflow-wrap:anywhere]">
                {formatBaht(draft.unitPriceBaht * Math.max(1, draft.quantity))}
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

function ReferenceImageTile({
  added,
  onAdd,
  slot,
}: {
  added: boolean;
  onAdd: () => void;
  slot: CustomWorkImageSlot;
}) {
  return (
    <div
      className={`grid min-w-0 gap-2 rounded-md border bg-surface p-2 transition-colors ${
        added ? "border-primary/60" : "border-border"
      }`}
    >
      <div className="relative grid min-h-24 place-items-center overflow-hidden rounded-md border border-dashed border-border bg-subtle">
        {"previewSrc" in slot ? (
          <Image
            alt={slot.previewAlt}
            className="object-cover"
            fill
            sizes="240px"
            src={slot.previewSrc}
          />
        ) : (
          <ImageIcon aria-hidden className="h-7 w-7 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0">
        <p className="break-words text-sm font-extrabold leading-6 text-foreground [overflow-wrap:anywhere]">
          {slot.label}
        </p>
        <p className="mt-1 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere]">
          {slot.description}
        </p>
      </div>
      <Button
        aria-pressed={added}
        className="w-full"
        disabled={added}
        onClick={onAdd}
        size="sm"
        title={added ? `เลือก ${slot.label} แล้ว` : undefined}
        type="button"
        variant={added ? "outline" : "default"}
      >
        {added ? (
          <Check aria-hidden className="mr-2 h-4 w-4" />
        ) : (
          <Plus aria-hidden className="mr-2 h-4 w-4" />
        )}
        {added ? "เลือกแล้ว" : `เพิ่มรูปอ้างอิง ${slot.label}`}
      </Button>
    </div>
  );
}

function createSelectedImageSlotState(
  slotIds: CustomWorkImageSlotId[],
): Partial<Record<CustomWorkImageSlotId, boolean>> {
  return slotIds.reduce<Partial<Record<CustomWorkImageSlotId, boolean>>>(
    (selectedSlots, slotId) => ({
      ...selectedSlots,
      [slotId]: true,
    }),
    {},
  );
}

function getSelectedImageSlotIds(
  selectedSlots: Partial<Record<CustomWorkImageSlotId, boolean>>,
): CustomWorkImageSlotId[] {
  return customWorkImageSlots
    .filter((slot) => selectedSlots[slot.id])
    .map((slot) => slot.id);
}

function buildGeneratedReferenceImageNote(
  slotIds: CustomWorkImageSlotId[],
): string {
  if (slotIds.length === 0) {
    return "";
  }

  const selectedSlotIdSet = new Set(slotIds);
  const labels = customWorkImageSlots
    .filter((slot) => selectedSlotIdSet.has(slot.id))
    .map((slot) => slot.label);

  return `${generatedReferenceImageNotePrefix}${labels.join(
    ", ",
  )}${generatedReferenceImageNoteSuffix}`;
}

function shouldAutoManageReferenceImageNote(
  note: string,
  selectedSlotIds: CustomWorkImageSlotId[],
): boolean {
  const normalizedNote = note.trim();

  return (
    normalizedNote.length === 0 ||
    normalizedNote === buildGeneratedReferenceImageNote(selectedSlotIds)
  );
}

function getGeneratedReferenceImageSlotIds(
  note: string,
): CustomWorkImageSlotId[] {
  const normalizedNote = note.trim();

  if (
    !normalizedNote.startsWith(generatedReferenceImageNotePrefix) ||
    !normalizedNote.endsWith(generatedReferenceImageNoteSuffix)
  ) {
    return [];
  }

  const labelsText = normalizedNote
    .slice(generatedReferenceImageNotePrefix.length)
    .slice(0, -generatedReferenceImageNoteSuffix.length);
  const labels = labelsText.split(", ").filter(Boolean);
  const slotsByLabel: ReadonlyMap<string, CustomWorkImageSlotId> = new Map(
    customWorkImageSlots.map((slot) => [slot.label, slot.id]),
  );

  if (labels.length === 0) {
    return [];
  }

  const slotIds = labels.map((label) => slotsByLabel.get(label));

  if (slotIds.some((slotId) => !slotId)) {
    return [];
  }

  return slotIds as CustomWorkImageSlotId[];
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
      className="grid min-w-0 gap-1 text-sm font-bold text-foreground"
      htmlFor={id}
    >
      <span className="break-words [overflow-wrap:anywhere]">{label}</span>
      <input
        className="min-h-10 w-full min-w-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
      className="grid min-w-0 gap-1 text-sm font-bold text-foreground"
      htmlFor={id}
    >
      <span className="break-words [overflow-wrap:anywhere]">{label}</span>
      <input
        className="min-h-10 w-full min-w-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
      className="grid min-w-0 gap-1 text-sm font-bold text-foreground"
      htmlFor={id}
    >
      <span className="break-words [overflow-wrap:anywhere]">{label}</span>
      <textarea
        className="min-h-28 w-full min-w-0 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}
