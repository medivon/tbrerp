"use client";

import Image from "next/image";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { PackageSearch, Search } from "lucide-react";
import { Button, StatusChip } from "@thaiboran/ui";

import { OrderEntryModalShell } from "@/features/orders/components/order-entry-modal-shell";
import { formatBaht } from "@/features/orders/fixtures/orders";
import type { ReadyStockOption } from "@/features/orders/order-entry-state";

export function ProductSelectModal({
  onAdd,
  onClose,
  open,
  options,
}: {
  onAdd: (selection: { optionId: string; quantity: number }) => void;
  onClose: () => void;
  open: boolean;
  options: ReadyStockOption[];
}) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const deferredQuery = useDeferredValue(query);
  const filteredOptions = useMemo(
    () => filterReadyStockOptions(options, deferredQuery),
    [deferredQuery, options],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setQuantities({});
    }
  }, [open]);

  function getQuantity(optionId: string): number {
    const parsed = Number(quantities[optionId] ?? "1");

    return Number.isFinite(parsed) ? Math.max(1, Math.floor(parsed)) : 1;
  }

  return (
    <OrderEntryModalShell
      description="เลือก Product/SKU และจำนวนจาก fixture เพื่อเพิ่มรายการในออเดอร์ ยังไม่จองสต๊อกจริง"
      initialFocusRef={searchInputRef}
      onClose={onClose}
      open={open}
      size="wide"
      title="เลือกสินค้าพร้อมส่ง"
    >
      <div className="grid min-w-0 gap-4">
        <label
          className="grid min-w-0 gap-1 text-sm font-bold text-foreground"
          htmlFor="order-entry-product-search"
        >
          <span className="break-words [overflow-wrap:anywhere]">
            ค้นหาสินค้าพร้อมส่ง
          </span>
          <span className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              className="min-h-11 w-full rounded-md border border-border bg-surface pl-10 pr-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              id="order-entry-product-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ค้นหาชื่อสินค้า สี หรือ SKU"
              ref={searchInputRef}
              value={query}
            />
          </span>
        </label>

        <div className="grid gap-3">
          {filteredOptions.map((option) => {
            const soldOut = option.sellableStock <= 0;
            const quantityId = `ready-product-${option.id}-quantity`;

            return (
              <article
                className="grid min-w-0 gap-3 rounded-md border border-border bg-surface p-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:items-start lg:grid-cols-[88px_minmax(0,1fr)_180px]"
                key={option.id}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-subtle sm:h-[88px] sm:w-[88px]">
                  <Image
                    alt={option.imageAlt}
                    className="object-cover"
                    fill
                    sizes="88px"
                    src={option.imageSrc}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusChip variant="action">สินค้าพร้อมส่ง</StatusChip>
                    <StatusChip variant={soldOut ? "warning" : "success"}>
                      {soldOut ? "หมด" : `ขายได้ ${option.sellableStock} ชิ้น`}
                    </StatusChip>
                  </div>
                  <div>
                    <h3 className="break-words text-base font-extrabold leading-7 text-foreground [overflow-wrap:anywhere]">
                      {option.productModelName}
                    </h3>
                    <p className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                      {option.color} • {option.dimensions} • {option.skuCode}
                    </p>
                  </div>
                  <p className="break-words text-sm font-bold leading-6 text-foreground [overflow-wrap:anywhere]">
                    {formatBaht(option.unitPriceBaht)} / ชิ้น
                  </p>
                  {soldOut ? (
                    <p className="break-words rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E] [overflow-wrap:anywhere]">
                      สินค้านี้หมด แต่ยังเพิ่มเป็นรายการได้เพื่อให้ Review
                      แสดงคำเตือนสต๊อกก่อนยืนยัน ไม่มีการจองสต๊อกจริงในรอบนี้
                    </p>
                  ) : null}
                </div>

                <div className="grid min-w-0 gap-2 sm:col-span-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:col-span-1 lg:grid-cols-1 lg:justify-items-end">
                  <label
                    className="grid w-full min-w-0 gap-1 text-sm font-bold text-foreground lg:w-36"
                    htmlFor={quantityId}
                  >
                    <span className="break-words [overflow-wrap:anywhere]">
                      จำนวน
                    </span>
                    <input
                      aria-label={`จำนวน ${option.productModelName} ${option.skuCode}`}
                      className="min-h-10 w-full min-w-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      id={quantityId}
                      inputMode="numeric"
                      min={1}
                      onChange={(event) =>
                        setQuantities((current) => ({
                          ...current,
                          [option.id]: event.target.value,
                        }))
                      }
                      type="number"
                      value={quantities[option.id] ?? "1"}
                    />
                  </label>
                  <Button
                    aria-label={`เพิ่มรายการ ${option.productModelName} ${option.skuCode}`}
                    className="w-full sm:w-auto lg:w-full"
                    onClick={() =>
                      onAdd({
                        optionId: option.id,
                        quantity: getQuantity(option.id),
                      })
                    }
                    size="sm"
                    type="button"
                  >
                    <PackageSearch aria-hidden className="mr-2 h-4 w-4" />
                    เพิ่มรายการ
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredOptions.length === 0 ? (
          <div className="break-words rounded-md border border-dashed border-border bg-subtle px-4 py-6 text-center text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            ไม่พบสินค้าใน fixture นี้
          </div>
        ) : null}
      </div>
    </OrderEntryModalShell>
  );
}

function filterReadyStockOptions(
  options: ReadyStockOption[],
  query: string,
): ReadyStockOption[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return options;
  }

  return options.filter((option) =>
    [
      option.productModelName,
      option.color,
      option.dimensions,
      option.skuCode,
      option.imageAlt,
    ].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
}
