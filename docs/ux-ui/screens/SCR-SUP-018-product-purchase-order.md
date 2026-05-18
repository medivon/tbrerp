# SCR-SUP-018 - Product Purchase Order

## 1. Purpose

`ใบสั่งซื้อสินค้า` is the product-stock purchase document for bringing finished SKU items into Ready Stock from a Supplier/Store.

It is separate from `ใบสั่งซื้อวัสดุ`. Product purchase can receive partially, while material purchase remains whole-document receipt in the starting workflow.

## 2. Primary Actors

- Product purchase/stock-permission user
- Stock-permission user
- Manager / owner
- Finance/payment-audit user after full receipt

## 3. Entry Points

- Ready Stock View -> `สร้างใบสั่งซื้อสินค้า`
- Product/SKU Table
- SKU Variant Detail
- Manual product purchase creation

## 4. Exit Points

- Product Stock Receipt
- Ready Stock View
- SKU Stock Movement history
- Payment Audit Follow-up after full receipt

## 5. Layout

- Header: document number, status, date, Supplier/Store.
- Supplier snapshot block.
- SKU line table:
  - SKU image
  - SKU หลัก / SKU ย่อย / color / code
  - ordered quantity
  - received quantity
  - remaining quantity
  - optional purchase price/cost
  - line status
  - close reason / linked movement when line is `รับเข้าสต๊อกยังไม่ครบ`
- Receipt rounds section.
- Attachments section.
- Footer actions.

## 6. Data Shown

| Data | Thai Label | Example | Source | Notes |
|---|---|---|---|---|
| Document no. | เลขที่ใบสั่งซื้อสินค้า | PROD-PO-2568-0004 | Product Purchase Order | Auto-generated. |
| Status | สถานะ | รับเข้าบางส่วน | Product Purchase Order | Required. |
| Date | วันที่ | 22 พ.ค. 67 | Product Purchase Order | Required. |
| Supplier/Store | ผู้ขาย | ร้านเอ | Supplier snapshot | Required. |
| SKU line | รายการสินค้า | TBR-TBL-123-OAK | SKU Variant | Any active SKU can be selected. |
| Ordered qty | จำนวนสั่งซื้อ | 10 | Product Purchase Order Line | Required. |
| Received qty | รับเข้าแล้ว | 3 | Product Stock Receipt | Computed sum. |
| Remaining qty | ค้างรับ | 7 | Computed | Cannot receive beyond this. |
| Purchase price | ราคาซื้อ | 1,500 | Optional line data | Optional in first workflow. |
| Close reason | เหตุผลปิดยอดที่เหลือ | ปรับยอดแล้ว | Product Purchase Order Line | Required only when closing remaining quantity. |
| Linked movement | รายการปรับยอดที่เกี่ยวข้อง | ADJ-2568-003 | Stock Movement | Required only when reason is `ปรับยอดแล้ว`. |
| Receipt rounds | รอบรับเข้า | รอบที่ 1: 3 ชิ้น | Product Stock Receipt | Shows receiver/date. |

## 7. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Create document | สร้างใบสั่งซื้อสินค้า | Product purchase/stock permission | Creates document as `รอรับเข้า`. | No |
| Edit waiting lines | แก้ไขรายการ | Product purchase/stock permission | Edits unreceived quantities and optional price. | No |
| Receive stock | รับเข้าสินค้า | Stock permission | Opens Product Stock Receipt. | Yes |
| Close remaining | ปิดยอดที่เหลือ | Stock permission / manager | Opens modal/page summarizing selected lines, remaining quantity, reason, linked Stock Movement when needed, then closes remaining unreceived quantity. | Yes |
| Cancel document | ยกเลิก | Product purchase/stock permission | Cancels document only if no receipt happened; writes Activity Log. | Yes, no reason |
| Print/export | พิมพ์ / ส่งออก | Product purchase/stock permission | Outputs document with status marker. | No |
| Attach evidence | แนบหลักฐาน | Product purchase/stock permission | Adds files/images. | No |

