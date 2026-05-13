# Screen Inventory

This inventory is derived from:

- `docs/ux-ui/01-flow-map.md`
- `CONTEXT.md`
- `docs/decision-log.md`
- `docs/ux-ui/initial-scope.md`
- `docs/qa-summary.md` as supporting notes only

It is an index of UX/UI screens for the confirmed starting scope. It is not a duplicate requirements summary and should not add scope beyond the source documents.

## Priority and Status

- `P0`: required for the first Job operations flow.
- `P1`: required support for the first flow, or needed soon after P0 to make the flow usable.
- `P2`: confirmed supporting, uncertain, deferred, or later-detail screen. Do not spec before P0/P1 unless a later decision promotes it.

Design status:

- `ready`: enough confirmed source material exists to start screen design.
- `needs decision`: the screen is in scope, but a layout/detail decision blocks design.
- `later`: keep in inventory, but do not design in the first P0/P1 pass.

## 1. Admin

### ADM-001 - Admin Dashboard

- Screen ID: `ADM-001`
- Screen name: Admin Dashboard
- Thai UI label: `แดชบอร์ดแอดมิน`
- Primary actor: Admin
- Purpose: First approved desktop admin screen for operational queue visibility and visual/navigation baseline.
- Entry point: Login / main navigation.
- Exit point: Selected working queue.
- Related flow IDs: `F01`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Job, Shipment, Financial Follow-up
- Main actions: Review approved dashboard cards, open working queues, inspect critical work preview.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-001-admin-dashboard.md`; `docs/ux-ui/image-prompts/IMG-ADM-001-admin-dashboard.md`; `docs/ux-ui/design-system/app-shell.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-002 - Active Orders Overview

- Screen ID: `ADM-002`
- Screen name: Active Orders Overview
- Thai UI label: `ออเดอร์กำลังดำเนินการ`
- Primary actor: Admin
- Purpose: Open confirmed Orders that are not operationally complete.
- Entry point: `Admin Dashboard` -> `ออเดอร์กำลังดำเนินการ`.
- Exit point: Order Detail, related Job, related Shipment.
- Related flow IDs: `F01`, `F02`, `F06`, `F08`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Job, Shipment
- Main actions: Search/open Order, review whether it is producing or ready to ship.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-002-active-orders-overview.md`; `docs/ux-ui/image-prompts/IMG-ADM-002-active-orders-overview.md`; `docs/ux-ui/screens/SCR-ADM-001-admin-dashboard.md`; `CONTEXT.md`; `docs/decision-log.md`

### ADM-003 - Active Jobs Overview

- Screen ID: `ADM-003`
- Screen name: Active Jobs Overview
- Thai UI label: `งานกำลังผลิต`
- Primary actor: Admin / Manager
- Purpose: Show Jobs currently in production across `JOB-O` and `JOB-P`.
- Entry point: `Admin Dashboard` -> `งานกำลังผลิต`.
- Exit point: Job Detail, department queue, manager unfinished-work overview.
- Related flow IDs: `F01`, `F03`, `F04`, `F05`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Order Job, Production Job, Woodwork Queue, Coloring Queue, Rak Samuk Work
- Main actions: Review production overview, open Job, filter by department/source.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-003-active-jobs-overview.md`; `docs/ux-ui/image-prompts/IMG-ADM-003-active-jobs-overview.md`; `docs/ux-ui/mockups/SCR-ADM-003-active-jobs-overview/SCR-ADM-003-approved.png`; `docs/ux-ui/screens/SCR-ADM-001-admin-dashboard.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-004 - Waiting to Create Shipment Round Queue

- Screen ID: `ADM-004`
- Screen name: Waiting to Create Shipment Round Queue
- Thai UI label: `รอสร้างรอบจัดส่ง`
- Primary actor: Admin
- Purpose: Enter the ready-to-ship queue from the Admin Dashboard.
- Entry point: `Admin Dashboard` -> `รอสร้างรอบจัดส่ง`.
- Exit point: Ready-to-ship queue / Shipment creation.
- Related flow IDs: `F01`, `F06`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Job, Service Case, Shipment
- Main actions: Open ready-to-ship Orders and create shipment rounds.
- Related source docs: `docs/ux-ui/01-flow-map.md` F01/F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-005 - Shipment Confirmation Queue

- Screen ID: `ADM-005`
- Screen name: Shipment Confirmation Queue
- Thai UI label: `ยืนยันการจัดส่ง`
- Primary actor: Admin
- Purpose: Review shipment rounds marked sent out and add/confirm tracking or transport evidence before closure.
- Entry point: `Admin Dashboard` -> `ยืนยันการจัดส่ง`.
- Exit point: Shipment detail / closed Shipment.
- Related flow IDs: `F01`, `F08`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Shipment, Delivery Note, Shipping Sheet, Order, Financial Follow-up
- Main actions: Open Shipment, add or review tracking/evidence, close Shipment.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-005-shipment-confirmation-queue.md`; `docs/ux-ui/image-prompts/IMG-ADM-005-shipment-confirmation-queue.md`; `docs/ux-ui/mockups/SCR-ADM-005-shipment-confirmation-queue/SCR-ADM-005-approved.png`; `docs/ux-ui/01-flow-map.md` F01/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-006 - Production Follow-up Queue

