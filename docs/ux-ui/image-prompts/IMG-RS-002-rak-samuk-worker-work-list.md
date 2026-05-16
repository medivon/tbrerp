# IMG-RS-002 — Rak Samuk Worker Work List

## 1. Low-fidelity wireframe prompt

Create a low-fidelity mobile wireframe for the Rak Samuk Worker Work List. Inherit the approved Admin Dashboard visual language only: card style, chip style, typography, spacing, calm ERP feel, and image-led work recognition. Do not force the full desktop sidebar into this outsource worker screen. The title is `งานที่ต้องทำ`. Show only assigned work cards with image, work name, quantity, Rak Samuk instruction, own price or missing-price state, and a link to `ประวัติการทำงาน`.

## 2. High-fidelity UI mockup prompt

Create a high-fidelity mobile work list UI for an outsourced Thai Rak Samuk craft worker. Preserve the approved Admin Dashboard visual language through typography, chips, clean white cards, modest radius, restrained colors, and calm operational styling, but make it simpler and mobile-first. Do not include the desktop sidebar or internal admin navigation. Title `งานที่ต้องทำ`. Show simple cards with furniture detail images, work name `ตู้โชว์ไม้สักแกะลาย`, instruction `ลายดอกพิกุลหน้าบาน`, quantity `1 ชิ้น`, urgent chip `งานด่วน`, and own price state `450 บาท/ชิ้น` or warning `ไม่มีราคา / ให้แจ้งราคา` with button `แจ้งราคา`. Include a limited detail state/sheet showing larger images, full Rak Samuk instructions, quantity, and own price again. Include secondary navigation `ประวัติการทำงาน`.

## 3. Thai UI labels to preserve

- `งานที่ต้องทำ`
- `ประวัติการทำงาน`
- `ชื่องาน`
- `รูปงาน`
- `รายละเอียดรักสมุก`
- `จำนวน`
- `งานด่วน`
- `ราคางานของฉัน`
- `มีราคาแล้ว`
- `ไม่มีราคา / ให้แจ้งราคา`
- `แจ้งราคา`
- `ส่งราคา`
- `รับงานกลับแล้ว`
- `จ่ายแล้ว`

## 4. Layout requirements

- Mobile-first.
- No sidebar; simple top header and bottom/top lightweight navigation.
- Assigned work cards only.
- Cards show image, work name, instruction summary, quantity, urgent chip, price/missing-price state.
- Limited detail view repeats own price and full instructions.
- Missing-price state must be visually obvious and actionable.
- History link visible but secondary.

## 5. Components to include

- Worker work list header
- Assigned work card
- Main image thumbnail
- Instruction summary
- Quantity chip
- Own price display
- Missing-price chip
- `แจ้งราคา` action
- Urgent chip
- History link
- Empty state

## 6. Realistic example data

- Work name: `ตู้โชว์ไม้สักแกะลาย`
- Instruction: `ลายดอกพิกุลหน้าบาน`
- Quantity: `1 ชิ้น`
- Own price: `450 บาท/ชิ้น`
- Missing price example: `ไม่มีราคา / ให้แจ้งราคา`
- Second work: `โต๊ะกลางลงรักสมุก`, `ลายเครือเถา`, `2 ชิ้น`

## 7. What not to show

- Do not show Customer data.
- Do not show Order ID.
- Do not show customer phone/address.
- Do not show CRM notes.
- Do not show sales price.
- Do not show other workers' work.
- Do not show internal workflow status controls.
- Do not show admin assignment controls.

## 8. Consistency notes

Preserve the Admin Dashboard visual language at a lighter mobile scale: same chip shapes, same calm palette, same card language. This screen should feel simpler than internal staff screens because Rak Samuk Worker sees only assigned work and limited own-price information. Do not force desktop app-shell navigation into this outsource worker context.
