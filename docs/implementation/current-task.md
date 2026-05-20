# Current Implementation Task

Status: ready for review
Sector: Sector 3 - Order Read/Create Foundation
Task owner: Codex implementer
Date started: 2026-05-20

## Goal

Repair Sector 3 Order screen functions so visible buttons, filters, modals, local state, Review handoff, and text layout behave like a usable staff-facing Order workbench while preserving the no-database/no-API foundation.

## Visual Intent

- Mood: premium operational ERP workbench, Thai-first, dense, structured, and readable.
- Density: keep list, create, review, detail, and line-edit surfaces compact enough for admin scanning.
- Shell/palette: preserve the existing dark/navy shell and readable light work surfaces.
- Component polish goals: Product Model-first ready-stock selection, clearer Draft/Review handoff, business-only disabled reasons, safer table/modal wrapping, and visible local preview feedback.
- Responsive behavior: no page-level horizontal overflow, modal overflow, text clipping, chip/button collision, or Thai text bleeding at 375, 768, 1024, and 1440 px.
- What not to do: no marketing UI, no internal implementation copy, no real persistence, no database/API/schema/migration, no real stock/JOB-O/Shipment/Payment mutation, and no business-rule changes.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP order admin dashboard dense Thai responsive modal search`.
- React stack query: `responsive modal table card search filter accessibility overflow`.
- Applied guidance: data-dense dashboard/workbench hierarchy, clear search/list controls, labeled form inputs, modal focus handling, hover/focus/cursor affordances, and stable responsive wrapping.

## Source Docs Read

- `AGENTS.md`
- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `docs/ux-ui/03-navigation-map.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`
- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`
- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`
- `docs/ux-ui/screens/SCR-ORD-006-all-orders-list.md`
- `docs/ux-ui/screens/SCR-ORD-007-order-line-edit.md`
- `docs/ux-ui/design-system/visual-design-system.md`
- `docs/ux-ui/design-system/responsive-mobile.md`
- `docs/ux-ui/design-system/pages/order.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/reviewer-checklist.md`
- `docs/implementation/current-task.md`
- `docs/implementation/review-report.md`

## Behavior Implemented

- Added browser-session Order Entry and Draft helpers for local Create-to-Review handoff, Draft continuation, and Draft No.-only save/update behavior.
- Draft queue now includes saved session drafts, keeps Draft Orders free of Order IDs, and `ทำต่อ` loads a matching Draft into Order Create.
- Order Create now has a working `บันทึกร่าง`, Thai-first payment labels, stricter Review handoff, and missing-draft business empty state.
- Ready-stock product selection is Product Model-first, with SKU/color variants, quantity controls, sellable-stock labels, and an explicit no-stock selection path.
- Order Review now guards direct visits without active Order entry state, while explicit scenario routes preserve the pure Sector 4 confirmation foundation.
- Order lists now include created-date filtering, tab-scoped status filters, separate shipment filtering, closed/cancelled metrics, and safer table/card wrapping.
- Order Detail disables completed-order shipment management from the menu with a business reason and keeps shipment selection local only.
- Order Line Edit now supports local preview edits for editable lines, local ready/custom additions, Review Changes preview, and disabled non-mutating save with business reason.
- Tests and e2e were updated for draft save/continue, product selector behavior, Review guarding, date filters, and line-edit preview.

## Files Changed

- `apps/web/src/app/modules/orders/review/page.tsx`
- `apps/web/src/features/orders/draft-order-queue.tsx`
- `apps/web/src/features/orders/order-create.tsx`
- `apps/web/src/features/orders/order-detail.tsx`
- `apps/web/src/features/orders/order-entry-memory-store.ts`
- `apps/web/src/features/orders/order-entry-state.ts`
- `apps/web/src/features/orders/order-line-edit.tsx`
- `apps/web/src/features/orders/order-line-edit-state.ts`
- `apps/web/src/features/orders/order-list-state.ts`
- `apps/web/src/features/orders/order-list.tsx`
- `apps/web/src/features/orders/order-review.tsx`
- `apps/web/src/features/orders/components/order-line-edit-preview.tsx`
- `apps/web/src/features/orders/components/product-select-modal.tsx`
- `apps/web/src/features/orders/components/order-workbench-table.tsx`
- `apps/web/src/features/orders/orders.test.tsx`
- `apps/web/e2e/sector-3-orders-smoke.spec.ts`
- `apps/web/e2e/sector-4-order-confirmation.spec.ts`
- `docs/implementation/current-task.md`

## Checks Run

- `pnpm lint` - passed
- `pnpm typecheck` - passed
- `pnpm test` - passed, 72 tests
- `pnpm format:check` - passed
- `pnpm build` - passed
- `CI=1 pnpm exec playwright test apps/web/e2e/sector-3-orders-smoke.spec.ts apps/web/e2e/sector-4-order-confirmation.spec.ts --workers=1` - passed, 76 tests
- `CI=1 pnpm test:e2e` - passed, 200 tests

## Explicit Exclusions Preserved

- No Prisma schema, migrations, database tables, seed data, API contracts, server actions, or real persistence.
- No real Order, Draft, JOB-O, stock reservation, Shipment, Payment, COD, Stock/Material, Customer/CRM, Finance, Settings, or report mutation.
- No business-rule changes, invented workflow states, sensitive finance/cost/profit/payout/payment-evidence exposure, Management Log UI, or Audit Log UI.
- No archived mockups or implementation/internal product copy used as staff-facing UI.

## Reviewer Focus

- Verify all visible Order buttons either work locally, are hidden, or are disabled with Thai business reasons.
- Verify Draft No.-only behavior and no Order ID leakage in Draft queue/save/continue flows.
- Verify Product Model-first ready-stock selection, no-stock toggle, and custom-work image/detail entry.
- Verify Review does not show stale hardcoded data after Create changes and direct Review without active state is guarded.
- Verify Order status and Shipment status remain separate, especially `รอยืนยันการจัดส่ง`.
- Verify Line Edit local preview does not imply a real save or trigger stock/JOB-O/shipment/payment effects.
- Verify no staff-facing implementation language or sensitive data appears, and responsive Order surfaces remain clean at 375/768/1024/1440.

## Known Gaps or Blockers

- None identified.
