# SCR-ORD-001 - Order Create/Edit Mockup

Status: Approved

Approved image:

- `./SCR-ORD-001-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`
- `docs/ux-ui/image-prompts/IMG-ORD-001-draft-order-editor.md`

## Approved Role

This mockup remains the visual anchor for the admin `สร้างออเดอร์` / Order Create/Edit editor before a real Order ID is issued. Newer workflow decisions clarify that a persistent Draft No. appears only after the user explicitly saves as `ร่างออเดอร์`.

It confirms:

- Order entry can include Customer, recipient/address, ready-stock lines, custom-work lines, Payment Term, optional Payment Record, shipment plan, and custom-work detail.
- Draft No. must not appear for unsaved new entry; when shown for a saved Draft Order, it must not look like a confirmed Order ID.
- Saved Draft data does not reserve stock, create Job, create Shipment, or enter reports.
- The right summary panel explains what is complete and what will happen after `สร้างออเดอร์`.

## Key Decisions Captured By This Mockup

- Ready-stock and custom-work lines can exist in the same draft.
- Ready-stock and custom-work lines are added through separate buttons: `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`.
- Custom-work details are captured as `รายละเอียดงานสั่งทำ` before real Order creation and create `JOB-O` immediately when confirmed.
- If an Order mixes ready-stock and custom work, the shipment plan defaults to `ส่งพร้อมกัน` with optional `จัดส่งแยกได้`.
- Payment Term is required before real Order creation; Payment Record is optional in the flow.
- No quotation, lead, tax filing, accounting ledger, product cost, profit, ad spend, or private CRM note appears.

## Regeneration Rule

Future prompts for `SCR-ORD-001` should preserve the two-column admin editor, the clear unsaved/Draft/Order distinction, the right-side readiness summary, and the embedded `รายละเอียดงานสั่งทำ` section.
