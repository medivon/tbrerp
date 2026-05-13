# SCR-SHIP-002 - Shipment Builder

## 1. Purpose

Shipment Builder is the `สร้างรอบจัดส่ง` screen for selected ready-to-ship items from one Order / special-case Shipment creation flow. Admin uses it when selected Order lines need manual review or delivery detail adjustments before releasing the Shipment.

This screen is not used for bulk shipment creation. Bulk creation bypasses this screen and uses default Customer/Order delivery data to create the Shipment documents directly.

Approved mockup:

- `docs/ux-ui/mockups/SCR-SHIP-002-shipment-builder/SCR-SHIP-002-approved.png`

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Review selected ready-to-ship lines from one Order before creating a Shipment.
- Handle special delivery cases that need manual edits.
- Confirm or edit recipient, phone, address, carrier, delivery date, COD, and delivery-facing notes.
- Preview Delivery Note and Shipping Sheet.
- Release the Shipment to delivery team or save it as Draft Shipment.
- Avoid using this detailed editor for high-volume bulk creation.

## 4. Entry Points

- `รอสร้างรอบจัดส่ง` -> row action `สร้างรอบจัดส่ง` for one Order.
- `รอสร้างรอบจัดส่ง` -> right drawer action `สร้างรอบจัดส่ง`.
- Order Detail -> `จัดการรอบจัดส่ง` -> `สร้างรอบจัดส่งจากรายการที่เลือก`, with selected shippable Order lines.
- Draft Shipment Detail when continuing a draft.

Not an entry point:

- Bulk action `สร้างรอบจัดส่งจากที่เลือก` does not open this screen.

## 5. Exit Points

- Released Shipment Detail.
- Draft Shipment Detail.
- Delivery Note Preview.
- Shipping Sheet Preview.
- Ready-to-Ship Queue if cancelled before create.

Bulk exit:

- Bulk flow exits directly to created Shipments / document generation, without this screen.

## 6. Layout Structure

- Header: `สร้างรอบจัดส่ง`, source Order ID, status chip `กำลังสร้างรอบจัดส่ง`.
- Left panel: `รายการพร้อมส่ง` for the selected lines from one Order.
- Right panel: `ข้อมูลจัดส่ง` with editable special-case controls.
- Footer action bar: `พร้อมจัดส่ง`, `บันทึกเป็นร่าง`, `ยกเลิก`.
- Document preview buttons: `ดูใบส่งของ`, `ดูใบจัดส่ง`.

## 7. Main Components

