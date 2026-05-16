# Initial UX/UI Scope

This document summarises the confirmed UX/UI starting scope from the full chat discussion, including the 300+ question-and-answer decisions. It is intentionally not a full PRD, database design, or implementation plan.

## Source of Truth

Use this precedence when there is a conflict:

1. Latest chat Q&A decisions
2. `CONTEXT.md` glossary and relationships
3. ADRs under `docs/adr/`
4. `docs/decision-log.md`
5. This UX/UI scope note

Legacy material has been moved to `docs/archive/` and is not part of the active source of truth.

The current starting decision is clear: the first UX/UI scope is `โหมดเริ่มใช้งานจริง`, starts from งานสั่งทำ (Job) as the operating center, and uses Admin Dashboard as the first screen. Avoid calling this mode MVP in product/docs language.

## Starting Screen

**Admin Dashboard** is the first screen to design.

เหตุผลทางธุรกิจ: แอดมินเป็นจุดคุมงานจริงของร้านในเฟสแรก ตั้งแต่เปิด Order, ยืนยัน Order ที่สร้าง `JOB-O`, ปล่อยงานผลิต, สร้าง Shipment, ปิด Shipment, ติดตาม COD/payment, และดู queue งานค้างของระบบ ถ้าหน้านี้ชัด หน้าช่างไม้ ฝ่ายสี ช่างรักสมุก และฝ่ายจัดส่งจะต่อ flow ได้ง่ายขึ้น.

## UX/UI Scope Boundary

### Included

- Admin Dashboard and shared admin queues
- Order Create/Edit, optional saved Draft Order, and Order Review
- Order Line with ready-stock goods and custom work
- Job creation and Job Source Type: `JOB-O` and `JOB-P`
- Woodwork Queue
- Coloring Queue
- Waiting for Coloring Intake
- Rak Samuk outsource workflow
- Rak Samuk Worker view
- Shipment workflow
- Delivery team dashboard
- Manager unfinished-work overview
- Product/SKU support required for work cards
- Ready Stock support required for ready-stock shipment
- Light Material Stock support for easy-to-count internal materials
- Material Purchase Order, whole-document material receipt, and Material Adjustment
- Review Album and image groups required for Product/SKU/Job/Shipment/CRM
- Simple Expense Entry
- Payment Audit Follow-up created from received Material Purchase Orders
- Payment Voucher support for Rak Samuk payout
- Basic CRM sections needed inside Customer view

### Outside This Starting Scope

- Full accounting
- Tax invoice
- Formal quotation
- Sales channel/funnel reporting
- BOM costing
- Full material warehouse, material-location transfer, BOM material consumption, or automatic Job material issue
- Payroll automation
- Full QC module
- Central media library
- Customer merge
- Carrier API integration
- Shipping label printer/QR/barcode phase
- Full wholesale pricing rules

## Primary Roles

### Admin (แอดมิน)

แอดมินเป็นคนทำงานหลักในระบบช่วงแรก และใช้ shared queues ตาม permission.

Main responsibilities:

- Create Order, save Draft Order when needed, and confirm Order after review
- Enter custom-work detail inside Order Create/Edit so `JOB-O` can be created at Order confirmation
- Create Shipment from ready-to-ship items
- Close Shipment after delivery team marks sent
- Record payment information as normal work
- Monitor COD/payment follow-up
- Manage Customer, Address Entry, CRM Note, and Order history
- Handle Job revision communication when production already accepted work

### Manager / Owner (ผู้จัดการ / เจ้าของ)

ใช้ดูภาพรวมและจัดลำดับงาน ไม่ควรจมกับ task ย่อยแบบแอดมิน.

Main responsibilities:

- View unfinished customer Jobs first, with filters for all/production work
- See urgent work, old work, and department bottlenecks
- Set or change Urgent Label from the selected-row side drawer
- Review sensitive logs and financial information according to permission
- Override or approve special cases when needed

### Woodwork Department (ช่างไม้)

ใช้มือถือหรือแท็บเล็ตได้ หน้าจอต้องง่ายมาก.

Main UI label:

- `งานที่ต้องทำ`

Allowed actions:

- `รับงาน`
- `รอวัตถุดิบ`
- `ส่งไปสี`
- `ส่งไปรักสมุก`
- `กำลังส่งไปแกะสลัก`

Behavior:

- Work appears as a simple list.
- Urgent work uses color/icon, such as yellow and lightning.
- Abnormal states use status color.
- Work that is sent onward leaves the main list.
- History is available in a secondary screen: `ประวัติงานของฉัน`.

### Coloring Department (ฝ่ายสี)

Uses the same simple pattern as Woodwork.

Main UI label:

- `งานที่ต้องทำ`

Allowed actions:

- `รับงาน`
- `รอวัตถุดิบ`
- `ส่งไปรักสมุก`
- `รับเข้าโรงงานสี`
- `งานเสร็จ/พร้อมส่ง`

Behavior:

- Work waiting to physically enter the color workshop sits in `รอรับเข้าโรงงานสี`.
- This is not part of the active Coloring Queue until coloring confirms intake.
- When coloring marks an Order Job ready, it goes to admin `รอสร้างรอบจัดส่ง`, not directly to delivery.

### Rak Samuk Worker (ช่างรักสมุก)

ช่างรักสมุกมี user login ได้ เพื่อลดการถามซ้ำ แต่ไม่ใช่คนหมุน flow งานหลัก.

Main UI labels:

- `งานที่ต้องทำ`
- `ไม่มีราคา / ให้แจ้งราคา`
- `ประวัติการทำงาน`

Allowed:

- See only assigned Rak Samuk Work
- See Job work details and instruction images needed for Rak Samuk
- See own price only for own work
- Submit proposed price only when the item is missing a standard rate

Not allowed:

- See Customer data
- See Order ID
- See sales price
- Move workflow status
- Mark work complete
- See other workers' work or payout

### Delivery Team (ฝ่ายจัดส่ง)

ฝ่ายจัดส่งมีหน้าที่ส่งของออก ไม่แก้ข้อมูลหลัก.

Main tabs:

- `รายการต้องจัดส่งวันนี้`
- `รายการรอวันจัดส่ง`

Allowed:

- See product image, quantity, item list, recipient, address, phone, carrier, and notes
- Mark `ส่งออกแล้ว` from a row action or bulk `บันทึกว่าส่งออกแล้ว`
- Add optional `รูปหลักฐานจัดส่ง` on an individual Shipment when useful
- Add short delivery note

Not allowed:

- Change product list
- Change address
- Change carrier
- Add or edit Tracking
- View or change COD amount in the system UI
- Close Shipment

## Admin Dashboard Cards

First-scope dashboard cards:

- `ออเดอร์ที่ต้องติดตาม`
- `งานกำลังผลิต`
- `รอสร้างรอบจัดส่ง`
- `ยืนยันการจัดส่ง`
- `งานผลิตต้องติดตาม`
- `ติดตาม COD / Payment`

Design principle:

