# Sector-Based Implementation Plan

This plan organizes THAIBORAN ERP implementation into coherent user-visible sectors. It is a task-planning document only. It does not create business rules, database schema, API contracts, migrations, or business modules.

One Codex implementation task should cover one coherent sector or a clearly named sub-slice of a sector. Do not split work button-by-button or component-by-component.

Each sector should use this workflow:

1. Create a task in `docs/implementation/current-task.md`.
2. For frontend/UI sectors, create a short Visual Intent before coding.
3. Implement only that sector scope.
4. Record files changed, checks run, gaps, and reviewer focus in `current-task.md`.
5. Start a separate reviewer Codex task.
6. Record review findings in `docs/implementation/review-report.md`.

## Source-Truth Rules

Use active docs as the source of truth:

- `CONTEXT.md`
- `docs/adr/*.md`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- relevant UX/UI files under `docs/ux-ui/`

Implementation docs organize execution. They do not override source docs.

Archived mockups, legacy files, old screenshots, and generated image prompts are not source of truth.

## Frontend/UI Visual Quality Gate

Frontend/UI sectors must use UI UX Pro Max visual guidance together with the current THAIBORAN visual design system. Implementers must create a short Visual Intent in `current-task.md` before coding, covering visual mood, density, shell/palette direction, component polish goals, responsive behavior, and what not to do.

Use UI UX Pro Max to improve visual hierarchy, spacing, hover/focus/cursor states, responsive behavior, accessibility, and image handling. It must not change business rules, workflow, permissions, sensitive-data visibility, API contracts, database schema, or source-of-truth decisions.

Current visual direction allows premium operational ERP styling, including dark/navy shell treatment where it improves hierarchy and readability. Main work surfaces must stay readable and practical for dense ERP work.

Reviewers must reject frontend work that is generic plain UI, decorative marketing UI, over-animated UI, or low-contrast dark content surfaces.

## Product UI Quality Gate

Frontend/UI sectors must produce staff-facing product UI, not developer notes.

User-facing UI must not mention sector numbers, implementation phases, placeholder status, fixture/mock data, in-memory state, database connection status, unfinished implementation, future implementation, agent workflow, or developer instructions. Keep those details in developer docs, tests, `current-task.md`, `review-report.md`, or technical notes.

Every visible action must have a clear user meaning:

- hide missing-permission actions
- disable state-blocked actions with concise Thai business reasons
- hide actions that belong to future implementation sectors unless workflow context requires visibility
- if a future-sector action must stay visible, disable it with a real business-state reason rather than implementation status
- avoid dead buttons and active-looking controls that do nothing

Frontend sectors must stress-check Thai-first text layout at `375px`, `768px`, `1024px`, and `1440px`, including overflow, clipping, overlap, icon/text collision, chip/button/table/card collisions, modal/drawer overflow, page-level horizontal overflow, and dense table behavior on small screens.

## Sector 0: Codebase Foundation

Goal: establish the technical foundation that lets later sectors implement THAIBORAN ERP consistently.

Includes:

- workspace structure, package scripts, lint, format, typecheck, and test baseline
- app framework foundation and safe placeholder surfaces
- shared configuration and environment examples
- source-doc reading workflow and implementation handoff files

Out of scope:

- real business workflows
- real permissions, authentication, sessions, or role management
- database schema, migrations, seed data, or ERP API contracts
- Admin Dashboard, Orders, Jobs, Shipments, Finance, Stock, CRM, Settings, or Reports behavior

Done when:

- later sectors can run, test, and review changes consistently
- docs make implementation/review separation clear
- no business behavior has been invented by the foundation

## Sector 1: App Shell + Access Foundation + Admin Dashboard Read-only

Goal: create the role-aware operating shell and a read-only Admin Dashboard foundation that follows source docs.

Includes:

- Thai-first app shell structure
- role-aware navigation visibility rules
- no-access and own-home return behavior where approved
- read-only Admin Dashboard queues and summary surfaces from approved docs
- immediate permission-change behavior only if already supported by source docs and approved scope

Out of scope:

- real authentication provider
- persistent permission management
- write actions from dashboard queues
- new dashboard metrics not defined in source docs

Done when:

- missing-permission modules are hidden
- state-blocked dashboard actions are disabled with reason
- dashboard read surfaces do not expose sensitive data
- reviewer can trace each visible dashboard item to active docs

## Sector 2: Shared UI Components

Goal: build the reusable UI foundation needed by THAIBORAN ERP sectors without turning components into business rules.

Includes:

- layout primitives, tables, cards, drawers, modals, tabs, filters, badges, empty states, loading states, stale states, no-access states, evidence display, and print-preview patterns as approved by UX/UI docs
- responsive behavior for desktop, tablet, and mobile worker screens
- permission-safe component interfaces that do not receive hidden sensitive fields
- Thai-first text wrapping and density patterns

Out of scope:

- sector-specific workflows
- business decisions embedded inside generic components
- sensitive data masking instead of omission

Done when:

- shared components support later sectors consistently
- component examples and tests use safe fixture data
- reviewer can verify permission-safe prop boundaries

## Sector 3: Order Read/Create Foundation

