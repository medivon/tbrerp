# Reviewer Checklist

Use this checklist for a separate Codex review task after implementation. The reviewer writes results to `docs/implementation/review-report.md`.

## Required Inputs

Read before reviewing:

- `AGENTS.md`
- `docs/implementation/current-task.md`
- `docs/implementation/sector-plan.md`
- `docs/implementation/implementer-rules.md`
- the source docs named in the current task
- the implementation diff
- for frontend/UI work, the Visual Intent recorded in `current-task.md`

If the implementation scope cannot be traced to the current task and source docs, mark the review blocked.

## Review Questions

### Scope

- Does the diff stay inside the active task?
- Did it avoid unrelated refactors?
- Did it avoid creating database schema, migrations, API contracts, or new business modules without approval?
- Did it avoid changing business rules in code?

### Source-Doc Alignment

- Can every user-visible behavior be traced to active source docs?
- Did the implementation avoid archived mockups and generated image prompts as requirements?
- Were any unclear or conflicting docs resolved by code instead of being reported?
- Are existing THAIBORAN domain terms preserved?

### Permissions and Sensitive Data

- Are missing-permission navigation items and actions hidden?
- Are state-blocked actions disabled with a visible reason?
- Are sensitive fields omitted before rendering for users without permission?
- Do fixtures, tests, screenshots, logs, exports, and print previews avoid sensitive data?
- Do worker screens avoid customer, Order ID, payment, cost, payout, Management Log, and Audit Log data unless source docs explicitly allow it?

### UX and Accessibility

- Does the implementation follow relevant UX/UI screen specs and design-system docs?
- For frontend/UI work, did the implementer create a short Visual Intent before coding, including visual mood, density, shell/palette direction, component polish goals, responsive behavior, and what not to do?
- Did the implementation actively apply UI UX Pro Max visual guidance together with the current THAIBORAN visual design system, rather than only reading visual docs passively?
- Does the frontend look intentionally designed, not merely functional?
- Does it avoid generic plain UI, decorative marketing UI, over-animated UI, and low-contrast dark content surfaces?
- If using a dark/navy shell, do main work surfaces remain readable and practical for dense ERP work?
- Are visual hierarchy, spacing, hover/focus/cursor states, responsive behavior, accessibility, and image handling polished without changing business rules, workflow, permissions, sensitive-data visibility, or source-of-truth decisions?
- Does Thai-first text fit and wrap cleanly at required breakpoints?
- Are disabled, loading, empty, stale, and no-access states handled where relevant?
- Are role-aware routes, lists, and detail pages consistent with source docs?

### Tests and Verification

- Were appropriate lint, typecheck, unit, component, and browser checks run for the scope?
- Do tests assert permission visibility and state-blocked behavior where relevant?
- Are snapshots or screenshots free of sensitive data?
- Are known gaps recorded in the handoff?

## Report Format

Write findings in `docs/implementation/review-report.md`.

Use this severity scale:

- Blocker: must be fixed before merge or continued implementation
- Major: likely behavior, permission, security, or source-doc mismatch
- Minor: localized issue or missing verification
- Note: non-blocking observation

A review is complete only when the report includes a clear status: `approved`, `changes requested`, or `blocked`.
