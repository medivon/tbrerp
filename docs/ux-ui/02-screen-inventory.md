# Screen Inventory

This inventory is derived from:

- `docs/ux-ui/01-flow-map.md`
- `CONTEXT.md`
- `docs/decision-log.md`
- `docs/ux-ui/initial-scope.md`
- `docs/qa-summary.md` as supporting notes only

It is an index of UX/UI screens for the confirmed starting scope. It is not a duplicate requirements summary and should not add scope beyond the source documents.

## Priority and Status

- `starting-workflow`: required for the first Job operations flow.
- `support`: required support for the first flow, or needed soon after the starting workflow to make the flow usable.
- `later-detail`: confirmed supporting, uncertain, deferred, or later-detail screen. Do not spec before starting-workflow/support unless a later decision promotes it.

Design status:

- `ready`: enough confirmed source material exists to start screen design.
- `needs decision`: the screen is in scope, but a layout/detail decision blocks design.
- `later`: keep in inventory, but do not design in the first starting-workflow/support pass.

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
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Job, Shipment, Financial Follow-up
- Main actions: Review approved dashboard cards, open working queues, inspect critical work preview.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-001-admin-dashboard.md`; `docs/ux-ui/image-prompts/IMG-ADM-001-admin-dashboard.md`; `docs/ux-ui/design-system/app-shell.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-002 - Orders Follow-up Overview

- Screen ID: `ADM-002`
- Screen name: Orders Follow-up Overview
- Thai UI label: `ออเดอร์ที่ต้องติดตาม`
- Primary actor: Admin
- Purpose: Open confirmed Orders that need operational follow-up, such as unfinished shipment, unfinished `JOB-O`, blocked work, or shipment confirmation.
- Entry point: `Admin Dashboard` -> `ออเดอร์ที่ต้องติดตาม`.
- Exit point: Order Detail.
- Related flow IDs: `F01`, `F02`, `F06`, `F08`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Job, Shipment
- Main actions: Search/open Order, review follow-up urgency, review whether it is producing, ready to ship, partially shipped, or waiting shipment confirmation.
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
- Priority: `starting-workflow`
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
- Priority: `starting-workflow`
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
- Purpose: Review shipment rounds marked sent out and add/confirm tracking or `รูปหลักฐานจัดส่ง` before closure.
- Entry point: `Admin Dashboard` -> `ยืนยันการจัดส่ง`.
- Exit point: Shipment detail / closed Shipment.
- Related flow IDs: `F01`, `F08`
- Priority: `starting-workflow`
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
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Job Revision, Activity Log
- Main actions: Open follow-up case, review acknowledgement state, follow up with department.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-006-production-follow-up-queue.md`; `docs/ux-ui/image-prompts/IMG-ADM-006-production-follow-up-queue.md`; `docs/ux-ui/mockups/SCR-ADM-006-production-follow-up-queue/SCR-ADM-006-approved.png`; `docs/ux-ui/01-flow-map.md` F01/F04; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ADM-007 - COD/Payment Follow-up Queue

- Screen ID: `ADM-007`
- Screen name: COD/Payment Follow-up Queue
- Thai UI label: `ติดตาม COD / Payment`
- Primary actor: Admin/Sales in scope / Finance / Manager / Owner
- Purpose: Track operational payment/COD follow-up separately from Order Completion.
- Entry point: `Admin Dashboard` -> `ติดตาม COD / Payment`.
- Exit point: Financial follow-up record or related Order/Shipment.
- Related flow IDs: `F01`, `F08`
- Priority: `support`
- Device target: desktop
- Design status: ready
- Main data objects: Payment Term, Payment Record, Shipment COD, Financial Follow-up, Order
- Main actions: Review follow-up item, open related Order or Shipment, record payment evidence or note, close follow-up when resolved.
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
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Draft Order, Customer, Address Entry, Order Line
- Main actions: Open draft, continue draft, create a new Order.
- Related source docs: `docs/ux-ui/screens/SCR-ADM-008-draft-order-queue.md`; `docs/ux-ui/image-prompts/IMG-ADM-008-draft-order-queue.md`; `docs/ux-ui/mockups/SCR-ADM-008-draft-order-queue/SCR-ADM-008-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

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
- Purpose: Enter customer, address, ready-stock lines, custom-work lines, payment term, and custom-work detail before creating a real Order or saving as Draft Order; ready-stock selection chooses Product Model first, then color/SKU Variant.
- Entry point: Order page `สร้างออเดอร์` action or Draft Order queue.
- Exit point: Order Review or saved Draft Order.
- Related flow IDs: `F02`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order Entry Session, Draft Order, Customer, Address Entry, Order Line, Product Model, SKU Variant, Ready Stock, Custom Work Detail, Order Shipment Plan, Payment Term, Payment Record
- Main actions: Select/create customer, add address, add ready-stock line through Product Model/color selection, choose no-stock products with warning, add custom-work line, save draft, continue to review.
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
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Customer, Customer Primary Phone, Customer Social Contact, Customer Tier, Customer Tier Discount, Address Entry, Customer Sales Summary
- Main actions: Search active Customers only, show all matching active Customers even if duplicate-looking records exist, indicate what matched, select Customer, create Customer with complete Order-required data if not found.
- Related source docs: `docs/ux-ui/01-flow-map.md` F02; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ORD-003 - Address Entry Select / Create

- Screen ID: `ORD-003`
- Screen name: Address Entry Select / Create
- Thai UI label: `ที่อยู่จัดส่ง`
- Primary actor: Admin
- Purpose: Select or create recipient/address information that becomes the Order Recipient Detail snapshot after confirmation.
- Entry point: Customer selected in Order Create/Edit.
- Exit point: Order Line entry.
- Related flow IDs: `F02`, `F06`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Address Entry, Recipient, Customer, Order Recipient Detail
- Main actions: Default to the Customer primary address, change delivery address when multiple addresses exist, create a new structured Order recipient/address snapshot, optionally save a new or edited address back to Customer only when explicitly checked and Customer has fewer than 3 saved addresses.
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
- Priority: `starting-workflow`
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
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Customer, Address Entry, Payment Term, Payment Record, Shipment, Order Status, Shipment Summary
- Main actions: Review Order sections, manage Order, edit safe sections, select ready lines for Shipment, open Shipment, open related Job, review Order status and shipment summary separately.
- Related source docs: `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`; `docs/ux-ui/image-prompts/IMG-ORD-005-order-detail.md`; `docs/ux-ui/mockups/SCR-ORD-005-order-detail/SCR-ORD-005-approved.png`; `docs/ux-ui/01-flow-map.md` F02/F03/F06/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### ORD-006 - All Orders List

