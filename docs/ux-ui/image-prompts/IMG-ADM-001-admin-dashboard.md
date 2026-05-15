# IMG-ADM-001 - Admin Dashboard

This prompt preserves the approved Admin Dashboard direction for future regeneration. It is based on the approved mockup and final correction feedback.

Approved visual anchor:

- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`

Related screen spec:

- `docs/ux-ui/screens/SCR-ADM-001-admin-dashboard.md`

Related reusable visual system:

- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity Regeneration Prompt

```text
Use the approved Admin Dashboard mockup as the visual baseline for IMG-ADM-001-admin-dashboard. Preserve the overall desktop ERP layout: fixed left sidebar, top bar/header, THAIBORAN branding, 3-column by 2-row dashboard card grid, and bottom critical-work preview section.

This is an Admin Dashboard for a Thai furniture and handmade production ERP. The dashboard is not a generic ERP landing page, not a report page, and not an order creation screen. It is an operational control screen for admin users to track active Orders, active custom production Jobs, shipment-round creation, shipment confirmation, production follow-up, and COD/Payment follow-up.

Use Thai UI labels as the main language. Keep English only for important internal terms: Job, JOB-O, JOB-P, COD, Payment, Revision.

Left sidebar menu must use exactly this current approved main navigation:
- แดชบอร์ด
- ออเดอร์
- งานสั่งทำ / ผลิต
- รอบจัดส่ง
- สินค้า / สต๊อก
- ลูกค้า / CRM
- รายจ่าย
- ตั้งค่า

Do not show Draft Order as a main dashboard card. Do not show a Draft badge in the sidebar. Draft Order belongs inside the Order page as a subcategory, tab, or filter.

Do not add a top quick action button such as “+ สร้างออเดอร์”. Order creation belongs inside the Order page. The dashboard is for overview and work queues only.

Top bar:
- Left: menu icon and page title “แดชบอร์ดแอดมิน”
- Right: current date, user avatar, user name “Admin (Full Access)”, role label “ผู้ดูแลระบบ”, and account menu icon

Replace the 6 main dashboard cards with these approved cards:

1. Card title: ออเดอร์ที่ต้องติดตาม
   Large number: 18
   Status badge: ยังต้องตามงาน
   Subtext: กำลังผลิต 11 • ส่งได้เลย 7
   Button text: ดูออเดอร์
   Meaning: real confirmed Orders that still need operational follow-up.

2. Card title: งานกำลังผลิต
   Large number: 17
   Status badge: กำลังทำงาน
   Subtext: ช่างไม้ 8 • ฝ่ายสี 6 • รักสมุก 3
   Button text: ดูภาพรวมงาน
   Meaning: active Jobs in production, including JOB-O customer jobs and JOB-P internal production jobs.

3. Card title: รอสร้างรอบจัดส่ง
   Large number: 7
   Status badge: ส่งได้เลย
   Subtext: มี COD 3 ออเดอร์
   Button text: เปิดคิวงาน
   Meaning: Orders ready for admin to create shipment rounds. Count as number of Orders, not item lines.

4. Card title: ยืนยันการจัดส่ง
   Large number: 4
   Status badge: รอเพิ่มข้อมูล
   Subtext: เพิ่มเลขติดตามพัสดุ / หลักฐานขนส่ง
   Button text: เปิดคิวงาน
   Meaning: shipment rounds already sent out by delivery staff but waiting for admin to confirm tracking/evidence and close the shipment. Count as shipment rounds.

5. Card title: งานผลิตต้องติดตาม
   Large number: 2
   Status badge: รอรับทราบ Revision
   Subtext: ไม่เข้าใจให้ติดต่อหา 1
   Button text: เปิดคิวงาน
   Meaning: only production cases that need admin help, such as Revision acknowledgement, “ไม่เข้าใจให้ติดต่อหา”, Hold, or long material waiting. Do not make this a generic problem counter.

6. Card title: ติดตาม COD / Payment
   Large number: 6
   Status badge: ต้องติดตามเงิน
   Subtext: ค้างตรวจสอบ 6 รายการ
   Button text: เปิดคิวงาน
   Meaning: financial follow-up is separate from Order completion and Shipment closure.

Bottom section:
Use the heading “งานที่ต้องรีบดู”.
Keep it as a horizontal grid/card preview with 3 visible items. It is a Critical Work Preview, not a full table and not a full manager report.

