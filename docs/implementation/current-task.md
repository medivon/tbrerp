# Current Implementation Task

Status: ready for review
Sector: Sector 5 Function Detail Repair - Job / Worker / Rak Samuk
Task owner: Codex implementer
Date started: 2026-05-20

## Goal

Repair implemented Sector 5 Job, Worker, and Rak Samuk screens so every visible control works with fixture/local state, is hidden by permission, or is disabled with a Thai business reason. Remove staff-facing implementation copy, complete existing search/filter behavior, recheck worker/Rak Samuk sensitive-data boundaries, and verify Thai layout at 375, 768, 1024, and 1440 px.

## Visual Intent

- Mood: premium operational ERP, Thai-first, calm, image-led, and practical for real production staff.
- Density: dense admin Job tables for scanning, large mobile/tablet worker cards for shop-floor use, compact status chips, and no marketing-style hero composition.
- Shell/palette: keep the existing dark/navy shell for hierarchy while preserving readable light work surfaces for tables, cards, forms, modals, and worker actions.
- Component polish goals: working filters, clear business feedback, visible hover/focus/cursor states, stable action grids, wrapped Thai labels, and image thumbnails that help identify furniture work.
- Responsive behavior: verify overview tables/card fallback, worker card actions, price chips, dialogs, note/photo areas, and long Thai instruction text at 375, 768, 1024, and 1440 px with no horizontal overflow.
- What not to do: no database/API/schema/migration, no real persistence/auth/session, no Shipment creation, no Payment/COD action, no PV finalization, no payout clearing, no stock/material movement, no Customer/CRM or Settings implementation, no new workflow states, no business-rule changes, and no staff-facing implementation terms.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP production worker queue Thai responsive accessibility dense operations`.
- Applied guidance: data-dense operational hierarchy, Noto Sans Thai readability, focus rings, hover/cursor affordances, responsive images, working filtering, and breakpoint checks at 375/768/1024/1440.
- Ignored guidance: unrelated video/hero recommendations because THAIBORAN Sector 5 screens are operational ERP work surfaces.

## Source Docs Read

- `AGENTS.md`
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
- `docs/implementation/sector-plan.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/reviewer-checklist.md`
- `docs/implementation/current-task.md`
- `docs/implementation/review-report.md`

## Planned Behavior

- Job overview search/source/status/department filters visibly filter fixture Jobs and keep sensitive finance/log data out.
- Job Detail remains read-first, keeps Job ID/source/status/current department visible, structures woodwork/coloring/Rak Samuk instructions, and uses business copy in the action panel.
- Woodwork, Coloring, and Coloring Intake actions update page-local state with business-facing feedback, including required note capture for `รอวัตถุดิบ`.
- Rak Samuk assignment requires one active worker before send, confirms send, then shows local assigned state without rates or customer/finance detail.
- Rak Samuk Worker pages show only own assigned work, own price/proposed-price state, and no workflow-moving controls.
- Missing-price proposal uses a per-piece input, validates positive price, confirms submit, and shows `ส่งราคาแล้ว / รออนุมัติ`.
- Owner/Manager price approval requires the Product Model standard-rate decision when applicable, confirms approval, and keeps Finance out.
- Receive-back always routes to `รอรับเข้าโรงงานสี`, has optional note/photo UI only, no destination picker, no evidence requirement, and no payout/PV detail.

## Explicit Exclusions

- No Prisma schema, migrations, database tables, seed data, API contracts, server actions, real persistence, real auth/session, or business-rule changes.
- No Shipment creation, Payment/COD action, PV finalization, payout clearing, payroll, stock/material movement, Customer/CRM implementation, Settings implementation, real Management Log persistence, or real Audit Log persistence.
- No invented workflow states, approval steps, finance gates, reports, or permission names.
- No archived mockups, legacy screenshots, or generated image prompts as source of truth.

## Checks To Run

- `pnpm --filter @thaiboran/domain test -- job-workflow.test.ts`
- `pnpm --filter @thaiboran/web test -- jobs.test.tsx`
- `pnpm --filter @thaiboran/web typecheck`
- `pnpm --filter @thaiboran/web lint`
- `pnpm -w exec playwright test apps/web/e2e/sector-5-jobs-worker-rak-samuk.spec.ts --project=chromium`
- `pnpm -w exec playwright test apps/web/e2e/sector-1-smoke.spec.ts --project=chromium`

## Files Changed

- `packages/domain/src/job-workflow.ts`
- `packages/domain/src/job-workflow.test.ts`
- `apps/web/src/features/jobs/job-overview.tsx`
- `apps/web/src/features/jobs/job-detail.tsx`
- `apps/web/src/features/jobs/woodwork-queue.tsx`
- `apps/web/src/features/jobs/coloring-work-queue.tsx`
- `apps/web/src/features/jobs/coloring-intake-queue.tsx`
- `apps/web/src/features/jobs/fixtures/jobs.ts`
- `apps/web/src/features/jobs/jobs.test.tsx`
- `apps/web/src/features/worker/worker-shell.tsx`
- `apps/web/src/features/worker/components/worker-job-card.tsx`
- `apps/web/src/features/rak-samuk/rak-samuk-assignment.tsx`
- `apps/web/src/features/rak-samuk/rak-samuk-worker-work-list.tsx`
- `apps/web/src/features/rak-samuk/rak-samuk-missing-price.tsx`
- `apps/web/src/features/rak-samuk/rak-samuk-price-approval.tsx`
- `apps/web/src/features/rak-samuk/rak-samuk-receive-back.tsx`
- `apps/web/src/shared/navigation/navigation.ts`
- `apps/web/src/shared/navigation/navigation.test.ts`
- `apps/web/src/shared/app-shell/user-selector.tsx`
- `apps/web/e2e/sector-5-jobs-worker-rak-samuk.spec.ts`
- `apps/web/e2e/sector-1-smoke.spec.ts`

## Checks Run

- `pnpm --filter @thaiboran/domain test -- job-workflow.test.ts` - passed
- `pnpm --filter @thaiboran/domain typecheck` - passed
- `pnpm --filter @thaiboran/web test -- jobs.test.tsx` - passed
- `pnpm --filter @thaiboran/web typecheck` - passed
- `pnpm --filter @thaiboran/web lint` - passed
- `pnpm -w exec playwright test apps/web/e2e/sector-5-jobs-worker-rak-samuk.spec.ts --project=chromium` - passed, 64 tests across 375/768/1024/1440
- `pnpm -w exec playwright test apps/web/e2e/sector-1-smoke.spec.ts --project=chromium` - passed, 16 tests across 375/768/1024/1440

## Known Gaps or Blockers

- No known blockers.
- E2E must be run through the root Playwright config. Running Playwright from the app package bypasses `baseURL` and fails before loading routes.
