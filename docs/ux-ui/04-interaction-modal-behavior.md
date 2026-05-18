# Interaction & Modal Behavior

This file consolidates the completed Interaction & Modal Behavior Grill Me round for P0/P1 UX behavior. It is source-of-truth UX/domain behavior, not an implementation plan, database design, API contract, issue plan, or component specification.

Source checkpoint notes were IM-001 through IM-135, now archived under `docs/archive/grill-notes/interaction-modal/`. Latest owner answers win where older docs conflict.

## Reusable Interaction Patterns

- Missing-permission actions are hidden.
- Actions blocked by current record state remain visible but disabled with a clear reason.
- Direct URL access without permission shows a no-access page with `ไม่มีสิทธิ์เข้าถึงหน้านี้` and only a return-to-own-home action.
- Opening a disallowed record detail from search/link also shows no-access; do not render the record with hidden fields.
- Sensitive fields and columns are hidden entirely, without masks, placeholders, blank labels, or disabled tooltips.
- Manager/Owner override uses the same action surface. If the action exceeds normal permission, show override confirmation and require a reason only when that action normally requires a reason.
- If permission changes while a user is editing and the user no longer has save permission, block save, notify that permission changed, then refresh or route to no-access / the user's first screen.
- Shared-queue stale state uses one pattern: notify that data changed, refresh latest record/list, and do not overwrite.
- Queue-action success defaults to staying in the queue, updating/removing the item, focusing the next item, and showing a short toast/banner unless the flow defines another destination.
- Required-field validation failure stays on the current form/modal, highlights bad fields, shows a top summary when multiple fields fail, and preserves entered data.
- Network/server save failure stays on the current form/modal, shows retry, and preserves entered data. Do not create unplanned drafts.
- Evidence/photo upload failure shows an error on the specific file with retry/remove. Save is blocked only when evidence is required by that action.
- Bulk partial success performs eligible items, then shows a result modal summarizing successes/failures with reasons and refreshes the list.

## Order Creation And Review

- Exiting Order Create/Edit or Order Review with unsaved changes uses the same guard. If a Customer exists, offer `ออกและบันทึกร่าง`, `ออกโดยไม่บันทึก`, and `อยู่ต่อ`. If no Customer exists, draft save is unavailable.
- Saving a draft from Order Review returns to the `ร่างออเดอร์` tab.
- Order Review is the final confirmation step; `ยืนยันสร้างออเดอร์` does not need a second confirmation modal.
- Multiple Order Review warnings use one acknowledgement checkbox, while the log records each warning item acknowledged.
- Stock-insufficient acknowledgement writes Activity Log.
- After `ยืนยันสร้างออเดอร์` succeeds, navigate to Order Detail with a success banner.

## Order Detail And Order Line Edit

- `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` enter the same Order Line Edit flow, focused on the selected group.
- Order Line Edit `Review Changes` is a full page before save.
- Financial Reconciliation appears as a panel inside Review Changes, with modal/drawer actions to add payment evidence, COD to collect, or explanatory adjustment/refund/credit notes.
- If a save includes any change requiring a reason, use one reason field for the save batch.
- Removing a safe ready-stock line is treated as `ยกเลิกรายการ`; the cancelled line remains visible in history and is not physically deleted.
- Price/discount edits without existing Payment/COD records do not require a reason when the user has permission, but old/new values are logged.
- Whole-Order cancellation requires a reason and an acknowledgement checkbox confirming the user understands the impact.
- Completed Order notes/correction notes are added from an inline panel on Order Detail; the user stays on the page and the note is logged.

## Production Worker Actions

- Worker actions that move the Job to the next workflow status require confirmation. Note/photo actions do not require confirmation.
- After a worker accepts work, stay on the current detail/card and update status to in progress.
- Marking work as `รอวัตถุดิบ` requires a short note describing what is missing.
- If production detail is missing or wrong, there is no system workflow, no special note action, and no log requirement. Workers ask outside the system. Do not keep this as an open question.
- Production photos/evidence are optional, including when marking ready/complete. Users may attach photos later, even after the Job is completed.
- If another user already changed the Job status, show that data changed and refresh to the latest state. Do not overwrite stale state.

## Rak Samuk

- `ส่งไปรักสมุก` opens a confirm interaction requiring immediate Rak Samuk Worker selection. No reason is required.
- After sending work to Rak Samuk succeeds, stay on Job Detail with the updated status/worker visible.
- Receiving Rak Samuk work back does not require evidence; note/photo is optional.
- `รับงานรักสมุกกลับ` routes to `รอรับเข้าโรงงานสี` in the starting workflow.
- A Rak Samuk payable item is created when work is received back / accepted into coloring successfully, not when assigned. The item may exist with `ยังไม่มีราคา`.
- Owner/Manager price edits for Rak Samuk payable items require a reason and write Management Log.
- If Owner/Manager changes a Rak Samuk payable price and the item links to SKU/Product Model, ask whether to update the Rak Samuk Standard Rate. Do not update automatically.

## Shipment And Delivery

