import Link from "next/link";
import type { ReactNode } from "react";
import { Menu } from "lucide-react";

import type { FixtureUser } from "@/shared/fixtures/users";
import {
  getNavigationHref,
  getVisibleNavigation,
  type NavigationItemId,
} from "@/shared/navigation/navigation";
import { cn } from "@/lib/utils";

import { UserSelector } from "./user-selector";

type AppShellProps = {
  activeItemId?: NavigationItemId;
  children: ReactNode;
  currentUser: FixtureUser;
  title: string;
};

export function AppShell({
  activeItemId,
  children,
  currentUser,
  title,
}: AppShellProps) {
  const visibleNavigation = getVisibleNavigation(currentUser);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[256px] border-r border-border bg-surface lg:block">
        <div className="flex h-16 items-center border-b border-border px-5">
          <div>
            <p className="text-base font-bold leading-none text-foreground">
              THAIBORAN ERP
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              โหมดเริ่มใช้งานจริง
            </p>
          </div>
        </div>

        {visibleNavigation.length > 0 ? (
          <nav aria-label="เมนูหลัก" className="space-y-1 px-3 py-4">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeItemId;

              return (
                <Link
                  className={cn(
                    "relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-subtle hover:text-foreground",
                    isActive &&
                      "bg-primary-soft text-primary before:absolute before:left-0 before:top-2 before:h-7 before:w-1 before:rounded-r-full before:bg-primary",
                  )}
                  href={getNavigationHref(item, currentUser)}
                  key={item.id}
                >
                  <Icon aria-hidden className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        ) : null}
      </aside>

      <div className="lg:pl-[256px]">
        <header className="sticky top-0 z-10 border-b border-border bg-surface">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              {visibleNavigation.length > 0 ? (
                <details className="group relative lg:hidden">
                  <summary
                    aria-label="เมนู"
                    className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition hover:bg-subtle hover:text-foreground [&::-webkit-details-marker]:hidden"
                  >
                    <Menu aria-hidden className="h-5 w-5" />
                  </summary>
                  <nav
                    aria-label="เมนูหลักขนาดเล็ก"
                    className="absolute left-0 top-12 z-30 grid w-[min(20rem,calc(100vw-2rem))] gap-1 rounded-lg border border-border bg-surface p-2 shadow-soft"
                  >
                    {visibleNavigation.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.id === activeItemId;

                      return (
                        <Link
                          className={cn(
                            "relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition hover:bg-subtle hover:text-foreground",
                            isActive &&
                              "bg-primary-soft text-primary before:absolute before:left-0 before:top-2 before:h-7 before:w-1 before:rounded-r-full before:bg-primary",
                          )}
                          href={getNavigationHref(item, currentUser)}
                          key={item.id}
                        >
                          <Icon aria-hidden className="h-5 w-5 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </details>
              ) : null}
              <div className="min-w-0">
                <h1 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">
                  {title}
                </h1>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {formatThaiDate(new Date())}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
              <UserSelector currentUser={currentUser} />
              <div className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  {currentUser.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">
                    {currentUser.displayName}
                  </p>
                  <p className="truncate text-xs font-medium text-muted-foreground">
                    {currentUser.roleLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-5 lg:px-6">{children}</main>
      </div>
    </div>
  );
}

function formatThaiDate(date: Date): string {
  return new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(date);
}
