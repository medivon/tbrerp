# SCR-ORD-006 - All Orders List Mockup

Status: Approved visual anchor

Approved image:

- `./SCR-ORD-006-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ORD-006-all-orders-list.md`
- `docs/ux-ui/image-prompts/IMG-ORD-006-all-orders-list.md`
- `docs/ux-ui/design-system/table-patterns.md`

## Approved Role

This mockup is the visual anchor for the `ออเดอร์ทั้งหมด` table: dense desktop ERP layout, searchable Order rows, compact popovers, and explicit `เปิดออเดอร์` row action.

Latest workflow decisions require:

- Show real Orders only; Draft Orders stay in `ร่างออเดอร์`.
- Separate `สถานะออเดอร์` from `สถานะการจัดส่ง`.
- Treat `รอยืนยันการจัดส่ง` as a Shipment/tracking state, not an Order status.
- Do not include cancelled lines in the product popover.
- Use consistent table pagination with page size, `ก่อนหน้า`, page numbers, and `ถัดไป`.

## Regeneration Rule

Future prompts for `SCR-ORD-006` should preserve the table-first layout, product and shipment popovers, explicit row action, and status separation.
