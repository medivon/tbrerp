"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  MapPin,
  PackagePlus,
  Plus,
  ReceiptText,
  UserRound,
} from "lucide-react";
import {
  Button,
  PageHeader,
  SectionHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { OrderEntryLineEditor } from "@/features/orders/components/order-entry-line-editor";
import { formatBaht } from "@/features/orders/fixtures/orders";
import {
  getOrderEntryMemoryState,
  setOrderEntryMemoryState,
} from "@/features/orders/order-entry-memory-store";
import {
  addCustomWorkLine,
  addReadyStockLine,
  calculateOrderEntrySummary,
  getOrderEntrySourceLabel,
  markOrderEntryInMemory,
  readyStockOptions,
  removeOrderEntryLine,
  updateCustomWorkLineDetail,
  updateCustomWorkLineQuantity,
  updatePaymentTerm,
  updateReadyStockLineOption,
  updateReadyStockLineQuantity,
  type OrderEntryState,
} from "@/features/orders/order-entry-state";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderCreate({
  currentUser,
  draftNo,
}: {
  currentUser: FixtureUser;
  draftNo?: string;
}) {
  const [entryState, setEntryState] = useState(() =>
    getOrderEntryMemoryState(),
  );
  const summary = useMemo(
    () => calculateOrderEntrySummary(entryState),
    [entryState],
  );

  function commitEntryChange(
    updater: (currentState: OrderEntryState) => OrderEntryState,
  ) {
    const nextState = markOrderEntryInMemory(updater(entryState));

    setEntryState(nextState);
    setOrderEntryMemoryState(nextState);
  }

  function rememberEntryForReview() {
    setOrderEntryMemoryState(entryState);
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <>
            <Button disabled title="ยังไม่บันทึกร่างจริงในรอบงานนี้">
              บันทึกร่าง
            </Button>
            <Button asChild>
              <Link
                href={orderHref(orderRoutes.review, currentUser)}
                onClick={rememberEntryForReview}
              >
                ตรวจสอบก่อนสร้างออเดอร์
              </Link>
            </Button>
          </>
        }
        description="กรอกข้อมูลออเดอร์แบบชั่วคราว ลูกค้าต้องมาก่อนที่อยู่และรายการสินค้า"
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="warning">ยังไม่ได้สร้างออเดอร์จริง</StatusChip>
            {draftNo ? (
              <StatusChip variant="neutral">เลขร่าง {draftNo}</StatusChip>
            ) : (
              <StatusChip variant="neutral">ยังไม่ได้บันทึกร่าง</StatusChip>
            )}
            <StatusChip variant="action">
              {getOrderEntrySourceLabel(entryState)}
            </StatusChip>
            <StatusChip variant="neutral">ไม่เขียนฐานข้อมูลจริง</StatusChip>
          </div>
        }
        title="สร้างออเดอร์"
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          <EntrySection
            icon={<UserRound aria-hidden className="h-5 w-5" />}
            title="ลูกค้า"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="ลูกค้า" value={entryState.customerName} />
              <Field label="เบอร์หลักลูกค้า" value={entryState.customerPhone} />
              <Field label="ระดับลูกค้า" value={entryState.customerTier} />
              <Field
                label="Social"
                value={entryState.socialContact ?? "ยังไม่ได้ระบุ"}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                เลือกลูกค้า
              </Button>
              <Button size="sm" variant="outline">
                เพิ่มลูกค้าในออเดอร์
              </Button>
            </div>
          </EntrySection>

          <EntrySection
            icon={<MapPin aria-hidden className="h-5 w-5" />}
            title="ที่อยู่ / ผู้รับสินค้า"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="ผู้รับสินค้า" value={entryState.recipientName} />
              <Field label="เบอร์ผู้รับ" value={entryState.recipientPhone} />
              <div className="md:col-span-2">
                <Field label="ที่อยู่จัดส่ง" value={entryState.address} />
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm font-semibold leading-6 text-muted-foreground">
              <input
                className="mt-1 h-4 w-4 rounded border-border"
                type="checkbox"
              />
              บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า
            </label>
          </EntrySection>

          <EntrySection
            icon={<PackagePlus aria-hidden className="h-5 w-5" />}
            title="รายการในออเดอร์"
          >
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => commitEntryChange(addReadyStockLine)}
                size="sm"
                type="button"
                variant="outline"
              >
                <Plus aria-hidden className="mr-2 h-4 w-4" />
                เพิ่มสินค้าพร้อมส่ง
              </Button>
              <Button
                onClick={() => commitEntryChange(addCustomWorkLine)}
                size="sm"
                type="button"
                variant="outline"
              >
                <Plus aria-hidden className="mr-2 h-4 w-4" />
                เพิ่มงานสั่งทำ
              </Button>
            </div>

            <OrderEntryLineEditor
              customLines={entryState.customLines}
              onCustomDetailChange={(lineId, value) =>
                commitEntryChange((currentState) =>
                  updateCustomWorkLineDetail(currentState, lineId, value),
                )
              }
              onCustomQuantityChange={(lineId, quantity) =>
                commitEntryChange((currentState) =>
                  updateCustomWorkLineQuantity(currentState, lineId, quantity),
                )
              }
              onReadyQuantityChange={(lineId, quantity) =>
                commitEntryChange((currentState) =>
                  updateReadyStockLineQuantity(currentState, lineId, quantity),
                )
              }
              onReadySkuChange={(lineId, optionId) =>
                commitEntryChange((currentState) =>
                  updateReadyStockLineOption(currentState, lineId, optionId),
                )
              }
              onRemoveLine={(lineId) =>
                commitEntryChange((currentState) =>
                  removeOrderEntryLine(currentState, lineId),
                )
              }
              readyOptions={readyStockOptions}
              readyStockLines={entryState.readyStockLines}
            />

            {summary.hasMixedLineTypes ? (
              <div className="rounded-md border border-border bg-subtle px-3 py-2 text-sm leading-6 text-muted-foreground">
                แผนจัดส่ง: {entryState.shipmentIntent}
              </div>
            ) : null}
          </EntrySection>

          <EntrySection
            icon={<ReceiptText aria-hidden className="h-5 w-5" />}
            title="เงื่อนไขการชำระเงิน"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <label
                className="grid gap-1 text-sm font-semibold text-foreground"
                htmlFor="order-entry-payment-term"
              >
                Payment Term
                <textarea
                  className="min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm font-normal leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="order-entry-payment-term"
                  onChange={(event) =>
                    commitEntryChange((currentState) =>
                      updatePaymentTerm(currentState, event.target.value),
                    )
                  }
                  value={entryState.paymentTerm}
                />
              </label>
              <ReadOnlyMetric
                label="ยอดรวมตัวอย่าง"
                value={formatBaht(summary.totalBaht)}
              />
            </div>
            {entryState.optionalPaymentRecord ? (
              <div className="rounded-md border border-border bg-subtle px-3 py-3">
                <p className="text-sm font-bold text-foreground">
                  รายการรับเงิน (ตัวอย่าง)
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {entryState.optionalPaymentRecord.method}{" "}
                  {formatBaht(entryState.optionalPaymentRecord.amountBaht)}
                  {" • "}
                  {entryState.optionalPaymentRecord.note}
                </p>
                <p className="mt-2 text-xs font-semibold leading-5 text-muted-foreground">
                  แสดงเป็นข้อมูล fixture/local เท่านั้น ยังไม่สร้าง Payment
                  Record จริง
                </p>
              </div>
            ) : null}
          </EntrySection>
        </div>

        <SurfaceCard
          className="grid gap-4 lg:sticky lg:top-24"
          padding="md"
          variant="shell"
        >
          <div>
            <p className="text-base font-extrabold text-shell-foreground">
              สรุปความพร้อม
            </p>
            <p className="mt-1 text-sm leading-6 text-shell-muted">
              {summary.isComplete
                ? "พร้อมไปหน้า Review โดยยังไม่ออกเลขออเดอร์"
                : "ยังมีข้อมูลที่ต้องตรวจในหน้านี้"}
            </p>
          </div>
          <div className="grid gap-2">
            <SummaryRow label="ลูกค้า" value="ครบ" />
            <SummaryRow label="ที่อยู่จัดส่ง" value="ครบ" />
            <SummaryRow
              label="รายการ"
              value={`${summary.lineCount} รายการ / ${summary.totalQuantity} ชิ้น`}
            />
            <SummaryRow
              label="Payment Term"
              value={summary.paymentTermStatus}
            />
            <SummaryRow
              label="รายละเอียดงานสั่งทำ"
              value={summary.customDetailStatus}
            />
            <SummaryRow label="SKU/สี" value={summary.readySkuSummary} />
          </div>
          <div className="grid gap-2">
            {summary.stockWarnings.length > 0 ? (
              summary.stockWarnings.map((warning) => (
                <div
                  className="rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E]"
                  key={warning}
                >
                  {warning}
                </div>
              ))
            ) : (
              <div className="rounded-md border border-shell-border bg-shell px-3 py-2 text-sm font-semibold leading-6 text-shell-muted">
                ไม่มีคำเตือนสต๊อกในสถานะปัจจุบัน
              </div>
            )}
          </div>
          <div className="border-t border-shell-border pt-4">
            <p className="text-sm font-bold text-shell-foreground">
              {formatBaht(summary.totalBaht)}
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-shell-muted">
              ยอดขายตัวอย่างสำหรับตรวจสอบก่อนสร้างออเดอร์
            </p>
          </div>
          <div className="grid gap-2">
            <Button disabled title="ยังไม่บันทึกร่างจริงในรอบงานนี้">
              บันทึกร่าง
            </Button>
            <p className="text-xs font-semibold leading-5 text-shell-muted">
              ปุ่มบันทึกร่างปิดไว้ในรอบงานนี้ จึงยังไม่สร้างหรือแก้ Draft จริง
            </p>
            <Button asChild>
              <Link
                href={orderHref(orderRoutes.review, currentUser)}
                onClick={rememberEntryForReview}
              >
                ตรวจสอบก่อนสร้างออเดอร์
              </Link>
            </Button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

function EntrySection({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) {
  return (
    <SurfaceCard className="grid gap-4" padding="md">
      <SectionHeader
        eyebrow={
          <span className="inline-flex items-center gap-2">
            {icon}
            สร้างออเดอร์
          </span>
        }
        title={title}
      />
      {children}
    </SurfaceCard>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-foreground">
      {label}
      <input
        className="min-h-10 rounded-md border border-border bg-subtle px-3 text-sm font-normal text-foreground outline-none"
        readOnly
        value={value}
      />
    </label>
  );
}

function ReadOnlyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 text-sm font-semibold text-foreground">
      {label}
      <div className="flex min-h-10 items-center rounded-md border border-border bg-subtle px-3 text-sm font-extrabold text-foreground">
        {value}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-md border border-shell-border bg-shell px-3 py-2 text-sm sm:grid-cols-[120px_minmax(0,1fr)] sm:items-start">
      <span className="font-semibold text-shell-muted">{label}</span>
      <span className="break-words font-extrabold text-shell-foreground">
        {value}
      </span>
    </div>
  );
}
