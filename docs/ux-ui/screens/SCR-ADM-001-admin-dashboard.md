# SCR-ADM-001 - Admin Dashboard

## 1. Purpose

The Admin Dashboard is the approved desktop visual and navigation baseline for the UX/UI package. It gives admin a shared operational overview of active Orders, active Jobs, shipment-round creation, shipment confirmation, production follow-up, and COD/Payment follow-up.

This screen is a queue launcher and risk preview. It is not a full task table, report page, accounting dashboard, or order creation page.

Related visual system:

- `docs/ux-ui/design-system/app-shell.md`

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user
- Manager / Owner as viewer or escalation user

## 3. User Goals

- See how many confirmed Orders still need operational handling.
- See how many Jobs are currently in production and open the production overview.
- Enter the ready-to-ship queue to create shipment rounds.
- Confirm shipments after delivery staff have marked them sent and attached evidence.
- Notice production follow-up cases that require admin communication.
- Keep COD/Payment follow-up visible without blocking Order Completion.
- Quickly see a few high-risk work items with product image, customer, received date, Order ID, and Job ID.
- Avoid showing money amounts on the Admin Dashboard.
- Avoid showing Owner or Current Handler as primary dashboard signals.

## 4. Entry Points

- Login / first screen after opening the system.
- Main navigation item: `แดชบอร์ด`.
- Return from any admin working queue.

## 5. Exit Points

- `ออเดอร์ที่ต้องติดตาม` overview.
- `งานกำลังผลิต` overview.
- `รอสร้างรอบจัดส่ง` queue.
- `ยืนยันการจัดส่ง` queue.
- `งานผลิตต้องติดตาม` queue.
- `ติดตาม COD / Payment` queue.
- `งานที่ต้องรีบดู` item detail.

## 6. Layout Structure

- App shell: fixed left sidebar, top bar, and main work area.
- Sidebar: approved main navigation from the current navigation map and app-shell docs.
- Top bar: menu icon, page title, current date, user avatar, user name, role, and account menu.
- Main content: six operational cards in a 3-column by 2-row desktop grid.
- Bottom section: `งานที่ต้องรีบดู` critical work preview with 3 image-led item cards.
- Card interaction: clicking a card opens the matching overview or queue.
- No top quick action button on this dashboard.
- No Draft Order card on this dashboard.
- No personal task mode on this dashboard in the starting workflow.

## 7. Approved Sidebar Navigation

- `แดชบอร์ด`
- `ออเดอร์`
- `งานสั่งทำ / ผลิต`
- `รอบจัดส่ง`
- `สินค้า / สต๊อก`
- `ลูกค้า / CRM`
- `รายจ่าย`
- `ตั้งค่า`

Rules:

- Treat this as the current main navigation baseline.
- `ร่างออเดอร์` belongs under the Order page as a subcategory, not as a dashboard card.
- `งานสั่งทำ / ผลิต` is the main navigation home for Job Tracking across `JOB-O` and `JOB-P`.
- `รอบจัดส่ง` remains a main navigation item because shipment rounds are operationally important and may be reached outside a single Order detail.

## 8. Main Components

- App sidebar
- Top bar
- User/role indicator
- Operational dashboard card
- Large count
- Status chip
- Footer action link
- Critical Work Preview section
- Image-led preview item
- Order ID / Job ID metadata

## 9. Dashboard Cards

| Card | Thai Title | Count Unit | Example Count | Status Chip | Subtext | Action |
|---|---|---:|---:|---|---|---|
| Orders Follow-up | `ออเดอร์ที่ต้องติดตาม` | Order | 18 | `ยังต้องตามงาน` | `กำลังผลิต 11 • พร้อมสร้างรอบจัดส่ง 7` | `ดูออเดอร์` |
| Active Jobs | `งานกำลังผลิต` | Job | 17 | `กำลังทำงาน` | `งานลูกค้า 11 • ผลิตเข้าสต๊อก 6` | `ดูภาพรวมงาน` |
| Waiting Shipment Creation | `รอสร้างรอบจัดส่ง` | Order | 7 | `พร้อมสร้างรอบจัดส่ง` | `มี COD 3 ออเดอร์` | `เปิดคิวงาน` |
| Shipment Confirmation | `ยืนยันการจัดส่ง` | Shipment round | 4 | `รอเพิ่มข้อมูล` | `เพิ่มเลขติดตามพัสดุ / หลักฐานขนส่ง` | `เปิดคิวงาน` |
| Production Follow-up | `งานผลิตต้องติดตาม` | Follow-up case | 2 | `รอรับทราบ Revision` | `ไม่เข้าใจให้ติดต่อหา 1` | `เปิดคิวงาน` |
| Financial Follow-up | `ติดตาม COD / Payment` | Follow-up item | 6 | `ต้องติดตามเงิน` | `ค้างตรวจสอบ 6 รายการ` | `เปิดคิวงาน` |

