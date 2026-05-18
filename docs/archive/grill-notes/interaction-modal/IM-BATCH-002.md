# Interaction & Modal Behavior Grill Notes - IM-BATCH-002

## 1. Batch Range

- IM-026 to IM-050
- Domain focus: Shipment Builder, release to Delivery Team, COD gating, bulk shipment creation, delivery sent-out behavior, admin shipment close, post-close corrections, special shipment, and shipment print/export permission behavior.
- Status: Temporary handoff notes for later Grill Doc mode. Not official source-of-truth documentation.

## 2. Questions Answered

- IM-026: Whether P0 has Draft Shipment.
- IM-027: Release-to-delivery confirmation behavior.
- IM-028: Draft Shipment cancellation behavior.
- IM-029: COD edit behavior in Shipment Builder and COD display for non-final ready-stock shipments.
- IM-030: Bulk create Shipment eligibility.
- IM-031: Exit behavior from Shipment Builder when there are unsaved changes and no draft state.
- IM-032: Reason/log behavior for recipient/address/carrier/remarks changes before release.
- IM-033: When COD can be used on a Shipment.
- IM-034: Partial block behavior when some selected shipment items cannot proceed.
- IM-035: Preview/print timing before Shipment release.
- IM-036: Post-release navigation.
- IM-037: Single sent-out confirmation behavior for Delivery Team.
- IM-038: Bulk sent-out confirmation behavior.
- IM-039: Post-sent-out behavior for Delivery Team list.
- IM-040: Delivery Team post-sent-out photo/note behavior before admin close.
- IM-041: Evidence requirement before admin closes Shipment.
- IM-042: Admin close confirmation behavior after evidence is complete.
- IM-043: Post-close tracking/evidence correction authority.
- IM-044: Post-close tracking/evidence correction interaction and log.
- IM-045: Post-close navigation from admin confirmation queue.
- IM-046: Special Shipment start interaction from completed Order.
- IM-047: Special Shipment delivery flow behavior.
- IM-048: Print/export unavailable due to missing permission.
- IM-049: Print Shipping Sheet without COD visibility.
- IM-050: Stale state behavior for Shipment actions.

## 3. Decisions Captured

- IM-026: P0 has no `ร่างรอบจัดส่ง`. Shipment Builder is a temporary working screen. A Shipment is created only when Admin presses `พร้อมจัดส่ง`.
- IM-027: Before `พร้อมจัดส่ง`, show a confirmation modal summarizing recipient/address/carrier/items/COD where relevant.
- IM-028: Cancelled / not applicable because there is no Draft Shipment in P0.
- IM-029: Admin cannot edit COD amount from Shipment Builder. When creating a ready-stock shipment while the Order still has unfinished custom work, COD is disabled with a reason explaining that COD can be opened only for the final shipment / Order-closing round.
- IM-030: Bulk create Shipment is allowed only for Orders with no custom-work line at all; in practice, ready-stock-only Orders.
- IM-031: If the user exits Shipment Builder after editing but before release, show a modal with `ออกโดยไม่สร้างรอบจัดส่ง` and `อยู่ต่อ`.
- IM-032: Editing recipient/address/carrier/remarks before release does not require a reason. Log old/new values in Activity Log.
- IM-033: COD can be used only on the final Shipment round that makes the Order fully shipped.
- IM-034: If some selected items cannot proceed, block only those items, allow the eligible next items to continue, and show a modal telling the user which items cannot be included.
- IM-035: Before release, document preview is allowed, but real print is allowed only after release.
- IM-036: After `พร้อมจัดส่ง` succeeds, navigate to the admin Shipment list and focus the newly created/released Shipment.
- IM-037: Delivery Team single `ส่งออกแล้ว` uses a short confirmation modal only; no evidence/note requirement and no detailed re-summary.
- IM-038: Delivery Team bulk `บันทึกว่าส่งออกแล้ว` uses a modal summarizing count and selected Shipments.
- IM-039: After Delivery Team marks sent-out, the Shipment leaves the active list and appears in `ส่งออกแล้ววันนี้`.
- IM-040: Delivery Team can add photo/note later from `ส่งออกแล้ววันนี้` until Admin closes the Shipment.
- IM-041: Admin cannot close Shipment unless it has Tracking or at least one delivery evidence photo.
- IM-042: Once Tracking or evidence exists, Admin can press `ยืนยันและปิดรอบจัดส่ง` without an extra confirmation modal; the evidence review interaction is enough.
- IM-043: After Shipment close, Admin/Sales can correct tracking/evidence. Post-close address/carrier/COD/item changes require Manager/Owner.
- IM-044: Post-close tracking/evidence correction uses a correction modal/drawer showing old/new values, requires a reason, and writes Management Log.
- IM-045: After closing a Shipment from `ยืนยันการจัดส่ง`, stay in / return to the confirmation queue and focus the next item.
- IM-046: `รอบจัดส่งพิเศษ` from a completed Order starts from Owner/Manager in Order Detail with a reason modal plus selected items to ship.
- IM-047: `รอบจัดส่งพิเศษ` follows the normal delivery flow: release to Delivery Team, sent-out, admin close with evidence, while flagged as not affecting stock or Order completion.
- IM-048: If a user lacks print/export permission, hide the print/export action.
- IM-049: No separate P0 behavior needed. Current role model does not need a case where a user can print a Shipping Sheet for a responsible Shipment but cannot see COD in that same context. Keep the general principle: printed documents follow the user's visible data.
- IM-050: Shipment create/release/sent-out/close stale-state behavior matches the Job pattern: tell the user data changed, refresh latest state, and do not overwrite stale state.

