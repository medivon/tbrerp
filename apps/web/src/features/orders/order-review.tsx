import Link from "next/link";
import { ArrowLeft, FilePenLine } from "lucide-react";
import { Button, PageHeader, StatusChip, SurfaceCard } from "@thaiboran/ui";

import { OrderLineCard } from "@/features/orders/components/order-line-card";
import { ReadFirstSection } from "@/features/orders/components/read-first-section";
import { ReviewImpactPanel } from "@/features/orders/components/review-impact-panel";
import {
  formatBaht,
  orderEntryFixture,
} from "@/features/orders/fixtures/orders";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function OrderReview({ currentUser }: { currentUser: FixtureUser }) {
  const totalBaht = [
    ...orderEntryFixture.readyStockLines,
    ...orderEntryFixture.customLines,
  ].reduce((total, line) => total + line.lineTotalBaht, 0);
  const hasStockWarning = orderEntryFixture.stockWarnings.length > 0;

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <>
            <Button asChild variant="outline">
              <Link href={orderHref(orderRoutes.create, currentUser)}>
                <ArrowLeft aria-hidden className="mr-2 h-4 w-4" />
                กลับ
              </Link>
            </Button>
            <Button disabled title="Sector 3 ยังไม่บันทึกร่างจริง">
              <FilePenLine aria-hidden className="mr-2 h-4 w-4" />
              บันทึกร่าง
            </Button>
          </>
        }
        description="ตรวจสอบลูกค้า ผู้รับสินค้า รายการ เงื่อนไขชำระเงิน และผลหลังยืนยันในหน้าเดียว"
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="success">พร้อมตรวจสอบ</StatusChip>
            {hasStockWarning ? (
              <StatusChip variant="warning">ต้องรับทราบคำเตือน</StatusChip>
            ) : null}
            <StatusChip variant="neutral">
              บันทึกร่างเป็นปุ่มตัวอย่างใน Sector 3
            </StatusChip>
          </div>
        }
        title="ตรวจสอบก่อนสร้างออเดอร์"
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          {hasStockWarning ? (
            <SurfaceCard
              className="border-[#FAD980] bg-[#FEF3C7] text-[#92400E]"
              padding="md"
            >
              <p className="text-sm font-extrabold">คำเตือนสต๊อกก่อนยืนยัน</p>
              <ul className="mt-2 grid gap-1 text-sm font-semibold leading-6">
                {orderEntryFixture.stockWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
              <label className="mt-3 flex items-start gap-2 text-sm font-semibold leading-6">
                <input
                  checked
                  className="mt-1 h-4 w-4 rounded border-[#FAD980]"
                  disabled
                  readOnly
                  type="checkbox"
                />
                รับทราบและสร้างออเดอร์ต่อ (ตัวอย่างการรับทราบ)
              </label>
            </SurfaceCard>
          ) : null}

          <ReadFirstSection
            title="ลูกค้าและผู้รับสินค้า"
            titleId="review-customer"
          >
            <dl className="grid gap-0 md:grid-cols-2">
              <ReviewFact
                label="ลูกค้า"
                value={orderEntryFixture.customerName}
              />
              <ReviewFact
                label="เบอร์หลักลูกค้า"
                value={orderEntryFixture.customerPhone}
              />
              <ReviewFact
                label="ระดับลูกค้า"
                value={orderEntryFixture.customerTier}
              />
              <ReviewFact
                label="Social"
                value={orderEntryFixture.socialContact ?? "ยังไม่ได้ระบุ"}
              />
              <ReviewFact
                label="ผู้รับสินค้า"
                value={orderEntryFixture.recipientName}
              />
              <ReviewFact
                label="เบอร์ผู้รับ"
                value={orderEntryFixture.recipientPhone}
              />
              <div className="md:col-span-2">
                <ReviewFact
                  label="ที่อยู่จัดส่ง"
                  value={orderEntryFixture.address}
                />
              </div>
            </dl>
          </ReadFirstSection>

          {orderEntryFixture.readyStockLines.length > 0 ? (
            <ReadFirstSection
              title="สินค้าพร้อมส่ง"
              titleId="review-ready-stock"
            >
              {orderEntryFixture.readyStockLines.map((line) => (
                <OrderLineCard key={line.id} line={line} />
              ))}
            </ReadFirstSection>
          ) : null}

          {orderEntryFixture.customLines.length > 0 ? (
            <ReadFirstSection title="งานสั่งทำ" titleId="review-custom-work">
              {orderEntryFixture.customLines.map((line) => (
                <OrderLineCard key={line.id} line={line} />
              ))}
            </ReadFirstSection>
          ) : null}

          <ReadFirstSection title="การชำระเงิน" titleId="review-payment">
            <dl className="grid gap-0 md:grid-cols-2">
              <ReviewFact
                label="เงื่อนไขการชำระเงิน"
                value={orderEntryFixture.paymentTerm}
              />
              <ReviewFact label="ยอดรวม" value={formatBaht(totalBaht)} />
              <ReviewFact
                label="รายการรับเงิน"
                value={
                  orderEntryFixture.optionalPaymentRecord
                    ? `${orderEntryFixture.optionalPaymentRecord.method} ${formatBaht(
                        orderEntryFixture.optionalPaymentRecord.amountBaht,
                      )}`
                    : "ยังไม่มีรายการรับเงิน"
                }
              />
              <ReviewFact
                label="แผนจัดส่ง"
                value={orderEntryFixture.shipmentIntent ?? "ไม่มีแผนจัดส่งแยก"}
              />
            </dl>
          </ReadFirstSection>
        </div>

        <ReviewImpactPanel
          confirmDisabledReason="ปุ่มนี้ปิดไว้ใน foundation รอบนี้ จึงยังไม่สร้างออเดอร์จริง ไม่สร้าง JOB-O ไม่จองสต๊อก และไม่สร้างรอบจัดส่ง"
          hasStockWarning={hasStockWarning}
        />
      </div>
    </div>
  );
}

function ReviewFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border p-4">
      <dt className="text-xs font-bold text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  );
}
