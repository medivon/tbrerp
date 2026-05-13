# SCR-JOB-004 - Production Job Entry Mockups

Status: Approved For Current Branch States

Approved images:

- `./SCR-JOB-004-sku-modal-approved.png`
- `./SCR-JOB-004-sku-selected-approved.png`
- `./SCR-JOB-004-special-work-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`
- `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-entry.md`
- `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-sku-selected.md`
- `docs/ux-ui/image-prompts/IMG-JOB-004-production-special-work.md`

## Approved Role

`SCR-JOB-004-sku-modal-approved.png` is the current source of truth for the `ผลิตจาก SKU` workflow state where admin clicks the purple `เลือกสินค้า` button and sees the SKU search modal.

`SCR-JOB-004-sku-selected-approved.png` is the current source of truth for the next `ผลิตจาก SKU` state after SKU selection, where selected SKU details populate the body and the `สร้างงานผลิต` action is ready.

`SCR-JOB-004-special-work-approved.png` is the current source of truth for the `งานผลิตพิเศษ` state, where the body follows the custom-work detail pattern from `รายละเอียดงานสั่งทำ` but uses internal production source `JOB-P / งานผลิต`.

It confirms:

- The visible page title is `สร้างงานผลิต`.
- The primary action label is `สร้างงานผลิต`.
- `ผลิตจาก SKU` and `งานผลิตพิเศษ` are separate modes.
- In `ผลิตจาก SKU`, the body starts from `เลือกสินค้า` and does not show the special-production form.
- SKU selection happens through a modal with search, filters, SKU rows, and `เลือกสินค้านี้`.
- After SKU selection, the modal closes and the body shows selected SKU identity, quantity, inherited SKU images, and department instruction cards.
- The `เปลี่ยนสินค้า` action is available as a secondary purple action.
- `งานผลิตพิเศษ` uses its own active tab and does not show SKU modal or selected SKU detail.
- `งานผลิตพิเศษ` can show `ยังไม่ผูกสินค้า` and `ผูกกับ SKU ภายหลัง`.
- Customer, COD, payment, shipment, and Order context must not appear.

## Branch Workflow

The currently approved branch states are:

- `ผลิตจาก SKU` SKU search modal.
- `ผลิตจาก SKU` after SKU selection, where the modal is closed and selected SKU details populate the production body.
- `งานผลิตพิเศษ`, where the body follows the `รายละเอียดงานสั่งทำ` form pattern but uses `JOB-P / งานผลิต` and has no customer/order/shipment context.

That next state is specified in:

- `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-sku-selected.md`
- `docs/ux-ui/image-prompts/IMG-JOB-004-production-special-work.md`

## Regeneration Rule

Future prompts for `SCR-JOB-004` must keep `ผลิตจาก SKU` and `งานผลิตพิเศษ` visually separated. Do not mix SKU selection fields and custom-production fields in one body.
