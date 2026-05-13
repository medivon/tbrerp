# IMG-ORD-004 - Order Review / Create Order

Related screen spec:

- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ORD-004-order-review-create-order/SCR-ORD-004-approved.png`
- `docs/ux-ui/mockups/SCR-ORD-001-draft-order-editor/SCR-ORD-001-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “ตรวจสอบก่อนสร้างออเดอร์”. This is the final admin review before issuing a real Order ID. It is not an Order Detail page yet.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin reviews current Order Create/Edit data before confirming. The screen must show clearly that pressing “ยืนยันสร้างออเดอร์” will issue a real Order ID, reserve ready-stock lines, create JOB-O for complete custom lines, hide any saved Draft Order from active draft lists by status, and not create shipment rounds yet.

Header:
- Page title: ตรวจสอบก่อนสร้างออเดอร์
- Subtitle: ตรวจข้อมูลครั้งสุดท้ายก่อนออกเลขออเดอร์จริง
- Status chip: พร้อมสร้างออเดอร์
- Small warning note: ยังไม่มี Order ID จนกว่าจะกดยืนยัน

Main layout:
Use a two-column review layout:
- Left/main column: review cards
- Right sticky confirmation panel: downstream result and final action

Left review cards:
1. ลูกค้าและผู้รับ
   - ลูกค้า: คุณมาลี
   - เบอร์ลูกค้า: 081-234-5678
   - ผู้รับสินค้า: คุณภพ
   - เบอร์ผู้รับ: 082-345-6789
   - ที่อยู่จัดส่ง: 99/12 ถ.เจริญกรุง แขวงบางรัก กรุงเทพฯ 10500
   - Button/link: กลับไปแก้ไข

2. สรุปสินค้าพร้อมส่ง
   Show detailed row/cards with thumbnails:
   - สินค้าพร้อมส่ง: ชุดเก้าอี้ไม้สักพร้อมส่ง, จำนวน 4 ชิ้น, ราคา 18,000 บาท, result chip: จะจองสต๊อก
   - Total section subtotal if useful

3. สรุปงานสั่งทำ
   Show only if custom work exists:
   - งานสั่งทำ: ตู้โชว์ไม้สักแกะลาย, จำนวน 1 ชิ้น, ราคา 38,000 บาท, result chip: จะสร้าง JOB-O
   - Preview chip: จะสร้าง JOB-O / งานลูกค้า

4. แผนจัดส่ง
   - ส่งพร้อมกัน selected
   - If shown, note that จัดส่งแยกได้ can be managed later only through the appropriate Order management or shipment-selection flow when allowed

5. เงื่อนไขการชำระเงิน
   - Payment Term: มัดจำ 50% ก่อนเริ่มงาน
   - Payment Record: รับมัดจำแล้ว 19,000 บาท
   - Remaining note: ยอดคงเหลือ 37,000 บาท

6. รายละเอียดงานสั่งทำที่จะสร้าง JOB-O
   - อ้างอิงสินค้า: ตู้โชว์ไม้สักรุ่นหลัก
   - สีและการตกแต่ง: สีโอ๊คเข้ม / ลายรักสมุกดอกพิกุล
   - ขนาด: กว้าง 120 ลึก 45 สูง 180 ซม.
   - กำหนดส่ง: 26 พ.ค. 67
   - thumbnails for reference images

Right sticky confirmation panel:
Title: ผลหลังยืนยันสร้างออเดอร์
Checklist:
- จะออก Order ID ใหม่
- จะจองสต๊อกสินค้าพร้อมส่ง 1 รายการ
- จะสร้าง JOB-O สำหรับงานสั่งทำ 1 งาน
- ถ้ามีร่างออเดอร์ที่บันทึกไว้ จะซ่อนจากรายการร่างที่ใช้งานอยู่
- ยังไม่สร้างรอบจัดส่ง
- ยังไม่ปิดงานการเงิน
Buttons:
- Primary blue: ยืนยันสร้างออเดอร์
- Secondary: กลับ
- Secondary: บันทึกร่าง

Inline warning example:
- If custom work has no Payment Record, show a warning/override area inside the page before the final action. Do not use a modal for the final confirmation.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Draft, Order ID, Job, JOB-O, COD, Payment
- Do not show a confirmed Order ID yet
- Do not show Draft No.
- Do not show shipment round as created
- Do not show product cost, profit, tax filing, accounting ledger, ad spend, or private CRM notes
- Do not make this look like a quotation or invoice
- Make “จะสร้าง JOB-O” and “จะจองสต๊อก” clear downstream result chips
- Do not add a second confirmation modal; this Review screen is the final confirmation step
- The screen should feel like a final operational review, compact and serious
```
