import Image from "next/image";
import Link from "next/link";
import { FileText, Printer } from "lucide-react";
import { Button, EmptyState, PageHeader, StatusChip } from "@thaiboran/ui";

import { getDeliveryNoteModel } from "@/features/shipments/fixtures/shipments";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function DeliveryNotePreview({
  currentUser,
  shipmentId,
}: {
  currentUser: FixtureUser;
  shipmentId: string;
}) {
  const document = getDeliveryNoteModel(shipmentId);

  if (!document) {
    return <EmptyState title="ไม่มีรายการสินค้าในใบส่งของ" />;
  }

  return (
    <div className="mx-auto grid w-full max-w-[1180px] gap-5">
      <PageHeader
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              disabled
              title="ไม่มี print backend ใน sector นี้"
              variant="outline"
            >
              <Printer aria-hidden className="mr-2 h-4 w-4" />
              พิมพ์ใบส่งของ
            </Button>
            <Button asChild variant="outline">
              <Link
                href={shipmentHref(
                  shipmentRoutes.shippingSheet(document.shipmentId),
                  currentUser,
                )}
              >
                ดูใบจัดส่ง
              </Link>
            </Button>
          </div>
        }
        description="A4 item-focused preview ไม่มีราคาและไม่มีข้อมูลการเงิน"
        meta={
          <StatusChip variant="neutral">
            ไม่มีข้อมูลการเงินในเอกสารนี้
          </StatusChip>
        }
        title="ใบส่งของ"
      />

      <div className="overflow-x-auto rounded-lg border border-border bg-subtle p-3 sm:p-6">
        <article className="mx-auto min-h-[980px] w-full max-w-[794px] bg-white p-6 text-[#17231F] shadow-lifted sm:p-10">
          <header className="grid gap-4 border-b border-[#D9E2DE] pb-5 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="text-sm font-bold text-[#64736D]">THAIBORAN ERP</p>
              <h2 className="mt-2 text-3xl font-extrabold">ใบส่งของ</h2>
            </div>
            <div className="text-sm font-semibold leading-7 text-[#2F3D38]">
              <p>เลขรอบจัดส่ง: {document.shipmentId}</p>
              <p>เลขออเดอร์: {document.orderId}</p>
            </div>
          </header>

          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <FileText aria-hidden className="h-4 w-4 text-[#1F5D55]" />
              <h3 className="text-lg font-extrabold">รายการสินค้า</h3>
            </div>
            <div className="grid gap-3">
              {document.items.map((item) => (
                <div
                  className="grid gap-3 rounded-md border border-[#D9E2DE] p-3 sm:grid-cols-[72px_minmax(0,1fr)_80px]"
                  key={`${document.shipmentId}-${item.name}`}
                >
                  <div className="relative h-[72px] w-[72px] overflow-hidden rounded-md border border-[#D9E2DE] bg-[#EEF3F1]">
                    <Image
                      alt={item.imageAlt}
                      className="object-cover"
                      fill
                      sizes="72px"
                      src={item.imageSrc}
                    />
                  </div>
                  <div>
                    <p className="text-base font-extrabold leading-7">
                      {item.name}
                    </p>
                    {item.skuCode ? (
                      <p className="mt-1 text-sm font-semibold text-[#64736D]">
                        {item.skuCode}
                      </p>
                    ) : null}
                    {item.note ? (
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#2F3D38]">
                        หมายเหตุ: {item.note}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-sm font-extrabold sm:text-right">
                    {item.quantity} ชิ้น
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-8 border-t border-[#D9E2DE] pt-5 text-sm font-semibold text-[#64736D]">
            เอกสารนี้ใช้ตรวจรายการสินค้าเท่านั้น ไม่มีราคา และไม่มีข้อมูลการเงิน
          </footer>
        </article>
      </div>
    </div>
  );
}
