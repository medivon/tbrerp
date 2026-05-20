# Current Implementation Task

Status: ready for review
Sector: Sector 4 - Order Confirm + JOB-O Creation Foundation
Task owner: Codex implementer
Date started: 2026-05-20

## Goal

Repair the fixture-backed Order Review confirmation path so it blocks exactly the documented invalid states, confirms without a second modal, hands off to a generated read-first Order Detail, shows safe `JOB-O` output, and presents ready-stock reservation outcomes directionally only.

## Visual Intent

- Mood: premium operational ERP confirmation surface, Thai-first, calm, dense, and read-first.
- Density: keep Order Review complete enough for final confirmation while moving the post-confirm success summary to compact Order Detail context.
- Shell/palette: preserve the existing dark/navy shell with high-contrast light work surfaces, warning panels, and success banners.
- Component polish goals: cleaner confirmation readiness states, compact generated-detail banner, safe `JOB-O` production context, wrapped warning/result chips, and visible business reasons for blocked actions.
- Responsive behavior: keep Review, generated Detail, warnings, disabled reasons, long SKU/JOB-O IDs, and result banners free of overflow, clipping, overlap, or chip/button collisions at 375, 768, 1024, and 1440 px.
- What not to do: no marketing UI, no internal implementation copy, no database/API/schema/migration, no real persistence, no real stock movement, no Shipment creation, no Payment/COD action, no full Job module, no worker queue, no sensitive finance/cost/profit/payout/evidence/log exposure, and no business-rule changes.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP order confirmation Thai admin review responsive dense`.
- UX query: `order review responsive validation accessibility overflow`.
- Applied guidance: data-dense operational hierarchy, Noto Sans Thai readability, labelled controls, hover/focus affordances, no clipped content, no unintentional horizontal overflow, and breakpoint checks at 375/768/1024/1440.

## Source Docs Read

- `AGENTS.md`
- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `docs/ux-ui/03-navigation-map.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`
- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`
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

- Order Review keeps `ยืนยันสร้างออเดอร์` as the final action with no second confirmation modal, then hands off to generated Order Detail.
- Confirmation covers missing Order Lines, stale input, incomplete custom-work detail, missing Payment Term, base-role blocking, and one acknowledgement for multiple stock warnings.
- Generated `JOB-O` read models whitelist safe production context fields and keep internal notes/sensitive finance/log data out.
- Ready-stock reservation outcomes remain directional result records only, with no real stock movement or persistent update model.
- Generated Order Detail shows a compact success banner with Order ID, `JOB-O`, safe production context, reservation outcome, and `ยังไม่สร้างรอบจัดส่ง`.
- Generated Order Detail is read-first for this slice: Shipment creation and Order line edit actions are disabled with Thai business reasons, and full Job links are hidden from Order Detail.
- Review/detail/e2e coverage checks responsive text/layout and internal-copy exclusions across 375, 768, 1024, and 1440 px.

## Files Changed

- `packages/domain/src/order-confirmation.ts`
- `packages/domain/src/order-confirmation.test.ts`
- `apps/web/src/features/orders/order-entry-state.ts`
- `apps/web/src/features/orders/fixtures/orders.ts`
- `apps/web/src/features/orders/order-confirmation-result-store.ts`
- `apps/web/src/features/orders/order-review.tsx`
- `apps/web/src/features/orders/components/review-impact-panel.tsx`
- `apps/web/src/features/orders/order-detail.tsx`
- `apps/web/src/features/orders/orders.test.tsx`
- `apps/web/e2e/sector-4-order-confirmation.spec.ts`
- `apps/web/e2e/sector-3-orders-smoke.spec.ts`
- `docs/implementation/current-task.md`

## Checks Run

- `pnpm --filter @thaiboran/domain typecheck` - passed
- `pnpm --filter @thaiboran/web typecheck` - passed
- `pnpm --filter @thaiboran/web lint` - passed
- `pnpm --filter @thaiboran/domain test -- order-confirmation.test.ts` - passed, 32 tests
- `pnpm --filter @thaiboran/web test -- orders.test.tsx` - passed, 77 tests
- `pnpm test:e2e apps/web/e2e/sector-4-order-confirmation.spec.ts --project=chromium` - passed, 28 tests
- `pnpm test:e2e apps/web/e2e/sector-3-orders-smoke.spec.ts --project=chromium` - passed, 72 tests

## Explicit Exclusions Preserved

- No Prisma schema, migrations, database tables, seed data, API contracts, server actions, or real persistence.
- No real Order, Draft, stock movement, persistent stock update, Shipment, Payment, COD, Stock/Material, Customer/CRM, Finance, Settings, report mutation, full Job module, or worker queue.
- No business-rule changes, invented workflow states, manager approval for stock warnings, stock-warning reason requirement, sensitive finance/cost/profit/payout/payment-evidence exposure, Management Log UI, or Audit Log UI.
- No archived mockups or implementation/internal product copy used as staff-facing UI.

## Reviewer Focus

- Verify Order Review remains the final confirmation surface and does not open a second modal.
- Verify confirmation blocks missing customer, missing recipient/address, missing Payment Term, no lines, incomplete custom detail, missing stock acknowledgement, stale input, and base roles.
- Verify one stock acknowledgement covers multiple warnings without manager approval or reason.
- Verify generated `JOB-O` output exposes only safe production context.
- Verify ready-stock reservation outcome is directional only and does not imply real stock movement.
- Verify generated Order Detail is read-first, shows a compact success/result banner after confirm, keeps Order and Shipment status separate, and does not expose live Shipment/Payment/COD actions for this scope.
- Verify no staff-facing implementation language or sensitive data appears, and responsive Order surfaces remain clean at 375/768/1024/1440.

## Known Gaps or Blockers

None identified.
