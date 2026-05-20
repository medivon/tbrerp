import type { OrderLineFixture } from "@/features/orders/fixtures/orders";
import type { CustomWorkLineDraft } from "@/features/orders/order-entry-state";

export type LineEditImpact = {
  addedCount: number;
  blockedCount: number;
  hasChanges: boolean;
  nextTotalBaht: number;
  originalTotalBaht: number;
  quantityChangedCount: number;
  removedCount: number;
  stockWarningCount: number;
};

export function calculateLineEditImpact(
  originalLines: OrderLineFixture[],
  draftLines: OrderLineFixture[],
): LineEditImpact {
  const originalById = new Map(originalLines.map((line) => [line.id, line]));
  const draftById = new Map(draftLines.map((line) => [line.id, line]));
  const addedCount = draftLines.filter(
    (line) => !originalById.has(line.id),
  ).length;
  const removedCount = originalLines.filter(
    (line) => !draftById.has(line.id) && line.editable,
  ).length;
  const quantityChangedCount = draftLines.filter((line) => {
    const original = originalById.get(line.id);

    return original && original.quantity !== line.quantity;
  }).length;
  const originalTotalBaht = originalLines
    .filter((line) => !line.cancelledReason)
    .reduce((total, line) => total + line.lineTotalBaht, 0);
  const nextTotalBaht = draftLines
    .filter((line) => !line.cancelledReason)
    .reduce((total, line) => total + line.lineTotalBaht, 0);

  return {
    addedCount,
    blockedCount: draftLines.filter((line) => !line.editable).length,
    hasChanges:
      addedCount > 0 ||
      removedCount > 0 ||
      quantityChangedCount > 0 ||
      originalTotalBaht !== nextTotalBaht,
    nextTotalBaht,
    originalTotalBaht,
    quantityChangedCount,
    removedCount,
    stockWarningCount: draftLines.filter((line) => line.stockWarning).length,
  };
}

export function buildCustomDetail(draft: CustomWorkLineDraft): string {
  return [
    draft.woodworkDetail,
    draft.coloringDetail,
    draft.rakSamukDetail,
    draft.sizeDetail ? `ขนาด ${draft.sizeDetail}` : undefined,
    draft.materialDetail ? `วัสดุ ${draft.materialDetail}` : undefined,
    draft.colorDetail ? `สี ${draft.colorDetail}` : undefined,
  ]
    .filter(Boolean)
    .join(" / ");
}

export function nextAddedLineIndex(
  lines: OrderLineFixture[],
  prefix: string,
): number {
  const usedNumbers = lines
    .filter((line) => line.id.startsWith(prefix))
    .map((line) => Number(line.id.slice(prefix.length)))
    .filter((value) => Number.isFinite(value));

  return usedNumbers.length === 0 ? 1 : Math.max(...usedNumbers) + 1;
}