- Screen ID: `ADM-006`
- Screen name: Production Follow-up Queue
- Thai UI label: `งานผลิตต้องติดตาม`
- Primary actor: Admin
- Purpose: Follow up only production cases that need admin communication or decision.
- Entry point: `Admin Dashboard` -> `งานผลิตต้องติดตาม`.
- Exit point: Job Revision view / Job Detail.
- Related flow IDs: `F01`, `F04`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Job Revision, Activity Log
- Main actions: Open follow-up case, review acknowledgement state, follow up with department.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-006-production-follow-up-queue.md`; `docs/ux-ui/image-prompts/IMG-ADM-006-production-follow-up-queue.md`; `docs/ux-ui/mockups/SCR-ADM-006-production-follow-up-queue/SCR-ADM-006-approved.png`; `docs/ux-ui/01-flow-map.md` F01/F04; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-007 - COD/Payment Follow-up Queue

- Screen ID: `ADM-007`
- Screen name: COD/Payment Follow-up Queue
- Thai UI label: `ติดตาม COD / Payment`
- Primary actor: Admin / finance-permission user
- Purpose: Track operational payment/COD follow-up separately from Order Completion.
- Entry point: `Admin Dashboard` -> `ติดตาม COD / Payment`.
- Exit point: Financial follow-up record or related Order/Shipment.
- Related flow IDs: `F01`, `F08`
- Priority: `P1`
- Device target: desktop
- Design status: ready
- Main data objects: Payment Term, Payment Record, Shipment COD, Financial Follow-up, Order
- Main actions: Review follow-up item, open related Order or Shipment.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-007-cod-payment-follow-up-queue.md`; `docs/ux-ui/image-prompts/IMG-ADM-007-cod-payment-follow-up-queue.md`; `docs/ux-ui/mockups/SCR-ADM-007-cod-payment-follow-up-queue/SCR-ADM-007-approved.png`; `docs/ux-ui/01-flow-map.md` F01/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-008 - Draft Order Queue

- Screen ID: `ADM-008`
- Screen name: Draft Order Queue
- Thai UI label: `ร่างออเดอร์`
- Primary actor: Admin
- Purpose: Open saved Draft Orders that have not become real Orders.
- Entry point: `ออเดอร์` -> `ร่างออเดอร์`.
- Exit point: Order Create/Edit continuation.
- Related flow IDs: `F02`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Draft Order, Customer, Address Entry, Order Line
- Main actions: Open draft, continue draft, create a new Order.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

Note:

- `ร่างออเดอร์` is retained as a tab, but it is no longer a dashboard card.
- Draft No. exists only for explicitly saved Draft Orders.
- Unsaved Order Create/Edit work does not appear here.

## 2. Order

### ORD-001 - Order Create/Edit

- Screen ID: `ORD-001`
- Screen name: Order Create/Edit
- Thai UI label: `สร้างออเดอร์`
- Primary actor: Admin
- Purpose: Enter customer, address, ready-stock lines, custom-work lines, payment term, and custom-work detail before creating a real Order or saving as Draft Order.
- Entry point: Order page `สร้างออเดอร์` action or Draft Order queue.
- Exit point: Order Review or saved Draft Order.
- Related flow IDs: `F02`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order Entry Session, Draft Order, Customer, Address Entry, Order Line, Custom Work Detail, Order Shipment Plan, Payment Term, Payment Record
- Main actions: Select/create customer, add address, add ready-stock line, add custom-work line, save draft, continue to review.
- Related source docs: `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`; `docs/ux-ui/image-prompts/IMG-ORD-001-draft-order-editor.md`; `docs/ux-ui/mockups/SCR-ORD-001-draft-order-editor/SCR-ORD-001-approved.png`; `docs/ux-ui/01-flow-map.md` F02; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### ORD-002 - Customer Search / Select

- Screen ID: `ORD-002`
- Screen name: Customer Search / Select
- Thai UI label: `ลูกค้า`
- Primary actor: Admin
- Purpose: Select or create Customer during Order entry.
- Entry point: Order Create/Edit.
- Exit point: Address Entry select/create.
- Related flow IDs: `F02`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Customer, Customer phone, Address Entry
- Main actions: Search Customer, select Customer, create Customer.
- Related source docs: `docs/ux-ui/01-flow-map.md` F02; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ORD-003 - Address Entry Select / Create

- Screen ID: `ORD-003`
- Screen name: Address Entry Select / Create
- Thai UI label: `ที่อยู่จัดส่ง`
- Primary actor: Admin
- Purpose: Select or create recipient/address information for the Order.
- Entry point: Customer selected in Order Create/Edit.
- Exit point: Order Line entry.
- Related flow IDs: `F02`, `F06`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Address Entry, Recipient, Customer, Shipment address snapshot
- Main actions: Select address, create address, set recipient name and phone.
- Related source docs: `docs/ux-ui/01-flow-map.md` F02/F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ORD-004 - Order Review / Create Order

- Screen ID: `ORD-004`
- Screen name: Order Review / Create Order
- Thai UI label: `สร้างออเดอร์`
- Primary actor: Admin
- Purpose: Review required Order information before issuing Order ID.
- Entry point: Order Create/Edit after required entry.
- Exit point: Order Detail.
- Related flow IDs: `F02`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order Entry Session, optional Draft Order, Order, Order Line, Custom Work Detail, Order Shipment Plan, Payment Term, Payment Record
- Main actions: Review Order, save draft, return to edit, create Order ID.
- Related source docs: `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`; `docs/ux-ui/image-prompts/IMG-ORD-004-order-review-create-order.md`; `docs/ux-ui/mockups/SCR-ORD-004-order-review-create-order/SCR-ORD-004-approved.png`; `docs/ux-ui/01-flow-map.md` F02; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ORD-005 - Order Detail

- Screen ID: `ORD-005`
- Screen name: Order Detail
- Thai UI label: `ออเดอร์`
- Primary actor: Admin
- Purpose: View confirmed Order, Order Lines, Shipment state, and related financial follow-up.
- Entry point: Order creation, Order search, related queue row.
- Exit point: Shipment detail, Customer detail, Financial follow-up, Job Detail.
- Related flow IDs: `F02`, `F03`, `F06`, `F08`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Customer, Address Entry, Payment Term, Payment Record, Shipment
- Main actions: Review Order sections, manage Order, edit safe sections, select ready lines for Shipment, open Shipment, open related Job, review Order status.
- Related source docs: `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`; `docs/ux-ui/image-prompts/IMG-ORD-005-order-detail.md`; `docs/ux-ui/mockups/SCR-ORD-005-order-detail/SCR-ORD-005-approved.png`; `docs/ux-ui/01-flow-map.md` F02/F03/F06/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ORD-006 - All Orders List

