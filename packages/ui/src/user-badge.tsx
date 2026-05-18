import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const userBadgeVariants = cva(
  "flex min-w-0 items-center gap-3 rounded-lg border px-3 py-2 shadow-soft",
  {
    variants: {
      tone: {
        shell: "border-shell-border bg-shell-surface text-shell-foreground",
        surface: "border-border bg-surface text-foreground",
      },
    },
    defaultVariants: {
      tone: "surface",
    },
  },
);

export interface UserBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userBadgeVariants> {
  displayName: React.ReactNode;
  initials: React.ReactNode;
  roleLabel?: React.ReactNode;
}

export function UserBadge({
  className,
  displayName,
  initials,
  roleLabel,
  tone,
  ...props
}: UserBadgeProps) {
  const isShell = tone === "shell";

  return (
    <div className={cn(userBadgeVariants({ className, tone }))} {...props}>
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
          isShell ? "bg-accent text-shell" : "bg-primary-soft text-primary",
        )}
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "truncate text-sm font-bold",
            isShell ? "text-shell-foreground" : "text-foreground",
          )}
        >
          {displayName}
        </p>
        {roleLabel ? (
          <p
            className={cn(
              "truncate text-xs font-semibold",
              isShell ? "text-shell-muted" : "text-muted-foreground",
            )}
          >
            {roleLabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