- Shipment builder header
- Source Order reference
- Selected item list
- Item thumbnail
- Source badge
- Related Job ID
- Delivery Note preview button
- Shipping Sheet preview button
- Recipient/address snapshot panel
- Carrier selector
- Delivery date field
- COD field/chip
- Delivery note field
- Edit delivery info action
- Edit COD action
- Edit note action
- Release action
- Save Draft action

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Shipment status | สถานะรอบจัดส่ง | กำลังสร้างรอบจัดส่ง | Shipment draft state | Before release. |
| Order ID | เลขออเดอร์ | ORD-240520-014 | Order | Single Order context. |
| Item list | รายการพร้อมส่ง | โต๊ะกลางลงรักสมุก | Selected Order Line / Job / Service Case | No price shown. |
| Source | สถานะงาน | งานสั่งทำเสร็จแล้ว | Order Line / Job / Service Case | Stock/custom/service badge. |
| Quantity | จำนวน | 1 ชิ้น | Order Line / Job | Printed on Delivery Note. |
| Product image | รูปสินค้า | Table thumbnail | Order Line / Job / SKU | Work recognition. |
| Related Job ID | ที่มา / Job ID | JOB-O-0238 | Job | Only where relevant. |
| Shipment plan | แผนจัดส่ง | จัดส่งแยกได้ | Order Shipment Plan | Shown only for mixed ready-stock/custom Orders; explains why selected items can ship now. |
| Recipient | ผู้รับสินค้า | คุณณัฐพล | Address Entry / Shipment snapshot | Editable before release. |
| Phone | เบอร์โทร | 081-234-5678 | Address Entry / Shipment snapshot | Editable before release. |
| Address | ที่อยู่จัดส่ง | 88/14 ถ.ราชพฤกษ์... | Address Entry / Shipment snapshot | Snapshot on Shipment. |
| Carrier | ขนส่ง | ไปรษณีย์ไทย EMS | Shipment | Delivery team cannot change later. |
| Delivery date | วันจัดส่ง | 24 พ.ค. 67 | Shipment | No-date goes to today's delivery tab after release. |
| COD | COD | 12,000 บาท | Shipment / Payment Term | Admin confirms/edits; permission-aware. |
| COD note | หมายเหตุ COD | เก็บปลายทางตามยอดที่เก็บเงินแล้ว | Shipment COD note | Required if override needs explanation. |
| Notes | หมายเหตุจัดส่ง | โทรก่อนเข้าจัดส่ง / ชิ้นงานระวังกระแทก | Shipment | Delivery-facing note. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Release as ready | พร้อมจัดส่ง | Admin and same/higher permission | Creates/release Shipment visible to Delivery Team. | Yes |
| Save draft | บันทึกเป็นร่าง | Admin and same/higher permission | Creates Draft Shipment; items marked as being prepared. | Yes |
| Cancel builder | ยกเลิก | Admin | Returns to Ready-to-Ship Queue before create. | No |
| Preview Delivery Note | ดูใบส่งของ | Admin | Opens Delivery Note Preview. | No |
| Preview Shipping Sheet | ดูใบจัดส่ง | Admin | Opens Shipping Sheet Preview. | No |
| Edit delivery info | แก้ไขข้อมูลจัดส่ง | Admin and same/higher permission | Edits recipient/address/carrier/date before release. | No |
| Edit COD | แก้ยอด COD | Admin with permission | Updates Shipment COD before release. | Yes if override/over expected amount |
| Edit delivery note | แก้หมายเหตุ | Admin and same/higher permission | Updates delivery-facing note. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Creating | กำลังสร้างรอบจัดส่ง | Admin is reviewing before release. | Orange/neutral chip. |
| Draft Shipment | ร่างรอบจัดส่ง | Shipment being prepared, not released. | Neutral draft chip. |
| Released | พร้อมจัดส่ง / ปล่อยให้ฝ่ายจัดส่งแล้ว | Shipment visible to Delivery Team. | Positive status chip. |
| Ready item | พร้อมส่ง | Selected item is eligible for Shipment. | Positive chip. |
| Completed custom | งานสั่งทำเสร็จแล้ว | Completed `JOB-O`. | Purple/neutral chip. |
| COD | COD | Shipment carries COD amount. | Permission-aware chip. |
| COD warning | COD เกินยอดที่คาดไว้ | COD exceeds suggested remaining amount. | Warning chip requiring note. |

## 11. Empty State

This screen should not open without one selected ready-to-ship Order. If no valid item is present, show `ไม่มีรายการพร้อมส่งสำหรับสร้างรอบจัดส่ง` and action `กลับไปหน้ารอสร้างรอบจัดส่ง`.

## 12. Error State

- Loading fails: `โหลดข้อมูลรอบจัดส่งไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์สร้างรอบจัดส่ง`.
- Create fails: `สร้างรอบจัดส่งไม่สำเร็จ`.
- Release fails: `ปล่อยให้ฝ่ายจัดส่งไม่สำเร็จ`.
- Selected item already in another Draft Shipment: show `รายการนี้กำลังถูกเตรียมรอบจัดส่งแล้ว`.
- Order Shipment Plan blocks shipment: show `ออเดอร์นี้ตั้งค่าให้ส่งพร้อมกัน` and return to Order Detail.
- COD warning without note: show `กรุณาระบุหมายเหตุ COD`.

## 13. Permission Rules

- Admin creates Shipment.
- Delivery Team cannot create, split, or edit Shipment.
- Shipment Owner is the creator, but close queue is shared later.
- Finance-sensitive COD/payment detail is permission-aware.
- Address/carrier/COD changes happen before release by authorized admin; delivery team cannot change them.
- Draft Shipment items are not shipped and Order is not complete.
- Bulk users do not enter this screen for default/simple creation.
- Shipment Builder must only receive selected items that are shippable under the Order Shipment Plan / current Order Detail selection rules.

## 14. UX Notes for Designer

- Make this screen feel like a single/special-case review editor.
- Do not make it a bulk builder.
- Keep item list and address snapshot visible at the same time.
- Emphasize editable special-case controls: delivery info, COD, notes.
- Delivery Note and Shipping Sheet are separate print previews, created from the same Shipment.
- Do not show product prices on delivery documents.
- Make COD warning visible but do not turn the screen into finance/audit work.
- For bulk flows, use default Customer/Order delivery data and bypass this screen.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SHIP-002-shipment-builder.md`.

## 16. Open UX Questions

- Which exact bulk cases are safe enough to bypass this screen?
