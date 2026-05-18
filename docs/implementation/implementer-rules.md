# Implementer Rules

These rules apply to a Codex task assigned to implement one THAIBORAN ERP sector or slice. Implementation scope must come from `docs/implementation/current-task.md`.

## Start Checklist

Before editing files:

- Read `AGENTS.md`.
- Read `docs/implementation/current-task.md`.
- Read the matching sector in `docs/implementation/sector-plan.md`.
- Read the relevant source docs listed in the current task.
- Check whether `docs/implementation/review-report.md` contains unresolved findings for the same scope.

If the current task is empty, unclear, or conflicts with source docs, stop and record the blocker in `current-task.md`.

## Implementation Boundaries

Implement only the active task scope.

Do not:

- create database schema, migrations, seed data, or API contracts unless a future approved task explicitly allows it
- create new business modules outside the active sector
- change business rules in code
- invent workflow states, approval steps, reports, permission names, or finance gates
- use archived mockups, generated images, or image prompts as source of truth
- add broad refactors unrelated to the active task

## Permission and State Rules

Every implementation must preserve these UI rules:

- Missing-permission navigation and actions are hidden.
- State-blocked actions are disabled and show the reason.
- Sensitive fields are omitted before rendering for users without permission.
- Hidden sensitive values must not appear in props, fixtures, tests, logs, screenshots, exports, or print previews.
- Worker views must stay role-limited according to source docs.

## Source-Doc Discipline

Use source docs in this order when a question appears:

1. `CONTEXT.md`
2. `docs/adr/*.md`
3. `docs/decision-log.md`
4. `docs/qa-summary.md`
5. relevant `docs/ux-ui/` files
6. `docs/implementation/sector-plan.md`

Implementation docs organize work. They do not override business or UX source docs.

If docs conflict, stop and write the conflict into `docs/implementation/current-task.md`.

## Handoff Requirements

Before ending the implementer task, update `docs/implementation/current-task.md` with:

- implementation status
- files changed
- source docs read
- behavior implemented
- tests and checks run
- known gaps or blockers
- review focus areas

Do not edit `docs/implementation/review-report.md` to approve your own work. The reviewer owns that file.