## 4. Unclear Areas / Follow-Up Questions

- Need later batches to cover COD/payment follow-up closure and correction behavior in the finance/admin queues.
- Need later batches to cover Expense/PV evidence, correction, cancellation, and close interactions.
- Need later batches to cover Product/Stock/Material reason/evidence/log behavior.
- No open Shipment draft question remains; the P0 answer is no Draft Shipment.

## 5. Conflicts With Existing Docs

- Existing docs currently allow Draft Shipment. IM-026 supersedes this for P0: no Draft Shipment.
- Existing Shipment Builder docs include `บันทึกเป็นร่าง`, Draft Shipment entry/exit/status, and Draft-based preview states. These should be removed or marked out of P0 later.
- Existing docs allow Admin to confirm/edit COD on Shipment and mention COD separated by Shipment round. IM-029 and IM-033 narrow the P0 behavior: no COD editing in Shipment Builder, and COD is allowed only on the final Shipment round that closes the Order's delivery.
- Existing docs mention printing documents during creation/release. IM-035 narrows this: preview before release, real print after release.
- Existing docs conflict on post-close tracking/evidence correction authority. IM-043 resolves it as Admin/Sales for tracking/evidence only, Manager/Owner for post-close core Shipment data changes.
- Existing docs may say COD does not block bulk. IM-030 makes bulk create limited to ready-stock-only Orders with no custom-work line.

## 6. Terms Or Patterns That May Need Official Docs Updates Later

- Shipment Builder as temporary pre-release work, not a draft state.
- `พร้อมจัดส่ง` as the Shipment creation/release point.
- COD as final-Shipment / Order-closing collection behavior in P0.
- Partial item blocking in shipment creation: continue eligible items, report blocked ones.
- Preview-before-release vs print-after-release document rule.
- Delivery Team late photo/note until admin close.
- Post-close correction tiers: tracking/evidence vs core Shipment data.
- Special Shipment from completed Order as Owner/Manager reason-first item-selection flow.

## 7. Possible ADR Candidates

- Potential ADR candidate: Removing Draft Shipment from P0 despite earlier docs. This changes workflow state shape and avoids a persistent intermediate state.
- Potential ADR candidate: COD only on the final Shipment round in P0. This is a business rule that affects Order/shipment/payment behavior and may surprise future readers because older docs allowed Shipment-level COD editing.

## 8. Suggested Focus For Next Batch

- Payment / COD / Expense / PV interactions: Add Payment Record, evidence add/correct, amount correction, close payment follow-up, explanatory notes, Expense create/edit/cancel, PV create/close/edit, evidence requirements, reason requirements, and log levels.
