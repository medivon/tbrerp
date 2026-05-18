# Current Implementation Task

Status: ready for review
Sector: Sector 5 - Job / Worker / Rak Samuk
Task owner: Codex implementer
Date started: 2026-05-19
Date completed: 2026-05-19

## Goal

Implement fixture-backed Job, worker, and Rak Samuk workflow surfaces as one coherent reviewable slice: Job overview/detail, Woodwork queue, Coloring intake/work queues, Rak Samuk assignment, Rak Samuk Worker own-work views, missing-price proposal, Owner/Manager price approval, and receive-back/intake foundation.

## Scope

- Job overview / active Jobs and read-first Job Detail / Work Card foundation.
- Mobile/tablet Woodwork and Coloring worker queues with fixture-backed in-memory actions only.
- Coloring intake staging queue distinct from active Coloring work.
- Rak Samuk assignment, worker own-work list/detail, missing-price/proposed-price foundation, Owner/Manager approval foundation, and receive-back to `รอรับเข้าโรงงานสี`.
- Safe fixtures, pure domain helpers, route wiring, permission-aware navigation/actions, and tests for sensitive-data boundaries.

## Visual Intent

- Premium operational production workspace for THAIBORAN: Thai-first, image-led, restrained, and work-focused.
- Admin Job screens use dense workbench rows, compact metrics, filters, thumbnails, current department/status chips, and explicit `เปิด Job` actions.
- Worker screens are mobile/tablet-first with large-tap cards, practical image crops, clear disabled reasons, and no customer/payment/cost/payout/business-sensitive data.
- Rak Samuk screens make assigned work and own price/proposed price clear without exposing standard rates or other workers' payout.
- Existing dark/navy shell is retained; main work surfaces stay readable and practical for dense ERP work.
- Avoided marketing UI, decorative animation, low-contrast dark content surfaces, and workflow shortcuts not present in source docs.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP production operations dashboard worker mobile Thai dense image-led`.
- React stack query: `dense responsive operations cards forms accessibility`.
- Applied guidance: dense operational workbench hierarchy, mobile worker card ergonomics, large tap targets, hover/focus/cursor states, stable responsive cards/tables, clear image handling, and no horizontal overflow at responsive checkpoints.
- Project visual source of truth remains `docs/ux-ui/design-system/visual-design-system.md`, `responsive-mobile.md`, and `pages/job-worker-rak-samuk.md`.

## Out of Scope

- No real database, Prisma schema, migrations, seed data, persistence, or real workflow writes.
- No API contracts, real auth/session, real permission management, or worker payroll automation.
- No Shipment creation, Payment/COD action, PV finalization, payout clearing, Stock/Material movement, Customer/CRM implementation, Settings implementation, or full production accounting.
- No Management Log or Audit Log persistence.
- No new worker revision/request workflow beyond source docs.
- No Rak Samuk prices in Order, Production, or Job workflow pages where docs forbid it.

## Source Docs Read

- `AGENTS.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `docs/implementation/current-task.md`
- `docs/implementation/review-report.md`
- `docs/implementation/task-handoff-template.md`
- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `docs/ux-ui/03-navigation-map.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/design-system/visual-design-system.md`
- `docs/ux-ui/design-system/responsive-mobile.md`
- `docs/ux-ui/design-system/pages/job-worker-rak-samuk.md`
- `docs/ux-ui/screens/SCR-ADM-003-active-jobs-overview.md`
- `docs/ux-ui/screens/SCR-JOB-002-job-detail-work-card.md`
- `docs/ux-ui/screens/SCR-WOOD-001-woodwork-queue.md`
- `docs/ux-ui/screens/SCR-COLOR-001-coloring-intake-queue.md`
- `docs/ux-ui/screens/SCR-COLOR-002-coloring-work-queue.md`
- `docs/ux-ui/screens/SCR-RS-001-rak-samuk-assignment-queue.md`
- `docs/ux-ui/screens/SCR-RS-002-rak-samuk-worker-work-list.md`
- `docs/ux-ui/screens/SCR-RS-003-rak-samuk-missing-price.md`
- `docs/ux-ui/screens/SCR-RS-004-rak-samuk-price-approval.md`

