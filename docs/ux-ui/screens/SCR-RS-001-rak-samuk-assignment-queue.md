# SCR-RS-001 — Rak Samuk Worker Selection

## 1. Purpose

Rak Samuk Worker Selection is the send-out step opened from `ส่งไปรักสมุก`. The user must choose exactly one Rak Samuk Worker before confirming; if the worker is not known, the work is not sent to Rak Samuk.

## 2. Primary Users

- Woodwork / Coloring where allowed
- Admin/Sales
- Manager / Owner

## 3. User Goals

- Choose one Rak Samuk Worker.
- Confirm what instruction images and quantity are being sent.
- Notice urgent work and missing-price state.
- Avoid showing sales price or unnecessary customer private data.
- Prevent a customer Job from being split across multiple Rak Samuk Workers.

## 4. Entry Points

- Woodwork Job action `ส่งไปรักสมุก`.
- Coloring Job action `ส่งไปรักสมุก`.
- Admin/Sales or Manager/Owner Job action `ส่งไปรักสมุก`.

## 5. Exit Points

- Rak Samuk Worker `งานที่ต้องทำ`.
- Job Detail Work Card.

## 6. Layout Structure

- Header: `เลือกช่างรักสมุก`.
- Main content: selected work preview with Rak Samuk instruction images, quantity, worker selector, and missing-price signal.
- Worker selector: list of Rak Samuk Workers with clear choose action.
- Confirmation modal: confirm sending this work to one worker.
- Price area: do not show Rak Samuk standard rate or Rak Samuk work price here; show only missing-price workflow signal where needed.

## 7. Main Components

- Worker selection header
- Selected work preview
- Main image thumbnail
- Rak Samuk instruction preview
- Source department chip
- Urgent chip
- Missing-price chip
- Worker selector
- Send confirmation modal
- Missing-price indicator

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Screen title | เลือกช่างรักสมุก | เลือกช่างรักสมุก | Rak Samuk Work | Worker must be chosen before send. |
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Internal users can use Job ID; worker view may hide Order ID. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | Show `งานลูกค้า` or `ผลิตเข้าสต๊อก`. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job / Rak Samuk Work | No sales price. |
| Main image | รูปหลัก | Cabinet thumbnail | Job images | Visual identification. |
| Rak Samuk instruction | รายละเอียดรักสมุก | ลายดอกพิกุลหน้าบาน | Department Instruction Images | Key assignment detail. |
| Quantity | จำนวน | 1 ชิ้น | Rak Samuk Work | Job with multiple pieces appears as one work item if it moves together. |
| Sent from | ส่งมาจาก | ช่างไม้ | Activity Log | Woodwork or Coloring. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Can appear if authorized user set it. |
| Missing price | ไม่มีราคา / ให้แจ้งราคา | ไม่มีราคา | Rak Samuk Standard Rate | Visible as workflow signal only; do not show rate value. |
| Worker | ช่างรักสมุก | ช่างสมชาย | Rak Samuk Worker | Exactly one worker in first scope. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open work | เปิดงาน | Allowed sender | Opens selected work preview or Job Detail. | No |
| Choose worker | เลือกช่างรักสมุก | Allowed sender | Selects one Rak Samuk Worker. | No |
| Send work | ส่งงานให้ช่าง | Allowed sender | Work appears in selected worker's `งานที่ต้องทำ`. | Yes |
| Change selected worker before send | เปลี่ยนช่าง | Allowed sender | Updates selected worker before confirmation. | No |
| Open Job | เปิด Job | Internal user with permission | Opens Job Detail Work Card. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Assigned | ส่งให้ช่างแล้ว | Work has been sent to one worker. | Success chip after confirmation. |
| Missing price | ไม่มีราคา / ให้แจ้งราคา | Standard rate is missing. | Prominent warning chip. |
| Urgent | งานด่วน | Authorized priority label. | Yellow/high-attention chip. |
| Sent from woodwork | จากช่างไม้ | Work came from woodwork. | Source chip. |
| Sent from coloring | จากฝ่ายสี | Work came from coloring. | Source chip. |

## 11. Empty State

No empty state is needed for the send modal. If no active Rak Samuk Worker is selectable, block send and show `ไม่มีช่างรักสมุกที่เลือกได้`.

## 12. Error State

- Loading fails: `โหลดคิวรักสมุกไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ส่งงานรักสมุก`.
- Send fails: `ส่งงานให้ช่างไม่สำเร็จ`.
- Work already assigned by another user: show `งานนี้ถูกส่งให้ช่างแล้ว` and remove from queue after refresh.

## 13. Permission Rules

- Woodwork/Coloring, Admin/Sales, Manager, and Owner can send work to Rak Samuk where allowed by workflow.
- A Rak Samuk Worker must be selected before send.
- Internal staff without Owner/Manager/Finance visibility must not see Rak Samuk rates.
- Sales price must never appear on this screen.
- Rak Samuk price must never appear on Order, Production, or Job workflow pages, including this send step.
- Customer private data should not be shown; use Job/work identity and instruction images.
- One customer Job is assigned to one Rak Samuk Worker in first scope.
- Rak Samuk Worker does not use this screen.

## 14. UX Notes for Designer

- Make worker selection the main task, not finance review.
- Keep image and Rak Samuk instruction visible while choosing the worker.
- Show missing-price as a workflow signal, but keep all rate values out of this screen.
- Use a confirmation modal because sending makes work visible to an outsource worker.
- Do not include customer phone/address, CRM notes, Order payment details, or sales price.

## 15. Image Generation Prompt

Create a desktop/tablet ERP worker-selection modal for Thai furniture Rak Samuk outsource work. Page title "เลือกช่างรักสมุก". Show the selected work with thumbnail, "JOB-O-2568-0042 / งานลูกค้า", work name "ตู้โชว์ไม้สักแกะลาย", quantity, Rak Samuk instruction "ลายดอกพิกุลหน้าบาน", source chip "จากช่างไม้", urgent chip, missing price chip "ไม่มีราคา / ให้แจ้งราคา". Right side has worker selector "เลือกช่างรักสมุก" and primary button "ส่งงานให้ช่าง". No Rak Samuk price, no sales price, no customer phone/address.

## 16. Open UX Questions

- None blocking for this worker-selection step.
