# Product, Stock, and Material Visual Guidance

Use with `docs/ux-ui/design-system/visual-design-system.md` and the active Product/SKU, stock, and material screen specs.

This file gives visual guidance for:

- Product Model / SKU screens
- Product Settings
- Ready Stock
- Stock Count
- Stock Adjustment
- Product Purchase Order
- Product Stock Receipt
- Material Stock
- Material Purchase Order
- Material Adjustment
- Stock-sensitive warnings and review screens

## Visual Role

Product and stock screens must make furniture identification easy while keeping stock quantities precise. Use image-led dense workbenches and clear Thai stock terms.

Never use `คงเหลือ` ambiguously. Use:

- Product stock: `มีอยู่ในร้าน`, `จองแล้ว`, `ขายได้`.
- Material stock: `จำนวนที่มีอยู่`.

## Product / SKU Table

Visual role: main `สินค้า / สต๊อก` entry screen.

Visual structure:

- Header: `รายการสินค้า / SKU`, primary action `เพิ่มสินค้า`.
- Summary strip: Product Model count, active count, `ขายได้`, `หมด`.
- Search/filter toolbar: product name/code, SKU code, category, color, stock status.
- Dense table with Product Model as primary row.
- Expandable color rows only when the Product Model has saleable stock.
- Row action: `ดูสินค้า`.

Do not explode every SKU Variant into top-level rows. Do not make stock cells editable.

## Product Model Detail

Visual role: read-first detail and management page for `SKU หลัก`.

Visual structure:

- Header: Product Model name/code, status chips, actions.
- Main image and identity card.
- Dimension card with `กว้าง`, `ลึก`, `สูง`.
- `สีของสินค้า` table as the operational center.
- Product-level image/instruction preview.
- Job reference card where present.
- Review Album link kept separate.

Color table:

- Show enabled and disabled colors.
- Show SKU code, `มีอยู่ในร้าน`, `จองแล้ว`, `ขายได้`, image, status, production signal.
- Disabled colors remain visible in Product Detail/history but hidden from new selection.
- Per-color actions: `เปิด SKU ย่อย`, `ปรับยอดสต๊อกสินค้า`, `ผลิตเข้าสต๊อก`.

## SKU Variant Detail

Visual role: read-only exact color/SKU reference.

Visual structure:

- Header with SKU code, parent `SKU หลัก`, color, status.
- Read-only cards for Product Model reference, color, dimensions, image fallback, stock, production links.
- Show image overrides first and Product Model fallback when missing.

Do not edit color availability or stock quantities inline here. Those route to Product Model Detail or stock screens.

## Product Images

Use clear grouped image management:

- `รูปหลัก`
- `รูปเพิ่มเติม`
- `รูปสำหรับช่างไม้`
- `รูปสำหรับฝ่ายสี/ตกแต่ง`
- `รูปสำหรับรักสมุก`
- `คลังรีวิว`

Product Model images are fallback. SKU Variant image groups are optional overrides. Review Album stays separate from product images.

Use large enough thumbnails for furniture details. Hidden/deactivated images remain historical by permission; do not imply physical deletion.

## Product Settings

Visual role: compact settings workbench, not a product catalogue.

Tabs:

- `หมวดหมู่สินค้า`
- `แท็กสินค้า`
- `รายการสี`
- `รายการลายรักสมุก`
- `รายการลายแกะสลัก`
- `รายการสีคริสตัล`

Visual rules:

- Use dense tables with search and status filter.
- Use `เปิดใช้งาน`, `ปิดใช้งาน`, `เคยใช้งานแล้ว`, `ล็อกรหัสแล้ว`, `ปิดไม่ได้` chips.
- Show blocking usage only in a blocking modal after an attempted close.
- Do not show permanent "where used" reports.
- Do not use `CRUD`, `Master`, or `ข้อมูลตั้งต้นสินค้า`.

`รายการสี` and categories need stronger code-lock visual treatment because codes affect SKU codes.

## Ready Stock

Visual role: read-only stock visibility workbench.

Visual structure:

- Header: `สินค้าพร้อมส่ง`.
- Summary cards for availability and reservations.
- Dense table with thumbnails.
- Columns emphasize `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`.
- Right preview drawer for selected SKU.
- Navigation actions: Product PO, Stock Count, Stock Adjustment, Production Job Entry, movement history.

Do not make any quantity cell look editable.

## Stock Count

Visual role: mobile/tablet-friendly physical count session.

Visual rules:

- Header: `ตรวจนับสต๊อกสินค้า`.
- Image-led SKU lines/cards.
- Show current `มีอยู่ในร้าน`, input `นับจริง`, computed `ส่วนต่าง`, reason when different, optional evidence.
- Hide `จองแล้ว` and `ขายได้` in count entry.
- `ปิดรอบนับ` opens a Review page before movement creation.
- Use `ยืนยันสต๊อกถูกต้อง` automatically for zero difference.

