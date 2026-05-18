# SCR-SUP-019 - Product Stock Receipt

## 1. Purpose

`รับเข้าสินค้า` records one receipt round against a Product Purchase Order and increases Ready Stock for the received SKU quantities.

It is not Material Stock Receipt and it is not Stock Adjustment.

## 2. Primary Actors

- Stock-permission user
- Product purchase/stock-permission user
- Manager / owner

## 3. Entry Points

- Product Purchase Order -> `รับเข้าสินค้า`
- Product Purchase Order line -> receive remaining quantity

## 4. Exit Points

- Product Purchase Order
- Ready Stock View
- SKU Stock Movement history

## 5. Layout

- Header: `รับเข้าสินค้า`, Product Purchase Order number, Supplier/Store, current status.
- Receipt metadata: receiver, receipt date, optional note/evidence.
- Receive table:
  - SKU image
  - SKU หลัก / SKU ย่อย / code
  - ordered quantity
  - already received
  - remaining quantity
  - receive full checkbox/button
  - actual received quantity
- Footer: `บันทึกรับเข้า`, `ยกเลิก`.

## 6. Data Shown

| Data | Thai Label | Example | Source | Notes |
|---|---|---|---|---|
| Product PO no. | เลขที่ใบสั่งซื้อสินค้า | PROD-PO-2568-0004 | Product Purchase Order | Required. |
| Receipt round | รอบรับเข้า | รอบที่ 2 | Product Stock Receipt | Generated on save. |
| Receiver | ผู้รับเข้า | Admin A | User | Defaults to current user; editable by permission. |
| Receipt date | วันที่รับเข้า | 24 พ.ค. 67 | User/system | Defaults to today; editable by permission. |
| SKU line | รายการสินค้า | TBR-TBL-123-OAK | SKU Variant | Required. |
| Remaining qty | ค้างรับ | 7 | Product Purchase Order Line | Maximum receivable. |
| Received now | รับเข้าครั้งนี้ | 3 | User entry | Cannot exceed remaining. |
| Evidence | หลักฐาน | photos/files | Attachment | Optional. |

## 7. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Mark full line | รับเต็มบรรทัด | Stock permission | Fills received quantity with remaining quantity. | No |
| Save receipt | บันทึกรับเข้า | Stock permission | Opens receipt review modal, then creates immutable receipt round, increases Ready Stock, records Stock Movement. | Yes |
| Cancel | ยกเลิก | All allowed users | Leaves without receipt. | No |

## 8. Rules

- At least one line must have received quantity greater than zero.
- Received quantity cannot exceed remaining ordered quantity.
- Over-receipt is blocked inline and explains that excess goods require a new Product Purchase Order.
- Received quantity can be less than remaining ordered quantity.
- Optional evidence can be attached but is not required.
- Saved Product Stock Receipt rounds are immutable. If the receiver saved the wrong quantity, correct stock through `ปรับยอดสต๊อกสินค้า` / Stock Movement instead of editing this receipt.
- The receipt review modal summarizes SKU, received quantity, stock increase, and whether Payment Audit Follow-up will be created.
- After successful save, return to Product Purchase Order detail with the new receipt round and updated status.
- If missing goods later arrive because a previous receipt was over-recorded, do not receive them again on the old document.
- Saving receipt updates Product Purchase Order status:
  - all lines fully received -> `รับเข้าสต๊อกแล้ว`
  - some remaining quantity exists -> `รับเข้าบางส่วน`
- Full receipt creates Payment Audit Follow-up from the Product Purchase Order only after every line validates `รับเข้าแล้ว = จำนวนสั่งซื้อ` and no line is `รับเข้าสต๊อกยังไม่ครบ`.
- Partial receipt does not create Payment Audit Follow-up.
- Receipt creates Stock Movement type `รับเข้าจากใบสั่งซื้อ`.

## 9. Error States

- Quantity over remaining: `รับเข้าเกินจำนวนค้างรับไม่ได้`.
- No received quantity: `กรุณาระบุจำนวนรับเข้าอย่างน้อย 1 รายการ`.
- Permission fails: `ไม่มีสิทธิ์รับเข้าสินค้า`.

## 10. UX Notes

- Make ordered / received / remaining numbers visually clear.
- Keep the form fast for partial delivery cases.
- Do not ask the receiver to handle payment audit during stock receipt.
