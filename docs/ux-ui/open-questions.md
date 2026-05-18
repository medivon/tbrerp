# UX Questions Register

## Order Workflow Follow-up Questions

No blocking open Order workflow questions remain from the latest Order Q&A round.

The latest 50-question functional readiness round resolved status separation, stock warnings, financial reconciliation, line cancellation, `JOB-O` cancellation ownership, Shipment handoff, and whole-Order cancellation behavior.

## Recently Resolved Order Workflow Questions

### OQ-ORD-001 - Stock-insufficient acknowledgement result

Decision:

- If stock-insufficient confirmation is acknowledged by a permitted Order user, the ready-stock reservation can make stock go negative.
- The negative stock state is intentional visibility for the shortage.

### OQ-ORD-002 - Order recipient snapshot before Shipment exists

Decision:

- A confirmed Order stores its own Order Recipient Detail snapshot.
- Later Customer Detail/address-book changes do not change old Orders.
- Shipment Builder defaults from the Order snapshot and may override recipient/address for that Shipment round only.

### OQ-ORD-003 - Price edit after Payment Record exists

Decision:

- Keep existing Payment Records/slips unchanged.
- If the edited total requires more payment, add a new Payment Record/slip.
- Reduced totals or overpayment are handled through Financial Reconciliation / financial note or follow-up rather than deleting old payment history.

### OQ-ORD-004 - Direct shipment action from follow-up queue

Decision:

- `ออเดอร์ที่ต้องติดตาม` is a follow-up/filter page only.
- It does not create Shipment rounds directly.
- Users open Order Detail to manage selected lines and downstream actions.

### OQ-ORD-005 - Closed / cancelled queue screen shape

Decision:

- `ปิดแล้ว / ยกเลิก` reuses the `ออเดอร์ทั้งหมด` table/layout with the tab/filter applied.
- It does not need a separate screen, prompt, or visual asset unless future behavior diverges.

### OQ-ORD-006 - Order status vs Shipment status

Decision:

- `สถานะออเดอร์` and `สถานะการจัดส่ง` are separate.
- `รอยืนยันการจัดส่ง` is a Shipment round / shipment-summary state, not a main Order status.
- Main Order statuses are `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `จัดส่งครบแล้ว`, and `ยกเลิก`.

### OQ-ORD-007 - Financial reconciliation after Order total edits

Decision:

- Normal Payment Records do not block Order operation.
- If an Order edit changes sales total after Payment/COD records exist, Review Changes blocks save until financial evidence or adjustment/refund/credit note reconciles with the new sales total.
- Refund/credit remains a note/follow-up in this scope, not an Order status.

### OQ-ORD-008 - Existing JOB-O cancellation ownership

Decision:

- If `JOB-O` exists, cancellation starts from Job, even if production has not started.
- Order Detail keeps the cancelled custom line visible with reason and excludes it from active status, totals, and shipment selection.

### OQ-ORD-009 - Stock shortage after acknowledgement

Decision:

- Stock shortage is a warning/reporting issue after acknowledgement by an Order-capable user.
- It does not block Order or Shipment operation.
- Shipment Builder shows acknowledgement when selected ready-stock lines have negative/insufficient stock.

## Recently Resolved Starting-workflow UX Questions

### OQ-IA-001 - Identity and access consolidation

Decision:

- Identity & Access Grill Me round IA-001 to IA-150 is complete enough for first implementation documentation.
- Use one User system for internal employees and Outsource users.
- Base roles see only Personal Dashboard; operational menus are permission-aware.
- Delivery Team can see COD amount for Shipments they are responsible for, but cannot close COD/payment follow-up.
- Rak Samuk send-out requires choosing the Rak Samuk Worker immediately.
- Rak Samuk Worker uses `ขอเสนอราคา`; Owner/Manager approve proposed prices, and Finance pays from approved prices.
- Completed Orders are not edited in normal workflow. Use notes, Service Case, finance note, correction record, or Owner/Manager-only `รอบจัดส่งพิเศษ`.
- This consolidation supersedes older Identity/Access notes that moved Rak Samuk proposed-price approval away from Owner/Manager, denied all Delivery Team COD visibility, or let Rak Samuk work wait in an unassigned send queue.

### OQ-UX-001 - Delivery Team send-out and admin proof boundary

Decision:

- Delivery Team screens use a simple mobile/tablet worker shell.
- Delivery Team can mark one Shipment `ส่งออกแล้ว` from the row/card action.
- Delivery Team can bulk-select today's/no-date Shipments and confirm `บันทึกว่าส่งออกแล้ว`.
- Delivery Team does not enter Tracking.
- Delivery Team can see COD amount only for Shipments they are responsible for.
- Delivery Team cannot change COD amount or close COD/payment follow-up.
- Delivery Team may attach optional `รูปหลักฐานจัดส่ง` on an individual Shipment, but send-out does not require evidence.
- After send-out, the Shipment leaves the active today list and enters admin `ยืนยันการจัดส่ง`.
- Admin records Tracking or at least one delivery evidence photo before closing Shipment.
- Delivery Team has only a simple `ส่งออกแล้ววันนี้` history view in the starting workflow.

### OQ-UX-002 - Rak Samuk worker and receive-back boundary

Decision:

- Rak Samuk Worker uses a simple mobile worker shell with assigned-work cards and Full Production Job Detail for assigned work.
- Rak Samuk Worker sees own price on both card and detail.
- Rak Samuk Worker cannot mark work complete or move workflow status.
- Sending work to Rak Samuk must select the Rak Samuk Worker immediately; unknown worker means the work is not sent yet.
- `รับงานรักสมุกกลับ` always routes the Job to `รอรับเข้าโรงงานสี`.
- The starting workflow has no receive-back destination picker.

### OQ-UX-003 - Manager unfinished-work default

Decision:

- `ภาพรวมงานค้าง` defaults to `JOB-O / งานลูกค้า`.
- The default layout is one priority-sorted table.
- `งานด่วน` is set or changed from the selected-row side drawer.
- `รอวัตถุดิบ` is a high blocker and sorts above normal aged work.

## Recently Resolved Support UX Questions

### OQ-UX-004 - Rak Samuk missing-price proposal and approval

Decision:

- Rak Samuk Worker uses `ขอเสนอราคา` for the specific assigned work item.
- Worker does not enter a total price for all assigned work.
- Owner/Manager approves the proposed Rak Samuk price.
- Finance pays or creates PV from the approved price.
- If the work links to a SKU/Product Model, the approver must choose whether to update the Rak Samuk Standard Rate.

## Recently Resolved Interaction & Modal Behavior Questions

### OQ-IM-001 - Interaction & Modal Behavior consolidation

Decision:

- IM-001 to IM-135 are complete enough for source-of-truth consolidation.
- Use `docs/ux-ui/04-interaction-modal-behavior.md` as the consolidated interaction behavior source.
- No persistent saved shipment draft exists in the starting workflow. Shipment Builder is temporary pre-release work, and Shipment exists only after `พร้อมจัดส่ง`.
- COD is allowed only on the final Shipment round that completes delivery for the Order; Shipment Builder does not edit COD.
- Production photos/evidence are optional, including ready/complete, and can be attached later after Job completion.
- Missing or wrong production detail is not a system workflow. Workers ask outside the system; there is no special note/action/log requirement and no open question remains.
- `รายการรอจ่าย` / `ตัดรอบจ่าย` is the editable payout workspace; PV is the finalized one-payee payment document.
- Product/SKU deactivation requires reason and Management Log; reopening requires confirmation and Management Log but no reason.
- Cross-cutting patterns for hidden/disabled actions, no-access, stale state, validation failure, upload failure, bulk partial success, reason capture, evidence requirements, and post-action navigation are resolved.

## Recently Resolved Material Boundary Questions

### OQ-MAT-001 - Supplier/material cardinality

Decision:

- Each Material Item has one current primary supplier in the starting workflow.
- One Material Purchase Order has exactly one supplier/store.
- If waiting-material notes involve multiple suppliers, the system creates separate Material Purchase Orders by supplier.
- Changing a Material Item's primary supplier affects future purchase documents only; old documents keep their captured supplier.
- The primary supplier cannot be changed while that Material Item is in a `รอรับเข้า` Material Purchase Order.
- Material Purchase Orders have no draft state in the starting workflow.
- Manual Material Purchase Orders cannot link Jobs later, and linked Material Purchase Orders cannot add new Job links later.
- Receipt releases linked Jobs without a badge or separate notification.

Why it matters:

- This resolved the Material Stock table, Material Purchase Order line picker, supplier filter, and purchase document boundary.

## Recently Resolved Production Job Entry Questions

### OQ-PROD-001 - Production draft boundary

Decision:

- `สร้างงานผลิต` has a real `ร่างงานผลิต` state with `PROD-DRAFT-xxxx`.
- A draft does not create `JOB-P`, enter department queues, affect stock, or appear in active production reports.
- Drafts live under `งานสั่งทำ / ผลิต` -> `ร่างงานผลิต`, and can be edited by the creator, same-permission users, or higher-permission users.

### OQ-PROD-002 - Production Review before JOB-P

Decision:

- Pressing `สร้างงานผลิต` opens `ตรวจสอบก่อนสร้างงานผลิต`.
- `ยืนยันสร้างงานผลิต` creates the real `JOB-P`, archives the draft as read-only, and opens Job Detail.
- After `JOB-P` exists, production-affecting edits go through Job Detail / Revision, not back through the entry form.

### OQ-PROD-003 - Starting queue

Decision:

- Starting queue is required before Review and defaults to `ช่างไม้`.
- Starting options are `ช่างไม้`, `รอรับเข้าโรงงานสี`, and `ส่งไปรักสมุก`.
- This supports work that starts from outside/received pieces, coloring, or Rak Samuk instead of always starting at woodwork.

### OQ-PROD-004 - SKU-tied production stock result

Decision:

- When a SKU-tied `JOB-P` is marked complete, Ready Stock increases immediately by the Job's production quantity.
- There is no separate stock-receipt screen for `JOB-P` in the starting workflow.
- `งานผลิตพิเศษ` not tied to SKU becomes Done without stock change; the creator follows up manually if it later becomes a SKU or prototype reference.

## Recently Resolved Product Stock Questions

### OQ-STOCK-001 - Product stock-in boundary

Decision:

- Product Ready Stock has its own `ใบสั่งซื้อสินค้า` and `รับเข้าสินค้า` workflow.
- It is separate from Material Purchase Order / Material Stock Receipt.
- SKU-tied `JOB-P` completion still increases Ready Stock directly and does not go through product receipt.

### OQ-STOCK-002 - Product Purchase Order partial receipt

Decision:

- Product Purchase Order supports partial receipt per SKU line.
- Statuses are `รอรับเข้า`, `รับเข้าบางส่วน`, `รับเข้าสต๊อกแล้ว`, `รับเข้าสต๊อกยังไม่ครบ`, and `ยกเลิก`.
- Use action `ปิดยอดที่เหลือ` to close remaining quantity on an affected SKU line; the terminal incomplete status is `รับเข้าสต๊อกยังไม่ครบ`.
- Reason `ปรับยอดแล้ว` requires a linked same-SKU Stock Count / Stock Adjustment movement with positive quantity covering the closed remainder.
- Over-delivery is not recorded automatically; users create a new Product Purchase Order for excess goods when needed.
- Product Stock Receipt rounds are immutable; mistakes are corrected by Stock Adjustment / Stock Movement.
- Payment Audit Follow-up is created only when every line is fully received as `รับเข้าสต๊อกแล้ว`.

### OQ-STOCK-003 - Supplier boundary for product purchase

Decision:

- Supplier/Store master may be shared between product and material purchase contexts.
- Product Purchase Order does not require Supplier-SKU relationships.
- Product Purchase Order SKU picker can choose any active SKU Variant.

### OQ-STOCK-004 - Product stock count and movement

Decision:

- Product Stock Count records actual physical `มีอยู่ในร้าน`, hiding `จองแล้ว` and `ขายได้` from count entry.
- Closing a Stock Count creates Stock Movement for every counted SKU, including zero-difference `ยืนยันสต๊อกถูกต้อง`.
- Stock Movement is immutable; corrections happen through a new adjustment.

## Recently Resolved Material / Stock Boundary Follow-up Questions

### OQ-MAT-002 - Material purchase/payment handoff detail

Decision:

- Material Purchase Order receipt creates Payment Audit Follow-up, not Expense Entry.
- Finance later records actual payment/expense deliberately from the Payment Audit Follow-up.
- No Draft Expense Entry, automatic Expense Entry, or Payment Voucher is created directly from Material Purchase Order receipt in the starting workflow.

### OQ-MAT-003 - Continue material boundary grilling

Decision:

- The Product / SKU / Stock / Material Boundary is currently coherent enough for the starting workflow after Q189-Q243.
- Do not continue material boundary grilling now.
- Deeper supplier payment, material reporting, or future multi-supplier behavior remains future scope until a new session explicitly reopens it.
