# SCR-SHIP-005 - Delivery Note Preview

## 1. Purpose

The Delivery Note Preview shows the printable A4 item list for a Shipment. It focuses on product identification, quantity, image, and item notes. It must not show prices.

Approved mockup:

- `docs/ux-ui/mockups/SCR-SHIP-005-delivery-note-preview/SCR-SHIP-005-approved.png`

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Preview the item list before printing.
- Confirm item names, quantities, images, and notes.
- Print Delivery Note alone or alongside Shipping Sheet.
- Avoid confusing Delivery Note with Shipping Sheet.

## 4. Entry Points

- Shipment Builder -> `ดูใบส่งของ`.
- Released Shipment Detail.
- Draft Shipment Detail.

## 5. Exit Points

- Shipment Builder.
- Shipment Detail.
- Shipping Sheet Preview.
- Print dialog.

## 6. Layout Structure

- Header: `ใบส่งของ`, Shipment ID, Order ID, print actions.
- Preview area: A4 page mockup with document title, item table/cards, images, quantities, notes.
- Side panel: document options such as print Delivery Note, print both, go to Shipping Sheet.
- Footer: page count if multiple pages.
- Desktop focus: printable preview should be central and legible.

## 7. Main Components

- A4 print preview
- Document header
- Item table
- Product image thumbnail
- Quantity column
- Notes column
- Print action button
- Toggle/open Shipping Sheet
- No-price guard

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Document title | ใบส่งของ | ใบส่งของ | Delivery Note | Item-focused document. |
| Shipment ID | เลขรอบจัดส่ง | SHIP-2568-0061 | Shipment | Shipment reference. |
| Order ID | เลขออเดอร์ | ORD-2568-0021 | Order | Reference only. |
| Item image | รูปสินค้า | Cabinet thumbnail | Order Line / Job / SKU | Small image if available. |
| Item name | รายการสินค้า | ตู้โชว์ไม้สักแกะลาย | Order Line / Job | No price. |
| Quantity | จำนวน | 1 ชิ้น | Order Line / Job | Required. |
| Item note | หมายเหตุ | ระวังกระจกหน้าบาน | Shipment / Order Line note | Delivery-facing item note. |
| Source | แหล่งที่มา | งานสั่งทำ | Order Line / Job | Optional internal/admin signal, not required for recipient. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Print Delivery Note | พิมพ์ใบส่งของ | Admin | Opens print for Delivery Note only. | No |
| Print both documents | พิมพ์ใบส่งของและใบจัดส่ง | Admin | Opens combined print flow. | No |
| Open Shipping Sheet | ดูใบจัดส่ง | Admin | Opens Shipping Sheet Preview. | No |
| Return to Shipment | กลับไปรอบจัดส่ง | Admin | Returns to Shipment Builder or Detail. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Draft Shipment | ร่างรอบจัดส่ง | Preview from draft Shipment. | Neutral chip. |
| Released Shipment | ปล่อยให้ฝ่ายจัดส่งแล้ว | Preview from released Shipment. | Positive chip. |
| No price | ไม่มีราคาในเอกสาร | Delivery Note must not show price. | Subtle guard label for designer/admin. |
| Image available | มีรูปสินค้า | Item has printable thumbnail. | Optional small icon. |

## 11. Empty State

If no items are available, show `ไม่มีรายการสินค้าในใบส่งของ` and action `กลับไปรอบจัดส่ง`.

## 12. Error State

- Preview load fails: `โหลดใบส่งของไม่สำเร็จ` with retry.
- Print fails: `พิมพ์ใบส่งของไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูใบส่งของ`.
- Missing image: show item row without image; do not block print.

## 13. Permission Rules

- Admin can preview and print.
- Delivery Team may receive printed/physical document but does not edit it.
- Delivery Note must not show sales price.
- Barcode, QR, and label printer flows are outside Stage 1.

## 14. UX Notes for Designer

- Preserve the approved `SCR-SHIP-005` mockup layout.
- Make this look like an A4 print artifact, not an editable page.
- Keep item images small but useful for identification.
- Separate clearly from Shipping Sheet: this is product/item focused.
- No price column.
- Use conservative print typography and enough whitespace for shop use.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SHIP-005-delivery-note-preview.md`.

## 16. Open UX Questions

- None blocking for this print preview.
