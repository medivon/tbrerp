# Review Report

Status: approved after reviewer fixes
Reviewed task: Sector 6 - Shipment / Delivery
Reviewed implementation commit: `b7de070`
Reviewer: Codex reviewer
Date: 2026-05-19

## Source Docs Read

- `AGENTS.md`
- `docs/implementation/current-task.md`
- `docs/implementation/reviewer-checklist.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `docs/ux-ui/03-navigation-map.md`
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
- UI UX Pro Max design-system and React guidance for dense Thai ERP shipment/delivery surfaces.

## Findings

- Major - fixed: Shipment Detail derived COD visibility from the Shipment Builder ready-queue fixture by Order ID. Responsible Delivery Team shipments that existed only in released/sent-out shipment fixtures could therefore lose COD on detail even though Delivery Team may see COD for responsible Shipments. Shipment Detail now derives COD from the shipment fixture itself through the domain COD visibility helper.
- Minor - fixed: Admin confirmation evidence status could remain visually `หลักฐานครบ` after Tracking was cleared, while the close button was correctly disabled. Tracking changes now recalculate evidence status and the missing-proof reason from the same close-evidence rule.

No remaining Blocker, Major, or Minor findings.

## Scope Review

- Sector 6 scope matches `current-task.md`: ready-to-ship queue, Shipment Builder, Delivery Team send-out work, admin confirmation, tracking/evidence foundation, print previews, COD visibility, and special-shipment visual foundation.
- The implementation does not expand into unrelated sectors or implement finance close, stock movement, carrier API, barcode/label printing, real upload/storage, real auth/session, API contracts, or persistence.
- Route/page files remain thin. Shipment feature components, fixtures, print-preview components, and pure domain helpers are separated.

## Boundary Review

- No Prisma schema, migrations, SQL files, database tables, real API route contract, real persistence, real auth/session, or real upload/storage backend was added.
- Shipment release, Delivery Team send-out, evidence addition, and admin close remain fixture/local-state only.
- No real Order completion persistence, stock updates, COD/payment close, finance follow-up close, carrier integration, or file storage was introduced.

## Shipment / Delivery Review

- Ready-to-ship work is grouped by Order and opens Shipment Builder through explicit actions. It does not create Shipment from the Order follow-up queue or update stock/Order completion.
- Shipment Builder has no saved draft action, no persistent draft state, no COD editor, editable delivery snapshot fields, document preview links, and stock-negative acknowledgement without reason or Manager approval.
- COD is read-only, final-round-gated, hidden/disabled by permission and state, omitted from Delivery Note, and permission-aware on Shipping Sheet.
- Delivery Team cannot create/split/edit Shipment, add Tracking, close Shipment, or close COD/payment follow-up. Single and bulk `ส่งออกแล้ว` remain short local confirmations, and optional evidence does not look required.
- Admin confirmation blocks close without Tracking or at least one delivery evidence photo, allows close when either exists, and uses the evidence panel as the confirmation interaction without a second modal.
- Tracking/evidence fixtures use safe placeholders only and expose no payment evidence or sensitive finance data.
- Special Shipment is only a foundation note/chip set marked Owner/Manager-only, reason-required, and not affecting stock or Order completion.

## UX / Visual Review

- UI follows the current THAIBORAN visual system and UI UX Pro Max dense operational guidance.
- Admin shipment workbench and confirmation queue are dense/readable with clear chips, thumbnails, explicit actions, and light work surfaces inside the dark/navy shell.
- Delivery Team surfaces are mobile/tablet-first, card-based, and readable at `375`, `768`, `1024`, and `1440` in Playwright checks.
- Thai text wraps cleanly in the exercised responsive routes; no marketing/hero/decorative UI was introduced.
- Print-preview controls sit outside the A4 page; Delivery Note is item-focused with no price/COD, and Shipping Sheet is recipient/address-focused with permission-aware COD.

## Checks Run

- UI UX Pro Max design-system query - completed.
- UI UX Pro Max React stack query - completed.
- Targeted `pnpm --filter @thaiboran/web test -- shipments.test.tsx` - passed: 53 web tests.
- Targeted `pnpm --filter @thaiboran/domain test -- shipment-workflow.test.ts` - passed: 27 domain tests.
- `pnpm lint` - passed.
- `pnpm typecheck` - passed.
- `pnpm test` - passed: domain 27 tests, UI 5 tests, web 53 tests, data-access no tests.
- `pnpm format:check` - passed after formatting the edited shipment test file.
- `pnpm build` - passed.
- `pnpm test:e2e` - passed: 176 Playwright tests.
- Browser plugin runtime was not exposed through available tools in this session; Playwright e2e covered the affected Shipment/Delivery routes and breakpoints.

## Source-Doc Conflicts

None found.

## Fixes Applied

- Shipment Detail now computes COD visibility from the shipment fixture and domain helper, so responsible Delivery Team detail views keep COD where allowed.
- Admin confirmation Tracking edits now recalculate `หลักฐานครบ` / `หลักฐานไม่ครบ` and missing-proof state consistently.
- Added regression tests for responsible COD on Shipment Detail and evidence status returning to missing when Tracking is cleared.
