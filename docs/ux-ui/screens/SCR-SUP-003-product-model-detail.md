# SCR-SUP-003 - Product Model Detail

## 1. Purpose

The Product Model Detail screen is the desktop detail and management page for one `SKU หลัก` / `SKU ใหญ่` / Product Model. It defines the parent product identity, shared dimensions, shared images/instructions, enabled color options, color-specific SKU Variants, stock visibility, and stock-production shortcuts.

This page is not an inline stock editor. Stock changes happen through Product Purchase Order receipt, Stock Count, Stock Adjustment, Order reservation, or SKU-tied Production completion flows.

## 2. Primary Users

- Admin
- Product-permission user
- Stock-permission user
- Manager / Owner

## 3. User Goals

- Understand one Product Model before selling, producing, or editing it.
- See which colors are real options for this Product Model.
- Open or close a color option while preserving history.
- See stock by color using clear terms: `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`.
- Open stock adjustment for a specific color without editing stock inline.
- Start `ผลิตเข้าสต๊อก` for a specific enabled color.
- Inspect shared Product Model images and department instruction images.
- Open optional Job reference without copying Job data into product data.

## 4. Entry Points

- Product / SKU Table -> `ดูสินค้า`.
- SKU Variant Detail -> `เปิด SKU หลัก`.
- Order item selection support.
- Production `ผลิตจาก SKU` support.
- Job-to-SKU reference review.

## 5. Exit Points

- Product / SKU Table.
- SKU Variant Detail.
- SKU Image Groups.
- Ready Stock View.
- Stock Adjustment.
- Review Album.
- Production Job Entry.
- Job Detail from optional Job reference.
- Product Model edit flow.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header with Product Model name, product code, status chips, and actions.
- Main content uses stacked sections for identity, images, dimensions, colors/stock, production summary, Job reference, and review links.
- `สีของสินค้า` is the operational center of the page: it lists every enabled and disabled color/SKU Variant for this Product Model.
- A right summary/action panel may show total `ขายได้`, disabled-color count, production summary, and key actions.
- Stock values are visible but not editable inline.

## 7. Main Components

- Product Model identity header
- Main product image card
- Product Model information card
- Dimensions card with separated `กว้าง`, `ลึก`, `สูง`
- `สีของสินค้า` table
- Color open/close controls
- Stock-by-color values
- Per-color `ปรับยอดสต๊อกสินค้า` action
- Per-color `ผลิตเข้าสต๊อก` / `ผลิตสินค้าชิ้นนี้` action
- Product-level image group preview
- Department instruction preview
- Production summary
- Job reference card
- Review Album preview
- Action/summary panel

## 8. Data Shown

### Product Model

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Product Model ID/code | รหัส SKU หลัก | 123 / PM-123 | Product Model | Used inside SKU Variant code. |
| Product Model name | SKU หลัก | โต๊ะข้างไม้สัก | Product Model | Parent product. |
| Category | หมวดหมู่ | โต๊ะ | หมวดหมู่สินค้า | Category code is used when generating SKU Variant code. |
| Subcategory | หมวดย่อย | โต๊ะข้าง | Product Subcategory | Not included in SKU code. |
| Default width | กว้าง | 45 ซม. | Product Model | Separate field. |
| Default depth | ลึก | 45 ซม. | Product Model | Separate field. |
| Default height | สูง | 55 ซม. | Product Model | Separate field. |
| Status | สถานะ | เปิดใช้งาน | Product Model | Hidden from normal selection if inactive. |
| Main image | รูปหลัก | Product family image | Product Model | Optional; show placeholder if missing. |
| Additional images | รูปรอง / รูปเพิ่มเติม | Product angles | Product Model | Managed in SKU Image Groups. |
| Department images | รูปตามแผนก | Woodwork/Coloring/Rak Samuk images | Product Model | Fallback instructions for SKU Variants. |
| Review Album | คลังรีวิว | 18 รูป | Review Album | Separate from product images. |
| Source Job | อ้างอิง Job | JOB-O-0241 | Product Model | Traceability only; no copying/syncing. |

### Color / SKU Variant Table

