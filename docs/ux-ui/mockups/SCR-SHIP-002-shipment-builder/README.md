# SCR-SHIP-002 - Shipment Builder Mockup

Status: Approved

Approved image:

- `./SCR-SHIP-002-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SHIP-002-shipment-builder.md`
- `docs/ux-ui/image-prompts/IMG-SHIP-002-shipment-builder.md`
- `docs/ux-ui/design-system/app-shell.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/01-flow-map.md`

## Approved Role

This mockup is the current source of truth for the `สร้างรอบจัดส่ง` screen.

It confirms:

- This screen is for a single Order / special case Shipment creation flow.
- Admin can review and edit delivery-facing details before releasing the Shipment.
- This screen is not used for bulk shipment creation.
- Bulk creation bypasses this screen and uses default customer/order delivery data.
- The starting workflow has no persistent saved shipment draft; this screen is temporary pre-release work.
- Delivery Note and Shipping Sheet can be previewed before release and printed after Shipment release.

## Approved Content Pattern

- Page title: `สร้างรอบจัดส่ง`
- Source reference: `จากออเดอร์ ORD-...`
- Left panel: `รายการพร้อมส่ง`
- Item rows use the Order Line snapshot for image, SKU หลัก name, color / SKU ย่อย, SKU code, and quantity.
- Right panel: `ข้อมูลจัดส่ง`
- Editable/special-case actions: `แก้ไขข้อมูลจัดส่ง`, `แก้หมายเหตุ`
- COD is read-only/final-round gated here; Shipment Builder does not edit COD.
- Document preview buttons: `ดูใบส่งของ`, `ดูใบจัดส่ง`
- Footer actions: `พร้อมจัดส่ง`, `ยกเลิก`

## Key Decisions Captured By This Mockup

- `SHP-002` is a special/single review editor, not the bulk path.
- Bulk-created Shipments should not require this detailed editor screen.
- For bulk flow, the system should use the Customer/Order delivery data, using the first Order as the reference where needed for default address/recipient behavior.
- This screen can change carrier, delivery date, and delivery note before release, according to permission. It does not edit COD.

## Regeneration Rule

Future prompts for `SCR-SHIP-002` should preserve the approved single/special-case review layout and should not turn this screen into a bulk builder.
