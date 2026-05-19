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
- User-facing UI is product UI for real staff, not developer notes. Do not show sector numbers, implementation phases, placeholder/mock/fixture wording, in-memory/database-not-connected status, "not implemented yet", future-implementation notes, agent workflow, or developer instructions in the product UI.
- Every visible action must have a clear user meaning. Hide missing-permission actions; disable state-blocked actions with concise Thai business reasons; hide future-sector actions unless workflow context truly requires a disabled business-state explanation. Do not leave dead buttons or active-looking controls that do nothing.
- Frontend/UI work must stress-check Thai text layout at `375px`, `768px`, `1024px`, and `1440px`, including overflow, clipping, overlap, icon/text collisions, table/card/button/chip collisions, modal/drawer overflow, and page-level horizontal overflow.
- Frontend/UI work must use UI UX Pro Max visual guidance together with the current THAIBORAN visual design system. Implementers must create a short Visual Intent before coding UI work; do not only read visual docs passively.
- UI UX Pro Max may improve visual hierarchy, spacing, hover/focus/cursor states, responsive behavior, accessibility, and image handling. It must not change business rules, workflow, permissions, sensitive-data visibility, or source-of-truth decisions.
- Current visual direction allows premium operational ERP styling, including dark/navy shell treatment where it improves hierarchy and readability. Main work surfaces must stay readable and practical for dense ERP work.
- Reviewers must reject frontend work that is generic plain UI, decorative marketing UI, over-animated UI, or low-contrast dark content surfaces.
- Implementer and reviewer Codex tasks communicate through `docs/implementation/current-task.md` and `docs/implementation/review-report.md`.
