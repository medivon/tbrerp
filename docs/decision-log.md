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

- Call the first usable operating mode `โหมดเริ่มใช้งานจริง`, not MVP.
- The first UX/UI scope starts from งานสั่งทำ (Job) as the operating center.
- The first screen to design is `Admin Dashboard`.
- The scope is not a generic ERP phase 1.
- The core first-scope pain is knowing where custom work is, who should act next, which work is old or urgent, and what is ready to ship.
- Supporting areas included only as needed: Product/SKU, Ready Stock, Light Material Stock, Material Purchase Order, Shipment, Rak Samuk outsource, simple Expense, Payment Voucher, Customer/CRM, and basic reporting.
- Out of first scope: full accounting, tax invoice, quotation, sales channel analytics, BOM costing, full Material Master/warehouse/BOM consumption beyond Light Material Stock, payroll automation, full QC, central media library, customer merge, carrier API, barcode/label printer, and wholesale pricing rules.

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
- `Customer Tier` is the configurable broad customer level used for CRM context and optional simple default order discounts.
- `Customer Social Contact` is optional platform/contact identity text for future message integration, starting with Facebook.
- `Customer Sales Summary` is a maintained customer summary value updated after qualifying Orders are completed.
- `Address Entry` belongs under Customer and has recipient name, recipient phone, and structured address fields.

## Ownership, Permissions, and Logs

- Role + Permission must be flexible.
- Roles/positions can be created later and permissions assigned.
- Users with equal permission or higher permission can continue another user's work when the work belongs to a shared department queue.
- Owner is still stored for traceability but should not block same-permission work.
- Owner, Current Handler, and Action Log are separate concepts:
  - Owner is the creator or primary traceability person.
  - Current Handler is the user, department, or shared queue responsible for the next action.
  - Action Log records the user who performed each action.
- First-scope performance reporting does not need to score users deeply, but the data must preserve those three meanings for later reporting.
- `Order Owner` is the user who creates the real Order, not necessarily the Draft creator.
- `Shipment Owner` is the user who creates the Shipment, but `รอปิด Shipment` is a shared admin queue.
- Super Admin / highest authority can do everything and see detailed logs.
- There should be one highest-authority user initially.
- Sensitive operational data is hidden from users without the matching permission, not merely disabled. Examples include product cost, profit, COD/payment detail, Rak Samuk rates outside the worker's own price, other workers' payout, and Audit Log detail.
- Normal operational context may remain visible while actions are hidden or disabled by permission, such as seeing that a Shipment is waiting for confirmation without being able to close it.
- Logs have three levels:
  - `Activity Log`: normal operational history
  - `Management Log`: owner change, shipment cancel, stock adjustment, outsource rate edit
  - `Audit Log`: permissions, critical override, sensitive finance changes
- Data should be closed, archived, hidden, cancelled, or deactivated, not physically deleted.
- Images are hidden/deactivated, not physically deleted.

## Admin Dashboard

Confirmed first dashboard cards:

- `ออเดอร์ที่ต้องติดตาม`
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
- Draft Order cannot be saved until a Customer has been selected or created.
- Draft Order has Draft No. only after explicit save.
- Draft Order has no Order ID.
- Draft Order does not reserve stock.
- Draft Order does not create Job.
- Draft Order does not create Shipment.
- Draft Order does not enter reports.
- Draft Order can be edited by creator, same-permission users, and higher-permission users.
- If the Customer on a Draft Order is later deactivated, the Draft Order can still be opened, but it cannot be confirmed into a real Order until the Customer is reactivated or changed.
- When converted to Order, Draft is hidden from the active Draft UI by status rather than physically deleted.
- Order ID is created only after required entry is complete.
- No Lead/Quotation in first scope.
- Work not ready to become a real Order should stay outside the system.
- Order creation should support ready-stock lines and custom lines.
- Customer must be selected or created before adding Order Lines.
- Order entry has separate actions for `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`.
- Ready-stock lines can be added in Order Create/Edit even if stock is insufficient, but the line must show a warning and the issue must be fixed or acknowledged on Review before confirmation.
- Order Create/Edit never reserves stock; stock reservation happens only after `ยืนยันสร้างออเดอร์` on Review.
- Custom Order Lines show `รายละเอียดงานสั่งทำ` inside the Order Create/Edit screen; do not label this as `ร่าง Job` in the UI.
- Custom Work Detail must be complete enough to create `JOB-O` at Order confirmation.
- Custom Work Detail completeness means at least work name/detail, quantity, price, required size/material/color detail, reference images/files where available, and delivery date where relevant.
- Order Review can open with incomplete custom-work lines for review, but `ยืนยันสร้างออเดอร์` is disabled until required custom-work detail is complete.
- Pressing `สร้างออเดอร์` always opens the Order Review screen before confirmation.
- Order Review shows all entered information as detailed row/cards, summarised separately for ready-stock and custom work; hide the custom section when there is no custom work.
- Order Review has `กลับ`, `บันทึกร่าง`, and `ยืนยันสร้างออเดอร์`.
- `ยืนยันสร้างออเดอร์` on the Review screen does not need a second confirmation modal; the Review screen is the final confirmation step.
- Warning acknowledgement controls appear inline on the Review screen and block confirmation until resolved when they affect confirmation, such as stock-insufficient ready-stock lines.
- Customer Tier discount rounding belongs to Order Create/Review, not Customer master: calculate the discount in baht and round to whole baht at the Order total summary.
- If a user with Order create/confirm permission acknowledges stock-insufficient confirmation, the ready-stock reservation is allowed to make stock go negative. This keeps the shortage visible instead of hiding it.
- Confirming the Order sends admin to Order Detail immediately.
- Ready-stock lines reserve stock when the real Order is created.
- Complete custom lines create `JOB-O` immediately when the real Order is created; there is no separate customer `รอสร้าง Job` step.
- Payment Term is required on Order.
- Payment Record can be entered in the same flow and shown on Review when present, but it does not block Order confirmation or `JOB-O` creation.
- Creating `JOB-O` does not require a Payment Record or payment override; payment follow-up remains separate.
- Order can have multiple Order Lines.
- Order can have multiple Shipments.
- Order can include ready-stock and custom work.
- Order Shipment Plan exists only when an Order mixes ready-stock lines and custom-work lines.
- For mixed Orders, the default Order Shipment Plan is `ส่งพร้อมกัน`. In practice, split shipment is handled by selecting only ready lines when creating Shipment rounds; do not turn `ส่งพร้อมกัน/จัดส่งแยก` into a separate heavy workflow.
- Orders with only one line type do not need an Order Shipment Plan field.
- Do not require users to change a separate shipment-plan setting just to split a Shipment; selected ready lines are the practical split/combined shipment control.
- Order List uses tabs: `ออเดอร์ที่ต้องติดตาม`, `ออเดอร์ทั้งหมด`, `ร่างออเดอร์`, and `ปิดแล้ว / ยกเลิก`.
- `ออเดอร์ที่ต้องติดตาม` shows only real Orders that are not operationally complete or have operational follow-up needed, not drafts.
- `ออเดอร์ที่ต้องติดตาม` sorts primarily by urgency: overdue/near due, waiting too long, blocked, then created date.
- `ออเดอร์ที่ต้องติดตาม` is a follow-up/filter page only. It does not create Shipment rounds directly; users open Order Detail to manage selected lines and downstream actions.
- Order List rows show a simple `มีงานสั่งทำ` label when the Order contains custom work.
- Main Order statuses are operational and calculated from active Order Lines: `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `จัดส่งครบแล้ว`, and `ยกเลิก`.
- `รอยืนยันการจัดส่ง` is a Shipment round / shipment-summary state, not a main Order status.
- Order List and Order Detail separate `สถานะออเดอร์` from `สถานะการจัดส่ง`.
- `ส่งบางส่วน` means at least one active deliverable line has completed delivery recording with tracking/evidence, while at least one other active line is not completed.
- `จัดส่งครบแล้ว` means all active deliverable lines have completed delivery recording with tracking/evidence; Payment Records and financial follow-up do not affect this status.
- `พร้อมสร้างรอบจัดส่ง` means at least one active line is ready to ship and is not in any Shipment round. This includes reserved ready-stock and completed `JOB-O`.
- If an Order has some lines delivered and other lines still producing, the Order status is `ส่งบางส่วน`.
- Cancelled Order Lines are history and do not participate in active Order status calculation.

### `ออเดอร์ทั้งหมด` Tab

- `ออเดอร์ทั้งหมด` shows all real Orders across every main Order status; it does not show Draft Orders.
- Default sort is newest created Order first.
- Default date range is all time; the user may filter by Order created date.
- Created-date quick filters are `วันนี้`, `7 วันล่าสุด`, `เดือนนี้`, `เดือนที่แล้ว`, and `กำหนดช่วงเอง`.
- Order status filters use the main Order statuses: `ทั้งหมด`, `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `จัดส่งครบแล้ว`, and `ยกเลิก`.
- Shipment-summary filters may include shipment states such as `รอยืนยันการจัดส่ง`, but they should not be treated as Order status filters.
- Search covers Order ID, customer name, customer/recipient phone, recipient, address/province/postal code, Job ID, and product/work name.
- Main table columns are `เลขออเดอร์`, `ชื่อลูกค้า`, `เบอร์โทร`, `รายการสินค้า`, `สถานะออเดอร์`, `สถานะการจัดส่ง`, `ยอดรวม`, custom-work icon, `วันที่สร้าง`, and action.
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
- If a Shipment round has been sent out but admin confirmation/evidence is pending, show `รอยืนยันการจัดส่ง` in `สถานะการจัดส่ง`.
- If carrier/tracking exists, show the row summary as `ชื่อขนส่ง : tracking`, for example `Kerry : xxxxx`.
- If a closed Shipment round has no tracking but has `รูปหลักฐานจัดส่ง`, show `ส่งแล้ว` as the compact Shipment Summary and show carrier/evidence in the popover/detail.
- If multiple shipment rounds exist and the Order is not fully shipped, show `จัดส่งยังไม่ครบ` and use the popover for previous carrier/tracking entries.
- If multiple shipment rounds exist and shipping is complete, show the latest closed round as the compact summary: latest tracking plus `+N รอบ`, or `ส่งแล้ว +N รอบ` if the latest closed round has no tracking.
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

### Customer and Address Selection During Order Entry

