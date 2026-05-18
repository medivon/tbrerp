import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

export const statusChipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        action: "bg-[#E0ECFF] text-[#1D4ED8]",
        danger: "bg-[#FEE4E2] text-[#9F1239]",
        neutral: "bg-subtle text-[#40504A]",
        revision: "bg-[#ECE9FE] text-[#5B21B6]",
        success: "bg-[#E6F4EA] text-[#166534]",
        warning: "bg-[#FEF3C7] text-[#92400E]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface StatusChipProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusChipVariants> {}

export function StatusChip({ className, variant, ...props }: StatusChipProps) {
  return (
    <span
      className={cn(statusChipVariants({ className, variant }))}
      {...props}
    />
  );
}
