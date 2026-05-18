import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronDown, CreditCard, ExternalLink, Truck } from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import {
  OrderStatusChip,
  ShipmentStatusChip,
} from "@/features/orders/components/order-status-chip";
import { ReadFirstSection } from "@/features/orders/components/read-first-section";
import {
  formatBaht,
  getOrderById,
  type OrderFixture,
  type OrderLineFixture,
} from "@/features/orders/fixtures/orders";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderDetail({
  currentUser,
  orderId,
}: {
  currentUser: FixtureUser;
  orderId: string;
}) {
  const order = getOrderById(orderId);

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
  const isCompleted = order.orderStatus === "จัดส่งครบแล้ว";
  const isCancelled = order.orderStatus === "ยกเลิก";

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          isCancelled ? (
            <StatusChip variant="danger">ยกเลิกแล้ว</StatusChip>
          ) : (
            <ManageOrderMenu
              currentUser={currentUser}
              disabled={isCompleted}
              order={order}
            />
          )
        }
        description="หน้าอ่านข้อมูลออเดอร์ก่อนแก้ แยกสถานะออเดอร์ออกจากสถานะจัดส่ง"
        meta={
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground">
              <span className="text-muted-foreground">สถานะออเดอร์</span>
              <OrderStatusChip status={order.orderStatus} />
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground">
              <span className="text-muted-foreground">สถานะจัดส่ง</span>
              <ShipmentStatusChip
                kind={order.shipmentSummary.kind}
                label={order.shipmentSummary.label}
              />
            </span>
          </div>
        }
        title={`รายละเอียดออเดอร์ ${order.id}`}
      />

      {isCompleted ? (
        <SurfaceCard className="border-[#BFE5C9] bg-[#E6F4EA]" padding="md">
          <p className="text-sm font-bold leading-6 text-[#166534]">
            ออเดอร์จัดส่งครบแล้ว ต้นฉบับออเดอร์เป็น read-first และไม่แก้รายการ
            ผู้รับ หรือข้อมูลที่กระทบการจัดส่งใน workflow ปกติ
          </p>
        </SurfaceCard>
      ) : null}

      <ReadFirstSection title="สรุปออเดอร์" titleId="order-summary">
        <dl className="grid md:grid-cols-2 xl:grid-cols-4">
          <Fact label="เลขออเดอร์" value={order.id} />
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
        <div className="border-t border-border p-4">
          <Button asChild size="sm" variant="outline">
            <Link href={orderHref("/modules/customers", currentUser)}>
              เปิดลูกค้า
              <ExternalLink aria-hidden className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </ReadFirstSection>

      <ReadFirstSection
        action={
          isCompleted || isCancelled ? (
            <Button
              disabled
              size="sm"
              title={isCompleted ? "ออเดอร์จัดส่งครบแล้ว" : "ออเดอร์ยกเลิกแล้ว"}
              variant="outline"
            >
              แก้ไขรายการออเดอร์
            </Button>
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
          <LineGroup
            currentUser={currentUser}
            lines={readyStockLines}
            title="สินค้าพร้อมส่ง"
          />
        ) : null}
        {customLines.length > 0 ? (
          <LineGroup
            currentUser={currentUser}
            lines={customLines}
            title="งานสั่งทำ"
          />
        ) : null}
        {cancelledLines.length > 0 ? (
          <LineGroup
            currentUser={currentUser}
            lines={cancelledLines}
            title="รายการที่ยกเลิกแล้ว"
          />
        ) : null}
      </ReadFirstSection>

      <ReadFirstSection
        description="เลือกเฉพาะรายการที่พร้อมส่ง รายการที่ยังไปต่อไม่ได้จะแสดงเหตุผลไว้ในแถว"
        title="จัดการรอบจัดส่ง"
        titleId="shipment-management"
      >
        <div className="grid">
          {activeLines.map((line) => (
            <ShipmentSelectionRow key={line.id} line={line} />
          ))}
        </div>
        <div className="border-t border-border p-4">
          <Button disabled title="การสร้างรอบจัดส่งอยู่ใน sector ถัดไป">
            <Truck aria-hidden className="mr-2 h-4 w-4" />
            สร้างรอบจัดส่งจากรายการที่เลือก
          </Button>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            ปุ่มนี้ปิดไว้ในรอบงานนี้ จึงยังไม่สร้างรอบจัดส่งจริง
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
                        <Button
                          disabled
                          size="sm"
                          title="รายละเอียดรอบจัดส่งยังไม่เปิดในรอบงานนี้"
                          variant="outline"
                        >
                          เปิดรอบจัดส่ง
                        </Button>
                        <DisabledReason>
                          รายละเอียดรอบจัดส่งยังไม่เปิดใน Sector 3
                        </DisabledReason>
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
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
          <StatusChip variant="neutral">
            {order.payment.followUpStatus}
          </StatusChip>
          <Button
            disabled
            size="sm"
            title="ยังไม่เปิด Payment/COD action ในรอบงานนี้"
            variant="outline"
          >
            <CreditCard aria-hidden className="mr-2 h-4 w-4" />
            เปิดติดตามการเงิน
          </Button>
          <DisabledReason>
            คำสั่ง Payment/COD ยังไม่เปิดใน Sector 3
          </DisabledReason>
        </div>
      </ReadFirstSection>

      <ReadFirstSection title="ประวัติ" titleId="order-history">
        <ol className="grid">
          {order.timeline.map((event) => (
            <li
              className="grid gap-1 border-b border-border p-4 last:border-b-0"
              key={`${event.title}-${event.detail}`}
            >
              <p className="text-sm font-bold text-foreground">{event.title}</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {event.detail}
              </p>
            </li>
          ))}
        </ol>
      </ReadFirstSection>
    </div>
  );
}

