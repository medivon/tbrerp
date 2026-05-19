"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Search, UserRound } from "lucide-react";
import { StatusChip } from "@thaiboran/ui";

import { OrderEntryModalShell } from "@/features/orders/components/order-entry-modal-shell";
import {
  orderEntryCustomerOptions,
  type OrderEntryCustomerOption,
} from "@/features/orders/order-entry-state";

export function CustomerSelectModal({
  onClose,
  onSelect,
  open,
  selectedCustomerId,
}: {
  onClose: () => void;
  onSelect: (customerId: string) => void;
  open: boolean;
  selectedCustomerId?: string;
}) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filteredCustomers = useMemo(
    () => filterCustomers(orderEntryCustomerOptions, deferredQuery),
    [deferredQuery],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
    }
  }, [open]);

  return (
    <OrderEntryModalShell
      description="ค้นหาและเลือกลูกค้าจาก fixture เท่านั้น รอบงานนี้ยังไม่สร้างข้อมูลลูกค้าใหม่"
      initialFocusRef={searchInputRef}
      onClose={onClose}
      open={open}
      title="เลือกลูกค้า"
    >
      <div className="grid min-w-0 gap-4">
        <label
          className="grid min-w-0 gap-1 text-sm font-bold text-foreground"
          htmlFor="order-entry-customer-search"
        >
          <span className="break-words [overflow-wrap:anywhere]">
            ค้นหาลูกค้า
          </span>
          <span className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              className="min-h-11 w-full rounded-md border border-border bg-surface pl-10 pr-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              id="order-entry-customer-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ค้นหาชื่อ เบอร์ Social หรือระดับลูกค้า"
              ref={searchInputRef}
              value={query}
            />
          </span>
        </label>

        <div
          aria-label="รายชื่อลูกค้า fixture"
          className="grid gap-2"
          role="listbox"
        >
          {filteredCustomers.map((customer) => (
            <button
              aria-selected={customer.id === selectedCustomerId}
              className="grid min-w-0 cursor-pointer gap-3 rounded-md border border-border bg-surface p-3 text-left transition hover:border-primary/60 hover:bg-subtle focus:outline-none focus:ring-2 focus:ring-primary/25 md:grid-cols-[minmax(0,1fr)_auto]"
              key={customer.id}
              onClick={() => onSelect(customer.id)}
              role="option"
              type="button"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-subtle text-muted-foreground">
                    <UserRound aria-hidden className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="break-words text-sm font-extrabold leading-6 text-foreground [overflow-wrap:anywhere]">
                      {customer.name}
                    </p>
                    <p className="break-words text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                      {customer.primaryPhone}
                      {customer.socialContact
                        ? ` • ${customer.socialContact}`
                        : ""}
                    </p>
                  </div>
                </div>
                <p className="mt-2 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                  ผู้รับ {customer.recipientName} • {customer.address}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <StatusChip
                  variant={
                    customer.id === selectedCustomerId ? "success" : "neutral"
                  }
                >
                  {customer.id === selectedCustomerId
                    ? "เลือกอยู่"
                    : customer.tier}
                </StatusChip>
                <StatusChip variant="action">Fixture</StatusChip>
              </div>
            </button>
          ))}
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="break-words rounded-md border border-dashed border-border bg-subtle px-4 py-6 text-center text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
            ไม่พบลูกค้าใน fixture นี้ และยังไม่เปิดการเพิ่มลูกค้าใหม่ในรอบงานนี้
          </div>
        ) : null}

        <div className="break-words rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-6 text-muted-foreground [overflow-wrap:anywhere]">
          การเพิ่มลูกค้าใหม่ถูกซ่อนไว้ตามขอบเขตรอบงานนี้ ไม่มีการเขียนข้อมูล
          Customer/CRM จริง
        </div>
      </div>
    </OrderEntryModalShell>
  );
}

function filterCustomers(
  customers: OrderEntryCustomerOption[],
  query: string,
): OrderEntryCustomerOption[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return customers;
  }

  return customers.filter((customer) =>
    [
      customer.name,
      customer.primaryPhone,
      customer.recipientName,
      customer.recipientPhone,
      customer.socialContact,
      customer.tier,
      customer.address,
    ]
      .filter(Boolean)
      .some((value) => value?.toLowerCase().includes(normalizedQuery)),
  );
}
