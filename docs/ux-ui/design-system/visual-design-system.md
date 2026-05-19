# THAIBORAN ERP Visual Design System

This is the master visual design system for THAIBORAN ERP. It is derivative of the active business and UX documents, especially `CONTEXT.md`, ADRs, `docs/decision-log.md`, `docs/qa-summary.md`, `docs/ux-ui/04-interaction-modal-behavior.md`, `docs/ux-ui/design-system/app-shell.md`, `docs/ux-ui/design-system/table-patterns.md`, and the current screen specs under `docs/ux-ui/screens/`.

Old mockup images and old image prompts are archived visual references only. Current screen specs and active source-of-truth docs win over any old generated image.

## Overall Visual Direction

THAIBORAN ERP should feel like a calm Thai-first operations system for a custom furniture business: practical, dense, image-aware, and trustworthy. The interface should help staff recognize furniture work quickly, process many operational records, and avoid accidental finance or permission leakage.

THAIBORAN ERP should use a premium operational ERP visual style. A light neutral treatment, a dark/navy shell treatment, or a mixed shell/work-surface treatment may be used when it improves visual quality, hierarchy, and readability. Main work surfaces must remain readable, practical, and dense enough for repeated ERP work. Do not force full dark mode or light-only UI. Furniture images provide warmth; the UI itself should stay restrained. Avoid landing-page composition, oversized hero areas, decorative gradients, heavy animation, glass effects, and sparse SaaS styling that wastes scanning space.

## Design Principles

- Thai-first labels: use Thai for staff-facing navigation, actions, field labels, statuses, and helper text. Keep established terms such as `Job`, `JOB-O`, `JOB-P`, `SKU`, `CRM`, `COD`, `Payment`, `PV`, and `Revision` when they are already part of the docs.
- Operations before decoration: screens are for repeated daily work, not promotion.
- Read-first details: confirmed business records should be readable before editable. Put edits near their section or behind the approved action pattern.
- Dense but calm: show enough rows, chips, counts, and thumbnails for office work without turning pages into cramped spreadsheets.
- Image-aware: furniture/product/work thumbnails are functional identifiers, not decoration.
- Permission-aware by removal: sensitive fields, columns, actions, exports, and print data are hidden entirely when the user lacks permission.
- Shared queue clarity: admin queues are shared by role/permission. Owner is traceability, not a lock.
- Mobile worker simplicity: worker screens use large cards, large actions, and role-limited content.
- Evidence is contextual: payment evidence is required for Payment Records; Shipment close requires Tracking or one delivery evidence photo; production, stock, Expense, PV, and material evidence are optional unless the active behavior doc says otherwise.

## Product UI Copy and Action Rules

The staff-facing ERP must read like a real operations product, not developer scaffolding. Use concise Thai business language that explains what the user can do next or what business condition is missing.

Do not show internal implementation language in product UI, including:

- sector numbers
- implementation phases
- placeholder status
- fixture data or mock data
- in-memory state
- database not connected
- not implemented yet
- future implementation
- agent workflow
- developer instructions

Those terms may appear only in developer docs, tests, `docs/implementation/current-task.md`, `docs/implementation/review-report.md`, or technical notes.

Every visible button, link, menu item, row action, modal action, and CTA must have a clear user meaning:

- If the user has no permission, hide the action.
- If the user has permission but the current business state blocks the action, show it disabled with a concise Thai business reason.
- If the action belongs to a future implementation sector, prefer hiding it.
- If it must stay visible for layout or workflow context, disable it and explain the real business condition, not implementation status.
- Do not leave dead buttons or active-looking controls that do nothing.
- Do not explain actions with developer-style text such as "this will be implemented later".

Good user-facing disabled reasons include:

- `ต้องเลือกลูกค้าก่อน`
- `ต้องเลือกสินค้าอย่างน้อย 1 รายการ`
- `ต้องเลือก Payment Term ก่อน`
- `ต้องเพิ่มรายละเอียดงานสั่งทำให้ครบ`
- `ต้องมี Tracking หรือรูปหลักฐานก่อน`
- `ไม่มีสิทธิ์ดำเนินการ`
- `ต้องปิดรอบจัดส่งก่อน`

Bad user-facing disabled reasons include:

- `ยังไม่ได้ทำใน Sector นี้`
- `ยังไม่เชื่อม database`
- `เป็น placeholder`
- `เป็น fixture-backed`
- `จะ implement ภายหลัง`
- `ปุ่มนี้ยังไม่ทำงาน`

## Color Palette

