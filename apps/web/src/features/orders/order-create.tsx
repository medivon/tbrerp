import Link from "next/link";
import type { ReactNode } from "react";
import {
  MapPin,
  PackagePlus,
  Plus,
  ReceiptText,
  UserRound,
} from "lucide-react";
import {
  Button,
  PageHeader,
  SectionHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import {
  formatBaht,
  orderEntryFixture,
} from "@/features/orders/fixtures/orders";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderCreate({
  currentUser,
  draftNo,
}: {
  currentUser: FixtureUser;
  draftNo?: string;
}) {
  const totalBaht = [
    ...orderEntryFixture.readyStockLines,
    ...orderEntryFixture.customLines,
  ].reduce((total, line) => total + line.lineTotalBaht, 0);
  const itemCount =
    orderEntryFixture.readyStockLines.length +
    orderEntryFixture.customLines.length;
  const hasMixedLines =
    orderEntryFixture.readyStockLines.length > 0 &&
    orderEntryFixture.customLines.length > 0;

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <>
            <Button disabled title="Sector 3 แสดงปุ่มบันทึกร่างเท่านั้น">
              บันทึกร่าง
            </Button>
            <Button asChild>
              <Link href={orderHref(orderRoutes.review, currentUser)}>
                ตรวจสอบก่อนสร้างออเดอร์
              </Link>
            </Button>
          </>
        }
        description="กรอกข้อมูลออเดอร์แบบชั่วคราว ลูกค้าต้องมาก่อนที่อยู่และรายการสินค้า"
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="warning">ยังไม่ได้สร้างออเดอร์จริง</StatusChip>
            {draftNo ? (
              <StatusChip variant="neutral">เลขร่าง {draftNo}</StatusChip>
            ) : (
              <StatusChip variant="neutral">ยังไม่ได้บันทึกร่าง</StatusChip>
            )}
            <StatusChip variant="neutral">
              บันทึกร่างเป็นปุ่มตัวอย่างใน Sector 3
            </StatusChip>
          </div>
        }
        title="สร้างออเดอร์"
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          <EntrySection
            icon={<UserRound aria-hidden className="h-5 w-5" />}
            title="ลูกค้า"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="ลูกค้า" value={orderEntryFixture.customerName} />
              <Field
                label="เบอร์หลักลูกค้า"
                value={orderEntryFixture.customerPhone}
              />
              <Field
                label="ระดับลูกค้า"
                value={orderEntryFixture.customerTier}
              />
              <Field
                label="Social"
                value={orderEntryFixture.socialContact ?? "ยังไม่ได้ระบุ"}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                เลือกลูกค้า
              </Button>
              <Button size="sm" variant="outline">
                เพิ่มลูกค้าในออเดอร์
              </Button>
            </div>
          </EntrySection>

          <EntrySection
            icon={<MapPin aria-hidden className="h-5 w-5" />}
            title="ที่อยู่ / ผู้รับสินค้า"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="ผู้รับสินค้า"
                value={orderEntryFixture.recipientName}
              />
              <Field
                label="เบอร์ผู้รับ"
                value={orderEntryFixture.recipientPhone}
              />
              <div className="md:col-span-2">
                <Field
                  label="ที่อยู่จัดส่ง"
                  value={orderEntryFixture.address}
                />
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm font-semibold leading-6 text-muted-foreground">
              <input
                className="mt-1 h-4 w-4 rounded border-border"
                type="checkbox"
              />
              บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า
            </label>
          </EntrySection>

          <EntrySection
            icon={<PackagePlus aria-hidden className="h-5 w-5" />}
            title="รายการในออเดอร์"
          >
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                <Plus aria-hidden className="mr-2 h-4 w-4" />
                เพิ่มสินค้าพร้อมส่ง
              </Button>
              <Button size="sm" variant="outline">
                <Plus aria-hidden className="mr-2 h-4 w-4" />
                เพิ่มงานสั่งทำ
              </Button>
            </div>

            <SurfaceCard className="overflow-hidden" padding="none">
              {orderEntryFixture.readyStockLines.map((line) => (
                <OrderLineCard key={line.id} line={line} />
              ))}
              {orderEntryFixture.customLines.map((line) => (
                <div key={line.id}>
                  <OrderLineCard line={line} />
                  <div className="border-b border-border bg-subtle px-4 py-3 last:border-b-0">
                    <p className="text-sm font-bold text-foreground">
                      รายละเอียดงานสั่งทำ
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {line.customDetail}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <StatusChip variant="revision">
                        จะสร้าง JOB-O / งานลูกค้า
                      </StatusChip>
                      <StatusChip variant="neutral">
                        รูปหลัก / รูปช่างไม้ / รูปฝ่ายสี / รูปรักสมุก
                      </StatusChip>
                    </div>
                  </div>
                </div>
              ))}
            </SurfaceCard>

            {hasMixedLines ? (
              <div className="rounded-md border border-border bg-subtle px-3 py-2 text-sm leading-6 text-muted-foreground">
                แผนจัดส่ง: {orderEntryFixture.shipmentIntent}
              </div>
            ) : null}
          </EntrySection>

          <EntrySection
            icon={<ReceiptText aria-hidden className="h-5 w-5" />}
            title="เงื่อนไขการชำระเงิน"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Payment Term"
                value={orderEntryFixture.paymentTerm}
              />
              <Field label="ยอดรวมตัวอย่าง" value={formatBaht(totalBaht)} />
            </div>
            {orderEntryFixture.optionalPaymentRecord ? (
              <div className="rounded-md border border-border bg-subtle px-3 py-3">
                <p className="text-sm font-bold text-foreground">
                  รายการรับเงิน (ตัวอย่าง)
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {orderEntryFixture.optionalPaymentRecord.method}{" "}
                  {formatBaht(
                    orderEntryFixture.optionalPaymentRecord.amountBaht,
                  )}
                  {" • "}
                  {orderEntryFixture.optionalPaymentRecord.note}
                </p>
              </div>
            ) : null}
          </EntrySection>
        </div>

        <SurfaceCard
          className="grid gap-4 lg:sticky lg:top-24"
          padding="md"
          variant="shell"
        >
          <div>
            <p className="text-base font-extrabold text-shell-foreground">
              สรุปความพร้อม
            </p>
            <p className="mt-1 text-sm leading-6 text-shell-muted">
              พร้อมไปหน้า Review โดยยังไม่ออกเลขออเดอร์
            </p>
          </div>
          <div className="grid gap-2">
            <SummaryRow label="ลูกค้า" value="ครบ" />
            <SummaryRow label="ที่อยู่จัดส่ง" value="ครบ" />
            <SummaryRow label="รายการ" value={`${itemCount} รายการ`} />
            <SummaryRow label="Payment Term" value="ครบ" />
          </div>
          <div className="grid gap-2">
            {orderEntryFixture.stockWarnings.map((warning) => (
              <div
                className="rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E]"
                key={warning}
              >
                {warning}
              </div>
            ))}
          </div>
          <div className="border-t border-shell-border pt-4">
            <p className="text-sm font-bold text-shell-foreground">
              {formatBaht(totalBaht)}
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-shell-muted">
              ยอดขายตัวอย่างสำหรับตรวจสอบก่อนสร้างออเดอร์
            </p>
          </div>
          <div className="grid gap-2">
            <Button disabled title="Sector 3 ยังไม่บันทึกร่างจริง">
              บันทึกร่าง
            </Button>
            <p className="text-xs font-semibold leading-5 text-shell-muted">
              ปุ่มบันทึกร่างปิดไว้ในรอบงานนี้ จึงยังไม่สร้างหรือแก้ Draft จริง
            </p>
            <Button asChild>
              <Link href={orderHref(orderRoutes.review, currentUser)}>
                ตรวจสอบก่อนสร้างออเดอร์
              </Link>
            </Button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}

function EntrySection({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) {
  return (
    <SurfaceCard className="grid gap-4" padding="md">
      <SectionHeader
        eyebrow={
          <span className="inline-flex items-center gap-2">
            {icon}
            สร้างออเดอร์
          </span>
        }
        title={title}
      />
      {children}
    </SurfaceCard>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-foreground">
      {label}
      <input
        className="min-h-10 rounded-md border border-border bg-surface px-3 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        defaultValue={value}
      />
    </label>
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
