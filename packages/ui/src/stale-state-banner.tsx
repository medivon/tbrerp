import * as React from "react";

import { cn } from "./utils";

export interface StaleStateBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
  message?: React.ReactNode;
}

export function StaleStateBanner({
  action,
  className,
  message = "ข้อมูลมีการเปลี่ยนแปลง กรุณารีเฟรช",
  ...props
}: StaleStateBannerProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#FAD980] bg-[#FEF3C7] px-4 py-3 text-sm font-semibold text-[#92400E]",
        className,
      )}
      role="status"
      {...props}
    >
      <span>{message}</span>
      {action}
    </div>
  );
}
