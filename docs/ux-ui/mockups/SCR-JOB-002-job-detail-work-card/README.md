# SCR-JOB-002 - Job Detail Mockup

Status: Approved

Approved image:

- `./SCR-JOB-002-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-JOB-002-job-detail-work-card.md`
- `docs/ux-ui/image-prompts/IMG-JOB-002-job-detail-work-card.md`

## Approved Role

This mockup is the current source of truth for the desktop admin `รายละเอียด Job` screen opened from `เปิด Job` on an Order Detail item card or from the active jobs overview.

It confirms:

- `รายละเอียด Job` uses the approved desktop admin app shell.
- Job detail should be separated into stacked row cards, not one blended information panel.
- `ข้อมูลงาน`, `รายละเอียดช่างไม้`, `สีและการตกแต่ง`, `รายละเอียดรักสมุก`, `สถานะพิเศษ`, and `ประวัติการทำงาน` are visually distinct sections.
- The right action panel shows current department, allowed actions, and production movement.
- The screen is for admin/manager inspection; later worker/mobile variants still need their own shell decisions.

## Regeneration Rule

Future prompts for `SCR-JOB-002` should preserve the row-card section structure and must not collapse department instructions into one combined paragraph or table.
