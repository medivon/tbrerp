"use client";

import { useSyncExternalStore } from "react";

import {
  createInitialOrderEntryState,
  type OrderEntryState,
} from "@/features/orders/order-entry-state";

let currentOrderEntryState = createInitialOrderEntryState();
const listeners = new Set<() => void>();

export function getOrderEntryMemoryState(): OrderEntryState {
  return currentOrderEntryState;
}

export function setOrderEntryMemoryState(state: OrderEntryState): void {
  currentOrderEntryState = state;
  listeners.forEach((listener) => listener());
}

export function resetOrderEntryMemoryState(): void {
  currentOrderEntryState = createInitialOrderEntryState();
  listeners.forEach((listener) => listener());
}

export function useOrderEntryMemoryState(): OrderEntryState {
  return useSyncExternalStore(
    subscribeOrderEntryMemoryState,
    getOrderEntryMemoryState,
    getOrderEntryMemoryState,
  );
}

function subscribeOrderEntryMemoryState(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
