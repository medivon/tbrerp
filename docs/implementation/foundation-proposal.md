# THAIBORAN ERP Codebase Foundation Proposal

This proposal recommends a minimal technical foundation for the main THAIBORAN ERP codebase. It is derived from the current docs and is not an implementation plan, API contract, database schema, or feature slicing document.

Current source docs remain the source of truth. This proposal must not override `CONTEXT.md`, ADRs, `docs/decision-log.md`, `docs/qa-summary.md`, UX/UI behavior docs, screen specs, or visual design system files.

## 1. Recommended Stack

Recommended foundation:

- Language: TypeScript.
- Runtime: Node.js.
- Web app: Next.js with React.
- Styling: Tailwind CSS with a small internal component system.
- Database direction: PostgreSQL.
- ORM direction: Drizzle ORM.
- Testing: Vitest, React Testing Library, and Playwright.
- Package manager: pnpm.

Why this stack fits THAIBORAN ERP:

- The ERP needs a single Thai-first responsive web app for dense admin work and mobile/tablet worker screens.
- Next.js supports authenticated app routes, role-aware first-screen routing, server-rendered read-only dashboards, and later backend endpoints without starting with multiple deployable services.
- TypeScript helps future agents preserve domain language and permission-sensitive UI contracts in one codebase.
- PostgreSQL is a good fit for operational records, immutable history, logs, permissions, documents, and queue-style read models.
- Drizzle keeps persistence explicit and SQL-aligned, which is useful for an ERP with careful history and permission boundaries.

Do not choose this stack as permission to create database schema, API contracts, or business workflow code before the relevant implementation work is approved.

## 2. Repository Structure

Recommended minimal workspace shape:

```text
apps/
  web/
    src/
      app/
      features/
      shared/
      styles/
      test/
packages/
  ui/
  domain/
  data-access/
  config/
docs/
  implementation/
  ux-ui/
  adr/
```

Intended ownership:

- `apps/web`: the Next.js application, routing, layouts, app shell, pages, and screen composition.
- `apps/web/src/features`: feature folders grouped by business area, such as admin dashboard, identity, order, job, shipment, stock, finance, customer, and settings when those areas are approved for implementation.
- `apps/web/src/shared`: cross-feature app helpers, route guards, formatting, shell composition, and non-domain utilities.
- `packages/ui`: reusable visual components that implement `visual-design-system.md` and `responsive-mobile.md`.
- `packages/domain`: canonical domain terms, permission names, status display helpers, and pure business-safe UI/domain helpers. Keep persistence and UI framework code out of this package.
- `packages/data-access`: database and query adapters when persistence is approved. Do not add schema from this proposal alone.
- `packages/config`: shared TypeScript, lint, test, and formatting configuration.
- `docs/implementation`: implementation proposals and later technical notes. These remain subordinate to business/UX source docs.

Keep the first codebase small. Do not split into separate frontend/backend repositories unless deployment or team constraints later require it.

## 3. Package Manager

Use `pnpm`.

Baseline expectations:

- One root workspace.
- Lockfile committed.
- Scripts named consistently across packages, such as `dev`, `build`, `lint`, `format`, `typecheck`, `test`, and `test:e2e`.
- Avoid mixing npm, yarn, bun, and pnpm lockfiles.

## 4. Frontend Framework

Use Next.js App Router with React and TypeScript.

Frontend requirements from the docs:

- Thai-first navigation and labels.
- Role-aware first screen after login.
- Permission-aware navigation where missing-permission modules are removed, not disabled.
- Desktop/tablet admin shell for dense queues.
- Mobile/tablet worker shell for Woodwork, Coloring, Delivery Team, and Rak Samuk Worker.
- No-access route state with `ไม่มีสิทธิ์เข้าถึงหน้านี้` and only return-to-own-home action.
- Read-first detail pages and guarded edit/review flows when those screens are later implemented.

Routing should mirror UX areas rather than database tables. Use staff-facing module language such as dashboard, orders, jobs/production, shipments, product-stock, customer-crm, finance, and settings.

## 5. Styling and Component Strategy

Use Tailwind CSS for tokens, layout, density, and responsive behavior. Build a small internal component library in `packages/ui`.

Recommended component direction:

- Use Radix UI primitives where accessible behavior matters, such as dialog, drawer/sheet, popover, menu, tabs, tooltip, select, checkbox, and radio.
- Use lucide icons for operational icons.
- Use `Noto Sans Thai` as the primary UI typeface with a neutral Latin fallback.
- Encode visual tokens from `visual-design-system.md`: colors, spacing, chips, table density, cards, drawers, modals, evidence upload, no-access, stale state, and print preview rules.
- Encode responsive behavior from `responsive-mobile.md`: desktop admin shell, tablet stacked rows, mobile worker shell, drawer-to-full-screen-sheet, table-to-card, touch targets, and sticky action rules.

Component boundaries should protect permission behavior:

- Components must not accept hidden sensitive values and merely mask them.
- Permission filtering should happen before rendering the component.
- Finance amounts, payment evidence, cost, profit, payout, Rak Samuk standard rates, Management Log, and Audit Log must not appear in role-limited component props unless the calling screen has permission.

Avoid generic dashboard kits, decorative SaaS templates, marketing hero layouts, heavy animation, and chart-first visual systems.

## 6. Backend / API Direction

Start with a modular server-side application layer inside the same TypeScript workspace.

Recommended direction:

- Keep backend logic organized by domain module and use case, not by raw CRUD resources.
- Put permission checks at the server boundary before data is returned to the UI.
- Return role-appropriate read models so sensitive fields are omitted entirely, not present as masked or null UI placeholders.
- Keep shared queue behavior explicit: same-permission users can continue work, owner is traceability, and stale-state refresh protects shared work.
- Use internal server actions or route handlers only when implementation needs them.

Do not define public API contracts from this proposal. API shapes should be created later from approved screen/use-case work, with the active docs open beside the implementation.

For the first slice, prefer a read-only dashboard data adapter that can be backed by fixture data until persistence is approved. The adapter exists to prove app boundaries, not to define final API behavior.

## 7. Database / ORM Direction

Use PostgreSQL as the system-of-record direction and Drizzle ORM for future schema/migration work.

Database principles to preserve later:

- Critical history is not physically deleted. Use close, deactivate, cancel, hide, archive, correction, and log records according to the source docs.
- Permission-sensitive data must be filtered server-side before it reaches UI components.
- Activity Log, Management Log, and Audit Log are separate concepts and must not be collapsed.
- Draft Order, Order, Job, Shipment, Payment Record, Financial Follow-up, PV, Product/SKU, Stock, Material, Customer/CRM, and Service Case have distinct domain meanings.
- Old generated mockups must not drive schema or data model choices.

Do not create database tables, migrations, seed data, enum sets, or ORM schema from this proposal. Database design should happen only when the corresponding domain implementation work is approved.

## 8. Environment File Plan

Recommended files:

- `.env.example`: committed, documents required variable names with empty values or safe placeholders.
- `.env.local`: ignored, developer local values.
- `.env.test`: ignored or generated for local test runs.
- Production/staging environment values: managed by deployment platform or secret manager, not committed.

Likely environment categories:

- App URL and deployment environment.
- Auth/session secrets.
- Database connection.
- File/evidence storage provider.
- Optional observability.

Do not commit real customer data, payment evidence, delivery evidence, production images, credentials, or storage keys.

## 9. Lint / Format / Test Baseline

Baseline quality gates:

- TypeScript strict mode.
- ESLint for TypeScript, React, Next.js, import boundaries, and accessibility rules.
- Prettier for formatting.
- Vitest for pure domain helpers, permission helpers, and formatting utilities.
- React Testing Library for component states such as no-access, hidden nav, dashboard cards, empty/loading/stale states, and responsive component variants.
- Playwright for first-slice browser checks at `375`, `768`, `1024`, and `1440` widths.

First-slice smoke checks should cover:

- Login landing chooses the correct first screen by role priority.
- Base-role users land on Personal Dashboard/profile placeholder, not Admin Dashboard.
- Admin/Sales sees the Admin Dashboard route and Thai sidebar labels.
- Missing-permission routes show `ไม่มีสิทธิ์เข้าถึงหน้านี้`.
- Admin Dashboard shows the six approved cards and does not show finance amounts.
- Mobile width removes desktop sidebar and preserves readable content.

## 10. Documentation Source-of-truth Rules for Implementation

Use source docs in this order when implementing:

1. `CONTEXT.md`
2. `docs/adr/*.md`
3. `docs/decision-log.md`
4. `docs/qa-summary.md`
5. `docs/ux-ui/04-interaction-modal-behavior.md`
6. `docs/ux-ui/README.md`
7. Relevant screen specs under `docs/ux-ui/screens/`
8. `docs/ux-ui/design-system/visual-design-system.md`
9. `docs/ux-ui/design-system/responsive-mobile.md`
10. Relevant page visual guidance under `docs/ux-ui/design-system/pages/`

Rules:

- Do not treat archived mockups, old generated images, or old image prompts as source of truth.
- Do not change business behavior in code when docs are unclear. Update the source docs first.
- Do not use staff-facing labels such as `CRUD`, `Master`, or `ข้อมูลตั้งต้นสินค้า`.
- Use Thai-first UI labels and established internal terms exactly where the docs define them.
- Keep visual design files derivative; they guide presentation but do not override behavior or permissions.
- Implementation must preserve source-doc rules for permissions, evidence, reason capture, stale state, draft behavior, Shipment Builder, COD final-round visibility, PV boundaries, completed Order immutability, and worker visibility.

## 11. AI Coding Agent Rules

Future AI agents working in this repo should follow these rules:

- Read the relevant source docs before changing code.
- Keep each change small and tied to a documented screen, behavior, or visual-system rule.
- Do not invent workflow states, approval steps, finance gates, drafts, API resources, database tables, or reports.
- Do not expose hidden sensitive fields in component props, fixtures, tests, screenshots, logs, exports, or print previews.
- Remove missing-permission navigation/actions entirely; show disabled actions only for state-blocked actions that the user otherwise has permission to perform.
- Preserve read-first detail behavior and guarded review/confirmation flows.
- Keep worker screens role-limited and free of customer, Order ID, payment, cost, payout, Management Log, and Audit Log.
- Keep Delivery Team separate from admin Shipment close and COD/payment follow-up close.
- Keep Rak Samuk prices out of Order, Production, and Job workflow pages.
- Do not use archived mockup images as active source of truth.
- Before committing UI work, verify responsive behavior at the documented breakpoints and check that Thai text wraps cleanly.
- When implementation reveals a source-doc conflict, stop and update the proper doc instead of burying the decision in code.

## 12. Recommended First Implementation Slice

Recommended first slice: App shell + role-aware login landing + Admin Dashboard read-only.

Purpose:

- Prove the technical foundation without implementing business mutations.
- Establish Thai-first visual language, routing, role-aware shell behavior, permission-aware navigation removal, no-access state, and responsive layout.
- Create a safe base for later screen implementations without committing to API contracts or database schema.

Included scope:

- One login landing flow that routes active users by documented role priority.
- Personal Dashboard/profile placeholder for base-role-only users.
- Desktop admin app shell with Thai sidebar labels from `app-shell.md` and `visual-design-system.md`.
- Admin Dashboard read-only page using the six approved queue-launch cards:
  - `ออเดอร์ที่ต้องติดตาม`
  - `งานกำลังผลิต`
  - `รอสร้างรอบจัดส่ง`
  - `ยืนยันการจัดส่ง`
  - `งานผลิตต้องติดตาม`
  - `ติดตาม COD / Payment`
- Compact `งานที่ต้องรีบดู` read-only preview.
- Permission-aware nav removal and no-access page.
- Fixture-backed read-only dashboard adapter until real persistence is approved.
- Responsive behavior for desktop, tablet, and phone fallback according to `responsive-mobile.md`.

Explicit exclusions:

- No Order creation.
- No Job actions.
- No Shipment creation, send-out, or close.
- No Payment Record, COD close, Expense, payout, or PV actions.
- No Product/SKU, stock, material, customer, settings, or role-management mutations.
- No API contract.
- No database schema or migrations.
- No implementation of business queues beyond read-only dashboard display.

Acceptance direction for the slice:

- The UI looks like THAIBORAN ERP, not a generic SaaS dashboard.
- Admin Dashboard is a queue launcher, not a full task table.
- Dashboard does not show baht amounts, payment evidence, COD expected/actual values, cost, profit, payout, Rak Samuk rates, Management Log, or Audit Log.
- Role-aware first-screen routing follows the documented priority.
- Base roles do not see main ERP module navigation.
- Direct restricted routes show the standard no-access state.
- Responsive behavior is verified at `375`, `768`, `1024`, and `1440` widths.
