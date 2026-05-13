# THAIBORAN ERP Decision Log

This file captures confirmed decisions from the full chat discovery, including the long Q&A grilling session. It is the asked-and-answered decision layer: when the chat resolved a question, the result is captured here in business language. It is not a PRD, database design, or implementation plan.

This file works with the normal `grill-with-docs` structure:

- `CONTEXT.md` defines canonical domain terms and relationships.
- `docs/adr/` records hard-to-reverse trade-off decisions.
- `docs/decision-log.md` keeps the confirmed Q&A decision set in grouped form as a supporting log.
- `docs/qa-summary.md` restates the same discovery as handoff notes so future sessions do not restart from zero.
- `docs/ux-ui/initial-scope.md` is a supporting working note for the chosen UX/UI starting scope, not the main project structure.

Legacy material has been moved to `docs/archive/` and is not part of the active source of truth.

## Source Priority

If documents conflict, use this order:

1. Latest chat Q&A decisions
2. `CONTEXT.md` for canonical domain terms and relationships
3. ADRs under `docs/adr/` for hard-to-reverse trade-off decisions
4. This decision log for grouped confirmed decisions that support the active context

## Starting Scope

- The first UX/UI scope starts from งานสั่งทำ (Job) as the operating center.
- The first screen to design is `Admin Dashboard`.
- The scope is not a generic ERP phase 1.
- The core first-scope pain is knowing where custom work is, who should act next, which work is old or urgent, and what is ready to ship.
- Supporting areas included only as needed: Product/SKU, Ready Stock, Shipment, Rak Samuk outsource, simple Expense, Payment Voucher, Customer/CRM, and basic reporting.
- Out of first scope: full accounting, tax invoice, quotation, sales channel analytics, BOM costing, payroll automation, full QC, central media library, customer merge, carrier API, barcode/label printer, and wholesale pricing rules.

## Core Domain Terms

- `Order` is the confirmed sale record.
- `Order Entry Session` is temporary order-entry work before save or confirmation.
- `Draft Order` is a saved unfinished entry and has Draft No. but no Order ID.
- `Order Line` is an item line inside an Order.
- `Order Shipment Plan` controls whether mixed ready-stock/custom Orders ship together or may ship separately.
- `Custom Work Detail` is production-ready detail entered on a custom Order Line before it becomes `JOB-O`.
- `Job` is a custom production work unit.
- `JOB-O` is Job from customer Order.
- `JOB-P` is Job from Production.
- `Production Batch` groups internal production.
- `Production Lot` splits production by actual quantity routed through work/outsource.
- `Shipment` is a delivery round created by admin.
- `Delivery Note (ใบส่งของ)` is the item list.
- `Shipping Sheet (ใบจัดส่ง)` is the recipient/address sheet.
- `Order Completion` means all required shipments are closed.
- `Financial Follow-up` is separate from Order Completion.
- `Customer` is buyer/CRM owner.
- `Recipient` is delivery receiver.
- `Address Entry` belongs under Customer and can have recipient name and phone.

## Ownership, Permissions, and Logs

- Role + Permission must be flexible.
- Roles/positions can be created later and permissions assigned.
- Users with equal permission or higher permission can continue another user's work when the work belongs to a shared department queue.
- Owner is still stored for traceability but should not block same-permission work.
- `Order Owner` is the user who creates the real Order, not necessarily the Draft creator.
- `Shipment Owner` is the user who creates the Shipment, but `รอปิด Shipment` is a shared admin queue.
- Super Admin / highest authority can do everything and see detailed logs.
- There should be one highest-authority user initially.
- Logs have three levels:
  - `Activity Log`: normal operational history
  - `Management Log`: owner change, shipment cancel, stock adjustment, outsource rate edit
  - `Audit Log`: permissions, critical override, sensitive finance changes
- Data should be closed, archived, hidden, cancelled, or deactivated, not physically deleted.
- Images are hidden/deactivated, not physically deleted.

## Admin Dashboard

Confirmed first dashboard cards:

- `ออเดอร์กำลังดำเนินการ`
- `งานกำลังผลิต`
- `รอสร้างรอบจัดส่ง`
- `ยืนยันการจัดส่ง`
- `งานผลิตต้องติดตาม`
- `ติดตาม COD / Payment`

Rules:

- Dashboard should show cards/counts, not every task.
- Clicking a card opens the working queue.
- Admin queues are shared by role/permission.
- `ร่างออเดอร์` is under the Order page as a tab, not a dashboard card.
- `รอสร้าง Job` is not a dashboard card because complete customer custom work creates `JOB-O` during Order confirmation.
- Admin workload is accepted as heavy in first scope; UX can be simplified later.

## Draft Order and Order