function ManageOrderMenu({
  currentUser,
  disabled,
  order,
}: {
  currentUser: FixtureUser;
  disabled: boolean;
  order: OrderFixture;
}) {
  return (
    <details className="relative">
      <summary className="inline-flex min-h-10 cursor-pointer list-none items-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden">
        จัดการออเดอร์
        <ChevronDown aria-hidden className="ml-2 h-4 w-4" />
      </summary>
      <div className="absolute right-0 z-20 mt-2 grid w-64 gap-1 rounded-lg border border-border bg-surface p-2 shadow-lifted">
        <MenuLink href={orderHref("/modules/customers", currentUser)}>
          เปิดลูกค้า
        </MenuLink>
        {disabled ? (
          <MenuDisabled>แก้ไขรายการสินค้า: ออเดอร์จัดส่งครบแล้ว</MenuDisabled>
        ) : (
          <MenuLink
            href={orderHref(orderRoutes.lineEdit(order.id), currentUser)}
          >
            แก้ไขรายการสินค้า
          </MenuLink>
        )}
        {disabled ? (
          <MenuDisabled>แก้ไขงานสั่งทำ: ออเดอร์จัดส่งครบแล้ว</MenuDisabled>
        ) : (
          <MenuLink
            href={orderHref(orderRoutes.lineEdit(order.id), currentUser)}
          >
            แก้ไขงานสั่งทำ
          </MenuLink>
        )}
        <MenuDisabled>จัดการรอบจัดส่ง: อยู่ในส่วนด้านล่าง</MenuDisabled>
        <MenuDisabled>เปิดติดตามการเงิน: ยังไม่เปิดคำสั่งเงินจริง</MenuDisabled>
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
      className="min-h-10 rounded-md px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      href={href}
    >
      {children}
    </Link>
  );
}

function MenuDisabled({ children }: { children: ReactNode }) {
  return (
    <span className="min-h-10 rounded-md px-3 py-2 text-sm font-semibold leading-6 text-muted-foreground opacity-70">
      {children}
    </span>
  );
}

function DisabledReason({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-56 text-right text-xs font-semibold leading-5 text-muted-foreground">
      {children}
    </p>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border p-4">
      <dt className="text-xs font-bold text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  );
}

function LineGroup({
  currentUser,
  lines,
  title,
}: {
  currentUser: FixtureUser;
  lines: OrderLineFixture[];
  title: string;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <div className="border-b border-border bg-subtle px-4 py-3">
        <p className="text-sm font-extrabold text-foreground">{title}</p>
      </div>
      {lines.map((line) => (
        <OrderLineCard
          actionHref={orderHref("/modules/jobs", currentUser)}
          key={line.id}
          line={line}
        />
      ))}
    </div>
  );
}

function ShipmentSelectionRow({ line }: { line: OrderLineFixture }) {
  const disabledReason = line.readyForShipment
    ? undefined
    : (line.shipmentBlockedReason ?? "ยังเลือกสร้างรอบจัดส่งไม่ได้");

  return (
    <div className="grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
      <label className="flex min-w-0 items-start gap-3">
        <input
          checked={line.readyForShipment}
          className="mt-1 h-4 w-4 rounded border-border"
          disabled={!line.readyForShipment}
          readOnly
          type="checkbox"
        />
        <span className="min-w-0">
          <span className="block text-sm font-bold text-foreground">
            {line.title}
          </span>
          <span className="mt-1 block text-sm leading-6 text-muted-foreground">
            {line.quantity} ชิ้น • {line.shipmentState}
          </span>
        </span>
      </label>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {disabledReason ? (
          <StatusChip variant="warning">{disabledReason}</StatusChip>
        ) : (
          <StatusChip variant="success">เลือกได้</StatusChip>
        )}
      </div>
    </div>
  );
}
