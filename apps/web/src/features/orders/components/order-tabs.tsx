import Link from "next/link";

import type { FixtureUser } from "@/shared/fixtures/users";
import {
  orderHref,
  orderWorkspaceTabs,
  type OrderWorkspaceTab,
} from "@/features/orders/routes";
import { cn } from "@/lib/utils";

export function OrderTabs({
  activeTab,
  currentUser,
}: {
  activeTab: OrderWorkspaceTab;
  currentUser: FixtureUser;
}) {
  return (
    <nav
      aria-label="หมวดออเดอร์"
      className="flex gap-2 overflow-x-auto rounded-lg border border-border bg-surface p-1 shadow-soft"
    >
      {orderWorkspaceTabs.map((tab) => {
        const active = tab.id === activeTab;

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex min-h-10 shrink-0 cursor-pointer items-center rounded-md px-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none",
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-subtle hover:text-foreground",
            )}
            href={orderHref(tab.href, currentUser)}
            key={tab.id}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
