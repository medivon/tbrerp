# Identity & Access Grill Notes - IA-BATCH-001

Temporary checkpoint notes for later Grill Doc consolidation. Not an official source-of-truth document.

## Batch Range

IA-001 to IA-025

## Questions Answered

- IA-001: Use one User system for everyone who can exist/login in ERP. Employee is not a separate login system; it is a user type.
- IA-002: Starting user types are `พนักงานภายใน` and `Outsource`.
- IA-003: Everyone who performs actions in the ERP uses a personal account. No shared team accounts.
- IA-004: Create User records for all internal employees, even if they do not actively use ERP yet.
- IA-005: Internal employees may login even without work permissions; default access is personal dashboard/profile only.
- IA-006: Base role `พนักงานไทยโบราณ` sees only personal dashboard/profile and no main work menus.
- IA-007: Create User records for all Outsource workers, even if some may not login often.
- IA-008: Outsource users may login and see their own information; the company may still record work/documents under their names and issue documents externally if they do not login.
- IA-009: Personal dashboard should support own work/documents/income. Employees can later see salary, daily wage, commission, and special-piece income. Outsource users see their own special-piece work/income.
- IA-010: If the same person changes between internal employee and Outsource, keep the same User and change type/status over time.
- IA-011: Changing user type is rare, but supported; it requires a reason and Audit Log.
- IA-012: Personal income display groups into `รายได้ประจำ` for employees and `รายได้พิเศษตามงาน` for both employees and Outsource. Rak Samuk income is a detail under work-based special income while keeping the existing Rak Samuk workflow.
- IA-013: Base `Outsource` role sees only personal dashboard, own work/documents/income, and no main company menus.
- IA-014: Outsource users who actually do Rak Samuk work receive an added `Rak Samuk Worker` role to open their own Rak Samuk work area.
- IA-015: Internal employees doing extra piece-work use work-based special income under the same User; they do not receive the Outsource role and do not need a second User.
- IA-016: One User can have multiple roles; permissions combine from assigned roles/permissions.
- IA-017: Starting role list: `Super Admin / Owner`, `Manager`, `Admin / Sales`, `Finance`, `Product / Stock`, `Woodwork`, `Coloring`, `Delivery Team`, `พนักงานไทยโบราณ`, `Outsource`, `Rak Samuk Worker`.
- IA-018: Starting roles with their own work area: `Admin / Sales`, `Manager`, `Finance`, `Product / Stock`, `Woodwork`, `Coloring`, `Delivery Team`, `Rak Samuk Worker`. `พนักงานไทยโบราณ` and base `Outsource` see only personal dashboard.
- IA-019: `Super Admin / Owner` is restricted to the owner/highest authority and should be very limited.
- IA-020: `Manager` can act for the owner in daily work, but not equal Owner for permission/system/Audit authority.
- IA-021: Only `Super Admin / Owner` can assign or edit Role/Permission for other users.
- IA-022: `Super Admin / Owner` and `Manager` can create/edit basic User information; Role/Permission assignment stays Owner-only.
- IA-023: New Users automatically receive a base role by user type: internal employee gets `พนักงานไทยโบราณ`; Outsource gets `Outsource`.
- IA-024: When a User leaves or stops working with the company, deactivate the User and disable login, while keeping names, history, work, income, and logs.
- IA-025: In the first scope, department work is not assigned to individual people; it moves through shared department/role queues. Person-specific responsibility mainly applies to Rak Samuk work and special-piece work. Future special work may link to Orders or Production, but not in this phase.

## Decisions Captured

- Identity model is one shared User model, not separate Employee/Outsource login systems.
- User type describes relationship to the company; Role/Permission controls access and actions.
- `พนักงานภายใน` and `Outsource` are the only starting user types.
- `พนักงานไทยโบราณ` and `Outsource` are base roles for personal dashboard access.
- Login is allowed for all active internal employees and Outsource users, but main work menus are role/permission gated.
- Personal accounts are required for traceability; shared team accounts are not allowed.
- Internal employees may have no operational ERP permission but still have a personal dashboard.
- Outsource users may view their own work/documents/income even if the company handles documents externally.
- Work-based special income is shared conceptually across internal employees and Outsource users.
- Rak Samuk remains a specific workflow/role under work-based special income.
- User type changes are rare, require reason, and go to Audit Log.
- User deactivation preserves history and disables login.
- First-scope operational work is mostly role/department shared queue, not individual assignment.

## Unclear Areas / Follow-Up Questions

- Exact contents of personal dashboard for employees versus Outsource users need later boundary decisions.
- Exact income categories under `รายได้ประจำ` and `รายได้พิเศษตามงาน` need a later finance/payroll-adjacent round.
- Exact permission matrix for each starting role is not yet complete.
- Exact module visibility for Manager, Finance, Product/Stock, worker roles, and base roles is not yet complete.
- Exact handling of deactivated Rak Samuk workers with assigned active work needs later detail, since Rak Samuk is person-specific.
- Whether `งานพิเศษตามงาน` should become a named canonical term needs later confirmation.

## Conflicts With Existing Docs

- No direct conflict found.
- Existing docs already say Rak Samuk Worker can login, sees only own work, and cannot move workflow status.
- Existing docs say department queues are shared by role/permission; IA-025 strengthens this by clarifying that first-scope department work is not individual-assigned.
- Existing docs use `User`, `Owner`, `Current Handler`, and `Action Log`; this batch adds clearer business meaning around User type and base personal access.

## Terms That May Need CONTEXT.md Updates Later

- `User`
- `User Type / ประเภทผู้ใช้งาน`
- `พนักงานภายใน`
- `Outsource`
- `Employee / พนักงาน`
- `พนักงานไทยโบราณ`
- `Personal Dashboard / Dashboard ส่วนตัว`
- `รายได้ประจำ`
- `รายได้พิเศษตามงาน`
- `Rak Samuk Worker`
- `Deactivated User / User ปิดใช้งาน`
- `Shared Department Queue / คิวแผนกกลาง`

## Decisions That May Need docs/decision-log.md Updates Later

- One User system covers internal employees and Outsource users.
- Employee is a user type, not a separate identity system.
- All active Users may login, but menu/action access is role/permission controlled.
- Base roles are automatically assigned by user type.
- Only Owner assigns/edits Role/Permission.
- Manager can create/edit basic User information but not assign permissions.
- User type changes require reason and Audit Log.
- User deactivation disables login and preserves all history.
- Department work is shared queue first; person-specific work is limited mainly to Rak Samuk and special-piece work in this phase.

## Possible ADR Candidates

- Possibly: one unified User identity model for employees and Outsource users. This may merit an ADR if later implementation would otherwise be tempted to split employee/outsource login systems.
- No ADR needed yet for personal dashboard or income grouping until payroll/payment boundaries become harder to reverse.

## Suggested Focus For Next Batch

- Finish login-scope rules for each starting role.
- Clarify first module visibility at a grouped level: dashboard, order, job/production, worker queues, shipment, stock/product, material purchase, CRM, finance/payment, expense/PV, settings, reports, logs.
- Start separating menu/list/detail access from action permissions without drilling into every field.
