# Light Material Stock Boundary

Material stock in the starting workflow is a lightweight operational stock area, not a full Material Master, warehouse, BOM, or accounting system. It tracks easy-to-count internal materials such as color supplies, drawer rails, staples, and similar consumables through receipt and adjustment only.

## Considered Options

- Build a full material warehouse with locations, transfers, BOM, production issue, and automatic consumption.
- Keep materials outside the system and let staff manage them manually.
- Add `สต๊อกวัสดุ` as a lightweight stock area with Material Purchase Orders, whole-document receipt, and Material Adjustment.

## Decision

Use the lightweight option for `โหมดเริ่มใช้งานจริง`.

Material stock is separate from Product/SKU ready stock. It shows `จำนวนที่มีอยู่`, latest receipt/adjustment, and simple movement history. It does not use `จองแล้ว` or `ขายได้`.

Jobs can be marked `รอวัตถุดิบ` with material names/notes, and those notes may appear as waiting-material alerts in Material Stock. They do not reserve, issue, move, or deduct material stock.

Material Purchase Orders can be drafted, moved to `รอรับเข้า`, printed/exported, edited while waiting, cancelled, and accepted only as whole-document receipt. Partial receipt is outside the starting workflow.

Accepting a Material Purchase Order increases material stock and creates a Payment Audit Follow-up for finance/payment review. It does not create an Expense Entry automatically.

Material Adjustment uses one visible screen name, `ปรับยอดวัสดุ`, where staff enter actual counted quantities and the system records the difference. `กระทบยอด` is a reason/mode inside the same adjustment flow, not a separate feature.

## Consequences

The first material workflow stays small enough for real shop use while still covering purchase preparation, receipt, counting, and follow-up. Finance remains separate from stock. Production and Job work do not depend on material issue records.

One supplier/material modeling detail remains open before implementation: if the same physical material can be bought from multiple suppliers, should the system create separate Material Items per supplier, or allow multiple suppliers on one Material Item?
