# SCR-MGR-001 — Manager Unfinished Work Overview

## 1. Purpose

The Manager Unfinished Work Overview helps Manager / Owner see unfinished Jobs across departments, including department location, urgency, age, and delivery proximity. It supports prioritization and follow-up, not detailed admin task execution.

## 2. Primary Users

- Manager / Owner
- Admin with relevant management permission
- Highest-permission user

## 3. User Goals

- See which Jobs are not finished.
- See where each Job currently is.
- Spot urgent work, old work, and near-delivery work.
- Compare `JOB-O` customer work and `JOB-P` production work.
- Open Job Detail / timeline for follow-up.
- Set or change `งานด่วน` where authorized.

## 4. Entry Points

- Manager navigation -> `ภาพรวมงานค้าง`.
- Admin/manager dashboard link.
- Return from Job Detail / Timeline.

## 5. Exit Points

- Job Detail Work Card.
- Manager Job Detail / Timeline.
- Admin operational queue where follow-up is needed.

## 6. Layout Structure

- Header: `ภาพรวมงานค้าง`, date/time, summary counts.
- Filter/toggle row: all work, customer work, production work.
- KPI strip: unfinished total, urgent count, old work count, near-delivery count, department bottleneck count.
- Main content: sortable table on desktop; compact cards on tablet.
- Columns/cards: Job ID, source label, work name, department location, status, urgency, delivery date, total Job age, department age.
- Side panel/detail drawer: selected Job summary and timeline preview.
- Sorting default: urgent, nearest delivery date, oldest total Job age, longest department age.

## 7. Main Components

- Manager overview header
- Work type toggle
- Aging threshold chips
- KPI cards
- Unfinished Job table/card list
- Source badge
- Department location chip
- Urgent chip
- Delivery proximity chip
- Job age chip
- Department age chip
- Timeline preview drawer

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Overview title | ภาพรวมงานค้าง | ภาพรวมงานค้าง | Management Overview | Manager-facing. |
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Include `JOB-O` and `JOB-P`. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | `งานลูกค้า` or `ผลิตเข้าสต๊อก`. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job | Main work identity. |
| Department location | งานอยู่แผนกไหน | ฝ่ายสี | Job workflow | Core manager question. |
| Current status | สถานะ | รอวัตถุดิบ | Job workflow | Show abnormal statuses clearly. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Sort priority 1. |
| Delivery date | วันจัดส่ง | 20 พ.ค. 2569 | Job / Order | Sort priority 2 when relevant. |
| Delivery proximity | ใกล้วันจัดส่ง | อีก 3 วัน | Job / Order | Highlight near-delivery work. |
| Total Job age | อายุงานรวม | 28 วัน | Job | Starts from Job creation date. |
| Department age | อายุในแผนก | 6 วัน | Job workflow | Starts when department receives work. |
| Owner | ผู้รับผิดชอบหลัก | แอดมินนุ่น | Owner | Traceability. |
| Timeline | ประวัติการทำงาน | รับเข้าโรงงานสี 9 พ.ค. | Activity Log | Full timeline for manager/admin permission. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Toggle all work | ทั้งหมด | Manager/Admin with permission | Shows all unfinished Jobs. | No |
| Toggle customer work | งานลูกค้า | Manager/Admin with permission | Shows `JOB-O`. | No |
| Toggle production work | ผลิตเข้าสต๊อก | Manager/Admin with permission | Shows `JOB-P`. | No |
| Sort by urgency/age/date | เรียงลำดับ | Manager/Admin with permission | Reorders list. | No |
| Open Job | เปิดงาน | Manager/Admin with permission | Opens Job Detail / timeline. | No |
| Set urgent | ตั้งงานด่วน | Authorized manager/admin | Adds Urgent Label. | No |
| Change urgent | เปลี่ยนงานด่วน | Authorized manager/admin | Updates Urgent Label. | Yes if removing/changing critical priority |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Customer Job | งานลูกค้า | `JOB-O` from Order. | Pair with Job ID. |
| Production Job | ผลิตเข้าสต๊อก | `JOB-P` from Production. | Pair with Job ID. |
| Urgent | งานด่วน | Authorized priority label. | Highest visual priority. |
| Old work | งานค้างนาน | Job age exceeds threshold. | Warning chip. |
| Near delivery | ใกล้วันจัดส่ง | Delivery date is near. | Time-sensitive chip. |
| Waiting materials | รอวัตถุดิบ | Department-level blocker. | Distinct warning chip. |
| Hold | Hold | Admin-level pause. | Strong pause chip. |
| Department location | อยู่ฝ่ายสี | Current department. | Location chip. |

## 11. Empty State

Show `ไม่มีงานค้างตามเงื่อนไขนี้`. If filters are active, show action `ล้างตัวกรอง`.

## 12. Error State

- Loading fails: `โหลดภาพรวมงานค้างไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูภาพรวมงานค้าง`.
- Timeline preview fails: `โหลดประวัติการทำงานไม่สำเร็จ`.
- Urgent update fails: `ตั้งงานด่วนไม่สำเร็จ`.

## 13. Permission Rules

- Manager/Admin with relevant permission can see unfinished overview.
- Workers do not use this manager overview.
- Managers/admin see full timeline according to permission; workers see limited timeline elsewhere.
- Sensitive financial details are not part of this overview unless separately permissioned.
- Urgent Label can be set or changed only by authorized admin/manager.

## 14. UX Notes for Designer

- This is not a generic report page; keep it focused on unfinished Jobs.
- The screen must answer: unfinished, department location, urgent, old, near delivery.
- Show both `JOB-O` and `JOB-P`, with a clear toggle.
- Make urgency and delivery proximity visually stronger than normal age.
- Use aging chips such as 15/30/60-day thresholds without requiring settings design here.
- Keep the first viewport dense and scannable for manager review.

## 15. Image Generation Prompt

Create a desktop/tablet manager overview UI for a Thai furniture ERP. Title "ภาพรวมงานค้าง". Show KPI cards for unfinished jobs, urgent jobs, old jobs, and near-delivery jobs. Include toggles "ทั้งหมด", "งานลูกค้า", "ผลิตเข้าสต๊อก". Main table shows Job ID, source label, work name, department location, status, urgent chip, delivery date, total job age, department age. Use examples like "JOB-O-2568-0042 / ตู้โชว์ไม้สักแกะลาย / ฝ่ายสี / งานด่วน / อีก 3 วัน". Quiet operational management UI, no marketing styling.

## 16. Open UX Questions

- None blocking for the first manager overview design.