- `ORD-002 Customer Search / Select` is the customer selection step inside Order creation, not the full Customer List / CRM module.
- Customer search shows all matching active Customers, even if some records look duplicated. Duplicate cleanup belongs in Customer/CRM and must not block Order creation.
- Customer search should at minimum support customer name, customer primary phone, Social/Facebook, postal code, recipient name, recipient phone, province, and tag, and should indicate which field matched.
- If no Customer is found, admin can create a Customer inside the Order flow only when the Order-required Customer data is complete: customer name, primary phone, house/address detail, subdistrict, district, province, and postal code.
- In the Customer/CRM module, a Customer may temporarily show `ข้อมูลที่อยู่ยังไม่ครบ`, but that Customer cannot be used to create a real Order until the required data is complete.
- Deactivated Customers are not shown in the Order Create Customer selector.
- `ORD-003 Address Entry Select/Create` defaults to the Customer's primary address.
- If the Customer has multiple addresses, show a clear `เปลี่ยนที่อยู่จัดส่ง` action to choose another address or add a new address.
- A newly entered or edited address from Order-facing screens can be saved back to the Customer address book only through an explicit choice such as `บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า`.
- Shipment recipient/address remains a Shipment snapshot and does not silently update the Customer address book. If the Shipment address is clearly different from existing Customer addresses, ask whether to save it as a secondary Address Entry for that Customer.

### Draft Order Queue

- `ร่างออเดอร์` lists only saved active Draft Orders.
- Converted Draft Orders are archived/read-only and hidden from the active draft queue.
- Draft Owner is traceability only, not a lock. Any user with permission to create/edit Orders can continue an active Draft Order.

### Closed / Cancelled Orders Queue

- `ปิดแล้ว / ยกเลิก` includes real Orders that are operationally closed/completed and real Orders that are cancelled.
- It does not include Draft Orders.
- Orders opened from this tab are read-first/read-only by default, while related Job, Shipment, Payment follow-up, and history links may still be opened.
- Edit, shipment-creation, and repeated cancellation actions are disabled or hidden according to the closed/cancelled state.
- `ปิดแล้ว / ยกเลิก` reuses the `ออเดอร์ทั้งหมด` table/layout with the tab/filter applied. It does not need a separate screen design unless future behavior diverges.

## Order Detail and Editing

- Order Detail is a read-first report screen for one real Order, not a large edit form, invoice, production dashboard, or payment workflow.
- The top header shows the two main high-level states: Order status and shipment status. Financial follow-up stays in its own section.
- The page is a single scrollable report with sections rather than tabs.
- Primary sections are summary, Order items, shipment-round management, related shipment rounds, payment summary, and short history.
- Header action is `จัดการออเดอร์`; section-level edit buttons appear where direct section editing is allowed.
- The `จัดการออเดอร์` menu contains shortcuts such as `เปิดลูกค้า`, `แก้ไขรายการสินค้า`, `แก้ไขงานสั่งทำ`, `จัดการรอบจัดส่ง`, `เปิดติดตามการเงิน`, and `ยกเลิกออเดอร์`.
- Post-confirmation "Order Edit" does not mean one full edit-everything page. Order Detail remains the report center, while recipient data, Order Lines, existing `JOB-O`, Shipment rounds, and financial follow-up are edited through their own scoped flows.
- Customer master/profile editing is not a direct Order Detail action. Order Detail shows `เปิดลูกค้า` in the customer section; if master data must be edited, the user edits it from Customer Detail/Profile.
- Customer Detail stores the Customer's address book and default address. Order Detail should open Customer Detail when master customer/address data must be changed.
- A confirmed Order keeps its own Order Recipient Detail snapshot. Later changes to Customer Detail do not rewrite the old Order.
- Shipment Builder uses the Order Recipient Detail snapshot as the default for a new Shipment round, but the user can enter recipient/address/carrier data specifically for that Shipment round.
- Shipment recipient/address edits are Shipment snapshots; they do not silently rewrite Customer master data or the Order.
- If a Shipment round already exists, its recipient/address must be edited from the Shipment screen.
- Line or round-specific delivery detail belongs to the Shipment flow once a Shipment round exists.
- `รายการในออเดอร์` is shown as a clear ordered report, grouped by item type: `สินค้าพร้อมส่ง` and `งานสั่งทำ`.
- Do not use the old `งานที่เกี่ยวข้อง` label in Order Detail; use `งานสั่งทำ` when referring to custom-work lines.
- Do not create a duplicate `งานสั่งทำ` section just to repeat Jobs. Each custom-work line shows its own `JOB-O`, production status, current department, delivery date if any, and `เปิด Job`.
- If `JOB-O` is cancelled or closed from the Job side, Order Detail reflects that latest Job status on the custom-work line and keeps the relationship/history visible.
- If all lines ship to the main Order recipient/address, line rows only need shipment state. If a line ships separately or to a different recipient/address, show that line-specific delivery detail on the line.
- Do not put Order Shipment Plan as a primary top summary chip in Order Detail; use line shipment state and shipment-management detail instead.
- Shipment-round creation from Order Detail happens in a `จัดการรอบจัดส่ง` section below Order items.
- `จัดการรอบจัดส่ง` lets admin select ready lines and press `สร้างรอบจัดส่งจากรายการที่เลือก`; selecting multiple ready lines means combined shipment, selecting some lines means split shipment.
- For mixed Orders, `ส่งพร้อมกัน` is the default intent, but actual split or combined shipment is controlled by the selected ready lines in `จัดการรอบจัดส่ง`.
- Selecting multiple ready lines means combined shipment. Selecting only some ready lines means split shipment. Avoid adding a heavy separate "change shipment plan" workflow unless a later shipment design needs it.
- By default, select only lines that are ready to ship and not already in a Shipment round.
- Lines that cannot be selected still appear in the shipment-management section as disabled with a reason such as `ยังผลิตไม่เสร็จ`, `อยู่ในรอบจัดส่งแล้ว`, or `ส่งแล้ว`.
- Pressing `สร้างรอบจัดส่งจากรายการที่เลือก` opens Shipment Builder with the selected Order lines.
- The handoff to Shipment Builder includes recipient name, address, phone, selected delivery items, each item's main image, quantity, and carrier name when already chosen.
- Item images in Shipment Builder use the main product/work image; this flow does not require selecting or uploading delivery-specific item images.
- `รอบจัดส่งที่เกี่ยวข้อง` is a report table showing Shipment No., created date, sent-out date, carrier, tracking, status, and action.
- The only action in the related Shipment table is `เปิดรอบจัดส่ง`; editing, printing, cancelling, or closing Shipment belongs inside Shipment screens.
- Payment section in Order Detail shows summary only: payment term, total, paid amount, outstanding amount, follow-up status, and `เปิดติดตามการเงิน`.
- If shipment/operational work is complete but money remains outstanding, the header still shows the operational shipment state such as `จัดส่งครบแล้ว`; outstanding payment stays in the payment section.
- History section shows a short timeline of important events only, such as Order created, Order edited, Shipment created, sent out, Shipment closed, or cancelled.
- The short history may show the latest edit reason in a compact entry such as `แก้ไขรายการออเดอร์ - เหตุผล: ลูกค้าเปลี่ยนจำนวน`; full audit detail stays outside Order Detail.
- A cancelled Order Detail is read-only. Actions that create downstream work are hidden/disabled, and the header action becomes a status label such as `ยกเลิกแล้ว`.
- A completed Order can still edit light general information such as notes or customer/contact detail where allowed, but cannot normally edit Order items or shipment-impacting fields.
- `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` open `แก้ไขรายการออเดอร์`, a guarded edit mode/sub-flow from Order Detail. It may use a full-page layout for clarity, but it is not a standalone module or Draft Order.
- `แก้ไขรายการออเดอร์` supports adding, removing, or changing ready-stock lines and adding/removing custom-work lines, with guards based on downstream state.
- Added ready-stock lines reserve stock when saved from Review Changes. Removed safe ready-stock lines release reserved stock when saved. Quantity changes adjust the reserved amount by the difference when saved.
- Added custom-work lines create `JOB-O` when saved from Review Changes if required Custom Work Detail is complete.
- Price and discount can be changed before the Order is closed where permission allows; Review Changes shows the new net total and the financial summary/outstanding amount updates after save.
- If price/discount/total changes after Payment Records or COD records already exist, preserve received-money correction history and block saving until the edited Order total is reconciled with financial records or adjustment notes.
- Review Changes should show a blocking Financial Reconciliation panel when the new sales total does not match the financial evidence/notes. The user can add Payment Record evidence, COD to collect, or adjustment/refund/credit notes in a modal/drawer before saving.
- Additional COD caused by an Order edit is tracked first against the Order as financial/COD follow-up, then can be pulled into a later Shipment round when appropriate.
- Order lines with no Job, Shipment, or sent-out state can be edited fully, including product, quantity, price, and custom-work detail.
- Existing `JOB-O` production detail is not edited from the Order side. Changing Job production detail opens Job Detail / Job Revision.
- If a custom-work line already has `JOB-O`, cancelling or removing that work must start from Job Detail / Job cancellation, even if production has not started. Order Detail then reflects the cancelled Job state and reason on the custom-work line.
- Job cancellation does not automatically change Order sales totals. Admin must adjust Order/financial records through the appropriate Order Line Edit / Review Changes / Financial Reconciliation flow when money or total needs to change.
- Ready-stock lines that are already in any Shipment round, including Draft or Released Shipment, must be removed from or have that Shipment round cancelled before they can be edited or removed from the Order.
- Lines that have been sent out or completed cannot be edited or removed from the Order; use service, return, or financial/stock adjustment flows later.
- `แก้ไขรายการออเดอร์` still opens even when some lines are not editable; non-editable lines remain visible as read-only with the blocking reason.
- `แก้ไขรายการออเดอร์` must show `Review Changes` before save. The review shows only changed lines, what was added/removed/edited, and effects on total, stock, Job, and Shipment.
- Review Changes has `กลับไปแก้ไข`, `บันทึกการแก้ไข`, and `ยกเลิก`. There is no draft/autosave for post-confirmation Order Line Edit; leaving with unsaved changes warns with `อยู่ต่อ` and `ออกโดยไม่บันทึก`.
- Review Changes requires a reason for removing a line, cancelling/closing `JOB-O`, or changes that affect existing Job or Shipment state. Stock-negative acknowledgement is logged but does not require a manager approval reason.
- Net total changes do not require a reason by themselves when the user already has price/amount edit permission.
- After saving Order line changes, return to normal Order Detail with a short success toast/banner and light highlight on the changed section. Do not show a large success summary because Review Changes already confirmed the impact before save.
- `ยกเลิกออเดอร์` lives at the end of the `จัดการออเดอร์` menu as a warning action. If whole-Order cancellation is allowed, it opens a confirmation modal requiring a reason.
- Whole-Order cancellation is allowed directly only when there are no sent-out lines and no active downstream Job/Shipment blockers. If active `JOB-O` or Shipment rounds exist, cancel those through their owning flows first.
- If the last active Order Line is cancelled and nothing has been shipped, show a confirmation modal that cancelling the final line also cancels the whole Order, requiring reason/log.
- If some lines have already completed delivery and the remaining active lines are cancelled, the Order status becomes `จัดส่งครบแล้ว`; cancelled lines remain history.
- Normal Order edits may be done by users with Order edit permission through Review Changes and reason where required. High-impact actions such as cancelling an Order, removing a custom line with `JOB-O`, or changing amounts after payment exists require the configured permission for that action.
- Do not edit or remove sent-out items from Order Line Edit, do not edit existing `JOB-O` production detail from Order Line Edit, do not create hidden draft/autosave edits after confirmation, and do not create Shipment rounds from the header without selecting lines.

