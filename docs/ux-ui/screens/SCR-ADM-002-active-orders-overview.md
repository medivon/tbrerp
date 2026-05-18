# SCR-ADM-002 - Orders Follow-up Overview

## 1. Purpose

Orders Follow-up Overview shows confirmed Orders that need operational follow-up. It is the first drill-down screen from the approved Admin Dashboard card `ออเดอร์ที่ต้องติดตาม`.

This screen answers: which Orders still need handling, whether they are still producing or ready to ship, and which Order should admin open next.

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user
- Manager / Owner as viewer or escalation user

## 3. User Goals

- See all confirmed Orders that are not done.
- Separate Orders still in production from Orders that can be shipped now.
- Notice quickly when an Order contains custom work.
- Find Orders by customer, phone, Order ID, Job ID, recipient, or delivery date.
- Open the right Order without scanning multiple modules.
- Avoid mixing Draft Orders into real operational work.
- Keep COD/Payment visible only as follow-up signal, not as the definition of Order completion.

## 4. Entry Points

- `แดชบอร์ด` -> `ออเดอร์ที่ต้องติดตาม`.
- Sidebar `ออเดอร์` -> `ออเดอร์ที่ต้องติดตาม`.
- Critical Work Preview item related to an Order.

## 5. Exit Points

- Order Detail.
- Order Create/Edit via `สร้างออเดอร์`.

Operational actions such as Job follow-up, Shipment creation, Shipment confirmation, and Payment follow-up are reached after opening Order Detail or the relevant dedicated module.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `ออเดอร์`.
- Top bar: page title `ออเดอร์ที่ต้องติดตาม`, date, user/role.
- Header area: count summary and restrained `สร้างออเดอร์` action.
- Summary strip: total active Orders, producing Orders, Orders ready for shipment-round creation, shipment-confirmation Orders.
- Order module tabs should be visible or implied in the page frame: `ออเดอร์ที่ต้องติดตาม`, `ออเดอร์ทั้งหมด`, `ร่างออเดอร์`, `ปิดแล้ว / ยกเลิก`.
- Follow-up filter tabs: `ทั้งหมด`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `รอยืนยันการจัดส่ง`, `ส่งบางส่วน`.
- Treat `รอยืนยันการจัดส่ง` here as a Shipment follow-up filter, not an Order status.
- Search bar: customer, phone, Order ID, Job ID, recipient, postal code, address.
- Main content: desktop table with image-led Order rows; tablet can use stacked cards.
- Right-side detail drawer: selected Order quick preview.

## 7. Main Components

- Approved app sidebar
- Top bar
- Summary cards
- Filter tabs
- Search input
- Order status chips
- Image-led Order row
- Order progress mini timeline
- Related Job/Shipment badges
- Right detail drawer
- Permission-aware COD/Payment chip

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Order ID | เลขออเดอร์ | ORD-240522-018 | Order | Primary operational reference. |
| Customer | ลูกค้า | คุณศิริพร | Customer | Searchable. |
| Recipient | ผู้รับสินค้า | คุณศิริพร | Address Entry / Shipment snapshot | May differ from Customer. |
| Phone | เบอร์โทร | 081-234-5678 | Customer / Recipient | Searchable. |
| Main image | รูปงาน | ตู้โชว์ไม้สัก | Order Line / Job / SKU | Helps admin recognize work. |
| Order summary | รายการ | ตู้โชว์ไม้สักแกะลาย + 1 รายการ | Order Line | Compact summary only. |
| Custom-work label | มีงานสั่งทำ | มีงานสั่งทำ | Order / Order Line | Show when the Order contains custom work. |
| Order state | สถานะออเดอร์ | กำลังผลิต | Order / Order Line | Active-line operational state. |
| Producing count | กำลังผลิต | 11 | Order / Job | Summary count. |
| Ready-to-ship count | พร้อมสร้างรอบจัดส่ง | 7 | Order / Shipment readiness | Summary count. |
| Job reference | Job ID | JOB-O-0241 | Job | Small metadata. |
| Shipment state | สถานะการจัดส่ง | รอยืนยันการจัดส่ง | Shipment | Current Shipment round/tracking state, separate from Order status. |
| Delivery date | กำหนดส่ง | 26 พ.ค. 67 | Order / Job / Shipment | Optional. |
| Received date | วันที่รับงาน | 08 พ.ค. 67 | Order / Job | Useful for aging. |
| Payment signal | COD / Payment | COD | Financial Follow-up | Signal only; no sensitive amounts by default. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Create Order | สร้างออเดอร์ | Admin and allowed users | Opens Order Create/Edit. | No |
| Open Order | เปิดออเดอร์ | Admin and same/higher permission | Opens Order Detail. | No |
| Search | ค้นหา | Admin | Filters active Orders. | No |

## 10. Status / Chips

| Chip | Meaning | Visual Direction |
|---|---|---|
| `กำลังผลิต` | At least one Order Line is still in Job flow. | Orange |
| `พร้อมสร้างรอบจัดส่ง` | Order has ready-to-ship items waiting for shipment-round creation. | Green |
| `รอยืนยันการจัดส่ง` | Shipment round has been sent out and waits for admin confirmation/evidence; not an Order status. | Orange |
| `ส่งบางส่วน` | At least one active Order line has completed delivery recording, while another active line is not complete. | Blue |
| `มีงานสั่งทำ` | Order contains at least one custom-work line. | Neutral/source label |
| `งานด่วน` | Authorized user marked related work urgent. | Yellow or red |
| `ค้าง 18 วัน` | High-risk age signal. | Warm warning |
| `COD` | Shipment/Order has COD follow-up signal. | Permission-aware neutral/red |

## 11. Empty State

Show `ไม่มีออเดอร์ที่ต้องติดตาม` with a restrained action `สร้างออเดอร์`.

Do not show Draft Orders in this empty state.

## 12. Error State

- Loading fails: `โหลดออเดอร์ไม่สำเร็จ` with retry.
- Permission fails: show `ไม่มีสิทธิ์ดูข้อมูลนี้`.
- Related Job or Shipment was changed by another user: show refresh notice and keep the Order row visible.

## 13. Permission Rules

- Same-permission or higher-permission admin users can continue shared operational work.
- Owner is visible for traceability, not as an exclusive lock.
- Finance-sensitive values are hidden unless permission allows.
- COD/Payment appears as a follow-up signal, not as Order completion logic.
- Queue sorting prioritizes urgent follow-up first: overdue/near due, waiting too long, blocked, then created date.

## 14. What Not To Show

- Do not show `ร่างออเดอร์` inside this active list.
- Do not make Draft Orders look like confirmed Orders.
- Do not create Shipment rounds directly from this page. This page is a follow-up/filter view; Shipment actions happen after opening Order Detail.
- Do not show full accounting totals, profit, ad spend, or tax reports.
- Do not expose customer private CRM notes.
- Do not turn the screen into a manager production report.

## 15. UX Notes for Designer

- Preserve the approved Admin Dashboard app shell.
- Preserve the current `SCR-ADM-002` screen layout and right-detail-drawer pattern.
- Keep `ออเดอร์` active in the sidebar.
- Use Thai UI labels as the primary language.
- Use images in rows/cards because THAIBORAN work is visually specific.
- Make the row status easy to scan: producing, ready to ship, shipment confirmation, partial shipment.
- Add a simple `มีงานสั่งทำ` label when the Order contains custom work; avoid turning the row into a full Job report.
- Shipment readiness should appear as a signal only; users open Order Detail to select ready lines and create Shipment rounds.
- Keep table density practical for office admin work.

## 16. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ADM-002-active-orders-overview.md`.
