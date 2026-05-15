# IMG-SHIP-006 - Shipping Sheet Preview

Related screen spec:

- `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`

Approved mockup:

- `docs/ux-ui/mockups/SCR-SHIP-006-shipping-sheet-preview/SCR-SHIP-006-approved.png`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SHIP-002-shipment-builder/SCR-SHIP-002-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop ERP print preview screen for THAIBORAN called “ใบจัดส่ง”. This is the recipient/address-focused document generated from a Shipment.

Use the THAIBORAN admin app shell consistently with the previous shipment screens. The main content should look like an A4 print preview inside the admin app.

Screen purpose:
Preview and print the Shipping Sheet (ใบจัดส่ง). This document focuses on recipient name, phone, full address, carrier, delivery date, shipment references, COD amount if relevant, and short item summary. This is the document that helps packing/delivery staff identify where the shipment goes.

Header:
- Page title: ใบจัดส่ง
- Reference: รอบจัดส่ง SHIP-2568-0061
- Reference: ออเดอร์ ORD-240520-014
- Status chip: พร้อมพิมพ์

Main preview:
Show a centered A4 page. Inside the A4 page include:
- Document title: ใบจัดส่ง
- THAIBORAN brand/header
- Shipment ID: SHIP-2568-0061
- Order ID: ORD-240520-014
- Recipient block with large readable typography
- Carrier and delivery date block
- Short item summary
- Delivery note

Recipient/address content:
- ผู้รับสินค้า: คุณณัฐพล
- เบอร์โทร: 081-234-5678
- ที่อยู่จัดส่ง: 88/14 ถ.ราชพฤกษ์ ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110
- ขนส่ง: ไปรษณีย์ไทย EMS
- วันจัดส่ง: 24 พ.ค. 67
- COD: 12,000 บาท
- สรุปรายการ: โต๊ะกลางลงรักสมุก 1 ชิ้น
- หมายเหตุจัดส่ง: โทรก่อนเข้าจัดส่ง / ชิ้นงานระวังกระแทก

Side actions:
- พิมพ์ใบจัดส่ง
- พิมพ์ใบส่งของและใบจัดส่ง
- ดูใบส่งของ
- กลับไปรอบจัดส่ง

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, COD, Payment, Revision
- Use “ใบจัดส่ง” for the address sheet and do not confuse it with “ใบส่งของ”
- Do not show product prices, sales price, profit, accounting totals, tax, ad spend, or private CRM notes
- Keep item details short; full item list belongs to ใบส่งของ
- Make recipient, phone, and address the dominant content
- Keep print controls outside the A4 printable area
```
