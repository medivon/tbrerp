# THAIBORAN ERP Context

This context defines the shared business language for the THAIBORAN ERP. It focuses on the first UX/UI scope: custom work tracking from order capture through production, outsource, shipment readiness, and shipment closure.

## Language

### Commercial Work

**Customer (ลูกค้า)**:
The person or organization that buys from THAIBORAN and owns the CRM history, limited address book, tier, social contacts, and sales summary.
_Avoid_: Client, account, buyer

**Customer Code (รหัสลูกค้า)**:
A system-generated customer identifier such as `tbr-cus-000001`, using prefix `tbr-cus-` plus a six-digit running number, used for stable sorting and reference in Customer search/list.
_Avoid_: Phone number, social handle

**Customer Primary Phone (เบอร์หลักลูกค้า)**:
The digits-only main phone number stored on a Customer for search, contact, and order creation.
_Avoid_: Recipient phone when discussing delivery-only contact

**Customer Social Contact (ช่องทาง Social ลูกค้า)**:
An optional social platform row stored on a Customer, starting with `Facebook`, for search and future message integration.
_Avoid_: CRM Note, social login, imported chat identity

**Customer Tier (ระดับลูกค้า)**:
A configurable customer level such as ลูกค้าปกติ, ลูกค้า VIP, ลูกค้า VVIP, or ระวังเป็นพิเศษ that describes broad relationship status and may provide simple default order discounts.
_Avoid_: Customer Tag, full wholesale pricing rule

**Customer Tier Discount (ส่วนลดตามระดับลูกค้า)**:
An optional percentage discount from a Customer Tier, separated between ready-stock goods and custom work, suggested as the final discount during new Order creation.
_Avoid_: Product price list, promotion campaign, wholesale pricing engine

**Customer Status (สถานะลูกค้า)**:
Whether a Customer is active for new Orders or deactivated while remaining visible for history.
_Avoid_: Deleting customer history

**Customer Sales Summary (สรุปยอดซื้อของลูกค้า)**:
The maintained total successful sales amount (`ยอดซื้อรวม`) and successful Order count for a Customer, counted from Orders whose required shipments are completed and not cancelled.
_Avoid_: Accounting ledger, outstanding balance, forecast

**Recipient (ผู้รับสินค้า)**:
The person or place that receives a shipment for a Customer.
_Avoid_: Customer when the buyer and receiver are different

**Address Entry (ที่อยู่จัดส่ง)**:
A saved recipient name, phone number, optional label, and structured delivery address under a Customer, with one default Address Entry and at most three saved Address Entries per Customer.
_Avoid_: Free-floating address

**Incomplete Customer Address (ข้อมูลที่อยู่ยังไม่ครบ)**:
A Customer address state that allows early Customer capture but blocks real Order creation until the customer name, primary phone, house/address detail, subdistrict, district, province, and postal code required by Order creation are complete.
_Avoid_: Draft Order, Shipment snapshot

**Order Customer Requirement (ข้อมูลลูกค้าขั้นต่ำสำหรับออเดอร์)**:
The minimum Customer data required before creating a real Order: customer name, primary phone, address detail, subdistrict, district, province, and postal code.
_Avoid_: Full CRM profile

**Order Recipient Detail (ข้อมูลผู้รับในออเดอร์)**:
The recipient, phone, and address snapshot stored on a confirmed Order, independent from later Customer address-book changes.
_Avoid_: Customer master, Shipment snapshot

**Order (ออเดอร์)**:
A confirmed sale record created only after order entry is complete enough to become real operational work.
_Avoid_: Quote, lead, draft, payment

**Order Entry Session (การกรอกออเดอร์ชั่วคราว)**:
Temporary order-entry work while an admin is still on the create or review screens; it has no Draft No. unless explicitly saved.
_Avoid_: Draft Order, Order, autosaved record

**Draft Order (ร่างออเดอร์)**:
A saved unfinished order entry that has a Draft No. but does not reserve stock, create jobs, create shipments, or enter reports.
_Avoid_: Order, Quotation, autosave

**Order Line (รายการในออเดอร์)**:
One sellable line inside an Order, either ready-stock goods or custom work.
_Avoid_: Job when the item is ready-stock only

**Order Line Edit (แก้ไขรายการออเดอร์)**:
A guarded post-confirmation edit mode entered from Order Detail for adding, removing, or changing Order Lines while respecting stock reservation, Order Jobs, Shipments, and history.
_Avoid_: New Order, Draft Order, hidden autosave edit

**Cancelled Order Line (รายการออเดอร์ที่ยกเลิกแล้ว)**:
An Order Line that remains visible as Order history but no longer counts toward active item count, active Order total, shipment selection, or Order status calculation.
_Avoid_: Deleted item, hidden line

**Order Status (สถานะออเดอร์)**:
The active-line operational state of an Order, calculated separately from Shipment round status and financial follow-up.
_Avoid_: Shipment status, payment status

**Shipment Summary (สถานะการจัดส่งในออเดอร์)**:
The Order-facing summary of Shipment rounds, carrier, tracking or shipment evidence, and delivery confirmation state.
_Avoid_: Order status, payment status

**Order Shipment Plan (แผนการจัดส่งของออเดอร์)**:
The Order-level default intent for mixed ready-stock and custom-work Orders; actual combined or split shipment is created by selecting ready lines for a Shipment round.
_Avoid_: Shipment, delivery round, Order status

