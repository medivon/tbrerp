# SCR-DEL-001 — Delivery Dashboard

## Design Status

Ready for first worker-shell design. Use a simple tablet/mobile worker shell, not the desktop admin shell. Do not include Tracking entry in the Delivery Team UI; Tracking is captured by admin in `ยืนยันการจัดส่ง`.

## 1. Purpose

The Delivery Dashboard is the delivery team's simple tablet/mobile entry point for released Shipments. It shows what should be delivered today and what is waiting for a future delivery date. Delivery can mark `ส่งออกแล้ว`, but cannot close Shipment.

Admin may also view this screen for operational visibility, but the primary worker is Delivery Team. This screen starts only after admin has created and released a Shipment from `รอสร้างรอบจัดส่ง`.

## 2. Primary Users

- Delivery Team
- Admin as viewer / supervisor

## 3. User Goals

- See Shipments that need delivery action today.
- See Shipments waiting for future delivery dates.
- Open a Shipment and review item, recipient, address, phone, carrier, and notes.
- Optionally add `รูปหลักฐานจัดส่ง` on an individual Shipment when useful.
- Mark one Shipment `ส่งออกแล้ว` from a row/card action, or bulk-select today's/no-date Shipments and confirm `บันทึกว่าส่งออกแล้ว`.
- Use a short confirmation for one `ส่งออกแล้ว`; no evidence/note is required and no detailed re-summary is shown.
- Add photo/note later from `ส่งออกแล้ววันนี้` until Admin closes the Shipment.
- Record the delivery report date through the `ส่งออกแล้ว` action.
- Check a simple `ส่งออกแล้ววันนี้` history view.
- Avoid editing master Shipment data or closing Shipment.

## 4. Entry Points

- Delivery Team login/navigation.
- Released Shipment appears after admin releases it.
- Sidebar `รอบจัดส่ง` -> `รายการต้องจัดส่งวันนี้`, for admin/supervisor visibility.
- Return from delivery Shipment detail/evidence view.

## 5. Exit Points

- `รายการต้องจัดส่งวันนี้`.
- `รายการรอวันจัดส่ง`.
- Delivery Shipment Detail / optional photo.
- Sent-out confirmation state.
- `ส่งออกแล้ววันนี้`.

## 6. Layout Structure

- Header: `ฝ่ายจัดส่ง`, date, delivery count.
- Tabs: `รายการต้องจัดส่งวันนี้` and `รายการรอวันจัดส่ง`.
- Today tab: cards for Shipments with no delivery date or due today.
- Waiting-date tab: cards grouped by future delivery date.
- Shipment card: recipient, short address, phone, carrier, item thumbnail/summary, action `ส่งออกแล้ว`, and secondary action `เปิดรอบจัดส่ง`.
- Bulk bar on today's tab: select rows/cards and confirm `บันทึกว่าส่งออกแล้ว`.
- Detail view: full delivery information, item list, optional `รูปหลักฐานจัดส่ง` upload, note, and `ส่งออกแล้ว`.
- Simple same-day sent-out history view: `ส่งออกแล้ววันนี้`.
- Mobile/tablet behavior: card-based, large buttons, no dense admin table.

## 7. Main Components

- Delivery header
- Today tab
- Waiting-date tab
- Shipment card
- Recipient/address block
- Item thumbnail strip
- Carrier chip
- Optional `รูปหลักฐานจัดส่ง` upload
- Note field
- Mark sent out button
- Bulk sent-out selection bar
- Same-day sent-out history
- Read-only field styling

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Dashboard title | ฝ่ายจัดส่ง | ฝ่ายจัดส่ง | Delivery dashboard | Delivery team entry point. |
| Today tab | รายการต้องจัดส่งวันนี้ | รายการต้องจัดส่งวันนี้ | Shipment | Released Shipments due today or without delivery date. |
| Waiting tab | รายการรอวันจัดส่ง | รายการรอวันจัดส่ง | Shipment | Future-date Shipments. |
| Shipment ID | เลขรอบจัดส่ง | SHIP-2568-0061 | Shipment | Delivery reference. |
| Recipient | ผู้รับสินค้า | คุณภพ | Shipment address snapshot | Delivery team can view only. |
| Phone | เบอร์โทร | 081-234-5678 | Shipment address snapshot | Delivery contact. |
| Address | ที่อยู่จัดส่ง | 99/12 ถ.เจริญกรุง กรุงเทพฯ | Shipment address snapshot | Read-only. |
| Carrier | ขนส่ง | รถร้าน | Shipment | Read-only. |
| Short address | ที่อยู่ย่อ | บางรัก, กรุงเทพฯ | Shipment address snapshot | Row/card summary; full address is in detail. |
| Item summary | รายการสินค้า | ตู้โชว์ไม้สัก 1 ชิ้น | Shipment / Order Line | Delivery-facing summary. |
| Product image | รูปสินค้า | Cabinet thumbnail | Order Line / Job / SKU | Helps identify goods. |
| COD amount | ยอด COD | 12,000 บาท | Shipment COD | Visible only for Shipments this Delivery Team is responsible for; read-only and not a payment follow-up action. |
| Evidence photo | รูปหลักฐานจัดส่ง | รูปพัสดุขึ้นรถ | Shipment Evidence | Optional individual multi-photo field. |
| Delivery note | หมายเหตุจัดส่ง | โทรก่อนส่ง | Shipment | Delivery can add short note. |
| Sent-out history | ส่งออกแล้ววันนี้ | SHIP-2568-0061 | Shipment | Same-day delivery-team history only. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open today list | รายการต้องจัดส่งวันนี้ | Delivery Team | Shows today's/no-date Shipments. | No |
| Open waiting-date list | รายการรอวันจัดส่ง | Delivery Team | Shows future-date Shipments. | No |
| Open Shipment | เปิดรอบจัดส่ง | Delivery Team | Opens delivery detail view. | No |
| Add optional photo | เพิ่มรูปหลักฐานจัดส่ง | Delivery Team | Adds optional delivery evidence photos to one Shipment. | No |
| Add delivery note | เพิ่มหมายเหตุ | Delivery Team | Adds short delivery note. | No |
| Mark one sent out | ส่งออกแล้ว | Delivery Team | Moves one Shipment to admin `ยืนยันการจัดส่ง` and records the delivery report date. | Yes |
| Bulk mark sent out | บันทึกว่าส่งออกแล้ว | Delivery Team, today's/no-date Shipments only | Moves selected Shipments to admin `ยืนยันการจัดส่ง` and records the delivery report date. | Yes |
| Open same-day history | ส่งออกแล้ววันนี้ | Delivery Team | Shows Shipments marked sent out today and allows photo/note until Admin closes. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Today | ต้องจัดส่งวันนี้ | Shipment is due today or has no date. | Main tab/status chip. |
| Future date | รอวันจัดส่ง | Shipment has future delivery date. | Date chip. |
| Sent out | ส่งออกแล้ว | Delivery marked sent; admin still needs to close. | Positive but not final close. |
| Waiting close | ยืนยันการจัดส่ง | Admin confirmation/close is pending. | Read-only post-action state. |

