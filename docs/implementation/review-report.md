# Review Report

Status: approved after fixes
Scope: latest Order read/create/confirmation UI copy and layout review
Reviewer: Codex
Date reviewed: 2026-05-20

## Findings

- Major, fixed: Several Order surfaces still exposed staff-facing English/internal workflow copy, including `Review`, `Review Changes`, `Order Detail`, `modal`, and `acknowledgement`. Replaced those with concise Thai operational copy across Order Create, custom-work entry, ready-stock warning, Order Review impact/result, Order Detail text, and Order line edit.
- Major, fixed: Order Detail showed a disabled `จัดการรอบจัดส่ง` menu item whose reason was only a location hint. Changed it to an active in-page link to the existing shipment-management section so it is no longer a dead-looking disabled action.
- Test coverage strengthened: Order unit/e2e copy guards now fail if rendered Order UI contains the original forbidden implementation terms plus `Review`, `Order Detail`, `acknowledgement`, or `modal`.

## Scope Review

- Changes are limited to product copy, one existing section link, and tests guarding the copy/layout requirement.
- No database schema, Prisma schema, migrations, API contracts, server actions, persistence, Shipment creation, Payment/COD action, stock movement, or new workflow state was added.
- Confirmation logic remains pure and deterministic; no real business mutation was introduced beyond the existing read-model foundation.

## Source-Doc Alignment

- Customer-before-address/lines, separate ready-stock/custom-work add actions, Draft No. without Order ID, final Order Review behavior, read-first Order Detail, separate Order/Shipment statuses, and completed-order immutability remain aligned with the source docs.
- `รอยืนยันการจัดส่ง` remains excluded from Order status.
- Sensitive finance/cost/payout/audit/management-log/payment-evidence data remains absent from general Order UI.

## Visual and Responsive Review

- Thai copy now uses business language and wraps through existing `break-words` / `overflow-wrap:anywhere` treatment.
- Order e2e responsive checks cover 375, 768, 1024, and 1440 px.
- Additional Playwright overflow probe across audited Order routes at 375, 768, 1024, and 1440 found no page-level horizontal overflow, text clipping, text bleeding, or overlap offenders.

## Checks Run

- `pnpm test` - passed
- `pnpm lint` - passed
- `pnpm typecheck` - passed
- `pnpm format:check` - passed after formatting touched files
- `pnpm build` - passed
- `CI=1 pnpm exec playwright test apps/web/e2e/sector-3-orders-smoke.spec.ts apps/web/e2e/sector-4-order-confirmation.spec.ts --workers=1` - passed, 76 tests
- `CI=1 pnpm exec playwright test --workers=1` - passed, 200 tests
