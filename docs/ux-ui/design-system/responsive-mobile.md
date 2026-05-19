# THAIBORAN ERP Responsive and Mobile Design Guidance

Use this file with `docs/ux-ui/design-system/visual-design-system.md`, `docs/ux-ui/design-system/app-shell.md`, `docs/ux-ui/design-system/table-patterns.md`, `docs/ux-ui/04-interaction-modal-behavior.md`, `docs/ux-ui/03-navigation-map.md`, `docs/ux-ui/02-screen-inventory.md`, and the active screen specs under `docs/ux-ui/screens/`.

This file adds responsive and mobile visual rules only. It does not create new workflow states, permission shortcuts, business rules, API contracts, database structure, implementation tasks, or mockup images.

Permission rules are identical on desktop, tablet, and mobile. Sensitive fields, columns, actions, exports, and print data remain hidden entirely when the user lacks permission. Mobile layout must never reveal data hidden on desktop.

## 1. Breakpoint Strategy

Design and verify the ERP at these practical breakpoints:

| Breakpoint | Width | Primary use |
|---|---:|---|
| Small phone | `320-374px` | Emergency fallback only; content must remain readable. |
| Phone | `375-767px` | Worker, Delivery, Rak Samuk, simple review, evidence capture. |
| Tablet | `768-1023px` | Worker/Delivery primary, admin review, medium-density forms and queues. |
| Desktop | `1024-1439px` | Primary admin, order, finance, stock, settings, and table-heavy work. |
| Wide desktop | `1440px+` | Dense admin workbenches, side drawers, wide document previews. |

Responsive strategy:

- Build components so they can render from narrow to wide, but classify each screen by the workflow's real primary device.
- Worker and Delivery screens are mobile/tablet-first.
- Admin dashboards and queues are desktop/tablet-primary with phone fallback.
- Order Create/Edit, Order Line Edit, Shipment Builder, Finance/PV, Product/SKU, Material PO, Settings, and other dense work areas are desktop/tablet-primary with phone fallback focused on read/review/simple capture.
- No horizontal page scroll. Worker, Delivery, and Rak Samuk phone screens must have no horizontal scroll at all.
- Use stable dimensions for cards, toolbars, action bars, thumbnails, chips, and pagination so content does not jump while loading or changing state.
- Validate responsive behavior at `375`, `768`, `1024`, and `1440` widths before visual handoff.

Text layout stress checks are required at `375px`, `768px`, `1024px`, and `1440px`:

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

Fix responsive layout problems in the component pattern. Do not expose implementation status in the product UI to explain broken or future behavior.

## 2. Desktop Admin Layout Behavior

Desktop admin is the default for office-heavy THAIBORAN ERP work.

Use:

- Fixed left sidebar around `240-260px`.
- Quiet top bar around `60-68px`.
- Main work area with practical gutters, not a narrow marketing container.
- Three-column dashboard card grid for `แดชบอร์ดแอดมิน`.
- Dense tables for admin queues, with thumbnails where image recognition helps.
- Right drawers for preview, focused forms, evidence capture, and row context.
- Sticky table headers where useful, standard pagination from `table-patterns.md`, and explicit row actions.

Desktop admin should prioritize scanning many records, comparing rows, reviewing context, and completing guarded actions without decoration.

## 3. Tablet Admin Layout Behavior

Tablet is a supported working size for admins, supervisors, stock users, and delivery/production staff.

Use:

- Collapsed sidebar or nav drawer instead of a fixed wide sidebar when space is tight.
- Two-column dashboard cards, with the critical preview below.
- Summary strips that wrap cleanly into two rows.
- Search and filter controls above lists, wrapping before they overflow.
- Dense rows only when the table still fits with readable text; otherwise transform rows into stacked cards.
- Side drawers on landscape tablet only when the remaining content width stays useful. Use full-screen sheets on portrait tablet for long forms, evidence, or review-heavy drawers.
- Sticky bottom action bars for long review/edit screens only when they do not cover required data.

Tablet should feel like a compressed admin workstation, not a phone pretending to be a spreadsheet.

