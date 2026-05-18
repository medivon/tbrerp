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
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[264px] border-r border-shell-border bg-shell text-shell-foreground shadow-shell lg:block">
        <div className="flex h-[76px] items-center border-b border-shell-border px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/15 text-sm font-extrabold text-accent">
              TB
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-extrabold leading-none text-shell-foreground">
                THAIBORAN ERP
              </p>
              <p className="mt-1 truncate text-xs font-semibold text-shell-muted">
                โหมดเริ่มใช้งานจริง
              </p>
            </div>
          </div>
        </div>

        {visibleNavigation.length > 0 ? (
          <nav aria-label="เมนูหลัก" className="space-y-1.5 px-3 py-4">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeItemId;

              return (
                <Link
                  className={cn(
                    "relative flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm font-semibold text-shell-muted transition duration-200 hover:bg-white/10 hover:text-shell-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                    isActive &&
                      "bg-white/15 text-shell-foreground before:absolute before:left-0 before:top-2 before:h-7 before:w-1 before:rounded-r-full before:bg-accent",
                  )}
                  href={getNavigationHref(item, currentUser)}
                  key={item.id}
                >
                  <Icon
                    aria-hidden
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive ? "text-accent" : "text-shell-muted",
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        ) : null}
      </aside>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-10 border-b border-shell-border bg-shell text-shell-foreground shadow-shell">
          <div className="flex min-h-[76px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-6">
            <div className="flex min-w-0 items-center gap-3">
              {visibleNavigation.length > 0 ? (
                <details className="group relative lg:hidden">
                  <summary
                    aria-label="เมนู"
                    className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-shell-border bg-shell-surface text-shell-muted transition hover:border-accent/50 hover:text-shell-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 [&::-webkit-details-marker]:hidden"
                  >
                    <Menu aria-hidden className="h-5 w-5" />
                  </summary>
                  <nav
                    aria-label="เมนูหลักขนาดเล็ก"
                    className="absolute left-0 top-12 z-30 grid w-[min(20rem,calc(100vw-2rem))] gap-1 rounded-lg border border-shell-border bg-shell p-2 shadow-shell"
                  >
                    {visibleNavigation.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.id === activeItemId;

                      return (
                        <Link
                          className={cn(
                            "relative flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm font-semibold text-shell-muted transition duration-200 hover:bg-white/10 hover:text-shell-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                            isActive &&
                              "bg-white/15 text-shell-foreground before:absolute before:left-0 before:top-2 before:h-7 before:w-1 before:rounded-r-full before:bg-accent",
                          )}
                          href={getNavigationHref(item, currentUser)}
                          key={item.id}
                        >
                          <Icon
                            aria-hidden
                            className={cn(
                              "h-5 w-5 shrink-0",
                              isActive ? "text-accent" : "text-shell-muted",
                            )}
                          />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </details>
              ) : null}
              <div className="min-w-0">
                <h1 className="text-xl font-extrabold leading-tight text-shell-foreground sm:text-2xl">
                  {title}
                </h1>
                <p className="mt-1 text-xs font-semibold text-shell-muted">
                  {formatThaiDate(new Date())}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
              <UserSelector currentUser={currentUser} tone="dark" />
              <div className="flex min-w-0 items-center gap-3 rounded-lg border border-shell-border bg-shell-surface px-3 py-2 shadow-soft">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-shell">
                  {currentUser.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-shell-foreground">
                    {currentUser.displayName}
                  </p>
                  <p className="truncate text-xs font-semibold text-shell-muted">
                    {currentUser.roleLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-5 lg:px-6 lg:py-6">{children}</main>
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