- The dashboard shows counts and short summaries, not every record.
- Clicking a card opens the actual working list.
- Admin queues are shared by role/permission, not locked to one person.
- Owner remains for traceability but should not block equal-permission users from continuing work.

## Order UX

### Order Entry Session

Order entry can be temporary while the admin is still on the create or review screens.

Confirmed behavior:

- Does not have Draft No. until explicitly saved
- Does not persist autosave data after the user exits without saving
- If the user exits with unsaved changes, show a warning with `ออกและบันทึก` and `ออกทันที`
- Can go straight to Review and create a real Order without creating a persistent Draft Order first

### Draft Order

Draft Order is a saved unfinished order entry used when admin chooses to pause work.

Confirmed behavior:

- Has Draft No. only after `บันทึกร่าง` or `ออกและบันทึก`
- Does not create Order ID
- Does not reserve stock
- Does not create Job
- Does not create Shipment
- Does not enter sales/accounting reports
- Can be edited by creator, equal-permission users, and higher-permission users
- When converted, it is hidden from active draft lists by status and remains archived/read-only

### Order Creation Flow

Recommended screen flow:

1. `สร้างออเดอร์`
2. Select or create Customer
3. Select Address Entry / recipient
4. Add Order Lines using separate actions: `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`
5. Enter price and required Payment Term
6. If custom work exists, enter `รายละเอียดงานสั่งทำ` inside the custom line
7. If the Order mixes ready-stock and custom work, default shipment intent is `ส่งพร้อมกัน`; actual split shipment later happens by selecting ready lines when creating Shipment rounds.
8. Review all details
9. Confirm and create Order ID

Confirmed rules:

- Order ID appears only after required entry is complete.
- No Lead or Quotation in the first scope.
- No work enters the system if it is not ready to become a real Order.
- Customer must be selected before adding Order Lines.
- Payment Term is required.
- Payment Record can be recorded in the flow but should not over-block operations.
- Missing Payment Record does not block `JOB-O` creation and does not require payment override.
- Pressing `สร้างออเดอร์` always opens Order Review first.
- Order Review shows entered data in detailed row/cards, with ready-stock and custom-work sections separated; hide the custom section when no custom work exists.
- Order Review has `กลับ`, `บันทึกร่าง`, and `ยืนยันสร้างออเดอร์`.
- `ยืนยันสร้างออเดอร์` does not open a second confirmation modal; the Review screen is the final confirmation step.
- Inline warning/acknowledgement controls on Review block confirmation until resolved.
- Customer Tier discount rounding belongs to Order Create/Review: calculate the discount in baht and round to whole baht at the Order total summary.
- Confirming creates the real Order ID, reserves ready-stock lines, creates `JOB-O` for complete custom lines, and opens Order Detail.
- `บันทึกร่าง` creates or updates the saved Draft Order and returns to the `ร่างออเดอร์` tab.
- `กลับ` from Review returns to Order Create/Edit for the same work.

### Order List and Detail

Main Order tabs:

- `ออเดอร์ที่ต้องติดตาม`
- `ออเดอร์ทั้งหมด`
- `ร่างออเดอร์`
- `ปิดแล้ว / ยกเลิก`

Rules:

