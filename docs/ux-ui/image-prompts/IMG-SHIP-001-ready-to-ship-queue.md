# IMG-SHIP-001 - Ready-to-Ship Queue

Related screen spec:

- `docs/ux-ui/screens/SCR-SHIP-001-ready-to-ship-queue.md`

Related source documents:
- `docs/ux-ui/design-system/app-shell.md`

Note:
- Do not treat its dark sidebar/altered logo as the global app-shell baseline.

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รอสร้างรอบจัดส่ง”. This is the next screen after clicking the approved Admin Dashboard card “รอสร้างรอบจัดส่ง”.

Use the current Admin Dashboard screen spec and app-shell docs as the app-shell direction:
- Fixed left sidebar with THAIBORAN logo/brand at top
- Approved main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight the sidebar item “รอบจัดส่ง” as active
- Top bar with page title, current date, user avatar, user name “Admin (Full Access)”, role “ผู้ดูแลระบบ”, and account menu
- Preserve the approved calm ERP visual language: white cards, subtle shadows, modest rounded corners, compact colored chips, dark navy typography, Thai-first UI labels, dense but readable office workflow layout

Screen purpose:
Show Orders that have ready-to-ship items waiting for admin to create a shipment round. Keep work grouped by Order, not as loose item chaos. Include ready-stock items, completed JOB-O work, and ready Service Case items. Actual combined or split shipment is controlled by selected ready lines; unfinished custom work must not appear as shippable. This is before the Shipment exists. It is not the delivery team's “รายการต้องจัดส่งวันนี้” screen.

Header:
- Page title: รอสร้างรอบจัดส่ง
- Small subtitle: รายการพร้อมส่งที่รอแอดมินสร้างรอบจัดส่ง
- No large marketing hero section

Add a module sub menu directly under the header, styled like a compact secondary navigation bar:
- รอสร้างรอบจัดส่ง active
- รายการต้องจัดส่งวันนี้
- รายการรอวันจัดส่ง
- ยืนยันการจัดส่ง
- ประวัติรอบจัดส่ง

This sub menu is navigation inside the “รอบจัดส่ง” module, not a filter tab row.

Summary strip below the header:
Use compact cards:
- ทั้งหมด 7
- สินค้าพร้อมส่ง 4
- งานสั่งทำเสร็จแล้ว 2
- งานบริการ 1
- COD 3
- กำหนดส่งวันนี้ 2

Workbench toolbar:
- Large search input
- Filter button “ตัวกรอง”
- Sort/group selector “จัดกลุ่มตาม”
- Selected-count area such as “เลือกแล้ว 3 ออเดอร์”
- Bulk action button “สร้างรอบจัดส่งจากที่เลือก” shown as secondary/controlled, not the main action for every case

Filter chips below the toolbar:
- ทั้งหมด
- กำหนดส่งวันนี้
- สินค้าพร้อมส่ง
- งานสั่งทำเสร็จแล้ว
- งานบริการ
- COD
- สร้างรวมได้

Search area:
Include a search box with placeholder “ค้นหา ชื่อลูกค้า / เบอร์โทร / Order ID / Job ID / ผู้รับ / ที่อยู่”. Add a small filter button “ตัวกรอง”.

Main content:
Create a dense Order-grouped ready-to-ship table/workbench designed for dozens of ready Orders in one day. Do not make oversized cards. Use sticky-style column headers and compact rows. Each row should show:
- Row checkbox for eligible Orders
- Small product/work thumbnail or thumbnail strip
- Order ID
- Customer name
- Recipient name and phone
- Ready item summary
- Source chips such as สินค้าพร้อมส่ง, งานสั่งทำเสร็จแล้ว, งานบริการ
- Related Job ID for completed custom work, such as JOB-O-0238
- Delivery target date where relevant, labeled “กำหนดส่ง”
- Carrier preview where relevant, labeled “ขนส่งที่ระบุไว้”
- COD chip where relevant
- Stock warning chip/text where relevant: สต๊อกติดลบ, shown as warning only and not as a hard blocker after acknowledgement
- Bulk eligibility chip: สร้างรวมได้ or ต้องเปิดแยก
- Shipment selection chip where relevant: ส่งรวม or ส่งบางรายการ
- Current state / next action
- Primary action button: สร้างรอบจัดส่ง

Use realistic example rows:
1. ORD-240520-014, ลูกค้า ร้านบ้านศิลป์, ผู้รับ คุณณัฐพล, โต๊ะกลางลงรักสมุก, JOB-O-0238, chip: งานสั่งทำเสร็จแล้ว, COD, กำหนดส่ง 24 พ.ค. 67, current state: พร้อมสร้างรอบจัดส่ง, action: สร้างรอบจัดส่ง
2. ORD-240518-009, ลูกค้า คุณพิมพ์ชนก, ผู้รับ คุณพิมพ์ชนก, ชุดเก้าอี้พร้อมส่ง 4 ชิ้น, chip: สินค้าพร้อมส่ง, กำหนดส่งวันนี้, carrier preview: ไปรษณีย์ไทย, bulk chip: สร้างรวมได้, action: สร้างรอบจัดส่ง
3. ORD-240515-011, ลูกค้า คุณอนันต์, ผู้รับ บริษัท เอ.ที.ดีไซน์, กรอบบัวไม้ปิดทอง, chips: สินค้าพร้อมส่ง, COD, carrier preview: Porlor Express, bulk chip: ต้องเปิดแยก, action: สร้างรอบจัดส่ง
4. ORD-240512-007, ลูกค้า คุณมาลี, ผู้รับ คุณมาลี, ส่งงานซ่อมกลับ 1 รายการ, chip: งานบริการ, bulk chip: สร้างรวมได้, current state: พร้อมส่งกลับ, action: สร้างรอบจัดส่ง
Right detail drawer:
Show the selected Order preview on the right side with title “รายละเอียดออเดอร์พร้อมส่ง”. Include:
- Order ID
- Customer and recipient
- Full recipient phone and address snapshot
- Main item image
- Ready item list with quantity
- Source chips
- Related Job ID if any
- COD signal if any
- Delivery note preview
- Buttons: สร้างรอบจัดส่ง, เปิดออเดอร์, เปิด Job where relevant

Visual rules:
- Use Thai labels as visible UI language
- Keep English only for important internal terms: Job, JOB-O, COD, Payment, Revision
- Use “รอบจัดส่ง” instead of “Shipment” in visible Thai UI
- Do not show product prices, sales price, profit, accounting totals, tax, ad spend, or private CRM notes
- Do not show unfinished custom Jobs in this queue
- Do not show unfinished custom Jobs as shippable
- Do not show Draft Orders here
- Do not let Delivery Team controls appear on this admin screen
- Do not show “รายการต้องจัดส่งวันนี้” as a delivery work tab on this screen; use “กำหนดส่งวันนี้” only as a planning filter
- Do not make the list loose item-by-item chaos; group by Order
- Do not make the page card-heavy or slow to scan; it must work when there are dozens of ready Orders
- Do not imply bulk creation is allowed for every Order; show eligibility clearly
- Do not make stock shortage look like a hard blocker after acknowledgement; show it as a warning that Shipment Builder will acknowledge/log
- Preserve the approved THAIBORAN Admin Dashboard, Active Orders, and Active Jobs visual direction
- The screen should feel practical for office admin users preparing daily shipment rounds
```
