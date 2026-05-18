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
- Keep one supplier/store per document.
- Show related Jobs when the document was created from waiting-material notes.
- Print A4 or export JPG/image while the document is `รอรับเข้า`.
- Edit or cancel the document before receipt.
- Accept the whole document into material stock when all goods arrive.
- Review which linked Jobs will leave `รอวัตถุดิบ` before accepting receipt.
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
- Document action bar: create/edit waiting document, print/export, accept into stock, cancel.
- Material lines table.
- Related waiting Jobs panel when the document has Job links.
- Attachment/evidence section.
- Receipt summary section after accepted.
- Payment Audit Follow-up reference after accepted.

## 7. Main Components

- Document status chip
- Supplier/store selector
- Date field
- Material line picker filtered to the selected supplier/store
- Quantity and unit fields
- Related Job reference panel
- Attachment uploader
- Print/export controls
- Whole-document receipt action
- Receipt confirmation modal
- Payment Audit Follow-up reference panel

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Document no. | เลขที่ใบสั่งซื้อวัสดุ | MAT-PO-2568-0001 | Material Purchase Order | Auto-generated. |
| Status | สถานะ | รอรับเข้า | Material Purchase Order | Required. |
| Date | วันที่ | 22 พ.ค. 67 | Material Purchase Order | Required. |
| Supplier/store | ผู้ขาย | ร้านเอ | Supplier | Required. |
| Material name | ชื่อวัสดุ | สีทองโบราณ | Material Item | Required line data. |
| Material code | รหัสวัสดุ | MAT-0001 | Material Item | Auto-generated, searchable. |
| Quantity | จำนวน | 5 | Material PO Line | Required. |
| Unit | หน่วย | กระป๋อง | Material Item / line | Required. |
| Related Job | งานที่เกี่ยวข้อง | JOB-O-2567-0142 | Material Need Note / Job | Only when linked from waiting-material notes. |
| Return department | กลับเข้าคิว | ฝ่ายสี | Job | Shown in receipt confirmation. |
| Attachments | รูป/เอกสารแนบ | receipt image | Attachment | Optional, any status. |
| Receipt date | วันที่รับเข้า | 23 พ.ค. 67 | Material Stock Receipt | After receipt. |
| Payment follow-up | รายการรอตรวจจ่าย | created | Payment Audit Follow-up | After receipt. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Create document | สร้างใบสั่งซื้อวัสดุ | Material purchase permission | Creates document as `รอรับเข้า`. | No |
| Print A4 | พิมพ์ A4 | Allowed viewers | Opens printable document. | No |
| Export image | ส่งออก JPG | Allowed viewers | Exports waiting document image. | No |
| Edit waiting doc | แก้ไข | Material purchase permission | Edits lines/quantities before receipt. | No |
| Attach evidence | แนบรูป/เอกสาร | Allowed by permission | Adds attachment in any status. | No |
| Accept whole document | รับเข้าสต๊อกวัสดุ | Material receipt permission | Increases stock for all lines, releases linked waiting Jobs, and creates Payment Audit Follow-up. | Yes |
| Cancel | ยกเลิกใบสั่งซื้อ | Material purchase permission | Status becomes `ยกเลิก` before receipt and writes Activity Log. | Yes, no reason |

## 10. Status Rules

| Status | Thai Label | Meaning | Editable? |
|---|---|---|---|
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
- Receipt shows a confirmation modal before saving.
- The confirmation modal lists all material lines, linked Jobs that will leave `รอวัตถุดิบ`, and the Payment Audit Follow-up that will be created.
- The confirmation modal lists Job ID, work/product name, department queue the Job returns to, and related material.
- Receiving releases linked Jobs that are still in `รอวัตถุดิบ`.
- Released Jobs return to their previous department queue without a special badge or separate notification.
- Department aging restarts from the release time.
- Job Activity Log records the release with the Material Purchase Order number.
- Linked Jobs already released before receipt are shown as already released when relevant and are not released again.
- Manual Material Purchase Orders without Job links do not release any Jobs.

## 12. Supplier And Material Selection Rules

- One Material Purchase Order has exactly one supplier/store.
- After choosing supplier/store, line selection shows only active Material Items linked to that supplier.
- If waiting-material summary includes multiple suppliers, the system creates separate Material Purchase Orders.
- Free-text waiting-material notes must be matched to an existing Material Item or converted into a new Material Item before entering the document.
- The document cannot be created until required fields are complete.
- Manual Material Purchase Orders cannot link Jobs after creation.
- Material Purchase Orders created from waiting-material notes cannot add new Job links later.
- Normal unlinked material lines may be added to a linked purchase document before receipt.
- Removing a linked material line removes that Job link; if the Job is still in `รอวัตถุดิบ`, it returns to the purchase-summary list.
- Cancelling a linked purchase document removes all Job links; Jobs still in `รอวัตถุดิบ` return to the purchase-summary list.
- Job Detail does not show purchase-document details or a `มีใบสั่งซื้อแล้ว` badge while waiting to receive.

## 13. Empty State

If no lines exist, show `ยังไม่มีรายการวัสดุ` with action `เพิ่มรายการวัสดุ`.

## 14. Error State

- Save fails: `บันทึกใบสั่งซื้อวัสดุไม่สำเร็จ`.
- Receipt fails: `รับเข้าสต๊อกวัสดุไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ทำรายการนี้`.
- Missing required field: show inline field error before save/receipt.

## 15. Permission Rules

- Creating/editing purchase documents, receiving stock, and seeing payment follow-up can be separate permissions.
- Users without receipt permission can prepare or print documents where allowed, but cannot accept into stock.
- Users without finance/payment permission should not see payment-sensitive fields beyond the fact that follow-up exists.

## 16. UX Notes For Designer

- Keep this as an operational purchase document, not an accounting invoice.
- Do not create a `ร่าง` state for this document in the starting workflow.
- Do not show price/total as required fields in the starting workflow.
- Make `รับเข้าสต๊อกวัสดุ` visually serious because it changes material quantities.
- If related Jobs will be released, the confirmation must make that visible before receipt.
- Make the no-partial-receipt rule clear before confirmation.
- Show related Jobs for internal review. The document should not feel like a Job report, but staff need to know what will be released from `รอวัตถุดิบ`.
- Attachments should remain available after receipt.

## 17. Open Decisions

- None blocking for this screen.

## 18. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-016-material-purchase-order.md` as the image generation prompt source.
