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
- The table shows both `SKU ใหญ่` and `SKU ย่อย`.
- Dimensions are split into separate fields: `กว้าง`, `ลึก`, `สูง`.
- Stock and production are report-only summary on this page.
- Stock changes must happen through dedicated screens such as `ตรวจนับสต๊อก` and `ปรับยอดสต๊อก`.
- The right preview drawer can link to `เปิด SKU`, `สร้างงานผลิต`, `ดูสต๊อก`, `ตรวจนับสต๊อก`, and `ปรับยอดสต๊อก`.

## Regeneration Rule

Future prompts for this screen must keep the dense table/search workbench structure and must not turn the page into product cards or a stock-editing screen.
