# Shipment and Delivery Visual Guidance

Use with `docs/ux-ui/design-system/visual-design-system.md` and the active Shipment/Delivery screen specs.

This file gives visual guidance for:

- Ready-to-ship queue
- Shipment Builder
- Delivery Team dashboard
- Delivery sent-out flow
- Shipment confirmation queue
- Delivery evidence/photo upload
- Delivery Note preview
- Shipping Sheet preview
- COD final-round visibility
- Special Shipment after completed Order

## Visual Role

Shipment screens move ready work from admin preparation into delivery and back to admin confirmation. The visual system must keep three states separate:

- Ready-to-ship admin queue before Shipment exists.
- Released delivery work for Delivery Team.
- Admin confirmation queue after `ส่งออกแล้ว`.

Do not visually merge these into one delivery table.

## Ready-to-Ship Queue

`รอสร้างรอบจัดส่ง` is an admin workbench.

Visual structure:

- Header: `รอสร้างรอบจัดส่ง`.
- Module submenu: `รอสร้างรอบจัดส่ง`, `รายการต้องจัดส่งวันนี้`, `รายการรอวันจัดส่ง`, `ยืนยันการจัดส่ง`, `ประวัติรอบจัดส่ง`.
- Summary strip: ready Orders, due today, stock-ready, completed custom, service, COD.
- Central search: Customer, phone, Order ID, Job ID.
- Dense Order-grouped table.
- Expandable item preview with thumbnails.
- Right drawer for selected Order summary and shipment-start action.

Source chips:

- `สินค้าพร้อมส่ง`
- `งานสั่งทำเสร็จแล้ว`
- `งานบริการ`
- `COD`
- `สร้างรวมได้`
- `ต้องเปิดแยก`
- `สต๊อกติดลบ`

Keep ready work grouped by Order. Avoid loose item chaos.

## Shipment Builder

Shipment Builder is a single/special-case review editor. It is not a bulk builder and it is not a persistent draft.

Visual structure:

- Header: `สร้างรอบจัดส่ง`, source Order ID, temporary chip `กำลังสร้างรอบจัดส่ง`.
- Left panel: `รายการพร้อมส่ง`.
- Right panel: `ข้อมูลจัดส่ง`.
- Document buttons: `ดูใบส่งของ`, `ดูใบจัดส่ง`.
- Footer: `พร้อมจัดส่ง`, `ยกเลิก`.

Show item list and address snapshot at the same time. This is where admin confirms or edits recipient/address/carrier/date/note before release.

No saved draft styling. If the user exits after edits, use the active behavior warning `ออกโดยไม่สร้างรอบจัดส่ง` / `อยู่ต่อ`.

## COD Final-round Visibility

COD is a read-only final-round signal in Shipment Builder.

Visual rules:

- Show COD amount only to users with permission.
- If the selected Shipment is not the final Order-closing round, show disabled `COD` with reason such as `เปิด COD ได้เฉพาะรอบสุดท้าย`.
- Do not provide COD editing in Shipment Builder.
- Shipping Sheet can show COD where relevant and permission-visible.
- Delivery Team can see COD only for Shipments they are responsible for.

Do not show COD on Delivery Note.

## Stock Warning Acknowledgement in Shipment Builder

Stock-negative selected ready-stock lines can proceed after acknowledgement where active docs allow.

Visual pattern:

- Warning row/chip on affected item.
- Acknowledgement modal with `รับทราบและสร้างรอบจัดส่งต่อ` and `กลับไปตรวจสต๊อก`.
- No reason field and no Manager approval.
- Log acknowledgement and keep stock warning visible elsewhere.

## Delivery Team Dashboard

Delivery uses the simple mobile/tablet worker shell.

Visual structure:

- Header: `ฝ่ายจัดส่ง`, date, delivery count.
- Tabs:
  - `รายการต้องจัดส่งวันนี้`
  - `รายการรอวันจัดส่ง`
