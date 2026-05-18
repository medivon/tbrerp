import Link from "next/link";
import type { ReactNode } from "react";
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
} from "@/features/orders/fixtures/orders";
import { OrderTabs } from "@/features/orders/components/order-tabs";
import { OrderWorkbenchTable } from "@/features/orders/components/order-workbench-table";
import {
  orderHref,
  orderRoutes,
  type OrderWorkspaceTab,
} from "@/features/orders/routes";
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
  const orders =
    mode === "follow-up"
      ? getFollowUpOrders()
      : mode === "closed"
        ? getClosedAndCancelledOrders()
        : orderFixtures;

  const producingCount = orders.filter(
    (order) => order.orderStatus === "กำลังผลิต",
  ).length;
  const waitingShipmentConfirmationCount = orders.filter(
    (order) => order.shipmentSummary.kind === "waiting-confirmation",
  ).length;

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
        meta={<StatusChip variant="neutral">{orders.length} รายการ</StatusChip>}
        title={copy.title}
      />

      <OrderTabs activeTab={copy.activeTab} currentUser={currentUser} />

      <section aria-label="สรุปออเดอร์" className="grid gap-3 md:grid-cols-3">
        <MetricCard
          description="เฉพาะออเดอร์จริง ไม่รวมร่าง"
          icon={<ClipboardList aria-hidden className="h-5 w-5" />}
          title="จำนวนในมุมมองนี้"
          unit="Order"
          value={orders.length}
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
          <Button size="sm" variant="outline">
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
          placeholder="ค้นหาเลขออเดอร์ ลูกค้า เบอร์ ผู้รับ ที่อยู่ Job ID หรือสินค้า"
          type="search"
        />
        <FilterGroup label="สถานะออเดอร์">
          {[
            "ทั้งหมด",
            "กำลังดำเนินการ",
            "กำลังผลิต",
            "พร้อมสร้างรอบจัดส่ง",
            "ส่งบางส่วน",
            "จัดส่งครบแล้ว",
            "ยกเลิก",
          ].map((filter) => (
            <button
              className="min-h-9 cursor-pointer rounded-full border border-border bg-surface px-3 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              key={filter}
              type="button"
            >
              {filter}
            </button>
          ))}
        </FilterGroup>
        <FilterGroup label="สถานะจัดส่ง">
          <button
            className="min-h-9 cursor-pointer rounded-full border border-border bg-surface px-3 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            type="button"
          >
            รอยืนยันการจัดส่ง
          </button>
        </FilterGroup>
      </ToolbarShell>

      {orders.length > 0 ? (
        <OrderWorkbenchTable currentUser={currentUser} orders={orders} />
      ) : (
        <EmptyState
          action={
            <Button size="sm" variant="outline">
              ล้างตัวกรอง
            </Button>
          }
          title="ไม่พบออเดอร์ที่ตรงกับตัวกรอง"
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted-foreground shadow-soft">
        <span>แสดง 25 ต่อหน้า</span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            ก่อนหน้า
          </Button>
          <span className="rounded-md bg-subtle px-3 py-2 font-semibold text-foreground">
            1
          </span>
          <Button size="sm" variant="outline">
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
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
