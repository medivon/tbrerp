import * as React from "react";

import { StatusChip, type StatusChipProps } from "./status-chip";
import { SurfaceCard } from "./surface-card";
import { cn } from "./utils";

type QueueLauncherTone = NonNullable<StatusChipProps["variant"]>;

const queueLauncherToneStyles = {
  action: {
    accent: "bg-[#2563EB]",
    footer: "text-[#1D4ED8]",
    icon: "bg-[#E0ECFF] text-[#1D4ED8]",
    ring: "ring-[#B9D1FF]",
  },
  danger: {
    accent: "bg-[#B42318]",
    footer: "text-[#9F1239]",
    icon: "bg-[#FEE4E2] text-[#9F1239]",
    ring: "ring-[#FDB8B3]",
  },
  neutral: {
    accent: "bg-primary",
    footer: "text-primary",
    icon: "bg-primary-soft text-primary",
    ring: "ring-border",
  },
  revision: {
    accent: "bg-[#6D5BD0]",
    footer: "text-[#5B21B6]",
    icon: "bg-[#ECE9FE] text-[#5B21B6]",
    ring: "ring-[#D9D3FD]",
  },
  success: {
    accent: "bg-[#15803D]",
    footer: "text-[#166534]",
    icon: "bg-[#E6F4EA] text-[#166534]",
    ring: "ring-[#BFE5C9]",
  },
  warning: {
    accent: "bg-[#B45309]",
    footer: "text-[#92400E]",
    icon: "bg-[#FEF3C7] text-[#92400E]",
    ring: "ring-[#FAD980]",
  },
} satisfies Record<
  QueueLauncherTone,
  { accent: string; footer: string; icon: string; ring: string }
>;

export interface QueueLauncherCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  actionIcon?: React.ReactNode;
  actionLabel: React.ReactNode;
  count: React.ReactNode;
  icon?: React.ReactNode;
  statusLabel: React.ReactNode;
  statusVariant?: StatusChipProps["variant"];
  subtext?: React.ReactNode;
  title: React.ReactNode;
  unit?: React.ReactNode;
}

export function QueueLauncherCard({
  actionIcon,
  actionLabel,
  className,
  count,
  icon,
  statusLabel,
  statusVariant = "neutral",
  subtext,
  title,
  unit,
  ...props
}: QueueLauncherCardProps) {
  const tone = queueLauncherToneStyles[statusVariant ?? "neutral"];

  return (
    <SurfaceCard
      className={cn("relative grid min-h-[204px] overflow-hidden", className)}
      interactive
      padding="md"
      {...props}
    >
      <span
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-1", tone.accent)}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-2">
          <p className="text-sm font-bold text-foreground group-hover:text-primary">
            {title}
          </p>
          <div className="flex items-end gap-2">
            <span className="font-mono text-[44px] font-bold leading-none text-foreground">
              {count}
            </span>
            {unit ? (
              <span className="pb-1 text-xs font-semibold text-muted-foreground">
                {unit}
              </span>
            ) : null}
          </div>
        </div>
        {icon ? (
          <span
            className={cn(
              "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1",
              tone.icon,
              tone.ring,
            )}
          >
            {icon}
          </span>
        ) : null}
      </div>

      <div className="grid gap-2">
        <StatusChip variant={statusVariant}>{statusLabel}</StatusChip>
        {subtext ? (
          <p className="min-h-5 text-sm font-semibold text-muted-foreground">
            {subtext}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "mt-auto flex items-center justify-between border-t border-border pt-3 text-sm font-bold",
          tone.footer,
        )}
      >
        <span>{actionLabel}</span>
        {actionIcon}
      </div>
    </SurfaceCard>
  );
}
