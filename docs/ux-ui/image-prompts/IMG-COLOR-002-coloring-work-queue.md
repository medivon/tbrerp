# IMG-COLOR-002 — Coloring Work Queue

## 1. Low-fidelity wireframe prompt

Create a low-fidelity mobile/tablet wireframe for the active Coloring Work Queue. Inherit the approved Admin Dashboard visual language only and reuse the Woodwork Queue card pattern: card style, chip style, typography, spacing, calm ERP feel, and image-led work recognition. Do not force the full desktop sidebar into this shop-floor screen. The title is `งานที่ต้องทำ`, with a visible link/chip to `รอรับเข้าโรงงานสี`. Show image-led active coloring cards only, not intake items mixed into the list.

## 2. High-fidelity UI mockup prompt

Create a high-fidelity tablet/mobile ERP work queue UI for a Thai furniture coloring and decorating department. Preserve the approved THAIBORAN Admin Dashboard visual language without using the full desktop sidebar: quiet operational style, compact chips, clean white cards, restrained colors, larger touch targets, and clear Thai labels. Page title `งานที่ต้องทำ` with a small link `รอรับเข้าโรงงานสี`. Show image cards for jobs with `JOB-O-2568-0042 / งานลูกค้า`, work name `ตู้โชว์ไม้สักแกะลาย`, color instruction `สีโอ๊คเข้ม เคลือบด้าน`, quantity, urgent chip, delivery date, and action buttons `รับงาน`, `รอวัตถุดิบ`, `ส่งไปรักสมุก`, `งานเสร็จ/พร้อมส่ง`.

## 3. Thai UI labels to preserve

- `งานที่ต้องทำ`
- `รอรับเข้าโรงงานสี`
- `ประวัติงานของฉัน`
- `รหัส Job`
- `งานลูกค้า`
- `ผลิตเข้าสต๊อก`
- `ชื่องาน`
- `รายละเอียดฝ่ายสี/ตกแต่ง`
- `จำนวน`
- `สถานะ`
- `งานด่วน`
- `วันจัดส่ง`
- `รับงาน`
- `รอวัตถุดิบ`
- `ส่งไปรักสมุก`
- `รับเข้าโรงงานสี`
- `งานเสร็จ/พร้อมส่ง`

## 4. Layout requirements

- Mobile/tablet first.
- Do not use the full desktop sidebar.
- Use a lightweight worker header and the approved visual language.
- Active work queue only; intake is a link/chip, not mixed list content.
- Use large image-led job cards.
- Each card shows Job ID/source, work name, color/decor instruction preview, quantity, status, urgent/delivery chips.
- Actions must be touch-friendly.
- `รอรับเข้าโรงงานสี` must be visible and visually separate.

## 5. Components to include

- Active queue header
- Intake queue link/chip
- Filter chip strip
- Job card preview
- Main image thumbnail
- Source badge
- Coloring instruction preview
- Urgent chip
- Waiting materials chip
- Delivery date chip
- Role action buttons
- History link

## 6. Realistic example data

- `JOB-O-2568-0042 / งานลูกค้า`
- `ตู้โชว์ไม้สักแกะลาย`
- `สีโอ๊คเข้ม เคลือบด้าน`
- `จำนวน 1 ชิ้น`
- `งานด่วน`
- `วันจัดส่ง 20 พ.ค. 2569`
- `รอรับเข้าโรงงานสี 3`
- Second card: `โต๊ะกลางลงรักสมุก`, `เคลือบด้าน สีธรรมชาติ`

## 7. What not to show

- Do not show customer private data, phone/address, CRM notes, payment data, sales price, or Rak Samuk payout/rates.
- Do not mix waiting intake items into the active Coloring Queue.
- Do not show admin-only edit controls for Job master data.
- Do not make the queue a dense desktop table.
- Do not imply completed `JOB-O` goes directly to delivery; it goes to admin `รอสร้างรอบจัดส่ง`.

## 8. Consistency notes

Use the same visual language as Admin Dashboard and Woodwork Queue. The Coloring Queue should feel like a sibling of Woodwork: same card shape, same chip system, same touch target size, but with color/decor instruction preview emphasized. Do not force desktop app-shell navigation into this mobile/tablet worker screen.