**Payment Term (เงื่อนไขการชำระเงิน)**:
The commercial agreement for how an Order should be paid.
_Avoid_: Payment record

**Payment Record (รายการรับเงิน)**:
An accepted payment entry such as transfer, cash, card, or COD amount recorded against an Order, Shipment, or finance follow-up context. It must store payment date/time, amount, payment method, evidence slip/photo, related object, and recorder. In the starting workflow, overpayment is not a separate system flow; record the amount accepted for the Order/context and let admin handle any excess outside the system workflow.
_Avoid_: Payment term, audit confirmation, Job approval

**Financial Follow-up (ติดตามการเงิน)**:
The separate management view for COD, payment audit, outstanding payments, deposits retained, or customer credit. A permitted finance user can resolve a follow-up item by closing it with required payment evidence or explanatory note for audit trail; this is not full accounting approval in the starting workflow.
_Avoid_: Order completion, accounting close

**Payment Audit Follow-up (รายการรอตรวจจ่าย)**:
A finance follow-up item created when an operational document, such as a received Material Purchase Order, needs a permitted finance user to record the actual payment or expense separately.
_Avoid_: Automatic Expense Entry

**Financial Reconciliation (ตรวจยอดการเงิน)**:
The check during Order total edits that sales total and recorded financial evidence or adjustment notes line up before the edit can be saved.
_Avoid_: Full accounting, tax workflow, Order status

**Operational Alert (แจ้งเตือนการทำงาน)**:
An in-app signal shown through queues, badges, status chips, inline warnings, or critical previews on the working screen. It is resolved by the underlying work state or action, not by a separate read/unread inbox.
_Avoid_: Chat notification, push notification, external webhook in the starting workflow

**Alert Event (เหตุการณ์แจ้งเตือน)**:
A named module event that creates or updates an Operational Alert, such as urgent Job, near delivery date, waiting material, Job Revision, COD/payment follow-up, stock-negative warning, or failed action. Event names and module boundaries should stay clear so future API/webhook/hook integrations can be added without changing the business meaning.
_Avoid_: One-off toast text, unstructured notification message

**Management Report (รายงานบริหาร)**:
A first-scope summary for unfinished work, urgency, blockers, age, sales, delivery send-out, expense, rough profit, and finance follow-up. It supports operational clarity and management review, not formal accounting statements.
_Avoid_: Tax report, accounting ledger, individual performance scorecard

### Product and Custom Work

**Product Model (SKU หลัก / SKU ใหญ่)**:
The parent product definition that represents the main sellable design family and owns the shared size, category, images, and available color options.
_Avoid_: SKU when discussing variants or stock units

**SKU Variant (SKU ย่อย)**:
A concrete sellable/stockable color version under a Product Model.
_Avoid_: Product Model

**Product Color Option (สีของสินค้า)**:
A value from **รายการสี** enabled or disabled for one Product Model, creating or reusing the corresponding SKU Variant for that product-color pair.
_Avoid_: Free-text color, duplicate SKU Variant for the same product and color

**Product Settings (ตั้งค่าสินค้า)**:
The Settings area for product-related reference lists used when creating products and production instructions, such as หมวดหมู่สินค้า, แท็กสินค้า, รายการสี, รายการลายรักสมุก, รายการลายแกะสลัก, and รายการสีคริสตัล.
_Avoid_: ข้อมูลตั้งต้นสินค้า, CRUD, Master in staff-facing labels

**System Controlled List (รายการตั้งค่าควบคุม)**:
A simple configurable list used to reduce free-text chaos in operational work, such as payment methods, expense categories, Customer Tiers, Service Case Types, carriers, material units, or material categories. Used values may be renamed when the meaning stays the same, while historical documents keep their captured snapshots. If the meaning changes, close/inactivate the old value and create a new one.
_Avoid_: Full workflow builder, technical master table label, hard-deleting used values

**Product Setting Item Status (สถานะรายการตั้งค่าสินค้า)**:
Product setting records can be active, inactive, or deleted only when unused. Once a setting record has been used by a Product Model, SKU Variant, Order, Job, or historical production instruction, it is closed with `ปิดใช้งาน` instead of being deleted.
_Avoid_: Deleting used setting data, changing historical meaning silently

**Product Category (หมวดหมู่สินค้า)**:
The controlled product category list used for grouping Product Models and generating the category part of SKU Variant codes.
_Avoid_: Free-text category, changing category code after SKU creation

**Product Subcategory (หมวดหมู่ย่อย)**:
An optional grouping under one Product Category. It helps search and organization but is not included in SKU Variant codes.
_Avoid_: Subcategory as part of SKU code

**Product Tag (แท็กสินค้า)**:
A text-only tag used only for product search and grouping.
_Avoid_: Workflow control, permission control, pricing, discount logic

**Color List (รายการสี)**:
The controlled list of colors used for product color options and SKU Variant color codes.
_Avoid_: Free-text color, Color Master as a staff-facing label

**Rak Samuk Pattern List (รายการลายรักสมุก)**:
The controlled list of Rak Samuk patterns used to classify/search product and Job instructions.
_Avoid_: Rak Samuk Pattern Master as a staff-facing label

**Carving Pattern List (รายการลายแกะสลัก)**:
The controlled list of carving patterns used to classify/search product and Job instructions.
_Avoid_: Carving Pattern Master as a staff-facing label

