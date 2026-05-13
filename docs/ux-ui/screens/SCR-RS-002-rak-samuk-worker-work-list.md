# SCR-RS-002 — Rak Samuk Worker Work List

## 1. Purpose

The Rak Samuk Worker Work List shows an outsource worker only their assigned Rak Samuk Work. It reduces repeated questions while keeping customer, Order, sales, and internal workflow information hidden.

## 2. Primary Users

- Rak Samuk Worker

## 3. User Goals

- See only assigned work.
- Identify each work item by image, work name, quantity, and Rak Samuk instructions.
- See own work price only where allowed.
- Notice when an item has `ไม่มีราคา / ให้แจ้งราคา`.
- Submit a proposed price only for missing-price items.
- Avoid seeing customer data, Order ID, sales price, other workers' work, or internal workflow controls.

## 4. Entry Points

- Rak Samuk Worker login.
- Rak Samuk Worker navigation -> `งานที่ต้องทำ`.
- Return from Missing-price Proposal.

## 5. Exit Points

- Rak Samuk Missing Price screen.
- Rak Samuk Worker History `ประวัติการทำงาน`.
- Work detail view in limited worker mode.

## 6. Layout Structure

- Header: `งานที่ต้องทำ`, worker name/account, count of assigned active work.
- Main content: mobile-first list of assigned work cards.
- Work card: main image, work name, quantity, Rak Samuk instruction summary, urgent chip if any, own price/missing-price state.
- Card action: open work detail or `แจ้งราคา` when missing price.
- Secondary tab/link: `ประวัติการทำงาน`.
- No sidebar on mobile; use simple bottom or top navigation.

## 7. Main Components

- Worker work list header
- Assigned work card
- Main image thumbnail
- Instruction summary
- Quantity chip
- Own price display
- Missing-price chip
- Proposed-price action
- Urgent chip
- History link
- Empty state

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Page title | งานที่ต้องทำ | งานที่ต้องทำ | Rak Samuk Work | Worker-facing label. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Rak Samuk Work / Job | Do not show Customer or Order ID. |
| Main image | รูปงาน | Cabinet detail thumbnail | Department Instruction Images | Needed to understand work. |
| Rak Samuk instruction | รายละเอียดรักสมุก | ลายดอกพิกุลหน้าบาน | Department Instruction Images | Main instruction content. |
| Quantity | จำนวน | 1 ชิ้น | Rak Samuk Work | Assigned quantity. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Can appear if set. |
| Own price | ราคางานของฉัน | 450 บาท/ชิ้น | Rak Samuk Work / Standard Rate | Own work price only; not sales price. |
| Missing price | ไม่มีราคา / ให้แจ้งราคา | ไม่มีราคา | Rak Samuk Standard Rate | Worker can propose price only in this state. |
| Work state | สถานะงาน | กำลังทำ | Rak Samuk Work | Worker-facing state only, not internal workflow controls. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open work | เปิดงาน | Assigned Rak Samuk Worker | Opens limited work detail. | No |
| Propose price | แจ้งราคา | Assigned Rak Samuk Worker, only missing-price item | Opens Missing-price Proposal. | No |
| Submit proposed price | ส่งราคา | Assigned Rak Samuk Worker, only missing-price item | Sends proposed price for approval. | Yes |
| Open history | ประวัติการทำงาน | Rak Samuk Worker | Opens own work history. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Assigned | งานที่ต้องทำ | Work assigned to this worker. | Main active chip. |
| Missing price | ไม่มีราคา / ให้แจ้งราคา | No standard rate; worker may propose price. | Strong warning/action chip. |
| Has own price | มีราคาแล้ว | Worker can see own work price. | Neutral/positive chip. |
| Urgent | งานด่วน | Authorized priority label. | Yellow/high-attention chip. |
| Returned | รับงานกลับแล้ว | Internal team has received work back. | History state, not active workflow control. |
| Paid | จ่ายแล้ว | Worker's own payout history state. | Only in history/summary where allowed. |

## 11. Empty State

Show `ยังไม่มีงานที่ต้องทำ` with a secondary link `ดูประวัติการทำงาน`.

## 12. Error State

- Loading fails: `โหลดงานไม่สำเร็จ` with retry.
- Permission fails: `บัญชีนี้ไม่มีสิทธิ์ดูงานนี้`.
- Price proposal unavailable: `รายการนี้มีราคาแล้ว ไม่ต้องแจ้งราคา`.
- Submit price fails: `ส่งราคาไม่สำเร็จ`.

## 13. Permission Rules

- Rak Samuk Worker sees only their own assigned work.
- Rak Samuk Worker must not see Customer data, Order ID, Customer phone/address, CRM notes, sales price, other workers' work, or internal workflow status controls.
- Rak Samuk Worker can see own price only for own work.
- Rak Samuk Worker can propose price only when standard rate is missing.
- Rak Samuk Worker cannot mark work complete and cannot move workflow status.
- Worker cannot print/download payout in first scope.

## 14. UX Notes for Designer

- Mobile-first: most Rak Samuk workers will likely use a phone.
- Keep the screen very simple: image, instruction, quantity, own price/missing price.
- Use `ไม่มีราคา / ให้แจ้งราคา` as an obvious action state.
- Avoid internal words like Order ID, Customer, payment audit, sales price, or workflow routing.
- Do not show assignment controls; the worker only views assigned work and proposes price when allowed.

## 15. Image Generation Prompt

Create a mobile work list UI for an outsourced Thai Rak Samuk craft worker. Title "งานที่ต้องทำ". Show simple cards with furniture detail images, work name "ตู้โชว์ไม้สักแกะลาย", instruction "ลายดอกพิกุลหน้าบาน", quantity 1, urgent chip "งานด่วน", and own price state "450 บาท/ชิ้น" or warning "ไม่มีราคา / ให้แจ้งราคา" with button "แจ้งราคา". No customer names, no Order ID, no sales price, no internal admin controls.

## 16. Open UX Questions

- None blocking for this worker list.

