# THAIBORAN ERP Agent Rules

This is the main THAIBORAN ERP code repo. The docs are the source of truth.

- Read the relevant docs before code changes: `CONTEXT.md`, `docs/adr/`, `docs/decision-log.md`, `docs/qa-summary.md`, and the relevant UX/UI files.
- If docs conflict, stop and report the conflict. Do not resolve it silently in code.
- Do not invent workflow states, approval steps, permissions, reports, API contracts, database schema, or business modules.
- Do not change business rules in code.
- Do not use archived mockups, legacy files, old screenshots, or image prompts as source of truth.
- Do not expose sensitive data in UI, fixtures, tests, logs, screenshots, exports, or print previews.
- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled and must show the reason.
- Implementer and reviewer Codex tasks communicate through `docs/implementation/current-task.md` and `docs/implementation/review-report.md`.
