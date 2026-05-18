# Interaction & Modal Behavior Grill Notes - IM-BATCH-003

## 1. Batch Range

- IM-051 to IM-075
- Domain focus: COD/Payment Follow-up, Payment Record correction, Expense, Payment Voucher, Rak Samuk/Outsource payout round, and PV creation behavior.
- Status: Temporary handoff notes for later Grill Doc mode. Not official source-of-truth documentation.

## 2. Questions Answered

- IM-051: Add Payment Record interaction and post-save behavior.
- IM-052: Requirements for closing COD/Payment Follow-up.
- IM-053: Actual COD lower than expected.
- IM-054: Actual COD higher than expected.
- IM-055: Payment evidence correction when amount does not change.
- IM-056: Payment Record amount correction after follow-up was closed.
- IM-057: Payment Record amount correction before follow-up was closed.
- IM-058: Ordinary follow-up note behavior.
- IM-059: Post-close navigation for COD/Payment Follow-up.
- IM-060: Financial follow-up visibility for users without payment/COD detail permission.
- IM-061: Expense evidence requirement.
- IM-062: Post-create Expense navigation.
- IM-063: Expense edit reason/log behavior.
- IM-064: Expense cancellation behavior.
- IM-065: Expense evidence replacement behavior.
- IM-066: Starting point for Rak Samuk payout PV creation and one-worker boundary.
- IM-067: Review contents before PV/payment confirmation.
- IM-068: PV number issuance timing.
- IM-069: PV payment evidence requirement and removal of separate waiting-payment state.
- IM-070: Post-close PV navigation.
- IM-071: Pre-PV payout round / payable list layer.
- IM-072: One PV payee boundary.
- IM-073: PV creation sources.
- IM-074: Manual/custom-text PV line behavior.
- IM-075: Whether payout-round prices can be edited inside PV.

## 3. Decisions Captured

- IM-051: `บันทึกรับเงิน` opens as a modal/drawer in the current Order, Shipment, or follow-up context. Evidence is required. After save, update the current page/drawer summary without navigating away.
- IM-052: A follow-up can close when there is either a Payment Record with evidence or an explanatory note sufficient for the operational audit trail.
- IM-053: If actual COD is lower than expected, record the actual amount, evidence, and reason for the difference, then the follow-up can close. Do not change Order total.
- IM-054: If actual COD is higher than expected, record the accepted amount up to the expected amount and add an abnormal COD note. Handle excess outside the P0 workflow.
- IM-055: If payment evidence changes but amount does not change, use a correction modal showing old/new evidence, require a reason, write Management Log, and do not reopen the follow-up automatically.
- IM-056: If Payment Record amount changes after follow-up was closed, use correction modal, require reason, write Audit Log, and reopen/recheck the follow-up.
- IM-057: If Payment Record amount changes before follow-up is closed, require reason, write Management Log, and update the follow-up summary.
- IM-058: Ordinary follow-up notes need no confirmation or reason; write Activity Log.
- IM-059: After closing COD/Payment Follow-up, stay in the queue/drawer context. The item leaves the active list or appears under `ปิดแล้ววันนี้`.
- IM-060: Users without payment/COD detail permission may see broad context such as `มีรายการติดตามการเงิน`, but no amount or action.
- IM-061: Expense evidence is optional.
- IM-062: After creating Expense, stay in the Expense list/detail context with toast and updated list.
- IM-063: Editing an Expense that is still safe to edit requires no reason. Log old/new values in Activity Log.
- IM-064: Cancelling Expense requires confirmation modal, reason, and Management Log. Expense is cancelled, not deleted.
- IM-065: Replacing Expense evidence without amount change can be a simple upload replacement with Activity Log.
- IM-066: Finance starts Rak Samuk payout from a queue of approved-price work. A payment round/PV boundary is one worker per document.
- IM-067: Before payment/PV confirmation, review worker/payee, selected work list, total, internal PV roles, and optional evidence.
- IM-068: PV number is issued only after payment is confirmed / PV is finalized.
- IM-069: PV does not need a separate `รอจ่ายเงิน` status when there is a payout round layer before PV. At PV save/finalize, the user may optionally attach a slip/evidence, but it is not required.
- IM-070: After closing/finalizing PV, return to the PV queue.
- IM-071: P0 should include a pre-PV `รอบตัดจ่าย` / `รายการรอจ่าย` layer for viewing Rak Samuk/Outsource work by person, confirming prices, and selecting work before PV creation.
- IM-072: One PV pays one payee/worker only. Do not mix multiple payees into one PV.
- IM-073: PV can be created from approved payout-round items and can also be created manually.
- IM-074: Manual PV can include custom text lines with manually entered amounts.
- IM-075: Prices from `รอบตัดจ่าย` cannot be edited inside PV. If a price is wrong, correct/confirm it in the payout-round layer before creating a new/final PV.

## 4. Unclear Areas / Follow-Up Questions

- IM-076 to IM-085 later expanded the pre-PV layer. Use IM-BATCH-004 as the newer handoff note for `รายการรอจ่าย` / `ตัดรอบจ่าย` behavior.
- Need later official docs to decide final visible labels, but the working language is now `รายการรอจ่าย` for payable/income items and `ตัดรอบจ่าย` for selecting ready items into a PV.
- Need later UX docs to clarify whether broader Outsource/payroll-style income beyond Rak Samuk is P0. Current later answer says to focus Rak Samuk first, while allowing custom income items for future flexibility.
- Need later batches to cover Product/Stock/Material interaction behavior and broader permission/no-access/override behavior.

## 5. Conflicts With Existing Docs

- Existing docs say PV number is issued after payment is confirmed; current decisions keep that rule.
- Existing docs say Finance creates, groups, and closes PV payment rounds. Current decisions clarify that the long editable list is a pre-PV payout round, not the PV document itself.
- The user briefly considered a PV `รอจ่ายเงิน` status, then replaced it with a simpler PV flow because `รอบตัดจ่าย` already covers pre-payment preparation. Official docs should not add a separate PV waiting-payment state for P0 unless reopened later.
- Existing docs say PV evidence/printed detail is deferred or light. Current decisions clarify that slip/evidence is optional at final PV save.
- Existing docs state the first automated PV flow supports Rak Samuk payout. Current decisions add that manual PV can also be created with custom text lines.

## 6. Terms Or Patterns That May Need Official Docs Updates Later

- `รอบตัดจ่าย` / `รายการรอจ่าย` as a pre-PV work layer.
- PV as the final payment document, not the editable long price-confirmation list.
- One PV = one payee/worker.
- Manual PV with custom text lines and amounts.
- Optional PV slip/evidence at final save.
- No separate P0 `รอจ่ายเงิน` PV status when payout round exists.

## 7. Possible ADR Candidates

- Possible ADR candidate: separate payout-round work from the PV document. This prevents PV from becoming an editable price-review workspace and keeps PV as a final payment document.
- Possible ADR candidate: allow manual PV with custom text lines while keeping the first automated PV source as Rak Samuk payout.

## 8. Suggested Focus For Next Batch

- Continue the payout/PV discovery in IM-BATCH-004 before moving to Product / Stock / Material interactions.
