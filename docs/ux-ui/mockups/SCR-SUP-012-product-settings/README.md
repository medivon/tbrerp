# SCR-SUP-012 - Product Settings Mockup

Status: Spec Needed

Related documents:

- `docs/ux-ui/screens/SCR-SUP-012-product-settings.md`
- `docs/ux-ui/image-prompts/IMG-SUP-012-product-settings.md`

## Intended Role

This mockup should become the visual anchor for `ตั้งค่า > ตั้งค่าสินค้า`.

It must confirm:

- The visible UI label is `ตั้งค่าสินค้า`.
- The page sits under main navigation `ตั้งค่า`.
- The page uses tabs: `หมวดหมู่สินค้า`, `แท็กสินค้า`, `รายการสี`, `รายการลายรักสมุก`, `รายการลายแกะสลัก`, and `รายการสีคริสตัล`.
- Staff-facing UI does not use `CRUD`, `Master`, or `ข้อมูลตั้งต้นสินค้า`.
- `รายการสี` is heavier than pattern/decor lists because it has required `รหัสย่อ` and SKU code implications.
- Usage details are not a permanent report; they appear only in blocking modals when a close action cannot proceed.
- Setting changes are Management Log events.

## Regeneration Rule

Future prompts for `SCR-SUP-012` must keep this screen as a compact settings workbench, not a Product/SKU table, stock screen, or reporting module.
