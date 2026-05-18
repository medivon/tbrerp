# AI Model Usage Policy

This policy defines how Codex tasks should be used in the THAIBORAN ERP repository. It is a workflow policy only. It does not define product behavior, data models, API contracts, or database schema.

## Core Rule

Implementation and review must be separate Codex tasks.

- The implementer task reads `docs/implementation/current-task.md`, implements only that scope, and records handoff notes there.
- The reviewer task reads `docs/implementation/current-task.md`, reviews the implementation independently, and writes findings to `docs/implementation/review-report.md`.
- A task should not self-approve its own implementation.
- Handoff should happen through repository files, not repeated long manual prompts.

## Model Selection

Use a capable coding model for any task that changes code, permissions, workflow behavior, tests, or implementation docs.

Use a capable reviewer model for review tasks, especially when the work touches:

- permissions or access visibility
- sensitive data
- workflow state transitions
- order, job, shipment, finance, stock, CRM, or settings behavior
- shared UI patterns used by multiple sectors

Lightweight models may be used for formatting, spelling, summarizing already-approved docs, or preparing non-authoritative notes. They must not make or infer business decisions.

## Required Context

Before changing code, the implementer must read:

1. `docs/implementation/current-task.md`
2. The relevant sector in `docs/implementation/sector-plan.md`
3. `AGENTS.md`
4. `CONTEXT.md`
5. Relevant ADRs under `docs/adr/`
6. `docs/decision-log.md`
7. `docs/qa-summary.md`
8. Relevant UX/UI flow, screen, and design-system docs

Before reviewing code, the reviewer must read the same context plus the final implementation diff.

## Prohibited AI Behavior

Codex tasks must not:

- invent workflow states, permission rules, business rules, reports, schemas, migrations, API contracts, or domain modules
- turn archived mockups or generated image prompts into requirements
- expose sensitive fields in props, fixtures, tests, logs, screenshots, exports, or print previews
- keep hidden sensitive values in the UI and merely mask them
- convert unclear docs into code assumptions
- combine implementation and approval in one task

## Conflict Handling

If source docs conflict, the task must stop implementation and record the conflict in the active handoff file.

The task may propose where the decision should be resolved, but it must not choose a business answer unless the source docs already support it.

## Sensitive Data Handling

Use only safe fixture data. Never use real customer data, payment evidence, delivery evidence, production images, credentials, storage keys, or private operational records in prompts, fixtures, tests, logs, screenshots, or generated examples.

Permission-sensitive data must be filtered before rendering. Missing-permission users must not receive hidden sensitive fields in component props or test fixtures.
