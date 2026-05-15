# SCR-SUP-005 - SKU Image Groups Mockup

Status: Approved

Approved image:

- `./SCR-SUP-005-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SUP-005-sku-image-groups.md`
- `docs/ux-ui/image-prompts/IMG-SUP-005-sku-image-groups.md`

## Approved Role

This mockup is the current source of truth for the desktop admin `จัดการรูปสินค้า` screen.

It confirms:

- This screen is an image-management workbench, not a product edit form.
- It supports both Product Model / `SKU หลัก` and SKU Variant / `SKU ย่อย` image contexts.
- SKU ย่อย images are optional overrides; if a SKU ย่อย lacks an image group for a purpose, downstream Order/Job display falls back to the SKU หลัก image group for that purpose.
- Image groups are separated by purpose: `รูปหลัก`, `รูปเพิ่มเติม`, `รูปสำหรับช่างไม้`, `รูปสำหรับฝ่ายสี/ตกแต่ง`, `รูปสำหรับรักสมุก`, and `คลังรีวิว`.
- Review Album / `คลังรีวิว` must remain visually separate from normal product image groups.
- Thumbnails should be large enough to inspect handcrafted furniture details.
- Drag/drop, reorder, optional short notes, move group, and soft delete/hide are the main interactions.
- Product fields, stock, price, cost, labor rate, and accounting data must not appear here.
- Historical Job images must not be silently removed when product images are changed.

## Regeneration Rule

Future prompts for this screen must keep the grouped image-management workbench structure and must not turn the page into a product detail form, gallery landing page, stock screen, or place where SKU code/color options are edited.