- Screen ID: `ORD-006`
- Screen name: All Orders List
- Thai UI label: `ออเดอร์ทั้งหมด`
- Primary actor: Admin
- Purpose: Search and browse all real Orders across every main Order status, excluding Draft Orders, with Order status separated from Shipment summary.
- Entry point: Order page `ออเดอร์ทั้งหมด` tab.
- Exit point: Order Detail or Order Create/Edit.
- Related flow IDs: `F02`, `F06`, `F08`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Customer, Address Entry, Job, Shipment, Order Status, Shipment Summary
- Main actions: Search/filter Orders, inspect item/shipment popovers, open Order, create new Order, clear filters.
- Related source docs: `docs/ux-ui/screens/SCR-ORD-006-all-orders-list.md`; `docs/ux-ui/image-prompts/IMG-ORD-006-all-orders-list.md`; `docs/ux-ui/design-system/table-patterns.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/qa-summary.md`; `docs/ux-ui/initial-scope.md`

### ORD-007 - Order Line Edit

- Screen ID: `ORD-007`
- Screen name: Order Line Edit
- Thai UI label: `แก้ไขรายการออเดอร์`
- Primary actor: Admin
- Purpose: Enter a guarded edit mode/sub-flow from Order Detail to add, remove, or change safe Order Lines after Order confirmation with Review Changes and Financial Reconciliation before saving where totals change.
- Entry point: Order Detail -> `จัดการออเดอร์` -> `แก้ไขรายการสินค้า` or `แก้ไขงานสั่งทำ`.
- Exit point: Review Changes, Order Detail, Job Detail / Revision, or Shipment Detail when downstream state must be resolved first.
- Related flow IDs: `F02`, `F03`, `F06`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Ready Stock, Custom Work Detail, Job, Shipment, Payment Record, COD follow-up, Financial Reconciliation
- Main actions: Add ready-stock line, add custom-work line, edit safe line, remove safe line, open Job for existing `JOB-O` changes/cancellation, reconcile financial totals, review changes, save changes.
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
- Priority: `starting-workflow`
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
- Priority: `starting-workflow`
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
- Priority: `support`
- Device target: desktop / tablet / mobile
- Design status: ready
- Main data objects: Job, Job Revision, Department, Activity Log
- Main actions: Review formal Revision change, choose `รับทราบ`, choose `ไม่เข้าใจให้ติดต่อหา`, admin follow-up.
- Related source docs: `docs/ux-ui/01-flow-map.md` F01/F04; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### JOB-004 - Production Job Entry

- Screen ID: `JOB-004`
- Screen name: Production Job Entry
- Thai UI label: `สร้างงานผลิต`
- Primary actor: Admin / production-permission user
- Purpose: Prepare a production-source Job when internal Production needs work-card handling, from SKU-based production or custom/internal production, before Production Review creates the real `JOB-P`.
- Entry point: Production Batch / Production Lot workflow, Product Model Detail per-color production action, Product/SKU selection, standalone internal production creation flow, or active `ร่างงานผลิต`.
- Exit point: Production Review, `ร่างงานผลิต` queue after save, or cancel.
- Related flow IDs: `F10`
- Priority: `later-detail`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Draft Production Job, SKU Variant, Product Model, optional Production Batch, optional Production Lot, Department Instruction Images
- Main actions: Select or prefill SKU Variant for `ผลิตจาก SKU`, switch to `งานผลิตพิเศษ` when needed, set production quantity, choose starting queue, save draft, continue to Production Review.
- Related source docs: `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`; `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-entry.md`; `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-sku-selected.md`; `docs/ux-ui/image-prompts/IMG-JOB-004-production-special-work.md`; `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-modal-approved.png`; `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-selected-approved.png`; `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-special-work-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### JOB-005 - Production Review / Create Production Job

- Screen ID: `JOB-005`
- Screen name: Production Review / Create Production Job
- Thai UI label: `ตรวจสอบก่อนสร้างงานผลิต`
- Primary actor: Admin / production-permission user
- Purpose: Final review before issuing `JOB-P`, showing entered production detail and downstream result.
- Entry point: Production Job Entry -> `สร้างงานผลิต`.
- Exit point: Job Detail after `ยืนยันสร้างงานผลิต`, Production Job Entry after `กลับ`, or `ร่างงานผลิต` after `บันทึกร่าง`.
- Related flow IDs: `F10`
- Priority: `later-detail`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Draft Production Job, Production Job, SKU Variant, Product Model, Department Instruction Images, Starting Queue
- Main actions: Review production data, save draft, confirm `JOB-P` creation, route to starting queue.
- Related source docs: `docs/ux-ui/screens/SCR-JOB-005-production-review-create-production-job.md`; `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### JOB-006 - Draft Production Queue

