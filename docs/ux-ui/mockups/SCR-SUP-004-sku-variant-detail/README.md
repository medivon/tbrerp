# SCR-SUP-004 - SKU Variant Detail Mockup

Status: Approved

Approved image:

- `./SCR-SUP-004-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SUP-004-sku-variant-detail.md`
- `docs/ux-ui/image-prompts/IMG-SUP-004-sku-variant-detail.md`

## Approved Role

This mockup is the current source of truth for the desktop admin `รายละเอียด SKU` screen.

It confirms:

- This screen is a read-only SKU Variant detail page, not an edit form.
- `แก้ไข SKU` is the entry point to a separate edit flow.
- The page should be card-based and image-first so staff can recognize the product quickly.
- Dimensions are split into separate fields: `กว้าง`, `ลึก`, `สูง`.
- Image groups are separated by purpose: main product images, department images, and review images.
- Review Album is separate from normal product image groups.
- Stock and production are report-only summary on this page.
- Stock changes must happen through dedicated screens such as `ดูสต๊อก`, `ตรวจนับสต๊อก`, and `ปรับยอดสต๊อก`.
- Job reference is traceability only and does not copy or sync Job data.

## Regeneration Rule

Future prompts for this screen must keep the read-only card/detail structure and must not turn the page into a form editor or inline stock adjustment screen.
