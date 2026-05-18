# Admin Dashboard Visual Guidance

Use with `docs/ux-ui/design-system/visual-design-system.md`, `docs/ux-ui/design-system/app-shell.md`, and the active admin screen specs.

This file gives visual guidance for:

- Admin Dashboard
- Dashboard cards
- Critical preview
- Admin queue launcher behavior
- Summary cards
- Dense admin queues
- Admin table/drawer patterns
- No finance amount leakage on dashboard
- Calm operational overview style

## Visual Role

The Admin Dashboard is the first screen and the shared queue launcher. It should feel like the operations control desk for a furniture shop, not an analytics suite and not a task table.

Use a calm first viewport:

- Fixed sidebar and quiet top bar.
- Six queue-launch cards in a 3-column desktop grid.
- Compact `งานที่ต้องรีบดู` section below the cards.
- No hero content, marketing copy, charts-first layout, or large decorative imagery.

## Dashboard Cards

The six cards remain the dominant structure:

- `ออเดอร์ที่ต้องติดตาม`
- `งานกำลังผลิต`
- `รอสร้างรอบจัดส่ง`
- `ยืนยันการจัดส่ง`
- `งานผลิตต้องติดตาม`
- `ติดตาม COD / Payment`

Visual treatment:

- High-contrast readable cards with 8px radius, subtle border, and soft shadow.
- Large numeric count, title, one status chip, one subtext line, and one footer action.
- Use soft icon circles, not illustrated icons.
- Keep all cards the same height.
- Use tabular numbers and short Thai labels.
- Count units must be visually clear: Order, Job, Shipment round, or Follow-up item.

Do not show baht amounts, owner names, current handler, individual performance, low-stock card, Service Case count card, or Draft Order card.

## Critical Preview

`งานที่ต้องรีบดู` is a compact risk preview, not a full manager report.

Visual treatment:

- Three visible image-led cards on desktop.
- Each item starts with a furniture/work thumbnail.
- Show work/product name, customer where admin permission allows, received date, compact `Order ID / Job ID`, and risk chips.
- Use chips such as `งานด่วน`, `ค้าง 18 วัน`, `ใกล้ส่ง`, `รอวัตถุดิบ`, or shipment-confirmation risk.
- Use `ดูทั้งหมด` only as a secondary text action.

Priority visual emphasis follows active docs: near/overdue delivery first, urgent work, old work, waiting materials, then shipment confirmation waiting to close.

Financial Follow-up must not appear in this critical preview. Keep it in the `ติดตาม COD / Payment` card and queue.

## Queue Launcher Behavior

Cards are navigation launchers. They should feel clickable with pointer, hover border, and clear footer action, but they must not contain embedded task rows.

When a card opens a queue:

- Highlight the matching module in the sidebar.
- Preserve the relevant module tabs/submenu.
- Land on the filtered working list with search and table controls visible.
- Keep shared queue language. Avoid personal assignment styling.

## Summary Cards in Admin Queues

Queue pages may use a compact summary strip above the table. Use summary cards as scan aids, not as dashboard duplicates.

Visual rules:

- Smaller than dashboard cards.
- One metric per card.
- Use low-contrast borders and no oversized icons.
- Use color sparingly to identify risk buckets.
- No finance-sensitive amounts unless the queue itself is finance-permissioned, such as COD/Payment Follow-up.

## Dense Admin Queues

Admin queue screens should prefer dense workbench tables on desktop:

- `ออเดอร์ที่ต้องติดตาม`
- `งานกำลังผลิต`
- `รอสร้างรอบจัดส่ง`
- `ยืนยันการจัดส่ง`
- `งานผลิตต้องติดตาม`
- `ติดตาม COD / Payment`

Use:

- Search at the top of the work area.
- Filter chips or tabs below search.
- Thumbnail column where image recognition helps.
- Status chips for current state and risk.
- Explicit row actions such as `เปิดออเดอร์`, `เปิด Job`, `สร้างรอบจัดส่ง`, or `ตรวจหลักฐาน`.
- Right drawer for quick preview and next action.
- Standard pagination from `table-patterns.md`.

Avoid:

- Loose item chaos in the ready-to-ship queue; group by Order.
- Too many row actions.
- Infinite scroll.
- Expanded full logs by default.

## Admin Table and Drawer Patterns

Tables should support scanning before action.

Recommended row anatomy:

1. Thumbnail or compact icon.
2. Primary ID, such as Order, Job, Shipment, or Follow-up ID.
3. Thai title/customer/work name.
4. Status/source chips.
5. Date/age metadata.
6. One explicit primary action.

Right drawer anatomy:

- Header: object ID, main status chip, close button.
- Preview image when relevant.
- Key facts only.
- Related links.
- One primary action and one secondary action.
- Stale-state banner when another user changes the item.

## No Finance Amount Leakage

The Admin Dashboard can show finance follow-up counts and broad labels such as `ต้องติดตามเงิน`, but it must not show:

- Baht amounts.
- Payment evidence thumbnails.
- COD expected/actual values.
- Product cost, profit, expense amounts, payout, or Rak Samuk rates.

In non-finance admin queues, use broad finance signals such as `มีรายการติดตามการเงิน` when the user lacks detail permission.

## Calm Operational Overview Style

Use restrained visual hierarchy:

- Primary emphasis: queue counts and risk chips.
- Secondary emphasis: dates, IDs, source labels.
- Tertiary emphasis: explanatory helper text.

Dark/navy shell treatment is allowed if it improves visual quality, hierarchy, and readability. Main card, preview, and queue surfaces must remain readable and practical for dense ERP work. Do not force full dark mode and do not force light-only UI.

Do not use alarm colors for normal queue age. Reserve red for high-risk, blocked, destructive, or finance follow-up states.

## Empty, Loading, and Error States

Dashboard empty state:

- `ยังไม่มีงานที่ต้องติดตามตอนนี้`

Queue empty states:

- Use the queue-specific active docs, such as `ไม่มีรอบจัดส่งรอยืนยัน`.
- If filters caused no results, include `ล้างตัวกรอง`.

Loading states should preserve the card grid and table row heights.

Permission failures should route to the standard no-access page, not a dashboard with disabled cards.

## Old Mockup References

Archived Admin Dashboard images may inform only broad density and shell feel. They must not override current specs, especially the no-money-dashboard rule, fixed dashboard cards, shared queue behavior, or critical preview priority.
