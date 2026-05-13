# SCR-JOB-001 - Job Create From Order Line Mockup

Status: Approved

Approved image:

- `./SCR-JOB-001-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-JOB-001-job-create-from-order-line.md`
- `docs/ux-ui/image-prompts/IMG-JOB-001-job-create-from-order-line.md`

## Approved Role

This mockup is now a visual reference for the embedded `รายละเอียดงานสั่งทำ` pattern inside Order Create/Edit. The customer Order workflow no longer uses a separate post-confirmation `สร้างงานสั่งทำ` page.

It confirms:

- The visible Thai UI label in Order Create/Edit is `รายละเอียดงานสั่งทำ`, not `ร่าง Job`.
- The parent Order action is `สร้างออเดอร์`; `JOB-O` is created when Order Review is confirmed.
- The UI does not explain automatic routing such as “ส่งให้ช่างไม้”.
- `จะสร้าง JOB-O / งานลูกค้า` remains visible as the future internal/source identity before confirmation.
- Department instructions stay separated into row cards for ช่างไม้, ฝ่ายสี/ตกแต่ง, and รักสมุก.

## Regeneration Rule

Future prompts for `SCR-JOB-001` should regenerate it as embedded custom-work detail inside Order Create/Edit and must not reintroduce a separate `รอสร้าง Job` customer workflow.
