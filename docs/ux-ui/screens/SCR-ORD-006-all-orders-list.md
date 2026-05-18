# SCR-ORD-006 - All Orders List

## 1. Purpose

All Orders List shows every real Order across the main Order statuses. It is the archive/search-heavy Order tab used by admins when they need to find an Order, confirm customer details, check item summaries, see Order status separately from Shipment status, and open Order Detail.

This screen does not show Draft Orders. Draft Orders remain under `ร่างออเดอร์`.

The `ปิดแล้ว / ยกเลิก` tab reuses this table/layout with a fixed tab/filter; it does not need a separate screen design unless future behavior diverges.

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user
- Manager / Owner as viewer or escalation user

## 3. User Goals

- Find an Order by customer, phone, Order ID, recipient, address, Job ID, or product/work name.
- See enough row detail to talk with the customer without opening many screens.
- Know whether an Order contains custom work.
- Know the Order status and whether shipment has not started, has a round but no tracking yet, is awaiting confirmation, is partially shipped, or has tracking.
- Open the Order Detail when action is needed.
- Avoid mixing Draft Orders with real Orders.

## 4. Entry Points

- Sidebar `ออเดอร์` -> tab `ออเดอร์ทั้งหมด`.
- Order workspace tabs from `ออเดอร์ที่ต้องติดตาม`, `ร่างออเดอร์`, or `ปิดแล้ว / ยกเลิก`.
- Search/navigation link from Customer or related screens when returning to Order workspace.

## 5. Exit Points

- Order Detail via `เปิดออเดอร์`.
- Order Create/Edit via `สร้างออเดอร์ใหม่`.

## 6. Layout Structure

- Use approved desktop admin app shell.
- Sidebar active item: `ออเดอร์`.
- Page title: `ออเดอร์ทั้งหมด`.
- Order workspace tabs: `ออเดอร์ที่ต้องติดตาม`, `ออเดอร์ทั้งหมด`, `ร่างออเดอร์`, `ปิดแล้ว / ยกเลิก`.
- Page primary action: `สร้างออเดอร์ใหม่`, placed at the top right, opens Order Create/Edit directly.
- Filter/search bar above the table.
- Dense but readable table as the main content.
- Pagination below the table using the shared table pattern.

## 7. Filters and Search

Order status filters:

- `ทั้งหมด`
- `กำลังดำเนินการ`
- `กำลังผลิต`
- `พร้อมสร้างรอบจัดส่ง`
- `ส่งบางส่วน`
- `จัดส่งครบแล้ว`
- `ยกเลิก`

Shipment-summary filters may include `รอยืนยันการจัดส่ง`, but do not treat it as an Order status.

Date filter:

- Field: Order created date.
- Default: all time.
- Presets: `วันนี้`, `7 วันล่าสุด`, `เดือนนี้`, `เดือนที่แล้ว`, `กำหนดช่วงเอง`.

Search should cover:

- Order ID
- Customer name
- Customer or recipient phone
- Recipient name
- Address, province, postal code
- Job ID
- Product/work name

Remember filter/search state only during the current user session. Do not make it a permanent user preference in first scope.

## 8. Main Table Columns

| Field | Thai Label | Example | Notes |
|---|---|---|---|
| Order ID | เลขออเดอร์ | ORD-240522-018 | Primary identifier. |
| Customer | ชื่อลูกค้า | คุณศิริพร | Buyer/CRM owner. |
| Phone | เบอร์โทร | 081-234-5678 | Customer or recipient phone, whichever best supports contact. |
| Item summary | รายการสินค้า | ตู้ไม้สัก + 2 รายการ | Compact text summary with popover. |
| Order status | สถานะออเดอร์ | พร้อมสร้างรอบจัดส่ง | Active-line operational status. |
| Shipment summary | สถานะการจัดส่ง | Kerry : TH12345 | Compact shipment/tracking summary with popover. |
| Net total | ยอดรวม | 24,500 | Net total after discount, not outstanding balance. |
| Custom work indicator | มีงานสั่งทำ | tool/hammer icon | Blank when no custom work exists. |
| Created date | วันที่สร้าง | 22 พ.ค. 67 | Short date only. |
| Action | การทำงาน | เปิดออเดอร์ | Only row action. |

Do not include these as main columns:

- `ผู้สร้างออเดอร์`
- `ผู้รับผิดชอบ/แอดมินเจ้าของออเดอร์`

## 9. Product Summary Popover

Row summary:

- Show one compact item line.
- If there are more items, show `+N รายการ`.

Interaction:

- Desktop: hover/click.
- Tablet/mobile: click only.
- Close automatically on scroll or pagination change.

Popover content:

- Item name.
- Quantity.
- Line price only where the user has price permission.
- No weight.
- Do not include cancelled lines in the normal product popover; cancelled lines are reviewed in Order Detail.

When the Order has both ready-stock and custom work, split the popover:

```text
สินค้า
สินค้า A x1
สินค้า B x2

งานสั่งทำ
ตู้พระสั่งทำ ขนาด xxx สี xxx กำหนดส่งวันที่ xxx
```

If the Order has only one item type, show the list directly without extra section headings.

Long text should wrap inside a constrained popover width. Do not open a large modal for this table-only preview.

## 10. Shipment Summary Popover

The row shows a compact shipment state. The popover shows hidden shipment rounds, carrier/tracking entries, or Shipment round numbers.

| Situation | Row display | Detail behavior |
|---|---|---|
| No Shipment round exists | `ยังไม่ได้จัดส่ง` in red text | No round detail yet. |
| Shipment round exists but no carrier/tracking | `ยังไม่ได้จัดส่ง` in blue text | Popover may show Shipment round number. |
| Shipment round sent out but admin confirmation pending | `รอยืนยันการจัดส่ง` | Popover shows Shipment round and pending confirmation/evidence state. |
| Carrier/tracking exists | `Kerry : xxxxx` | Popover can show more round details where relevant. |
| Closed Shipment round without tracking but with delivery evidence photo | `ส่งแล้ว` | Popover shows carrier, Shipment round, and delivery evidence. |
| Multiple rounds and Order not fully shipped | `จัดส่งยังไม่ครบ` | Popover lists previous carrier/tracking entries. |
| Multiple rounds and shipping complete | Latest tracking + `+N รอบ`, or `ส่งแล้ว +N รอบ` if the latest closed round has no tracking | Popover lists all rounds. |

## 11. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Create Order | สร้างออเดอร์ใหม่ | Admin and allowed users | Opens Order Create/Edit. | No |
| Open Order | เปิดออเดอร์ | Admin and allowed users | Opens Order Detail. | No |
| Clear filters | ล้างตัวกรอง | Admin | Resets active search/filter state. | No |

Do not crowd row actions with shipment creation, payment follow-up, or edit actions. Those actions belong in Order Detail.

The table row itself should not be the primary click target. Use the explicit `เปิดออเดอร์` action to reduce accidental opens.

## 12. Pagination

Use the shared table pagination pattern:

- Page size options: `25`, `50`, `100`.
- Default page size: `25`.
- Controls: `ก่อนหน้า`, `ถัดไป`, and page numbers.
- Do not use infinite scroll.

## 13. Empty State

When search/filter returns no results, show a clear empty state with:

- Message that no Orders match the current search/filter.
- Button: `ล้างตัวกรอง`.

Do not duplicate `สร้างออเดอร์ใหม่` in this empty state because the page already has the primary action at the top right.

## 14. Status / Visual Rules

- `ยกเลิก`: row is faded but remains searchable and openable.
- `จัดส่งครบแล้ว`: use status color/icon only; do not fade the row like cancelled Orders.
- `ส่งบางส่วน`: show when at least one active line has completed delivery recording with tracking/evidence and another active line is not complete.
- Custom-work indicator: use a tool/hammer-style icon with tooltip `มีงานสั่งทำ`; leave blank for Orders without custom work.
- Shipment text color distinguishes missing shipment round from created round without tracking:
  - Red `ยังไม่ได้จัดส่ง`: no Shipment round exists.
  - Blue `ยังไม่ได้จัดส่ง`: Shipment round exists but tracking/carrier is not yet recorded.
- For closed Shipment rounds, `รูปหลักฐานจัดส่ง` counts as evidence even when tracking is blank.

## 15. Permission Rules

- Users allowed to view this Order list can see `ยอดรวม` because admins need it to summarize Orders and talk with customers.
- `ยอดรวม` is net total after discount.
- Line price in product popover is permission-aware.
- Do not expose private CRM notes or finance-sensitive audit detail on this screen.

## 16. What Not To Show

- Draft Orders.
- Persistent autosave sessions.
- Creator/owner columns in the main table.
- Full payment workflow.
- Full stock workflow.
- Full production workflow.
- Full shipment workflow.
- Accounting exports or reports.
- Export button in the first screen pass.

## 17. UX Notes for Designer

- This is a focused Order table, not a dashboard and not a production report.
- Keep row density practical for office admin work.
- Use popovers to keep the table narrow while preserving detail access.
- Keep the custom-work indicator near the end of the row before `วันที่สร้าง`.
- Use short Thai date format such as `22 พ.ค. 67`.
- The first screen pass should prioritize the table, filters, and popover behavior over secondary actions.

## 18. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ORD-006-all-orders-list.md`.
