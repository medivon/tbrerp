# IMG-SHIP-005 - Delivery Note Preview

Related screen spec:

- `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`

Approved mockup:

- `docs/ux-ui/mockups/SCR-SHIP-005-delivery-note-preview/SCR-SHIP-005-approved.png`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SHIP-002-shipment-builder/SCR-SHIP-002-approved.png`
- `docs/ux-ui/mockups/SCR-SHIP-006-shipping-sheet-preview/SCR-SHIP-006-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop ERP print preview screen for THAIBORAN called “ใบส่งของ”. This is the item-focused document generated from a Shipment.

Use the THAIBORAN admin app shell consistently with the previous shipment screens. Match the approved `ใบจัดส่ง` print-preview layout style, but make this document item-focused instead of address-focused. The main content should look like an A4 print preview inside the admin app.

Screen purpose:
Preview and print the Delivery Note (ใบส่งของ). This document focuses on item identification, item image, color/SKU identity, quantity, and item notes. It must not show product price, sales price, profit, payment amount, accounting data, tax, or private CRM notes.

Header:
- Page title: ใบส่งของ
- Reference: รอบจัดส่ง SHIP-2568-0061
- Reference: ออเดอร์ ORD-240520-014
- Status chip: พร้อมพิมพ์

Main preview:
Show a centered A4 page. Inside the A4 page include:
- Document title: ใบส่งของ
- THAIBORAN brand/header
- Shipment ID
- Order ID
- Print date
- Item table

Item table columns:
- รูปสินค้า
- รายการสินค้า
- สี / SKU
- จำนวน
- หมายเหตุ

Example item:
- Image thumbnail from the Order Line snapshot for โต๊ะกลางลงรักสมุก
- รายการสินค้า: โต๊ะกลางลงรักสมุก
- สี / SKU: สีโอ๊คเข้ม / TBR-TBL-123-OAK
- จำนวน: 1 ชิ้น
- หมายเหตุ: ชิ้นงานระวังกระแทก

Side actions:
- พิมพ์ใบส่งของ
- พิมพ์ใบส่งของและใบจัดส่ง
- ดูใบจัดส่ง
- กลับไปรอบจัดส่ง

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, COD, Payment, Revision
- Do not show any price or accounting fields
- Do not make recipient/address the dominant content; that belongs to ใบจัดส่ง
- Keep product image, item name, color/SKU, quantity, and notes as the dominant content
- Use the Order Line snapshot for image, item name, color, and SKU code; do not refresh from live Product Model images
- Keep the printable page visually distinct from the app controls
- Use clean print typography and enough whitespace for physical document use
```
