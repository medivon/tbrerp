# SCR-DEL-001 — Delivery Dashboard

## Design Status

Needs decision. This is a tablet/mobile Delivery Team screen, and the mobile/tablet app shell has not been approved yet. Do not generate the mockup from `IMG-DEL-001` until the mobile structure is designed.

## 1. Purpose

The Delivery Dashboard is the delivery team's simple tablet/mobile entry point for released Shipments. It shows what should be delivered today and what is waiting for a future delivery date. Delivery can mark `ส่งออกแล้ว`, but cannot close Shipment.

Admin may also view this screen for operational visibility, but the primary worker is Delivery Team. This screen starts only after admin has created and released a Shipment from `รอสร้างรอบจัดส่ง`.

## 2. Primary Users

- Delivery Team
- Admin as viewer / supervisor

## 3. User Goals

- See Shipments that need delivery action today.
- See Shipments waiting for future delivery dates.
- Open a Shipment and review item, recipient, address, phone, carrier, COD, and notes.
- Attach required evidence according to carrier settings.
- Mark Shipment `ส่งออกแล้ว`.
- Avoid editing master Shipment data or closing Shipment.

## 4. Entry Points

- Delivery Team login/navigation.
- Released Shipment appears after admin releases it.
- Sidebar `รอบจัดส่ง` -> `รายการต้องจัดส่งวันนี้`, for admin/supervisor visibility.
- Return from delivery Shipment detail/evidence view.

## 5. Exit Points

- `รายการต้องจัดส่งวันนี้`.
- `รายการรอวันจัดส่ง`.
- Delivery Shipment Detail / Evidence.
- Sent-out confirmation state.

## 6. Layout Structure

- Header: `ฝ่ายจัดส่ง`, date, delivery count.
- Tabs: `รายการต้องจัดส่งวันนี้` and `รายการรอวันจัดส่ง`.
- Today tab: cards for Shipments with no delivery date or due today.
- Waiting-date tab: cards grouped by future delivery date.
- Shipment card: recipient, address summary, carrier, item thumbnail/summary, COD chip, evidence status, action `เปิดรอบจัดส่ง`.
- Detail/evidence view: large delivery information, item list, evidence upload fields, note, `ส่งออกแล้ว`.
- Mobile/tablet behavior: card-based, large buttons, no dense admin table.

## 7. Main Components

- Delivery header
- Today tab
- Waiting-date tab
- Shipment card
- Recipient/address block
- Item thumbnail strip
- Carrier chip
- COD chip
- Evidence checklist
- Note field
- Mark sent out button
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
| Item summary | รายการสินค้า | ตู้โชว์ไม้สัก 1 ชิ้น | Shipment / Order Line | Delivery-facing summary. |
| Product image | รูปสินค้า | Cabinet thumbnail | Order Line / Job / SKU | Helps identify goods. |
| COD | COD | 12,000 บาท | Shipment | Delivery can view but not change. |
| Evidence | หลักฐาน | รูปพัสดุขึ้นรถ | Shipment Evidence | Required according to carrier setting. |
| Delivery note | หมายเหตุจัดส่ง | โทรก่อนส่ง | Shipment | Delivery can add short note. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open today list | รายการต้องจัดส่งวันนี้ | Delivery Team | Shows today's/no-date Shipments. | No |
| Open waiting-date list | รายการรอวันจัดส่ง | Delivery Team | Shows future-date Shipments. | No |
| Open Shipment | เปิดรอบจัดส่ง | Delivery Team | Opens delivery detail/evidence view. | No |
| Attach evidence | แนบหลักฐาน | Delivery Team | Adds tracking/photo/note evidence as configured. | No |
| Add delivery note | เพิ่มหมายเหตุ | Delivery Team | Adds short delivery note. | No |
| Mark sent out | ส่งออกแล้ว | Delivery Team | Moves Shipment to admin `ยืนยันการจัดส่ง`. | Yes |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Today | ต้องจัดส่งวันนี้ | Shipment is due today or has no date. | Main tab/status chip. |
| Future date | รอวันจัดส่ง | Shipment has future delivery date. | Date chip. |
| Evidence needed | ต้องแนบหลักฐาน | Carrier requires evidence. | Warning chip/checklist. |
| Sent out | ส่งออกแล้ว | Delivery marked sent; admin still needs to close. | Positive but not final close. |
| Waiting close | ยืนยันการจัดส่ง | Admin confirmation/close is pending. | Read-only post-action state. |
| COD | COD | COD amount visible for delivery collection/context. | Read-only chip. |

## 11. Empty State

For today tab, show `ไม่มีรายการต้องจัดส่งวันนี้`. For waiting-date tab, show `ไม่มีรายการรอวันจัดส่ง`.

## 12. Error State

- Loading fails: `โหลดรายการจัดส่งไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูรายการจัดส่ง`.
- Evidence upload fails: `แนบหลักฐานไม่สำเร็จ`.
- Mark sent out fails: `ส่งออกแล้วไม่สำเร็จ`.
- Required evidence missing: show field-level warning and keep `ส่งออกแล้ว` blocked if carrier setting requires it.

## 13. Permission Rules

- Delivery Team can view items, image, quantity, recipient, address, phone, carrier, COD, and notes.
- Delivery Team can attach evidence, add short note, and mark `ส่งออกแล้ว`.
- Delivery Team cannot change item list, address, carrier, COD, or close Shipment.
- Admin closes Shipment after evidence/tracking review.
- Financial Follow-up remains separate from operational completion.
- Admin/supervisor view should not add creation controls here; Shipment creation belongs to `รอสร้างรอบจัดส่ง`.

## 14. UX Notes for Designer

- This is a mobile/tablet shop-floor screen, not an admin workspace.
- It may be visible to admin, but it must still behave like a delivery work screen.
- Make `ส่งออกแล้ว` visually distinct from final close; label should not imply Order is complete.
- Keep read-only fields visibly locked/non-editable.
- Use maps-style address readability but do not add carrier API behavior.
- Evidence capture should be obvious near the send-out action.
- No overdue logic in first scope.
- Do not mix `รอสร้างรอบจัดส่ง` items into this screen; only released Shipments appear here.

## 15. Image Generation Prompt

Paused until mobile/tablet app-shell approval. The delivery dashboard content remains valid as business direction, but the visual prompt should not be used yet.

## 16. Open UX Questions

- Which evidence types are required for each carrier before `ส่งออกแล้ว` is allowed?
