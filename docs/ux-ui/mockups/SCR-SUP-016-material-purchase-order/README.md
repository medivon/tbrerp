# SCR-SUP-016 - Material Purchase Order Mockup

Status: Spec Needed

Approved image:

- None yet.

Related documents:

- `docs/ux-ui/screens/SCR-SUP-016-material-purchase-order.md`
- `docs/ux-ui/image-prompts/IMG-SUP-016-material-purchase-order.md`
- `docs/adr/0009-light-material-stock-boundary.md`

## Intended Role

This future mockup should become the visual anchor for `ใบสั่งซื้อวัสดุ`, the operational purchase document that can be printed/exported while `รอรับเข้า` and accepted as a whole document into material stock.

It must preserve:

- Statuses: `ร่าง`, `รอรับเข้า`, `รับเข้าสต๊อกแล้ว`, `ยกเลิก`.
- Whole-document receipt only; no partial receipt controls.
- Required fields: date, supplier/store, material lines, quantity, and unit.
- No required price/total fields in the starting workflow.
- Receipt creates Payment Audit Follow-up, not Expense Entry.
- Attachments can be added in any status.

## Pending Before Approval

- Generate and review a high-fidelity mockup from `IMG-SUP-016`.
- Confirm supplier/material cardinality before finalizing material line selection behavior.
