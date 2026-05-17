# Identity & Access Grill Notes - IA-BATCH-003

Temporary checkpoint notes for later Grill Doc consolidation. Not an official source-of-truth document.

## Batch Range

IA-051 to IA-075

## Questions Answered

- IA-051: `ตั้งค่า` menu appears only for Users with at least one settings permission, and each User sees only permitted settings submenus.
- IA-052: `Roles / Permissions` is visible and editable only by `Super Admin / Owner`.
- IA-053: Role/Permission changes do not require a reason in the first scope, but must write Audit Log.
- IA-054: When Owner changes a User's Role/Permission, the changed User does not need an in-system notification first. The permission change takes effect and Audit Log records it.
- IA-055: Role/Permission changes take effect immediately. If a logged-in User is on a page they no longer have permission for, the system should send them back to their first screen or show no-access.
- IA-056: Direct links to pages without permission are blocked and show a no-access page with a return-to-own-home action.
- IA-057: In the first scope, avoid cases where a User can see a list but cannot open detail. If a User sees a record in a list, they should be able to open the role-appropriate detail.
- IA-058: Sensitive fields that a User cannot see should be hidden entirely, without labels, empty placeholders, or masked values.
- IA-059: Roles unrelated to money, such as Woodwork/Coloring/Product-Stock in production context, should not see financial signals at all, including COD, payment status, money amounts, or sales price.
- IA-060: Customer/recipient visibility: Owner, Manager, Admin/Sales see Customer/CRM according to access; Delivery Team sees only shipment recipient/phone/address; worker roles do not see customer/recipient; Product/Stock sees customer only when truly needed for stock/material context and normally not.
- IA-061: `Customer / CRM` is visible in full to Owner, Manager, Admin/Sales, and Finance.
- IA-062: No private CRM Note in the first scope. All CRM Notes under a Customer are visible to roles with full CRM access.
- IA-063: Customer Sales Summary / `ยอดซื้อรวม` is visible to Owner, Manager, Admin/Sales, and Finance.
- IA-064: Expense/PV full access belongs to Owner, Manager, and Finance. Admin/Sales is not full-access by default.
- IA-065: Admin/Sales can create Expense and see Expense records created by themselves or their department. Admin/Sales cannot see all Expense records, approve/pay Expense, or create PV unless they also have Finance permission.
- IA-066: Expense created by Admin/Sales should include evidence when available, such as receipt/slip photo. If no evidence exists, the creator must add a note/reason.
- IA-067: Normal Expense creation writes Activity Log. Later edit/cancel/money change writes Management Log.
- IA-068: Reports access follows role: Owner/Manager see all reports; Finance sees finance/expense/payment reports; Admin/Sales sees operational/sales reports without cost/profit; Product/Stock sees stock/material reports; worker/base roles do not see reports.
- IA-069: Activity/Management timeline appears inside related detail screens. A combined Logs menu exists only for Owner/Manager/Finance according to permission. Audit Log is Owner-only.
- IA-070: Roles that can open a detail screen can see Activity Log for that detail in a role-appropriate form. Worker roles can see production activity, but not finance/customer-sensitive activity.
- IA-071: Owner/Manager see full Management Log. Admin/Sales sees only management events tied to their operational work, such as shipment correction/cancel or order edit reason. Worker/base roles do not see Management Log.
- IA-072: Finance sees Management Log for money/expense/payment/PV/Rak Samuk payout and Order/Shipment events that affect money. Finance does not see every production/CRM management event by default.
- IA-073: Audit Log is visible only to `Super Admin / Owner`.
- IA-074: Export is permission-aware like UI; Users can export only data/columns they can see.
- IA-075: Print is permission-aware like UI; printed documents must not reveal data the printing User cannot see.

## Decisions Captured

- Settings menu and submenus are permission-scoped.
- Role/Permission administration is Owner-only.
- Role/Permission changes are immediate and Audit Logged, but no reason or user notification is required in first scope.
- Direct-link access must respect permissions.
- List/detail access is kept simple: list access implies role-appropriate detail access.
- Hidden sensitive data should disappear from UI rather than be masked.
- Non-money roles should not even see money signals unless their role specifically needs them.
- CRM full access includes Finance.
- No private CRM Notes in first scope.
- Admin/Sales has limited Expense creation/list visibility by creator/department, not full Expense/PV access.
- Expense evidence is expected when available; missing evidence requires note/reason.
- Reports, logs, export, and print all follow permission-aware visibility.
- Audit Log remains Owner-only.

## Unclear Areas / Follow-Up Questions

- Exact action permissions for Orders, Jobs, Shipment, Product/Stock, Material Purchase, CRM, Finance Follow-up, Expense, PV, Settings, and Logs still need to be completed.
- Exact sensitive-field matrix needs grouped confirmation, especially cost, profit, supplier payment, Rak Samuk standard rate, worker payout, salary/daily wage/commission, payment evidence, and CRM contact data.
- Exact role behavior for Manager operational actions still needs clarity: view-only versus can act/override in each module.
- Exact department definition for Admin/Sales Expense list visibility needs later wording.
- Exact no-access wording and UX is not needed now but should be designed later.
- Whether Role/Permission changes should ever require reason for emergency/security cases remains intentionally light in first scope.

## Conflicts With Existing Docs

- No direct conflict for private CRM Note; existing docs already deferred private CRM Note.
- Existing docs already say exports are permission-aware, now extended explicitly to print.
- Existing docs do not fully define Finance full CRM access; IA-061 confirms Finance sees CRM full.
- Existing docs say reason is required for some management actions, but Role/Permission change now specifically does not require reason while still writing Audit Log.

## Terms That May Need CONTEXT.md Updates Later

- `Permission-aware Export`
- `Permission-aware Print`
- `No-access Page`
- `Role-appropriate Detail`
- `Sensitive Field`
- `Full CRM Access`
- `Expense Department Visibility`
- `Logs Menu`
- `Audit Log Owner-only`

## Decisions That May Need docs/decision-log.md Updates Later

- Owner-only Role/Permission settings.
- Role/Permission changes take effect immediately and write Audit Log without required reason.
- Direct links are blocked when permission is missing.
- Sensitive fields are hidden entirely when unauthorized.
- Full CRM access includes Finance.
- Admin/Sales can create Expense and see only own/department-created Expense.
- Expense creation evidence/note rule.
- Logs visibility by role and log level.
- Export and print follow UI permissions.

## Possible ADR Candidates

- Possibly: hide sensitive fields entirely instead of masking or showing `ไม่มีสิทธิ์ดู`. This affects many screens but is a UX/security convention more than a hard architecture decision.
- Possibly: permission-aware print/export as a global rule if future implementation might be tempted to use document templates that ignore UI permissions.
- No ADR needed yet for Owner-only Audit Log unless later challenged.

## Suggested Focus For Next Batch

- Start grouped action permission rules across modules.
- Clarify who can create/edit/cancel/close Orders, Jobs, Shipments, Products, Stock movements, Material Purchase Orders, CRM records, Expense, PV, and Settings.
- Clarify reason/evidence/log requirements for high-impact actions.
- Start sensitive-field matrix if action scope becomes clear enough.
