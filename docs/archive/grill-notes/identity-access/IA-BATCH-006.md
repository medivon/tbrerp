# Identity & Access Grill Notes - IA-BATCH-006

Temporary checkpoint notes for later Grill Doc consolidation. Not an official source-of-truth document.

## Batch Range

IA-126 to IA-150

## Questions Answered

- IA-126: Production images/files are visible to roles involved with that production context: Admin/Sales, Manager, Owner, Woodwork, Coloring, Rak Samuk Worker for assigned work, and Product/Stock when tied to Product/SKU context. Finance, Delivery, base roles, and unrelated Outsource users do not normally see them.
- IA-127: CRM Note images/files are visible only to full CRM roles: Owner, Manager, Admin/Sales, Finance.
- IA-128: Expense evidence is visible to Owner, Manager, Finance for all records. Admin/Sales sees only evidence for Expense records created by themselves or their group/department. Other roles do not see it.
- IA-129: PV attachments are visible to Owner, Manager, Finance. The payee/User sees only their own appropriate documents/payment status. Admin/Sales does not see PV attachments.
- IA-130: Attachments/images are not physically deleted. They are hidden/deactivated with log by the role allowed to edit that record or by Manager/Owner. Money evidence is higher-risk and writes Management Log.
- IA-131: Audit Log records Role/Permission change, user type change, Owner-level emergency override, sensitive finance correction affecting closed/paid money, and highest-level system access/change.
- IA-132: After payment follow-up is closed, Owner/Manager/Finance can correct Payment Record. Evidence/note correction writes Management Log. Amount correction after follow-up close writes Audit Log.
- IA-133: After Shipment close, Manager/Owner can edit. Admin/Sales can correct tracking/evidence when operationally necessary. Corrections write Management Log; if money/COD is affected, Finance reviews follow-up.
- IA-134: Once Order is completed / fully shipped, no role can edit the original Order data in normal workflow. Notes can still be added.
- IA-135: Notes on completed Orders can be added by Admin/Sales, Manager, Owner, and Finance when relevant. Added notes write Activity Log; later edit/hide writes Management Log.
- IA-136: If important completed Order data is wrong, do not edit the original Order. Create a Service Case, Finance note, or correction record depending on context.
- IA-137: For shipment mistakes after Order completion, create a special shipment round from completed Order Detail. It is visible/available only to Owner and Manager. Admin/Sales must use Service Case instead. The special shipment is a bypass shipment: it requires a reason, does not affect stock, does not affect Order completion, and must appear as a record in the Order.
- IA-138: Special shipment after Order completion writes Management Log with reason, creator, selected items, and a flag that it does not affect stock or Order completion.
- IA-139: Service Case can be created/viewed/managed by Admin/Sales, Manager, Owner. Finance sees only the parts that affect money. Other roles do not see Service Case.
- IA-140: Service Case references Order only for history/source. It does not reopen Order, change Order totals, change Order status, or affect the original Order.
- IA-141: Same-permission Admin/Sales users can continue shared Admin/Sales work such as Draft Order, Order follow-up, Shipment create/close, and COD follow-up within their scope. Owner remains traceability, not a lock.
- IA-142: Admin/Sales continuation of another Admin/Sales user's work does not require mandatory handoff note. Action Log showing who did what is enough.
- IA-143: Admin/Sales Expense visibility by "department" uses the role/group that created the Expense, such as the Admin/Sales group, not a deep HR department structure in the first scope.
- IA-144: Admin/Sales in the same group can edit/cancel Expense created by another group member if it is not yet paid/closed. Edit/cancel writes Management Log according to IA-067.
- IA-145: Owner emergency override requires a reason only for actions already defined as reason-required, such as cancellation, stock adjustment, special shipment, or user type change. Not every Owner action requires a reason.
- IA-146: Owner override writes Audit Log only when it touches Role/Permission, user type, sensitive finance after close/pay, Audit/system settings, or severely bypasses normal rules. Normal Owner actions with Management Log do not also need Audit Log.
- IA-147: Even Owner cannot physically delete or rewrite critical history/evidence such as Audit Log, Action Log, payment/delivery evidence, User, Order, or Job. Use deactivate, hide, or correction instead.
- IA-148: User deactivation requires a reason and writes Management Log.
- IA-149: Owner and Manager can deactivate Users. Role/Permission handling remains Owner-only when needed.
- IA-150: Identity & Access business/domain discovery can stop after this checkpoint. Remaining work should move to Grill Doc consolidation and matrix/document creation rather than more grilling.