Goal: implement the first coherent Order read/create experience according to approved Order docs.

Includes:

- Order list and read-first detail foundations
- Draft Order and order-entry behavior only as defined in source docs
- Order create/review surfaces for approved fields and flows
- customer/recipient context needed for order creation
- role-appropriate visibility for Admin/Sales, Manager, Owner, Finance, and related roles

Out of scope:

- Order confirm to JOB-O creation
- Shipment creation
- payment follow-up close
- completed Order correction flows
- new Order statuses or finance gates

Done when:

- Order create/read behavior traces to active docs
- missing-permission actions are hidden
- state-blocked actions are disabled with reason
- no sensitive finance, cost, payout, Management Log, or Audit Log data leaks to unauthorized roles

## Sector 4: Order Confirm + JOB-O Creation

Goal: implement the approved confirmation path from Order to JOB-O creation.

Includes:

- Order confirmation review and guarded confirmation flow
- creation/display of JOB-O work units from custom Order Lines according to source docs
- reason capture and stale-state protection where required
- post-confirm Order edit boundaries approved for this sector

Out of scope:

- JOB-P production creation
- full worker execution screens
- shipment/delivery behavior
- finance close or PV behavior
- invented production states

Done when:

- confirming an Order creates only the approved JOB-O outcomes
- Order and Job relationships preserve documented domain terms
- reviewer can verify no unauthorized role sees hidden sensitive fields

## Sector 5: Job / Worker / Rak Samuk

Goal: implement coherent production work visibility and Rak Samuk workflow surfaces.

Includes:

- Job queues and read-first Job detail surfaces for approved roles
- Woodwork and Coloring worker views
- Rak Samuk assignment, worker work list, missing-price, proposal, approval, and return/intake surfaces as approved
- worker-safe production notes, images, and status updates
- separation of Activity Log, Management Log, and Audit Log visibility

Out of scope:

- showing Rak Samuk prices in Order, Production, or Job workflow pages where docs forbid it
- payroll automation
- finance PV finalization
- new worker revision/request workflow not in source docs

Done when:

- worker screens remain role-limited
- customer, Order ID, payment, cost, payout, Management Log, and Audit Log data are hidden unless docs explicitly allow them
- Rak Samuk price visibility follows source docs exactly

## Sector 6: Shipment / Delivery

Goal: implement the Shipment and Delivery workflow surfaces as one coherent delivery sector.

Includes:

- ready-to-ship queue
- Shipment Builder
- delivery release and Delivery Team work view
- delivery evidence and send-out behavior
- Delivery Note and Shipping Sheet previews
- Shipment close behavior only as approved

Out of scope:

- carrier API integration
- barcode or label printer integration
- finance follow-up close beyond approved shipment context
- changing Order completion rules

Done when:

- Delivery Team sees only approved recipient, address, item, note, evidence, carrier, tracking, and responsible COD context
- Admin/Sales shipment authority and Delivery Team limits follow source docs
- Delivery Team cannot close Shipment or finance follow-up unless source docs later change

## Sector 7: Finance / COD / Expense / PV

Goal: implement finance-facing operational surfaces without expanding into full accounting.

Includes:

- COD and payment follow-up queues
- Payment Record and evidence visibility/correction surfaces
- Expense creation/list/review boundaries
- payout preparation and PV surfaces as approved
- finance reports only if defined in source docs for this sector

Out of scope:

- full accounting
- tax invoice
- payroll automation
- new finance approval gates
- hidden cost/profit exposure to unauthorized roles

Done when:

- finance-sensitive data is visible only to approved roles
- evidence and amount corrections follow documented log severity
- PV remains the final payment document, not an invented editable workbench

## Sector 8: Product / Stock / Material

Goal: implement Product/SKU, ready stock, and light material stock surfaces according to approved first-scope boundaries.

Includes:

- Product Model and SKU Variant views
- Product settings and stable code/value behavior
- ready stock, stock count, stock adjustment
- material stock, material purchase order, and material receipt surfaces where approved
- stock/material blocker visibility appropriate to each role

Out of scope:

- full Material Master, warehouse, BOM, or costing system beyond approved light material stock
- supplier/cost visibility for unauthorized roles
- stock behavior not documented in ADRs and source docs

Done when:

- product/stock permissions are enforced before rendering
- stock adjustment reason/log rules are preserved
- Admin/Sales sees only approved material blocker status, not material stock detail or cost

## Sector 9: Customer / CRM / Settings / Reports

Goal: implement customer, CRM, settings, and reporting surfaces that support operations without inventing new analytics or administration rules.

Includes:

- Customer and recipient records
- CRM notes and attachments according to approved visibility rules
- customer tier, special caution, deactivate/reactivate behavior
- role/permission settings only as approved for highest-authority users
- operational reports defined in source docs

Out of scope:

- customer merge
- sales channel analytics
- broad reporting not documented
- real external message integration
- new private CRM note behavior

Done when:

- CRM visibility follows Owner, Manager, Admin/Sales, and Finance rules
- Finance remains read-only for customer master data unless source docs change
- settings and reports do not expose Audit Log, finance, cost, or permission data to unauthorized roles
