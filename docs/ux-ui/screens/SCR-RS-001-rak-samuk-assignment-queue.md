# SCR-RS-001 — Rak Samuk Assignment Queue

## 1. Purpose

The Rak Samuk Assignment Queue shows work sent from internal departments to `รอระบุ/ส่งรักสมุก`. An internal user with outsource permission assigns each work item to exactly one Rak Samuk Worker in the first scope.

## 2. Primary Users

- User with outsource permission
- Admin with outsource permission
- Higher-permission user
- Finance-permission user only when price visibility/approval is relevant

## 3. User Goals

- See work waiting to be assigned to Rak Samuk.
- Choose one Rak Samuk Worker.
- Confirm what instruction images and quantity are being sent.
- Notice urgent work and missing-price state.
- Avoid showing sales price or unnecessary customer private data.
- Prevent a customer Job from being split across multiple Rak Samuk Workers.

## 4. Entry Points

- Woodwork Job action `ส่งไปรักสมุก`.
- Coloring Job action `ส่งไปรักสมุก`.
- Admin/outsource navigation -> `รอระบุ/ส่งรักสมุก`.

## 5. Exit Points

- Rak Samuk Worker `งานที่ต้องทำ`.
- Job Detail Work Card.
- Internal outsource queue after assignment.

## 6. Layout Structure

- Header: `รอระบุ/ส่งรักสมุก`, waiting count.
- Main content: assignment list/table on desktop/tablet, with image-led rows.
- Detail/assignment panel: selected work preview, Rak Samuk instruction images, quantity, worker selector, missing-price signal.
- Worker selector: list of Rak Samuk Workers with clear choose action.
- Confirmation modal: confirm sending this work to one worker.
- Permission-aware price area: hidden unless user has finance permission; never show sales price.

## 7. Main Components

- Assignment queue header
- Work item row
- Main image thumbnail
- Rak Samuk instruction preview
- Source department chip
- Urgent chip
- Missing-price chip
- Worker selector
- Send confirmation modal
- Permission-aware price indicator

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | รอระบุ/ส่งรักสมุก | รอระบุ/ส่งรักสมุก | Rak Samuk Work | Shared internal queue. |
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Internal users can use Job ID; worker view may hide Order ID. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | Show `งานลูกค้า` or `ผลิตเข้าสต๊อก`. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job / Rak Samuk Work | No sales price. |
| Main image | รูปหลัก | Cabinet thumbnail | Job images | Visual identification. |
| Rak Samuk instruction | รายละเอียดรักสมุก | ลายดอกพิกุลหน้าบาน | Department Instruction Images | Key assignment detail. |
| Quantity | จำนวน | 1 ชิ้น | Rak Samuk Work | Job with multiple pieces appears as one work item if it moves together. |
| Sent from | ส่งมาจาก | ช่างไม้ | Activity Log | Woodwork or Coloring. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Can appear if authorized user set it. |
| Missing price | ไม่มีราคา / ให้แจ้งราคา | ไม่มีราคา | Rak Samuk Standard Rate | Visible as workflow signal. |
| Worker | ช่างรักสมุก | ช่างสมชาย | Rak Samuk Worker | Exactly one worker in first scope. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open work | เปิดงาน | User with outsource permission | Opens selected work preview or Job Detail. | No |
| Choose worker | เลือกช่างรักสมุก | User with outsource permission | Selects one Rak Samuk Worker. | No |
| Send work | ส่งงานให้ช่าง | User with outsource permission | Work appears in selected worker's `งานที่ต้องทำ`. | Yes |
| Change selected worker before send | เปลี่ยนช่าง | User with outsource permission | Updates selected worker before confirmation. | No |
| Open Job | เปิด Job | Internal user with permission | Opens Job Detail Work Card. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Waiting assignment | รอระบุ/ส่งรักสมุก | Work needs worker selection. | Main queue chip. |
| Assigned | ส่งให้ช่างแล้ว | Work has been sent to one worker. | Success chip after confirmation. |
| Missing price | ไม่มีราคา / ให้แจ้งราคา | Standard rate is missing. | Prominent warning chip. |
| Urgent | งานด่วน | Authorized priority label. | Yellow/high-attention chip. |
| Sent from woodwork | จากช่างไม้ | Work came from woodwork. | Source chip. |
| Sent from coloring | จากฝ่ายสี | Work came from coloring. | Source chip. |

## 11. Empty State

Show `ไม่มีงานรอระบุ/ส่งรักสมุก` with no extra explanation.

## 12. Error State

- Loading fails: `โหลดคิวรักสมุกไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ส่งงานรักสมุก`.
- Send fails: `ส่งงานให้ช่างไม่สำเร็จ`.
- Work already assigned by another user: show `งานนี้ถูกส่งให้ช่างแล้ว` and remove from queue after refresh.

## 13. Permission Rules

- Only users with outsource permission can assign Rak Samuk Work.
- Internal staff without finance permission must not see Rak Samuk rates.
- Sales price must never appear on this screen.
- Customer private data should not be shown; use Job/work identity and instruction images.
- One customer Job is assigned to one Rak Samuk Worker in first scope.
- Rak Samuk Worker does not use this screen.

## 14. UX Notes for Designer

- Make worker assignment the main task, not finance review.
- Keep image and Rak Samuk instruction visible while choosing the worker.
- Show missing-price as a workflow signal, but keep rate values permission-aware.
- Use a confirmation modal because sending makes work visible to an outsource worker.
- Do not include customer phone/address, CRM notes, Order payment details, or sales price.

## 15. Image Generation Prompt

Create a desktop/tablet ERP assignment queue for Thai furniture Rak Samuk outsource work. Page title "รอระบุ/ส่งรักสมุก". Show a list of work items with thumbnails, "JOB-O-2568-0042 / งานลูกค้า", work name "ตู้โชว์ไม้สักแกะลาย", quantity, Rak Samuk instruction "ลายดอกพิกุลหน้าบาน", source chip "จากช่างไม้", urgent chip, missing price chip "ไม่มีราคา / ให้แจ้งราคา". Right panel has worker selector "เลือกช่างรักสมุก" and button "ส่งงานให้ช่าง". No sales price, no customer phone/address.

## 16. Open UX Questions

- None blocking for this assignment queue.

