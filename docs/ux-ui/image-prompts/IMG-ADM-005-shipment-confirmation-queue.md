# IMG-ADM-005 - Shipment Confirmation Queue

Related screen spec:

- `docs/ux-ui/screens/SCR-ADM-005-shipment-confirmation-queue.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ADM-005-shipment-confirmation-queue/SCR-ADM-005-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/mockups/SCR-SHIP-005-delivery-note-preview/SCR-SHIP-005-approved.png`
- `docs/ux-ui/mockups/SCR-SHIP-006-shipping-sheet-preview/SCR-SHIP-006-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “ยืนยันการจัดส่ง”. This is an admin queue for shipment rounds that Delivery Team has marked “ส่งออกแล้ว” and admin must review before closing the shipment round.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “รอบจัดส่ง” as active
- Top bar with page title, date, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin reviews tracking/evidence after delivery team marks a shipment round “ส่งออกแล้ว”. Admin can add missing tracking or evidence, review transport receipt photos/package photos, then confirm and close the shipment round. This does not require payment audit; Financial Follow-up remains separate.

Header:
- Page title: ยืนยันการจัดส่ง
- Subtitle: ตรวจเลขพัสดุและหลักฐานขนส่งก่อนปิดรอบจัดส่ง

Summary strip:
- ทั้งหมด 4
- รอเลขพัสดุ 2
- หลักฐานครบ 2
- หลักฐานไม่ครบ 1
- COD 1

Search and filters:
- Search placeholder: ค้นหา เลขรอบจัดส่ง / Order ID / ผู้รับ / เบอร์โทร / Tracking
- Filter button: ตัวกรอง
- Filter chips: ทั้งหมด, รอเลขพัสดุ, หลักฐานครบ, หลักฐานไม่ครบ, COD

Main content:
Create a dense shipment-round table/list. Each row should show:
- Shipment ID
- Related Order ID
- Recipient and phone
- Carrier
- Sent-out time
- Tracking status or Tracking number
- Evidence status chip
- COD/Payment signal chip where relevant
- Shipment owner / creator for traceability
- Current state
- Action button: ตรวจหลักฐาน

Use realistic example rows:
1. SHIP-2568-0061, ORD-240520-014, ผู้รับ คุณณัฐพล, ไปรษณีย์ไทย EMS, ส่งออกแล้ว 22 พ.ค. 67 15:40, Tracking TH123456789, chip หลักฐานครบ, COD, action ตรวจหลักฐาน
2. SHIP-2568-0062, ORD-240518-009, ผู้รับ คุณพิมพ์ชนก, ไปรษณีย์ไทย EMS, ส่งออกแล้ว 22 พ.ค. 67 14:10, chip รอเลขพัสดุ, action เพิ่มเลขพัสดุ
3. SHIP-2568-0063, ORD-240515-011, ผู้รับ บริษัท เอ.ที.ดีไซน์, Porlor Express, chip หลักฐานไม่ครบ, action ตรวจหลักฐาน

Right detail drawer:
Show selected shipment review with:
- Shipment ID
- Order ID
- Recipient, phone, address snapshot
- Carrier
- Item summary with thumbnail
- Tracking field
- Evidence thumbnails: รูปใบขนส่ง, รูปพัสดุขึ้นรถ
- Delivery note
- COD/Payment follow-up signal if relevant
- Buttons: ยืนยันและปิดรอบจัดส่ง, เพิ่มเลขพัสดุ, เพิ่มหลักฐานขนส่ง, เปิดออเดอร์
- Small note: “Financial Follow-up แยกจากการปิดรอบจัดส่ง”

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, COD, Payment, Revision, Tracking
- Use “รอบจัดส่ง” instead of “Shipment” in visible Thai UI
- Do not show product prices, sales price, profit, accounting totals, tax, ad spend, or private CRM notes
- Do not show Delivery Team send-out controls
- Do not show “ส่งออกแล้ว” as final completion
- Do not require payment audit before closing shipment round
- Make “ยืนยันและปิดรอบจัดส่ง” clearly separate from COD/Payment follow-up
- The screen should feel like a practical admin evidence review queue
```
