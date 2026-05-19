"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import { FileText, Printer, Truck } from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import {
  CodVisibilityChip,
  SourceChip,
} from "@/features/shipments/components/shipment-common";
import { ShipmentTabs } from "@/features/shipments/components/shipment-tabs";
import {
  formatBaht,
  getShipmentBuilderFixture,
  type ShipmentItemFixture,
} from "@/features/shipments/fixtures/shipments";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

const shipmentInputClassName =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ShipmentBuilder({
  currentUser,
  orderId,
}: {
  currentUser: FixtureUser;
  orderId: string;
}) {
  const builder = getShipmentBuilderFixture(orderId, currentUser);
  const [recipientName, setRecipientName] = useState(
    builder?.recipientName ?? "",
  );
  const [phone, setPhone] = useState(builder?.phone ?? "");
  const [address, setAddress] = useState(builder?.address ?? "");
  const [carrier, setCarrier] = useState(builder?.carrier ?? "");
  const [deliveryDate, setDeliveryDate] = useState(builder?.deliveryDate ?? "");
  const [deliveryNote, setDeliveryNote] = useState(builder?.note ?? "");
  const [stockAcknowledged, setStockAcknowledged] = useState(false);
  const [releaseMessage, setReleaseMessage] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<
    "stock" | "release" | "cancel" | null
  >(null);

  if (!builder) {
    return (
      <EmptyState
        action={
          <Button asChild size="sm" variant="outline">
            <Link href={shipmentHref(shipmentRoutes.ready, currentUser)}>
              กลับไปหน้ารอสร้างรอบจัดส่ง
            </Link>
          </Button>
        }
        title="ไม่มีรายการพร้อมส่งสำหรับสร้างรอบจัดส่ง"
      />
    );
  }

  const hasStockWarning = builder.items.some((item) => item.stockWarning);

  function requestRelease() {
    if (hasStockWarning && !stockAcknowledged) {
      setActiveModal("stock");
      return;
    }

    setActiveModal("release");
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={<StatusChip variant="warning">กำลังสร้างรอบจัดส่ง</StatusChip>}
        description="หน้าตรวจทานชั่วคราวก่อนปล่อยรอบจัดส่ง ไม่มีการบันทึกร่าง"
        meta={<StatusChip variant="neutral">{builder.id}</StatusChip>}
        title="สร้างรอบจัดส่ง"
      />

      <ShipmentTabs activeTab="ready" currentUser={currentUser} />

      {releaseMessage ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#166534]">
            {releaseMessage}
          </p>
        </SurfaceCard>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <SurfaceCard className="overflow-hidden" padding="none">
          <div className="border-b border-border bg-subtle px-4 py-3">
            <h2 className="text-base font-extrabold text-foreground">
              รายการพร้อมส่ง
            </h2>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              รายการจาก {builder.id} ที่ถูกส่งต่อมาสร้างรอบจัดส่ง
            </p>
          </div>

          <div className="grid">
            {builder.items.map((item) => (
              <BuilderItem item={item} key={`${builder.id}-${item.title}`} />
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="overflow-hidden" padding="none">
          <div className="border-b border-border bg-subtle px-4 py-3">
            <h2 className="text-base font-extrabold text-foreground">
              ข้อมูลจัดส่ง
            </h2>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              Snapshot สำหรับรอบจัดส่งนี้ ไม่แก้ Customer หรือ Order เดิม
            </p>
          </div>

          <div className="grid gap-4 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="ผู้รับสินค้า" value={recipientName}>
                <input
                  className={shipmentInputClassName}
                  id="shipment-recipient"
                  onChange={(event) => setRecipientName(event.target.value)}
                  value={recipientName}
                />
              </Field>
              <Field label="เบอร์โทร" value={phone}>
                <input
                  className={shipmentInputClassName}
                  id="shipment-phone"
                  onChange={(event) => setPhone(event.target.value)}
                  value={phone}
                />
              </Field>
            </div>

            <Field label="ที่อยู่จัดส่ง" value={address}>
              <textarea
                className={`${shipmentInputClassName} min-h-24`}
                id="shipment-address"
                onChange={(event) => setAddress(event.target.value)}
                value={address}
              />
            </Field>

            {builder.saveAddressPrompt ? (
              <label className="flex items-start gap-3 rounded-md border border-border bg-subtle p-3 text-sm font-semibold leading-6 text-muted-foreground">
                <input
                  className="mt-1 h-4 w-4 rounded border-border"
                  type="checkbox"
                />
                <span>{builder.saveAddressPrompt}</span>
              </label>
            ) : null}

            <div className="grid gap-3 md:grid-cols-2">
              <Field label="ขนส่ง" value={carrier}>
                <input
                  className={shipmentInputClassName}
                  id="shipment-carrier"
                  onChange={(event) => setCarrier(event.target.value)}
                  value={carrier}
                />
              </Field>
              <Field label="วันจัดส่ง" value={deliveryDate}>
                <input
                  className={shipmentInputClassName}
                  id="shipment-delivery-date"
                  onChange={(event) => setDeliveryDate(event.target.value)}
                  value={deliveryDate}
                />
              </Field>
            </div>

            <div className="rounded-md border border-border bg-subtle p-3">
              <p className="text-xs font-bold text-muted-foreground">
                COD read-only
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <CodVisibilityChip codVisibility={builder.codVisibility} />
                {builder.codVisibility.kind === "none" ? (
                  <StatusChip variant="neutral">ไม่มี COD ในรอบนี้</StatusChip>
                ) : null}
              </div>
              {builder.codVisibility.kind === "visible" ? (
                <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                  Shipment Builder แสดง{" "}
                  {formatBaht(builder.codVisibility.amountBaht)}{" "}
                  แบบอ่านอย่างเดียว
                </p>
              ) : null}
            </div>

            <Field label="หมายเหตุจัดส่ง" value={deliveryNote}>
              <textarea
                className={`${shipmentInputClassName} min-h-24`}
                id="shipment-delivery-note"
                onChange={(event) => setDeliveryNote(event.target.value)}
                value={deliveryNote}
              />
            </Field>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button asChild variant="outline">
                <Link
                  href={shipmentHref(
                    shipmentRoutes.deliveryNote(builder.previewShipmentId),
                    currentUser,
                  )}
                >
                  <FileText aria-hidden className="mr-2 h-4 w-4" />
                  ดูใบส่งของ
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  href={shipmentHref(
                    shipmentRoutes.shippingSheet(builder.previewShipmentId),
                    currentUser,
                  )}
                >
                  <Printer aria-hidden className="mr-2 h-4 w-4" />
                  ดูใบจัดส่ง
                </Link>
              </Button>
            </div>
          </div>
        </SurfaceCard>
      </div>

      <div className="sticky bottom-0 z-[1] rounded-lg border border-border bg-surface p-3 shadow-lifted">
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            onClick={() => setActiveModal("cancel")}
            type="button"
            variant="outline"
          >
            ยกเลิก
          </Button>
          <Button onClick={requestRelease} type="button">
            <Truck aria-hidden className="mr-2 h-4 w-4" />
            พร้อมจัดส่ง
          </Button>
        </div>
      </div>

      {activeModal === "stock" ? (
        <Dialog title="รับทราบสต๊อกติดลบ">
          <div className="grid gap-3">
            {builder.items
              .filter((item) => item.stockWarning)
              .map((item) => (
                <div
                  className="rounded-md border border-[#FAD980] bg-[#FEF3C7] p-3"
                  key={item.title}
                >
                  <p className="text-sm font-bold text-[#92400E]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#92400E]">
                    {item.stockWarning}
                  </p>
                </div>
              ))}
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                onClick={() => setActiveModal(null)}
                type="button"
                variant="outline"
              >
                กลับไปตรวจสต๊อก
              </Button>
              <Button
                onClick={() => {
                  setStockAcknowledged(true);
                  setActiveModal("release");
                }}
                type="button"
              >
                รับทราบและสร้างรอบจัดส่งต่อ
              </Button>
            </div>
          </div>
        </Dialog>
      ) : null}

      {activeModal === "release" ? (
        <Dialog title="ยืนยันพร้อมจัดส่ง">
          <div className="grid gap-4">
            <div className="rounded-md border border-border bg-subtle p-3">
              <p className="text-sm font-bold text-foreground">
                {recipientName} • {phone}
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
                {address}
              </p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">
                {carrier} • {deliveryDate || "ยังไม่ระบุวันจัดส่ง"}
              </p>
            </div>
            <div className="grid gap-2">
              {builder.items.map((item) => (
                <p
                  className="text-sm font-semibold leading-6 text-foreground"
                  key={item.title}
                >
                  {item.title} จำนวน {item.quantity} ชิ้น
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <CodVisibilityChip codVisibility={builder.codVisibility} />
              {stockAcknowledged ? (
                <StatusChip variant="warning">รับทราบสต๊อกติดลบแล้ว</StatusChip>
              ) : null}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                onClick={() => setActiveModal(null)}
                type="button"
                variant="outline"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={() => {
                  setActiveModal(null);
                  setReleaseMessage(
                    "พร้อมจัดส่งแล้วใน local fixture เท่านั้น ยังไม่สร้าง record หรือ persistence จริง",
                  );
                }}
                type="button"
              >
                พร้อมจัดส่ง
              </Button>
            </div>
          </div>
        </Dialog>
      ) : null}

      {activeModal === "cancel" ? (
        <Dialog title="ออกจาก Shipment Builder">
          <p className="text-sm font-semibold leading-6 text-muted-foreground">
            งานในหน้านี้เป็นการสร้างรอบจัดส่งชั่วคราว หากออกตอนนี้จะไม่มี
            Shipment draft ถูกบันทึกไว้
          </p>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <Button onClick={() => setActiveModal(null)} variant="outline">
              อยู่ต่อ
            </Button>
            <Button asChild>
              <Link href={shipmentHref(shipmentRoutes.ready, currentUser)}>
                ออกโดยไม่สร้างรอบจัดส่ง
              </Link>
            </Button>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
}

function BuilderItem({ item }: { item: ShipmentItemFixture }) {
  return (
    <article className="grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[96px_minmax(0,1fr)]">
      <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-subtle">
        <Image
          alt={item.imageAlt}
          className="object-cover"
          fill
          sizes="96px"
          src={item.imageSrc}
        />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <SourceChip item={item} />
          {item.jobId ? (
            <StatusChip variant="neutral">{item.jobId}</StatusChip>
          ) : null}
          <StatusChip variant="success">พร้อมส่ง</StatusChip>
          {item.stockWarning ? (
            <StatusChip variant="warning">{item.stockWarning}</StatusChip>
          ) : null}
        </div>
        <h2 className="mt-2 text-lg font-extrabold leading-7 text-foreground">
          {item.title}
        </h2>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          จำนวน {item.quantity} ชิ้น
          {item.skuCode ? ` • ${item.skuCode}` : ""}
          {item.color ? ` • ${item.color}` : ""}
        </p>
        {item.note ? (
          <p className="mt-2 rounded-md border border-border bg-subtle p-3 text-sm font-semibold leading-6 text-muted-foreground">
            {item.note}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function Field({
  children,
  label,
}: {
  children: ReactElement<{ id: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <label
        className="text-xs font-bold text-muted-foreground"
        htmlFor={children.props.id}
      >
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Dialog({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/40 p-4">
      <section
        aria-label={title}
        aria-modal="true"
        className="w-full max-w-xl rounded-lg border border-border bg-surface p-4 shadow-lifted"
        role="dialog"
      >
        <h2 className="text-lg font-extrabold text-foreground">{title}</h2>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}