- Screen ID: `ORD-006`
- Screen name: All Orders List
- Thai UI label: `ออเดอร์ทั้งหมด`
- Primary actor: Admin
- Purpose: Search and browse all real Orders across every main Order status, excluding Draft Orders.
- Entry point: Order page `ออเดอร์ทั้งหมด` tab.
- Exit point: Order Detail or Order Create/Edit.
- Related flow IDs: `F02`, `F06`, `F08`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Customer, Address Entry, Job, Shipment
- Main actions: Search/filter Orders, inspect item/shipment popovers, open Order, create new Order, clear filters.
- Related source docs: `docs/ux-ui/screens/SCR-ORD-006-all-orders-list.md`; `docs/ux-ui/image-prompts/IMG-ORD-006-all-orders-list.md`; `docs/ux-ui/design-system/table-patterns.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/qa-summary.md`; `docs/ux-ui/initial-scope.md`

### ORD-007 - Order Line Edit

- Screen ID: `ORD-007`
- Screen name: Order Line Edit
- Thai UI label: `แก้ไขรายการออเดอร์`
- Primary actor: Admin
- Purpose: Add, remove, or change safe Order Lines after Order confirmation with Review Changes before saving.
- Entry point: Order Detail -> `จัดการออเดอร์` -> `แก้ไขรายการสินค้า` or `แก้ไขงานสั่งทำ`.
- Exit point: Review Changes, Order Detail, Job Detail / Revision, or Shipment Detail when downstream state must be resolved first.
- Related flow IDs: `F02`, `F03`, `F06`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Ready Stock, Custom Work Detail, Job, Shipment
- Main actions: Add ready-stock line, add custom-work line, edit safe line, remove safe line, open Job, review changes, save changes.
- Related source docs: `docs/ux-ui/screens/SCR-ORD-007-order-line-edit.md`; `docs/ux-ui/image-prompts/IMG-ORD-007-order-line-edit.md`; `docs/decision-log.md`; `docs/qa-summary.md`; `docs/ux-ui/initial-scope.md`

## 3. Job

### JOB-001 - Embedded Custom Work Detail

- Screen ID: `JOB-001`
- Screen name: Embedded Custom Work Detail
- Thai UI label: `รายละเอียดงานสั่งทำ`
- Primary actor: Admin
- Purpose: Capture complete custom-work instructions inside Order Create/Edit so `JOB-O` can be created immediately when the Order is confirmed.
- Entry point: Custom-work line inside Order Create/Edit.
- Exit point: Order Review.
- Related flow IDs: `F03`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Custom Work Detail, Job Source Type preview, Order Line, Department Instruction Images
- Main actions: Enter production details, attach instruction images, complete custom-work requirements before Order Review.
- Related source docs: `docs/ux-ui/screens/SCR-JOB-001-job-create-from-order-line.md`; `docs/ux-ui/image-prompts/IMG-JOB-001-job-create-from-order-line.md`; `docs/ux-ui/mockups/SCR-JOB-001-job-create-from-order-line/SCR-JOB-001-approved.png`; `docs/ux-ui/01-flow-map.md` F03; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

Note:

- This is no longer a separate post-confirmation Job creation screen for customer custom work.
- The existing mockup remains a visual reference for the embedded `รายละเอียดงานสั่งทำ` section.
- After Order confirmation, editing production-affecting details happens through Job Detail / Job Revision.

### JOB-002 - Job Detail

- Screen ID: `JOB-002`
- Screen name: Job Detail
- Thai UI label: `งานสั่งทำ`
- Primary actor: Admin / Manager
- Purpose: View full Job context, status, source type, timeline, and related production movement.
- Entry point: Order Detail item card, active jobs overview, Job creation, department queue, manager overview, revision queue.
- Exit point: Department workflow action, Shipment readiness, related SKU reference, timeline review.
- Related flow IDs: `F03`, `F04`, `F05`, `F09`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Job Source Type, Order Line, Production Lot, Department Instruction Images, Activity Log
- Main actions: Review Job, inspect timeline, open related workflow, set/view urgency where allowed.
- Related source docs: `docs/ux-ui/screens/SCR-JOB-002-job-detail-work-card.md`; `docs/ux-ui/image-prompts/IMG-JOB-002-job-detail-work-card.md`; `docs/ux-ui/mockups/SCR-JOB-002-job-detail-work-card/SCR-JOB-002-approved.png`; `docs/ux-ui/01-flow-map.md` F03/F04/F05/F09; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### JOB-003 - Job Revision View

- Screen ID: `JOB-003`
- Screen name: Job Revision View
- Thai UI label: `รอรับทราบ Revision`
- Primary actor: Admin / affected department user
- Purpose: Show production-affecting Job changes for acknowledgement or clarification.
- Entry point: Job Revision follow-up queue or department work card.
- Exit point: Acknowledged revision, clarification follow-up, Job Detail.
- Related flow IDs: `F01`, `F04`
- Priority: `P1`
- Device target: desktop / tablet / mobile
- Design status: ready
- Main data objects: Job, Job Revision, Department, Activity Log
- Main actions: Review change, choose `รับทราบ`, choose `ไม่เข้าใจให้ติดต่อหา`, admin follow-up.
- Related source docs: `docs/ux-ui/01-flow-map.md` F01/F04; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### JOB-004 - Production Job Entry

