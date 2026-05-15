# Flow Map

This UX flow map is derived only from:

- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/initial-scope.md`

It maps the confirmed starting scope: งานสั่งทำ / Job operations and the supporting Product/SKU/stock flows that feed Order and Production work, with `Admin Dashboard` as the first screen. This file should not introduce new requirements, expand scope, or replace the source files above.

## F01 - Admin Dashboard to Working Queues

**Actors**

- Admin
- Same-permission or higher-permission admin users

**Trigger**

- Admin starts work and needs to see which shared operational queue needs action.

**Entry Point**

- `Admin Dashboard`

**Screens Involved**

- `Admin Dashboard`
- `ออเดอร์ที่ต้องติดตาม` queue
- `งานกำลังผลิต` queue
- `รอสร้างรอบจัดส่ง` queue
- `ยืนยันการจัดส่ง` queue
- `งานผลิตต้องติดตาม` queue
- `ติดตาม COD / Payment` queue

**Step-by-step User Actions**

1. Admin opens `Admin Dashboard`.
2. Admin reviews the dashboard cards and counts.
3. Admin chooses one card.
4. Admin enters the matching working queue.
5. Admin selects a record from the queue to continue the work.

**System Actions**

- Shows shared queue cards for the confirmed dashboard areas.
- Shows counts and short summaries rather than every record.
- Opens the selected working queue when a card is selected.
- Allows same-permission or higher-permission users to continue shared queue work.
- Preserves Owner for traceability.

**Status Changes**

- None on dashboard view.
- Status changes happen only after the user acts inside a working queue.

**Exit Condition**

- Admin is inside a working queue with an actionable record selected or ready to select.

**Key Data Shown**

- Queue label
- Count
- Short summary
- Owner where relevant
- Urgent or abnormal signal where relevant
- COD/payment follow-up signal where permission allows

**UX Risks**

- Dashboard becomes a full task table instead of a summary entry point.
- Shared queues look like personal assignments and discourage handoff.
- Finance-sensitive details appear to users without permission.
- `งานผลิตต้องติดตาม` is too hidden for urgent production follow-up.

**Blocking Open UX Questions**

- None for the flow map.

## F02 - Order Create/Edit to Order Detail

**Actors**

- Admin
- Same-permission or higher-permission admin users
- Sales/admin users with Order creation permission

**Trigger**

- Customer work is ready to be entered as a real Order or saved as a Draft Order for later.

**Entry Point**

- Order page -> `สร้างออเดอร์`
- Order page -> `ร่างออเดอร์` -> existing saved Draft Order

**Screens Involved**

- Order Create/Edit
- Customer search/select
- Address Entry select/create
- Order Line entry
- Payment Term entry
- Optional Payment Record entry
- Order review
- Order Detail

**Step-by-step User Actions**

1. Admin opens `สร้างออเดอร์` or an existing saved Draft Order.
2. Admin selects or creates Customer first.
3. Admin selects or creates Address Entry / recipient.
4. Admin adds Order Lines using `เพิ่มสินค้าพร้อมส่ง` or `เพิ่มงานสั่งทำ`.
5. For `เพิ่มสินค้าพร้อมส่ง`, admin selects SKU หลัก first, then chooses an enabled color / SKU ย่อย inside that product.
6. Admin enters quantity, price, and required Payment Term.
7. Admin optionally records Payment Record.
8. If custom work exists, admin enters `รายละเอียดงานสั่งทำ` inside each custom line until it is complete enough to create `JOB-O`.
9. If the Order mixes ready-stock and custom work, admin sees default `ส่งพร้อมกัน`; actual split shipment later happens by selecting only ready lines in shipment-round creation.
10. Admin either saves the work as Draft Order or presses `สร้างออเดอร์` to open Order Review.
11. Admin reviews all entered data in row/card detail, with ready-stock and custom-work sections separated.
12. Admin resolves any inline warnings or acknowledgements on the Review screen, such as stock-insufficient ready-stock lines.
13. Admin presses `ยืนยันสร้างออเดอร์`.
14. System opens confirmed Order Detail.

**System Actions**

- Keeps unsaved Order Create/Edit work temporary while the user stays in the flow.
- Creates Draft No. only when user presses `บันทึกร่าง` or `ออกและบันทึก`.
- Keeps saved Draft Order out of stock reservation, Job creation, Shipment creation, and reports.
- Hides converted Draft Order from active draft UI by status after real Order creation.
- Shows only Product Models with `ขายได้ > 0` by default in ready-stock selection, with `เลือกสินค้าที่ไม่มีสต๊อก` for enabled colors that show `หมด`.
- When SKU Variant code search matches, shows the parent Product Model and highlights the matching color.
- Creates Order ID only after required entry is complete.
- Reserves ready-stock lines when the real Order is created.
- Snapshots SKU code, product name, color, dimensions, display image, and relevant department images for ready-stock Order Lines at confirmation.
- Creates `JOB-O` immediately for each complete custom line when the real Order is created.
- Does not require Payment Record or payment override to create `JOB-O`.
- Stock-insufficient ready-stock lines require fix or acknowledgement by an Order-capable user, then operation continues even if stock becomes negative.
- Does not create Shipment rounds from Order Review.

**Status Changes**

- Unsaved Order Entry Session -> saved Draft Order, if user saves.
- Saved Draft Order active -> converted/archived/read-only, if user confirms from a draft.
- No Order ID -> Order ID created.
- Ready-stock Order Line -> reserved stock when Order is created.
- Custom Order Line -> `JOB-O` created when Order is created.
- Order status and Shipment summary are tracked separately after creation; `รอยืนยันการจัดส่ง` belongs to Shipment summary, not Order status.

**Exit Condition**

- A real Order exists with Order Lines.
- Ready-stock lines are reserved where applicable.
- Complete custom lines have related `JOB-O`.
- User is on Order Detail.

**Key Data Shown**

- Draft No. only for saved Draft Orders, not for unsaved order entry or Order Review
- Customer
- Recipient / Address Entry
- Order Lines
- Product Model / `SKU หลัก`
- Color / `SKU ย่อย`
- SKU Variant code
- `ขายได้` stock check
- Ready-stock/custom indicator
- Price
- Payment Term
- Optional Payment Record
- Order Shipment Plan / shipment intent when mixed ready-stock and custom work exists
- Inline warning/acknowledgement state
- Order ID after creation

**UX Risks**

- Staff confuse Draft Order with real Order.
- Staff assume unsaved order entry has a persistent Draft No.
- Saved Draft Order appears to reserve stock or create downstream work.
- Payment Term and Payment Record are visually merged.
- Review feels like another editor instead of the final confirmation step.
- Unfinished customer discussion is entered as real operational work too early.
- Staff confuse `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`, or see ambiguous `คงเหลือ` in Order selection.
- Staff expect later Product/SKU image edits to change old Order snapshots.

**Blocking Open UX Questions**

- None for the flow map.

## F03 - Custom Order Line to Order Job at Confirmation

**Actors**

- Admin
- Sales/admin users with Order creation permission

**Trigger**

- A custom Order Line has complete `รายละเอียดงานสั่งทำ` and the Order is being confirmed.

**Entry Point**

- Order Review -> `ยืนยันสร้างออเดอร์`

**Screens Involved**

- Order Create/Edit
- Order Review
- Order Detail
- Job Detail

**Step-by-step User Actions**

1. Admin adds `งานสั่งทำ` during Order Create/Edit.
2. Admin fills `รายละเอียดงานสั่งทำ`, quantity, price, required images/instructions, and delivery date if relevant.
3. Admin reviews the custom line on Order Review.
4. Admin confirms the Order when Custom Work Detail is complete.
5. Admin opens the created `JOB-O` from Order Detail when production detail needs follow-up.

**System Actions**

- Creates a Job linked to each complete custom Order Line during Order confirmation.
- Assigns source type `Order`, uses `JOB-O` prefix, and shows readable label `งานลูกค้า`.
- Sends the Job into the appropriate production workflow.
- Records Owner and relevant activity.

**Status Changes**

- Custom Order Line: pending confirmation -> `JOB-O` created.
- Job: created as `JOB-O` / `งานลูกค้า` when the Order becomes real.
- Job enters the next production queue.

**Exit Condition**

- Order exists, `JOB-O` exists, and the Job is visible to the next production queue.

**Key Data Shown**

- Order Line
- Job ID
- `JOB-O`
- `งานลูกค้า`
- Product/work name
- Quantity
- Main image
- Department instruction images and text
- Delivery date if relevant
- Urgent Label if set
- Payment Term / Payment Record only as commercial context where relevant

**UX Risks**

- `JOB-O` is not visually clear enough for workshop users.
- Custom Work Detail is incomplete before confirmation.
- Staff mistakenly believe missing Payment Record blocks `JOB-O` creation.
- Admin expects a separate `รอสร้าง Job` step after Order confirmation.
- Later Job edits create production confusion if revision acknowledgement is not visible.

**Blocking Open UX Questions**

- None for the flow map.

## F04 - Job to Woodwork to Coloring to Ready for Shipment

**Actors**

- Woodwork Department
- Coloring Department
- Admin
- Manager or higher-permission user when acting on behalf

**Trigger**

- A `JOB-O` is created and ready to enter production workflow.

**Entry Point**

- Department queue, starting with `งานที่ต้องทำ` where the Job is assigned.

**Screens Involved**

- Job Detail
- Woodwork `งานที่ต้องทำ`
- Woodwork `ประวัติงานของฉัน`
- `รอรับเข้าโรงงานสี`
- Coloring `งานที่ต้องทำ`
- Coloring `ประวัติงานของฉัน`
- Admin `รอสร้างรอบจัดส่ง`

**Step-by-step User Actions**

1. Woodwork opens `งานที่ต้องทำ`.
2. Woodwork opens the Job work card.
3. Woodwork reviews image, quantity, instructions, status, urgency, and delivery date if relevant.
4. Woodwork selects an allowed action such as `รับงาน`, `รอวัตถุดิบ`, `ส่งไปสี`, `ส่งไปรักสมุก`, or `กำลังส่งไปแกะสลัก`.
5. When Woodwork selects `ส่งไปสี`, the work leaves the active Woodwork list.
6. Coloring sees the work in `รอรับเข้าโรงงานสี`.
7. Coloring or authorized user selects `รับเข้าโรงงานสี`.
8. Work enters Coloring `งานที่ต้องทำ`.
9. Coloring reviews the Job work card.
10. Coloring selects an allowed action such as `รับงาน`, `รอวัตถุดิบ`, `ส่งไปรักสมุก`, `รับเข้าโรงงานสี`, or `งานเสร็จ/พร้อมส่ง`.
11. Coloring selects `งานเสร็จ/พร้อมส่ง` when the Order Job is complete.

**System Actions**

- Shows the same Job work-card pattern across departments.
- Shows only role-appropriate actions.
- Keeps `Hold` visible when active.
- Keeps `รอวัตถุดิบ` visible and separate from Hold.
- Stops department aging while work is in `รอวัตถุดิบ`.
- Routes work from `รอรับเข้าโรงงานสี` into active Coloring only after intake.
- Sends completed `JOB-O` to admin `รอสร้างรอบจัดส่ง`, not directly to delivery.

**Status Changes**

- Job in Woodwork queue -> accepted or blocked by `รอวัตถุดิบ`.
- Job in Woodwork queue -> sent onward by `ส่งไปสี`.
- Job waiting for coloring intake: `รอรับเข้าโรงงานสี`.
- Job in active Coloring queue after `รับเข้าโรงงานสี`.
- `JOB-O` in Coloring -> `งานเสร็จ/พร้อมส่ง`.
- Completed `JOB-O` -> waiting in admin `รอสร้างรอบจัดส่ง`.

**Exit Condition**

- `JOB-O` is ready for admin Shipment creation.

**Key Data Shown**

- Job ID
- `JOB-O`
- `งานลูกค้า`
- Product/work name
- Main image
- Quantity
- Urgent Label
- Delivery date if relevant
- Department-specific instruction images and text
- Current status
- Allowed department actions
- Limited timeline for workers

**UX Risks**

- `รอรับเข้าโรงงานสี` is mistaken for active Coloring work.
- `Hold` and `รอวัตถุดิบ` look like the same state.
- Completed custom Job appears in delivery dashboard before admin creates Shipment.
- Worker views show too much timeline or sensitive context.
- One customer Job is treated as partially done or partially shippable.

**Blocking Open UX Questions**

- Job work-card layout is a blocking question for future screen specs.

## F05 - Job to Rak Samuk Outsource to Internal Workflow

**Actors**

- Woodwork Department
- Coloring Department
- User with outsource permission
- Rak Samuk Worker
- Finance-permission user when price approval is required
- Internal receiver

**Trigger**

- A department sends work to Rak Samuk using `ส่งไปรักสมุก`.

**Entry Point**

- Job work card action `ส่งไปรักสมุก`.

**Screens Involved**

- Department Job work card
- `รอระบุ/ส่งรักสมุก`
- Rak Samuk Worker assignment
- Rak Samuk Worker `งานที่ต้องทำ`
- `ไม่มีราคา / ให้แจ้งราคา`
- Proposed price approval
- Receive Rak Samuk Work back
- Next internal workflow queue
- Rak Samuk `ประวัติการทำงาน`

**Step-by-step User Actions**

1. Woodwork or Coloring selects `ส่งไปรักสมุก`.
2. User with outsource permission opens `รอระบุ/ส่งรักสมุก`.
3. User selects one Rak Samuk Worker.
4. Rak Samuk Worker opens `งานที่ต้องทำ`.
5. Rak Samuk Worker reviews assigned work and needed instruction images.
6. If a standard rate exists, Rak Samuk Worker continues without proposing price.
7. If no rate exists, Rak Samuk Worker sees `ไม่มีราคา / ให้แจ้งราคา`.
8. Rak Samuk Worker submits proposed price only for missing-price work.
9. Finance-permission user approves proposed price when required.
10. Internal staff receives the work back.
11. Work returns to the next internal workflow queue.

**System Actions**

- Removes the Job from the sending department active list.
- Places the work in `รอระบุ/ส่งรักสมุก` until worker assignment.
- Assigns Rak Samuk Work to exactly one Rak Samuk Worker for a customer Job.
- Shows Rak Samuk Worker only their own assigned work.
- Hides Customer data, Order ID, sales price, and other workers' work from Rak Samuk Worker.
- Shows own price only for own work.
- Allows price proposal only when standard rate is missing.
- Keeps workflow status control with internal staff, not Rak Samuk Worker.

**Status Changes**

- Department active Job -> sent to Rak Samuk.
- Sent work -> waiting in `รอระบุ/ส่งรักสมุก`.
- Waiting outsource assignment -> assigned to Rak Samuk Worker.
- Missing price -> proposed price -> approved price, when applicable.
- Rak Samuk Work -> received back.
- Received work -> next internal workflow queue.

**Exit Condition**

- Rak Samuk Work is received back and visible in the next internal workflow queue.

**Key Data Shown**

- Job ID where allowed
- Work name
- Main image
- Quantity
- Rak Samuk instruction images and text
- Urgent Label if set
- Worker name for internal users
- Own price for Rak Samuk Worker
- `ไม่มีราคา / ให้แจ้งราคา` when applicable
- Payout/history status for worker history where allowed

**UX Risks**

- Rak Samuk Worker can infer customer, Order ID, or sales price.
- Worker appears able to move internal workflow status.
- Missing-price work is not obvious enough.
- Returned Rak Samuk work has unclear next destination.
- One customer Job is accidentally split across multiple Rak Samuk Workers.

**Blocking Open UX Questions**

- Rak Samuk worker view layout is a blocking question for future screen specs.

## F06 - Ready-to-Ship Queue to Shipment Creation

**Actors**

- Admin

**Trigger**

- Ready-stock Order Line, completed `JOB-O`, or ready Service Case item is ready for Shipment creation under its Order Shipment Plan.

**Entry Point**

- `Admin Dashboard` -> `รอสร้างรอบจัดส่ง`
- Order Detail -> `จัดการรอบจัดส่ง`

**Screens Involved**

- `รอสร้างรอบจัดส่ง`
- Shipment creation
- Draft Shipment detail
- Released Shipment detail
- Delivery Note preview
- Shipping Sheet preview

**Step-by-step User Actions**

1. Admin opens `รอสร้างรอบจัดส่ง`.
2. Admin views `รอสร้างรอบจัดส่ง`.
3. Admin searches by Customer, phone, Order ID, or Job ID.
4. Admin chooses one of two paths:
   - Single/special path: opens `สร้างรอบจัดส่ง` for one Order.
   - Bulk path: selects eligible Orders and bulk-creates Shipments directly.
5. From Order Detail, Admin may select ready lines in `จัดการรอบจัดส่ง` and open `สร้างรอบจัดส่ง` with those selected lines.
6. In the single/special path, Admin reviews item list, shipment plan, recipient/address, carrier, delivery date, notes, and COD if relevant.
7. In the single/special path, Admin creates Shipment, releases it to delivery team, or keeps it as Draft Shipment if not ready.
8. In the bulk path, system uses each Order's saved Order Recipient Detail snapshot as the delivery default, using the first eligible Order only as a document grouping reference where needed, and creates Shipments/documents without opening `สร้างรอบจัดส่ง`.
9. Admin prints Delivery Note, Shipping Sheet, or both when needed.

**System Actions**

- Shows ready-to-ship work grouped as Orders, not loose item chaos.
- Keeps this queue separate from Delivery Team `รายการต้องจัดส่งวันนี้`.
- Includes ready-stock, completed custom work, and ready Service Case items.
- Uses ready-line selection as the practical split/combined shipment control from Order Detail: selected multiple ready lines become one combined Shipment round; selected partial ready lines become a split Shipment round.
- Creates Shipment from selected ready items.
- Shows acknowledgement modal for stock-negative selected ready-stock lines; this warning does not block Shipment creation after acknowledgement.
- Routes one Order / special cases / Order Detail selected lines into `สร้างรอบจัดส่ง`.
- Passes recipient name, address, phone, selected delivery items, each item's main image, quantity, and carrier name when already chosen into Shipment Builder.
- Routes bulk eligible Orders around `สร้างรอบจัดส่ง` and directly to Shipment/document creation using saved Order Recipient Detail snapshots as the delivery default.
- Stores recipient/address snapshot on Shipment.
- Creates Delivery Note and Shipping Sheet together.
- Defaults to release to delivery team after creation unless admin keeps Draft Shipment.
- Marks Draft Shipment items as being prepared to avoid duplicate Shipment.

**Status Changes**

- Ready-to-ship item -> Draft Shipment, when saved as draft.
- Ready-to-ship item -> released Shipment, when released.
- Draft Shipment cancellation -> item returns to not-shipped state.
- Released Shipment -> visible to delivery team.

**Exit Condition**

- Shipment exists as Draft Shipment or released Shipment.

**Key Data Shown**

- Order ID
- Customer where allowed
- Recipient
- Address snapshot
- Phone
- Item list
- Product image
- Quantity
- Source badge: stock, custom, or service
- Order Shipment Plan where relevant
- Carrier
- Delivery date if set
- COD badge/amount where permission allows
- Notes

**UX Risks**

- Ready-to-ship queue becomes loose item chaos instead of Order-based work.
- Draft Shipment items can be accidentally shipped twice.
- Delivery Note and Shipping Sheet are visually confused.
- COD edit/warning is unclear.
- Custom Job appears here before production is complete.
- Shipment intent is treated as a rigid workflow switch instead of using selected ready lines as the practical split/combined control.

**Blocking Open UX Questions**

- None for the flow map.

## F07 - Delivery Team to Mark Sent Out

**Actors**

- Delivery Team

**Trigger**

- Admin releases Shipment to delivery team.

**Entry Point**

- Delivery Team dashboard

**Screens Involved**

- `รายการต้องจัดส่งวันนี้`
- `รายการรอวันจัดส่ง`
- Shipment detail for delivery
- Evidence capture

**Step-by-step User Actions**

1. Delivery Team opens dashboard.
2. Delivery Team chooses `รายการต้องจัดส่งวันนี้` or `รายการรอวันจัดส่ง`.
3. Delivery Team opens a Shipment.
4. Delivery Team reviews item list, image, quantity, recipient, address, phone, carrier, and notes.
5. Delivery Team adds tracking or `รูปหลักฐานจัดส่ง`.
6. Delivery Team adds short delivery note if needed.
7. Delivery Team marks `ส่งออกแล้ว`.

**System Actions**

- Shows released Shipments only.
- Places Shipments without delivery date in `รายการต้องจัดส่งวันนี้`.
- Places future-date Shipments in `รายการรอวันจัดส่ง`.
- Moves future-date Shipments to today's tab on the delivery date.
- Prevents Delivery Team from changing item list, address, carrier, COD, or closing Shipment.
- Keeps `ส่งออกแล้ว` blocked until the Shipment has tracking or at least one delivery evidence photo.
- Sends `ส่งออกแล้ว` Shipment to admin `ยืนยันการจัดส่ง`.

**Status Changes**

- Released Shipment -> `ส่งออกแล้ว`.
- `ส่งออกแล้ว` -> waiting in admin `ยืนยันการจัดส่ง`.

**Exit Condition**

- Shipment is marked `ส่งออกแล้ว` and waiting for admin close.

**Key Data Shown**

- Shipment ID
- Product image
- Item list
- Quantity
- Recipient
- Address
- Phone
- Carrier
- Notes
- Tracking
- `รูปหลักฐานจัดส่ง`

**UX Risks**

- Delivery Team sees edit controls for master shipment data.
- Delivery Team sees COD amount in the system UI, even though COD follow-up belongs to admin/audit/finance and COD amount belongs on the Shipping Sheet.
- The tracking-or-photo rule is unclear at the moment of send-out.
- Future Shipments are mixed into today's work.
- `ส่งออกแล้ว` is mistaken for final Shipment close.

**Blocking Open UX Questions**

- None for the delivery evidence rule.

## F08 - Admin Close Shipment

**Actors**

- Admin
- Same-permission or higher-permission admin users

**Trigger**

- Delivery Team marks Shipment `ส่งออกแล้ว`.

**Entry Point**

- `Admin Dashboard` -> `ยืนยันการจัดส่ง`

**Screens Involved**

- `ยืนยันการจัดส่ง` queue
- Shipment detail
- Evidence/tracking review
- Order Detail
- `ติดตาม COD / Payment` where financial follow-up remains

**Step-by-step User Actions**

1. Admin opens `ยืนยันการจัดส่ง`.
2. Admin selects a Shipment marked `ส่งออกแล้ว`.
3. Admin reviews evidence, tracking, carrier information, recipient/address snapshot, item list, and notes.
4. Admin adds or corrects tracking/evidence if needed before close.
5. Admin closes Shipment when review is acceptable and at least tracking or one delivery evidence photo exists.
6. Admin checks whether the related Order has any remaining required Shipments.
7. Admin leaves COD/payment issues in financial follow-up when they are not operational delivery blockers.

**System Actions**

- Shows `ส่งออกแล้ว` Shipments in the shared admin close queue.
- Preserves Shipment Owner but allows shared admin close by permission.
- Allows admin to add or correct tracking/evidence before close.
- Closes the Shipment after admin action.
- Completes the Order only when all required Order Shipments are closed.
- Keeps Financial Follow-up separate from Order Completion.
- Records post-sent-out tracking/evidence correction in Management Log.

**Status Changes**

- Shipment: `ส่งออกแล้ว` -> closed.
- Order: open/in progress -> completed only when all required Shipments are closed.
- Financial Follow-up: remains open if COD, payment audit, outstanding amount, refund, retained deposit, or credit still needs follow-up.

**Exit Condition**

- Shipment is closed.
- Related Order completion is updated according to remaining required Shipments.

**Key Data Shown**

- Shipment ID
- Shipment Owner
- Carrier
- Tracking
- Evidence
- Delivery note
- Recipient/address snapshot
- Item list
- Related Order
- COD/payment follow-up signal where permission allows

**UX Risks**

- Admin treats payment confirmation as required before operational Shipment close.
- `ยืนยันการจัดส่ง` appears owner-locked instead of shared.
- Missing evidence is hard to detect.
- Admin closes a Shipment with neither tracking nor delivery evidence photo.
- Order Completion hides unresolved financial follow-up.

**Blocking Open UX Questions**

- None for the flow map.

## F09 - Manager Unfinished-work Overview

**Actors**

- Manager / Owner
- Admin with relevant permission

**Trigger**

- Manager needs to see unfinished work, bottlenecks, urgency, old Jobs, or near-delivery work.

**Entry Point**

- Manager unfinished-work overview

**Screens Involved**

- Management Overview
- Job list / overview
- Job Detail
- Job timeline

**Step-by-step User Actions**

1. Manager opens Management Overview.
2. Manager reviews unfinished Jobs across departments.
3. Manager switches between all work, customer work, and production work.
4. Manager sorts or scans by urgency, delivery date, total Job age, and department age.
5. Manager opens a Job Detail.
6. Manager reviews department location, status, age, urgency, and timeline.
7. Manager sets or changes `งานด่วน` where authorized.
8. Manager decides the operational follow-up outside the overview or sends the responsible team to act.

**System Actions**

- Includes both `JOB-O` and `JOB-P`.
- Shows department location.
- Shows urgent work, old work, and near-delivery work.
- Calculates Job total age from Job creation date.
- Calculates department age from department receive time.
- Uses configurable aging thresholds.
- Sorts by urgent work, nearest delivery date, oldest total Job age, then longest department age.
- Shows full timeline to manager/admin permission.

**Status Changes**

- None by default from overview.
- `งานด่วน` may be set or changed by authorized user.

**Exit Condition**

- Manager identifies the unfinished work needing attention, or opens the Job Detail for follow-up.

**Key Data Shown**

- Job ID
- `JOB-O` / `JOB-P`
- `งานลูกค้า` / `ผลิตเข้าสต๊อก`
- Product/work name
- Department location
- Current status
- Urgent Label
- Delivery date if relevant
- Total Job age
- Department age
- Timeline
- Owner/responsible users where relevant

**UX Risks**

- Overview becomes too broad and turns into a generic report module.
- `JOB-O` and `JOB-P` are mixed without clear source labels.
- Urgent and old work are not visually prominent.
- Department bottlenecks are hidden behind individual Job detail.
- Manager view exposes sensitive information beyond permission.

**Blocking Open UX Questions**

- Manager unfinished-work overview layout is a blocking question for future screen specs.

## F10 - Product Model Color to Stock Production

**Actors**

- Admin
- Product-permission user
- Production-permission user

**Trigger**

- Staff need to create or inspect a product, manage its real color options, or produce stock for one color/SKU.

**Entry Point**

- `สินค้า / สต๊อก` -> `รายการสินค้า / SKU`
- Product Model Detail -> per-color `ผลิตเข้าสต๊อก` / `ผลิตสินค้าชิ้นนี้`
- `สร้างงานผลิต` opened directly

**Screens Involved**

- Product / SKU Table
- Product Model Detail
- SKU Variant Detail
- SKU Image Groups
- Ready Stock View
- Production Job Entry
- Job Detail

**Step-by-step User Actions**

1. Admin opens `รายการสินค้า / SKU`.
2. Admin searches Product Models by product name, product code, SKU Variant code, color name, or color code.
3. Admin opens Product Model Detail with `ดูสินค้า`.
4. Admin reviews enabled and disabled color/SKU Variant rows.
5. Admin opens a SKU Variant for exact color detail, or uses per-color stock/production actions.
6. For stock production, admin presses `ผลิตเข้าสต๊อก` / `ผลิตสินค้าชิ้นนี้` on an enabled color.
7. System opens `สร้างงานผลิต` in `ผลิตจาก SKU` mode with that SKU Variant prefilled.
8. Admin may keep the prefilled SKU Variant, choose another SKU Variant, or switch to `งานผลิตพิเศษ`.
9. Admin creates production and lands on Job Detail.

**System Actions**

- Lists Product Models as primary rows, not every SKU Variant as a top-level row.
- Shows `ขายได้ X ชิ้น` as the main product-list stock number; shows `หมด` when no enabled color can be sold.
- Expands Product Model rows only when saleable color stock exists, and shows only colors with `ขายได้ > 0`.
- Creates or reuses one SKU Variant for each Product Model + `รายการสี` pair.
- Hides disabled colors from new Order selection, `ผลิตจาก SKU`, normal product list expansion, and normal stock selection, while preserving history.
- Uses SKU Variant image groups first and falls back to Product Model image groups by purpose.
- Treats Product Detail SKU prefill as a convenience only; changing SKU or mode resets that context.

**Status Changes**

- Color option can become enabled or disabled for a Product Model, subject to stock/order/production blockers.
- Production entry creates a `JOB-P / งานผลิต`.
- Receiving stock happens later from completed Production/Job context, not from Product Detail.

**Exit Condition**

- User has inspected the Product Model/SKU Variant, adjusted product color availability where allowed, or created a production Job for stock.

**Key Data Shown**

- Product Model / `SKU หลัก`
- Color / `SKU ย่อย`
- SKU Variant code
- Color status enabled/disabled
- `มีอยู่ในร้าน`
- `จองแล้ว`
- `ขายได้`
- Product and color-specific images
- Production links

**UX Risks**

- Product list drifts back to one top-level row per SKU Variant.
- Disabled colors look like sold-out colors instead of unavailable product options.
- Product Detail becomes an inline stock editor.
- Product Detail prefill looks like a locked special production path.
- Users expect stock receipt to start from Product Detail instead of completed Production/Job context.

**Blocking Open UX Questions**

- None for the flow map.

## F11 - Product Settings Maintenance

**Actors**

- Product-settings permission user
- Admin with product-settings permission

**Trigger**

- Staff need to maintain product settings used by product creation, SKU color setup, and production instruction classification.

**Entry Point**

- `ตั้งค่า` -> `ตั้งค่าสินค้า`
- Product creation/edit -> `modal จัดการรายการแบบย่อ`

**Screens Involved**

- Product Settings
- Product Model create/edit
- Product Model Detail
- Job Detail, when a pattern/decor item is blocking close

**Step-by-step User Actions**

1. User opens `ตั้งค่า > ตั้งค่าสินค้า`.
2. User selects one tab: `หมวดหมู่สินค้า`, `แท็กสินค้า`, `รายการสี`, `รายการลายรักสมุก`, `รายการลายแกะสลัก`, or `รายการสีคริสตัล`.
3. User searches or filters by status.
4. User adds, edits, closes, or reopens a setting item where allowed.
5. If closing is blocked, user sees a modal showing the Product/SKU or Job records that block the action.
6. User opens the blocking record when follow-up is needed.
7. From product create/edit, a permitted user can use `modal จัดการรายการแบบย่อ` to add/search/reopen values without leaving the product flow.

**System Actions**

- Hides `ตั้งค่าสินค้า` from users without product-settings permission.
- Blocks duplicate color name or color code.
- Blocks editing used color/category codes that have already appeared in SKU Variant codes.
- Blocks closing `รายการสี` when linked SKU Variants still have `มีอยู่ในร้าน > 0` or `จองแล้ว > 0`.
- Blocks closing `รายการลายรักสมุก`, `รายการลายแกะสลัก`, or `รายการสีคริสตัล` when active/in-progress Jobs still use that value.
- Blocks closing category/subcategory while active Product Models remain in it.
- Allows closing tags at any time because tags are search/grouping only.
- Records add/edit/close/reopen actions in Management Log.

**Status Changes**

- Setting item: active -> inactive when closed.
- Setting item: inactive -> active when reopened.
- Unused setting item may be deleted.

**Exit Condition**

- Product settings are maintained without changing historical snapshots or breaking active Product/SKU/Job work.

**Key Data Shown**

- Setting item name
- Code where applicable
- Optional sample image
- Optional note
- Status
- Blocking Product/SKU/Job references only when an action is blocked
- Management Log metadata

**UX Risks**

- Staff see technical words like CRUD or Master instead of normal Thai labels.
- Used SKU/category/color codes are changed and make old Orders/Jobs/stock documents confusing.
- A permanent "where used" report makes the starting workflow too heavy.
- Users without permission can see or edit product settings.

**Blocking Open UX Questions**

- None for the flow map.

## F12 - Light Material Stock To Purchase And Adjustment

**Actors**

- Material stock-permission user
- Material purchase-permission user
- Finance/payment-audit permission user
- Workshop users who mark Jobs as `รอวัตถุดิบ`

**Trigger**

- A Job is waiting for materials, or staff need to receive/count internal materials such as color supplies, drawer rails, staples, or similar easy-to-count consumables.

**Entry Point**

- `สินค้า / สต๊อก` -> `สต๊อกวัสดุ`
- Job work card -> `รอวัตถุดิบ`
- Material Stock -> `สร้างใบสั่งซื้อวัสดุ`
- Material Stock -> `ปรับยอดวัสดุ`

**Screens Involved**

- Job work card
- Material Stock
- Material Purchase Order
- Material Adjustment
- Payment Audit Follow-up

**Step-by-step User Actions**

1. Workshop user marks a Job as `รอวัตถุดิบ` and records material names/notes only.
2. Material stock user opens `สต๊อกวัสดุ`.
3. User sees waiting-materials alerts and material stock quantities.
4. User can summarize waiting-materials needs into `สร้างใบสั่งซื้อวัสดุ`.
5. If a waiting-material note is free text, user matches it to an existing Material Item or creates a new Material Item first.
6. If the waiting-material summary contains multiple suppliers, the system splits the work into separate Material Purchase Orders by supplier.
7. User creates a Material Purchase Order with date, one supplier/store, material lines, quantities, and units; the document becomes `รอรับเข้า` immediately.
8. User can print A4 or export JPG/image for purchasing.
9. While the document is `รอรับเข้า`, user can edit or cancel it.
10. When all goods arrive, user accepts the whole Material Purchase Order into stock.
11. If the purchase document is linked to Jobs waiting for materials, user reviews a receipt confirmation modal listing the Jobs that will be released.
12. System increases material stock for every line, releases linked Jobs from `รอวัตถุดิบ`, and creates a Payment Audit Follow-up for finance/payment work.
13. Separately, staff use `ปรับยอดวัสดุ` to enter actual counted quantities for selected materials.

**System Actions**

- Does not reserve, issue, move, or deduct material stock from Job waiting-material notes.
- Shows material stock as `จำนวนที่มีอยู่`, receiving movement, latest adjustment/receipt, and movement history.
- Requires Material Item code, name, primary supplier, material category, and unit.
- Keeps material item image optional, while warning that missing images make counting harder.
- Allows each Material Item to have one current primary supplier; existing purchase/receipt documents keep their supplier snapshots if the primary supplier is later changed.
- Blocks primary supplier changes while that Material Item is in a `รอรับเข้า` Material Purchase Order.
- Filters Material Purchase Order line selection to active Material Items linked to the document supplier.
- Splits waiting-material summaries into separate Material Purchase Orders by supplier when needed.
- Hides waiting-material notes from the active purchase-summary list while they are already linked to an active Material Purchase Order.
- Creates Material Purchase Orders directly as `รอรับเข้า`; there is no draft Material Purchase Order.
- Requires complete date, supplier/store, material lines, quantity, and unit before creating the purchase document.
- If a linked material line is removed before receipt, removes that Job link and returns the Job to the purchase-summary list if it is still in `รอวัตถุดิบ`.
- If a linked Material Purchase Order is cancelled, removes all Job links from the document and returns still-waiting Jobs to the purchase-summary list.
- Does not allow manual Material Purchase Orders to link Jobs later.
- Does not allow linked Material Purchase Orders to add new Job links later, though normal unlinked material lines may be added.
- Accepts Material Purchase Orders only as full-document receipt; partial receipt is not in the starting workflow.
- For linked waiting Jobs, receipt shows a confirmation modal with Job ID, work/product name, return department queue, and related material.
- Releases only linked Jobs that are still in `รอวัตถุดิบ`, returns them to their previous department queue, restarts department aging, and records a Job Activity Log.
- Does not show `มีใบสั่งซื้อแล้ว` in Job Detail while waiting to receive.
- Does not show a `รับวัตถุดิบแล้ว` badge or send a separate department notification after receipt.
- Creates payment-audit follow-up after stock receipt, but does not create an Expense Entry automatically.
- In Material Adjustment, calculates the difference from actual counted quantities and records the movement.

**Status Changes**

- Material Purchase Order: `รอรับเข้า` -> `รับเข้าสต๊อกแล้ว`, or `ยกเลิก`.
- Material quantity increases when a Material Purchase Order is accepted.
- Material quantity changes when Material Adjustment is saved.
- Linked Jobs in `รอวัตถุดิบ` leave waiting state when the linked Material Purchase Order is received.
- Payment Audit Follow-up is created after material stock receipt.

**Exit Condition**

- Material quantities are visible and updated through receipt or adjustment, while payment/audit work remains separate.

**Key Data Shown**

- Material name
- Material code
- Material category
- Supplier/store
- Unit
- Optional material image
- Quantity on hand
- Latest receipt/adjustment
- Waiting-material Job notes
- Linked Jobs that will be released by receipt
- Material Purchase Order number
- Attachments/evidence
- Payment-audit follow-up status where relevant

**UX Risks**

- Light material stock turns into full warehouse/BOM/material issue workflow too early.
- Users assume `รอวัตถุดิบ` reserves material stock.
- Material receipt creates real Expense entries automatically and mixes stock with finance.
- Partial receipt sneaks into the workflow and makes the first scope heavier.
- The automatic release from `รอวัตถุดิบ` is hidden, so departments do not understand why a Job returned to their queue.
- Manual Material Purchase Orders are accidentally allowed to release Jobs without explicit Job links.

**Blocking Open UX Questions**

- None for the current material boundary.
