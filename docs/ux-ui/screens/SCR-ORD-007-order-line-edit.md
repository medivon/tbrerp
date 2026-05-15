# SCR-ORD-007 - Order Line Edit

## 1. Purpose

Order Line Edit is the guarded edit mode for changing items inside an already confirmed Order. It exists because adding, removing, or changing ready-stock and custom-work lines can affect totals, stock, `JOB-O`, Shipment rounds, and history.

This screen is similar to Order Create/Edit in structure, but it edits an existing Order and must show Review Changes before saving.

## 2. Primary Users

- Admin
- Sales/admin user with Order edit permission
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Add a ready-stock item after the Order is confirmed.
- Remove or change a ready-stock item when it is still safe.
- Add ready-stock items through the same Product Model -> color/SKU Variant selector used in Order Create/Edit.
- Add a new custom-work line after the Order is confirmed.
- See custom-work lines with existing `JOB-O` as read-only and route cancellation/production changes to Job.
- Understand what totals, stock, Job, and Shipment state will change before saving.
- Reconcile financial totals before saving when an edit changes sales totals after Payment/COD records exist.

## 4. Entry Points

- Order Detail -> `จัดการออเดอร์` -> `แก้ไขรายการสินค้า`.
- Order Detail -> `จัดการออเดอร์` -> `แก้ไขงานสั่งทำ`.
- Order Detail section action for editable Order item groups.

## 5. Exit Points

- Review Changes.
- Order Detail after save.
- Order Detail if cancelled without save.
- Job Detail / Job Revision when editing existing `JOB-O` production detail.
- Shipment Detail if a line must be removed from an existing Shipment round first.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Header: `แก้ไขรายการออเดอร์`, source Order ID, current Order status.
- Main area similar to Order Create/Edit but clearly labelled as edit mode.
- Separate areas for `สินค้าพร้อมส่ง` and `งานสั่งทำ`.
- Ready-stock add/change controls select Product Model first, then enabled color/SKU Variant.
- Right or bottom impact summary showing pending changes.
- Footer actions: `กลับ` / `ยกเลิก`, and `ตรวจสอบการแก้ไข`.
- If the user leaves with unsaved changes, show a warning modal with `อยู่ต่อ` and `ออกโดยไม่บันทึก`.

Do not create a hidden autosave or Draft Order from this edit mode.

## 7. Editable Rules

Fully editable lines:

- Lines with no Job.
- Lines with no Shipment round.
- Lines that have not been sent out.

For these lines, admin may edit:

- Product/work selection.
- For ready-stock lines, Product Model and color/SKU Variant selection.
- Quantity.
- Price.
- Discount/line total where allowed.
- New custom-work detail before `JOB-O` exists.

Effects when saved from Review Changes:

- Adding a ready-stock line reserves stock immediately.
- Removing a safe ready-stock line releases reserved stock immediately.
- Changing ready-stock quantity adjusts the reserved amount by the difference.
- If the selected SKU Variant is `หมด` or the quantity exceeds `ขายได้`, show the warning immediately and again in Review Changes. Permitted users may acknowledge without Manager approval or reason; the acknowledgement is logged.
- Adding a complete custom-work line creates `JOB-O` immediately.
- Changing price/discount updates the Order net total and financial summary/outstanding amount where permission and Order state allow.
- If Payment Records or COD records already exist and the edit changes the sales total, do not edit or delete old slips. Review Changes blocks save until the edited total is reconciled with Payment Records, COD to collect, or adjustment/refund/credit notes.

Existing `JOB-O` lines:

- Do not edit production detail from this screen.
- Use Job Detail / Job Revision for changes to size, color, pattern, production instruction, or department-facing detail.
- If `JOB-O` already exists, cancellation/removal starts from Job Detail / Job cancellation first, even if production has not started.
- After Job cancellation, Order Detail keeps the cancelled custom-work line visible with reason and excludes it from active total/status/shipment selection.

Shipment-linked ready-stock lines:

- If a line is already in any Shipment round, including Draft or Released Shipment, require the user to remove it from that Shipment round or cancel the Shipment round before editing/removing it here.
- If a line has been sent out or completed, do not allow normal edit/remove from this screen.

Sent/completed lines:

- Read-only in this edit mode.
- Use service, return, stock adjustment, or financial adjustment flows later.

Mixed editable state:

- This screen may open even when some lines are blocked.
- Editable lines remain editable.
- Blocked lines remain visible as read-only rows with a clear reason such as `ส่งออกแล้ว`, `มี JOB-O แล้ว`, or `อยู่ในรอบจัดส่งแล้ว`.

## 8. Review Changes

Before saving, show `Review Changes`.

Review Changes must show only what changed:

- Added lines.
- Removed lines.
- Edited lines.
- Total impact.
- Stock impact.
- Snapshot impact for added/changed ready-stock lines: SKU code, Product Model name, color, dimensions, display image, and relevant department images.
- Job impact.
- Shipment impact.
- Reason field only for changes that require reason.
- Financial Reconciliation panel when edited sales total does not match Payment/COD/adjustment records.

Do not show the entire Order as if creating a new Order; focus on the differences and their consequences.

Review Changes actions:

- `กลับไปแก้ไข`.
- `บันทึกการแก้ไข`.
- `ยกเลิก`.

Reason rules:

- Require a reason when a line is removed, `JOB-O` is cancelled/closed, or the change affects existing Job or Shipment state. Stock-negative acknowledgement is logged but does not require a manager approval reason.
- Net total changes do not require a reason by themselves when the user already has price/amount edit permission.
- Do not require a reason for small text-only edits that do not affect totals or downstream work.

Financial Reconciliation rules:

- If edited sales total does not match recorded financial evidence/notes, disable `บันทึกการแก้ไข`.
- Provide a modal/drawer action such as `เพิ่มรายการรับเงิน / ปรับยอดการเงิน`.
- Supported first-scope reconcile types: Payment Record evidence, COD to collect, adjustment/refund/credit note.
- Refund/credit is a note/follow-up record in this scope, not a full accounting workflow.

After save:

- Return to Order Detail.
- Show a short `บันทึกการแก้ไขแล้ว` toast/banner and lightly highlight the changed section.
- Do not show a full success summary page.

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Add ready-stock line | เพิ่มสินค้าพร้อมส่ง | Admin and allowed users | Adds a new ready-stock line. | Review Changes before save |
| Add custom-work line | เพิ่มงานสั่งทำ | Admin and allowed users | Adds a new custom-work line. | Review Changes before save |
| Edit safe line | แก้ไขรายการ | Admin and allowed users | Updates a line that has no downstream work. | Review Changes before save |
| Remove safe line | ลบรายการ | Admin and allowed users | Removes a line that has no downstream work. | Review Changes before save |
| Open Job for existing `JOB-O` | เปิด Job | Admin and allowed users | Opens Job Detail / Revision / Job cancellation for production-detail changes or custom-work cancellation. | No |
| Review changes | ตรวจสอบการแก้ไข | Admin | Opens Review Changes. | No |
| Save changes | บันทึกการแก้ไข | Admin and allowed users | Applies approved changes and returns to Order Detail. | Yes, from Review Changes |
| Cancel edit | ยกเลิก | Admin | Returns to Order Detail. | Warn if unsaved changes |

## 10. Disabled States

- `รายการนี้อยู่ในรอบจัดส่งแล้ว`: line must be removed from Shipment round first.
- `รายการนี้ส่งออกแล้ว`: use service/return/adjustment flow.
- `มี JOB-O แล้ว`: production detail or cancellation must be handled in Job Detail / Revision / Job cancellation; removal from Order Line Edit is not allowed here.
- `ยอดขายกับยอดการเงินยังไม่ตรง`: reconcile Payment/COD/adjustment records before saving.
- `ไม่มีสิทธิ์แก้ไขรายการนี้`: permission blocked.

## 11. Permission and Log Rules

- Changes must log who changed what and why.
- Normal line edits may be done by users with Order edit permission.
- Stock shortage acknowledgement and price/discount edits may be done by users with the relevant Order permission and must be logged.
- Ready-stock search in this edit mode uses product name, product code, and SKU Variant code; SKU Variant code search shows the Product Model and highlights the matching color.
- Added or changed ready-stock lines store the same SKU snapshot used by Order creation.
- Cancelling an existing `JOB-O` is owned by the Job flow and requires its own reason/log there.
- Removing a line, cancelling/closing `JOB-O`, or changes that affect existing Job or Shipment state require reason. Stock-negative acknowledgement is logged without requiring a manager approval reason.
- Net total changes are logged but do not require a reason by themselves when the user has price/amount edit permission.
- Existing Payment Records stay immutable when totals change; Financial Reconciliation must be completed before saving if sales total and financial evidence/notes do not match.
- Production-affecting changes to existing `JOB-O` are not done here.
- Shipment-affecting changes are blocked until Shipment state is made safe.

## 12. What Not To Show

- Do not make this look like a new Order.
- Do not create draft/autosave edits after Order confirmation.
- Do not silently edit existing `JOB-O` production detail.
- Do not cancel or remove an existing `JOB-O` from Order Line Edit; open Job.
- Do not silently remove items from Shipment rounds.
- Do not allow sent/completed lines to be deleted from the Order.
- Do not duplicate the full payment workflow.

## 13. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ORD-007-order-line-edit.md`.