**Crystal Color List (รายการสีคริสตัล)**:
The controlled list of crystal colors used where crystal decoration details are needed.
_Avoid_: Crystal Color Master as a staff-facing label

**Job (งานสั่งทำ / custom job)**:
A custom production work unit with production instructions, images, source type, and workflow status.
_Avoid_: Order, Production Batch, Custom Product

**Custom Work Detail (รายละเอียดงานสั่งทำ)**:
The production-ready detail entered on a custom Order Line before confirmation, which becomes the Order Job detail when the Order is confirmed.
_Avoid_: Draft Job, Order note, private CRM note

**Job Source Type (ประเภทต้นทางของ Job)**:
The source of a Job, either Order or Production.
_Avoid_: Inferring source from the ID only

**Order Job (JOB-O / งานลูกค้า)**:
A Job created from an Order Line and ending in shipment readiness.
_Avoid_: Production Job

**Production Job (JOB-P / ผลิตเข้าสต๊อกหรือผลิตทดลอง)**:
A Job created from Production work; when tied to a SKU Variant, completion increases Ready Stock by its production quantity, while custom/prototype work can end as Done without entering stock.
_Avoid_: Order Job

**Draft Production Job (ร่างงานผลิต)**:
A saved unfinished production-entry record with `PROD-DRAFT` number that does not create a JOB-P, enter department queues, or affect stock.
_Avoid_: Production Job, Production Batch, Draft Order

**Production Batch (ชุดผลิต)**:
A management container for producing goods for stock or prototype work.
_Avoid_: Order

**Production Lot (ล็อตผลิต)**:
A smaller production unit inside a Production Batch, split by the actual quantity routed through a department or outsource worker.
_Avoid_: Job when discussing the batch split itself

**Job Reference on Product Model (อ้างอิงจาก Job)**:
An optional lookup reference from a Product Model to the Job it came from, used only for traceability.
_Avoid_: Copying Job data into SKU automatically

**Ready Stock (สินค้าพร้อมส่ง)**:
Sellable stock that can be reserved for an Order Line without creating a Job.
_Avoid_: Work in progress, Production Job

**Stock On Hand (มีอยู่ในร้าน)**:
The physical quantity currently recorded for a SKU Variant before subtracting reservations.
_Avoid_: Available stock

**Reserved Stock (จองแล้ว)**:
The quantity of a SKU Variant reserved by confirmed Orders.
_Avoid_: Shipped stock

**Sellable Stock (ขายได้)**:
The computed quantity available for new sale after subtracting Reserved Stock from Stock On Hand.
_Avoid_: Mixing with Stock On Hand or using คงเหลือ ambiguously

**Supplier / Store (ผู้ขาย/ร้านค้า)**:
An external source used on purchase documents; the same master can be used for product and material purchases without requiring product-SKU relationships.
_Avoid_: Customer, mandatory supplier-SKU relation

**Product Purchase Order (ใบสั่งซื้อสินค้า)**:
A purchase document for bringing finished Product/SKU items into Ready Stock from a Supplier/Store, supporting partial receipts per SKU line.
_Avoid_: Material Purchase Order, Stock Adjustment, Production Job

**Product Stock Receipt (รอบรับเข้าสินค้า)**:
One receiving event against a Product Purchase Order that records actual received quantities and increases Ready Stock for those SKU Variants.
_Avoid_: Material Stock Receipt, Stock Count

**Stock Count (ตรวจนับสต๊อกสินค้า)**:
A periodic product-stock count session that records actual Stock On Hand for selected SKU Variants.
_Avoid_: Purchase, expense entry, counting Sellable Stock

**Stock Adjustment (ปรับยอดสต๊อกสินค้า)**:
A product-stock correction that records the actual counted Stock On Hand, reason, movement, and log.
_Avoid_: Deletion, hidden correction, editing old stock movement

**Stock Movement (ประวัติสต๊อก)**:
An immutable product-stock history entry for stock receipt, production stock-in, adjustment, reservation, reservation release, or count confirmation.
_Avoid_: Editable stock total

**Light Material Stock (สต๊อกวัสดุแบบเบา)**:
Simple material stock for easy-to-count internal materials such as color supplies, drawer rails, staples, and similar consumables. It tracks quantity on hand, receipts, adjustments, and daily/period summaries without full warehouse, BOM, or automatic Job consumption.
_Avoid_: Full material master, BOM, automatic material issue/transfer workflow

**Material Item (วัสดุ)**:
One counted material record in Light Material Stock, with system-generated material code, name, material category, unit, optional image, and one current primary supplier for purchase flow.
_Avoid_: SKU Variant, product sold to customers

**Material Code (รหัสวัสดุ)**:
A system-generated code for a Material Item, such as `MAT-0001`, shown and searchable but secondary to the material name and image.
_Avoid_: User-created supplier code as the main material identity

**Primary Material Supplier (ผู้ขายหลักของวัสดุ)**:
The one current supplier/store linked to a Material Item for new Material Purchase Orders. Changing it affects future purchase documents only; old documents keep their captured supplier. It cannot be changed while that Material Item is in a waiting-to-receive Material Purchase Order.
_Avoid_: Multiple suppliers per Material Item in the starting workflow

**Material Category (หมวดวัสดุ)**:
A lightweight grouping managed inside the material stock area.
_Avoid_: Product Category

