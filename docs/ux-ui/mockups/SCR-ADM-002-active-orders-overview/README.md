# SCR-ADM-002 - Orders Follow-up Overview Mockup

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

This mockup is the current visual anchor for the `ออเดอร์ที่ต้องติดตาม` screen. The approved image may still contain the older label and should be regenerated when this screen is refreshed.

It extends the approved Admin Dashboard app shell into the Order workspace and confirms:

- `ออเดอร์` is the active sidebar item.
- The screen uses the approved sidebar and top bar pattern.
- `ร่างออเดอร์` is not shown in this active operational list.
- `สร้างออเดอร์` can appear inside the Order page, not on the dashboard.
- The Order workspace uses clear tabs: `ออเดอร์ที่ต้องติดตาม`, `ออเดอร์ทั้งหมด`, `ร่างออเดอร์`, `ปิดแล้ว / ยกเลิก`.
- Active Orders are shown as image-led operational rows.
- The right detail drawer pattern is approved for selected Order preview.

## Approved Summary Filters

- `ทั้งหมด`
- `กำลังผลิต`
- `ส่งได้เลย`
- `รอยืนยันการจัดส่ง` as a Shipment follow-up filter, not an Order status
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
- The follow-up list shows only real Orders that still need operational follow-up.
- Order rows can show `Job ID` for communication, but the screen remains Order-centered.
- This page is a follow-up/filter view only; row actions open Order Detail rather than creating Shipment rounds or editing Jobs directly.
- `สร้างรอบจัดส่ง` must happen from Order Detail or the Shipment flow, obey the Order Shipment Plan, and not ship unfinished custom work.
- `รอสร้างรอบจัดส่ง` and `รอยืนยันการจัดส่ง` appear as shipment follow-up states from this Order view, separate from main Order status.
- COD is shown as a signal, not as an accounting detail.

## Regeneration Rule

Future image prompts for `SCR-ADM-002` should preserve this layout, terminology, and right-detail-drawer pattern unless a later approved decision explicitly changes it.
