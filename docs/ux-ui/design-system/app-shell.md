# App Shell Visual System

This file records reusable visual decisions extracted from the current `SCR-ADM-001-admin-dashboard` screen spec and image prompt. It is a UX/UI working reference, not a new requirements summary.

- `docs/ux-ui/screens/SCR-ADM-001-admin-dashboard.md`
- `docs/ux-ui/image-prompts/IMG-ADM-001-admin-dashboard.md`

## Desktop Admin Direction

The desktop admin app should feel like a quiet operations tool for a small production business: dense enough for daily work, calm enough for repeated use, and visual enough to help staff recognize furniture work quickly.

Use the approved Admin Dashboard as the baseline for:

- Sidebar structure
- Header/top bar pattern
- Dashboard card treatment
- Status chip treatment
- Bottom preview section pattern
- Typography scale
- Spacing and density

## Sidebar

Approved main navigation:

- `แดชบอร์ด`
- `ออเดอร์`
- `งานสั่งทำ / ผลิต`
- `รอบจัดส่ง`
- `สินค้า / สต๊อก`
- `ลูกค้า / CRM`
- `รายจ่าย`
- `ตั้งค่า`

Rules:

- Treat this list as the current main navigation baseline.
- Keep sidebar labels in Thai, except established internal terms such as `CRM`.
- Do not show `ร่างออเดอร์` as a dashboard-level navigation badge.
- `ร่างออเดอร์` belongs inside the Order page as a subcategory, tab, or filter.
- Use a selected-state background for the active navigation item.
- Use simple line icons that support scanning; avoid decorative or illustrative icons.

## Top Bar

Approved structure:

- Left: menu/collapse icon and page title `แดชบอร์ดแอดมิน`.
- Right: date, user avatar, user display name, role label, and account menu.

Rules:

- Do not add a top-bar quick action such as `+ สร้างออเดอร์` on the dashboard.
- Creation actions belong inside their working modules, such as `ออเดอร์`.
- Keep the top bar low-friction and operational.
- Role text can show examples such as `Admin (Full Access)` and `ผู้ดูแลระบบ`.

## Module Sub Menu

Use a compact secondary navigation row inside desktop admin modules when a main sidebar item has multiple operational subpages.

Approved use case:

- `รอบจัดส่ง`: `รอสร้างรอบจัดส่ง`, `รายการต้องจัดส่งวันนี้`, `รายการรอวันจัดส่ง`, `ยืนยันการจัดส่ง`, `ประวัติรอบจัดส่ง`

Rules:

- Place the module sub menu below the page header/top page title area, not inside the left sidebar.
- Style it separately from filter chips. It changes screens; filter chips change the current list.
- Use Thai labels.
- Active state should be clear but restrained.
- Do not overload dashboard cards with these subpages; dashboard cards remain shortcuts into key queues.

## Card Style

Approved dashboard cards use:

- White background
- Soft border and subtle shadow
- Rounded corners around 8-12px
- Large numeric count
- Icon circle in a soft status color
- Short title
- One status chip
- One concise subtext line
- Footer action link

Rules:

- Cards launch working queues or overviews; they are not full tables.
- Counts should use the unit defined by the card, such as Order, Job, shipment round, or follow-up item.
- Use Thai labels for visible UI text.
- Keep English only for important internal terms: `Job`, `JOB-O`, `JOB-P`, `COD`, `Payment`, `Revision`.

## Chip Style

Use compact status chips with restrained color:

- Blue: active/in-progress operational state
- Orange: work in progress, waiting for information, or attention needed
- Green: ready/confirmed/positive flow state
- Purple: `Revision` or production follow-up
- Red: financial follow-up or high-risk attention
- Yellow: urgent work where needed

Rules:

- Chips should name status, not explain the whole workflow.
- Avoid using alarm colors for normal queue age.
- Use red sparingly for money follow-up or critical operational attention.

## Typography

Approved hierarchy:

- Page title: large, bold Thai
- Card title: medium-large, bold Thai
- Count: oversized numeric, dark navy
- Chip: compact, semibold
- Subtext: small, readable, neutral
- Bottom preview metadata: small and scannable

Rules:

- Avoid marketing-scale headings inside the app shell.
- Keep letter spacing normal.
- Use concise Thai labels; long explanations belong inside queue/detail screens.

## Spacing and Density

Approved density:

- Fixed left sidebar
- Spacious top bar
- 3-column dashboard card grid on desktop
- 2 rows of primary cards
- Compact bottom preview section

Rules:

- Desktop admin screens should prioritize scanning over decoration.
- Use consistent card spacing and aligned card heights.
- Keep bottom preview compact; it should not become a full table.
- Use image thumbnails where work recognition matters.

## Dense Workbench Pattern

Use this pattern for admin screens where staff may process dozens of operational records in one sitting.

Use for:

- `รอสร้างรอบจัดส่ง`
- other high-volume admin queues where row-by-row opening would be too slow

Pattern:

- Compact summary strip
- Search and filter toolbar
- Sort/group selector
- Dense table rows with thumbnails
- Optional checkbox selection for eligible rows
- Selected-count action bar
- Right drawer as preview/helper, not mandatory for every action

Rules:

- Prefer dense rows over large cards on desktop.
- Keep row height stable and scan-friendly.
- Show eligibility when bulk action is restricted, such as `สร้างรวมได้` vs `ต้องเปิดแยก`.
- Do not make bulk action appear available for all records when business rules limit it.

## Section Heading Style

Section headings should be short and work-oriented.

Approved example:

- `งานที่ต้องรีบดู`

Rules:

- Use clear Thai labels.
- Avoid explanatory section text on operational screens.
- If a section needs a right-side control, use a compact action such as `ดูทั้งหมด`.

## Bottom Preview Pattern

The approved Admin Dashboard uses a bottom preview for critical work.

Pattern name:

- `Critical Work Preview`

Thai UI label:

- `งานที่ต้องรีบดู`

Use for:

- A short grid of high-risk items that admin should notice immediately.
- 3 visible items on desktop.
- Image-led work recognition.

Each preview item should show:

- Product/work image
- Product or work name
- Customer name
- `วันที่รับงาน`
- Small `Order ID / Job ID`
- Status chips such as `งานด่วน`, `ค้าง 18 วัน`, `ใกล้ส่ง`
- Current queue/status such as `อยู่คิวช่างไม้`, `รอสร้างรอบจัดส่ง`, `ยืนยันการจัดส่ง`
- Related delivery date, if relevant

Rules:

- This section is not a full manager report.
- This section is not a full queue table.
- Do not show contradictory empty-state labels such as `ไม่มีงานค้าง` when delayed work is visible.
