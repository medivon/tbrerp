"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ClipboardList, PackageCheck, Search, Truck } from "lucide-react";
import {
  Button,
  EmptyState,
  MetricCard,
  PageHeader,
  StatusChip,
  ToolbarShell,
} from "@thaiboran/ui";

import {
  getClosedAndCancelledOrders,
  getFollowUpOrders,
  orderFixtures,
  orderStatusLabels,
  type OrderStatus,
} from "@/features/orders/fixtures/orders";
import { OrderTabs } from "@/features/orders/components/order-tabs";
import { OrderWorkbenchTable } from "@/features/orders/components/order-workbench-table";
import {
  filterOrders,
  hasOrderListFilters,
  orderPageSizeOptions,
  paginateRows,
  type OrderListFilters,
  type OrderPageSize,
} from "@/features/orders/order-list-state";
import {
  orderHref,
  orderRoutes,
  type OrderWorkspaceTab,
} from "@/features/orders/routes";
import { cn } from "@/lib/utils";
import type { FixtureUser } from "@/shared/fixtures/users";

type OrderListMode = "all" | "closed" | "follow-up";

const modeCopy: Record<
  OrderListMode,
  {
    activeTab: OrderWorkspaceTab;
    description: string;
    title: string;
  }
> = {
  all: {
    activeTab: "all",
    title: "ออเดอร์ทั้งหมด",
    description:
      "รายการออเดอร์จริงทุกสถานะ แยกสถานะออเดอร์ออกจากสถานะการจัดส่ง และไม่รวมร่างออเดอร์",
  },
  closed: {
    activeTab: "closed",
    title: "ปิดแล้ว / ยกเลิก",
    description:
      "ออเดอร์ที่จัดส่งครบแล้วหรือยกเลิก เปิดดูแบบ read-first โดยไม่แก้ต้นฉบับออเดอร์ใน workflow ปกติ",
  },
  "follow-up": {
    activeTab: "follow-up",
    title: "ออเดอร์ที่ต้องติดตาม",
    description:
      "คิวออเดอร์จริงที่ยังต้องติดตามงาน ผลิต จัดส่ง หรือเปิดดูรายละเอียดต่อ ไม่มีร่างออเดอร์ในคิวนี้",
  },
};