- Screen ID: `JOB-004`
- Screen name: Production Job Entry
- Thai UI label: `สร้างงานผลิต`
- Primary actor: Admin / production-permission user
- Purpose: Create production-source Job when internal Production needs work-card handling, from SKU-based production or custom/internal production.
- Entry point: Production Batch / Production Lot workflow, Product/SKU page, or internal production creation flow.
- Exit point: Job Detail or production workflow.
- Related flow IDs: `F09`
- Priority: `P2`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Production Batch, Production Lot, Job, SKU Variant, Department Instruction Images
- Main actions: Create `JOB-P`, link source type, route production work.
- Related source docs: `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`; `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-entry.md`; `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-sku-selected.md`; `docs/ux-ui/image-prompts/IMG-JOB-004-production-special-work.md`; `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-modal-approved.png`; `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-selected-approved.png`; `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-special-work-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

## 4. Woodwork

### WDW-001 - Woodwork Work Queue

- Screen ID: `WDW-001`
- Screen name: Woodwork Work Queue
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Woodwork Department
- Purpose: Show active woodwork Jobs requiring action.
- Entry point: Woodwork department navigation.
- Exit point: Woodwork Job Work Card.
- Related flow IDs: `F04`, `F05`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department Instruction Images, Urgent Label, Waiting for Materials
- Main actions: Open Job, choose role-allowed action.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04/F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### WDW-002 - Woodwork Job Work Card

- Screen ID: `WDW-002`
- Screen name: Woodwork Job Work Card
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Woodwork Department
- Purpose: Provide mobile-friendly Job details and woodwork actions.
- Entry point: Woodwork Work Queue.
- Exit point: Woodwork Work Queue, Rak Samuk send flow, Coloring intake flow, Woodwork history.
- Related flow IDs: `F04`, `F05`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department Instruction Images, Urgent Label, Delivery Date, Activity Log
- Main actions: `รับงาน`, `รอวัตถุดิบ`, `ส่งไปสี`, `ส่งไปรักสมุก`, `กำลังส่งไปแกะสลัก`.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04/F05; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### WDW-003 - Woodwork History

- Screen ID: `WDW-003`
- Screen name: Woodwork History
- Thai UI label: `ประวัติงานของฉัน`
- Primary actor: Woodwork Department
- Purpose: Let woodwork users view work they already sent onward or completed.
- Entry point: Woodwork navigation or completed work card.
- Exit point: Historical Job view.
- Related flow IDs: `F04`
- Priority: `P1`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Activity Log
- Main actions: View past work.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 5. Coloring

### CLR-001 - Waiting for Coloring Intake

- Screen ID: `CLR-001`
- Screen name: Waiting for Coloring Intake
- Thai UI label: `รอรับเข้าโรงงานสี`
- Primary actor: Coloring Department
- Purpose: Separate physically waiting work from active Coloring Queue.
- Entry point: Coloring department navigation.
- Exit point: Coloring Work Queue after `รับเข้าโรงงานสี`.
- Related flow IDs: `F04`, `F05`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department, Activity Log
- Main actions: Open Job, `รับเข้าโรงงานสี`.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04/F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### CLR-002 - Coloring Work Queue

- Screen ID: `CLR-002`
- Screen name: Coloring Work Queue
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Coloring Department
- Purpose: Show active coloring/decorating Jobs requiring action.
- Entry point: Coloring navigation or `รับเข้าโรงงานสี`.
- Exit point: Coloring Job Work Card.
- Related flow IDs: `F04`, `F05`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department Instruction Images, Urgent Label, Waiting for Materials
- Main actions: Open Job, choose role-allowed action.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04/F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### CLR-003 - Coloring Job Work Card

- Screen ID: `CLR-003`
- Screen name: Coloring Job Work Card
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Coloring Department
- Purpose: Provide mobile-friendly Job details and coloring actions.
- Entry point: Coloring Work Queue.
- Exit point: Coloring Work Queue, Rak Samuk send flow, `รอสร้างรอบจัดส่ง`, Coloring history.
- Related flow IDs: `F04`, `F05`, `F06`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: needs decision
- Main data objects: Job, Department Instruction Images, Urgent Label, Delivery Date, Activity Log
- Main actions: `รับงาน`, `รอวัตถุดิบ`, `ส่งไปรักสมุก`, `รับเข้าโรงงานสี`, `งานเสร็จ/พร้อมส่ง`.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04/F05/F06; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### CLR-004 - Coloring History

- Screen ID: `CLR-004`
- Screen name: Coloring History
- Thai UI label: `ประวัติงานของฉัน`
- Primary actor: Coloring Department
- Purpose: Let coloring users view work they already sent onward or completed.
- Entry point: Coloring navigation or completed work card.
- Exit point: Historical Job view.
- Related flow IDs: `F04`
- Priority: `P1`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Activity Log
- Main actions: View past work.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 6. Rak Samuk

### RSK-001 - Rak Samuk Send Queue

- Screen ID: `RSK-001`
- Screen name: Rak Samuk Send Queue
- Thai UI label: `รอระบุ/ส่งรักสมุก`
- Primary actor: User with outsource permission
- Purpose: Assign work sent to Rak Samuk to one Rak Samuk Worker.
- Entry point: Department action `ส่งไปรักสมุก`.
- Exit point: Rak Samuk Worker assignment.
- Related flow IDs: `F05`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Rak Samuk Work, Rak Samuk Worker
- Main actions: Open work, choose worker.
- Related source docs: `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-002 - Rak Samuk Worker Assignment

- Screen ID: `RSK-002`
- Screen name: Rak Samuk Worker Assignment
- Thai UI label: `ส่งรักสมุก`
- Primary actor: User with outsource permission
- Purpose: Confirm the one worker assigned to Rak Samuk Work.
- Entry point: `รอระบุ/ส่งรักสมุก`.
- Exit point: Rak Samuk Worker `งานที่ต้องทำ`.
- Related flow IDs: `F05`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: needs decision
- Main data objects: Rak Samuk Work, Rak Samuk Worker, Job
- Main actions: Select worker, send work.
- Related source docs: `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-003 - Rak Samuk Worker Work List

- Screen ID: `RSK-003`
- Screen name: Rak Samuk Worker Work List
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Rak Samuk Worker
- Purpose: Show only the worker's assigned Rak Samuk Work.
- Entry point: Rak Samuk Worker login/navigation.
- Exit point: Rak Samuk Worker Work Detail.
- Related flow IDs: `F05`
- Priority: `P0`
- Device target: mobile / tablet
- Design status: needs decision
- Main data objects: Rak Samuk Work, Job, Department Instruction Images, Rak Samuk Standard Rate
- Main actions: Open assigned work, view own price where allowed, propose price only when missing.
- Related source docs: `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### RSK-004 - Missing-price Proposal