- Screen ID: `JOB-006`
- Screen name: Draft Production Queue
- Thai UI label: `ร่างงานผลิต`
- Primary actor: Admin / production-permission user
- Purpose: List saved production drafts that have not become real `JOB-P` records.
- Entry point: `งานสั่งทำ / ผลิต` -> `ร่างงานผลิต`.
- Exit point: Production Job Entry continuation.
- Related flow IDs: `F10`
- Priority: `later-detail`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Draft Production Job, SKU Variant, Product Model, Owner
- Main actions: Search/open draft, continue draft, create new production work.
- Related source docs: `docs/ux-ui/screens/SCR-JOB-006-draft-production-queue.md`; `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

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
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department Instruction Images, Urgent Label, Waiting for Materials
- Main actions: Open Job, choose role-allowed action.
- Related source docs: `docs/ux-ui/screens/SCR-WOOD-001-woodwork-queue.md`; `docs/ux-ui/image-prompts/IMG-WOOD-001-woodwork-queue.md`; `docs/ux-ui/01-flow-map.md` F04/F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### WDW-002 - Woodwork Job Work Card

- Screen ID: `WDW-002`
- Screen name: Woodwork Job Work Card
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Woodwork Department
- Purpose: Provide mobile-friendly Job details and woodwork actions.
- Entry point: Woodwork Work Queue.
- Exit point: Woodwork Work Queue, Rak Samuk send flow, Coloring intake flow, Woodwork history.
- Related flow IDs: `F04`, `F05`
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department Instruction Images, Urgent Label, Delivery Date, Activity Log
- Main actions: `รับงาน`, `รอวัตถุดิบ`, `ส่งไปสี`, `ส่งไปรักสมุก`, `กำลังส่งไปแกะสลัก`.
- Related source docs: `docs/ux-ui/screens/SCR-WOOD-001-woodwork-queue.md`; `docs/ux-ui/image-prompts/IMG-WOOD-001-woodwork-queue.md`; `docs/ux-ui/01-flow-map.md` F04/F05; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### WDW-003 - Woodwork History

- Screen ID: `WDW-003`
- Screen name: Woodwork History
- Thai UI label: `ประวัติงานของฉัน`
- Primary actor: Woodwork Department
- Purpose: Let woodwork users view work they already sent onward or completed.
- Entry point: Woodwork navigation or completed work card.
- Exit point: Historical Job view.
- Related flow IDs: `F04`
- Priority: `support`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Activity Log
- Main actions: View past work.
- Related source docs: `docs/ux-ui/screens/SCR-WOOD-002-woodwork-job-history.md`; `docs/ux-ui/01-flow-map.md` F04; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

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
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department, Activity Log
- Main actions: Open Job, `รับเข้าโรงงานสี`.
- Related source docs: `docs/ux-ui/screens/SCR-COLOR-001-coloring-intake-queue.md`; `docs/ux-ui/01-flow-map.md` F04/F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### CLR-002 - Coloring Work Queue

- Screen ID: `CLR-002`
- Screen name: Coloring Work Queue
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Coloring Department
- Purpose: Show active coloring/decorating Jobs requiring action.
- Entry point: Coloring navigation or `รับเข้าโรงงานสี`.
- Exit point: Coloring Job Work Card.
- Related flow IDs: `F04`, `F05`
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department Instruction Images, Urgent Label, Waiting for Materials
- Main actions: Open Job, choose role-allowed action.
- Related source docs: `docs/ux-ui/screens/SCR-COLOR-002-coloring-work-queue.md`; `docs/ux-ui/image-prompts/IMG-COLOR-002-coloring-work-queue.md`; `docs/ux-ui/01-flow-map.md` F04/F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### CLR-003 - Coloring Job Work Card

- Screen ID: `CLR-003`
- Screen name: Coloring Job Work Card
- Thai UI label: `งานที่ต้องทำ`
- Primary actor: Coloring Department
- Purpose: Provide mobile-friendly Job details and coloring actions.
- Entry point: Coloring Work Queue.
- Exit point: Coloring Work Queue, Rak Samuk send flow, `รอสร้างรอบจัดส่ง`, Coloring history.
- Related flow IDs: `F04`, `F05`, `F06`
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Department Instruction Images, Urgent Label, Delivery Date, Activity Log
- Main actions: `รับงาน`, `รอวัตถุดิบ`, `ส่งไปรักสมุก`, `รับเข้าโรงงานสี`, `งานเสร็จ/พร้อมส่ง`.
- Related source docs: `docs/ux-ui/screens/SCR-COLOR-002-coloring-work-queue.md`; `docs/ux-ui/image-prompts/IMG-COLOR-002-coloring-work-queue.md`; `docs/ux-ui/01-flow-map.md` F04/F05/F06; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### CLR-004 - Coloring History

- Screen ID: `CLR-004`
- Screen name: Coloring History
- Thai UI label: `ประวัติงานของฉัน`
- Primary actor: Coloring Department
- Purpose: Let coloring users view work they already sent onward or completed.
- Entry point: Coloring navigation or completed work card.
- Exit point: Historical Job view.
- Related flow IDs: `F04`
- Priority: `support`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Job, Activity Log
- Main actions: View past work.
- Related source docs: `docs/ux-ui/01-flow-map.md` F04; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 6. Rak Samuk

### RSK-001 - Rak Samuk Send / Worker Selection

- Screen ID: `RSK-001`
- Screen name: Rak Samuk Send / Worker Selection
- Thai UI label: `เลือกช่างรักสมุก`
- Primary actor: Woodwork / Coloring / Admin / Manager / Owner where allowed
- Purpose: Send work to Rak Samuk by selecting one Rak Samuk Worker before confirmation.
- Entry point: Department action `ส่งไปรักสมุก`.
- Exit point: Rak Samuk Worker `งานที่ต้องทำ`.
- Related flow IDs: `F05`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Rak Samuk Work, Rak Samuk Worker
- Main actions: Review work, choose worker, confirm send.
- Related source docs: `docs/ux-ui/screens/SCR-RS-001-rak-samuk-assignment-queue.md`; `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-002 - Rak Samuk Worker Assignment

- Screen ID: `RSK-002`
- Screen name: Rak Samuk Worker Assignment
- Thai UI label: `ส่งรักสมุก`
- Primary actor: Allowed Rak Samuk sender
- Purpose: Confirm the one worker assigned to Rak Samuk Work.
- Entry point: `เลือกช่างรักสมุก`.
- Exit point: Rak Samuk Worker `งานที่ต้องทำ`.
- Related flow IDs: `F05`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
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
- Priority: `starting-workflow`
- Device target: mobile / tablet
- Design status: ready
- Main data objects: Rak Samuk Work, Job, Department Instruction Images, Rak Samuk Work Price, Rak Samuk Proposed Price
- Main actions: Open assigned work, view own price on card/detail where allowed, submit `ขอเสนอราคา` until the related payable item is included in a finalized PV.
- Related source docs: `docs/ux-ui/screens/SCR-RS-002-rak-samuk-worker-work-list.md`; `docs/ux-ui/image-prompts/IMG-RS-002-rak-samuk-worker-work-list.md`; `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### RSK-004 - Price Proposal

- Screen ID: `RSK-004`
- Screen name: Price Proposal
- Thai UI label: `ไม่มีราคา / ให้แจ้งราคา`
- Primary actor: Rak Samuk Worker
- Purpose: Let worker submit `ขอเสนอราคา` for assigned work until the related payable item is included in a finalized PV.
- Entry point: Rak Samuk Worker Work List / Work Detail.
- Exit point: Proposed price approval.
- Related flow IDs: `F05`
- Priority: `support`
- Device target: mobile / tablet
- Design status: ready
- Main data objects: Rak Samuk Work, Proposed Price, Rak Samuk Work Price
- Main actions: Submit proposed per-piece price for the assigned work item.
- Related source docs: `docs/ux-ui/screens/SCR-RS-003-rak-samuk-missing-price.md`; `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-005 - Proposed-price Approval

