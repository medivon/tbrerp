import {
  Boxes,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  PackageCheck,
  Settings,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { FixtureUser } from "@/shared/fixtures/users";
import {
  canAccessMainNavigation,
  withUserParam,
} from "@/shared/permissions/access";

export type NavigationItemId =
  | "dashboard"
  | "orders"
  | "jobs"
  | "shipments"
  | "stock"
  | "customers"
  | "expenses"
  | "settings";

export type NavigationItem = {
  id: NavigationItemId;
  label: string;
  path: string;
  icon: LucideIcon;
  implemented: boolean;
};

const mainNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "แดชบอร์ด",
    path: "/dashboard",
    icon: LayoutDashboard,
    implemented: true,
  },
  {
    id: "orders",
    label: "ออเดอร์",
    path: "/modules/orders",
    icon: ClipboardList,
    implemented: true,
  },
  {
    id: "jobs",
    label: "งานสั่งทำ / ผลิต",
    path: "/modules/jobs",
    icon: Boxes,
    implemented: true,
  },
  {
    id: "shipments",
    label: "รอบจัดส่ง",
    path: "/modules/shipments",
    icon: Truck,
    implemented: true,
  },
  {
    id: "stock",
    label: "สินค้า / สต๊อก",
    path: "/modules/stock",
    icon: PackageCheck,
    implemented: false,
  },
  {
    id: "customers",
    label: "ลูกค้า / CRM",
    path: "/modules/customers",
    icon: Users,
    implemented: false,
  },
  {
    id: "expenses",
    label: "รายจ่าย",
    path: "/modules/expenses",
    icon: CreditCard,
    implemented: false,
  },
  {
    id: "settings",
    label: "ตั้งค่า",
    path: "/modules/settings",
    icon: Settings,
    implemented: false,
  },
];

export const modulePlaceholders = new Map(
  mainNavigation
    .filter((item) => !item.implemented)
    .map((item) => [item.id, item]),
);

export function getVisibleNavigation(user: FixtureUser): NavigationItem[] {
  if (!canAccessMainNavigation(user)) {
    return [];
  }

  return mainNavigation.filter((item) => {
    if (user.id === "delivery-team") {
      return item.id === "shipments";
    }

    if (item.id === "settings") {
      return user.id === "owner";
    }

    return true;
  });
}

export function getNavigationHref(
  item: NavigationItem,
  user: FixtureUser,
): string {
  return withUserParam(item.path, user.id);
}

export function getDashboardCardDestination(
  destination: NavigationItemId,
  user: FixtureUser,
): string {
  const item = mainNavigation.find(
    (navigationItem) => navigationItem.id === destination,
  );

  return withUserParam(item?.path ?? "/dashboard", user.id);
}

export function getNavigationLabel(id: NavigationItemId): string {
  return mainNavigation.find((item) => item.id === id)?.label ?? "แดชบอร์ด";
}
