# SCR-ORD-004 - Order Review / Create Order Mockup

Status: Approved

Approved image:

- `./SCR-ORD-004-approved.png`

Related documents:

- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`
- `docs/ux-ui/image-prompts/IMG-ORD-004-order-review-create-order.md`
- `docs/ux-ui/screens/SCR-ORD-001-draft-order-editor.md`

## Approved Role

This mockup remains the visual anchor for the final `ตรวจสอบก่อนสร้างออเดอร์` step before a real Order ID is issued.

It confirms:

- The screen reviews current Order Create/Edit data; it should not show Draft No.
- Admin must see downstream results before confirming.
- Ready-stock lines will reserve stock after confirmation.
- Complete custom lines will create `JOB-O` immediately after confirmation.
- Shipment rounds are not created from this screen.
- The Review screen itself is the final confirmation step; `ยืนยันสร้างออเดอร์` does not open another confirmation modal.
- Inline warnings and override fields block confirmation until resolved.

## Key Decisions Captured By This Mockup

- A confirmed Order ID is not shown before confirmation.
- `จะจองสต๊อก` and `จะสร้าง JOB-O` are preview chips, not completed actions.
- `ยังไม่สร้างรอบจัดส่ง` remains explicit.
- Ready-stock and custom-work detail should be shown as detailed row/cards, with the custom section hidden when no custom work exists.
- The screen is not a quotation, invoice, accounting ledger, or Order Detail page.
- No product cost, profit, tax filing detail, ad spend, or private CRM note appears.

## Regeneration Rule

Future prompts for `SCR-ORD-004` should preserve the final-review layout, detailed row/card sections, the downstream result panel, and the clear distinction between Review and confirmed Order.