Use restrained accents and high-contrast operational surfaces. Dark/navy shell treatment is allowed when it improves visual hierarchy and readability, but main work surfaces such as cards, drawers, modals, tables, forms, and preview panels must remain practical for dense ERP scanning. Do not force full dark mode and do not force light-only UI.

| Token | Hex | Use |
|---|---:|---|
| `bg.app` | `#F6F8F7` | Default app background for light treatments. Dark/navy shell variants may define an equivalent shell background. |
| `bg.surface` | `#FFFFFF` | Default work surface for cards, drawers, modals, tables, and form panels. Dark/navy shells should still keep these surfaces readable and practical. |
| `bg.subtle` | `#EEF3F1` | Module tabs, table headers, read-only blocks, and other low-emphasis work surfaces. |
| `border.default` | `#D9E2DE` | Default borders and dividers. |
| `text.strong` | `#17231F` | Primary Thai text and page titles. |
| `text.default` | `#2F3D38` | Body text. |
| `text.muted` | `#64736D` | Secondary metadata; keep contrast readable. |
| `primary` | `#1F5D55` | Active nav, primary section focus, selected tabs. |
| `primary.soft` | `#DCEBE7` | Active sidebar background, soft primary chips. |
| `action` | `#2563EB` | Links and neutral operational actions. |
| `success` | `#15803D` | Ready, confirmed, completed, positive movement. |
| `warning` | `#B45309` | Waiting, attention, stock warning, missing information. |
| `danger` | `#B42318` | Destructive, blocked, high-risk, cancellation. |
| `revision` | `#6D5BD0` | Revision and Rak Samuk-related follow-up. |
| `wood.accent` | `#A66A2E` | Sparse furniture/wood accent only; never dominate the UI. |

Status chips should use tinted backgrounds and dark text rather than saturated filled pills. Examples:

- Success chip: background `#E6F4EA`, text `#166534`.
- Warning chip: background `#FEF3C7`, text `#92400E`.
- Danger chip: background `#FEE4E2`, text `#9F1239`.
- Blue/action chip: background `#E0ECFF`, text `#1D4ED8`.
- Revision chip: background `#ECE9FE`, text `#5B21B6`.
- Neutral chip: background `#EEF3F1`, text `#40504A`.

## Typography Direction

Use `Noto Sans Thai` as the primary UI typeface because Thai readability is the core requirement. Use a neutral Latin fallback such as `Inter` for Latin text and tabular numbers if the implementation stack supports mixed font stacks.

Recommended stack:

```css
font-family: "Noto Sans Thai", "Inter", system-ui, sans-serif;
```

Type scale:

| Role | Size | Weight | Notes |
|---|---:|---:|---|
| Page title | 24-28px | 700 | Admin desktop only; avoid marketing scale. |
| Section title | 18-20px | 700 | Compact, work-oriented Thai labels. |
| Card title | 15-17px | 600-700 | Dashboard/work cards. |
| Table text | 13-14px | 400-600 | Dense queues. |
| Mobile worker title | 20-24px | 700 | Large enough for shop-floor use. |
| Button text | 14-16px | 600 | Touch/mobile can use 16px. |
| Metadata/chip | 12-13px | 500-600 | Do not drop below readable contrast. |

Use tabular numbers for counts, baht amounts, quantities, and dates. Do not use negative letter spacing. Do not scale fonts with viewport width.

## Spacing and Density

Use a 4px spacing base.

| Token | Size | Use |
|---|---:|---|
| `space.1` | 4px | Icon/text gaps, compact chip gaps. |
| `space.2` | 8px | Form row gaps, chip groups. |
| `space.3` | 12px | Table cell padding, compact cards. |
| `space.4` | 16px | Section padding, panel gutters. |
| `space.5` | 20px | Desktop page gutters inside content. |
| `space.6` | 24px | Major section separation. |

Density rules:

- Desktop queue row height: 56-72px depending on thumbnail size.
- Dense table thumbnail: 40-48px square.
- Workbench drawer width: 360-440px.
- Form input height: 40px desktop, 44-48px touch/mobile.
- Icon buttons: 36-40px desktop, 44px mobile.
- Cards: 8px radius. Avoid nested cards.

## Layout Grid and Responsive Behavior

For explicit breakpoint, tablet, phone, drawer-to-sheet, and table-to-card rules, use `docs/ux-ui/design-system/responsive-mobile.md`.

Desktop admin:

- Fixed left sidebar around 240-260px.
- Top bar around 60-68px.
- Main content max width may stretch for tables; use internal gutters rather than a narrow marketing container.
- Use 12-column grid for dashboards/details; use tables for high-volume queues.

Tablet:

- Sidebar may collapse to icons or become a drawer.
- Dense tables can become stacked row cards when columns no longer fit.
- Keep search/filter controls visible above lists.

Mobile worker:

- No desktop admin sidebar.
- Use a simple top header, two or three tabs where required, and one-card-per-row work cards.
- Avoid horizontal scroll on worker screens.
- Primary action must remain visible near the relevant work detail.

## App Shell Visual Style

Use the existing `app-shell.md` as the shell baseline, refined by this file.

- Background: use `bg.app` for light treatments, or a dark/navy shell background when it improves premium operational hierarchy.
- Surfaces: use high-contrast readable work surfaces with `border.default` or an equivalent visible border and a subtle shadow such as `0 1px 2px rgba(23,35,31,0.06)`.
- Radius: 8px for cards, drawers, modals, inputs, and table containers.
- No floating hero panels, decorative gradient blobs, or glassmorphism.
- Keep page headers compact: title, count/status summary, and primary module action when the page owns creation.

## Sidebar Style

Main desktop nav labels:

- `แดชบอร์ด`
- `ออเดอร์`
- `งานสั่งทำ / ผลิต`
- `รอบจัดส่ง`
- `สินค้า / สต๊อก`
- `ลูกค้า / CRM`
- `รายจ่าย`
- `ตั้งค่า`

Visual rules:

- Thai labels left-aligned with consistent line icons.
- Active item uses `primary.soft`, a left accent bar in `primary`, and text `primary`.
- Permission-hidden nav items are removed entirely.
- Base roles see only Personal Dashboard/profile/own documents/income; do not show disabled main ERP menus.
- Avoid badges in the sidebar for `ร่างออเดอร์`; it belongs under `ออเดอร์`.

## Top Bar Style

Top bar contains page title, date, user avatar/name, role label, and account menu. Keep it quiet.

- Do not put `+ สร้างออเดอร์` in the Admin Dashboard top bar.
- Creation actions belong in their module page.
- Role label should be visible because permission affects navigation and data visibility.
- Use plain background and bottom border, not a floating marketing navbar.

## Dashboard Card Style

Use dashboard cards only for high-level launchers and short summaries.

- High-contrast readable surface, 8px radius, soft border, subtle shadow.
- Large count with tabular numbers.
- Title in Thai.
- Icon circle with soft status color.
- One concise status chip and one concise subtext line.
- Footer action link such as `เปิดคิวงาน`.
- Cards must not contain full task tables or sensitive money amounts.

## Dense Queue Table Style

Use dense tables/workbenches for admin queues with many records.

- Toolbar: search, filters, sort/group, selected-count action bar when eligible.
- Header row: `bg.subtle`, sticky where useful.
- Row: thumbnail, primary ID, Thai title, chips, compact metadata, explicit action.
- Do not make the whole row the only primary target on tables where accidental opens matter; use explicit row actions such as `เปิดออเดอร์`.
- Use pagination from `table-patterns.md`: page sizes `25`, `50`, `100`; no infinite scroll.
- Row popovers close on scroll and pagination changes.
- Bulk action eligibility must be visible before selection.

## Work Card Style

Use work cards for Job, Woodwork, Coloring, Delivery, Rak Samuk Worker, Stock Count, and mobile/tablet worker surfaces.

- Image first, then ID/source label, work name, quantity, urgency/status chips.
- Keep actions large and obvious.
- For worker cards, show only role-relevant fields.
- Put delivery date and department age as compact chips, not paragraphs.
- For Job source, always pair code and readable label: `JOB-O / งานลูกค้า`, `JOB-P / ผลิตเข้าสต๊อก`, or `JOB-P / งานผลิตพิเศษ`.

## Detail Page Style

Confirmed records use read-first detail pages.

- Top answers: what record, current state, what can happen next.
- Use full-width sections, not tabs, when the screen spec says read-first single page.
- Put section-level edit actions near the data they affect.
- Use short timelines for important events; full Management/Audit logs remain permissioned.
- Do not show editable controls inline if the active docs route changes through a guarded flow.

## Drawer Style

Drawers are for previews, focused edits, evidence/payment capture, and row context.

- Width: 360-440px desktop; full-screen sheet on mobile.
- Header shows object ID and one status chip.
- Body uses grouped sections with clear labels.
- Footer has primary action, secondary action, and cancel/close.
- If data changed while open, show stale-state notice and refresh rather than overwriting.

## Modal Style

Use modals for confirmations, blocking reasons, release/receipt summaries, and critical acknowledgements.