Each bottom item card must show:
- Product/work image
- Product or work name
- Customer name
- วันที่รับงาน
- Small Order ID / Job ID, for example ORD-240522-018 / JOB-O-0241
- Status badges such as งานด่วน, ค้าง 18 วัน, ใกล้ส่ง
- Current queue/status such as อยู่คิวช่างไม้, รอสร้างรอบจัดส่ง, ยืนยันการจัดส่ง
- Related date such as กำหนดส่ง 26 พ.ค. 67

Use example bottom preview items:
- ตู้โชว์ไม้สักแกะลาย, ลูกค้า คุณศิริพร, วันที่รับงาน 08 พ.ค. 67, ORD-240522-018 / JOB-O-0241, งานด่วน, ค้าง 18 วัน, อยู่คิวช่างไม้, กำหนดส่ง 26 พ.ค. 67
- โต๊ะกลางลงรักสมุก, ลูกค้า ร้านบ้านศิลป์, วันที่รับงาน 10 พ.ค. 67, ORD-240520-014 / JOB-O-0238, ใกล้ส่ง, รอสร้างรอบจัดส่ง, กำหนดส่ง 24 พ.ค. 67
- ชุดเก้าอี้พร้อมส่ง, ลูกค้า คุณพิมพ์ชนก, วันที่รับงาน 11 พ.ค. 67, ORD-240518-009 / JOB-O-0235, งานด่วน, ใกล้ส่ง, ยืนยันการจัดส่ง, กำหนดส่ง 23 พ.ค. 67

Remove or replace any contradictory label such as “ไม่มีงานค้าง” if the section shows delayed work. If a control is needed on the right side of the bottom section, use “ดูทั้งหมด”.

Visual style:
Keep a clean, calm, professional ERP operations interface. Use soft neutral backgrounds, white cards, subtle shadows, modest rounded corners, restrained ThaiBoran brand styling, dark navy count typography, and clear status colors. Avoid marketing-style hero sections, decorative gradients, oversized illustration, flashy effects, charts, financial analytics, or unrelated modules. The UI should feel practical for office admin staff in a small production business.

Important consistency rules:
- Use “รอบจัดส่ง” instead of “Shipment” in Thai UI labels.
- Use “งานสั่งทำ / ผลิต” in the sidebar instead of “งานผลิต” alone.
- Use “งานกำลังผลิต” for the production overview card.
- Do not use “รอสร้าง Job” because Job should be created automatically when confirmed Order or internal Production work is created.
- Do not show Draft Order as a dashboard card.
- Do not add new modules, charts, financial reports, or analytics widgets.
- Preserve the overall desktop dashboard composition and aspect ratio.
```

## Thai UI Labels To Preserve

- `แดชบอร์ดแอดมิน`
- `แดชบอร์ด`
- `ออเดอร์`
- `งานสั่งทำ / ผลิต`
- `รอบจัดส่ง`
- `สินค้า / สต๊อก`
- `ลูกค้า / CRM`
- `รายจ่าย`
- `ตั้งค่า`
- `ออเดอร์ที่ต้องติดตาม`
- `งานกำลังผลิต`
- `รอสร้างรอบจัดส่ง`
- `ยืนยันการจัดส่ง`
- `งานผลิตต้องติดตาม`
- `ติดตาม COD / Payment`
- `งานที่ต้องรีบดู`
- `ยังไม่จบงาน`
- `กำลังทำงาน`
- `ส่งได้เลย`
- `รอเพิ่มข้อมูล`
- `รอรับทราบ Revision`
- `ต้องติดตามเงิน`

## What Not To Show

- Do not show `ร่างออเดอร์` as a dashboard card.
- Do not show `รอสร้าง Job` as a dashboard card.
- Do not add a top quick action button.
- Do not show a Draft badge in the sidebar.
- Do not add a full table to the dashboard.
- Do not add charts, accounting summaries, channel analytics, or unrelated reports.
- Do not make queues look like personal locked assignments.
- Do not show finance-sensitive amounts beyond permission-aware follow-up counts.

## Reusable Design Notes

Later screens should preserve:

- Fixed left sidebar
- Clean top bar with date and user role
- White operational cards with subtle shadow
- Large dark-navy counts
- Compact colored status chips
- Image-led work preview cards where product recognition matters
- Thai-first labels with only important internal terms in English
