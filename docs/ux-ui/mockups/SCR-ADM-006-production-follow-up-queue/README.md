# SCR-ADM-006 - Production Follow-up Queue Mockup

Status: Approved

Approved image:

- `./SCR-ADM-006-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ADM-006-production-follow-up-queue.md`
- `docs/ux-ui/image-prompts/IMG-ADM-006-production-follow-up-queue.md`
- `docs/ux-ui/screens/SCR-ADM-003-active-jobs-overview.md`

## Approved Role

This mockup is the current source of truth for the admin `งานผลิตต้องติดตาม` queue.

It confirms:

- `งานผลิตต้องติดตาม` is an admin action queue, not a full unfinished-work report.
- The screen highlights Jobs needing communication, clarification, Revision acknowledgement, material follow-up, urgent follow-up, or old-work attention.
- Every row must make the follow-up reason and current department visible.
- Admin opens the related Job from this queue; workers do not perform production actions here.

## Key Decisions Captured By This Mockup

- `งานผลิตต้องติดตาม` is separate from `งานกำลังผลิต`.
- `Hold`, `รอวัตถุดิบ`, `Revision`, `ไม่เข้าใจให้ติดต่อหา`, `งานค้างนาน`, and `งานด่วน` are follow-up signals.
- The screen shows `JOB-O` and `JOB-P` context without exposing financial details.
- No worker actions such as `รับงาน`, `ส่งไปสี`, or `งานเสร็จ` appear.
- No product price, sales price, profit, accounting totals, tax, ad spend, or private CRM note appears.

## Regeneration Rule

Future prompts for `SCR-ADM-006` should preserve the admin follow-up queue layout, the visible reason-per-row pattern, and the distinction from the broader manager unfinished-work overview.
