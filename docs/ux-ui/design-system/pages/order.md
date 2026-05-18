# Order Visual Guidance

Use with `docs/ux-ui/design-system/visual-design-system.md` and the active Order screen specs.

This file gives visual guidance for:

- Order Create/Edit
- Order Review
- Order Detail
- Order Line Edit
- Review Changes
- Financial Reconciliation panel
- Draft Order state
- Stock warning acknowledgement
- Completed Order notes/corrections
- Read-first Order Detail behavior

## Visual Role

Order screens are the admin's structured sales-to-operations bridge. They must make it clear when work is still temporary, when a saved Draft exists, when a real Order is created, and which downstream work will be affected.

Use a work-focused editor/report style, not invoice styling and not a quotation workflow.

## Order Create/Edit

Visual structure:

- Header: `สร้างออเดอร์`, draft state, and current owner/traceability where relevant.
- Main column: Customer, Address, Order Lines, Payment Term, Payment Record, Custom Work Detail.
- Sticky summary panel: completeness, item count, allowed totals, warnings, and next action.
- Separate actions: `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`.

Draft visual rules:

- Unsaved new entry shows no Draft No.
- Saved Draft Order shows a softer neutral `ร่างออเดอร์` chip and `เลขร่าง`.
- Draft No. must not look like an Order ID.
- Drafts use neutral surfaces and softer status chips because they do not reserve stock, create Job, create Shipment, or enter reports.

Ready-stock selector:

- Product Model-first layout.
- Color/SKU Variant selection inside the selected product.
- Use thumbnails and stock labels `ขายได้ X ชิ้น` or `หมด`.
- Avoid ambiguous `คงเหลือ`.

Custom line:

- Show `รายละเอียดงานสั่งทำ` as an embedded production-detail section.
- Use `จะสร้าง JOB-O / งานลูกค้า` as a preview chip only.
- Group images by `รูปหลัก`, `รูปสำหรับช่างไม้`, `รูปสำหรับฝ่ายสี/ตกแต่ง`, and `รูปสำหรับรักสมุก`.

## Order Review

Order Review is the final confirmation step. Do not add a second confirmation modal after `ยืนยันสร้างออเดอร์`.

Visual structure:

- Header: `ตรวจสอบก่อนสร้างออเดอร์`.
- Detailed read-only review cards/rows.
- Separate sections for ready-stock and custom work; hide empty sections.
- Right confirmation panel: `ผลหลังยืนยันสร้างออเดอร์`.
- Inline warning/acknowledgement block above final action.

Downstream result chips:

- `จะจองสต๊อก`
- `จะสร้าง JOB-O`
- `ยังไม่สร้างรอบจัดส่ง`

Make these consequences clearer than any decorative summary.

## Stock Warning Acknowledgement

Stock-insufficient warnings should be visually serious but operationally calm.

Use:

- Warning chip `สต๊อกไม่พอ` or `จำนวนเกินที่ขายได้`.
- Inline explanation near the affected line.
- One acknowledgement control on Review when multiple warnings exist.
- Confirmation/acknowledgement buttons: `รับทราบและสร้างออเดอร์ต่อ` where applicable, or the active screen-specific wording.

Do not require Manager approval or a reason for the stock warning acknowledgement unless active docs change. Log acknowledgement through the existing behavior.

## Order Detail

Order Detail is a read-first single-page report, not a tabbed editor.

Recommended section order:

1. `สรุปออเดอร์`
2. `รายการในออเดอร์`
3. `จัดการรอบจัดส่ง`
4. `รอบจัดส่งที่เกี่ยวข้อง`
5. `การชำระเงิน`
6. `ประวัติ`

Visual rules:

- Header shows `สถานะออเดอร์` and `สถานะจัดส่ง` separately.
- Do not put financial status in the primary header.
- `รอยืนยันการจัดส่ง` is a shipment status, not an Order status.
- Use section-level actions near the section they affect.
- Header action is `จัดการออเดอร์`, not `สร้างรอบจัดส่ง`.
- Do not use a duplicate `งานที่เกี่ยวข้อง` section.

