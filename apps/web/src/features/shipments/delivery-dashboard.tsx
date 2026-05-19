"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import { markShipmentsSentOut } from "@thaiboran/domain";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { CodVisibilityChip } from "@/features/shipments/components/shipment-common";
import { ShipmentTabs } from "@/features/shipments/components/shipment-tabs";
import {
  getDeliveryShipmentsForUser,
  getSentOutShipmentsForUser,
  type DeliveryShipmentView,
} from "@/features/shipments/fixtures/shipments";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";
import { cn } from "@/lib/utils";

type DeliveryDashboardTab = "today" | "waiting" | "sent-out";

export function DeliveryDashboard({
  currentUser,
  initialTab = "today",
}: {
  currentUser: FixtureUser;
  initialTab?: DeliveryDashboardTab;
}) {
  const [activeShipments, setActiveShipments] = useState(() =>
    getDeliveryShipmentsForUser(currentUser),
  );
  const [sentOutToday, setSentOutToday] = useState(() =>
    getSentOutShipmentsForUser(currentUser),
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<DeliveryDashboardTab>(initialTab);
  const [confirmIds, setConfirmIds] = useState<string[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const todayShipments = useMemo(
    () =>
      activeShipments.filter(
        (shipment) =>
          shipment.deliveryDate === "วันนี้" || !shipment.deliveryDate,
      ),
    [activeShipments],
  );
  const waitingShipments = useMemo(
    () =>
      activeShipments.filter(
        (shipment) =>
          shipment.deliveryDate && shipment.deliveryDate !== "วันนี้",
      ),
    [activeShipments],
  );
  const visibleShipments =
    activeTab === "today"
      ? todayShipments
      : activeTab === "waiting"
        ? waitingShipments
        : sentOutToday;

  function confirmSendOut(ids: string[]) {
    const result = markShipmentsSentOut(activeShipments, ids);
    setActiveShipments(result.activeShipments);
    setSentOutToday([...result.sentOutToday, ...sentOutToday]);
    setSelectedIds([]);
    setConfirmIds(null);
    setActiveTab("sent-out");
    setMessage(
      `ส่งออกแล้ว ${result.selectedCount} รอบ แสดงใน local fixture เท่านั้น`,
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1180px] gap-5">
      <PageHeader
        description="Delivery Team ทำได้เฉพาะดูงานจัดส่ง เพิ่มรูป/หมายเหตุแบบ optional และบันทึกว่าส่งออกแล้ว"
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="warning">
              วันนี้ {todayShipments.length}
            </StatusChip>
            <StatusChip variant="neutral">
              รอวันจัดส่ง {waitingShipments.length}
            </StatusChip>
            <StatusChip variant="success">
              ส่งออกแล้ววันนี้ {sentOutToday.length}
            </StatusChip>
          </div>
        }
        title="ฝ่ายจัดส่ง"
      />

      <ShipmentTabs
        activeTab={activeTab === "waiting" ? "waiting" : "today"}
        currentUser={currentUser}
      />

      <SurfaceCard
        className="border-shell-border bg-shell text-shell-foreground"
        padding="md"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-shell-muted">
              {new Intl.DateTimeFormat("th-TH", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              }).format(new Date())}
            </p>
            <h2 className="text-2xl font-extrabold">รายการจัดส่ง</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["today", "รายการต้องจัดส่งวันนี้"],
              ["waiting", "รายการรอวันจัดส่ง"],
              ["sent-out", "ส่งออกแล้ววันนี้"],
            ].map(([tabId, label]) => (
              <button
                className={cn(
                  "min-h-10 cursor-pointer rounded-full border px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                  activeTab === tabId
                    ? "border-accent/70 bg-accent/15 text-shell-foreground"
                    : "border-shell-border bg-shell-surface text-shell-muted hover:border-accent/70 hover:text-shell-foreground",
                )}
                key={tabId}
                onClick={() => setActiveTab(tabId as DeliveryDashboardTab)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </SurfaceCard>

      <div aria-live="polite">
        {message ? (
          <SurfaceCard className="border-[#B9D1FF] bg-[#E0ECFF]" padding="md">
            <p className="text-sm font-bold leading-6 text-[#1D4ED8]">
              {message}
            </p>
          </SurfaceCard>
        ) : null}
      </div>

      {activeTab === "today" && selectedIds.length > 0 ? (
        <div className="sticky top-[88px] z-[1] rounded-lg border border-border bg-surface p-3 shadow-lifted">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-foreground">
              เลือก {selectedIds.length} รอบจัดส่ง
            </p>
            <Button onClick={() => setConfirmIds(selectedIds)} type="button">
              บันทึกว่าส่งออกแล้ว
            </Button>
          </div>
        </div>
      ) : null}

      {visibleShipments.length > 0 ? (
        <section
          aria-label="รายการจัดส่ง"
          className="grid gap-4 md:grid-cols-2"
        >
          {visibleShipments.map((shipment) => (
            <DeliveryShipmentCard
              activeTab={activeTab}
              currentUser={currentUser}
              key={shipment.id}
              onAddEvidence={() => {
                setMessage(
                  `${shipment.id}: เพิ่มรูปหลักฐานจัดส่ง optional ใน local state`,
                );
              }}
              onAddNote={() => {
                setMessage(`${shipment.id}: เพิ่มหมายเหตุใน local state`);
              }}
              onSelect={(checked) => {
                setSelectedIds((current) =>
                  checked
                    ? [...current, shipment.id]
                    : current.filter((id) => id !== shipment.id),
                );
              }}
              onSendOut={() => setConfirmIds([shipment.id])}
              selected={selectedIds.includes(shipment.id)}
              shipment={shipment}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          title={
            activeTab === "waiting"
              ? "ไม่มีรายการรอวันจัดส่ง"
              : activeTab === "sent-out"
                ? "ยังไม่มีรายการส่งออกแล้ววันนี้"
                : "ไม่มีรายการต้องจัดส่งวันนี้"
          }
        />
      )}

      {confirmIds ? (
        <Dialog
          title={confirmIds.length > 1 ? "บันทึกว่าส่งออกแล้ว" : "ส่งออกแล้ว"}
        >
          <div className="grid gap-3">
            <p className="text-sm font-semibold leading-6 text-muted-foreground">
              ยืนยันว่ารอบจัดส่ง {confirmIds.length} รายการออกจากร้านแล้ว
              ไม่ต้องแนบรูปหรือ Tracking ในขั้นตอนนี้
            </p>
            <div className="grid gap-2 rounded-md border border-border bg-subtle p-3">
              {activeShipments
                .filter((shipment) => confirmIds.includes(shipment.id))
                .map((shipment) => (
                  <p
                    className="text-sm font-bold leading-6 text-foreground"
                    key={shipment.id}
                  >
                    {shipment.id} • {shipment.recipientName}
                  </p>
                ))}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                onClick={() => setConfirmIds(null)}
                type="button"
                variant="outline"
              >
                ยกเลิก
              </Button>
              <Button onClick={() => confirmSendOut(confirmIds)} type="button">
                {confirmIds.length > 1 ? "บันทึกว่าส่งออกแล้ว" : "ส่งออกแล้ว"}
              </Button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
}

function DeliveryShipmentCard({
  activeTab,
  currentUser,
  onAddEvidence,
  onAddNote,
  onSelect,
  onSendOut,
  selected,
  shipment,
}: {
  activeTab: DeliveryDashboardTab;
  currentUser: FixtureUser;
  onAddEvidence: () => void;
  onAddNote: () => void;
  onSelect: (checked: boolean) => void;
  onSendOut: () => void;
  selected: boolean;
  shipment: DeliveryShipmentView;
}) {
  const item = shipment.items[0];

  return (
    <article className="grid gap-4 rounded-lg border border-border bg-surface p-4 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <StatusChip>{shipment.id}</StatusChip>
            <StatusChip
              variant={activeTab === "sent-out" ? "success" : "warning"}
            >
              {activeTab === "sent-out"
                ? "ส่งออกแล้ว"
                : (shipment.deliveryDate ?? "ต้องจัดส่งวันนี้")}
            </StatusChip>
            {activeTab === "sent-out" ? (
              <StatusChip variant="action">ยืนยันการจัดส่ง</StatusChip>
            ) : null}
          </div>
          <h2 className="mt-2 text-xl font-extrabold leading-8 text-foreground">
            {shipment.recipientName}
          </h2>
        </div>
        {activeTab === "today" ? (
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border bg-subtle px-3 text-sm font-bold text-foreground">
            <input
              checked={selected}
              className="h-4 w-4 rounded border-border"
              onChange={(event) => onSelect(event.target.checked)}
              type="checkbox"
            />
            เลือก
          </label>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-[108px_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-subtle">
          {item ? (
            <Image
              alt={item.imageAlt}
              className="object-cover"
              fill
              sizes="108px"
              src={item.imageSrc}
            />
          ) : null}
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-bold leading-6 text-foreground">
            {shipment.itemSummary}
          </p>
          <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-muted-foreground">
            <Phone aria-hidden className="mt-1 h-4 w-4 shrink-0" />
            {shipment.phone}
          </p>
          <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-muted-foreground">
            <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0" />
            {shipment.shortAddress}
          </p>
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="neutral">
              <Truck aria-hidden className="h-3.5 w-3.5" />
              {shipment.carrier}
            </StatusChip>
            <CodVisibilityChip codVisibility={shipment.codVisibility} />
          </div>
        </div>
      </div>

      <div className="rounded-md border border-border bg-subtle p-3">
        <p className="text-xs font-bold text-muted-foreground">
          ข้อมูลอ่านอย่างเดียว
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-foreground">
          {shipment.address}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          หมายเหตุ: {shipment.deliveryNote}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {activeTab !== "sent-out" ? (
          <Button onClick={onSendOut} size="lg" type="button">
            <CheckCircle2 aria-hidden className="mr-2 h-4 w-4" />
            ส่งออกแล้ว
          </Button>
        ) : (
          <Button
            onClick={onAddEvidence}
            size="lg"
            type="button"
            variant="outline"
          >
            <Camera aria-hidden className="mr-2 h-4 w-4" />
            เพิ่มรูปหลักฐานจัดส่ง
          </Button>
        )}
        <Button asChild size="lg" variant="outline">
          <Link
            href={shipmentHref(shipmentRoutes.detail(shipment.id), currentUser)}
          >
            เปิดรอบจัดส่ง
          </Link>
        </Button>
        {activeTab === "sent-out" ? (
          <Button onClick={onAddNote} size="lg" type="button" variant="outline">
            เพิ่มหมายเหตุ
          </Button>
        ) : null}
      </div>

      {activeTab === "sent-out" ? (
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Clock aria-hidden className="h-4 w-4" />
          {shipment.sentOutTime ?? "ส่งออกแล้ววันนี้"} • รูป/หมายเหตุเป็น
          optional จนกว่า Admin จะปิดรอบ
        </p>
      ) : null}
    </article>
  );
}

function Dialog({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/40 p-4">
      <section
        aria-label={title}
        aria-modal="true"
        className="w-full max-w-lg rounded-lg border border-border bg-surface p-4 shadow-lifted"
        role="dialog"
      >
        <h2 className="text-lg font-extrabold text-foreground">{title}</h2>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}
