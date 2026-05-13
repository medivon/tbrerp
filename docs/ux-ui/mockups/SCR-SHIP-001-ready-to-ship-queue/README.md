# SCR-SHIP-001 - Ready-to-Ship Queue Mockup

Status: Content/workbench approved

Approved content image:

- `./SCR-SHIP-001-content-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-SHIP-001-ready-to-ship-queue.md`
- `docs/ux-ui/image-prompts/IMG-SHIP-001-ready-to-ship-queue.md`
- `docs/ux-ui/design-system/app-shell.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/03-navigation-map.md`

## Approved Role

This mockup is the current source of truth for the inner content/workbench of the `รอสร้างรอบจัดส่ง` screen.

It confirms:

- The page is an admin pre-creation queue before a Shipment exists.
- The page uses a focused dense workbench instead of oversized cards.
- Top module sub menu is removed from this screen to reduce confusion.
- Summary cards, search toolbar, selected-count bulk action, filter chips, dense table, checkboxes, and right detail drawer are approved as the working content structure.
- The page remains Order-grouped and does not show loose item chaos.
- `รายการต้องจัดส่งวันนี้` is not a filter or tab here; it is a separate delivery work screen after Shipment release.

## Visual Shell Note

The dark sidebar and altered logo in this mockup are not approved as the global desktop admin visual baseline.

For now, the approved decision is:

- Approve the inner content/workbench structure.
- Do not change the global sidebar/app-shell decision from this image alone.
- Revisit sidebar visual direction separately if needed.

## Approved Content Pattern

Use this pattern for high-volume admin preparation work:

- Page title: `รอสร้างรอบจัดส่ง`
- Subtitle: `รายการพร้อมส่งที่รอแอดมินสร้างรอบจัดส่ง`
- Summary cards for ready Order counts
- Search/filter/group toolbar
- Selected-count bulk action area
- Filter chips
- Dense Order table with checkboxes
- Right detail drawer: `รายละเอียดออเดอร์พร้อมส่ง`

## Key Decisions Captured By This Mockup

- `รอสร้างรอบจัดส่ง` is not the delivery dashboard.
- `กำหนดส่งวันนี้` can appear as a planning filter.
- `รายการต้องจัดส่งวันนี้` belongs to the delivery screen after admin releases Shipment.
- Bulk action exists only for eligible Orders; rows must show whether they are `สร้างรวมได้` or `ต้องเปิดแยก`.

## Regeneration Rule

Future prompts for `SCR-SHIP-001` should preserve the approved content/workbench layout. Do not use this image to change the global sidebar visual baseline unless a later decision explicitly approves that.