## 4. Mobile Worker Layout Behavior

Mobile worker screens use the simple worker shell from the visual design system.

Use:

- No desktop sidebar.
- Compact header with page label, role/account where useful, and active count.
- One-card-per-row work lists with large furniture/work images.
- Large touch actions with `44px` minimum target size and at least `8px` between adjacent controls.
- Role-relevant image groups near the top of detail screens.
- Primary action near the work summary and repeated near the bottom on long details.
- Short status chips for `งานด่วน`, `รอวัตถุดิบ`, `Revision`, source, and department state.

Worker mobile screens must not show customer data, Order ID, customer phone/address, CRM notes, payment status, sales price, cost, payout, Rak Samuk rates, Management Log, Audit Log, or controls outside the worker's role.

No worker phone screen may depend on horizontal scrolling, tiny row actions, hover-only controls, or desktop-only drawers.

## 5. Mobile Delivery Layout Behavior

Delivery screens are mobile/tablet-first.

Use:

- Header `ฝ่ายจัดส่ง`, date, and delivery count.
- Tabs for `รายการต้องจัดส่งวันนี้` and `รายการรอวันจัดส่ง`.
- Cards grouped by today/no-date or future delivery date.
- Recipient, phone, short address, carrier, and item thumbnail as the primary card content.
- Full delivery detail with readable address block, item list, optional `รูปหลักฐานจัดส่ง`, optional note, and `ส่งออกแล้ว`.
- Same-day history `ส่งออกแล้ววันนี้`.
- Bottom bulk action bar only on today's/no-date list when selected items are eligible for `บันทึกว่าส่งออกแล้ว`.

Delivery Team mobile must keep these boundaries:

- Delivery Team can see COD only for Shipments they are responsible for.
- COD is read-only and never a payment-follow-up action.
- Delivery Team does not enter Tracking.
- Delivery Team does not close Shipment.
- Delivery Team does not close COD/payment follow-up.
- Shipment creation does not appear in Delivery Team UI.

## 6. Mobile Rak Samuk Layout Behavior

Rak Samuk Worker screens are phone-first.

Use:

- Header `งานที่ต้องทำ`, worker identity, and active count.
- Assigned work cards only.
- Main image, work name, quantity, Rak Samuk instruction summary, urgent chip, and own price state.
- Own price label `ราคางานของฉัน`.
- Missing-price label `ไม่มีราคา / ให้แจ้งราคา`.
- Price proposal action `ขอเสนอราคา`.
- Price proposal form with image/instruction visible above the per-piece price input.
- Submitted state `ส่งราคาแล้ว / รออนุมัติ`.
- Secondary history link `ประวัติการทำงาน`.

Rak Samuk Worker mobile must not show customer, Order ID, sales price, standard rate, other workers' work, payout for other people, internal approval controls, payment, cost, Management Log, or Audit Log.

Owner/Manager price approval remains desktop/tablet-primary. If opened on phone, use a full-screen review sheet and avoid bulk approval.

## 7. Mobile Behavior for Order Screens

Order work is desktop/tablet-primary. Phone support is a fallback for review, lookup, simple capture, and urgent low-risk actions.

Phone behavior:

- Order Detail becomes a read-first stacked page with section anchors for `สรุปออเดอร์`, `รายการในออเดอร์`, `จัดการรอบจัดส่ง`, `รอบจัดส่งที่เกี่ยวข้อง`, `การชำระเงิน`, and `ประวัติ`.
- Use compact cards for Order Lines, showing active state, shipment state, warning chips, and one explicit open/action control.
- Keep `สถานะออเดอร์` and `สถานะจัดส่ง` visually separate.
- Use full-screen sheets for payment evidence capture, notes/corrections, shipment-line selection, and section edits that active docs allow.
- Draft Order queue can be browsed on phone, but continuing a complex draft should encourage tablet/desktop when many lines or custom details exist.
- Order Review on phone must remain complete: all warnings, stock acknowledgement, downstream result chips, and final action must be visible before confirmation.

