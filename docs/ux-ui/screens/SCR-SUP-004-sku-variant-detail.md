# SCR-SUP-004 - SKU Variant Detail

## 1. Purpose

The SKU Variant Detail screen is the full-option desktop read-only detail page for one `SKU ย่อย`. It supports product identification, large image review, department instruction visibility, review links, Job reference, and stock/production summary. It is not an edit form and does not directly adjust stock quantity; stock changes happen in dedicated stock screens.

## 2. Primary Users

- Admin
- Product-permission user
- Stock-permission user
- Manager / Owner

## 3. User Goals

- Understand one SKU Variant clearly before deciding whether to edit it.
- See parent Product Model (`SKU ใหญ่`) and concrete SKU Variant (`SKU ย่อย`).
- Inspect large product images and department images without entering an edit mode.
- Review image groups used by production and sales context.
- Review stock and production summary without editing stock inline.
- Open Job reference, create production from SKU, open stock screens, open review albums, or open the separate SKU edit flow.

## 4. Entry Points

- Product / SKU Table -> `เปิด SKU`.
- Product Model Detail -> SKU Variant.
- Production `ผลิตจาก SKU` selection.
- Ready Stock View.
- Order Line item selection.

## 5. Exit Points

- Product / SKU Table.
- Product Model Detail.
- SKU Image Groups.
- Ready Stock View.
- Stock Count.
- Stock Adjustment.
- Production Job Entry.
- Review Album.
- Job Detail from optional Job reference.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header with SKU code, Product Model, SKU Variant name, status chips, and action buttons.
- Main content uses stacked read-only detail cards in a single scrollable story.
- Cards should be image-first where recognition matters, with large product imagery and grouped thumbnails.
- A compact sticky action/summary card may sit on the right, but the main screen should not feel like a form.
- Stock is report-only on this page.
- Editing happens only after the user clicks `แก้ไข SKU`, which opens a dedicated edit mode/page.

## 7. Main Components

- SKU identity header
- Hero product image card
- Product/SKU identity card
- Dimensions card with separated `กว้าง`, `ลึก`, `สูง`
- Product image group cards
- Department instruction image cards
- Department instruction text cards
- Review Album preview card
- Job reference card
- Stock and production summary card
- Read-only action panel

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| SKU code | รหัส SKU | SKU-TEAK-TABLE-OAK-001 | SKU Variant | Unique/searchable code. |
| Product Model | SKU ใหญ่ | โต๊ะข้างไม้สัก | Product Model | Parent product family. |
| SKU Variant | SKU ย่อย | โต๊ะข้างไม้สัก สีโอ๊คเข้ม | SKU Variant | Concrete stockable/sellable item. |
| Category | หมวดหมู่ | โต๊ะ | Product Category | Category/Subcategory. |
| Color | สี | สีโอ๊คเข้ม | Color Master | Color usually splits variant. |
| Width | กว้าง | 45 ซม. | SKU Variant / Product Model | Separate field. |
| Depth | ลึก | 45 ซม. | SKU Variant / Product Model | Separate field. |
| Height | สูง | 55 ซม. | SKU Variant / Product Model | Separate field. |
| Status | สถานะ | เปิดใช้งาน | SKU Variant | Active/inactive. |
| Main image | รูปหลัก | Product image | SKU Variant | Main recognition image. |
| Additional images | รูปเพิ่มเติม | Product thumbnails | SKU Image Group | Drag/drop and ordered. |
| Woodwork images | รูปสำหรับช่างไม้ | Structure images | Department Instruction Images | Inherited into Job when selected. |
| Coloring images | รูปสำหรับฝ่ายสี/ตกแต่ง | Color images | Department Instruction Images | Inherited into Job when selected. |
| Rak Samuk images | รูปสำหรับรักสมุก | Pattern images | Department Instruction Images | Inherited into Job when relevant. |
| Review Album | คลังรีวิว | 12 รูป | Review Album | Separate from product images. |
| Job reference | อ้างอิง Job | ไม่มี / JOB-O-0241 | Job Reference on SKU | Traceability only, no copying. |
| Stock summary | สต๊อก | คงเหลือ 0 / จอง 0 | Ready Stock | Report-only. |
| Production summary | งานผลิต | กำลังผลิต 6 | Production Job | Report-only. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Edit SKU | แก้ไข SKU | Product permission | Opens dedicated SKU edit flow. | No |
| Open Product Model | เปิด SKU ใหญ่ | Product permission | Opens parent Product Model. | No |
| Create production | สร้างงานผลิต | Product/production permission | Opens Production Job Entry with SKU selected. | No |
| View stock | ดูสต๊อก | Stock permission | Opens Ready Stock View. | No |
| Stock count | ตรวจนับสต๊อก | Stock permission | Opens Stock Count. | No |
| Stock adjustment | ปรับยอดสต๊อก | Stock permission / manager | Opens Stock Adjustment. | No |
| Open Review Album | เปิดคลังรีวิว | Product/CRM permission | Opens linked Review Album. | No |
| Open Job reference | เปิด Job | Product permission | Opens referenced Job. | No |
| Deactivate SKU | ปิดใช้งาน | Product permission / manager | Deactivates SKU only if stock is cleared. | Yes |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active | เปิดใช้งาน | SKU can be used normally. | Positive chip. |
| Inactive | ปิดใช้งาน | Hidden from normal lists but retained for history. | Gray chip. |
| No stock | ไม่มีสต๊อก | Ready stock is zero. | Warning chip. |
| In production | กำลังผลิต | Production exists. | Blue/purple chip. |
| Has review | มีรีวิว | Review album exists. | Green chip. |
| Job reference | อ้างอิง Job | SKU has source reference. | Neutral chip. |

## 11. Empty State

Empty image groups show `ยังไม่มีรูป` with `เพิ่มรูป`. Empty Job reference shows `ยังไม่มี Job อ้างอิง` with optional lookup action where allowed.

## 12. Error State

- Loading fails: `โหลดรายละเอียด SKU ไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ดูรายละเอียด SKU`.
- Deactivate with stock remaining: `ต้องเคลียร์สต๊อกก่อนปิดใช้งาน`.
- Save fails: `บันทึก SKU ไม่สำเร็จ`.

## 13. Permission Rules

- Full option can be visible for admin/product users in design.
- This screen is read-only by default.
- Field-level editing must not appear inline on this screen.
- `แก้ไข SKU` opens a separate edit state/page.
- Direct stock quantity edits are not allowed here.
- Stock actions navigate to dedicated screens.
- Product cost, labor cost, profit, sales price, tax, and accounting data must not appear.
- SKU can be deactivated only after stock is cleared.
- Job reference is lookup-only traceability; it must not copy or sync Job data/images.

## 14. UX Notes for Designer

- Keep `SKU ใหญ่` and `SKU ย่อย` visually clear.
- Keep `กว้าง`, `ลึก`, `สูง` as separate fields.
- Use a card-based read-only layout, not a dense edit form.
- Show the main product image large enough for staff to recognize the item quickly.
- Image groups should be full-option, visual, and separated by purpose.
- Review Album is separate from product image groups.
- Stock/production should be summary/report-only.
- Use a compact right-side action/summary card only if it supports scanning.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-004-sku-variant-detail.md` as the image generation prompt source.
