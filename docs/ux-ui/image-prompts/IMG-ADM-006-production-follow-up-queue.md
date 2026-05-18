# IMG-ADM-006 - Production Follow-up Queue

Related screen spec:

- `docs/ux-ui/screens/SCR-ADM-006-production-follow-up-queue.md`

Visual/content anchors:
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “งานผลิตต้องติดตาม”. This is an admin production follow-up queue, not a full manager report and not a worker queue.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “งานสั่งทำ / ผลิต” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin reviews only production cases that need communication, clarification, or decision. The screen should help answer: งานไหนต้องตาม, อยู่แผนกไหน, ติดเรื่องอะไร, ต้องเปิด Job ไหน.

Header:
- Page title: งานผลิตต้องติดตาม
- Subtitle: เคสงานผลิตที่ต้องให้แอดมินติดตามหรือประสานงาน

Summary strip:
- ทั้งหมด 6
- รอรับทราบ Revision 2
- ไม่เข้าใจให้ติดต่อหา 1
- รอวัตถุดิบ 2
- งานค้างนาน 3
- งานด่วน 2

Search and filters:
- Search placeholder: ค้นหา Job ID / Order ID / ลูกค้า / ชื่องาน / แผนก
- Filter button: ตัวกรอง
- Filter chips: ทั้งหมด, Revision, ไม่เข้าใจให้ติดต่อหา (จาก Revision), รอวัตถุดิบ, งานค้างนาน, งานด่วน

Main content:
Create a dense follow-up table/list. Each row should show:
- Job ID and source badge JOB-O or JOB-P
- Related Order ID when relevant
- Customer name when relevant
- Work name with thumbnail image
- Current department
- Follow-up reason chip
- Job age and department age
- Urgent chip where relevant
- Latest activity
- Action button: เปิด Job

Use realistic example rows:
1. JOB-O-0241, ORD-240522-018, ลูกค้า คุณศิริพร, ตู้โชว์ไม้สักแกะลาย, แผนก ช่างไม้, chips: ไม่เข้าใจให้ติดต่อหา, งานด่วน, ค้าง 18 วัน, latest: ช่างไม้แจ้งเมื่อ 10:30, action เปิด Job
2. JOB-O-0238, ORD-240520-014, ลูกค้า ร้านบ้านศิลป์, โต๊ะกลางลงรักสมุก, แผนก รักสมุก, chips: รอรับทราบ Revision, อายุในแผนก 4 วัน, action เปิด Job
3. JOB-P-0018, no customer, โต๊ะข้างไม้สัก จำนวน 6 ชิ้น, แผนก ฝ่ายสี, chips: รอวัตถุดิบ, ผลิตเข้าสต๊อก, action เปิด Job
4. JOB-O-0231, ORD-240516-006, ลูกค้า คุณอรพิน, ตู้พระสั่งทำพร้อมฐาน, แผนก ฝ่ายสี, chips: งานค้างนาน, งานด่วน, action เปิด Job

Right detail drawer:
Show selected follow-up case:
- Title: รายละเอียดงานที่ต้องติดตาม
- Job ID: JOB-O-0241
- Related Order: ORD-240522-018
- Customer: คุณศิริพร
- Work image: ornate Thai wooden cabinet
- Current department: ช่างไม้
- Follow-up reason: ไม่เข้าใจให้ติดต่อหา (จาก Revision)
- Status chips: งานด่วน, ค้าง 18 วัน, อยู่คิวช่างไม้
- Work summary: ตู้โชว์ไม้สักแกะลาย จำนวน 1 ชิ้น
- Latest message: “ไม่เข้าใจรายละเอียดลวดลายด้านข้าง”
- Timeline preview: สร้าง Job, ช่างไม้รับงาน, ช่างไม้แจ้งให้ติดต่อ
- Buttons: เปิด Job, บันทึกการติดตาม, ติดต่อแล้ว, ดูประวัติ

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, JOB-P, COD, Payment, Revision
- Do not show product prices, sales price, profit, accounting totals, tax, ad spend, or private CRM notes
- Do not show worker action buttons such as รับงาน, ส่งไปสี, งานเสร็จ
- Do not make this a generic reporting dashboard
- Keep the reason for follow-up obvious in every row
- Keep Hold visually distinct from รอวัตถุดิบ if shown
- The screen should feel like a practical admin action queue
```