Avoid on phone unless urgent and the full review pattern is preserved:

- Creating a large multi-line Order.
- Editing many Order Lines.
- Complex custom-work image/instruction entry.
- Financial Reconciliation decisions.
- Whole-Order cancellation.
- Owner/Manager `รอบจัดส่งพิเศษ`.

Do not add mobile shortcuts that bypass Order Review, Review Changes, stock acknowledgement, reason capture, or permission checks.

## 8. Mobile Behavior for Shipment Screens

Shipment has two distinct mobile modes: Delivery Team mobile-first work and admin phone fallback.

Admin phone fallback:

- Ready-to-Ship Queue becomes Order-grouped cards with search/filter above the list.
- Each card shows recipient/customer context where permitted, item count, source chips, COD chip only where allowed, delivery date, and `สร้างรอบจัดส่ง`.
- Shipment Builder uses a full-screen review sheet with sections for `รายการพร้อมส่ง`, `ข้อมูลจัดส่ง`, document preview links, COD signal, and final `พร้อมจัดส่ง`.
- There is no saved Shipment draft styling on any viewport.
- Exiting edited Shipment Builder uses the active unsaved warning `ออกโดยไม่สร้างรอบจัดส่ง` / `อยู่ต่อ`.
- Shipment Confirmation Queue becomes stacked Shipment cards with evidence/tracking status and action `ตรวจหลักฐาน`.
- Evidence/tracking drawer becomes a full-screen sheet on phone.

Document previews:

- `ใบส่งของ` and `ใบจัดส่ง` previews scale to fit phone width for review.
- Actual print/export controls remain permission-aware and should be secondary on phone.
- Do not expose COD in `ใบส่งของ`.
- `ใบจัดส่ง` shows COD only where relevant and permission-visible.

Bulk Shipment Creation is desktop-primary. On phone, avoid bulk creation unless the selected Orders are clearly eligible and the same review/blocked-item rules are preserved.

## 9. Mobile Behavior for Finance / Payment / PV Screens

Finance and PV screens are desktop/tablet-primary. Phone fallback focuses on review, evidence capture, notes, and urgent simple resolution.

Phone behavior:

- COD/Payment Follow-up Queue becomes cards with follow-up type, related object, status, due/age, and one primary action.
- Amounts, evidence, COD expected/actual values, and actions appear only for users with permission.
- Payment Record opens as a full-screen sheet with context block, amount/date/method, required evidence upload, and sticky save/cancel footer.
- Evidence correction uses full-screen old/new evidence comparison and required reason where active docs require it.
- Follow-up close remains guarded: show whether evidence or explanatory note exists, block COD close before related Shipment close, and keep confirmation.
- Expense Entry can capture a simple expense on phone only when fields are short and permission allows; evidence remains optional.
- Payable Items and Payout Clearing can be reviewed on phone, but selection-heavy clearing is tablet/desktop-primary.
- PV preview can be viewed on phone as scaled A4, but finalize/void should be desktop/tablet-primary unless urgent and full review, reason, permission, and print-data rules are preserved.

Do not make finance phone UI look like a lightweight public-payment flow. It remains an internal operations surface with strict hidden-field behavior.

## 10. Mobile Behavior for Product / Stock / Material Screens

Product/SKU and stock screens split into two responsive modes: product administration and physical counting/receipt work.

Product administration phone fallback:

- Product / SKU Table becomes Product Model cards with image, code/name, stock summary, status chips, and `ดูสินค้า`.
- Product Model Detail becomes stacked read-first sections with image, dimensions, `สีของสินค้า`, image groups, and actions near the relevant section.
- Ready Stock becomes SKU cards with `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้` where relevant. Quantity cells must never look editable.
- Product Settings is desktop-primary; phone may read/search values only. Close/reopen/delete and code-lock decisions should use tablet/desktop unless urgent.

Physical stock mobile:

