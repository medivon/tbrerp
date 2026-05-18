# SCR-ORD-005 - Order Detail

Approved visual anchor:

- `docs/ux-ui/mockups/SCR-ORD-005-order-detail/SCR-ORD-005-approved.png`

Current decision note:

- The approved image remains a visual anchor for the THAIBORAN app shell and card-based Order detail density.
- Later Q&A supersedes the old tabbed/expanded-card behavior. The current source of truth is a read-first, single-page report with section-based editing.

## 1. Purpose

Order Detail is the confirmed Order report screen after a real Order ID exists. It gives Admin one place to see the full Order story: customer/recipient context, what was ordered, what is ready to ship, what has shipped, which custom lines have `JOB-O`, which shipment rounds exist, and what financial follow-up remains.

Order Completion is based on required shipment rounds being closed. Financial Follow-up remains separate and may remain open after operational completion.

## 2. Primary Users

- Admin
- Sales/admin user with Order permission
- Same-permission admin user
- Higher-permission admin user
- Manager / Owner

## 3. User Goals

- See the confirmed Order ID and customer/recipient context.
- Understand whether the Order is done, still in progress, partially shipped, ready for shipment creation, completed, or cancelled.
- Understand Shipment status separately, including whether any Shipment round is waiting confirmation.
- See every Order item in one readable report.
- See which lines are ready-stock and which lines are custom work.
- See which custom-work lines are linked to which `JOB-O`.
- See what can be selected for shipment now and why other lines cannot.
- Open related Shipment rounds, Job detail, Customer detail, and Financial Follow-up from the right place.
- Edit only the intended section or enter a guarded Order-line edit flow when changing items.

## 4. Entry Points

- After `ยืนยันสร้างออเดอร์`.
- Active Orders Overview.
- All Orders List.
- Shipment queues.
- Job Detail.
- Customer profile / Order history.
- Search by Order ID, customer name, phone, recipient, address, postal code, or Job ID.

## 5. Exit Points

- Order item edit mode: `แก้ไขรายการออเดอร์`.
- Job Detail / Job Revision.
- Shipment Builder with selected ready Order lines.
- Shipment Detail.
- Customer Detail.
- COD/Payment Follow-up Queue.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `ออเดอร์`.
- Header: page title `รายละเอียดออเดอร์`, Order ID, Order status, shipment status, and `จัดการออเดอร์`.
- Do not show `สร้างรอบจัดส่ง` as a header primary action.
- Do not use tabs for main Order Detail content.
- Use a single scrollable report layout with clear full-width sections.

Recommended section order:

1. `สรุปออเดอร์`
2. `รายการในออเดอร์`
3. `จัดการรอบจัดส่ง`
4. `รอบจัดส่งที่เกี่ยวข้อง`
5. `การชำระเงิน`
6. `ประวัติ`

## 7. Header and Summary

Header status:

- Show `สถานะออเดอร์`.
- Show `สถานะจัดส่ง` / Shipment summary separately.
- `รอยืนยันการจัดส่ง` belongs to `สถานะจัดส่ง`, not `สถานะออเดอร์`.
- Do not make financial status a primary header chip.
- If shipment/operational work is complete but payment is still outstanding, keep the header operational, for example `จัดส่งครบแล้ว`; show outstanding payment only in `การชำระเงิน`.

The summary should show:

- Order ID.
- Customer.
- Customer tier and Social contact when useful for customer context.
- Main recipient.
- Main phone.
- Main address.
- Net total where permission allows.
- Order created date.
- Order status.
- Shipment status.
- Custom-work indicator when the Order has custom work.

Customer/recipient actions in the summary:

- `เปิดลูกค้า`.
- Customer master/address-book editing happens inside Customer Detail/Profile, not directly inside Order Detail.
- Show the Order Recipient Detail snapshot saved on this Order. Later Customer address changes do not rewrite this snapshot.
- New Shipment rounds start from this Order Recipient Detail snapshot by default, but Shipment Builder can override recipient/address for that Shipment round snapshot.
- Shipment recipient/address changes stay as Shipment snapshots unless the user explicitly saves a different address as a secondary Address Entry for the Customer.

