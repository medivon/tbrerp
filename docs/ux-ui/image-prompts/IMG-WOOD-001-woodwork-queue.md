# IMG-WOOD-001 — Woodwork Queue

## 1. Low-fidelity wireframe prompt

Create a low-fidelity mobile/tablet wireframe for the Woodwork Queue. Inherit the approved Admin Dashboard visual language only: card style, chip style, typography, spacing, calm ERP feel, and image-led work recognition. Do not force the full desktop sidebar into this shop-floor screen. The screen title is `งานที่ต้องทำ`. Use large image-led job cards, a compact filter strip, and a secondary link to `ประวัติงานของฉัน`. Each card shows only woodwork-relevant details and actions.

## 2. High-fidelity UI mockup prompt

Create a high-fidelity mobile/tablet ERP work queue UI for Thai furniture woodworkers. Use the approved Admin Dashboard visual language at shop-floor scale: quiet operational styling, compact chips, clean white cards, modest radius, restrained colors, clear Thai labels, larger touch targets, and image-led work recognition. Do not include the full desktop sidebar. Page title `งานที่ต้องทำ`. Show large image cards for jobs such as `JOB-O-2568-0042 / งานลูกค้า / ตู้โชว์ไม้สักแกะลาย`, quantity, urgent chip `งานด่วน`, delivery date, status `รอรับงาน`, and simple action buttons `รับงาน`, `รอวัตถุดิบ`, `ส่งไปสี`, `ส่งไปรักสมุก`. Include a visible link `ประวัติงานของฉัน`.

## 3. Thai UI labels to preserve

- `งานที่ต้องทำ`
- `ประวัติงานของฉัน`
- `รหัส Job`
- `งานลูกค้า`
- `ผลิตเข้าสต๊อก`
- `ชื่องาน`
- `จำนวน`
- `สถานะ`
- `งานด่วน`
- `วันจัดส่ง`
- `รอรับงาน`
- `กำลังทำ`
- `รอวัตถุดิบ`
- `รับงาน`
- `ส่งไปสี`
- `ส่งไปรักสมุก`
- `กำลังส่งไปแกะสลัก`

## 4. Layout requirements

- Mobile/tablet first.
- Do not use the full desktop sidebar.
- Use a lightweight worker header and the approved visual language.
- One-card-per-row on mobile, one or two columns on tablet.
- Large image and large touch targets.
- Compact filter chips at top: all, urgent, waiting materials.
- Job cards must show image, Job ID/source label, work name, quantity, status, urgent/delivery chips.
- Actions must be large and easy to tap.
- History link should be visible but secondary.

## 5. Components to include

- Mobile queue header
- Filter chip strip
- Job card preview
- Main image thumbnail
- Source badge
- Urgent chip
- Waiting materials chip
- Delivery date chip
- Department action buttons
- History link
- Empty state

## 6. Realistic example data

- `JOB-O-2568-0042 / งานลูกค้า`
- `ตู้โชว์ไม้สักแกะลาย`
- `จำนวน 1 ชิ้น`
- `วันจัดส่ง 20 พ.ค. 2569`
- `งานด่วน`
- `รอรับงาน`
- Second card: `JOB-P-2568-0018 / ผลิตเข้าสต๊อก / โต๊ะข้างไม้สัก`
- Instruction preview: `ทำบานคู่ ขอบโค้ง`

## 7. What not to show

- Do not show customer name, Order ID, phone, address, CRM notes, payment data, sales price, or Rak Samuk rates.
- Do not show admin analytics or reports.
- Do not make the queue a dense desktop table.
- Do not hide `รอวัตถุดิบ` in a separate obscure tab.
- Do not show actions outside woodwork's allowed actions.

## 8. Consistency notes

Keep the Admin Dashboard visual language but simplify for shop-floor use: larger cards, larger buttons, less text, strong image recognition. Use the same chip style and typography rhythm as the dashboard, but do not force desktop app-shell navigation into this mobile/tablet worker screen.