## Payment Terms and Payment Records

- Payment Term is the agreement, separate from actual money received.
- Payment Record is the actual received money entry.
- Payment Records are normal admin work.
- Payment audit/confirmation is a management/audit layer and does not block normal flow in first scope.
- Payment Records do not approve or block `JOB-O` creation. `JOB-O` creation depends on Order confirmation and complete Custom Work Detail, not on payment state.
- Payment Records can be corrected later, but not silently: the system must keep old value, new value, reason, editor, edit time, and make the correction visible to the finance follow-up context.
- Payment Record requires evidence in the starting workflow.
- Minimum Payment Record fields are payment date/time, amount, payment method, evidence slip/photo, related Order/Shipment/Service Case or follow-up context, and recorder.
- Payment Method is a controlled list, with `โอนเงิน` as the default method.
- A deposit is just a partial Payment Record; do not create a separate deposit module in the starting workflow.
- Order total edits are the exception where Financial Reconciliation can block save: the edited sales total must line up with Payment Records, COD to collect, or adjustment/refund/credit notes before `บันทึกการแก้ไข` is enabled.
- Refund from Service Case is recorded as Expense Entry only, with the Service Case carrying the reference/context. It does not change the original Order or Customer Sales Summary in the starting workflow.
- Whole-Order cancellation is not blocked by existing Payment Records. If money may need refund/credit later, Order Detail shows a financial note/follow-up placeholder instead of changing or hiding the Payment Record.
- Payment Terms live mainly on Order.
- Shipment can carry COD amount for that delivery round.
- System may suggest COD remaining balance, but admin confirms/edits.
- COD follow-up is created automatically when a Shipment carries COD.
- COD follow-up cannot be closed before the related Shipment is closed, even if the money is already confirmed.
- If actual COD is lower than expected, record the actual amount and reason, such as carrier fee deduction; this does not change the Order total.
- COD should not normally exceed the expected amount. If it happens, treat it as an abnormal note/correction case rather than a heavy approval workflow or automatic extra income.
- Financial Follow-up is separate from operational Order Completion.
- A finance-permission user can close a Financial Follow-up item when required payment evidence or an explanatory note is enough for the operational audit trail. This is not a full accounting approval flow in the starting workflow.
- Cancellation with money keeps Payment Records visible and may create a financial follow-up note for later refund/credit handling.
- Financial Reconciliation examples during Order edits: added Payment Record evidence, COD to collect, refund/credit note, retained deposit note, customer credit note, pending decision note where allowed.

## Finance Scope

- Starting finance scope is operational payment follow-up only, including COD, payment follow-up, refund expense, Expense Entry, and Payment Voucher.
- The primary finance work object is Financial Follow-up.
- Payment Audit Follow-up for product/material purchases is a reminder to inspect or record later payment; it is not automatic Expense Entry and not full accounts payable.
- Product Purchase Order creates Payment Audit Follow-up only when the purchase document is fully received.
- Material Purchase Order creates Payment Audit Follow-up when the whole material purchase document is received into stock.
- Payment Audit Follow-up does not create Expense Entry automatically; finance records payment/expense deliberately.
- Purchase-payment mistakes are corrected by finance notes/follow-up corrections with old and new evidence kept visible; do not silently edit old payment or recreate purchase documents.
- Expense Entry does not affect stock automatically, and stock-in does not create Expense Entry automatically.
- Expense Entry has no approval flow in the starting workflow.
- Expense Entry may have optional line items or be total-only.
- Expense Categories are user-defined, not a full chart of accounts.
- Expense reports use actual payment date, not record creation date.
- Expense Entry can be cancelled but not physically deleted.
- Payment Voucher is the first automated payout document flow for Rak Samuk payout.
- PV number is issued only after payment is confirmed.
- One PV can include multiple Rak Samuk works for one worker/payment round.
- PV internal roles can be recorded digitally in the system, while the payee signs the printed document.
- Finance reports may include a rough profit view: sales minus expenses.
- Refund Expense Entries count into rough profit.
- Finance close does not block operational close.
- Finance design principle: follow money well enough for operations and later inspection, without becoming full accounting in the starting workflow.
- Workshop and Rak Samuk users see only necessary payment signals or their own permitted price. Sales/admin users who talk to customers may see sales/payment context. Finance users see finance detail inside the starting workflow boundary.

## Order Line Replacement and Cancellation

- Before Job/Shipment/sent-out state exists, Order Lines can be edited fully in `แก้ไขรายการออเดอร์` with Review Changes and log.
- After Job or Shipment exists, use guarded cancel/replace behavior rather than overwriting the original line.
- Existing `JOB-O` production detail is edited in Job Detail / Job Revision, not in Order Line edit.
- A ready-stock line already in a Shipment round must be removed from that round or the Shipment round must be cancelled before Order Line edit can change or remove it.
- Sent-out or completed Order Lines are not edited/removed from the Order; use service, return, stock adjustment, or financial adjustment flows later.
- Existing `JOB-O` cancellation is handled from Job Detail / Job cancellation first. Order Detail keeps the cancelled custom line visible with reason but excludes it from shipment selection and active status calculations.
- Cancelled ready-stock or custom lines remain visible in Order Detail under `รายการที่ยกเลิกแล้ว`, but are excluded from Order List product popovers, active item counts, active totals, and shipment selection.
- Financial difference from Order edits is handled through Financial Reconciliation before saving.
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
- `JOB-P` tied to SKU increases Ready Stock immediately when production is completed, using that Job's production quantity.
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
- When setting `รอวัตถุดิบ`, the worker may record material names/notes as a Material Need Note.
- Material Need Notes do not reserve, deduct, issue, or transfer material stock.
- Material Need Notes can appear in the Material Stock landing view as a list of jobs waiting for materials.
- From that waiting-materials list, a permitted user can summarize items into a Material Purchase Order creation flow.
- If a Material Purchase Order created from those notes is received, linked Jobs still in `รอวัตถุดิบ` are released back to their previous department queue.

## Queues and Aging

- Main production dashboard should answer:
  - งานไหนยังไม่เสร็จ
  - งานอยู่แผนกไหน
  - งานไหนด่วน
  - งานไหนเก่าค้างนาน
  - งานไหนใกล้วันจัดส่ง
- Manager view should include `JOB-O` and `JOB-P`, but default to `JOB-O / งานลูกค้า`.
- Toggle should allow all / customer work / production work.
- Default layout is one priority-sorted table, not grouped by department or risk bucket.
- `งานด่วน` is set or changed from the selected-row side drawer, not directly from the table row.
- `รอวัตถุดิบ` is treated as a high blocker in the default sort, above normal aged work.
- Job total age starts from Job creation date.
- Department age starts when department receives the work.
- Aging thresholds should be configurable, default example 15/30/60 days.
- Sort priority:
  1. Urgent work
  2. Waiting for Materials blocker
  3. Nearest delivery date
  4. Oldest total Job age
  5. Longest department age
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
- Proposed price is the per-piece price for that specific missing-price work item, not the total price for all assigned work.
- Finance/payment-permission user approves proposed price.
- Standard rate lives on Product Model (SKU ใหญ่), not variant.
- Approved first rate from 0/missing can update Product Model standard rate automatically with log.
- If existing non-zero standard rate differs from paid rate, after PV process approver must choose whether to update standard rate.
- New standard rate applies only to future work.
- No retroactive price update.
- Custom Job paid rate is stored as Job cost history visible only to finance permission.
- Rak Samuk has no deadline in first scope.
- Rak Samuk can show urgent label if authorized user set it.
- Rak Samuk Worker list uses a simple mobile worker shell with assigned-work cards and a limited detail view.
- Rak Samuk Worker can see their own price both on the work card and in the limited work detail.
- Rak Samuk Worker cannot mark work done and cannot move workflow status.
- Internal staff receives Rak Samuk Work back with `รับงานรักสมุกกลับ`.
- `รับงานรักสมุกกลับ` always routes the Job to `รอรับเข้าโรงงานสี` in the starting workflow; there is no destination picker in P0.
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
- Production tied to SKU increases Ready Stock when the `JOB-P` is marked complete.
- Production custom/prototype not tied to SKU can simply become Done.
- Creating Product/SKU from past custom work is handled through normal SKU creation with optional Job reference, not by copying data.
- Production and Order both can create Job with source type.
- UX must make `JOB-O` and `JOB-P` clear so woodwork, coloring, Rak Samuk, and admin are not confused.

## Production Job Entry