- Order creation starts from `สร้างออเดอร์`; a persistent Draft Order is created only when the user chooses `บันทึกร่าง` or `ออกและบันทึก`.
- In-screen edits are temporary only; there is no persistent autosave draft after the user exits without saving.
- If the user leaves Order Create/Edit or an Order edit flow with unsaved changes, show a warning with `ออกและบันทึก` where saving a Draft Order is valid, or a context-appropriate save/discard warning for confirmed Order edits.
- Draft Order has Draft No. only after explicit save.
- Draft Order has no Order ID.
- Draft Order does not reserve stock.
- Draft Order does not create Job.
- Draft Order does not create Shipment.
- Draft Order does not enter reports.
- Draft Order can be edited by creator, same-permission users, and higher-permission users.
- When converted to Order, Draft is hidden from the active Draft UI by status rather than physically deleted.
- Order ID is created only after required entry is complete.
- No Lead/Quotation in first scope.
- Work not ready to become a real Order should stay outside the system.
- Order creation should support ready-stock lines and custom lines.
- Customer must be selected or created before adding Order Lines.
- Order entry has separate actions for `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`.
- Custom Order Lines show `รายละเอียดงานสั่งทำ` inside the Order Create/Edit screen; do not label this as `ร่าง Job` in the UI.
- Custom Work Detail must be complete enough to create `JOB-O` at Order confirmation.
- Pressing `สร้างออเดอร์` always opens the Order Review screen before confirmation.
- Order Review shows all entered information as detailed row/cards, summarised separately for ready-stock and custom work; hide the custom section when there is no custom work.
- Order Review has `กลับ`, `บันทึกร่าง`, and `ยืนยันสร้างออเดอร์`.
- `ยืนยันสร้างออเดอร์` on the Review screen does not need a second confirmation modal; the Review screen is the final confirmation step.
- Warnings and override fields, such as custom work without a Payment Record, appear inline on the Review screen and block confirmation until resolved by a permitted user.
- Confirming the Order sends admin to Order Detail immediately.
- Ready-stock lines reserve stock when the real Order is created.
- Complete custom lines create `JOB-O` immediately when the real Order is created; there is no separate customer `รอสร้าง Job` step.
- Payment Term is required on Order.
- Payment Record can be entered in the same flow but should not over-block work.
- Creating Job without payment requires permission override and reason.
- Order can have multiple Order Lines.
- Order can have multiple Shipments.
- Order can include ready-stock and custom work.
- Order Shipment Plan exists only when an Order mixes ready-stock lines and custom-work lines.
- For mixed Orders, the default Order Shipment Plan is `ส่งพร้อมกัน`; admin may choose `จัดส่งแยกได้`.
- Orders with only one line type do not need an Order Shipment Plan field.
- The Order Shipment Plan can be changed later only through the appropriate Order management or shipment-selection flow, when existing Job/Shipment state allows it.
- Order List uses tabs: `กำลังดำเนินการ`, `ออเดอร์ทั้งหมด`, `ร่างออเดอร์`, and `ปิดแล้ว / ยกเลิก`.
- `กำลังดำเนินการ` shows only real Orders that are not operationally complete, not drafts.
- Order List rows show a simple `มีงานสั่งทำ` label when the Order contains custom work.
- Main Order statuses are operational: `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `รอยืนยันการจัดส่ง`, `จัดส่งครบแล้ว`, and `ยกเลิก`.

### `ออเดอร์ทั้งหมด` Tab

- `ออเดอร์ทั้งหมด` shows all real Orders across every main Order status; it does not show Draft Orders.
- Default sort is newest created Order first.
- Default date range is all time; the user may filter by Order created date.
- Created-date quick filters are `วันนี้`, `7 วันล่าสุด`, `เดือนนี้`, `เดือนที่แล้ว`, and `กำหนดช่วงเอง`.
- Status filters use the main Order statuses: `ทั้งหมด`, `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `รอยืนยันการจัดส่ง`, `จัดส่งครบแล้ว`, and `ยกเลิก`.
- Search covers Order ID, customer name, customer/recipient phone, recipient, address/province/postal code, Job ID, and product/work name.
- Main table columns are `เลขออเดอร์`, `ชื่อลูกค้า`, `เบอร์โทร`, `รายการสินค้า`, `สถานะการจัดส่ง`, `ยอดรวม`, custom-work icon, `วันที่สร้าง`, and action.
- Do not add `ผู้สร้างออเดอร์` or `ผู้รับผิดชอบ/แอดมินเจ้าของออเดอร์` as main table columns; keep the table focused and avoid repeated traceability detail.
- The row action is only `เปิดออเดอร์`; other operational actions belong in Order Detail.
- The table row itself is not the primary click target, to reduce accidental opens.
- `สร้างออเดอร์ใหม่` appears as the page primary action and opens Order Create/Edit directly.
- Product summary is compact text: show one item line plus `+N รายการ` when needed.
- Product summary popover opens by hover/click on desktop and click on tablet/mobile.
- Product popover shows item name, quantity, and line price only where the user has price permission; do not show weight in this popover.
- When an Order has both ready-stock and custom-work lines, the product popover separates sections as `สินค้า` and `งานสั่งทำ`; if only one type exists, show the list without unnecessary section headings.
- Custom-work rows in the popover show key work detail such as size, color, and delivery date when available.
- Long popover text wraps inside a constrained popover width instead of being cut off too early or opening a modal.
- Open popovers close automatically when the user scrolls or changes pagination page.
- Shipment state in the table is a compact summary with a popover for hidden rounds/tracking detail.
- If no Shipment round exists, show `ยังไม่ได้จัดส่ง` in red text.
- If a Shipment round exists but carrier/tracking is not recorded yet, still show `ยังไม่ได้จัดส่ง` in blue text; the popover can show the Shipment round number.
- If carrier/tracking exists, show the row summary as `ชื่อขนส่ง : tracking`, for example `Kerry : xxxxx`.
- If multiple shipment rounds exist and the Order is not fully shipped, show `จัดส่งยังไม่ครบ` and use the popover for previous carrier/tracking entries.
- If multiple shipment rounds exist and shipping is complete, show the latest tracking plus `+N รอบ`, with all rounds in the popover.
- `ยอดรวม` is visible to users who have access to this Order list because admins need it when communicating with customers.
- `ยอดรวม` means net total after discount, not outstanding balance.
- The custom-work indicator appears near the end of the row before `วันที่สร้าง`; if there is no custom work, leave that area blank.
- Use a tool/hammer-style icon for the custom-work indicator with tooltip `มีงานสั่งทำ`; avoid the literal text label when space is tight.
- `วันที่สร้าง` displays as a short date only, for example `22 พ.ค. 67`.
- Cancelled Orders remain searchable but the row is visually faded.
- Completed Orders use status color/icon only; do not fade the whole row like cancelled Orders.
- Empty state after search/filter shows `ล้างตัวกรอง`; do not duplicate `สร้างออเดอร์ใหม่` inside that empty state.
- Do not include export in the first `ออเดอร์ทั้งหมด` mockup.
- Filter/search state is remembered only during the current user session; it is not a permanent user preference in first scope.
- Table page size options are `25`, `50`, and `100`, defaulting to `25`.
- All project tables should use a consistent pagination pattern with page size selector, `ก่อนหน้า`, `ถัดไป`, and page numbers; do not use infinite scroll for core data tables.

