# Current Implementation Task

Status: ready for review
Sector: Sector 3 - Order Read/Create Foundation interaction fix
Task owner: Codex implementer
Date started: 2026-05-19
Date completed: 2026-05-19

## Goal

Fix the Order Create/Edit in-memory interaction foundation so adding, editing, and removing ready-stock/custom-work lines updates the visible Order Lines section and completeness summary immediately, and so Order Review clearly receives or falls back to fixture-backed in-memory data without implying real persistence.

## Scope

- Add React in-memory state behavior for `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`.
- Update visible summary/completeness state when quantity, selected SKU/color, custom-work detail, or Payment Term changes.
- Keep Order Review read-only and clearly marked as in-memory or fixture-backed for this sector.
- Add focused tests for the create/edit in-memory interactions and Review handoff/fallback behavior.

## Visual Intent

- Mood: premium operational ERP Order workbench, Thai-first, calm, and practical for admin entry work.
- Density: preserve the dense editor plus sticky summary pattern; line editors should be compact but readable with labels on every control.
- Shell/palette: keep the existing dark/navy app shell and light readable work surfaces; use restrained chips and warnings for fixture/in-memory state.
- Component polish: explicit cursor/hover/focus states, stable line-card controls, clear disabled/no-real-persistence language, and readable Thai wrapping.
- Responsive behavior: editor controls should stack cleanly on phone/tablet without horizontal scroll; summary remains usable when it moves below content.
- What not to do: no marketing UI, no decorative gradients/animation, no real save/confirmation side effects, no hidden sensitive data, and no invented workflow states.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP order create edit dense Thai operations workbench`.
- React stack query: `React in-memory form state responsive dashboard accessibility`.
- Applied guidance: data-dense dashboard/workbench hierarchy, labeled form controls, lazy local state initialization, clear hover/focus/cursor states, and responsive stacked controls.

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

- `เพิ่มสินค้าพร้อมส่ง` appends a ready-stock line to the current browser-memory Order entry state.
- `เพิ่มงานสั่งทำ` appends a custom-work line with an embedded `รายละเอียดงานสั่งทำ` editor.
- Quantity edits, SKU/color selection, custom-work detail edits, line removal, and Payment Term edits recalculate summary counts, quantity, totals, warnings, and completeness text.
- Order Review reads the current in-memory Order entry state after client navigation and labels direct/fallback data as fixture-backed.
- Review remains a mock/foundation confirmation surface and clearly says it does not write to the database.

## Files Changed

- `apps/web/src/features/orders/order-create.tsx`
- `apps/web/src/features/orders/order-review.tsx`
- `apps/web/src/features/orders/order-entry-state.ts`
- `apps/web/src/features/orders/order-entry-memory-store.ts`
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
- `pnpm test:e2e` - passed, 180 Playwright tests
- Note: the first full e2e attempt failed because Playwright reused a stale dev server after `next build` rewrote `.next`; the stale server showed a Next runtime missing-chunk error. The stale server was stopped, generated `.next` was cleared, and the clean rerun passed.

## Known Gaps or Blockers

- No source-doc conflicts found.
- No blockers.
- Real persistence, real Draft save, real Order confirmation, JOB-O creation, stock reservation, Shipment creation, and Payment/COD mutations remain excluded.

## Reviewer Focus

- Verify Order Create interactions are local browser-memory only and do not imply database persistence.
- Verify ready-stock/custom-work add/edit/remove behavior updates both line list and summary.
- Verify Review clearly distinguishes current in-memory data from fixture fallback data.
- Verify no real Order ID, JOB-O, reservation, Shipment, Payment/COD action, or sensitive finance/cost/profit/payout data is introduced.
