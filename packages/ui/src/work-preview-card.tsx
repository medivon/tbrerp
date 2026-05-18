import * as React from "react";

import { StatusChip, type StatusChipProps } from "./status-chip";
import { SurfaceCard } from "./surface-card";
import { cn } from "./utils";

export type WorkPreviewCardChip = {
  label: React.ReactNode;
  variant?: StatusChipProps["variant"];
};

export type WorkPreviewCardMeta = {
  emphasis?: boolean;
  label?: React.ReactNode;
  value: React.ReactNode;
};

export interface WorkPreviewCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  chips?: WorkPreviewCardChip[];
  footerLabel?: React.ReactNode;
  footerValue?: React.ReactNode;
  media?: React.ReactNode;
  metadata?: WorkPreviewCardMeta[];
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}

export function WorkPreviewCard({
  chips = [],
  className,
  footerLabel,
  footerValue,
  media,
  metadata = [],
  subtitle,
  title,
  ...props
}: WorkPreviewCardProps) {
  return (
    <SurfaceCard
      className={cn("grid h-full overflow-hidden p-2", className)}
      interactive
      {...props}
    >
      {media ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-subtle">
          {media}
        </div>
      ) : null}

      <div className="grid gap-3 p-3">
        <div>
          <p className="text-base font-bold leading-7 text-foreground group-hover:text-primary">
            {title}
          </p>
          {subtitle ? (
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>

        {metadata.length > 0 ? (
          <div className="grid gap-1 text-sm text-muted-foreground">
            {metadata.map((item, index) => (
              <p
                className={cn(item.emphasis && "font-semibold text-foreground")}
                key={index}
              >
                {item.label ? (
                  <span className="font-medium">{item.label} </span>
                ) : null}
                {item.value}
              </p>
            ))}
          </div>
        ) : null}

        {chips.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <StatusChip key={index} variant={chip.variant}>
                {chip.label}
              </StatusChip>
            ))}
          </div>
        ) : null}

        {footerLabel || footerValue ? (
          <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md bg-subtle px-3 py-2 text-sm">
            {footerLabel ? (
              <span className="font-semibold text-muted-foreground">
                {footerLabel}
              </span>
            ) : null}
            {footerValue ? (
              <span className="text-right font-semibold text-foreground">
                {footerValue}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </SurfaceCard>
  );
}