## Order Detail and Editing

- Order Detail is a read-first report screen for one real Order, not a large edit form, invoice, production dashboard, or payment workflow.
- The top header shows the two main high-level states: Order status and shipment status. Financial follow-up stays in its own section.
- The page is a single scrollable report with sections rather than tabs.
- Primary sections are summary, Order items, shipment-round management, related shipment rounds, payment summary, and short history.
- Header action is `จัดการออเดอร์`; section-level edit buttons appear where direct section editing is allowed.
- The `จัดการออเดอร์` menu contains shortcuts such as `แก้ข้อมูลผู้รับในออเดอร์นี้`, `แก้ไขรายการสินค้า`, `แก้ไขงานสั่งทำ`, `จัดการรอบจัดส่ง`, `เปิดติดตามการเงิน`, and `ยกเลิกออเดอร์`.
- Post-confirmation "Order Edit" does not mean one full edit-everything page. Order Detail remains the report center, while recipient data, Order Lines, existing `JOB-O`, Shipment rounds, and financial follow-up are edited through their own scoped flows.
- Customer master/profile editing is not a direct Order Detail action. Order Detail shows `เปิดลูกค้า` in the customer section; if master data must be edited, the user edits it from Customer Detail/Profile.
- `แก้ข้อมูลผู้รับในออเดอร์นี้` appears both in the `จัดการออเดอร์` menu and in the Order recipient/summary section.
- `แก้ข้อมูลผู้รับในออเดอร์นี้` edits only Order-specific recipient/contact/address data for future Order work; it does not silently rewrite Customer master data or existing Shipment snapshots.
- If a Shipment round already exists, its recipient/address must be edited from the Shipment screen. Order recipient changes affect future Shipment rounds only.
- If no Shipment round has been created yet, changing the main Order recipient/address automatically affects lines that use the main Order recipient; line-specific delivery overrides remain unchanged.
- Editing Order recipient detail does not need Review Changes; use a modal/drawer save with log.
- Order recipient detail can be selected from an existing Customer Address Entry or entered as a new address.
- New or modified Order recipient detail can be saved back to the Customer address book only when the user explicitly selects a checkbox such as `บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า` / `บันทึกกลับไปที่ข้อมูลลูกค้า`.
- If the Order has line-specific separate delivery addresses, `แก้ข้อมูลผู้รับในออเดอร์นี้` edits only the main Order recipient. Line-specific delivery detail is edited from that line; after the line is in a Shipment round, edit the delivery detail in the related Shipment flow.
- `รายการในออเดอร์` is shown as a clear ordered report, grouped by item type: `สินค้าพร้อมส่ง` and `งานสั่งทำ`.
- Do not use the old `งานที่เกี่ยวข้อง` label in Order Detail; use `งานสั่งทำ` when referring to custom-work lines.
- Do not create a duplicate `งานสั่งทำ` section just to repeat Jobs. Each custom-work line shows its own `JOB-O`, production status, current department, delivery date if any, and `เปิด Job`.
- If all lines ship to the main Order recipient/address, line rows only need shipment state. If a line ships separately or to a different recipient/address, show that line-specific delivery detail on the line.
- Do not put Order Shipment Plan as a primary top summary chip in Order Detail; use line shipment state and shipment-management detail instead.
- Shipment-round creation from Order Detail happens in a `จัดการรอบจัดส่ง` section below Order items.
- `จัดการรอบจัดส่ง` lets admin select ready lines and press `สร้างรอบจัดส่งจากรายการที่เลือก`; selecting multiple ready lines means combined shipment, selecting some lines means split shipment.
- For mixed Orders, the Order Shipment Plan guards what can be selected: `ส่งพร้อมกัน` blocks partial shipment until required custom/ready-stock lines are all ready; `จัดส่งแยกได้` allows ready lines to be selected first.
- If `ส่งพร้อมกัน` blocks shipment and the current state still allows a change, the `จัดการรอบจัดส่ง` section may offer `เปลี่ยนเป็นจัดส่งแยกได้` with log, because the user discovers this need while creating Shipment rounds.
- By default, select only lines that are ready to ship and not already in a Shipment round.
- Lines that cannot be selected still appear in the shipment-management section as disabled with a reason such as `ยังผลิตไม่เสร็จ`, `อยู่ในรอบจัดส่งแล้ว`, or `ส่งแล้ว`.
- Pressing `สร้างรอบจัดส่งจากรายการที่เลือก` opens Shipment Builder with the selected Order lines.
- `รอบจัดส่งที่เกี่ยวข้อง` is a report table showing Shipment No., created date, sent-out date, carrier, tracking, status, and action.
- The only action in the related Shipment table is `เปิดรอบจัดส่ง`; editing, printing, cancelling, or closing Shipment belongs inside Shipment screens.
- Payment section in Order Detail shows summary only: payment term, total, paid amount, outstanding amount, follow-up status, and `เปิดติดตามการเงิน`.
- If shipment/operational work is complete but money remains outstanding, the header still shows the operational shipment state such as `จัดส่งครบแล้ว`; outstanding payment stays in the payment section.
- History section shows a short timeline of important events only, such as Order created, Order edited, Shipment created, sent out, Shipment closed, or cancelled.
- The short history may show the latest edit reason in a compact entry such as `แก้ไขรายการออเดอร์ - เหตุผล: ลูกค้าเปลี่ยนจำนวน`; full audit detail stays outside Order Detail.
- A cancelled Order Detail is read-only. Actions that create downstream work are hidden/disabled, and the header action becomes a status label such as `ยกเลิกแล้ว`.
- A completed Order can still edit light general information such as notes or customer/contact detail where allowed, but cannot normally edit Order items or shipment-impacting fields.
- `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` open `แก้ไขรายการออเดอร์`, a full-page edit mode similar to Order Create/Edit but scoped to changing Order Lines.
- `แก้ไขรายการออเดอร์` supports adding, removing, or changing ready-stock lines and adding/removing custom-work lines, with guards based on downstream state.
- Added ready-stock lines reserve stock when saved from Review Changes. Removed safe ready-stock lines release reserved stock when saved. Quantity changes adjust the reserved amount by the difference when saved.
- Added custom-work lines create `JOB-O` when saved from Review Changes if required Custom Work Detail is complete.
- Price and discount can be changed before the Order is closed where permission allows; Review Changes shows the new net total and the financial summary/outstanding amount updates after save.
- Order lines with no Job, Shipment, or sent-out state can be edited fully, including product, quantity, price, and custom-work detail.
- Existing `JOB-O` production detail is not edited from the Order side. Changing Job production detail opens Job Detail / Job Revision.
- A custom-work line with `JOB-O` can be removed from the Order only if the Job has not started production; removing it cancels/closes the Job with reason and log.
- Ready-stock lines that are already in a Shipment round but not sent out must be removed from that Shipment round before they can be edited or removed from the Order.
- Lines that have been sent out or completed cannot be edited or removed from the Order; use service, return, or financial/stock adjustment flows later.
- `แก้ไขรายการออเดอร์` still opens even when some lines are not editable; non-editable lines remain visible as read-only with the blocking reason.
- `แก้ไขรายการออเดอร์` must show `Review Changes` before save. The review shows only changed lines, what was added/removed/edited, effects on total, stock, Job, Shipment, and a reason field.
- Review Changes has `กลับไปแก้ไข`, `บันทึกการแก้ไข`, and `ยกเลิก`. There is no draft/autosave for post-confirmation Order Line Edit; leaving with unsaved changes warns with `อยู่ต่อ` and `ออกโดยไม่บันทึก`.
- Review Changes requires a reason when a change affects net total, removes a line, or impacts Job, Shipment, or Stock. Small text-only changes that do not affect downstream work do not require a reason.
- After saving Order line changes, return to normal Order Detail with a short success toast/banner and light highlight on the changed section. Do not show a large success summary because Review Changes already confirmed the impact before save.
- `ยกเลิกออเดอร์` lives at the end of the `จัดการออเดอร์` menu as a warning action. If whole-Order cancellation is allowed, it opens a confirmation modal requiring a reason.
- Whole-Order cancellation is allowed only when nothing has been sent out and no `JOB-O` has started production. If cancellation is not allowed, disable `ยกเลิกออเดอร์` and show the blocking reason instead of opening a failed cancellation flow.
- Normal Order edits may be done by users with Order edit permission through Review Changes and reason. High-impact actions such as cancelling an Order, removing a custom line with `JOB-O`, or changing amounts after payment exists require higher permission / manager-level control.
- Do not edit or remove sent-out items from Order Line Edit, do not edit existing `JOB-O` production detail from Order Line Edit, do not create hidden draft/autosave edits after confirmation, and do not create Shipment rounds from the header without selecting lines.

