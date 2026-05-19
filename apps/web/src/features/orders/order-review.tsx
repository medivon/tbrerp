"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FilePenLine,
  PackageCheck,
  Wrench,
} from "lucide-react";
import {
  confirmOrderFromReview,
  type CustomWorkReviewLine,
  type ReadyStockReviewLine,
} from "@thaiboran/domain";
import { Button, PageHeader, StatusChip, SurfaceCard } from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import { ReadFirstSection } from "@/features/orders/components/read-first-section";
import { ReviewImpactPanel } from "@/features/orders/components/review-impact-panel";
import {
  formatBaht,
  type OrderConfirmationFixtureResult,
  type OrderLineFixture,
  type OrderReviewScenarioId,
} from "@/features/orders/fixtures/orders";
import { useOrderEntryMemoryState } from "@/features/orders/order-entry-memory-store";
import {
  createOrderConfirmationInputFromEntryState,
  getOrderEntrySourceLabel,
} from "@/features/orders/order-entry-state";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderReview({
  currentUser,
  scenarioId = "valid",
}: {
  currentUser: FixtureUser;
  scenarioId?: OrderReviewScenarioId;
}) {
  const [stockShortageAccepted, setStockShortageAccepted] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<OrderConfirmationFixtureResult | null>(null);
  const entryState = useOrderEntryMemoryState();
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
  const canConfirm =
    confirmationPreview.status === "confirmed" && !confirmationResult;
  const confirmDisabledReason = confirmationResult
    ? "ยืนยันแล้วใน fixture result นี้"
    : blockingReasons.length > 0
      ? blockingReasons.map((reason) => reason.message).join(" / ")
      : "ตรวจสอบข้อมูลก่อนยืนยัน";

  function updateStockShortageAccepted(accepted: boolean) {
    setStockShortageAccepted(accepted);
    setConfirmationResult(null);
  }

  function confirmFixtureOrder() {
    if (confirmationPreview.status === "confirmed") {
      setConfirmationResult(confirmationPreview);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <>
            <Button asChild variant="outline">
              <Link href={orderHref(orderRoutes.create, currentUser)}>
                <ArrowLeft aria-hidden className="mr-2 h-4 w-4" />
                กลับ
              </Link>
            </Button>
            <Button disabled title="ยังไม่บันทึกร่างจริงใน Sector 4">
              <FilePenLine aria-hidden className="mr-2 h-4 w-4" />
              บันทึกร่าง
            </Button>
          </>
        }
        description="ตรวจสอบข้อมูลจากหน่วยความจำของหน้า Create หรือ fixture โดยยังไม่เขียนฐานข้อมูลจริง"
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
            <StatusChip variant="action">
              {getOrderEntrySourceLabel(entryState)}
            </StatusChip>
            <StatusChip variant="neutral">ไม่ใช่การบันทึกจริง</StatusChip>
            {hasStockWarning ? (
              <StatusChip variant="warning">ต้องรับทราบคำเตือน</StatusChip>
            ) : null}
            {scenarioId !== "valid" ? (
              <StatusChip variant="neutral">Fixture blocked case</StatusChip>
            ) : null}
          </div>
        }
        title="ตรวจสอบก่อนสร้างออเดอร์"
      />

      {confirmationResult?.status === "confirmed" ? (
        <ConfirmationResultPanel
          currentUser={currentUser}
          result={confirmationResult}
        />
      ) : null}

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
          confirmDisabledReason={confirmDisabledReason}
          hasStockWarning={hasStockWarning}
          onConfirm={confirmFixtureOrder}
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
    customDetail: detailText
      ? `รายละเอียดงานสั่งทำ: ${detailText}`
      : "รายละเอียดงานสั่งทำยังไม่ครบ",
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
              <li key={warning}>{warning}</li>
            ))}
          </ul>
          <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm font-semibold leading-6">
            <input
              checked={accepted}
              className="mt-1 h-4 w-4 rounded border-[#FAD980]"
              onChange={(event) => onAcceptedChange(event.target.checked)}
              type="checkbox"
            />
            รับทราบคำเตือนสต๊อกไม่พอและยอมให้ผลจองแสดงขาด/ติดลบในผล fixture
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
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </SurfaceCard>
  );
}

