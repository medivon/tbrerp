# SCR-ADM-007 - COD/Payment Follow-up Queue Mockup

Status: Approved

Approved image:

- `./SCR-ADM-007-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ADM-007-cod-payment-follow-up-queue.md`
- `docs/ux-ui/image-prompts/IMG-ADM-007-cod-payment-follow-up-queue.md`
- `docs/ux-ui/screens/SCR-ADM-005-shipment-confirmation-queue.md`

## Approved Role

This mockup is the current source of truth for the finance-permission admin `ติดตาม COD / Payment` queue.

It confirms:

- `ติดตาม COD / Payment` is separate from operational Order Completion and shipment-round close.
- The screen tracks COD return, outstanding amount, payment evidence, and over-COD reason follow-up.
- It is a follow-up queue, not a full accounting ledger, tax screen, or audit screen.
- Related Order and shipment-round links are visible for traceability.

## Key Decisions Captured By This Mockup

- COD/Payment follow-up does not block `ยืนยันและปิดรอบจัดส่ง`.
- Amounts shown here are only follow-up amounts, not product cost or profit analysis.
- `ยอด COD เกิน` must be visually obvious and must lead to a reason action.
- No product cost, profit, tax filing detail, ad spend, or private CRM note appears.
- Shipment send-out and shipment close controls do not appear on this finance follow-up screen.

## Regeneration Rule

Future prompts for `SCR-ADM-007` should preserve the practical finance-follow-up queue layout and the separation from shipment confirmation.