## Payment Terms and Payment Records

- Payment Term is the agreement, separate from actual money received.
- Payment Record is the actual received money entry.
- Payment Records are normal admin work.
- Payment audit/confirmation is a management/audit layer and does not block normal flow in first scope.
- Payment Terms live mainly on Order.
- Shipment can carry COD amount for that delivery round.
- System may suggest COD remaining balance, but admin confirms/edits.
- If COD exceeds expected remaining amount, warn and require note, but do not necessarily block.
- Financial Follow-up is separate from operational Order Completion.
- Cancellation with money uses Financial Adjustment rather than deleting payment history.
- Financial Adjustment examples: refund, retained deposit, customer credit, pending decision.

## Order Line Replacement and Cancellation

- Before Job/Shipment/sent-out state exists, Order Lines can be edited fully in `แก้ไขรายการออเดอร์` with Review Changes and log.
- After Job or Shipment exists, use guarded cancel/replace behavior rather than overwriting the original line.
- Existing `JOB-O` production detail is edited in Job Detail / Job Revision, not in Order Line edit.
- A ready-stock line already in a Shipment round must be removed from that round before Order Line edit can change or remove it.
- Sent-out or completed Order Lines are not edited/removed from the Order; use service, return, stock adjustment, or financial adjustment flows later.
- Financial difference is handled through Financial Adjustment.
- If production already started, stock/production outcome is handled manually by authorized users.

