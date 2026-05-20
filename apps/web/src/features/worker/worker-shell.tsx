import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { UserBadge } from "@thaiboran/ui";

import { UserSelector } from "@/shared/app-shell/user-selector";
import type { FixtureUser } from "@/shared/fixtures/users";
import { withUserParam } from "@/shared/permissions/access";

export function WorkerShell({
  activeCount,
  backHref,
  children,
  currentUser,
  title,
}: {
  activeCount?: number;
  backHref?: string;
  children: ReactNode;
  currentUser: FixtureUser;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-shell-border bg-shell text-shell-foreground shadow-shell">
        <div className="mx-auto flex min-h-[72px] w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            {backHref ? (
              <Link
                aria-label="กลับ"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-shell-border bg-shell-surface text-shell-muted transition hover:border-accent/60 hover:text-shell-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                href={withUserParam(backHref, currentUser.id)}
              >
                <ArrowLeft aria-hidden className="h-5 w-5" />
              </Link>
            ) : (
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-shell-border bg-shell-surface text-shell-muted">
                <Menu aria-hidden className="h-5 w-5" />
              </span>
            )}
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold leading-tight text-shell-foreground">
                {title}
              </h1>
              {typeof activeCount === "number" ? (
                <p className="mt-1 text-sm font-semibold text-shell-muted">
                  งานเปิดอยู่ {activeCount} รายการ
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
            <UserSelector currentUser={currentUser} tone="dark" />
            <UserBadge
              displayName={currentUser.displayName}
              initials={currentUser.initials}
              roleLabel={currentUser.roleLabel}
              tone="shell"
            />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-5">
        {children}
      </main>
    </div>
  );
}
