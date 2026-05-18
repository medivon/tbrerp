# Current Implementation Task

Status: ready for review
Sector: Sector 3 - Order Read/Create Foundation
Task owner: Codex implementer
Date started: 2026-05-19

## Goal

Create the first coherent Order read/create UI foundation for THAIBORAN ERP: Order list/read surfaces, saved Draft Order queue, create/edit entry foundation, review foundation, read-first Order Detail, and guarded Order Line Edit foundation.

## Visual Intent Summary

- Visual mood: polished premium operational ERP for Thai furniture order work; dense, Thai-first, calm, and practical.
- Density: workbench/table-first on desktop, stacked card fallback on phone, compact chips, stable row/card sizing, and sticky summary panels for create/review/edit.
- Shell/palette direction: current dark/navy shell remains the hierarchy anchor; work surfaces stay light, high-contrast, and readable.
- Component polish: shared UI primitives plus focused Order components, 8px-radius operational surfaces, visible hover/focus/cursor states, and Thai text wrapping.
- Responsive behavior: desktop/tablet primary; phone fallback keeps Review complete, statuses visible, and no horizontal page overflow.
- Avoided: marketing hero layout, decorative gradients/glass, over-animation, low-contrast dark work surfaces, hidden sensitive placeholders, and mutation-looking behavior.

## UI UX Pro Max Guidance Used

- Design-system query: `operational ERP order management dashboard dense admin Thai dark navy workbench`.
- Detailed UX query: `data dense dashboard workbench table forms accessibility hover focus responsive`.
- React stack query: `react dashboard responsive table form`.
- Applied guidance: data-dense workbench/table treatment, mobile table-to-card fallback, visible focus states, hover/tap feedback, no horizontal overflow, and restrained high-contrast shell/work-surface contrast.
- Project baseline remained `docs/ux-ui/design-system/visual-design-system.md`, `responsive-mobile.md`, and `pages/order.md`; UI UX Pro Max did not change workflow, permissions, sensitive-data visibility, or business rules.

## Order Surfaces Implemented

- Order navigation now routes to real Order module pages instead of the placeholder.
- `ออเดอร์ที่ต้องติดตาม` route: `/modules/orders`.
- `ออเดอร์ทั้งหมด` route: `/modules/orders/all`.
- `ร่างออเดอร์` route: `/modules/orders/drafts`.
- `ปิดแล้ว / ยกเลิก` route: `/modules/orders/closed`.
- Order Create/Edit foundation route: `/modules/orders/create`.
- Order Review foundation route: `/modules/orders/review`.
- Order Detail read-first route: `/modules/orders/[orderId]`.
- Order Line Edit foundation route: `/modules/orders/[orderId]/lines/edit`.

## Components Added/Changed

- Added Order feature components under `apps/web/src/features/orders/components/`:
  - `OrderStatusChip`, `ShipmentStatusChip`, `DraftStatusChip`
  - `OrderTabs`
  - `OrderWorkbenchTable`
  - `OrderLineCard`
  - `ReadFirstSection`
  - `ReviewImpactPanel`
  - `OrderSummaryCard`
- Added Order feature surfaces:
  - `order-list.tsx`
  - `draft-order-queue.tsx`
  - `order-create.tsx`
  - `order-review.tsx`
  - `order-detail.tsx`
  - `order-line-edit.tsx`
  - `order-shell.tsx`
  - `routes.ts`
- Updated navigation/access:
  - `apps/web/src/shared/navigation/navigation.ts` marks Orders implemented.
  - `apps/web/src/shared/permissions/access.ts` adds `canAccessOrders`.

## Fixture Data Added

- Added `apps/web/src/features/orders/fixtures/orders.ts`.
- Fixtures use obviously fake Thai sample customers and furniture examples.
- Draft fixtures contain Draft No. only and no Order ID.
- Order fixtures keep Order status and Shipment summary separate.
- Fixture data excludes real customer data, payment evidence files, cost, profit, payout, supplier payment detail, Management Log, and Audit Log detail.

## Behavior Implemented