- Stock Count is mobile/tablet-friendly and image-led.
- Count cards show image, Product Model/SKU/color, current `มีอยู่ในร้าน`, input `นับจริง`, computed `ส่วนต่าง`, reason when different, and optional evidence.
- Hide `จองแล้ว` and `ขายได้` in count entry.
- `ปิดรอบนับ` still opens a Review page before movement creation.
- Product Stock Receipt can be phone-friendly for warehouse receipt entry when the PO context is simple; block over-receipt inline and preserve Review before save.
- Material Adjustment can be phone-friendly for actual counted quantities, with session evidence and confirmation before save.

Material/Product purchase documents are desktop/tablet-primary. Phone fallback may review and attach evidence. Stock-changing receipt follows the active screen's approved device target: `SUP-019` Product Stock Receipt can be phone-friendly; `SUP-016` Material Purchase Order receipt remains desktop/tablet-primary unless the active screen spec changes.

## 11. Mobile Behavior for Customer / CRM Screens

Customer/CRM is desktop/tablet-primary with useful phone fallback for lookup and simple context.

Phone behavior:

- Customer List becomes search-first cards with customer name, primary phone, tier/status chips, match chips, province/postal code, and `เปิดลูกค้า`.
- Customer Detail becomes a stacked read-first page ordered as Summary, Address, `CRM Note Timeline`, `Order History`, and `Service Case History`.
- Address cards remain readable and show `ที่อยู่หลัก`, recipient, phone, structured address, and action area.
- CRM Note entry can open as a full-screen sheet with note content and optional images where allowed.
- Customer Sales Summary appears only where permitted and must not become an accounting/forecasting surface.
- Settings remain permission-aware; restricted settings direct links show no-access, not partially rendered controls.

Avoid customer merge, bulk customer actions, export, private CRM notes, and role/permission editing on phone unless active docs later approve them.

## 12. Mobile-first Screens

These screens should be designed mobile/tablet-first:

- `WDW-001` Woodwork Work Queue - `งานที่ต้องทำ`.
- `WDW-002` Woodwork Job Work Card - mobile work detail/actions.
- `WDW-003` Woodwork History - `ประวัติงานของฉัน`.
- `CLR-001` Waiting for Coloring Intake - `รอรับเข้าโรงงานสี`.
- `CLR-002` Coloring Work Queue - `งานที่ต้องทำ`.
- `CLR-003` Coloring Job Work Card - coloring detail/actions.
- `CLR-004` Coloring History - `ประวัติงานของฉัน`.
- `DLV-001` Delivery Dashboard - `ฝ่ายจัดส่ง`.
- `DLV-002` Today Delivery List - `รายการต้องจัดส่งวันนี้`.
- `DLV-003` Waiting-date Delivery List - `รายการรอวันจัดส่ง`.
- `DLV-004` Delivery Shipment Detail / Optional Photo - `รายละเอียดรอบจัดส่ง`.
- `DLV-005` Same-day Sent-out History - `ส่งออกแล้ววันนี้`.
- `RSK-003` Rak Samuk Worker Work List - `งานที่ต้องทำ`.
- `RSK-004` Rak Samuk Price Proposal - `ไม่มีราคา / ให้แจ้งราคา`.
- `RSK-007` Rak Samuk Worker History - `ประวัติการทำงาน`.
- `SUP-007` Stock Count - `ตรวจนับสต๊อกสินค้า`, because physical counting benefits from phone/tablet capture.

These screens must not require desktop tables, hover states, or horizontal scroll to complete their primary job.

## 13. Tablet-supported Screens

Tablet is supported for all mobile-first screens and most desktop/tablet screens in the screen inventory.

Tablet-supported admin and operations groups:

- Admin Dashboard and admin queues: `ADM-001`, `ADM-002`, `ADM-003`, `ADM-004`, `ADM-005`, `ADM-006`, `ADM-008`.
- Order screens: `ORD-001` through `ORD-007`.
- Job/admin production screens: `JOB-001` through `JOB-006`, plus `JOB-003` Revision acknowledgement on mobile/tablet where opened by affected users.
- Internal Rak Samuk assignment/receive/approval: `RSK-001`, `RSK-002`, `RSK-005`, `RSK-006`.
- Shipment admin screens: `SHP-001`, `SHP-002`, `SHP-004`.
- Management overview/detail: `MGR-001`, `MGR-002`.
- Customer/CRM: `SUP-000`, `SUP-001`, `SUP-002`, `SUP-013`.
- Product/stock/material: `SUP-014`, `SUP-003`, `SUP-004`, `SUP-005`, `SUP-006`, `SUP-008`, `SUP-018`, `SUP-019`, `SUP-015`, `SUP-016`, `SUP-017`, `SUP-009`.
- Expense Entry: `SUP-010`.

Tablet does not mean every table keeps all desktop columns. Use stacked rows/cards, wrapped filters, and full-screen sheets whenever readability drops.

## 14. Desktop-primary with Mobile Fallback Only

These screens should be optimized first for desktop or desktop/tablet. Phone fallback should allow safe read/review/simple capture, not full high-volume work.

Desktop-primary:

- `ADM-007` COD/Payment Follow-up Queue.
- `SHP-005` Delivery Note Preview.
- `SHP-006` Shipping Sheet Preview.
- `SHP-007` Bulk Shipment Creation.
- `MGR-003` Aging Threshold Settings.
- `SUP-011` Payment Voucher.
- `SUP-012` Product Settings.
- Roles / Permissions settings.

For these desktop-primary screens, phone fallback is limited to safe read/review/simple capture described in the domain sections above. It must not turn PV, COD/Payment follow-up, bulk Shipment creation, Product Settings, or Roles / Permissions into phone-first workflows.

Other desktop/tablet-primary groups with phone fallback:

- Admin Dashboard and dense admin queues except `ADM-007`.
- Order Create/Edit, Order Review, Order Detail, All Orders, Draft Order Queue, and Order Line Edit.
- Production Job Entry, Production Review, Draft Production Queue.
- Ready-to-Ship Queue, Shipment Builder, Released Shipment Detail, Shipment Confirmation Queue.
- Expense Entry.
- Product / SKU Table, Product Model Detail, SKU Variant Detail, Ready Stock, Product PO, Material Stock, Material PO.
- Customer List, Customer Detail, CRM Notes, Service Case.

Phone fallback must never add mobile-only shortcuts around confirmation, reason capture, evidence requirements, stale-state refresh, permission checks, COD final-round rules, PV finalization rules, or completed-Order immutability.

## 15. Actions to Avoid on Phone Unless Urgent

Avoid these actions on phone unless the user has permission, the screen preserves the full active review/confirmation pattern, and the action is operationally urgent. This list does not grant phone availability by itself; it only identifies risky actions where a permitted phone fallback exists.

- Creating a complex multi-line Order or custom-work-heavy Order.
- Saving Order Line Edit with financial reconciliation.
- Whole-Order cancellation.
- Owner/Manager `รอบจัดส่งพิเศษ`.
- Bulk Shipment Creation.
- Releasing a complex Shipment with many selected lines.
- Post-close Shipment item/address/carrier/COD correction.
- COD amount correction.
- Closing finance follow-up with abnormal COD note.
- Creating/finalizing/voiding PV.
- Owner/Manager Rak Samuk price approval batches.
- Product Settings close/reopen/delete decisions.
- Role/permission changes.
- Product Model/color deactivation.
- Material Purchase Order receipt when many linked Jobs will be released.
- Product Stock Receipt when many SKU lines are involved.
- Stock Count close or Material Adjustment save when the Review page has many differences.
- Print/export actions where the user must inspect exact A4 output.

When one of these must be possible on phone, use a full-screen review sheet/page with clear consequences, required reason/evidence where applicable, and one final primary action.

## 16. Drawer-to-full-screen-sheet Rules

Desktop drawers become full-screen sheets on phone.

Rules:

- At phone widths, do not use side drawers.
- At portrait tablet widths, prefer full-screen sheet for forms, evidence, long previews, and Review Changes.
- Header must show object ID, title, one status chip, and close/back.
- Body uses grouped sections with clear Thai labels.
- Footer is sticky only for current-sheet actions and contains primary, secondary, and cancel/close where needed.
- Preserve scroll position on the underlying list when the sheet closes.
- If data changed while open, show stale-state notice and refresh rather than saving over newer data.
- Full-screen sheet should not hide required warnings behind collapsed sections.
- If the sheet is opened from a table/card, return focus to that same row/card after close.

Use full-screen sheets for Payment Record, evidence correction, Shipment evidence/tracking review, CRM note entry, worker confirmation, Rak Samuk proposed price, and narrow edit surfaces.

## 17. Table-to-card Rules

Dense tables transform into cards when columns no longer fit without harming readability.

Card anatomy:

1. Primary image or compact icon.
2. Primary ID or title.
3. Secondary identity, such as customer/work/recipient where permitted.
4. Status/source/risk chips.
5. Two to four critical metadata values.
6. One primary action.
7. Secondary actions in an overflow or details area.

Rules:

- Keep search, filter, sort, and pagination. Pagination remains the list control; do not replace core tables with infinite scroll.
- Do not copy every desktop column onto the card face.
- Put less-important values inside an expandable detail area.
- Do not render hidden sensitive fields as blank card rows.
- Keep row/card height stable during loading.
- Admin phone cards may be read/review-oriented; worker and delivery cards must be action-ready.
- Inner horizontal scroll may be used only for exact document/table preview contexts where card transformation would destroy meaning. It must never create page-level horizontal scroll and must never be required on worker screens.

## 18. Sticky Action Rules on Mobile

Sticky action bars help long mobile screens, but they can easily hide context.

Use sticky actions when:

- The primary action is the natural next step for the current detail or review.
- The action remains valid for all visible selected items.
- Required warnings, evidence, and reasons are visible before the user can confirm.
- There is enough bottom padding so the bar does not cover content.

Rules:

- One primary action per sticky bar.
- Secondary action may be `ยกเลิก`, `กลับ`, or `บันทึกไว้ก่อน` where active docs allow.
- Destructive actions should not live alone in a sticky bar without visible context and confirmation.
- On worker screens, primary actions may appear near the top and repeat near the bottom.
- On queue selection screens, selected-count bars must show count and eligibility, not just a button.

## 19. Form Sectioning Rules on Mobile

Long forms become stacked sections, not new workflows.

Rules:

- Keep Thai labels above inputs.
- Use section headers and anchors for long pages.
- Use accordions only when collapsed sections still show completion/error state.
- Never hide required errors inside a collapsed section without a section-level error marker.
- Use input heights `44-48px` on touch devices.
- Put contextual help/error text under the field it belongs to.
- Preserve entered data after validation, network, or permission errors.
- Use sticky summary only when it does not obscure entry fields.
- Split visual sections by business meaning: Customer, Address, Order Lines, Payment, Custom Work Detail, Evidence, Review, not by arbitrary screen size.

Phone forms should reduce density through grouping, not through missing required context.

## 20. Evidence / Photo Upload Mobile Rules

Evidence and photo upload must feel natural on phone while preserving the active evidence rules.

Use:

- Camera/file upload tile with clear Thai label.
- Thumbnail grid with upload, uploading, failed, retry/remove, and saved states.
- Large remove/retry buttons with accessible labels.
- Optional note field only where useful.
- Image preview that can open full-screen for inspection.
- Per-file error text such as `แนบรูปหลักฐานไม่สำเร็จ`.
- Progress/loading state that does not shift the whole form.

Required evidence remains limited to active rules:

- Payment Record evidence is required.
- Shipment close requires Tracking or at least one delivery evidence photo.
- Delivery Team photo upload is optional before/after `ส่งออกแล้ว` until Admin closes.
- Production, stock, Expense, PV, and material evidence are optional unless the active behavior doc says otherwise.

Do not make optional evidence look mandatory on mobile. Do not block save for optional evidence upload failure; allow retry/remove according to the active behavior.

## 21. No-access / Error / Stale-state Mobile Rules

No-access:

- Show `ไม่มีสิทธิ์เข้าถึงหน้านี้`.
- Provide only the return-to-own-home/first-screen action.
- Do not render restricted record data with hidden fields.
- Do not show masked sensitive values or disabled placeholders.

Validation and save errors:

- Stay on the same page/sheet.
- Preserve entered data.
- Show field-level errors and a top summary when multiple fields fail.
- Keep the first invalid section reachable through section anchors or auto-scroll.

Stale state:

- Show `ข้อมูลมีการเปลี่ยนแปลง กรุณารีเฟรช`.
- Refresh latest data before action continues.
- Do not overwrite another user's change.
- On queue action success, stay in the queue, update/remove the item, focus the next item where applicable, and show a short toast/banner.

Network failure:

- Provide retry.
- Do not create unplanned drafts or local-only workflow states.

## 22. Print / Export Behavior on Mobile

Print and export are permission-aware on every viewport.

Mobile behavior:

- A4 previews scale to fit width for review.
- Print/export controls sit outside the printable page.
- Use a compact action bar above or below preview; avoid covering the document.
- If exact A4 inspection is difficult on phone, show a calm note that the document is optimized for desktop/tablet print preview while still allowing permitted review.
- Exported/printed data follows the user's visible data. Hidden fields do not appear in mobile export or print.
- `ใบส่งของ` has no price and no COD.
- `ใบจัดส่ง` may show COD only where relevant and permission-visible.
- PV print/reprint remains for finalized one-payee PV.

Do not invent phone-only document formats that change document meaning.

## 23. Accessibility and Touch Target Rules

Responsive implementation must meet these accessibility rules:

- Minimum normal text contrast `4.5:1`; large text and graphical indicators `3:1`.
- Touch targets at least `44px` square on mobile and tablet.
- Adjacent touch targets separated by at least `8px`.
- Focus states visible for keyboard and switch navigation.
- Do not rely on color alone; chips need text and/or icons.
- Long Thai text wraps cleanly inside buttons, chips, cards, tables, and sheets.
- No negative letter spacing.
- Do not scale font sizes with viewport width.
- Respect reduced-motion preferences.
- Keep transitions short, about `150-250ms`, and avoid animated layout shifts.
- Use safe-area padding for bottom sticky bars on modern phones.
- Keep inputs usable when the software keyboard is open.
- Meaningful images need alt text or equivalent labels.

## 24. Do / Don't Rules for Responsive Implementation

Do:

- Treat worker, delivery, and Rak Samuk worker screens as mobile/tablet-first.
- Treat dense admin, order, finance, stock, and settings work as desktop/tablet-primary with honest phone fallbacks.
- Keep phone actions close to their context.
- Convert dense tables to cards when readability drops.
- Turn drawers into full-screen sheets on phone.
- Keep permission filtering and sensitive-field hiding identical across viewport sizes.
- Keep Thai-first labels and established internal terms.
- Use image thumbnails for furniture/work recognition.
- Preserve all active confirmation, reason, evidence, stale-state, and review patterns.
- Keep disabled action reasons in concise Thai business language.
- Hide future-sector actions on small screens unless workflow context truly requires a disabled business-state explanation.

Don't:

- Do not force every finance/admin/table-heavy workflow into a fully optimized phone spreadsheet.
- Do not block mobile access entirely where safe read/review/simple capture is useful.
- Do not expose hidden finance/customer/worker data on mobile.
- Do not use horizontal scroll on worker, delivery, or Rak Samuk mobile work screens.
- Do not add mobile-only shortcuts around approved behavior.
- Do not add saved Shipment drafts, finance gates, approval steps, or workflow states.
- Do not show disabled missing-permission nav/actions.
- Do not use hover-only actions.
- Do not leave dead buttons or active-looking controls that do nothing.
- Do not show sector, placeholder, fixture, mock, database, in-memory, not-implemented, future-implementation, agent-workflow, or developer-instruction language in responsive product UI.
- Do not create new mockup images from this guidance.
- Do not treat archived mockups or old image prompts as source of truth.
