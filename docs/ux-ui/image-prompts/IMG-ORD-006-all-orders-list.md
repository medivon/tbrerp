# IMG-ORD-006 - All Orders List

Related screen spec:

- `docs/ux-ui/screens/SCR-ORD-006-all-orders-list.md`

Related pattern:

- `docs/ux-ui/design-system/table-patterns.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “ออเดอร์ทั้งหมด”.

Use the approved THAIBORAN admin app shell:
- Fixed left sidebar with THAIBORAN brand at top
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active
- Top bar with page title, current date, user avatar, user name, role label, and account menu
- Quiet operational ERP style, dense but readable, no marketing hero, no decorative illustration

Screen purpose:
Show all real Orders across every main Order status. Do not show Draft Orders. Draft Orders belong only under the “ร่างออเดอร์” tab. Show Order status separately from Shipment/tracking status.

Header:
- Page title: ออเดอร์ทั้งหมด
- Primary button at top right: สร้างออเดอร์ใหม่
- Order workspace tabs: ออเดอร์ที่ต้องติดตาม, ออเดอร์ทั้งหมด, ร่างออเดอร์, ปิดแล้ว / ยกเลิก
- Highlight the “ออเดอร์ทั้งหมด” tab

Filter/search bar:
- Search input placeholder: ค้นหาเลขออเดอร์ / ลูกค้า / เบอร์โทร / ผู้รับ / ที่อยู่ / Job ID / สินค้า
- Order status filter chips: ทั้งหมด, กำลังดำเนินการ, กำลังผลิต, พร้อมสร้างรอบจัดส่ง, ส่งบางส่วน, จัดส่งครบแล้ว, ยกเลิก
- Optional shipment filter chip: รอยืนยันการจัดส่ง, shown as shipment/tracking filter, not Order status
- Date filter for วันที่สร้าง with presets visible or in a dropdown: วันนี้, 7 วันล่าสุด, เดือนนี้, เดือนที่แล้ว, กำหนดช่วงเอง

Main table columns:
- เลขออเดอร์
- ชื่อลูกค้า
- เบอร์โทร
- รายการสินค้า
- สถานะออเดอร์
- สถานะการจัดส่ง
- ยอดรวม
- custom-work icon column
- วันที่สร้าง
- action

Do not show ผู้สร้างออเดอร์ or ผู้รับผิดชอบ as main columns.

Rows should be compact, table-first, and office-admin friendly:
1. ORD-240522-018, คุณศิริพร, 081-234-5678, ตู้โชว์ไม้สักแกะลาย + 2 รายการ, order status “ส่งบางส่วน”, shipment “Kerry : TH12345”, net total 24,500, tool/hammer icon with tooltip มีงานสั่งทำ, วันที่สร้าง 22 พ.ค. 67, action เปิดออเดอร์
2. ORD-240521-011, ร้านบ้านศิลป์, 089-555-1122, ชุดเก้าอี้พร้อมส่ง + 1 รายการ, order status “พร้อมสร้างรอบจัดส่ง”, shipment “ยังไม่ได้จัดส่ง” in red text, net total 12,900, no custom icon, วันที่สร้าง 21 พ.ค. 67, action เปิดออเดอร์
3. ORD-240520-009, คุณพิมพ์ชนก, 086-777-9012, ตู้พระสั่งทำ + 1 รายการ, order status “กำลังผลิต”, shipment “ยังไม่ได้จัดส่ง” in blue text, net total 38,000, tool/hammer icon, วันที่สร้าง 20 พ.ค. 67, action เปิดออเดอร์
4. ORD-240518-006, คุณอรพิน, 082-111-4455, โต๊ะกลางลงรักสมุก + 3 รายการ, order status “ส่งบางส่วน”, shipment “จัดส่งยังไม่ครบ”, net total 45,800, tool/hammer icon, วันที่สร้าง 18 พ.ค. 67, action เปิดออเดอร์
5. ORD-240512-002, คุณมาลี, 080-333-2244, ตู้ไม้สัก 1 รายการ, order status “จัดส่งครบแล้ว”, shipment “ส่งแล้ว + 2 รอบ”, net total 18,400, no custom icon, วันที่สร้าง 12 พ.ค. 67, completed but not faded, action เปิดออเดอร์
6. ORD-240510-001, คุณอนันต์, 087-999-2233, เก้าอี้ไม้สัก 1 รายการ, order status “ยกเลิก”, shipment blank or cancelled state, net total 7,500, no custom icon, วันที่สร้าง 10 พ.ค. 67, row faded because ยกเลิก, action เปิดออเดอร์

Show one open product popover anchored to a รายการสินค้า cell. The popover should be narrow but readable, with wrapped text:
สินค้า
ชุดเก้าอี้ไม้สัก x2
หมอนรองนั่งสีครีม x2

งานสั่งทำ
ตู้พระสั่งทำ ขนาด 120x60 ซม. สีโอ๊ค กำหนดส่งวันที่ 28 พ.ค. 67

Optionally show one shipment popover anchored to a สถานะการจัดส่ง cell:
- รอบจัดส่ง SHIP-240520-004
- Kerry : TH12345
- ส่งแล้ว (มีรูปหลักฐานจัดส่ง)
- สถานะ: จัดส่งยังไม่ครบ
- If a Shipment round is sent out but admin confirmation/evidence is pending, show รอยืนยันการจัดส่ง in the shipment column/popover, not as Order status

Bottom pagination:
- Page-size selector: 25 / 50 / 100, with 25 selected
- Controls: ก่อนหน้า, page numbers, ถัดไป
- No infinite scroll

Visual rules:
- Thai UI labels are primary
- Keep these English terms unchanged: Job, JOB-O, JOB-P, COD, Payment, Revision, Tracking
- The row itself should not look like the main click target; action is the explicit เปิดออเดอร์ button/link.
- Use a tool/hammer icon to indicate custom work, not the word CUSTOM.
- If there is no custom work, leave the custom icon area blank.
- Use short Thai dates like 22 พ.ค. 67.
- Use red text for ยังไม่ได้จัดส่ง when no Shipment round exists.
- Use blue text for ยังไม่ได้จัดส่ง when a Shipment round exists but carrier/tracking is missing.
- Use ส่งแล้ว for a closed Shipment round that has รูปหลักฐานจัดส่ง but no Tracking.
- Do not include cancelled lines in the product popover; cancelled lines are reviewed in Order Detail.
- Use faded row styling only for ยกเลิก Orders.
- Do not include export button in this mockup.
- Do not show accounting/profit/tax analytics.
- Do not show private CRM notes.
```
