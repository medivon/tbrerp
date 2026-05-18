# Current Implementation Task

Status: ready for review
Sector: Sector 1 - App Shell + Access Foundation + Admin Dashboard Read-only
Task owner: Codex implementer
Date started: 2026-05-19

## Goal

Implement a read-only, role-aware app shell and Admin Dashboard foundation for THAIBORAN ERP using safe fixture data only.

## Scope

- App shell with Thai-first sidebar, quiet top bar, and mock fixture-user selector.
- Role-aware landing for Owner, Manager, Admin/Sales, internal base role, and base Outsource role.
- Personal Dashboard placeholder for base-role users.
- No-access state with return-to-own-home action.
- Read-only Admin Dashboard cards and critical preview section.
- Responsive desktop/tablet/mobile baseline.

## Out of Scope

- No real authentication, sessions, database, Prisma schema, migrations, seed data, or API contracts.
- No Order creation, Job actions, Shipment creation, Payment/COD actions, Stock/Material actions, CRM/Settings implementation, or business mutation.
- No business-rule changes.
- No unrelated modules or refactors.

## Source Docs To Read

- `AGENTS.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `CONTEXT.md`
- `docs/adr/0001-ux-starts-with-custom-job-operations.md`
- `docs/adr/0015-operational-alerts-are-queue-status-events.md`
- `docs/adr/0016-unified-user-identity-for-staff-and-outsource.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/design-system/visual-design-system.md`
- `docs/ux-ui/design-system/responsive-mobile.md`
- `docs/ux-ui/design-system/app-shell.md`
- `docs/ux-ui/design-system/table-patterns.md`
- `docs/ux-ui/design-system/pages/admin-dashboard.md`
- `docs/ux-ui/screens/SCR-ADM-001-admin-dashboard.md`
- `docs/ux-ui/03-navigation-map.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`

## Permission and Sensitive Data Rules

- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled with reason.
- Sensitive fields are omitted before rendering for users without permission.
- No sensitive data in fixtures, tests, logs, screenshots, exports, or print previews.

## Implementation Notes

- Fixture selector uses URL state only and is not real auth.
- Dashboard is a read-only queue launcher and risk preview, not a task table or analytics report.
- Dashboard may show finance follow-up counts and broad labels, but no money amounts or payment evidence.
- Future module links in the approved sidebar route to non-business placeholders for this sector.

## Files Changed

- `apps/web/src/app/`: thin route pages for role-aware landing, dashboard, personal dashboard, no-access, and module placeholders.
- `apps/web/src/shared/`: app shell, navigation config, fixture users, read-only dashboard fixtures, and permission helpers.
- `apps/web/src/features/`: Admin Dashboard composition and access-state screens.
- `apps/web/public/sector-1-thumbnails/`: generated non-sensitive local fixture thumbnails.
- `packages/ui/src/`: reusable `SurfaceCard` and `StatusChip` primitives.
- `apps/web/e2e/sector-1-smoke.spec.ts`, `playwright.config.ts`, and `vitest.config.ts`: Sector 1 checks and test config.
- `apps/web/src/app/globals.css` and `apps/web/tailwind.config.ts`: visual-system tokens for the Sector 1 shell.

## Checks Run

- `pnpm lint` - passed.
- `pnpm typecheck` - passed.
- `pnpm test` - passed, 11 web tests.
- `pnpm format:check` - passed.
- `pnpm build` - passed.
- `pnpm test:e2e` - passed, 16 Playwright checks across 375, 768, 1024, and 1440 widths.
- Visual responsive smoke via Playwright screenshots at 375, 768, 1024, and 1440 widths - no horizontal overflow, 3 critical preview images rendered, and no baht/money text detected.

## Known Gaps or Blockers

- No blockers found.
- Future modules are intentionally non-business placeholders in this sector.
- Mock fixture selector is URL-state only and is not real authentication or permission management.

## Reviewer Focus

- Verify sidebar visibility: base-role users see no main ERP menus; Owner sees settings; Manager/Admin do not see settings.
- Verify dashboard fixture content: six approved cards only, no money amounts, no owner/current-handler fields, and no sensitive evidence.
- Verify direct dashboard access for base-role users redirects to no-access with own-home return.
- Verify placeholders do not implement future module workflows or actions.
