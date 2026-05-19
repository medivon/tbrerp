# Current Implementation Task

Status: ready for review
Sector: Sector 3 - Order Read/Create Foundation modal interaction fix
Task owner: Codex implementer
Date started: 2026-05-19
Date completed: 2026-05-19

## Goal

Repair the Order Create/Edit interaction foundation so customer selection, ready-stock selection, and custom-work detail entry use visible modal/structured entry surfaces, update the current in-memory Order state immediately, and continue to keep Review fixture/in-memory only without implying real persistence.

## Scope

- Make `เลือกลูกค้า` open a customer search/select modal and remove the `เพิ่มลูกค้าในออเดอร์` action for this sector.
- Make `เพิ่มสินค้าพร้อมส่ง` open a Product/SKU search modal and add a ready-stock line only after selection/quantity confirmation.
- Make `เพิ่มงานสั่งทำ` open a structured custom-work entry modal with woodwork, coloring/decorating, and Rak Samuk instruction fields.
- Update visible summary/completeness state when customer, quantity, selected SKU/color, structured custom-work detail, or Payment Term changes.
- Keep Order Review read-only and clearly marked as in-memory or fixture-backed for this sector.
- Add focused tests for the create/edit in-memory interactions and Review handoff/fallback behavior.

## Visual Intent

