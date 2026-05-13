# IMG-JOB-002 — Job Detail

Related screen spec:

- `docs/ux-ui/screens/SCR-JOB-002-job-detail-work-card.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-JOB-002-job-detail-work-card/SCR-JOB-002-approved.png`
- `docs/ux-ui/mockups/SCR-ORD-005-order-detail/SCR-ORD-005-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-003-active-jobs-overview/SCR-ADM-003-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายละเอียด Job”. This is the admin/manager Job Detail screen opened from `เปิด Job` on an Order Detail item card or from the active jobs overview. It shows one custom work unit, not a queue table.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “งานสั่งทำ / ผลิต” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin uses this screen to understand exactly what the Job is, where it is, who acts next, whether it is urgent, and what visual/instruction details each department should follow. This screen must make the work recognizable by image first.

Header area:
- Page title: รายละเอียด Job
- Breadcrumb/context: งานสั่งทำ / ผลิต > JOB-O-0241
- Job ID: JOB-O-0241
- Source chips: JOB-O, งานลูกค้า
- Related Order: ORD-240522-018
- Status chips: งานด่วน, ค้าง 18 วัน, อยู่คิวช่างไม้
- Current department: ช่างไม้
- Delivery date: กำหนดส่ง 26 พ.ค. 67
- Primary action: เปิดออเดอร์
- Secondary actions: ตั้งงานด่วน, เพิ่มหมายเหตุ

Main layout:
Use a clear two-column detail layout, but the main work detail area must be stacked section cards arranged as rows. Do not merge sections into one dense panel. Each row card must have its own title, border, spacing, and clear visual separation so the user can immediately see that each part is different.

Left main column: stacked row cards
Row card 1: ข้อมูลงาน
- Large furniture image of an ornate teak display cabinet, not decorative stock art
- Work name: ตู้โชว์ไม้สักแกะลาย
- Quantity: 1 ชิ้น
- Customer-visible delivery context: กำหนดส่ง 26 พ.ค. 67
- Related source: ORD-240522-018 / คุณศิริพร
- Current state: อยู่คิวช่างไม้
- Short note: งานอ้างอิงจาก SKU ตู้โชว์ไม้สักแกะลาย ปรับขนาดและลายหน้าบาน

Row card 2: รายละเอียดช่างไม้
- Use a wide row card with a small thumbnail gallery on the left and text details on the right
- Details: ทำบานคู่ ขอบโค้ง, ขนาดรวม กว้าง 120 ลึก 45 สูง 180 ซม.
- Show chips: แผนกช่างไม้, ต้องดูแบบ, งานด่วน
- Include image labels: รูปหลัก, รูปโครงสร้าง

Row card 3: สีและการตกแต่ง
- Use a separate wide row card with its own image thumbnails and text details
- Details: สีโอ๊คเข้ม เคลือบด้าน, เตรียมทำสีหลังรับเข้าโรงงานสี
- Show chips: ฝ่ายสี, รอรับเข้าโรงงานสี
- Include image labels: รูปสี, รูปงานตกแต่ง

Row card 4: รายละเอียดรักสมุก
- Use another separate wide row card
- Details: ลายดอกพิกุลหน้าบาน, ใช้รูปอ้างอิงด้านหน้า
- Show chips: รักสมุก, มีรูปอ้างอิง
- Include image labels: รูปลาย, รูปหน้าบาน

Row card 5: สถานะพิเศษ
- Compact row with three small status blocks:
  - Revision: ไม่มี Revision ที่รอรับทราบ
  - Hold: ไม่ได้ Hold
  - วัตถุดิบ: ไม่ได้รอวัตถุดิบ

Row card 6: ประวัติการทำงาน
- Timeline/list row with 3 concise events:
  - 08 พ.ค. 67 สร้าง Job จากออเดอร์
  - 09 พ.ค. 67 ส่งให้ช่างไม้
  - 12 พ.ค. 67 แอดมินตั้งงานด่วน
- Keep full detailed log collapsed behind ดูทั้งหมด.

Right context/action panel:
Title: การดำเนินงาน
- Current department card: ช่างไม้
- Status: อยู่คิวช่างไม้
- Aging: อยู่ในแผนก 4 วัน / ค้างรวม 18 วัน
- Role-aware action buttons for admin/authorized department:
  - รับงาน
  - รอวัตถุดิบ
  - ส่งไปสี
  - ส่งไปรักสมุก
- A small warning that changing production status should be done by the responsible department or authorized admin.

Below actions in the right panel:
- Production timeline with vertical steps:
  1. สร้าง Job
  2. ส่งให้ช่างไม้
  3. อยู่คิวช่างไม้ (ปัจจุบัน)
  4. รอส่งต่อฝ่ายสี / รักสมุก
  5. พร้อมสร้างรอบจัดส่ง
- Related links:
  - เปิดออเดอร์
  - ดูประวัติการแก้ไข
  - ดูรูปทั้งหมด

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, JOB-P, COD, Payment, Revision, SKU
- Do not show product cost, labor cost, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Do not expose unnecessary customer private data; show only the minimum source context needed for admin
- Do not make this look like a mobile worker screen
- Do not make this a table/list screen
- Do not put all Job details in one blended card; use clearly separated row cards
- Do not make department details look like one combined paragraph
- The top first viewport must answer: what is this Job, where is it, who acts next, and is it urgent?
- Use image-led recognition: the furniture photo and department images must be prominent
- Keep the layout calm, dense, and operational, matching the approved Admin Dashboard shell
```
