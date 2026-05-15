# SCR-SHIP-005 - Delivery Note Preview Mockup

Status: Approved

Approved image:

- `./SCR-SHIP-005-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`
- `docs/ux-ui/image-prompts/IMG-SHIP-005-delivery-note-preview.md`
- `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`
- `docs/ux-ui/image-prompts/IMG-SHIP-006-shipping-sheet-preview.md`

## Approved Role

This mockup is the current source of truth for `ใบส่งของ`.

It confirms:

- `ใบส่งของ` is the item/product-focused print preview.
- Product image, item name, quantity, and note are the dominant content.
- Product image, item name, color / SKU ย่อย, and SKU code come from the Order Line snapshot so old documents do not change when Product images are edited later.
- It does not show recipient/address as the dominant content.
- Print controls stay outside the A4 printable area.
- The screen includes actions to print Delivery Note, print both documents, view Shipping Sheet, and return to Shipment.

## Key Decisions Captured By This Mockup

- `ใบส่งของ` and `ใบจัดส่ง` are separate documents.
- `ใบส่งของ` is not the recipient/address sheet.
- No product price, sales price, accounting data, tax, ad spend, profit, payment amount, or private CRM note appears.

## Regeneration Rule

Future prompts for `SCR-SHIP-005` should preserve the A4 print preview layout and the item/product-dominant hierarchy.