- Screen ID: `RSK-005`
- Screen name: Proposed-price Approval
- Thai UI label: `อนุมัติราคา`
- Primary actor: Owner / Manager
- Purpose: Approve proposed price for Rak Samuk Work.
- Entry point: Missing-price proposal notification/list.
- Exit point: Rak Samuk Work continues with approved price.
- Related flow IDs: `F05`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Proposed Price, Rak Samuk Work, Product Model, Rak Samuk Standard Rate
- Main actions: Review proposed per-piece price, approve price as Owner/Manager, and decide whether to update Product Model standard rate where applicable.
- Related source docs: `docs/ux-ui/screens/SCR-RS-004-rak-samuk-price-approval.md`; `docs/ux-ui/01-flow-map.md` F05; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### RSK-006 - Receive Rak Samuk Work Back

- Screen ID: `RSK-006`
- Screen name: Receive Rak Samuk Work Back
- Thai UI label: `รับงานรักสมุกกลับ`
- Primary actor: Internal staff
- Purpose: Receive outsource work back and send it to `รอรับเข้าโรงงานสี`.
- Entry point: Rak Samuk Work detail / internal outsource queue.
- Exit point: `รอรับเข้าโรงงานสี`.
- Related flow IDs: `F05`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Rak Samuk Work, Job, Activity Log
- Main actions: Confirm received back; system routes to `รอรับเข้าโรงงานสี` with no starting-workflow destination picker.
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
- Priority: `support`
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
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Order, Order Line, Job, Service Case, Ready Stock, Shipment
- Main actions: Search, filter/sort/group, select eligible Orders, open ready items, create Shipment, bulk-create eligible simple Shipments.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-001-ready-to-ship-queue.md`; `docs/ux-ui/image-prompts/IMG-SHIP-001-ready-to-ship-queue.md`; `docs/ux-ui/mockups/SCR-SHIP-001-ready-to-ship-queue/SCR-SHIP-001-content-approved.png`; `docs/ux-ui/01-flow-map.md` F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-002 - Shipment Builder

- Screen ID: `SHP-002`
- Screen name: Shipment Builder
- Thai UI label: `สร้างรอบจัดส่ง`
- Primary actor: Admin
- Purpose: Create Shipment from selected ready-to-ship items.
- Entry point: Ready-to-Ship Queue row action for one Order or special-case review; Order Detail -> `จัดการรอบจัดส่ง` selected lines.
- Exit point: Released Shipment detail / admin Shipment list after `พร้อมจัดส่ง`; Ready-to-Ship Queue if cancelled before creation.
- Related flow IDs: `F06`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Shipment, Order, Order Line, Job, Address Snapshot, Delivery Note, Shipping Sheet
- Main actions: Review selected ready lines, edit delivery info/note where needed, preview documents, confirm `พร้อมจัดส่ง`. Shipment Builder does not edit COD and does not persist a saved shipment draft in the starting workflow.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-002-shipment-builder.md`; `docs/ux-ui/image-prompts/IMG-SHIP-002-shipment-builder.md`; `docs/ux-ui/mockups/SCR-SHIP-002-shipment-builder/SCR-SHIP-002-approved.png`; `docs/ux-ui/01-flow-map.md` F06; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SHP-004 - Released Shipment Detail

- Screen ID: `SHP-004`
- Screen name: Released Shipment Detail
- Thai UI label: `รอบจัดส่ง`
- Primary actor: Admin
- Purpose: View released Shipment before or after delivery team action.
- Entry point: Shipment creation, Shipment list, related Order.
- Exit point: Delivery dashboard or admin close queue depending on status.
- Related flow IDs: `F06`, `F07`, `F08`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Shipment, Address Snapshot, Order, Delivery Note, Shipping Sheet, Shipment Evidence
- Main actions: Review Shipment, open print previews, review delivery state.
- Related source docs: `docs/ux-ui/01-flow-map.md` F06/F07/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-005 - Delivery Note Preview

