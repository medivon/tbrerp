import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

export const roleBadgeVariants = cva(
  "inline-flex min-h-7 max-w-full items-center rounded-full border px-3 py-1 text-xs font-bold",
  {
    variants: {
      tone: {
        shell: "border-shell-border bg-shell-surface text-shell-muted",
        surface: "border-border bg-subtle text-muted-foreground",
      },
    },
    defaultVariants: {
      tone: "surface",
    },
  },
);

export interface RoleBadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof roleBadgeVariants> {}

export function RoleBadge({ className, tone, ...props }: RoleBadgeProps) {
  return (
    <span className={cn(roleBadgeVariants({ className, tone }))} {...props} />
  );
}
