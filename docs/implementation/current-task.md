# Current Implementation Task

Status: ready for review
Sector: Sector 2 - Shared UI Components / Visual Component System
Task owner: Codex implementer
Date started: 2026-05-19

## Goal

Create a reusable THAIBORAN ERP visual component layer so future screens can share premium operational styling, dense Thai-first layouts, and permission-safe state patterns without rebuilding visual polish per route.

## Scope

- Improve `packages/ui` with reusable business-neutral visual components for cards, headers, chips, badges, banners, toolbars, empty/no-access states, and responsive panels.
- Apply shared components to existing Sector 1 surfaces where appropriate: Admin Dashboard cards, critical preview cards, no-access state, Personal Dashboard placeholder, and safe app-shell surface treatment.
- Keep route/page files thin and keep fixtures outside UI components.
- Add lightweight reusable component tests where practical.
- Add an internal non-business UI preview route only if it helps reviewer validation.

## Out of Scope

- No new dashboard metrics.
- No new workflow states.
- No real data fetching, real auth, database schema, migrations, API contracts, or business mutation.
- No Order, Job, Shipment, Payment, Stock, CRM, Finance, Settings, or other domain workflow implementation.
- No business-rule changes.
- No sensitive-data masking component that receives hidden data; sensitive data must be omitted before rendering.
- No new mockup images or archived mockup/image-prompt dependency.

## Visual Intent

- Visual mood: premium operational ERP for a Thai furniture business, calm and professional rather than generic SaaS or marketing.
- Density: data-dense dashboard/workbench primitives with compact spacing, stable card heights, tabular counts, and short Thai labels.
- Shell/palette direction: continue the dark/navy shell where it improves hierarchy, while keeping main work surfaces light, high-contrast, and readable.
- Component polish goals: consistent 8px-radius surfaces, restrained semantic chips, clear hover/focus/cursor states, accessible empty/no-access/stale states, and reusable header/toolbar rhythm.
- Responsive behavior: components should wrap cleanly at phone/tablet widths, avoid horizontal page overflow, support drawer-to-sheet style containers, and preserve mobile touch targets.
- What not to do: no marketing hero styling, no overdone gradients/glass effects, no full dark-mode work surfaces, no hidden sensitive placeholders, no invented business states, and no route-level visual one-offs where a reusable component fits.

## UI UX Pro Max Guidance Used

- Design system query: `ERP SaaS data-dense dashboard professional operational Thai admin`.
- Active guidance applied: Data-Dense Dashboard pattern, compact grid/workbench spacing, blue/amber operational accent restraint adapted to THAIBORAN tokens, visible focus rings, hover/tap feedback, no horizontal mobile overflow, and Next.js responsive image handling with stable containers.
- Project baseline remains `docs/ux-ui/design-system/visual-design-system.md`; UI UX Pro Max may polish hierarchy/accessibility but must not alter permissions, workflow, sensitive-data visibility, or business rules.

## Source Docs To Read