- Screen ID: `RSK-004`
- Screen name: Missing-price Proposal
- Thai UI label: `ไม่มีราคา / ให้แจ้งราคา`
- Primary actor: Rak Samuk Worker
- Purpose: Let worker propose price only when standard rate is missing.
- Entry point: Rak Samuk Worker Work List / Work Detail.
- Exit point: Proposed price approval.
- Related flow IDs: `F05`
- Priority: `P1`
- Device target: mobile / tablet
- Design status: needs decision
- Main data objects: Rak Samuk Work, Proposed Price, Rak Samuk Standard Rate, Product Model
- Main actions: Submit proposed price.
- Related source docs: `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-005 - Proposed-price Approval

- Screen ID: `RSK-005`
- Screen name: Proposed-price Approval
- Thai UI label: `อนุมัติราคา`
- Primary actor: Finance-permission user
- Purpose: Approve proposed price for missing-price Rak Samuk Work.
- Entry point: Missing-price proposal notification/list.
- Exit point: Rak Samuk Work continues with approved price.
- Related flow IDs: `F05`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: needs decision
- Main data objects: Proposed Price, Rak Samuk Work, Product Model, Rak Samuk Standard Rate
- Main actions: Review proposed price, approve price.
- Related source docs: `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-006 - Receive Rak Samuk Work Back

- Screen ID: `RSK-006`
- Screen name: Receive Rak Samuk Work Back
- Thai UI label: `รับงานรักสมุกกลับ`
- Primary actor: Internal staff
- Purpose: Receive outsource work back and return it to internal workflow.
- Entry point: Rak Samuk Work detail / internal outsource queue.
- Exit point: Next internal workflow queue.
- Related flow IDs: `F05`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: needs decision
- Main data objects: Rak Samuk Work, Job, Activity Log
- Main actions: Confirm received back, route to next internal queue.
- Related source docs: `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-007 - Rak Samuk Worker History

- Screen ID: `RSK-007`
- Screen name: Rak Samuk Worker History
- Thai UI label: `ประวัติการทำงาน`
- Primary actor: Rak Samuk Worker
- Purpose: Show worker's own completed/history items and limited payout state.
- Entry point: Rak Samuk Worker navigation.
- Exit point: Historical work detail.
- Related flow IDs: `F05`
- Priority: `P1`
- Device target: mobile / tablet
- Design status: ready
- Main data objects: Rak Samuk Work, Payment Voucher, payout status
- Main actions: View own work history and own payout summary where allowed.
- Related source docs: `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 7. Shipment

### SHP-001 - Ready-to-Ship Queue

- Screen ID: `SHP-001`
- Screen name: Ready-to-Ship Queue
- Thai UI label: `รอสร้างรอบจัดส่ง`
- Primary actor: Admin
- Purpose: Show Orders with ready-stock, completed `JOB-O`, or ready Service Case items waiting for Shipment creation.
- Entry point: `Admin Dashboard` -> `รอสร้างรอบจัดส่ง`.
- Exit point: Shipment creation.
- Related flow IDs: `F06`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Job, Service Case, Ready Stock, Shipment
- Main actions: Search, filter/sort/group, select eligible Orders, open ready items, create Shipment, bulk-create eligible simple Shipments.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-001-ready-to-ship-queue.md`; `docs/ux-ui/image-prompts/IMG-SHIP-001-ready-to-ship-queue.md`; `docs/ux-ui/mockups/SCR-SHIP-001-ready-to-ship-queue/SCR-SHIP-001-content-approved.png`; `docs/ux-ui/01-flow-map.md` F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-002 - Shipment Creation

- Screen ID: `SHP-002`
- Screen name: Shipment Creation
- Thai UI label: `สร้างรอบจัดส่ง`
- Primary actor: Admin
- Purpose: Create Shipment from selected ready-to-ship items.
- Entry point: Ready-to-Ship Queue row action for one Order or special-case review; Order Detail -> `จัดการรอบจัดส่ง` selected lines.
- Exit point: Draft Shipment detail or released Shipment detail.
- Related flow IDs: `F06`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Shipment, Order, Order Line, Job, Address Snapshot, Delivery Note, Shipping Sheet
- Main actions: Review selected ready lines, edit delivery info/COD/note where needed, preview documents, release or save draft.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-002-shipment-builder.md`; `docs/ux-ui/image-prompts/IMG-SHIP-002-shipment-builder.md`; `docs/ux-ui/mockups/SCR-SHIP-002-shipment-builder/SCR-SHIP-002-approved.png`; `docs/ux-ui/01-flow-map.md` F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SHP-003 - Draft Shipment Detail

- Screen ID: `SHP-003`
- Screen name: Draft Shipment Detail
- Thai UI label: `ร่างรอบจัดส่ง`
- Primary actor: Admin
- Purpose: Hold Shipment being prepared before release.
- Entry point: Shipment creation saved as draft.
- Exit point: Released Shipment detail or ready-to-ship queue if cancelled.
- Related flow IDs: `F06`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Draft Shipment, Order, Address Snapshot, Delivery Note, Shipping Sheet
- Main actions: Review draft, release to delivery, cancel draft.
- Related source docs: `docs/ux-ui/01-flow-map.md` F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-004 - Released Shipment Detail

- Screen ID: `SHP-004`
- Screen name: Released Shipment Detail
- Thai UI label: `รอบจัดส่ง`
- Primary actor: Admin
- Purpose: View released Shipment before or after delivery team action.
- Entry point: Shipment creation, Shipment list, related Order.
- Exit point: Delivery dashboard or admin close queue depending on status.
- Related flow IDs: `F06`, `F07`, `F08`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Shipment, Address Snapshot, Order, Delivery Note, Shipping Sheet, Evidence
- Main actions: Review Shipment, open print previews, review delivery state.
- Related source docs: `docs/ux-ui/01-flow-map.md` F06/F07/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-005 - Delivery Note Preview

