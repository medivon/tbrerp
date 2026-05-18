import { StatusChip, type StatusChipProps } from "@thaiboran/ui";

import type {
  DraftOrderStatus,
  OrderStatus,
  ShipmentSummaryKind,
} from "@/features/orders/fixtures/orders";

const orderStatusVariant: Record<OrderStatus, StatusChipProps["variant"]> = {
  กำลังดำเนินการ: "action",
  กำลังผลิต: "revision",
  พร้อมสร้างรอบจัดส่ง: "success",
  ส่งบางส่วน: "action",
  จัดส่งครบแล้ว: "success",
  ยกเลิก: "danger",
};

const shipmentVariant: Record<ShipmentSummaryKind, StatusChipProps["variant"]> =
  {
    delivered: "success",
    none: "danger",
    partial: "warning",
    "round-without-tracking": "action",
    tracked: "success",
    "waiting-confirmation": "warning",
  };

const draftVariant: Record<DraftOrderStatus, StatusChipProps["variant"]> = {
  ข้อมูลยังไม่ครบ: "warning",
  พร้อมตรวจสอบ: "success",
  ร่างออเดอร์: "neutral",
};

export function OrderStatusChip({ status }: { status: OrderStatus }) {
  return (
    <StatusChip size="sm" variant={orderStatusVariant[status]}>
      {status}
    </StatusChip>
  );
}

export function ShipmentStatusChip({
  kind,
  label,
}: {
  kind: ShipmentSummaryKind;
  label: string;
}) {
  return (
    <StatusChip size="sm" variant={shipmentVariant[kind]}>
      {label}
    </StatusChip>
  );
}

export function DraftStatusChip({ status }: { status: DraftOrderStatus }) {
  return (
    <StatusChip size="sm" variant={draftVariant[status]}>
      {status}
    </StatusChip>
  );
}
