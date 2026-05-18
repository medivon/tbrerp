# Interaction & Modal Behavior Grill Notes - IM-BATCH-006-PV-ADDENDUM

## 1. Batch Range

- IM-126 to IM-135
- Domain focus: supplemental payable-list / payout-cycle / PV behavior.
- Status: Temporary handoff notes for later Grill Doc mode. Not official source-of-truth documentation.

## 2. Questions Answered

- IM-126: Whether payable records are item-first or container-first.
- IM-127: Whether multiple payable sources for one worker can be combined into one PV.
- IM-128: Whether Finance can select only some payable items for PV.
- IM-129: Behavior when payee/worker is deactivated but still has payable items.
- IM-130: Required data/log behavior when adding custom income.
- IM-131: Evidence behavior for custom income before PV.
- IM-132: Standard-rate update prompt when changing Rak Samuk price before PV.
- IM-133: PV print/reprint access points.
- IM-134: Price behavior when voided-PV items return to payable list.
- IM-135: Per-person payout history behavior in P0.

## 3. Decisions Captured

- IM-126: Payable/income records are item-first. Create individual payable items, then group by payee/worker in the list. Do not create a persistent payee container first.
- IM-127: Multiple payable sources for the same payee, such as Rak Samuk and custom income, can be combined into one PV as separate lines.
- IM-128: Finance can select only some ready payable items for a payee when creating PV. Items without price or not selected remain pending.
- IM-129: If a worker/payee is deactivated but still has pending payable items, payment/PV can still be processed with a `ปิดใช้งาน` badge. Do not require reactivation.
- IM-130: Adding custom income requires payee, item name/text, and amount. No reason is required on creation. Write Activity Log.
- IM-131: Evidence for custom income before PV is optional.
- IM-132: If Owner/Manager changes a Rak Samuk payable price and the item is linked to SKU/Product Model, the UI must ask whether to update the Rak Samuk Standard Rate. Do not update automatically.
- IM-133: Finalized PV can be printed/reprinted from PV detail/history and from the payee/worker history where that PV is referenced.
- IM-134: If a PV is voided and its payable items return to `รายการรอจ่าย`, keep the prior price and show trace to the voided PV. Owner/Manager can edit the price with reason if needed.
- IM-135: P0 person-level payout history shows pending payable items plus created/voided PVs in a short history, with links to open PV. Do not build a full payroll ledger in P0.

## 4. Unclear Areas / Follow-Up Questions

- No blocking payout/PV interaction gaps remain from this addendum.
- Exact visible labels for custom income and person-level payout history can be finalized in Grill Doc mode.

## 5. Conflicts With Existing Docs

- Existing docs frame the first automated PV source as Rak Samuk payout. This addendum keeps that and adds item-first payable records plus custom income as a flexible manual source.
- Existing docs should avoid describing PV as the editable payout workbench. Payable items / payout list are the workbench; PV is the finalized payment document.

## 6. Terms Or Patterns That May Need Official Docs Updates Later

- Item-first payable/income records.
- Multiple source lines in one PV for one payee.
- Deactivated payee can still be paid for historical/owed work.
- Custom income item with optional evidence.
- Standard-rate update prompt from payable price change.
- Short payee payout history with pending items and PV links.

## 7. Possible ADR Candidates

- Possible ADR candidate: item-first payable model grouped by payee, instead of persistent payout containers. This supports Rak Samuk first and future payroll-like sources without turning PV into the workbench.

## 8. Suggested Focus For Next Step

- Interaction & Modal Behavior Domain remains complete enough for Grill Doc mode after this PV addendum.
- Recommended next step: consolidate temporary notes into official docs when instructed.