Show both enabled and disabled colors. Disabled rows remain visible for management and history.

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Color | สี | สีโอ๊คเข้ม | รายการสี / Product Color Option | Product-specific color option. |
| Color status | สถานะสี | เปิดใช้งาน / ปิดใช้งาน | Product Color Option | Disabled color is not a new selection option. |
| SKU code | รหัส SKU | TBR-TBL-123-OAK | SKU Variant | One SKU Variant per Product Model + Color. |
| Stock on hand | มีอยู่ในร้าน | 4 | Ready Stock | Physical recorded quantity. |
| Reserved | จองแล้ว | 2 | Order Reservation | Reserved by confirmed Orders. |
| Sellable | ขายได้ | 2 / -1 | Computed stock | Can be negative after acknowledged over-reservation. |
| SKU image | รูปสี | Optional color image | SKU Variant | Optional; fallback to Product Model image. |
| Production signal | งานผลิต | กำลังผลิต 6 / รอรับเข้า 2 | Production Job | Summary/link only. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Edit Product Model | แก้ไข SKU หลัก | Product permission | Opens Product Model edit flow. | No |
| Manage Images | จัดการรูปสินค้า | Product permission | Opens SKU Image Groups. | No |
| Add / enable color | เพิ่มสีให้สินค้า | Product permission | Enables a `รายการสี` value for this Product Model and creates/reuses the SKU Variant. | No |
| Disable color | ปิดสีนี้ | Product permission / manager | Hides this color from new selection if no stock or unfinished work exists. | Yes if allowed |
| Re-enable color | เปิดใช้สีนี้ | Product permission | Reopens the existing SKU Variant and code. | Yes |
| Open SKU Variant | เปิด SKU ย่อย | Product/stock permission | Opens SKU Variant Detail where needed. | No |
| Stock adjustment | ปรับยอดสต๊อกสินค้า | Stock permission / manager | Opens Stock Adjustment with the color/SKU Variant preselected. | No |
| Create production | ผลิตเข้าสต๊อก / ผลิตสินค้าชิ้นนี้ | Product/production permission | Opens Production Job Entry in `ผลิตจาก SKU` mode with the selected SKU Variant prefilled. | No |
| Open related production | ดูงานผลิตที่เกี่ยวข้อง | Product/production permission | Opens related production list or job view. | No |
| Open Review Album | เปิดคลังรีวิว | Product/CRM permission | Opens linked Review Album. | No |
| Open Job reference | เปิด Job | Product permission | Opens referenced Job. | No |
| Back to Product List | กลับไปรายการสินค้า | All allowed users | Returns to Product / SKU Table. | No |
| Deactivate Product Model | ปิดใช้งานสินค้า | Product permission / manager | Deactivates after related stock/usage checks. | Yes |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active | เปิดใช้งาน | Product Model can be used normally. | Positive chip. |
| Inactive | ปิดใช้งาน | Hidden from normal lists but retained for history. | Gray chip. |
| Color active | สีเปิดใช้งาน | Color is a real option for this product. | Positive chip. |
| Color inactive | สีปิดใช้งาน | Color is not a current option for this product. | Gray chip. |
| Sold out | หมด | Total `ขายได้` is zero or below. | Neutral/orange chip. |
| Negative stock | มีรายการติดลบ | Any color has negative `ขายได้`. | Warning chip. |
| In production | กำลังผลิต | Related production exists. | Secondary chip. |
| Waiting receipt | รอรับเข้า | Thai UI stock wording; in domain/code, SKU-tied `JOB-P` completion updates Ready Stock directly. | Secondary chip. |
| Has reviews | มีรีวิว | Review Album exists. | Green chip. |
| Source Job | อ้างอิง Job | Product Model has source Job reference. | Neutral chip. |

## 11. Empty State

If no colors exist, show `ยังไม่มีสีของสินค้า` with action `เพิ่มสีให้สินค้า`. If no main image exists, show a neutral placeholder and `เพิ่มรูปหลัก`.

## 12. Error / Modal States

- Loading fails: `โหลดรายละเอียด SKU หลักไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูรายละเอียด SKU หลัก`.
- Disable color blocked by stock: modal says `ยังมีสินค้าในร้าน` and links to stock detail/adjustment.
- Disable color blocked by unfinished work: modal says `ยังมีงานที่เกี่ยวข้องยังไม่จบ` and links to Order, Job, or Production records.
- Allowed color/Product deactivation: confirmation modal requires reason and writes Management Log.
- Re-enable color/Product: confirmation modal writes Management Log but does not require a reason.
- Duplicate color: modal says this Product Model already has that color and links to the existing SKU Variant.
- Deactivate Product Model blocked: `ต้องตรวจสอบสี สต๊อก และงานค้างก่อนปิดใช้งาน`.

## 13. Permission Rules

- This screen is read-first, but color open/close and action buttons are allowed where permitted.
- Field-level product editing happens in a dedicated edit flow.
- Direct stock quantity edits are not allowed.
- `รับเข้าจากงานผลิต` does not start from Product Detail; in domain/code, SKU-tied `JOB-P` completion updates Ready Stock directly.
- Sensitive cost, labor rate, profit, sales price, tax, and accounting data must not appear in the normal visual.
- Source Job reference is traceability only and must not copy or sync Job data/images automatically.
- Disabled colors are hidden from new Order and Production selection but remain visible in Product Detail and historical records.
- Per-color production actions appear only for enabled colors.

## 14. UX Notes for Designer

- Use `SKU หลัก` as the visible product identity and keep `SKU ย่อย` as the color-specific stock unit.
- Make `สีของสินค้า` easy to scan; it is where users understand which colors exist for this product.
- Use `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้` consistently. Do not use `คงเหลือ` ambiguously.
- Show negative `ขายได้` as a real number with warning in Product Detail.
- Keep `กว้าง`, `ลึก`, `สูง` as Product Model fields. If size differs materially, create a different Product Model.
- Product Model images are the fallback for SKU Variant images and department instruction images.
- A SKU Variant may override specific image groups; missing groups fall back to Product Model.
- Keep Review Album separate from product images.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-003-product-model-detail.md` as the image generation prompt source.
