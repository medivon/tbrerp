# Current Implementation Task

Status: ready for review
Sector: Sector 6 - Shipment / Delivery
Task owner: Codex implementer
Date started: 2026-05-19
Date completed: 2026-05-19

## Goal

Implement fixture-backed Shipment and Delivery workflow surfaces as one coherent reviewable slice: ready-to-ship queue, temporary Shipment Builder, Delivery Team send-out work, admin shipment confirmation, evidence/tracking foundation, Delivery Note preview, Shipping Sheet preview, COD visibility rules, and special-shipment visual foundation where safe.

## Scope

- Ready-to-ship admin workbench `รอสร้างรอบจัดส่ง` grouped by Order with source chips, stock-warning signals, search/filter shell, and builder entry.
- Temporary Shipment Builder with selected item list, address snapshot, delivery fields, preview links, release confirmation, stock-negative acknowledgement, and no saved draft action.
- Delivery Team mobile/tablet dashboard with released today/future lists, fixture-local sent-out behavior, optional evidence/note foundation, and same-day sent-out history.
- Admin `ยืนยันการจัดส่ง` queue with tracking/evidence panel, missing-evidence blocking, and fixture-local close behavior.
- A4-style Delivery Note and Shipping Sheet previews with permission-safe COD behavior.
- Safe fake fixtures and pure domain helpers for Shipment/Delivery visibility and local workflow rules.

## Visual Intent

- Mood: premium operational Shipment/Delivery workspace for THAIBORAN, Thai-first, practical, image-led, and focused on daily queue work.
- Density: admin screens use dense workbench rows, compact summary strips, thumbnails, chips, and right-side review panels; Delivery Team screens use larger cards and large tap targets.
- Shell/palette: keep the current dark/navy shell for hierarchy while work surfaces stay light, readable, high contrast, and suitable for dense ERP scanning.
- Component polish: clear hover/focus/cursor states, stable table-to-card behavior, semantic status chips, optional evidence visuals that do not look required, and print previews without app chrome inside the A4 page.
- Responsive behavior: verify at 375, 768, 1024, and 1440 widths; delivery is mobile/tablet-first, admin queues become stacked cards when tables are too narrow, print previews scale without revealing hidden data.
- What not to do: no marketing/hero UI, no saved Shipment draft styling, no COD editor, no tracking input for Delivery Team, no barcode/carrier/printer integration, no decorative animation/gradients, no low-contrast dark content surfaces.

## UI UX Pro Max Guidance Used

- Design-system query: `ERP shipment delivery operations dashboard Thai dense mobile`.
- React stack query: `dense responsive delivery cards dashboard evidence print preview accessibility`.
- Applied guidance: data-dense operations dashboard hierarchy, mobile delivery card ergonomics, labels for form controls, visible focus states, ARIA live regions for local send-out/close updates, stable responsive card/table layouts, and print-preview clarity.
- Project visual source of truth remains `docs/ux-ui/design-system/visual-design-system.md`, `responsive-mobile.md`, and `pages/shipment-delivery.md`.

## Out of Scope

- No database schema, Prisma models, migrations, seed data, persistent storage, or real Shipment persistence.
- No API contracts, real data fetching, real auth/session, or real permission management.
- No real payment/COD close, stock movement, Order completion update, carrier API, barcode, label printer, or file upload/storage.
- No full finance, Customer/CRM, Settings, Activity Log, Management Log, or Audit Log persistence.
- No unrelated modules or business-rule changes.

## Source Docs To Read

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
- `docs/ux-ui/design-system/pages/shipment-delivery.md`
- `docs/ux-ui/design-system/pages/order.md`
- `docs/ux-ui/screens/SCR-SHIP-001-ready-to-ship-queue.md`
- `docs/ux-ui/screens/SCR-SHIP-002-shipment-builder.md`
- `docs/ux-ui/screens/SCR-ADM-005-shipment-confirmation-queue.md`
- `docs/ux-ui/screens/SCR-DEL-001-delivery-dashboard.md`
- `docs/ux-ui/screens/SCR-SHIP-005-delivery-note-preview.md`
- `docs/ux-ui/screens/SCR-SHIP-006-shipping-sheet-preview.md`
- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`

## Permission and Sensitive Data Rules

- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled with reason.
- Sensitive fields are omitted before rendering for users without permission.
- COD is visible only where docs allow; Delivery Note never shows COD.
- No sensitive cost/profit/payout/payment evidence/Management Log/Audit Log data in fixtures, tests, logs, screenshots, exports, or print previews.

## Implementation Notes

- Shipment Builder is temporary pre-release work; no `บันทึกเป็นร่าง` action exists.
- Delivery Team send-out is a local fixture handoff, not final Shipment close or proof capture.
- Admin close remains local fixture state and is blocked unless tracking or at least one delivery evidence photo exists.
- Delivery evidence thumbnails use safe local placeholders only; no real upload/storage is implemented.

## Files Changed

- `packages/domain/src/shipment-workflow.ts`
- `packages/domain/src/shipment-workflow.test.ts`
- `packages/domain/src/index.ts`
- `apps/web/src/features/shipments/`
- `apps/web/src/features/print-preview/`
- `apps/web/src/app/modules/shipments/`
- `apps/web/src/features/orders/order-detail.tsx`
- `apps/web/src/features/admin-dashboard/admin-dashboard.tsx`
- `apps/web/src/shared/fixtures/admin-dashboard.ts`
- `apps/web/src/shared/fixtures/users.ts`
- `apps/web/src/shared/permissions/access.ts`
- `apps/web/src/shared/permissions/access.test.ts`
- `apps/web/src/shared/navigation/navigation.ts`
- `apps/web/src/shared/navigation/navigation.test.ts`
- `apps/web/e2e/sector-1-smoke.spec.ts`
- `apps/web/e2e/sector-6-shipment-delivery.spec.ts`
- `docs/implementation/current-task.md`

## Checks Run

- `pnpm lint` - passed
- `pnpm typecheck` - passed
- `pnpm test` - passed
- `pnpm format:check` - passed
- `pnpm build` - passed
- `pnpm test:e2e` - passed, 176 Playwright tests
- Browser plugin visual smoke: tool discovery did not expose the Codex Browser tools in this session; Playwright browser smoke covered the new Shipment/Delivery routes at 375, 768, 1024, and 1440 widths.

## Known Gaps or Blockers

- No source-doc conflicts found before implementation.
- No blocking gaps. Persistence, real auth/session, database schema, API contracts, file upload/storage, carrier/barcode/printer integrations, real stock movement, Order completion updates, and Payment/COD close remain intentionally excluded.

## Reviewer Focus

- Verify Shipment Builder has no draft action and no COD editing.
- Verify Delivery Team cannot create/split/edit/track/close Shipments or close COD/payment follow-up.
- Verify COD visibility and print-preview behavior are permission-safe.
- Verify admin close requires tracking or delivery evidence.
- Verify no sensitive cost/profit/payout/payment evidence/Management Log/Audit Log leakage.
