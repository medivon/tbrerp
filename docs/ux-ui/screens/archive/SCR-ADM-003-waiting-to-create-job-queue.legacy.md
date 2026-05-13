# SCR-ADM-003 — Waiting to Create Job Queue

Legacy note: this screen is archived and superseded by the Order workflow decision that complete customer custom work creates `JOB-O` immediately on `ยืนยันสร้างออเดอร์`. Do not use this as an active Order workflow screen.

## 1. Purpose

The Waiting to Create Job Queue shows confirmed custom Order Lines that need a `JOB-O` before production can start. It keeps admin focused on turning custom Order work into complete Job work cards.

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user
- Manager or higher-permission user when payment override is required

## 3. User Goals

- Find custom Order Lines waiting for Job creation.
- Understand customer work context without opening too many screens.
- See urgency, delivery date, missing production details, and payment/override signals where allowed.
- Start Job creation for one Order Line.
- Avoid treating ready-stock lines as Jobs.

## 4. Entry Points

- `แดชบอร์ดแอดมิน` -> `รอสร้าง Job`.
- Order Detail -> custom Order Line.
- Return from Job Creation Form without creating Job.

## 5. Exit Points

- Job Creation Form.
- Order Line Detail.
- Order Detail.
- Admin Dashboard.

## 6. Layout Structure

- Header: `รอสร้าง Job`, count, short explanation that these are custom Order Lines.
- Search/filter row: search by Customer, phone, Order ID, Order Line, product/work name.
- Main list: desktop table with optional image thumbnail; tablet card list.
- Row content: Order ID, customer, work name, quantity, delivery date, payment/override signal, owner, age.
- Right detail drawer: quick Order Line preview with images/notes and primary action `สร้าง Job`.
- Footer or row-level action: create Job from selected line.

## 7. Main Components

- Queue header
- Search input
- Source/type chip
- Custom work row
- Product/work thumbnail
- Urgent chip
- Delivery date chip
- Missing detail chip
- Payment/override chip
- Detail preview drawer
- Primary action button

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Order ID | เลขออเดอร์ | ORD-2568-0021 | Order | Real Order only, not Draft Order. |
| Order Line | รายการในออเดอร์ | รายการที่ 2 | Order Line | The unit that will create one Job. |
| Customer | ลูกค้า | คุณอร | Customer | Visible to admin. |
| Customer phone | เบอร์ลูกค้า | 089-444-8811 | Customer | Search support. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Order Line | Custom work name/product name. |
| Quantity | จำนวน | 1 ชิ้น | Order Line | One Job may contain multiple pieces if they move together. |
| Work type | ประเภทงาน | งานลูกค้า | Job Source Type | Will create `JOB-O`. |
| Main image | รูปหลัก | Cabinet thumbnail | Order Line / Job images | Use thumbnail for recognition. |
| Delivery date | วันจัดส่ง | 20 พ.ค. 2569 | Order / Order Line | Relevant if set. |
| Urgent label | งานด่วน | งานด่วน | Urgent Label | Only if authorized user set it. |
| Payment signal | การชำระเงิน | มัดจำแล้ว / ต้อง Override | Payment Term / Payment Record | Show details only by permission. |
| Owner | ผู้รับผิดชอบหลัก | แอดมินนุ่น | Owner | Traceability only. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open Order Line | เปิดรายการ | Admin and same/higher permission | Opens Order Line detail. | No |
| Create Job | สร้าง Job | Admin and same/higher permission | Opens Job Creation Form. | No |
| Open Order | เปิดออเดอร์ | Admin and same/higher permission | Opens Order Detail. | No |
| Search queue | ค้นหา | Admin | Filters queue. | No |
| Payment override path | ขอ Override | Higher-permission user when needed | Allows Job creation without payment with reason. | Yes |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Waiting Job | รอสร้าง Job | Custom Order Line needs Job creation. | Primary queue chip. |
| Customer work | งานลูกค้า | Will become `JOB-O`. | Show with code/readable pairing where possible. |
| Urgent | งานด่วน | Priority label set by authorized user. | Yellow/high-attention chip. |
| Missing details | ข้อมูลงานยังไม่ครบ | Production detail may be incomplete. | Warning chip, not a blocker unless rules require. |
| Needs override | ต้อง Override | Job without payment requires permission reason. | Permission-aware warning chip. |
| Ready to create | พร้อมสร้าง Job | Enough visible info to start Job creation. | Positive chip. |

## 11. Empty State

Show `ไม่มีรายการรอสร้าง Job` and a small note: `รายการสั่งทำจะแสดงที่นี่หลังสร้างออเดอร์จริงแล้วเท่านั้น`.

## 12. Error State

- Loading fails: `โหลดรายการรอสร้าง Job ไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูรายการนี้`.
- Order Line already has a Job: disable `สร้าง Job` and show `สร้าง Job แล้ว`.
- Payment/override permission fails: show `ต้องใช้สิทธิ์ Override พร้อมเหตุผล`.

## 13. Permission Rules

- Admin users with matching permission can open and continue shared queue work.
- Owner does not block same-permission users.
- Creating Job without payment requires permission override and reason.
- Finance-sensitive payment detail is hidden from users without permission.
- Ready-stock Order Lines must not appear as items requiring Job creation.

## 14. UX Notes for Designer

- Make the queue feel like "custom work waiting for production setup," not a generic order list.
- Use image thumbnails when available; furniture staff identify work visually.
- Show `JOB-O` destination clearly before creation: `จะสร้าง JOB-O / งานลูกค้า`.
- Keep `สร้าง Job` as the dominant row/drawer action.
- Do not overload the list with full production instructions; those belong in Job creation and Job detail.
- Use sample work such as `ตู้โชว์ไม้สักแกะลาย`, `โต๊ะกลางลงรักสมุก`, and `เตียงไม้สักสีโอ๊ค`.

## 15. Image Generation Prompt

Create a desktop/tablet ERP queue UI for Thai furniture admin work. Page title "รอสร้าง Job". Show a table of custom order lines waiting for job creation with thumbnail images, เลขออเดอร์, ลูกค้า, ชื่องาน, จำนวน, วันจัดส่ง, งานด่วน chip, and payment/override chip. A right-side detail drawer previews "ตู้โชว์ไม้สักแกะลาย" with button "สร้าง Job" and badge "จะสร้าง JOB-O / งานลูกค้า". Quiet operational UI, no marketing layout, no decorative gradients.

## 16. Open UX Questions

- None blocking for the queue design.