function ConfirmationResultPanel({
  currentUser,
  result,
}: {
  currentUser: FixtureUser;
  result: Extract<OrderConfirmationFixtureResult, { status: "confirmed" }>;
}) {
  return (
    <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CheckCircle2 aria-hidden className="h-5 w-5 text-[#166534]" />
            <p className="text-base font-extrabold text-[#166534]">
              สร้างออเดอร์สำเร็จใน fixture/dev result
            </p>
            <StatusChip variant="neutral">ไม่เขียนฐานข้อมูลจริง</StatusChip>
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#166534]">
            {result.confirmedOrder.fixtureOnlyNotice}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link
            href={orderHref(
              orderRoutes.detail(result.confirmedOrder.id),
              currentUser,
            )}
          >
            เปิด Order Detail
            <ExternalLink aria-hidden className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <ResultMetric label="เลขออเดอร์" value={result.confirmedOrder.id} />
        <ResultMetric
          label="JOB-O ที่สร้าง"
          value={
            result.generatedJobs.length > 0
              ? result.generatedJobs.map((job) => job.id).join(", ")
              : "ไม่มีงานสั่งทำ"
          }
        />
        <ResultMetric
          label="ปลายทางถัดไป"
          value="ไปหน้า Order Detail แบบ read-first"
        />
      </div>

      {result.convertedDraft ? (
        <p className="mt-4 rounded-md border border-[#BFE5C9] bg-white/70 px-3 py-2 text-sm font-bold leading-6 text-[#166534]">
          {result.convertedDraft.draftNo} {result.convertedDraft.status}{" "}
          และถูกซ่อนจากร่าง active ในผล fixture
        </p>
      ) : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ResultSection
          icon={<Wrench aria-hidden className="h-4 w-4" />}
          title="JOB-O ที่สร้าง"
        >
          {result.generatedJobs.map((job) => (
            <div
              className="rounded-md border border-[#BFE5C9] bg-white/80 p-3"
              key={job.id}
            >
              <p className="text-sm font-extrabold text-foreground">
                {job.id} / งานลูกค้า
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                {job.workName} • {job.quantity} ชิ้น • {job.currentDepartment} •{" "}
                {job.status}
              </p>
              <p className="mt-1 text-sm leading-6 text-foreground">
                {job.productionDetail} / {job.materialDetail} /{" "}
                {job.colorDetail}
              </p>
            </div>
          ))}
        </ResultSection>

        <ResultSection
          icon={<PackageCheck aria-hidden className="h-4 w-4" />}
          title="ผลจองสินค้าพร้อมส่ง"
        >
          {result.readyStockReservationOutcomes.map((outcome) => (
            <div
              className="rounded-md border border-[#BFE5C9] bg-white/80 p-3"
              key={outcome.lineId}
            >
              <p className="text-sm font-extrabold text-foreground">
                {outcome.skuCode}
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                จอง {outcome.quantity} ชิ้น จากขายได้ก่อนยืนยัน{" "}
                {outcome.sellableStockBefore} ชิ้น
              </p>
              <StatusChip
                variant={
                  outcome.outcome === "shortage-acknowledged"
                    ? "warning"
                    : "success"
                }
              >
                คาดขายได้หลังจอง {outcome.projectedSellableAfter} ชิ้น
              </StatusChip>
            </div>
          ))}
        </ResultSection>
      </div>

      {result.acknowledgedWarnings.length > 0 ? (
        <div className="mt-4 rounded-md border border-[#FAD980] bg-[#FEF3C7] p-3 text-[#92400E]">
          <p className="text-sm font-extrabold">คำเตือนที่รับทราบแล้ว</p>
          <ul className="mt-2 grid gap-1 text-sm font-semibold leading-6">
            {result.acknowledgedWarnings.map((warning) => (
              <li key={warning.id}>{warning.message}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </SurfaceCard>
  );
}

function ResultSection({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) {
  return (
    <section className="grid gap-3">
      <div className="flex items-center gap-2 text-sm font-extrabold text-[#166534]">
        {icon}
        {title}
      </div>
      {children}
    </section>
  );
}

function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#BFE5C9] bg-white/80 p-3">
      <p className="text-xs font-bold text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-extrabold leading-6 text-foreground">
        {value}
      </p>
    </div>
  );
}

function ReviewFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border p-4">
      <dt className="text-xs font-bold text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  );
}
