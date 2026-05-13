# THAIBORAN ERP Context

This context defines the shared business language for the THAIBORAN ERP. It focuses on the first UX/UI scope: custom work tracking from order capture through production, outsource, shipment readiness, and shipment closure.

## Language

### Commercial Work

**Customer (ลูกค้า)**:
The person or organization that buys from THAIBORAN and owns the CRM history.
_Avoid_: Client, account, buyer

**Recipient (ผู้รับสินค้า)**:
The person or place that receives a shipment for a Customer.
_Avoid_: Customer when the buyer and receiver are different

**Address Entry (ที่อยู่จัดส่ง)**:
A saved recipient name, phone number, and delivery address under a Customer.
_Avoid_: Free-floating address

**Order Recipient Detail (ข้อมูลผู้รับในออเดอร์)**:
The Order-specific recipient, phone, and address used for this Order unless a line or Shipment has its own delivery detail.
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
A guarded post-confirmation workflow for adding, removing, or changing Order Lines while respecting stock reservation, Order Jobs, Shipments, and history.
_Avoid_: New Order, Draft Order, hidden autosave edit

**Order Shipment Plan (แผนการจัดส่งของออเดอร์)**:
The Order-level choice that says whether ready-stock and custom-work lines must ship together or may ship separately.
_Avoid_: Shipment, delivery round, Order status

**Payment Term (เงื่อนไขการชำระเงิน)**:
The commercial agreement for how an Order should be paid.
_Avoid_: Payment record

**Payment Record (รายการรับเงิน)**:
An actual payment entry such as transfer, credit card, or COD amount recorded against an Order or Shipment.
_Avoid_: Payment term, audit confirmation

**Financial Follow-up (ติดตามการเงิน)**:
The separate management view for COD, payment audit, outstanding payments, refunds, deposits retained, or customer credit.
_Avoid_: Order completion

### Product and Custom Work

**Product Model (SKU ใหญ่)**:
The parent product definition that represents the main sellable design family.
_Avoid_: SKU when discussing variants or stock units

**SKU Variant (SKU ย่อย)**:
A concrete sellable/stockable version under a Product Model, commonly separated by color.
_Avoid_: Product Model

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
A Job created from Production work and ending in stock receipt readiness or Done, depending on whether it is tied to a SKU.
_Avoid_: Order Job

**Production Batch (ชุดผลิต)**:
A management container for producing goods for stock or prototype work.
_Avoid_: Order

**Production Lot (ล็อตผลิต)**:
A smaller production unit inside a Production Batch, split by the actual quantity routed through a department or outsource worker.
_Avoid_: Job when discussing the batch split itself

**Job Reference on SKU (อ้างอิงจาก Job)**:
An optional lookup reference from a SKU to the Job it came from, used only for traceability.
_Avoid_: Copying Job data into SKU automatically

**Ready Stock (สินค้าพร้อมส่ง)**:
Sellable stock that can be reserved for an Order Line without creating a Job.
_Avoid_: Work in progress, Production Job

**Stock Count (ตรวจนับสต๊อก)**:
A periodic count activity used to compare actual quantity with system quantity.
_Avoid_: Purchase, expense entry

**Stock Adjustment (ปรับยอดสต๊อก)**:
A controlled stock quantity correction with reason and log.
_Avoid_: Deletion, hidden correction

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
_Avoid_: Shipment hold, customer cancellation

**Waiting for Materials (รอวัตถุดิบ)**:
A Job state set by a workshop department when work is blocked by missing materials.
_Avoid_: Hold

### Rak Samuk Outsource

**Rak Samuk Work (งานรักสมุก)**:
Outsource decorative line work routed from a Job or Production Lot to one Rak Samuk worker.
_Avoid_: Generic outsource when discussing first-scope payment flow

**Rak Samuk Worker (ช่างรักสมุก)**:
An outsource worker account that can view assigned Rak Samuk Work and limited payment information for their own work.
_Avoid_: Employee, internal workshop user

