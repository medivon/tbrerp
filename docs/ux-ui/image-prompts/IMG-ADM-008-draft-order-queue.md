# IMG-ADM-008 - Draft Order Queue

Related screen spec:

- `docs/ux-ui/screens/SCR-ADM-008-draft-order-queue.md`

Related source docs:

- `docs/ux-ui/01-flow-map.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/03-navigation-map.md`
- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`
- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP queue screen for THAIBORAN called “ร่างออเดอร์”. This screen lists saved Draft Orders only. It is not a confirmed Order list, not an Order Detail screen, not a quotation screen, and not a dashboard card.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active
- Top bar with page title, current date, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, white cards, compact chips, subtle shadows, dense but readable office layout

Screen purpose:
Admin uses this queue to find and continue intentionally saved Draft Orders. Draft Orders are unfinished order-entry records that exist only after the user explicitly pressed บันทึกร่าง or ออกและบันทึก. Unsaved Order Create/Edit sessions must not appear here.

Header:
- Page title: ร่างออเดอร์
- Header count: ร่างที่กำลังทำอยู่ 8 รายการ
- Primary action at top right: สร้างออเดอร์
- Do not show this as a dashboard card

Order workspace tabs below the header:
- กำลังดำเนินการ
- ออเดอร์ทั้งหมด
- ร่างออเดอร์
- ปิดแล้ว / ยกเลิก
- Active tab: ร่างออเดอร์

Filter/search bar:
- Search input placeholder: ค้นหาเลขร่าง / ลูกค้า / เบอร์โทร / ผู้รับ / ผู้รับผิดชอบ
- Search covers Draft No., Customer name, phone, recipient name, and owner
- Optional owner filter: ผู้รับผิดชอบทั้งหมด
- Optional status chips: ทั้งหมด, ข้อมูลยังไม่ครบ, พร้อมตรวจสอบ, ค้างนาน

Main content:
Use a desktop table as the main surface. Keep it practical, compact, and readable for office admin work.

Draft Order table columns:
- เลขร่าง
- ลูกค้า
- ผู้รับสินค้า
- เบอร์โทร
- จำนวนรายการ
- แก้ไขล่าสุด
- ผู้รับผิดชอบหลัก
- สถานะ
- การทำงาน

Sample rows:
1. DRAFT-00034, คุณมาลี, คุณภพ, 082-345-6789, 2 รายการ, วันนี้ 14:20, แอดมินแพร, chips: ร่างออเดอร์ + ข้อมูลยังไม่ครบ, action: ทำต่อ
2. DRAFT-00035, ร้านบ้านศิลป์, คุณณัฐพล, 089-555-1122, 3 รายการ, วันนี้ 10:05, แอดมินแพร, chips: พร้อมตรวจสอบ, action: เปิดร่าง
3. DRAFT-00021, คุณศิริพร, คุณศิริพร, 081-234-5678, 1 รายการ, 7 วันที่แล้ว, แอดมินตาล, chips: ค้างนาน + ข้อมูลยังไม่ครบ, action: ทำต่อ
4. DRAFT-00018, คุณอนันต์, blank recipient, 087-999-2233, 0 รายการ, 12 วันที่แล้ว, แอดมินแพร, chips: ค้างนาน + ข้อมูลยังไม่ครบ, action: เปิดร่าง

Use realistic item preview text inside rows or a right preview drawer:
- ตู้โชว์ไม้สักแกะลาย
- เก้าอี้ไม้สักพร้อมส่ง

Optional right preview drawer:
Show a selected draft preview for DRAFT-00034:
- เลขร่าง: DRAFT-00034
- ลูกค้า: คุณมาลี
- ผู้รับสินค้า: คุณภพ
- จำนวนรายการ: 2 รายการ
- รายการตัวอย่าง: ตู้โชว์ไม้สักแกะลาย, เก้าอี้ไม้สักพร้อมส่ง
- ขาดข้อมูล: ยังไม่มีเงื่อนไขการชำระเงิน
- ผู้รับผิดชอบหลัก: แอดมินแพร
- Action button: ทำต่อ
- Note: เจ้าของใช้เพื่อ traceability เท่านั้น ผู้ใช้สิทธิ์เท่ากันหรือสูงกว่าสามารถทำต่อได้

Draft status chips:
- ร่างออเดอร์
- ข้อมูลยังไม่ครบ
- พร้อมตรวจสอบ
- ค้างนาน

Empty state variant if there are no drafts:
- Message: ไม่มีร่างออเดอร์ที่กำลังทำอยู่
- Primary action: สร้างออเดอร์
- Small note: ร่างออเดอร์เกิดเมื่อกดบันทึกร่างเท่านั้น และยังไม่จองสต๊อก ไม่สร้าง Job ไม่สร้าง Shipment

Business rules to make visible:
- Draft Order is not a real Order
- Draft No. must not look like Order ID
- Draft Orders do not reserve stock
- Draft Orders do not create Job
- Draft Orders do not create Shipment
- Draft Orders do not enter reports
- Unsaved Order Create/Edit sessions must not appear in this queue
- Converted drafts should not normally appear in the active draft queue
- Owner is for traceability, not a hard lock for same-permission or higher-permission users

Visual rules:
- Thai UI labels are primary
- Keep these English terms unchanged: Job, JOB-O, JOB-P, COD, Payment, Revision
- Make DRAFT-00034 visually softer and clearly different from a real Order ID
- Do not show confirmed Order ID
- Do not show downstream Job, Shipment, stock reservation, sales report, accounting report, tax detail, product cost, profit, or private CRM notes
- Do not show charts
- Do not create a marketing layout or decorative hero section
- Do not make this page look like Order Detail or Order Review
- Keep the design quiet, work-focused, white-card based, compact, and table-first
```
