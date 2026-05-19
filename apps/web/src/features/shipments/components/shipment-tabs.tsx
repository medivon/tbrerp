import Link from "next/link";

import {
  shipmentHref,
  shipmentWorkspaceTabs,
  type ShipmentWorkspaceTab,
} from "@/features/shipments/routes";
import type { FixtureUser } from "@/shared/fixtures/users";
import {
  canAccessDeliveryDashboard,
  canAccessReadyToShipQueue,
  canAccessShipmentConfirmationQueue,
} from "@/shared/permissions/access";
import { cn } from "@/lib/utils";

export function ShipmentTabs({
  activeTab,
  currentUser,
}: {
  activeTab: ShipmentWorkspaceTab;
  currentUser: FixtureUser;
}) {
  const visibleTabs = shipmentWorkspaceTabs.filter((tab) =>
    canSeeShipmentTab(tab.id, currentUser),
  );

  if (visibleTabs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="เมนูรอบจัดส่ง"
      className="flex flex-wrap gap-2 rounded-lg border border-border bg-surface p-2 shadow-soft"
    >
      {visibleTabs.map((tab) => (
        <Link
          className={cn(
            "inline-flex min-h-10 cursor-pointer items-center rounded-md px-3 text-sm font-bold transition hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            activeTab === tab.id
              ? "bg-primary-soft text-primary"
              : "text-muted-foreground",
          )}
          href={shipmentHref(tab.href, currentUser)}
          key={tab.id}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

function canSeeShipmentTab(
  tabId: ShipmentWorkspaceTab,
  currentUser: FixtureUser,
): boolean {
  if (tabId === "ready" || tabId === "history") {
    return canAccessReadyToShipQueue(currentUser);
  }

  if (tabId === "confirmation") {
    return canAccessShipmentConfirmationQueue(currentUser);
  }

  return canAccessDeliveryDashboard(currentUser);
}
