# SCR-SUP-014 - Product / SKU Table Mockup

Status: Approved

Approved image:

- `./SCR-SUP-014-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SUP-014-product-sku-table.md`
- `docs/ux-ui/image-prompts/IMG-SUP-014-product-sku-table.md`

## Approved Role

This mockup is the current source of truth for the desktop admin `รายการสินค้า / SKU` table.

It confirms:

- The main entry for `สินค้า / สต๊อก` is a searchable Product/SKU table.
- The table shows Product Models / `SKU หลัก` as top-level rows.
- Color-specific `SKU ย่อย` rows appear only inside the expanded parent Product Model, and only when the color has `ขายได้ > 0`.
- Dimensions are split into separate fields: `กว้าง`, `ลึก`, `สูง`.
- The main stock number uses `ขายได้ X ชิ้น`; if no enabled color can be sold, show `หมด`.
- Stock and production are report-only summary on this page; no inline stock editing.
- Stock changes must happen through dedicated screens such as `ตรวจนับสต๊อก` and `ปรับยอดสต๊อก`.
- The row action `ดูสินค้า` opens Product Model Detail even when stock is zero.

## Regeneration Rule

Future prompts for this screen must keep the dense Product Model-first table/search workbench structure and must not turn the page into product cards, a SKU Variant top-level list, or a stock-editing screen.
