"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Camera, CheckCircle2, Filter, Search, Truck } from "lucide-react";
import { canCloseShipmentWithEvidence } from "@thaiboran/domain";
import {
  Button,
  EmptyState,
  MetricCard,
  PageHeader,
  StatusChip,
  SurfaceCard,
  ToolbarShell,
} from "@thaiboran/ui";

import {
  CodVisibilityChip,
  FilterChip,
  ShipmentItemThumb,
} from "@/features/shipments/components/shipment-common";
import { ShipmentTabs } from "@/features/shipments/components/shipment-tabs";
import {
  getConfirmationShipmentsForUser,
  type ConfirmationShipmentView,
} from "@/features/shipments/fixtures/shipments";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";
import { cn } from "@/lib/utils";

type ConfirmationFilter =
  | "ทั้งหมด"
  | "รอเลขพัสดุ"
  | "หลักฐานครบ"
  | "หลักฐานไม่ครบ"
  | "COD";

export function AdminShipmentConfirmationQueue({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const [shipments, setShipments] = useState(() =>
    getConfirmationShipmentsForUser(currentUser),
  );
  const [selectedShipmentId, setSelectedShipmentId] = useState(
    shipments[0]?.id,
  );
  const [activeFilter, setActiveFilter] =
    useState<ConfirmationFilter>("ทั้งหมด");
  const [message, setMessage] = useState<string | null>(null);
  const selectedShipment =
    shipments.find((shipment) => shipment.id === selectedShipmentId) ??
    shipments[0];
  const filteredShipments = useMemo(
    () => shipments.filter((shipment) => matchesFilter(shipment, activeFilter)),
    [activeFilter, shipments],
  );
  const missingTrackingCount = shipments.filter(
    (shipment) => !shipment.tracking,
  ).length;
  const evidenceCompleteCount = shipments.filter((shipment) =>
    canCloseShipmentWithEvidence({
      evidencePhotoCount: shipment.evidencePhotoCount,
      tracking: shipment.tracking,
    }),
  ).length;
  const evidenceMissingCount = shipments.length - evidenceCompleteCount;
  const codCount = shipments.filter(
    (shipment) => shipment.codVisibility.kind === "visible",
  ).length;

  function updateShipment(
    shipmentId: string,
    updater: (shipment: ConfirmationShipmentView) => ConfirmationShipmentView,
  ) {
    setShipments((current) =>
      current.map((shipment) =>
        shipment.id === shipmentId ? updater(shipment) : shipment,
      ),
    );
  }

  function closeShipment(shipmentId: string) {
    const shipment = shipments.find((item) => item.id === shipmentId);

    if (!shipment) {
      return;
    }

    if (
      !canCloseShipmentWithEvidence({
        evidencePhotoCount: shipment.evidencePhotoCount,
        tracking: shipment.tracking,
      })
    ) {
      setMessage("กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง");
      return;
    }

    const remaining = shipments.filter((item) => item.id !== shipmentId);
    setShipments(remaining);
    setSelectedShipmentId(remaining[0]?.id);
    setMessage(`${shipmentId} ปิดรอบจัดส่งใน local fixture เท่านั้น`);
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        description="รอบจัดส่งที่ฝ่ายจัดส่งบันทึกส่งออกแล้ว รอ Admin ตรวจ Tracking หรือรูปหลักฐานก่อนปิดรอบ"
        meta={
          <StatusChip variant="warning">{shipments.length} Shipment</StatusChip>
        }
        title="ยืนยันการจัดส่ง"
      />

      <ShipmentTabs activeTab="confirmation" currentUser={currentUser} />

      <section
        aria-label="สรุปยืนยันการจัดส่ง"
        className="grid gap-3 md:grid-cols-5"
      >
        <MetricCard
          description="ส่งออกแล้วและรอปิดรอบ"
          icon={<Truck aria-hidden className="h-5 w-5" />}
          title="ทั้งหมด"
          unit="รอบ"
          value={shipments.length}
        />
        <MetricCard
          description="Tracking ยังว่าง"
          statusLabel="รอเลขพัสดุ"
          statusVariant="warning"
          title="รอเลขพัสดุ"
          unit="รอบ"
          value={missingTrackingCount}
        />
        <MetricCard
          description="มี Tracking หรือรูปหลักฐาน"
          statusLabel="หลักฐานครบ"
          statusVariant="success"
          title="หลักฐานครบ"
          unit="รอบ"
          value={evidenceCompleteCount}
        />
        <MetricCard
          description="ยังปิดรอบไม่ได้"
          statusLabel="หลักฐานไม่ครบ"
          statusVariant="danger"
          title="หลักฐานไม่ครบ"
          unit="รอบ"
          value={evidenceMissingCount}
        />
        <MetricCard
          description="สัญญาณการเงินเท่านั้น"
          statusLabel="COD"
          statusVariant="danger"
          title="COD"
          unit="รอบ"
          value={codCount}
        />
      </section>

      <ToolbarShell
        leading={
          <Search aria-hidden className="h-4 w-4 text-muted-foreground" />
        }
      >
        <label className="sr-only" htmlFor="shipment-confirmation-search">
          ค้นหา Shipment, Order, ผู้รับ หรือ Tracking
        </label>
        <input
          className="min-h-10 min-w-0 flex-1 basis-full rounded-md border border-border bg-surface px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:basis-auto sm:min-w-[20rem]"
          id="shipment-confirmation-search"
          placeholder="ค้นหา Shipment, Order, ผู้รับ หรือ Tracking"
          type="search"
        />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-muted-foreground">
            <Filter aria-hidden className="h-3.5 w-3.5" />
            ตัวกรอง
          </span>
          {(
            [
              "ทั้งหมด",
              "รอเลขพัสดุ",
              "หลักฐานครบ",
              "หลักฐานไม่ครบ",
              "COD",
            ] satisfies ConfirmationFilter[]
          ).map((filter) => (
            <button
              className={cn(
                "min-h-9 cursor-pointer rounded-full border px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                activeFilter === filter
                  ? "border-primary/40 bg-primary-soft text-primary"
                  : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
          <FilterChip>รีเฟรช fixture</FilterChip>
        </div>
      </ToolbarShell>

      <div aria-live="polite">
        {message ? (
          <SurfaceCard
            className={
              message.startsWith("กรุณา")
                ? "border-[#FDB8B3] bg-[#FEE4E2]"
                : "border-[#B9D1FF] bg-[#E0ECFF]"
            }
            padding="md"
          >
            <p
              className={cn(
                "text-sm font-bold leading-6",
                message.startsWith("กรุณา")
                  ? "text-[#9F1239]"
                  : "text-[#1D4ED8]",
              )}
            >
              {message}
            </p>
          </SurfaceCard>
        ) : null}
      </div>

      {shipments.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
          <SurfaceCard className="overflow-hidden" padding="none">
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
                <thead className="bg-subtle text-xs font-bold text-muted-foreground">
                  <tr>
                    {[
                      "รอบจัดส่ง",
                      "ผู้รับ / ขนส่ง",
                      "ส่งออกแล้ว",
                      "Tracking / หลักฐาน",
                      "สัญญาณ",
                      "การทำงาน",
                    ].map((heading) => (
                      <th className="px-3 py-3" key={heading} scope="col">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredShipments.map((shipment) => (
                    <ConfirmationRow
                      currentUser={currentUser}
                      key={shipment.id}
                      onOpen={() => setSelectedShipmentId(shipment.id)}
                      shipment={shipment}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid xl:hidden">
              {filteredShipments.map((shipment) => (
                <ConfirmationCard
                  currentUser={currentUser}
                  key={shipment.id}
                  onOpen={() => setSelectedShipmentId(shipment.id)}
                  shipment={shipment}
                />
              ))}
            </div>
          </SurfaceCard>

          {selectedShipment ? (
            <EvidencePanel
              currentUser={currentUser}
              onAddEvidence={(shipmentId) => {
                updateShipment(shipmentId, (shipment) => ({
                  ...shipment,
                  closeBlockedReason: undefined,
                  evidencePhotoCount: shipment.evidencePhotoCount + 1,
                  evidenceStatus: "หลักฐานครบ",
                }));
                setMessage(`${shipmentId}: เพิ่มรูปหลักฐานจัดส่งแล้ว`);
              }}
              onClose={closeShipment}
              onTrackingChange={(shipmentId, tracking) => {
                updateShipment(shipmentId, (shipment) => ({
                  ...shipment,
                  closeBlockedReason: undefined,
                  evidenceStatus: "หลักฐานครบ",
                  tracking,
                  trackingStatus: tracking ? "มี Tracking" : "รอเลขพัสดุ",
                }));
              }}
              shipment={selectedShipment}
            />
          ) : null}
        </div>
      ) : (
        <EmptyState title="ไม่มีรอบจัดส่งรอยืนยัน" />
      )}
    </div>
  );
}

function ConfirmationRow({
  currentUser,
  onOpen,
  shipment,
}: {
  currentUser: FixtureUser;
  onOpen: () => void;
  shipment: ConfirmationShipmentView;
}) {
  return (
    <tr className="border-t border-border bg-surface align-top transition-colors hover:bg-subtle/50">
      <td className="px-3 py-4">
        <p className="font-extrabold text-foreground">{shipment.id}</p>
        <p className="mt-1 text-xs font-semibold text-muted-foreground">
          {shipment.orderId}
        </p>
      </td>
      <td className="max-w-[260px] px-3 py-4">
        <p className="font-bold leading-6 text-foreground">
          {shipment.recipientName}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          {shipment.carrier} • {shipment.shortAddress}
        </p>
      </td>
      <td className="px-3 py-4">
        <StatusChip variant="success">
          {shipment.sentOutTime ?? "ส่งออกแล้ว"}
        </StatusChip>
      </td>
      <td className="px-3 py-4">
        <div className="flex flex-wrap gap-2">
          <StatusChip variant={shipment.tracking ? "success" : "warning"}>
            {shipment.trackingStatus}
          </StatusChip>
          <StatusChip
            variant={
              shipment.evidenceStatus === "หลักฐานครบ" ? "success" : "danger"
            }
          >
            {shipment.evidenceStatus}
          </StatusChip>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex flex-wrap gap-2">
          <CodVisibilityChip codVisibility={shipment.codVisibility} />
          {shipment.codVisibility.kind === "visible" ? (
            <StatusChip variant="neutral">ต้องติดตามการเงิน</StatusChip>
          ) : null}
        </div>
      </td>
      <td className="px-3 py-4 text-right">
        <div className="flex flex-wrap justify-end gap-2">
          <Button onClick={onOpen} size="sm" type="button" variant="outline">
            ตรวจหลักฐาน
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link
              href={shipmentHref(
                shipmentRoutes.detail(shipment.id),
                currentUser,
              )}
            >
              เปิดรอบจัดส่ง
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}

function ConfirmationCard({
  currentUser,
  onOpen,
  shipment,
}: {
  currentUser: FixtureUser;
  onOpen: () => void;
  shipment: ConfirmationShipmentView;
}) {
  return (
    <article className="grid gap-3 border-b border-border p-4 last:border-b-0">
      <div className="flex flex-wrap gap-2">
        <StatusChip>{shipment.id}</StatusChip>
        <StatusChip variant="success">ส่งออกแล้ว</StatusChip>
        <StatusChip
          variant={
            shipment.evidenceStatus === "หลักฐานครบ" ? "success" : "danger"
          }
        >
          {shipment.evidenceStatus}
        </StatusChip>
      </div>
      <h2 className="text-lg font-extrabold leading-7 text-foreground">
        {shipment.recipientName}
      </h2>
      <p className="text-sm font-semibold leading-6 text-muted-foreground">
        {shipment.orderId} • {shipment.carrier} • {shipment.itemSummary}
      </p>
      <div className="flex flex-wrap gap-2">
        <StatusChip variant={shipment.tracking ? "success" : "warning"}>
          {shipment.trackingStatus}
        </StatusChip>
        <CodVisibilityChip codVisibility={shipment.codVisibility} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onOpen} size="sm" type="button" variant="outline">
          ตรวจหลักฐาน
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link
            href={shipmentHref(shipmentRoutes.detail(shipment.id), currentUser)}
          >
            เปิดรอบจัดส่ง
          </Link>
        </Button>
      </div>
    </article>
  );
}

function EvidencePanel({
  currentUser,
  onAddEvidence,
  onClose,
  onTrackingChange,
  shipment,
}: {
  currentUser: FixtureUser;
  onAddEvidence: (shipmentId: string) => void;
  onClose: (shipmentId: string) => void;
  onTrackingChange: (shipmentId: string, tracking: string) => void;
  shipment: ConfirmationShipmentView;
}) {
  const closeAllowed = canCloseShipmentWithEvidence({
    evidencePhotoCount: shipment.evidencePhotoCount,
    tracking: shipment.tracking,
  });

  return (
    <aside className="grid content-start gap-4 rounded-lg border border-border bg-surface p-4 shadow-soft">
      <div>
        <p className="text-xs font-extrabold text-muted-foreground">
          ตรวจหลักฐาน
        </p>
        <h2 className="mt-1 text-lg font-extrabold text-foreground">
          {shipment.id}
        </h2>
      </div>

      <div className="rounded-md border border-border bg-subtle p-3">
        <p className="text-sm font-bold text-foreground">
          {shipment.recipientName} • {shipment.phone}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          {shipment.address}
        </p>
      </div>

      <div>
        <label
          className="text-xs font-bold text-muted-foreground"
          htmlFor="tracking-input"
        >
          Tracking
        </label>
        <input
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          id="tracking-input"
          onChange={(event) =>
            onTrackingChange(shipment.id, event.target.value)
          }
          placeholder="เพิ่มเลขพัสดุโดย Admin"
          value={shipment.tracking ?? ""}
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold text-muted-foreground">
            รูปหลักฐานจัดส่ง
          </p>
          <Button
            onClick={() => onAddEvidence(shipment.id)}
            size="sm"
            type="button"
            variant="outline"
          >
            <Camera aria-hidden className="mr-2 h-4 w-4" />
            เพิ่มรูป
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: shipment.evidencePhotoCount }).map(
            (_, index) => (
              <div
                className="grid aspect-square place-items-center rounded-md border border-[#BFE5C9] bg-[#E6F4EA] text-center text-xs font-bold leading-5 text-[#166534]"
                key={`${shipment.id}-evidence-${index}`}
              >
                รูปหลักฐาน
                <br />
                ตัวอย่าง
              </div>
            ),
          )}
          <button
            className="grid aspect-square cursor-pointer place-items-center rounded-md border border-dashed border-border bg-subtle p-2 text-center text-xs font-bold leading-5 text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            onClick={() => onAddEvidence(shipment.id)}
            type="button"
          >
            เพิ่มรูป optional
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded-md border border-border bg-subtle p-3">
        {shipment.items.map((item) => (
          <div className="flex gap-3" key={`${shipment.id}-${item.title}`}>
            <ShipmentItemThumb item={item} />
            <div>
              <p className="text-sm font-bold leading-6 text-foreground">
                {item.title}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                {item.quantity} ชิ้น
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <CodVisibilityChip codVisibility={shipment.codVisibility} />
        {shipment.codVisibility.kind === "visible" ? (
          <StatusChip variant="neutral">
            COD/payment follow-up แยกจากปิดรอบจัดส่ง
          </StatusChip>
        ) : null}
      </div>

      {!closeAllowed ? (
        <p className="rounded-md border border-[#FDB8B3] bg-[#FEE4E2] p-3 text-sm font-bold leading-6 text-[#9F1239]">
          กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง
        </p>
      ) : null}

      <Button
        disabled={!closeAllowed}
        onClick={() => onClose(shipment.id)}
        title={
          closeAllowed
            ? undefined
            : "กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง"
        }
        type="button"
      >
        <CheckCircle2 aria-hidden className="mr-2 h-4 w-4" />
        ยืนยันและปิดรอบจัดส่ง
      </Button>

      <Button asChild variant="outline">
        <Link
          href={shipmentHref(shipmentRoutes.detail(shipment.id), currentUser)}
        >
          เปิดรอบจัดส่ง
        </Link>
      </Button>
    </aside>
  );
}

function matchesFilter(
  shipment: ConfirmationShipmentView,
  activeFilter: ConfirmationFilter,
): boolean {
  if (activeFilter === "รอเลขพัสดุ") {
    return !shipment.tracking;
  }

  if (activeFilter === "หลักฐานครบ") {
    return canCloseShipmentWithEvidence({
      evidencePhotoCount: shipment.evidencePhotoCount,
      tracking: shipment.tracking,
    });
  }

  if (activeFilter === "หลักฐานไม่ครบ") {
    return !canCloseShipmentWithEvidence({
      evidencePhotoCount: shipment.evidencePhotoCount,
      tracking: shipment.tracking,
    });
  }

  if (activeFilter === "COD") {
    return shipment.codVisibility.kind === "visible";
  }

  return true;
}
