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
