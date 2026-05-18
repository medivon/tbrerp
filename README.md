# THAIBORAN ERP

Main code repository for THAIBORAN ERP.

The source-of-truth documents remain in `CONTEXT.md`, `docs/adr/`, `docs/decision-log.md`, `docs/qa-summary.md`, and `docs/ux-ui/`. Implementation should follow those docs rather than archived mockups or generated images.

## Local Setup

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
```

The current app is only the technical foundation placeholder. It does not implement ERP business workflows, real authentication, database schema, migrations, or business API contracts.
