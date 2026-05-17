# SCR-ADM-007 - COD/Payment Follow-up Queue

Approved mockup:

- `docs/ux-ui/mockups/SCR-ADM-007-cod-payment-follow-up-queue/SCR-ADM-007-approved.png`

## 1. Purpose

COD/Payment Follow-up Queue is the desktop admin screen `ติดตาม COD / Payment`. It tracks payment/COD follow-up items separately from operational Order Completion and Shipment close.

This screen helps Admin or finance-permission users see which Orders or shipment rounds still need money follow-up, without blocking delivery completion. It is not a full accounting, tax, or audit screen.

## 2. Primary Users

- Admin/Sales for follow-ups from Orders/Shipments they manage
- Owner / Manager
- Finance-permission user

## 3. User Goals

- See payment follow-up items that remain after Order/Shipment operations.
- Track COD money return, outstanding balance, retained deposit, credit, refund, or payment evidence follow-up.
- Open the related Order or shipment round.
- Record payment follow-up notes or payment records where allowed.
- Close follow-up items when the money issue is resolved.
- Treat close as operational finance follow-up resolution, not full accounting approval.
- Correct Payment Records only with visible old/new values and reason.
- Re-check a closed follow-up if the Payment Record amount used to close it is later corrected.
- Avoid overpayment workflow complexity; record the accepted Order/context amount and handle any excess outside this workflow.

## 4. Entry Points

- `แดชบอร์ด` -> `ติดตาม COD / Payment`.
- Sidebar `รายจ่าย` or finance-permission work area -> `ติดตาม COD / Payment`.
- Shipment creation/release when a Shipment carries COD.
- Shipment Confirmation Queue when a shipment closes but COD/payment remains open.
- Order Detail financial follow-up signal.

## 5. Exit Points

- Related Order Detail.
- Related shipment round detail.
- Payment Record detail.
- Admin Dashboard.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `รายจ่าย`.
- Header: `ติดตาม COD / Payment`, count summary, search/filter.
- Summary strip: all follow-ups, COD waiting, outstanding balance, payment evidence, abnormal COD note, resolved today.
- Filter chips: `ทั้งหมด`, `COD`, `ค้างชำระ`, `รอตรวจหลักฐาน`, `COD ผิดปกติ`, `ปิดแล้ววันนี้`.
- Main content: dense financial follow-up table/list.
- Right detail drawer: selected follow-up item with related Order/Shipment, payment terms, payment records, notes, and action buttons.

## 7. Main Components