**Material Purchase Order (ใบสั่งซื้อวัสดุ)**:
A one-supplier material purchase document used to list materials to buy, print/export while waiting to receive, and accept the whole document into Light Material Stock. It is created directly as `รอรับเข้า` when required fields are complete; there is no draft Material Purchase Order in the starting workflow.
_Avoid_: Draft Material Purchase Order, Expense Entry, full accounting purchase order, partial receipt

**Material Stock Receipt (รับเข้าสต๊อกวัสดุ)**:
The act of accepting a Material Purchase Order and increasing material stock for every line in the document. If the purchase document is linked to Jobs waiting for materials, receipt also releases those Jobs from `รอวัตถุดิบ` back to their previous department queue and records a Job Activity Log.
_Avoid_: Product Ready Stock increase, creating an Expense automatically, department notification, return-to-queue badge

**Material Adjustment (ปรับยอดวัสดุ)**:
A lightweight material count/correction screen where staff enter actual counted quantities for selected materials and the system records the difference. It can be used daily, weekly, or on any chosen date range.
_Avoid_: Separate เบิกวัสดุ, automatic Job material consumption

**Material Need Note (รายการรอวัตถุดิบ)**:
An optional note from a Job's `รอวัตถุดิบ` state listing missing material names and notes. It helps create purchase orders and can keep an internal link to the waiting Job, but does not reserve, issue, move, or deduct material stock.
_Avoid_: Material requisition, material reservation

### Production Workflow

**Woodwork Queue (คิวช่างไม้)**:
The list of Jobs currently requiring action from the woodwork department.
_Avoid_: All production work

**Coloring Queue (คิวฝ่ายสี)**:
The list of Jobs currently requiring action from the coloring and decoration department.
_Avoid_: Woodwork queue

**Waiting for Coloring Intake (รอรับเข้าโรงงานสี)**:
The state for work physically waiting to be received into the coloring department.
_Avoid_: Coloring queue

**Urgent Label (งานด่วน)**:
A visual priority label set by an authorized admin or manager.
_Avoid_: Deadline

**Hold (พักงานระดับ Job)**:
A Job state used when work should not proceed until released.
_Avoid_: Shipment Send-out Hold, customer cancellation

**Waiting for Materials (รอวัตถุดิบ)**:
A Job state set by a workshop department when work is blocked by missing materials.
_Avoid_: Hold

### Rak Samuk Outsource

**Rak Samuk Work (งานรักสมุก)**:
Outsource decorative line work routed from a Job or Production Lot to one Rak Samuk worker.
_Avoid_: Generic outsource when discussing first-scope payment flow

**Rak Samuk Return (รับงานรักสมุกกลับ)**:
The internal receipt of Rak Samuk Work back into the shop; in the starting workflow it always routes to Waiting for Coloring Intake.
_Avoid_: Worker completion, destination picker, returning to sender

**Rak Samuk Worker (ช่างรักสมุก)**:
An outsource worker account that can view assigned Rak Samuk Work and limited payment information for their own work.
_Avoid_: Employee, internal workshop user

**Rak Samuk Standard Rate (ราคามาตรฐานรักสมุก)**:
The standard per-piece rate stored on the Product Model.
_Avoid_: Sales price, SKU Variant price

**Rak Samuk Proposed Price (ราคาที่แจ้งต่อชิ้น)**:
The per-piece price proposed by a Rak Samuk Worker for one assigned missing-price Rak Samuk Work item before finance/payment approval.
_Avoid_: Total job price, sales price, worker payout round

**Payment Voucher (ใบสำคัญจ่าย / PV)**:
A payment document issued after payment is confirmed, using monthly running numbers.
_Avoid_: Draft payout, invoice

### Fulfillment

**Shipment (รอบจัดส่ง)**:
A dispatch round created by admin from ready-to-ship Order Lines or Service Cases.
_Avoid_: Order, Delivery Note

**Draft Shipment (ร่างรอบจัดส่ง)**:
A Shipment being prepared by admin before release to the delivery team.
_Avoid_: Waiting for delivery

**Delivery Note (ใบส่งของ)**:
The printable item list for a Shipment, focused on product identification, quantity, image, and notes.
_Avoid_: Shipping Sheet, COD amount

**Shipping Sheet (ใบจัดส่ง)**:
The printable recipient/address sheet for a Shipment, focused on recipient, phone, address, carrier, references, and COD amount where relevant.
_Avoid_: Delivery Note

**Delivery Send-out (ส่งออกแล้ว)**:
The Delivery Team's operational handoff that records a released Shipment has left for delivery and should enter admin shipment confirmation.
_Avoid_: Shipment close, proof capture, tracking confirmation

**Shipment Send-out Hold (พักการส่งออก)**:
A delivery-step hold used when a Shipment or ready-to-ship work should not be sent out yet. It does not move the Order Line, Job, or Service Case backward out of ready-to-ship; the issue is handled in the shipment/send-out step.
_Avoid_: Job Hold, reverting ready-to-ship status, cancelling upstream work

**Shipment Evidence (หลักฐานจัดส่ง)**:
The admin-confirmed delivery proof captured before closing a Shipment, either tracking or one or more delivery evidence photos.
_Avoid_: Carrier-specific evidence checklist, payment evidence, COD audit

**Service Case (งานบริการหลังการขาย)**:
An after-sales record used for real follow-up events such as refund notes, returned goods, sending goods back to the customer, claim notes, or similar service handling after the event exists. It may reference a Customer or an old Order for context only, but its actions and status do not affect that Order, and changes to the Order do not affect the Service Case.
_Avoid_: Reopening the original Order, repair Job, Order status

