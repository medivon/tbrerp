# THAIBORAN ERP Codebase Foundation Proposal

This proposal recommends a minimal technical foundation for the main THAIBORAN ERP codebase. It is derived from the current docs and is not an implementation plan, API contract, database schema, or feature slicing document.

Current source docs remain the source of truth. This proposal must not override `CONTEXT.md`, ADRs, `docs/decision-log.md`, `docs/qa-summary.md`, UX/UI behavior docs, screen specs, or visual design system files.

## 1. Recommended Stack

Recommended foundation:

- Language: TypeScript.
- Runtime: Node.js.
- Web app: Next.js App Router with React.
- Styling: Tailwind CSS with shadcn/ui and Radix UI primitives.
- Database direction: PostgreSQL.
- ORM direction: Prisma for future PostgreSQL-backed persistence work.
- Testing: Vitest, React Testing Library, and Playwright.
- Package manager: pnpm workspace.

Why this stack fits THAIBORAN ERP:

- The ERP needs a single Thai-first responsive web app for dense admin work and mobile/tablet worker screens.
- Next.js App Router supports a single Thai-first app shell, server-rendered read-only placeholders, and later backend endpoints without starting with multiple deployable services.
- TypeScript helps future agents preserve domain language and permission-sensitive UI contracts in one codebase.
- PostgreSQL is a good fit for operational records, immutable history, logs, permissions, documents, and queue-style read models.
- Prisma is the approved ORM direction for future PostgreSQL-backed persistence work. This proposal does not approve ERP domain schema design.

Do not choose this stack as permission to create Prisma ERP domain schema, migrations, database tables, API contracts, real authentication, real permission management, seed data, or business workflow code before the relevant implementation work is approved.

## 2. Repository Structure

Recommended minimal workspace shape:

```text
apps/
  web/
    src/
      app/
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
- `apps/web/src/shared`: cross-feature app helpers, route guards, formatting, shell composition, and non-domain utilities.
- `packages/ui`: reusable THAIBORAN ERP visual components that wrap shadcn/ui conventions and Radix UI primitives where practical. The primitives live below the ERP component layer; they are not themselves the domain UI contract.
- `packages/domain`: canonical domain terms, permission names, status display helpers, and pure business-safe UI/domain helpers. Keep persistence and UI framework code out of this package.
- `packages/data-access`: database and query adapters when persistence is approved. Do not add Prisma schema, migrations, or database tables from this proposal alone.
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

Routing should mirror UX areas rather than database tables when those areas are approved for implementation. The foundation pass should only create a minimal placeholder page and must not implement Admin Dashboard, login, role selector, no-access, business navigation, or business fixtures.

## 5. Styling and Component Strategy

Use Tailwind CSS for tokens, layout, density, and responsive behavior. Use shadcn/ui conventions and Radix UI as implementation primitives in the web app, and wrap reusable THAIBORAN ERP components in `packages/ui` where practical.

Recommended component direction:

- Use Radix UI primitives where accessible behavior matters, such as dialog, drawer/sheet, popover, menu, tabs, tooltip, select, checkbox, and radio.
- Use shadcn/ui conventions for baseline component composition, styling, and local component ownership.
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

Do not define public or internal business API contracts from this proposal. API shapes should be created later from approved screen/use-case work, with the active docs open beside the implementation.

For the first functional slice after this foundation pass, use fixture users and a mock role selector only. That fixture selector is a temporary development surface for the first slice, not real authentication. Do not implement real login, sessions, auth providers, or persistent permission management yet.

## 7. Database / ORM Direction

Use PostgreSQL as the system-of-record direction and Prisma as the approved ORM direction for future persistence work.

No ERP domain schema, migrations, seed data, enum sets, database tables, or generated Prisma client should be added during the foundation setup. Add database artifacts only after a future approved domain implementation task defines the relevant data model from source docs.

Database principles to preserve later:

- Critical history is not physically deleted. Use close, deactivate, cancel, hide, archive, correction, and log records according to the source docs.
- Permission-sensitive data must be filtered server-side before it reaches UI components.
- Activity Log, Management Log, and Audit Log are separate concepts and must not be collapsed.
- Draft Order, Order, Job, Shipment, Payment Record, Financial Follow-up, PV, Product/SKU, Stock, Material, Customer/CRM, and Service Case have distinct domain meanings.
- Old generated mockups must not drive schema or data model choices.

Do not create database tables, migrations, seed data, enum sets, or Prisma ERP domain schema from this proposal. Database design should happen only when the corresponding domain implementation work is approved.

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

The foundation pass should add only lightweight test tooling. Slice-specific tests should be introduced with the approved slice that owns the behavior.

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

## 12. Foundation Setup Boundary

The first code pass should initialize the pnpm workspace, Next.js App Router app, Tailwind baseline, shadcn/ui and Radix UI baseline, package boundaries, environment example, and lightweight quality tooling.

It must not implement Admin Dashboard, login, role selector, no-access page, business navigation, business fixtures, Order, Job, Shipment, Payment, Stock, CRM, Finance, Settings, real permission management, real authentication, sessions, business API routes, Prisma ERP domain schema, migrations, or seed data.