- Order list/read foundation uses fixture data only; no data fetching or persistence.
- Order list rows use explicit `เปิดออเดอร์` actions and no direct Shipment creation.
- Draft queue shows saved active Draft Orders only; Draft No. is visually separate from real Order IDs.
- Create/Edit surface orders the flow as Customer, Address/Recipient, ready-stock/custom lines, Payment Term, optional Payment Record visual placeholder, and completeness panel.
- Ready-stock and custom-work add actions are separate.
- Custom lines include `รายละเอียดงานสั่งทำ` inside the Order entry flow.
- Review shows downstream result chips: `จะจองสต๊อก`, `จะสร้าง JOB-O`, `ยังไม่สร้างรอบจัดส่ง`.
- Review includes stock warning acknowledgement UI, but confirmation is disabled in this sector.
- Order Detail is a read-first single-page report with sections: `สรุปออเดอร์`, `รายการในออเดอร์`, `จัดการรอบจัดส่ง`, `รอบจัดส่งที่เกี่ยวข้อง`, `การชำระเงิน`, and `ประวัติ`.
- Order Detail separates `สถานะออเดอร์` from `สถานะจัดส่ง`; `รอยืนยันการจัดส่ง` appears only as Shipment status.
- Shipment creation, payment follow-up, related Job, and related Shipment actions are disabled/placeheld where the sector excludes real behavior.
- Completed Orders show read-first immutable treatment for normal workflow.
- Order Line Edit is a guarded foundation with blocked read-only line reasons and Review Changes preview; it does not save changes.

## Explicit Exclusions Preserved

- No real auth.
- No real database, Prisma schema, migrations, seed data, persistence, or API contracts.
- No real Order creation or confirmation mutation.
- No `JOB-O` creation.
- No stock reservation.
- No Shipment creation.
- No Payment/COD action.
- No Stock/Material action.
- No Customer/CRM implementation beyond visual placeholders.
- No Settings implementation.
- No Service Case, Special Shipment, payment correction, or shipment correction implementation.
- No business-rule changes, invented workflow states, approval steps, permissions, reports, or finance gates.

## Source Docs Read

- `AGENTS.md`
- `docs/implementation/implementer-rules.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/foundation-proposal.md`
- `docs/implementation/review-report.md`
- `docs/implementation/task-handoff-template.md`
- `CONTEXT.md`
- Relevant ADRs, especially `0002`, `0003`, `0004`, `0005`, `0006`, `0014`, `0015`, and `0017`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- `docs/ux-ui/design-system/visual-design-system.md`
- `docs/ux-ui/design-system/responsive-mobile.md`
- `docs/ux-ui/design-system/table-patterns.md`
- `docs/ux-ui/design-system/app-shell.md`
- `docs/ux-ui/design-system/pages/order.md`
- `docs/ux-ui/design-system/pages/admin-dashboard.md`
- `docs/ux-ui/04-interaction-modal-behavior.md`
- `docs/ux-ui/03-navigation-map.md`
- `docs/ux-ui/02-screen-inventory.md`
- `docs/ux-ui/screens/SCR-ADM-002-active-orders-overview.md`
- `docs/ux-ui/screens/SCR-ADM-008-draft-order-queue.md`
- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`
- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`
- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`
- `docs/ux-ui/screens/SCR-ORD-006-all-orders-list.md`
- `docs/ux-ui/screens/SCR-ORD-007-order-line-edit.md`

## Checks Run

- UI UX Pro Max design-system, UX, and React stack queries - completed.
- `pnpm lint` - passed.
- `pnpm typecheck` - passed.
- `pnpm test` - passed, including 5 new Order foundation tests and existing UI/web tests.
- `pnpm format:check` - initially found new-file formatting issues; ran `pnpm format`; final `pnpm format:check` passed.
- `pnpm build` - passed.
- `pnpm test:e2e` - passed, 36 Playwright checks.
- Local visual/browser fallback with Playwright against `http://127.0.0.1:3000` - passed for Order Review and Order Detail at `375` and `1440`: no horizontal overflow, disabled Review confirmation, and separate Order/Shipment status text.

## Known Gaps or Blockers

- No source-doc conflicts found.
- Browser plugin tools were not exposed by tool discovery in this session, so the visual browser smoke used the available Playwright runtime as fallback.
- Order Line Edit is intentionally a foundation/shell only; deeper save behavior belongs to Sector 4 or later.
- Shipment, Job, Customer, and Payment destination links/actions remain placeholders or disabled where those sectors are not implemented.

## Reviewer Focus

- Confirm the Order routes and tabs match the documented labels and navigation map.
- Verify Draft Order rows never show real Order IDs and do not imply stock/Job/Shipment/report effects.
- Verify Review reads as the final confirmation step visually, while `ยืนยันสร้างออเดอร์` remains disabled/no-op in this sector.
- Verify Order Detail keeps `รอยืนยันการจัดส่ง` as Shipment status, not Order status.
- Verify disabled/placeheld actions show reasons and do not imply real mutation.
- Verify fixture and rendered surfaces omit sensitive cost, profit, payout, payment evidence, Management Log, and Audit Log data.
- Verify responsive behavior at phone and wide desktop remains dense, readable, and free of page-level horizontal overflow.
