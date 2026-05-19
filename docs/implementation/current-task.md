# Current Implementation Task

Status: ready for review
Sector: Sector 4 - Order Confirm + JOB-O Creation
Task owner: Codex implementer
Date started: 2026-05-20

## Goal

Complete the fixture-backed Order Review confirmation foundation so a valid Review can confirm into a deterministic confirmed Order result, generate safe read-only `JOB-O` outputs for complete custom-work lines, show ready-stock reservation outcomes, preserve warning acknowledgements, and route/display the resulting Order Detail without database persistence.

## Scope

- Add and polish pure Order confirmation domain logic using fixture/in-memory inputs only.
- Show Order Review confirmation readiness, blocked reasons, warning acknowledgement, confirmation result, generated `JOB-O` references, ready-stock reservation outcomes, fixture activity events, and Order Detail destination.
- Show confirmed Order Detail with generated `JOB-O` references and read-first result state.
- Keep Shipment, Payment/COD, Stock movement, CRM, Finance, Settings, worker queues, and full Job module actions disabled or absent according to current sector boundaries.
- Verify responsive text wrapping, clipping, and bleeding at Order Review / confirmation result / Order Detail breakpoints.

## Visual Intent

- Mood: premium operational ERP workbench, Thai-first, dense, and consequence-focused.
- Density: keep Order Review and Order Detail compact enough for admin scanning while still making downstream effects obvious.
- Shell/palette: preserve the current dark/navy shell with readable light work surfaces and restrained warning/success/revision chips.
- Component polish goals: confirmation consequences should be clearer than decorative summaries; generated `JOB-O` and reservation outcomes should wrap safely and never expose sensitive finance/cost/payout/log data.
- Responsive behavior: no horizontal page scroll, no text clipping, no text bleeding outside cards/buttons/chips at 375, 768, 1024, and 1440 widths.
- What not to do: no marketing page, no second confirmation modal, no real persistence, no Prisma/database/API schema, no real stock movement, no Shipment/Payment workflow, no full Job module, and no new business states.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP order review confirmation job creation responsive text overflow Thai dense operations`.
- UX query: `text overflow clipping Thai responsive dashboard cards buttons`.
- React stack query: `React responsive text wrapping cards table accessibility overflow`.
- Applied guidance: keep text readable and wrapping inside constrained cards/buttons/chips, avoid blind clipping, preserve horizontal scroll only inside intentional table wrappers, and verify responsive widths.

## Source Docs Read

- `AGENTS.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `docs/implementation/current-task.md`
- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `docs/ux-ui/03-navigation-map.md`
- `docs/ux-ui/design-system/visual-design-system.md`
- `docs/ux-ui/design-system/responsive-mobile.md`
- `docs/ux-ui/design-system/pages/order.md`
- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`
- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`
- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`
- `docs/ux-ui/screens/SCR-ORD-007-order-line-edit.md`

## Out of Scope

- No Prisma schema, migrations, database tables, seed data, API contracts, or real persistence.
- No real Order/Draft/Job/Shipment/Payment/Stock mutation.
- No Shipment creation, Delivery workflow, Payment/COD action, Product/Stock movement, Material workflow, Customer/CRM implementation, Finance/PV behavior, Settings/Role management, full Job module, or worker queues.
- No business-rule changes, invented workflow states, sensitive finance/cost/profit/payout exposure, Management Log UI, or Audit Log UI.

## Permission and Sensitive Data Rules

- Missing-permission confirmation access routes to no-access.
- State-blocked confirmation actions remain disabled with visible Thai reasons.
- Only Owner, Manager, and Admin/Sales fixture roles can confirm.
- Sensitive fields are omitted before rendering; no cost, profit, payout, payment evidence, Management Log, or Audit Log appears in fixtures, tests, UI, logs, screenshots, exports, or print previews.

## Implementation Notes

- Pure confirmation logic lives in `packages/domain/src/order-confirmation.ts`; this task keeps it fixture/dev deterministic and covered by domain tests rather than adding persistence.
- Confirmation IDs are deterministic fixture/dev IDs only and must remain clearly labeled as non-production.
- Order Review is the final confirmation surface; `ยืนยันสร้างออเดอร์` must not open a second modal.
- Stock-insufficient acknowledgement is one inline Review acknowledgement and creates fixture Activity Log-like events only.
- Ready-stock reservation outcomes are directional read models only; they do not update persistent stock quantity or create Stock Movement.
- `JOB-O` output is read-only safe production context only; no full Job actions or worker queues.
- Create Order custom-work reference image slot behavior remains fixture-only/in-memory: selected slots update the modal note, selected buttons become disabled, and manual reference notes are preserved.

## Files Changed

- `packages/domain/src/order-confirmation.test.ts`
- `packages/ui/src/button.tsx`
- `packages/ui/src/status-chip.tsx`
- `packages/ui/src/surface-card.tsx`
- `packages/ui/src/page-header.tsx`
- `packages/ui/src/section-header.tsx`
- `apps/web/src/features/orders/order-review.tsx`
- `apps/web/src/features/orders/order-detail.tsx`
- `apps/web/src/features/orders/order-create.tsx`
- `apps/web/src/features/orders/order-entry-state.ts`
- `apps/web/src/features/orders/orders.test.tsx`
- `apps/web/src/features/orders/components/review-impact-panel.tsx`
- `apps/web/src/features/orders/components/order-line-card.tsx`
- `apps/web/src/features/orders/components/order-entry-line-editor.tsx`
- `apps/web/src/features/orders/components/order-entry-modal-shell.tsx`
- `apps/web/src/features/orders/components/custom-work-entry-modal.tsx`
- `apps/web/src/features/orders/components/customer-select-modal.tsx`
- `apps/web/src/features/orders/components/product-select-modal.tsx`
- `apps/web/e2e/sector-3-orders-smoke.spec.ts`
- `apps/web/e2e/sector-4-order-confirmation.spec.ts`
- `docs/implementation/current-task.md`

## Checks Run

- `pnpm lint` - passed
- `pnpm typecheck` - passed
- `pnpm test` - passed
- `pnpm format:check` - passed
- `pnpm build` - passed
- `CI=1 pnpm exec playwright test apps/web/e2e/sector-3-orders-smoke.spec.ts apps/web/e2e/sector-4-order-confirmation.spec.ts --workers=1` - passed, 72 tests
- `CI=1 pnpm test:e2e` - passed, 196 tests

## Known Gaps or Blockers

- None identified.

## Reviewer Focus

- Verify Sector 4 domain logic is pure and fixture-backed.
- Verify Review confirmation result shows confirmed Order ID, generated `JOB-O`, ready-stock reservation outcome, acknowledged warnings, and next Order Detail destination.
- Verify Order Detail shows the confirmed fixture result and keeps Shipment/Payment actions disabled/placeheld.
- Verify responsive text wrapping and no clipping/bleeding at required breakpoints.
- Verify exclusions: no DB/API/persistence/Shipment/Payment/Stock movement/full Job/sensitive data.
