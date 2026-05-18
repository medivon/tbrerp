# Interaction & Modal Behavior Grill Notes - IM-BATCH-001

## 1. Batch Range

- IM-001 to IM-025
- Domain focus: Order creation/review, Order Detail/Order Line Edit, initial worker production actions, Rak Samuk handoff, and status-change conflict behavior.
- Status: Temporary handoff notes for later Grill Doc mode. Not official source-of-truth documentation.

## 2. Questions Answered

- IM-001: Unsaved exit behavior from Order Create/Edit or Order Review.
- IM-002: Post-save destination when saving draft from Order Review.
- IM-003: Multiple warning acknowledgement behavior on Order Review.
- IM-004: Log level for stock-insufficient acknowledgement.
- IM-005: Post-confirmation navigation after creating an Order.
- IM-006: Hidden vs disabled behavior for actions the user lacks permission to perform.
- IM-007: Disabled behavior for actions blocked by current work state.
- IM-008: Review Changes shape for Order Line Edit.
- IM-009: Financial Reconciliation placement during Order Line Edit.
- IM-010: Whole-Order cancellation confirmation requirements.
- IM-011: Entry behavior for ready-stock vs custom-work Order Line Edit actions.
- IM-012: Safe ready-stock line removal behavior.
- IM-013: Reason capture scope for mixed Order Line Edit changes.
- IM-014: Reason/log behavior for price or discount edits without existing Payment/COD records.
- IM-015: Completed Order note/correction-note interaction.
- IM-016: Confirmation behavior for worker production actions.
- IM-017: Post-success behavior after worker accepts work.
- IM-018: Required input for marking work waiting for materials.
- IM-019: Missing or wrong production detail behavior.
- IM-020: Production photo/evidence requirement rule, revised by IM-024.
- IM-021: Send to Rak Samuk interaction.
- IM-022: Post-success behavior after sending work to Rak Samuk.
- IM-023: Evidence behavior when receiving Rak Samuk work back.
- IM-024: Ready/complete evidence behavior and later attachment.
- IM-025: Stale status-change behavior when another user already changed the Job.

## 3. Decisions Captured

- IM-001: Exiting Order Create/Edit or Order Review with unsaved changes uses the same guard. If a Customer exists, offer `ออกและบันทึกร่าง`, `ออกโดยไม่บันทึก`, and `อยู่ต่อ`. If no Customer exists, draft save is unavailable; only discard/continue behavior is available.
- IM-002: Saving a draft from Order Review returns to the `ร่างออเดอร์` tab.
- IM-003: Multiple Order Review warnings use one acknowledgement checkbox, while the log records each warning item acknowledged.
- IM-004: Stock-insufficient acknowledgement writes Activity Log.
- IM-005: After `ยืนยันสร้างออเดอร์` succeeds, navigate to Order Detail with a success banner.
- IM-006: Actions unavailable due to missing permission are hidden.
- IM-007: Actions blocked by current work state remain visible but disabled with a clear reason.
- IM-008: Order Line Edit `Review Changes` is a full page before save.
- IM-009: Financial Reconciliation appears as a panel inside Review Changes with actions to add evidence or explanatory financial note.
- IM-010: Whole-Order cancellation requires a reason and an acknowledgement checkbox confirming the user understands the impact.
- IM-011: `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` enter the same Order Line Edit flow, focused on the selected group.
- IM-012: Removing a safe ready-stock line is treated as `ยกเลิกรายการ`; the cancelled line remains visible in history and is not physically deleted.
- IM-013: If a save includes any change requiring a reason, use one reason field for the save batch.
- IM-014: Price/discount edits without existing Payment/COD records do not require a reason when the user has permission, but old/new values are logged.
- IM-015: Completed Order note/correction note is added from an inline panel on Order Detail; the user stays on the page and the note is logged.
- IM-016: Worker actions that move the Job to the next workflow status require confirmation. Note/photo actions do not require confirmation.
- IM-017: After a worker accepts work, stay on the current detail/card and update the status to in progress.
- IM-018: Marking work as `รอวัตถุดิบ` requires a short note describing what is missing.
- IM-019: If production detail is missing or wrong, there is no system workflow, no special note action, and no log requirement. Workers ask outside the system. Do not keep this as an open question.
- IM-020 and IM-024: Production photos/evidence are optional, including when marking ready/complete. Users may attach photos later, even after the Job is completed.
- IM-021: `ส่งไปรักสมุก` opens a confirm interaction requiring immediate Rak Samuk Worker selection. No reason is required.
- IM-022: After sending work to Rak Samuk succeeds, stay on Job Detail with the updated status/worker visible.
- IM-023: Receiving Rak Samuk work back does not require evidence. Note/photo is optional.
- IM-024: If marking ready/complete without a photo, the action is allowed. Photo/evidence can be attached later after completion.
- IM-025: If another user already changed the Job status, show that the data changed and refresh to the latest state. Do not overwrite stale state.

## 4. Unclear Areas / Follow-Up Questions

- Need future batches to cover Shipment, COD/payment follow-up, Expense/PV, Product/Stock/Material, and broader no-access/override interactions.
- No open follow-up remains for IM-019; the production-detail-missing behavior is explicitly outside system workflow.
- The evidence rule for production completion is resolved as optional by the latest answer, superseding the earlier recommended required-photo framing.

## 5. Conflicts With Existing Docs

- No direct conflict found with the existing rule that missing/incorrect production detail uses outside-system communication. IM-019 makes the interaction stricter by confirming there should also be no special note/action/log for that case.
- IM-004 narrows stock-insufficient acknowledgement to Activity Log; existing docs only said the acknowledgement is logged.
- IM-020/IM-024 should be treated as the latest interaction decision for production evidence: optional evidence, attachable later after completion.

## 6. Terms Or Patterns That May Need Official Docs Updates Later

- Reusable unsaved-exit guard for draftable vs non-draftable work.
- Permission-hidden vs state-disabled action rule.
- Full-page Review Changes for high-impact edits.
- Single reason per save batch when any included change requires reason.
- Optional production evidence with late attachment allowed after completion.
- Stale status-change refresh behavior for shared queues.

## 7. Possible ADR Candidates

- None yet. These are UX behavior patterns and audit/logging clarifications, not hard-to-reverse architecture decisions.

## 8. Suggested Focus For Next Batch

- Shipment and delivery interactions: Shipment Builder, draft/release behavior, recipient/address/carrier edits, print behavior, Delivery Team sent-out, admin close, bulk sent-out, post-close correction, and special shipment from completed Orders.