- `สร้างงานผลิต` mirrors the Order creation pattern where useful, but has no Customer, recipient, payment, COD, or shipment context.
- A persistent `ร่างงานผลิต` exists only when the user chooses `บันทึกร่าง` or `ออกและบันทึก`.
- `ร่างงานผลิต` has a `PROD-DRAFT-xxxx` number, not a `JOB-P` number.
- `ร่างงานผลิต` does not create `JOB-P`, does not enter woodwork/coloring/Rak Samuk queues, does not affect Ready Stock, and does not enter production reports as active production.
- Active draft production records live under `งานสั่งทำ / ผลิต` as `ร่างงานผลิต`.
- The draft creator, same-permission users, and higher-permission users can continue an active `ร่างงานผลิต`.
- When a `ร่างงานผลิต` becomes a real `JOB-P`, it is hidden from active draft production by converted/archived/read-only status rather than physically deleted.
- Leaving `สร้างงานผลิต` with unsaved changes warns the user with `ออกและบันทึก` and `ออกทันที`.
- The save action label is `บันทึกร่าง`.
- In `ผลิตจาก SKU`, saving a draft requires a selected SKU Variant. If the user has not selected a SKU, they must select one or switch to `งานผลิตพิเศษ`.
- In `งานผลิตพิเศษ`, saving a draft requires at least `ชื่องาน` so the draft can be found later.
- The `ร่างงานผลิต` table shows `เลขร่าง`, `รูปแบบงานผลิต`, `ชื่องาน/SKU`, `จำนวน`, `แก้ล่าสุด`, `ผู้รับผิดชอบ`, and `สถานะ`.
- Pressing `สร้างงานผลิต` opens `ตรวจสอบก่อนสร้างงานผลิต`; it does not create `JOB-P` directly.
- Production Review is the final confirmation step and has `กลับ`, `บันทึกร่าง`, and `ยืนยันสร้างงานผลิต`.
- Production Review shows the entered production detail and a downstream result preview: `จะสร้าง JOB-P`, the starting queue, and for SKU-tied work that completion will increase Ready Stock.
- After `ยืนยันสร้างงานผลิต`, the user goes to the new `JOB-P` Job Detail immediately.
- After `JOB-P` exists, production-affecting changes go through Job Detail / Revision, not back through `สร้างงานผลิต`.
- `ผลิตจาก SKU` requires SKU Variant, production quantity, and work name/main detail before Review. Images and department instructions may fall back from SKU Variant/Product Model data.
- `งานผลิตพิเศษ` requires work name, production quantity, main detail, and either a main image or enough description for the workshop before Review.
- Production quantity defaults to `1` and is entered by the user. Production Batch/Lot can be shown as reference context, but it does not lock or validate the quantity in `สร้างงานผลิต`.
- Starting queue is required before Review and defaults to `ช่างไม้`.
- Starting queue options in the starting workflow are `ช่างไม้`, `รอรับเข้าโรงงานสี`, and `ส่งไปรักสมุก`.
- If starting at `รอรับเข้าโรงงานสี`, the created `JOB-P` enters coloring intake first; coloring or an authorized user still receives it into active Coloring work later.
- If starting at `ส่งไปรักสมุก`, the created `JOB-P` enters the shared `รอระบุ/ส่งรักสมุก` queue so a permitted user can choose the Rak Samuk Worker.
- `ผลิตจาก SKU` Review blocks confirmation if the selected SKU/color has been disabled or closed after draft save. The user must choose another SKU or reopen the color where allowed.
- `ขายได้ 0` / `หมด` does not block `ผลิตจาก SKU`; it is context for producing more stock.
- A completed `JOB-P` tied to SKU increases Ready Stock by the full `จำนวนผลิต`.
- The starting workflow does not model defect quantity or partial stock increase for `JOB-P`. If work is damaged or incomplete, the team repeats production until the Job can be completed.
- If one production plan has multiple colors/SKUs/design outcomes, the user creates separate `JOB-P` records for each SKU/color/design and quantity.
- A `งานผลิตพิเศษ` not tied to SKU becomes Done when completed and does not increase stock. The creator follows up manually if it should later become a SKU or prototype reference.

## Product and SKU

- Product Model means SKU หลัก / SKU ใหญ่.
- SKU Variant means SKU ย่อย: the color-specific sellable/stockable record under one Product Model.
- Product setup starts from Product Model, then the user selects real colors from `รายการสี`; the system creates SKU Variants automatically for those colors.
- A Product Model can be created together with its initial color/SKU Variant set in one flow.
- Required Product Model fields for the starting workflow are name, category, and dimensions (`กว้าง`, `ลึก`, `สูง`).
- Product Model dimensions are the source of truth. If the same design has a materially different size, create a new Product Model.
- SKU Variant creation requires `รายการสี` selection and the product's counted/non-counted stock setting; users do not manually type SKU Variant names for every color.
- One Product Model + one `รายการสี` value can have only one SKU Variant. Duplicate color creation is blocked with a modal and a link to the existing SKU.
- SKU code format for SKU Variant is `TBR-CATEGORYCODE-MAINSKUID-COLORCODE`, such as `TBR-TBL-123-OAK`.
- Category code comes from `หมวดหมู่สินค้า`. Color code comes from `รายการสี`. Subcategory is not included in SKU code.
- Changing Category code or Color code later does not rewrite existing SKU codes.
- A new `รายการสี` value can be added to selected Product Models or selected categories; Product Models not selected can still enable that color later from Product Detail.
- Enabling a color on a Product Model creates/reuses the SKU Variant and opens it for new sale/production selection.
- Disabling a color means that color is not a real option for that Product Model; it hides the SKU Variant from new Order selection, `ผลิตจาก SKU`, normal product list expansion, and normal stock selection, while history remains readable.
- A color cannot be disabled while it has stock, unfinished Orders, unfinished Jobs, or unfinished Production. The block modal must show the reason and links to the records to resolve.
- Re-enabling a disabled color uses the same SKU Variant and code; it does not create a new duplicate SKU.
- Non-color differences such as size, pattern, carving, crystal, or Rak Samuk detail become a new Product Model when they should be sold or stocked repeatedly.
- If the non-color difference is one-off customer work, use custom Order work instead. If it later becomes repeatable, create a new Product Model with optional Job reference.
- Job reference lives on Product Model, not SKU Variant.
- Job reference is traceability only.
- Product/SKU creation does not copy or sync Job data/images.
- Job reference should be optional.
- Lookup should default to Done Jobs; high permission can include not-Done Jobs with warning.
- Product Detail should show Job reference read-only and allow opening Job in a new tab.
- Job detail should show Product Models created from that Job.
- One Job can be source reference for many Product Models.
- Product Model / SKU Variant deactivation remains visible in history and can be reopened by permission with log.

### Product List and Product Detail

- `รายการสินค้า / SKU` shows Product Models as the main table rows, not every SKU Variant as a separate top-level row.
- The main stock number in the product list is `ขายได้ X ชิ้น`, summed across enabled colors. If the sum is zero, show `หมด`.
- If any enabled color has negative `ขายได้`, the Product Model row shows `หมด` plus a badge such as `มีรายการติดลบ`.
- Product list expansion is allowed only when there is saleable stock. Expansion shows only colors with `ขายได้ > 0`, as read-only rows with color, SKU code, and `ขายได้`.
- If a color filter is active, expansion shows only the matching color when it has saleable stock; otherwise the row remains non-expandable and shows `หมด`.
- Product list has search, category filter, color filter, and stock-status filter (`ขายได้` / `หมด`) in the starting workflow.
- Search covers product name, product code, SKU Variant code, color name, and color code.
- The row action `ดูสินค้า` opens Product Detail even when stock is zero.
- Product Detail shows all enabled and disabled colors for the Product Model, with status.
- Product Detail stock table uses three explicit labels: `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`.
- Product Detail shows negative `ขายได้` values directly with warning.
- Product Detail may link to `ปรับยอดสต๊อกสินค้า` per color, but does not edit stock inline.
- Product Detail shows a summary of `กำลังผลิต` / `รอรับเข้า` with links to related production work, but the product list does not show production badges.
- Product Detail has a per-color production action such as `ผลิตเข้าสต๊อก` / `ผลิตสินค้าชิ้นนี้` for enabled colors. It opens `สร้างงานผลิต` in `ผลิตจาก SKU` mode with that SKU Variant preselected.
- `สร้างงานผลิต` can still be opened normally and choose either `ผลิตจาก SKU` or `งานผลิตพิเศษ`; Product Detail prefill is only a starting helper.
- If the user changes SKU Variant or switches to `งานผลิตพิเศษ`, the Product Detail prefill context is reset like opening the page fresh.
- Product Detail prefill does not add a special back/cancel button. After creating production, the user goes to Job Detail.
- Receiving stock from production does not start from Product Detail. In domain/code, the SKU-tied `JOB-P` completion updates Ready Stock; this is separate from Material Stock Receipt even if Thai UI wording uses the same stock language.

### Order Item Selection

- Order `เพิ่มสินค้าพร้อมส่ง` shows Product Models first, then lets the user choose an enabled color/SKU Variant inside the selected product.
- Default Order selection shows only Product Models with saleable stock, with a separate action `เลือกสินค้าที่ไม่มีสต๊อก`.
- When `เลือกสินค้าที่ไม่มีสต๊อก` is active, enabled colors with zero stock are selectable and show `หมด`.
- Order item selection uses `ขายได้ X ชิ้น` for Product Model and color-level stock display.
- If the user searches by SKU Variant code, show the Product Model result and highlight the matching color.
- If selected quantity exceeds `ขายได้`, show an immediate warning and repeat it on Order Review.
- Over-reservation still follows the existing acknowledgement rule: permitted Order users may acknowledge the warning, no special reason or Manager approval is required, and `ขายได้` may become negative after confirmation.
- Draft Orders do not reserve stock. Order Review rechecks stock at confirmation time, and stale warnings disappear when stock is sufficient again.

## Product Settings

Confirmed:

- Staff-facing area: `ตั้งค่า > ตั้งค่าสินค้า`
- English docs name: Product Settings
- Product Category / `หมวดหมู่สินค้า`
- Product Subcategory / `หมวดหมู่ย่อย`
- Product Tag / `แท็กสินค้า`, text-only
- รายการสี
- รายการลายรักสมุก
- รายการลายแกะสลัก
- รายการสีคริสตัล

Rules:

- Do not use `ข้อมูลตั้งต้นสินค้า`, `CRUD`, or `Master` in staff-facing UI.
- Use Thai actions: `เพิ่ม`, `แก้ไข`, `ปิดใช้งาน`, `เปิดใช้งาน`, `ค้นหา`, and `กรองสถานะ`.
- `ตั้งค่าสินค้า` is visible only to users with product-settings permission; users without that permission do not see the menu.
- Changes in `ตั้งค่าสินค้า` are recorded in Management Log.
- Setting records that have never been used can be deleted.
- Setting records that have been used by Product Model, SKU Variant, Order, Job, or historical production instruction cannot be deleted; use `ปิดใช้งาน` instead.
- `ปิดใช้งาน` hides the value from new selection but keeps old Product/SKU/Order/Job/history readable where needed.
- Used setting records may be edited only for non-confusing details such as display cleanup, notes, or sample images; edits must not silently change historical meaning.
- Snapshot Order/Job/documents keep the old name at the time they were created; current Product/SKU views use the current name.

### Product Settings Layout

- `ตั้งค่า > ตั้งค่าสินค้า` uses tabs:
  - `หมวดหมู่สินค้า`
  - `แท็กสินค้า`
  - `รายการสี`
  - `รายการลายรักสมุก`
  - `รายการลายแกะสลัก`
  - `รายการสีคริสตัล`
- `รายการสี` has `เพิ่มสี`, `แก้ไข`, `ปิดใช้งาน`, `เปิดใช้งาน`, `ค้นหา`, and `กรองสถานะ`.
- `รายการลายรักสมุก`, `รายการลายแกะสลัก`, and `รายการสีคริสตัล` have `เพิ่ม`, `แก้ไข`, `ปิดใช้งาน`, `เปิดใช้งาน`, `ค้นหา`, and `กรองสถานะ`.
- Do not build a permanent report such as "สีนี้ใช้กับสินค้าไหน" in the starting workflow.
- If a value cannot be closed, show a blocking modal with the exact Product/SKU or Job records that block the action and buttons to open those records.

### Color List