## Job

- Job is not equal to Order.
- Job has Job Source Type: Order or Production.
- Job ID prefix should show source:
  - `JOB-O` for customer Order work
  - `JOB-P` for internal Production work
- Workshop UI should show both code and readable label:
  - `งานลูกค้า`
  - `ผลิตเข้าสต๊อก`
- `JOB-O` ends at ready for Shipment after production is done.
- `JOB-P` tied to SKU ends at stock receipt readiness.
- `JOB-P` custom/prototype can simply become Done and not enter stock.
- Job details must be complete enough before the Job enters production.
- If details change after a department accepts work, affected department must be notified.
- Revision acknowledgement flow:
  - Worker sees change
  - Worker chooses `รับทราบ` or `ไม่เข้าใจให้ติดต่อหา`
  - Admin explains if needed
  - Admin can close/confirm after real conversation if needed
- Revision history should be collapsed by default.
- Job Note is separate from Order internal note.
- Job changes that affect production must be visible to affected departments.

## Job Quantity and Splitting

- Customer Job follows `one job one done`.
- Customer Job does not support partial done or partial shipment.
- If a custom customer order must ship separately, split into separate Jobs at order entry.
- One Job may contain multiple pieces when they move together and finish together.
- Production with large quantity should use Production Batch + Production Lot instead of one huge Job.

## Job Hold and Materials

- `Hold` is admin-level pause for a Job.
- `รอวัตถุดิบ` is a department-level blocker.
- Hold should stay visible in the work list with clear label.
- Hold should not be hidden in a separate tab.
- Hold and release resets department aging.
- `รอวัตถุดิบ` can be set by Woodwork or Coloring.
- `รอวัตถุดิบ` stops department aging and tracks material-wait age separately.
- Workers should not be forced to fill complex material master data in first scope.
- Note can be simple, such as waiting for wood, gold color, or drawer rails.

## Queues and Aging

- Main production dashboard should answer:
  - งานไหนยังไม่เสร็จ
  - งานอยู่แผนกไหน
  - งานไหนด่วน
  - งานไหนเก่าค้างนาน
  - งานไหนใกล้วันจัดส่ง
