# Current Implementation Task

Status: ready for review
Sector: Sector 4 - Order Confirm + JOB-O Creation
Task owner: Codex implementer
Date started: 2026-05-19

## Goal

Implement the approved fixture-backed Order confirmation foundation: Review can confirm valid Order Review data, produce a confirmed Order read model, generate `JOB-O` read models from complete custom-work lines, show ready-stock reservation outcome direction, and display the post-confirm result without persistence or future-sector workflows.

## Visual Intent Summary

- Visual mood: premium operational ERP, Thai-first, dense, consequence-focused, and read-first.
- Density: Review stays a compact workbench with row/card detail and a right-side consequence panel; result state is an operational success panel, not a marketing/celebration page.
- Shell/palette direction: existing dark/navy shell and readable light work surfaces remain; warning/success/revision chips carry confirmation consequences.
- Component polish: visible focus/hover/cursor states, stable panels, clear disabled reasons, inline acknowledgement, and Thai text wrapping.
- Responsive behavior: Review keeps warnings, acknowledgement, downstream chips, final action, and result visible at `375`, `768`, `1024`, and `1440` without page-level horizontal overflow.
- Avoided: second confirmation modal, decorative hero/marketing layout, workflow shortcuts, low-contrast dark content surfaces, and sensitive finance/cost/payout/log exposure.

## UI UX Pro Max Guidance Used

- Design-system query: `enterprise ERP order review dense operational Thai dashboard dark navy shell`.
- Applied guidance: dense operational dashboard style, dark/navy shell contrast, Noto Sans Thai readability, visible focus states, clear hover/cursor treatment, and responsive verification.
- Project baseline remained `docs/ux-ui/design-system/visual-design-system.md`, `responsive-mobile.md`, and `pages/order.md`; UI UX Pro Max did not change workflow, permissions, sensitive-data visibility, or business rules.

## Domain Logic Added

- Added pure confirmation logic in `packages/domain/src/order-confirmation.ts`.
- Validates:
  - missing customer
  - missing recipient/address
  - missing Payment Term
  - no Order Lines
  - incomplete Custom Work Detail
  - missing stock-shortage acknowledgement
  - customer-caution acknowledgement hook
  - stale Review input
  - unauthorized/base-role confirmation
- Produces:
  - confirmed Order read model
  - generated `JOB-O` read models for complete custom lines
  - ready-stock reservation outcome records, including shortage/negative direction after acknowledgement
  - acknowledged warnings
  - fixture activity-event list
  - converted Draft fixture state when Review came from a Draft
- Uses deterministic fixture/dev IDs only:
  - `ORD-FIX-S4-0001`
  - `JOB-O-FIX-S4-0001`
  - UI labels mark these as non-production fixture/dev IDs.

## Confirmation Behavior Implemented

- `ยืนยันสร้างออเดอร์` is disabled until the Review input is valid and required stock acknowledgement is checked.
- Review remains the final confirmation surface; no second confirmation modal was added.
- Clicking confirm runs the pure fixture-backed confirmation logic in memory and shows:
  - confirmed Order ID
  - generated `JOB-O` ID
  - ready-stock reservation outcome and projected shortage
  - warnings acknowledged
  - converted Draft message
  - next destination link to fixture-backed Order Detail.
- Added fixture blocked case routing through `?case=missing-payment-term` and domain support for other blocked cases.
- Base-role direct access to `/modules/orders/review` routes to no-access through `canConfirmOrders`.

## JOB-O Output Behavior

- Complete custom-work line creates a read-only `JOB-O` result in the fixture confirmation output.
- JOB-O display includes safe production context only: work name, quantity, production detail, material/color, starting department, and status.
- No full Job module, worker queue, JOB-O action surface, production state machine, payout, cost, profit, Management Log, or Audit Log was added.
- Generated Order Detail shows the `JOB-O` reference on the custom line and keeps Order Detail read-first.

