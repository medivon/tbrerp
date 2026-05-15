# SCR-ADM-008 - Draft Order Queue

## 1. Purpose

The Draft Order Queue lists saved active `ร่างออเดอร์` records that have not become real Orders. It lets admin continue intentionally saved unfinished order entry without making the draft look like confirmed work.

## 2. Primary Users

- Admin
- Draft creator
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Find a Draft Order quickly.
- See which drafts are old, incomplete, or last handled by another admin.
- Continue editing a draft when allowed.
- Avoid confusing Draft No. with Order ID.
- Avoid showing temporary unsaved Order Entry Sessions as drafts.
- Understand that Draft Orders do not reserve stock or create downstream work.

## 4. Entry Points

- `ออเดอร์` -> `ร่างออเดอร์` tab.
- `บันทึกร่าง` or `ออกและบันทึก` from Order Create/Edit.
- Return from Order Create/Edit.

## 5. Exit Points

- Order Create/Edit.
- Customer search/select inside the draft.
- Order Review / Create Order.
- Admin Dashboard.

## 6. Layout Structure

- Header: `ร่างออเดอร์`, count of active saved drafts, primary action `สร้างออเดอร์`.
- Filter/search bar: simple search by Draft No., Customer name, phone, recipient name, or owner.
- Main content: table on desktop; card list on tablet.
- Row preview: Draft No., Customer, recipient/phone, item count, last updated, owner, incomplete indicators.
- Right drawer or detail preview: optional quick summary before opening editor.
- Empty state area: direct create-draft action.

## 7. Main Components

- Queue header
- Search input
- Owner filter
- Draft status chip
- Draft row/table
- Incomplete data chip
- Age chip
- Primary action button
- Detail preview drawer
- Empty state

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Draft No. | เลขร่าง | DRAFT-00034 | Draft Order | Must not look like Order ID. |
| Draft status | สถานะร่าง | กำลังกรอก | Draft Order | Active drafts only in this queue. |
| Customer | ลูกค้า | คุณมาลี | Customer | May be empty if draft has not reached customer step. |
| Customer phone | เบอร์ลูกค้า | 081-234-5678 | Customer | Used for search. |
| Recipient | ผู้รับสินค้า | คุณภพ | Address Entry | Recipient may differ from Customer. |
| Item count | จำนวนรายการ | 3 รายการ | Order Line | Draft only; no stock or Job yet. |
| Draft owner | ผู้รับผิดชอบหลัก | แอดมินแพร | Owner | Traceability only; not a lock. |
| Last updated | แก้ไขล่าสุด | วันนี้ 14:20 | Draft Order | Helps choose stale drafts. |
| Missing data | ข้อมูลยังไม่ครบ | ยังไม่มีเงื่อนไขชำระเงิน | Draft Order | Show as compact chip or row note. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Create order | สร้างออเดอร์ | Admin / permitted sales | Opens Order Create/Edit without creating a Draft No. yet. | No |
| Open draft | เปิดร่าง | Users with Order create/edit permission | Opens Order Create/Edit for the saved draft. | No |
| Continue draft | ทำต่อ | Users with Order create/edit permission | Opens saved draft at last workable section. | No |
| Search draft | ค้นหาร่าง | Admin | Filters list. | No |
| Return dashboard | กลับแดชบอร์ด | Admin | Returns to Admin Dashboard. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active draft | ร่างออเดอร์ | Draft exists but is not a real Order. | Neutral chip. |
| Incomplete | ข้อมูลยังไม่ครบ | Required information is missing. | Soft warning chip. |
| Ready to review | พร้อมตรวจสอบ | Draft has enough data to review before Order creation. | Positive but not final chip. |
| Converted | แปลงเป็นออเดอร์แล้ว | Draft became a real Order and is read-only. | Should not normally appear in active queue. |
| Old draft | ค้างนาน | Draft has not been updated recently. | Low-intensity warning. |

## 11. Empty State

Show `ไม่มีร่างออเดอร์ที่กำลังทำอยู่` with primary action `สร้างออเดอร์`. Add a small note: `ร่างออเดอร์เกิดเมื่อกดบันทึกร่างเท่านั้น และยังไม่จองสต๊อก ไม่สร้าง Job ไม่สร้าง Shipment`.

## 12. Error State

- Loading fails: `โหลดร่างออเดอร์ไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์เปิดร่างออเดอร์นี้`.
- Draft converted while user is viewing the list: show row status `แปลงเป็นออเดอร์แล้ว` and disable edit.
- Save conflict from another same-permission user: show a clear message that the draft was updated and should be refreshed.

## 13. Permission Rules

- Any user with permission to create/edit Orders can continue an active draft.
- Draft owner is stored for traceability only and does not lock the draft.
- Converted Draft Orders are read-only and not normally shown in active lists.
- Draft Order must not create Order ID, reserve stock, create Job, create Shipment, or enter reports.
- Temporary unsaved Order Create/Edit work must not appear in this queue.

## 14. UX Notes for Designer

- Make "draft" visually softer than confirmed operational queues.
- Avoid Order-like styling for Draft No.; it should not be confused with Order ID.
- Keep the list simple; admin needs to resume saved work, not analyze drafts.
- Show owner/last responsible admin for traceability, but do not make the row feel locked to that owner.
- Surface missing fields just enough to help admin know why the draft is not ready.
- Use realistic row examples such as custom cabinet, ready-stock chair set, and carved table set.

## 15. Image Generation Prompt

Create a clean desktop ERP queue screen for Thai furniture shop admins. Page title "ร่างออเดอร์". A table lists saved draft orders with columns for เลขร่าง, ลูกค้า, ผู้รับสินค้า, จำนวนรายการ, แก้ไขล่าสุด, ผู้รับผิดชอบหลัก, and status chips like "ข้อมูลยังไม่ครบ" and "พร้อมตรวจสอบ". Include a search bar and a primary button "สร้างออเดอร์". Quiet work-focused UI, no decorative hero, no marketing copy. Use sample data: คุณมาลี, ตู้ไม้สักสั่งทำ, ชุดเก้าอี้พร้อมส่ง.

## 16. Open UX Questions

- None blocking for the queue design.
