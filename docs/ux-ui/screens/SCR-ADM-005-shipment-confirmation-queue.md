# SCR-ADM-005 - Shipment Confirmation Queue

Approved mockup:

- `docs/ux-ui/mockups/SCR-ADM-005-shipment-confirmation-queue/SCR-ADM-005-approved.png`

## 1. Purpose

Shipment Confirmation Queue is the desktop/tablet admin screen `ยืนยันการจัดส่ง`. It shows shipment rounds that Delivery Team has marked `ส่งออกแล้ว` and are waiting for admin to review tracking/evidence before closing the shipment round.

Order Completion happens only when all required shipment rounds for the Order are closed. Financial Follow-up remains separate and does not block operational close.

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Find shipment rounds waiting for confirmation.
- Review tracking, `รูปหลักฐานจัดส่ง`, carrier, address snapshot, item summary, and delivery notes.
- Add missing tracking/evidence where admin is responsible.
- Close the shipment round after operational delivery review.
- See whether the related Order still has remaining shipment rounds.
- Keep COD/Payment follow-up visible as a signal only, not as the close condition.

## 4. Entry Points

- `แดชบอร์ด` -> `ยืนยันการจัดส่ง`.
- Sidebar `รอบจัดส่ง` -> `ยืนยันการจัดส่ง`.
- Active Orders overview row with shipment state `รอยืนยันการจัดส่ง`.
- Shipment Detail after Delivery Team marks `ส่งออกแล้ว`.

## 5. Exit Points

- Closed Shipment Detail.
- Related Order Detail.
- COD/Payment Follow-up where permission allows.
- Admin Dashboard.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `รอบจัดส่ง`.
- Header: `ยืนยันการจัดส่ง`, count summary, search/filter.
- Summary strip: all waiting shipment rounds, missing tracking, evidence complete, evidence missing, COD.
- Filter chips: `ทั้งหมด`, `รอเลขพัสดุ`, `หลักฐานครบ`, `หลักฐานไม่ครบ`, `COD`.
- Main content: dense shipment-round table/list.
- Right detail drawer: selected shipment evidence/tracking review.
- Close confirmation: reinforces that this is operational close and Financial Follow-up is separate.

## 7. Main Components

