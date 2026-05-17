# Identity & Access Grill Notes - IA-BATCH-005

Temporary checkpoint notes for later Grill Doc consolidation. Not an official source-of-truth document.

## Batch Range

IA-101 to IA-125

## Questions Answered

- IA-101: Product/Stock, Owner, Manager, Finance can see cost. Rough profit is visible only to Owner, Manager, Finance. Admin/Sales sees sales price but not cost/profit.
- IA-102: Purchase price / supplier payment info is visible to Owner, Manager, Finance, Product/Stock. Admin/Sales, worker/base/outsource roles do not see it.
- IA-103: Payment evidence is visible to Owner, Manager, relevant Admin/Sales, and Finance. Delivery Team does not see payment evidence, except delivery evidence. Other roles do not see it.
- IA-104: Delivery evidence is visible to Owner, Manager, Admin/Sales, related Delivery Team, and Finance when needed for COD/payment context. Worker/stock/base/outsource roles do not see it.
- IA-105: Rak Samuk standard rate is visible only to Owner, Manager, Finance.
- IA-106: Rak Samuk Worker sees their own assigned work price. If no price exists, they see `ไม่มีราคา / ให้แจ้งราคา`.
- IA-107: Rak Samuk Worker can submit `ขอเสนอราคา` for their assigned work until the related PV round is closed. After PV is closed, the price cannot be changed by the worker.
- IA-108: Owner/Manager approve Rak Samuk Worker proposed prices. Finance pays or creates PV from the approved price. If the work is linked to a SKU, the approver must always be asked whether to update the SKU Rak Samuk standard rate.
- IA-109: Updating SKU Rak Samuk standard rate from an approved proposed price writes Management Log with old/new price and approver. UI must use `ขอเสนอราคา`, not `ตีโต้`.
- IA-110: Rak Samuk work price appears only in Rak Samuk Worker own dashboard/work, Finance/PV/payment area, and Owner/Manager approval/reporting views. It must not appear in Order, Production, or Job workflow pages.
- IA-111: Employee work-based special income is visible to the owning User and to Owner/Manager/Finance. Admin/Sales or department heads do not see the aggregate by default.
- IA-112: Salary / daily wage / commission is visible to the owning User and to Owner/Manager/Finance. Other roles do not see it.
- IA-113: Non-Rak-Samuk Outsource special income is visible to the owning Outsource User and to Owner/Manager/Finance. Admin/Sales does not see it unless they directly created the item and have extra permission.
- IA-114: Finance creates, groups, and closes PV payment rounds. Owner/Manager can view, approve, or override. Admin/Sales does not do PV.
- IA-115: After PV is closed, Owner/Manager can still edit it.
- IA-116: Owner/Manager edits to closed PV do not require a reason but must write Management Log with old/new value.
- IA-117: Salary / daily wage / commission only needs visibility rules in this phase; do not define payroll action/payment flow yet.
- IA-118: If deactivating a User who still has assigned Rak Samuk work not yet received into coloring, the system must require choosing a new Rak Samuk User before confirming deactivation.
- IA-119: Deactivated Users remain visible in history with a `ปิดใช้งาน` badge. Records/documents/history can be opened according to permission. The deactivated User cannot login.
- IA-120: Deactivated Users cannot be selected for new work, but can be searched/filtered in history when including deactivated users.
- IA-121: If a deactivated User returns, reactivate the same User and adjust type/role as needed; preserve continuous history.
- IA-122: Owner/Manager can reactivate Users; this writes Management Log. Any Role/Permission change remains Owner-only and writes Audit Log.
- IA-123: Owner override can do everything the system supports, including permission, sensitive finance, closed/PV correction, user deactivation/reactivation, cancellation, stock correction, and emergency edits. Important actions still write the appropriate log.
- IA-124: Manager override covers most operational/business corrections according to permission, such as Order/Job/Shipment/Product/Stock/Customer/Expense/PV correction. Manager cannot change Role/Permission, access Audit Log, or use Owner-level authority.
- IA-125: Manager override requires a reason only for actions already defined as reason-required, such as cancellation, stock adjustment, customer deactivate, and high-impact Order edit. Normal Manager work does not require a reason.

## Decisions Captured

