# Job, Worker, and Rak Samuk Visual Guidance

Use with `docs/ux-ui/design-system/visual-design-system.md` and the active Job, Woodwork, Coloring, Rak Samuk, and Manager screen specs.

This file gives visual guidance for:

- Job overview
- Job detail / work card
- Woodwork queue
- Coloring queue
- Waiting for Coloring Intake
- Rak Samuk assignment
- Rak Samuk Worker mobile view
- Proposed price / own price visibility
- Worker mobile/tablet shell
- Production instruction images
- Role-limited worker visibility

## Visual Role

Job screens are the production heart of THAIBORAN ERP. They must make physical work easy to identify from images, IDs, source type, quantity, department, and next action.

Always pair source code and readable label:

- `JOB-O / งานลูกค้า`
- `JOB-P / ผลิตเข้าสต๊อก`
- `JOB-P / งานผลิตพิเศษ`

## Job Overview

Admin/manager overview screens use dense image-led tables.

Visual rules:

- Sidebar active: `งานสั่งทำ / ผลิต`.
- Summary strip: active Jobs, department buckets, urgent, waiting materials.
- Source toggle: `ทั้งหมด`, `งานลูกค้า (JOB-O)`, `ผลิตเข้าสต๊อก (JOB-P)`.
- Department/status filters: `ช่างไม้`, `ฝ่ายสี`, `รักสมุก`, `รอวัตถุดิบ`, `งานด่วน`.
- Row thumbnail, Job ID, source badge, work name, department chip, status chip, age/date chips, explicit `เปิด Job`.
- Right drawer shows selected Job preview, not full logs.

Do not show price, payment, cost, payout, profit, or accounting detail in Job overviews.

## Job Detail / Work Card

Job Detail is a shared visual pattern with permission-limited variants.

Desktop/admin layout:

- Header: Job ID, source label, current status, urgent chip, current department, primary action area.
- Row 1: work identity card with main image, name, quantity, source, delivery date, state.
- Separate full-width instruction rows:
  - `รายละเอียดช่างไม้`
  - `รายละเอียดฝ่ายสี/ตกแต่ง`
  - `รายละเอียดรักสมุก`
- Notices row for Revision, Hold, and `รอวัตถุดิบ`.
- Timeline lower on page, collapsed where possible.
- Sticky action panel: `การดำเนินงาน`.

Mobile/worker layout:

- Main image and work identity near top.
- Actions near top and repeated near bottom on long detail screens if needed.
- Hide admin context panels.
- Timeline limited and lower priority.

## Production Instruction Images

Instruction images are functional. Use large enough thumbnails for furniture craft detail.

Visual rules:

- Group images by department purpose.
- Each group can include optional short text.
- Empty group state: `ยังไม่มีรูปงานสำหรับแผนกนี้`.
- If SKU/Product images are inherited into Job, make the fallback source understandable in admin/product contexts.
- Worker screens should show only the image groups relevant to their role and assigned work.

## Woodwork Queue

Woodwork uses the mobile/tablet worker shell.

Visual structure:

- Header: `งานที่ต้องทำ`, active count, refresh state.
- Compact filters: `ทั้งหมด`, `งานด่วน`, `รอวัตถุดิบ`.
- One card per Job.
- Card: image, Job ID, source label, work name, quantity, current status, urgent chip, delivery date, department age, instruction preview.
- Large actions: `รับงาน`, `รอวัตถุดิบ`, `ส่งไปสี`, `ส่งไปรักสมุก`, `กำลังส่งไปแกะสลัก`.
- Secondary link: `ประวัติงานของฉัน`.

Do not show customer name, Order ID, customer phone/address, CRM notes, payment, sales price, cost, Rak Samuk rates, payout, Management Log, or Audit Log.

## Coloring Queue

Coloring uses the same mobile/tablet worker shell as Woodwork.

Visual rules:

- Active queue title: `งานที่ต้องทำ`.
- Include a clear link/chip to `รอรับเข้าโรงงานสี`.
- Card emphasizes color/decor instruction preview.
- Actions: `รับงาน`, `รอวัตถุดิบ`, `ส่งไปรักสมุก`, `งานเสร็จ/พร้อมส่ง`.
- Completed `JOB-O` routes visually to admin `รอสร้างรอบจัดส่ง`, not Delivery Team.

## Waiting for Coloring Intake

`รอรับเข้าโรงงานสี` must look like a staging/intake queue, not active coloring work.

Visual treatment:

- Header: `รอรับเข้าโรงงานสี`.
- Short strip explaining this is waiting intake, not active work.
- Cards grouped by arrival date or urgency.
- Source chips: `จากช่างไม้`, `จากรักสมุก`.
- Dominant action: `รับเข้าโรงงานสี`.

Keep it visually distinct from the active `งานที่ต้องทำ` queue through a different status chip and intake-specific header.

## Rak Samuk Assignment

The send step is about selecting one worker, not finance review.

Visual structure:

- Header: `เลือกช่างรักสมุก`.
- Selected work preview with thumbnail, Job ID for internal users, source label, work name, quantity, Rak Samuk instruction, source department, urgency.
- Worker selector with one selected Rak Samuk Worker.
- Confirmation modal before `ส่งงานให้ช่าง`.
- Show `ไม่มีราคา / ให้แจ้งราคา` only as a workflow signal when relevant.

Do not show Rak Samuk rate values, sales price, customer phone/address, COD, payment, or payout on this assignment screen.

## Rak Samuk Worker Mobile View

Use a phone-first worker shell.

Visual structure:

- Header: `งานที่ต้องทำ`, worker account/name, active count.
- Assigned work cards only.
- Card: image, work name, quantity, Rak Samuk instruction summary, urgent chip, own price state.
- Card actions: `เปิดงาน` and `ขอเสนอราคา` only when applicable.
- Secondary link: `ประวัติการทำงาน`.

Worker detail shows Full Production Job Detail needed for assigned work, but not business context.

## Proposed Price and Own Price Visibility

Visibility is strict:

- Rak Samuk Worker sees only own assigned work and own price.
- Own price label: `ราคางานของฉัน`.
- Missing-price label: `ไม่มีราคา / ให้แจ้งราคา`.
- Proposed price action: `ขอเสนอราคา`.
- Proposed price input is per-piece, not total job price.
- Submitted state: `ส่งราคาแล้ว / รออนุมัติ`.
- Owner/Manager approval screen uses `อนุมัติราคา`.

Owner/Manager price approval screen can show worker, proposed per-piece price, quantity, computed total preview, and standard-rate update prompt where applicable.

Keep prices out of Order, Production, and Job workflow pages. Finance pays from approved prices in payout/PV context.

## Role-limited Worker Visibility

Worker screens must not show:

- Customer data.
- Order ID.
- Customer phone/address.
- Payment status.
- Sales price.
- Product cost or profit.
- Other workers' work or payout.
- Rak Samuk standard rate.
- Management Log.
- Audit Log.
- Internal workflow controls the worker is not allowed to use.

Restricted panels should be omitted entirely. Do not show empty placeholders such as `ข้อมูลถูกซ่อน`.

## Revision, Hold, and Waiting Materials

Make these visually distinct:

- `Revision`: purple chip and collapsed history by default.
- `รอวัตถุดิบ`: orange blocker chip; visible in queues; stops department aging.
- `Hold`: strong pause chip distinct from material wait.

Workers can use `รับทราบ` or `ไม่เข้าใจให้ติดต่อหา` only for formal Revision acknowledgement. Missing or wrong production detail outside formal Revision has no system workflow in the starting scope.

## Old Mockup References

Archived Job and worker images may inform broad card density only. They must not override current permission limits, mobile worker shell direction, Rak Samuk pricing visibility, or the rule that workers do not see customer/Order/payment/business-sensitive context.
