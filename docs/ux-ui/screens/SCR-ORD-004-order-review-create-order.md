# SCR-ORD-004 - Order Review / Create Order

Approved mockup:

- `docs/ux-ui/mockups/SCR-ORD-004-order-review-create-order/SCR-ORD-004-approved.png`

## 1. Purpose

Order Review / Create Order is the final admin review screen before issuing a real Order ID. It reviews the current Order Create/Edit data, whether or not that data has previously been saved as a Draft Order.

This screen must show clearly that pressing `ยืนยันสร้างออเดอร์` will create the real Order, reserve ready-stock lines, create `JOB-O` for complete custom lines, and still not create shipment rounds.

## 2. Primary Users

- Admin
- Sales/admin user with Order creation permission
- Draft creator
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Review Customer, recipient/address, Order Lines, Payment Term, Payment Record, shipment plan, and custom-work details in one place.
- Understand exactly what the system will create after confirmation.
- Resolve warning/acknowledgement cases that affect confirmation, especially stock-insufficient ready-stock lines.
- Confirm selected ready-stock Product Model, color/SKU Variant, SKU code, display image, and stock warning state before issuing the real Order.
- Confirm Order creation only when the data is ready.

## 4. Entry Points

- Order Create/Edit -> `สร้างออเดอร์`.
- Draft Order Queue -> existing draft -> Order Create/Edit -> `สร้างออเดอร์`.

## 5. Exit Points

- Confirmed Order Detail after `ยืนยันสร้างออเดอร์`.
- Back to Order Create/Edit after `กลับ`.
- Draft Order Queue after `บันทึกร่าง`.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `ออเดอร์`.
- Header: `ตรวจสอบก่อนสร้างออเดอร์`, readiness status, and warning summary.
- Do not show Draft No. on this screen.
- Main content: detailed row/card review sections for Customer, address, payment, shipment plan, ready-stock lines, and custom-work lines.
- Ready-stock section: shows only if ready-stock lines exist.
- Custom-work section: shows only if custom-work lines exist.
- Right confirmation panel: `ผลหลังยืนยันสร้างออเดอร์`.
- Bottom or right action area: `ยืนยันสร้างออเดอร์`, `กลับ`, `บันทึกร่าง`.
- Inline warning/acknowledgement area appears before the final action when needed.

## 7. Main Components

- Admin app shell
- Review header
- Readiness checklist
- Customer review block
- Recipient/address review block
- Ready-stock row/card section
- Custom-work row/card section
- Shipment plan review
- Payment review block
- Inline warning / acknowledgement block
- Downstream result panel
- Final confirmation button

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Review status | สถานะตรวจสอบ | พร้อมสร้างออเดอร์ | Order validation | Positive but not final. |
| Customer | ลูกค้า | คุณมาลี | Customer | Review only. |
| Recipient | ผู้รับสินค้า | คุณภพ | Address Entry / Order Recipient Detail | Saved as the Order recipient snapshot after confirmation. |
| Address | ที่อยู่จัดส่ง | 99/12 ถ.เจริญกรุง กรุงเทพฯ | Address Entry / Order Recipient Detail | Later Customer address changes do not rewrite this Order. |
| Ready-stock line | สินค้าพร้อมส่ง | ชุดเก้าอี้ไม้สักพร้อมส่ง | Order Line | Will reserve stock after confirmation. |
| Product Model | SKU หลัก | โต๊ะข้างไม้สัก | Product Model snapshot | Snapshot from selected ready-stock line. |
| SKU Variant / color | สี / SKU ย่อย | สีโอ๊คเข้ม / TBR-TBL-123-OAK | SKU Variant snapshot | Snapshot from selected ready-stock line. |
| Display image | รูปสินค้า | Product/color thumbnail | Product Model / SKU Variant snapshot | Use SKU Variant image if present; otherwise Product Model fallback. |
| Sellable stock check | ขายได้ | 2 ชิ้น / หมด / -1 | Latest stock check | Rechecked on Review before confirmation. |
| Custom line | งานสั่งทำ | ตู้โชว์ไม้สักแกะลาย | Order Line | Will create `JOB-O` after confirmation. |
| Shipment intent | แผนจัดส่ง | ส่งพร้อมกัน | Order Shipment Plan | Shown when mixed line types exist; actual split shipment is handled later by selected ready lines. |
| Quantity | จำนวน | 4 ชิ้น | Order Line | Review only. |
| Price | ราคา | 18,000 บาท | Order Line | Sales amount only, not cost/profit. |
| Payment Term | เงื่อนไขการชำระเงิน | มัดจำ 50% ก่อนเริ่มงาน | Payment Term | Required before confirm. |
| Payment Record | รายการรับเงิน | รับมัดจำแล้ว 19,000 บาท | Payment Record | Optional; shown if entered and does not block `JOB-O`. |
| Custom detail | รายละเอียดงานสั่งทำ | สีโอ๊คเข้ม / ลายรักสมุก | Custom Work Detail | Must be complete enough to create `JOB-O`. |
| Downstream result | ผลหลังสร้าง | จองสต๊อก / สร้าง JOB-O | System preview | Must be clear before confirm. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Confirm create Order | ยืนยันสร้างออเดอร์ | Admin / permitted sales | Issues real Order ID and triggers downstream work. | No extra modal |
| Back to edit | กลับ | Admin / permitted sales | Returns to Order Create/Edit with current data. | No |
| Save draft | บันทึกร่าง | Admin / permitted sales | Creates/updates saved Draft Order and returns to `ร่างออเดอร์` tab. | No |
| Open customer | เปิดข้อมูลลูกค้า | Admin with permission | Opens Customer Detail from customer section if needed. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Ready to create | พร้อมสร้างออเดอร์ | Required data is complete enough to confirm. | Positive chip. |
| Needs stock acknowledgement | ต้องรับทราบคำเตือน | A stock warning must be fixed or acknowledged before confirmation. | Blocking warning area. |
| Sold out | หมด | Selected SKU Variant currently has `ขายได้` equal to 0. | Warning area. |
| Quantity exceeds sellable stock | จำนวนเกินที่ขายได้ | Selected quantity is higher than current `ขายได้`. | Warning area. |
| Ready-stock result | จะจองสต๊อก | Ready-stock line will reserve stock after Order creation. | Green/blue chip. |
| Custom Job result | จะสร้าง JOB-O | Custom line will create customer Job after Order creation. | Blue/purple chip. |
| Shipment not created | ยังไม่สร้างรอบจัดส่ง | Shipment comes later from ready-to-ship queue or Order Detail. | Neutral note. |
| Payment context | รายการรับเงิน | Payment Record exists or is absent. | Context only; not a `JOB-O` gate. |

