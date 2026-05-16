# IMG-DEL-001 - Delivery Dashboard

## Design Status

Ready. This is a tablet/mobile worker screen using a simple worker shell, not the desktop admin shell.

Related screen spec:

- `docs/ux-ui/screens/SCR-DEL-001-delivery-dashboard.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SHIP-005-delivery-note-preview/SCR-SHIP-005-approved.png`
- `docs/ux-ui/mockups/SCR-SHIP-006-shipping-sheet-preview/SCR-SHIP-006-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity tablet/mobile delivery dashboard for THAIBORAN called “ฝ่ายจัดส่ง”.

This is a delivery team screen, not a desktop admin table. Use the approved THAIBORAN visual language from the shipment documents, but do not use the full desktop sidebar. Use a lightweight mobile/tablet header, large touch targets, clean white cards, compact chips, image-led item recognition, and calm ERP styling.

Screen purpose:
Show released shipment rounds that admin has already created and released. Delivery Team can view shipment details, optionally add รูปหลักฐานจัดส่ง on an individual shipment, add a short delivery note, and mark the shipment “ส่งออกแล้ว”. Delivery Team cannot enter Tracking. This does not close the Shipment and does not complete the Order. It sends the Shipment to admin “ยืนยันการจัดส่ง”.

Header:
- Title: ฝ่ายจัดส่ง
- Date: 22 พฤษภาคม 2567
- Summary count: ต้องจัดส่งวันนี้ 5
- Small user/role area for delivery staff

Tabs:
- รายการต้องจัดส่งวันนี้ active
- รายการรอวันจัดส่ง
- ส่งออกแล้ววันนี้

Today tab content:
Show shipment cards, not a dense admin table. Each card should be practical for packing/delivery work. Include checkbox selection for bulk send-out and a bottom action bar when items are selected.

Each shipment card should show:
- เลขรอบจัดส่ง, such as SHIP-2568-0061
- Recipient name
- Phone
- Address summary
- Carrier
- Delivery date or “วันนี้”
- Item thumbnail
- Short item summary
- Optional photo status chip if present
- Delivery note preview
- Row action button: ส่งออกแล้ว
- Button: เปิดรอบจัดส่ง

Example cards:
1. SHIP-2568-0061, ผู้รับ คุณณัฐพล, 081-234-5678, address summary บางบัวทอง นนทบุรี, ขนส่ง ไปรษณีย์ไทย EMS, item โต๊ะกลางลงรักสมุก 1 ชิ้น, button ส่งออกแล้ว, secondary button เปิดรอบจัดส่ง
2. SHIP-2568-0062, ผู้รับ คุณพิมพ์ชนก, 082-345-6789, address summary เมืองเชียงใหม่, ขนส่ง ไปรษณีย์ไทย EMS, item ชุดเก้าอี้พร้อมส่ง 4 ชิ้น, selected checkbox, button ส่งออกแล้ว
3. SHIP-2568-0063, ผู้รับ บริษัท เอ.ที.ดีไซน์, address summary บางรัก กรุงเทพฯ, ขนส่ง Porlor Express, item กรอบบัวไม้ปิดทอง 2 ชิ้น, chip มีรูปหลักฐาน, button ส่งออกแล้ว

Bulk state:
- When cards are selected in รายการต้องจัดส่งวันนี้, show bottom action bar: เลือกแล้ว 2 รายการ and primary button บันทึกว่าส่งออกแล้ว
- Bulk confirmation modal: ยืนยันบันทึกการส่งออกสินค้าแล้ว
- Bulk is only for today/no-date shipments, not รายการรอวันจัดส่ง

Expanded/detail area or selected card detail:
Show read-only shipment details:
- Recipient
- Phone
- Full address
- Carrier
- Item list with images and quantity
- Delivery note
- Optional photo upload area with labels:
  - รูปหลักฐานจัดส่ง
  - หมายเหตุจัดส่ง
- Primary button: ส่งออกแล้ว

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, COD, Payment, Revision
- Do not show admin creation controls
- Do not show “รอสร้างรอบจัดส่ง” Orders
- Do not show product prices, sales price, profit, accounting totals, tax, ad spend, or private CRM notes
- Do not show COD amount in Delivery Team UI; COD amount belongs on the printed ใบจัดส่ง when relevant
- Do not show Tracking input
- Do not let delivery team edit item list, address, carrier, Tracking, COD, or close Shipment
- Do not show “ปิดรอบจัดส่ง”
- Do not disable “ส่งออกแล้ว” for missing Tracking or missing รูปหลักฐานจัดส่ง
- Make clear that “ส่งออกแล้ว” sends the Shipment to admin “ยืนยันการจัดส่ง”, not final completion
- The screen should feel field-ready, simple, and touch-friendly
```