export function OrderList({
  currentUser,
  mode,
}: {
  currentUser: FixtureUser;
  mode: OrderListMode;
}) {
  const copy = modeCopy[mode];
  const [query, setQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [shipmentStatus, setShipmentStatus] =
    useState<OrderListFilters["shipmentStatus"]>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<OrderPageSize>(25);
  const orders =
    mode === "follow-up"
      ? getFollowUpOrders()
      : mode === "closed"
        ? getClosedAndCancelledOrders()
        : orderFixtures;
  const filters = useMemo<OrderListFilters>(
    () => ({
      orderStatus,
      query,
      shipmentStatus,
    }),
    [orderStatus, query, shipmentStatus],
  );
  const filteredOrders = useMemo(
    () => filterOrders(orders, filters),
    [filters, orders],
  );
  const pageData = useMemo(
    () => paginateRows(filteredOrders, { page, pageSize }),
    [filteredOrders, page, pageSize],
  );
  const hasFilters = hasOrderListFilters(filters);

  useEffect(() => {
    setPage(1);
  }, [mode, orderStatus, pageSize, query, shipmentStatus]);

  const producingCount = filteredOrders.filter(
    (order) => order.orderStatus === "กำลังผลิต",
  ).length;
  const waitingShipmentConfirmationCount = filteredOrders.filter(
    (order) => order.shipmentSummary.kind === "waiting-confirmation",
  ).length;

  function clearFilters() {
    setQuery("");
    setOrderStatus(null);
    setShipmentStatus(null);
    setPage(1);
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <Button asChild>
            <Link href={orderHref(orderRoutes.create, currentUser)}>
              สร้างออเดอร์ใหม่
            </Link>
          </Button>
        }
        description={copy.description}
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="neutral">
              {filteredOrders.length} จาก {orders.length} รายการ
            </StatusChip>
            {hasFilters ? (
              <StatusChip variant="action">กำลังกรองใน fixture</StatusChip>
            ) : null}
          </div>
        }
        title={copy.title}
      />

      <OrderTabs activeTab={copy.activeTab} currentUser={currentUser} />

      <section aria-label="สรุปออเดอร์" className="grid gap-3 md:grid-cols-3">
        <MetricCard
          description="เฉพาะออเดอร์จริง ไม่รวมร่าง"
          icon={<ClipboardList aria-hidden className="h-5 w-5" />}
          title="จำนวนที่ตรงตัวกรอง"
          unit="Order"
          value={filteredOrders.length}
        />
        <MetricCard
          description="แสดงเป็นสถานะออเดอร์ ไม่ปนกับสถานะจัดส่ง"
          icon={<PackageCheck aria-hidden className="h-5 w-5" />}
          statusLabel="กำลังผลิต"
          statusVariant="revision"
          title="กำลังผลิต"
          unit="Order"
          value={producingCount}
        />
        <MetricCard
          description="รอยืนยันการจัดส่งเป็นสถานะจัดส่งเท่านั้น"
          icon={<Truck aria-hidden className="h-5 w-5" />}
          statusLabel="สถานะจัดส่ง"
          statusVariant="warning"
          title="รอยืนยันการจัดส่ง"
          unit="Order"
          value={waitingShipmentConfirmationCount}
        />
      </section>

      <ToolbarShell
        actions={
          <Button
            disabled={!hasFilters}
            onClick={clearFilters}
            size="sm"
            title={hasFilters ? undefined : "ยังไม่มีตัวกรองให้ล้าง"}
            type="button"
            variant="outline"
          >
            ล้างตัวกรอง
          </Button>
        }
        leading={
          <Search aria-hidden className="h-4 w-4 text-muted-foreground" />
        }
      >
        <label className="sr-only" htmlFor="order-search">
          ค้นหาออเดอร์
        </label>
        <input
          className="min-h-10 min-w-0 flex-1 basis-full rounded-md border border-border bg-surface px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:basis-auto sm:min-w-[22rem]"
          id="order-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ค้นหาเลขออเดอร์ ลูกค้า เบอร์ ผู้รับ ที่อยู่ Job ID หรือสินค้า"
          type="search"
          value={query}
        />
        <FilterGroup label="สถานะออเดอร์">
          <FilterButton
            active={orderStatus === null}
            label="ทั้งหมด"
            onClick={() => setOrderStatus(null)}
          />
          {orderStatusLabels.map((filter) => (
            <FilterButton
              active={orderStatus === filter}
              key={filter}
              label={filter}
              onClick={() =>
                setOrderStatus((current) =>
                  current === filter ? null : filter,
                )
              }
            />
          ))}
        </FilterGroup>
        <FilterGroup label="สถานะจัดส่ง">
          <FilterButton
            active={shipmentStatus === "waiting-confirmation"}
            label="รอยืนยันการจัดส่ง"
            onClick={() =>
              setShipmentStatus((current) =>
                current === "waiting-confirmation"
                  ? null
                  : "waiting-confirmation",
              )
            }
          />
        </FilterGroup>
      </ToolbarShell>

      {filteredOrders.length > 0 ? (
        <OrderWorkbenchTable
          currentUser={currentUser}
          orders={pageData.pageRows}
        />
      ) : (
        <EmptyState
          action={
            <Button
              onClick={clearFilters}
              size="sm"
              type="button"
              variant="outline"
            >
              ล้างตัวกรอง
            </Button>
          }
          title="ไม่พบออเดอร์ที่ตรงกับตัวกรอง"
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted-foreground shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            แสดง{" "}
            {filteredOrders.length === 0
              ? "0"
              : `${pageData.startIndex + 1}-${pageData.endIndex}`}{" "}
            จาก {filteredOrders.length} รายการ
          </span>
          <label className="flex items-center gap-2 font-semibold text-foreground">
            ต่อหน้า
            <select
              className="min-h-9 rounded-md border border-border bg-surface px-2 text-sm font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              onChange={(event) =>
                setPageSize(Number(event.target.value) as OrderPageSize)
              }
              value={pageSize}
            >
              {orderPageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={pageData.currentPage <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            size="sm"
            title={pageData.currentPage <= 1 ? "อยู่หน้าแรกแล้ว" : undefined}
            type="button"
            variant="outline"
          >
            ก่อนหน้า
          </Button>
          <span className="rounded-md bg-subtle px-3 py-2 font-semibold text-foreground">
            {pageData.currentPage} / {pageData.totalPages}
          </span>
          <Button
            disabled={pageData.currentPage >= pageData.totalPages}
            onClick={() =>
              setPage((current) => Math.min(pageData.totalPages, current + 1))
            }
            size="sm"
            title={
              pageData.currentPage >= pageData.totalPages
                ? "อยู่หน้าสุดท้ายแล้ว"
                : undefined
            }
            type="button"
            variant="outline"
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        "min-h-9 cursor-pointer rounded-full border px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

function FilterGroup({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div
      aria-label={label}
      className="flex min-w-0 flex-wrap items-center gap-2"
      role="group"
    >
      <span className="text-xs font-extrabold text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}