**Rak Samuk Standard Rate (ราคามาตรฐานรักสมุก)**:
The standard per-piece rate stored on the Product Model.
_Avoid_: Sales price, SKU Variant price

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
_Avoid_: Shipping Sheet

**Shipping Sheet (ใบจัดส่ง)**:
The printable recipient/address sheet for a Shipment, focused on recipient, phone, address, carrier, and references.
_Avoid_: Delivery Note

**Service Case (งานบริการหลังการขาย)**:
An after-sales case such as repair, claim, color correction, return, or reshipment after an Order is closed.
_Avoid_: Reopening the original Order

**Service Shipment (รอบจัดส่งงานบริการ)**:
A Shipment created from a Service Case that does not affect the original Order completion or sales total.
_Avoid_: Order Shipment

### CRM and Media

**CRM Note (บันทึก CRM)**:
A timeline note about customer behavior, preferences, relationship context, or sales context.
_Avoid_: Shipment note, Job note

**Private CRM Note (บันทึก CRM ส่วนตัว)**:
A restricted CRM timeline note for sensitive customer information.
_Avoid_: Public note

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

**Activity Log (ประวัติการทำงาน)**:
Operational history visible to relevant team members, such as received, completed, or sent.
_Avoid_: Audit log

**Management Log (ประวัติสำหรับผู้จัดการ)**:
History of business-sensitive changes such as changing owner, cancelling shipment, adjusting stock, or editing outsource rates.
_Avoid_: Activity log

**Audit Log (ประวัติตรวจสอบ)**:
Restricted history visible to the highest permission level for rights changes, critical overrides, and sensitive financial changes.
_Avoid_: Activity log

**Expense Entry (รายการค่าใช้จ่าย)**:
A simple internal expense record with amount, category, payee, evidence, and optional line items.
_Avoid_: Accounting journal

## Relationships

- A **Customer** has many **Address Entries**, **Orders**, **CRM Notes**, **Private CRM Notes**, **Service Cases**, and optional **Review Albums**.
- An **Address Entry** belongs to exactly one **Customer**, an **Order** has **Order Recipient Detail**, and a **Shipment** stores a snapshot of the recipient/address used at dispatch time.
- An **Order Entry Session** may become one **Draft Order** when saved, or one **Order** when confirmed.
- A **Draft Order** may become one **Order**; after conversion it is archived/read-only and no longer shown in active draft work.
- An **Order** has many **Order Lines**, has **Order Recipient Detail**, has one **Order Shipment Plan** only when mixed line types need a delivery decision, and may create many **Shipments**.
- An **Order Line** can be ready-stock only or custom work.
- **Order Line Edit** may add, remove, or change safe **Order Lines** after confirmation, but it is not a Draft Order and does not create hidden autosave records.
- A custom **Order Line** carries **Custom Work Detail** during order entry or guarded Order Line Edit, and creates one **Order Job** when the Order is confirmed or when the completed new custom line is saved after confirmation.
- A ready-stock **Order Line** reserves **Ready Stock** when the Order is confirmed or when the line is added after confirmation, but does not create a **Job**.
- A **Job** has exactly one **Job Source Type**: Order or Production.
- An **Order Job** belongs to an Order Line and becomes ready for **Shipment** only after production is complete.
- A **Production Batch** has many **Production Lots**; a Production Lot may create one or more **Production Jobs** depending on how production is split.
- A **Production Job** tied to an SKU ends at stock receipt readiness; a custom/prototype Production Job may end as Done without entering stock.
- A **Shipment** creates one **Delivery Note** and one **Shipping Sheet**; users may print either or both.
- **Order Completion** happens when all required Order Shipments are closed; **Financial Follow-up** is separate.
- A **Service Case** may create a **Service Shipment** but does not reopen or change the original Order.
- **Rak Samuk Work** is assigned to exactly one **Rak Samuk Worker** in the first scope.
- A **Rak Samuk Worker** can see only their assigned work and limited own-payment information.
- A **Payment Voucher** is issued only after payment is confirmed and receives a monthly running PV number.
- A **Review Album** can link to zero or many SKU Variants and optionally to one Customer or Order.
- A **SKU Variant** may optionally reference one **Job** as its origin, but this reference never copies or syncs Job data.
- **Stock Counts** and **Stock Adjustments** affect stock visibility but remain separate from **Expense Entries**.
- **Expense Entries** and stock movements are separate first-scope records; neither updates the other automatically.

