import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

export const surfaceCardVariants = cva(
  "min-w-0 rounded-lg border shadow-soft",
  {
    variants: {
      interactive: {
        false: "",
        true: "transition duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-lifted motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
      },
      padding: {
        lg: "p-6",
        md: "p-4",
        none: "",
        sm: "p-3",
      },
      variant: {
        default: "border-border bg-surface text-foreground",
        inset: "border-border bg-subtle text-foreground shadow-none",
        outline: "border-border bg-transparent text-foreground shadow-none",
        shell:
          "border-shell-border bg-shell-surface text-shell-foreground shadow-shell",
        subtle: "border-border bg-subtle text-foreground",
      },
    },
    defaultVariants: {
      interactive: false,
      padding: "none",
      variant: "default",
    },
  },
);

export interface SurfaceCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceCardVariants> {}

export function SurfaceCard({
  className,
  interactive,
  padding,
  variant,
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        surfaceCardVariants({ className, interactive, padding, variant }),
      )}
      {...props}
    />
  );
}
