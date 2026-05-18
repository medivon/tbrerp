import * as React from "react";

import { StatusChip, type StatusChipProps } from "./status-chip";
import { SurfaceCard } from "./surface-card";
import { cn } from "./utils";

export interface MetricCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  description?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  statusLabel?: React.ReactNode;
  statusVariant?: StatusChipProps["variant"];
  title: React.ReactNode;
  unit?: React.ReactNode;
  value: React.ReactNode;
}

export function MetricCard({
  className,
  description,
  footer,
  icon,
  statusLabel,
  statusVariant = "neutral",
  title,
  unit,
  value,
  ...props
}: MetricCardProps) {
  return (
    <SurfaceCard
      className={cn("grid min-h-36 gap-3", className)}
      padding="md"
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">{title}</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-mono text-4xl font-bold leading-none text-foreground">
              {value}
            </span>
            {unit ? (
              <span className="pb-1 text-xs font-semibold text-muted-foreground">
                {unit}
              </span>
            ) : null}
          </div>
        </div>
        {icon ? (
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-subtle text-primary">
            {icon}
          </span>
        ) : null}
      </div>

      {statusLabel || description ? (
        <div className="grid gap-2">
          {statusLabel ? (
            <StatusChip variant={statusVariant}>{statusLabel}</StatusChip>
          ) : null}
          {description ? (
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {footer ? (
        <div className="mt-auto border-t border-border pt-3 text-sm font-semibold text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </SurfaceCard>
  );
}
