import type { FixtureUser } from "@/shared/fixtures/users";
import { withUserParam } from "@/shared/permissions/access";

export type ShipmentWorkspaceTab =
  | "ready"
  | "today"
  | "waiting"
  | "confirmation"
  | "history";

export const shipmentRoutes = {
  ready: "/modules/shipments",
  delivery: "/modules/shipments/delivery",
  released: "/modules/shipments/released",
  confirmation: "/modules/shipments/confirmation",
  history: "/modules/shipments/history",
  builder(orderId: string) {
    return `/modules/shipments/builder/${encodeURIComponent(orderId)}`;
  },
  detail(shipmentId: string) {
    return `/modules/shipments/${encodeURIComponent(shipmentId)}`;
  },
  deliveryNote(shipmentId: string) {
    return `/modules/shipments/delivery-note/${encodeURIComponent(shipmentId)}`;
  },
  shippingSheet(shipmentId: string) {
    return `/modules/shipments/shipping-sheet/${encodeURIComponent(shipmentId)}`;
  },
};

export const shipmentWorkspaceTabs: Array<{
  href: string;
  id: ShipmentWorkspaceTab;
  label: string;
}> = [
  {
    href: shipmentRoutes.ready,
    id: "ready",
    label: "รอสร้างรอบจัดส่ง",
  },
  {
    href: shipmentRoutes.delivery,
    id: "today",
    label: "รายการต้องจัดส่งวันนี้",
  },
  {
    href: `${shipmentRoutes.delivery}?tab=waiting`,
    id: "waiting",
    label: "รายการรอวันจัดส่ง",
  },
  {
    href: shipmentRoutes.confirmation,
    id: "confirmation",
    label: "ยืนยันการจัดส่ง",
  },
  {
    href: shipmentRoutes.history,
    id: "history",
    label: "ประวัติรอบจัดส่ง",
  },
];

export function shipmentHref(path: string, currentUser: FixtureUser): string {
  return withUserParam(path, currentUser.id);
}