Do not make `แผนจัดส่ง` the main top summary. It exists only for mixed ready-stock/custom Orders and belongs in the line and shipment-management context as a guard.

## 8. Manage Order Menu

Header action label:

- `จัดการออเดอร์`

Menu items in normal active Orders:

- `เปิดลูกค้า` / customer-recipient context action
- `แก้ไขรายการสินค้า`
- `แก้ไขงานสั่งทำ`
- `จัดการรอบจัดส่ง`
- `เปิดติดตามการเงิน`
- `ยกเลิกออเดอร์`

Rules:

- The menu is a shortcut to the appropriate section or flow.
- Section-level edit buttons should still exist where direct editing is allowed.
- `ยกเลิกออเดอร์` appears at the end of the menu as a warning/destructive action.
- If whole-Order cancellation is allowed, `ยกเลิกออเดอร์` opens a confirmation modal and requires a reason.
- If whole-Order cancellation is blocked because any line has already been sent out, any active `JOB-O` exists, or any active line is in a Shipment round, show `ยกเลิกออเดอร์` as disabled with a clear reason/tooltip instead of opening a failing cancellation flow.
- When the Order is cancelled, replace normal management actions with a read-only label such as `ยกเลิกแล้ว`.

## 9. Order Items Section

Section label:

- `รายการในออเดอร์`

Group by item type:

- `สินค้าพร้อมส่ง`
- `งานสั่งทำ`
- `รายการที่ยกเลิกแล้ว` at the end when any line was cancelled.

Do not use the old label `งานที่เกี่ยวข้อง` in this screen.

Each ready-stock line should show:

- Product/work image from the Order Line snapshot. Use SKU Variant image if it existed when selected; otherwise use Product Model fallback.
- Product Model / `SKU หลัก` name from the snapshot.
- Color / `SKU ย่อย` and SKU code from the snapshot.
- Dimensions from the snapshot.
- Quantity.
- Net line value where permission allows.
- Shipment state: ready, in Shipment round, sent, completed, or blocked.
- Stock warning text/icon when reserved stock is negative or insufficient, without blocking normal Order operation.
- Related Shipment No. where applicable.
- Delivery detail only when this line ships to a recipient/address different from the main Order recipient/address.
- `แก้ข้อมูลจัดส่งรายการนี้` only when the line has or needs line-specific delivery detail and has not yet entered a Shipment round.

Each custom-work line should show:

- Product/work image where available.
- Work name.
- Quantity.
- `JOB-O`.
- Production status.
- Current department if relevant.
- Delivery date if any.
- Shipment state.
- `เปิด Job`.
- Delivery detail only when this line ships to a recipient/address different from the main Order recipient/address.
- `แก้ข้อมูลจัดส่งรายการนี้` only when the line has or needs line-specific delivery detail and has not yet entered a Shipment round.

Do not create a separate duplicate `งานสั่งทำ` section just to repeat Jobs. The custom-work line is the place to show Job ID and Job state.

If `JOB-O` is cancelled or closed from the Job side, reflect that latest Job status on the custom-work line and keep the Job relationship/history visible.

Cancelled lines:

- Show cancelled ready-stock and custom-work lines under `รายการที่ยกเลิกแล้ว`.
- Show reason, user, and time where available.
- Do not count cancelled lines in active item count, active total, Order status calculation, or shipment selection.

## 10. Shipment Management Section

Section label:

- `จัดการรอบจัดส่ง`

Purpose:

- Let admin create a Shipment round from selected ready lines in this Order.
- Support both combined shipment and split shipment through the same selection behavior.

Behavior:

- Show all Order lines relevant to shipment creation.
- Select by default only lines that are ready to ship and not already in a Shipment round.
- For mixed Orders, treat `ส่งพร้อมกัน` as the default intent, but use selected ready lines as the practical combined/split shipment control.
- Do not add a heavy separate "change shipment plan" workflow in this screen unless a later Shipment design needs it.
- Lines that are not selectable remain visible but disabled with reason.
- Example disabled reasons: `ยังผลิตไม่เสร็จ`, `อยู่ในรอบจัดส่งแล้ว`, `ส่งแล้ว`. Cancelled lines do not appear in this shipment-selection list.
- Selecting multiple ready lines means the user is creating one combined Shipment round.
- Selecting only some ready lines means the user is creating a split Shipment round.
- Primary action: `สร้างรอบจัดส่งจากรายการที่เลือก`.
- Pressing the action opens Shipment Builder with the selected lines already passed in, including recipient name, address, phone, selected items, item main images, quantities, and carrier name when already chosen.

Do not hide blocked lines from this section; users need to understand why they cannot ship them yet.

## 11. Related Shipments Section

Section label:

- `รอบจัดส่งที่เกี่ยวข้อง`

Use a report table with:

| Field | Thai Label | Notes |
|---|---|---|
| Shipment No. | เลขรอบจัดส่ง | Link/reference to Shipment. |
| Created date | วันที่สร้างรอบ | When admin created the Shipment round. |
| Sent-out date | วันที่ส่งออก | Blank if not sent out yet. |
| Carrier | ขนส่ง | Carrier or delivery method. |
| Tracking | Tracking | Tracking/reference if available. |
| Status | สถานะ | Draft, released, sent, waiting confirmation, closed, cancelled. |
| Action | การทำงาน | `เปิดรอบจัดส่ง` only. |

Do not place edit, print, cancel, or close actions in this table. Those belong inside Shipment screens.

## 12. Payment Section

Section label:

- `การชำระเงิน`

Show summary only:

- Payment Term.
- Net Order total.
- Paid amount.
- Outstanding amount.
- Payment/COD follow-up status.
- Action: `เปิดติดตามการเงิน`.
- Note for refund/credit/follow-up only when relevant.

Do not turn Order Detail into the full Payment workflow.
Do not let payment follow-up change the meaning of the header shipment state; financial follow-up remains separate from operational completion.
If the Order is cancelled and Payment Records exist, keep them visible and show a note that refund/credit may need follow-up later; do not block cancellation or hide Payment Records.

## 13. History Section

Section label:

- `ประวัติ`

Show a short timeline of important events:

- Order created.
- Order edited.
- Order edit reason, when a meaningful edit reason was required.
- Shipment round created.
- Shipment sent out.
- Shipment closed.
- Order cancelled.
- Line cancelled, with reason where useful.
- Financial note/follow-up created for refund/credit or reconciliation.

Do not show a full audit log here. A compact entry such as `แก้ไขรายการออเดอร์ - เหตุผล: ลูกค้าเปลี่ยนจำนวน` is enough; full detail belongs in logs/audit.

## 14. Editing Rules

Light section edits:

- Order notes and non-downstream general notes can be edited section-level when allowed.
- Customer master/address-book data is edited from Customer Detail/Profile via `เปิดลูกค้า`.
- Shipment recipient/address/carrier edits happen inside Shipment Builder or Shipment Detail as a Shipment snapshot.
- Shipment recipient/address changes must not silently rewrite Customer master data or existing Order data.
- If a Shipment round already exists, edit that Shipment's recipient/address from the Shipment screen.
- Later Customer Detail/address-book changes do not rewrite existing Order Recipient Detail snapshots.
- If the Order has line-specific separate delivery detail, edit it through the relevant Shipment Builder/Detail flow, not from a generic Order recipient edit.
- `เปิดลูกค้า` lives in the customer section and opens Customer Detail/Profile. Customer master editing happens from that Customer screen, not directly from Order Detail.
- These edits should log changes according to existing permission/log rules.

Order item edits:

- `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` open `แก้ไขรายการออเดอร์`.
- `แก้ไขรายการออเดอร์` is a full-page edit mode similar to Order Create/Edit but for confirmed Orders.
- It must have `Review Changes` before save.
- After save, return to normal Order Detail with a short `บันทึกการแก้ไขแล้ว` toast/banner and light highlight on the changed section, without a large success-summary block.

Guard rules:

- Lines with no Job, Shipment, or sent-out state can be edited fully.
- If only some lines are blocked, still allow the user to enter `แก้ไขรายการออเดอร์`; blocked lines remain visible as read-only with the reason.
- Existing `JOB-O` production detail cannot be edited from Order Detail or Order item edit; use Job Detail / Job Revision.
- A custom-work line with an existing `JOB-O` cannot be removed from Order Line Edit. Cancel the `JOB-O` from Job Detail / Job cancellation first, even if production has not started; then Order Detail reflects the cancelled line and reason.
- A ready-stock line already in any Shipment round, including Draft or Released Shipment, must be removed from that round or the Shipment round must be cancelled before it can be edited or removed from the Order.
- Sent-out or completed lines cannot be edited or removed from the Order; use service, return, or adjustment flows later.
- Adding a complete custom-work line after confirmation creates `JOB-O` when Review Changes is saved.
- Adding a ready-stock line after confirmation reserves stock when Review Changes is saved.
- Added ready-stock lines use Product Model -> color/SKU Variant selection and store the same SKU snapshot as Order creation.
- Removing a safe ready-stock line releases reserved stock when Review Changes is saved.
- Quantity changes on safe ready-stock lines adjust reserved stock by the quantity difference when Review Changes is saved.
- Price/discount changes are allowed where permission and Order state allow; Review Changes shows the new net total and financial impact.
- If price/discount/total changes after Payment Records or COD records exist, Review Changes must block saving until the new sales total is reconciled with Payment Records, COD to collect, or adjustment/refund/credit notes.
- Whole-Order cancellation is allowed directly only when there are no sent-out lines and no active downstream Job/Shipment blockers. If active `JOB-O` or Shipment rounds exist, the user must cancel/manage those in their owning flows first.
- If the last active line is cancelled and nothing has shipped, confirm that the whole Order will also be cancelled and require reason/log.
- If some lines have completed delivery and all remaining active lines are cancelled, the Order becomes `จัดส่งครบแล้ว`; cancelled lines remain in history.

## 15. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Manage Order | จัดการออเดอร์ | Admin and allowed users | Opens action menu. | No |
| Edit ready-stock items | แก้ไขรายการสินค้า | Admin and allowed users | Opens `แก้ไขรายการออเดอร์`. | Review Changes before save |
| Edit custom-work items | แก้ไขงานสั่งทำ | Admin and allowed users | Opens `แก้ไขรายการออเดอร์` for new/safe custom lines or routes existing `JOB-O` changes/cancellation to Job. | Review Changes / Job Revision / Job cancellation |
| Create Shipment from selected lines | สร้างรอบจัดส่งจากรายการที่เลือก | Admin and allowed users | Opens Shipment Builder with selected lines. | No |
| Create special shipment | รอบจัดส่งพิเศษ | Owner / Manager only after Order completion | Creates an exceptional Shipment record without affecting stock, sales totals, or Order completion. | Yes, with reason |
| Open Shipment | เปิดรอบจัดส่ง | Admin and allowed users | Opens Shipment Detail. | No |
| Open Job | เปิด Job | Admin and allowed users | Opens related `JOB-O`. | No |
| Open Payment Follow-up | เปิดติดตามการเงิน | Admin/Sales in scope, Finance, Manager, Owner | Opens COD/Payment follow-up. | No |
| Open Customer | เปิดลูกค้า | Admin and allowed users | Opens Customer Detail/Profile for master customer/address changes. | No |
| Cancel Order | ยกเลิกออเดอร์ | Authorized users / higher permission where needed | Starts cancellation flow only when whole-Order cancellation is allowed; otherwise disabled with reason. | Yes, with reason |