- Screen ID: `SHP-005`
- Screen name: Delivery Note Preview
- Thai UI label: `ใบส่งของ`
- Primary actor: Admin / responsible Delivery Team where allowed
- Purpose: Preview/print item list for Shipment, without price or COD amount.
- Entry point: Shipment creation, Shipment detail, or responsible delivery view where allowed.
- Exit point: Shipment detail, Shipping Sheet preview, or delivery view.
- Related flow IDs: `F06`, `F07`
- Priority: `support`
- Device target: desktop
- Design status: ready
- Main data objects: Delivery Note, Shipment, Order Line, product image
- Main actions: Preview, print, without price or COD amount.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`; `docs/ux-ui/image-prompts/IMG-SHIP-005-delivery-note-preview.md`; `docs/ux-ui/mockups/SCR-SHIP-005-delivery-note-preview/SCR-SHIP-005-approved.png`; `docs/ux-ui/01-flow-map.md` F06/F07; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-006 - Shipping Sheet Preview

- Screen ID: `SHP-006`
- Screen name: Shipping Sheet Preview
- Thai UI label: `ใบจัดส่ง`
- Primary actor: Admin / responsible Delivery Team where allowed
- Purpose: Preview/print recipient and address sheet for Shipment, including COD amount where relevant.
- Entry point: Shipment creation, Shipment detail, or responsible delivery view where allowed.
- Exit point: Shipment detail or delivery view.
- Related flow IDs: `F06`, `F07`
- Priority: `support`
- Device target: desktop
- Design status: ready
- Main data objects: Shipping Sheet, Shipment, Recipient, Address Snapshot, carrier, COD
- Main actions: Preview, print, with COD visibility limited to users allowed to see that Shipment COD.
- Related source docs: `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`; `docs/ux-ui/image-prompts/IMG-SHIP-006-shipping-sheet-preview.md`; `docs/ux-ui/mockups/SCR-SHIP-006-shipping-sheet-preview/SCR-SHIP-006-approved.png`; `docs/ux-ui/01-flow-map.md` F06/F07; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SHP-007 - Bulk Shipment Creation

- Screen ID: `SHP-007`
- Screen name: Bulk Shipment Creation
- Thai UI label: `สร้างรอบจัดส่งหลายรายการ`
- Primary actor: Admin
- Purpose: Bulk-create simple Shipments only for eligible ready-stock-only Orders where confirmed rules allow.
- Entry point: Ready-to-Ship Queue.
- Exit point: Released Shipments.
- Related flow IDs: `F06`
- Priority: `support`
- Device target: desktop
- Design status: ready
- Main data objects: Order, Shipment, Service Case, COD
- Main actions: Select eligible ready-stock-only Orders, use saved Order Recipient Detail snapshots as delivery defaults, create/release Shipments/documents without opening `SHP-002`.
- Related source docs: `docs/ux-ui/01-flow-map.md` F06; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 8. Delivery

### DLV-001 - Delivery Dashboard

- Screen ID: `DLV-001`
- Screen name: Delivery Dashboard
- Thai UI label: `ฝ่ายจัดส่ง`
- Primary actor: Delivery Team
- Purpose: Entry point for released Shipments assigned to delivery work.
- Entry point: Delivery Team login/navigation.
- Exit point: `รายการต้องจัดส่งวันนี้`, `รายการรอวันจัดส่ง`, or `ส่งออกแล้ววันนี้`.
- Related flow IDs: `F07`
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Shipment, Recipient, Address Snapshot, Delivery Date, COD
- Main actions: Open today list, open waiting-date list, open same-day sent-out history, mark one Shipment sent out, bulk-mark today's/no-date Shipments sent out.
- Related source docs: `docs/ux-ui/screens/SCR-DEL-001-delivery-dashboard.md`; `docs/ux-ui/image-prompts/IMG-DEL-001-delivery-dashboard.md`; `docs/ux-ui/01-flow-map.md` F07; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

Note:

- Delivery uses a simple worker shell on tablet/mobile, not the desktop admin shell.

### DLV-002 - Today Delivery List

- Screen ID: `DLV-002`
- Screen name: Today Delivery List
- Thai UI label: `รายการต้องจัดส่งวันนี้`
- Primary actor: Delivery Team
- Purpose: Show Shipments that should be sent today.
- Entry point: Delivery Dashboard.
- Exit point: Delivery Shipment Detail.
- Related flow IDs: `F07`
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Shipment, Recipient, Address Snapshot, Carrier, COD
- Main actions: Review short row/card summary, open Shipment detail, mark one row sent out, select rows for bulk `บันทึกว่าส่งออกแล้ว`.
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
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Shipment, Recipient, Address Snapshot, Delivery Date, COD
- Main actions: Review future-date Shipments and open Shipment detail; bulk send-out is not available here.
- Related source docs: `docs/ux-ui/01-flow-map.md` F07; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### DLV-004 - Delivery Shipment Detail / Optional Photo

- Screen ID: `DLV-004`
- Screen name: Delivery Shipment Detail / Optional Photo
- Thai UI label: `รายละเอียดรอบจัดส่ง`
- Primary actor: Delivery Team
- Purpose: Show delivery-only Shipment details and optionally capture delivery photos before or while marking sent.
- Entry point: Today Delivery List or Waiting-date Delivery List.
- Exit point: `ส่งออกแล้ว`.
- Related flow IDs: `F07`, `F08`
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Shipment, Order Line, Recipient, Address Snapshot, Carrier, COD, optional Shipment Evidence
- Main actions: Review delivery data, add optional `รูปหลักฐานจัดส่ง`, add note, mark `ส่งออกแล้ว`; Tracking is not shown in Delivery Team UI.
- Related source docs: `docs/ux-ui/01-flow-map.md` F07/F08; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### DLV-005 - Same-day Sent-out History

- Screen ID: `DLV-005`
- Screen name: Same-day Sent-out History
- Thai UI label: `ส่งออกแล้ววันนี้`
- Primary actor: Delivery Team
- Purpose: Let Delivery Team verify which Shipments were already marked `ส่งออกแล้ว` today.
- Entry point: Delivery Dashboard.
- Exit point: Delivery Dashboard or Delivery Shipment Detail in read-only sent-out state.
- Related flow IDs: `F07`
- Priority: `starting-workflow`
- Device target: tablet / mobile
- Design status: ready
- Main data objects: Shipment, Activity Log, Recipient, Carrier, COD
- Main actions: Review same-day sent-out Shipments; no full search/history in the starting workflow.
- Related source docs: `docs/ux-ui/01-flow-map.md` F07; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

## 9. Manager

### MGR-001 - Management Overview

- Screen ID: `MGR-001`
- Screen name: Management Overview
- Thai UI label: `ภาพรวมงานค้าง`
- Primary actor: Manager / Owner
- Purpose: Show unfinished customer Jobs by default, with filters for all/production work, prioritizing urgency, material blockers, delivery proximity, and age.
- Entry point: Manager navigation.
- Exit point: Job Detail.
- Related flow IDs: `F09`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Job, Job Source Type, Department, Urgent Label, Delivery Date, Activity Log
- Main actions: Review default `JOB-O / งานลูกค้า` table, filter all/customer/production work, sort by priority signals, open side drawer, set/change `งานด่วน` from the drawer, open Job.
- Related source docs: `docs/ux-ui/screens/SCR-MGR-001-manager-unfinished-work-overview.md`; `docs/ux-ui/image-prompts/IMG-MGR-001-manager-unfinished-work-overview.md`; `docs/ux-ui/01-flow-map.md` F09; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### MGR-002 - Manager Job Detail / Timeline

- Screen ID: `MGR-002`
- Screen name: Manager Job Detail / Timeline
- Thai UI label: `รายละเอียดงาน`
- Primary actor: Manager / Owner
- Purpose: Inspect full Job timeline and department movement for follow-up.
- Entry point: Management Overview.
- Exit point: Management Overview or related operational queue.
- Related flow IDs: `F09`
- Priority: `support`
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
- Priority: `later-detail`
- Device target: desktop
- Design status: later
- Main data objects: Aging Threshold, Job, Department
- Main actions: Review/change threshold values.
- Related source docs: `docs/ux-ui/01-flow-map.md` F09; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

## 10. Supporting Modules

### SUP-000 - Customer Search / List

- Screen ID: `SUP-000`
- Screen name: Customer Search / List
- Thai UI label: `ลูกค้า / CRM`
- Primary actor: Admin / CRM-permission user
- Purpose: Search, filter, and open Customers without entering the Order flow.
- Entry point: Sidebar `ลูกค้า / CRM`.
- Exit point: Customer Detail, Order Create/Edit with Customer preselected.
- Related flow IDs: `F02`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Customer, Customer Primary Phone, Customer Social Contact, Customer Tier, Customer Sales Summary, Address Entry, Customer Tag, Customer Status
- Main actions: Instant-search Customer, sort by Customer Code, filter by Customer Tier/province/total sales/status/tag, open Customer with row action `เปิดลูกค้า`.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-001 - Customer Detail

- Screen ID: `SUP-001`
- Screen name: Customer Detail
- Thai UI label: `ลูกค้า`
- Primary actor: Admin / CRM-permission user
- Purpose: Support Order work with Customer, address, CRM, and history context.
- Entry point: Customer search, Order creation, Order Detail.
- Exit point: Order creation, Order Detail, CRM Note Timeline.
- Related flow IDs: `F02`, `F06`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Customer, Customer Primary Phone, Customer Social Contact, Customer Tier, Customer Tier Discount, Customer Sales Summary, Customer Tag, Address Entry, CRM Note, Order, Service Case, Review Album
- Main actions: View Customer, edit profile where allowed, manage limited address list, view `ยอดซื้อรวม` and history, add CRM note from CRM section where allowed, open Order Create/Edit with Customer/default address preselected, open Service Case creation with Customer linked.
- Related source docs: `CONTEXT.md`; `docs/adr/0014-service-case-is-independent-after-sales-record.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-002 - CRM Note Timeline

