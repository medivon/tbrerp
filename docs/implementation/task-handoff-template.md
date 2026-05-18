# Task Handoff Template

Copy this template into `docs/implementation/current-task.md` when starting a new implementer task.

```md
# Current Implementation Task

Status: ready for implementation
Sector:
Task owner:
Date started:

## Goal

Describe the coherent user-visible sector outcome.

## Scope

- Include:
- Include:
- Include:

## Out of Scope

- No database schema, migrations, or seed data unless explicitly approved.
- No API contracts unless explicitly approved.
- No business-rule changes.
- No unrelated modules or refactors.

## Source Docs To Read

- `AGENTS.md`
- `docs/implementation/sector-plan.md`
- `CONTEXT.md`
- `docs/adr/`
- `docs/decision-log.md`
- `docs/qa-summary.md`
- relevant `docs/ux-ui/` files:

## Permission and Sensitive Data Rules

- Missing-permission actions are hidden.
- State-blocked actions are disabled with reason.
- Sensitive fields are omitted before rendering for users without permission.
- No sensitive data in fixtures, tests, logs, screenshots, exports, or print previews.

## Implementation Notes

Record decisions that are already supported by source docs.

## Files Changed

-

## Checks Run

-

## Known Gaps or Blockers

-

## Reviewer Focus

-
```
