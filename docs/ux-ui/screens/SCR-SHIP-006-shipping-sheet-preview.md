# SCR-SHIP-006 - Shipping Sheet Preview

## 1. Purpose

The Shipping Sheet Preview shows the printable A4 recipient/address sheet for a Shipment. It focuses on recipient, phone, address, carrier, references, COD amount where relevant, and a short item summary.

Approved mockup:

- `docs/ux-ui/mockups/SCR-SHIP-006-shipping-sheet-preview/SCR-SHIP-006-approved.png`

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user
- Responsible Delivery Team where the delivery workflow exposes the sheet

## 3. User Goals

- Preview recipient and address information before printing.
- Confirm carrier, phone, address, and delivery notes.
- Print Shipping Sheet alone or with Delivery Note.
- Preview the same document format on mobile before printing/sharing.
- Avoid confusing Shipping Sheet with Delivery Note.

## 4. Entry Points

- Shipment Builder -> `ดูใบจัดส่ง`.
- Released Shipment Detail.
- Responsible Delivery Team delivery view where allowed.
- Delivery Note Preview.

## 5. Exit Points

- Shipment Builder.
- Shipment Detail.
- Delivery view.
- Delivery Note Preview.
- Print dialog.

## 6. Layout Structure

- Header: `ใบจัดส่ง`, Shipment ID, print actions.
- Preview area: A4 page mockup focused on recipient/address block.
- Main document content: recipient, phone, address, carrier, delivery date, COD amount if relevant, short item summary, notes.
- Side panel: print Shipping Sheet, print both, open Delivery Note.
- Desktop focus: printable page centered, controls outside print area.

## 7. Main Components

- A4 print preview
- Recipient/address block
- Carrier block
- Delivery date block
- COD amount field where relevant
- Short item summary
- Delivery note block
- Print action button
- Toggle/open Delivery Note

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Document title | ใบจัดส่ง | ใบจัดส่ง | Shipping Sheet | Address-focused document. |
| Shipment ID | เลขรอบจัดส่ง | SHIP-2568-0061 | Shipment | Shipment reference. |
| Recipient | ผู้รับสินค้า | คุณภพ | Shipment address snapshot | Snapshot from selected Address Entry. |
| Phone | เบอร์โทร | 081-234-5678 | Shipment address snapshot | Delivery contact. |
| Address | ที่อยู่จัดส่ง | 99/12 ถ.เจริญกรุง กรุงเทพฯ | Shipment address snapshot | Main document content. |
| Carrier | ขนส่ง | รถร้าน | Shipment | Delivery team cannot change later. |
| Delivery date | วันจัดส่ง | 20 พ.ค. 2569 | Shipment | If empty, delivery dashboard treats as today. |
| COD | COD | 12,000 บาท | Shipment | Show on Shipping Sheet when this is the final Order-closing Shipment round and the user has COD/payment permission or is the responsible Delivery Team for that Shipment. |
| Short item summary | สรุปรายการ | ตู้โชว์ไม้สัก 1 ชิ้น | Shipment / Order Line | Summary only; full item list is Delivery Note. |
| Delivery note | หมายเหตุจัดส่ง | โทรก่อนส่ง | Shipment | Useful for delivery team. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Print Shipping Sheet | พิมพ์ใบจัดส่ง | Admin / responsible Delivery Team where allowed | Opens print for Shipping Sheet only, with permission-aware COD visibility. | No |
| Print both documents | พิมพ์ใบส่งของและใบจัดส่ง | Admin / responsible Delivery Team where allowed | Opens combined print flow, with permission-aware COD visibility. | No |
| Open Delivery Note | ดูใบส่งของ | Admin / responsible Delivery Team where allowed | Opens Delivery Note Preview. | No |
| Return to Shipment | กลับไปรอบจัดส่ง | Admin / responsible Delivery Team where allowed | Returns to Shipment Builder, Detail, or delivery view. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Builder preview | ตัวอย่างก่อนปล่อยจัดส่ง | Preview before Shipment release; real print is after release. | Neutral chip. |
| Released Shipment | ปล่อยให้ฝ่ายจัดส่งแล้ว | Preview from released Shipment. | Positive chip. |
| COD | COD | Final Order-closing Shipment carries COD amount on this document. | Document-aware chip/field. |
| Address snapshot | ข้อมูลจัดส่งถูกบันทึกแล้ว | Shipment stores recipient/address snapshot. | Subtle info chip. |

## 11. Empty State

If recipient/address data is missing, show `ไม่มีข้อมูลผู้รับสินค้าในใบจัดส่ง` and action `กลับไปรอบจัดส่ง`.

## 12. Error State

- Preview load fails: `โหลดใบจัดส่งไม่สำเร็จ` with retry.
- Print fails: `พิมพ์ใบจัดส่งไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูใบจัดส่ง`.
- Missing required recipient/address: block print until admin returns to Shipment Builder.

## 13. Permission Rules

- Admin and responsible Delivery Team where allowed can preview and print.
- Preview is allowed from Shipment Builder before release; real print is allowed only after release.
- COD amount is visible/printable to users allowed to see that COD, including Delivery Team for Shipments they are responsible for.
- Delivery Team cannot edit address, carrier, or COD.
- Delivery Team may receive the printed/physical Shipping Sheet and see COD amount for assigned Shipments.
- Shipping Sheet focuses on recipient/address; Delivery Note handles full item detail.
- Routine reprint does not need a print log in the starting workflow.
- Barcode, QR, and label printer flows are outside Stage 1.

## 14. UX Notes for Designer

- Preserve the approved `SCR-SHIP-006` mockup layout.
- Make recipient name, phone, and address the dominant content.
- Keep item summary short.
- Keep print controls outside the A4 preview area.
- Make this visually distinct from Delivery Note.
- Use large readable address typography for physical delivery use.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SHIP-006-shipping-sheet-preview.md`.

## 16. Open UX Questions

- None blocking for this print preview.
