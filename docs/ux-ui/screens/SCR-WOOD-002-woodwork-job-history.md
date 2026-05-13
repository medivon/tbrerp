# SCR-WOOD-002 — Woodwork Job History

## 1. Purpose

The Woodwork Job History screen lets woodwork users see work they already accepted, blocked, or sent onward. It is a secondary view for traceability and self-checking, not a management report.

## 2. Primary Users

- Woodwork Department
- Head of woodwork, if assigned
- Higher-permission user acting on behalf when needed

## 3. User Goals

- Find work recently sent onward.
- Confirm what action was taken and when.
- Reopen a limited historical Job view if needed.
- Avoid seeing customer private data, payment data, or sales price.

## 4. Entry Points

- Woodwork Queue -> `ประวัติงานของฉัน`.
- Job Detail Work Card after work leaves active list.
- Woodwork department navigation.

## 5. Exit Points

- Historical Job view.
- Woodwork Queue.
- Job Detail Work Card in limited read-only mode.

## 6. Layout Structure

- Header: `ประวัติงานของฉัน`, date range selector, search.
- Main content: simple reverse-chronological list grouped by day.
- History row/card: thumbnail, Job ID, work name, final woodwork action, time, sent-to destination.
- Filters: recent, sent to color, sent to Rak Samuk, waiting materials history.
- Mobile behavior: cards grouped by date with large tap targets.

## 7. Main Components

- History header
- Date filter
- Search input
- History card
- Action history chip
- Destination chip
- Limited Job preview
- Empty state

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| History title | ประวัติงานของฉัน | ประวัติงานของฉัน | Activity Log | Secondary screen. |
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Show source prefix. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | Use readable label. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job | No customer private data. |
| Main image | รูปหลัก | Cabinet thumbnail | Job / Department Instruction Images | Helps recognition. |
| Quantity | จำนวน | 1 ชิ้น | Job | Display only. |
| Woodwork action | การทำงาน | ส่งไปสี | Activity Log | Shows worker's past action. |
| Destination | ส่งต่อไปที่ | ฝ่ายสี | Activity Log | Examples: ฝ่ายสี, รักสมุก, แกะสลัก. |
| Action time | วันที่ทำรายการ | 9 พ.ค. 2569 14:30 | Activity Log | Used for self-checking. |
| Note | หมายเหตุ | รอรางลิ้นชัก 2 วัน | Activity Log / Job note | Only operational notes relevant to woodwork. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open history item | เปิดประวัติ | Woodwork Department | Opens limited historical Job view. | No |
| Search history | ค้นหา | Woodwork Department | Filters history. | No |
| Filter by action | กรองตามสถานะ | Woodwork Department | Shows matching history rows. | No |
| Return to queue | กลับไปงานที่ต้องทำ | Woodwork Department | Opens active Woodwork Queue. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Sent to color | ส่งไปสี | Woodwork sent work to coloring intake. | Destination chip. |
| Sent to Rak Samuk | ส่งไปรักสมุก | Woodwork sent work to outsource assignment. | Destination chip. |
| Waiting materials | รอวัตถุดิบ | Work was marked blocked by materials. | Warning history chip. |
| Sent to carving | กำลังส่งไปแกะสลัก | Work was marked as sent to carving. | Neutral destination chip. |
| Historical | ประวัติ | Read-only historical row. | Subtle chip. |

## 11. Empty State

Show `ยังไม่มีประวัติงานของฉัน` with a link `กลับไปงานที่ต้องทำ`.

## 12. Error State

- Loading fails: `โหลดประวัติงานไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูประวัติงานนี้`.
- Historical Job no longer visible by permission: show `ไม่สามารถเปิดรายละเอียดงานนี้ได้`.

## 13. Permission Rules

- Woodwork users see only history relevant to their woodwork activity.
- Customer private data, CRM notes, payment data, sales price, and Rak Samuk rates are hidden.
- History is read-only for woodwork users.
- Managers/admins may see fuller timeline elsewhere, not in this worker history screen.

## 14. UX Notes for Designer

- Keep this quieter than the active queue.
- Group by day so workers can find "งานที่เพิ่งส่งไป".
- Do not turn this into a full audit log.
- Keep image thumbnails because furniture names may be similar.
- Make the path back to `งานที่ต้องทำ` obvious.

## 15. Image Generation Prompt

Create a mobile/tablet history screen for Thai furniture woodworkers. Title "ประวัติงานของฉัน". Show date-grouped cards with job thumbnails, "JOB-O-2568-0042 / งานลูกค้า", work name "ตู้โชว์ไม้สักแกะลาย", action chips like "ส่งไปสี", "ส่งไปรักสมุก", time stamps, and destination. No customer names, no addresses, no prices. Practical neutral workshop UI with large touch cards.

## 16. Open UX Questions

- None blocking for this history screen.