- Screen ID: `SUP-002`
- Screen name: CRM Note Timeline
- Thai UI label: `บันทึก CRM`
- Primary actor: Admin / CRM-permission user
- Purpose: Support Customer context with manual CRM notes.
- Entry point: Customer Detail.
- Exit point: Customer Detail.
- Related flow IDs: `F02`
- Priority: `later-detail`
- Device target: desktop / tablet
- Design status: later
- Main data objects: CRM Note, Customer, Order reference, image attachment
- Main actions: View timeline, add note where allowed.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SUP-014 - Product / SKU Table

- Screen ID: `SUP-014`
- Screen name: Product / SKU Table
- Thai UI label: `รายการสินค้า / SKU`
- Primary actor: Admin / product-permission / stock-permission user
- Purpose: Main `สินค้า / สต๊อก` entry screen for searching Product Models as top-level rows, with saleable stock summary and expandable color/SKU Variant rows only when stock is saleable.
- Entry point: Sidebar `สินค้า / สต๊อก`, SKU selection flows, stock navigation.
- Exit point: Product Model Detail, Ready Stock View, Stock Count, Stock Adjustment, Review Album.
- Related flow IDs: `F02`, `F03`, `F06`, `F09`
- Priority: `starting-workflow`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Product Model, SKU Variant, Ready Stock, Production Job, Review Album, Job Reference on Product Model
- Main actions: Search/filter products, filter category/color/stock status, expand stocked rows to view color/SKU Variant stock, open Product Detail, create Product Model with initial color set, navigate to stock actions.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-014-product-sku-table.md`; `docs/ux-ui/image-prompts/IMG-SUP-014-product-sku-table.md`; `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-003 - Product Model Detail

- Screen ID: `SUP-003`
- Screen name: Product Model Detail
- Thai UI label: `SKU หลัก`
- Primary actor: Admin / product-permission user
- Purpose: Support Job and SKU work with product-level definition, shared images/instructions, color/SKU Variant management, stock-by-color visibility, and per-color production shortcuts.
- Entry point: Product/SKU Table, SKU detail, Job creation support.
- Exit point: SKU Variant detail, image groups, product masters, Stock Adjustment, Production Job Entry.
- Related flow IDs: `F03`, `F05`, `F09`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Product Model, Product Color Option, SKU Variant, Ready Stock, Department Instruction Images, Production Job
- Main actions: View Product Model, open/close colors, open SKU variants, adjust stock by color via dedicated screen, create production from an enabled color, manage product images, open review album, open source Job reference where present.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-003-product-model-detail.md`; `docs/ux-ui/image-prompts/IMG-SUP-003-product-model-detail.md`; `docs/ux-ui/mockups/SCR-SUP-003-product-model-detail/SCR-SUP-003-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-004 - SKU Variant Detail