## UX/UI starting scope

The first UX/UI scope starts from งานสั่งทำ (Job) as the operating center, not from a generic ERP module list. The first screen to design is the Admin Dashboard because admin work creates and releases the main queues used by production, outsource, stock, shipment, and finance follow-up.

Included in the starting scope:

- Admin Dashboard: shared task cards for active Orders, active Jobs, waiting to create Shipment, waiting to close Shipment, Job revision follow-up, and COD/payment follow-up.
- Admin order creation flow: Order Entry Session, optional saved Draft Order, Order Review, Order, Order Line, payment term, optional payment record, and immediate `JOB-O` creation for complete custom work.
- Department dashboards: Woodwork Queue, Coloring Queue, Waiting for Coloring Intake, and simple history views.
- Rak Samuk outsource flow: send work, worker view, missing-price label, proposed price approval, receive back, and payment preparation.
- Shipment flow: admin ready-to-ship queue, Draft Shipment, release to delivery, delivery team send-out, admin close Shipment.
- Management overview: unfinished Jobs, department location, urgency, age, and timeline.
- Product/SKU and stock support required for the flow: Product Model, SKU Variant, Ready Stock, Stock Count, Stock Adjustment, Color Master, pattern masters, department instruction images, and review albums.
- Simple Expense Entry and Payment Voucher concepts only where they support operating visibility and outsource payment.

Explicitly outside the starting scope:

- Full accounting, tax invoice, formal quotation, channel/funnel reporting, BOM costing, payroll automation, full QC module, central media library, customer merge, and shipping carrier API integrations.

## Example dialogue

> **Dev:** "A Customer Order has ready-stock goods and a custom cabinet. Should the delivery team see the custom cabinet immediately?"
> **Domain expert:** "No. The ready-stock line can become a Shipment now, but the custom cabinet becomes a JOB-O first. It only reaches the admin ready-to-ship queue after coloring marks it ready."

> **Dev:** "When admin starts creating an Order, do we create a Draft No. immediately?"
> **Domain expert:** "No. The entry can stay temporary while the user is on the screen. A Draft No. exists only when the user explicitly saves the work as a Draft Order."

> **Dev:** "Can a Production prototype use the same Job screen?"
> **Domain expert:** "Yes. It is a JOB-P. The workshop sees the same work card shape, but the end state is production Done or stock receipt readiness, not customer shipment."

## Flagged ambiguities

- "Job" was used to mean both customer custom work and production custom work. Resolved: use **Job** as the shared custom work unit with **Job Source Type** and prefixes **JOB-O** / **JOB-P**.
- "Draft" was used for both temporary in-screen entry and a saved draft record. Resolved: **Order Entry Session** is temporary and unsaved; **Draft Order** is saved and has a Draft No.
- "Draft Job" was suggested for custom work inside a draft Order. Resolved: use **Custom Work Detail** on the custom **Order Line**; it becomes a **JOB-O** only when the Order is confirmed.
- "Order done" could mean shipped or financially settled. Resolved: **Order Completion** means all required shipments are closed; **Financial Follow-up** is separate.
- "Customer" was used for both buyer and delivery receiver. Resolved: **Customer** owns CRM and buying history; **Recipient** is the delivery receiver snapshot/address entry.
- "สร้างจาก Job" sounded like copying Job data into SKU. Resolved: SKU only stores an optional **Job Reference on SKU** for traceability; SKU data is entered independently.
- "รูปรีวิว" could be mistaken for product images or a media library. Resolved: **Review Album** is a separate review image grouping; there is no central media library in the starting scope.
- "Hold" and "รอวัตถุดิบ" were both used for blocked work. Resolved: **Hold** is a deliberate admin pause; **Waiting for Materials** is a department material blocker.
