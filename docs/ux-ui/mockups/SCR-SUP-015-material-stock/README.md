# SCR-SUP-015 - Material Stock Mockup

Status: Spec Needed

Approved image:

- None yet.

Related documents:

- `docs/ux-ui/screens/SCR-SUP-015-material-stock.md`
- `docs/ux-ui/image-prompts/IMG-SUP-015-material-stock.md`
- `docs/adr/0009-light-material-stock-boundary.md`

## Intended Role

This future mockup should become the visual anchor for `สต๊อกวัสดุ`, the lightweight material-stock hub under `สินค้า / สต๊อก`.

It must preserve:

- Material stock is separate from Product/SKU ready stock.
- The stock label is `จำนวนที่มีอยู่`.
- `รอวัตถุดิบ` notes are alerts/requests only, not reservations or stock deductions.
- The main actions are `สร้างใบสั่งซื้อวัสดุ` and `ปรับยอดวัสดุ`.
- No accounting, price, tax, Expense Entry, BOM, warehouse transfer, or automatic material issue is shown.

## Pending Before Approval

- Generate and review a high-fidelity mockup from `IMG-SUP-015`.
- Confirm supplier/material cardinality before turning supplier behavior into implementation detail.