- Color uses `รายการสี` only.
- Special color should be added to `รายการสี`, not free text.
- Required fields: `ชื่อสี` and `รหัสย่อ`.
- Optional fields: sample color/image, status, and note.
- `รหัสย่อ` uses uppercase English letters and numbers, around 2-8 characters, and must be unique.
- If `รหัสย่อ` has been used in SKU Variant codes, it cannot be edited. Close the old color and create a new color instead.
- If `ชื่อสี` or `รหัสย่อ` duplicates an existing color, block save and show a link/button to open the existing color.
- If a used color name is fixed for spelling/cleanup, current Product/SKU views show the new name but old Order/Job/document snapshots keep the original name.
- When creating a new color in `รายการสี`, users may add it to selected Product Models or selected categories; not selecting any product/category is allowed.
- Adding a new color to selected categories affects only Product Models that exist in those categories at that time; future products choose colors during product creation.
- When a new color is added to selected products/categories, it is enabled immediately and creates SKU Variants for those products.
- `รายการสี` cannot be closed if any linked SKU Variant has `มีอยู่ในร้าน > 0` or `จองแล้ว > 0`.
- If color close is blocked, the modal shows the affected SKU Variants/products and reasons such as `มีสินค้าในร้าน`, `มีรายการจองอยู่`, and `ขายได้ติดลบ` where applicable.
- If every linked SKU Variant has `มีอยู่ในร้าน = 0` and `จองแล้ว = 0`, the color can be closed.
- Closed colors remain visible in `รายการสี` for product-settings users with status `ปิดใช้งาน`, but they do not appear in normal new-selection controls.
- Reopening a color makes it usable again for products that already had that color linked; the product-color link was never deleted.

### Pattern And Decoration Lists

- `รายการลายรักสมุก` requires only `ชื่อลาย`.
- `รายการลายรักสมุก` may have optional sample image, note, and status.
- `รายการลายรักสมุก` name may be edited for spelling/cleanup; old Order/Job/document snapshots keep the old name.
- Closing `รายการลายรักสมุก` hides it from new selection but keeps it visible for product-settings users and old history.
- `รายการลายรักสมุก` cannot be closed if an active/in-progress Job uses it; the blocking modal shows those Jobs and buttons to open them.
- `รายการลายแกะสลัก` uses the same rules as `รายการลายรักสมุก`.
- `รายการสีคริสตัล` uses the same rules as pattern lists, not the same rules as product colors.
- Pattern/decor lists are not mandatory for sending work; they help search/classify.
- Pattern/decor lists can have optional sample images.
- Product/SKU can choose multiple Rak Samuk Patterns.
- `รายการลายแกะสลัก` is separate from `รายการลายรักสมุก`.
- `รายการสีคริสตัล` is separate.

### Category, Subcategory, And Tags

- `หมวดหมู่สินค้า` requires `ชื่อหมวดหมู่` and `รหัสหมวดหมู่`.
- `รหัสหมวดหมู่` uses uppercase English letters and numbers, around 2-8 characters, and must be unique.
- If `รหัสหมวดหมู่` has been used in SKU Variant codes, it cannot be edited. Close the old category and create a new category instead.
- `หมวดหมู่สินค้า` can be closed only when no active Product Models remain in that category.
- If category close is blocked, show a modal with the active Product Models and buttons to open them.
- `หมวดหมู่ย่อย` is in the starting workflow, but it is not included in SKU Variant codes.
- `หมวดหมู่ย่อย` requires `ชื่อหมวดหมู่ย่อย` and a parent `หมวดหมู่สินค้า`.
- `หมวดหมู่ย่อย` can be closed only when no active Product Models remain in that subcategory.
- `แท็กสินค้า` is text-only and requires only `ชื่อแท็ก`.
- Product tags are only for search/grouping; they do not drive workflow, permissions, price, or discount logic.
- `แท็กสินค้า` can be closed at any time. Existing Product Models still show the tag with a `ปิดใช้งาน` badge, but the tag is hidden from new selection.

### Mini List Manager

- Product creation/edit flows can open a `modal จัดการรายการแบบย่อ` for users with product-settings permission.
- The mini modal can add a new value, search existing values, and reopen inactive values with confirmation.
- It is not the full settings page and does not include closing/editing all records.
- Adding `รายการสี` through the mini modal behaves like adding it from `รายการสี`: it creates the central color record, links it to the current Product Model immediately, and creates the SKU Variant.
- Adding `รายการลายรักสมุก`, `รายการลายแกะสลัก`, or `รายการสีคริสตัล` through the mini modal links the new value to the current product immediately.
- Reopening an inactive `รายการสี` through the mini modal requires confirmation, then links/reopens the color for the current product and creates/reopens the SKU Variant.

Not in first scope:

- Full material list / Material Master outside the light material-stock workflow
- Separate sales description and production description

## Product and Job Images

- Product Model has:
  - รูปหลัก
  - รูปเพิ่มเติม
  - รูปสำหรับช่างไม้
  - รูปสำหรับฝ่ายสี/ตกแต่ง
  - รูปสำหรับรักสมุก
  - รูปรีวิว through Review Album
- SKU Variant can have optional color-specific main image and optional color-specific department images.
- If a selected SKU Variant has its own image/group for a purpose, use the SKU Variant version. If it does not, fall back to the Product Model image/group for that purpose.
- Order and Job records snapshot the SKU code, product name, color, dimensions, display image, and relevant department images at the time the SKU Variant is selected; later product image edits do not rewrite old Orders or Jobs.
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

- Customer/CRM first supports order creation and customer lookup without blocking operations, while keeping a foundation for richer CRM in a later phase.
- Customer Code is system-generated in the format `tbr-cus-000001` and is used as the default Customer list sort/reference.
- Customer has CRM history.
- Recipient/address can differ from Customer.
- Customer has one digits-only primary phone number in the starting workflow; secondary phone numbers are not separate Customer fields and may live in Address Entry/recipient detail when needed.
- Customer has a Social section. The starting Social row is `Facebook: ...`; later rows can support other platforms or API identities.
- Social/Facebook is searchable but does not trigger duplicate warnings in the starting workflow.
- Customer can be created from both the Customer List and the Customer selector inside Order Create.
- Customer creation from the Customer List is allowed when minimum Customer data is complete; it does not require an existing Order.
- Customer creation from Order Create requires complete Order-required Customer data before saving the Customer.
- When creating a Customer, duplicate primary phone should warn and offer opening the existing Customer or continuing to create a new Customer. Duplicate Customer names do not warn because names can repeat.
- Customer create/edit uses one page divided into sections such as main information, Social, Tier/Tag, and Address.
- Customer has configurable Customer Tier in the starting CRM scope. Initial tiers are `ลูกค้าปกติ`, `ลูกค้า VIP`, `ลูกค้า VVIP`, and `ระวังเป็นพิเศษ`.
- `ระวังเป็นพิเศษ` shows a clear warning during Order creation. The user must acknowledge the warning before continuing, and the acknowledgement is logged, but it does not require manager approval.
- Customer Tier can optionally define percentage default discounts, separated between ready-stock goods and custom work.
- Tier discount is applied by line type: ready-stock lines use the ready-stock percentage and custom-work lines use the custom-work percentage, then the result appears as the final discount before Order total summary.
- Admin can edit or remove the suggested Tier discount during Order creation. No reason is required, but the old/default value and the new value are logged and snapshotted with the Order.
- Changing Customer Tier or Tier discount later does not affect old Orders.
- Customer Tier and Tier discount settings require Admin/Manager CRM settings permission.
- Customer Tier is edited from the Customer edit page by users with CRM settings/Admin permission, not inline from the Customer Detail summary.
- Changing a Customer into `ระวังเป็นพิเศษ`, or changing a Customer out of `ระวังเป็นพิเศษ`, requires a reason and writes a Management Log entry.
- Wholesale / `ลูกค้าส่ง` is out of scope for now.
- Customer has an address list with at most three saved Address Entries.
- One Address Entry is the default. Customer Detail can change the default without affecting old Orders or Shipments.
- Address Entry has optional label, recipient name, recipient phone, house/address detail, optional moo, subdistrict, district, province, and postal code.
- Customer creation can begin with incomplete address data, but Customer Detail must show `ข้อมูลที่อยู่ยังไม่ครบ` and real Order creation is blocked until required Order contact/address data is complete.
- Incomplete-address Customers show normally in Customer List with the chip `ข้อมูลที่อยู่ยังไม่ครบ`.
- Customer Detail shows incomplete-address warning in both the summary and the affected Address card.
- Adding a secondary Address Entry from Customer Detail requires complete Order-usable address data.
- If the Customer already has three saved Address Entries, the add-address action is disabled and shows that the limit is three saved addresses.
- New or edited address data from Order-facing screens is saved back to the Customer address list only when the user explicitly chooses `บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า`; if it is a new address, it becomes a secondary Address Entry.
- Order Create auto-selects the Customer default Address Entry, but admin can switch to a secondary address or enter a new Order Recipient Detail snapshot.
- When Customer Detail opens Order Create, it passes the selected Customer and the default Address Entry as the starting value.
- If the default Address Entry is incomplete, Customer Detail can still open Order Create, but the missing address data must be completed before the Order can be confirmed.
- If a Customer already has three saved Address Entries, Order Create can still use a new address as the Order Recipient Detail snapshot, but it cannot save that address back to Customer until admin edits or removes an old address.
- If a Customer already has three saved Address Entries, a new Shipment address remains a Shipment snapshot and cannot be saved as another Customer Address Entry until admin edits or removes an old address.
- Confirmed Orders keep their own Order Recipient Detail snapshot. Later Customer/address-book changes do not rewrite existing Orders.
- Editing an Address Entry from Customer Detail does not need an extra confirmation about old Orders because confirmed Orders and Shipments already keep their own snapshots.
- New or modified recipient/address entered on a Shipment is saved as a Shipment snapshot first; if it is not the same or not close to existing Customer addresses and the Customer has fewer than three saved addresses, the UI should ask whether to also save it as a secondary Address Entry.
- Shipment snapshots selected recipient/address data.
- Customer/CRM List has one instant search box. By default it searches all Customer-list fields, and the control can narrow the search to a specific field.
- Customer/CRM List search field choices are `ทั้งหมด`, `ชื่อ`, `เบอร์`, `Customer Code`, `Social`, and `ที่อยู่`.
- Customer/CRM List search should find Customer by:
  - Customer name
  - Customer primary phone, including normalized partial number searches such as middle digits or last three digits
  - Customer Code
  - Social/Facebook
  - default Address Entry fields: province, district, subdistrict, postal code, and house/address detail
  - Customer Tag
