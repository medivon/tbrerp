# Order Detail Is Read-First With Scoped Editing

Order Detail is a read-first report for one confirmed Order, with section-level edits for light data and a guarded `แก้ไขรายการออเดอร์` edit mode/sub-flow for changing Order Lines. This replaces the earlier "one full Order Edit page" and header-level shipment action approach because confirmed Orders can already have stock, `JOB-O`, Shipment rounds, payment state, and history; editing must keep those downstream effects visible through Review Changes instead of letting users casually change live operational work.

## Considered Options

- Keep one large full-page Order Edit form for all post-confirmation changes.
- Let each Order Detail section edit inline, including item additions/removals.
- Make Order Detail read-first, with scoped section edits and a guarded Order Line edit mode entered from Order Detail.

## Consequences

Order Detail becomes the operational report center. Shipment creation from Order Detail starts by selecting ready lines in `จัดการรอบจัดส่ง`, and Order item changes go through `แก้ไขรายการออเดอร์` with Review Changes. `แก้ไขรายการออเดอร์` may have a full-page layout for clarity, but it is not a standalone module, Draft Order, or new Order creation screen. Existing `JOB-O` production-detail changes remain owned by Job Detail / Job Revision.

Order Detail shows the Order Recipient Detail snapshot saved on the confirmed Order. Customer master/address-book edits happen in Customer Detail/Profile and do not rewrite old Orders; Shipment Builder starts from the Order snapshot and then stores its own Shipment recipient/address snapshot.

Order status and Shipment status are deliberately separate. `รอยืนยันการจัดส่ง` is a Shipment state shown in shipment summary/follow-up, not a main Order status. Order status is calculated from active Order Lines; cancelled lines remain history and do not count toward active status, active totals, or shipment selection.

Post-confirmation Order Line Edit has no draft/autosave state. Adding ready-stock lines reserves stock when saved, removing safe ready-stock lines releases stock, quantity changes adjust the reservation difference, and adding complete custom-work lines creates `JOB-O` when saved. Blocked lines remain visible as read-only rows with reasons so users can still edit other safe lines.

If a custom-work line already has `JOB-O`, cancellation starts from the Job flow even when production has not started. Order Detail reflects the cancelled custom line and reason afterward. If a ready-stock line is already in Shipment Builder temporary work or an existing released Shipment, the line must be removed from that shipment work or the Shipment must be cancelled before Order Line Edit can change or remove it.

If price or discount changes after Payment/COD records already exist, the existing received-money records remain immutable and Review Changes blocks saving until the edited sales total is reconciled with Payment Records, COD to collect, or adjustment/refund/credit notes. Refund/credit remains a financial note/follow-up in the first scope, not a status that reopens the Order.

Whole-Order cancellation is a guarded action at the end of `จัดการออเดอร์`. It is enabled directly only when there are no sent-out lines and no active downstream Job/Shipment blockers; otherwise the action is disabled with a reason and the user must manage affected lines, Jobs, or Shipments through their own flows. Existing Payment Records do not block cancellation, but Order Detail keeps a financial follow-up note if refund/credit may be needed later.