- Screen ID: `SHP-005`
- Screen name: Delivery Note Preview
- Thai UI label: `ใบส่งของ`
- Primary actor: Admin
- Purpose: Preview/print item list for Shipment.
- Entry point: Shipment creation or Shipment detail.
- Exit point: Shipment detail.
- Related flow IDs: `F06`
- Priority: `P1`
- Device target: desktop
- Design status: ready
- Main data objects: Delivery Note, Shipment, Order Line, product image
- Main actions: Preview, print.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`; `docs/ux-ui/image-prompts/IMG-SHIP-005-delivery-note-preview.md`; `docs/ux-ui/mockups/SCR-SHIP-005-delivery-note-preview/SCR-SHIP-005-approved.png`; `docs/ux-ui/01-flow-map.md` F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-006 - Shipping Sheet Preview

- Screen ID: `SHP-006`
- Screen name: Shipping Sheet Preview
- Thai UI label: `ใบจัดส่ง`
- Primary actor: Admin
- Purpose: Preview/print recipient and address sheet for Shipment.
- Entry point: Shipment creation or Shipment detail.
- Exit point: Shipment detail.
- Related flow IDs: `F06`
- Priority: `P1`
- Device target: desktop
- Design status: ready
- Main data objects: Shipping Sheet, Shipment, Recipient, Address Snapshot, carrier
- Main actions: Preview, print.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`; `docs/ux-ui/image-prompts/IMG-SHIP-006-shipping-sheet-preview.md`; `docs/ux-ui/mockups/SCR-SHIP-006-shipping-sheet-preview/SCR-SHIP-006-approved.png`; `docs/ux-ui/01-flow-map.md` F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-007 - Bulk Shipment Creation

- Screen ID: `SHP-007`
- Screen name: Bulk Shipment Creation
- Thai UI label: `สร้างรอบจัดส่งหลายรายการ`
- Primary actor: Admin
- Purpose: Bulk-create simple Shipments only where confirmed rules allow.
- Entry point: Ready-to-Ship Queue.
- Exit point: Released Shipments.
- Related flow IDs: `F06`
- Priority: `P1`
- Device target: desktop
- Design status: ready
- Main data objects: Order, Shipment, Service Case, COD
- Main actions: Select eligible Orders, use default Customer/Order delivery data, create Shipments/documents without opening `SHP-002`.
- Related source docs: `docs/ux-ui/01-flow-map.md` F06; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 8. Delivery

### DLV-001 - Delivery Dashboard

- Screen ID: `DLV-001`
- Screen name: Delivery Dashboard
- Thai UI label: `ฝ่ายจัดส่ง`
- Primary actor: Delivery Team
- Purpose: Entry point for released Shipments assigned to delivery work.
- Entry point: Delivery Team login/navigation.
- Exit point: `รายการต้องจัดส่งวันนี้` or `รายการรอวันจัดส่ง`.
- Related flow IDs: `F07`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: needs decision
- Main data objects: Shipment, Recipient, Address Snapshot, Delivery Date
- Main actions: Open today list, open waiting-date list, open released Shipment for send-out work.
- Related source docs: `docs/ux-ui/screens/SCR-DEL-001-delivery-dashboard.md`; `docs/ux-ui/image-prompts/IMG-DEL-001-delivery-dashboard.md`; `docs/ux-ui/01-flow-map.md` F07; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

Note:

- Mobile/tablet delivery structure is intentionally deferred until the mobile app shell is designed.

### DLV-002 - Today Delivery List

- Screen ID: `DLV-002`
- Screen name: Today Delivery List
- Thai UI label: `รายการต้องจัดส่งวันนี้`
- Primary actor: Delivery Team
- Purpose: Show Shipments that should be sent today.
- Entry point: Delivery Dashboard.
- Exit point: Delivery Shipment Detail.
- Related flow IDs: `F07`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: needs decision
- Main data objects: Shipment, Recipient, Address Snapshot, Carrier
- Main actions: Open Shipment.
- Related source docs: `docs/ux-ui/01-flow-map.md` F07; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### DLV-003 - Waiting-date Delivery List

- Screen ID: `DLV-003`
- Screen name: Waiting-date Delivery List
- Thai UI label: `รายการรอวันจัดส่ง`
- Primary actor: Delivery Team
- Purpose: Show future-date Shipments not yet due today.
- Entry point: Delivery Dashboard.
- Exit point: Delivery Shipment Detail.
- Related flow IDs: `F07`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: needs decision
- Main data objects: Shipment, Recipient, Address Snapshot, Delivery Date
- Main actions: Open Shipment.
- Related source docs: `docs/ux-ui/01-flow-map.md` F07; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### DLV-004 - Delivery Shipment Detail / Evidence

- Screen ID: `DLV-004`
- Screen name: Delivery Shipment Detail / Evidence
- Thai UI label: `รายละเอียดรอบจัดส่ง`
- Primary actor: Delivery Team
- Purpose: Show delivery-only Shipment details and capture evidence before marking sent.
- Entry point: Today Delivery List or Waiting-date Delivery List.
- Exit point: `ส่งออกแล้ว`.
- Related flow IDs: `F07`, `F08`
- Priority: `P0`
- Device target: tablet / mobile
- Design status: needs decision
- Main data objects: Shipment, Order Line, Recipient, Address Snapshot, Carrier, Evidence, COD
- Main actions: Review delivery data, attach evidence, add note, mark `ส่งออกแล้ว`.
- Related source docs: `docs/ux-ui/01-flow-map.md` F07/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

## 9. Manager

### MGR-001 - Management Overview

