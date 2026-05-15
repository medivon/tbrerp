# SCR-ORD-007 - Order Line Edit Mockup

Status: Approved visual anchor

Approved image:

- `./SCR-ORD-007-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ORD-007-order-line-edit.md`
- `docs/ux-ui/image-prompts/IMG-ORD-007-order-line-edit.md`
- `docs/ux-ui/screens/SCR-ORD-005-order-detail.md`

## Approved Role

This mockup is the visual anchor for guarded post-confirmation Order Line editing. It should feel similar enough to Order Create/Edit for efficiency, but clearly be a live confirmed Order edit mode with downstream guards.

Latest workflow decisions require:

- No Draft/autosave state after Order confirmation.
- Existing `JOB-O` production detail and cancellation route to Job Detail / Job Revision / Job cancellation.
- Ready-stock lines already in Draft or Released Shipment rounds cannot be changed until removed from that round or the round is cancelled.
- Adding/changing a ready-stock line uses the same SKU หลัก first, then color / SKU ย่อย selection model as Order Create/Edit.
- Changing SKU/color releases the old SKU ย่อย reservation and reserves the newly selected SKU ย่อย only after Review Changes is saved.
- Sent/completed lines remain read-only.
- `Review Changes` is required before saving.
- Financial Reconciliation blocks save when edited sales total does not match Payment/COD/adjustment evidence.

## Regeneration Rule

Future prompts for `SCR-ORD-007` should preserve blocked read-only rows with reasons, Product Model-first ready-stock changes, the right impact panel, Review Changes, and clear routing to Job or Shipment owning flows.