## Permission and Sensitive Data Rules

- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled and show the reason.
- Sensitive fields are omitted before rendering for users without permission.
- Worker views do not receive customer, Order ID, payment, sales price, cost, payout, Management Log, or Audit Log data.
- Rak Samuk Worker sees only assigned work and own price/proposed-price state.
- Rak Samuk Worker cannot move workflow status or mark work complete.
- Finance is not the approver for Rak Samuk proposed prices.

## Implementation Notes

- Added pure `@thaiboran/domain` Job/Rak Samuk workflow helpers for role access, worker-visible work filtering, proposal submission rules, memory-only action simulation, and receive-back routing.
- Added safe fake fixtures for Jobs, worker users, and Rak Samuk work; worker-facing mappers return sanitized data.
- Wired new routes under `/modules/jobs` while keeping route/page files thin.
- Job overview/detail surfaces are admin/manager oriented and fixture-backed only.
- Woodwork and Coloring actions update local UI state and report `persisted: false`; no database/API/write contract was added.
- Coloring completed JOB-O visually routes to admin `รอสร้างรอบจัดส่ง`, not directly to Delivery Team.
- Rak Samuk assignment requires immediate worker selection and confirmation before fixture-only send state.
- Missing price proposal is per-piece; submitted state is `ส่งราคาแล้ว / รออนุมัติ`.
- Owner/Manager approval shows proposed per-piece price, quantity, computed total preview, and standard-rate update prompt; Finance remains blocked.
- Receive-back always routes to `รอรับเข้าโรงงานสี`; no destination picker or evidence requirement was added.
- Existing Sector 1 e2e placeholder smoke was updated to use `รอบจัดส่ง` because Jobs is now implemented.

## Files Changed

- `packages/domain/src/job-workflow.ts`
- `packages/domain/src/job-workflow.test.ts`
- `packages/domain/src/index.ts`
- `apps/web/src/shared/fixtures/users.ts`
- `apps/web/src/shared/permissions/access.ts`
- `apps/web/src/shared/permissions/access.test.ts`
- `apps/web/src/shared/navigation/navigation.ts`
- `apps/web/src/shared/navigation/navigation.test.ts`
- `apps/web/src/features/orders/order-detail.tsx`
- `apps/web/src/features/jobs/**`
- `apps/web/src/features/worker/**`
- `apps/web/src/features/rak-samuk/**`
- `apps/web/src/app/modules/jobs/**`
- `apps/web/e2e/sector-1-smoke.spec.ts`
- `apps/web/e2e/sector-5-jobs-worker-rak-samuk.spec.ts`
- `docs/implementation/current-task.md`

## Checks Run

- UI UX Pro Max design-system query - passed.
- UI UX Pro Max React stack query - passed.
- `pnpm --filter @thaiboran/domain test` - passed.
- Focused web tests for Sector 5 - passed during implementation.
- `pnpm lint` - passed.
- `pnpm typecheck` - passed.
- `pnpm test` - passed.
- `pnpm format:check` - passed.
- `pnpm build` - passed.
- `pnpm test:e2e` - passed: 124 tests.

## Known Gaps or Blockers

- No source-doc conflicts found.
- Browser plugin discovery did not expose an in-app browser tool in this session; responsive route/browser verification was covered by Playwright e2e at 375, 768, 1024, and 1440 widths.
- All Job/Rak Samuk workflow effects remain fixture-backed or local UI state only by design.

## Reviewer Focus

- Verify worker and Rak Samuk Worker views do not receive or render sensitive fields.
- Verify Rak Samuk standard rates and other workers' payout are not exposed outside allowed Owner/Manager approval context.
- Verify memory-only actions are clearly non-persistent and do not imply real workflow writes.
- Verify receive-back has no destination picker and always lands at `รอรับเข้าโรงงานสี`.
- Verify the new UI stays operational, dense, Thai-first, and readable across worker and admin breakpoints.
