# IMG-ORD-005 - Order Detail

Related screen spec:

- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ORD-005-order-detail/SCR-ORD-005-approved.png`
- `docs/ux-ui/mockups/SCR-ORD-004-order-review-create-order/SCR-ORD-004-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-002-active-orders-overview/SCR-ADM-002-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายละเอียดออเดอร์”. This is a confirmed Order Detail screen after a real Order ID exists. It is not a draft, quotation, invoice, payment workflow, or production dashboard.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active
- Top bar with date, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin uses this screen as a read-first report for one Order. The page should show the full Order story: customer/recipient, every item, what is ready to ship, what has shipped, which custom work has JOB-O, shipment rounds, payment summary, and short history. Order Completion is based on required shipment rounds being closed. COD/Payment follow-up remains separate.

Header:
- Page title: รายละเอียดออเดอร์
- Order ID: ORD-240520-014
- Main header chips only: กำลังดำเนินการ and จัดส่งยังไม่ครบ
- Optional small source chip: มีงานสั่งทำ
- Customer: ร้านบ้านศิลป์
- Main recipient: คุณณัฐพล
- Primary header action/menu: จัดการออเดอร์
- Do not show a header primary button “สร้างรอบจัดส่ง”
- Do not show financial follow-up as a main header chip

Open the “จัดการออเดอร์” menu or show it as a visible dropdown panel with these actions:
- แก้ข้อมูลผู้รับในออเดอร์นี้
- แก้ไขรายการสินค้า
- แก้ไขงานสั่งทำ
- จัดการรอบจัดส่ง
- เปิดติดตามการเงิน
- ยกเลิกออเดอร์ as the last warning action; if the example state blocks whole-order cancellation, render it disabled with tooltip/reason “ยกเลิกไม่ได้ เพราะมีรายการที่ส่งออกแล้วหรือ JOB-O เริ่มผลิตแล้ว”

Main layout:
Use one continuous scrollable report page, not tabs. Use full-width sections stacked vertically. Do not use tabs like รายการในออเดอร์ / งานที่เกี่ยวข้อง / รอบจัดส่ง / การชำระเงิน / ประวัติ.

Section 1: สรุปออเดอร์
Show compact summary cards/rows:
- ลูกค้า: ร้านบ้านศิลป์
- ผู้รับหลัก: คุณณัฐพล
- โทร: 098-xxx-2014
- ที่อยู่จัดส่งหลัก: 88/14 ถ.ราชพฤกษ์ ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110
- วันที่สร้าง: 20 พ.ค. 67
- ยอดรวมสุทธิ: 45,800
- สถานะออเดอร์: กำลังดำเนินการ
- สถานะจัดส่ง: จัดส่งยังไม่ครบ
- Buttons in this section: แก้ข้อมูลผู้รับในออเดอร์นี้, เปิดลูกค้า
- Do not show แก้ข้อมูลลูกค้าหลัก in Order Detail; customer master editing happens after opening Customer Detail/Profile

Section 2: รายการในออเดอร์
Group items by type with clear labels:

สินค้าพร้อมส่ง
Show row/card 1:
- Image thumbnail of Thai wooden table
- Item name: โต๊ะกลางลงรักสมุก
- Quantity: 1 ชิ้น
- Status: พร้อมส่ง
- Shipment state: ยังไม่อยู่ในรอบจัดส่ง
- Short note: โทรก่อนเข้าจัดส่ง
- Section action near row: แก้ไขรายการสินค้า or small edit icon if allowed

Show row/card 2:
- Item name: ชุดเก้าอี้ไม้สัก
- Quantity: 2 ชิ้น
- Status: ส่งแล้ว
- Related shipment: SHIP-2568-0060
- Carrier/tracking: Kerry : TH12345
- This row should not look editable as a normal item because it has been sent

งานสั่งทำ
Show row/card 3:
- Image thumbnail of ornate Thai wooden display cabinet
- Item name: ตู้โชว์ไม้สักแกะลาย
- Quantity: 1 ชิ้น
- Related Job: JOB-O-0238
- Production status: กำลังผลิต
- Current department: รักสมุก
- Delivery date: 26 พ.ค. 67
- Shipment state: ต้องรอ Job เสร็จก่อน
- Action: เปิด Job
- Do not show a separate “งานที่เกี่ยวข้อง” section elsewhere

