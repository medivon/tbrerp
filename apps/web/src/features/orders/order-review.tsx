"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import {
  confirmOrderFromReview,
  type CustomWorkReviewLine,
  type ReadyStockReviewLine,
} from "@thaiboran/domain";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import { ReadFirstSection } from "@/features/orders/components/read-first-section";
import { ReviewImpactPanel } from "@/features/orders/components/review-impact-panel";
import { saveOrderConfirmationResult } from "@/features/orders/order-confirmation-result-store";
import {
  formatBaht,
  type OrderLineFixture,
  type OrderReviewScenarioId,
} from "@/features/orders/fixtures/orders";
import {
  saveOrderEntryDraft,
  useOrderEntryMemoryState,
} from "@/features/orders/order-entry-memory-store";
import { createOrderConfirmationInputFromEntryState } from "@/features/orders/order-entry-state";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderReview({
  currentUser,
  scenarioId = "valid",
  allowSeedScenario = scenarioId !== "valid",
}: {
  allowSeedScenario?: boolean;
  currentUser: FixtureUser;
  scenarioId?: OrderReviewScenarioId;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [stockShortageAccepted, setStockShortageAccepted] = useState(false);
  const entryState = useOrderEntryMemoryState();
  const hasActiveEntryState = entryState.source === "in-memory";
  const confirmationInput = useMemo(
    () =>
      createOrderConfirmationInputFromEntryState({
        actor: {
          displayName: currentUser.displayName,
          id: currentUser.id,
        },
        entryState,
        scenarioId,
        stockShortageAccepted,
      }),
    [
      currentUser.displayName,
      currentUser.id,
      entryState,
      scenarioId,
      stockShortageAccepted,
    ],
  );
  const confirmationPreview = useMemo(
    () => confirmOrderFromReview(confirmationInput),
    [confirmationInput],
  );
  const totalBaht = [
    ...confirmationInput.readyStockLines,
    ...confirmationInput.customWorkLines,
  ].reduce((total, line) => total + line.lineTotalBaht, 0);
  const reviewReadyStockLines = useMemo(
    () => confirmationInput.readyStockLines.map(toReadyStockReviewLineCard),
    [confirmationInput.readyStockLines],
  );
  const reviewCustomWorkLines = useMemo(
    () => confirmationInput.customWorkLines.map(toCustomWorkReviewLineCard),
    [confirmationInput.customWorkLines],
  );
  const hasStockWarning = confirmationInput.warnings.some(
    (warning) => warning.type === "stock-insufficient",
  );
  const blockingReasons =
    confirmationPreview.status === "blocked"
      ? confirmationPreview.blockingReasons
      : [];
  const canConfirm = confirmationPreview.status === "confirmed" && !confirming;
  const confirmDisabledReason = confirming
    ? "กำลังเปิดรายละเอียดออเดอร์"
    : blockingReasons.length > 0
      ? blockingReasons.map((reason) => reason.message).join(" / ")
      : "ตรวจสอบข้อมูลก่อนยืนยัน";

  function updateStockShortageAccepted(accepted: boolean) {
    setStockShortageAccepted(accepted);
    setConfirming(false);
  }

  function saveDraftFromReview() {
    saveOrderEntryDraft({
      entryState,
      ownerName: currentUser.displayName,
    });
  }

  function confirmFixtureOrder() {
    if (confirmationPreview.status === "confirmed") {
      setConfirming(true);
      saveOrderConfirmationResult(confirmationPreview);
      router.push(
        orderHref(
          orderRoutes.detail(confirmationPreview.confirmedOrder.id),
          currentUser,
        ),
      );
    }
  }

  if (!hasActiveEntryState && !allowSeedScenario) {
    return (
      <div className="mx-auto grid w-full max-w-[960px] gap-5">
        <PageHeader
          actions={
            <Button asChild>
              <Link href={orderHref(orderRoutes.create, currentUser)}>
                กลับไปสร้างออเดอร์
              </Link>
            </Button>
          }
          description="เลือกหรือบันทึกข้อมูลออเดอร์ก่อนเข้าหน้าตรวจสอบ"
          title="ตรวจสอบก่อนสร้างออเดอร์"
        />
        <EmptyState
          description="เริ่มจากหน้าสร้างออเดอร์ หรือเปิดร่างออเดอร์ที่บันทึกไว้"
          title="ยังไม่มีข้อมูลออเดอร์ให้ตรวจสอบ"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <div className="flex min-w-0 flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href={orderHref(orderRoutes.create, currentUser)}>
                <ArrowLeft aria-hidden className="mr-2 h-4 w-4" />
                กลับ
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href={orderHref(orderRoutes.drafts, currentUser)}
                onClick={saveDraftFromReview}
              >
                บันทึกร่าง
              </Link>
            </Button>
          </div>
        }
        description="ตรวจสอบลูกค้า ผู้รับสินค้า รายการสินค้า และเงื่อนไขชำระเงินก่อนสร้างออเดอร์"
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusChip
              variant={
                confirmationPreview.status === "confirmed"
                  ? "success"
                  : "warning"
              }
            >
              {confirmationPreview.status === "confirmed"
                ? "พร้อมสร้างออเดอร์"
                : "ยังยืนยันไม่ได้"}
            </StatusChip>
            {hasStockWarning ? (
              <StatusChip variant="warning">ต้องรับทราบคำเตือน</StatusChip>
            ) : null}
          </div>
        }
        title="ตรวจสอบก่อนสร้างออเดอร์"
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          {hasStockWarning ? (
            <StockWarningBlock
              accepted={stockShortageAccepted}
              onAcceptedChange={updateStockShortageAccepted}
              warnings={confirmationInput.warnings.map(
                (warning) => warning.message,
              )}
            />
          ) : null}

          {blockingReasons.length > 0 ? (
            <BlockingReasonsPanel
              reasons={blockingReasons.map((reason) => reason.message)}
            />
          ) : null}

          <ReadFirstSection
            title="ลูกค้าและผู้รับสินค้า"
            titleId="review-customer"
          >
            <dl className="grid gap-0 md:grid-cols-2">
              <ReviewFact
                label="ลูกค้า"
                value={
                  confirmationInput.customer?.name ?? "ยังไม่ได้เลือกลูกค้า"
                }
              />
              <ReviewFact
                label="เบอร์หลักลูกค้า"
                value={
                  confirmationInput.customer?.primaryPhone ??
                  "ยังไม่ได้ระบุเบอร์ลูกค้า"
                }
              />
              <ReviewFact
                label="ระดับลูกค้า"
                value={confirmationInput.customer?.tier ?? "ยังไม่ได้ระบุ"}
              />
              <ReviewFact
                label="Social"
                value={
                  confirmationInput.customer?.socialContact ?? "ยังไม่ได้ระบุ"
                }
              />
              <ReviewFact
                label="ผู้รับสินค้า"
                value={confirmationInput.recipient?.name ?? "ยังไม่ได้ระบุ"}
              />
              <ReviewFact
                label="เบอร์ผู้รับ"
                value={confirmationInput.recipient?.phone ?? "ยังไม่ได้ระบุ"}
              />
              <div className="md:col-span-2">
                <ReviewFact
                  label="ที่อยู่จัดส่ง"
                  value={
                    confirmationInput.recipient?.address ||
                    "ยังไม่มีที่อยู่จัดส่ง"
                  }
                />
              </div>
            </dl>
          </ReadFirstSection>

          {reviewReadyStockLines.length > 0 ? (
            <ReadFirstSection
              title="สินค้าพร้อมส่ง"
              titleId="review-ready-stock"
            >
              {reviewReadyStockLines.map((line) => (
                <OrderLineCard key={line.id} line={line} />
              ))}
            </ReadFirstSection>
          ) : null}

          {reviewCustomWorkLines.length > 0 ? (
            <ReadFirstSection title="งานสั่งทำ" titleId="review-custom-work">
              {reviewCustomWorkLines.map((line) => (
                <OrderLineCard key={line.id} line={line} />
              ))}
            </ReadFirstSection>
          ) : null}

          <ReadFirstSection title="การชำระเงิน" titleId="review-payment">
            <dl className="grid gap-0 md:grid-cols-2">
              <ReviewFact
                label="เงื่อนไขการชำระเงิน"
                value={
                  confirmationInput.paymentTerm || "ยังไม่มีเงื่อนไขชำระเงิน"
                }
              />
              <ReviewFact label="ยอดรวม" value={formatBaht(totalBaht)} />
              <ReviewFact
                label="รายการรับเงิน"
                value={
                  confirmationInput.optionalPaymentRecord
                    ? `${confirmationInput.optionalPaymentRecord.method} ${formatBaht(
                        confirmationInput.optionalPaymentRecord.amountBaht,
                      )}`
                    : "ยังไม่มีรายการรับเงิน"
                }
              />
              <ReviewFact
                label="แผนจัดส่ง"
                value={confirmationInput.shipmentIntent ?? "ไม่มีแผนจัดส่งแยก"}
              />
            </dl>
          </ReadFirstSection>
        </div>

        <ReviewImpactPanel
          canConfirm={canConfirm}
          customWorkCount={confirmationInput.customWorkLines.length}
          confirmDisabledReason={confirmDisabledReason}
          hasStockWarning={hasStockWarning}
          onConfirm={confirmFixtureOrder}
          readyStockCount={confirmationInput.readyStockLines.length}
          stockWarningAcknowledged={stockShortageAccepted}
        />
      </div>
    </div>
  );
}

