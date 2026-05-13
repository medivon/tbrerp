# SCR-SHIP-006 - Shipping Sheet Preview Mockup

Status: Approved

Approved image:

- `./SCR-SHIP-006-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`
- `docs/ux-ui/image-prompts/IMG-SHIP-006-shipping-sheet-preview.md`
- `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`
- `docs/ux-ui/image-prompts/IMG-SHIP-005-delivery-note-preview.md`

## Approved Role

This mockup is the current source of truth for `ใบจัดส่ง`.

It confirms:

- `ใบจัดส่ง` is the address/recipient-focused print preview.
- Recipient name, phone, and address are the dominant content.
- Item information is short summary only.
- Print controls stay outside the A4 printable area.
- The screen includes actions to print Shipping Sheet, print both documents, view Delivery Note, and return to Shipment.

## Key Decisions Captured By This Mockup

- `ใบจัดส่ง` and `ใบส่งของ` are separate documents.
- `ใบจัดส่ง` is not the full item list.
- `ใบจัดส่ง` may show COD signal and delivery note where relevant.
- No product price, sales price, accounting data, tax, ad spend, profit, or private CRM note appears.

## Regeneration Rule

Future prompts for `SCR-SHIP-006` should preserve the A4 print preview layout and the address-dominant hierarchy.
