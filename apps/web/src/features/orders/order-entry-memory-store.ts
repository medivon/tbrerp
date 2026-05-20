"use client";

import { useSyncExternalStore } from "react";

import {
  calculateOrderEntrySummary,
  createInitialOrderEntryState,
  createOrderEntryStateForDraft,
  createOrderEntryStateWithDraftNo,
  type OrderEntryState,
} from "@/features/orders/order-entry-state";
import {
  draftOrderFixtures,
  type DraftOrderFixture,
} from "@/features/orders/fixtures/orders";

let currentOrderEntryState = createInitialOrderEntryState();
const listeners = new Set<() => void>();
const orderEntryStorageKey = "thaiboran-order-entry-state";
const draftEntryStorageKey = "thaiboran-draft-entry-states";
const draftNoCounterStorageKey = "thaiboran-draft-entry-counter";
let hydratedFromSession = false;

export type SavedDraftEntry = {
  draft: DraftOrderFixture;
  entryState: OrderEntryState;
};

export function getOrderEntryMemoryState(): OrderEntryState {
  hydrateOrderEntryStateFromSession();

  return currentOrderEntryState;
}

export function setOrderEntryMemoryState(state: OrderEntryState): void {
  currentOrderEntryState = state;
  writeJson(orderEntryStorageKey, state);
  listeners.forEach((listener) => listener());
}

export function resetOrderEntryMemoryState(): void {
  currentOrderEntryState = createInitialOrderEntryState();
  hydratedFromSession = true;
  removeSessionItem(orderEntryStorageKey);
  removeSessionItem(draftEntryStorageKey);
  removeSessionItem(draftNoCounterStorageKey);
  listeners.forEach((listener) => listener());
}

export function hasActiveOrderEntryState(): boolean {
  return getOrderEntryMemoryState().source === "in-memory";
}

export function loadOrderEntryDraft(draftNo: string): OrderEntryState | null {
  const savedDraft = getSavedDraftEntries().find(
    (entry) => entry.draft.draftNo === draftNo,
  );
  const entryState =
    savedDraft?.entryState ?? createOrderEntryStateForDraft(draftNo);

  if (!entryState) {
    return null;
  }

  setOrderEntryMemoryState(
    createOrderEntryStateWithDraftNo(entryState, draftNo),
  );

  return getOrderEntryMemoryState();
}

export function saveOrderEntryDraft({
  entryState,
  ownerName,
}: {
  entryState: OrderEntryState;
  ownerName: string;
}): SavedDraftEntry {
  const draftNo = entryState.draftNo ?? createNextDraftNo();
  const savedState = createOrderEntryStateWithDraftNo(entryState, draftNo);
  const savedDraft: SavedDraftEntry = {
    draft: createDraftFixtureFromEntryState(savedState, ownerName),
    entryState: savedState,
  };
  const otherSavedDrafts = getSavedDraftEntries().filter(
    (entry) => entry.draft.draftNo !== draftNo,
  );

  writeJson(draftEntryStorageKey, [savedDraft, ...otherSavedDrafts]);
  setOrderEntryMemoryState(savedState);

  return savedDraft;
}

export function getDraftOrderFixturesWithSaved(): DraftOrderFixture[] {
  const savedDrafts = getSavedDraftEntries();
  const savedDraftNos = new Set(
    savedDrafts.map((entry) => entry.draft.draftNo),
  );

  return [
    ...savedDrafts.map((entry) => entry.draft),
    ...draftOrderFixtures.filter((draft) => !savedDraftNos.has(draft.draftNo)),
  ];
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

function hydrateOrderEntryStateFromSession(): void {
  if (hydratedFromSession) {
    return;
  }

  hydratedFromSession = true;

  const savedState = readJson<OrderEntryState>(orderEntryStorageKey);

  if (savedState) {
    currentOrderEntryState = savedState;
  }
}

function createDraftFixtureFromEntryState(
  entryState: OrderEntryState,
  ownerName: string,
): DraftOrderFixture {
  const summary = calculateOrderEntrySummary(entryState);
  const lines = [...entryState.readyStockLines, ...entryState.customLines];
  const firstLine = lines[0];
  const additionalLineCount = Math.max(lines.length - 1, 0);
  const itemSummary = firstLine
    ? additionalLineCount > 0
      ? `${firstLine.title} + ${additionalLineCount} รายการ`
      : firstLine.title
    : "ยังไม่มีรายการในออเดอร์";

  return {
    customerName: entryState.customerName || "ยังไม่ได้เลือกลูกค้า",
    customerPhone: entryState.customerPhone || "ยังไม่ได้ระบุเบอร์",
    draftNo: entryState.draftNo ?? createNextDraftNo(),
    hasCustomWork: entryState.customLines.length > 0,
    itemCount: lines.length,
    itemSummary,
    lastUpdated: "วันนี้",
    missingData: summary.reviewBlockReasons,
    ownerName,
    recipientName: entryState.recipientName || "ยังไม่ได้ระบุผู้รับ",
    status: summary.isComplete
      ? "พร้อมตรวจสอบ"
      : summary.reviewBlockReasons.length > 0
        ? "ข้อมูลยังไม่ครบ"
        : "ร่างออเดอร์",
  };
}

function createNextDraftNo(): string {
  const savedCounter = readJson<number>(draftNoCounterStorageKey);
  const nextCounter = Math.max(savedCounter ?? 901, 901);

  writeJson(draftNoCounterStorageKey, nextCounter + 1);

  return `DRAFT-${String(nextCounter).padStart(5, "0")}`;
}

function getSavedDraftEntries(): SavedDraftEntry[] {
  return readJson<SavedDraftEntry[]>(draftEntryStorageKey) ?? [];
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
    // Session storage is best-effort UI state only.
  }
}

function removeSessionItem(key: string): void {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Session storage is best-effort UI state only.
  }
}
