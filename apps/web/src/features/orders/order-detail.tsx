"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  ChevronDown,
  PackageCheck,
  Truck,
  Wrench,
} from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import {
  getOrderConfirmationResult,
  type StoredOrderConfirmationResult,
} from "@/features/orders/order-confirmation-result-store";
import {
  OrderStatusChip,
  ShipmentStatusChip,
} from "@/features/orders/components/order-status-chip";
import { ReadFirstSection } from "@/features/orders/components/read-first-section";
import {
  confirmedOrderFixtureResult,
  formatBaht,
  getOrderById,
  type OrderFixture,
  type OrderLineFixture,
} from "@/features/orders/fixtures/orders";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderDetail({
  currentUser,
  orderId,
}: {
  currentUser: FixtureUser;
  orderId: string;
}) {
  const order = getOrderById(orderId);
  const generatedConfirmationBlocked = Boolean(order?.sourceDraftNo);
  const initialSelectedShipmentLineIds = useMemo(
    () =>
      generatedConfirmationBlocked
        ? []
        : (order?.lines
            .filter((line) => !line.cancelledReason && line.readyForShipment)
            .map((line) => line.id) ?? []),
    [generatedConfirmationBlocked, order],
  );
  const [selectedShipmentLineIds, setSelectedShipmentLineIds] = useState(
    initialSelectedShipmentLineIds,
  );
  const [confirmationResult, setConfirmationResult] =
    useState<StoredOrderConfirmationResult | null>(null);

  useEffect(() => {
    setSelectedShipmentLineIds(initialSelectedShipmentLineIds);
  }, [initialSelectedShipmentLineIds]);

  useEffect(() => {
    const storedResult = getOrderConfirmationResult(orderId);

    if (storedResult) {
      setConfirmationResult(storedResult);
      return;
    }

    setConfirmationResult(
      confirmedOrderFixtureResult.status === "confirmed" &&
        confirmedOrderFixtureResult.confirmedOrder.id === orderId
        ? confirmedOrderFixtureResult
        : null,
    );
  }, [orderId]);

  if (!order) {
    return (
      <EmptyState
        description="ตรวจสอบเลขออเดอร์หรือลองกลับไปหน้าออเดอร์ทั้งหมด"
        title="ไม่พบออเดอร์นี้"
      />
    );
  }

  const readyStockLines = order.lines.filter(
    (line) => line.type === "ready-stock" && !line.cancelledReason,
  );
  const customLines = order.lines.filter(
    (line) => line.type === "custom-work" && !line.cancelledReason,
  );
  const cancelledLines = order.lines.filter((line) => line.cancelledReason);
  const activeLines = order.lines.filter((line) => !line.cancelledReason);
  const hasReadyShipmentLines = activeLines.some(
    (line) => line.readyForShipment,
  );
  const selectedShipmentLineCount = selectedShipmentLineIds.length;
  const isCompleted = order.orderStatus === "จัดส่งครบแล้ว";
  const isCancelled = order.orderStatus === "ยกเลิก";
  const generatedDetailReason =
    "สร้างออเดอร์แล้ว แต่ยังไม่สร้างรอบจัดส่งจากหน้านี้";
  const managementDisabledReason = isCompleted
    ? "ออเดอร์จัดส่งครบแล้ว"
    : generatedConfirmationBlocked
      ? generatedDetailReason
      : undefined;

  function updateShipmentLineSelection(lineId: string, selected: boolean) {
    setSelectedShipmentLineIds((current) => {
      if (selected) {
        return current.includes(lineId) ? current : [...current, lineId];
      }

      return current.filter((candidate) => candidate !== lineId);
    });
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          isCancelled ? (
            <StatusChip variant="danger">ยกเลิกแล้ว</StatusChip>
          ) : (
            <ManageOrderMenu
              currentUser={currentUser}
              disabledReason={managementDisabledReason}
              order={order}
            />
          )
        }
        description="หน้าอ่านข้อมูลออเดอร์ก่อนแก้ แยกสถานะออเดอร์ออกจากสถานะจัดส่ง"
        meta={
          <div className="flex min-w-0 flex-wrap gap-2">
            <span className="inline-flex min-w-0 flex-wrap items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground">
              <span className="min-w-0 break-words text-muted-foreground [overflow-wrap:anywhere]">
                สถานะออเดอร์
              </span>
              <OrderStatusChip status={order.orderStatus} />
            </span>
            <span className="inline-flex min-w-0 flex-wrap items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground">
              <span className="min-w-0 break-words text-muted-foreground [overflow-wrap:anywhere]">
                สถานะจัดส่ง
              </span>
              <ShipmentStatusChip
                kind={order.shipmentSummary.kind}
                label={order.shipmentSummary.label}
              />
            </span>
          </div>
        }
        title={`รายละเอียดออเดอร์ ${order.id}`}
      />

      {confirmationResult ? (
        <ConfirmationDetailBanner result={confirmationResult} />
      ) : null}

      {isCompleted ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="break-words text-sm font-bold leading-6 text-[#166534] [overflow-wrap:anywhere]">
            ออเดอร์จัดส่งครบแล้ว จึงอ่านอย่างเดียวและไม่แก้รายการ ผู้รับ
            หรือข้อมูลที่กระทบการจัดส่งในขั้นตอนปกติ
          </p>
        </SurfaceCard>
      ) : null}

      <ReadFirstSection title="สรุปออเดอร์" titleId="order-summary">
        <dl className="grid md:grid-cols-2 xl:grid-cols-4">
          <Fact label="เลขออเดอร์" value={order.id} />
          {order.sourceDraftNo ? (
            <Fact
              label="แหล่งที่มา"
              value={`${order.sourceDraftNo} แปลงเป็นออเดอร์แล้ว`}
            />
          ) : null}
          <Fact label="ลูกค้า" value={order.customerName} />
          <Fact label="เบอร์ลูกค้า" value={order.customerPhone} />
          <Fact label="ระดับลูกค้า" value={order.customerTier} />
          <Fact label="ผู้รับสินค้า" value={order.recipientName} />
          <Fact label="เบอร์ผู้รับ" value={order.recipientPhone} />
          <Fact label="วันที่สร้าง" value={order.createdDate} />
          <Fact label="ยอดรวม" value={formatBaht(order.netTotalBaht)} />
          <div className="md:col-span-2 xl:col-span-4">
            <Fact label="ที่อยู่จัดส่ง" value={order.address} />
          </div>
        </dl>
      </ReadFirstSection>

      <ReadFirstSection
        action={
          isCompleted || isCancelled ? (
            <div className="grid justify-items-start gap-1 sm:justify-items-end">
              <Button
                disabled
                size="sm"
                title={
                  isCompleted ? "ออเดอร์จัดส่งครบแล้ว" : "ออเดอร์ยกเลิกแล้ว"
                }
                variant="outline"
              >
                แก้ไขรายการออเดอร์
              </Button>
              <p className="max-w-64 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere] sm:text-right">
                {isCompleted
                  ? "ออเดอร์จัดส่งครบแล้ว จึงอ่านอย่างเดียวในขั้นตอนปกติ"
                  : "ออเดอร์ยกเลิกแล้ว จึงไม่เปิดการแก้รายการ"}
              </p>
            </div>
          ) : generatedConfirmationBlocked ? (
            <div className="grid justify-items-start gap-1 sm:justify-items-end">
              <Button
                disabled
                size="sm"
                title={generatedDetailReason}
                variant="outline"
              >
                แก้ไขรายการออเดอร์
              </Button>
              <p className="max-w-64 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere] sm:text-right">
                {generatedDetailReason}
              </p>
            </div>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link
                href={orderHref(orderRoutes.lineEdit(order.id), currentUser)}
              >
                แก้ไขรายการออเดอร์
              </Link>
            </Button>
          )
        }
        title="รายการในออเดอร์"
        titleId="order-lines"
      >
        {readyStockLines.length > 0 ? (
          <LineGroup lines={readyStockLines} title="สินค้าพร้อมส่ง" />
        ) : null}
        {customLines.length > 0 ? (
          <LineGroup lines={customLines} title="งานสั่งทำ" />
        ) : null}
        {cancelledLines.length > 0 ? (
          <LineGroup lines={cancelledLines} title="รายการที่ยกเลิกแล้ว" />
        ) : null}
      </ReadFirstSection>

      <ReadFirstSection
        description="เลือกเฉพาะรายการที่พร้อมส่ง รายการที่ยังไปต่อไม่ได้จะแสดงเหตุผลไว้ในแถว"
        title="จัดการรอบจัดส่ง"
        titleId="shipment-management"
      >
        <div className="grid">
          {activeLines.map((line) => (
            <ShipmentSelectionRow
              disabledReasonOverride={
                generatedConfirmationBlocked ? generatedDetailReason : undefined
              }
              key={line.id}
              line={line}
              onSelectedChange={(selected) =>
                updateShipmentLineSelection(line.id, selected)
              }
              selected={selectedShipmentLineIds.includes(line.id)}
            />
          ))}
        </div>
        <div className="border-t border-border p-4">
          {generatedConfirmationBlocked ? (
            <Button disabled title={generatedDetailReason}>
              <Truck aria-hidden className="mr-2 h-4 w-4" />
              สร้างรอบจัดส่งจากรายการที่เลือก
            </Button>
          ) : hasReadyShipmentLines && selectedShipmentLineCount > 0 ? (
            <Button asChild>
              <Link
                href={shipmentHref(
                  shipmentRoutes.builder(order.id),
                  currentUser,
                )}
              >
                <Truck aria-hidden className="mr-2 h-4 w-4" />
                สร้างรอบจัดส่งจากรายการที่เลือก
              </Link>
            </Button>
          ) : (
            <Button
              disabled
              title={
                hasReadyShipmentLines
                  ? "เลือกอย่างน้อย 1 รายการพร้อมส่งก่อนสร้างรอบจัดส่ง"
                  : "ไม่มีรายการพร้อมส่งในออเดอร์นี้"
              }
            >
              <Truck aria-hidden className="mr-2 h-4 w-4" />
              สร้างรอบจัดส่งจากรายการที่เลือก
            </Button>
          )}
          <p className="mt-2 break-words text-sm font-semibold text-muted-foreground [overflow-wrap:anywhere]">
            {generatedConfirmationBlocked
              ? generatedDetailReason
              : hasReadyShipmentLines
                ? `เลือก ${selectedShipmentLineCount} รายการพร้อมส่งเพื่อสร้างรอบจัดส่ง`
                : "ไม่มีรายการพร้อมส่งที่เลือกได้ในออเดอร์นี้"}
          </p>
        </div>
      </ReadFirstSection>

      <ReadFirstSection
        title="รอบจัดส่งที่เกี่ยวข้อง"
        titleId="related-shipments"
      >
        {order.shipmentRounds.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-subtle text-xs font-bold text-muted-foreground">
                <tr>
                  {[
                    "เลขรอบจัดส่ง",
                    "วันที่สร้างรอบ",
                    "วันที่ส่งออก",
                    "ขนส่ง",
                    "Tracking",
                    "สถานะ",
                    "การทำงาน",
                  ].map((heading) => (
                    <th className="px-3 py-3" key={heading} scope="col">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {order.shipmentRounds.map((round) => (
                  <tr className="border-t border-border" key={round.shipmentNo}>
                    <td className="px-3 py-4 font-bold text-foreground">
                      {round.shipmentNo}
                    </td>
                    <td className="px-3 py-4">{round.createdDate}</td>
                    <td className="px-3 py-4">{round.sentOutDate ?? "-"}</td>
                    <td className="px-3 py-4">{round.carrier}</td>
                    <td className="px-3 py-4">{round.tracking ?? "-"}</td>
                    <td className="px-3 py-4">
                      <StatusChip variant="neutral">{round.status}</StatusChip>
                    </td>
                    <td className="px-3 py-4">
                      <div className="grid justify-items-end gap-1">
                        <Button asChild size="sm" variant="outline">
                          <Link
                            href={shipmentHref(
                              shipmentRoutes.detail(round.shipmentNo),
                              currentUser,
                            )}
                          >
                            เปิดรอบจัดส่ง
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-sm font-semibold text-muted-foreground">
            ยังไม่มีรอบจัดส่งที่เกี่ยวข้อง
          </div>
        )}
      </ReadFirstSection>

      <ReadFirstSection title="การชำระเงิน" titleId="payment-summary">
        <div className="grid md:grid-cols-2 xl:grid-cols-4">
          <Fact label="เงื่อนไขชำระเงิน" value={order.payment.term} />
          <Fact label="ยอดรวม" value={formatBaht(order.netTotalBaht)} />
          <Fact label="ยอดรับแล้ว" value={formatBaht(order.payment.paidBaht)} />
          <Fact
            label="ยอดค้าง"
            value={formatBaht(order.payment.outstandingBaht)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-border p-4">
          <StatusChip variant="neutral">
            {order.payment.followUpStatus}
          </StatusChip>
        </div>
      </ReadFirstSection>

      <ReadFirstSection title="ประวัติ" titleId="order-history">
        <ol className="grid">
          {order.timeline.map((event) => (
            <li
              className="grid min-w-0 gap-1 border-b border-border p-4 last:border-b-0"
              key={`${event.title}-${event.detail}`}
            >
              <p className="break-words text-sm font-bold text-foreground [overflow-wrap:anywhere]">
                {event.title}
              </p>
              <p className="break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                {event.detail}
              </p>
            </li>
          ))}
        </ol>
      </ReadFirstSection>
    </div>
  );
}

function ConfirmationDetailBanner({
  result,
}: {
  result: StoredOrderConfirmationResult;
}) {
  return (
    <SurfaceCard
      className="border-[#BFE5C9] bg-[#E6F4EA]"
      data-testid="confirmation-detail-banner"
      padding="md"
    >
      <div className="grid min-w-0 gap-4">
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3 text-[#166534]">
            <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="break-words text-base font-extrabold [overflow-wrap:anywhere]">
                สร้างออเดอร์สำเร็จ
              </p>
              <p className="mt-1 break-words text-sm font-semibold leading-6 [overflow-wrap:anywhere]">
                ผลหลังยืนยันถูกสรุปไว้ที่รายละเอียดออเดอร์นี้
              </p>
            </div>
          </div>
          <StatusChip variant="neutral">ยังไม่สร้างรอบจัดส่ง</StatusChip>
        </div>

        <div className="grid min-w-0 gap-3 md:grid-cols-3">
          <ConfirmationMetric
            label="เลขออเดอร์"
            value={result.confirmedOrder.id}
          />
          <ConfirmationMetric
            label="JOB-O ที่สร้าง"
            value={
              result.generatedJobs.length > 0
                ? result.generatedJobs.map((job) => job.id).join(", ")
                : "ไม่มีงานสั่งทำ"
            }
          />
          <ConfirmationMetric
            label="ผลจองสินค้าพร้อมส่ง"
            value={
              result.readyStockReservationOutcomes.length > 0
                ? `${result.readyStockReservationOutcomes.length} รายการ`
                : "ไม่มีสินค้าพร้อมส่ง"
            }
          />
        </div>

        {result.generatedJobs.length > 0 ? (
          <div className="grid min-w-0 gap-3 lg:grid-cols-2">
            {result.generatedJobs.map((job) => (
              <div
                className="min-w-0 rounded-md border border-[#BFE5C9] bg-white/80 p-3"
                key={job.id}
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <Wrench aria-hidden className="h-4 w-4 text-[#166534]" />
                  <StatusChip variant="revision">
                    {job.id} / งานลูกค้า
                  </StatusChip>
                  <StatusChip variant="neutral">{job.status}</StatusChip>
                </div>
                <p className="mt-2 break-words text-sm font-extrabold text-foreground [overflow-wrap:anywhere]">
                  {job.workName} • {job.quantity} ชิ้น
                </p>
                <p className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                  {[
                    job.sizeDetail ? `ขนาด ${job.sizeDetail}` : undefined,
                    job.materialDetail
                      ? `วัสดุ ${job.materialDetail}`
                      : undefined,
                    job.colorDetail ? `สี ${job.colorDetail}` : undefined,
                    job.currentDepartment,
                  ]
                    .filter(Boolean)
                    .join(" / ")}
                </p>
                <p className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                  {[
                    job.woodworkDetail
                      ? `ช่างไม้: ${job.woodworkDetail}`
                      : undefined,
                    job.coloringDetail
                      ? `ฝ่ายสี/ตกแต่ง: ${job.coloringDetail}`
                      : undefined,
                    job.rakSamukDetail
                      ? `รักสมุก: ${job.rakSamukDetail}`
                      : undefined,
                    job.deliveryDate
                      ? `กำหนดส่ง ${job.deliveryDate}`
                      : undefined,
                    job.referenceImageCount > 0
                      ? `รูปอ้างอิง ${job.referenceImageCount} รายการ`
                      : undefined,
                    "ที่มา: ออเดอร์",
                  ]
                    .filter(Boolean)
                    .join(" / ")}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {result.readyStockReservationOutcomes.length > 0 ? (
          <div className="grid min-w-0 gap-3 lg:grid-cols-2">
            {result.readyStockReservationOutcomes.map((outcome) => (
              <div
                className="min-w-0 rounded-md border border-[#BFE5C9] bg-white/80 p-3"
                key={outcome.lineId}
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <PackageCheck
                    aria-hidden
                    className="h-4 w-4 text-[#166534]"
                  />
                  <p className="break-words text-sm font-extrabold text-foreground [overflow-wrap:anywhere]">
                    {outcome.skuCode}
                  </p>
                  <StatusChip
                    variant={
                      outcome.outcome === "shortage-acknowledged"
                        ? "warning"
                        : "success"
                    }
                  >
                    {outcome.outcome === "shortage-acknowledged"
                      ? "รับทราบสต๊อกไม่พอแล้ว"
                      : "พร้อมจอง"}
                  </StatusChip>
                </div>
                <p className="mt-2 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                  จอง {outcome.quantity} ชิ้น จากขายได้ก่อนยืนยัน{" "}
                  {outcome.sellableStockBefore} ชิ้น / คาดขายได้หลังจอง{" "}
                  {outcome.projectedSellableAfter} ชิ้น
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </SurfaceCard>
  );
}

function ConfirmationMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-md border border-[#BFE5C9] bg-white/80 p-3">
      <p className="break-words text-xs font-bold text-muted-foreground [overflow-wrap:anywhere]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-extrabold leading-6 text-foreground [overflow-wrap:anywhere]">
        {value}
      </p>
    </div>
  );
}

function ManageOrderMenu({
  currentUser,
  disabledReason,
  order,
}: {
  currentUser: FixtureUser;
  disabledReason?: string;
  order: OrderFixture;
}) {
  const disabled = Boolean(disabledReason);

  return (
    <details className="relative min-w-0">
      <summary className="inline-flex min-h-10 min-w-0 cursor-pointer list-none items-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden">
        จัดการออเดอร์
        <ChevronDown aria-hidden className="ml-2 h-4 w-4" />
      </summary>
      <div className="absolute left-0 z-20 mt-2 grid w-[min(18rem,calc(100vw-2rem))] gap-1 rounded-lg border border-border bg-surface p-2 shadow-lifted sm:left-auto sm:right-0">
        {disabled ? (
          <MenuDisabled>แก้ไขรายการสินค้า: {disabledReason}</MenuDisabled>
        ) : (
          <MenuLink
            href={orderHref(orderRoutes.lineEdit(order.id), currentUser)}
          >
            แก้ไขรายการสินค้า
          </MenuLink>
        )}
        {disabled ? (
          <MenuDisabled>แก้ไขงานสั่งทำ: {disabledReason}</MenuDisabled>
        ) : (
          <MenuLink
            href={orderHref(orderRoutes.lineEdit(order.id), currentUser)}
          >
            แก้ไขงานสั่งทำ
          </MenuLink>
        )}
        {disabled ? (
          <MenuDisabled>จัดการรอบจัดส่ง: {disabledReason}</MenuDisabled>
        ) : (
          <MenuLink href="#shipment-management">จัดการรอบจัดส่ง</MenuLink>
        )}
        <MenuDisabled>
          ยกเลิกออเดอร์: มีงานต่อเนื่องที่ต้องจัดการก่อน
        </MenuDisabled>
      </div>
    </details>
  );
}

function MenuLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      className="min-h-10 min-w-0 break-words rounded-md px-3 py-2 text-sm font-semibold text-foreground transition [overflow-wrap:anywhere] hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      href={href}
    >
      {children}
    </Link>
  );
}

function MenuDisabled({ children }: { children: ReactNode }) {
  return (
    <span className="min-h-10 min-w-0 break-words rounded-md px-3 py-2 text-sm font-semibold leading-6 text-muted-foreground opacity-70 [overflow-wrap:anywhere]">
      {children}
    </span>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-border p-4">
      <dt className="break-words text-xs font-bold text-muted-foreground [overflow-wrap:anywhere]">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-semibold leading-6 text-foreground [overflow-wrap:anywhere]">
        {value}
      </dd>
    </div>
  );
}

function LineGroup({
  lines,
  title,
}: {
  lines: OrderLineFixture[];
  title: string;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <div className="border-b border-border bg-subtle px-4 py-3">
        <p className="break-words text-sm font-extrabold text-foreground [overflow-wrap:anywhere]">
          {title}
        </p>
      </div>
      {lines.map((line) => (
        <OrderLineCard key={line.id} line={line} />
      ))}
    </div>
  );
}

function ShipmentSelectionRow({
  disabledReasonOverride,
  line,
  onSelectedChange,
  selected,
}: {
  disabledReasonOverride?: string;
  line: OrderLineFixture;
  onSelectedChange: (selected: boolean) => void;
  selected: boolean;
}) {
  const disabledReason =
    disabledReasonOverride ??
    (line.readyForShipment
      ? undefined
      : (line.shipmentBlockedReason ?? "ยังเลือกสร้างรอบจัดส่งไม่ได้"));
  const selectable = line.readyForShipment && !disabledReason;

  return (
    <div className="grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
      <label
        className={`flex min-w-0 items-start gap-3 ${
          selectable ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <input
          checked={selected}
          className="mt-1 h-4 w-4 rounded border-border"
          disabled={!selectable}
          onChange={(event) => onSelectedChange(event.target.checked)}
          type="checkbox"
        />
        <span className="min-w-0">
          <span className="block break-words text-sm font-bold text-foreground [overflow-wrap:anywhere]">
            {line.title}
          </span>
          <span className="mt-1 block break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            {line.quantity} ชิ้น • {line.shipmentState}
          </span>
        </span>
      </label>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {disabledReason ? (
          <StatusChip variant="warning">{disabledReason}</StatusChip>
        ) : selected ? (
          <StatusChip variant="success">เลือกแล้ว</StatusChip>
        ) : (
          <StatusChip variant="success">เลือกได้</StatusChip>
        )}
      </div>
    </div>
  );
}
