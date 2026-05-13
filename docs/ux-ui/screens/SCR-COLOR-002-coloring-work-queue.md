# SCR-COLOR-002 — Coloring Work Queue

## 1. Purpose

The Coloring Work Queue is the simple active work list for the coloring and decorating department. It shows Jobs already received into the color workshop and ready for coloring action.

## 2. Primary Users

- Coloring Department
- Head of Coloring
- Higher-permission user acting on behalf when needed

## 3. User Goals

- See active coloring/decorating Jobs only.
- Identify each Job by image, source label, work name, quantity, and color/decor instructions.
- Notice urgent, blocked, or near-delivery work.
- Open the Job work card and take allowed coloring actions.
- Avoid customer private data, payment data, and sales price.

## 4. Entry Points

- Coloring department navigation -> `งานที่ต้องทำ`.
- Coloring Intake Queue after `รับเข้าโรงงานสี`.
- Return from Job Detail Work Card.

## 5. Exit Points

- Job Detail Work Card.
- Rak Samuk assignment flow after `ส่งไปรักสมุก`.
- Admin `รอสร้างรอบจัดส่ง` after `งานเสร็จ/พร้อมส่ง` for `JOB-O`.
- Coloring History.

## 6. Layout Structure

- Header: `งานที่ต้องทำ`, active count, link/chip to `รอรับเข้าโรงงานสี`.
- Top filter strip: `ทั้งหมด`, `งานด่วน`, `รอวัตถุดิบ`, source type if useful.
- Main content: image-led cards for tablet/mobile.
- Job card: thumbnail, Job ID, source label, work name, quantity, current status, urgent chip, delivery date, brief color instruction.
- Action area: primary action opens the work card; optional quick actions for common statuses if safe.
- Secondary link: `ประวัติงานของฉัน`.

## 7. Main Components

- Active queue header
- Intake queue link
- Job card preview
- Main image thumbnail
- Source badge
- Coloring instruction preview
- Urgent chip
- Waiting materials chip
- Delivery date chip
- Role action shortcut
- Empty state

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | งานที่ต้องทำ | งานที่ต้องทำ | Coloring Queue | Active coloring work only. |
| Intake count | รอรับเข้าโรงงานสี | 3 | Waiting for Coloring Intake | Link, not mixed into active list. |
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Show source prefix. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | Use readable label. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job | No customer private data. |
| Main image | รูปหลัก | Cabinet thumbnail | Job / Department Instruction Images | Visual identification. |
| Quantity | จำนวน | 1 ชิ้น | Job | Display only. |
| Current status | สถานะ | รับเข้าโรงงานสีแล้ว | Job workflow | Coloring-relevant status. |
| Coloring instruction | รายละเอียดฝ่ายสี/ตกแต่ง | สีโอ๊คเข้ม เคลือบด้าน | Department Instruction Images / Job note | Short preview only. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Strongly visible. |
| Delivery date | วันจัดส่ง | 20 พ.ค. 2569 | Job / Order | Show if relevant. |
| Department age | ค้างในแผนก | 2 วัน | Job workflow | From coloring receive time. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Job | เปิดงาน | Coloring Department | Opens Job Detail Work Card. | No |
| Accept work | รับงาน | Coloring Department | Marks work accepted by coloring. | No |
| Waiting materials | รอวัตถุดิบ | Coloring Department | Marks department-level blocker. | Yes |
| Send to Rak Samuk | ส่งไปรักสมุก | Coloring Department where allowed | Sends work to `รอระบุ/ส่งรักสมุก`. | Yes |
| Mark ready | งานเสร็จ/พร้อมส่ง | Coloring Department | Sends completed `JOB-O` to admin `รอสร้างรอบจัดส่ง`. | Yes |
| Open intake queue | รอรับเข้าโรงงานสี | Coloring Department | Opens intake queue. | No |
| Open history | ประวัติงานของฉัน | Coloring Department | Opens coloring history. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active coloring | งานที่ต้องทำ | Job is active in Coloring Queue. | Main active chip. |
| Waiting materials | รอวัตถุดิบ | Coloring is blocked by missing materials. | Warning chip, distinct from Hold. |
| Hold | Hold | Admin-level Job pause. | Strong pause chip. |
| Urgent | งานด่วน | Authorized priority label. | Yellow/high-attention chip. |
| Ready for Shipment | งานเสร็จ/พร้อมส่ง | `JOB-O` will go to admin `รอสร้างรอบจัดส่ง`. | Positive chip after action. |
| Sent to Rak Samuk | ส่งไปรักสมุก | Work leaves active coloring queue for outsource assignment. | Destination chip. |

## 11. Empty State

Show `ไม่มีงานที่ต้องทำในฝ่ายสีตอนนี้`. If there are intake items, show a clear action `ดูรอรับเข้าโรงงานสี`.

## 12. Error State

- Loading fails: `โหลดงานฝ่ายสีไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูคิวฝ่ายสี`.
- Action fails: show specific message such as `งานเสร็จ/พร้อมส่งไม่สำเร็จ`.
- Work moved by another user: show `งานนี้ถูกส่งต่อแล้ว` and refresh the list.

## 13. Permission Rules

- Coloring users see active work relevant to coloring only.
- Customer private data, Customer phone/address, CRM notes, payment data, sales price, and Rak Samuk payout/rates are hidden.
- Workers see limited timeline relevant to their own work.
- Higher-permission users may act on behalf with log where allowed.
- Completed `JOB-O` must go to admin `รอสร้างรอบจัดส่ง`, not directly to delivery.

## 14. UX Notes for Designer

- Keep this as a simple operational list, matching the Woodwork pattern.
- Make `รอรับเข้าโรงงานสี` available but visually separate.
- Put color/decor instruction preview on the card, not long notes.
- Use strong visual treatment for `งานด่วน` and abnormal statuses.
- Keep action labels large and clear for tablet/mobile.
- Do not show customer or sales information.

## 15. Image Generation Prompt

Create a tablet/mobile ERP work queue UI for a Thai furniture coloring department. Title "งานที่ต้องทำ" with a small link "รอรับเข้าโรงงานสี". Show image cards for jobs with "JOB-O-2568-0042 / งานลูกค้า", work name "ตู้โชว์ไม้สักแกะลาย", color instruction "สีโอ๊คเข้ม เคลือบด้าน", quantity, urgent chip, delivery date, and action buttons "รับงาน", "รอวัตถุดิบ", "ส่งไปรักสมุก", "งานเสร็จ/พร้อมส่ง". No customer data, no prices. Practical shop-floor UI.

## 16. Open UX Questions

- None blocking for this active coloring queue.
