# Interaction & Modal Behavior Grill Notes - IM-BATCH-005

## 1. Batch Range

- IM-101 to IM-125
- Domain focus: Product/SKU deactivation and reopening, Product Purchase Order / Product Stock Receipt, Material Adjustment, cross-cutting permission/no-access/override behavior, reusable validation/error/upload/bulk/success patterns, and completion assessment.
- Status: Temporary handoff notes for later Grill Doc mode. Not official source-of-truth documentation.

## 2. Questions Answered

- IM-101: Blocked Product Model / SKU color deactivation behavior.
- IM-102: Allowed Product Model / SKU color deactivation confirmation and log.
- IM-103: Product Model / SKU color reopen behavior.
- IM-104: Product Stock Receipt save confirmation.
- IM-105: Post-success navigation after Product Stock Receipt.
- IM-106: Product Stock Receipt over-receipt behavior.
- IM-107: Product Purchase Order `ปิดยอดที่เหลือ` interaction.
- IM-108: Missing linked Stock Movement for `ปรับยอดแล้ว`.
- IM-109: Product Purchase Order cancellation before any receipt.
- IM-110: Correction behavior for saved Product Stock Receipt.
- IM-111: Material Adjustment save confirmation.
- IM-112: Post-success navigation after Material Adjustment.
- IM-113: Correction behavior for wrong Material Adjustment.
- IM-114: Manager/Owner override interaction.
- IM-115: Permission change while a user is editing/saving.
- IM-116: Direct URL no-access page behavior.
- IM-117: Sensitive field/column visibility.
- IM-118: Record-detail no-access behavior for out-of-scope records.
- IM-119: Shared-queue stale state pattern.
- IM-120: Default success behavior for queue actions.
- IM-121: Required-field validation failure behavior.
- IM-122: Network/server save failure behavior.
- IM-123: Evidence/photo upload failure behavior.
- IM-124: Partial success/failure behavior for bulk actions.
- IM-125: Whether the Interaction & Modal Behavior Domain is complete enough for Grill Doc mode.

## 3. Decisions Captured

- IM-101: If Product Model / color deactivation is blocked by stock, reservation, unfinished Order, unfinished Job, or unfinished Production, show a blocking modal with reasons and links to the records that must be resolved.
- IM-102: If Product Model / color deactivation is allowed, require confirmation modal, reason, and Management Log.
- IM-103: Reopening Product Model / color uses confirmation and Management Log. No reason is required.
- IM-104: Saving Product Stock Receipt uses a receipt review modal summarizing SKU, received quantity, stock increase, and whether Payment Audit Follow-up will be created.
- IM-105: After Product Stock Receipt succeeds, return to Product Purchase Order detail with the new receipt round and updated status.
- IM-106: If receipt quantity exceeds remaining quantity, block inline and explain that excess goods require a new Product Purchase Order.
- IM-107: `ปิดยอดที่เหลือ` uses a modal/page summarizing selected lines, remaining quantity, reason, linked Stock Movement when reason is `ปรับยอดแล้ว`, then confirmation.
- IM-108: If reason `ปรับยอดแล้ว` has no valid linked same-SKU Stock Count / Stock Adjustment movement with enough positive quantity, block confirmation and provide a path to create or select the correct movement.
- IM-109: Product Purchase Order with no receipt can be cancelled without a reason, using confirmation modal and Activity Log.
- IM-110: Saved Product Stock Receipt is read-only. If wrong, create Stock Adjustment from the receipt/movement with reference; do not edit the receipt round.
- IM-111: Material Adjustment save uses a modal summarizing selected materials, before/after values, differences, reason/mode, and optional evidence before confirmation.
- IM-112: After Material Adjustment succeeds, navigate to Material Adjustment summary/read-only detail for that session.
- IM-113: If Material Adjustment is wrong, create a new adjustment with reference to the previous session/movement; do not edit old movements.
- IM-114: Manager/Owner override uses the same action surface. If the action exceeds normal permission, show override confirmation and require reason only when that action normally requires reason.
- IM-115: If permission changes while the user is editing and the user no longer has save permission, block save, notify that permission changed, then refresh or route to no-access / the user's first screen.
- IM-116: Direct URL without page permission shows a no-access page with `ไม่มีสิทธิ์เข้าถึงหน้านี้` and a return-to-own-home action only.
- IM-117: Sensitive fields/columns the user cannot see are hidden entirely. Do not use masks, placeholders, labels with blank values, or disabled tooltips.
- IM-118: Opening a disallowed record detail from search/link shows no-access with return-to-own-home. Do not render the detail with hidden fields.
- IM-119: Stale state in shared queues uses one reusable pattern: notify that data changed, refresh latest record/list, and do not overwrite.
- IM-120: Queue-action success defaults to staying in the queue, updating/removing the item, focusing the next item, and showing a short toast/banner, unless a specific flow already defines another destination.
- IM-121: Required-field validation failure stays on the current form/modal, highlights bad fields, shows a top summary when multiple fields fail, and preserves entered data.
- IM-122: Network/server save failure stays on the current form/modal, shows retry, and preserves entered data. Do not create unplanned drafts.
- IM-123: Evidence/photo upload failure shows an error on the specific file with retry/remove. Save is blocked only when evidence is required by that action.
- IM-124: Bulk action partial success performs items that can proceed, then shows a result modal summarizing successes/failures with reasons and refreshes the list.
- IM-125: After processing coverage, the Interaction & Modal Behavior Domain is complete enough for Grill Doc mode. Do not ask another 25-question batch now.

## 4. Unclear Areas / Follow-Up Questions

- No remaining blocker for first implementation documentation was identified in this interaction-discovery scope.
- Some exact labels and component choices remain implementation/design details and should not require more Grill Me discovery.
- Official docs still need consolidation because temporary decisions supersede or refine several existing docs.

## 5. Conflicts With Existing Docs

- Existing docs already mostly support Product/SKU close/reopen, Stock Movement immutability, Product Receipt immutability, Material Adjustment evidence optionality, no-access behavior, and permission-aware print/export.
- No new major conflict was introduced in IM-101 to IM-125.
- Cross-check needed during Grill Doc mode to ensure IM-102 / IM-103 reason behavior aligns with any older broad statement that deactivating/reopening Product Model or SKU Variant requires a reason. Latest interaction decision: deactivation requires reason; reopen requires confirmation + Management Log but no reason.

## 6. Terms Or Patterns That May Need Official Docs Updates Later

- Reusable blocked-action modal with record links.
- Deactivation vs reopen reason/log distinction.
- Receipt review modal before stock increase.
- `ปิดยอดที่เหลือ` review modal/page with linked movement requirement.
- Referenced correction movement pattern.
- Manager/Owner override confirmation pattern.
- No-access page pattern and out-of-scope record behavior.
- Reusable validation, server-error, evidence-upload, stale-state, queue-success, and bulk-result patterns.

## 7. Possible ADR Candidates

- No new ADR candidate from this batch beyond earlier candidates. Most decisions are interaction conventions, not hard-to-reverse architecture decisions.
- If future teams challenge movement immutability, an ADR may be useful, but the existing docs and repeated decisions already align around immutable movement/receipt records.

## 8. Suggested Focus For Next Batch

- Do not start another Grill Me question batch for this domain now.
- Next recommended step is Grill Doc mode / consolidation into official docs, resolving conflicts from checkpoint notes without adding implementation plans.
