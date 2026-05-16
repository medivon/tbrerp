# SCR-SHIP-002 - Shipment Builder

## 1. Purpose

Shipment Builder is the `สร้างรอบจัดส่ง` screen for selected ready-to-ship items from one Order / special-case Shipment creation flow. Admin uses it when selected Order lines need manual review or delivery detail adjustments before releasing the Shipment.

This screen is not used for bulk shipment creation. Bulk creation bypasses this screen and uses saved Order Recipient Detail snapshots as delivery defaults to create the Shipment documents directly.

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
- When the Shipment address is not the same or not close to existing Customer addresses, decide whether to save it as a secondary Customer Address Entry.
- Acknowledge stock-negative warnings when selected ready-stock lines were allowed to proceed despite stock shortage.
- Preview Delivery Note and Shipping Sheet; COD amount appears on Shipping Sheet where relevant, not on Delivery Note.
- Release the Shipment to delivery team or save it as Draft Shipment.
- Avoid using this detailed editor for high-volume bulk creation.

## 4. Entry Points

- `รอสร้างรอบจัดส่ง` -> row action `สร้างรอบจัดส่ง` for one Order.
- `รอสร้างรอบจัดส่ง` -> right drawer action `สร้างรอบจัดส่ง`.
- Order Detail -> `จัดการรอบจัดส่ง` -> `สร้างรอบจัดส่งจากรายการที่เลือก`, with selected shippable Order lines and their default delivery context.
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
| Item list | รายการพร้อมส่ง | โต๊ะกลางลงรักสมุก สีโอ๊ค | Selected Order Line / Job / Service Case | Use Order Line snapshot for ready-stock lines; no price shown. |
| Source | สถานะงาน | งานสั่งทำเสร็จแล้ว | Order Line / Job / Service Case | Stock/custom/service badge. |
| Quantity | จำนวน | 1 ชิ้น | Order Line / Job | Printed on Delivery Note. |
| Product image | รูปสินค้า | Table thumbnail | Main product/work image from Order Line snapshot / Job / Service Case | For ready-stock, use the display image snapshotted when the SKU Variant was selected; no delivery-specific image selection. |
| SKU/color | SKU / สี | TBR-TBL-123-OAK / สีโอ๊ค | Order Line snapshot | Show where useful for admin verification; avoid cluttering delivery-facing printouts. |
| Related Job ID | ที่มา / Job ID | JOB-O-0238 | Job | Only where relevant. |
| Shipment intent | วิธีจัดส่งรายการนี้ | จัดส่งบางรายการจากออเดอร์ | Order Detail selection | Selected ready lines determine whether this Shipment round is combined or split. |
| Recipient | ผู้รับสินค้า | คุณณัฐพล | Address Entry / Shipment snapshot | Editable before release. |
| Phone | เบอร์โทร | 081-234-5678 | Address Entry / Shipment snapshot | Editable before release. |
| Address | ที่อยู่จัดส่ง | 88/14 หมู่ 2 ต.บางกร่าง อ.เมือง จ.นนทบุรี 11000 | Address Entry / Shipment snapshot | Structured address; snapshot on Shipment. |
| Save address to Customer | บันทึกเป็นที่อยู่จัดส่งรอง | เลือกไว้ | Customer Address Entry | Ask only when this Shipment address is not close to existing Customer addresses and the Customer has fewer than 3 saved addresses. |
| Carrier | ขนส่ง | ไปรษณีย์ไทย EMS | Shipment | Delivery team cannot change later. |
| Delivery date | วันจัดส่ง | 24 พ.ค. 67 | Shipment | No-date goes to today's delivery tab after release. |
| COD | COD | 12,000 บาท | Shipment / Payment Term | Admin confirms/edits; permission-aware. |
| COD note | หมายเหตุ COD | เก็บปลายทางตามยอดที่เก็บเงินแล้ว | Shipment COD note | Required if override needs explanation. |
| Stock warning | แจ้งเตือนสต๊อก | สต๊อกติดลบ 1 รายการ | Ready Stock / Order Line | Acknowledgement only; does not block Shipment creation after user accepts. |
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
| Save as secondary customer address | บันทึกเป็นที่อยู่จัดส่งรอง | Admin and same/higher permission | Adds the Shipment recipient/address as a secondary Address Entry for the Customer without changing the default address. | No |
| Edit COD | แก้ยอด COD | Admin with permission | Updates Shipment COD before release. | Yes if override/over expected amount |
| Edit delivery note | แก้หมายเหตุ | Admin and same/higher permission | Updates delivery-facing note. | No |
| Acknowledge stock warning | รับทราบสต๊อกติดลบ | Admin and same/higher permission | Logs acknowledgement and continues Shipment creation. | Yes, acknowledgement only |

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
- Selected items are no longer shippable: show `รายการที่เลือกยังไม่พร้อมสร้างรอบจัดส่ง` and return to Order Detail.
- Stock-negative ready-stock line: show acknowledgement modal with `รับทราบและสร้างรอบจัดส่งต่อ` and `กลับไปตรวจสต๊อก`; do not require reason or Manager approval.
- COD warning without note: show `กรุณาระบุหมายเหตุ COD`.

## 13. Permission Rules

- Admin creates Shipment.
- Delivery Team cannot create, split, or edit Shipment.
- Shipment Owner is the creator, but close queue is shared later.
- Finance-sensitive COD/payment detail is permission-aware.
- Service Case sources create Service Shipments only and do not update any referenced Order status, total, or completion state.
- Address/carrier/COD changes happen before release by authorized admin; delivery team cannot change them or see COD amount in the Delivery Team system UI.
- Draft Shipment items are not shipped and Order is not complete.
- Bulk users do not enter this screen for default/simple creation.
- Shipment Builder must only receive selected items that are shippable under current Order Detail selection rules.
- When opened from Order Detail, Shipment Builder receives recipient name, address, phone, selected items, item main images, quantities, and carrier name when already chosen.
- Recipient/address/carrier edits in Shipment Builder are Shipment snapshots first; they do not update Customer or Order automatically.
- If the Shipment address differs from existing Customer addresses and the Customer has fewer than 3 saved addresses, the user may explicitly save it as a secondary Address Entry. This must not change the Customer default address unless a later Customer flow says so.
- If the Customer already has 3 saved addresses, the new Shipment address remains a Shipment snapshot and admin can edit/remove old Customer addresses separately.
- Stock shortage is a warning/reporting concern after Order acknowledgement; Shipment creation may continue after acknowledgement and log.

## 14. UX Notes for Designer

- Make this screen feel like a single/special-case review editor.
- Do not make it a bulk builder.
- Keep item list and address snapshot visible at the same time.
- Emphasize editable special-case controls: delivery info, COD, notes.
- Keep the save-to-Customer address prompt lightweight; it should not block releasing the Shipment.
- Delivery Note and Shipping Sheet are separate print previews, created from the same Shipment.
- Delivery Note shows item detail and no COD amount; Shipping Sheet shows recipient/address and COD amount where relevant.
- Do not show product prices on delivery documents.
- Make COD warning visible but do not turn the screen into finance/audit work.
- For bulk flows, use saved Order Recipient Detail snapshots as delivery defaults and bypass this screen.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SHIP-002-shipment-builder.md`.

## 16. Open UX Questions

- Which exact bulk cases are safe enough to bypass this screen?
