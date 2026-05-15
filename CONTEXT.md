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
The Order-facing summary of Shipment rounds, carrier, tracking, and delivery confirmation state.
_Avoid_: Order status, payment status

**Order Shipment Plan (แผนการจัดส่งของออเดอร์)**:
The Order-level default intent for mixed ready-stock and custom-work Orders; actual combined or split shipment is created by selecting ready lines for a Shipment round.
_Avoid_: Shipment, delivery round, Order status

**Payment Term (เงื่อนไขการชำระเงิน)**:
The commercial agreement for how an Order should be paid.
_Avoid_: Payment record

**Payment Record (รายการรับเงิน)**:
An immutable actual payment entry such as transfer, credit card, or COD amount recorded against an Order or Shipment; later amount changes add follow-up records instead of rewriting old received-money history.
_Avoid_: Payment term, audit confirmation, Job approval

**Financial Follow-up (ติดตามการเงิน)**:
The separate management view for COD, payment audit, outstanding payments, refunds, deposits retained, or customer credit.
_Avoid_: Order completion

**Financial Reconciliation (ตรวจยอดการเงิน)**:
The check during Order total edits that sales total and recorded financial evidence or adjustment notes line up before the edit can be saved.
_Avoid_: Full accounting, tax workflow, Order status

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
A Job created from Production work and ending in stock receipt readiness or Done, depending on whether it is tied to a SKU.
_Avoid_: Order Job

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
- An **Address Entry** belongs to exactly one **Customer**, an **Order** has frozen **Order Recipient Detail**, and a **Shipment** stores its own recipient/address snapshot used at dispatch time.
- An **Order Entry Session** may become one **Draft Order** when saved, or one **Order** when confirmed.
- A **Draft Order** may become one **Order**; after conversion it is archived/read-only and no longer shown in active draft work.
- An **Order** has many **Order Lines**, has **Order Recipient Detail**, has one **Order Shipment Plan** only when mixed line types need a delivery decision, and may create many **Shipments**.
- An **Order** has an **Order Status** calculated from active Order Lines; **Shipment Summary** is shown separately from Order Status.
- An **Order Line** can be ready-stock only or custom work, and may become a **Cancelled Order Line** while remaining visible for history.
- **Order Line Edit** may add, remove, or change safe **Order Lines** after confirmation, but it is not a Draft Order and does not create hidden autosave records.
- A custom **Order Line** carries **Custom Work Detail** during order entry or guarded Order Line Edit, and creates one **Order Job** when the Order is confirmed or when the completed new custom line is saved after confirmation.
- A ready-stock **Order Line** reserves **Ready Stock** when the Order is confirmed or when the line is added after confirmation, but does not create a **Job**.
- A **Payment Record** may be captured during Order entry or later Financial Follow-up, but missing Payment Records do not block **Order Job** creation.
- **Financial Reconciliation** can block saving an Order total edit when the new sales total does not line up with financial records or adjustment notes; this is separate from normal Order operation.
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
- **Product Settings** contains controlled product lists for categories, tags, colors, patterns, and decoration values.
- A **Product Category** can have many **Product Subcategories** and many **Product Models**.
- A **Product Tag** can be linked to many **Product Models**, but it is only for search/grouping.
- A **Product Model** has many **Product Color Options**, and each enabled Product Color Option has exactly one corresponding **SKU Variant**.
- A **SKU Variant** is unique for one **Product Model** and one **Color List** value; duplicate variants for the same product-color pair are blocked.
- A **Color List** value may be linked to many **Product Models** through Product Color Options; its code is locked after it is used in a SKU Variant code.
- **Rak Samuk Pattern List**, **Carving Pattern List**, and **Crystal Color List** values can classify Product/Job instruction details, but they do not create SKU codes.
- A **Product Model** may optionally reference one **Job** as its origin, but this reference never copies or syncs Job data.
- **Stock On Hand**, **Reserved Stock**, and **Sellable Stock** are separate stock views for the same **SKU Variant**; **Sellable Stock** may become negative after permitted over-reservation.
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
- Product/SKU and stock support required for the flow: Product Model, SKU Variant, Ready Stock, Stock Count, Stock Adjustment, Product Settings, department instruction images, and review albums.
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
- "รูปรีวิว" could be mistaken for product images or a media library. Resolved: **Review Album** is a separate review image grouping; there is no central media library in the starting scope.
- "Hold" and "รอวัตถุดิบ" were both used for blocked work. Resolved: **Hold** is a deliberate admin pause; **Waiting for Materials** is a department material blocker.
