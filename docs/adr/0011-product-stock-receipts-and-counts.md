# Product Stock Receipts And Counts Stay Separate From Material Stock

Product stock uses `ใบสั่งซื้อสินค้า` with partial receiving, while material stock keeps whole-document Material Purchase Order receipt. A SKU-tied `JOB-P` still increases Ready Stock when the Job is completed; product receiving is for purchase documents and similar external stock-in, and product stock count records actual `มีอยู่ในร้าน` without making stock counters reason about reservations or `ขายได้`.

Product receipt rounds are immutable after save. Incorrect receipt quantities are corrected through `ปรับยอดสต๊อกสินค้า` / Stock Movement instead of editing the original receipt. If a Product Purchase Order has remaining quantity that the team will not receive, the action is `ปิดยอดที่เหลือ`; the affected line and document use terminal status `รับเข้าสต๊อกยังไม่ครบ`.

## Considered Options

- Reuse Material Purchase Order receipt behavior for product stock.
- Route completed `JOB-P` into product receiving.
- Keep product purchase receipt, production stock-in, and product stock count as separate domain actions.

## Consequences

Product and material screens may share Thai words such as `รอรับเข้า` and `เข้าสต๊อก`, but domain/code must distinguish Product Stock Receipt, Material Stock Receipt, and Production Job completion. Product Purchase Orders can receive partially and create Payment Audit Follow-up only when every line is fully received; Material Purchase Orders remain whole-document receipt.

Product Purchase Orders with any `รับเข้าสต๊อกยังไม่ครบ` line do not create Payment Audit Follow-up. When the close reason is `ปรับยอดแล้ว`, the line must link to a same-SKU Stock Count or Stock Adjustment movement that increases stock by at least the remaining quantity being closed.
