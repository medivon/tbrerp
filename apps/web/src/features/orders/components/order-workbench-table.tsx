import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Hammer } from "lucide-react";
import { Button, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  formatBaht,
  type OrderFixture,
  type OrderLineFixture,
} from "@/features/orders/fixtures/orders";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";
import { cn } from "@/lib/utils";

import { OrderStatusChip, ShipmentStatusChip } from "./order-status-chip";

export function OrderWorkbenchTable({
  currentUser,
  orders,
}: {
  currentUser: FixtureUser;
  orders: OrderFixture[];
}) {
  return (
    <SurfaceCard className="overflow-hidden" padding="none">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="bg-subtle text-xs font-bold text-muted-foreground">
            <tr>
              <TableHeader>เลขออเดอร์</TableHeader>
              <TableHeader>ชื่อลูกค้า</TableHeader>
              <TableHeader>เบอร์โทร</TableHeader>
              <TableHeader>รายการสินค้า</TableHeader>
              <TableHeader>สถานะออเดอร์</TableHeader>
              <TableHeader>สถานะการจัดส่ง</TableHeader>
              <TableHeader className="text-right">ยอดรวม</TableHeader>
              <TableHeader>มีงานสั่งทำ</TableHeader>
              <TableHeader>วันที่สร้าง</TableHeader>
              <TableHeader className="text-right">การทำงาน</TableHeader>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                className={cn(
                  "border-t border-border bg-surface align-top transition-colors hover:bg-subtle/50",
                  order.orderStatus === "ยกเลิก" && "opacity-65",
                )}
                key={order.id}
              >
                <TableCell>
                  <span className="font-bold text-foreground">{order.id}</span>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-foreground">
                    {order.customerName}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    ผู้รับ {order.recipientName}
                  </div>
                </TableCell>
                <TableCell>{order.customerPhone}</TableCell>
                <TableCell>
                  <OrderItemsDetails lines={order.lines} />
                </TableCell>
                <TableCell>
                  <OrderStatusChip status={order.orderStatus} />
                </TableCell>
                <TableCell>
                  <ShipmentSummary order={order} />
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums text-foreground">
                  {formatBaht(order.netTotalBaht)}
                </TableCell>
                <TableCell>
                  {order.hasCustomWork ? (
                    <span
                      aria-label="มีงานสั่งทำ"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-subtle text-muted-foreground"
                      title="มีงานสั่งทำ"
                    >
                      <Hammer aria-hidden className="h-4 w-4" />
                    </span>
                  ) : (
                    <span aria-label="ไม่มีงานสั่งทำ" />
                  )}
                </TableCell>
                <TableCell>{order.createdDateShort}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={orderHref(
                        orderRoutes.detail(order.id),
                        currentUser,
                      )}
                    >
                      เปิดออเดอร์
                    </Link>
                  </Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-0 lg:hidden">
        {orders.map((order) => (
          <article
            className={cn(
              "grid gap-3 border-b border-border p-4 last:border-b-0",
              order.orderStatus === "ยกเลิก" && "opacity-65",
            )}
            key={order.id}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-base font-extrabold text-foreground">
                  {order.id}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {order.customerName} • {order.customerPhone}
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link
                  href={orderHref(orderRoutes.detail(order.id), currentUser)}
                >
                  เปิดออเดอร์
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <OrderStatusChip status={order.orderStatus} />
              <ShipmentStatusChip
                kind={order.shipmentSummary.kind}
                label={order.shipmentSummary.label}
              />
              {order.hasCustomWork ? (
                <StatusChip variant="neutral">มีงานสั่งทำ</StatusChip>
              ) : null}
            </div>
            <OrderItemsDetails lines={order.lines} />
            <div className="grid gap-1 text-sm text-muted-foreground">
              <span>ผู้รับ {order.recipientName}</span>
              <span>วันที่สร้าง {order.createdDateShort}</span>
              <span className="font-semibold text-foreground">
                ยอดรวม {formatBaht(order.netTotalBaht)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </SurfaceCard>
  );
}

function TableHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th className={cn("px-3 py-3 text-xs leading-5", className)} scope="col">
      {children}
    </th>
  );
}

function TableCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={cn("px-3 py-4", className)}>{children}</td>;
}

function OrderItemsDetails({ lines }: { lines: OrderLineFixture[] }) {
  const firstLine = lines[0];
  const additionalCount = lines.length - 1;
  const readyLines = lines.filter((line) => line.type === "ready-stock");
  const customLines = lines.filter((line) => line.type === "custom-work");

  return (
    <details className="group relative max-w-[260px]">
      <summary className="cursor-pointer list-none rounded-md text-sm font-semibold leading-6 text-foreground transition hover:text-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden">
        {firstLine?.title ?? "ไม่มีรายการ"}
        {additionalCount > 0 ? (
          <span className="text-muted-foreground">
            {" "}
            +{additionalCount} รายการ
          </span>
        ) : null}
      </summary>
      <div className="mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface p-3 shadow-soft">
        <div className="grid gap-3">
          {readyLines.length > 0 ? (
            <LineGroup
              heading={customLines.length > 0 ? "สินค้า" : undefined}
              lines={readyLines}
            />
          ) : null}
          {customLines.length > 0 ? (
            <LineGroup
              heading={readyLines.length > 0 ? "งานสั่งทำ" : undefined}
              lines={customLines}
            />
          ) : null}
        </div>
      </div>
    </details>
  );
}

function LineGroup({
  heading,
  lines,
}: {
  heading?: string;
  lines: OrderLineFixture[];
}) {
  return (
    <div className="grid gap-2">
      {heading ? (
        <p className="text-xs font-bold text-muted-foreground">{heading}</p>
      ) : null}
      {lines.map((line) => (
        <div
          className="grid grid-cols-[40px_minmax(0,1fr)] gap-2"
          key={line.id}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-md border border-border bg-subtle">
            <Image
              alt={line.imageAlt}
              className="object-cover"
              fill
              sizes="40px"
              src={line.imageSrc}
            />
          </div>
          <div className="min-w-0 text-sm leading-6">
            <p className="font-semibold text-foreground">{line.title}</p>
            <p className="text-muted-foreground">
              {line.quantity} ชิ้น • {formatBaht(line.lineTotalBaht)}
            </p>
            {line.customDetail ? (
              <p className="text-muted-foreground">{line.customDetail}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function ShipmentSummary({ order }: { order: OrderFixture }) {
  const textTone =
    order.shipmentSummary.kind === "none"
      ? "text-[#B42318]"
      : order.shipmentSummary.kind === "round-without-tracking"
        ? "text-action"
        : "text-foreground";

  return (
    <details className="relative max-w-[240px]">
      <summary
        className={cn(
          "cursor-pointer list-none rounded-md text-sm font-semibold leading-6 transition hover:text-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 [&::-webkit-details-marker]:hidden",
          textTone,
        )}
      >
        {order.shipmentSummary.label}
      </summary>
      <div className="mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border bg-surface p-3 text-sm leading-6 shadow-soft">
        <p className="font-semibold text-foreground">
          {order.shipmentSummary.detail}
        </p>
        {order.shipmentRounds.length > 0 ? (
          <div className="mt-2 grid gap-2">
            {order.shipmentRounds.map((round) => (
              <div
                className="rounded-md border border-border bg-subtle px-3 py-2"
                key={round.shipmentNo}
              >
                <p className="font-semibold text-foreground">
                  {round.shipmentNo} • {round.status}
                </p>
                <p className="text-muted-foreground">
                  {round.carrier}
                  {round.tracking ? ` : ${round.tracking}` : ""}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </details>
  );
}
