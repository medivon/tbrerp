# SCR-RS-004 — Rak Samuk Price Approval

## 1. Purpose

The Rak Samuk Price Approval screen lets Owner/Manager review and approve a per-piece `ขอเสนอราคา` from a Rak Samuk Worker for a specific assigned work item.

## 2. Primary Users

- Owner
- Manager

## 3. User Goals

- See which Rak Samuk Work has a worker proposed price.
- Review the worker's proposed per-piece price.
- Approve the proposed price so the work can continue with a payable price.
- Avoid mixing this approval with customer sales price or general workflow movement.

## 4. Entry Points

- Missing-price proposal notification/list.
- Rak Samuk outsource management queue.
- Owner/Manager approval view.

## 5. Exit Points

- Rak Samuk Work continues with approved per-piece price.
- Related Rak Samuk Work detail.
- Product Model standard-rate follow-up when the approver chooses to update future work.

## 6. Layout Structure

- Header: `อนุมัติราคา`.
- Work context: work name, image, quantity, Rak Samuk instruction, worker name.
- Price review: proposed per-piece price, quantity, computed work total for review only.
- Approval action area: approve price and optional approval note.
- Standard-rate follow-up: if linked to a Product Model, always ask whether to update the standard rate.

## 7. Main Components

- Price approval header
- Work preview card
- Worker identity
- Proposed per-piece price summary
- Quantity and computed total preview
- Approval note
- Approve button
- Standard-rate update prompt where applicable
- Activity/Management Log reference

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Page title | อนุมัติราคา | อนุมัติราคา | Proposed Price | Owner/Manager approval label. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Rak Samuk Work / Job | Work context only. |
| Worker | ช่างรักสมุก | ช่างสมชาย | Rak Samuk Worker | The worker who proposed the price. |
| Quantity | จำนวน | 2 ชิ้น | Rak Samuk Work | Used to preview total. |
| Proposed per-piece price | ขอเสนอราคา | 500 บาท/ชิ้น | Proposed Price | The approved value is per piece. |
| Computed total | ยอดรวมจากราคาที่เสนอ | 1,000 บาท | Proposed Price / quantity | Review preview, not the input type. |
| Approval note | หมายเหตุอนุมัติ | ราคาตามรายละเอียด | Proposed Price | Optional. |
| Standard rate | ราคามาตรฐานเดิม | ยังไม่มีราคา | Product Model | Shown only for follow-up context. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Approve price | อนุมัติราคา | Owner / Manager | Rak Samuk Work has approved per-piece price. | Yes |
| Add approval note | เพิ่มหมายเหตุ | Owner / Manager | Adds approval note. | No |
| Open work | เปิดงาน | Owner / Manager | Opens related Rak Samuk Work context. | No |
| Decide standard-rate update | อัปเดตราคามาตรฐาน | Owner / Manager | Updates Product Model standard rate for future work where applicable. | Yes |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Waiting approval | รออนุมัติราคา | Worker submitted a proposed price. | Pending warning chip. |
| Approved | อนุมัติแล้ว | Proposed price is approved for this work. | Positive chip. |
| Standard rate missing | ยังไม่มีราคามาตรฐาน | Product Model has no standard rate. | Follow-up chip. |
| Standard rate differs | ราคาไม่ตรงมาตรฐานเดิม | Proposed/approved price differs from stored standard rate. | Finance follow-up chip. |

## 11. Empty State

Show `ไม่มีรายการรออนุมัติราคา`.

## 12. Error State

- Loading fails: `โหลดรายการอนุมัติราคาไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์อนุมัติราคา`.
- Approval fails: `อนุมัติราคาไม่สำเร็จ`.
- Already approved: `รายการนี้อนุมัติแล้ว`.

## 13. Permission Rules

- Only Owner/Manager can approve proposed Rak Samuk prices.
- Finance pays or creates PV from approved prices; Finance does not approve proposed prices in this flow.
- Rak Samuk Worker cannot approve their own proposed price.
- Internal staff without Owner/Manager/Finance visibility should not see Rak Samuk rates.
- Customer sales price, customer data, and COD/payment audit details are not part of this approval screen.

## 14. UX Notes for Designer

- Use `ขอเสนอราคา`; do not use `ตีโต้` in UI copy.
- Make per-piece price unmistakable; do not ask for total price as the input.
- The computed total can be shown for review, but the approved stored price is per piece.
- Keep workflow movement separate: approving price does not mean receiving work back.
- Keep the standard-rate update decision visibly secondary to the immediate approval.

## 15. Image Generation Prompt

Create a desktop/tablet Owner/Manager approval UI titled "อนุมัติราคา". Show a Rak Samuk Work preview with image, work name "ตู้โชว์ไม้สักแกะลาย", worker "ช่างสมชาย", quantity "2 ชิ้น", proposed per-piece price labeled "ขอเสนอราคา" at "500 บาท/ชิ้น", computed total "1,000 บาท", optional approval note, and primary button "อนุมัติราคา". Include a standard-rate follow-up choice if linked to Product Model. Do not show customer data, sales price, COD amount, or workflow receive-back controls.

## 16. Open UX Questions

- None blocking for this approval screen.