Keep the surface focused on counting physical stock, not sales reservation math.

## Stock Adjustment

Visual role: direct one-off stock correction.

Visual structure:

- Header: `ปรับยอดสต๊อกสินค้า`.
- SKU identity card with image.
- Form: current `มีอยู่ในร้าน`, `นับจริง`, `ส่วนต่าง`, `เหตุผล`, optional note/evidence.
- Confirmation modal summarizes SKU, current quantity, actual quantity, difference, and reason.

Hide `จองแล้ว` and `ขายได้` from the adjustment entry form. They recalculate elsewhere after save.

## Product Purchase Order

Visual role: finished-product purchase document.

Visual structure:

- Header: document number, status, date, Supplier/Store.
- Supplier snapshot block.
- SKU line table with images, ordered, received, remaining, optional purchase price, line status.
- Receipt rounds section.
- Attachments section.
- Footer actions.

Use progress visuals for ordered / received / remaining.

Differentiate:

- `รับเข้าบางส่วน`: still waiting for remaining goods.
- `รับเข้าสต๊อกยังไม่ครบ`: terminal incomplete.

Product Purchase Order can receive partially per SKU line. It is visually separate from Material Purchase Order.

## Product Stock Receipt

Visual role: one receipt round against a Product PO.

Visual structure:

- Header: `รับเข้าสินค้า`, PO number, Supplier/Store.
- Metadata: receiver, receipt date, optional note/evidence.
- Receive table: SKU image, ordered, already received, remaining, actual received now.
- Inline block when quantity exceeds remaining.
- Review modal before save summarizing SKU, received quantity, stock increase, and whether Payment Audit Follow-up will be created.

Saved receipt rounds are immutable. Wrong quantities route to Stock Adjustment.

## Material Stock

Visual role: lightweight internal material stock hub.

Visual structure:

- Header: `สต๊อกวัสดุ`.
- Top panel: `รายการรอวัตถุดิบ`.
- Summary strip.
- Search/filter toolbar.
- Dense material table with optional image, material code, name, category, supplier, unit, `จำนวนที่มีอยู่`, latest movement, waiting-note count.
- Right preview drawer with movement preview.
- Primary actions: `เพิ่มวัสดุ`, `สร้างใบสั่งซื้อวัสดุ`, `ปรับยอดวัสดุ`.

Waiting-material notes must look like notes/requests, not reservations. Do not use `จองแล้ว` or `ขายได้` for materials.

Missing material images should be visible but not blocking.

## Material Purchase Order

Visual role: one-supplier purchase document for materials, whole-document receipt only.

Visual structure:

- Header: `ใบสั่งซื้อวัสดุ`, document number, status, date, supplier.
- Material lines table.
- Related waiting Jobs panel when created from waiting-material notes.
- Attachments/evidence section.
- Print/export controls for waiting document.
- Receipt confirmation modal.
- Payment Audit Follow-up reference after receipt.

Receipt confirmation must list:

- All material lines.
- Linked Jobs that will leave `รอวัตถุดิบ`.
- Return department queue.
- Payment Audit Follow-up creation.

Make `รับเข้าสต๊อกวัสดุ` visually serious because it changes quantities and may release Jobs.

## Material Adjustment

Visual role: actual counted quantity entry for materials.

Visual structure:

- Header: `ปรับยอดวัสดุ`.
- Reason/mode selector with `กระทบยอด` as a mode/reason, not a separate feature.
- Search/select material toolbar.
- Count table with before/after/difference.
- Optional evidence at session level.
- Summary panel and confirmation before save.

Support daily, weekly, or ad hoc sessions without making a rigid daily workflow.

## Stock-sensitive Warnings and Review Screens

Use review/confirmation surfaces for stock-changing actions:

- Order Review stock warning acknowledgement.
- Shipment Builder stock warning acknowledgement.
- Product Stock Receipt save review.
- Stock Count close Review page.
- Stock Adjustment confirmation.
- Material Purchase Order receipt confirmation.
- Material Adjustment save confirmation.

Visual rules:

- Show before/after quantities.
- Show stock movement effect.
- Show linked Jobs or Payment Audit effects where active docs require.
- Evidence is optional unless the screen's behavior says otherwise.
- Old movements/receipts are not edited; use new corrections.

## Old Mockup References

Archived product/stock/material images may inform density and image usage only. Current specs override any visual that suggests inline stock editing, material reservations, automatic expense creation, full warehouse/BOM behavior, or Product/SKU values being deleted after historical use.
