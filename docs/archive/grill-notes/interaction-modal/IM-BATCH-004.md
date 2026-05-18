# Interaction & Modal Behavior Grill Notes - IM-BATCH-004

## 1. Batch Range

- IM-076 to IM-100
- Answered subset: IM-076 to IM-100
- Domain focus: payout/payable list before PV, Rak Samuk income item creation, custom income items, future payroll-compatible shape, finalized PV cancel/void behavior, Product Stock Count, Stock Adjustment, and Material Purchase Order receipt/cancel behavior.
- Status: Temporary handoff notes for later Grill Doc mode. Not official source-of-truth documentation.

## 2. Questions Answered

- IM-076: Status behavior for `รอบตัดจ่าย` / `รายการรอจ่าย`.
- IM-077: Who can edit/check/approve prices in the payout round.
- IM-078: Behavior when some payout items have no price.
- IM-079: Lock behavior after payout items are created into PV.
- IM-080: Review behavior for manual PV.
- IM-081: When Rak Samuk payable/income items are created.
- IM-082: Visibility of received Rak Samuk work that still has no price.
- IM-083: Main grouping of the pending payout list.
- IM-084: Whether custom income items can be added from the pending payout list.
- IM-085: P0 naming/scope to avoid promising full payroll.
- IM-086: Whether PV can be created when only some person-level payout items have price.
- IM-087: Edit/delete behavior for custom income before PV.
- IM-088: Reason/log behavior when Owner/Manager edits Rak Samuk price in payable list.
- IM-089: What happens to payout items when a finalized PV is cancelled/voided.
- IM-090: Who can cancel/void a finalized PV and what log/reason is required.
- IM-091: Review behavior before closing a Product Stock Count round.
- IM-092: Closing Stock Count when selected SKUs are missing actual count.
- IM-093: Cancelling Stock Count before movement creation.
- IM-094: Confirmation behavior for one-off Product Stock Adjustment.
- IM-095: Evidence requirement for Product Stock Count / Adjustment.
- IM-096: Post-success navigation after closing Stock Count.
- IM-097: Correction behavior when Stock Count / Adjustment created a wrong movement.
- IM-098: Confirmation behavior for Material Purchase Order receipt into stock.
- IM-099: Cancelling Material Purchase Order before receipt.
- IM-100: Hard-max handling and remaining-gap classification.

## 3. Decisions Captured

- IM-076: `รอบตัดจ่าย` / `รายการรอจ่าย` uses a simple status shape: `กำลังตรวจรายการ` and `สร้าง PV แล้ว`. While `กำลังตรวจรายการ`, the user opens the person/group, reviews items, and presses `สร้าง PV`. If any selected item has no price, block PV creation and show a modal listing the items without price. Do not add a separate `พร้อมสร้าง PV` status.
- IM-077: Finance can prepare payout rounds. Owner/Manager can review, edit, and approve prices directly in this payout area.
- IM-078: There is no separate "price not approved" state. The blocker is `ยังไม่มีราคา`. Items without price must wait and cannot be included in PV creation.
- IM-079: After creating a PV, items included in that PV are locked and cannot be edited, except through permitted PV cancel/void behavior if later defined.
- IM-080: Manual PV requires Review before save/finalize, showing payee, custom text lines, total, and optional slip/evidence.
- IM-081: Rak Samuk payable/income item is created when work is received back / accepted into coloring (`รับงานรักสมุกกลับ` / `รับเข้าโรงสี`) successfully, not when assigned. The item may exist with no price.
- IM-082: Received Rak Samuk work without price appears in the pending payout list with status `ยังไม่มีราคา`; it cannot be included in PV until price exists.
- IM-083: The pending payout list groups primarily by payee/worker. The user opens one person to review their items.
- IM-084: Custom income can be added from the pending payout list for one payee, with item name/text, amount, and optional note. This supports future payroll-like summaries without making P0 a full payroll system.
- IM-085: Use `รายการรอจ่าย` / `ตัดรอบจ่าย` language and focus the first workflow on Rak Samuk. Do not label the area as full `Payroll` in P0.
- IM-086: In a person's `รายการรอจ่าย` view, PV can be created from only the items that already have a price. Items with `ยังไม่มีราคา` remain pending.
- IM-087: Custom income added by mistake before PV can be edited or deleted with Activity Log.
- IM-088: Owner/Manager price edits for Rak Samuk items in `รายการรอจ่าย` require a reason and write Management Log.
- IM-089: If a finalized PV is cancelled/voided, the included payout items return to `รายการรอจ่าย` with a status/trace showing they were previously in a cancelled PV.
- IM-090: Cancelling/voiding a finalized PV is Owner/Manager only, requires a reason, and writes Management Log.
- IM-091: Closing a Product Stock Count uses a separate Review page, not a small modal. The Review page shows counted SKUs, difference rows, missing reasons, and Stock Movement effects before confirmation.
- IM-092: Stock Count close is blocked until every selected SKU has `นับจริง`.
- IM-093: Cancelling a Stock Count before movement creation uses a confirmation modal and writes Activity Log. No reason is required.
- IM-094: One-off Product Stock Adjustment uses a confirmation modal summarizing SKU, current quantity, actual quantity, difference, and reason before saving.
- IM-095: Product Stock Count / Product Stock Adjustment evidence is optional in all cases.
- IM-096: After closing Stock Count, navigate to the closed Stock Count detail / read-only summary for that round.
- IM-097: If a Stock Count or Stock Adjustment movement is wrong, do not edit the old movement. Create a new adjustment from movement/detail with reference to the previous movement.
- IM-098: Material Purchase Order receipt confirmation must show all material lines, linked Jobs that will be released from `รอวัตถุดิบ`, and the Payment Audit Follow-up that will be created.
- IM-099: Cancelling Material Purchase Order before receipt does not require a reason. Use confirmation modal and Activity Log.
- IM-100: At hard max, stop asking new questions for this round, create the checkpoint, and classify remaining gaps. The user explicitly allows opening a new continuing Grill Me round later; each future 25-question checkpoint must assess whether more questions are still necessary before continuing.

