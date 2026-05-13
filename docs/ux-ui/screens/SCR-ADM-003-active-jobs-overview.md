# SCR-ADM-003 - Active Jobs Overview

## 1. Purpose

Active Jobs Overview shows Jobs currently in production across `JOB-O` customer work and `JOB-P` internal production work. It is the drill-down screen from the approved Admin Dashboard card `งานกำลังผลิต`.

This screen answers: which Jobs are active, where each Job is, which department owns the next action, what is urgent, what is waiting, and which Job should admin or manager open next.

Approved mockup:

- `docs/ux-ui/mockups/SCR-ADM-003-active-jobs-overview/SCR-ADM-003-approved.png`

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user
- Manager / Owner as viewer or escalation user

## 3. User Goals

- See all active Jobs in one place.
- Separate customer Jobs from internal production Jobs.
- See work by department: `ช่างไม้`, `ฝ่ายสี`, `รักสมุก`.
- Find Jobs by Job ID, Order ID, customer, product/work name, or department.
- Open Job Detail quickly to inspect instructions, timeline, and next action.
- Notice urgent, old, waiting-materials, or revision-related Jobs.

## 4. Entry Points

- `แดชบอร์ด` -> `งานกำลังผลิต`.
- Sidebar `งานสั่งทำ / ผลิต` -> `งานกำลังผลิต`.
- `ออเดอร์กำลังดำเนินการ` row or detail drawer -> related Job.
- Critical Work Preview item related to a Job.

## 5. Exit Points

- Job Detail.
- Order Detail for `JOB-O`.
- Production Batch / Production Lot context for `JOB-P`, when relevant.
- Woodwork Queue.
- Coloring Queue.
- Rak Samuk assignment/work context.
- Production Follow-up Queue.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `งานสั่งทำ / ผลิต`.
- Top bar: page title `งานกำลังผลิต`, date, user/role.
- Header area: count summary and no primary creation shortcut.
- Summary strip: all active Jobs, woodwork, coloring, Rak Samuk, urgent, waiting materials.
- Source toggle: `ทั้งหมด`, `งานลูกค้า (JOB-O)`, `ผลิตเข้าสต๊อก (JOB-P)`.
- Department filter tabs: `ทุกแผนก`, `ช่างไม้`, `ฝ่ายสี`, `รักสมุก`, `รอวัตถุดิบ`, `งานด่วน`.
- Search bar: Job ID, Order ID, customer, product/work name, department.
- Main content: image-led Job table/list.
- Right-side detail drawer: selected Job quick preview with image, timeline preview, and context actions.

## 7. Main Components

- Approved app sidebar
- Top bar
- Summary cards
- Source toggle
- Department/status tabs
- Search input
- Image-led Job row
- Job source badge
- Department location chip
- Status chip
- Urgent/age chips
- Timeline preview
- Right detail drawer

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Job ID | รหัส Job | JOB-O-0241 | Job | Primary production reference. |
| Source type | ประเภทงาน | งานลูกค้า / ผลิตเข้าสต๊อก | Job Source Type | Must show `JOB-O` vs `JOB-P`. |
| Order ID | เลขออเดอร์ | ORD-240522-018 | Order | Only for `JOB-O`. |
| Customer | ลูกค้า | คุณศิริพร | Customer | Only for admin/manager views. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job / Order Line / Product | Main visible title. |
| Main image | รูปงาน | Cabinet thumbnail | Job / Product / SKU | Helps recognize handmade work. |
| Quantity | จำนวน | 1 ชิ้น | Job | One Job may contain multiple pieces when done together. |
| Department | แผนกปัจจุบัน | ช่างไม้ | Job workflow | Shows where the work currently is. |
| Current state | สถานะปัจจุบัน | อยู่คิวช่างไม้ | Job workflow | Operational state. |
| Received date | วันที่รับงาน | 08 พ.ค. 67 | Job / Order | Used for age signal. |
| Delivery date | กำหนดส่ง | 26 พ.ค. 67 | Job / Order | Optional. |
| Total age | อายุงานรวม | 18 วัน | Job | Signal only. |
| Department age | อายุในแผนก | 4 วัน | Job workflow | Signal only. |
| Urgent label | งานด่วน | งานด่วน | Urgent Label | Set by authorized user. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Job | เปิด Job | Admin and same/higher permission | Opens Job Detail. | No |
| Open Order | เปิดออเดอร์ | Admin and same/higher permission | Opens related Order for `JOB-O`. | No |
| View department queue | ดูคิวแผนก | Admin and same/higher permission | Opens relevant department queue. | No |
| Open follow-up | ติดตามงานผลิต | Admin and same/higher permission | Opens production follow-up context. | No |
| Search | ค้นหา | Admin | Filters active Jobs. | No |

## 10. Status / Chips

| Chip | Meaning | Visual Direction |
|---|---|---|
| `งานลูกค้า` | `JOB-O` from customer Order. | Blue |
| `ผลิตเข้าสต๊อก` | `JOB-P` from internal production. | Neutral/green |
| `ช่างไม้` | Current department is woodwork. | Neutral |
| `ฝ่ายสี` | Current department is coloring/decorating. | Neutral |
| `รักสมุก` | Currently with Rak Samuk outsource. | Purple/neutral |
| `รอวัตถุดิบ` | Department-level blocker. | Orange |
| `งานด่วน` | Authorized user marked urgent. | Yellow/red |
| `ค้าง 18 วัน` | High-risk aging signal. | Warm warning |
| `รอรับทราบ Revision` | Production change needs acknowledgement. | Purple |

## 11. Empty State

Show `ไม่มีงานกำลังผลิตตอนนี้`.

Do not show `รอสร้าง Job` empty state.

## 12. Error State

- Loading fails: `โหลดงานกำลังผลิตไม่สำเร็จ` with retry.
- Permission fails: show `ไม่มีสิทธิ์ดูข้อมูลนี้`.
- Related Order/Production context is unavailable: keep Job row visible and show context warning in drawer.

## 13. Permission Rules

- Admin and manager views may show customer and Order references for `JOB-O`.
- Workshop-only views must not expose customer private data, sales price, or payment data.
- Owner is visible for traceability but does not lock equal-permission users.
- Finance-sensitive values and Rak Samuk rates must not appear here.

## 14. What Not To Show

- Do not show `รอสร้าง Job` as a queue or card.
- Do not show sales price, profit, payment amount, or accounting data.
- Do not expose private CRM notes.
- Do not hide `JOB-O` vs `JOB-P`.
- Do not make this a full accounting/reporting dashboard.
- Do not show every log event expanded by default.

## 15. UX Notes for Designer

- Preserve the approved Admin Dashboard app shell.
- Preserve the approved `SCR-ADM-003` mockup layout and right-detail-drawer pattern.
- Keep `งานสั่งทำ / ผลิต` active in the sidebar.
- Use Thai UI labels as the primary language.
- Keep English only for `Job`, `JOB-O`, `JOB-P`, and `Revision`.
- Make department location and source type visible without opening each Job.
- Use product/work images because THAIBORAN work is visually specific.
- Keep the table dense but readable for office/admin use.

## 16. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ADM-003-active-jobs-overview.md`.
