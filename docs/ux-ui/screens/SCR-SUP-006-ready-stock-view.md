# SCR-SUP-006 - Ready Stock View

## 1. Purpose

The Ready Stock View screen is the desktop stock visibility screen for ready-to-ship SKU Variants. It helps admin and stock users understand what can be sold, what is reserved by Orders, what is currently unavailable, and what production is in progress. It is not a stock adjustment form; stock changes happen through dedicated Stock Count, Stock Adjustment, production receipt, or Order reservation flows.

## 2. Primary Users

- Admin
- Stock-permission user
- Product-permission user
- Sales/Admin user who needs availability visibility
- Manager / Owner

## 3. User Goals

- Search ready-stock items quickly.
- See which SKU Variants have stock available for sale.
- See reserved stock and available stock separately.
- Identify products visually from thumbnails.
- Open SKU details, create production, start stock count, or open stock adjustment when needed.
- Avoid editing stock accidentally from a reporting page.

## 4. Entry Points

- Sidebar `สินค้า / สต๊อก`.
- Product / SKU Table -> `ดูสต๊อก`.
- SKU Variant Detail -> `ดูสต๊อก`.
- Order Line item selection support.
- Shipment/Ready-to-ship cross-check where needed.

## 5. Exit Points

- SKU Variant Detail.
- Product Model Detail.
- Stock Count.
- Stock Adjustment.
- Production Job Entry.
- Product / SKU Table.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header: `สินค้าพร้อมส่ง`.
- Summary cards for stock availability and reservation state.
- Search/filter toolbar.
- Dense stock table with product thumbnails.
- Right preview drawer for selected SKU stock summary.
- Stock actions are navigation buttons, not inline quantity controls.

## 7. Main Components

- Summary card strip
- Search input
- Filter chips
- Sort/group selector
- Ready stock table
- Selected SKU preview drawer
- Stock summary chips
- Production summary chips
- Navigation action buttons

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Main image | รูป | Product thumbnail | SKU Variant | Image-led recognition. |
| SKU code | รหัส SKU | SKU-TEAK-TABLE-OAK-001 | SKU Variant | Searchable. |
| Product Model | SKU ใหญ่ | โต๊ะข้างไม้สัก | Product Model | Parent family. |
| SKU Variant | SKU ย่อย | โต๊ะข้างไม้สัก สีโอ๊คเข้ม | SKU Variant | Concrete stockable item. |
| Color | สี | สีโอ๊คเข้ม | Color Master | Variant distinguisher. |
| Width | กว้าง | 45 ซม. | SKU Variant | Separate field. |
| Depth | ลึก | 45 ซม. | SKU Variant | Separate field. |
| Height | สูง | 55 ซม. | SKU Variant | Separate field. |
| On hand | คงเหลือ | 2 | Ready Stock | Report-only. |
| Reserved | จองแล้ว | 1 | Order Reservation | Report-only. |
| Available | พร้อมขาย | 1 | Computed stock | Report-only. |
| In production | กำลังผลิต | 6 | Production Job | Report-only. |
| Last count | ตรวจล่าสุด | 20 พ.ค. 67 | Stock Count | Optional. |
| Status | สถานะ | พร้อมขาย / ไม่มีสต๊อก | Ready Stock | Chip. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search | ค้นหา | All allowed users | Filters table. | No |
| Open SKU | เปิด SKU | Product/stock permission | Opens SKU Variant Detail. | No |
| Open Product Model | เปิด SKU ใหญ่ | Product permission | Opens Product Model Detail. | No |
| Create Production | สร้างงานผลิต | Product/production permission | Opens Production Job Entry from SKU. | No |
| Stock Count | ตรวจนับสต๊อก | Stock permission | Opens Stock Count. | No |
| Stock Adjustment | ปรับยอดสต๊อก | Stock permission / manager | Opens Stock Adjustment. | No |
| View movement | ดูประวัติสต๊อก | Stock permission | Opens movement/history view when available. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Available | พร้อมขาย | Available quantity > 0. | Green chip. |
| Reserved | มีจอง | Some stock is reserved by Orders. | Blue chip. |
| No stock | ไม่มีสต๊อก | On-hand or available stock is 0. | Orange/neutral chip, not blocker. |
| In production | กำลังผลิต | Related production exists. | Purple/blue chip. |
| Needs count | ควรตรวจนับ | Stock may need count review. | Yellow chip. |

## 11. Empty State

If no items match filters, show `ไม่พบสินค้าพร้อมส่ง` with actions `ล้างตัวกรอง` and `กลับไปรายการสินค้า`.

## 12. Error State

- Loading fails: `โหลดรายการสต๊อกไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูสต๊อกสินค้า`.
- Search fails: show retry without clearing filters.

## 13. Permission Rules

- Direct stock quantity edits are not allowed on this page.
- Stock actions navigate to dedicated screens.
- Sales/admin users may see availability but should not see restricted stock adjustment controls unless permitted.
- Product cost, labor cost, sales price, profit, accounting data, and private CRM notes must not appear.
- The system may warn about over-reservation or negative availability, but should not block normal visibility.

## 14. UX Notes for Designer

- This is a dense stock visibility workbench, not a warehouse adjustment form.
- Use image thumbnails for quick product recognition.
- Keep `คงเหลือ`, `จองแล้ว`, and `พร้อมขาย` visually separate.
- Keep dimensions split as `กว้าง`, `ลึก`, `สูง`.
- Actions like `ตรวจนับสต๊อก` and `ปรับยอดสต๊อก` should be obvious navigation buttons.
- Do not make stock cells look editable.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-006-ready-stock-view.md` as the image generation prompt source.