## 16. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| In progress | กำลังดำเนินการ | Order still has incomplete operational work. | Main header chip. |
| Producing | กำลังผลิต | One or more custom lines are in Job workflow. | Line or summary status. |
| Ready to ship | พร้อมสร้างรอบจัดส่ง | One or more active lines are ready for Shipment creation and not already in a Shipment round. | Order status / shipment-management signal. |
| Partially shipped | ส่งบางส่วน | At least one active line completed delivery recording with tracking/evidence, while another active line is not complete. | Order status. |
| Waiting confirmation | รอยืนยันการจัดส่ง | Shipment round sent out, admin confirmation/evidence pending. | Shipment status only. |
| Completed | จัดส่งครบแล้ว | All active deliverable lines completed delivery recording with tracking/evidence. | Order status / shipment summary. |
| Cancelled | ยกเลิก | Order is cancelled/closed by cancellation flow. | Read-only state. |
| Cancelled line | ยกเลิกรายการแล้ว | Line remains as history but no longer counts as active work. | Cancelled-lines section. |
| Has custom work | มีงานสั่งทำ | Order contains at least one custom-work line. | Summary/icon label. |

For delivery completion, `tracking/evidence` means tracking or at least one `รูปหลักฐานจัดส่ง`.

## 17. Cancelled and Completed Orders

Cancelled Order:

- Read-only.
- Hide or disable downstream creation/editing actions.
- Header management action becomes `ยกเลิกแล้ว` or similar status label.
- Existing Payment Records remain visible; show a financial note/follow-up placeholder if refund/credit may be needed later.

Completed Order:

- Do not edit the original Order snapshot in normal workflow.
- Allow adding notes/correction records where permission allows.
- Owner/Manager may create `รอบจัดส่งพิเศษ` with a required reason; it does not affect stock, sales totals, or Order completion.
- Admin/Sales handles post-completion customer problems through Service Case rather than the special shipment button.
- Do not allow normal Order item edits, recipient snapshot edits, or shipment-impacting edits.

## 18. Error / Disabled State

- Loading fails: `โหลดออเดอร์ไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูออเดอร์นี้`.
- Related Job missing: show `ไม่พบ Job ที่เกี่ยวข้อง` and refresh action.
- Shipment state conflict: show `สถานะรอบจัดส่งมีการเปลี่ยนแปลง กรุณารีเฟรช`.
- Shipment selection has no eligible lines: keep lines visible with disabled reasons and disable `สร้างรอบจัดส่งจากรายการที่เลือก`.

## 19. Permission Rules

- Admin and same/higher permission can view operational Order Detail.
- Finance-sensitive follow-up details are permission-aware.
- Product cost, profit, tax filing detail, ad spend, and private CRM notes do not appear.
- Workers should not use this screen as their work queue.
- Order Completion remains separate from Financial Follow-up.
- Production-affecting changes to `JOB-O` must be done through Job Detail / Job Revision.
- Cancelling an existing `JOB-O` must be done through Job Detail / Job cancellation, not Order Line Edit.

## 20. What Not To Show

- Draft No.
- Full invoice layout.
- Full payment workflow.
- Production dashboard behavior.
- Duplicate `งานที่เกี่ยวข้อง` section.
- Header `สร้างรอบจัดส่ง` button competing with shipment-management section.
- Large all-fields edit form embedded in Order Detail.
- Full audit log.
- Product cost, profit, tax filing detail, ad spend, or private CRM notes.

## 21. UX Notes for Designer

- Make the page feel like a complete readable Order report.
- Keep detail large, clear, and row/section based.
- Do not hide important Order facts behind tabs.
- Use section-level actions sparingly and near the data they affect.
- The user should immediately understand what has shipped, what can ship now, and what is waiting on production.
- Shipment creation should feel like selecting ready lines, then moving to Shipment Builder.
- Item editing should feel like entering a controlled edit mode, not casually changing live operational work.

## 22. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ORD-005-order-detail.md`.

## 23. Open UX Questions

- None blocking for the next Order Detail mockup pass.