- `ออเดอร์ที่ต้องติดตาม` contains only real Orders that still need operational follow-up.
- Draft Orders do not appear in the active operational Order list.
- Orders with custom work show a simple `มีงานสั่งทำ` label in the list.
- Main Order statuses are operational and calculated from active lines: `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `จัดส่งครบแล้ว`, `ยกเลิก`.
- `รอยืนยันการจัดส่ง` belongs to `สถานะการจัดส่ง` / Shipment round state, not `สถานะออเดอร์`.
- Order List separates `สถานะออเดอร์` from `สถานะการจัดส่ง`.

### Order Detail

Order Detail is a read-first report for one real Order.

Confirmed behavior:

- It is a single scrollable page, not a tabbed workspace.
- It starts with Order status and shipment status as the main header states.
- Financial follow-up is visible but lives in its own section.
- The header uses `จัดการออเดอร์`; section-level edit buttons appear in the sections where editing is allowed.
- Header menu shortcuts include `เปิดลูกค้า`, `แก้ไขรายการสินค้า`, `แก้ไขงานสั่งทำ`, `จัดการรอบจัดส่ง`, `เปิดติดตามการเงิน`, and `ยกเลิกออเดอร์`.
- Customer/recipient editing is split by intent: Customer master/default address changes happen in Customer Detail/Profile, the confirmed Order keeps its own Order Recipient Detail snapshot, and Shipment recipient/address changes happen in Shipment Builder/Detail as Shipment snapshots.
- Post-confirmation Order Edit is not one full edit-everything page; each area routes to the appropriate scoped edit flow.
- Sections are ordered like a report: summary, Order items, shipment-round management, related shipment rounds, payment summary, and short history.
- `รายการในออเดอร์` is grouped by item type: `สินค้าพร้อมส่ง` and `งานสั่งทำ`.
- Custom-work rows show their own `JOB-O`, production status, current department, delivery date if any, and `เปิด Job`.
- Do not use a duplicate `งานที่เกี่ยวข้อง` section in Order Detail.
- If all lines use the main Order recipient/address, show that address once in the summary and show only line shipment state in each row.
- If a line has separate delivery recipient/address, show the line-specific delivery detail on that line.
- Do not put `แผนจัดส่ง` as the primary top summary; use line state and shipment management detail instead.
- `แผนจัดส่ง` exists only for mixed ready-stock/custom Orders and acts as a guard for shipment selection.
- If the header shipment state is complete but payment remains outstanding, keep the operational state such as `จัดส่งครบแล้ว` in the header and show money issues only in payment follow-up.
- `ส่งบางส่วน` means at least one active deliverable line has completed delivery recording with tracking/evidence while some active line remains unfinished.
- `จัดส่งครบแล้ว` means all active deliverable lines have completed delivery recording with tracking/evidence. Payment follow-up does not change this status.
- In this context, tracking/evidence means tracking or at least one `รูปหลักฐานจัดส่ง`.

Shipment management inside Order Detail:

- `จัดการรอบจัดส่ง` appears below Order items.
- It lets admin select ready lines and press `สร้างรอบจัดส่งจากรายการที่เลือก`.
- Selecting multiple ready lines means combined shipment; selecting only some ready lines means split shipment.
- For mixed Orders, `ส่งพร้อมกัน` is the default intent; selected ready lines are the practical split/combined shipment control.
- Default selection is ready lines that are not already in a Shipment round.
- Non-selectable lines still appear disabled with reasons such as `ยังผลิตไม่เสร็จ`, `อยู่ในรอบจัดส่งแล้ว`, or `ส่งแล้ว`.
- Pressing `สร้างรอบจัดส่งจากรายการที่เลือก` opens Shipment Builder with the selected lines.
- `รอบจัดส่งที่เกี่ยวข้อง` shows Shipment No., created date, sent-out date, carrier, tracking, status, and only `เปิดรอบจัดส่ง`.

Editing from Order Detail:

- Light/safe fields such as Order notes can be edited from their relevant section where allowed.
- Customer master/default address changes happen in Customer Detail/Profile. Confirmed Order recipient/address is an Order Recipient Detail snapshot. Shipment recipient/address changes happen in Shipment Builder/Detail as Shipment snapshots.
- `เปิดลูกค้า` appears in the customer section and opens Customer Detail/Profile; Customer master editing happens there.
- If a Shipment round already exists, edit that Shipment's recipient/address in the Shipment screen.
- New/modified Shipment recipient detail is a Shipment snapshot and does not rewrite Customer master data unless a future Customer flow explicitly saves it.
- `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` open `แก้ไขรายการออเดอร์`, a full-page edit mode similar to Order Create/Edit but for confirmed Orders.
- `แก้ไขรายการออเดอร์` has `Review Changes` before save.
- `แก้ไขรายการออเดอร์` has no draft/autosave. If the user leaves with unsaved edits, warn with `อยู่ต่อ` / `ออกโดยไม่บันทึก`.
- Lines without Job, Shipment, or sent-out state can be edited fully.
- Lines that are blocked still appear as read-only rows with reasons; they do not prevent editing other safe lines.
- Added ready-stock lines reserve stock when Review Changes is saved; removed safe ready-stock lines release stock; quantity changes adjust the reserved difference.
- Added complete custom-work lines create `JOB-O` when Review Changes is saved.
- Price/discount changes are allowed where permission and Order state allow; Review Changes shows total and financial impact.
- Existing `JOB-O` production-detail changes go to Job Detail / Job Revision.
- If a custom-work line already has `JOB-O`, cancellation/removal starts from Job Detail / Job cancellation first, even if production has not started. Order Detail reflects the cancelled Job state and reason.
- A ready-stock line already in a Shipment round must be removed from that round or the Shipment round must be cancelled before the Order line can be edited or removed.
- Sent-out or completed lines cannot be edited or removed from the Order; use service, return, or adjustment flows later.
- If price/discount/total changes after Payment Records or COD records exist, Review Changes blocks save until the edited sales total is reconciled with Payment Records, COD to collect, or adjustment/refund/credit notes.
- Review Changes has `กลับไปแก้ไข`, `บันทึกการแก้ไข`, and `ยกเลิก`; meaningful changes require a reason when they remove a line, cancel/close `JOB-O`, or affect existing Job or Shipment state. Net total changes are logged but do not require a reason by themselves when the user already has price/amount edit permission.
- After saving Review Changes, return to Order Detail with a short `บันทึกการแก้ไขแล้ว` toast/banner and light highlight on the changed section.
- `ยกเลิกออเดอร์` is the last warning action in `จัดการออเดอร์`. If cancellation is allowed, confirm with reason; if blocked by sent-out lines or active downstream Job/Shipment blockers, disable the action and show the reason.
- If the last active line is cancelled and nothing has been shipped, confirm that the whole Order will also be cancelled and require reason/log.
- If some lines have completed delivery and all remaining active lines are cancelled, the Order becomes `จัดส่งครบแล้ว`; cancelled lines remain history.
- Cancelled Orders are read-only and show `ยกเลิกแล้ว` instead of normal management actions.
- Completed Orders can still edit safe general information, but not Order items or shipment-impacting fields.

### `ออเดอร์ทั้งหมด` Tab

Purpose:

- Browse and search all real Orders across every operational status.
- Help admins quickly identify the Order, customer, item summary, shipment state, total value, and whether custom work exists.
- Keep Draft Orders out of the list; Draft Orders stay under `ร่างออเดอร์`.

Confirmed table behavior:

- Default sort: newest created Order first.
- Default date range: all time.
- Date filter field: Order created date.
- Date filter presets: `วันนี้`, `7 วันล่าสุด`, `เดือนนี้`, `เดือนที่แล้ว`, `กำหนดช่วงเอง`.
- Order status filters: `ทั้งหมด`, `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `จัดส่งครบแล้ว`, `ยกเลิก`.
- Shipment-summary filters may include `รอยืนยันการจัดส่ง`, but it is not an Order status filter.
- Search fields: Order ID, customer name, phone, recipient, address/province/postal code, Job ID, product/work name.
- Main columns: `เลขออเดอร์`, `ชื่อลูกค้า`, `เบอร์โทร`, `รายการสินค้า`, `สถานะออเดอร์`, `สถานะการจัดส่ง`, `ยอดรวม`, custom-work icon, `วันที่สร้าง`, action.
- Do not show creator or owner as main columns in this table.
- Row action: `เปิดออเดอร์` only.
- Do not make the whole row a primary click target.
- Page primary action: `สร้างออเดอร์ใหม่`, which opens Order Create/Edit directly.
- Empty state after filtering/searching: show `ล้างตัวกรอง`.
- No export in the first mockup for this tab.

Product summary:

- Show one compact text line and `+N รายการ` when needed.
- Use popover for full item list.
- Desktop: hover/click; tablet/mobile: click.
- Popover shows item name, quantity, and line price only when the user can see prices.
- Do not show weight in this popover.
- If the Order mixes ready-stock and custom work, separate popover sections as `สินค้า` and `งานสั่งทำ`.
- Custom-work popover rows show size, color, and delivery date when available.
- Long popover text wraps inside a constrained width.
- Popovers close when the user scrolls or changes pagination.

Shipment summary:

- If no Shipment round exists, show `ยังไม่ได้จัดส่ง` in red text.
- If a Shipment round exists but carrier/tracking is not recorded, show `ยังไม่ได้จัดส่ง` in blue text and allow the popover to show the Shipment round number.
- If a Shipment round has been sent out but admin confirmation/evidence is pending, show `รอยืนยันการจัดส่ง` in `สถานะการจัดส่ง`.
- If tracking exists, show `ชื่อขนส่ง : tracking`, such as `Kerry : xxxxx`.
- If a closed Shipment round has no tracking but has `รูปหลักฐานจัดส่ง`, show `ส่งแล้ว` and show carrier/evidence in the popover.
- If multiple shipment rounds exist and the Order is not fully shipped, show `จัดส่งยังไม่ครบ` and list previous sent rounds in the popover.
- If multiple shipment rounds exist and shipping is complete, show the latest closed round as the compact summary: latest tracking plus `+N รอบ`, or `ส่งแล้ว +N รอบ` if the latest closed round has no tracking.

Display rules:

- `ยอดรวม` is net total after discount and is visible to users allowed to view this Order list.
- Custom-work indicator is a tool/hammer-style icon before `วันที่สร้าง`, with tooltip `มีงานสั่งทำ`; leave blank when there is no custom work.
- `วันที่สร้าง` uses short date format, such as `22 พ.ค. 67`.
- Cancelled Orders are faded but remain searchable/openable.
- Completed Orders use only status color/icon and are not faded like cancelled Orders.
- Filter/search state is remembered only during the current user session.
- Pagination uses `25 / 50 / 100` page-size options, defaulting to `25`, with `ก่อนหน้า`, `ถัดไป`, and page numbers.

### Table Pagination Pattern

All core project tables should use the same table pagination pattern:

- Page-size selector.
- `ก่อนหน้า` and `ถัดไป`.
- Page numbers.
- No infinite scroll for core operational tables.

## Job UX

### Job Meaning

Job is a shared custom work unit.

Types:

- `JOB-O`: Order Job from customer Order
- `JOB-P`: Production Job from internal Production

Important:

- Job is not the same as Order.
- Job is not the same as Production Batch.
- Job has Job Source Type for future-proofing.
- `JOB-O` for customer custom work is created directly when the Order is confirmed, not through a separate `รอสร้าง Job` queue.

### Job Work Card

Every department should see a consistent work card shape:

- Job ID: `JOB-O` or `JOB-P`
- Label: `งานลูกค้า` or `ผลิตเข้าสต๊อก`
- Product name / work name
- Main image
- Quantity
- Urgent label if any
- Delivery date if relevant
- Department-specific instruction images and text
- Current status
- Main action buttons for that department only

### Job Revision

If Job details change after a department accepted work:

- Notify only the affected department
- Show revision clearly
- Worker can choose `รับทราบ` or `ไม่เข้าใจให้ติดต่อหา`
- Admin can explain and return it for acknowledgement
- Keep revision history collapsed by default

### Hold and Waiting for Materials

Use different terms:

- `Hold`: admin-level pause for the Job
- `รอวัตถุดิบ`: department-level blocker

Behavior:

- Both remain visible in the work list with label.
- Do not hide in obscure tabs.
- Hold and release resets the department aging logic.
- Waiting for Materials stops department aging and tracks waiting age separately.

## Production UX

### Production Batch and Lot

Production uses Batch + Lot when producing stock or prototypes.

Reason:

งานผลิตเพื่อขายอาจมีจำนวนมาก เช่น 50 ชิ้น ถ้าทำเป็น Job เดียวใหญ่จะทำให้การส่ง outsource, รับกลับ, จ่ายเงิน, และเพิ่มสต๊อกเมื่อจบงานปวดหัว.

Confirmed behavior:

- Production Batch groups the overall production intent.
- Production Lot splits by actual quantity sent through department/outsource.
- Lot uses the same Job work-card pattern where production work is custom enough to require Job instructions.
- `JOB-P` tied to SKU increases Ready Stock immediately when production is marked done, using that Job's production quantity.
- `JOB-P` custom/prototype not tied to SKU can simply become Done.
- The first workflow does not model defect quantity or partial stock increase for `JOB-P`; if work is damaged or incomplete, the team repeats production until the Job can be completed.
- Multi-color or multi-design production should be entered as separate `JOB-P` records per SKU/color/design and quantity.

### Production Job Entry

`สร้างงานผลิต` mirrors the useful parts of Order Create/Edit, but without Customer, recipient, payment, COD, or Shipment context.

Confirmed behavior:

- `ร่างงานผลิต` exists when the user chooses `บันทึกร่าง` or `ออกและบันทึก`.
- `ร่างงานผลิต` uses a `PROD-DRAFT-xxxx` number and does not create `JOB-P`, enter department queues, affect Ready Stock, or enter active production reports.
- Active `ร่างงานผลิต` records live under `งานสั่งทำ / ผลิต`.
- Draft creator, same-permission users, and higher-permission users can continue an active production draft.
- Converted production drafts are archived/read-only and hidden from active `ร่างงานผลิต`.
- Leaving with unsaved changes shows `ออกและบันทึก` and `ออกทันที`.
- The visible save action is `บันทึกร่าง`.
- `ผลิตจาก SKU` can save draft only after SKU is selected.
- `งานผลิตพิเศษ` can save draft with `ชื่องาน` only.
- Pressing `สร้างงานผลิต` opens `ตรวจสอบก่อนสร้างงานผลิต`, not a real `JOB-P` yet.
- Production Review has `กลับ`, `บันทึกร่าง`, and `ยืนยันสร้างงานผลิต`.
- Review shows `จะสร้าง JOB-P`, starting queue, and SKU stock outcome when relevant.
- After `ยืนยันสร้างงานผลิต`, open the new `JOB-P` Job Detail immediately.
- After `JOB-P` exists, production-affecting edits happen through Job Detail / Revision.
- Production quantity defaults to `1` and is entered by the user. Production Batch/Lot can be shown as reference context but does not lock quantity.
- Starting queue is required before Review, defaults to `ช่างไม้`, and can be `ช่างไม้`, `รอรับเข้าโรงงานสี`, or `ส่งไปรักสมุก`.
- Starting at `รอรับเข้าโรงงานสี` sends the created `JOB-P` to coloring intake first.
- Starting at `ส่งไปรักสมุก` sends the created `JOB-P` to `รอระบุ/ส่งรักสมุก`.
- Disabled/closed SKU colors block Review confirmation for `ผลิตจาก SKU`.
- `ขายได้ 0` / `หมด` does not block production from SKU.

## Rak Samuk UX

### Sending Work

Confirmed flow:

1. Woodwork marks `ส่งไปรักสมุก`
2. Work leaves Woodwork Queue
3. Work enters shared queue `รอระบุ/ส่งรักสมุก`
4. User with outsource permission chooses Rak Samuk Worker
5. Work appears in that worker's own view

Rules:

- One customer Job sends Rak Samuk work to one worker in the first scope.
- Job with multiple pieces appears as one work item with quantity.
- Production large quantity should be split by Production Lot before sending.
- Rak Samuk has no return deadline in the first scope.
- Urgent Label can appear if set by authorized user.
- Rak Samuk Worker uses a simple mobile worker shell with assigned-work cards and a limited detail view.
- Rak Samuk Worker sees own price on both the work card and detail.
- Rak Samuk Worker cannot mark work complete or move workflow status.
- Internal staff receives work back with `รับงานรักสมุกกลับ`.
- `รับงานรักสมุกกลับ` always routes the Job to `รอรับเข้าโรงงานสี`; P0 has no alternate destination picker.

### Price Visibility and Pricing

Confirmed rules:

- Internal staff without finance permission should not see Rak Samuk rate.
- Rak Samuk Worker can see own price for own work.
- If Product Model has Rak Samuk Standard Rate, worker cannot request price in system.
- If no rate exists, show `ไม่มีราคา / ให้แจ้งราคา`.
- Worker can propose price only for missing-price items.
- Finance-permission user approves proposed price.

### Standard Rate Update

Confirmed rules:

- Rak Samuk Standard Rate lives on Product Model (SKU ใหญ่).
- If old rate is 0 or missing, approved first payment can update standard rate automatically with log.
- If old rate is non-zero and paid rate differs, after Payment Voucher process the approver must answer whether to update standard rate.
- New standard rate applies only to future work.
- No retroactive update to already sent work.
- Custom Job paid rate stays in Job cost history visible only to finance permission.

## Shipment UX

### Admin Ready-to-Ship Queue

UI label:

- `รายการรอจัดส่ง/รอสร้างใบส่งของ`

Contains:

- Ready-stock Order Lines not yet shipped
- Order Jobs marked ready by coloring
- Service Case items ready to send back

