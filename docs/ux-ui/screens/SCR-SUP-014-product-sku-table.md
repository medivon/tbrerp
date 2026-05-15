# SCR-SUP-014 - Product / SKU Table

## 1. Purpose

The Product / SKU Table is the main desktop entry screen for `สินค้า / สต๊อก`. It lists Product Models / `SKU หลัก` as the primary rows, lets users search and filter products, and gives a quick saleable-stock view. Color-specific SKU Variants / `SKU ย่อย` appear only as expanded read-only color rows when they have saleable stock.

Direct stock editing, color management, image management, and production creation happen from dedicated detail/action screens, not inline in this table.

## 2. Primary Users

- Admin
- Product-permission user
- Stock-permission user
- Manager / Owner

## 3. User Goals

- Search product records quickly by product name, product code, SKU code, or color.
- Identify Product Models visually from the main product image.
- See whether a Product Model has saleable stock now.
- Expand a stocked Product Model to see which colors/SKU Variants are saleable.
- Open Product Detail to manage colors, images, stock links, Job reference, and production actions.

## 4. Entry Points

- Sidebar `สินค้า / สต๊อก`.
- Order Line item selection support.
- Production `ผลิตจาก SKU` selection support.
- Stock overview.

## 5. Exit Points

- Product Model Detail / `รายละเอียด SKU หลัก`.
- Ready Stock View.
- Stock Count.
- Stock Adjustment.
- Review Album.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header: `รายการสินค้า / SKU`, primary action `เพิ่มสินค้า`.
- Summary strip: total Product Model count, active Product Model count, `ขายได้` summary, and `หมด` summary.
- Search and filter toolbar: search, category filter, color filter, stock-status filter (`ขายได้` / `หมด`).
- Dense Product Model table with image thumbnails and one row per Product Model.
- Row action button `ดูสินค้า` opens Product Detail.
- Expand control `+` is enabled only when the row has saleable stock. Expanded rows show only relevant saleable colors/SKU Variants and are read-only.

## 7. Main Components

- Search input
- Category filter
- Color filter
- Stock-status filter
- Product Model table
- Expandable color rows
- Status chips
- Stock summary chips
- `ดูสินค้า` row action

## 8. Data Shown

### Product Model Row

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Main image | รูป | Product thumbnail | Product Model | Use placeholder if no main image exists. |
| Product Model | SKU หลัก | โต๊ะข้างไม้สัก | Product Model | Main row identity. |
| Product code | รหัสสินค้า | PM-123 | Product Model | Searchable. |
| Category | หมวดหมู่ | โต๊ะ | หมวดหมู่สินค้า | Filterable. |
| Width | กว้าง | 45 ซม. | Product Model | Separate field. |
| Depth | ลึก | 45 ซม. | Product Model | Separate field. |
| Height | สูง | 55 ซม. | Product Model | Separate field. |
| Sellable total | ขายได้ | ขายได้ 5 ชิ้น / หมด | Computed from enabled SKU Variants | Sum of `ขายได้` across enabled colors. |
| Negative stock signal | สต๊อกติดลบ | มีรายการติดลบ | SKU Variant stock | Show when any enabled color has negative `ขายได้`. |
| Status | สถานะ | เปิดใช้งาน | Product Model | Product Model status. |

### Expanded Color Row

Expanded rows show only colors that are enabled and have `ขายได้ > 0`. If a color filter is active, show only the matching color when it has saleable stock.

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Color | สี | สีโอ๊คเข้ม | รายการสี / Product Color Option | Only enabled colors. |
| SKU code | รหัส SKU | TBR-TBL-123-OAK | SKU Variant | Read-only reference. |
| Sellable stock | ขายได้ | 2 ชิ้น | Ready Stock | Already subtracts reserved stock. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search | ค้นหา | All allowed users | Filters Product Models by product name, product code, SKU code, color name, or color code. | No |
| Filter category | หมวดหมู่ | All allowed users | Filters Product Models by `หมวดหมู่สินค้า`. | No |
| Filter color | สี | All allowed users | Shows Product Models that have the selected enabled color. | No |
| Filter stock status | สถานะสต๊อก | All allowed users | Filters by `ขายได้` or `หมด`. | No |
| Expand stocked row | + | All allowed users | Shows saleable colors/SKU Variants for that Product Model. | No |
| Open Product Detail | ดูสินค้า | Product/stock permission | Opens Product Model Detail. | No |
| Create Product | เพิ่มสินค้า | Product permission | Opens Product Model creation flow, including initial `รายการสี` selection. | No |
| View stock | ดูสต๊อก | Stock permission | Opens Ready Stock View. | No |
| Stock count | ตรวจนับสต๊อก | Stock permission | Opens Stock Count. | No |
| Stock adjustment | ปรับยอดสต๊อก | Stock permission / manager | Opens Stock Adjustment. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active | เปิดใช้งาน | Product Model can be used normally. | Positive chip. |
| Inactive | ปิดใช้งาน | Hidden from normal product selection but retained for history. | Neutral/gray chip. |
| Sellable | ขายได้ | Sum of enabled colors has `ขายได้ > 0`. | Green chip or text. |
| Sold out | หมด | Sum of enabled colors has `ขายได้ <= 0`. | Neutral/orange chip. |
| Negative stock | มีรายการติดลบ | At least one enabled color has negative `ขายได้`. | Warning chip. |

## 11. Empty State

If no records match search/filter, show `ไม่พบสินค้า` with actions `ล้างตัวกรอง` and, where allowed, `เพิ่มสินค้า`.

## 12. Error State

- Loading fails: `โหลดรายการสินค้าไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูรายการสินค้า`.
- Search fails: show retry without clearing filters.

## 13. Permission Rules

- Page may show full option for admin/product users.
- Direct stock quantity edits are not allowed in this table.
- Product color open/close work happens in Product Detail, not inline in this table.
- Stock actions navigate to dedicated stock screens.
- Disabled SKU Variant colors are not shown in normal expansion, but remain visible in Product Detail and history.
- Sensitive cost/profit fields must not show.

## 14. UX Notes for Designer

- This is a dense workbench, not a marketing catalogue.
- Show Product Models as the main rows; do not explode every color into the top-level table.
- Use `ขายได้ X ชิ้น` for the main table stock number and `หมด` when nothing can be sold.
- Use the `+` expansion only as a quick read-only stock breakdown by color.
- Keep dimensions split as `กว้าง`, `ลึก`, `สูง`.
- Do not show production badges in the main table; production summary belongs in Product Detail or production screens.
- Do not make stock cells look editable.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-014-product-sku-table.md` as the image generation prompt source.
