# SCR-ADM-008 - Draft Order Queue Mockup

Status: Approved visual anchor

Approved image:

- `./SCR-ADM-008-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ADM-008-draft-order-queue.md`
- `docs/ux-ui/image-prompts/IMG-ADM-008-draft-order-queue.md`
- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`

## Approved Role

This mockup is the visual anchor for `ร่างออเดอร์`, the saved Draft Order queue under the Order workspace.

Latest workflow decisions require:

- Draft Orders are saved unfinished entries, not real Orders.
- Draft No. must not look like Order ID.
- Draft Orders do not reserve stock, create Job, create Shipment, or enter reports.
- Unsaved Order Create/Edit sessions do not appear here.
- Converted drafts are hidden from the active draft queue.
- Owner is traceability only, not a hard lock for same/higher permission users.

## Regeneration Rule

Future prompts for `SCR-ADM-008` should preserve the Order workspace tabs, active `ร่างออเดอร์` tab, saved-draft table, and clear Draft-vs-Order distinction.