**Service Shipment (รอบจัดส่งงานบริการ)**:
A Shipment created from a Service Case that does not affect the original Order completion or sales total.
_Avoid_: Order Shipment

### CRM and Media

**CRM Note (บันทึก CRM)**:
A timeline note about customer behavior, preferences, relationship context, or sales context.
_Avoid_: Shipment note, Job note

**Customer Tag (แท็กลูกค้า)**:
A public or private colorable CRM label used to group or flag Customers without changing their Customer Tier.
_Avoid_: Product Tag, Customer Tier, permission role

**Review Album (คลังรีวิว)**:
A group of review images that may link to zero or more SKUs, and optionally to a Customer or Order.
_Avoid_: Product image, CRM image

**Department Instruction Images (รูปงานตามแผนก)**:
Images on a Product Model, SKU, or Job grouped for woodwork, coloring/decoration, or Rak Samuk instructions.
_Avoid_: Review images

### Operations and Audit

**Shared Queue (คิวงานร่วม)**:
A role-based task list visible to users with the same permission group.
_Avoid_: Personal assignment when the task belongs to a department

**Owner (ผู้รับผิดชอบหลัก)**:
The user recorded as the creator or primary responsible person for an Order, Shipment, or other document.
_Avoid_: Exclusive assignee

**Current Handler (ผู้ที่ต้องทำต่อ)**:
The current user, department, or shared queue responsible for the next operational action. It answers where the work should move next, while Owner answers traceability.
_Avoid_: Owner, creator, performance score

**Activity Log (ประวัติการทำงาน)**:
Operational history visible to relevant team members, such as received, completed, or sent.
_Avoid_: Audit log

**Management Log (ประวัติสำหรับผู้จัดการ)**:
History of business-sensitive changes such as changing owner, cancelling shipment, adjusting stock, or editing outsource rates.
_Avoid_: Activity log

**Audit Log (ประวัติตรวจสอบ)**:
Restricted history visible to the highest permission level for rights changes, critical overrides, and sensitive financial changes.
_Avoid_: Activity log

**Sensitive Operational Data (ข้อมูลอ่อนไหวในการทำงาน)**:
Business-sensitive information that must be hidden from users without the matching permission, such as product cost, profit, COD/payment detail, Rak Samuk rates outside the worker's own price, other workers' payout, and Audit Log detail.
_Avoid_: Disabled-only action, public queue summary

**Expense Entry (รายการค่าใช้จ่าย)**:
A simple internal expense record with actual payment date, amount, user-defined category, payee, evidence, and optional line items. It can record refunds from Service Cases and does not update stock automatically.
_Avoid_: Accounting journal

## Relationships

