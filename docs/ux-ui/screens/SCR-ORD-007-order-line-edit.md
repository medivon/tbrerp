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
- Add a new custom-work line after the Order is confirmed.
- Remove a custom-work line only when downstream Job state allows it.
- Understand what totals, stock, Job, and Shipment state will change before saving.

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
- Quantity.
- Price.
- Discount/line total where allowed.
- New custom-work detail before `JOB-O` exists.

Effects when saved from Review Changes:

- Adding a ready-stock line reserves stock immediately.
- Removing a safe ready-stock line releases reserved stock immediately.
- Changing ready-stock quantity adjusts the reserved amount by the difference.
- Adding a complete custom-work line creates `JOB-O` immediately.
- Changing price/discount updates the Order net total and financial summary/outstanding amount where permission and Order state allow.

Existing `JOB-O` lines:

- Do not edit production detail from this screen.
- Use Job Detail / Job Revision for changes to size, color, pattern, production instruction, or department-facing detail.
- The custom-work line may be removed only if the Job has not started production; removal cancels/closes the Job with reason and log.

Shipment-linked ready-stock lines:

- If a line is already in a Shipment round but not sent out, require the user to remove it from that Shipment round before editing/removing it here.
- If a line has been sent out or completed, do not allow normal edit/remove from this screen.

Sent/completed lines:

- Read-only in this edit mode.
- Use service, return, stock adjustment, or financial adjustment flows later.

Mixed editable state:

- This screen may open even when some lines are blocked.
- Editable lines remain editable.
- Blocked lines remain visible as read-only rows with a clear reason such as `ส่งออกแล้ว` or `JOB-O เริ่มผลิตแล้ว`.

## 8. Review Changes

Before saving, show `Review Changes`.

Review Changes must show only what changed:

- Added lines.
- Removed lines.
- Edited lines.
- Total impact.
- Stock impact.
- Job impact.
- Shipment impact.
- Reason field.

Do not show the entire Order as if creating a new Order; focus on the differences and their consequences.

Review Changes actions:

- `กลับไปแก้ไข`.
- `บันทึกการแก้ไข`.
- `ยกเลิก`.

Reason rules:

- Require a reason when net total changes, a line is removed, or the change affects Job, Shipment, or Stock.
- Do not require a reason for small text-only edits that do not affect totals or downstream work.

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
| Remove custom line with not-started `JOB-O` | ลบงานสั่งทำออกจากออเดอร์ | Authorized users | Cancels/closes the Job with reason and log. | Yes |
| Open Job | เปิด Job | Admin and allowed users | Opens Job Detail / Revision for production-detail changes. | No |
| Review changes | ตรวจสอบการแก้ไข | Admin | Opens Review Changes. | No |
| Save changes | บันทึกการแก้ไข | Admin and allowed users | Applies approved changes and returns to Order Detail. | Yes, from Review Changes |
| Cancel edit | ยกเลิก | Admin | Returns to Order Detail. | Warn if unsaved changes |

## 10. Disabled States

- `รายการนี้อยู่ในรอบจัดส่งแล้ว`: line must be removed from Shipment round first.
- `รายการนี้ส่งออกแล้ว`: use service/return/adjustment flow.
- `JOB-O เริ่มผลิตแล้ว`: production detail must be changed in Job Detail / Revision; removal from Order is not allowed here.
- `ไม่มีสิทธิ์แก้ไขรายการนี้`: permission blocked.

## 11. Permission and Log Rules

- Changes must log who changed what and why.
- Normal line edits may be done by users with Order edit permission.
- High-impact changes such as cancelling an Order, removing a custom-work line with `JOB-O`, or changing amounts after payment exists require higher permission / manager-level control.
- Removing a custom-work line with `JOB-O` requires reason.
- Changes that alter net total, remove a line, or affect Job, Shipment, or Stock require reason.
- Production-affecting changes to existing `JOB-O` are not done here.
- Shipment-affecting changes are blocked until Shipment state is made safe.

## 12. What Not To Show

- Do not make this look like a new Order.
- Do not create draft/autosave edits after Order confirmation.
- Do not silently edit existing `JOB-O` production detail.
- Do not silently remove items from Shipment rounds.
- Do not allow sent/completed lines to be deleted from the Order.
- Do not duplicate the full payment workflow.

## 13. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ORD-007-order-line-edit.md`.