function toReadyStockReviewLineCard(
  line: ReadyStockReviewLine,
): OrderLineFixture {
  const hasShortage = line.quantity > line.sellableStockBefore;

  return {
    color: line.color,
    dimensions: line.dimensions,
    editable: true,
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    lineTotalBaht: line.lineTotalBaht,
    quantity: line.quantity,
    readyForShipment: false,
    sellableStockBefore: line.sellableStockBefore,
    shipmentState: "ยังไม่สร้างรอบจัดส่ง",
    skuCode: line.skuCode,
    skuName: line.skuName,
    stockWarning: hasShortage
      ? `จำนวนเกินที่ขายได้: ขายได้ ${line.sellableStockBefore} ชิ้น`
      : undefined,
    title: line.title,
    type: "ready-stock",
  };
}

function toCustomWorkReviewLineCard(
  line: CustomWorkReviewLine,
): OrderLineFixture {
  const detail = line.customWorkDetail;
  const detailText = [
    detail.productionDetail,
    detail.sizeDetail ? `ขนาด ${detail.sizeDetail}` : undefined,
    detail.materialDetail ? `วัสดุ ${detail.materialDetail}` : undefined,
    detail.colorDetail ? `สี ${detail.colorDetail}` : undefined,
  ]
    .filter(Boolean)
    .join(" / ");
  const hasIncompleteDetail =
    isBlank(detail.workName) ||
    isBlank(detail.productionDetail) ||
    isBlank(detail.sizeDetail) ||
    isBlank(detail.materialDetail) ||
    isBlank(detail.colorDetail) ||
    line.quantity <= 0 ||
    line.lineTotalBaht <= 0 ||
    (detail.deliveryDateRequired !== false &&
      isBlank(line.deliveryDate ?? detail.deliveryDate));

  return {
    customDetail: hasIncompleteDetail
      ? detailText
        ? `รายละเอียดงานสั่งทำยังไม่ครบ: ${detailText}`
        : "รายละเอียดงานสั่งทำยังไม่ครบ"
      : `รายละเอียดงานสั่งทำ: ${detailText}`,
    deliveryDate: line.deliveryDate ?? detail.deliveryDate,
    editable: true,
    id: line.id,
    imageAlt: line.imageAlt,
    imageSrc: line.imageSrc,
    lineTotalBaht: line.lineTotalBaht,
    quantity: line.quantity,
    readyForShipment: false,
    shipmentState: hasIncompleteDetail
      ? "รายละเอียดงานสั่งทำยังไม่ครบ"
      : "ยังไม่สร้างรอบจัดส่ง",
    title: line.title,
    type: "custom-work",
  };
}

