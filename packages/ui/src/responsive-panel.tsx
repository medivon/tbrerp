import * as React from "react";

import { SurfaceCard } from "./surface-card";
import { cn } from "./utils";

export interface ResponsivePanelProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  description?: React.ReactNode;
  footer?: React.ReactNode;
  title?: React.ReactNode;
}

export function ResponsivePanel({
  children,
  className,
  description,
  footer,
  title,
  ...props
}: ResponsivePanelProps) {
  return (
    <SurfaceCard
      className={cn(
        "grid max-h-none w-full gap-4 overflow-hidden sm:max-h-[calc(100vh-8rem)]",
        className,
      )}
      padding="md"
      {...props}
    >
      {title || description ? (
        <div className="border-b border-border pb-3">
          {title ? (
            <p className="text-base font-bold text-foreground">{title}</p>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="min-h-0 overflow-y-auto">{children}</div>
      {footer ? (
        <div className="border-t border-border pt-3">{footer}</div>
      ) : null}
    </SurfaceCard>
  );
}