- Customer/CRM List search for `เบอร์` uses Customer primary phone only.
- Customer/CRM List search for `ที่อยู่` uses the default Address Entry only. A secondary-address match should not produce a Customer List result in the starting workflow.
- Customer/CRM List search result should indicate what matched with chips such as `ตรงกับเบอร์`, `ตรงกับ Social`, or `ตรงกับที่อยู่`.
- The Order Create Customer selector remains separate from the full Customer/CRM List; it supports active Customers only and is optimized for selecting a Customer during Order entry.
- Customer merge is not in first scope.
- Customer list exists under `ลูกค้า / CRM` and Order creation also has a customer selector.
- Customer list columns should include customer name, tier, primary phone, Social, main-address province/postal code, Customer Sales Summary shown as `ยอดซื้อรวม`, and open action. Customer Tags are searchable/filterable but not shown as list columns.
- Customer list default sort is by Customer Code.
- Customer List uses the default Address Entry when showing province/postal code.
- Customer list filters are Customer Tier, province, Customer Sales Summary / total sales, Customer Status, and Customer Tag.
- Total-sales filtering should support presets such as `0`, `1-50k`, `50,001-200k`, `200k+`, and custom range.
- Customer Status filters include `ใช้งานอยู่`, `ปิดใช้งาน`, and `ข้อมูลที่อยู่ยังไม่ครบ`.
- Customer List row action is only `เปิดลูกค้า`; creating Orders belongs in Customer Detail or Order Create.
- Customer List has no bulk action in the starting workflow.
- Customer List has no export in the starting workflow.
- Customer Sales Summary is read from the maintained customer summary value. It is updated after an Order becomes `จัดส่งครบแล้ว` and counts Orders that are completed and not cancelled.
- Customer Detail is a single read-first page, not tabbed.
- Customer Detail section order is Summary, Address, CRM Notes, Order History, and Service Case History.
- Customer Detail summary shows name, tier, primary phone, Social, main address, Customer Sales Summary shown as `ยอดซื้อรวม`, successful Order count shown as `ออเดอร์สำเร็จ X รายการ`, and key actions.
- Customer Detail top actions are `แก้ไขข้อมูลลูกค้า` as the primary action and `สร้างออเดอร์` as a secondary action.
- `สร้างออเดอร์` links to Order Create/Edit with this Customer and default Address Entry preselected; the Customer Detail page does not create an Order inline.
- `เพิ่มบันทึก CRM` belongs in the CRM Notes section header rather than the Customer Detail top action area.
- Customer Detail Address section shows the default Address Entry first, with full structured fields and a `ที่อยู่หลัก` badge.
- Customer Detail has:
  - Address list
  - CRM Note Timeline
  - Order History
  - Service Case History
- Order History shows Order ID, date, compact item summary, total, Order/Shipment status, and action to open the Order.
- If a Customer has no Orders, show `ยังไม่มีประวัติออเดอร์` and an action to go to Order Create/Edit, though normal CRM usage expects most Customers to come from Orders.
- Customer Detail Service Case History shows a compact list with actions to open existing cases and open a new Service Case creation page with this Customer already linked. Service Case details are handled in that screen, not in this Customer/CRM pass.
- Address list shows the default address first, then secondary addresses, with at most three saved addresses.
- CRM Note is timeline style, manually created, can attach images.
- CRM Note can optionally link to one of this Customer's Orders.
- If a linked Order is cancelled, closed, or edited later, the CRM Note remains in the Customer timeline and shows the latest status of the linked Order.
- CRM Note can have user, date/time, content, optional type, optional pin/star, and image attachments.
- CRM Note add/edit/hide actions write Activity Log entries. Removing a CRM Note hides or deactivates it rather than physically deleting it.
- Private CRM Note is not in the starting Customer/CRM scope.
- Order/Service Case should appear as history but should not auto-create CRM Note.
- Customer Tag exists.
- Customer Tag has Public and Private types.
- Customer Tag settings have no default values in the starting workflow; admins create the tags the shop actually needs.
- Tag master controlled by CRM/Admin permission.
- Customer Tag can have color.
- Customer Tag has no Order logic, no workflow logic, and no discount logic.
- Customer Tags are edited from the Customer edit page.
- Customer Tags are visible in Customer Detail summary/CRM context even though they are not shown in the Customer list. If many tags exist, show what fits and collapse the rest as `+N`.
- Customer Tier settings can be renamed and deactivated. A Customer Tier that has been used cannot be deleted.
- Changing Customer name or primary phone later does not rewrite old confirmed Order snapshots.
- Opening Customer from Order Detail routes to the Customer Detail page. If opened from an Order, Customer Detail shows a link back to the source Order at the top.
- Customer master edits such as name, primary phone, Social, and address write Activity Log entries.
- Customer Detail does not show customer edit-history timeline in the starting workflow; Activity Log and Management Log remain behind the operational UI.
- If a Customer has Order, CRM Note, or Service Case history, it is deactivated/hidden rather than deleted; if it has no history, deletion can be allowed.
- Deactivate/reactivate Customer requires Admin/Manager CRM permission.
- Deactivating a Customer requires a reason and writes a Management Log entry.
- Customer Tier, Tier discount, and Customer deactivate/reactivate changes write Management Log entries.
- Deactivated Customers block new Order creation but remain viewable historically.
- Deactivated Customers appear in search only when a filter such as `รวมลูกค้าที่ปิดใช้งาน` is enabled.
- Customer Detail for a deactivated Customer shows a clear `ปิดใช้งาน` state and hides `สร้างออเดอร์`.
- A deactivated Customer cannot be edited until it is reactivated.
- Customer Sales Summary is updated automatically by the system; there is no manual recalculation action in the starting UI.
- Customer/CRM-permission users can see Customer Sales Summary in Customer list/detail.
- Customer/CRM is considered ready to not block the main flow when users can create/search/select Customers, use them in Order Create, manage default/secondary addresses, and view `ยอดซื้อรวม` plus Order history.
- Full wholesale pricing rules are not in first scope.

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
- Delivery Note has item list, quantity, small image if available, and notes; no price and no COD amount.
- Shipping Sheet focuses on recipient, address, phone, carrier, short item summary, and COD amount where relevant.
- Admin prepares/prints the Shipping Sheet and Delivery Note when creating or releasing Shipment. The packing/delivery team uses those documents physically; there is no extra document-ready blocker in the delivery screen.
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
- Delivery mobile/tablet uses a simple worker shell, not the desktop admin shell.
- Delivery team can:
  - View items, image, quantity, recipient, address, phone, carrier, and notes
  - Mark one Shipment `ส่งออกแล้ว` from the row action
  - Bulk-select today's/no-date Shipments and confirm `บันทึกว่าส่งออกแล้ว`
  - Attach `รูปหลักฐานจัดส่ง` optionally on an individual Shipment when useful
  - Add short note
- Delivery team cannot:
  - Change items
  - Change address
  - Change carrier
  - Add or edit tracking
  - View or change COD amount in the system UI
  - Close Shipment
- Delivery team marks `ส่งออกแล้ว` once for the whole Shipment round, not per item.
- Delivery send-out does not require tracking or delivery evidence.
- After row send-out or bulk send-out, the Shipment leaves the Delivery Team's active today list and enters admin `ยืนยันการจัดส่ง`.
- Delivery history in P0 is a simple `ส่งออกแล้ววันนี้` view only; full delivery history/search is not included.
- Bulk `บันทึกว่าส่งออกแล้ว` applies only to `รายการต้องจัดส่งวันนี้`, including no-date Shipments.
- If a shipment cannot be sent, the packing/delivery team contacts admin outside the system in the starting workflow; there is no `ส่งไม่ได้` action or issue queue.
- If a released Shipment is not marked `ส่งออกแล้ว`, it remains in the delivery list by delivery date until admin handles it.
- Admin closes Shipment after evidence/tracking review.
- Before admin close, admin must add or correct tracking and delivery evidence in `ยืนยันการจัดส่ง` when missing.
- Closing a Shipment requires at least tracking or one delivery evidence photo.
- After Shipment close, tracking/evidence correction is allowed only for manager/higher permission and is recorded in Management Log.
- Evidence types:
  - Tracking
  - `รูปหลักฐานจัดส่ง` as one multi-photo field
  - Note
- The starting workflow does not use carrier-specific evidence settings or required checklists. Carrier/delivery method can stay free-text while Shipment close remains the simple tracking-or-photo rule owned by admin.
- When a Shipment has COD, its COD follow-up item exists from Shipment creation/release and remains in `ติดตาม COD / Payment` until a permitted admin/finance user closes the follow-up.
- COD/payment follow-up is owned by admin/audit/finance, not the packing/delivery team.

## Delivery Date

- Order may have optional main delivery date.
- Main delivery date is a default convenience for UX.
- Specific item/shipment dates may be adjusted for special cases.
- Job with delivery date should show date to relevant departments.
- Ready-stock can also have delivery date.
- Custom Job not done should never appear in delivery dashboard.
- Only completed/ready items can become Shipment.

## Service Case

- Service Case is an after-sales record, not a continuation of the original Order workflow.
- Service Case may reference Customer or Order for context/history only.
- Service Case does not reopen, close, recalculate, edit, or change status on the referenced Order.
- Order status, cancellation, shipment completion, or other Order changes do not change the Service Case.
- First scope does not create repair Job, `JOB-O`, or `JOB-P` from Service Case.
- Service Case can record after-sales events such as `คืนเงิน`, `ส่งของคืน`, `ส่งของกลับ`, claim notes, or service notes.
- Refund Service Case outcomes are recorded as Service Case context plus Expense Entry only; they do not alter the original Order total or Customer Sales Summary.
- If a Service Case has a charge to collect from the customer, use a separate financial follow-up or payment note; do not edit the original Order.
- Service Case can create Service Shipment when sending goods back to the customer or handling return-related delivery.
- Service Shipment does not affect original Order Completion or sales total.
- Service Case payment modes:
  - ฟรี
  - มีค่าใช้จ่าย
  - รอตัดสินใจ
- Default often is free.
- Service Case states can include:
  - `รอรับของกลับ`
  - `รับของกลับแล้ว`
  - `รอคืนเงิน`
  - `พร้อมส่งกลับ`
  - `ส่งกลับแล้ว`
  - `ปิดเคส`
- Service Case requires a Customer, but referencing an old Order is optional.
- Service Case can attach optional photos/files.
- Service Case notes are internal-only in the starting workflow; do not introduce customer-visible notes yet.
- Service Case appears in Customer Detail as a compact history list.
- If a Service Case references an Order, Order Detail may show only a short link/history when useful, not a full Service Case section.
- Closing a Service Case does not require a note.
- Closed Service Cases are not reopened in the starting workflow; create a new case if more after-sales work is needed.
- Service Case reporting starts with counts by type/status only; no full service cost/profit analysis.
- Service Case design principle: record after-sales events without mutating original sales history.

## Dashboard and Reports

