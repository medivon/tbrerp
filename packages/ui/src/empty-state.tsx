import * as React from "react";

import { SurfaceCard } from "./surface-card";
import { cn } from "./utils";

export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  action?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
}

export function EmptyState({
  action,
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <SurfaceCard
      className={cn("grid place-items-center gap-4 text-center", className)}
      padding="lg"
      {...props}
    >
      {icon ? (
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-subtle text-primary">
          {icon}
        </span>
      ) : null}
      <div>
        <p className="text-lg font-bold text-foreground">{title}</p>
        {description ? (
          <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </SurfaceCard>
  );
}
