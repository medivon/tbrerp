# IMG-ORD-001 - Order Create/Edit

Related screen spec:

- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ORD-001-draft-order-editor/SCR-ORD-001-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-002-active-orders-overview/SCR-ADM-002-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สร้างออเดอร์”. This screen is the admin Order Create/Edit editor before a real Order ID is issued. Do not show Draft No. for a new unsaved entry; Draft No. appears only when editing a previously saved Draft Order, and it must not look like a confirmed Order.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin enters customer, recipient/address, order lines, payment terms, shipment plan, and custom-work details before creating a real Order ID. Customer must be selected before adding Order Lines. Unsaved entry stays temporary; a Draft Order is created only when admin presses “บันทึกร่าง” or exits with “ออกและบันทึก”. Draft data does not reserve stock, create Job, create Shipment, or enter reports. When required information is complete, admin can press “สร้างออเดอร์” to go to Review; this button does not issue a real Order ID yet.
Saving a Draft Order also requires a selected/created customer first.

Header:
- Page title: สร้างออเดอร์
- Subtext: กรอกข้อมูลให้ครบก่อนออกเลขออเดอร์จริง
- Status chip: ยังไม่ได้บันทึกร่าง
- Save state: มีการแก้ไขที่ยังไม่บันทึก
- Primary button: สร้างออเดอร์ (ไปหน้า Review)
- Secondary button: บันทึกร่าง

Main layout:
Use a two-column editor:
- Large left/main column with editable sections
- Right sticky summary panel showing completeness and warnings

Left editor sections:
1. ลูกค้า
   - Selected customer: คุณมาลี
   - Phone: 081-234-5678
   - CRM mini note tag only: ลูกค้าเก่า
   - Button: เปลี่ยนลูกค้า

2. ที่อยู่จัดส่ง
   - Recipient: คุณภพ
   - Phone: 082-345-6789
   - Address: 99/12 ถ.เจริญกรุง แขวงบางรัก กรุงเทพฯ 10500
   - Button: เลือกที่อยู่จัดส่ง
   - Small link/button: เพิ่มที่อยู่ใหม่

3. รายการในออเดอร์
   Show two order-line cards or table rows with thumbnails:
   - Line 1: สินค้าพร้อมส่ง, ชุดเก้าอี้ไม้สักพร้อมส่ง, จำนวน 4 ชิ้น, ราคา 18,000 บาท, stock chip: พร้อมส่ง
   - Line 2: งานสั่งทำ, ตู้โชว์ไม้สักแกะลาย, จำนวน 1 ชิ้น, ราคา 38,000 บาท, chip: รายละเอียดงานสั่งทำ
   Buttons: เพิ่มสินค้าพร้อมส่ง, เพิ่มงานสั่งทำ

4. แผนจัดส่ง
   - Show when the Order mixes ready-stock and custom work
   - Show a compact read-only/default intent chip: ส่งพร้อมกัน
   - Do not show a separate split-shipment toggle here; split shipment is handled later by selecting ready lines when creating Shipment rounds

5. เงื่อนไขการชำระเงิน
   - Payment Term: มัดจำ 50% ก่อนเริ่มงาน
   - Payment Record optional: รับมัดจำแล้ว 19,000 บาท
   - Button: เพิ่มรายการรับเงิน

6. รายละเอียดงานสั่งทำ
   Show custom-work detail panel for the custom line:
   - Preview chip: จะสร้าง JOB-O / งานลูกค้า หลังยืนยันออเดอร์
   - อ้างอิงสินค้า: ตู้โชว์ไม้สักรุ่นหลัก
   - สีและการตกแต่ง: สีโอ๊คเข้ม / ลายรักสมุกดอกพิกุล
   - ขนาดโดยรวม: กว้าง 120 ลึก 45 สูง 180 ซม.
   - รูปอ้างอิง / รูปเพิ่มเติม thumbnails
   - Delivery date field: กำหนดส่ง 26 พ.ค. 67

Right sticky summary panel:
Title: สรุปก่อนสร้างออเดอร์
Show:
- Customer completeness: ครบ
- Address completeness: ครบ
- Order lines: 2 รายการ
- Ready-stock lines: 1
- Custom lines: 1
- Shipment intent: ส่งพร้อมกัน
- Payment Term: ครบ
- Payment Record: มีรายการรับเงิน
- Warning chip example: สต๊อกไม่พอ 1 รายการ ต้องตรวจสอบใน Review
- Total display: ยอดรวม 56,000 บาท
- Note: ยังไม่จองสต๊อก / ยังไม่สร้าง JOB-O / ยังไม่สร้างรอบจัดส่ง
- Primary button: สร้างออเดอร์ (ไปหน้า Review)
- Secondary button: บันทึกร่าง

Unsaved-exit modal state:
- Show only if useful as a small overlay or side note
- Message: หากออกจากหน้านี้ ข้อมูลที่ยังไม่บันทึกอาจสูญหาย
- Actions: ออกและบันทึก, ออกทันที
- “ออกและบันทึก” creates/updates Draft Order; “ออกทันที” discards unsaved changes and does not create autosave draft

Visual rules:
- Thai UI labels are primary
- Keep these English terms unchanged: Job, JOB-O, JOB-P, COD, Payment, Revision
- Do not show Draft No. for unsaved new entry; if showing a saved draft state, make Draft No. visually different from Order ID
- Do not show quotation, lead, marketing, tax filing, accounting ledger, product cost, profit, ad spend, or private CRM notes
- Do not show confirmed Order ID yet
- Do not show downstream Job or Shipment as already created
- Make it obvious that stock reservation and JOB-O creation happen only after confirmation on Review
- Do not imply Payment Record is required to create JOB-O; Payment Record is optional financial context
- Do not imply persistent autosave after the user leaves without saving
- Do not label the custom detail area as “ร่าง Job”; use “รายละเอียดงานสั่งทำ”
- Keep the screen practical for heavy admin data entry
```