- Cost visibility and profit visibility are separate.
- Product/Stock can see cost/purchase/supplier payment information needed for stock/product work, but not rough profit.
- Payment evidence and delivery evidence have separate visibility rules.
- Rak Samuk standard rate is highly restricted: Owner/Manager/Finance only.
- Rak Samuk Worker sees only their own assigned work price and can `ขอเสนอราคา` until PV closes.
- Rak Samuk prices do not appear on Order, Production, or Job workflow pages.
- Rak Samuk standard rate is tied to SKU หลัก / Product Model. If a Job references SKU, use the SKU rate as the starting work price. Jobs without SKU reference start at 0/missing price and require worker proposal if needed.
- Only Owner/Manager can approve proposed Rak Samuk prices and decide whether to update the SKU standard rate.
- Employee and Outsource personal income visibility is Owner/Manager/Finance plus the owning User, with payroll action flow deferred.
- Finance owns PV creation/round closing. Owner/Manager can approve/override and edit closed PV.
- Deactivated Users preserve history, cannot login, cannot be selected for new work, and can be reactivated as the same User.
- Deactivating a User with active assigned Rak Samuk work requires reassignment first.
- Owner override is total within supported system behavior.
- Manager override is broad for operations but excludes Role/Permission, Audit Log, and Owner-level authority.

## Unclear Areas / Follow-Up Questions

- Exact `รายได้พิเศษตามงาน` creation/approval flow is not fully defined outside Rak Samuk.
- Exact non-Rak-Samuk Outsource income creation permissions remain unclear.
- Exact approval stages for PV beyond Finance create/close and Owner/Manager override still need detail if required.
- Exact Audit Log triggers for sensitive finance changes still need final classification.
- Exact emergency edit behavior after shipment close / order completion still needs detail.
- Exact evidence/attachment visibility for production images, CRM images, and expense evidence still needs grouped confirmation.
- Exact report visibility for income/payroll-like data is visible at a role level but not screen/report-specific.

## Conflicts With Existing Docs

- Existing docs say Finance/payment-permission user approves proposed Rak Samuk price. IA-108 changes approval to Owner/Manager only; Finance pays/creates PV from approved price.
- Existing docs say approved first rate from missing can update Product Model standard rate automatically with log. IA-108 changes this: if linked to SKU, the approver must be asked whether to update the SKU rate; it is not automatic.
- Existing docs allow Product Model standard rate. This batch clarifies it as tied to SKU หลัก / Product Model and hidden from Order/Production/Job workflow pages.
- Existing docs may imply Rak Samuk price visibility in Job cost history for finance. This batch narrows workflow display: no Rak Samuk price in Order, Production, or Job workflow pages.
- Existing docs likely treat closed PV as more stable. IA-115/IA-116 allow Owner/Manager to edit closed PV without reason, with Management Log old/new value.

## Terms That May Need CONTEXT.md Updates Later

- `Rak Samuk Standard Rate`
- `ขอเสนอราคา`
- `Rak Samuk Work Price`
- `SKU-linked Rak Samuk Rate`
- `Employee Special Work Income`
- `Outsource Special Income`
- `Closed PV Correction`
- `Deactivated User`
- `Owner Override`
- `Manager Override`
- `Payment Evidence`
- `Delivery Evidence`

## Decisions That May Need docs/decision-log.md Updates Later

- Cost/profit visibility separation.
- Supplier payment visibility.
- Payment evidence and delivery evidence visibility rules.
- Rak Samuk standard rate visibility and edit authority.
- Rak Samuk Worker proposal window until PV close.
- Owner/Manager-only Rak Samuk price approval.
- SKU rate update prompt after approved proposed price.
- No Rak Samuk price display in Order/Production/Job workflow pages.
- Income visibility for employees and Outsource users.
- PV create/close/edit authority and closed PV Management Log.
- Deactivated User behavior and Rak Samuk reassignment requirement.
- Owner and Manager override boundaries.

## Possible ADR Candidates

- Possibly: Rak Samuk price display is banned from Order/Production/Job workflow pages. This is a cross-module access decision that may surprise implementers.
- Possibly: Owner/Manager, not Finance, approve Rak Samuk proposed prices. This changes prior finance approval language.
- Possibly: closed PV remains editable by Owner/Manager without required reason, but with Management Log old/new values. This is a notable control trade-off.
- Possibly: use one special income concept across employees and Outsource while keeping Rak Samuk as a specialized flow.

## Suggested Focus For Next Batch

- Finish attachment/evidence visibility by grouped file type: production images, CRM note images, expense evidence, PV attachments, payment evidence, delivery evidence.
- Clarify remaining Audit Log triggers for sensitive finance, emergency override, role/permission, and user-type changes.
- Clarify emergency edits after Shipment close, Order completion, Payment follow-up closure, and PV close.
- Clarify same-permission continuation for Admin/Sales Order/Shipment and Expense department ownership.
- Decide whether enough is now clear to stop before over-grilling.
