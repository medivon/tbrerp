"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Plus, ShieldAlert } from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { CustomWorkEntryModal } from "@/features/orders/components/custom-work-entry-modal";
import {
  EditGroup,
  ImpactSummary,
  ReviewChangesPanel,
  SummaryRow,
} from "@/features/orders/components/order-line-edit-preview";
import { OrderStatusChip } from "@/features/orders/components/order-status-chip";
import { ProductSelectModal } from "@/features/orders/components/product-select-modal";
import {
  formatBaht,
  getOrderById,
  type OrderLineFixture,
} from "@/features/orders/fixtures/orders";
import {
  buildCustomDetail,
  calculateLineEditImpact,
  nextAddedLineIndex,
} from "@/features/orders/order-line-edit-state";
import {
  createBlankCustomWorkLineDraft,
  getCustomWorkDraftMissingFields,
  readyStockOptions,
  type CustomWorkLineDraft,
} from "@/features/orders/order-entry-state";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

type ActiveLineEditModal = "custom" | "product" | null;

export function OrderLineEdit({
  currentUser,
  orderId,
}: {
  currentUser: FixtureUser;
  orderId: string;
}) {
  const order = getOrderById(orderId);
  const [activeModal, setActiveModal] = useState<ActiveLineEditModal>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [draftLines, setDraftLines] = useState<OrderLineFixture[]>(
    () => order?.lines ?? [],
  );

  const impact = useMemo(
    () => (order ? calculateLineEditImpact(order.lines, draftLines) : null),
    [draftLines, order],
  );

  if (!order || !impact) {
    return <EmptyState title="ไม่พบออเดอร์สำหรับแก้ไขรายการ" />;
  }

  const readyStockLines = draftLines.filter(
    (line) => line.type === "ready-stock",
  );
  const customLines = draftLines.filter((line) => line.type === "custom-work");
  const editableLines = draftLines.filter((line) => line.editable);
  const blockedLines = draftLines.filter((line) => !line.editable);
  const canReviewChanges = impact.hasChanges;
  const reviewReason = canReviewChanges
    ? "ตรวจสอบรายการที่เปลี่ยนก่อนบันทึก"
    : "ยังไม่มีการเปลี่ยนแปลงให้ตรวจสอบ";

  function updateQuantity(lineId: string, quantity: number) {
    setReviewOpen(false);
    setDraftLines((current) =>
      current.map((line) => {
        if (line.id !== lineId || !line.editable) {
          return line;
        }

        const nextQuantity = Math.max(1, Math.floor(quantity));
        const sellableStock = line.sellableStockBefore;
        const stockWarning =
          line.type === "ready-stock" &&
          sellableStock !== undefined &&
          nextQuantity > sellableStock
            ? `จำนวนเกินที่ขายได้: ขายได้ ${sellableStock} ชิ้น`
            : undefined;

        return {
          ...line,
          lineTotalBaht:
            nextQuantity *
            Math.round(line.lineTotalBaht / Math.max(line.quantity, 1)),
          quantity: nextQuantity,
          readyForShipment:
            line.type === "ready-stock" ? false : line.readyForShipment,
          shipmentBlockedReason:
            line.type === "ready-stock"
              ? "ต้องตรวจสอบการแก้ไขก่อนจัดการรอบจัดส่ง"
              : line.shipmentBlockedReason,
          shipmentState: stockWarning
            ? "รอตรวจสอบการแก้ไข / จำนวนเกินที่ขายได้"
            : line.type === "ready-stock"
              ? "รอตรวจสอบการแก้ไข"
              : line.shipmentState,
          stockWarning,
        };
      }),
    );
  }

  function removeEditableLine(lineId: string) {
    setReviewOpen(false);
    setDraftLines((current) =>
      current.filter((line) => line.id !== lineId || !line.editable),
    );
  }

  function addReadyStockLine(selection: {
    optionId: string;
    quantity: number;
  }) {
    const option = readyStockOptions.find(
      (candidate) => candidate.id === selection.optionId,
    );

    if (!option) {
      return;
    }

    const quantity = Math.max(1, Math.floor(selection.quantity));
    const addedIndex = nextAddedLineIndex(draftLines, "line-edit-ready-added-");

    setReviewOpen(false);
    setDraftLines((current) => [
      ...current,
      {
        color: option.color,
        dimensions: option.dimensions,
        editable: true,
        id: `line-edit-ready-added-${addedIndex}`,
        imageAlt: option.imageAlt,
        imageSrc: option.imageSrc,
        lineTotalBaht: option.unitPriceBaht * quantity,
        quantity,
        readyForShipment: false,
        sellableStockBefore: option.sellableStock,
        shipmentBlockedReason: "ต้องตรวจสอบการแก้ไขก่อนจัดการรอบจัดส่ง",
        shipmentState:
          quantity > option.sellableStock
            ? "รอตรวจสอบการแก้ไข / จำนวนเกินที่ขายได้"
            : "รอตรวจสอบการแก้ไข",
        skuCode: option.skuCode,
        skuName: option.productModelName,
        stockWarning:
          quantity > option.sellableStock
            ? `จำนวนเกินที่ขายได้: ขายได้ ${option.sellableStock} ชิ้น`
            : undefined,
        title: option.productModelName,
        type: "ready-stock",
      },
    ]);
    setActiveModal(null);
  }

  function addCustomWorkLine(draft: CustomWorkLineDraft) {
    const addedIndex = nextAddedLineIndex(
      draftLines,
      "line-edit-custom-added-",
    );
    const missingFields = getCustomWorkDraftMissingFields(draft);
    const quantity = Math.max(1, Math.floor(draft.quantity));
    const title =
      draft.workName.trim().length > 0
        ? draft.workName.trim()
        : `งานสั่งทำ ${addedIndex}`;

    setReviewOpen(false);
    setDraftLines((current) => [
      ...current,
      {
        color: draft.colorDetail,
        customDetail: buildCustomDetail(draft),
        deliveryDate: draft.deliveryDate,
        editable: true,
        id: `line-edit-custom-added-${addedIndex}`,
        imageAlt: "งานสั่งทำไม้สัก",
        imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
        lineTotalBaht: Math.max(0, draft.unitPriceBaht) * quantity,
        quantity,
        readyForShipment: false,
        shipmentBlockedReason:
          missingFields.length > 0
            ? "รายละเอียดงานสั่งทำยังไม่ครบ"
            : "ต้องตรวจสอบการแก้ไขก่อนจัดการรอบจัดส่ง",
        shipmentState:
          missingFields.length > 0
            ? "รายละเอียดงานสั่งทำยังไม่ครบ"
            : "รอตรวจสอบการแก้ไข",
        title,
        type: "custom-work",
      },
    ]);
    setActiveModal(null);
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1480px] gap-5">
        <PageHeader
          actions={
            <>
              <Button asChild variant="outline">
                <Link
                  href={orderHref(orderRoutes.detail(order.id), currentUser)}
                >
                  <ArrowLeft aria-hidden className="mr-2 h-4 w-4" />
                  กลับรายละเอียดออเดอร์
                </Link>
              </Button>
              <div className="grid justify-items-start gap-1 sm:justify-items-end">
                <Button
                  disabled={!canReviewChanges}
                  onClick={() => setReviewOpen(true)}
                  title={canReviewChanges ? undefined : reviewReason}
                  type="button"
                >
                  ตรวจสอบการแก้ไข
                </Button>
                <p className="max-w-64 break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere] sm:text-right">
                  {reviewReason}
                </p>
              </div>
            </>
          }
          description="โหมดแก้ไขรายการของออเดอร์ที่ยืนยันแล้ว ไม่ใช่การสร้างออเดอร์ใหม่ และไม่มีร่างอัตโนมัติ"
          meta={
            <div className="flex flex-wrap gap-2">
              <StatusChip variant="neutral">{order.id}</StatusChip>
              <OrderStatusChip status={order.orderStatus} />
            </div>
          }
          title="แก้ไขรายการออเดอร์"
        />

        <SurfaceCard className="border-[#FAD980] bg-[#FEF3C7]" padding="md">
          <div className="flex items-start gap-3 text-[#92400E]">
            <ShieldAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="break-words text-sm font-extrabold [overflow-wrap:anywhere]">
                ตรวจสอบการแก้ไขก่อนบันทึก
              </p>
              <p className="mt-1 break-words text-sm font-semibold leading-6 [overflow-wrap:anywhere]">
                บางรายการแก้ไม่ได้เพราะมี JOB-O อยู่ในรอบจัดส่ง ส่งออกแล้ว
                หรือออเดอร์ปิดแล้ว เหตุผลจะแสดงในแถวรายการ
              </p>
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-5">
            <SurfaceCard className="grid gap-3" padding="md">
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setActiveModal("product")}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Plus aria-hidden className="mr-2 h-4 w-4" />
                  เพิ่มสินค้าพร้อมส่ง
                </Button>
                <Button
                  onClick={() => setActiveModal("custom")}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Plus aria-hidden className="mr-2 h-4 w-4" />
                  เพิ่มงานสั่งทำ
                </Button>
              </div>
            </SurfaceCard>

            <EditGroup
              lines={readyStockLines}
              onQuantityChange={updateQuantity}
              onRemoveLine={removeEditableLine}
              title="สินค้าพร้อมส่ง"
            />
            <EditGroup
              lines={customLines}
              onQuantityChange={updateQuantity}
              onRemoveLine={removeEditableLine}
              title="งานสั่งทำ"
            />

            {reviewOpen ? (
              <ReviewChangesPanel
                impact={impact}
                onBackToEdit={() => setReviewOpen(false)}
                orderId={order.id}
              />
            ) : null}

            <SurfaceCard className="grid gap-4" padding="md">
              <div>
                <p className="break-words text-base font-extrabold text-foreground [overflow-wrap:anywhere]">
                  ตรวจสอบการแก้ไข
                </p>
                <p className="mt-1 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                  ตรวจสอบผลกระทบของการแก้ไขก่อนบันทึก
                </p>
              </div>
              <ImpactSummary impact={impact} />
              <div className="grid gap-2 border-t border-border pt-4 sm:flex sm:flex-wrap">
                <Button asChild variant="outline">
                  <Link
                    href={orderHref(orderRoutes.detail(order.id), currentUser)}
                  >
                    ยกเลิก
                  </Link>
                </Button>
                <Button
                  disabled
                  title="ต้องตรวจผลกระทบการเงิน งานต่อเนื่อง และรอบจัดส่งให้ครบก่อนบันทึก"
                >
                  บันทึกการแก้ไข
                </Button>
                <p className="basis-full break-words text-xs font-semibold leading-5 text-muted-foreground [overflow-wrap:anywhere]">
                  ต้องตรวจผลกระทบการเงิน งานต่อเนื่อง
                  และรอบจัดส่งให้ครบก่อนบันทึก
                </p>
              </div>
            </SurfaceCard>
          </div>

          <SurfaceCard
            className="grid gap-4 lg:sticky lg:top-24"
            padding="md"
            variant="shell"
          >
            <div>
              <p className="break-words text-base font-extrabold text-shell-foreground [overflow-wrap:anywhere]">
                สรุปผลกระทบ
              </p>
              <p className="mt-1 break-words text-sm leading-6 text-shell-muted [overflow-wrap:anywhere]">
                แสดงตำแหน่งข้อมูลที่ต้องตรวจสอบก่อนบันทึก
              </p>
            </div>
            <div className="grid gap-2">
              <SummaryRow
                label="ยอดออเดอร์ปัจจุบัน"
                value={formatBaht(order.netTotalBaht)}
              />
              <SummaryRow
                label="ยอดหลังแก้ไข"
                value={formatBaht(impact.nextTotalBaht)}
              />
              <SummaryRow
                label="รายการที่แก้ได้"
                value={`${editableLines.length}`}
              />
              <SummaryRow
                label="รายการอ่านอย่างเดียว"
                value={`${blockedLines.length}`}
              />
            </div>
            <Button
              disabled={!canReviewChanges}
              onClick={() => setReviewOpen(true)}
              title={canReviewChanges ? undefined : reviewReason}
              type="button"
            >
              ตรวจสอบการแก้ไข
            </Button>
            <p className="break-words text-xs font-semibold leading-5 text-shell-muted [overflow-wrap:anywhere]">
              {reviewReason}
            </p>
          </SurfaceCard>
        </div>
      </div>

      <ProductSelectModal
        onAdd={addReadyStockLine}
        onClose={() => setActiveModal(null)}
        open={activeModal === "product"}
        options={readyStockOptions}
      />
      <CustomWorkEntryModal
        initialDraft={createBlankCustomWorkLineDraft()}
        mode="add"
        onClose={() => setActiveModal(null)}
        onConfirm={addCustomWorkLine}
        open={activeModal === "custom"}
      />
    </>
  );
}