- P0 has no `ร่างรอบจัดส่ง`. Shipment Builder is a temporary working screen. A Shipment is created only when Admin presses `พร้อมจัดส่ง`.
- If the user exits Shipment Builder after editing but before release, show `ออกโดยไม่สร้างรอบจัดส่ง` and `อยู่ต่อ`.
- Before `พร้อมจัดส่ง`, show a confirmation modal summarizing recipient/address/carrier/items/COD where relevant.
- Editing recipient/address/carrier/remarks before release does not require a reason. Log old/new values in Activity Log.
- Admin cannot edit COD amount from Shipment Builder.
- COD can be used only on the final Shipment round that makes the Order fully shipped. When ready-stock items can ship while unfinished custom work remains, COD is disabled with a reason.
- Bulk Shipment creation is allowed only for Orders with no custom-work line at all; practically, ready-stock-only Orders.
- If some selected items cannot proceed, block only those items, allow eligible items to continue, and show a modal listing blocked items.
- Before release, document preview is allowed; real print is allowed only after release.
- After `พร้อมจัดส่ง` succeeds, navigate to the admin Shipment list and focus the newly created/released Shipment.
- Delivery Team single `ส่งออกแล้ว` uses a short confirmation modal only; no evidence/note requirement and no detailed re-summary.
- Delivery Team bulk `บันทึกว่าส่งออกแล้ว` uses a modal summarizing count and selected Shipments.
- After Delivery Team marks sent-out, the Shipment leaves the active list and appears in `ส่งออกแล้ววันนี้`.
- Delivery Team can add photo/note later from `ส่งออกแล้ววันนี้` until Admin closes the Shipment.
- Admin cannot close Shipment unless it has Tracking or at least one delivery evidence photo.
- Once Tracking or evidence exists, Admin can press `ยืนยันและปิดรอบจัดส่ง` without an extra confirmation modal; evidence review is the confirmation interaction.
- After Shipment close, Admin/Sales can correct tracking/evidence. Post-close address/carrier/COD/item changes require Manager/Owner.
- Post-close tracking/evidence correction uses a correction modal/drawer showing old/new values, requires a reason, and writes Management Log.
- After closing a Shipment from `ยืนยันการจัดส่ง`, stay in / return to the confirmation queue and focus the next item.
- `รอบจัดส่งพิเศษ` starts from Owner/Manager in completed Order Detail with a reason modal plus selected items to ship. It follows normal delivery flow, is flagged as not affecting stock or Order completion, and writes Management Log.
- If a user lacks print/export permission, hide the print/export action. Printed documents follow the user's visible data.

## Payment, COD, Expense, And PV

- `บันทึกรับเงิน` opens as a modal/drawer in the current Order, Shipment, or follow-up context. Evidence is required. After save, update the current page/drawer summary without navigating away.
- A follow-up can close when there is either a Payment Record with evidence or an explanatory note sufficient for the operational audit trail.
- If actual COD is lower than expected, record actual amount, evidence, and reason, then the follow-up can close. Do not change Order total.
- If actual COD is higher than expected, record the accepted amount up to the expected amount and add an abnormal COD note. Handle excess outside the P0 workflow.
- If payment evidence changes but amount does not change, use a correction modal showing old/new evidence, require a reason, write Management Log, and do not reopen the follow-up automatically.
- If Payment Record amount changes after follow-up was closed, use a correction modal, require reason, write Audit Log, and reopen/recheck the follow-up.
- If Payment Record amount changes before follow-up is closed, require reason, write Management Log, and update the follow-up summary.
- Ordinary follow-up notes need no confirmation or reason; write Activity Log.
- After closing COD/Payment Follow-up, stay in the queue/drawer context. The item leaves the active list or appears under `ปิดแล้ววันนี้`.
- Users without payment/COD detail permission may see broad context such as `มีรายการติดตามการเงิน`, but no amount or action.
- Expense evidence is optional.
- After creating Expense, stay in the Expense list/detail context with toast and updated list.
- Editing an Expense that is still safe to edit requires no reason. Log old/new values in Activity Log.
- Cancelling Expense requires confirmation modal, reason, and Management Log. Expense is cancelled, not deleted.
- Replacing Expense evidence without amount change can be a simple upload replacement with Activity Log.

## Payable Items, Payout Clearing, And PV