- Admin app shell
- Shipment confirmation header
- Summary cards
- Search input
- Filter chips
- Sent-out shipment row
- Evidence status chip
- Tracking status chip/input
- COD/Payment follow-up signal
- Owner display
- Detail/evidence drawer
- Close shipment-round button
- Related Order completion indicator

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | ยืนยันการจัดส่ง | ยืนยันการจัดส่ง | Shipment confirmation queue | Dashboard queue label. |
| Shipment ID | เลขรอบจัดส่ง | SHIP-2568-0061 | Shipment | Primary row identity. |
| Related Order | ออเดอร์ที่เกี่ยวข้อง | ORD-240520-014 | Order | Opens related Order. |
| Shipment Owner | ผู้สร้างรอบจัดส่ง | Admin | Shipment Owner | Traceability only. |
| Sent-out status | ส่งออกแล้ว | ส่งออกแล้ว | Shipment | Set by Delivery Team. |
| Sent-out time | เวลาส่งออก | 22 พ.ค. 67 15:40 | Activity Log | Delivery action time. |
| Recipient | ผู้รับสินค้า | คุณณัฐพล | Shipment address snapshot | Review only. |
| Carrier | ขนส่ง | ไปรษณีย์ไทย EMS | Shipment | Review only. |
| Tracking | เลขพัสดุ / Tracking | TH123456789 | Shipment Evidence | If applicable. |
| Evidence | รูปหลักฐานจัดส่ง | รูปพัสดุขึ้นรถ | Shipment Evidence | One multi-photo field; enough when tracking is blank. |
| Item summary | รายการสินค้า | โต๊ะกลางลงรักสมุก 1 ชิ้น | Shipment / Delivery Note | Operational review. |
| Financial follow-up | ติดตามการเงิน | COD ต้องติดตาม | Financial Follow-up | Separate from shipment close. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Shipment | เปิดรอบจัดส่ง | Admin and same/higher permission | Opens detail/evidence review. | No |
| Review evidence | ตรวจหลักฐาน | Admin and same/higher permission | Opens evidence/tracking drawer. | No |
| Add/correct tracking | เพิ่ม/แก้เลขพัสดุ | Admin and same/higher permission | Adds or corrects tracking before close. | No |
| Add/correct evidence | เพิ่ม/แก้รูปหลักฐานจัดส่ง | Admin and same/higher permission | Adds or corrects delivery evidence photos before close. | No |
| Close shipment round | ยืนยันและปิดรอบจัดส่ง | Admin and same/higher permission | Shipment becomes closed. | Yes |
| Open Order | เปิดออเดอร์ | Admin and same/higher permission | Opens related Order Detail. | No |
| Open financial follow-up | เปิดติดตามการเงิน | Permissioned admin/finance user | Opens COD/payment follow-up. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Sent out | ส่งออกแล้ว | Delivery marked shipment sent out. | Positive but not closed. |
| Waiting confirmation | รอยืนยันการจัดส่ง | Admin must review and close the Shipment round. | Shipment queue chip. |
| Tracking missing | รอเลขพัสดุ | Tracking is blank; this is not blocking if delivery evidence photo exists. | Neutral/warning chip. |
| Evidence complete | หลักฐานครบ | Tracking or at least one delivery evidence photo exists. | Positive chip. |
| Evidence missing | หลักฐานไม่ครบ | Neither tracking nor delivery evidence photo exists. | Blocking warning chip. |
| Closed | ปิดรอบจัดส่งแล้ว | Admin closed the shipment round. | Final operational shipment state. |
| Order complete | ออเดอร์จัดส่งครบ | All required shipment rounds are closed. | Positive chip after close. |
| Financial follow-up | ต้องติดตามการเงิน | COD/payment still needs follow-up. | Separate finance chip. |

## 11. Empty State

Show `ไม่มีรอบจัดส่งรอยืนยัน` with a secondary action `กลับแดชบอร์ด`.

## 12. Error State

- Loading fails: `โหลดรายการยืนยันการจัดส่งไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ยืนยันการจัดส่ง`.
- Close fails: `ปิดรอบจัดส่งไม่สำเร็จ`.
- Evidence missing: show `กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง` and highlight missing fields.
- Shipment already closed by another admin: show `รอบจัดส่งนี้ถูกปิดแล้ว` and refresh list.

## 13. Permission Rules

- Admin closes shipment round.
- Delivery Team cannot close shipment round.
- This is a shared admin queue; Shipment Owner does not block same-permission close.
- Closing a Shipment requires tracking or at least one delivery evidence photo.
- Admin can add or correct tracking/evidence before close. Corrections after `ส่งออกแล้ว` are recorded in Management Log.
- After Shipment close, tracking/evidence correction requires manager/higher permission and is recorded in Management Log.
- Order Completion means all required Order shipment rounds are closed.
- Financial Follow-up stays separate and can remain open after operational close.
- Finance-sensitive amounts are permission-aware.

## 14. UX Notes for Designer

- Use `ยืนยันการจัดส่ง` as the visible queue title, not `รอปิด Shipment`.
- Make `ส่งออกแล้ว` and `ปิดรอบจัดส่งแล้ว` visually distinct.
- Evidence thumbnails/tracking should be visible before close.
- A closed Shipment without tracking is valid when it has `รูปหลักฐานจัดส่ง`.
- The close confirmation should remind admin that financial follow-up is separate.
- Do not require payment audit to close operational delivery.
- Show Order completion indicator only after close logic, not before.
- Keep queue dense enough for repeated admin review work.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ADM-005-shipment-confirmation-queue.md`.

## 16. Open UX Questions

- None blocking for this confirmation queue.
