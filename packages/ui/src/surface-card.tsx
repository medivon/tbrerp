import * as React from "react";

import { cn } from "./utils";

export type SurfaceCardProps = React.HTMLAttributes<HTMLDivElement>;

export function SurfaceCard({ className, ...props }: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
