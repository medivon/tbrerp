import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Lock } from "lucide-react";
import { Button, StatusChip } from "@thaiboran/ui";

import type { OrderLineFixture } from "@/features/orders/fixtures/orders";

export function OrderLineCard({
  actionHref,
  line,
  showEditState = false,
}: {
  actionHref?: string;
  line: OrderLineFixture;
  showEditState?: boolean;
}) {
  return (
    <article className="grid min-w-0 gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[76px_minmax(0,1fr)_auto] md:items-start">
      <div className="relative h-20 w-20 overflow-hidden rounded-md border border-border bg-subtle md:h-[76px] md:w-[76px]">
        <Image
          alt={line.imageAlt}
          className="object-cover"
          fill
          sizes="76px"
          src={line.imageSrc}
        />
      </div>

      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip
            variant={line.type === "custom-work" ? "revision" : "action"}
          >
            {line.type === "custom-work" ? "งานสั่งทำ" : "สินค้าพร้อมส่ง"}
          </StatusChip>
          <StatusChip variant={line.readyForShipment ? "success" : "neutral"}>
            {line.shipmentState}
          </StatusChip>
          {line.stockWarning ? (
            <StatusChip variant="warning">{line.stockWarning}</StatusChip>
          ) : null}
        </div>

        <div>
          <h3 className="break-words [overflow-wrap:anywhere] text-base font-bold leading-7 text-foreground">
            {line.title}
          </h3>
          <p className="mt-1 break-words [overflow-wrap:anywhere] text-sm leading-6 text-muted-foreground">
            {line.quantity} ชิ้น
            {line.color ? ` • ${line.color}` : ""}
            {line.dimensions ? ` • ${line.dimensions}` : ""}
            {line.skuCode ? ` • ${line.skuCode}` : ""}
          </p>
        </div>

        {line.customDetail ? (
          <p className="min-w-0 break-words [overflow-wrap:anywhere] rounded-md bg-subtle px-3 py-2 text-sm leading-6 text-foreground">
            {line.customDetail}
          </p>
        ) : null}

        {line.job ? (
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <StatusChip variant="revision">{line.job.id}</StatusChip>
            <span className="break-words [overflow-wrap:anywhere]">
              {line.job.status}
            </span>
            <span className="break-words [overflow-wrap:anywhere]">
              {line.job.currentDepartment}
            </span>
            {line.deliveryDate ? (
              <span className="break-words [overflow-wrap:anywhere]">
                กำหนดส่ง {line.deliveryDate}
              </span>
            ) : null}
          </div>
        ) : null}

        {showEditState && line.editBlockedReason ? (
          <p className="inline-flex min-w-0 items-start gap-2 rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E]">
            <Lock aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0 break-words [overflow-wrap:anywhere]">
              {line.editBlockedReason}
            </span>
          </p>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-wrap gap-2 md:justify-end">
        {line.job && actionHref ? (
          <Button asChild size="sm" variant="outline">
            <Link href={actionHref}>
              เปิด Job
              <ExternalLink aria-hidden className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </article>
  );
}