- Title must name the action, such as `ยืนยันรับเข้าสต๊อกวัสดุ`.
- Body summarizes consequences, not full record detail.
- Destructive or irreversible actions use `danger` styling on the primary destructive button.
- Keep confirmation text short. Do not add a second modal when the Review screen is already the confirmation step.

## Confirmation Pattern

Use confirmation when the active behavior doc requires it, including worker status moves, Shipment release, whole-Order cancellation, stock/material receipt, stock/material adjustment saves, PV finalize, and void/cancel actions.

Pattern:

- Action title.
- Affected object(s).
- What changes after confirm.
- Required evidence/reason if applicable.
- Primary confirm button in action color or danger color.
- Secondary `ยกเลิก` / `อยู่ต่อ`.

## Reason Capture Pattern

Reasons are required only for defined risky actions. One reason can cover a save batch if any included change requires it.

Visual rules:

- Show the reason field inside the confirmation/review surface, not hidden after the confirm button.
- Use a compact required label: `เหตุผล *`.
- For blocked actions, show disabled action plus reason text rather than a dead click.
- Never invent new reason requirements beyond the active behavior docs.

## Evidence / Photo Upload Pattern

Use one consistent upload block:

- Thumbnail grid with upload tile.
- Per-file status: uploading, failed with retry/remove, saved.
- Optional note field only where useful.
- For required evidence, show a required marker and block save until satisfied.
- For optional evidence, keep the block secondary so users do not think it is required.

Photo rules:

- Payment Record evidence is required.
- Shipment close requires Tracking or at least one `รูปหลักฐานจัดส่ง`.
- Delivery Team photo upload is optional before or after `ส่งออกแล้ว` until admin closes the Shipment.
- Production, stock, Expense, PV, and material evidence are optional unless a specific action says otherwise.

## Form Style

- Labels above inputs; Thai labels first.
- Required fields use `*` and validation text near the field.
- Use input types appropriate to data: amount, phone, number, date, multiline note.
- Group long forms into sections; use sticky summary for Order/Production entry.
- Preserve entered data after validation or network errors.
- Use read-only styling distinct from editable inputs.
- Use controlled-list pickers where the docs define controlled lists; avoid free-text where active docs require a list.

## Validation / Error Style

- Field errors: red text under field and red border.
- Multiple field errors: top summary plus field-level errors.
- Save/network errors: stay in the current modal/page/drawer, preserve data, show retry.
- Permission errors: `ไม่มีสิทธิ์เข้าถึงหน้านี้` with only return-to-own-home.
- Hidden sensitive data should not leave blank labels, masked values, or disabled placeholders.
- State-blocked actions remain visible but disabled with clear reason.

## Empty / Loading / No-access / Stale-state Style

Empty:

- One short Thai message.
- One relevant action only when the screen owns that action.
- No explanatory ERP training copy.

Loading:

- Use skeleton rows/cards that preserve layout size.
- Avoid layout shift in dense queues.

No access:

- Full-page or drawer state with `ไม่มีสิทธิ์เข้าถึงหน้านี้`.
- Only return-to-own-home action.
- Do not render the restricted record with hidden fields.

Stale state:

- Banner: `ข้อมูลมีการเปลี่ยนแปลง กรุณารีเฟรช`.
- Refresh latest data; do not overwrite another user's change.

## Status Chip Style

Chips are compact and semantic. They must not explain the full workflow.

Common mappings:

- Blue/action: `กำลังดำเนินการ`, `ส่งบางส่วน`, `มีจอง`.
- Green: `พร้อมสร้างรอบจัดส่ง`, `หลักฐานครบ`, `จัดส่งครบแล้ว`, `ขายได้`.
- Orange/warning: `รอวัตถุดิบ`, `รอเลขพัสดุ`, `ข้อมูลยังไม่ครบ`, `หมด`.
- Red/danger: `ยกเลิก`, `หลักฐานไม่ครบ`, severe overdue/blocked, high-risk finance issue.
- Purple: `Revision`, `รักสมุก`, `กำลังผลิต`.
- Neutral: `ร่าง`, `ปิดใช้งาน`, `รายการที่ยกเลิกแล้ว`, source labels.

Use color plus text/icon, never color alone.

## Badge / Alert Style

Operational Alerts are queue/status signals, not a separate inbox.

- Alert units: queue cards, status chips, inline warnings, toasts, critical preview items.
- Alerts resolve when underlying state changes.
- Do not repeatedly open modals/toasts for existing unresolved alerts.
- Critical preview priority follows active docs: near/overdue delivery, urgent work, old work, waiting materials, shipment confirmation waiting close.
- Financial Follow-up stays in COD/Payment queues, not the Admin Dashboard critical preview.