- Screen ID: `SUP-004`
- Screen name: SKU Variant Detail
- Thai UI label: `SKU ย่อย`
- Primary actor: Admin / product-permission user
- Purpose: Support color-specific SKU identification for Order, Job, Shipment, and stock work.
- Entry point: Product/SKU Table, Product Model Detail, Order Line entry, Stock view.
- Exit point: Product Model Detail, SKU image groups, Ready Stock view, Stock Adjustment, Production Job Entry.
- Related flow IDs: `F02`, `F03`, `F06`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: SKU Variant, Product Model, Product Color Option, Ready Stock
- Main actions: View SKU Variant, inspect color status, open Product Model, open stock actions, create production where the color is enabled.
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
- Priority: `support`
- Device target: desktop / tablet / mobile
- Design status: ready
- Main data objects: Product Model, SKU Variant, Department Instruction Images, Review Album
- Main actions: Upload images, reorder images, add optional text where useful, move image groups, soft delete/hide images, open Review Album.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-005-sku-image-groups.md`; `docs/ux-ui/image-prompts/IMG-SUP-005-sku-image-groups.md`; `docs/ux-ui/mockups/SCR-SUP-005-sku-image-groups/SCR-SUP-005-approved.png`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-006 - Ready Stock View

- Screen ID: `SUP-006`
- Screen name: Ready Stock View
- Thai UI label: `สินค้าพร้อมส่ง`
- Primary actor: Admin / stock-permission user
- Purpose: Support ready-stock reservation and ready-to-ship work using `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`.
- Entry point: Order Line entry, SKU Variant Detail, stock navigation.
- Exit point: Order Line detail, Ready-to-Ship Queue, Product Purchase Order, Stock Count, Stock Adjustment.
- Related flow IDs: `F02`, `F06`, `F13`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Ready Stock, SKU Variant, Order Line
- Main actions: View stock availability and reservation state, open product purchase order, open stock count, open stock adjustment, view movement history.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-006-ready-stock-view.md`; `docs/ux-ui/image-prompts/IMG-SUP-006-ready-stock-view.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-007 - Stock Count

- Screen ID: `SUP-007`
- Screen name: Stock Count
- Thai UI label: `ตรวจนับสต๊อกสินค้า`
- Primary actor: Stock-permission user
- Purpose: Count actual physical `มีอยู่ในร้าน` for selected SKU Variants and create stock movements for every counted line.
- Entry point: Ready Stock View, Stock navigation, SKU Variant Detail.
- Exit point: Stock Adjustment movement history, Ready Stock View.
- Related flow IDs: `F13`
- Priority: `later-detail`
- Device target: mobile / tablet
- Design status: ready
- Main data objects: Stock Count, SKU Variant, Ready Stock, Stock Movement, attachment
- Main actions: Create count round, add selected SKU Variants, enter actual counts, close count, create zero-difference and adjustment movements.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-007-stock-count.md`; `CONTEXT.md`; `docs/adr/0011-product-stock-receipts-and-counts.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-008 - Stock Adjustment

- Screen ID: `SUP-008`
- Screen name: Stock Adjustment
- Thai UI label: `ปรับยอดสต๊อกสินค้า`
- Primary actor: Stock-permission user / manager
- Purpose: Correct product Stock On Hand by entering actual counted quantity and recording an immutable stock movement.
- Entry point: Ready Stock View, SKU Variant Detail, Stock Count, operational correction need.
- Exit point: Updated Ready Stock visibility and SKU Stock Movement history.
- Related flow IDs: `F06`, `F13`
- Priority: `later-detail`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Stock Adjustment, Ready Stock, SKU Variant, Stock Movement, Management Log, attachment
- Main actions: Enter actual count, calculate difference, choose reason when different, attach optional evidence, save immutable movement.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-008-stock-adjustment.md`; `CONTEXT.md`; `docs/adr/0011-product-stock-receipts-and-counts.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-018 - Product Purchase Order

- Screen ID: `SUP-018`
- Screen name: Product Purchase Order
- Thai UI label: `ใบสั่งซื้อสินค้า`
- Primary actor: Product purchase/stock-permission user
- Purpose: Prepare a finished-product purchase document, receive product stock partially by SKU line, and create Payment Audit Follow-up only after full receipt.
- Entry point: Ready Stock View, Product/SKU Table, SKU Variant Detail, manual product purchase creation.
- Exit point: Product Stock Receipt, Ready Stock View, Payment Audit Follow-up after full receipt.
- Related flow IDs: `F13`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Product Purchase Order, Product Purchase Order Line, Supplier, SKU Variant, Product Stock Receipt, Stock Movement, attachment, Payment Audit Follow-up
- Main actions: Create waiting document, print/export, edit unreceived quantities, receive full/partial quantities, close remaining line quantities with reason, cancel before receipt, view receipt rounds.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-018-product-purchase-order.md`; `CONTEXT.md`; `docs/adr/0011-product-stock-receipts-and-counts.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-019 - Product Stock Receipt

- Screen ID: `SUP-019`
- Screen name: Product Stock Receipt
- Thai UI label: `รับเข้าสินค้า`
- Primary actor: Stock-permission user
- Purpose: Record one receipt round for a Product Purchase Order and increase Ready Stock for the received SKU quantities.
- Entry point: Product Purchase Order -> `รับเข้าสินค้า`.
- Exit point: Product Purchase Order, Ready Stock View, SKU Stock Movement.
- Related flow IDs: `F13`
- Priority: `support`
- Device target: desktop / tablet / mobile
- Design status: ready
- Main data objects: Product Stock Receipt, Product Purchase Order, Product Purchase Order Line, SKU Variant, Ready Stock, Stock Movement, attachment
- Main actions: Enter received quantities, mark lines fully received, save immutable receipt round, attach optional evidence, block quantities over remaining ordered quantity.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-019-product-stock-receipt.md`; `CONTEXT.md`; `docs/adr/0011-product-stock-receipts-and-counts.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-015 - Material Stock

- Screen ID: `SUP-015`
- Screen name: Material Stock
- Thai UI label: `สต๊อกวัสดุ`
- Primary actor: Stock/material-permission user
- Purpose: Lightweight material stock view for easy-to-count internal materials, separate from Product/SKU stock and full Material Master.
- Entry point: Sidebar `สินค้า / สต๊อก` -> `สต๊อกวัสดุ`, waiting-materials alerts from Jobs.
- Exit point: Material Purchase Order, Material Adjustment, Job Detail where waiting materials originated.
- Related flow IDs: `F04`, `F10`, `F12`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Material Item, Material Category, Supplier, Material Need Note, Material Movement
- Main actions: View material quantity on hand, see waiting-materials alerts, add material items, create purchase order summary, receive through purchase order, open material adjustment, view simple movement history.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-015-material-stock.md`; `docs/ux-ui/image-prompts/IMG-SUP-015-material-stock.md`; `docs/ux-ui/mockups/SCR-SUP-015-material-stock/README.md`; `CONTEXT.md`; `docs/adr/0009-light-material-stock-boundary.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-016 - Material Purchase Order

- Screen ID: `SUP-016`
- Screen name: Material Purchase Order
- Thai UI label: `ใบสั่งซื้อวัสดุ`
- Primary actor: Material purchase/stock-permission user
- Purpose: Prepare a material purchase document, print/export it while waiting to receive, and accept the whole document into material stock.
- Entry point: Material Stock, waiting-materials summary, manual material purchase creation.
- Exit point: Material Stock, Payment Audit Follow-up.
- Related flow IDs: `F12`
- Priority: `support`
- Device target: desktop / tablet
- Design status: ready
- Main data objects: Material Purchase Order, Material Item, Supplier, Material Stock Receipt, attachment, Payment Audit Follow-up
- Main actions: Create `รอรับเข้า` document for one supplier, print/export A4/JPG, edit while waiting, accept whole document into stock, release linked waiting-material Jobs on receipt, cancel waiting document, attach evidence in any status.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-016-material-purchase-order.md`; `docs/ux-ui/image-prompts/IMG-SUP-016-material-purchase-order.md`; `docs/ux-ui/mockups/SCR-SUP-016-material-purchase-order/README.md`; `CONTEXT.md`; `docs/adr/0009-light-material-stock-boundary.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-017 - Material Adjustment

- Screen ID: `SUP-017`
- Screen name: Material Adjustment
- Thai UI label: `ปรับยอดวัสดุ`
- Primary actor: Material stock-permission user
- Purpose: Let staff enter actual counted quantities for selected materials and have the system record differences with optional evidence.
- Entry point: Material Stock, material count work.
- Exit point: Updated Material Stock and material movement history.
- Related flow IDs: `F12`
- Priority: `support`
- Device target: desktop / tablet / mobile
- Design status: ready
- Main data objects: Material Adjustment, Material Item, Material Movement, attachment, Management Log
- Main actions: Search/select materials, enter actual count for multiple materials, calculate differences, save optional evidence for the adjustment session, view summaries by date/range.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-017-material-adjustment.md`; `docs/ux-ui/image-prompts/IMG-SUP-017-material-adjustment.md`; `docs/ux-ui/mockups/SCR-SUP-017-material-adjustment/README.md`; `CONTEXT.md`; `docs/adr/0009-light-material-stock-boundary.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-009 - Review Album

- Screen ID: `SUP-009`
- Screen name: Review Album
- Thai UI label: `คลังรีวิว`
- Primary actor: Admin / product-permission or CRM-permission user
- Purpose: Manage review image collections separate from product, CRM, Job, and Shipment images.
- Entry point: SKU page or Review page.
- Exit point: SKU Variant Detail or Customer Detail where linked.
- Related flow IDs: none
- Priority: `later-detail`
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
- Priority: `later-detail`
- Device target: desktop / tablet
- Design status: later
- Main data objects: Expense Entry, Expense Category, evidence image
- Main actions: Create expense, edit with permission, cancel, export.
- Related source docs: `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`

### SUP-011 - Payment Voucher

- Screen ID: `SUP-011`
- Screen name: Payable Items / Payment Voucher
- Thai UI label: `รายการรอจ่าย / ใบสำคัญจ่าย`
- Primary actor: Finance, with Owner/Manager approval/override visibility
- Purpose: Review item-first payable records by payee, clear ready items into one-payee PV, and print/finalize the PV after payment is confirmed.
- Entry point: `รายจ่าย` -> `รายการรอจ่าย` / Rak Samuk payout preparation.
- Exit point: PV detail/history, payee payout history, PV print/signature flow.
- Related flow IDs: `F05`
- Priority: `later-detail`
- Device target: desktop
- Design status: later
- Main data objects: Payable Item, Rak Samuk Work, custom income, Rak Samuk Worker/payee, Payment Voucher, PV number
- Main actions: Review one payee's pending items, resolve missing prices outside PV, add custom income, select ready/priced items, review/finalize one-payee PV with optional evidence, print/reprint finalized PV, void finalized PV by Owner/Manager.
- Related source docs: `docs/ux-ui/04-interaction-modal-behavior.md`; `CONTEXT.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-012 - Product Settings

