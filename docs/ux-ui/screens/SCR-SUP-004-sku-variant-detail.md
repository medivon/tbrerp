# SCR-SUP-004 - SKU Variant Detail

## 1. Purpose

The SKU Variant Detail screen is the desktop read-only detail page for one color-specific `SKU ย่อย`. It helps users inspect the exact sellable/stockable color under a Product Model, including SKU code, color, stock visibility, image fallback, and related production links.

Product-level editing and color open/close decisions are owned by Product Model Detail.

## 2. Primary Users

- Admin
- Product-permission user
- Stock-permission user
- Manager / Owner

## 3. User Goals

- Confirm the exact SKU Variant selected for sale, stock, or production.
- See the parent Product Model (`SKU หลัก`) and this variant's color.
- See stock using clear terms: `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`.
- Inspect variant-specific image overrides where they exist, with fallback to Product Model images.
- Navigate to Product Model Detail, stock adjustment, production creation, or related stock/production views.

## 4. Entry Points

- Product Model Detail -> `เปิด SKU ย่อย`.
- Product / SKU Table expanded color reference when future design needs a direct link.
- Production `ผลิตจาก SKU` selection.
- Ready Stock View.
- Order Line item selection / historical Order Line detail.

## 5. Exit Points

- Product Model Detail.
- SKU Image Groups.
- Ready Stock View.
- Stock Count.
- Stock Adjustment.
- Production Job Entry.
- Review Album through Product Model context.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header with SKU code, Product Model name, color, status chips, and action buttons.
- Main content uses stacked read-only detail cards.
- Image cards show SKU Variant image overrides first and Product Model fallbacks where missing.
- Stock is report-only on this page.
- Editing SKU/color availability happens through Product Model Detail or dedicated edit flows.

## 7. Main Components

- SKU Variant identity header
- Product Model reference card
- Color card
- Dimensions card inherited from Product Model
- Image/fallback card
- Department instruction image card
- Stock summary card
- Production summary card
- Read-only action panel

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| SKU code | รหัส SKU | TBR-TBL-123-OAK | SKU Variant | Generated from category code, Product Model ID, and color code. |
| Product Model | SKU หลัก | โต๊ะข้างไม้สัก | Product Model | Parent product. |
| Product Model ID/code | รหัส SKU หลัก | 123 / PM-123 | Product Model | Used in SKU code. |
| Category | หมวดหมู่ | โต๊ะ | หมวดหมู่สินค้า | Category/Subcategory. |
| Color | สี | สีโอ๊คเข้ม | รายการสี | Variant identity. |
| Color status | สถานะสี | เปิดใช้งาน / ปิดใช้งาน | Product Color Option | Disabled variants are retained for history. |
| Width | กว้าง | 45 ซม. | Product Model | Separate field inherited from Product Model. |
| Depth | ลึก | 45 ซม. | Product Model | Separate field inherited from Product Model. |
| Height | สูง | 55 ซม. | Product Model | Separate field inherited from Product Model. |
| Main image | รูปหลัก | Color-specific or product image | SKU Variant / Product Model | Use SKU Variant image if present; otherwise fallback to Product Model. |
| Woodwork images | รูปสำหรับช่างไม้ | Structure images | SKU Variant / Product Model | Use variant group if present, otherwise fallback. |
| Coloring images | รูปสำหรับฝ่ายสี/ตกแต่ง | Color images | SKU Variant / Product Model | Use variant group if present, otherwise fallback. |
| Rak Samuk images | รูปสำหรับรักสมุก | Pattern images | SKU Variant / Product Model | Use variant group if present, otherwise fallback. |
| Stock on hand | มีอยู่ในร้าน | 4 | Ready Stock | Report-only. |
| Reserved | จองแล้ว | 2 | Order Reservation | Report-only. |
| Sellable | ขายได้ | 2 / -1 | Computed stock | May be negative after acknowledged over-reservation. |
| Production summary | งานผลิต | กำลังผลิต 6 / รอรับเข้า 2 | Production Job | Report-only with navigation. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Product Model | เปิด SKU หลัก | Product permission | Opens parent Product Model Detail. | No |
| Manage Images | จัดการรูปสินค้า | Product permission | Opens SKU Image Groups in SKU Variant context. | No |
| Create production | ผลิตเข้าสต๊อก / ผลิตสินค้าชิ้นนี้ | Product/production permission | Opens Production Job Entry with this SKU Variant prefilled. | No |
| View stock | ดูสต๊อก | Stock permission | Opens Ready Stock View. | No |
| Stock count | ตรวจนับสต๊อก | Stock permission | Opens Stock Count. | No |
| Stock adjustment | ปรับยอดสต๊อก | Stock permission / manager | Opens Stock Adjustment with this SKU Variant preselected. | No |
| Open related production | ดูงานผลิตที่เกี่ยวข้อง | Product/production permission | Opens related production list or job view. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Color active | สีเปิดใช้งาน | SKU Variant can be used for new sale/production selection. | Positive chip. |
| Color inactive | สีปิดใช้งาน | SKU Variant is retained but hidden from new selection. | Gray chip. |
| Sold out | หมด | `ขายได้` is zero. | Warning/neutral chip. |
| Negative stock | ขายได้ติดลบ | `ขายได้` is below zero. | Warning chip. |
| In production | กำลังผลิต | Related production exists. | Secondary chip. |
| Waiting receipt | รอรับเข้า | Completed production awaits stock receipt. | Secondary chip. |

## 11. Empty State

Empty variant image groups show `ยังไม่มีรูปเฉพาะสีนี้` and explain that the Product Model image will be used instead.

## 12. Error State

- Loading fails: `โหลดรายละเอียด SKU ไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูรายละเอียด SKU`.
- Save fails in image context: `บันทึก SKU ไม่สำเร็จ`.

## 13. Permission Rules

- This screen is read-only by default.
- Product/color field editing does not appear inline here.
- Direct stock quantity edits are not allowed here.
- Color open/close happens in Product Model Detail.
- Production creation is available only when the color is enabled.
- Stock actions navigate to dedicated stock screens.
- Product cost, labor cost, profit, sales price, tax, and accounting data must not appear.
- Job reference is shown on Product Model, not duplicated on SKU Variant.

## 14. UX Notes for Designer

- Keep `SKU หลัก` and `SKU ย่อย` visually distinct.
- Show SKU Variant as the color-specific stock unit.
- Use `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้` consistently.
- Keep dimensions inherited from Product Model.
- Make fallback image behavior obvious without making the page feel like a setup form.
- Review Album is separate from product image groups and is normally reached from Product Model context.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-004-sku-variant-detail.md` as the image generation prompt source.