## 11. Empty State

For today tab, show `ไม่มีรายการต้องจัดส่งวันนี้`. For waiting-date tab, show `ไม่มีรายการรอวันจัดส่ง`.

## 12. Error State

- Loading fails: `โหลดรายการจัดส่งไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูรายการจัดส่ง`.
- Optional photo upload fails: `แนบรูปหลักฐานไม่สำเร็จ`.
- Mark sent out fails: `ส่งออกแล้วไม่สำเร็จ`.
- Bulk future-date selection blocked: `เลือกส่งออกแบบหลายรายการได้เฉพาะรายการต้องจัดส่งวันนี้`.

## 13. Permission Rules

- Delivery Team can view items, image, quantity, recipient, address, phone, carrier, and notes.
- Delivery Team can see COD amount for Shipments they are responsible for.
- Delivery Team can attach optional photos, add short note, and mark `ส่งออกแล้ว`.
- Delivery Team can add photo/note from `ส่งออกแล้ววันนี้` until Admin closes the Shipment.
- Delivery Team cannot change item list, address, carrier, COD, Tracking, or close Shipment.
- Delivery Team cannot close COD/payment follow-up.
- Admin closes Shipment after evidence/tracking review.
- Financial Follow-up remains separate from operational completion.
- Admin/supervisor view should not add creation controls here; Shipment creation belongs to `รอสร้างรอบจัดส่ง`.

## 14. UX Notes for Designer

- This is a mobile/tablet shop-floor screen, not an admin workspace.
- It may be visible to admin, but it must still behave like a delivery work screen.
- Make `ส่งออกแล้ว` visually distinct from final close; label should not imply Order is complete.
- Keep read-only fields visibly locked/non-editable.
- Use maps-style address readability but do not add carrier API behavior.
- Do not show Tracking input in Delivery Team screens; admin owns Tracking/evidence completion before close.
- Keep optional photo upload secondary so it does not look required before `ส่งออกแล้ว`.
- Single send-out should use a short confirmation. Bulk send-out should use a confirmation modal summarizing count and selected Shipments, then remove sent items from the active today list.
- No overdue logic in first scope.
- Do not mix `รอสร้างรอบจัดส่ง` items into this screen; only released Shipments appear here.
- Do not add `ส่งไม่ได้` or issue-reporting actions in the starting workflow. The team contacts admin outside the system when a shipment cannot be sent.

## 15. Image Generation Prompt

Create a mobile/tablet delivery worker UI titled "ฝ่ายจัดส่ง". Use two tabs "รายการต้องจัดส่งวันนี้" and "รายการรอวันจัดส่ง". The today tab shows shipment cards with recipient, phone, short address, carrier, item thumbnail, COD amount when relevant, and row action "ส่งออกแล้ว"; include checkbox selection and a bottom bulk action "บันทึกว่าส่งออกแล้ว". Detail view shows full address, item list, COD amount when relevant, optional "รูปหลักฐานจัดส่ง", note, and "ส่งออกแล้ว". Include a simple "ส่งออกแล้ววันนี้" history. Do not show Tracking input, COD editing, shipment creation, admin close controls, payment follow-up close controls, or dense desktop table styling.

## 16. Open UX Questions

- None for the Delivery Team send-out rule or first worker-shell structure.
