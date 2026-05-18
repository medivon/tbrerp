import * as React from "react";

import { SurfaceCard } from "./surface-card";
import { cn } from "./utils";

export interface ToolbarShellProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  leading?: React.ReactNode;
}

export function ToolbarShell({
  actions,
  children,
  className,
  filters,
  leading,
  ...props
}: ToolbarShellProps) {
  return (
    <SurfaceCard
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className,
      )}
      padding="sm"
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {leading}
        {children}
        {filters}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </SurfaceCard>
  );
}