- A **Customer** has one **Customer Code**, one **Customer Primary Phone**, zero or more **Customer Social Contacts**, up to three **Address Entries**, many **Orders**, many **CRM Notes**, many **Customer Tags**, many **Service Cases**, and optional **Review Albums**; each Customer has one **Customer Tier**, one **Customer Status**, and one **Customer Sales Summary**.
- A **Customer Tier** may define **Customer Tier Discounts** for ready-stock goods and custom work; those defaults are suggested during Order creation and copied into the Order as editable/logged discount context.
- An **Address Entry** belongs to exactly one **Customer**, one Address Entry may be the default, an **Order** has frozen **Order Recipient Detail**, and a **Shipment** stores its own recipient/address snapshot used at dispatch time.
- An **Order Entry Session** may become one **Draft Order** when saved, or one **Order** when confirmed.
- A **Draft Order** may become one **Order**; after conversion it is archived/read-only and no longer shown in active draft work.
- An **Order** has many **Order Lines**, has **Order Recipient Detail**, has one **Order Shipment Plan** only when mixed line types need a delivery decision, and may create many **Shipments**.
- An **Order** has an **Order Status** calculated from active Order Lines; **Shipment Summary** is shown separately from Order Status.
- An **Order Line** can be ready-stock only or custom work, and may become a **Cancelled Order Line** while remaining visible for history.
- **Order Line Edit** may add, remove, or change safe **Order Lines** after confirmation, but it is not a Draft Order and does not create hidden autosave records.
- A custom **Order Line** carries **Custom Work Detail** during order entry or guarded Order Line Edit, and creates one **Order Job** when the Order is confirmed or when the completed new custom line is saved after confirmation.
- A ready-stock **Order Line** reserves **Ready Stock** when the Order is confirmed or when the line is added after confirmation, but does not create a **Job**.
- A **Payment Record** may be captured during Order entry or later Financial Follow-up, but missing Payment Records do not block **Order Job** creation.
- A **Payment Record** can be corrected later only with clear old/new value, reason, editor, and follow-up visibility; corrections do not silently rewrite received-money history. If a closed follow-up depended on the corrected amount, finance should re-check that follow-up.
- Payment Method mistakes do not require a new follow-up when the amount is correct.
- A **Financial Follow-up** item is resolved when a permitted finance user closes it with required payment evidence or explanatory note; operational Order and Shipment completion remain separate.
- COD belongs to the Shipment round that carries it. A Shipment COD amount can be corrected before send-out by an authorized user with log; after send-out or close, avoid changing the Shipment and handle rare mistakes through finance notes/manual handling.
- **Financial Reconciliation** can block saving an Order total edit when the new sales total does not line up with financial records or adjustment notes; this is separate from normal Order operation.
- A **Job** has exactly one **Job Source Type**: Order or Production.
- An **Order Job** belongs to an Order Line and becomes ready for **Shipment** only after production is complete.
- A **Draft Production Job** may become one **Production Job** after production review; after conversion it is archived/read-only and hidden from active draft production work.
- A **Production Batch** has many **Production Lots**; a Production Lot may create one or more **Production Jobs** depending on how production is split.
- A **Production Job** tied to an SKU Variant increases **Ready Stock** by its production quantity when completed; a custom/prototype Production Job may end as Done without entering stock.
- A **Shipment** creates one **Delivery Note** and one **Shipping Sheet**; users may print either or both.
- A **Shipment** may be marked **Delivery Send-out** by the **Delivery Team** without **Shipment Evidence**; it can be closed only by admin after at least tracking or one delivery evidence photo is recorded. Delivery reporting uses the **Delivery Send-out** date, while Order Completion still waits for Shipment close.
- Ready-to-ship work should not move backward during Shipment creation. If a ready Shipment should not leave yet, use **Shipment Send-out Hold** or manual shipment-step handling instead of reverting the upstream Order Line, Job, or Service Case.
- **Order Completion** happens when all required Order Shipments are closed; **Financial Follow-up** is separate.
- A **Service Case** may reference a **Customer** or **Order** for context, and may create a **Service Shipment**, but it does not reopen, close, edit, or recalculate the referenced Order. The referenced Order also does not control the Service Case's status. If the reference is wrong, it may be corrected with log because it is contextual only.
- A **Service Case** should be recorded after the real event exists. Do not create hypothetical/draft service-finance records before the business event happens.
- **Rak Samuk Work** is assigned to exactly one **Rak Samuk Worker** in the first scope.
- A **Rak Samuk Worker** can see only their assigned work and limited own-payment information.
- A **Rak Samuk Proposed Price** belongs to one missing-price **Rak Samuk Work** item and must be approved by a finance/payment-permission user before it becomes the approved per-piece work price.
- **Rak Samuk Return** always sends the Job to **Waiting for Coloring Intake** in the starting workflow.
- A **Payment Voucher** is issued only after payment is confirmed and receives a monthly running PV number.
- A **Review Album** can link to zero or many SKU Variants and optionally to one Customer or Order.
- **Product Settings** contains controlled product lists for categories, tags, colors, patterns, and decoration values.
- A **Product Category** can have many **Product Subcategories** and many **Product Models**.
- A **Product Tag** can be linked to many **Product Models**, but it is only for search/grouping.
- A **Product Model** has many **Product Color Options**, and each enabled Product Color Option has exactly one corresponding **SKU Variant**.
- A **SKU Variant** is unique for one **Product Model** and one **Color List** value; duplicate variants for the same product-color pair are blocked.
- A **Color List** value may be linked to many **Product Models** through Product Color Options; its code is locked after it is used in a SKU Variant code.
- **Rak Samuk Pattern List**, **Carving Pattern List**, and **Crystal Color List** values can classify Product/Job instruction details, but they do not create SKU codes.
- A **Product Model** may optionally reference one **Job** as its origin, but this reference never copies or syncs Job data.
- **Stock On Hand**, **Reserved Stock**, and **Sellable Stock** are separate stock views for the same **SKU Variant**; **Sellable Stock** may become negative after permitted over-reservation.
- A **Product Purchase Order** has one **Supplier / Store**, many SKU lines, and many **Product Stock Receipts** when receiving happens in parts.
- A **Product Stock Receipt** increases **Ready Stock**; if every Product Purchase Order line is fully received, a **Payment Audit Follow-up** is created for the full purchase document.
- A **Product Stock Receipt** is immutable after save; wrong receipt quantities are corrected through **Stock Adjustment** / **Stock Movement**, not by editing the original receipt round.
- A **Product Purchase Order** can close remaining unreceived quantity per line with `ปิดยอดที่เหลือ`; any line closed this way becomes `รับเข้าสต๊อกยังไม่ครบ`, makes the document `รับเข้าสต๊อกยังไม่ครบ`, and does not create Payment Audit Follow-up.
- A Product Purchase Order line closed with reason `ปรับยอดแล้ว` must reference a same-SKU Stock Count or Stock Adjustment movement that increases stock enough to cover the closed remaining quantity.
- Product Purchase Order SKU selection is not filtered by Supplier/Store because product supplier-to-SKU relationships are not required in the starting workflow.
- **Stock Counts** and **Stock Adjustments** affect product stock visibility but remain separate from **Expense Entries**.
- **Stock Count** records actual physical **Stock On Hand** only; stock counters do not need to reason about **Reserved Stock** or **Sellable Stock** while counting.
- Completing a **Stock Count** creates **Stock Movement** entries for every counted SKU Variant, including zero-difference entries such as `ยืนยันสต๊อกถูกต้อง`.
- **Light Material Stock** is separate from **Ready Stock**. Material quantities do not have `จองแล้ว` or `ขายได้` in the starting workflow.
- Each **Material Item** has one current **Primary Material Supplier** for the starting workflow. Existing Material Purchase Orders and receipts keep the supplier captured at the time of the document.
- A **Material Purchase Order** has exactly one supplier/store. Its material picker shows only active Material Items linked to that supplier.
- A **Material Purchase Order** can create a **Material Stock Receipt** for the whole document; after receipt, a referenced **Payment Audit Follow-up** may be created, but no Expense Entry is created automatically.
- A **Material Need Note** may reference Material Items or free-text material names from Jobs waiting for materials, but it does not reserve or deduct stock.
- When waiting-material notes are summarized into purchase work, unresolved free-text lines must be matched to an existing Material Item or converted into a new Material Item before entering a Material Purchase Order.
- Summarizing waiting-material notes that involve multiple suppliers creates separate Material Purchase Orders by supplier.
- Waiting-material notes already linked to an active Material Purchase Order are not shown again as new purchase-summary candidates.
- If linked material lines are removed from a waiting-to-receive Material Purchase Order, or the purchase document is cancelled, the affected waiting-material notes can return to the purchase-summary list if their Jobs are still waiting for materials.
- Manual Material Purchase Orders cannot link Jobs after creation. Material Purchase Orders created from waiting-material notes cannot add new Job links later, though they may add normal unlinked material lines.
- Receiving a Material Purchase Order that is linked to waiting Jobs releases only those linked Jobs from **Waiting for Materials**, returns them to their previous department queue, and writes the release in the Job Activity Log. It does not add a badge or separate notification.
- **Expense Entries** and stock movements are separate first-scope records; neither updates the other automatically.
- **Expense Entries** can be corrected by permission with log for operational mistakes such as wrong category; report grouping follows the latest active value in this non-accounting starting workflow.
- **Operational Alerts** are in-app queue/status/event signals in the starting workflow. They do not have a separate read/unread inbox or notification history; resolved work state is the source of truth. Existing alerts should not repeatedly open modals/toasts; keep the chip/queue state visible.
- **Alert Events** should stay module-specific and named clearly enough to support future external hooks, APIs, or webhooks.
- **Management Reports** summarize work and money for operating visibility. They are separate from formal accounting and tax reporting.
- **System Controlled List** values can be configured where they reduce operational chaos. Values already used by history are closed/inactivated instead of deleted.