Card rules:

- `ออเดอร์ที่ต้องติดตาม` counts confirmed Orders that still need operational follow-up.
- `งานกำลังผลิต` counts Jobs, not Orders.
- `รอสร้างรอบจัดส่ง` counts Orders, not item lines.
- `ยืนยันการจัดส่ง` counts shipment rounds, not Orders.
- `งานผลิตต้องติดตาม` counts only cases needing admin communication or decision, not all aged production work.
- `ติดตาม COD / Payment` counts unresolved Financial Follow-up items and is separate from operational completion.
- Dashboard counts refresh on page load and after important actions; realtime updates are later.
- Cards may show finance-related counts or labels, but must not show baht amounts.
- Cards do not show Owner or Current Handler / next department as primary signals.
- Service Case count is not a main dashboard card first.
- Low-stock is not a main dashboard card first; stock-negative warnings may appear as summary/risk signals.

## 10. Bottom Preview Section

Section label:

- `งานที่ต้องรีบดู`

Purpose:

- Show a short preview of high-risk work admin should notice immediately.
- Keep the section visual and compact.
- Do not turn it into a full manager report or full table.

Each item should show:

| Field | Thai Label | Example |
|---|---|---|
| Image | Product/work image | ตู้โชว์ไม้สัก photo |
| Work name | Work/product name | `ตู้โชว์ไม้สักแกะลาย` |
| Customer | `ลูกค้า` | `คุณศิริพร` |
| Received date | `วันที่รับงาน` | `08 พ.ค. 67` |
| Reference | Order ID / Job ID | `ORD-240522-018 / JOB-O-0241` |
| Risk chip | Status chip | `งานด่วน`, `ค้าง 18 วัน`, `ใกล้ส่ง` |
| Risk context | Short reason | `ค้างนาน`, `รอหลักฐานส่ง`, `สต๊อกติดลบ` |
| Related date | Delivery date | `กำหนดส่ง 26 พ.ค. 67` |

Rules:

- Use 3 visible preview items on desktop.
- Use product imagery because THAIBORAN work is visually specific.
- If a right-side control is needed, use `ดูทั้งหมด`.
- Do not show an empty-state label when delayed or urgent work is visible.
- Critical preview may surface urgent/old work, overdue or near delivery, waiting materials, stock-negative warning, and shipment-confirmation risk.
- Critical preview priority is near/overdue delivery, urgent work, old work, waiting materials, then shipment confirmation waiting to close.
- If urgent work is also waiting for materials, show `รอวัตถุดิบ` as the primary blocker.
- If near-delivery work is still waiting for materials, show near-delivery risk as primary and keep the material blocker visible.
- Financial Follow-up does not enter this preview; it stays in `ติดตาม COD / Payment`.
- Critical preview does not become an individual performance report or personal task list.

## 11. Status / Chips

| Chip | Meaning | Visual Direction |
|---|---|---|
| `ยังไม่จบงาน` | Confirmed Orders still need operational handling. | Blue |
| `กำลังทำงาน` | Jobs are active in production. | Orange |
| `พร้อมสร้างรอบจัดส่ง` | Ready for shipment-round creation. | Green |
| `รอเพิ่มข้อมูล` | Shipment needs tracking/evidence confirmation. | Orange |
| `รอรับทราบ Revision` | Production change needs acknowledgement/follow-up. | Purple |
| `ต้องติดตามเงิน` | COD/Payment follow-up remains. | Red |
| `งานด่วน` | Authorized user marked urgent. | Red or yellow, used sparingly |
| `ค้าง 18 วัน` | High-risk aging signal. | Red or warm warning |
| `ใกล้ส่ง` | Delivery date is near. | Green or warm attention |

## 12. Data Shown

