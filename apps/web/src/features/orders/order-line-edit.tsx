import Link from "next/link";
import { ArrowLeft, PackagePlus, ShieldAlert } from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import { OrderStatusChip } from "@/features/orders/components/order-status-chip";
import {
  formatBaht,
  getOrderById,
  type OrderLineFixture,
} from "@/features/orders/fixtures/orders";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderLineEdit({
  currentUser,
  orderId,
}: {
  currentUser: FixtureUser;
  orderId: string;
}) {
  const order = getOrderById(orderId);

  if (!order) {
    return <EmptyState title="ไม่พบออเดอร์สำหรับแก้ไขรายการ" />;
  }

  const readyStockLines = order.lines.filter(
    (line) => line.type === "ready-stock",
  );
  const customLines = order.lines.filter((line) => line.type === "custom-work");
  const editableLines = order.lines.filter((line) => line.editable);
  const blockedLines = order.lines.filter((line) => !line.editable);

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <>
            <Button asChild variant="outline">
              <Link href={orderHref(orderRoutes.detail(order.id), currentUser)}>
                <ArrowLeft aria-hidden className="mr-2 h-4 w-4" />
                กลับรายละเอียดออเดอร์
              </Link>
            </Button>
            <Button
              disabled
              title="ต้องผ่าน Review Changes และยังไม่บันทึกจริงในรอบงานนี้"
            >
              ตรวจสอบการแก้ไข
            </Button>
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
          <div>
            <p className="text-sm font-extrabold">Review Changes ก่อนบันทึก</p>
            <p className="mt-1 text-sm leading-6 font-semibold">
              บางรายการแก้ไม่ได้เพราะมี JOB-O อยู่ในรอบจัดส่ง ส่งออกแล้ว
              หรือออเดอร์ปิดแล้ว เหตุผลจะแสดงในแถวรายการ
            </p>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          <EditGroup
            actionLabel="เพิ่มสินค้าพร้อมส่ง"
            lines={readyStockLines}
            title="สินค้าพร้อมส่ง"
          />
          <EditGroup
            actionLabel="เพิ่มงานสั่งทำ"
            lines={customLines}
            title="งานสั่งทำ"
          />
          <SurfaceCard className="grid gap-4" padding="md">
            <div>
              <p className="text-base font-extrabold text-foreground">
                Review Changes
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                ส่วนนี้แสดงตัวอย่างผลกระทบก่อนบันทึกจริง
              </p>
            </div>
            <div className="grid gap-2">
              <ImpactLine
                label="รายการที่แก้ได้"
                value={`${editableLines.length} รายการ`}
              />
              <ImpactLine
                label="รายการที่ถูกบล็อก"
                value={`${blockedLines.length} รายการ`}
              />
              <ImpactLine label="ผลต่อยอดรวม" value="ยังไม่มีการเปลี่ยนแปลง" />
              <ImpactLine label="ผลต่อสต๊อก" value="ยังไม่จองหรือคืนสต๊อก" />
              <ImpactLine
                label="ผลต่อ JOB-O"
                value="ยังไม่สร้างหรือแก้ JOB-O"
              />
              <ImpactLine
                label="ผลต่อรอบจัดส่ง"
                value="ยังไม่สร้างหรือแก้รอบจัดส่ง"
              />
            </div>
            <div className="grid gap-2 border-t border-border pt-4 sm:flex sm:flex-wrap">
              <Button asChild variant="outline">
                <Link
                  href={orderHref(orderRoutes.detail(order.id), currentUser)}
                >
                  ยกเลิก
                </Link>
              </Button>
              <Button disabled title="ยังไม่บันทึกการแก้ไขจริงในรอบงานนี้">
                บันทึกการแก้ไข
              </Button>
            </div>
          </SurfaceCard>
        </div>

        <SurfaceCard
          className="grid gap-4 lg:sticky lg:top-24"
          padding="md"
          variant="shell"
        >
          <div>
            <p className="text-base font-extrabold text-shell-foreground">
              สรุปผลกระทบ
            </p>
            <p className="mt-1 text-sm leading-6 text-shell-muted">
              แสดงตำแหน่งข้อมูลที่ต้องตรวจสอบก่อนบันทึก
            </p>
          </div>
          <div className="grid gap-2">
            <SummaryRow
              label="ยอดออเดอร์ปัจจุบัน"
              value={formatBaht(order.netTotalBaht)}
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
            disabled
            title="ต้องผ่าน Review Changes และยังไม่บันทึกจริงในรอบงานนี้"
          >
            ตรวจสอบการแก้ไข
          </Button>
        </SurfaceCard>
      </div>
    </div>
  );
}

function EditGroup({
  actionLabel,
  lines,
  title,
}: {
  actionLabel: string;
  lines: OrderLineFixture[];
  title: string;
}) {
  return (
    <SurfaceCard className="overflow-hidden" padding="none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-subtle px-4 py-3">
        <p className="text-base font-extrabold text-foreground">{title}</p>
        <Button
          disabled
          size="sm"
          title="เป็นปุ่มตัวอย่าง ยังไม่เพิ่มรายการจริง"
          variant="outline"
        >
          <PackagePlus aria-hidden className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      </div>
      {lines.map((line) => (
        <OrderLineCard key={line.id} line={line} showEditState />
      ))}
    </SurfaceCard>
  );
}

function ImpactLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-border bg-subtle px-3 py-2 text-sm">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span className="text-right font-bold text-foreground">{value}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-shell-border bg-shell px-3 py-2 text-sm">
      <span className="font-semibold text-shell-muted">{label}</span>
      <span className="font-extrabold text-shell-foreground">{value}</span>
    </div>
  );
}