Item rows:

- Group as `สินค้าพร้อมส่ง`, `งานสั่งทำ`, and `รายการที่ยกเลิกแล้ว`.
- Ready-stock rows show snapshotted Product Model, color/SKU, dimensions, quantity, shipment state, stock warning, and related Shipment No.
- Custom rows show work image, `JOB-O`, production status, current department, delivery date, and `เปิด Job`.
- Cancelled lines stay visible in history but use faded/neutral treatment and do not count in active totals or shipment selection.

## Shipment Management on Order Detail

The `จัดการรอบจัดส่ง` section is a selection surface.

Visual rules:

- Show selectable ready lines by default.
- Show blocked lines as disabled with reasons such as `ยังผลิตไม่เสร็จ`, `อยู่ในรอบจัดส่งแล้ว`, or `ส่งแล้ว`.
- Do not hide blocked lines; the user needs to understand why they cannot ship them.
- Primary action: `สร้างรอบจัดส่งจากรายการที่เลือก`.
- Selecting multiple ready lines should visually read as one combined Shipment round.
- Selecting some ready lines should visually read as split shipment by selection, not a separate heavy workflow switch.

## Order Line Edit

Order Line Edit is a guarded edit mode, visually parallel to Order Create/Edit but clearly not a new Order.

Visual structure:

- Header: `แก้ไขรายการออเดอร์`, source Order ID, current status.
- Separate areas for `สินค้าพร้อมส่ง` and `งานสั่งทำ`.
- Existing blocked lines remain visible read-only with reason chips.
- Right/bottom impact summary shows pending changes.
- Footer action: `ตรวจสอบการแก้ไข`.

Do not create hidden drafts or autosaves. Unsaved exit warning uses `อยู่ต่อ` / `ออกโดยไม่บันทึก`.

## Review Changes

Review Changes should show differences and consequences, not the whole Order again.

Show:

- Added lines.
- Removed/cancelled lines.
- Edited lines.
- Total impact.
- Stock impact.
- Job impact.
- Shipment impact.
- Snapshot impact for changed ready-stock lines.
- Required reason field only when a change requires it.

Actions:

- `กลับไปแก้ไข`
- `บันทึกการแก้ไข`
- `ยกเลิก`

After save, return to Order Detail with a short success banner and light highlight on changed sections.

## Financial Reconciliation Panel

When totals change after Payment/COD records exist, show a blocking panel inside Review Changes.

Visual pattern:

- Title: `ตรวจยอดการเงิน`.
- Difference summary: old total, new total, recorded evidence/notes.
- Disabled `บันทึกการแก้ไข` until reconciled.
- Actions open modal/drawer for `เพิ่มรายการรับเงิน / ปรับยอดการเงิน`, COD to collect, or adjustment/refund/credit note.

Do not turn this panel into full accounting. It is an operational reconciliation gate for saving the edit.

## Completed and Cancelled Orders

Cancelled Orders:

- Read-only surface.
- Faded row/list treatment.
- Replace normal management actions with `ยกเลิกแล้ว`.
- Keep Payment Records visible by permission and show refund/credit follow-up note where relevant.

Completed Orders:

- Original Order snapshot is stable.
- Normal item, recipient, and shipment-impacting edits are not available.
- Notes/correction records can be added through a modest inline panel.
- Owner/Manager-only `รอบจัดส่งพิเศษ` is a clearly flagged exception with required reason and `ไม่กระทบสต๊อก / ไม่กระทบสถานะออเดอร์` language.

## Error and Permission States

- Missing permission: standard no-access page.
- State-blocked action: disabled action plus reason.
- Save conflict: stale-state banner and refresh.
- Required-field errors: field-level and top summary when multiple.
- Custom detail incomplete: route back to the relevant custom-work section.

## Old Mockup References

Archived Order mockups may inform only density and broad card/table composition. Current specs override older tabbed layouts, full-page edit assumptions, and any visual that implies drafts reserve stock, payment blocks `JOB-O`, or Shipment is created from Review.