- The editable payout workspace is `รายการรอจ่าย` / `ตัดรอบจ่าย`, not the PV document.
- Payable/income records are item-first. Create individual payable items, then group by payee/worker in the list. Do not create a persistent payee container first.
- P0 focuses first on Rak Samuk, while allowing custom income items for future flexibility. Do not label the area as full Payroll in P0.
- The pending payout list groups primarily by payee/worker. The user opens one person to review items.
- `รอบตัดจ่าย` / `รายการรอจ่าย` uses `กำลังตรวจรายการ` and `สร้าง PV แล้ว`. Do not add a separate `พร้อมสร้าง PV` status.
- Items without price show `ยังไม่มีราคา`; they cannot be included in PV creation.
- PV can be created from only selected ready/priced items for one payee. Items without price or not selected remain pending.
- One PV pays one payee/worker only. Multiple sources for the same payee, such as Rak Samuk and custom income, can be combined into one PV as separate lines.
- Custom income can be added with payee, item name/text, amount, optional note, and optional evidence. No reason is required on creation; write Activity Log.
- Custom income added by mistake before PV can be edited or deleted with Activity Log.
- Before payment/PV confirmation, review payee, selected work/custom lines, total, internal PV roles, and optional evidence.
- PV number is issued only after payment is confirmed / PV is finalized.
- At PV save/finalize, slip/evidence is optional. There is no separate P0 PV `รอจ่ายเงิน` status because `รายการรอจ่าย` handles preparation.
- Manual PV can include custom text lines with manually entered amounts and requires Review before save/finalize.
- Prices from `รายการรอจ่าย` cannot be edited inside PV. If a price is wrong, correct/confirm it in the payout layer before creating/finalizing PV.
- After creating/finalizing PV, included items are locked. Finalized PV can be printed/reprinted from PV detail/history and from payee/worker history where referenced.
- If a worker/payee is deactivated but still has pending payable items, payment/PV can still be processed with a `ปิดใช้งาน` badge. Do not require reactivation.
- If a finalized PV is cancelled/voided, included payout items return to `รายการรอจ่าย` with trace to the voided PV and prior price. Owner/Manager can edit the price with reason if needed.
- Cancelling/voiding a finalized PV is Owner/Manager only, requires a reason, and writes Management Log.
- P0 person-level payout history shows pending payable items plus created/voided PVs with links to open PV. Do not build a full payroll ledger in P0.

## Product, Stock, And Material

- If Product Model / color deactivation is blocked by stock, reservation, unfinished Order, unfinished Job, or unfinished Production, show a blocking modal with reasons and links to records that must be resolved.
- If Product Model / color deactivation is allowed, require confirmation modal, reason, and Management Log.
- Reopening Product Model / color uses confirmation and Management Log. No reason is required.
- Saving Product Stock Receipt uses a review modal summarizing SKU, received quantity, stock increase, and whether Payment Audit Follow-up will be created.
- After Product Stock Receipt succeeds, return to Product Purchase Order detail with the new receipt round and updated status.
- If receipt quantity exceeds remaining quantity, block inline and explain that excess goods require a new Product Purchase Order.
- Product Stock Receipt is read-only after save. If wrong, create Stock Adjustment from the receipt/movement with reference; do not edit the receipt round.
- `ปิดยอดที่เหลือ` uses a modal/page summarizing selected lines, remaining quantity, reason, and linked Stock Movement when reason is `ปรับยอดแล้ว`, then confirmation.
- If reason `ปรับยอดแล้ว` has no valid linked same-SKU Stock Count / Stock Adjustment movement with enough positive quantity, block confirmation and provide a path to create or select the correct movement.
- Product Purchase Order with no receipt can be cancelled without a reason, using confirmation modal and Activity Log.
- Closing a Product Stock Count uses a separate Review page, not a small modal. The Review page shows counted SKUs, difference rows, missing reasons, and Stock Movement effects before confirmation.
- Stock Count close is blocked until every selected SKU has `นับจริง`.
- Cancelling a Stock Count before movement creation uses a confirmation modal and writes Activity Log. No reason is required.
- One-off Product Stock Adjustment uses a confirmation modal summarizing SKU, current quantity, actual quantity, difference, and reason before saving.
- Product Stock Count / Product Stock Adjustment evidence is optional.
- After closing Stock Count, navigate to the closed Stock Count detail / read-only summary for that round.
- If a Stock Count or Stock Adjustment movement is wrong, create a new adjustment from movement/detail with reference to the previous movement. Do not edit old movement.
- Material Purchase Order receipt confirmation shows all material lines, linked Jobs that will be released from `รอวัตถุดิบ`, and the Payment Audit Follow-up that will be created.
- Material Purchase Order before receipt can be cancelled without a reason, using confirmation modal and Activity Log.
- Material Adjustment save uses a modal summarizing selected materials, before/after values, differences, reason/mode, and optional evidence before confirmation.
- After Material Adjustment succeeds, navigate to Material Adjustment summary/read-only detail for that session.
- If Material Adjustment is wrong, create a new adjustment with reference to the previous session/movement. Do not edit old movements.

## Conflicts Resolved

- Older docs allowed Draft Shipment. Latest rule: no `ร่างรอบจัดส่ง` in P0; Shipment Builder is temporary pre-release work.
- Older docs allowed COD editing in Shipment Builder and Shipment-level COD per round. Latest rule: no COD editing in Shipment Builder, and COD is only for the final Shipment round that completes delivery for the Order.
- Older docs treated PV as the editable payout workbench. Latest rule: `รายการรอจ่าย` / `ตัดรอบจ่าย` is the workbench; PV is the finalized payment document.
- Older broad Product/SKU wording said deactivate/reopen requires reason. Latest interaction rule: deactivation requires reason; reopen requires confirmation and Management Log but no reason.
- Any lingering question about missing/wrong production detail should stay closed: no system workflow, no special note, and no log requirement in the starting workflow.
