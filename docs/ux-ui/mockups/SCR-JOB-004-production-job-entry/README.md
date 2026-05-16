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

`SCR-JOB-004-sku-modal-approved.png` is the current source of truth for the `ผลิตจาก SKU` workflow state where admin clicks the purple `เลือกสินค้า` button and sees the SKU search modal. SKU results must show the parent `SKU หลัก` together with the selected color / `SKU ย่อย`.

`SCR-JOB-004-sku-selected-approved.png` is the current visual baseline for the next `ผลิตจาก SKU` state after SKU Variant selection, where selected SKU ย่อย details populate the body and the `สร้างงานผลิต` action is ready. The documented workflow now clarifies that this action opens Production Review before a real `JOB-P` is issued.

`SCR-JOB-004-special-work-approved.png` is the current visual baseline for the `งานผลิตพิเศษ` state, where the body follows the custom-work detail pattern from `รายละเอียดงานสั่งทำ` but uses internal production source.

It confirms:

- The visible page title is `สร้างงานผลิต`.
- The primary action label is `สร้างงานผลิต`, and it opens `ตรวจสอบก่อนสร้างงานผลิต` rather than creating `JOB-P` directly.
- The draft action label is `บันทึกร่าง`; older mockup text `บันทึกไว้ก่อน` is superseded by the docs.
- A real `JOB-P` number appears only after `ยืนยันสร้างงานผลิต`.
- `ผลิตจาก SKU` and `งานผลิตพิเศษ` are separate modes.
- In `ผลิตจาก SKU`, the body starts from `เลือกสินค้า` and does not show the special-production form.
- SKU selection happens through a modal with search, filters, SKU rows, `ขายได้` / `หมด` stock signals, and `เลือกสินค้านี้`.
- After SKU selection, the modal closes and the body shows selected SKU หลัก, color / SKU ย่อย, quantity, starting queue, image fallback from SKU ย่อย to SKU หลัก, and department instruction cards.
- Product Detail can open this screen with a color/SKU ย่อย preselected, but changing SKU or switching mode resets that initial context.
- A Product Detail prefill does not add a special back/cancel path; successful creation goes to Job Detail.
- SKU-tied production increases Ready Stock when the `JOB-P` is marked complete. Thai UI may still use `รับเข้าสต๊อก` / `เข้าสต๊อก` wording; domain/code should distinguish this Product Ready Stock update from Material Stock Receipt.
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

Future prompts for `SCR-JOB-004` must keep `ผลิตจาก SKU` and `งานผลิตพิเศษ` visually separated. Do not mix SKU selection fields and custom-production fields in one body, and do not use `คงเหลือ` or `พร้อมขาย` for stock signals.
