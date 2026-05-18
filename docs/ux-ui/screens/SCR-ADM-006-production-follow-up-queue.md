# SCR-ADM-006 - Production Follow-up Queue

Approved mockup:

- `docs/ux-ui/mockups/SCR-ADM-006-production-follow-up-queue/SCR-ADM-006-approved.png`

## 1. Purpose

Production Follow-up Queue is the desktop/tablet admin screen `งานผลิตต้องติดตาม`. It shows only production cases that need admin communication, clarification, or decision. It is not a full unfinished-work report and not a worker queue.

This screen helps Admin quickly see production issues such as Revision acknowledgement, `ไม่เข้าใจให้ติดต่อหา` from a formal Revision, `Hold`, waiting material, or old/urgent work that needs a human follow-up.

Missing or wrong production detail outside a formal Revision is not a system workflow in the starting workflow. Workers ask outside the system; do not add a special note/action/log for that case.

## 2. Primary Users

- Admin
- Manager
- Same-permission or higher-permission admin user

## 3. User Goals

- Find production cases that require follow-up.
- See which department currently owns the Job.
- See why the case needs attention.
- Open the related Job without exposing financial data.
- Record that admin has contacted or followed up outside the system when needed.

## 4. Entry Points

- `แดชบอร์ด` -> `งานผลิตต้องติดตาม`.
- Sidebar `งานสั่งทำ / ผลิต` -> `งานผลิตต้องติดตาม`.
- Active Jobs overview row with abnormal state.
- Job Detail after a worker selects `ไม่เข้าใจให้ติดต่อหา` from a formal Revision, `รอวัตถุดิบ`, or a Revision acknowledgement is pending.

## 5. Exit Points

- Job Detail Work Card.
- Active Jobs Overview.
- Manager Unfinished Work Overview.
- Admin Dashboard.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `งานสั่งทำ / ผลิต`.
- Header: `งานผลิตต้องติดตาม`, count summary, search/filter.
- Summary strip: all follow-up cases, pending Revision, not-understood/contact, waiting material, old work, urgent work.
- Filter chips: `ทั้งหมด`, `Revision`, `ไม่เข้าใจให้ติดต่อหา`, `รอวัตถุดิบ`, `งานค้างนาน`, `งานด่วน`.
- Main content: dense follow-up case table/list.
- Right detail drawer: selected Job follow-up summary and recent timeline.

## 7. Main Components

- Admin app shell
- Production follow-up header
- Summary cards
- Search input
- Filter chips
- Follow-up case row
- Department/location chip
- Reason chip
- Urgent/age chip
- Job source badge: `JOB-O` / `JOB-P`
- Right follow-up drawer
- Timeline preview
- Action buttons to open Job and record follow-up

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | งานผลิตต้องติดตาม | งานผลิตต้องติดตาม | Production follow-up queue | Dashboard card label. |
| Job ID | รหัส Job | JOB-O-0241 | Job | Primary work identity. |
| Job source | ประเภทงาน | งานลูกค้า | Job Source Type | `JOB-O` / `JOB-P`. |
| Related Order | ออเดอร์ที่เกี่ยวข้อง | ORD-240522-018 | Order | Show where allowed. |
| Customer | ลูกค้า | คุณศิริพร | Order / Customer | Hide private CRM notes. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job | Main work identity. |
| Current department | แผนกปัจจุบัน | ช่างไม้ | Job workflow | Core follow-up context. |
| Follow-up reason | เหตุผลที่ต้องติดตาม | ไม่เข้าใจให้ติดต่อหา | Formal Job Revision | Main queue driver. |
| Age | อายุงาน | ค้าง 18 วัน | Job / department age | Configurable threshold later. |
| Urgent | งานด่วน | งานด่วน | Urgent Label | Visual priority. |
| Last activity | อัปเดตล่าสุด | ช่างไม้แจ้งเมื่อ 10:30 | Activity Log | Helps admin know what happened. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Job | เปิด Job | Admin and same/higher permission | Opens Job Detail Work Card. | No |
| Record follow-up | บันทึกการติดตาม | Admin and same/higher permission | Adds admin follow-up note/activity. | No |
| Mark contacted | ติดต่อแล้ว | Admin and same/higher permission | Records that admin has contacted responsible department. | No |
| Open timeline | ดูประวัติ | Admin and same/higher permission | Opens timeline/history preview. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Revision pending | รอรับทราบ Revision | Department has not acknowledged changed Job details. | Purple/warning chip. |
| Needs contact | ไม่เข้าใจให้ติดต่อหา | Worker needs admin clarification for a formal Revision. | Strong warning chip. |
| Waiting material | รอวัตถุดิบ | Department marked material wait. | Orange chip. |
| Old work | งานค้างนาน | Job or department age exceeds threshold. | Red/orange age chip. |
| Urgent | งานด่วน | Authorized urgency label. | High-priority chip. |
| Hold | Hold | Admin-level pause. | Pause chip, distinct from material wait. |

## 11. Empty State

Show `ไม่มีงานผลิตที่ต้องติดตามตอนนี้` with secondary action `ดูงานกำลังผลิต`.

## 12. Error State

- Loading fails: `โหลดรายการงานผลิตต้องติดตามไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูงานผลิตต้องติดตาม`.
- Follow-up save fails: `บันทึกการติดตามไม่สำเร็จ`.
- Job already updated by another user: show `งานนี้มีการอัปเดตแล้ว` and refresh the row.

## 13. Permission Rules

- Admin/Manager with permission can view this queue.
- Workers do not use this queue.
- Financial details, sales price, profit, and private CRM notes do not appear.
- Same-permission or higher-permission users can continue shared follow-up work.
- Owner remains for traceability only.

## 14. UX Notes for Designer

- Do not turn this into a full manager report.
- Keep it action-focused: what needs admin attention right now.
- Make the reason for follow-up visible in every row.
- Show department location clearly so admin knows who to contact.
- Keep `Hold` visually distinct from `รอวัตถุดิบ`.
- Keep `งานค้างนาน` and `งานด่วน` visually stronger than normal statuses.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ADM-006-production-follow-up-queue.md`.

## 16. Open UX Questions

- None blocking for the first mockup.
