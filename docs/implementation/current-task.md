# Current Implementation Task

Status: ready for review
Sector: Sector 3 - Order Read/Create Foundation button workflow and modal polish
Task owner: Codex implementer
Date started: 2026-05-19
Date completed: 2026-05-19

## Goal

Repair Sector 3 Order buttons and controls so anything that looks active produces visible local UI behavior, while future-sector actions remain disabled with visible Thai reasons. Also polish Order Create/Edit selection modals so the ready-stock picker works cleanly on phone widths and the custom-work modal exposes structured image-reference slots without real upload or persistence.

## Scope

- Make Order list search, status filters, shipment filter, clear filters, and pagination work with fixture-only React state.
- Make Draft Order queue search and clear filters work with fixture-only React state.
- Keep future mutation actions disabled but show visible reasons, not only `title` tooltips.
- Let Order Detail shipment selection checkboxes update local UI state before routing to the existing Shipment Builder placeholder route.
- Polish Order Create/Edit product/custom-work modal behavior without adding persistence or upload.
- Prevent mobile horizontal overflow in the ready-stock product modal.
- Add fixture-only custom-work reference-image slots for `รูปหลัก`, `รูปสำหรับช่างไม้`, `รูปสำหรับฝ่ายสี/ตกแต่ง`, and `รูปสำหรับรักสมุก`.

## Visual Intent