## Decisions Captured

- Attachment visibility is grouped by evidence/file type and role context.
- Production images are broad inside production roles but not visible to finance/delivery/base users by default.
- CRM attachments follow full CRM access.
- Expense and PV attachments are finance-sensitive and follow Expense/PV visibility.
- Attachments/evidence are hidden/deactivated, not physically deleted.
- Audit Log triggers are limited to highest-risk identity, permission, owner override, sensitive finance, and system-level actions.
- Closed payment follow-up amount correction is Audit-level.
- Completed Orders are locked against editing original data; only notes and separate correction/service records are allowed.
- Special shipment after completed Order is Owner/Manager-only, requires reason, does not affect stock or Order completion, and is recorded on the Order.
- Admin/Sales solves post-completion customer issues through Service Case, not hidden bypass shipment.
- Service Case does not mutate the original Order.
- Same-permission Admin/Sales continuation is allowed for shared work without mandatory handoff note.
- Admin/Sales Expense group visibility uses role/group, not a full HR department model.
- Owner override is broad but cannot physically erase history/evidence.
- User deactivation requires reason and Management Log.
- Identity & Access discovery is complete enough to proceed to Grill Doc mode later.

## Unclear Areas / Follow-Up Questions

- Exact wording and final table layout for the role/module/action/sensitive-field matrix remains to be created during Grill Doc.
- Exact UI copy for no-access pages, special shipment modal, and completed Order note behavior can be handled during UX/design.
- Exact non-Rak-Samuk special income creation/approval flow remains outside this Identity & Access closure unless later requested.
- Exact payroll flow remains deferred; only visibility is defined.
- Exact report rows/columns are not enumerated, but permission principles are clear enough for first matrix.

## Conflicts With Existing Docs

- Existing docs do not currently describe Owner/Manager-only special shipment after Order completion. This is a new exception rule to add later.
- Existing docs say Service Case is independent and does not affect Order; IA-139/IA-140 align with that rule and extend access behavior.
- Existing docs generally allow post-close shipment tracking/evidence correction with Manager/higher permission; IA-133 adds Admin/Sales correction for tracking/evidence when operationally necessary.
- Existing docs emphasize deactivation over deletion; IA-147 strongly extends that rule to logs/evidence/history even for Owner.

## Terms That May Need CONTEXT.md Updates Later

- `Production Images`
- `CRM Attachment`
- `Expense Evidence`
- `PV Attachment`
- `Special Shipment / รอบจัดส่งพิเศษ`
- `Bypass Shipment`
- `Completed Order Note`
- `Correction Record`
- `Service Case`
- `Same-permission Continuation`
- `Owner Emergency Override`
- `Critical History`

## Decisions That May Need docs/decision-log.md Updates Later

- Attachment/evidence visibility by file type.
- No physical deletion of evidence/history/logs.
- Audit Log trigger set.
- Completed Order lock rule.
- Special shipment after completed Order: Owner/Manager-only, reason required, no stock/order completion effect.
- Service Case as Admin/Sales path for post-completion problems.
- Admin/Sales shared work continuation and no mandatory handoff note.
- Expense group visibility and same-group edit/cancel before paid/closed.
- Owner override boundaries and non-deletable history rule.
- User deactivation reason/log rule.

## Possible ADR Candidates

- Special shipment after completed Order as an Owner/Manager-only bypass that does not affect stock or Order completion. This is a significant exception flow and may deserve an ADR.
- Completed Orders are immutable except notes and separate correction/service records. This is a durable business rule with reporting impact.
- Critical history/evidence cannot be physically deleted even by Owner. This is a strong trust/audit rule.
- Service Case is the Admin/Sales route for post-completion problem handling, while Owner/Manager special shipment is restricted to prevent hidden agenda.

## Suggested Focus For Next Batch

No next question batch is recommended. Move to Grill Doc mode later when explicitly requested.

Suggested Grill Doc consolidation focus:

- Produce starting role list.
- Produce User / Employee / Outsource identity rules.
- Produce login and landing rules.
- Produce module visibility matrix.
- Produce action permission matrix.
- Produce sensitive-field visibility matrix.
- Produce shared-queue and personal-history rules.
- Produce log/audit visibility and trigger rules.
- Produce deactivated-user history rules.
- Produce override and emergency-action rules.

## Completion Check

The Identity & Access Domain is complete enough for first implementation documentation. Remaining details are documentation/matrix formatting and UX copy, not further business discovery.