- Admin app shell
- Financial follow-up header
- Summary cards
- Search input
- Filter chips
- Follow-up row
- Payment type chip
- Outstanding amount display
- COD expected/actual comparison
- Related Order/Shipment links
- Detail drawer
- Payment record / note action buttons

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | ติดตาม COD / Payment | ติดตาม COD / Payment | Financial Follow-up | Dashboard card label. |
| Follow-up ID | เลขติดตาม | PAY-FU-0008 | Financial Follow-up | Optional internal reference. |
| Related Order | ออเดอร์ | ORD-240520-014 | Order | Opens Order. |
| Related Shipment | รอบจัดส่ง | SHIP-2568-0061 | Shipment | Opens shipment where relevant. |
| Customer | ลูกค้า | ร้านบ้านศิลป์ | Customer | No private CRM notes. |
| Type | ประเภท | COD | Payment Term / Follow-up | COD, Payment, Deposit, Refund, Credit. |
| Expected amount | ยอดที่ต้องติดตาม | 12,000 บาท | Payment Term / Shipment COD | Payment-follow-up amount only. |
| Received amount | รับแล้ว | 0 บาท | Payment Record | Where recorded. |
| Outstanding amount | คงเหลือ | 12,000 บาท | Derived | Operational finance follow-up. |
| Status | สถานะ | รอเงิน COD กลับ | Financial Follow-up | Main queue driver. |
| Latest note | หมายเหตุล่าสุด | รอขนส่งโอนกลับ | Follow-up Note | No private CRM note. |
| Payment evidence | หลักฐานรับเงิน | สลิปโอนเงิน | Payment Record | Required for Payment Record. |
| Correction log | ประวัติแก้ไขรายการรับเงิน | แก้ยอด 12,000 -> 11,965 เพราะค่าธรรมเนียม | Payment Record correction | Show old value, new value, reason, editor, and time. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Order | เปิดออเดอร์ | Admin/Sales in scope, Finance, Manager, Owner | Opens related Order. | No |
| Open Shipment | เปิดรอบจัดส่ง | Admin/Sales in scope, Finance, Manager, Owner | Opens related Shipment. | No |
| Record payment | บันทึกรับเงิน | Admin/Sales in scope or Finance | Adds Payment Record with required evidence. | No |
| Correct payment record | แก้ไขรายการรับเงิน | Finance, Manager, Owner | Updates Payment Record with old/new values, reason, editor, and follow-up visibility. | Yes |
| Add note | เพิ่มหมายเหตุ | Admin/Sales in scope, Finance, Manager, Owner | Adds follow-up note. | No |
| Close follow-up | ปิดรายการติดตาม | Admin/Sales in scope, Finance, Manager, Owner | Follow-up item becomes resolved after payment evidence or explanatory note is recorded. | Yes |
| Add abnormal COD note | ใส่หมายเหตุ COD ผิดปกติ | Admin/Sales in scope, Finance, Manager, Owner | Stores note when actual COD differs from expected amount. | Yes |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| COD waiting | รอเงิน COD กลับ | COD money has not returned yet. | Warning chip. |
| Outstanding | ค้างชำระ | Remaining amount needs follow-up. | Red/orange chip. |
| Evidence waiting | รอตรวจหลักฐาน | Payment evidence exists but still needs finance review later. | Neutral warning chip. |
| COD fee/deduction | COD ถูกหัก | Actual COD is lower than expected, such as carrier fee deduction. | Neutral warning chip. |
| Abnormal COD | COD ผิดปกติ | Actual COD is higher than expected or otherwise unusual. | Strong warning chip. |
| Resolved | ปิดแล้ว | Follow-up is resolved. | Positive chip. |

## 11. Empty State

Show `ไม่มีรายการ COD / Payment ต้องติดตาม` with secondary action `กลับแดชบอร์ด`.

## 12. Error State

- Loading fails: `โหลดรายการติดตาม COD / Payment ไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูรายการติดตามการเงิน`.
- Payment record save fails: `บันทึกรับเงินไม่สำเร็จ`.
- Close fails: `ปิดรายการติดตามไม่สำเร็จ`.
- Missing payment evidence: show `กรุณาแนบหลักฐานรับเงิน`.
- Closing COD before Shipment close: show `ปิดรายการ COD ได้หลังปิดรอบจัดส่งแล้ว`.
- Abnormal COD note missing: show `กรุณาใส่หมายเหตุ COD ผิดปกติ`.

## 13. Permission Rules

- Only finance-permission users can see this queue.
- This queue can show payment-follow-up amounts, but must not show product cost, profit, tax filing detail, ad spend, or private CRM notes.
- Operational Order Completion and Shipment close do not wait for this screen.
- When a Shipment carries COD, its follow-up item exists from Shipment creation/release and stays open until the related Shipment is closed and a permitted admin/finance user closes it.
- COD follow-up cannot be closed before the related Shipment is closed, even if money is already confirmed.
- A follow-up item can be closed when required payment evidence or an explanatory note is enough for the operational audit trail; this is not a full accounting approval flow.
- Payment Records require evidence and can be corrected only with old/new values, reason, editor, and follow-up visibility.
- If only payment method is wrong but the amount is correct, no new finance follow-up is required.
- Do not add automated image-health checking for missing/unreadable slip files; permitted users may correct/replace evidence with log when needed.
- Audit/management review remains separate from normal payment recording.

## 14. UX Notes for Designer

- Make the screen feel like a follow-up queue, not a full accounting ledger.
- Keep COD/Payment follow-up visibly separate from shipment confirmation.
- Show related Order/Shipment links clearly so staff can trace the case.
- Make abnormal COD visually obvious, but treat actual COD below expected as a normal noteable case when caused by carrier fee deduction.
- Use amounts only where needed for follow-up; avoid accounting report styling.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ADM-007-cod-payment-follow-up-queue.md`.

## 16. Open UX Questions

- None blocking for the first mockup.
