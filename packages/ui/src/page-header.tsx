import * as React from "react";

import { cn } from "./utils";

export interface PageHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  actions?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  meta?: React.ReactNode;
  title: React.ReactNode;
}

export function PageHeader({
  actions,
  className,
  description,
  eyebrow,
  meta,
  title,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-start justify-between gap-4",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-extrabold leading-tight text-foreground sm:text-[28px]">
            {title}
          </h1>
          {meta}
        </div>
        {description ? (
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
