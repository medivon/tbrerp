# SCR-SUP-006 - Ready Stock View

## 1. Purpose

The Ready Stock View screen is the desktop stock visibility screen for ready-to-ship SKU Variants. It helps admin and stock users understand what exists physically, what is reserved, and what can still be sold. It is not a stock adjustment form; stock changes happen through dedicated Stock Count, Stock Adjustment, Product Purchase Order receipt, SKU-tied Production completion, or Order reservation flows.

## 2. Primary Users

- Admin
- Stock-permission user
- Product-permission user
- Sales/Admin user who needs availability visibility
- Manager / Owner

## 3. User Goals

- Search ready-stock items quickly.
- See which Product Models and SKU Variants have stock available for sale.
- See `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้` separately.
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
- Product Purchase Order.
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
| SKU code | รหัส SKU | TBR-TBL-123-OAK | SKU Variant | Searchable. |
| Product Model | SKU หลัก | โต๊ะข้างไม้สัก | Product Model | Parent family. |
| SKU Variant | SKU ย่อย | โต๊ะข้างไม้สัก สีโอ๊คเข้ม | SKU Variant | Concrete stockable item. |
| Color | สี | สีโอ๊คเข้ม | รายการสี | Variant distinguisher. |
| Width | กว้าง | 45 ซม. | Product Model | Separate field. |
| Depth | ลึก | 45 ซม. | Product Model | Separate field. |
| Height | สูง | 55 ซม. | Product Model | Separate field. |
| Stock on hand | มีอยู่ในร้าน | 2 | Ready Stock | Report-only. |
| Reserved | จองแล้ว | 1 | Order Reservation | Report-only. |
| Sellable stock | ขายได้ | 1 / -1 | Computed stock | Report-only; may be negative after acknowledged over-reservation. |
| In production | กำลังผลิต | 6 | Production Job | Report-only. |
| Last count | ตรวจล่าสุด | 20 พ.ค. 67 | Stock Count | Optional. |
| Status | สถานะ | ขายได้ / หมด | Ready Stock | Chip. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search | ค้นหา | All allowed users | Filters table. | No |
| Open SKU | เปิด SKU | Product/stock permission | Opens SKU Variant Detail. | No |
| Open Product Model | เปิด SKU หลัก | Product permission | Opens Product Model Detail. | No |
| Create Product PO | สร้างใบสั่งซื้อสินค้า | Product purchase/stock permission | Opens Product Purchase Order. | No |
| Create Production | สร้างงานผลิต | Product/production permission | Opens Production Job Entry from SKU. | No |
| Stock Count | ตรวจนับสต๊อกสินค้า | Stock permission | Opens Stock Count. | No |
| Stock Adjustment | ปรับยอดสต๊อกสินค้า | Stock permission / manager | Opens Stock Adjustment. | No |
| View movement | ดูประวัติสต๊อก | Stock permission | Opens movement/history view when available. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Sellable | ขายได้ | `ขายได้` quantity > 0. | Green chip. |
| Reserved | มีจอง | Some stock is reserved by Orders. | Blue chip. |
| Sold out | หมด | `ขายได้` is 0. | Orange/neutral chip, not blocker. |
| Negative stock | ขายได้ติดลบ | `ขายได้` is below 0 after acknowledged over-reservation. | Warning chip. |
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
- The system may warn about over-reservation or negative `ขายได้`, but should not block normal visibility.

## 14. UX Notes for Designer

- This is a dense stock visibility workbench, not a warehouse adjustment form.
- Use image thumbnails for quick product recognition.
- Keep `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้` visually separate.
- Keep dimensions split as `กว้าง`, `ลึก`, `สูง`.
- Actions like `ตรวจนับสต๊อกสินค้า` and `ปรับยอดสต๊อกสินค้า` should be obvious navigation buttons.
- Do not make stock cells look editable.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-006-ready-stock-view.md` as the image generation prompt source.
