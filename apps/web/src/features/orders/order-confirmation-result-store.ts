"use client";

import type { OrderConfirmationResult } from "@thaiboran/domain";

export type StoredOrderConfirmationResult = Extract<
  OrderConfirmationResult,
  { status: "confirmed" }
>;

const confirmationResultStorageKey = "thaiboran-order-confirmation-result";

export function saveOrderConfirmationResult(
  result: StoredOrderConfirmationResult,
): void {
  writeJson(confirmationResultStorageKey, result);
}

export function getOrderConfirmationResult(
  orderId: string,
): StoredOrderConfirmationResult | null {
  const result = readJson<StoredOrderConfirmationResult>(
    confirmationResultStorageKey,
  );

  if (!result || result.confirmedOrder.id !== orderId) {
    return null;
  }

  return result;
}

function canUseSessionStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.sessionStorage);
}

function readJson<T>(key: string): T | null {
  if (!canUseSessionStorage()) {
    return null;
  }

  try {
    const value = window.sessionStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Confirmation result is browser-local handoff context only.
  }
}
