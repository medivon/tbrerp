# SCR-SUP-003 - Product Model Detail Mockup

Status: Approved

Approved image:

- `./SCR-SUP-003-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SUP-003-product-model-detail.md`
- `docs/ux-ui/image-prompts/IMG-SUP-003-product-model-detail.md`

## Approved Role

This mockup is the current source of truth for the desktop admin `รายละเอียด SKU หลัก` screen.

It confirms:

- This screen is a Product Model / `SKU หลัก` detail and management page, not an inline stock editor.
- `แก้ไข SKU หลัก` is the entry point to a separate edit flow.
- `SKU หลัก` and color-specific `SKU ย่อย` must remain visually distinct.
- Related color/SKU ย่อย rows are shown as a compact table/list inside the parent product page, including enabled and disabled colors.
- Dimensions are split into separate fields: `กว้าง`, `ลึก`, `สูง`.
- Product images, department images, and Review Album remain separated by purpose.
- Stock columns use `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`; negative `ขายได้` is visible with a warning.
- Per-color actions can open `ปรับยอดสต๊อก` or `ผลิตเข้าสต๊อก` / `ผลิตสินค้าชิ้นนี้` for enabled colors.
- Restricted cost/labor configuration must not show amounts in the normal detail view.
- Job reference lives on SKU หลัก for traceability only and does not copy or sync Job data.

## Regeneration Rule

Future prompts for this screen must keep the Product Model-first detail structure and must not turn the page into a catalogue landing page, SKU Variant-only page, or inline stock adjustment screen.
