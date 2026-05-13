# SCR-SUP-003 - Product Model Detail

## 1. Purpose

The Product Model Detail screen is the full-option desktop read-only detail page for one `SKU ใหญ่` / Product Model. It defines the parent product family, shared product identity, default images/instructions, and the list of related `SKU ย่อย` variants. It is not a stock adjustment page and does not directly change stock quantity.

## 2. Primary Users

- Admin
- Product-permission user
- Manager / Owner

## 3. User Goals

- Understand the parent product family before opening or creating SKU Variants.
- See related `SKU ย่อย` variants in one place.
- Inspect shared product images and department instruction images.
- See default dimensions and product-level notes.
- Open SKU Variant Detail, create a new SKU Variant, create production from a selected SKU, or open the separate edit flow.

## 4. Entry Points

- Product / SKU Table -> `เปิด SKU ใหญ่`.
- SKU Variant Detail -> `เปิด SKU ใหญ่`.
- Product creation or SKU creation support.
- Job-to-SKU reference review.

## 5. Exit Points

- Product / SKU Table.
- SKU Variant Detail.
- SKU Image Groups.
- Review Album.
- Production Job Entry.
- Product Model edit flow.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header with Product Model name, code, status chips, and actions.
- Main content uses stacked read-only cards.
- Right context panel shows variant summary, review summary, and key actions.
- Related SKU Variants appear in a dense table/card list.
- Stock is shown only through the related variants summary, not as editable stock.

## 7. Main Components

- Product Model identity header
- Hero product image card
- Product Model information card
- Default dimensions card with separated `กว้าง`, `ลึก`, `สูง`
- Related SKU Variant list
- Product-level image group cards
- Department instruction cards
- Review Album preview
- Restricted internal data indicator
- Action/summary panel

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Product Model code | รหัส SKU ใหญ่ | PM-TEAK-TABLE-001 | Product Model | Parent code. |
| Product Model name | SKU ใหญ่ | โต๊ะข้างไม้สัก | Product Model | Parent family. |
| Category | หมวดหมู่ | โต๊ะ | Product Category | Filter/search support. |
| Default width | กว้างมาตรฐาน | 45 ซม. | Product Model | Separate field. |
| Default depth | ลึกมาตรฐาน | 45 ซม. | Product Model | Separate field. |
| Default height | สูงมาตรฐาน | 55 ซม. | Product Model | Separate field. |
| Status | สถานะ | เปิดใช้งาน | Product Model | Hidden if inactive by default. |
| Variant count | จำนวน SKU ย่อย | 4 รายการ | SKU Variant | Related variants. |
| Main image | รูปหลัก | Product family image | Product Model | Shared recognition image. |
| Department images | รูปตามแผนก | Wood/color/rak samuk images | Department Instruction Images | May be inherited into Job when selected. |
| Review Album | คลังรีวิว | 18 รูป | Review Album | Separate from product images. |
| Source Job | อ้างอิง Job | JOB-O-0241 | Optional traceability | Reference only. |
| Restricted labor config | ข้อมูลค่าจ้างมาตรฐาน | จำกัดสิทธิ์ | Restricted product setting | Do not show amounts in normal detail view. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Edit Product Model | แก้ไข SKU ใหญ่ | Product permission | Opens dedicated Product Model edit flow. | No |
| Add SKU Variant | เพิ่ม SKU ย่อย | Product permission | Opens SKU Variant creation under this Product Model. | No |
| Open SKU Variant | เปิด SKU | Product permission | Opens SKU Variant Detail. | No |
| Create Production | สร้างงานผลิต | Product/production permission | Opens Production Job Entry after SKU selection. | No |
| Manage Images | จัดการรูปสินค้า | Product permission | Opens SKU Image Groups. | No |
| Open Review Album | เปิดคลังรีวิว | Product/CRM permission | Opens linked Review Album. | No |
| Back to Product List | กลับไปรายการสินค้า | All allowed users | Returns to Product / SKU Table. | No |
| Deactivate Product Model | ปิดใช้งาน | Product permission / manager | Deactivates after related stock/usage checks. | Yes |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active | เปิดใช้งาน | Product Model can be used normally. | Positive chip. |
| Inactive | ปิดใช้งาน | Hidden from normal lists but retained for history. | Gray chip. |
| Has variants | มี SKU ย่อย | Product Model has variants. | Blue chip. |
| Has reviews | มีรีวิว | Review Album exists. | Green chip. |
| Source Job | อ้างอิง Job | Product Model can reference a Job source. | Neutral chip. |

## 11. Empty State

If no SKU Variants exist, show `ยังไม่มี SKU ย่อย` with action `เพิ่ม SKU ย่อย`.

## 12. Error State

- Loading fails: `โหลดรายละเอียด SKU ใหญ่ไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูรายละเอียด SKU ใหญ่`.
- Deactivate blocked: `ต้องตรวจสอบ SKU ย่อยและสต๊อกก่อนปิดใช้งาน`.

## 13. Permission Rules

- This screen is read-only by default.
- Field-level editing must not appear inline on this screen.
- `แก้ไข SKU ใหญ่` opens a separate edit state/page.
- Direct stock quantity edits are not allowed.
- Sensitive cost, labor rate, profit, sales price, tax, and accounting data must not appear in the normal visual.
- If restricted labor configuration exists, show only a permission-safe indicator unless the user is in a dedicated authorized configuration screen.
- Source Job reference is traceability only and must not copy or sync Job data/images automatically.

## 14. UX Notes for Designer

- Keep `SKU ใหญ่` distinct from `SKU ย่อย`.
- This page should feel like the parent product family page, not a catalogue landing page.
- Use large images and clearly separated image groups.
- Show related SKU Variants as a compact list/table.
- Keep dimensions split as `กว้าง`, `ลึก`, `สูง`.
- Stock/production information should be summary-only through related SKU rows.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-003-product-model-detail.md` as the image generation prompt source.