- `AGENTS.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `CONTEXT.md`
- `docs/adr/`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/implementation/review-report.md`
- `docs/ux-ui/design-system/visual-design-system.md`
- `docs/ux-ui/design-system/responsive-mobile.md`
- `docs/ux-ui/design-system/app-shell.md`
- `docs/ux-ui/design-system/table-patterns.md`
- `docs/ux-ui/design-system/pages/admin-dashboard.md`
- `docs/ux-ui/design-system/pages/order.md`
- `docs/ux-ui/design-system/pages/job-worker-rak-samuk.md`
- `docs/ux-ui/design-system/pages/shipment-delivery.md`
- `docs/ux-ui/design-system/pages/finance-payment-pv.md`
- `docs/ux-ui/design-system/pages/product-stock-material.md`
- `docs/ux-ui/design-system/pages/customer-crm-settings.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `apps/web/src/features/admin-dashboard/admin-dashboard.tsx`
- `apps/web/src/shared/app-shell/app-shell.tsx`
- `packages/ui/src/*`

## Permission and Sensitive Data Rules

- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled with reason.
- Sensitive fields are omitted before rendering for users without permission.
- Shared UI components must not receive hidden sensitive data and mask it.
- No sensitive data in fixtures, tests, logs, screenshots, exports, print previews, or preview routes.

## Implementation Notes

- Component APIs stay business-neutral and presentation-oriented.
- Status and badge variants cover approved visual semantics but do not define workflow transitions.
- Callers still own permission filtering and business-state decisions; shared UI components do not receive hidden sensitive values to mask them.
- Internal UI preview content uses safe non-business fixture text only.
- Browser visual check covered `/dashboard?user=admin-sales` and `/ui-preview` at `375` and `1440`; no horizontal overflow or money-symbol leakage was observed. Dashboard images rendered through stable Next.js `Image` containers, and visible preview thumbnails are marked priority.

## Components Added/Changed

- `SurfaceCard`: variants for default, subtle, inset, outline, shell, padding, and interactive treatment.
- `StatusChip`: added size support while preserving restrained semantic variants.
- `MetricCard`: compact metric/summary card for dense queue strips.
- `QueueLauncherCard`: reusable dashboard/queue launcher with count, icon, chip, subtext, and footer action label.
- `WorkPreviewCard`: reusable image-led preview card that accepts only caller-provided safe metadata/chips/media.
- `SectionHeader` and `PageHeader`: compact Thai-first heading rhythm for work surfaces.
- `EmptyState`, `NoAccessState`, and `StaleStateBanner`: standard empty, permission, and stale-state surfaces.
- `ToolbarShell` and `ResponsivePanel`: lightweight wrappers for dense filters/actions and drawer-to-sheet-style content.
- `RoleBadge` and `UserBadge`: reusable role/user display badges for shell and surface treatments.

## Files Changed

- `packages/ui/src/`: shared visual component system, exports, and component tests.
- `apps/web/src/features/admin-dashboard/admin-dashboard.tsx`: Admin Dashboard now composes reusable queue launcher and work preview cards.
- `apps/web/src/shared/app-shell/app-shell.tsx`: top-bar user surface now uses shared `UserBadge`.
- `apps/web/src/features/access/no-access.tsx`: no-access screen now uses shared `NoAccessState`.
- `apps/web/src/features/access/personal-dashboard.tsx`: Personal Dashboard placeholder now uses shared header, user badge, card, and empty state.
- `apps/web/src/features/access/module-placeholder.tsx`: future module placeholders now use shared header and empty state.
- `apps/web/src/app/ui-preview/page.tsx` and `apps/web/src/features/ui-preview/ui-preview.tsx`: internal non-business visual preview route.
- `docs/implementation/current-task.md`: Sector 2 Visual Intent and implementation handoff.

## Sector 1 Surfaces Improved

- Admin Dashboard cards now share reusable tone, focus, hover, card, count, chip, and footer behavior.
- Critical preview cards now use a reusable image-led work preview component with stable media slots and priority thumbnails.
- No-access state now uses one reusable permission-safe surface with only own-home action supplied by the caller.
- Personal Dashboard placeholder now uses shared page/header/user/empty-state rhythm.
- App shell top user display now uses shared shell-aware `UserBadge`.

## Checks Run

- `pnpm lint` - passed.
- `pnpm typecheck` - passed.
- `pnpm test` - passed, including 4 new `packages/ui` component tests and 12 existing web tests.
- `pnpm format:check` - passed.
- `pnpm build` - passed.
- `pnpm test:e2e` - passed, 16 Playwright checks across 375, 768, 1024, and 1440 widths.
- Browser visual QA - passed for `/dashboard?user=admin-sales` and `/ui-preview` at 375 and 1440; no horizontal overflow, no `฿` leakage, UI preview clearly labeled internal, and dashboard thumbnails rendered.

## Known Gaps or Blockers

- No blockers found.
- `/ui-preview` is intentionally internal and not linked from main navigation.
- No new business workflows, data fetching, auth, API, database schema, migrations, or dashboard metrics were added.

## Reviewer Focus

- Visual quality and reusable component consistency.
- Responsive behavior at `375`, `768`, `1024`, and `1440` widths.
- Permission-safe component boundaries: hidden sensitive data omitted before props.
- No business-rule, workflow-state, auth, API, database, or fixture-data expansion.
- Confirm that UI preview copy remains clearly internal and non-product.
