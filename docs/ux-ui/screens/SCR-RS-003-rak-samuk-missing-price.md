# SCR-RS-003 — Rak Samuk Missing Price

## 1. Purpose

The Rak Samuk Missing Price screen lets a Rak Samuk Worker submit a proposed price only for assigned work where no standard rate exists. It is a narrow worker-facing form, not a finance approval screen.

## 2. Primary Users

- Rak Samuk Worker

## 3. User Goals

- Understand which assigned work has no price.
- Review only the images and instructions needed to propose a price.
- Submit the per-piece price for that specific missing-price work item.
- Avoid seeing customer data, Order ID, sales price, other workers' work, or internal approval details.

## 4. Entry Points

- Rak Samuk Worker Work List item with `ไม่มีราคา / ให้แจ้งราคา`.
- Limited work detail for missing-price assigned work.

## 5. Exit Points

- Rak Samuk Worker Work List.
- Submitted-price waiting state.
- Own work history after the work leaves active list.

## 6. Layout Structure

- Header: `ไม่มีราคา / ให้แจ้งราคา`.
- Work preview: image, work name, quantity, Rak Samuk instruction.
- Price form: proposed per-piece price input and optional short note.
- Guidance text: simple Thai copy explaining this is the worker's proposed per-piece price for this assigned missing-price item.
- Submit area: `ส่งราคา` button and cancel/back.
- Submitted state: shows that price was sent for approval.

## 7. Main Components

- Missing-price header
- Work preview card
- Image viewer
- Instruction panel
- Proposed price input
- Optional note input
- Submit confirmation
- Submitted state
- Error message

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Missing-price title | ไม่มีราคา / ให้แจ้งราคา | ไม่มีราคา / ให้แจ้งราคา | Rak Samuk Work | Main worker-facing state. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Rak Samuk Work / Job | No Customer or Order ID. |
| Main image | รูปงาน | Cabinet detail thumbnail | Department Instruction Images | Needed for price proposal. |
| Rak Samuk instruction | รายละเอียดรักสมุก | ลายดอกพิกุลหน้าบาน | Department Instruction Images | Main work instruction. |
| Quantity | จำนวน | 1 ชิ้น | Rak Samuk Work | Assigned quantity. |
| Proposed price | ราคาที่แจ้งต่อชิ้น | 500 บาท/ชิ้น | Proposed Price | Worker proposal for this missing-price item, not sales price or total job price. |
| Note | หมายเหตุ | ลายละเอียดมาก ใช้เวลานาน | Proposed Price | Optional short explanation. |
| Submitted state | ส่งราคาแล้ว | รออนุมัติ | Proposed Price | Approval handled by finance-permission user elsewhere. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Enter proposed price | กรอกราคาต่อชิ้น | Assigned Rak Samuk Worker | Adds proposed per-piece price for this work item. | No |
| Add note | เพิ่มหมายเหตุ | Assigned Rak Samuk Worker | Adds optional explanation. | No |
| Submit price | ส่งราคา | Assigned Rak Samuk Worker | Sends proposed price for approval. | Yes |
| Cancel/back | กลับ | Assigned Rak Samuk Worker | Returns to work list without submitting. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Missing price | ไม่มีราคา / ให้แจ้งราคา | No standard rate exists for this work. | Strong warning/action chip. |
| Draft proposal | ยังไม่ส่งราคา | Worker entered or has not entered proposed price. | Neutral chip. |
| Submitted | ส่งราคาแล้ว | Proposed price has been sent. | Positive/pending chip. |
| Waiting approval | รออนุมัติ | Finance-permission user must approve. | Pending chip; no finance detail. |
| Has price | มีราคาแล้ว | Item no longer needs proposal. | Disable submit. |

## 11. Empty State

This screen should not open without a specific missing-price work item. If opened without valid work, show `ไม่พบงานที่ต้องแจ้งราคา` and action `กลับไปงานที่ต้องทำ`.

## 12. Error State

- Loading fails: `โหลดรายละเอียดงานไม่สำเร็จ` with retry.
- Permission fails: `บัญชีนี้ไม่มีสิทธิ์แจ้งราคางานนี้`.
- Item already has price: `รายการนี้มีราคาแล้ว`.
- Submit fails: `ส่งราคาไม่สำเร็จ`.
- Invalid price: show field-level message `กรุณากรอกราคา`.

## 13. Permission Rules

- Only the assigned Rak Samuk Worker can submit proposed price for their own missing-price work.
- Worker cannot propose price when a standard rate already exists.
- Worker sees own work price/proposed price only, not sales price.
- Customer data, Order ID, Customer phone/address, CRM notes, other workers' work, and internal approval controls are hidden.
- Finance approval happens outside this worker screen.

## 14. UX Notes for Designer

- Make this feel like a small task, not a finance form.
- Keep image and instruction visible while entering price.
- Label the price as the worker's proposed per-piece work price, never as sales price or total job price.
- After submit, replace the form with a clear `ส่งราคาแล้ว / รออนุมัติ` state.
- Avoid exposing who approves, customer context, or internal costing history.

## 15. Image Generation Prompt

Create a mobile form UI for a Thai Rak Samuk outsource worker submitting a missing price. Header "ไม่มีราคา / ให้แจ้งราคา". Show a work preview card with image, work name "ตู้โชว์ไม้สักแกะลาย", instruction "ลายดอกพิกุลหน้าบาน", quantity 1. Form has fields "ราคาที่แจ้งต่อชิ้น" and "หมายเหตุ", with button "ส่งราคา". Include pending state "ส่งราคาแล้ว / รออนุมัติ". No customer name, no Order ID, no sales price, no admin controls.

## 16. Open UX Questions

- None blocking for this missing-price screen.
