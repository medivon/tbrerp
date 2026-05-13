# IMG-MGR-001 — Manager Unfinished Work Overview

## 1. Low-fidelity wireframe prompt

Create a low-fidelity desktop/tablet wireframe for the Manager Unfinished Work Overview. Use the approved Admin Dashboard app shell from `docs/ux-ui/design-system/app-shell.md`: fixed left sidebar, top bar with page title/date/user role, and the approved main navigation. Highlight `งานสั่งทำ / ผลิต` in the sidebar. Use a header, KPI strip, work-type toggles, and a sortable unfinished Job table. The screen must answer: which Jobs are unfinished, where each Job is, what is urgent, what is old, and what is near delivery.

## 2. High-fidelity UI mockup prompt

Create a high-fidelity desktop/tablet manager overview UI for a Thai furniture ERP. Inherit the approved Admin Dashboard app shell: THAIBORAN sidebar with `แดชบอร์ด`, `ออเดอร์`, `งานสั่งทำ / ผลิต`, `รอบจัดส่ง`, `สินค้า / สต๊อก`, `ลูกค้า / CRM`, `รายจ่าย`, `ตั้งค่า`; top bar with page title, date, user avatar, user name/role, and account menu. Highlight `งานสั่งทำ / ผลิต` as active. Preserve the approved visual system: quiet operational style, dense but readable layout, white cards, compact chips, restrained colors, dark navy count typography, and clear Thai labels. Title `ภาพรวมงานค้าง`. Show KPI cards for unfinished jobs, urgent jobs, old jobs, and near-delivery jobs. Include toggles `ทั้งหมด`, `งานลูกค้า`, `ผลิตเข้าสต๊อก`. Main table shows Job ID, source label, work name, department location, status, urgent chip, delivery date, total Job age, and department age. Use examples like `JOB-O-2568-0042 / ตู้โชว์ไม้สักแกะลาย / ฝ่ายสี / งานด่วน / อีก 3 วัน`.

## 3. Thai UI labels to preserve

- `ภาพรวมงานค้าง`
- `ทั้งหมด`
- `งานลูกค้า`
- `ผลิตเข้าสต๊อก`
- `รหัส Job`
- `ประเภทงาน`
- `ชื่องาน`
- `งานอยู่แผนกไหน`
- `สถานะ`
- `งานด่วน`
- `วันจัดส่ง`
- `ใกล้วันจัดส่ง`
- `อายุงานรวม`
- `อายุในแผนก`
- `ผู้รับผิดชอบหลัก`
- `ประวัติการทำงาน`
- `รอวัตถุดิบ`
- `Hold`

## 4. Layout requirements

- Desktop/tablet first.
- Use the approved desktop admin sidebar and top bar.
- Active sidebar item: `งานสั่งทำ / ผลิต`.
- Header with date/time and summary counts.
- KPI strip for unfinished, urgent, old, near delivery, bottleneck.
- Work type toggles: all/customer/production.
- Sortable table as main content.
- Side panel or drawer for selected Job summary and timeline preview.
- Default visual priority: urgent, nearest delivery date, oldest total Job age, longest department age.

## 5. Components to include

- Manager overview header
- Work type toggle
- Aging threshold chips
- KPI cards
- Unfinished Job table/card list
- Source badge
- Department location chip
- Urgent chip
- Delivery proximity chip
- Job age chip
- Department age chip
- Timeline preview drawer

## 6. Realistic example data

- `JOB-O-2568-0042`
- `งานลูกค้า`
- `ตู้โชว์ไม้สักแกะลาย`
- Department: `ฝ่ายสี`
- Status: `รอวัตถุดิบ`
- Urgency: `งานด่วน`
- Delivery proximity: `อีก 3 วัน`
- Total Job age: `28 วัน`
- Department age: `6 วัน`
- Owner: `แอดมินนุ่น`
- `JOB-P-2568-0018 / ผลิตเข้าสต๊อก / โต๊ะข้างไม้สัก`

## 7. What not to show

- Do not turn this into a generic reporting or accounting dashboard.
- Do not show sales, expense, or profit charts.
- Do not expose sensitive financial details unless only as omitted/permission-aware placeholders.
- Do not hide `JOB-O` vs `JOB-P`.
- Do not make department bottlenecks visible only after opening each Job.
- Do not use marketing-style composition.

## 8. Consistency notes

Use the approved Admin Dashboard visual anchor directly: same sidebar/header style, KPI/card design, chip language, typography, and restrained palette. This screen may be denser and table-led, but it should still feel like the management sibling of the Admin Dashboard. Keep the approved main navigation labels unchanged.