function isBlank(value: string | undefined): boolean {
  return value === undefined || value.trim().length === 0;
}

function StockWarningBlock({
  accepted,
  onAcceptedChange,
  warnings,
}: {
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
  warnings: string[];
}) {
  return (
    <SurfaceCard
      className="border-[#FAD980] bg-[#FEF3C7] text-[#92400E]"
      padding="md"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden className="mt-1 h-5 w-5 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-extrabold">คำเตือนสต๊อกก่อนยืนยัน</p>
          <ul className="mt-2 grid gap-1 text-sm font-semibold leading-6">
            {warnings.map((warning) => (
              <li
                className="break-words [overflow-wrap:anywhere]"
                key={warning}
              >
                {warning}
              </li>
            ))}
          </ul>
          <label className="mt-3 flex min-w-0 cursor-pointer items-start gap-2 text-sm font-semibold leading-6">
            <input
              checked={accepted}
              className="mt-1 h-4 w-4 rounded border-[#FAD980]"
              onChange={(event) => onAcceptedChange(event.target.checked)}
              type="checkbox"
            />
            <span className="min-w-0 break-words [overflow-wrap:anywhere]">
              รับทราบว่าสินค้าขายได้ไม่พอ และต้องการสร้างออเดอร์ต่อ
            </span>
          </label>
        </div>
      </div>
    </SurfaceCard>
  );
}

function BlockingReasonsPanel({ reasons }: { reasons: string[] }) {
  return (
    <SurfaceCard
      className="border-[#FEE4E2] bg-[#FFF7F6] text-[#9F1239]"
      padding="md"
    >
      <p className="text-sm font-extrabold">เหตุผลที่ยังยืนยันไม่ได้</p>
      <ul className="mt-2 grid gap-1 text-sm font-semibold leading-6">
        {reasons.map((reason) => (
          <li className="break-words [overflow-wrap:anywhere]" key={reason}>
            {reason}
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}

function ReviewFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border p-4">
      <dt className="break-words [overflow-wrap:anywhere] text-xs font-bold text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words [overflow-wrap:anywhere] text-sm font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  );
}
