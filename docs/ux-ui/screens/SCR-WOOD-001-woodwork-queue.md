# SCR-WOOD-001 — Woodwork Queue

## 1. Purpose

The Woodwork Queue is the simple mobile/tablet work list for the woodwork department. It shows only Jobs that currently need woodwork action, with enough visual and instruction detail for workers to choose the next step.

## 2. Primary Users

- Woodwork Department
- Head of woodwork, if assigned
- Higher-permission user acting on behalf when needed

## 3. User Goals

- See current woodwork tasks quickly.
- Identify each Job by image, Job ID, source label, product/work name, and quantity.
- Notice urgent or abnormal work.
- Open the Job work card to review instructions.
- Take only woodwork actions.
- Avoid customer private data, payment data, and sales prices.

## 4. Entry Points

- Woodwork department navigation.
- Login landing page for woodwork users.
- Return from Job Detail Work Card.
- Return from `ประวัติงานของฉัน`.

## 5. Exit Points

- Job Detail Work Card.
- Rak Samuk assignment flow after `ส่งไปรักสมุก`.
- Coloring intake flow after `ส่งไปสี`.
- Woodwork Job History.

## 6. Layout Structure

- Header: `งานที่ต้องทำ`, active count, simple refresh state.
- Top filter strip: compact chips for `ทั้งหมด`, `งานด่วน`, `รอวัตถุดิบ`, and source type if useful.
- Main content: large touch-friendly job cards, not a dense desktop table.
- Job card: thumbnail, Job ID, source label, work name, quantity, urgent/status chips, delivery date if relevant, and primary action/open target.
- Bottom navigation or secondary link: `ประวัติงานของฉัน`.
- Mobile behavior: one-card-per-row, large image, large tap target, no horizontal scrolling.

## 7. Main Components

- Mobile queue header
- Job work card preview
- Main image thumbnail
- Source badge
- Urgent chip
- Waiting materials chip
- Delivery date chip
- Department action shortcut
- History link
- Empty state

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | งานที่ต้องทำ | งานที่ต้องทำ | Woodwork Queue | Main screen label. |
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Show source prefix. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | Use `งานลูกค้า` or `ผลิตเข้าสต๊อก`; never color-only. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job | No customer private data. |
| Main image | รูปหลัก | Cabinet thumbnail | Job / Department Instruction Images | Primary visual identifier. |
| Quantity | จำนวน | 1 ชิ้น | Job | Job may include multiple pieces only if they move together. |
| Current status | สถานะ | รอรับงาน | Job workflow | Woodwork-relevant only. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Show strongly. |
| Delivery date | วันจัดส่ง | 20 พ.ค. 2569 | Job / Order | Show if relevant; not a customer detail. |
| Department age | ค้างในแผนก | 3 วัน | Job workflow | Helps prioritize. |
| Instruction summary | รายละเอียดสั้น | ทำบานคู่ ขอบโค้ง | Department Instruction Images / Job note | Keep short in queue; full details on work card. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Job | เปิดงาน | Woodwork Department | Opens Job Detail Work Card. | No |
| Accept work | รับงาน | Woodwork Department | Marks work accepted by woodwork. | No |
| Waiting materials | รอวัตถุดิบ | Woodwork Department | Marks department-level blocker. | Yes |
| Send to coloring | ส่งไปสี | Woodwork Department | Removes work from active Woodwork Queue and sends to coloring intake. | Yes |
| Send to Rak Samuk | ส่งไปรักสมุก | Woodwork Department | Removes work from active queue and sends to `รอระบุ/ส่งรักสมุก`. | Yes |
| Send to carving | กำลังส่งไปแกะสลัก | Woodwork Department | Marks carving handoff note/status for first flow. | Yes |
| Open history | ประวัติงานของฉัน | Woodwork Department | Opens woodwork history. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Waiting receive | รอรับงาน | Job is in woodwork queue but not accepted. | Neutral action-needed chip. |
| In progress | กำลังทำ | Woodwork accepted the job. | Active chip. |
| Waiting materials | รอวัตถุดิบ | Work is blocked by missing materials. | Warning chip, distinct from Hold. |
| Hold | Hold | Admin-level Job pause. | Strong pause chip; visible in list. |
| Urgent | งานด่วน | Authorized priority label. | Yellow/high-attention chip with icon. |
| Sent onward | ส่งต่อแล้ว | Work has left active woodwork queue. | Appears in history, not active list. |

## 11. Empty State

Show `ไม่มีงานที่ต้องทำตอนนี้` with a secondary link `ดูประวัติงานของฉัน`. Do not show explanatory ERP text.

## 12. Error State

- Loading fails: `โหลดงานช่างไม้ไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูคิวช่างไม้`.
- Action fails: show the specific failed action, such as `ส่งไปสีไม่สำเร็จ`.
- Work already moved by another user: show `งานนี้ถูกส่งต่อแล้ว` and remove it from active list after refresh.

## 13. Permission Rules

- Woodwork users see only work needed for woodwork.
- Woodwork users do not see customer private data, Customer phone/address, CRM notes, payment data, sales price, or Rak Samuk payout/rates.
- Woodwork users see limited timeline relevant to their own work only.
- Higher-permission users may act on behalf with log where allowed.
- Owner is not an exclusive assignment lock for shared department work.

## 14. UX Notes for Designer

- This screen must feel usable with dusty hands on a tablet or phone.
- Cards should be large, image-led, and easy to tap.
- Keep text short; full instructions live in the Job Detail Work Card.
- Use Thai action labels exactly where confirmed.
- Make `รอวัตถุดิบ` visible in the main list, not hidden in another tab.
- Do not include customer name, phone, address, sales price, payment state, or CRM data.

## 15. Image Generation Prompt

Create a mobile/tablet ERP work queue UI for Thai furniture woodworkers. Page title "งานที่ต้องทำ". Show large image cards for jobs such as "JOB-O-2568-0042 / งานลูกค้า / ตู้โชว์ไม้สักแกะลาย", quantity, urgent chip "งานด่วน", delivery date, and status "รอรับงาน". Include simple action buttons "รับงาน", "รอวัตถุดิบ", "ส่งไปสี", "ส่งไปรักสมุก". No customer names, no phone numbers, no prices. Practical shop-floor UI, large touch targets, clean neutral design.

## 16. Open UX Questions

- None blocking for this queue.