- Manager view should include `JOB-O` and `JOB-P`.
- Toggle should allow all / customer work / production work.
- Job total age starts from Job creation date.
- Department age starts when department receives the work.
- Aging thresholds should be configurable, default example 15/30/60 days.
- Sort priority:
  1. Urgent work
  2. Nearest delivery date
  3. Oldest total Job age
  4. Longest department age
- Timeline in Job Detail should show key movement and responsible users.
- Workers see limited timeline relevant to their own work; managers/admin see full timeline.

## Woodwork Department

Main UI:

- `งานที่ต้องทำ`
- Secondary: `ประวัติงานของฉัน`

Actions:

- `รับงาน`
- `รอวัตถุดิบ`
- `ส่งไปสี`
- `ส่งไปรักสมุก`
- `กำลังส่งไปแกะสลัก`

Rules:

- Work list should be simple.
- Urgent uses color/icon, such as yellow and lightning.
- Abnormal statuses use color.
- When work is sent onward, it leaves the active list.
- Carving is not fully handled in first flow; woodwork can mark that pieces are being sent to carving.

## Coloring Department

Main UI:

- `งานที่ต้องทำ`
- Secondary: `ประวัติงานของฉัน`
- Secondary/section: `รอรับเข้าโรงงานสี`

Actions:

- `รับงาน`
- `รอวัตถุดิบ`
- `ส่งไปรักสมุก`
- `รับเข้าโรงงานสี`
- `งานเสร็จ/พร้อมส่ง`

Rules:

- Work from woodwork or Rak Samuk enters `รอรับเข้าโรงงานสี` before active Coloring Queue.
- Coloring/Head of Coloring should confirm intake.
- Higher permission can confirm on behalf with log.
- When Order Job is ready, it goes to admin `รอสร้าง Shipment`.
- Coloring standalone work can exist for purchased items needing color/decor only.

## Rak Samuk Outsource

- First automated outsource payment flow supports Rak Samuk only.
- Other outsource work like crystal decoration, gold leaf, carving, or special decoration is noted for future and can be recorded manually/expense for now.
- Rak Samuk Work is assigned to one Rak Samuk Worker in first scope.
- Customer Job should not split Rak Samuk work across multiple workers.
- Production large quantity should split by Production Lot.
- Woodwork marks `ส่งไปรักสมุก`; work enters shared queue `รอระบุ/ส่งรักสมุก`.
- A user with outsource permission chooses the Rak Samuk Worker and sends work.
- Rak Samuk Worker can login.
- Rak Samuk Worker sees only their own work.
- Rak Samuk Worker does not move workflow status.
- Rak Samuk Worker does not mark work complete.
- Internal staff without finance permission should not see Rak Samuk rates.
- Rak Samuk Worker can see own price for own work.
- If standard rate exists, worker cannot request price in system.
- If no rate exists, item shows `ไม่มีราคา / ให้แจ้งราคา`.
- Worker can propose price only for missing-price items.
- Finance-permission user approves proposed price.
- Standard rate lives on Product Model (SKU ใหญ่), not variant.
- Approved first rate from 0/missing can update Product Model standard rate automatically with log.
- If existing non-zero standard rate differs from paid rate, after PV process approver must choose whether to update standard rate.
- New standard rate applies only to future work.
- No retroactive price update.
- Custom Job paid rate is stored as Job cost history visible only to finance permission.
- Rak Samuk has no deadline in first scope.
- Rak Samuk can show urgent label if authorized user set it.
- Rak Samuk worker history shows:
  - รับงานกลับแล้ว / รอเข้ารอบจ่าย
  - เข้ารอบจ่ายแล้ว
  - จ่ายแล้ว
- Rak Samuk worker can see payout summary of their own work but cannot print/download in first scope.

## Production

- Production work is separate from customer Order work.
- Production Batch groups internal production.
- Production Lot splits by actual quantity sent through departments or outsource.
- Production Lot can use the same work-card pattern as Job where production needs detailed custom instructions.
- Production tied to SKU can go to `รอรับเข้าสต๊อก`.
- Production custom/prototype not tied to SKU can simply become Done.
- Creating Product/SKU from past custom work is handled through normal SKU creation with optional Job reference, not by copying data.
- Production and Order both can create Job with source type.
- UX must make `JOB-O` and `JOB-P` clear so woodwork, coloring, Rak Samuk, and admin are not confused.

## Product and SKU

- Product Model means SKU ใหญ่.
- SKU Variant means SKU ย่อย.
- SKU Variant is usually separated by color.
- Size belongs to main product definition, not variant, unless it becomes a different Product Model.
- If non-color details differ enough for selling/stocking, create new SKU.
- SKU can optionally reference a Job through lookup modal.
- Job reference is traceability only.
- SKU creation does not copy data/images from Job.
- Job reference should be optional.
- Lookup should default to Done Jobs; high permission can include not-Done Jobs with warning.
- SKU detail should show Job reference read-only and allow opening Job in new tab.
- Job detail should show SKUs created from that Job.
- One Job can be source for many SKUs.
- SKU can be deactivated only after stock is cleared.
- Deactivated SKU remains visible in history and can be reopened by permission with log.

