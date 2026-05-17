# Unified User Identity for Staff and Outsource

THAIBORAN ERP uses one `User` identity system for internal employees and Outsource workers instead of separate Employee and Outsource login systems. User Type records the business relationship (`พนักงานภายใน` or `Outsource`), while roles and permissions decide what each person can see or do. This keeps history, personal dashboards, income records, and future role changes tied to one person even when their working relationship changes over time.

## Consequences

Base roles must be intentionally limited: `พนักงานไทยโบราณ` and `Outsource` can login but see only personal dashboard/profile and own documents/income until operational roles are assigned. User deactivation disables login and new-work selection, but preserves the same identity in history.