## 8. Status / Chips

| Status | Thai Label | Meaning | Line/quantity edit |
|---|---|---|---|
| Waiting receipt | รอรับเข้า | Created but no receipt yet. | Editable |
| Partial receipt | รับเข้าบางส่วน | Some quantity received, remaining still open. | Only unreceived remaining quantity editable |
| Received | รับเข้าสต๊อกแล้ว | All ordered quantities received. | No quantity edit |
| Incomplete received | รับเข้าสต๊อกยังไม่ครบ | At least one line has remaining quantity intentionally closed. | No quantity edit for closed lines |
| Cancelled | ยกเลิก | No receipt happened and document cancelled. | No quantity edit |

## 9. Product Receipt Rules

- Product Purchase Order can receive partially per SKU line.
- Each SKU line has its own receipt status. The document status becomes `รับเข้าสต๊อกยังไม่ครบ` if any line is terminal incomplete.
- User can mark a line as fully received or enter actual received quantity.
- Receipt quantity cannot exceed remaining ordered quantity.
- If goods arrive over ordered quantity, receive only the remaining quantity in this document. Extra goods require a user-created new Product Purchase Order; the system does not store pending over-delivery.
- After partial receipt, ordered quantity cannot be reduced below already received quantity.
- `ปิดยอดที่เหลือ` closes remaining unreceived quantity on selected SKU line(s) and requires a reason.
- Standard `ปิดยอดที่เหลือ` reasons: `สินค้าเสียหาย`, `ผู้ขายส่งไม่ครบ`, `ยกเลิกจำนวนที่เหลือ`, `ปรับยอดแล้ว`, `อื่น ๆ`.
- If reason `ปรับยอดแล้ว` is selected, user must link to Stock Count / Stock Adjustment movement for the same SKU; linked positive movement quantity must be at least the remaining quantity being closed.
- If reason `ปรับยอดแล้ว` has no valid linked same-SKU movement with enough positive quantity, block confirmation and provide a path to create or select the correct movement.
- If a receipt was under-recorded and the Product Purchase Order remains open, user may receive additional quantity in the same document.
- If stock was already corrected by adjustment/internal communication, close the remaining line with reason `ปรับยอดแล้ว`.
- Product Stock Receipt rounds are immutable; wrong receipt quantities are corrected through `ปรับยอดสต๊อกสินค้า` / Stock Movement, not by editing old receipt rounds.
- If an incorrect receipt made the document `รับเข้าสต๊อกแล้ว`, the document status does not automatically roll back; correction happens through Stock Adjustment / Stock Movement.
- If no receipt has happened, `ยกเลิก` does not require a reason.

## 10. Payment Audit

- Payment Audit Follow-up is created only when the Product Purchase Order is fully received as `รับเข้าสต๊อกแล้ว`.
- Before creating Payment Audit Follow-up, validate every line has `รับเข้าแล้ว = จำนวนสั่งซื้อ` and no line is `รับเข้าสต๊อกยังไม่ครบ`.
- Payment Audit references the full purchase document, not individual receipt rounds.
- `รับเข้าสต๊อกยังไม่ครบ` and `ยกเลิก` do not create Payment Audit Follow-up.
- If Payment Audit Follow-up already exists and receipt is later found wrong, the audit record is not automatically edited/cancelled; finance/audit handles it with the full document and later Stock Movements.

## 11. Supplier Rules

- Supplier/Store master can be shared with material purchase.
- Product Purchase Order snapshots Supplier/Store data at document creation.
- Product Purchase Order does not require Supplier-SKU relations.
- SKU picker shows all active SKU Variants, not only SKUs previously bought from the selected Supplier.

## 12. UX Notes

- Make partial receipt state visually obvious.
- Make `รับเข้าบางส่วน` (still waiting) visually distinct from `รับเข้าสต๊อกยังไม่ครบ` (terminal incomplete).
- Keep product purchase separate from material purchase even if Thai status words overlap.
- Show receipt progress as ordered / received / remaining.
