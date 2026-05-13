# SCR-ADM-005 - Shipment Confirmation Queue Mockup

Status: Approved

Approved image:

- `./SCR-ADM-005-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ADM-005-shipment-confirmation-queue.md`
- `docs/ux-ui/image-prompts/IMG-ADM-005-shipment-confirmation-queue.md`
- `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`
- `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`

## Approved Role

This mockup is the current source of truth for the admin `ยืนยันการจัดส่ง` queue.

It confirms:

- `ยืนยันการจัดส่ง` is a desktop/tablet admin evidence-review queue.
- The queue starts after Delivery Team marks a shipment round `ส่งออกแล้ว`.
- Admin reviews tracking, transport evidence, item summary, recipient/address snapshot, and notes before closing the shipment round.
- `Financial Follow-up` is visible only as a separate signal and does not block operational close.

## Key Decisions Captured By This Mockup

- `ส่งออกแล้ว` is not final completion.
- `ยืนยันและปิดรอบจัดส่ง` is the operational close action.
- The screen works at shipment-round level, not loose item level.
- No product price, sales price, accounting totals, tax, ad spend, profit, or private CRM note appears.
- Delivery Team send-out controls do not appear on this admin screen.

## Regeneration Rule

Future prompts for `SCR-ADM-005` should preserve the admin queue layout, evidence-review drawer, and the clear separation between operational shipment close and `Financial Follow-up`.
