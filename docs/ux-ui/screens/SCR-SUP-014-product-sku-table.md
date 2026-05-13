# SCR-SUP-014 - Product / SKU Table

## 1. Purpose

The Product / SKU Table is the main desktop entry screen for `สินค้า / สต๊อก`. It lets admin search, filter, compare, and open Product Model or SKU Variant records. It shows stock and production as summary/reporting information only; direct stock adjustment must happen in dedicated stock screens.

## 2. Primary Users

- Admin
- Product-permission user
- Stock-permission user
- Manager / Owner

## 3. User Goals

- Search product and SKU records quickly.
- Identify products visually from main image.
- Compare Product Model, SKU Variant, color, and dimensions.
- See high-level stock and production status without editing stock directly.
- Open Product Model, SKU Variant, image groups, stock view, review album, or production creation.

## 4. Entry Points

- Sidebar `สินค้า / สต๊อก`.
- Order Line item selection.
- Production `ผลิตจาก SKU` selection.
- Stock overview.

## 5. Exit Points

- Product Model Detail.
- SKU Variant Detail.
- SKU Image Groups.
- Ready Stock View.
- Stock Count.
- Stock Adjustment.
- Review Album.
- Production Job Entry `สร้างงานผลิต`.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header: `รายการสินค้า / SKU`, primary action `เพิ่มสินค้า`, secondary action `เพิ่ม SKU`.
- Summary strip: total SKU count, active SKU count, low/no stock summary, production-in-progress summary.
- Search and filter toolbar.
- Dense table with image thumbnails and scannable columns.
- Right preview drawer for selected SKU.
- Stock and production area is report-only with links to dedicated actions.

## 7. Main Components

- Search input
- Filter chips
- Sort/group selector
- Product/SKU table
- SKU preview drawer
- Status chips
- Stock summary chips
- Production summary chips
- Action buttons

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Main image | รูป | Product thumbnail | SKU Variant | Image-led recognition. |
| Product Model | SKU ใหญ่ | โต๊ะข้างไม้สัก | Product Model | Parent family. |
| SKU Variant | SKU ย่อย | โต๊ะข้างไม้สัก สีโอ๊คเข้ม | SKU Variant | Sellable/stockable item. |
| SKU code | รหัส SKU | SKU-TEAK-TABLE-OAK-001 | SKU Variant | Searchable. |
| Category | หมวดหมู่ | โต๊ะ | Product Category | Filterable. |
| Color | สี | สีโอ๊คเข้ม | Color Master | Color splits SKU Variant. |
| Width | กว้าง | 45 ซม. | Product Model / SKU Variant | Separate field. |
| Depth | ลึก | 45 ซม. | Product Model / SKU Variant | Separate field. |
| Height | สูง | 55 ซม. | Product Model / SKU Variant | Separate field. |
| Status | สถานะ | เปิดใช้งาน | SKU Variant | Closed SKU remains searchable by permission. |
| Ready stock | คงเหลือ | 0 | Ready Stock | Report-only on this page. |
| Reserved stock | จองแล้ว | 2 | Ready Stock | Report-only. |
| In production | กำลังผลิต | 6 | Production Job / Production Lot | Report-only. |
| Review count | รีวิว | 12 รูป | Review Album | Link to review album. |
| Job reference | อ้างอิง Job | JOB-O-0241 | Job Reference on SKU | Read-only traceability. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search | ค้นหา | All allowed users | Filters table. | No |
| Open SKU | เปิด SKU | Product/stock permission | Opens SKU Variant Detail. | No |
| Open Product Model | เปิด SKU ใหญ่ | Product permission | Opens Product Model Detail. | No |
| Create Product | เพิ่มสินค้า | Product permission | Opens create Product Model flow. | No |
| Create SKU | เพิ่ม SKU | Product permission | Opens create SKU Variant flow. | No |
| Create Production | สร้างงานผลิต | Product/production permission | Opens Production Job Entry from selected SKU. | No |
| View stock | ดูสต๊อก | Stock permission | Opens Ready Stock View. | No |
| Stock count | ตรวจนับสต๊อก | Stock permission | Opens Stock Count. | No |
| Stock adjustment | ปรับยอดสต๊อก | Stock permission / manager | Opens Stock Adjustment. | No |
| Open reviews | เปิดคลังรีวิว | Product/CRM permission | Opens Review Album filtered to SKU. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active | เปิดใช้งาน | SKU is available for use. | Positive chip. |
| Inactive | ปิดใช้งาน | SKU is hidden from normal lists, but retained for history. | Neutral/gray chip. |
| No stock | ไม่มีสต๊อก | Current stock is zero. | Warning chip, not blocker. |
| Reserved | มีจอง | Some stock is reserved by Orders. | Blue chip. |
| In production | กำลังผลิต | Related production exists. | Purple/blue chip. |
| Has review | มีรีวิว | Review Album linked. | Green chip. |

## 11. Empty State

If no records match search/filter, show `ไม่พบสินค้า` with actions `ล้างตัวกรอง` and, where allowed, `เพิ่มสินค้า`.

## 12. Error State

- Loading fails: `โหลดรายการสินค้าไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูรายการสินค้า`.
- Search fails: show retry without clearing filters.

## 13. Permission Rules

- Page may show full option for admin/product users.
- Direct stock quantity edits are not allowed in this table.
- Stock actions navigate to dedicated stock screens.
- Deactivated SKU should be hidden by default but searchable/filterable by permission.
- Sensitive cost/profit fields must not show.

## 14. UX Notes for Designer

- This is a dense workbench, not a marketing catalogue.
- Use image thumbnails for quick recognition.
- Keep dimensions split as `กว้าง`, `ลึก`, `สูง`.
- Stock and production should be summary/report-only on this page.
- Provide obvious paths to `ปรับยอดสต๊อก`, `ตรวจนับสต๊อก`, and `สร้างงานผลิต`, but do not perform those actions inline.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-014-product-sku-table.md` as the image generation prompt source.