- Mood: premium operational ERP Order workbench, Thai-first, calm, and practical for admin entry work.
- Density: preserve the dense editor plus sticky summary pattern; line editors should be compact but readable with labels on every control.
- Shell/palette: keep the existing dark/navy app shell and light readable work surfaces; use restrained chips and warnings for fixture/in-memory state.
- Modal/workbench behavior: selection happens in focused, searchable, keyboard-friendly dialogs with clear row hierarchy, stock labels, quantity controls, and visible close/cancel paths.
- Custom-work behavior: structured production detail appears as department instruction blocks, not a plain text bucket; incomplete fields are visible and block Review/confirmation without creating `JOB-O`.
- Component polish: explicit cursor/hover/focus states, stable line-card controls, clear disabled/no-real-persistence language, and readable Thai wrapping.
- Responsive behavior: editor controls should stack cleanly on phone/tablet without horizontal scroll; summary remains usable when it moves below content.
- What not to do: no marketing UI, no decorative gradients/animation, no real save/confirmation side effects, no hidden sensitive data, and no invented workflow states.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP order entry modal search product customer custom work dense Thai`.
- React stack query: `modal list search form accessibility focus state React`.
- Applied guidance: data-dense dashboard/workbench hierarchy, focused searchable modal patterns, labeled form controls, keyboard/focus handling, clear hover/focus/cursor states, and responsive stacked controls.

## Out of Scope

- No database schema, Prisma models, migrations, seed data, API contracts, or real persistence.
- No real Order record, Order ID creation, confirmation mutation, JOB-O creation, stock reservation, Shipment creation, Payment/COD action, or finance mutation.
- No business-rule changes, invented workflow states, unrelated module work, or sensitive finance/cost/profit/payout exposure.

## Source Docs To Read

- `AGENTS.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `docs/implementation/current-task.md`
- `docs/implementation/review-report.md`
- `docs/implementation/task-handoff-template.md`
- `CONTEXT.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `docs/ux-ui/design-system/visual-design-system.md`
- `docs/ux-ui/design-system/responsive-mobile.md`
- `docs/ux-ui/design-system/pages/order.md`
- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`
- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`

## Permission and Sensitive Data Rules

- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled with reason.
- Sensitive fields are omitted before rendering for users without permission.
- No sensitive data in fixtures, tests, logs, screenshots, exports, or print previews.

## Implementation Notes

- State is React/module memory only for this sector.
- Review may read the current in-memory entry state after client-side navigation, or fall back to safe fixture data with an explicit fixture label.
- `ยืนยันสร้างออเดอร์` remains mocked/foundation-only and must not create a real Order or downstream records.
- Ready-stock and custom-work add/edit/remove interactions update the visible Order Lines section and sticky summary immediately.
- Payment Term, ready SKU/color, quantity, stock warning state, and custom-work detail completeness are derived from the current in-memory entry state.

## Behavior Implemented

- `เลือกลูกค้า` opens a customer search/select modal backed by safe fixture customers; selecting one updates the customer section, recipient/address draft, and summary completeness.
- `เพิ่มลูกค้าในออเดอร์` is removed from Order Create because new customer creation is excluded from this sector.
- `เพิ่มสินค้าพร้อมส่ง` opens a Product/SKU search modal with product imagery/placeholders, color/SKU, sellable stock labels, quantity controls, and disabled sold-out rows.
- Confirming a product modal selection adds a ready-stock line to the current browser-memory Order entry state.
- `เพิ่มงานสั่งทำ` opens a structured custom-work entry modal with work name, quantity, dimensions, `รายละเอียดช่างไม้`, `รายละเอียดฝ่ายสี/ตกแต่ง`, `รายละเอียดรักสมุก`, reference image placeholder, and internal note.
- Confirming a custom-work modal adds or updates a custom-work line; incomplete custom-work detail remains visibly incomplete and blocks Review.
- Quantity edits, structured custom-work detail edits, line removal, and Payment Term edits recalculate summary counts, quantity, totals, warnings, and completeness text.
- Order Review reads the current in-memory Order entry state after client navigation and labels direct/fallback data as fixture-backed.
- Review remains a mock/foundation confirmation surface and clearly says it does not write to the database.

## Files Changed

- `apps/web/src/features/orders/order-create.tsx`
- `apps/web/src/features/orders/order-review.tsx`
- `apps/web/src/features/orders/order-entry-state.ts`
- `apps/web/src/features/orders/order-entry-memory-store.ts`
- `apps/web/src/features/orders/components/customer-select-modal.tsx`
- `apps/web/src/features/orders/components/product-select-modal.tsx`
- `apps/web/src/features/orders/components/custom-work-entry-modal.tsx`
- `apps/web/src/features/orders/components/order-entry-modal-shell.tsx`
- `apps/web/src/features/orders/components/order-entry-line-editor.tsx`
- `apps/web/src/features/orders/orders.test.tsx`
- `apps/web/e2e/sector-3-orders-smoke.spec.ts`
- `docs/implementation/current-task.md`

## Checks Run

- `pnpm --filter @thaiboran/web test -- orders.test.tsx` - passed
- `pnpm lint` - passed
- `pnpm typecheck` - passed
- `pnpm test` - passed
- `pnpm format:check` - passed after formatting the edited Order files
- `pnpm build` - passed
- `CI=1 pnpm exec playwright test --pass-with-no-tests --workers=1` - passed, 180 Playwright tests
- Note: the first full e2e attempt failed because Playwright reused a stale dev server after `next build` rewrote `.next`; the stale server showed a Next runtime missing-chunk error. The stale server was stopped, generated `.next` was cleared, and the clean rerun passed.

## Known Gaps or Blockers

- No source-doc conflicts found.
- No blockers.
- Real persistence, real Draft save, real Order confirmation, JOB-O creation, stock reservation, Shipment creation, and Payment/COD mutations remain excluded.

## Reviewer Focus

- Verify Order Create interactions are local browser-memory only and do not imply database persistence.
- Verify customer selection modal, Product/SKU selection modal, and structured custom-work modal are not dead controls and close predictably.
- Verify ready-stock/custom-work add/edit/remove behavior updates both line list and summary.
- Verify incomplete custom-work detail is visible and blocks Review without creating `JOB-O`.
- Verify Review clearly distinguishes current in-memory data from fixture fallback data.
- Verify no real Order ID, JOB-O, reservation, Shipment, Payment/COD action, or sensitive finance/cost/profit/payout data is introduced.
