# SCR-COLOR-001 — Coloring Intake Queue

## 1. Purpose

The Coloring Intake Queue shows work physically waiting to be received into the coloring department. It separates `รอรับเข้าโรงงานสี` from active coloring work so the team does not confuse waiting intake with work already accepted by coloring.

## 2. Primary Users

- Coloring Department
- Head of Coloring
- Higher-permission user acting on behalf with log

## 3. User Goals

- See work waiting to enter the color workshop.
- Confirm intake with `รับเข้าโรงงานสี`.
- Identify urgent or old waiting items.
- Review enough image and instruction detail before intake.
- Avoid customer private data, Order ID, and sales price.

## 4. Entry Points

- Coloring department navigation -> `รอรับเข้าโรงงานสี`.
- Work sent from Woodwork by `ส่งไปสี`.
- Work returned from Rak Samuk and routed to coloring intake.

## 5. Exit Points

- Coloring Work Queue after `รับเข้าโรงงานสี`.
- Job Detail Work Card.
- Coloring navigation.

## 6. Layout Structure

- Header: `รอรับเข้าโรงงานสี`, waiting count, simple refresh state.
- Intake explanation strip: short label that this is not active coloring work yet.
- Main content: touch-friendly cards grouped by arrival date or urgency.
- Job card: thumbnail, Job ID, source label, work name, quantity, sender/source, urgent chip, arrival age.
- Primary action: `รับเข้าโรงงานสี` on card or detail view.
- Mobile behavior: cards with large action button; no dense table.

## 7. Main Components

- Intake queue header
- Intake state chip
- Job card preview
- Main image thumbnail
- Source badge
- Sender/source chip
- Urgent chip
- Waiting age chip
- Intake action button
- Empty state

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | รอรับเข้าโรงงานสี | รอรับเข้าโรงงานสี | Waiting for Coloring Intake | Separate from active Coloring Queue. |
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Show source prefix. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | Use code and readable label where space allows. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job | No customer private data. |
| Main image | รูปหลัก | Cabinet thumbnail | Job / Department Instruction Images | Visual identification. |
| Quantity | จำนวน | 1 ชิ้น | Job | Display only. |
| Sent from | ส่งมาจาก | ช่างไม้ | Activity Log | Could also be รักสมุก when returned. |
| Arrival age | รอมานาน | 1 วัน | Activity Log | Time since waiting for intake. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Strongly visible. |
| Coloring note | หมายเหตุฝ่ายสี | สีโอ๊คเข้ม เคลือบด้าน | Department Instruction Images / Job note | Short preview only. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Job | เปิดงาน | Coloring Department | Opens Job Detail Work Card. | No |
| Receive into coloring | รับเข้าโรงงานสี | Coloring / Head of Coloring | Moves work to active Coloring Work Queue. | Yes |
| Receive on behalf | รับเข้าแทน | Higher-permission user | Moves work to active Coloring Queue with log. | Yes |
| Return to coloring queue | ไปงานที่ต้องทำ | Coloring Department | Opens active Coloring Work Queue. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Waiting intake | รอรับเข้าโรงงานสี | Work is waiting to be received physically. | Distinct intake chip. |
| Urgent | งานด่วน | Authorized priority label. | Yellow/high-attention chip. |
| Sent from woodwork | จากช่างไม้ | Sent by woodwork. | Source/destination chip. |
| Returned from Rak Samuk | จากรักสมุก | Returned from outsource route. | Source/destination chip. |
| Received | รับเข้าโรงงานสีแล้ว | Work moved to active Coloring Queue. | Appears after action or in toast. |

## 11. Empty State

Show `ไม่มีงานรอรับเข้าโรงงานสี` with secondary action `ดูงานที่ต้องทำ`.

## 12. Error State

- Loading fails: `โหลดคิวรอรับเข้าโรงงานสีไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์รับเข้าโรงงานสี`.
- Intake action fails: `รับเข้าโรงงานสีไม่สำเร็จ`.
- Work already received by another user: show `งานนี้รับเข้าโรงงานสีแล้ว` and remove from queue after refresh.

## 13. Permission Rules

- Coloring users can see intake work relevant to coloring.
- Higher-permission users can receive on behalf with log.
- Customer private data, Order ID, Customer phone/address, CRM notes, sales price, payment data, and Rak Samuk payout/rates are hidden.
- Workers see limited timeline relevant to their department.

## 14. UX Notes for Designer

- Make this visibly different from `งานที่ต้องทำ`; intake is a staging state.
- Use `รับเข้าโรงงานสี` as the dominant action.
- Keep cards image-led and touch-friendly.
- Do not include editing controls for Job master data.
- Show sender/source so coloring understands where the work came from.

## 15. Image Generation Prompt

Create a tablet/mobile ERP queue screen for a Thai furniture coloring department. Title "รอรับเข้าโรงงานสี". Show large cards with furniture thumbnails, Job ID "JOB-O-2568-0042", label "งานลูกค้า", work name "ตู้โชว์ไม้สักแกะลาย", quantity, sender chip "จากช่างไม้", urgent chip "งานด่วน", and a large button "รับเข้าโรงงานสี". Make it clear this is not active coloring work yet. No customer data, no Order ID, no prices.

## 16. Open UX Questions

- None blocking for this intake queue.
