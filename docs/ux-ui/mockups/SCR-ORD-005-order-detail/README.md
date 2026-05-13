# SCR-ORD-005 - Order Detail Mockup

Status: Approved visual anchor; workflow details superseded by later Q&A

Approved image:

- `./SCR-ORD-005-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`
- `docs/ux-ui/image-prompts/IMG-ORD-005-order-detail.md`

## Approved Role

This mockup remains the visual anchor for confirmed `รายละเอียดออเดอร์`: THAIBORAN app shell, operational density, and card/row-based Order detail.

Later Order Detail Q&A supersedes parts of the original interaction model. The current workflow source of truth is:

- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`
- `docs/ux-ui/image-prompts/IMG-ORD-005-order-detail.md`
- `docs/decision-log.md`

It confirms:

- `รายละเอียดออเดอร์` is shown after a real Order ID exists.
- The `รายการในออเดอร์` section uses clear item rows/cards, not a dense accounting table.
- Each Order Line shows its own item image, type, status, related Job/shipment context, and next action where relevant.
- Production, shipment, and financial follow-up are visible but remain separate concepts.
- Header-level actions must not crowd the screen; the latest decision uses `จัดการออเดอร์` plus section-level actions.
- Shipment creation now belongs in the `จัดการรอบจัดส่ง` section, where admin selects ready lines and opens Shipment Builder from selected items.

## Key Decisions Captured By This Mockup

- Order Completion is operational and based on required shipment rounds being closed.
- COD/Payment follow-up remains separate from operational completion.
- `งานสั่งทำ` and `สินค้าพร้อมส่ง` can sit in the same Order and should be grouped clearly in `รายการในออเดอร์`.
- Orders containing custom work should show a simple `มีงานสั่งทำ` label in list/detail contexts.
- Mixed ready-stock/custom Orders can support combined or split shipment through selected ready lines in the Order Detail shipment-management section.
- No product cost, profit, tax filing detail, accounting ledger, ad spend, or private CRM note appears.
- The screen is not an invoice, quotation, or draft screen.

## Regeneration Rule

Future prompts for `SCR-ORD-005` should preserve the calm visual baseline but follow the latest read-first report layout: summary, Order items, shipment management, related Shipment rounds, payment summary, and short history.

Do not restore the old tabbed layout, `งานที่เกี่ยวข้อง` duplicate section, or header `สร้างรอบจัดส่ง` button unless a future decision explicitly reopens it.