## 4. Unclear Areas / Follow-Up Questions

### Remaining Interaction & Modal Behavior Gaps

Blocking for first implementation:

- Product/SKU create/edit/deactivate interaction details: especially deactivate/reopen confirmation, blocked-deactivation modal, reason/log behavior, and where users go after success.
- Material Adjustment interaction details: review/confirmation shape, evidence behavior, post-save navigation, and correction pattern.
- Product Purchase Order / Product Stock Receipt interaction details: receive/cancel/close remaining/correction behavior where it affects stock and payment audit follow-up.
- Permission/no-access/override behavior across P0 screens: direct URL no-access, hidden vs disabled outside already-covered actions, Manager/Owner override modal/reason/log pattern.

Can be resolved during implementation without changing business rules:

- Exact toast/banner wording and whether some confirmation summaries are drawer vs page when the business decision is already clear.
- Exact labels for secondary links from read-only stock count summary to movement history.
- Exact field layout for Material PO receipt confirmation as long as it includes material lines, released Jobs, and payment follow-up impact.

Later owner review:

- Final visible label choice between `รายการรอจ่าย`, `ตัดรอบจ่าย`, and future payroll-adjacent naming.
- Whether broader non-Rak-Samuk outsource/payroll income enters P0 beyond custom income and manual PV.
- Whether finalized PV cancel/void should later escalate from Management Log to Audit Log for some high-value cases.

## 5. Conflicts With Existing Docs

- Existing docs frame the automated PV flow mostly as Rak Samuk payout. Current decisions keep Rak Samuk as the first focus but introduce a more general `รายการรอจ่าย` / `ตัดรอบจ่าย` layer that can later support custom income and payroll-like summaries.
- Existing docs may imply Finance creates/groups PV payment rounds directly. Current decisions clarify that grouping/checking happens in `รายการรอจ่าย` / `ตัดรอบจ่าย`; PV is the final payment document after items are selected and valid.
- Existing stock docs already define movement immutability; IM-097 confirms the UI correction pattern must create a new referenced adjustment.
- Existing Material PO docs already say no draft state and cancellation before receipt is allowed; IM-099 confirms no reason is required.

## 6. Terms Or Patterns That May Need Official Docs Updates Later

- `รายการรอจ่าย`: payable/income items waiting to be cleared for a payee.
- `ตัดรอบจ่าย`: selecting ready payable items for one payee to create a PV.
- `ยังไม่มีราคา`: blocker state for received Rak Samuk work that cannot enter PV yet.
- `custom income`: manually added payable item for a payee, useful for future payroll-style expansion.
- One person/payee view as the main working surface for payout clearing.
- Stock Count Review page before movement creation.
- Referenced stock correction movement for wrong stock movements.
- Material PO receipt impact confirmation across stock, waiting Jobs, and payment-audit follow-up.

## 7. Possible ADR Candidates

- Possible ADR candidate: model payout/payroll-like work as payable items grouped by payee before PV, instead of making PV the editable work list.
- Possible ADR candidate: create Rak Samuk payable items on receive-back/accept-into-coloring, not on assignment, so payout follows completed/returned work rather than assigned work.
- Possible ADR candidate: keep stock movements immutable and express corrections only as new referenced movements. Existing docs already lean this way; an ADR may be useful only if future implementation pressure tries to allow direct edits.

## 8. Suggested Focus For Next Batch Segment

- Start a new continuing Grill Me round only if needed. Suggested next focus: Product/SKU deactivate/reopen, Material Adjustment, Product Purchase Order / Product Stock Receipt correction, and cross-cutting permission/no-access/override behavior.
- At the next 25-question checkpoint, explicitly decide whether the Interaction & Modal Behavior Domain is complete enough or whether another batch is necessary.
