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
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <p className="mb-1 break-words text-xs font-bold uppercase text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className="break-words [overflow-wrap:anywhere] text-lg font-bold leading-7 text-foreground"
          id={titleId}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-3xl break-words [overflow-wrap:anywhere] text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="flex w-full min-w-0 justify-start sm:w-auto sm:shrink-0 sm:justify-end">
          {action}
        </div>
      ) : null}
    </div>
  );
}
