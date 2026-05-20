"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, FileText, Printer, Truck } from "lucide-react";
import { getShipmentCodVisibility } from "@thaiboran/domain";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import {
  CodVisibilityChip,
  ShipmentItemThumb,
  SourceChip,
} from "@/features/shipments/components/shipment-common";
import {
  canViewPrintPreviewShipment,
  getPrintPreviewShipment,
} from "@/features/shipments/fixtures/shipments";
import { shipmentHref, shipmentRoutes } from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function ShipmentDetail({
  currentUser,
  shipmentId,
}: {
  currentUser: FixtureUser;
  shipmentId: string;
}) {
  const shipment = getPrintPreviewShipment(shipmentId);
  const [message, setMessage] = useState<string | null>(null);
  const [evidencePhotoCount, setEvidencePhotoCount] = useState(
    shipment?.evidencePhotoCount ?? 0,
  );
  const [deliveryNote, setDeliveryNote] = useState(
    shipment?.deliveryNote ?? "",
  );

  if (!shipment) {
    return <EmptyState title="ไม่พบรอบจัดส่งนี้" />;
  }

  if (!canViewPrintPreviewShipment(shipmentId, currentUser)) {
    return <EmptyState title="ไม่มีสิทธิ์เข้าถึงหน้านี้" />;
  }

  const canAddDeliveryEvidence =
    currentUser.id === "delivery-team" &&
    shipment.responsibleUserId === currentUser.id &&
    !shipment.builderPreview;

  const codVisibility = getShipmentCodVisibility(currentUser.id, {
    codAmountBaht: shipment.codAmountBaht,
    isFinalOrderClosingRound: shipment.isFinalOrderClosingRound,
    responsibleUserId: shipment.responsibleUserId,
  });

  return (
    <div className="mx-auto grid w-full max-w-[1180px] gap-5">
      <PageHeader
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link
                href={shipmentHref(
                  shipmentRoutes.deliveryNote(shipment.id),
                  currentUser,
                )}
              >
                <FileText aria-hidden className="mr-2 h-4 w-4" />
                ดูใบส่งของ
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href={shipmentHref(
                  shipmentRoutes.shippingSheet(shipment.id),
                  currentUser,
                )}
              >
                <Printer aria-hidden className="mr-2 h-4 w-4" />
                ดูใบจัดส่ง
              </Link>
            </Button>
          </div>
        }
        description="อ่านรายละเอียดรอบจัดส่ง ตรวจรายการ และเปิดเอกสารที่เกี่ยวข้อง"
        meta={
          <StatusChip variant={shipment.sentOut ? "success" : "warning"}>
            {shipment.sentOut ? "ส่งออกแล้ว" : "ปล่อยให้ฝ่ายจัดส่งแล้ว"}
          </StatusChip>
        }
        title={`รอบจัดส่ง ${shipment.id}`}
      />

      <div aria-live="polite">
        {message ? (
          <SurfaceCard className="border-[#B9D1FF] bg-[#E0ECFF]" padding="md">
            <p className="text-sm font-bold leading-6 text-[#1D4ED8]">
              {message}
            </p>
          </SurfaceCard>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SurfaceCard className="overflow-hidden" padding="none">
          <div className="border-b border-border bg-subtle px-4 py-3">
            <h2 className="text-base font-extrabold text-foreground">
              รายการในรอบจัดส่ง
            </h2>
          </div>
          <div className="grid">
            {shipment.items.map((item) => (
              <div
                className="flex gap-3 border-b border-border p-4 last:border-b-0"
                key={`${shipment.id}-${item.title}`}
              >
                <ShipmentItemThumb item={item} />
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <SourceChip item={item} />
                    {item.jobId ? (
                      <StatusChip variant="neutral">{item.jobId}</StatusChip>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm font-bold leading-6 text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">
                    {item.quantity} ชิ้น{" "}
                    {item.skuCode ? `• ${item.skuCode}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <aside className="grid content-start gap-4">
          <SurfaceCard padding="md">
            <h2 className="text-base font-extrabold text-foreground">
              ข้อมูลจัดส่ง
            </h2>
            <dl className="mt-3 grid gap-3 text-sm">
              <Fact label="ผู้รับสินค้า" value={shipment.recipientName} />
              <Fact label="เบอร์โทร" value={shipment.phone} />
              <Fact label="ที่อยู่" value={shipment.address} />
              <Fact label="ขนส่ง" value={shipment.carrier} />
              <Fact
                label="Tracking"
                value={shipment.tracking ?? "ยังไม่มี Tracking"}
              />
            </dl>
            <div className="mt-3 flex flex-wrap gap-2">
              <CodVisibilityChip codVisibility={codVisibility} />
              <StatusChip variant="neutral">
                <Truck aria-hidden className="h-3.5 w-3.5" />
                ข้อมูลอ่านอย่างเดียว
              </StatusChip>
            </div>
          </SurfaceCard>

          <SurfaceCard padding="md">
            <h2 className="text-base font-extrabold text-foreground">
              หลักฐานจัดส่ง
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {Array.from({ length: evidencePhotoCount }).map((_, index) => (
                <div
                  className="grid aspect-square place-items-center rounded-md border border-[#BFE5C9] bg-[#E6F4EA] text-center text-xs font-bold leading-5 text-[#166534]"
                  key={`${shipment.id}-detail-evidence-${index}`}
                >
                  รูปหลักฐานจัดส่ง
                  <br />
                  ลำดับ {index + 1}
                </div>
              ))}
              {evidencePhotoCount === 0 ? (
                <div className="grid aspect-square place-items-center rounded-md border border-dashed border-border bg-subtle p-2 text-center text-xs font-bold leading-5 text-muted-foreground">
                  ยังไม่มีรูป
                </div>
              ) : null}
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold leading-6 text-muted-foreground">
              <Camera aria-hidden className="h-4 w-4" />
              รูปหลักฐานจัดส่งใช้ประกอบการปิดรอบ ไม่ใช่หลักฐานชำระเงิน
            </p>
            {deliveryNote ? (
              <p className="mt-3 rounded-md border border-border bg-subtle p-3 text-sm font-semibold leading-6 text-muted-foreground">
                หมายเหตุจัดส่ง: {deliveryNote}
              </p>
            ) : null}
            {canAddDeliveryEvidence ? (
              <div className="mt-3 grid gap-2">
                <Button
                  onClick={() => {
                    setEvidencePhotoCount((count) => count + 1);
                    setMessage("เพิ่มรูปหลักฐานจัดส่งแล้ว");
                  }}
                  type="button"
                  variant="outline"
                >
                  <Camera aria-hidden className="mr-2 h-4 w-4" />
                  เพิ่มรูปหลักฐานจัดส่ง (ถ้ามี)
                </Button>
                <Button
                  onClick={() => {
                    setDeliveryNote((current) =>
                      current.includes("เพิ่มหมายเหตุจากรอบจัดส่ง")
                        ? current
                        : `${current} / เพิ่มหมายเหตุจากรอบจัดส่ง`.replace(
                            /^ \/ /,
                            "",
                          ),
                    );
                    setMessage("เพิ่มหมายเหตุจัดส่งแล้ว");
                  }}
                  type="button"
                  variant="outline"
                >
                  เพิ่มหมายเหตุ
                </Button>
              </div>
            ) : null}
          </SurfaceCard>
        </aside>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold leading-6 text-foreground">{value}</dd>
    </div>
  );
}
