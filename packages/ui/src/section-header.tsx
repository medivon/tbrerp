import * as React from "react";

import { cn } from "./utils";

export interface SectionHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  action?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  titleId?: string;
}

export function SectionHeader({
  action,
  className,
  description,
  eyebrow,
  title,
  titleId,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start justify-between gap-3",
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
        <h2
          className="text-lg font-bold leading-7 text-foreground"
          id={titleId}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-3xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
