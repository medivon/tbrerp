# SCR-SUP-016 - Material Purchase Order

## 1. Purpose

Material Purchase Order is the operational document for preparing material purchase lists, printing/exporting the waiting-to-receive document, and accepting the whole document into `สต๊อกวัสดุ`.

It is not an Expense Entry and does not create accounting records automatically.

## 2. Primary Users

- Material purchase-permission user
- Material stock receipt-permission user
- Manager / Owner
- Finance/payment-audit permission user for follow-up visibility

## 3. User Goals

- Create a material purchase document from waiting-material notes or manually.
- Add one or many material lines.
- Print A4 or export JPG/image while the document is `รอรับเข้า`.
- Edit or cancel the document before receipt.
- Accept the whole document into material stock when all goods arrive.
- Send finance/payment context to Payment Audit Follow-up without creating Expense automatically.

## 4. Entry Points

- Material Stock -> `สร้างใบสั่งซื้อวัสดุ`.
- Material Stock -> waiting-material summary -> `สรุปรายการสั่งซื้อ`.
- Manual material purchase creation.

## 5. Exit Points

- Material Stock after receipt.
- Payment Audit Follow-up after receipt.
- Material Purchase Order list/detail.

## 6. Layout Structure

- Header with document number, status, date, and supplier/store.
- Document action bar: save draft, move to waiting, print/export, accept into stock, cancel.
- Material lines table.
- Attachment/evidence section.
- Receipt summary section after accepted.
- Payment Audit Follow-up reference after accepted.

## 7. Main Components

- Document status chip
- Supplier/store selector
- Date field
- Material line picker
- Quantity and unit fields
- Attachment uploader
- Print/export controls
- Whole-document receipt action
- Payment Audit Follow-up reference panel

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Document no. | เลขที่ใบสั่งซื้อวัสดุ | MAT-PO-2568-0001 | Material Purchase Order | Auto-generated. |
| Status | สถานะ | รอรับเข้า | Material Purchase Order | Required. |
| Date | วันที่ | 22 พ.ค. 67 | Material Purchase Order | Required. |
| Supplier/store | ผู้ขาย | ร้านเอ | Supplier | Required. |
| Material name | ชื่อวัสดุ | สีทองโบราณ | Material Item | Required line data. |
| Quantity | จำนวน | 5 | Material PO Line | Required. |
| Unit | หน่วย | กระป๋อง | Material Item / line | Required. |
| Attachments | รูป/เอกสารแนบ | receipt image | Attachment | Optional, any status. |
| Receipt date | วันที่รับเข้า | 23 พ.ค. 67 | Material Stock Receipt | After receipt. |
| Payment follow-up | รายการรอตรวจจ่าย | created | Payment Audit Follow-up | After receipt. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Save draft | บันทึกร่าง | Material purchase permission | Saves as `ร่าง`. | No |
| Move to waiting | ส่งไปรอรับเข้า | Material purchase permission | Status becomes `รอรับเข้า`. | No |
| Print A4 | พิมพ์ A4 | Allowed viewers | Opens printable document. | No |
| Export image | ส่งออก JPG | Allowed viewers | Exports waiting document image. | No |
| Edit waiting doc | แก้ไข | Material purchase permission | Edits lines before receipt. | No |
| Attach evidence | แนบรูป/เอกสาร | Allowed by permission | Adds attachment in any status. | No |
| Accept whole document | รับเข้าสต๊อกวัสดุ | Material receipt permission | Increases stock for all lines and creates Payment Audit Follow-up. | Yes |
| Cancel | ยกเลิกใบสั่งซื้อ | Material purchase permission | Status becomes `ยกเลิก`. | Yes |

## 10. Status Rules

| Status | Thai Label | Meaning | Editable? |
|---|---|---|---|
| Draft | ร่าง | Preparing document. | Yes |
| Waiting to receive | รอรับเข้า | Ready to buy/receive; printable/exportable. | Yes |
| Received | รับเข้าสต๊อกแล้ว | Whole document accepted into Material Stock. | No line/quantity edit |
| Cancelled | ยกเลิก | Cancelled before receipt. | No |

## 11. Receipt Rules

- Receipt is whole-document only.
- If goods are incomplete, do not receive yet.
- After receipt, stock increases for every line.
- After receipt, lines and quantities are not edited.
- Errors after receipt are corrected through `ปรับยอดวัสดุ`.
- Receipt creates Payment Audit Follow-up, not Expense Entry.

## 12. Empty State

If no lines exist, show `ยังไม่มีรายการวัสดุ` with action `เพิ่มรายการวัสดุ`.

## 13. Error State

- Save fails: `บันทึกใบสั่งซื้อวัสดุไม่สำเร็จ`.
- Receipt fails: `รับเข้าสต๊อกวัสดุไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ทำรายการนี้`.
- Missing required field: show inline field error before save/receipt.

## 14. Permission Rules

- Creating/editing purchase documents, receiving stock, and seeing payment follow-up can be separate permissions.
- Users without receipt permission can prepare or print documents where allowed, but cannot accept into stock.
- Users without finance/payment permission should not see payment-sensitive fields beyond the fact that follow-up exists.

## 15. UX Notes For Designer

- Keep this as an operational purchase document, not an accounting invoice.
- Do not show price/total as required fields in the starting workflow.
- Make `รับเข้าสต๊อกวัสดุ` visually serious because it changes material quantities.
- Make the no-partial-receipt rule clear before confirmation.
- Attachments should remain available after receipt.

## 16. Open Decisions

- Exact supplier/material cardinality is still open and affects the material line picker: if one material can have multiple suppliers, the purchase flow needs a clear rule for how the user chooses the supplier-specific item.

## 17. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-016-material-purchase-order.md` as the image generation prompt source.
