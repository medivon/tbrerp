# SCR-ADM-003 - Active Jobs Overview Mockup

Status: Approved visual anchor

Approved image:

- `./SCR-ADM-003-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ADM-003-active-jobs-overview.md`
- `docs/ux-ui/image-prompts/IMG-ADM-003-active-jobs-overview.md`
- `docs/ux-ui/design-system/app-shell.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/03-navigation-map.md`

## Approved Role

This mockup is the current source of truth for the `งานกำลังผลิต` screen.

It extends the approved Admin Dashboard app shell into the Job Tracking workspace and confirms:

- `งานสั่งทำ / ผลิต` is the active sidebar item.
- The screen shows active production work across `JOB-O` and `JOB-P`.
- `รอสร้าง Job` is not shown because Jobs already exist from confirmed Order or internal Production flows.
- The page uses summary cards, source toggles, department tabs, search, image-led Job rows, and a right detail drawer.
- The screen is for operational tracking, not finance, pricing, accounting, or CRM notes.

## Approved Summary Cards

- `ทั้งหมด`
- `ช่างไม้`
- `ฝ่ายสี`
- `รักสมุก`
- `งานด่วน`
- `รอวัตถุดิบ`

## Approved Filters

Source toggle:

- `ทั้งหมด`
- `งานลูกค้า (JOB-O)`
- `ผลิตเข้าสต๊อก (JOB-P)`

Department/status tabs:

- `ทุกแผนก`
- `ช่างไม้`
- `ฝ่ายสี`
- `รักสมุก`
- `รอวัตถุดิบ`
- `งานด่วน`

## Approved Row Pattern

Each active Job row should show:

- Product/work image
- Job ID
- Source badge: `งานลูกค้า` or `ผลิตเข้าสต๊อก`
- Related Order ID and customer for `JOB-O`
- Work name and quantity
- Current department
- Received date and delivery date where relevant
- Status chips such as `งานด่วน`, `ค้าง 18 วัน`, `รอวัตถุดิบ`, or `อายุในแผนก 4 วัน`
- Current state / next action
- Short action button such as `เปิด Job`

## Key Decisions Captured By This Mockup

- `งานกำลังผลิต` counts Jobs, not Orders.
- `JOB-O` and `JOB-P` share the same overview but must remain visually distinguishable.
- Admin/manager can see customer and Order references for `JOB-O`.
- Workshop-only views must be separate and should not inherit customer/private/finance information.
- The right detail drawer can show a compact production timeline preview.

## Regeneration Rule

Future image prompts for `SCR-ADM-003` should preserve this layout, terminology, and right-detail-drawer pattern unless a later approved decision explicitly changes it.
