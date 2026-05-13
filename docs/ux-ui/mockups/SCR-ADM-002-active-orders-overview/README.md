# SCR-ADM-002 - Active Orders Overview Mockup

Status: Approved visual anchor

Approved image:

- `./SCR-ADM-002-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ADM-002-active-orders-overview.md`
- `docs/ux-ui/image-prompts/IMG-ADM-002-active-orders-overview.md`
- `docs/ux-ui/design-system/app-shell.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/03-navigation-map.md`

## Approved Role

This mockup is the current source of truth for the `ออเดอร์กำลังดำเนินการ` screen.

It extends the approved Admin Dashboard app shell into the Order workspace and confirms:

- `ออเดอร์` is the active sidebar item.
- The screen uses the approved sidebar and top bar pattern.
- `ร่างออเดอร์` is not shown in this active operational list.
- `สร้างออเดอร์` can appear inside the Order page, not on the dashboard.
- The Order workspace uses clear tabs: `กำลังดำเนินการ`, `ออเดอร์ทั้งหมด`, `ร่างออเดอร์`, `ปิดแล้ว / ยกเลิก`.
- Active Orders are shown as image-led operational rows.
- The right detail drawer pattern is approved for selected Order preview.

## Approved Summary Filters

- `ทั้งหมด`
- `กำลังผลิต`
- `ส่งได้เลย`
- `รอยืนยันการจัดส่ง`
- `ส่งบางส่วน`

## Approved Row Pattern

Each active Order row should show:

- Product/work image
- Order ID
- Customer and recipient/phone
- Work/item summary
- Job ID where relevant
- Simple `มีงานสั่งทำ` label when the Order contains custom work
- `วันที่รับงาน`
- `กำหนดส่ง`
- Operational status chips
- Current state / next action
- Short action button

## Key Decisions Captured By This Mockup

- Active Orders are confirmed Orders only.
- Draft Orders stay under the Order page as a separate subcategory/tab/filter.
- The active list shows only real Orders that are not operationally complete.
- Order rows can show `Job ID` for communication, but the screen remains Order-centered.
- `สร้างรอบจัดส่ง` must obey the Order Shipment Plan and not ship unfinished custom work.
- `รอสร้างรอบจัดส่ง` and `ยืนยันการจัดส่ง` appear as operational states from this Order view.
- COD is shown as a signal, not as an accounting detail.

## Regeneration Rule

Future image prompts for `SCR-ADM-002` should preserve this layout, terminology, and right-detail-drawer pattern unless a later approved decision explicitly changes it.
