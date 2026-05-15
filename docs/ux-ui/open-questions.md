# Open Questions

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
- It does not need a separate screen/prompt/mockup unless future behavior diverges.

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

## Material / Stock Boundary Follow-up Questions

### OQ-MAT-002 - Material purchase/payment handoff detail

Open but not blocking first UX:

- Material Purchase Order receipt creates Payment Audit Follow-up, not Expense Entry.
- The exact finance screen behavior for recording the later payment/expense can be grilled in the finance/payment round, not inside the material stock boundary.

### OQ-MAT-003 - Continue material boundary grilling

Open by user choice:

- The Product / SKU / Stock / Material Boundary is currently coherent enough for the starting workflow after Q189-Q243.
- Continue only if the next session needs to stress-test deeper supplier payment, material reporting, or future multi-supplier behavior.