- Screen ID: `MGR-001`
- Screen name: Management Overview
- Thai UI label: `ภาพรวมงานค้าง`
- Primary actor: Manager / Owner
- Purpose: Show unfinished Jobs by department, urgency, age, and source type.
- Entry point: Manager navigation.
- Exit point: Job Detail.
- Related flow IDs: `F09`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: needs decision
- Main data objects: Job, Job Source Type, Department, Urgent Label, Delivery Date, Activity Log
- Main actions: Review unfinished work, filter all/customer/production work, sort by priority signals, open Job.
- Related source docs: `docs/ux-ui/01-flow-map.md` F09; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### MGR-002 - Manager Job Detail / Timeline

- Screen ID: `MGR-002`
- Screen name: Manager Job Detail / Timeline
- Thai UI label: `รายละเอียดงาน`
- Primary actor: Manager / Owner
- Purpose: Inspect full Job timeline and department movement for follow-up.
- Entry point: Management Overview.
- Exit point: Management Overview or related operational queue.
- Related flow IDs: `F09`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Activity Log, Management Log, Department, Owner
- Main actions: Review timeline, inspect department age, set/change `งานด่วน` where authorized.
- Related source docs: `docs/ux-ui/01-flow-map.md` F09; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### MGR-003 - Aging Threshold Settings

- Screen ID: `MGR-003`
- Screen name: Aging Threshold Settings
- Thai UI label: `ตั้งค่าอายุงาน`
- Primary actor: Manager / highest-permission user
- Purpose: Configure aging thresholds for management overview.
- Entry point: Management settings.
- Exit point: Management Overview.
- Related flow IDs: `F09`
- Priority: `P2`
- Device target: desktop
- Design status: later
- Main data objects: Aging Threshold, Job, Department
- Main actions: Review/change threshold values.
- Related source docs: `docs/ux-ui/01-flow-map.md` F09; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 10. Supporting Modules

### SUP-001 - Customer Detail

- Screen ID: `SUP-001`
- Screen name: Customer Detail
- Thai UI label: `ลูกค้า`
- Primary actor: Admin / CRM-permission user
- Purpose: Support Order work with Customer, address, CRM, and history context.
- Entry point: Customer search, Order creation, Order Detail.
- Exit point: Order creation, Order Detail, CRM Note Timeline.
- Related flow IDs: `F02`, `F06`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Customer, Address Entry, CRM Note, Order, Service Case, Review Album
- Main actions: View Customer, open address list, view history, add CRM note where allowed.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-002 - CRM Note Timeline

- Screen ID: `SUP-002`
- Screen name: CRM Note Timeline
- Thai UI label: `บันทึก CRM`
- Primary actor: Admin / CRM-permission user
- Purpose: Support Customer context with manual CRM notes.
- Entry point: Customer Detail.
- Exit point: Customer Detail.
- Related flow IDs: `F02`
- Priority: `P2`
- Device target: desktop / tablet
- Design status: later
- Main data objects: CRM Note, Private CRM Note, Customer, image attachment
- Main actions: View timeline, add note where allowed.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SUP-014 - Product / SKU Table

- Screen ID: `SUP-014`
- Screen name: Product / SKU Table
- Thai UI label: `รายการสินค้า / SKU`
- Primary actor: Admin / product-permission / stock-permission user
- Purpose: Main `สินค้า / สต๊อก` entry screen for searching Product Model and SKU Variant records, with stock and production shown as report-only summary.
- Entry point: Sidebar `สินค้า / สต๊อก`, SKU selection flows, stock navigation.
- Exit point: Product Model Detail, SKU Variant Detail, Ready Stock View, Stock Count, Stock Adjustment, Review Album, Production Job Entry.
- Related flow IDs: `F02`, `F03`, `F06`, `F09`
- Priority: `P0`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Product Model, SKU Variant, Ready Stock, Production Job, Review Album, Job Reference on SKU
- Main actions: Search/filter SKU, open SKU, open Product Model, create product/SKU, navigate to stock actions, create production from SKU.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-014-product-sku-table.md`; `docs/ux-ui/image-prompts/IMG-SUP-014-product-sku-table.md`; `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-003 - Product Model Detail

- Screen ID: `SUP-003`
- Screen name: Product Model Detail
- Thai UI label: `SKU ใหญ่`
- Primary actor: Admin / product-permission user
- Purpose: Support Job and SKU work with product-level definition, shared images/instructions, related SKU Variant list, and permission-safe restricted product settings.
- Entry point: Product/SKU Table, SKU detail, Job creation support.
- Exit point: SKU Variant detail, image groups, product masters.
- Related flow IDs: `F03`, `F05`, `F09`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Product Model, SKU Variant, Rak Samuk Standard Rate, Department Instruction Images
- Main actions: View Product Model, open SKU variants, add SKU variant, manage product images, open review album, open source Job reference where present.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-003-product-model-detail.md`; `docs/ux-ui/image-prompts/IMG-SUP-003-product-model-detail.md`; `docs/ux-ui/mockups/SCR-SUP-003-product-model-detail/SCR-SUP-003-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-004 - SKU Variant Detail

- Screen ID: `SUP-004`
- Screen name: SKU Variant Detail
- Thai UI label: `SKU ย่อย`
- Primary actor: Admin / product-permission user
- Purpose: Support ready-stock and product identification for Order, Job, Shipment, and stock work.
- Entry point: Product/SKU Table, Product Model Detail, Order Line entry, Stock view.
- Exit point: SKU image groups, optional Job reference, Ready Stock view.
- Related flow IDs: `F02`, `F03`, `F06`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: SKU Variant, Product Model, Ready Stock, Job Reference on SKU
- Main actions: View SKU, manage status where allowed, open Job reference.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-004-sku-variant-detail.md`; `docs/ux-ui/image-prompts/IMG-SUP-004-sku-variant-detail.md`; `docs/ux-ui/mockups/SCR-SUP-004-sku-variant-detail/SCR-SUP-004-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-005 - SKU Image Groups

