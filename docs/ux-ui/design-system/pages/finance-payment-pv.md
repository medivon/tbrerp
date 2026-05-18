# Finance, Payment, and PV Visual Guidance

Use with `docs/ux-ui/design-system/visual-design-system.md`, the active interaction behavior file, and the active finance-related screen specs.

This file gives visual guidance for:

- COD/Payment Follow-up queue
- Payment Record modal/drawer
- Evidence correction
- Financial follow-up close
- Expense Entry
- Payable Items
- Payout Clearing
- Payment Voucher
- Sensitive finance visibility
- Rough operational finance without full accounting styling

## Visual Role

Finance in the starting workflow is operational follow-up, expense tracking, and payout document preparation. It is not full accounting, tax, ledger, or audit reporting.

Use a restrained operations style: dense queues, clear evidence, clear related Order/Shipment links, and strong permission boundaries. Avoid accounting-dashboard charts, ledger-heavy styling, and finance-data leakage outside permitted areas.

## COD/Payment Follow-up Queue

Visual structure:

- Sidebar active: `รายจ่าย` or finance-permission work area.
- Header: `ติดตาม COD / Payment`.
- Summary strip: all follow-ups, COD waiting, outstanding, payment evidence, abnormal COD, resolved today.
- Filters: `ทั้งหมด`, `COD`, `ค้างชำระ`, `รอตรวจหลักฐาน`, `COD ผิดปกติ`, `ปิดแล้ววันนี้`.
- Dense table with related Order/Shipment links.
- Right drawer for selected follow-up item.

Amounts are allowed in this queue only for users with COD/Payment follow-up permission.

Visual tone:

- Treat amounts as operational values, not accounting statement numbers.
- Use warning chips for open follow-up and neutral chips for normal COD fee/deduction cases.
- Abnormal COD gets stronger warning treatment.

## Payment Record Modal / Drawer

Use a drawer when launched from Order Detail, Shipment context, or Follow-up queue.

Required fields:

- Payment date/time.
- Amount.
- Payment method.
- Evidence slip/photo.
- Related object.
- Recorder.

Visual pattern:

- Header: `บันทึกรับเงิน`.
- Context block: related Order/Shipment/follow-up.
- Form fields in a compact vertical layout.
- Evidence upload block marked required.
- Footer: save and cancel.
- After save, update the current page/drawer summary without navigating away.

Do not make missing Payment Record look like a blocker for `JOB-O` creation.

## Evidence Correction

Corrections should make old/new values visible.

Evidence-only correction:

- Drawer/modal title: `แก้ไขหลักฐานรับเงิน`.
- Show old evidence thumbnail(s), new evidence upload, reason, editor/time after save.
- Writes Management Log and does not automatically reopen a closed follow-up.

Amount correction before follow-up close:

- Show old amount, new amount, reason.
- Writes Management Log and updates follow-up summary.

Amount correction after follow-up close:

- Stronger warning style.
- Show old amount, new amount, reason, and `ต้องตรวจรายการติดตามอีกครั้ง`.
- Writes Audit Log and reopens/rechecks follow-up.

## Financial Follow-up Close

Closing follow-up is operational resolution, not full accounting approval.

Close visual pattern:

- Drawer section: `ปิดรายการติดตาม`.
- Show whether evidence exists or explanatory note is present.
- If missing, show inline blocking text.
- Confirmation should summarize the follow-up type and related object.
- After close, keep the user in the queue/drawer context and remove item from active list or move to `ปิดแล้ววันนี้`.

COD close cannot happen before the related Shipment is closed. Show blocking state: `ปิดรายการ COD ได้หลังปิดรอบจัดส่งแล้ว`.

## Expense Entry

Expense Entry should feel like simple business expense tracking.

Visual structure:

- Header: `รายการค่าใช้จ่าย`.
- Fields: `วันที่จ่ายจริง`, `หมวดรายจ่าย`, `ผู้รับเงิน/ร้านค้า`, `จำนวนเงิน`, `วิธีจ่าย`, `หลักฐาน`, `หมายเหตุ`, optional line items.
- Evidence is optional.
- Use a clean form plus list/detail layout.
- Export CSV/XLSX action belongs in the expense area and is permission-aware.

Avoid:

- Accounting journal language.
- Approval workflow visuals.
- Tax-ready document styling.
- Automatic stock linkage.

Admin/Sales may see only Expense records created by themselves or their Admin/Sales group unless broader permission exists.

## Payable Items

Payable Items are item-first. Do not visually create a payee container as the original object.

Visual structure:

- Pending payout list groups by payee/worker for review.
- Each group previews item count, missing-price count, ready total where permission allows, and latest activity.
- Item rows show source, work reference, approved price status, and eligibility.
- Items without price show `ยังไม่มีราคา` and cannot be selected for PV.

Use source chips such as `รักสมุก`, `รายได้พิเศษ`, and `กำลังตรวจรายการ`.

## Payout Clearing

`รายการรอจ่าย` / `ตัดรอบจ่าย` is the editable work area before PV.

Visual structure:

- Header names the payee/worker.
- Item table with selectable ready/priced items.
- Missing-price items visible but not selectable.
- Actions for Owner/Manager price review/edit where permitted.
- Finance can select only ready/priced items for one payee.
- Custom income can be added as a separate item with optional note/evidence.

Keep price edits in the payout layer, not in PV. If price is wrong during PV creation, route back to payout clearing.

## Payment Voucher

PV is the finalized one-payee payment document.

Visual rules:

- Use formal A4 document preview for finalized PV.
- One PV pays one payee.
- PV number appears only after payment is confirmed/finalized, such as `PV-2568-03-004`.
- Show roles: `ผู้จัดทำ`, `ผู้อนุมัติ`, `ผู้จ่ายเงิน`, `ผู้รับเงิน`.
- `ผู้รับเงิน` signature is print-oriented.
- Evidence/slip at PV finalize is optional.
- Finalized PV can be printed/reprinted from PV detail/history and payee/worker history.

Do not add a starting-workflow PV `รอจ่ายเงิน` status. Preparation lives in `รายการรอจ่าย` / `ตัดรอบจ่าย`.

Void/cancel finalized PV:

- Owner/Manager only.
- Required reason.
- Danger confirmation.
- Included items return to `รายการรอจ่าย` with trace to voided PV.

## Sensitive Finance Visibility

Hide entirely when not permitted:

- Product cost.
- Profit.
- COD/payment detail.
- Payment evidence.
- Expense details outside allowed scope.
- Rak Samuk standard rates.
- Other workers' payout.
- Audit Log detail.

Broad context can remain, such as `มีรายการติดตามการเงิน`, but without amount, evidence, or action.

Print/export must follow the same permission rules. A user without COD permission must not print a Shipping Sheet with COD amount unless they are the responsible Delivery Team for that Shipment.

## Rough Operational Finance Style

Where rough management finance is allowed, keep it operational:

- Use summary cards and tables.
- Label clearly as operational follow-up, expense, or rough profit.
- Avoid formal financial statement styling.
- Avoid tax/accounting terms not in the active docs.
- Use actual payment date for expense reporting surfaces.

## Empty, Error, and No-access States

Empty examples:

- `ไม่มีรายการ COD / Payment ต้องติดตาม`
- `ไม่มีรายการรอจ่าย`
- `ไม่มีรายการค่าใช้จ่ายตามตัวกรองนี้`

Errors:

- Missing evidence: `กรุณาแนบหลักฐานรับเงิน`.
- Abnormal COD missing note: `กรุณาใส่หมายเหตุ COD ผิดปกติ`.
- Permission: standard no-access page; do not render partial finance records with hidden columns.

## Old Mockup References

Archived finance/payment images may inform density only. They must not override the current boundary that PV is finalized one-payee output, payout clearing is the editable workspace, COD belongs only to final Shipment round, and dashboard finance amounts are hidden.
