import Link from "next/link";

import {
  jobHref,
  jobWorkspaceTabs,
  type JobWorkspaceTab,
} from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";
import { cn } from "@/lib/utils";

export function JobTabs({
  activeTab,
  currentUser,
}: {
  activeTab: JobWorkspaceTab;
  currentUser: FixtureUser;
}) {
  return (
    <nav
      aria-label="เมนูงานสั่งทำ / ผลิต"
      className="flex flex-wrap gap-2 rounded-lg border border-border bg-surface p-2 shadow-soft"
    >
      {jobWorkspaceTabs.map((tab) => (
        <Link
          className={cn(
            "inline-flex min-h-10 cursor-pointer items-center rounded-md px-3 text-sm font-bold transition hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            activeTab === tab.id
              ? "bg-primary-soft text-primary"
              : "text-muted-foreground",
          )}
          href={jobHref(tab.href, currentUser)}
          key={tab.id}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
