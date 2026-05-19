# Review Report

Status: approved
Scope: Sector 3 - Order Read/Create Foundation button workflow and modal polish
Reviewer: Codex
Date reviewed: 2026-05-20

## Findings

- Major, fixed: The ready-stock picker disabled sold-out SKU options even though the active Order Create/Edit spec allows enabled no-stock variants to be selected, with the stock warning resolved or acknowledged on Review. Fixed in `apps/web/src/features/orders/components/product-select-modal.tsx` by keeping sold-out options selectable, showing explicit no-real-reservation warning copy, and relying on the existing local stock-warning flow. Covered by `apps/web/src/features/orders/orders.test.tsx`.

## Scope Review

- The implementation remains within Sector 3 read/create foundation and UI-control polish.
- No database schema, Prisma schema, migrations, API contracts, server actions, or persistence were added.
- No real Draft save, Order creation, JOB-O creation, stock reservation, Shipment creation, Payment/COD action, or finance mutation was added.
- Order Review confirmation remains local fixture/dev behavior with no second confirmation modal.

## Source-Doc Alignment

- Customer, address, order-line, Review, Draft, Order Detail, Order status, and Shipment status behavior traces to active Order source docs.
- Ready-stock and custom-work add actions remain separate.
- Draft Orders show Draft No. only and do not reserve stock, create Job, create Shipment, or enter reports.
- `รอยืนยันการจัดส่ง` is kept as Shipment status, not Order status.
- Completed Orders remain immutable in normal workflow.

## Permission, Sensitive Data, and Fixtures

- Missing-permission Order Review access is blocked/hidden through route permission checks.
- State-blocked future actions are disabled with visible Thai reasons.
- General Order surfaces do not expose cost, profit, payout, Audit Log, Management Log, payment evidence, or hidden finance details.
- Fixture customer and phone data remains fake/sample data.

## Visual and Responsive Review

- UI follows the recorded Visual Intent, THAIBORAN visual system, and UI UX Pro Max data-dense operational dashboard guidance.
- Order screens remain work-focused and practical, not marketing/landing-page styled.
- Thai text and modal/table layouts are covered by e2e checks at 375, 768, 1024, and 1440 px.

## Checks Run

- `pnpm --filter @thaiboran/web test -- --run src/features/orders/orders.test.tsx`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm format:check`
- `pnpm build`
- `CI=1 pnpm exec playwright test apps/web/e2e/sector-3-orders-smoke.spec.ts --pass-with-no-tests --workers=1`
- `CI=1 pnpm exec playwright test --pass-with-no-tests --workers=1`

Note: the first Sector 3 Playwright smoke attempt found an existing repo Next server on port 3000. That stale server was stopped and the suite was rerun successfully.
