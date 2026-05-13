# SCR-SUP-003 - Product Model Detail Mockup

Status: Approved

Approved image:

- `./SCR-SUP-003-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SUP-003-product-model-detail.md`
- `docs/ux-ui/image-prompts/IMG-SUP-003-product-model-detail.md`

## Approved Role

This mockup is the current source of truth for the desktop admin `รายละเอียด SKU ใหญ่` screen.

It confirms:

- This screen is a read-only Product Model / `SKU ใหญ่` detail page, not an edit form.
- `แก้ไข SKU ใหญ่` is the entry point to a separate edit flow.
- `SKU ใหญ่` and `SKU ย่อย` must remain visually distinct.
- Related `SKU ย่อย` variants are shown as a compact table/list inside the parent product page.
- Dimensions are split into separate fields: `กว้าง`, `ลึก`, `สูง`.
- Product images, department images, and Review Album remain separated by purpose.
- Stock and production appear only as report-only summary through related SKU rows.
- Restricted cost/labor configuration must not show amounts in the normal detail view.
- Job reference is traceability only and does not copy or sync Job data.

## Regeneration Rule

Future prompts for this screen must keep the read-only parent product detail structure and must not turn the page into a form editor, catalogue landing page, or inline stock adjustment screen.
