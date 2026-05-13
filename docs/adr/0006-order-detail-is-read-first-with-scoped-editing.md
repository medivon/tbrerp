# Order Detail Is Read-First With Scoped Editing

Order Detail is a read-first report for one confirmed Order, with section-level edits for light data and a guarded `แก้ไขรายการออเดอร์` flow for changing Order Lines. This replaces the earlier "one full Order Edit page" and header-level shipment action approach because confirmed Orders can already have stock, `JOB-O`, Shipment rounds, payment state, and history; editing must keep those downstream effects visible through Review Changes instead of letting users casually change live operational work.

## Considered Options

- Keep one large full-page Order Edit form for all post-confirmation changes.
- Let each Order Detail section edit inline, including item additions/removals.
- Make Order Detail read-first, with scoped section edits and a separate guarded Order Line edit mode.

## Consequences

Order Detail becomes the operational report center. Shipment creation from Order Detail starts by selecting ready lines in `จัดการรอบจัดส่ง`, and Order item changes go through `แก้ไขรายการออเดอร์` with Review Changes. Existing `JOB-O` production-detail changes remain owned by Job Detail / Job Revision.

Post-confirmation Order Line Edit has no draft/autosave state. Adding ready-stock lines reserves stock when saved, removing safe ready-stock lines releases stock, quantity changes adjust the reservation difference, and adding complete custom-work lines creates `JOB-O` when saved. Blocked lines remain visible as read-only rows with reasons so users can still edit other safe lines.

Whole-Order cancellation is a guarded action at the end of `จัดการออเดอร์`. It is enabled only when no line has been sent out and no `JOB-O` has started production; otherwise the action is disabled with a reason and the user must manage affected lines, Jobs, or Shipments through their own flows.
