# SCR-SUP-015 - Material Stock

## 1. Purpose

Material Stock is the lightweight stock visibility and action hub for easy-to-count internal materials. It helps staff see `จำนวนที่มีอยู่`, material movement, waiting-material alerts from Jobs, and the next operational action: create a Material Purchase Order or open Material Adjustment.

It is not Product/SKU ready stock, not a full warehouse, not a BOM, and not an accounting screen.

## 2. Primary Users

- Stock/material-permission user
- Material purchase-permission user
- Manager / Owner
- Admin with material-stock permission

## 3. User Goals

- See what materials are currently available.
- Search materials by name, category, supplier/store, or note.
- See Jobs marked `รอวัตถุดิบ` and what material names/notes they need.
- Summarize waiting-material notes into a Material Purchase Order flow.
- Open `ปรับยอดวัสดุ` when staff count actual stock.
- Avoid confusing material stock with SKU stock or sellable stock.

## 4. Entry Points

- Sidebar `สินค้า / สต๊อก` -> `สต๊อกวัสดุ`.
- Job work card with `รอวัตถุดิบ`.
- Admin/manager follow-up where material waiting status is visible.

## 5. Exit Points

- Material Purchase Order.
- Material Adjustment.
- Job Detail for the originating waiting-material note.
- Material movement/history detail when available.

## 6. Layout Structure

- Desktop/tablet admin app shell with `สินค้า / สต๊อก` active.
- Header: `สต๊อกวัสดุ`.
- Top alert/list area: `รายการรอวัตถุดิบ`.
- Summary strip for material stock status.
- Search/filter toolbar.
- Dense material stock table.
- Right preview drawer for selected material.
- Primary actions: `สร้างใบสั่งซื้อวัสดุ`, `ปรับยอดวัสดุ`.

## 7. Main Components

- Waiting-material alert panel
- Material search input
- Category filter
- Supplier/store filter
- Movement/stock status filters
- Material stock table
- Selected material preview drawer
- Movement history preview
- Navigation buttons to Material Purchase Order and Material Adjustment

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Image | รูป | Material thumbnail | Material Item | Optional; show missing image state. |
| Material name | ชื่อวัสดุ | รางลิ้นชัก 18 นิ้ว | Material Item | Required. |
| Material category | หมวดวัสดุ | อุปกรณ์เฟอร์นิเจอร์ | Material Category | Managed lightly in material stock area. |
| Supplier/store | ผู้ขาย | ร้านเอ | Supplier | Required link for purchase flow. |
| Unit | หน่วยนับ | ชิ้น | Material Item | Required. |
| Quantity on hand | จำนวนที่มีอยู่ | 24 | Material Stock | Read-only on this page. |
| Latest receipt | รับเข้าล่าสุด | 20 พ.ค. 67 | Material Movement | Optional. |
| Latest adjustment | ปรับยอดล่าสุด | 22 พ.ค. 67 | Material Movement | Optional. |
| Waiting note count | งานรอวัตถุดิบ | 3 งาน | Material Need Note | Notes only; no reservation. |
| Status | สถานะ | มีของ / ควรตรวจนับ / หมด | Computed | Visibility only. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search | ค้นหา | Allowed viewers | Filters material list. | No |
| Open waiting Job | เปิดงาน | Allowed viewers | Opens Job Detail or work card. | No |
| Create PO from summary | สรุปรายการสั่งซื้อ | Material purchase permission | Opens Material Purchase Order with selected/waiting items. | No |
| Create manual PO | สร้างใบสั่งซื้อวัสดุ | Material purchase permission | Opens blank Material Purchase Order. | No |
| Adjust material | ปรับยอดวัสดุ | Material stock adjustment permission | Opens Material Adjustment. | No |
| View movement | ดูประวัติ | Material stock permission | Opens/expands movement history. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| In stock | มีของ | Quantity on hand > 0. | Green/neutral chip. |
| Out of stock | หมด | Quantity on hand = 0. | Neutral/orange chip. |
| Waiting material | มีงานรอวัตถุดิบ | One or more Jobs recorded material need notes. | Yellow attention chip. |
| Needs count | ควรตรวจนับ | Item has frequent movement or old count. | Yellow chip. |
| Missing image | ไม่มีรูป | Image missing; counting may be harder. | Subtle warning. |

## 11. Empty State

If no material items exist, show `ยังไม่มีรายการวัสดุ` with action `เพิ่มวัสดุ`. If filters match nothing, show `ไม่พบวัสดุที่ตรงกับตัวกรอง` with action `ล้างตัวกรอง`.

## 12. Error State

- Loading fails: `โหลดสต๊อกวัสดุไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูสต๊อกวัสดุ`.
- Waiting-material list fails: keep stock table visible and show retry for the alert panel.

## 13. Permission Rules

- Quantity is read-only on Material Stock.
- Creating Material Purchase Orders, receiving stock, and adjusting material quantities require separate permissions.
- Material Stock must not show sales price, product cost, profit, tax, or accounting ledger details.
- Payment Audit Follow-up status may be visible only to users with relevant permission.

## 14. UX Notes For Designer

- Use `จำนวนที่มีอยู่` only. Do not use `คงเหลือ`, `พร้อมขาย`, `จองแล้ว`, or `ขายได้`.
- Keep the screen operational and dense, similar to Product/SKU and Ready Stock workbenches.
- The waiting-material panel must make it clear that these are notes/requests, not reservations.
- Missing images should be visible but not blocking.
- Avoid building a permanent "where used" report for materials in this starting workflow.

## 15. Open Decisions

- Exact supplier/material cardinality is still open: if the same physical material can be bought from multiple suppliers, should the system create separate Material Items per supplier, or allow multiple suppliers on one Material Item?

## 16. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-015-material-stock.md` as the image generation prompt source.
