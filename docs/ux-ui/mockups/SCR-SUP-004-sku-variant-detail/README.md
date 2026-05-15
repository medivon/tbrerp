# SCR-SUP-004 - SKU Variant Detail Mockup

Status: Approved

Approved image:

- `./SCR-SUP-004-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SUP-004-sku-variant-detail.md`
- `docs/ux-ui/image-prompts/IMG-SUP-004-sku-variant-detail.md`

## Approved Role

This mockup is the current source of truth for the desktop admin `รายละเอียด SKU ย่อย` screen.

It confirms:

- This screen is a read-only SKU Variant / `SKU ย่อย` detail page, not an edit form.
- The parent Product Model / `SKU หลัก` remains visible and is the place for product-level editing and color open/close decisions.
- The page should be card-based and image-first so staff can recognize the product quickly.
- Dimensions are split into separate fields: `กว้าง`, `ลึก`, `สูง`.
- Images use SKU ย่อย overrides when available and fall back to SKU หลัก images by purpose.
- Image groups are separated by purpose: main product images, department images, and review images.
- Review Album is separate from normal product image groups.
- Stock columns use `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`.
- Stock changes must happen through dedicated screens such as `ดูสต๊อก`, `ตรวจนับสต๊อก`, and `ปรับยอดสต๊อก`.
- Job reference is not owned by SKU ย่อย; if shown, it should be clearly marked as belonging to SKU หลัก.

## Regeneration Rule

Future prompts for this screen must keep the read-only SKU ย่อย card/detail structure and must not turn the page into a form editor, Product Model editor, or inline stock adjustment screen.