## Product Masters

Confirmed:

- Category + optional Subcategory
- Product Tag, text-only
- Color Master
- Rak Samuk Pattern Master
- Carving Pattern Master
- Crystal Color Master

Rules:

- Product Tag master controlled by product/admin permission.
- Product Tag has no color in first scope.
- Color uses Color Master only.
- Special color should be added to Color Master, not free text.
- Pattern Master is not mandatory for sending work; it helps search/classify.
- Pattern Master can have optional sample images.
- Product/SKU can choose multiple Rak Samuk Patterns.
- Carving Pattern Master is separate from Rak Samuk Pattern Master.
- Crystal Color Master is separate.

Not in first scope:

- Material Master
- Separate sales description and production description

## Product and Job Images

- SKU has:
  - รูปหลัก
  - รูปเพิ่มเติม
  - รูปสำหรับช่างไม้
  - รูปสำหรับฝ่ายสี/ตกแต่ง
  - รูปสำหรับรักสมุก
  - รูปรีวิว through Review Album
- Department instruction images can have order and optional text.
- Job can inherit/use relevant product instruction images by default and allow additional Job images/text.
- Image upload should support drag and drop.
- Image ordering should be possible where useful.
- Mobile upload/camera attachment should work.
- Image compression/thumbnail is good if possible, but image quality matters.
- No central Media Library in first scope.
- Old 50,000 images are uploaded by users into the relevant context themselves.
- Shipment images stay in Shipment history and do not become Product/Review automatically.
- CRM Note images stay in CRM and do not become Product/Review automatically.

## Review Album

- Review Album is a review image collection.
- It can be created from SKU page.
- It can be created from Review page and linked to SKU.
- It can link to zero or many SKUs.
- It can optionally link Customer.
- It can optionally link Order.
- It can exist without SKU.
- It should have album name, multiple images, note, and optional tags later.
- No publish/private approval status in first scope.
- Review Album is separate from Product images, CRM images, Job images, and Shipment images.

## Customer and CRM

- Customer has CRM history.
- Recipient/address can differ from Customer.
- Customer must have phone.
- Customer can have multiple phone numbers.
- Customer has address list.
- One default Address Entry.
- Address Entry has recipient name and recipient phone.
- New address added during initial Order creation is saved to Customer address list automatically.
- New or modified address entered while editing `ข้อมูลผู้รับในออเดอร์นี้` after confirmation is saved back to the Customer address list only when the user explicitly chooses to do so.
- Shipment snapshots selected recipient/address data.
- Search should find Customer by:
  - Customer name
  - Customer phone
  - Recipient name
  - Recipient phone
  - Address
  - Postal code
- Search result should indicate what matched.
- Customer merge is not in first scope.
- Customer page has:
  - CRM Note Timeline
  - Order History
  - Service Case History
  - Address / Recipient History
- CRM Note is timeline style, manually created, can attach images.
- Private CRM Note is timeline style and permission-limited.
- Order/Service Case should appear as history but should not auto-create CRM Note.
- Customer Tag exists.
- Customer Tag has Public and Private types.
- Tag master controlled by CRM/Admin permission.
- Customer Tag can have color.
- Customer Tier is not in first scope.
- Wholesale rules are not in first scope.

## Shipment

- Admin creates Shipment.
- Delivery team does not create or split Shipment.
- Shipment can be Draft or released.
- Default after creation can be release to delivery team.
- Draft Shipment exists if admin is not ready.
- Items in Draft Shipment are not shipped and Order is not complete.
- Items in Draft Shipment show as already being prepared to avoid duplicate Shipment.
- If Draft Shipment is cancelled, items return to not-shipped state.
- Shipment creates Delivery Note and Shipping Sheet together.
- User can print both, Delivery Note only, or Shipping Sheet only.
- Delivery Note has item list, quantity, small image if available, and notes; no price.
- Shipping Sheet focuses on recipient, address, phone, carrier, and short item summary.
- First scope uses A4 print.
- Barcode/QR/label printer deferred.
- Ready-stock and completed Jobs appear in admin ready-to-ship queue.
- Admin ready-to-ship queue should show Orders, not loose individual chaos.
- Ready-to-ship queue uses simple central search only.
- No Hold status in ready-to-ship queue; if not ready, it stays there.
- Bulk Shipment:
  - One Order creates one Shipment.
  - Cannot include Orders with Jobs.
  - Service Case can be included if complete.
  - COD does not block; show badge.
  - Minimal summary before confirm.
  - Releases to delivery immediately.
- Delivery team tabs:
  - `รายการต้องจัดส่งวันนี้`
  - `รายการรอวันจัดส่ง`
- Shipment with no delivery date goes to today's tab.
- Future-date Shipment goes to waiting-date tab.
- On the date, it moves to today's tab.
- No overdue logic in first scope.
- Delivery team can:
  - View items, image, quantity, recipient, address, phone, carrier, notes
  - Attach required evidence
  - Mark `ส่งออกแล้ว`
  - Add short note