Confirmed behavior:

- Show as Order list, not loose item chaos.
- Simple central search only: customer, phone, Order ID, Job ID.
- Badge source: stock, custom, service.
- No extra Hold status here; if not ready to ship, it simply remains in this page.

### Shipment Creation

Confirmed behavior:

- Admin creates Shipment.
- Default is to release to delivery team immediately.
- Draft Shipment exists if admin is not ready to release.
- Shipment creates Delivery Note and Shipping Sheet together.
- User can print both or either.
- Delivery Note is item-focused and does not show COD amount.
- Shipping Sheet is recipient/address-focused and shows COD amount when the Shipment has COD.
- Shipment Owner is the creator, but close queue is shared by role/department.

### Bulk Shipment

Bulk create Shipment is allowed only for simple work.

Rules:

- One Order creates one Shipment.
- Bulk cannot include Orders with Jobs.
- Service Case may be bulked if details are already complete.
- COD does not block bulk; show badge.
- Show minimal summary before confirm.
- Bulk releases to `รอจัดส่ง` immediately.

### Delivery Team Dashboard

Tabs:

- `รายการต้องจัดส่งวันนี้`
- `รายการรอวันจัดส่ง`

Rules:

- Shipment with no delivery date goes to `รายการต้องจัดส่งวันนี้`.
- Shipment with future delivery date goes to `รายการรอวันจัดส่ง`.
- On the delivery date, it moves automatically to today.
- No overdue logic in first scope.

### Shipment Evidence

Evidence types:

- Tracking
- `รูปหลักฐานจัดส่ง` as one multi-photo field
- Note

Rules:

- Delivery team marks `ส่งออกแล้ว`.
- Delivery team can mark one row `ส่งออกแล้ว`, or bulk-select today's/no-date Shipments and confirm `บันทึกว่าส่งออกแล้ว`.
- `ส่งออกแล้ว` does not require Tracking or delivery evidence.
- Delivery Team cannot add or edit Tracking in the system.
- Delivery Team may attach optional `รูปหลักฐานจัดส่ง` on an individual Shipment.
- After `ส่งออกแล้ว`, the Shipment leaves the Delivery Team's active today list and enters admin `ยืนยันการจัดส่ง`.
- Delivery Team has only a simple `ส่งออกแล้ววันนี้` history view in P0.
- The starting workflow does not use carrier-specific evidence settings.
- Admin records or corrects Tracking/evidence in `ยืนยันการจัดส่ง`.
- Admin closes Shipment after tracking/evidence review, and close requires tracking or at least one delivery evidence photo.
- Order Completion happens when all required Order Shipments are closed.
- Financial Follow-up is separate.

## Product and SKU UX

### Product Structure

Terms:

- Product Model (SKU ใหญ่)
- SKU Variant (SKU ย่อย)

Confirmed rules:

- Color separates SKU Variant.
- Size is normally part of the main product definition, not variant.
- If other details differ enough, create new SKU.
- SKU can optionally reference a Job through lookup modal.
- Job reference is traceability only; no copying data or images.
- SKU can be closed only after stock is cleared.
- Closed SKU can be reopened by permission with log.

### Product Settings

Included:

- Category + optional Subcategory
- Product Tag as text-only tag
- รายการสี
- รายการลายรักสมุก
- รายการลายแกะสลัก
- รายการสีคริสตัล

Rules:

- Staff-facing UI uses `ตั้งค่า > ตั้งค่าสินค้า` / Product Settings.
- Do not use `ข้อมูลตั้งต้นสินค้า`, `CRUD`, or `Master` in visible UI.
- Users without product-settings permission do not see this menu.
- Product setting changes are Management Log events.
- Used records are closed with `ปิดใช้งาน` instead of deleted.
- Color and category codes that have been used in SKU codes cannot be edited.
- Product create/edit can open `modal จัดการรายการแบบย่อ` for permitted users to add/search/reopen setting values without leaving the product flow.

Excluded in first scope:

- Full Material Master outside the light material-stock workflow
- BOM material list and automatic material consumption
- Separate sales description vs production description

### Product Images

SKU image groups:

- รูปหลัก
- รูปเพิ่มเติม
- รูปสำหรับช่างไม้
- รูปสำหรับฝ่ายสี/ตกแต่ง
- รูปสำหรับรักสมุก
- รูปรีวิว through Review Album

Rules:

- Department images can have ordering and optional text.
- Delivery team does not need a separate SKU image group.
- Delivery uses main image, quantity, and item list.

## Review Album UX

Review Album is a review image collection, not a central media library.

Confirmed behavior:

- Can be created from SKU page
- Can be created from Review page and linked to SKU
- Can link to zero or many SKUs
- Can optionally link to Customer
- Can optionally link to Order
- Has album name, multiple images, note, optional tag later
- No publish/private status in first scope
- Images do not automatically join product images or CRM images

## CRM UX

Customer/CRM in the starting workflow is primarily there to make Order creation, lookup, address selection, and customer history usable without blocking operations, while keeping a clean foundation for a deeper CRM phase later.

Customer Detail is a single read-first page, not a tabbed workspace.

Customer page section order:

- Summary
- Address
- `CRM Note Timeline`
- `Order History`
- `Service Case History`

If a Customer has no Orders, Order History shows `ยังไม่มีประวัติออเดอร์` and an action to go to Order Create/Edit.

Customer profile starts with:

- Customer name
- Primary phone number
- Social section, starting with `Facebook`
- Customer Tier
- Customer Sales Summary as `ยอดซื้อรวม`
- Successful Order count as `ออเดอร์สำเร็จ X รายการ`
- Structured default Address Entry, or `ข้อมูลที่อยู่ยังไม่ครบ`
- Top actions: primary `แก้ไขข้อมูลลูกค้า`, secondary `สร้างออเดอร์`

Customer Detail behavior:

- `สร้างออเดอร์` opens Order Create/Edit with this Customer and the default Address Entry preselected; it does not create an Order inline.
- If opened from Order Detail, show a clear link back to the source Order.
- If the Customer is deactivated, show a clear `ปิดใช้งาน` state and hide `สร้างออเดอร์`.
- A deactivated Customer cannot be edited until reactivated.
- `เพิ่มบันทึก CRM` belongs in the CRM Notes section header, not as a top-level Customer Detail action.
- Customer edit-history timeline is not shown in the starting UI; Activity Log and Management Log stay behind the operational UI.
- Service Case History is compact and can open existing cases or open Service Case creation with this Customer already linked.
- Service Case is an independent after-sales record. It may reference an old Order for context only, but Service Case actions and status do not affect that Order, and Order changes do not affect the Service Case.
- Service Case first-scope actions include recording `คืนเงิน`, `ส่งของคืน`, `ส่งของกลับ`, service notes, and creating Service Shipment where needed; it does not create repair Jobs.

Customer list/search:

- Exists under `ลูกค้า / CRM`, while Order creation also has a Customer selector.
- Columns show customer name, tier, primary phone, Social, main-address province/postal code, `ยอดซื้อรวม`, and open action.
- Customer list does not show Order count as a separate column.
- Row action is only `เปิดลูกค้า`.
- Customer Tags are searchable/filterable but not shown in the list.
- Search is one instant search box that searches all Customer-list fields by default and can be narrowed to `ทั้งหมด`, `ชื่อ`, `เบอร์`, `Customer Code`, `Social`, or `ที่อยู่`.
- Search covers customer name, primary phone, Customer Code, Social/Facebook, default Address Entry province/district/subdistrict/postal code/house detail, and Customer Tag.
- Phone search normalizes formatting and supports partial numeric searches such as middle digits or last three digits.
- `เบอร์` search uses Customer primary phone only.
- `ที่อยู่` search uses the default Address Entry only; a secondary-address match does not show a Customer List result in the starting workflow.
- Search results show match chips such as `ตรงกับเบอร์`, `ตรงกับ Social`, or `ตรงกับที่อยู่`.
- Filters: Customer Tier, province, total sales, Customer Status, and Customer Tag.
- Total-sales filter supports presets such as `0`, `1-50k`, `50,001-200k`, `200k+`, plus custom range.
- Customer Status filters include `ใช้งานอยู่`, `ปิดใช้งาน`, and `ข้อมูลที่อยู่ยังไม่ครบ`.
- No bulk action in the starting workflow.
- No export in the starting workflow.
- Customer Code is system-generated in the format `tbr-cus-000001`.
- Default sort is by Customer Code.
- Deactivated Customers appear only when `รวมลูกค้าที่ปิดใช้งาน` is enabled.
- Deactivated Customers are not shown in Order Create customer selection.
- Customer Sales Summary is a maintained value updated after Orders become `จัดส่งครบแล้ว`; it counts completed, non-cancelled Orders.
- Customer Sales Summary is updated automatically; there is no manual recalculation action in the starting UI.
- Customer/CRM-permission users can see Customer Sales Summary in Customer list/detail.

Customer Tier:

- Configurable in settings rather than hard-coded forever
- Initial examples are `ลูกค้าปกติ`, `ลูกค้า VIP`, `ลูกค้า VVIP`, and `ระวังเป็นพิเศษ`
- `ระวังเป็นพิเศษ` warns during Order creation; user must acknowledge the warning and the acknowledgement is logged, but manager approval is not required
- Can optionally carry percentage default discounts
- Discount settings are separated between ready-stock goods and custom work
- When a Customer with tier discount starts a new Order, ready-stock lines use the ready-stock percentage and custom-work lines use the custom-work percentage, then the result appears as the one final discount before the Order total summary
- Admin can edit/remove the suggested discount during Order creation; no reason is required, but old/default value, new value, and final discount choice are logged and snapshotted on the Order
- Changing Customer Tier or discount later does not affect old Orders
- Customer Tier and discount settings require Admin/Manager CRM settings permission
- Customer Tier is edited from the Customer edit page by users with CRM settings/Admin permission
- Changing a Customer into or out of `ระวังเป็นพิเศษ` requires a reason and writes Management Log
- Customer Tier settings can be renamed and deactivated; tiers that have been used cannot be deleted
- Wholesale / `ลูกค้าส่ง` is out of scope for now

CRM Note:

- Timeline style
- Multiple entries
- Can attach images
- Created manually only
- Has user, date, content, optional type, optional pin/star
- Can optionally link to one of this Customer's Orders
- Linked CRM Notes stay in the Customer timeline if the linked Order is cancelled, closed, or edited; the note shows the latest Order status
- CRM Note add/edit/hide actions write Activity Log entries
- Removing a CRM Note hides/deactivates it instead of hard deleting it
- Private CRM Note is not in the starting Customer/CRM scope

Customer Tag:

- Public CRM Tag and Private CRM Tag
- Customer Tag settings have no default values; admins create the tags the shop needs
- Tag master controlled by CRM/Admin permission
- Tags can have colors
- Customer Tag does not replace Customer Tier
- Customer Tag has no Order, workflow, or discount logic
- Customer Tags are edited from the Customer edit page
- Customer Tags show in Customer Detail summary/CRM context, but not in Customer list columns
- If many tags exist, show what fits and collapse the rest as `+N`

Customer edit/status logging:

- Customer master edits such as name, primary phone, Social, and address write Activity Log entries
- Customer Tier, Tier discount, and deactivate/reactivate changes write Management Log entries
- Deactivate/reactivate Customer requires Admin/Manager CRM permission
- Deactivating a Customer requires a reason
- If the Customer on a Draft Order is later deactivated, the Draft Order can still be opened but cannot be confirmed until Customer is reactivated or changed

Address:

- Customer has at most 3 saved addresses
- One default address
- Address has optional label, recipient name, recipient phone, house/address detail, optional moo, subdistrict, district, province, and postal code
- Customer Detail Address section shows the default Address Entry first with full structured fields and a `ที่อยู่หลัก` badge
- Customer creation from Order Create requires complete Order-required Customer data before saving the Customer: customer name, primary phone, house/address detail, subdistrict, district, province, and postal code
- Customer creation in the Customer/CRM module can start with incomplete address data, but real Order creation is blocked until required Order name/address/phone data is complete
- Customer List shows incomplete-address Customers normally with chip `ข้อมูลที่อยู่ยังไม่ครบ`
- Customer Detail shows `ข้อมูลที่อยู่ยังไม่ครบ` in both the summary and the affected Address card while address data is incomplete
- Adding a secondary Address Entry from Customer Detail requires complete Order-usable address data
- If the Customer already has 3 saved addresses, disable add-address action and explain the three-address limit
- New or modified address from Order-facing screens is saved back to Customer only when the user explicitly chooses `บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า`
- If saved from Order and it is a new address, it becomes a secondary Address Entry
- Order Create auto-selects the Customer default Address Entry, but admin can switch to a secondary address or enter a new Order Recipient Detail snapshot
- Opening Order Create from Customer Detail sends the Customer and default Address Entry as starting values
- If the default Address Entry is incomplete, Order Create can open but confirmation is blocked until address data is completed
- If the Customer already has 3 saved addresses, Order Create can still use a new address as the Order Recipient Detail snapshot, but it cannot save that address back to Customer until admin edits or removes an old address
- Confirmed Orders keep their own Order Recipient Detail snapshot; later Customer address-book changes do not rewrite existing Orders
- Editing an Address Entry from Customer Detail does not need an extra old-Order warning because old Orders and Shipments already keep snapshots
- Changing Customer name or primary phone later does not rewrite old confirmed Order snapshots
- Shipment always snapshots recipient/address data
- If a Shipment address is not the same or not close to existing Customer addresses and the Customer has fewer than 3 saved addresses, ask whether to save it as a secondary Address Entry for that Customer
- If the Customer already has 3 saved addresses, do not save another address from Shipment; admin can edit/remove old addresses manually

## Stock UX

Confirmed first-scope rules:

- Use one warehouse concept even though real locations differ.
- Ready-stock item reserves stock on Order creation.
- Stock-insufficient Order confirmation is blocked until fixed or acknowledged by a user with Order create/confirm permission.
- If acknowledged, the reservation may make stock go negative so the shortage remains visible, but Order and Shipment operation continue.
- Stock shortage is a warning/reporting issue after acknowledgement, not an operational blocker.
- Shipment cancellation after stock was reserved should not auto-return stock if operationally risky; use Stock Adjustment with reason.
- Stock Count should be mobile-friendly and image-heavy.
- Smart cycle count can suggest active/moving stock first.
- Stock and Expense are separate systems in first scope.
- Stock In does not auto-create Expense.
- Expense does not auto-update stock.

### Product Purchase Order And Stock Receipt

Confirmed starting rules:

- `ใบสั่งซื้อสินค้า` is the product-stock purchase document for bringing finished SKU items into Ready Stock.
- It is separate from `ใบสั่งซื้อวัสดุ` and Material Stock Receipt.
- It has one Supplier/Store and snapshots supplier information when created.
- Supplier/Store master can be shared with material purchase, but product purchase does not require Supplier-SKU relationships.
- SKU picker can choose any active SKU Variant; it is not filtered by Supplier/Store.
- A Product Purchase Order can contain many SKU/color lines.
- There is no Product Purchase Order draft in the starting workflow.
- Required fields are date, Supplier/Store, at least one SKU line, and ordered quantity.
- Purchase price/cost per line is optional.
- Product Purchase Order document statuses are `รอรับเข้า`, `รับเข้าบางส่วน`, `รับเข้าสต๊อกแล้ว`, `รับเข้าสต๊อกยังไม่ครบ`, and `ยกเลิก`.
- Product Purchase Order line statuses track each SKU line separately; one document can contain fully received lines and incomplete lines.
- Receiving supports partial receipt per line. Users can mark a line as fully received or enter actual received quantity.
- Each receipt round records receiver, receipt date, received quantities, and optional evidence.
- Receipt rounds are immutable after save. Wrong receipt quantities are corrected through `ปรับยอดสต๊อกสินค้า` / Stock Movement rather than editing the original receipt.
- Receipt quantity cannot exceed remaining ordered quantity.
- If goods arrive over the ordered quantity, the original document receives only up to its remaining quantity. Any extra is handled by the user creating a new Product Purchase Order; the system does not create or store a pending over-delivery record.
- While the document is `รอรับเข้า`, lines and quantities can be edited.
- After partial receipt, only unreceived remaining quantities can be edited; ordered quantity cannot be reduced below already received quantity.
- Use action `ปิดยอดที่เหลือ` on an affected SKU line when remaining quantity will not arrive or has already been handled another way.
- `ปิดยอดที่เหลือ` requires a reason. Standard reasons are `สินค้าเสียหาย`, `ผู้ขายส่งไม่ครบ`, `ยกเลิกจำนวนที่เหลือ`, `ปรับยอดแล้ว`, and `อื่น ๆ`; note is optional.
- Reason `ปรับยอดแล้ว` requires a linked Stock Count / Stock Adjustment movement for the same SKU with positive quantity at least equal to the remaining quantity being closed.
- A line closed through `ปิดยอดที่เหลือ` becomes terminal `รับเข้าสต๊อกยังไม่ครบ`; if any line is incomplete, the document status is `รับเข้าสต๊อกยังไม่ครบ`.
- If a receipt was under-recorded and the document is still open, user may receive the additional quantity in the same document. If stock was already corrected by adjustment, close the remaining line with reason `ปรับยอดแล้ว`.
- If no receipt has happened, `ยกเลิก` is allowed without requiring a reason and is terminal.
- Product Purchase Order can be printed/exported in every status with the status marked.
- Payment Audit Follow-up is created only when the full Product Purchase Order is received as `รับเข้าสต๊อกแล้ว`.
- Before creating Payment Audit Follow-up, validate every line has `รับเข้าแล้ว = จำนวนสั่งซื้อ` and no line is `รับเข้าสต๊อกยังไม่ครบ`.
- Payment Audit references the full purchase document, not each receipt round.
- Product Purchase Orders cancelled before receipt or ending as `รับเข้าสต๊อกยังไม่ครบ` do not create Payment Audit Follow-up.
- If Payment Audit Follow-up already exists and receipt is later found wrong, do not auto-edit/cancel the audit record; finance/audit handles the document with the later Stock Movements.
- Product receipt history appears as receipt rounds inside the Product Purchase Order and as SKU Stock Movement.

### Product Stock Count And Adjustment

Confirmed starting rules:

- Product Stock Count is a count session for many selected SKU Variants.
- Count round statuses are `กำลังนับ`, `นับเสร็จแล้ว`, and `ยกเลิก`.
- Users can select SKUs manually or start from filters and add them into the count round.
- Product adjustment screen label is `ปรับยอดสต๊อกสินค้า`.
- Counters enter actual physical `มีอยู่ในร้าน`; the system calculates the difference.
- Count/adjustment entry shows `มีอยู่ในร้าน` and `นับจริง`, and hides `จองแล้ว` / `ขายได้` so counters do not reason about reservations.
- If counted Stock On Hand becomes lower than Reserved Stock, save the physical truth and let `ขายได้` become negative as sales/admin warning.
- Closing a count creates Stock Movement entries for every counted SKU.
- If the count matches the system, create a zero-difference movement `ยืนยันสต๊อกถูกต้อง`.
- If the count differs, create adjustment movement with required reason and optional note.
- Standard adjustment reasons are `ยืนยันสต๊อกถูกต้อง`, `นับสต๊อกจริง`, `สินค้าเสียหาย`, `สูญหาย`, `พบสินค้าเพิ่ม`, and `อื่น ๆ`.
- Evidence attachments are optional.
- Stock-permission users can create counts/adjustments. Movement entries are immutable; if wrong, correct with a new adjustment movement.
- Product Stock Movement types in the first workflow include `รับเข้าจากใบสั่งซื้อ`, `ผลิตเข้าสต๊อก`, `ปรับยอด`, `จองจากออเดอร์`, `ยกเลิก/คืนจอง`, and `ยืนยันสต๊อกถูกต้อง`.

### Light Material Stock

Confirmed starting rules:

- `สต๊อกวัสดุ` is a lightweight stock area under `สินค้า / สต๊อก`, separate from Product/SKU ready stock.
- It is for easy-to-count internal materials such as color supplies, drawer rails, staples, and similar consumables.
- It does not create a full warehouse system, material-location transfer, BOM, or automatic Job material consumption.
- Material items require name, primary supplier, material category, and unit.
- Material items get an automatic material code, such as `MAT-0001`; it is searchable and visible, but less prominent than name/image.
- Each material item has one current primary supplier in the starting workflow. Changing it affects future purchase documents only; old documents keep their captured supplier.
- The primary supplier cannot be changed while that material is in a `รอรับเข้า` Material Purchase Order.
- Material item images are optional, but the UI should show when an image is missing because images help staff count stock.
- Material category is managed simply inside the material-stock area for now; it may be separated later after production testing.
- Material categories and units are managed with a mini-manager style UI inside the material-stock area first.
- Material stock uses `จำนวนที่มีอยู่`, receiving movement, latest adjustment/receipt, and simple movement history.
- Do not use `จองแล้ว` or `ขายได้` for material stock.
- New Material Items start with quantity 0 by default, appear immediately, and can be purchased, opened, or adjusted.
- Do not add per-material low-stock thresholds in the starting workflow.