| Field | Thai Label | Source object | Notes |
|---|---|---|---|
| Page title | `แดชบอร์ดแอดมิน` | App shell | Approved title. |
| Orders follow-up count | `ออเดอร์ที่ต้องติดตาม` | Order | Count confirmed Orders that still need operational follow-up. |
| Active Job count | `งานกำลังผลิต` | Job | Includes `JOB-O` and `JOB-P`. |
| Ready-to-ship Order count | `รอสร้างรอบจัดส่ง` | Order / Shipment readiness | Count Orders ready for shipment-round creation. |
| Shipment confirmation count | `ยืนยันการจัดส่ง` | Shipment | Count shipment rounds awaiting tracking/evidence confirmation. |
| Production follow-up count | `งานผลิตต้องติดตาม` | Job Revision / Hold / Waiting for Materials | Only cases needing admin follow-up. |
| Financial follow-up count | `ติดตาม COD / Payment` | Financial Follow-up | Separate from Order Completion. |
| Critical item reference | Order ID / Job ID | Order / Job | Small metadata for communication. |
| Customer | `ลูกค้า` | Customer | Shown in bottom preview. |
| Received date | `วันที่รับงาน` | Order / Job | Shown in bottom preview. |
| Risk signal | Status chip / warning | Order / Job / Shipment / Stock | Urgent, old, near delivery, waiting materials, stock-negative, or shipment confirmation risk. |

Rules:

- Do not show money amounts.
- Do not show Owner.
- Do not show Current Handler, current queue, or next department as a primary dashboard field.
- Show enough reference IDs for admin to open the right working queue/detail.

## 13. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open active Orders | `ดูออเดอร์` | Admin and same/higher permission | Opens active Orders overview. | No |
| Open active Jobs | `ดูภาพรวมงาน` | Admin and same/higher permission | Opens Job overview across `JOB-O` and `JOB-P`. | No |
| Open ready-to-ship queue | `เปิดคิวงาน` | Admin and same/higher permission | Opens `รอสร้างรอบจัดส่ง`. | No |
| Open shipment confirmation queue | `เปิดคิวงาน` | Admin and same/higher permission | Opens `ยืนยันการจัดส่ง`. | No |
| Open production follow-up | `เปิดคิวงาน` | Admin and same/higher permission | Opens production follow-up queue. | No |
| Open COD/Payment follow-up | `เปิดคิวงาน` | Admin with visible permission; finance details by permission | Opens financial follow-up queue. | No |
| Open critical item | Item row/card click | Admin and same/higher permission | Opens the related Order, Job, or Shipment context. | No |

## 14. Empty State

If all dashboard cards are empty, show a calm operational empty state such as `ยังไม่มีงานที่ต้องติดตามตอนนี้`.

Rules:

- Do not use `สร้างร่างออเดอร์` as a dashboard empty-state action.
- Do not show `ไม่มีงานค้าง` inside the bottom section when visible critical items exist.
- Keep empty-state text short.

## 15. Permission Rules

- Admin queues are shared by role/permission.
- Same-permission or higher-permission users can continue shared queue work.
- Owner remains stored for traceability but is not shown on this dashboard and is not an exclusive lock.
- Finance-sensitive amounts and Rak Samuk rates must not be shown.
- This dashboard may show counts for COD/Payment follow-up where allowed, but must not show money amounts.
- This dashboard should not expose finance-sensitive details through shortcuts, subtext, or previews.
- Owner and Current Handler are traceability/detail data, not dashboard fields.

## 16. What Not To Show

- No `ร่างออเดอร์` dashboard card.
- No `รอสร้าง Job` dashboard card.
- No top quick action button such as `+ สร้างออเดอร์`.
- No full task table.
- No accounting charts or analytics widgets.
- No money amounts.
- No Owner or Current Handler columns/fields.
- No personal task mode.
- No Service Case count card in the first dashboard.
- No low-stock card in the first dashboard.
- No individual performance report.
- No marketing hero or decorative landing-page layout.
- No contradictory empty-state labels.

## 17. UX Notes for Designer

- Treat this as a daily operational dashboard.
- Keep the six cards as the dominant structure.
- Keep Thai UI labels as specified in this screen spec.
- Use English only for `Job`, `JOB-O`, `JOB-P`, `COD`, `Payment`, and `Revision`.
- Preserve the approved quiet, dense, clean visual direction.
- Preserve the image-led `งานที่ต้องรีบดู` bottom section.
- The dashboard should feel like the control center for a small custom furniture production business.

## 18. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ADM-001-admin-dashboard.md`.

## 19. Conflicts Found

None identified relative to active business rules, ADRs, `CONTEXT.md`, and what-not-to-show rules.
