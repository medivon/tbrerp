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
- Understand whether the Order is done, still in progress, partially shipped, waiting shipment confirmation, completed, or cancelled.
- Understand whether shipment is complete or still has remaining lines.
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
- Show `สถานะจัดส่ง`.
- Do not make financial status a primary header chip.
- If shipment/operational work is complete but payment is still outstanding, keep the header operational, for example `จัดส่งครบแล้ว`; show outstanding payment only in `การชำระเงิน`.

The summary should show:

- Order ID.
- Customer.
- Main recipient.
- Main phone.
- Main address.
- Net total where permission allows.
- Order created date.
- Order status.
- Shipment status.
- Custom-work indicator when the Order has custom work.

Customer/recipient actions in the summary:

- `แก้ข้อมูลผู้รับในออเดอร์นี้`.
- `เปิดลูกค้า`.
- Do not show `แก้ข้อมูลลูกค้าหลัก` in Order Detail; Customer master editing happens inside Customer Detail/Profile.

Do not make `แผนจัดส่ง` the main top summary. It exists only for mixed ready-stock/custom Orders and belongs in the line and shipment-management context as a guard.

## 8. Manage Order Menu

Header action label:

- `จัดการออเดอร์`

Menu items in normal active Orders:

- `แก้ข้อมูลผู้รับในออเดอร์นี้`
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
- If whole-Order cancellation is blocked because any line has already been sent out or any `JOB-O` has started production, show `ยกเลิกออเดอร์` as disabled with a clear reason/tooltip instead of opening a failing cancellation flow.
- When the Order is cancelled, replace normal management actions with a read-only label such as `ยกเลิกแล้ว`.

## 9. Order Items Section

Section label:

- `รายการในออเดอร์`

Group by item type:

- `สินค้าพร้อมส่ง`
- `งานสั่งทำ`

Do not use the old label `งานที่เกี่ยวข้อง` in this screen.

Each ready-stock line should show:

- Product/work image where available.
- Product/SKU name.
- Quantity.
- Net line value where permission allows.
- Shipment state: ready, in Shipment round, sent, completed, or blocked.
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

## 10. Shipment Management Section

Section label:

- `จัดการรอบจัดส่ง`

Purpose:

- Let admin create a Shipment round from selected ready lines in this Order.
- Support both combined shipment and split shipment through the same selection behavior.

Behavior:

- Show all Order lines relevant to shipment creation.
- Select by default only lines that are ready to ship and not already in a Shipment round.
- For mixed Orders, obey the Order Shipment Plan: `ส่งพร้อมกัน` blocks partial selection until required lines are ready together; `จัดส่งแยกได้` allows ready lines to be selected first.
- If `ส่งพร้อมกัน` blocks the user's intended split shipment and current Order/line state still allows the plan to change, show `เปลี่ยนเป็นจัดส่งแยกได้` in this section with confirmation/log.
- Lines that are not selectable remain visible but disabled with reason.
- Example disabled reasons: `ยังผลิตไม่เสร็จ`, `อยู่ในรอบจัดส่งแล้ว`, `ส่งแล้ว`.
- Selecting multiple ready lines means the user is creating one combined Shipment round.
- Selecting only some ready lines means the user is creating a split Shipment round.
- Primary action: `สร้างรอบจัดส่งจากรายการที่เลือก`.
- Pressing the action opens Shipment Builder with the selected lines already passed in.

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

Do not turn Order Detail into the full Payment workflow.
Do not let payment follow-up change the meaning of the header shipment state; financial follow-up remains separate from operational completion.

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

Do not show a full audit log here. A compact entry such as `แก้ไขรายการออเดอร์ - เหตุผล: ลูกค้าเปลี่ยนจำนวน` is enough; full detail belongs in logs/audit.

## 14. Editing Rules

Light section edits:

- Order-specific recipient/contact/address/note edits can be section-level when allowed.
- `แก้ข้อมูลผู้รับในออเดอร์นี้` appears both in `จัดการออเดอร์` and in the recipient/summary section.
- `แก้ข้อมูลผู้รับในออเดอร์นี้` can select an existing Address Entry or enter a new address.
- New or modified recipient/address detail is saved back to the Customer address book only when the user explicitly selects a checkbox such as `บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า` or `บันทึกกลับไปที่ข้อมูลลูกค้า`.
- `แก้ข้อมูลผู้รับในออเดอร์นี้` must not silently rewrite Customer master data or existing Shipment snapshots.
- If a Shipment round already exists, edit that Shipment's recipient/address from the Shipment screen; Order recipient changes affect future Shipment rounds only.
- If no Shipment round exists yet, changing the main Order recipient/address automatically affects lines that still use the main Order recipient; line-specific delivery details remain unchanged.
- If the Order has line-specific separate delivery detail, this action edits only the main Order recipient.
- Use a modal/drawer with save + log for this edit; do not require Review Changes.
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
- A custom-work line with `JOB-O` can be removed only if the Job has not started production, and removal cancels/closes the Job with reason and log.
- A ready-stock line already in a Shipment round but not sent out must be removed from that Shipment round before it can be edited or removed from the Order.
- Sent-out or completed lines cannot be edited or removed from the Order; use service, return, or adjustment flows later.
- Adding a complete custom-work line after confirmation creates `JOB-O` when Review Changes is saved.
- Adding a ready-stock line after confirmation reserves stock when Review Changes is saved.
- Removing a safe ready-stock line releases reserved stock when Review Changes is saved.
- Quantity changes on safe ready-stock lines adjust reserved stock by the quantity difference when Review Changes is saved.
- Price/discount changes are allowed where permission and Order state allow; Review Changes shows the new net total and financial summary impact.
- Whole-Order cancellation is allowed only when no line has been sent out and no `JOB-O` has started production. Otherwise the cancel action is disabled and the user must manage the affected lines/Job/Shipment separately.

## 15. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Manage Order | จัดการออเดอร์ | Admin and allowed users | Opens action menu. | No |
| Edit Order recipient detail | แก้ข้อมูลผู้รับในออเดอร์นี้ | Admin and allowed users | Edits Order-specific recipient/contact/address for future Order work with log. | No Review Changes |
| Edit ready-stock items | แก้ไขรายการสินค้า | Admin and allowed users | Opens `แก้ไขรายการออเดอร์`. | Review Changes before save |
| Edit custom-work items | แก้ไขงานสั่งทำ | Admin and allowed users | Opens `แก้ไขรายการออเดอร์` or routes existing `JOB-O` detail changes to Job. | Review Changes / Job Revision |
| Create Shipment from selected lines | สร้างรอบจัดส่งจากรายการที่เลือก | Admin and allowed users | Opens Shipment Builder with selected lines. | No |
| Open Shipment | เปิดรอบจัดส่ง | Admin and allowed users | Opens Shipment Detail. | No |
| Open Job | เปิด Job | Admin and allowed users | Opens related `JOB-O`. | No |
| Open Payment Follow-up | เปิดติดตามการเงิน | Finance-permission user | Opens COD/Payment follow-up. | No |
| Open Customer | เปิดลูกค้า | Admin and allowed users | Opens Customer Detail. | No |
| Cancel Order | ยกเลิกออเดอร์ | Authorized users / higher permission where needed | Starts cancellation flow only when whole-Order cancellation is allowed; otherwise disabled with reason. | Yes, with reason |

## 16. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| In progress | กำลังดำเนินการ | Order still has incomplete operational work. | Main header chip. |
| Producing | กำลังผลิต | One or more custom lines are in Job workflow. | Line or summary status. |
| Ready to ship | พร้อมสร้างรอบจัดส่ง | One or more lines are ready for Shipment creation. | Shipment-management signal. |
| Partially shipped | ส่งบางส่วน | Some required lines have shipped but the Order is not complete. | Shipment status. |
| Waiting confirmation | รอยืนยันการจัดส่ง | Shipment sent out, admin confirmation pending. | Shipment status. |
| Completed | จัดส่งครบแล้ว | All required shipment rounds are closed. | Header shipment status. |
| Cancelled | ยกเลิก | Order is cancelled/closed by cancellation flow. | Read-only state. |
| Has custom work | มีงานสั่งทำ | Order contains at least one custom-work line. | Summary/icon label. |

## 17. Cancelled and Completed Orders

Cancelled Order:

- Read-only.
- Hide or disable downstream creation/editing actions.
- Header management action becomes `ยกเลิกแล้ว` or similar status label.

Completed Order:

- Safe general edits may remain available where permission allows.
- Do not allow normal Order item edits or shipment-impacting edits.

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
