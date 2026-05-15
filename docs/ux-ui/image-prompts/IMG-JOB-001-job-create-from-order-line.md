# IMG-JOB-001 — Embedded Custom Work Detail

Related screen spec:

- `docs/ux-ui/screens/SCR-JOB-001-job-create-from-order-line.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-JOB-001-job-create-from-order-line/SCR-JOB-001-approved.png`
- `docs/ux-ui/mockups/SCR-ORD-004-order-review-create-order/SCR-ORD-004-approved.png`
- `docs/ux-ui/mockups/SCR-ORD-005-order-detail/SCR-ORD-005-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-002-job-detail-work-card/SCR-JOB-002-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP section/page state for THAIBORAN called “รายละเอียดงานสั่งทำ”. This is embedded inside Order Create/Edit for one custom item. It prepares the data that will become `JOB-O / งานลูกค้า` when the Order is confirmed; it is not a separate post-confirmation Job creation screen and not a queue screen.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active because the admin is still creating/editing an Order
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin prepares one custom Order Line with images and department-specific instructions. The visible UI should use `รายละเอียดงานสั่งทำ`, with a preview chip `จะสร้าง JOB-O / งานลูกค้า` before confirmation.

Header area:
- Page title: รายละเอียดงานสั่งทำ
- Context line: จากหน้าสร้างออเดอร์ / รายการที่ 1
- Large chips: จะสร้าง JOB-O, งานลูกค้า, พร้อมตรวจสอบ
- Related customer/source: ลูกค้า คุณศิริพร
- Primary button in parent flow: สร้างออเดอร์
- Secondary buttons: บันทึกร่าง, กลับ

Main layout:
Use a clear two-column admin form. Main form on the left, readiness/source panel on the right.

Left main column:
Row card 1: รายการต้นทาง
- Large product image of an ornate teak display cabinet
- Work name: ตู้โชว์ไม้สักแกะลาย
- Quantity: 1 ชิ้น
- Related SKU/reference: อ้างอิง SKU ตู้โชว์ไม้สักแกะลาย
- Delivery date: กำหนดส่ง 26 พ.ค. 67
- Status chips: งานสั่งทำ, งานด่วน
- Short source note: ปรับขนาดและลายหน้าบานจากแบบมาตรฐาน

Row card 2: ข้อมูลงานสั่งทำ
- Fields with filled sample values:
  - ชื่องาน: ตู้โชว์ไม้สักแกะลาย
  - จำนวน: 1 ชิ้น
  - ขนาดโดยรวม: กว้าง 120 ลึก 45 สูง 180 ซม.
  - หมายเหตุงาน: ลูกค้าขอสีโอ๊คเข้มและลายดอกพิกุลหน้าบาน
- Use form controls but keep them clean and readable.

Row card 3: รูปหลัก
- Drag-and-upload image area with large preview and smaller thumbnails
- Labels: รูปหลัก, รูปอ้างอิงสินค้า, เพิ่มรูป

Row card 4: รูป/คำอธิบายสำหรับช่างไม้
- Separate department card
- Text: ทำบานคู่ ขอบโค้ง, ยึดขนาดตามแบบแนบ
- Thumbnail placeholders/preview images labelled รูปโครงสร้าง, รูปขนาด
- Button: เพิ่มรูปช่างไม้

Row card 5: รูป/คำอธิบายสำหรับฝ่ายสีและตกแต่ง
- Separate department card
- Text: สีโอ๊คเข้ม เคลือบด้าน
- Thumbnail labels: รูปสี, รูปงานตกแต่ง
- Button: เพิ่มรูปฝ่ายสี

Row card 6: รูป/คำอธิบายสำหรับรักสมุก
- Separate department card
- Text: ลายดอกพิกุลหน้าบาน
- Thumbnail labels: รูปลาย, รูปหน้าบาน
- Button: เพิ่มรูปรักสมุก

Right panel:
Title: ตรวจความพร้อมรายละเอียดงานสั่งทำ
- Checklist:
  - มีชื่องาน
  - มีจำนวน
  - มีรูปหลัก
  - มีรายละเอียดช่างไม้
  - มีรายละเอียดสี/ตกแต่ง
  - มีรายละเอียดรักสมุก
- Payment context: มัดจำแล้ว, shown only as financial context and not as a JOB-O gate
- Source summary:
  - Order: ยังไม่มีเลขออเดอร์
  - Customer: คุณศิริพร
  - หลังยืนยัน: จะสร้าง JOB-O
- Primary action button repeated at bottom: สร้างออเดอร์

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, JOB-P, COD, Payment, Revision, SKU
- Do not show product cost, labor cost, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Do not imply Payment Record is required before creating JOB-O
- Do not make this a waiting queue screen or separate Job creation screen
- Do not show a dashboard card for Draft Order or waiting Job
- Do not mix department instructions into one paragraph; use separate row cards
- Do not write explanatory helper text about automatic routing
- Do not label this area as `ร่าง Job`; use `รายละเอียดงานสั่งทำ`
- Make image upload and department image groups visually important
- Keep the design aligned with the approved desktop admin app shell
```