- Screen ID: `SUP-012`
- Screen name: Product Settings
- Thai UI label: `ตั้งค่าสินค้า`
- Primary actor: Admin / product-permission user
- Purpose: Maintain product settings needed by product/SKU and instruction classification.
- Entry point: `ตั้งค่า > ตั้งค่าสินค้า`, and mini manager modal from Product create/edit.
- Exit point: Product Model Detail or SKU Variant Detail.
- Related flow IDs: `F03`, `F05`, `F10`, `F11`
- Priority: `later-detail`
- Device target: desktop
- Design status: later
- Main data objects: หมวดหมู่สินค้า, หมวดหมู่ย่อย, แท็กสินค้า, รายการสี, รายการลายรักสมุก, รายการลายแกะสลัก, รายการสีคริสตัล
- Main actions: Add, edit, close, reopen, search, and filter setting records where allowed. Delete is allowed only when the record has never been used; used records must be `ปิดใช้งาน`. Management Log is required for setting changes.
- Related source docs: `docs/ux-ui/screens/SCR-SUP-012-product-settings.md`; `docs/ux-ui/image-prompts/IMG-SUP-012-product-settings.md`; `docs/ux-ui/mockups/SCR-SUP-012-product-settings/README.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting

### SUP-013 - Service Case

- Screen ID: `SUP-013`
- Screen name: Service Case
- Thai UI label: `งานบริการหลังการขาย`
- Primary actor: Admin
- Purpose: Record independent after-sales events such as refund notes, returned goods, or goods sent back, and support Service Shipments where ready Service Case items enter ready-to-ship flow without affecting any referenced Order.
- Entry point: Customer Detail or service navigation.
- Exit point: Ready-to-Ship Queue / Service Shipment.
- Related flow IDs: `F06`
- Priority: `later-detail`
- Device target: desktop / tablet
- Design status: later
- Main data objects: Service Case, Service Shipment, Customer, Shipment
- Main actions: View service case, record after-sales event, mark ready to send back, create Service Shipment where needed, close case.
- Related source docs: `CONTEXT.md`; `docs/adr/0014-service-case-is-independent-after-sales-record.md`; `docs/decision-log.md`; `docs/ux-ui/initial-scope.md`; `docs/qa-summary.md` supporting