- Admin Dashboard is a shared operational queue launcher, not a full task table or analytics dashboard.
- Dashboard cards are fixed in the starting workflow; do not make them user- or manager-configurable yet.
- `ออเดอร์ที่ต้องติดตาม` counts real Orders that still need operational follow-up.
- `งานกำลังผลิต` counts active Jobs, not Orders with custom work and not only Production Batches.
- `รอสร้างรอบจัดส่ง` counts Orders/Service items ready for admin Shipment creation, not existing Shipments.
- `ยืนยันการจัดส่ง` counts Shipment rounds marked `ส่งออกแล้ว` by delivery and waiting for admin close.
- `งานผลิตต้องติดตาม` counts Jobs that need admin communication, decision, or follow-up; it is not all active Jobs and not only old Jobs.
- `ติดตาม COD / Payment` counts unresolved Financial Follow-up items.
- Dashboard counts update on page load and after important actions; realtime updates are later.
- Admin Dashboard does not show money amounts.
- Admin Dashboard does not show Owner as a main signal.
- Admin Dashboard does not show Current Handler / next department as a main signal.
- Admin Dashboard should show stock-negative warning summary where relevant.
- Low-stock is not a main Admin Dashboard card/signal in the starting workflow; keep it inside stock views or a later stock module summary.
- Service Case count is not on the main Admin Dashboard first.
- Overdue delivery appears in the critical preview / urgent queues, not as a separate dashboard system.
- Waiting materials appears through production/material signals or the critical preview.
- Admin Dashboard does not have personal task mode; shared queues come first.
- Individual performance reporting is not in the first management dashboard. Preserve data for a later User Dashboard design.
- Dashboard/report principle: operational clarity before analytics.
- Manager Dashboard emphasizes unfinished work, urgency, blockers, and age.
- The first management report is unfinished work by department/status.
- The first sales report is sales by period from real Orders.
- Sales reports exclude cancelled Orders by default, while allowing a separate filter/view for cancelled Orders.
- Sales reports use Order creation date.
- Delivery reports use Shipment close / delivery close date.
- Expense reports use actual payment date.
- Starting reports do not need export; report export can be added later.
- Report UI starts with summary cards plus tables.

## Notifications and Alerts

- See ADR `0015-operational-alerts-are-queue-status-events.md`.
- Starting notifications are in-app alerts on the actual working screens.
- Alerts are expressed as queue items, badges/counts, status chips, inline warnings, or critical previews.
- Keep alert events separated by module and named clearly so future API/webhook/external hook integrations can be added.
- Urgent Jobs show a clear urgent label on the queue/work card.
- Near-delivery work is handled through sorting, chips, and critical preview.
- Old work uses aging chips and manager overview.
- Waiting-materials work appears through the waiting-material list, Material Stock view, or production blocker signals.
- Material receipt does not create a separate department notification; receiving linked material releases linked waiting Jobs to their queue and writes the log.
- Job Revision creates an awaiting-acknowledgement signal on the work card/queue.
- Rak Samuk missing price appears through the missing-price / approval queue.
- COD waiting appears in the COD/Payment queue and badge/count.
- Payment Audit appears in the finance follow-up queue.
- Stock-negative warnings appear on relevant pages and summaries.
- Low material stock is not an automatic alert in the starting workflow; use summaries and waiting-material notes first.
- Delivery send-out enters the shipment confirmation queue.
- Failed save/action uses inline error or toast.
- No separate read/unread notification state in the starting workflow; queue/work state is the source of truth.
- Alerts are not dismissible by user preference; they resolve through the relevant action or status change.
- Use default thresholds first; detailed alert-threshold settings are later.
- No separate notification history screen first; use Activity Log / Management Log plus clear event names.
- Notification principle: queue/status/event is the notification system.

## System Settings and Controlled Lists

- First settings scope includes product settings, finance lists, Customer Tier, expense categories, and basic operational thresholds.
- Use a main `ตั้งค่า` area plus mini managers in context where that is easier for staff.
- Product Settings remain as documented.
- Customer Tier is configurable.
- Customer Tag has no required default set.
- Expense Category is a simple configurable list.
- Payment Method is a simple configurable list.
- Carrier is a simple list, with free text allowed in selected cases.
- Service Case Type is a simple configurable list.
- Service Case Status uses fixed starting statuses and is not a configurable workflow.
- Aging thresholds use defaults first, with later/basic manager setting possible.
- Low-stock threshold configuration is later.
- Material unit and material category use mini-manager maintenance inside the material area first.
- Supplier/Store is one shared master with simple flags or usage context.
- Print template settings are not in the starting workflow; use fixed templates first.
- Evidence requirement settings are not in the starting workflow; keep a simple tracking-or-one-photo rule.
- Dashboard card settings are not in the starting workflow; keep the fixed dashboard.
- Report date presets are fixed first.
- Settings changes are recorded in Management Log.
- Used setting values cannot be deleted; close/inactivate them.
- Unused setting values can be deleted.
- Closed setting values remain visible in history with a closed/inactive badge.
- No settings import/export in the starting workflow.
- Settings principle: use controlled lists only where they reduce chaos.

## Stock

- First scope uses one warehouse concept even though real locations differ.
- Some items are counted stock; some are not counted.
- Use three stock labels where detail is needed: `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`.
- `ขายได้` is the number used in product lists and Order selection; it equals stock after reservations and may become negative after acknowledged over-reservation.
- Ready-stock reserves stock when Order is created.
- If Order is cancelled before Shipment, stock can be returned according to cancellation rules.
- If after Shipment creation/cancellation is operationally complex, use Stock Adjustment with reason rather than automatic correction.
- Stock-insufficient Order confirmation is blocked until fixed or acknowledged by a user with Order create/confirm permission.
- If acknowledged, the reservation may make stock go negative so the shortage stays visible, but Order and Shipment operation continue.
- Stock shortage is treated as a warning/reporting issue, not an operational blocker after acknowledgement.
- When creating a Shipment from stock-negative ready-stock lines, show an acknowledgement modal such as `รับทราบและสร้างรอบจัดส่งต่อ` / `กลับไปตรวจสต๊อก`. Do not require Manager approval or a reason; log the acknowledgement.
- Stock Count should exist for weekly or biweekly checking.
- Stock Count should be mobile-friendly and image-heavy.
- Smart cycle count can prioritize active/moving stock and items with positive stock.
- Product stock and material stock are separate in the starting workflow.
- Light Material Stock exists for easy-to-count internal materials such as color supplies, drawer rails, staples/lวดเย็บ, and similar consumables.
- Light Material Stock is not a full Material Master, warehouse transfer, BOM, or automatic Job material-consumption system.
- Material stock belongs under `สินค้า / สต๊อก` as `สต๊อกวัสดุ`, separate from `รายการสินค้า / SKU`.
- Material items require `ชื่อวัสดุ`, supplier หลัก, `หมวดวัสดุ`, and `หน่วยนับ`.
- Material items get an automatic material code, such as `MAT-0001`; it is shown in tables and searchable, but less prominent than material name/image.
- Material item images are optional, but the UI should make missing images visible because images help stock counting.
- Material category can be managed lightly inside the material stock area for now; it may be separated after production usage is tested.
- Each material item has one current primary supplier in the starting workflow.
- Changing the primary supplier is allowed by permission when there is no waiting-to-receive Material Purchase Order for that Material Item; old purchase/receipt documents keep the old supplier snapshot, and future purchase documents use the new supplier.
- If a Material Item has a `รอรับเข้า` Material Purchase Order, the primary supplier cannot be changed until that purchase document is received or cancelled.
- Material stock does not use SKU stock labels `จองแล้ว` or `ขายได้`; show `จำนวนที่มีอยู่`, receiving movement, and latest adjustment/receipt.
- Material stock has a simple movement history for receipts and adjustments.
- `รอวัตถุดิบ` can optionally name missing materials, but it does not reserve or deduct material stock.
- When a waiting-material note is free-text, the user must match it to an existing Material Item or create a Material Item before it can enter a Material Purchase Order.
- Creating Material Item from free-text requires name, primary supplier, material category, and unit; image is not required.
- Similar material names should be suggested before creating a new Material Item, but creation remains allowed.
- After a waiting-material note is summarized into a Material Purchase Order, hide it from the active purchase-summary list while that purchase document is active.
- Inactive Material Items are hidden from new selections but remain visible in old documents/history.
- A Material Item with `จำนวนที่มีอยู่ > 0` cannot be closed until adjusted to 0.
- A Material Item with waiting-to-receive Material Purchase Orders cannot be closed until those documents are received or cancelled.
- Material Category and unit names can be edited for future display, while old documents keep snapshots.
- Material Categories and units can be closed only when no active Material Item uses them.
- Material categories and units use mini-manager style maintenance inside the material-stock area first; do not add a separate `ตั้งค่าวัสดุ` area yet.
- Material Item can be added from `สต๊อกวัสดุ` and from free-text matching.
- New Material Items start with quantity 0; they appear immediately, can be purchased, can be adjusted, and can be opened even when quantity is 0.
- Do not add low-stock thresholds per material in the starting workflow; use waiting-material notes, zero quantity, and adjustment/counting first.
- Material Stock default sorting prioritizes waiting-material items, then zero-quantity items, then recently moving items.
- Stock Count should support products. Material counting uses the Material Adjustment flow below.
- Low-stock alert is not full scope; summary view may exist later.
- Stock and Expense remain separate.

## Product Purchase Orders And Product Stock Receipts

