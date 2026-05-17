# Identity & Access Grill Notes - IA-BATCH-004

Temporary checkpoint notes for later Grill Doc consolidation. Not an official source-of-truth document.

## Batch Range

IA-076 to IA-100

## Questions Answered

- IA-076: Order create/confirm/post-confirm edit is mainly Admin/Sales work. Manager/Owner can act or edit on behalf. Finance can view and edit only payment-related parts. Other roles do not create/edit Orders.
- IA-077: Post-confirmation Order edits require a reason when they affect money, item lines, quantity, custom work, recipient/address after Shipment exists, or important status. General notes do not require a reason.
- IA-078: General Order edits write Activity Log. Order edits requiring a reason write Management Log. Payment/sensitive finance edits write Management Log or Audit Log depending on severity.
- IA-079: Whole-Order cancellation can be done by Admin/Sales in simple cases. Manager/Owner can cancel all system-allowed cases. If Shipment, Payment, or Job already exists, Manager/Owner permission is required.
- IA-080: Whole-Order cancellation always requires a reason, optional evidence when available, writes Management Log, and triggers Finance follow-up review if recorded money is affected.
- IA-081: `JOB-P` creation uses the same authority as Order creation: Admin/Sales, Manager, Owner. Product/Stock and workshop roles do not create `JOB-P` in the first scope.
- IA-082: Main production details on `JOB-O` / `JOB-P` can be edited by Admin/Sales, Manager, Owner. Woodwork/Coloring can add notes/status/images from their work but cannot edit core instructions. Rak Samuk Worker cannot edit core instructions.
- IA-083: If Woodwork/Coloring find missing or incorrect job details, the first scope uses outside-system communication rather than a system revision/request action.
- IA-084: Woodwork/Coloring can add notes/images from their work to record work condition, observations, or evidence, without editing core instructions.
- IA-085: Woodwork/Coloring operational actions such as receive work, wait material, send onward, coloring intake, ready-to-ship, notes, and work images write Activity Log.
- IA-086: Woodwork/Coloring, Admin/Sales, Manager, and Owner can send a Job to Rak Samuk. Sending to Rak Samuk must select the Rak Samuk User at the time of sending.
- IA-087: If the Rak Samuk User is not known, the Job cannot be sent to Rak Samuk. The receiving Rak Samuk User must be chosen first.
- IA-088: Returning/receiving Rak Samuk work back toward coloring can be done by Admin/Sales, Manager, Owner, and Coloring. Woodwork is excluded after the work has moved out of woodwork. Rak Samuk Worker does not move internal workflow status.
- IA-089: The Rak Samuk User can be changed before `รับเข้าโรงงานสี` by the same authority group. No reason is required, but history/log must be kept.
- IA-090: Changing the Rak Samuk User before coloring intake writes Activity Log / Rak Samuk work history event.
- IA-091: Product/Stock, Manager, Owner can create/edit Product Model, SKU Variant, and Product Settings. Admin/Sales can lookup/select products for selling but cannot edit product master data. Other roles cannot edit.
- IA-092: Deactivating/reopening Product Model or SKU Variant can be done by Product/Stock, Manager, Owner; it requires a reason and writes Management Log.
- IA-093: Stock Count / Stock Adjustment can be done by Product/Stock, Manager, Owner. Admin/Sales sees availability for selling but cannot adjust stock. Stock adjustment requires a reason and writes Management Log.
- IA-094: Material Stock / Material Purchase Order / Material Receipt belongs to Product/Stock, Manager, Owner. Finance sees payment audit/follow-up created by receipt. Admin/Sales is normally removed from material visibility/action.
- IA-095: If material state affects a Job that Admin/Sales follows, Admin/Sales sees only Job-level status such as `รอวัตถุดิบ` / `ปลดรอวัตถุดิบแล้ว`, not Material Stock detail, purchase detail, supplier, or cost.
- IA-096: Owner, Manager, Admin/Sales can edit Customer/CRM master data. Finance sees full CRM but cannot edit customer master data.
- IA-097: Owner, Manager, and Admin/Sales with CRM settings permission can change Customer Tier / Tier discount / deactivate-reactivate Customer. Changing into/out of `ระวังเป็นพิเศษ` or deactivate/reactivate requires a reason and writes Management Log.
- IA-098: Admin/Sales and Finance can record Payment Record/evidence. Finance/Manager/Owner can correct or replace evidence later. Later correction requires log and finance follow-up if money amount is affected.
- IA-099: Admin/Sales can close COD/Payment Follow-up when it comes from an Order/Shipment they manage and evidence is complete. Finance/Manager/Owner can close all finance follow-ups according to permission. Delivery Team cannot close finance follow-up.
- IA-100: Closing COD/Payment Follow-up requires either payment evidence or explanatory note. It writes Activity Log. Later reversal/edit/amount change writes Management Log or Audit Log depending on severity.

## Decisions Captured

- Order work remains Admin/Sales-led, with Manager/Owner override/assist power.
- Finance edits payment-related data but does not own general Order/Shipment operations.
- Cancellation, post-confirmation high-impact edits, stock adjustment, product deactivation, and customer risk/deactivation actions require reasons and Management Log.
- `JOB-P` creation is not Product/Stock or workshop work in the first scope; it follows Order creation authority.
- Worker roles can record work evidence and status but do not edit core production instructions.
- Missing/incorrect production detail is handled outside system in first scope; no formal Job revision/request action is added here.
- Rak Samuk sending must assign a specific Rak Samuk User immediately.
- Rak Samuk reassignment before coloring intake is allowed without reason but must be historized.
- Material operations are removed from Admin/Sales except for high-level Job blocker status.
- Finance has full CRM visibility but cannot edit customer master data.
- Admin/Sales can create/close relevant payment follow-up in their Order/Shipment scope when evidence/note is sufficient.
- Payment follow-up closure requires evidence or explanatory note.

