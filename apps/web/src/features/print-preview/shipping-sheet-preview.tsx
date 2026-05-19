import Link from "next/link";
import { MapPin, Phone, Printer, Truck } from "lucide-react";
import { Button, EmptyState, PageHeader, StatusChip } from "@thaiboran/ui";

import {
  formatBaht,
  getShippingSheetModel,
} from "@/features/shipments/fixtures/shipments";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function ShippingSheetPreview({
  currentUser,
  shipmentId,
}: {
  currentUser: FixtureUser;
  shipmentId: string;
}) {
  const document = getShippingSheetModel(shipmentId, currentUser);

  if (!document) {
    return <EmptyState title="ไม่มีข้อมูลผู้รับสินค้าในใบจัดส่ง" />;
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
              พิมพ์ใบจัดส่ง
            </Button>
            <Button asChild variant="outline">
              <Link
                href={shipmentHref(
                  shipmentRoutes.deliveryNote(document.shipmentId),
                  currentUser,
                )}
              >
                ดูใบส่งของ
              </Link>
            </Button>
          </div>
        }
        description="A4 recipient/address-focused preview แสดง COD เฉพาะเมื่อสิทธิ์มองเห็นได้"
        meta={
          document.codAmountBaht ? (
            <StatusChip variant="danger">
              COD {formatBaht(document.codAmountBaht)}
            </StatusChip>
          ) : (
            <StatusChip variant="neutral">ไม่มี COD ที่มองเห็นได้</StatusChip>
          )
        }
        title="ใบจัดส่ง"
      />

      <div className="overflow-x-auto rounded-lg border border-border bg-subtle p-3 sm:p-6">
        <article className="mx-auto min-h-[980px] w-full max-w-[794px] bg-white p-6 text-[#17231F] shadow-lifted sm:p-10">
          <header className="grid gap-4 border-b border-[#D9E2DE] pb-5 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="text-sm font-bold text-[#64736D]">THAIBORAN ERP</p>
              <h2 className="mt-2 text-3xl font-extrabold">ใบจัดส่ง</h2>
            </div>
            <div className="text-sm font-semibold leading-7 text-[#2F3D38]">
              <p>เลขรอบจัดส่ง: {document.shipmentId}</p>
              <p>วันจัดส่ง: {document.deliveryDate ?? "วันนี้ / ไม่ระบุวัน"}</p>
            </div>
          </header>

          <section className="mt-8 rounded-lg border border-[#D9E2DE] p-5">
            <p className="text-sm font-bold text-[#64736D]">ผู้รับสินค้า</p>
            <h3 className="mt-2 text-3xl font-extrabold leading-[1.35]">
              {document.recipient}
            </h3>
            <p className="mt-4 flex items-start gap-2 text-xl font-extrabold leading-8">
              <Phone aria-hidden className="mt-1 h-5 w-5 text-[#1F5D55]" />
              {document.phone}
            </p>
            <p className="mt-4 flex items-start gap-2 text-xl font-bold leading-9">
              <MapPin aria-hidden className="mt-1 h-5 w-5 text-[#1F5D55]" />
              {document.address}
            </p>
          </section>

          <section className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#D9E2DE] p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-[#64736D]">
                <Truck aria-hidden className="h-4 w-4" />
                ขนส่ง
              </p>
              <p className="mt-2 text-lg font-extrabold">{document.carrier}</p>
            </div>
            <div className="rounded-lg border border-[#D9E2DE] p-4">
              <p className="text-sm font-bold text-[#64736D]">COD</p>
              <p className="mt-2 text-lg font-extrabold">
                {document.codAmountBaht
                  ? formatBaht(document.codAmountBaht)
                  : "ไม่แสดง"}
              </p>
            </div>
          </section>

          <section className="mt-5 rounded-lg border border-[#D9E2DE] p-4">
            <p className="text-sm font-bold text-[#64736D]">สรุปรายการ</p>
            <p className="mt-2 text-lg font-extrabold leading-8">
              {document.itemSummary}
            </p>
          </section>

          {document.deliveryNote ? (
            <section className="mt-5 rounded-lg border border-[#D9E2DE] p-4">
              <p className="text-sm font-bold text-[#64736D]">หมายเหตุจัดส่ง</p>
              <p className="mt-2 text-base font-semibold leading-7">
                {document.deliveryNote}
              </p>
            </section>
          ) : null}

          <footer className="mt-8 border-t border-[#D9E2DE] pt-5 text-sm font-semibold text-[#64736D]">
            ใบจัดส่งเน้นผู้รับ ที่อยู่ ขนส่ง และสรุปรายการ
            รายละเอียดสินค้าเต็มอยู่ในใบส่งของ
          </footer>
        </article>
      </div>
    </div>
  );
}