### Material Purchase Order And Receipt

Confirmed starting rules:

- `ใบสั่งซื้อวัสดุ` is used to prepare purchase lists, print/export the waiting document, and accept the whole document into material stock.
- It can contain one or many material lines.
- One Material Purchase Order has exactly one supplier/store.
- After choosing supplier/store, users can choose only active Material Items linked to that supplier.
- Summaries from `รอวัตถุดิบ` split into separate Material Purchase Orders when items belong to different suppliers.
- Free-text waiting-material notes must be matched to an existing Material Item or converted into a new Material Item before entering a Material Purchase Order.
- There is no Material Purchase Order draft in the starting workflow.
- The document is created directly as `รอรับเข้า` after required fields are complete.
- Statuses are `รอรับเข้า`, `รับเข้าสต๊อกแล้ว`, and `ยกเลิก`.
- `รอรับเข้า` can be printed as A4 or exported as JPG/image.
- Required fields are date, supplier/store, material lines, quantity, and unit.
- While `รอรับเข้า`, lines and quantities can be edited until receipt.
- Price is not required in this starting workflow.
- Receiving is whole-document only. Partial receipt is outside scope.
- After receipt, lines and quantities are not edited; errors are corrected through Material Adjustment.
- Receiving creates a Payment Audit Follow-up for finance/payment review, not an Expense Entry.
- If the Material Purchase Order is linked to Jobs waiting for materials, receiving shows a confirmation modal listing the Jobs that will be released.
- Receiving a linked Material Purchase Order releases only linked Jobs that are still in `รอวัตถุดิบ`, returns them to their previous department queue, and writes a Job Activity Log.
- It does not show a `รับวัตถุดิบแล้ว` badge or send a separate department notification.
- Manual Material Purchase Orders without Job links do not release Jobs.
- Manual Material Purchase Orders cannot link Jobs after creation, and linked Material Purchase Orders cannot add new Job links later.

### Material Adjustment

Confirmed starting rules:

- Use one visible screen name: `ปรับยอดวัสดุ`.
- Staff enter actual counted quantity for selected materials, and the system calculates the difference.
- The same screen can support `กระทบยอด` as a reason/mode without splitting into a separate visible feature.
- Staff can adjust multiple material items in one session.
- Evidence images are optional at save time for the adjustment session.
- Summaries should be filterable by date/range, such as today, last 7 days, or custom range.
- Usage or missing material is handled through periodic adjustment, not automatic deduction to Job/Production.

## Financial Follow-up UX

Financial Follow-up is operational money follow-up, not full accounting approval.

Confirmed behavior:

- A finance-permission user can close a follow-up item when payment evidence or explanatory note is enough for the operational audit trail.
- Closing Financial Follow-up is separate from Order Completion, Shipment close, and full accounting approval.

## Expense UX

Expense Entry is simple business expense tracking, not full accounting.

Confirmed behavior:

- No approval flow
- User-defined expense categories
- Can record total-only entry
- Can record multi-line entry
- Can attach evidence image
- Can edit by permission with log
- Can cancel but not delete
- Can export Excel/CSV

Suggested fields:

- วันที่จ่ายจริง
- หมวดรายจ่าย
- ผู้รับเงิน/ร้านค้า
- จำนวนเงิน
- วิธีจ่าย
- หลักฐาน
- Note
- Optional line items

## Payment Voucher UX

Payment Voucher (ใบสำคัญจ่าย / PV) uses the existing A4 form style as reference.

Confirmed behavior:

- PV number is issued only after payment is confirmed.
- PV number runs by Buddhist year and month, such as `PV-2568-03-004`.
- Payment Voucher is a central document type, but first automated flow supports Rak Samuk payout.
- Signature roles: ผู้จัดทำ, ผู้อนุมัติ, ผู้จ่ายเงิน, ผู้รับเงิน.
- ผู้จัดทำ/ผู้อนุมัติ/ผู้จ่ายเงิน can be handled digitally in system.
- ผู้รับเงิน signs printed document.
- Same person can hold multiple internal roles in first scope.

Open detail:

- Exact printed line-item layout for Rak Samuk PV is intentionally deferred.

## Management Overview UX

Manager view should answer:

- งานไหนยังไม่เสร็จ
- งานอยู่แผนกไหน
- งานไหนด่วน
- งานไหนเก่าค้างนาน
- งานไหนใกล้วันจัดส่ง

Included:

- Default view: `JOB-O / งานลูกค้า`
- Toggle: customer work / all / production work
- One priority-sorted table, not default grouping by department or risk bucket
- Job age from Job creation date
- Department age
- Configurable aging thresholds, such as 15/30/60 days
- `รอวัตถุดิบ` treated as a high blocker
- `งานด่วน` action from the selected-row side drawer
- Timeline in Job Detail

Sort priority:

1. Urgent work
2. Waiting for Materials blocker
3. Nearest delivery date
4. Oldest total Job age
5. Longest department age

## Logging UX

Use three log levels:

- Activity Log: normal operational history
- Management Log: sensitive business changes
- Audit Log: highest-permission trace

General rule:

- Data is closed/hidden/cancelled, not physically deleted.
- Images are hidden, not physically deleted.
- High-permission users can inspect history.

## Thai UI Labels to Preserve

These labels should remain Thai for shop staff:

- `งานที่ต้องทำ`
- `ประวัติงานของฉัน`
- `รอรับเข้าโรงงานสี`
- `รับเข้าโรงงานสี`
- `รอวัตถุดิบ`
- `งานด่วน`
- `ส่งไปรักสมุก`
- `รอระบุ/ส่งรักสมุก`
- `ไม่มีราคา / ให้แจ้งราคา`
- `รายการต้องจัดส่งวันนี้`
- `รายการรอวันจัดส่ง`
- `รายการรอจัดส่ง/รอสร้างใบส่งของ`
- `ยืนยันการจัดส่ง`
- `Draft Order`
- `ออเดอร์ที่ต้องติดตาม`
- `งานกำลังผลิต`
- `รอสร้างรอบจัดส่ง`
- `งานผลิตต้องติดตาม`
- `ติดตาม COD / Payment`

## Next UX Questions

The first UX/UI question has been resolved:

**Question 1:** Should the first screen be Admin Dashboard?

**Answer:** Yes.

Remaining UX questions should not restart the interview. They should only unblock this chosen scope, especially:

- Admin Dashboard information hierarchy
- Draft Order creation steps
- Job work-card layout
- Woodwork and Coloring dashboard layout
- Rak Samuk worker view
- Shipment creation UX
- Delivery dashboard layout
- Manager unfinished-work overview
- SKU image grouping UI
