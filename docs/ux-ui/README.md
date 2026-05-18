# UX/UI Documentation

This folder contains UX/UI handoff documents derived from the active repository source of truth. These files organize design work; they do not replace the confirmed business decisions.

## Authoritative Sources

Use these files as the source of truth, in this order when conflicts appear:

1. `CONTEXT.md`
2. `docs/adr/*.md`
3. `docs/decision-log.md`
4. `docs/qa-summary.md`
5. `docs/ux-ui/04-interaction-modal-behavior.md`
6. `docs/ux-ui/initial-scope.md`

Do not create new requirement summaries in this folder. If a requirement, term, rule, or decision is missing or unclear, update the authoritative source first, then update the relevant UX/UI working file.

## File Purposes

- `initial-scope.md`: existing confirmed UX/UI starting scope. Keep as the scope note for Stage 1.
- `01-flow-map.md`: maps the confirmed operational flows and handoffs between roles/screens.
- `02-screen-inventory.md`: lists screens needed for the confirmed starting scope and tracks which ones still need detailed specs.
- `03-navigation-map.md`: defines how users move through the Stage 1 screens and role-based navigation.
- `04-interaction-modal-behavior.md`: consolidates confirmed modal/drawer/confirmation/reason/evidence/navigation behavior for starting-workflow actions.
- `design-system/`: shared shell and reusable UI behavior such as table pagination.
- `open-questions.md`: captures narrow UX/UI questions that block design details only; do not use it to restart discovery.
- `screens/`: future per-screen UX specs.
- `image-prompts/`: future prompts or references for design images, mockup imagery, or visual asset generation.
- `mockups/`: approved visual anchors or placeholder README files for screens that still need generated/reviewed mockups.

## Update Rules

- Keep UX/UI files derivative and traceable to the authoritative sources.
- When a new QA decision is made, update `docs/decision-log.md` or `docs/qa-summary.md` first, then adjust the affected UX/UI file.
- When a hard-to-reverse product decision changes, add or update an ADR before changing UX/UI handoff files.
- Add detailed screen specs only under `screens/`.
- Add visual prompt material only under `image-prompts/`.
- Add mockup approval notes or pending mockup placeholders only under `mockups/`.
- Keep `open-questions.md` limited to specific UX blockers with enough context to answer them later.

## No Duplicate Summary Docs

Do not create parallel handoff packages, recap files, alternate summaries, or copied requirement documents under `docs/ux-ui/`. Extend the named files in this structure instead.