- Today cards include no-date Shipments.
- Waiting-date cards grouped by future delivery date.
- Same-day history: `ส่งออกแล้ววันนี้`.

Shipment card:

- Recipient, phone, short address, carrier.
- Item thumbnail/summary.
- COD amount only if responsible and relevant.
- Read-only treatment for address/carrier/COD.
- Primary action `ส่งออกแล้ว`.
- Secondary `เปิดรอบจัดส่ง`.

No Tracking input, no Shipment creation, no COD edit, no close Shipment, no payment-follow-up close.

## Delivery Sent-out Flow

`ส่งออกแล้ว` is a delivery handoff, not final close.

Visual rules:

- Single `ส่งออกแล้ว`: short confirmation only.
- Bulk `บันทึกว่าส่งออกแล้ว`: confirmation modal summarizing count and selected Shipments.
- Optional photo upload must not look required.
- After send-out, item leaves active today list and appears in `ส่งออกแล้ววันนี้`.
- Use chip `ส่งออกแล้ว` with sublabel/secondary chip `ยืนยันการจัดส่ง` where needed to show admin confirmation is pending.

## Delivery Evidence / Photo Upload

Use the shared evidence/photo upload pattern.

Delivery Team:

- Can add `รูปหลักฐานจัดส่ง` optionally on individual Shipment.
- Can add photo/note from `ส่งออกแล้ววันนี้` until Admin closes.
- Does not add Tracking.

Admin confirmation:

- Must have Tracking or at least one delivery evidence photo before close.
- Evidence drawer/panel should show thumbnails and Tracking field together.
- Missing evidence error: `กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง`.

## Shipment Confirmation Queue

`ยืนยันการจัดส่ง` is a dense admin queue after Delivery Team marks sent out.

Visual structure:

- Header: `ยืนยันการจัดส่ง`.
- Summary strip: all waiting, missing tracking, evidence complete, evidence missing, COD.
- Filters: `ทั้งหมด`, `รอเลขพัสดุ`, `หลักฐานครบ`, `หลักฐานไม่ครบ`, `COD`.
- Dense table with Shipment ID, related Order, sent-out time, recipient, carrier, evidence/tracking status, follow-up signal, explicit `ตรวจหลักฐาน` / `เปิดรอบจัดส่ง`.
- Right evidence drawer with Tracking, photo grid, item/address summary, and close action.

Once Tracking or evidence exists, `ยืนยันและปิดรอบจัดส่ง` does not need another confirmation modal; evidence review is the confirmation interaction.

Financial Follow-up remains separate after close.

## Delivery Note Preview

`ใบส่งของ` is item-focused.

Visual rules:

- A4 preview centered.
- Print controls outside the page.
- Show Shipment ID, Order ID reference, product images, item names, SKU/color where useful, quantity, item notes.
- No price column.
- No COD amount.
- Missing image should show a clean blank/placeholder row and not block print.

## Shipping Sheet Preview

`ใบจัดส่ง` is recipient/address-focused.

Visual rules:

- A4 preview centered.
- Recipient, phone, and address are dominant.
- Show carrier, delivery date, short item summary, delivery note.
- Show COD only where relevant and permission-visible.
- Keep item summary short; full item detail belongs to Delivery Note.

## Special Shipment After Completed Order

`รอบจัดส่งพิเศษ` is Owner/Manager-only from completed Order Detail.

Visual treatment:

- Strong exception banner: `รอบจัดส่งพิเศษ`.
- Required reason field.
- Clear chips: `ไม่กระทบสต๊อก` and `ไม่กระทบสถานะออเดอร์`.
- Selected items summary.
- Management Log reminder in confirmation.

Do not make it look like normal Shipment Builder from active Order work. Admin/Sales should use Service Case for normal post-completion customer problems.

## Old Mockup References

Archived shipment/delivery images may inform document preview composition and row density only. Current specs override any saved shipment draft visuals, COD editing visuals, proof-required-before-send-out visuals, or delivery-team Tracking/close controls.
