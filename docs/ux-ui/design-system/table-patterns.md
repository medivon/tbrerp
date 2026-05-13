# Table Patterns

This file records shared table behavior for THAIBORAN ERP UX/UI work. It applies to core operational tables unless a later screen-specific decision says otherwise.

## Core Pagination Rule

All core project tables use standard pagination, not infinite scroll.

Required controls:

- Page-size selector.
- `ก่อนหน้า`.
- `ถัดไป`.
- Page numbers.

Default page-size options:

- `25`
- `50`
- `100`

Default page size:

- `25`

## Behavior Notes

- Changing page closes any open row popover.
- Scrolling a table or page closes row popovers that are anchored to table rows.
- Keep pagination visible near the table bottom where admin users naturally finish scanning.
- Do not use infinite scroll for operational lists that users search, filter, compare, or return to by page.

## Current Screens Using This Pattern

- `ออเดอร์ทั้งหมด`
- Future core tables unless explicitly approved otherwise