- Screen ID: `SUP-005`
- Screen name: SKU Image Groups
- Thai UI label: `รูปสินค้า`
- Primary actor: Admin / product-permission user
- Purpose: Manage image groups used by product, department instruction, Rak Samuk, and review contexts.
- Entry point: Product Model Detail or SKU Variant Detail.
- Exit point: Product/SKU detail.
- Related flow IDs: `F03`, `F04`, `F05`, `F06`
- Priority: `P1`
- Device target: desktop / tablet / mobile
- Design status: ready
- Main data objects: SKU Variant, Department Instruction Images, Review Album
- Main actions: Upload images, reorder images, add optional text where useful, move image groups, soft delete/hide images, open Review Album.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-005-sku-image-groups.md`; `docs/ux-ui/image-prompts/IMG-SUP-005-sku-image-groups.md`; `docs/ux-ui/mockups/SCR-SUP-005-sku-image-groups/SCR-SUP-005-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-006 - Ready Stock View

- Screen ID: `SUP-006`
- Screen name: Ready Stock View
- Thai UI label: `สินค้าพร้อมส่ง`
- Primary actor: Admin / stock-permission user
- Purpose: Support ready-stock reservation and ready-to-ship work.
- Entry point: Order Line entry, SKU Variant Detail, stock navigation.
- Exit point: Order Line detail, Ready-to-Ship Queue.
- Related flow IDs: `F02`, `F06`
- Priority: `P1`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Ready Stock, SKU Variant, Order Line
- Main actions: View stock availability and reservation state.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-006-ready-stock-view.md`; `docs/ux-ui/image-prompts/IMG-SUP-006-ready-stock-view.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-007 - Stock Count

- Screen ID: `SUP-007`
- Screen name: Stock Count
- Thai UI label: `ตรวจนับสต๊อก`
- Primary actor: Stock-permission user
- Purpose: Support periodic stock checking outside the core Job flow.
- Entry point: Stock navigation.
- Exit point: Stock Adjustment when correction is needed.
- Related flow IDs: none
- Priority: `P2`
- Device target: mobile / tablet
- Design status: later
- Main data objects: Stock Count, SKU Variant, Ready Stock
- Main actions: Count stock, attach/check images where useful.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SUP-008 - Stock Adjustment

- Screen ID: `SUP-008`
- Screen name: Stock Adjustment
- Thai UI label: `ปรับยอดสต๊อก`
- Primary actor: Stock-permission user / manager
- Purpose: Correct stock with reason and log.
- Entry point: Stock view, Stock Count, operational correction need.
- Exit point: Updated stock visibility.
- Related flow IDs: `F06`
- Priority: `P2`
- Device target: desktop / tablet
- Design status: later
- Main data objects: Stock Adjustment, Ready Stock, SKU Variant, Management Log
- Main actions: Enter adjustment, reason, and evidence where required.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SUP-009 - Review Album

- Screen ID: `SUP-009`
- Screen name: Review Album
- Thai UI label: `คลังรีวิว`
- Primary actor: Admin / product-permission or CRM-permission user
- Purpose: Manage review image collections separate from product, CRM, Job, and Shipment images.
- Entry point: SKU page or Review page.
- Exit point: SKU Variant Detail or Customer Detail where linked.
- Related flow IDs: none
- Priority: `P2`
- Device target: desktop / tablet
- Design status: later
- Main data objects: Review Album, SKU Variant, Customer, Order, review images
- Main actions: Create album, link SKU/Customer/Order, add images and note.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SUP-010 - Expense Entry

- Screen ID: `SUP-010`
- Screen name: Expense Entry
- Thai UI label: `รายการค่าใช้จ่าย`
- Primary actor: Admin / finance-permission user
- Purpose: Record simple business expenses outside full accounting.
- Entry point: Finance/supporting module navigation.
- Exit point: Expense list/export.
- Related flow IDs: none
- Priority: `P2`
- Device target: desktop / tablet
- Design status: later
- Main data objects: Expense Entry, Expense Category, evidence image
- Main actions: Create expense, edit with permission, cancel, export.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SUP-011 - Payment Voucher

- Screen ID: `SUP-011`
- Screen name: Payment Voucher
- Thai UI label: `ใบสำคัญจ่าย / PV`
- Primary actor: Finance-permission user
- Purpose: Support Rak Samuk payout after payment is confirmed.
- Entry point: Rak Samuk payout preparation.
- Exit point: PV print/signature flow.
- Related flow IDs: `F05`
- Priority: `P2`
- Device target: desktop
- Design status: later
- Main data objects: Payment Voucher, Rak Samuk Work, Rak Samuk Worker, PV number
- Main actions: Prepare PV, confirm payment, print PV.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-012 - Product Masters

- Screen ID: `SUP-012`
- Screen name: Product Masters
- Thai UI label: `ข้อมูลตั้งต้นสินค้า`
- Primary actor: Admin / product-permission user
- Purpose: Maintain confirmed masters needed by product/SKU and instruction classification.
- Entry point: Settings / product navigation.
- Exit point: Product Model Detail or SKU Variant Detail.
- Related flow IDs: `F03`, `F05`
- Priority: `P2`
- Device target: desktop
- Design status: later
- Main data objects: Category, Subcategory, Product Tag, Color Master, Rak Samuk Pattern Master, Carving Pattern Master, Crystal Color Master
- Main actions: Manage master records where allowed.
- Related source docs: `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-013 - Service Case

- Screen ID: `SUP-013`
- Screen name: Service Case
- Thai UI label: `งานบริการหลังการขาย`
- Primary actor: Admin
- Purpose: Support Service Shipments where ready Service Case items enter ready-to-ship flow.
- Entry point: Customer Detail or service navigation.
- Exit point: Ready-to-Ship Queue / Service Shipment.
- Related flow IDs: `F06`
- Priority: `P2`
- Device target: desktop / tablet
- Design status: later
- Main data objects: Service Case, Service Shipment, Customer, Shipment
- Main actions: View service case, mark ready to send back.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting
