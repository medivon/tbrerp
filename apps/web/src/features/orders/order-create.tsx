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
  EmptyState,
  PageHeader,
  SectionHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { CustomerSelectModal } from "@/features/orders/components/customer-select-modal";
import { CustomWorkEntryModal } from "@/features/orders/components/custom-work-entry-modal";
import { OrderEntryLineEditor } from "@/features/orders/components/order-entry-line-editor";
import { ProductSelectModal } from "@/features/orders/components/product-select-modal";
import { formatBaht } from "@/features/orders/fixtures/orders";
import {
  getOrderEntryMemoryState,
  loadOrderEntryDraft,
  saveOrderEntryDraft,
  setOrderEntryMemoryState,
} from "@/features/orders/order-entry-memory-store";
import {
  addCustomWorkLineFromDraft,
  addReadyStockLineFromSelection,
  calculateOrderEntrySummary,
  createBlankCustomWorkLineDraft,
  createCustomWorkDraftFromLine,
  markOrderEntryInMemory,
  readyStockOptions,
  removeOrderEntryLine,
  selectOrderEntryCustomer,
  updateCustomWorkLineFromDraft,
  updateCustomWorkLineQuantity,
  updatePaymentTerm,
  updateReadyStockLineQuantity,
  type CustomWorkLineDraft,
  type OrderEntryState,
  type OrderEntrySummary,
} from "@/features/orders/order-entry-state";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

type ActiveEntryModal =
  | { kind: "customer" }
  | { kind: "custom-add" }
  | { kind: "custom-edit"; lineId: string }
  | { kind: "product" }
  | null;

export function OrderCreate({
  currentUser,
  draftNo,
}: {
  currentUser: FixtureUser;
  draftNo?: string;
}) {
  const [initialLoad] = useState(() => {
    if (!draftNo) {
      return {
        entryState: getOrderEntryMemoryState(),
        missingDraft: false,
      };
    }

    const draftState = loadOrderEntryDraft(draftNo);

    return {
      entryState: draftState ?? getOrderEntryMemoryState(),
      missingDraft: draftState === null,
    };
  });
  const [entryState, setEntryState] = useState(initialLoad.entryState);
  const [activeModal, setActiveModal] = useState<ActiveEntryModal>(null);
  const [savedDraftNo, setSavedDraftNo] = useState<string | undefined>(
    initialLoad.entryState.draftNo,
  );
  const summary = useMemo(
    () => calculateOrderEntrySummary(entryState),
    [entryState],
  );
  const customWorkInitialDraft = useMemo<CustomWorkLineDraft>(() => {
    if (activeModal?.kind !== "custom-edit") {
      return createBlankCustomWorkLineDraft();
    }

    const line = entryState.customLines.find(
      (candidate) => candidate.id === activeModal.lineId,
    );

    return line
      ? createCustomWorkDraftFromLine(line)
      : createBlankCustomWorkLineDraft();
  }, [activeModal, entryState.customLines]);

  function commitEntryChange(
    updater: (currentState: OrderEntryState) => OrderEntryState,
  ) {
    setEntryState((currentState) => {
      const nextState = markOrderEntryInMemory(updater(currentState));

      setOrderEntryMemoryState(nextState);

      return nextState;
    });
  }

  function rememberEntryForReview() {
    setOrderEntryMemoryState(markOrderEntryInMemory(entryState));
  }

  function saveDraft() {
    const savedDraft = saveOrderEntryDraft({
      entryState,
      ownerName: currentUser.displayName,
    });

    setEntryState(savedDraft.entryState);
    setSavedDraftNo(savedDraft.draft.draftNo);
  }

  function closeModal() {
    setActiveModal(null);
  }

  function handleCustomWorkConfirm(draft: CustomWorkLineDraft) {
    if (activeModal?.kind === "custom-edit") {
      commitEntryChange((currentState) =>
        updateCustomWorkLineFromDraft(currentState, activeModal.lineId, draft),
      );
    } else {
      commitEntryChange((currentState) =>
        addCustomWorkLineFromDraft(currentState, draft),
      );
    }

    closeModal();
  }

  if (initialLoad.missingDraft) {
    return (
      <div className="mx-auto grid w-full max-w-[960px] gap-5">
        <PageHeader
          actions={
            <Button asChild variant="outline">
              <Link href={orderHref(orderRoutes.drafts, currentUser)}>
                กลับไปร่างออเดอร์
              </Link>
            </Button>
          }
          description="ตรวจสอบเลขร่างหรือเลือกร่างออเดอร์จากคิวร่างอีกครั้ง"
          title="ไม่พบร่างออเดอร์นี้"
        />
        <EmptyState title="ไม่พบร่างออเดอร์ที่เลือก" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1480px] gap-5">
        <PageHeader
          actions={
            <>
              <SaveDraftAction
                currentUser={currentUser}
                onSaveDraft={saveDraft}
                savedDraftNo={savedDraftNo}
                summary={summary}
              />
              <ReviewAction
                currentUser={currentUser}
                onReview={rememberEntryForReview}
                showReason
                summary={summary}
              />
            </>
          }
          description="กรอกข้อมูลออเดอร์ ลูกค้าต้องมาก่อนที่อยู่และรายการสินค้า"
          meta={
            <div className="flex flex-wrap gap-2">
              <StatusChip variant="warning">กำลังกรอก</StatusChip>
              {entryState.draftNo ? (
                <StatusChip variant="neutral">
                  เลขร่าง {entryState.draftNo}
                </StatusChip>
              ) : (
                <StatusChip variant="neutral">ยังไม่ได้บันทึกร่าง</StatusChip>
              )}
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
                <Field
                  label="ลูกค้า"
                  value={entryState.customerName || "ยังไม่ได้เลือก"}
                />
                <Field
                  label="เบอร์หลักลูกค้า"
                  value={entryState.customerPhone || "ยังไม่ได้ระบุ"}
                />
                <Field
                  label="ระดับลูกค้า"
                  value={entryState.customerTier || "ยังไม่ได้ระบุ"}
                />
                <Field
                  label="Social"
                  value={entryState.socialContact ?? "ยังไม่ได้ระบุ"}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={() => setActiveModal({ kind: "customer" })}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  เลือกลูกค้า
                </Button>
              </div>
            </EntrySection>

            <EntrySection
              icon={<MapPin aria-hidden className="h-5 w-5" />}
              title="ที่อยู่ / ผู้รับสินค้า"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="ผู้รับสินค้า"
                  value={entryState.recipientName || "ยังไม่ได้ระบุ"}
                />
                <Field
                  label="เบอร์ผู้รับ"
                  value={entryState.recipientPhone || "ยังไม่ได้ระบุ"}
                />
                <div className="md:col-span-2">
                  <Field
                    label="ที่อยู่จัดส่ง"
                    value={entryState.address || "ยังไม่มีที่อยู่จัดส่ง"}
                  />
                </div>
              </div>
            </EntrySection>

            <EntrySection
              icon={<PackagePlus aria-hidden className="h-5 w-5" />}
              title="รายการในออเดอร์"
            >
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setActiveModal({ kind: "product" })}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Plus aria-hidden className="mr-2 h-4 w-4" />
                  เพิ่มสินค้าพร้อมส่ง
                </Button>
                <Button
                  onClick={() => setActiveModal({ kind: "custom-add" })}
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
                onCustomQuantityChange={(lineId, quantity) =>
                  commitEntryChange((currentState) =>
                    updateCustomWorkLineQuantity(
                      currentState,
                      lineId,
                      quantity,
                    ),
                  )
                }
                onEditCustomLine={(lineId) =>
                  setActiveModal({ kind: "custom-edit", lineId })
                }
                onReadyQuantityChange={(lineId, quantity) =>
                  commitEntryChange((currentState) =>
                    updateReadyStockLineQuantity(
                      currentState,
                      lineId,
                      quantity,
                    ),
                  )
                }
                onRemoveLine={(lineId) =>
                  commitEntryChange((currentState) =>
                    removeOrderEntryLine(currentState, lineId),
                  )
                }
                readyStockLines={entryState.readyStockLines}
              />

              {summary.hasMixedLineTypes ? (
                <div className="break-words rounded-md border border-border bg-subtle px-3 py-2 text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
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
                  className="grid min-w-0 gap-1 text-sm font-semibold text-foreground"
                  htmlFor="order-entry-payment-term"
                >
                  <span className="break-words [overflow-wrap:anywhere]">
                    เงื่อนไขการชำระเงิน
                  </span>
                  <textarea
                    className="min-h-24 min-w-0 rounded-md border border-border bg-surface px-3 py-2 text-sm font-normal leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                  label="ยอดรวม"
                  value={formatBaht(summary.totalBaht)}
                />
              </div>
              {entryState.optionalPaymentRecord ? (
                <div className="min-w-0 rounded-md border border-border bg-subtle px-3 py-3">
                  <p className="break-words text-sm font-bold text-foreground [overflow-wrap:anywhere]">
                    รายการรับเงิน
                  </p>
                  <p className="mt-1 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                    {entryState.optionalPaymentRecord.method}{" "}
                    {formatBaht(entryState.optionalPaymentRecord.amountBaht)}
                    {" • "}
                    {entryState.optionalPaymentRecord.note}
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
            <div className="min-w-0">
              <p className="break-words text-base font-extrabold text-shell-foreground [overflow-wrap:anywhere]">
                สรุปความพร้อม
              </p>
              <p className="mt-1 break-words text-sm leading-6 text-shell-muted [overflow-wrap:anywhere]">
                {summary.isComplete
                  ? "พร้อมตรวจสอบก่อนสร้างออเดอร์ โดยยังไม่ออกเลขออเดอร์"
                  : "ยังมีข้อมูลที่ต้องตรวจในหน้านี้"}
              </p>
            </div>
            <div className="grid gap-2">
              <SummaryRow label="ลูกค้า" value={summary.customerStatus} />
              <SummaryRow label="ที่อยู่จัดส่ง" value={summary.addressStatus} />
              <SummaryRow
                label="รายการ"
                value={`${summary.lineCount} รายการ / ${summary.totalQuantity} ชิ้น`}
              />
              <SummaryRow
                label="เงื่อนไขชำระเงิน"
                value={summary.paymentTermStatus}
              />
              <SummaryRow
                label="รายละเอียดงานสั่งทำ"
                value={summary.customDetailStatus}
              />
              <SummaryRow label="SKU/สี" value={summary.readySkuSummary} />
            </div>

            {summary.reviewBlockReasons.length > 0 ? (
              <div className="min-w-0 rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E]">
                <p className="break-words font-extrabold [overflow-wrap:anywhere]">
                  ยังตรวจสอบก่อนสร้างไม่ได้
                </p>
                <ul className="mt-1 grid gap-1">
                  {summary.reviewBlockReasons.map((reason) => (
                    <li
                      className="break-words [overflow-wrap:anywhere]"
                      key={reason}
                    >
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="break-words rounded-md border border-shell-border bg-shell px-3 py-2 text-sm font-semibold leading-6 text-shell-muted [overflow-wrap:anywhere]">
                ตรวจสอบข้อมูลก่อนสร้างออเดอร์
              </div>
            )}

            <div className="grid gap-2">
              {summary.stockWarnings.length > 0 ? (
                summary.stockWarnings.map((warning) => (
                  <div
                    className="break-words rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E] [overflow-wrap:anywhere]"
                    key={warning}
                  >
                    {warning}
                  </div>
                ))
              ) : (
                <div className="break-words rounded-md border border-shell-border bg-shell px-3 py-2 text-sm font-semibold leading-6 text-shell-muted [overflow-wrap:anywhere]">
                  ไม่มีคำเตือนสต๊อกในสถานะปัจจุบัน
                </div>
              )}
            </div>
            <div className="border-t border-shell-border pt-4">
              <p className="break-words text-sm font-bold text-shell-foreground [overflow-wrap:anywhere]">
                {formatBaht(summary.totalBaht)}
              </p>
              <p className="mt-1 break-words text-xs font-semibold leading-5 text-shell-muted [overflow-wrap:anywhere]">
                ยอดขายสำหรับตรวจสอบก่อนสร้างออเดอร์
              </p>
            </div>
            <div className="grid gap-2">
              <ReviewAction
                currentUser={currentUser}
                onReview={rememberEntryForReview}
                summary={summary}
              />
            </div>
          </SurfaceCard>
        </div>
      </div>

      <CustomerSelectModal
        onClose={closeModal}
        onSelect={(customerId) => {
          commitEntryChange((currentState) =>
            selectOrderEntryCustomer(currentState, customerId),
          );
          closeModal();
        }}
        open={activeModal?.kind === "customer"}
        selectedCustomerId={entryState.customerId}
      />
      <ProductSelectModal
        onAdd={(selection) => {
          commitEntryChange((currentState) =>
            addReadyStockLineFromSelection(currentState, selection),
          );
          closeModal();
        }}
        onClose={closeModal}
        open={activeModal?.kind === "product"}
        options={readyStockOptions}
      />
      <CustomWorkEntryModal
        initialDraft={customWorkInitialDraft}
        mode={activeModal?.kind === "custom-edit" ? "edit" : "add"}
        onClose={closeModal}
        onConfirm={handleCustomWorkConfirm}
        open={
          activeModal?.kind === "custom-add" ||
          activeModal?.kind === "custom-edit"
        }
      />
    </>
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
    <SurfaceCard className="grid min-w-0 gap-4" padding="md">
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
    <label className="grid min-w-0 gap-1 text-sm font-semibold text-foreground">
      <span className="break-words [overflow-wrap:anywhere]">{label}</span>
      <input
        className="min-h-10 min-w-0 rounded-md border border-border bg-subtle px-3 text-sm font-normal text-foreground outline-none"
        readOnly
        value={value}
      />
    </label>
  );
}

function ReadOnlyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 gap-1 text-sm font-semibold text-foreground">
      <span className="break-words [overflow-wrap:anywhere]">{label}</span>
      <div className="flex min-h-10 min-w-0 items-center break-words rounded-md border border-border bg-subtle px-3 text-sm font-extrabold text-foreground [overflow-wrap:anywhere]">
        {value}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 gap-1 rounded-md border border-shell-border bg-shell px-3 py-2 text-sm sm:grid-cols-[120px_minmax(0,1fr)] sm:items-start">
      <span className="break-words font-semibold text-shell-muted [overflow-wrap:anywhere]">
        {label}
      </span>
      <span className="break-words font-extrabold text-shell-foreground [overflow-wrap:anywhere]">
        {value}
      </span>
    </div>
  );
}

function SaveDraftAction({
  currentUser,
  onSaveDraft,
  savedDraftNo,
  summary,
}: {
  currentUser: FixtureUser;
  onSaveDraft: () => void;
  savedDraftNo?: string;
  summary: OrderEntrySummary;
}) {
  const canSaveDraft = summary.customerStatus !== "ยังไม่ได้เลือก";
  const reason = "ต้องเลือกลูกค้าก่อนบันทึกร่าง";
  const draftsHref = orderHref(orderRoutes.drafts, currentUser);

  return (
    <div className="grid min-w-0 gap-1">
      {canSaveDraft ? (
        <Button asChild variant="outline">
          <Link href={draftsHref} onClick={onSaveDraft}>
            บันทึกร่าง
          </Link>
        </Button>
      ) : (
        <Button disabled title={reason} type="button" variant="outline">
          บันทึกร่าง
        </Button>
      )}
      {savedDraftNo ? (
        <p className="max-w-64 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere]">
          บันทึกไว้ที่ {savedDraftNo}
        </p>
      ) : !canSaveDraft ? (
        <p className="max-w-64 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere]">
          {reason}
        </p>
      ) : null}
    </div>
  );
}

function ReviewAction({
  currentUser,
  onReview,
  showReason = false,
  summary,
}: {
  currentUser: FixtureUser;
  onReview: () => void;
  showReason?: boolean;
  summary: OrderEntrySummary;
}) {
  const firstReason =
    summary.reviewBlockReasons[0] ?? "ยังมีข้อมูลที่ต้องตรวจในหน้านี้";

  if (summary.isComplete) {
    return (
      <Button asChild>
        <Link
          href={orderHref(orderRoutes.review, currentUser)}
          onClick={onReview}
        >
          ตรวจสอบก่อนสร้างออเดอร์
        </Link>
      </Button>
    );
  }

  return (
    <div className="grid min-w-0 gap-1">
      <Button disabled title={firstReason}>
        ตรวจสอบก่อนสร้างออเดอร์
      </Button>
      {showReason ? (
        <p className="max-w-64 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere]">
          {firstReason}
        </p>
      ) : null}
    </div>
  );
}