## UX/UI starting scope

The first UX/UI scope starts from งานสั่งทำ (Job) as the operating center, not from a generic ERP module list. The first screen to design is the Admin Dashboard because admin work creates and releases the main queues used by production, outsource, stock, shipment, and finance follow-up.

Included in the starting scope:

- Admin Dashboard: shared task cards for active Orders, active Jobs, waiting to create Shipment, waiting to close Shipment, Job revision follow-up, and COD/payment follow-up.
- Admin order creation flow: Order Entry Session, optional saved Draft Order, Order Review, Order, Order Line, payment term, optional payment record, and immediate `JOB-O` creation for complete custom work.
- Department dashboards: Woodwork Queue, Coloring Queue, Waiting for Coloring Intake, and simple history views.
- Rak Samuk outsource flow: send work, worker view, missing-price label, proposed price approval, receive back, and payment preparation.
- Shipment flow: admin ready-to-ship queue, Draft Shipment, release to delivery, delivery team send-out, admin close Shipment.
- Management overview: unfinished Jobs, department location, urgency, age, and timeline.
- Product/SKU and stock support required for the flow: Product Model, SKU Variant, Ready Stock, Product Purchase Order, Product Stock Receipt, Stock Count, Stock Adjustment, Light Material Stock, Material Purchase Order, Product Settings, department instruction images, and review albums.
- Simple Expense Entry and Payment Voucher concepts only where they support operating visibility and outsource payment.
- In-app Operational Alerts, System Controlled Lists, first-scope Management Reports, and simple print/export outputs where they support daily operation.

Explicitly outside the starting scope:

- Full accounting, tax invoice, formal quotation, channel/funnel reporting, BOM costing, payroll automation, full QC module, central media library, customer merge, shipping carrier API integrations, and Data Migration / Starting Data import planning for this decision-gate round.

## Example dialogue

> **Dev:** "A Customer Order has ready-stock goods and a custom cabinet. Should the delivery team see the custom cabinet immediately?"
> **Domain expert:** "No. The ready-stock line can become a Shipment now, but the custom cabinet becomes a JOB-O first. It only reaches the admin ready-to-ship queue after coloring marks it ready."

> **Dev:** "When admin starts creating an Order, do we create a Draft No. immediately?"
> **Domain expert:** "No. The entry can stay temporary while the user is on the screen. A Draft No. exists only when the user explicitly saves the work as a Draft Order."

> **Dev:** "Can a Production prototype use the same Job screen?"
> **Domain expert:** "Yes. It is a JOB-P. The workshop sees the same work card shape. If it is tied to a SKU, finishing it increases stock; if it is a prototype, it can simply become Done."

> **Dev:** "If the delivery address in a Shipment is different from the Customer's default address, do we rewrite the Customer?"
> **Domain expert:** "No. The Shipment keeps its own snapshot. If it looks like a real alternate address and the Customer has fewer than three saved addresses, ask whether to save it as a secondary Address Entry."

> **Dev:** "Should a VIP tier discount rewrite old Orders when the setting changes?"
> **Domain expert:** "No. New Orders can start with the current tier discount, but old Orders keep the discount snapshot used at creation."

> **Dev:** "If admin changes a Customer name or primary phone later, should old Orders change?"
> **Domain expert:** "No. Customer Detail shows the latest Customer data, but confirmed Orders keep their own snapshots."

