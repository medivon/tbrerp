"use client";

import Image from "next/image";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { PackageSearch, Search } from "lucide-react";
import { Button, StatusChip } from "@thaiboran/ui";

import { OrderEntryModalShell } from "@/features/orders/components/order-entry-modal-shell";
import { formatBaht } from "@/features/orders/fixtures/orders";
import type { ReadyStockOption } from "@/features/orders/order-entry-state";

type ReadyStockProductGroup = {
  id: string;
  imageAlt: string;
  imageSrc: string;
  productModelName: string;
  variants: ReadyStockOption[];
};

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
  const [showNoStock, setShowNoStock] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const deferredQuery = useDeferredValue(query);
  const productGroups = useMemo(
    () => groupReadyStockOptions(options),
    [options],
  );
  const filteredGroups = useMemo(
    () =>
      filterReadyStockProductGroups({
        groups: productGroups,
        query: deferredQuery,
        showNoStock,
      }),
    [deferredQuery, productGroups, showNoStock],
  );
  const hiddenNoStockCount = useMemo(
    () =>
      filterReadyStockProductGroups({
        groups: productGroups,
        query: deferredQuery,
        showNoStock: true,
      }).reduce(
        (count, group) =>
          count +
          group.variants.filter((variant) => variant.sellableStock <= 0).length,
        0,
      ),
    [deferredQuery, productGroups],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setShowNoStock(false);
      setQuantities({});
    }
  }, [open]);

  function getQuantity(optionId: string): number {
    const parsed = Number(quantities[optionId] ?? "1");

    return Number.isFinite(parsed) ? Math.max(1, Math.floor(parsed)) : 1;
  }

  return (
    <OrderEntryModalShell
      description="เลือกสินค้าและจำนวนเพื่อเพิ่มในออเดอร์"
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

        <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-subtle px-3 py-2">
          <p className="min-w-0 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            แสดงสินค้าที่ขายได้ก่อน
            หากต้องการขายเกินสต๊อกให้เปิดรายการที่ไม่มีสต๊อก
          </p>
          <Button
            aria-pressed={showNoStock}
            onClick={() => setShowNoStock((current) => !current)}
            size="sm"
            type="button"
            variant="outline"
          >
            {showNoStock
              ? "ซ่อนสินค้าที่ไม่มีสต๊อก"
              : "เลือกสินค้าที่ไม่มีสต๊อก"}
          </Button>
        </div>

        <div className="grid gap-3">
          {filteredGroups.map((group) => {
            return (
              <article
                className="grid min-w-0 gap-3 rounded-md border border-border bg-surface p-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:items-start"
                key={group.id}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-subtle sm:h-[88px] sm:w-[88px]">
                  <Image
                    alt={group.imageAlt}
                    className="object-cover"
                    fill
                    sizes="88px"
                    src={group.imageSrc}
                  />
                </div>

                <div className="min-w-0 space-y-2">
                  <div className="grid gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusChip variant="action">สินค้าพร้อมส่ง</StatusChip>
                      <StatusChip variant="neutral">
                        {group.variants.length} SKU/สี
                      </StatusChip>
                    </div>
                    <h3 className="break-words text-base font-extrabold leading-7 text-foreground [overflow-wrap:anywhere]">
                      {group.productModelName}
                    </h3>
                  </div>

                  <div className="grid min-w-0 gap-2">
                    {group.variants.map((option) => {
                      const soldOut = option.sellableStock <= 0;
                      const quantityId = `ready-product-${option.id}-quantity`;

                      return (
                        <div
                          className="grid min-w-0 gap-3 rounded-md border border-border bg-subtle p-3 lg:grid-cols-[minmax(0,1fr)_minmax(8rem,10rem)_auto] lg:items-end"
                          key={option.id}
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <StatusChip
                                variant={soldOut ? "warning" : "success"}
                              >
                                {soldOut
                                  ? "หมด"
                                  : `ขายได้ ${option.sellableStock} ชิ้น`}
                              </StatusChip>
                              {soldOut ? (
                                <StatusChip variant="warning">
                                  ต้องรับทราบที่หน้าตรวจสอบ
                                </StatusChip>
                              ) : null}
                            </div>
                            <p className="mt-2 break-words text-sm font-extrabold leading-6 text-foreground [overflow-wrap:anywhere]">
                              {option.color} • {option.skuCode}
                            </p>
                            <p className="mt-1 break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                              {option.dimensions} •{" "}
                              {formatBaht(option.unitPriceBaht)} / ชิ้น
                            </p>
                            {soldOut ? (
                              <p className="mt-2 break-words rounded-md border border-[#FAD980] bg-[#FEF3C7] px-3 py-2 text-sm font-semibold leading-6 text-[#92400E] [overflow-wrap:anywhere]">
                                SKU นี้ไม่มีสต๊อกขายได้
                                หากเพิ่มรายการต้องรับทราบคำเตือนก่อนยืนยัน
                              </p>
                            ) : null}
                          </div>

                          <label
                            className="grid w-full min-w-0 gap-1 text-sm font-bold text-foreground"
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
                            className="w-full lg:w-auto"
                            data-testid={`add-ready-stock-${option.id}`}
                            onClick={() =>
                              onAdd({
                                optionId: option.id,
                                quantity: getQuantity(option.id),
                              })
                            }
                            size="sm"
                            type="button"
                          >
                            <PackageSearch
                              aria-hidden
                              className="mr-2 h-4 w-4"
                            />
                            เพิ่มรายการ
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredGroups.length === 0 ? (
          <div className="break-words rounded-md border border-dashed border-border bg-subtle px-4 py-6 text-center text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            {hiddenNoStockCount > 0
              ? "พบเฉพาะ SKU ที่ไม่มีสต๊อกขายได้ เปิดรายการที่ไม่มีสต๊อกเพื่อเลือก"
              : "ไม่พบสินค้าที่ตรงกับคำค้นนี้"}
          </div>
        ) : null}
      </div>
    </OrderEntryModalShell>
  );
}

function groupReadyStockOptions(
  options: ReadyStockOption[],
): ReadyStockProductGroup[] {
  const groups = new Map<string, ReadyStockProductGroup>();

  for (const option of options) {
    const id = option.productModelName;
    const current = groups.get(id);

    if (current) {
      current.variants.push(option);
    } else {
      groups.set(id, {
        id,
        imageAlt: option.imageAlt,
        imageSrc: option.imageSrc,
        productModelName: option.productModelName,
        variants: [option],
      });
    }
  }

  return Array.from(groups.values());
}

function filterReadyStockProductGroups({
  groups,
  query,
  showNoStock,
}: {
  groups: ReadyStockProductGroup[];
  query: string;
  showNoStock: boolean;
}): ReadyStockProductGroup[] {
  const normalizedQuery = query.trim().toLowerCase();

  return groups
    .map((group) => {
      const matchingVariants = group.variants.filter((option) => {
        if (!showNoStock && option.sellableStock <= 0) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        return [
          option.productModelName,
          option.color,
          option.dimensions,
          option.skuCode,
          option.imageAlt,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));
      });

      return {
        ...group,
        variants: matchingVariants,
      };
    })
    .filter((group) => group.variants.length > 0);
}