- `ใบสั่งซื้อสินค้า` is the product-stock purchase document for bringing finished SKU items into Ready Stock from a Supplier/Store.
- Product stock purchase/receipt is separate from Material Purchase Order / Material Stock Receipt.
- Supplier/Store master can be shared between product and material purchase contexts, but Product Purchase Order does not require a supplier-to-SKU relationship.
- Product Purchase Order has one Supplier/Store and snapshots supplier name/contact/address/notes at creation.
- Product Purchase Order can contain many active SKU Variants / colors in one document.
- SKU picker in Product Purchase Order can choose any active SKU Variant and is not filtered by Supplier/Store.
- Product Purchase Order has no draft state in the starting workflow.
- Required fields before creation are date, Supplier/Store, at least one SKU line, and ordered quantity.
- Purchase price/cost per line is optional in the first workflow.
- Product Purchase Order document statuses are `รอรับเข้า`, `รับเข้าบางส่วน`, `รับเข้าสต๊อกแล้ว`, `รับเข้าสต๊อกยังไม่ครบ`, and `ยกเลิก`.
- Product Purchase Order line statuses mirror receipt progress per SKU line; one document can have fully received lines and incomplete lines.
- Product Purchase Order supports partial receipt per line. Users can receive a full line quickly or enter actual received quantity per line.
- Each Product Stock Receipt records receiver, receipt date, received quantities per SKU line, and optional attachments/evidence.
- Product Stock Receipt rounds are immutable after save. If the receiver recorded the wrong quantity, fix stock through `ปรับยอดสต๊อกสินค้า`; do not edit the old receipt round.
- Receipt quantity cannot exceed the remaining quantity on the Product Purchase Order line.
- If goods arrive over the ordered quantity, the existing document can receive only up to the remaining quantity. Any extra quantity is handled by the user creating a new Product Purchase Order; the system does not create or store a pending over-delivery record automatically.
- While the document is `รอรับเข้า`, lines and quantities can be edited.
- After partial receipt, only unreceived remaining quantities can be edited; ordered quantity cannot be reduced below already received quantity.
- If goods arrive incomplete and the team will not wait for the rest, use action `ปิดยอดที่เหลือ` on the affected SKU line with a required reason.
- Standard `ปิดยอดที่เหลือ` reasons are `สินค้าเสียหาย`, `ผู้ขายส่งไม่ครบ`, `ยกเลิกจำนวนที่เหลือ`, `ปรับยอดแล้ว`, and `อื่น ๆ`; note is optional unless the business needs explanation.
- If reason `ปรับยอดแล้ว` is used, the user must link to Stock Count / Stock Adjustment movement for the same SKU, and the linked positive quantity must be at least the remaining quantity being closed.
- A line closed with `ปิดยอดที่เหลือ` becomes terminal `รับเข้าสต๊อกยังไม่ครบ`; if any line is `รับเข้าสต๊อกยังไม่ครบ`, the document status is `รับเข้าสต๊อกยังไม่ครบ`.
- If a receipt was under-recorded and the document remains open, user may receive the additional quantity in the same Product Purchase Order. If the difference was already handled by stock adjustment/internal process, close the remaining line with reason `ปรับยอดแล้ว`.
- If no receipt has happened, `ยกเลิก` is allowed without requiring a reason and is terminal.
- Product Purchase Order can be printed/exported in every status, with the status clearly marked on the document.
- Payment Audit Follow-up is created only when the Product Purchase Order is fully received as `รับเข้าสต๊อกแล้ว`.
- Before creating Payment Audit Follow-up, validate every line has `รับเข้าแล้ว = จำนวนสั่งซื้อ` and no line is `รับเข้าสต๊อกยังไม่ครบ`.
- Product Purchase Orders cancelled before receipt, or ending as `รับเข้าสต๊อกยังไม่ครบ`, do not create Payment Audit Follow-up.
- If stock correction happens after Payment Audit Follow-up was already created, the audit record is not automatically edited or cancelled; finance/audit works from the full document plus subsequent Stock Movements.
- Payment Audit focuses on the full purchase document, not individual receipt rounds.
- Product Stock Receipt history is shown in the Product Purchase Order as receipt rounds and in SKU Stock Movement history.

## Product Stock Count And Adjustment

- Product Stock Count is a separate count session that can include many SKU Variants.
- Stock users can select SKU Variants manually or start from filters and add them into the count round.
- Stock Count statuses are `กำลังนับ`, `นับเสร็จแล้ว`, and `ยกเลิก`.
- Product Stock Count / Adjustment uses the UI label `ปรับยอดสต๊อกสินค้า` for the adjustment/correction surface.
- Counters enter the actual physical `มีอยู่ในร้าน`; the system calculates the difference from current Stock On Hand.
- Stock counters should see `มีอยู่ในร้าน` and `นับจริง`; hide `จองแล้ว` and `ขายได้` in count/adjustment entry so counters do not reason about sales reservations.
- `จองแล้ว` and `ขายได้` are sales/admin visibility. If counted Stock On Hand becomes lower than Reserved Stock, `ขายได้` can become negative as a sales warning after save.
- When closing a Stock Count, create Stock Movement entries for every counted SKU.
- If counted quantity matches the system, create a zero-difference movement with status/reason `ยืนยันสต๊อกถูกต้อง`.
- If counted quantity differs, create an adjustment movement with reason. Standard reasons are `นับสต๊อกจริง`, `สินค้าเสียหาย`, `สูญหาย`, `พบสินค้าเพิ่ม`, and `อื่น ๆ`.
- Reasons are required only when the count creates a non-zero adjustment; note is optional.
- Evidence attachments are optional.
- Stock-permission users can create Product Stock Counts and adjustments. Manager/higher permission can view history; movement entries are not edited after creation.
- If a stock movement is wrong, correct it by creating a new adjustment movement rather than editing the old one.
- Product Stock Movement types in the first workflow include `รับเข้าจากใบสั่งซื้อ`, `ผลิตเข้าสต๊อก`, `ปรับยอด`, `จองจากออเดอร์`, `ยกเลิก/คืนจอง`, and `ยืนยันสต๊อกถูกต้อง`.

## Material Purchase Orders And Receipts

- `ใบสั่งซื้อวัสดุ` is in the starting workflow for light material stock.
- It is used to prepare material purchase lists, print/export while waiting to receive, and then accept the whole document into material stock.
- `ใบสั่งซื้อวัสดุ` can include one material line or many material lines.
- One Material Purchase Order has exactly one supplier/store.
- After choosing supplier/store, the material picker shows only active Material Items linked to that supplier.
- If waiting-material summary includes multiple suppliers, the system creates separate Material Purchase Orders by supplier.
- There is no `ร่าง` status for Material Purchase Orders in the starting workflow.
- A Material Purchase Order is created directly as `รอรับเข้า` after required fields are complete.
- If required fields are missing, the user cannot create the Material Purchase Order.
- Statuses: `รอรับเข้า`, `รับเข้าสต๊อกแล้ว`, `ยกเลิก`.
- `รอรับเข้า` is the state used for print/export, including A4 print and JPG/image export.
- Required fields: date, supplier/store, material lines, quantity, and unit.
- Price is not part of the first workflow. Do not require price or total on the Material Purchase Order.
- The system issues a document number automatically, such as `MAT-PO-2568-0001`.
- `รอรับเข้า` documents can be edited until accepted into stock.
- Accepting a Material Purchase Order means receiving the whole document into material stock. Partial receipt is not in scope.
- If goods arrive incomplete, wait until complete before accepting into stock.
- After a Material Purchase Order is accepted, material lines and quantities cannot be edited; mistakes are corrected through material adjustment.
- `รอรับเข้า` documents that are no longer needed are cancelled, not deleted, to keep the document trail.
- Attachments/images can be added in any status, including after receipt, for receipts, product photos, labels, or related documents.
- Accepting into stock creates a payment-audit follow-up item referencing the Material Purchase Order, but it is not an Expense Entry yet.
- The payment-audit follow-up receives the document number, supplier/store, receipt date, material lines and quantities, and attachments. It does not receive a required amount from the Material Purchase Order.
- Material Purchase Orders created from waiting-material notes show related Jobs so staff can review which Jobs are affected.
- Related Jobs are visible in the Material Purchase Order, but Job Detail continues to show only `รอวัตถุดิบ`; it does not show purchase-document detail or a `มีใบสั่งซื้อแล้ว` badge.
- If a material line with a Job link is removed from a `รอรับเข้า` Material Purchase Order, that Job link is removed; if the Job is still in `รอวัตถุดิบ`, it returns to the purchase-summary list.
- If a linked `รอรับเข้า` Material Purchase Order is cancelled, all Job links from that document are removed; Jobs still in `รอวัตถุดิบ` return to the purchase-summary list.
- Manual Material Purchase Orders cannot link Jobs after creation.
- A Material Purchase Order created from waiting-material notes cannot add new Job links later; if more waiting Jobs need purchase, they should be summarized into a new purchase flow.
- A linked Material Purchase Order may add normal material lines that are not linked to Jobs.
- When receiving a Material Purchase Order that is linked to waiting Jobs, show a confirmation modal listing the Jobs that will leave `รอวัตถุดิบ`.
- The confirmation list shows Job ID, work/product name, department queue the Job returns to, and related material.
- Receiving a linked Material Purchase Order releases only linked Jobs that are still in `รอวัตถุดิบ` and returns them to their previous department queue.
- If a linked Job already left `รอวัตถุดิบ` before receipt, do not block receipt and do not release it again; show it as already released in the confirmation context when relevant.
- Manual Material Purchase Orders without Job links do not release any Jobs on receipt.
- Job Activity Log records the automatic release, such as `ปลดรอวัตถุดิบจากการรับเข้าสต๊อกวัสดุ MAT-PO-xxxx`.
- Department aging restarts from the time the Job is released from `รอวัตถุดิบ`.
- No separate department notification or `รับวัตถุดิบแล้ว` badge is shown after release.
- If the workshop still cannot continue after release, the department sets a new appropriate status manually.

## Material Adjustment

- Use one user-facing screen name: `ปรับยอดวัสดุ`.
- Do not split user-facing flows into separate `กระทบยอดวัสดุ` and `ปรับยอดวัสดุ`; use reason/mode such as `กระทบยอด` inside the same screen where needed.
- In `ปรับยอดวัสดุ`, staff enter actual counted quantity and the system calculates the difference.
- Staff can adjust multiple material items in one adjustment session.
- Image/evidence attachment is optional and attached when saving the adjustment session, not required per material line.
- The screen has flexible date/range summaries such as today, last 7 days, or custom date range.
- Summary shows count of adjusted items, count of lines with differences, largest differences, and recorder.
- There is no material issue/withdrawal to Job/Production in the starting workflow.
- Material usage is reflected by periodic/daily adjustment rather than automatic deduction.

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
- Sales reports exclude cancelled Orders by default, while allowing a separate cancelled view/filter.
- Delivery view by Shipment close / delivery close date.
- Expenses by actual payment date.
- Report UI starts with summary cards and tables.
- Starting reports do not include export.
- Dashboard and reports prioritize operating visibility over analytics depth.
- Sales channel/funnel not tracked in first scope, but system can be structured to support future channel/funnel category.

## Printing and Documents

First-scope printable documents:

- Delivery Note (ใบส่งของ)
- Shipping Sheet (ใบจัดส่ง)
- Payment Voucher (ใบสำคัญจ่าย / PV)

Rules:

- Delivery Note does not show prices.
- Shipping Sheet shows COD when the Shipment has COD.
- Printable documents use snapshots.
- Documents can be regenerated from the current snapshot/status.
- Important print actions should have a light log.
- Delivery Note and Shipping Sheet can be printed separately.
- Payment Voucher is printable after payment is confirmed.
- PV number runs by Buddhist year and month, e.g. `PV-2568-03-004`.
- Expense export to CSV/XLSX is included.
- Order list export is later.
- Sensitive exports remain permission-aware.
- Printed documents should be functional, readable, and stable.
- Printing may be initiated from mobile, but the printed document/template format is the same as desktop.
- Print/export principle: document snapshots and simple outputs, with no accounting or tax promise.

Deferred:

- Tax invoice
- Formal quotation
- Full accounting documents
- Label printer/QR/barcode
- Order list export

## Open Items Deferred on Purpose

These were discussed but intentionally not detailed now:

- Exact PV line-item layout for Rak Samuk
- Full accounting and tax flow
- Quote/Lead workflow
- Channel/funnel analytics
- Payroll
- Full material list / Material Master outside the light material-stock workflow
- Supplier deep management
- Product costing/BOM
- Full QC
- Data Migration / Starting Data import planning for this decision-gate round
- Media library
- Customer merge
- Carrier API
- Wholesale pricing rules