- Delivery team cannot:
  - Change items
  - Change address
  - Change carrier
  - Change COD
  - Close Shipment
- Admin closes Shipment after evidence/tracking review.
- Evidence types:
  - Tracking
  - รูปใบเสร็จ / รูปใบขนส่ง
  - รูปพัสดุขึ้นรถ
  - Note
- Carrier can require specific evidence in settings.

## Delivery Date

- Order may have optional main delivery date.
- Main delivery date is a default convenience for UX.
- Specific item/shipment dates may be adjusted for special cases.
- Job with delivery date should show date to relevant departments.
- Ready-stock can also have delivery date.
- Custom Job not done should never appear in delivery dashboard.
- Only completed/ready items can become Shipment.

## Service Case

- Service Case handles after-sales work after Order is closed.
- Service Case does not reopen original Order.
- First scope does not create repair Job for Service Case.
- Repair/claim work is handled by internal communication first.
- Service Case can create Service Shipment when sending items back.
- Service Shipment does not affect original Order Completion or sales total.
- Service Case payment modes:
  - ฟรี
  - มีค่าใช้จ่าย
  - รอตัดสินใจ
- Default often is free.
- Service Case states can include:
  - `รอรับของกลับ`
  - `รับของกลับแล้ว`
  - `กำลังแก้ไข/ซ่อม`
  - `พร้อมส่งกลับ`
  - `ส่งกลับแล้ว`
  - `ปิดเคส`

## Stock

- First scope uses one warehouse concept even though real locations differ.
- Some items are counted stock; some are not counted.
- Ready-stock reserves stock when Order is created.
- If Order is cancelled before Shipment, stock can be returned according to cancellation rules.
- If after Shipment creation/cancellation is operationally complex, use Stock Adjustment with reason rather than automatic correction.
- Over-reservation can be allowed by setting.
- Over-reservation warns but does not block if setting allows.
- Stock Count should exist for weekly or biweekly checking.
- Stock Count should be mobile-friendly and image-heavy.
- Smart cycle count can prioritize active/moving stock and items with positive stock.
- Stock Count should support products and materials.
- First-scope materials counted carefully include colors, drawer rails, and staples.
- Wood boards/sticks may be simpler status/note rather than detailed count.
- Low-stock alert is not full scope; summary view may exist later.
- Stock and Expense remain separate.

## Expense

- Expense Entry records business expenses simply.
- It is not full accounting.
- No approval flow.
- Categories are user-defined.
- Entry can be total-only.
- Entry can have multiple line items.
- Evidence image can be attached.
- Expense can be edited by permission with log.
- Expense can be cancelled but not deleted.
- Expense can export Excel/CSV.
- Expense does not update Stock.
- Stock In does not create Expense automatically.
- Report by actual payment date, not record creation date.

## Payment Voucher

- Payment Voucher (PV) is a general payment document type.
- First automated PV flow supports Rak Samuk payout.
- PV number is issued only after payment is confirmed.
- PV number runs by Buddhist year and month, e.g. `PV-2568-03-004`.
- PV form should be similar to the existing A4 sample.
- PV roles:
  - ผู้จัดทำ
  - ผู้อนุมัติ
  - ผู้จ่ายเงิน
  - ผู้รับเงิน
- ผู้จัดทำ/ผู้อนุมัติ/ผู้จ่ายเงิน can be digital inside system.
- ผู้รับเงิน signs printed document.
- One person can hold multiple internal PV roles in first scope.
- Exact printed detail table for Rak Samuk PV is deferred.

## Reports

First-scope reports are management summaries, not accounting statements.

Included:

- Total sales by day/week/month
- Total expenses by day/week/month
- Rough profit view: sales minus expenses
- Number of Orders
- Delivery/closed shipment view
- COD/payment follow-up view
- Unfinished Jobs by department
- Urgent/old Jobs
- Expense by category

Rules:

- Sales default by Order creation date.
- Delivery view by Shipment/Order closed date.
- Expenses by actual payment date.
- Sales channel/funnel not tracked in first scope, but system can be structured to support future channel/funnel category.

## Printing and Documents

First-scope printable documents:

- Delivery Note (ใบส่งของ)
- Shipping Sheet (ใบจัดส่ง)
- Payment Voucher (ใบสำคัญจ่าย / PV)

Deferred:

- Tax invoice
- Formal quotation
- Full accounting documents
- Label printer/QR/barcode

## Open Items Deferred on Purpose

These were discussed but intentionally not detailed now:

- Exact PV line-item layout for Rak Samuk
- Full accounting and tax flow
- Quote/Lead workflow
- Channel/funnel analytics
- Payroll
- Material Master
- Supplier deep management
- Product costing/BOM
- Full QC
- Media library
- Customer merge
- Carrier API
- Wholesale pricing rules
