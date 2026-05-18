import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

export const statusChipVariants = cva(
  "inline-flex w-fit max-w-full items-center gap-1 whitespace-normal break-words rounded-full border text-left font-semibold leading-snug",
  {
    variants: {
      size: {
        md: "min-h-7 px-3 py-1.5 text-sm",
        sm: "min-h-6 px-2.5 py-1 text-xs",
      },
      variant: {
        action: "border-[#B9D1FF] bg-[#E0ECFF] text-[#1D4ED8]",
        danger: "border-[#FDB8B3] bg-[#FEE4E2] text-[#9F1239]",
        neutral: "border-border bg-subtle text-[#40504A]",
        revision: "border-[#D9D3FD] bg-[#ECE9FE] text-[#5B21B6]",
        success: "border-[#BFE5C9] bg-[#E6F4EA] text-[#166534]",
        warning: "border-[#FAD980] bg-[#FEF3C7] text-[#92400E]",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "neutral",
    },
  },
);

export interface StatusChipProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusChipVariants> {}

export function StatusChip({
  className,
  size,
  variant,
  ...props
}: StatusChipProps) {
  return (
    <span
      className={cn(statusChipVariants({ className, size, variant }))}
      {...props}
    />
  );
}