## Ready-stock Reservation Behavior

- Ready-stock lines produce reservation outcome records only; no real stock movement is persisted.
- Acknowledged insufficient stock produces a shortage/negative direction with projected sellable stock after reservation.
- Shipment creation remains disabled/placeheld; Payment/COD actions remain disabled/placeheld.

## Draft Conversion Boundary

- The fixture Review input includes `DRAFT-00035` as source context.
- After confirm, the result states the Draft was converted/archived/read-only in fixture output.
- No Draft record is physically deleted and no persistence layer was added.

## Files Changed

- `packages/domain/src/order-confirmation.ts`
- `packages/domain/src/order-confirmation.test.ts`
- `packages/domain/src/index.ts`
- `apps/web/src/features/orders/order-review.tsx`
- `apps/web/src/features/orders/components/review-impact-panel.tsx`
- `apps/web/src/features/orders/fixtures/orders.ts`
- `apps/web/src/features/orders/order-detail.tsx`
- `apps/web/src/app/modules/orders/review/page.tsx`
- `apps/web/src/shared/permissions/access.ts`
- `apps/web/src/shared/permissions/access.test.ts`
- `apps/web/src/features/orders/orders.test.tsx`
- `apps/web/e2e/sector-3-orders-smoke.spec.ts`
- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `pnpm-lock.yaml`
- `docs/implementation/current-task.md`

## Explicit Exclusions Preserved

- No Prisma schema, migrations, seed data, database tables, persistent storage, or data-access adapter.
- No real API contracts, server mutations, real auth/session, or real permission management.
- No real Shipment creation, Delivery workflow, Payment/COD action, Product/Stock movement, Material workflow, Customer/CRM implementation, Finance/PV behavior, Settings/Role management, full Job module, worker queues, or real Activity/Management/Audit Log persistence.
- No business-rule changes, invented workflow states, approval steps, reports, finance gates, or sensitive-field placeholders.

## Source Docs Read

- `AGENTS.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `docs/implementation/review-report.md`
- `docs/implementation/task-handoff-template.md`
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

## Checks Run

- UI UX Pro Max design-system query - completed.
- `pnpm install` - completed to link `@thaiboran/domain` into the web workspace.
- `pnpm lint` - passed.
- `pnpm typecheck` - passed.
- `pnpm test` - passed, including 11 domain confirmation tests and updated Order UI tests.
- `pnpm format:check` - initially found touched-file formatting; formatted touched files; final pass succeeded.
- `pnpm build` - passed.
- `pnpm test:e2e` - initial run exposed strict duplicate-text locator failures in the new e2e assertions; locators were fixed; final run passed 68 Playwright tests.
- Browser plugin tools were not exposed after tool discovery; local visual/browser verification was covered by Playwright at `375`, `768`, `1024`, and `1440`.

## Known Gaps or Blockers

- No source-doc conflicts found.
- Confirmation result is fixture-backed/in-memory only. Reloading Review does not persist a new Order record.
- Generated Order Detail is available through deterministic fixture ID `ORD-FIX-S4-0001`; the all-orders list does not permanently insert the generated result.
- Shipment, Payment/COD, Stock movement, full Job workflow, worker queues, and real logs remain future-sector placeholders.

## Reviewer Focus

- Verify confirmation rules trace to the source docs and are not buried in React JSX.
- Verify Review is still the final confirmation surface and no second modal exists.
- Verify `JOB-O` output uses only safe production context and does not expose customer, cost, profit, payout, payment evidence, Management Log, or Audit Log.
- Verify ready-stock shortage acknowledgement allows only fixture reservation outcome direction and creates no real stock movement.
- Verify base roles cannot access confirmation surfaces and route to no-access.
- Verify generated Order Detail stays read-first and keeps Shipment/Payment actions disabled/placeheld.
- Verify no Prisma/database/API/persistence artifacts were introduced.