## Print-preview Visual Rules

Printable documents use A4 previews with controls outside the printable page.

- `ใบส่งของ`: item-focused, product images, item names, quantities, notes. No price. No COD.
- `ใบจัดส่ง`: recipient/address-focused, phone, carrier, delivery date, short item summary, COD only where relevant and permission-visible.
- `ใบสำคัญจ่าย / PV`: finalized one-payee document after payment confirmation; use formal A4 document styling.
- Print and export are permission-aware like the UI.
- Reprints use the current/closed document snapshot as defined in active docs.
- Avoid decorative backgrounds and dense app chrome inside print pages.

## Mobile Worker Shell Style

Use for Woodwork, Coloring, Delivery Team, and Rak Samuk Worker.

- Top header with role/page label and count.
- Large tabs only where needed, such as `รายการต้องจัดส่งวันนี้` / `รายการรอวันจัดส่ง`.
- Large cards with 44px minimum tap targets.
- Image thumbnail or main work image near top.
- Primary action near work summary and repeated near bottom on long details if needed.
- No desktop sidebar.
- No admin finance/customer/log panels.
- Keep text concise; full instructions should be image-led and grouped by department.

## Text Layout Stress Checks

Thai-first ERP screens must be checked with real-length operational labels and dense data before visual handoff.

Verify at `375px`, `768px`, `1024px`, and `1440px`:

- Thai text overflow
- text clipping
- text bleeding outside cards, buttons, chips, tables, drawers, or modals
- overlapping text
- icon/text collision
- chip/button/table/card text collision
- modal/drawer text overflow
- page-level horizontal overflow
- mobile/tablet text clipping
- long Thai labels wrapping badly
- dense tables breaking on small screens

Fix the layout, width, wrapping, or component pattern when text fails. Do not replace layout failures with explanatory developer copy in the product UI.

## Accessibility and Contrast Rules

- Minimum contrast: 4.5:1 for normal text; 3:1 for large text and graphical UI indicators.
- Focus states visible for keyboard navigation.
- Do not rely on color alone; pair chips with text/icons.
- All meaningful images need alt text or equivalent labels.
- Use large touch targets on worker/mobile screens.
- Respect reduced-motion preferences; keep transitions 150-250ms and avoid animated layout shifts.
- Tables must remain navigable with keyboard and screen readers.
- Long Thai text must wrap cleanly inside cards, buttons, drawers, and tables.

## Do / Don't Rules

Do:

- Use Thai-first UI labels.
- Use product/work thumbnails to aid recognition.
- Keep admin queues dense and searchable.
- Keep worker screens simple and role-limited.
- Use concise Thai business reasons for disabled state-blocked actions.
- Hide sensitive fields entirely when permission is missing.
- Use read-first detail pages for confirmed records.
- Put risky actions behind the confirmed review/confirmation patterns.
- Keep furniture warmth in images, not in overdone wood-themed UI.

Don't:

- Do not make landing-page or hero-style screens.
- Do not base active UI on archived generated mockup images.
- Do not create new mockup images from this file.
- Do not show finance amounts on the Admin Dashboard.
- Do not show customer, Order ID, payment, cost, payout, Management Log, or Audit Log on worker screens.
- Do not mask sensitive fields with placeholders; remove them.
- Do not show disabled nav/actions for missing permission.
- Do not show user-facing sector, placeholder, fixture, mock, database, in-memory, not-implemented, future-implementation, agent-workflow, or developer-instruction language.
- Do not leave dead buttons or active-looking controls that do nothing.
- Do not add unapproved workflow states, draft states, finance gates, or approval steps.
- Do not use `CRUD`, `Master`, or `ข้อมูลตั้งต้นสินค้า` in staff-facing UI.
- Do not use infinite scroll for core operational tables.

## How Future Implementation Should Use This File

Use this file as the visual baseline for future UI generation. It defines visual language, layout density, component treatment, color/typography, and state patterns.

Implementation must still read active behavior and screen specs for business rules. This file must not override:

- Domain terms in `CONTEXT.md`.
- ADR decisions.
- Interaction rules in `docs/ux-ui/04-interaction-modal-behavior.md`.
- Screen-specific behavior in `docs/ux-ui/screens/*.md`.
- Permission, finance, shipment, stock, Rak Samuk, or completed-Order rules.

When a page-specific visual guidance file exists under `docs/ux-ui/design-system/pages/`, use it together with this master file. Page-specific files narrow visual treatment for their domain but do not create new business rules.

For responsive/mobile behavior, use `docs/ux-ui/design-system/responsive-mobile.md` as the companion reference.