## Unclear Areas / Follow-Up Questions

- Exact Manager operational powers per module still need tighter boundaries: whether Manager can perform all role actions directly or mainly override/assist.
- Exact Owner emergency override rules still need definition.
- Exact sensitive-field matrix remains incomplete for cost, profit, supplier payments, salary/daily wage, commission, special work income, Rak Samuk standard rates, payout history, payment evidence, and CRM contact data.
- Exact evidence visibility rules by role need confirmation.
- Exact actions that require Audit Log beyond Role/Permission, user type change, critical override, and sensitive finance changes need more detail.
- Exact deactivated User behavior for assigned Rak Samuk work still needs detail.
- Exact same-permission continuation rules are mostly clear for shared queues, but need confirmation for Admin/Sales Order/Shipment ownership and Expense department ownership.

## Conflicts With Existing Docs

- Existing docs describe a shared `รอระบุ/ส่งรักสมุก` queue before choosing the Rak Samuk Worker. IA-086 and IA-087 change this: sending to Rak Samuk requires selecting the Rak Samuk User immediately; if the user is not known, the Job cannot be sent.
- Existing docs give Product/Stock broad stock/product responsibilities; IA-081 clarifies Product/Stock does not create `JOB-P` in first scope.
- Existing docs may imply Admin/Sales can see some material context; IA-094/IA-095 narrows Admin/Sales to Job-level material blocker status only.

## Terms That May Need CONTEXT.md Updates Later

- `Core Production Instruction`
- `Work Evidence`
- `Rak Samuk Assignment`
- `Rak Samuk Reassignment`
- `Material Blocker Status`
- `Payment Follow-up Closure`
- `Order High-impact Edit`
- `Simple Order Cancellation`
- `System-allowed Cancellation`

## Decisions That May Need docs/decision-log.md Updates Later

- Order/Job action authority by role.
- Post-confirmation Order edit reason/log rules.
- Whole-Order cancellation permission/reason/log rules.
- `JOB-P` creation follows Order authority and excludes Product/Stock/workshop roles.
- Worker note/image Activity Log rule.
- Rak Samuk assignment must choose worker immediately.
- Rak Samuk reassignment before coloring intake.
- Product/SKU/settings edit authority.
- Stock adjustment reason/log rule.
- Material operations exclude Admin/Sales except Job-level blocker status.
- Finance full CRM read-only rule.
- Payment evidence correction and payment follow-up closure rules.

## Possible ADR Candidates

- Possibly: Rak Samuk assignment requires a specific worker immediately, replacing the earlier shared waiting assignment queue. This changes flow shape and may deserve an ADR if official docs currently encode the shared queue strongly.
- Possibly: Product/Stock cannot create `JOB-P` even though production is stock-related. This is a business ownership decision that may surprise future implementers.
- Possibly: production detail correction stays outside the system first, with only notes/images captured. This is a scope trade-off and may matter later if revision workflows are considered.

## Domain-Level Checkpoint at IA-100

### Completion Outputs Already Clear

- Starting role list is clear.
- User / Employee / Outsource identity rules are clear.
- Login requirement rules are mostly clear.
- Base role / personal dashboard rules are clear enough for first implementation.
- Module visibility is partially clear across major modules.
- Shared queue versus person-specific work is clear at a business level.
- Deactivated User baseline is clear: deactivate, disable login, preserve history.
- Log levels are broadly defined and increasingly mapped to actions.

### Completion Outputs Still Unclear

- Full module visibility matrix still needs consolidation for all role/module pairs.
- Full action permission matrix still needs more coverage for Shipment close corrections, Expense/PV approval/payment, Settings, Reports, Logs, and override.
- Sensitive-field visibility matrix is not complete.
- Shared-queue continuation rules need a few exact edge cases.
- Deactivated-user handling for active Rak Samuk assignment and open personal income/work needs more detail.
- Override and emergency-action rules are not yet complete.

### Whether Continuing Is Still Useful

Continuing is still useful, but questions should now become more selective. Identity basics and most role/module visibility are strong enough; the remaining value is in sensitive data, overrides, deactivation edge cases, and log/evidence rules.

### Suggested Remaining Question Budget

Suggested remaining budget: 50-100 questions, not 300 more, unless sensitive-field and override rules uncover major conflicts.

### Deferrable Items

- Exact UI wording for no-access pages can defer to implementation/design.
- Exact personal dashboard layout can defer to UX implementation if business data groups remain clear.
- Exact per-column table visibility can defer if grouped sensitive-field rules are clear.
- Exact notification behavior for permission changes can remain simple in first scope.

## Suggested Focus For Next Batch

- Finish sensitive-field visibility matrix by grouped data type.
- Clarify evidence/attachment visibility.
- Clarify deactivated User behavior, especially Rak Samuk and personal work/income.
- Clarify override/emergency powers for Owner, Manager, Finance, and Admin/Sales.
- Clarify which actions require Activity Log, Management Log, or Audit Log in remaining high-risk cases.
