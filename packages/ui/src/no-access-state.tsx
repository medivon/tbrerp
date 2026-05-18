import * as React from "react";

import { SurfaceCard } from "./surface-card";
import { cn } from "./utils";

export interface NoAccessStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  action: React.ReactNode;
  description?: React.ReactNode;
  title?: React.ReactNode;
}

export function NoAccessState({
  action,
  className,
  description = "หน้านี้ไม่แสดงข้อมูลหรือรายการที่ผู้ใช้งานไม่มีสิทธิ์ดู",
  title = "ไม่มีสิทธิ์เข้าถึงหน้านี้",
  ...props
}: NoAccessStateProps) {
  return (
    <SurfaceCard
      className={cn("grid gap-4", className)}
      padding="lg"
      {...props}
    >
      <div>
        <p className="text-2xl font-bold text-foreground">{title}</p>
        {description ? (
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">{action}</div>
    </SurfaceCard>
  );
}
