# Current Implementation Task

Status: ready for review
Sector: Sector 6 Function Detail Repair - Shipment / Delivery
Task owner: Codex implementer
Date started: 2026-05-20

## Goal

Repair implemented Sector 6 Shipment/Delivery screens so every visible control works with fixture/local state, is hidden by permission, or is disabled with a Thai business reason. Remove staff-facing implementation copy, complete ready/confirmation search and filters, tighten Delivery Team responsibility/COD boundaries, and verify Thai layout at 375, 768, 1024, and 1440 px.

## Visual Intent

- Mood: premium operational ERP, Thai-first, calm, delivery-focused, and practical for real admin and delivery staff.
- Density: dense admin queues for ready-to-ship and confirmation work; mobile/tablet-first delivery cards with large tap targets; A4 previews remain document-like and uncluttered.
- Shell/palette: keep the dark/navy operational shell for admin hierarchy, while delivery-team work uses a simpler worker-like surface and all main content remains high-contrast and readable.
- Component polish goals: working filters/search, clear selected-row state, visible hover/focus/cursor states, disabled business reasons, responsive evidence panels, stable action bars, and wrapped Thai labels in cards, chips, buttons, tables, modals, and print previews.
- Responsive behavior: verify queue table-to-card fallback, delivery cards, evidence review panel/sheet, sticky action bars, print preview scaling, and long Thai address/note text at 375/768/1024/1440 with no page-level horizontal overflow.
- What not to do: no database/API/schema/migration, no real persistence/auth/session, no carrier API, no barcode/label printer, no real upload/storage, no real Shipment persistence, no Order completion update, no Payment/COD close, no stock movement, no Customer/CRM or Settings implementation, no new workflow states, no business-rule changes, and no staff-facing implementation terms.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP shipment delivery Thai responsive accessibility dense operations`.
- Applied guidance: Thai-readable typography, clear focus rings, hover/cursor affordances, disabled-state clarity, responsive table/card behavior, accessible print controls, and breakpoint checks at 375/768/1024/1440.
- Ignored guidance: unrelated video/hero, exaggerated-minimal landing-page, map integration, and broad color-palette recommendations because THAIBORAN Sector 6 screens are operational ERP work surfaces.

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
- `docs/ux-ui/design-system/pages/shipment-delivery.md`
- `docs/ux-ui/screens/SCR-SHIP-001-ready-to-ship-queue.md`
- `docs/ux-ui/screens/SCR-SHIP-002-shipment-builder.md`
- `docs/ux-ui/screens/SCR-ADM-005-shipment-confirmation-queue.md`
- `docs/ux-ui/screens/SCR-DEL-001-delivery-dashboard.md`
- `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`
- `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`
- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/reviewer-checklist.md`
- `docs/implementation/current-task.md`
- `docs/implementation/review-report.md`

## Planned Behavior

- Ready-to-ship queue search/source/date/COD/bulk filters visibly filter Order-grouped ready work and keep the selected panel aligned with the chosen row/card.
- Shipment Builder remains temporary, has no saved draft action, keeps COD read-only/final-round gated, acknowledges stock warnings without reason/manager approval, and shows staff-facing release/cancel copy only.
- Delivery Team dashboard uses delivery-focused card UI, supports single and bulk send-out, updates same-day history, and lets optional delivery photo/note changes show in local state without looking required.
- Admin confirmation queue search/filter works, admin can add/correct Tracking or delivery evidence, and close is allowed only with Tracking or at least one delivery evidence photo.
- Shipment detail and print previews are responsibility/permission-aware; Delivery Note never shows COD/price; Shipping Sheet shows COD only where relevant and visible.
- Staff-facing UI avoids sector, placeholder, fixture/mock, local-state, database/backend, not-implemented, future-work, persistence, and agent/developer wording.

## Explicit Exclusions

- No Prisma schema, migrations, database tables, seed data, API contracts, server actions, real persistence, real auth/session, or business-rule changes.
- No carrier API, barcode/label printer, real upload/storage, Shipment persistence, Order completion update, Payment/COD close, Stock movement, Customer/CRM implementation, Settings implementation, real Management Log persistence, or real Audit Log persistence.
- No invented workflow states, approval steps, finance gates, reports, permission names, or business modules.
- No archived mockups, legacy screenshots, or generated image prompts as source of truth.

## Checks To Run

- `pnpm --filter @thaiboran/domain test -- shipment-workflow.test.ts`
- `pnpm --filter @thaiboran/web test -- shipments.test.tsx`
- `pnpm --filter @thaiboran/web typecheck`
- `pnpm --filter @thaiboran/web lint`
- `pnpm -w exec playwright test apps/web/e2e/sector-6-shipment-delivery.spec.ts --project=chromium`
- `pnpm -w exec playwright test apps/web/e2e/sector-1-smoke.spec.ts --project=chromium`

## Files Changed

- `packages/domain/src/shipment-workflow.ts`
- `packages/domain/src/shipment-workflow.test.ts`
- `apps/web/src/shared/fixtures/users.ts`
- `apps/web/src/features/shipments/fixtures/shipments.ts`
- `apps/web/src/features/shipments/components/shipment-common.tsx`
- `apps/web/src/features/shipments/ready-to-ship-queue.tsx`
- `apps/web/src/features/shipments/shipment-builder.tsx`
- `apps/web/src/features/shipments/delivery-dashboard.tsx`
- `apps/web/src/features/shipments/admin-confirmation-queue.tsx`
- `apps/web/src/features/shipments/shipment-detail.tsx`
- `apps/web/src/features/shipments/shipment-shell.tsx`
- `apps/web/src/features/print-preview/delivery-note-preview.tsx`
- `apps/web/src/features/print-preview/shipping-sheet-preview.tsx`
- `apps/web/src/app/modules/shipments/history/page.tsx`
- `apps/web/src/features/shipments/shipments.test.tsx`
- `apps/web/e2e/sector-6-shipment-delivery.spec.ts`
- `docs/implementation/current-task.md`

## Checks Run

- `pnpm --filter @thaiboran/domain test -- shipment-workflow.test.ts` - passed
- `pnpm --filter @thaiboran/domain typecheck` - passed
- `pnpm --filter @thaiboran/web test -- shipments.test.tsx` - passed
- `pnpm --filter @thaiboran/web typecheck` - passed
- `pnpm --filter @thaiboran/web lint` - passed
- `pnpm format:check` - passed
- `pnpm -w exec playwright test apps/web/e2e/sector-6-shipment-delivery.spec.ts --project=chromium` - passed, 44 tests across 375/768/1024/1440
- `pnpm -w exec playwright test apps/web/e2e/sector-1-smoke.spec.ts --project=chromium` - passed, 16 tests across 375/768/1024/1440

## Known Gaps or Blockers

- No known blockers.
