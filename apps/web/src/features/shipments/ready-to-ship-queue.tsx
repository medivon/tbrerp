"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Filter, PackageCheck, Search, Truck } from "lucide-react";
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
  ShipmentThumbnailStrip,
  SourceChip,
} from "@/features/shipments/components/shipment-common";
import { ShipmentTabs } from "@/features/shipments/components/shipment-tabs";
import {
  getReadyToShipOrdersForUser,
  getSourceLabel,
  type ReadyToShipOrderView,
} from "@/features/shipments/fixtures/shipments";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";
import { cn } from "@/lib/utils";

type ReadyFilter =
  | "ทั้งหมด"
  | "กำหนดส่งวันนี้"
  | "สินค้าพร้อมส่ง"
  | "งานสั่งทำเสร็จแล้ว"
  | "งานบริการ"
  | "COD"
  | "สร้างรวมได้";

const readyFilters: ReadyFilter[] = [
  "ทั้งหมด",
  "กำหนดส่งวันนี้",
  "สินค้าพร้อมส่ง",
  "งานสั่งทำเสร็จแล้ว",
  "งานบริการ",
  "COD",
  "สร้างรวมได้",
];

export function ReadyToShipQueue({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  const orders = getReadyToShipOrdersForUser(currentUser);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ReadyFilter>("ทั้งหมด");
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id);
  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          matchesReadySearch(order, query) &&
          matchesReadyFilter(order, activeFilter),
      ),
    [activeFilter, orders, query],
  );
  const selectedOrder =
    filteredOrders.find((order) => order.id === selectedOrderId) ??
    filteredOrders[0];
  const dueTodayCount = filteredOrders.filter(
    (order) => order.deliveryDate === "วันนี้",
  ).length;
  const stockReadyCount = filteredOrders.filter((order) =>
    order.items.some((item) => item.source === "stock"),
  ).length;
  const customReadyCount = filteredOrders.filter((order) =>
    order.items.some((item) => item.source === "custom"),
  ).length;
  const serviceCount = filteredOrders.filter((order) =>
    order.items.some((item) => item.source === "service"),
  ).length;
  const codCount = filteredOrders.filter(
    (order) => order.codVisibility.kind !== "none",
  ).length;

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        description="รายการพร้อมส่งที่รอสร้างรอบจัดส่ง แยกจากรายการของฝ่ายจัดส่ง"
        meta={
          <StatusChip variant="success">
            {filteredOrders.length} รายการ
          </StatusChip>
        }
        title="รอสร้างรอบจัดส่ง"
      />

      <ShipmentTabs activeTab="ready" currentUser={currentUser} />

      <section
        aria-label="สรุปรอสร้างรอบจัดส่ง"
        className="grid gap-3 md:grid-cols-3 xl:grid-cols-6"
      >
        <MetricCard
          description="นับตาม Order / งานบริการ"
          icon={<PackageCheck aria-hidden className="h-5 w-5" />}
          title="พร้อมสร้างรอบ"
          unit="รายการ"
          value={filteredOrders.length}
        />
        <MetricCard
          description="กำหนดส่งวันนี้"
          statusLabel="วันนี้"
          statusVariant="warning"
          title="กำหนดส่งวันนี้"
          unit="รายการ"
          value={dueTodayCount}
        />
        <MetricCard
          description="รายการสินค้าพร้อมส่ง"
          statusLabel="สินค้าพร้อมส่ง"
          statusVariant="neutral"
          title="สินค้าพร้อมส่ง"
          unit="รายการ"
          value={stockReadyCount}
        />
        <MetricCard
          description="JOB-O เสร็จแล้ว"
          statusLabel="งานสั่งทำ"
          statusVariant="revision"
          title="งานสั่งทำเสร็จ"
          unit="รายการ"
          value={customReadyCount}
        />
        <MetricCard
          description="รอบจัดส่งงานบริการ"
          statusLabel="งานบริการ"
          statusVariant="action"
          title="งานบริการ"
          unit="รายการ"
          value={serviceCount}
        />
        <MetricCard
          description="แสดงเฉพาะสิทธิ์ที่เห็นได้"
          statusLabel="COD"
          statusVariant="danger"
          title="COD"
          unit="รายการ"
          value={codCount}
        />
      </section>

      <ToolbarShell
        leading={
          <Search aria-hidden className="h-4 w-4 text-muted-foreground" />
        }
      >
        <label className="sr-only" htmlFor="shipment-ready-search">
          ค้นหาลูกค้า ผู้รับ เบอร์ เลขออเดอร์ หรือ Job
        </label>
        <input
          className="min-h-10 min-w-0 flex-1 basis-full rounded-md border border-border bg-surface px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:basis-auto sm:min-w-[20rem]"
          id="shipment-ready-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ค้นหาลูกค้า ผู้รับ เบอร์ เลขออเดอร์ หรือ Job"
          type="search"
          value={query}
        />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-muted-foreground">
            <Filter aria-hidden className="h-3.5 w-3.5" />
            ตัวกรอง
          </span>
          {readyFilters.map((filter) => (
            <FilterChip
              active={activeFilter === filter}
              key={filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </div>
      </ToolbarShell>

      {filteredOrders.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <SurfaceCard className="overflow-hidden" padding="none">
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
                <thead className="bg-subtle text-xs font-bold text-muted-foreground">
                  <tr>
                    {[
                      "Order / ผู้รับ",
                      "รายการพร้อมส่ง",
                      "แหล่งที่มา",
                      "กำหนดส่ง / ขนส่ง",
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
                  {filteredOrders.map((order) => (
                    <ReadyOrderRow
                      currentUser={currentUser}
                      key={order.id}
                      onOpen={() => setSelectedOrderId(order.id)}
                      order={order}
                      selected={selectedOrder?.id === order.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid xl:hidden">
              {filteredOrders.map((order) => (
                <ReadyOrderCard
                  currentUser={currentUser}
                  key={order.id}
                  onOpen={() => setSelectedOrderId(order.id)}
                  order={order}
                  selected={selectedOrder?.id === order.id}
                />
              ))}
            </div>
          </SurfaceCard>

          {selectedOrder ? (
            <SelectedOrderPanel
              currentUser={currentUser}
              order={selectedOrder}
            />
          ) : null}
        </div>
      ) : (
        <EmptyState
          title={
            orders.length > 0
              ? "ไม่พบรายการที่ค้นหา"
              : "ไม่มีรายการพร้อมส่งที่รอสร้างรอบจัดส่ง"
          }
        />
      )}
    </div>
  );
}

function ReadyOrderRow({
  currentUser,
  onOpen,
  order,
  selected,
}: {
  currentUser: FixtureUser;
  onOpen: () => void;
  order: ReadyToShipOrderView;
  selected: boolean;
}) {
  return (
    <tr
      className={cn(
        "border-t border-border bg-surface align-top transition-colors hover:bg-subtle/50",
        selected && "bg-primary-soft/60",
      )}
    >
      <td className="px-3 py-4">
        <p className="font-extrabold text-foreground">{order.id}</p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          {order.recipientName}
        </p>
        <p className="mt-1 text-xs font-semibold leading-5 text-muted-foreground">
          {order.phone}
        </p>
      </td>
      <td className="max-w-[320px] px-3 py-4">
        <div className="flex items-start gap-3">
          <ShipmentThumbnailStrip items={order.items} />
          <div className="min-w-0">
            <p className="font-bold leading-6 text-foreground">
              {order.items[0]?.title}
              {order.items.length > 1 ? ` +${order.items.length - 1}` : ""}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {order.items.length} รายการ • {order.note}
            </p>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex max-w-[220px] flex-wrap gap-2">
          {sourceLabels(order).map((label) => (
            <StatusChip key={label} variant={sourceVariantByLabel(label)}>
              {label}
            </StatusChip>
          ))}
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="grid gap-2">
          <StatusChip variant="warning">
            {order.deliveryDate ?? "ยังไม่ระบุวัน"}
          </StatusChip>
          <StatusChip variant="neutral">{order.carrier}</StatusChip>
          <span className="text-xs font-semibold text-muted-foreground">
            {order.ageLabel}
          </span>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex max-w-[260px] flex-wrap gap-2">
          <CodVisibilityChip codVisibility={order.codVisibility} />
          <StatusChip variant={order.bulkEligible ? "success" : "warning"}>
            {order.bulkEligible ? "สร้างรวมได้" : "ต้องเปิดแยก"}
          </StatusChip>
          {order.items.some((item) => item.stockWarning) ? (
            <StatusChip variant="warning">สต๊อกติดลบ</StatusChip>
          ) : null}
        </div>
      </td>
      <td className="px-3 py-4 text-right">
        <div className="flex flex-wrap justify-end gap-2">
          <Button onClick={onOpen} size="sm" type="button" variant="outline">
            ดูสรุป
          </Button>
          <Button asChild size="sm">
            <Link
              href={shipmentHref(shipmentRoutes.builder(order.id), currentUser)}
            >
              <Truck aria-hidden className="mr-2 h-4 w-4" />
              สร้างรอบจัดส่ง
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}

function ReadyOrderCard({
  currentUser,
  onOpen,
  order,
  selected,
}: {
  currentUser: FixtureUser;
  onOpen: () => void;
  order: ReadyToShipOrderView;
  selected: boolean;
}) {
  return (
    <article
      className={cn(
        "grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-start",
        selected && "bg-primary-soft/60",
      )}
    >
      <div className="min-w-0 space-y-3">
        <div className="flex flex-wrap gap-2">
          <StatusChip>{order.id}</StatusChip>
          {sourceLabels(order).map((label) => (
            <StatusChip key={label} variant={sourceVariantByLabel(label)}>
              {label}
            </StatusChip>
          ))}
          <StatusChip variant={order.bulkEligible ? "success" : "warning"}>
            {order.bulkEligible ? "สร้างรวมได้" : "ต้องเปิดแยก"}
          </StatusChip>
        </div>
        <div className="flex items-start gap-3">
          <ShipmentThumbnailStrip items={order.items} />
          <div>
            <h2 className="text-lg font-extrabold leading-7 text-foreground">
              {order.recipientName}
            </h2>
            <p className="text-sm font-semibold leading-6 text-muted-foreground">
              {order.phone} • {order.address}
            </p>
          </div>
        </div>
        <p className="text-sm font-bold leading-6 text-foreground">
          {order.items[0]?.title}
        </p>
        <div className="flex flex-wrap gap-2">
          <StatusChip variant="warning">
            {order.deliveryDate ?? "ยังไม่ระบุวัน"}
          </StatusChip>
          <StatusChip variant="neutral">{order.carrier}</StatusChip>
          <CodVisibilityChip codVisibility={order.codVisibility} />
          {order.items.some((item) => item.stockWarning) ? (
            <StatusChip variant="warning">สต๊อกติดลบ</StatusChip>
          ) : null}
        </div>
      </div>
      <div className="grid gap-2 sm:min-w-36">
        <Button onClick={onOpen} size="sm" type="button" variant="outline">
          ดูสรุป
        </Button>
        <Button asChild size="sm">
          <Link
            href={shipmentHref(shipmentRoutes.builder(order.id), currentUser)}
          >
            สร้างรอบจัดส่ง
          </Link>
        </Button>
      </div>
    </article>
  );
}

function SelectedOrderPanel({
  currentUser,
  order,
}: {
  currentUser: FixtureUser;
  order: ReadyToShipOrderView;
}) {
  return (
    <aside className="grid content-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-soft">
      <div>
        <p className="text-xs font-extrabold text-muted-foreground">
          สรุปรายการที่เลือก
        </p>
        <h2 className="mt-1 text-lg font-extrabold text-foreground">
          {order.id}
        </h2>
      </div>
      <div className="grid gap-3">
        {order.items.map((item) => (
          <div className="flex gap-3" key={`${order.id}-${item.title}`}>
            <ShipmentItemThumb item={item} />
            <div className="min-w-0">
              <p className="text-sm font-bold leading-6 text-foreground">
                {item.title}
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                <SourceChip item={item} />
                <StatusChip variant="neutral">{item.quantity} ชิ้น</StatusChip>
                {item.stockWarning ? (
                  <StatusChip variant="warning">{item.stockWarning}</StatusChip>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-md border border-border bg-subtle p-3">
        <p className="text-xs font-bold text-muted-foreground">ผู้รับสินค้า</p>
        <p className="mt-1 text-sm font-bold leading-6 text-foreground">
          {order.recipientName} • {order.phone}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          {order.address}
        </p>
      </div>
      <Button asChild>
        <Link
          href={shipmentHref(shipmentRoutes.builder(order.id), currentUser)}
        >
          สร้างรอบจัดส่ง
        </Link>
      </Button>
    </aside>
  );
}

function matchesReadyFilter(
  order: ReadyToShipOrderView,
  activeFilter: ReadyFilter,
): boolean {
  if (activeFilter === "กำหนดส่งวันนี้") {
    return order.deliveryDate === "วันนี้";
  }

  if (activeFilter === "สินค้าพร้อมส่ง") {
    return order.items.some((item) => item.source === "stock");
  }

  if (activeFilter === "งานสั่งทำเสร็จแล้ว") {
    return order.items.some((item) => item.source === "custom");
  }

  if (activeFilter === "งานบริการ") {
    return order.items.some((item) => item.source === "service");
  }

  if (activeFilter === "COD") {
    return order.codVisibility.kind !== "none";
  }

  if (activeFilter === "สร้างรวมได้") {
    return order.bulkEligible;
  }

  return true;
}

function matchesReadySearch(order: ReadyToShipOrderView, query: string) {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return true;
  }

  return [
    order.id,
    order.customerName,
    order.recipientName,
    order.phone,
    order.address,
    order.carrier,
    order.note,
    order.deliveryDate,
    ...order.items.flatMap((item) => [
      item.title,
      item.jobId,
      item.skuCode,
      item.color,
      getSourceLabel(item.source),
      item.note,
    ]),
  ]
    .filter(Boolean)
    .some((value) => normalizeSearch(String(value)).includes(normalizedQuery));
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase("th-TH");
}

function sourceLabels(order: ReadyToShipOrderView): string[] {
  return Array.from(
    new Set(order.items.map((item) => getSourceLabel(item.source))),
  );
}

function sourceVariantByLabel(label: string) {
  if (label === "งานสั่งทำเสร็จแล้ว") {
    return "revision" as const;
  }

  if (label === "งานบริการ") {
    return "action" as const;
  }

  return "neutral" as const;
}