Show row/card 4:
- Item name: ตู้พระสั่งทำ
- Quantity: 1 ชิ้น
- Related Job: JOB-O-0240
- Production status: พร้อมส่ง
- Shipment state: พร้อมสร้างรอบจัดส่ง
- If this line ships to a different recipient/address, show line-specific delivery detail under this row

Section 3: จัดการรอบจัดส่ง
Show a selectable list of Order lines:
- Ready selectable checkbox checked for โต๊ะกลางลงรักสมุก
- Ready selectable checkbox checked for ตู้พระสั่งทำ / JOB-O-0240
- Disabled row for ชุดเก้าอี้ไม้สัก with reason ส่งแล้ว
- Disabled row for ตู้โชว์ไม้สักแกะลาย with reason ยังผลิตไม่เสร็จ
Primary button: สร้างรอบจัดส่งจากรายการที่เลือก
Small helper text: เลือกหลายรายการเพื่อส่งรวม หรือเลือกบางรายการเพื่อส่งแยก

Section 4: รอบจัดส่งที่เกี่ยวข้อง
Use a table/report list with columns:
- เลขรอบจัดส่ง
- วันที่สร้างรอบ
- วันที่ส่งออก
- ขนส่ง
- Tracking
- สถานะ
- การทำงาน

Example rows:
- SHIP-2568-0060, สร้าง 21 พ.ค. 67, ส่งออก 22 พ.ค. 67, Kerry, TH12345, ส่งแล้ว, action เปิดรอบจัดส่ง
- SHIP-2568-0061, สร้าง 22 พ.ค. 67, วันที่ส่งออก blank, ไปรษณีย์ไทย EMS, tracking blank, รอยืนยันการจัดส่ง, action เปิดรอบจัดส่ง
Do not show edit, print, cancel, or close buttons in this table.

Section 5: การชำระเงิน
Show summary only:
- เงื่อนไขการชำระเงิน: COD / มัดจำแล้ว
- ยอดรวมสุทธิ: 45,800
- รับแล้ว: 10,000
- ยอดค้าง: 35,800
- สถานะติดตาม: รอเงิน COD กลับ
- Action: เปิดติดตามการเงิน
Do not show full Payment Record management here.
Do not make unpaid money change the header shipment status.

Section 6: ประวัติ
Show short timeline only:
- สร้างออเดอร์
- แก้ไขรายการออเดอร์ - เหตุผล: ลูกค้าเปลี่ยนจำนวน
- สร้างรอบจัดส่ง
- ส่งออก
- ปิดรอบจัดส่ง
Do not show a full audit log.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Order ID, Job, JOB-O, COD, Payment, Tracking
- Use “รอบจัดส่ง” instead of “Shipment” in visible Thai UI
- Do not show product cost, profit, tax filing detail, accounting ledger, ad spend, or private CRM notes
- Do not make this look like an invoice
- Do not show Draft No.
- Do not use a tabbed main content layout
- Do not show “งานที่เกี่ยวข้อง” as a section label
- Do not imply existing JOB-O production details are edited from this Order screen; use เปิด Job
- Do not imply sent/completed item rows can be casually edited or removed
- Do not imply Order recipient edits update existing Shipment rounds; Shipment snapshots are edited in Shipment screens
- If showing an edit recipient modal/drawer, include an optional checkbox บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า
- If showing line-specific delivery detail, place “แก้ข้อมูลจัดส่งรายการนี้” on the line itself only before it enters a Shipment round
- If showing a blocked ส่งพร้อมกัน shipment plan in the shipment management section, show a small action “เปลี่ยนเป็นจัดส่งแยกได้” only if status allows
- Make the reason the Order is still incomplete visible in the first viewport
- Make section-based editing feel modern and controlled: read first, then edit only the intended section or enter a guarded edit mode
```
