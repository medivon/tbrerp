# Flow Map

This UX flow map is derived only from:

- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/initial-scope.md`

It maps the confirmed starting scope: งานสั่งทำ / Job operations, with `Admin Dashboard` as the first screen. This file should not introduce new requirements, expand scope, or replace the source files above.

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
5. Admin enters quantity, price, and required Payment Term.
6. Admin optionally records Payment Record.
7. If custom work exists, admin enters `รายละเอียดงานสั่งทำ` inside each custom line until it is complete enough to create `JOB-O`.
8. If the Order mixes ready-stock and custom work, admin sees default `ส่งพร้อมกัน`; actual split shipment later happens by selecting only ready lines in shipment-round creation.
9. Admin either saves the work as Draft Order or presses `สร้างออเดอร์` to open Order Review.
10. Admin reviews all entered data in row/card detail, with ready-stock and custom-work sections separated.
11. Admin resolves any inline warnings or acknowledgements on the Review screen, such as stock-insufficient ready-stock lines.
12. Admin presses `ยืนยันสร้างออเดอร์`.
13. System opens confirmed Order Detail.

**System Actions**

- Keeps unsaved Order Create/Edit work temporary while the user stays in the flow.
- Creates Draft No. only when user presses `บันทึกร่าง` or `ออกและบันทึก`.
- Keeps saved Draft Order out of stock reservation, Job creation, Shipment creation, and reports.
- Hides converted Draft Order from active draft UI by status after real Order creation.
- Creates Order ID only after required entry is complete.
- Reserves ready-stock lines when the real Order is created.
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
4. Delivery Team reviews item list, image, quantity, recipient, address, phone, carrier, COD, and notes.
5. Delivery Team attaches required evidence according to carrier setting.
6. Delivery Team adds short delivery note if needed.
7. Delivery Team marks `ส่งออกแล้ว`.

**System Actions**

- Shows released Shipments only.
- Places Shipments without delivery date in `รายการต้องจัดส่งวันนี้`.
- Places future-date Shipments in `รายการรอวันจัดส่ง`.
- Moves future-date Shipments to today's tab on the delivery date.
- Prevents Delivery Team from changing item list, address, carrier, COD, or closing Shipment.
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
- COD
- Notes
- Evidence requirements
- Tracking/evidence fields where applicable

**UX Risks**

- Delivery Team sees edit controls for master shipment data.
- Evidence requirements are unclear at the moment of send-out.
- Future Shipments are mixed into today's work.
- `ส่งออกแล้ว` is mistaken for final Shipment close.

**Blocking Open UX Questions**

- Carrier-specific evidence requirements are blocking for detailed evidence-capture screen specs.

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
4. Admin closes Shipment when review is acceptable.
5. Admin checks whether the related Order has any remaining required Shipments.
6. Admin leaves COD/payment issues in financial follow-up when they are not operational delivery blockers.

**System Actions**

- Shows `ส่งออกแล้ว` Shipments in the shared admin close queue.
- Preserves Shipment Owner but allows shared admin close by permission.
- Closes the Shipment after admin action.
- Completes the Order only when all required Order Shipments are closed.
- Keeps Financial Follow-up separate from Order Completion.

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
