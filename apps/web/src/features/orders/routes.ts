import type { FixtureUser } from "@/shared/fixtures/users";
import { withUserParam } from "@/shared/permissions/access";

export type OrderWorkspaceTab = "follow-up" | "all" | "drafts" | "closed";

export const orderWorkspaceTabs: Array<{
  href: string;
  id: OrderWorkspaceTab;
  label: string;
}> = [
  {
    id: "follow-up",
    label: "ออเดอร์ที่ต้องติดตาม",
    href: "/modules/orders",
  },
  {
    id: "all",
    label: "ออเดอร์ทั้งหมด",
    href: "/modules/orders/all",
  },
  {
    id: "drafts",
    label: "ร่างออเดอร์",
    href: "/modules/orders/drafts",
  },
  {
    id: "closed",
    label: "ปิดแล้ว / ยกเลิก",
    href: "/modules/orders/closed",
  },
];

export const orderRoutes = {
  all: "/modules/orders/all",
  closed: "/modules/orders/closed",
  create: "/modules/orders/create",
  drafts: "/modules/orders/drafts",
  followUp: "/modules/orders",
  review: "/modules/orders/review",
  detail(orderId: string) {
    return `/modules/orders/${encodeURIComponent(orderId)}`;
  },
  lineEdit(orderId: string) {
    return `/modules/orders/${encodeURIComponent(orderId)}/lines/edit`;
  },
};

export function orderHref(path: string, currentUser: FixtureUser): string {
  return withUserParam(path, currentUser.id);
}