- Mood: premium operational ERP workbench, Thai-first, dense, and practical for admin scanning.
- Density: keep tables/cards compact; filters and pagination should feel like real operational tools, not decorative controls.
- Shell/palette: retain the current dark/navy shell with readable light work surfaces and restrained chips.
- Button workflow behavior: active controls give immediate visual feedback; blocked controls remain visible only when state-blocked and show clear Thai reasons.
- Filter behavior: search/filter chips use hover, focus, and selected states that are obvious without animation-heavy treatment.
- Responsive behavior: filter toolbars wrap cleanly and pagination remains usable on phone/tablet without horizontal overflow.
- Modal behavior: product and custom-work modals stay dense but readable on phone widths; controls wrap rather than forcing horizontal scroll.
- Custom-work images: show practical fixture-only image-reference affordances grouped by production use, without implying real upload.
- What not to do: no marketing UI, no DB/API persistence, no real Draft/Order/JOB-O/Shipment/Payment mutation, no hidden sensitive data, and no invented workflow states.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP order list filters pagination disabled buttons dense Thai operations workbench`.
- React stack query: `React local filter pagination button workflow accessibility`.
- Modal design-system query: `ERP order entry mobile modal dense Thai operational dashboard`.
- React stack query: `responsive modal form input horizontal overflow accessibility`.
- Applied guidance: data-dense dashboard/workbench hierarchy, visible hover/focus/cursor states, clear disabled-state explanations, stateful filter/pagination controls with Thai-readable wrapping, labeled modal fields, focus-managed dialogs, and mobile controls constrained to avoid horizontal overflow.

## Out of Scope

- No database schema, Prisma models, migrations, seed data, API contracts, or real persistence.
- No real Order record, Draft save, confirmation mutation, JOB-O creation, stock reservation, Shipment creation, Payment/COD action, or finance mutation.
- No business-rule changes, invented workflow states, unrelated module work, or sensitive finance/cost/profit/payout exposure.

## Permission and Sensitive Data Rules

- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled with visible reason.
- Sensitive fields are omitted before rendering for users without permission.
- No sensitive data in fixtures, tests, logs, screenshots, exports, or print previews.

## Implementation Notes

- State is React/browser memory only for this sector.
- Order list and Draft queue filters reset locally and do not become saved user preferences.
- Pagination is fixture-only; no infinite scroll and no server/data fetching.
- Shipment selection on Order Detail changes only the current UI selection and does not persist selected line IDs.
- Existing links to implemented or placeholder module pages remain intact.
- Product selection modal quantity controls use short visible labels with accessible product/SKU context to avoid Thai text forcing phone overflow.
- Custom-work image slot selection only updates the current modal UI and reference note placeholder; it does not upload, store, or attach files.

## Behavior Implemented

- Order list search filters Order ID, customer/recipient, phones, address, Job ID, product/SKU/work text, shipment fields, status text, and timeline text from fixture data only.
- Order status chips now toggle a single local status filter, while `รอยืนยันการจัดส่ง` remains a separate shipment-summary filter.
- `ล้างตัวกรอง`, empty-state reset, page-size selector, and pagination boundary buttons now produce visible local UI state.
- Draft Order queue search filters Draft No., customer, phone, recipient, item summary, owner, status, and missing-data chips without ever showing real Order IDs.
- Create/Edit, Review, Order Line Edit, and blocked Order Detail actions now show visible Thai reasons for future-sector disabled behavior.
- Ready-stock product modal now prevents mobile horizontal overflow, wraps product/SKU text, and keeps the full product/SKU context available to assistive labels.
- Custom-work modal now shows `รูปอ้างอิงงานสั่งทำ` with fixture-only image slots for `รูปหลัก`, `รูปสำหรับช่างไม้`, `รูปสำหรับฝ่ายสี/ตกแต่ง`, and `รูปสำหรับรักสมุก`, plus visible no-upload/no-persistence language.
- Order Detail shipment-selection rows now allow local ready-line check/uncheck, keep blocked lines disabled with reason chips, and disable `สร้างรอบจัดส่งจากรายการที่เลือก` when nothing is selected.
- Shared `PageHeader` action layout now wraps on small screens so visible disabled reasons do not create phone horizontal overflow.

## Files Changed

- `apps/web/src/features/orders/order-list-state.ts`
- `apps/web/src/features/orders/order-list.tsx`
- `apps/web/src/features/orders/draft-order-queue.tsx`
- `apps/web/src/features/orders/order-detail.tsx`
- `apps/web/src/features/orders/order-create.tsx`
- `apps/web/src/features/orders/order-review.tsx`
- `apps/web/src/features/orders/order-line-edit.tsx`
- `apps/web/src/features/orders/components/order-entry-modal-shell.tsx`
- `apps/web/src/features/orders/components/product-select-modal.tsx`
- `apps/web/src/features/orders/components/custom-work-entry-modal.tsx`
- `apps/web/src/features/orders/orders.test.tsx`
- `apps/web/e2e/sector-3-orders-smoke.spec.ts`
- `packages/ui/src/page-header.tsx`
- `docs/implementation/current-task.md`

## Checks Run

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm format:check`
- `pnpm build`
- `pnpm test:e2e apps/web/e2e/sector-3-orders-smoke.spec.ts` - passed, 60 Playwright tests
- `pnpm test:e2e` - passed, 184 Playwright tests
- `CI=1 pnpm exec playwright test apps/web/e2e/sector-3-orders-smoke.spec.ts --pass-with-no-tests --workers=1` - passed, 60 Playwright tests
- `rm -rf apps/web/.next && CI=1 pnpm exec playwright test --pass-with-no-tests --workers=1` - passed, 184 Playwright tests
- Note: the first Sector 3 Playwright attempt reused a stale dev server on port 3000 and showed old UI behavior. The stale server was stopped, generated `.next` output was cleared, and the clean rerun passed.

## Exclusions Preserved

- No database schema, Prisma model, migration, seed data, API contract, or real persistence was added.
- No real Order, Draft save, confirmation mutation, JOB-O creation, stock reservation, Shipment creation, Payment/COD action, or finance mutation was added.
- No real custom-work image upload, file storage, attachment persistence, or image API was added.
- No business rules or workflow states were changed.
- No sensitive finance/cost/profit/payout data was added to fixtures, UI, tests, logs, screenshots, exports, or print previews.

## Reviewer Focus

- Verify every active Sector 3 button/control has visible behavior.
- Verify future-sector mutation actions are disabled with visible Thai reasons.
- Verify Order list and Draft queue interactions are fixture-only and do not imply persistence.
- Verify Order Detail shipment selection is local UI state only and does not create Shipment records.
- Verify ready-stock product modal has no phone-width horizontal overflow and quantity inputs stay usable.
- Verify custom-work image slots are clearly fixture-only and do not imply real upload/persistence.
- Verify no real Order/Draft/JOB-O/stock/Shipment/Payment mutation or sensitive finance/cost/profit/payout data is introduced.
