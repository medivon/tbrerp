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

Each Material Item has one current primary supplier in the starting workflow. Material Purchase Orders also have exactly one supplier. If waiting-material notes involve several suppliers, the system splits them into separate Material Purchase Orders by supplier.

Material Purchase Orders have no draft status in the starting workflow. They are created directly as `รอรับเข้า` once required fields are complete, can be printed/exported, edited while waiting, cancelled, and accepted only as whole-document receipt. Partial receipt is outside the starting workflow.

Accepting a Material Purchase Order increases material stock and creates a Payment Audit Follow-up for finance/payment review. It does not create an Expense Entry automatically.

When a Material Purchase Order is linked to Jobs waiting for materials, accepting receipt shows a confirmation modal listing the Jobs that will be released from `รอวัตถุดิบ`. Receipt then returns those linked Jobs to their previous department queue and writes a Job Activity Log entry referencing the Material Purchase Order number. It does not add a badge or separate department notification.

Material Adjustment uses one visible screen name, `ปรับยอดวัสดุ`, where staff enter actual counted quantities and the system records the difference. `กระทบยอด` is a reason/mode inside the same adjustment flow, not a separate feature.

## Consequences

The first material workflow stays small enough for real shop use while still covering purchase preparation, receipt, counting, Job release from material wait, and payment follow-up. Finance remains separate from stock. Production and Job work do not depend on material issue records.

The single-supplier-per-material choice keeps purchase selection simple but means buying the same physical material from another supplier requires changing the material's primary supplier for future documents. Old documents keep their captured supplier, so history remains readable.
