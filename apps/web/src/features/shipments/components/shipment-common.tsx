import Image from "next/image";
import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { StatusChip } from "@thaiboran/ui";
import type { ShipmentCodVisibility } from "@thaiboran/domain";

import {
  formatBaht,
  getSourceLabel,
  getSourceVariant,
  type ShipmentItemFixture,
} from "@/features/shipments/fixtures/shipments";

export function SourceChip({ item }: { item: ShipmentItemFixture }) {
  return (
    <StatusChip variant={getSourceVariant(item.source)}>
      {getSourceLabel(item.source)}
    </StatusChip>
  );
}

export function CodVisibilityChip({
  codVisibility,
}: {
  codVisibility: ShipmentCodVisibility;
}) {
  if (codVisibility.kind === "visible") {
    return (
      <StatusChip variant="danger">
        COD {formatBaht(codVisibility.amountBaht)}
      </StatusChip>
    );
  }

  if (codVisibility.kind === "disabled") {
    return (
      <StatusChip title={codVisibility.reason} variant="warning">
        <Lock aria-hidden className="h-3.5 w-3.5" />
        {codVisibility.reason}
      </StatusChip>
    );
  }

  return null;
}

export function ShipmentItemThumb({ item }: { item: ShipmentItemFixture }) {
  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-md border border-border bg-subtle">
      <Image
        alt={item.imageAlt}
        className="object-cover"
        fill
        sizes="56px"
        src={item.imageSrc}
      />
    </div>
  );
}

export function ShipmentThumbnailStrip({
  items,
}: {
  items: ShipmentItemFixture[];
}) {
  return (
    <div className="flex -space-x-2">
      {items.slice(0, 3).map((item) => (
        <div
          className="relative h-11 w-11 overflow-hidden rounded-md border-2 border-surface bg-subtle shadow-soft"
          key={`${item.title}-${item.imageSrc}`}
        >
          <Image
            alt={item.imageAlt}
            className="object-cover"
            fill
            sizes="44px"
            src={item.imageSrc}
          />
        </div>
      ))}
      {items.length > 3 ? (
        <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-md border-2 border-surface bg-subtle px-2 text-xs font-extrabold text-muted-foreground">
          +{items.length - 3}
        </span>
      ) : null}
    </div>
  );
}

export function FilterChip({ children }: { children: ReactNode }) {
  return (
    <button
      className="min-h-9 cursor-pointer rounded-full border border-border bg-surface px-3 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      type="button"
    >
      {children}
    </button>
  );
}