> **Dev:** "Does the Delivery Team need Tracking or a photo before pressing `ส่งออกแล้ว`?"
> **Domain expert:** "No. `ส่งออกแล้ว` is only the delivery handoff. Admin records Tracking or a delivery photo later before closing the Shipment."

## Flagged ambiguities

- "Job" was used to mean both customer custom work and production custom work. Resolved: use **Job** as the shared custom work unit with **Job Source Type** and prefixes **JOB-O** / **JOB-P**.
- "Draft" was used for both temporary in-screen entry and a saved draft record. Resolved: **Order Entry Session** is temporary and unsaved; **Draft Order** is saved and has a Draft No.
- "Draft Job" was suggested for custom work inside a draft Order. Resolved: use **Custom Work Detail** on the custom **Order Line**; it becomes a **JOB-O** only when the Order is confirmed.
- "Order done" could mean shipped or financially settled. Resolved: **Order Completion** means all required shipments are closed; **Financial Follow-up** is separate.
- "Order status" and "Shipment status" were mixed in Order List. Resolved: **Order Status** and **Shipment Summary** are separate; `รอยืนยันการจัดส่ง` belongs to Shipment Summary, not Order Status.
- "Customer" was used for both buyer and delivery receiver. Resolved: **Customer** owns CRM and buying history; **Recipient** is the delivery receiver snapshot/address entry.
- "Payment" was used as if it approved `JOB-O` creation. Resolved: **Payment Record** is financial evidence/follow-up, not a gate for creating **Order Jobs**.
- "Payment never blocks Order" was too broad. Resolved: Payment does not block normal Order creation or operation, but **Financial Reconciliation** blocks saving an Order total edit when the edited total does not match financial evidence or adjustment notes.
- "Order Line Edit" sounded like a standalone screen. Resolved: **Order Line Edit** is a guarded edit mode/sub-flow entered from **Order Detail**, not a separate module or Draft Order.
- "ส่งพร้อมกัน" and "จัดส่งแยก" sounded like a heavy workflow switch. Resolved: the default mixed-Order intent is `ส่งพร้อมกัน`, while actual split shipment is handled by selecting ready lines when creating **Shipment** rounds.
- "MVP" sounded too vague for this workflow mode. Resolved: use **โหมดเริ่มใช้งานจริง** when describing the first usable operating mode.
- "ข้อมูลตั้งต้นสินค้า" sounded unnatural for staff-facing UI. Resolved: use **Product Settings** / `ตั้งค่าสินค้า` under the main `ตั้งค่า` area.
- "CRUD" and "Master" are technical wording. Resolved: use `เพิ่ม`, `แก้ไข`, `ปิดใช้งาน`, `เปิดใช้งาน`, and Thai list names such as `รายการสี` and `รายการลายรักสมุก` in staff-facing docs/UI.
- "สร้างจาก Job" sounded like copying Job data into SKU. Resolved: **Product Model** only stores an optional **Job Reference on Product Model** for traceability; SKU data is entered independently.
- "SKU หลัก" and "SKU ใหญ่" were both used for the parent product. Resolved: both refer to **Product Model**, while **SKU Variant** is the color-specific stock unit.
- "คงเหลือ" was used to mean both physical stock and saleable stock. Resolved: use **Stock On Hand** (`มีอยู่ในร้าน`), **Reserved Stock** (`จองแล้ว`), and **Sellable Stock** (`ขายได้`) explicitly.
- "Material" was at risk of becoming a full warehouse/BOM system. Resolved: first scope uses **Light Material Stock** for easy-to-count materials, with purchase/receipt/adjustment, but no full material master, no automatic Job consumption, and no automatic Expense creation.
- "รูปรีวิว" could be mistaken for product images or a media library. Resolved: **Review Album** is a separate review image grouping; there is no central media library in the starting scope.
- "Hold" and "รอวัตถุดิบ" were both used for blocked work. Resolved: **Hold** is a deliberate admin pause; **Waiting for Materials** is a department material blocker.
- "Level ลูกค้า" could mean a free tag or a controlled level. Resolved: **Customer Tier** is the controlled broad customer level; **Customer Tag** is a CRM label with no Order logic.
- "Shipment address" sounded like it might update the Customer address book. Resolved: a **Shipment** stores a recipient/address snapshot; saving it as a secondary **Address Entry** requires an explicit user choice.
- "`ส่งออกแล้ว`" sounded like final Shipment proof/close. Resolved: **Delivery Send-out** is the Delivery Team handoff without required proof; **Shipment Evidence** is captured by admin before Shipment close.
- "`รับงานรักสมุกกลับ`" sounded like it might return to any prior or selected department. Resolved: **Rak Samuk Return** always routes to **Waiting for Coloring Intake** in the starting workflow.
- "Facebook name" sounded like a one-off field. Resolved: use **Customer Social Contact** so Facebook is the first row and other platforms can be added later.
- "ลูกค้าส่ง" and wholesale pricing were considered for Customer Tier. Resolved: wholesale is outside the starting scope; Customer Tier keeps only simple retail/VIP warning levels and optional percentage discounts.
- "Private CRM Note" was deferred to avoid permission-rule complexity in the starting Customer/CRM scope. Resolved: use normal **CRM Notes** only for now.
- "Activity sort" for Customer list would require deeper backend activity tracking. Resolved: default Customer list sorting uses **Customer Code**.