## 11. Empty State

No empty state. This screen is only reachable from Order Create/Edit with enough data to review.

## 12. Error / Warning State

- Confirmation fails: `สร้างออเดอร์ไม่สำเร็จ` with retry.
- Required data changed: `ข้อมูลมีการเปลี่ยนแปลง กรุณาตรวจสอบอีกครั้ง`.
- Permission fails: `ไม่มีสิทธิ์สร้างออเดอร์`.
- Stock insufficient warning: show warning, block confirmation until fixed or acknowledged by a user with Order create/confirm permission. No manager approval or reason field is required for this stock warning; log the acknowledgement. If acknowledged, the stock reservation may make stock go negative.
- Sold out / quantity exceeds `ขายได้`: show the specific warning text from Order Create/Edit, recheck latest stock, and require acknowledgement only when the latest stock still does not cover the selected quantity.
- If stock was insufficient in Draft/Edit but is sufficient at Review time, remove the warning automatically.
- Missing Payment Record: show as context only if useful; do not block `ยืนยันสร้างออเดอร์` and do not require payment override for `JOB-O`.
- Custom detail incomplete: return to the custom-work section in Order Create/Edit.

## 13. Permission Rules

- Only permissioned admin/sales users can confirm Order creation.
- Draft creator, same-permission, and higher-permission users can return to edit active saved drafts.
- Confirming creates a real Order ID.
- If the Review came from a saved Draft Order, confirming hides that Draft from active draft UI by converted/archived status.
- If the Review came from unsaved Order Entry, no Draft Order is created retroactively.
- Ready-stock lines reserve stock after Order creation.
- If stock-insufficient ready-stock is acknowledged, reservation is allowed to create negative stock visibility.
- Ready-stock line snapshots store SKU code, Product Model name, color, dimensions, display image, and relevant department images at confirmation time.
- Custom lines create `JOB-O` customer Jobs after Order creation.
- `JOB-O` creation depends on complete Custom Work Detail, not on Payment Record.
- Shipment rounds are not created on this screen.
- Financial Follow-up remains separate.

## 14. UX Notes for Designer

- Treat Review as the final confirmation step; do not add a second confirmation modal.
- Show `ผลหลังยืนยันสร้างออเดอร์` clearly.
- Do not show a confirmed Order ID before the user confirms.
- Do not show Draft No. on Review.
- Do not imply shipment has been created.
- Keep row/card detail clearer than a summary-only page; this is where admin checks every item before confirming.
- Use strong contrast between `กลับ`, `บันทึกร่าง`, and `ยืนยันสร้างออเดอร์`.
- Do not make this screen look like a quotation or invoice.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ORD-004-order-review-create-order.md`.

## 16. Open UX Questions

- None blocking for the next Order mockup pass.
