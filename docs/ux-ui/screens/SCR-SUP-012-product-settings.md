# SCR-SUP-012 - Product Settings

## 1. Purpose

`ตั้งค่า > ตั้งค่าสินค้า` is the desktop settings screen for product-related lists used by Product Model, SKU Variant, and production instruction work. It is not a product list, stock page, or reporting page.

Staff-facing UI must call this screen `ตั้งค่าสินค้า`. Do not use `ข้อมูลตั้งต้นสินค้า`, `CRUD`, or `Master` in visible labels.

## 2. Primary Users

- Admin with product-settings permission
- Product-settings permission user
- Manager / Owner with product-settings permission

Users without product-settings permission do not see this menu.

## 3. User Goals

- Add and maintain product categories, tags, colors, patterns, and decoration lists.
- Keep SKU code parts stable after they are used.
- Close values that should no longer be selected for new work while keeping old history readable.
- Fix spelling or add sample images/notes without rewriting old Order/Job snapshots.
- Add missing colors/patterns from product creation through a lightweight mini manager.

## 4. Entry Points

- Sidebar `ตั้งค่า` -> `ตั้งค่าสินค้า`.
- Product Model create/edit -> `modal จัดการรายการแบบย่อ` for permitted users.

## 5. Exit Points

- Product Model create/edit.
- Product Model Detail.
- Job Detail, from a blocking modal when a pattern/decor item cannot be closed.

## 6. Layout Structure

- Desktop admin app shell with `ตั้งค่า` active.
- Header: `ตั้งค่าสินค้า`.
- Tabs:
  - `หมวดหมู่สินค้า`
  - `แท็กสินค้า`
  - `รายการสี`
  - `รายการลายรักสมุก`
  - `รายการลายแกะสลัก`
  - `รายการสีคริสตัล`
- Each tab has a search input, status filter, table, and primary add action.
- No permanent "where used" report appears in the starting workflow.
- Blocking usage is shown only when the user attempts an action that cannot be completed.

## 7. Main Components

- Settings tab bar
- Search input
- Status filter: `ทั้งหมด`, `เปิดใช้งาน`, `ปิดใช้งาน`
- Dense settings table
- Add/edit drawer or modal
- Close/reopen actions
- Blocking modal with Product/SKU or Job links
- Management Log preview or link where useful
- `modal จัดการรายการแบบย่อ` in Product create/edit contexts

## 8. Data Shown

### หมวดหมู่สินค้า

| Field | Thai Label | Required | Notes |
|---|---|---:|---|
| Category name | ชื่อหมวดหมู่ | Yes | Display name. |
| Category code | รหัสหมวดหมู่ | Yes | Uppercase English letters/numbers, around 2-8 characters, unique. Used in SKU Variant code. |
| Status | สถานะ | Yes | `เปิดใช้งาน` / `ปิดใช้งาน`. |
| Note | หมายเหตุ | No | Optional. |

If `รหัสหมวดหมู่` has been used in SKU Variant codes, it cannot be edited.

### หมวดหมู่ย่อย

| Field | Thai Label | Required | Notes |
|---|---|---:|---|
| Subcategory name | ชื่อหมวดหมู่ย่อย | Yes | Display name. |
| Parent category | หมวดหมู่หลัก | Yes | Must belong to one active category. |
| Status | สถานะ | Yes | `เปิดใช้งาน` / `ปิดใช้งาน`. |
| Note | หมายเหตุ | No | Optional. |

Subcategory is not used in SKU Variant code.

### แท็กสินค้า

| Field | Thai Label | Required | Notes |
|---|---|---:|---|
| Tag name | ชื่อแท็ก | Yes | Text-only. |
| Status | สถานะ | Yes | `เปิดใช้งาน` / `ปิดใช้งาน`. |

Tags are only for product search/grouping. They do not affect workflow, permissions, pricing, or discounts.

### รายการสี

| Field | Thai Label | Required | Notes |
|---|---|---:|---|
| Color name | ชื่อสี | Yes | Must not duplicate another color name. |
| Color code | รหัสย่อ | Yes | Uppercase English letters/numbers, around 2-8 characters, unique. Used in SKU Variant code. |
| Sample image/color | รูปตัวอย่างสี | No | Optional. |
| Status | สถานะ | Yes | `เปิดใช้งาน` / `ปิดใช้งาน`. |
| Note | หมายเหตุ | No | Optional. |

If `รหัสย่อ` has been used in SKU Variant codes, it cannot be edited. Fixing a used color name is allowed, but old Order/Job/document snapshots keep the old name.

### รายการลายรักสมุก

| Field | Thai Label | Required | Notes |
|---|---|---:|---|
| Pattern name | ชื่อลาย | Yes | Required. |
| Sample image | รูปตัวอย่าง | No | Optional. |
| Status | สถานะ | Yes | `เปิดใช้งาน` / `ปิดใช้งาน`. |
| Note | หมายเหตุ | No | Optional. |

### รายการลายแกะสลัก

Uses the same fields and rules as `รายการลายรักสมุก`.

### รายการสีคริสตัล

Uses the same fields and rules as pattern/decor lists, not the product `รายการสี` rules. It requires only name; no code is required.

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search | ค้นหา | Product-settings permission | Filters current tab. | No |
| Filter status | กรองสถานะ | Product-settings permission | Filters current tab by status. | No |
| Add category | เพิ่มหมวดหมู่ | Product-settings permission | Creates category. | No |
| Add subcategory | เพิ่มหมวดหมู่ย่อย | Product-settings permission | Creates subcategory under a category. | No |
| Add tag | เพิ่มแท็ก | Product-settings permission | Creates text tag. | No |
| Add color | เพิ่มสี | Product-settings permission | Creates color; can optionally link to selected Product Models or selected categories. | No |
| Add pattern/decor | เพิ่มรายการ | Product-settings permission | Creates pattern/decor value. | No |
| Edit | แก้ไข | Product-settings permission | Edits allowed fields. | No |
| Close | ปิดใช้งาน | Product-settings permission | Hides from new selection if blockers are clear. | Yes |
| Reopen | เปิดใช้งาน | Product-settings permission | Makes value selectable again. | Yes when reopened from mini manager; otherwise normal confirmation is acceptable. |
| Delete unused | ลบ | Product-settings permission | Deletes only records that have never been used. | Yes |
| Open blocker | เปิดสินค้า / เปิด Job | Product-settings permission | Opens blocking Product/SKU or Job from modal. | No |

## 10. Close / Reopen Rules

### รายการสี

- Closing is allowed only when every linked SKU Variant has `มีอยู่ในร้าน = 0` and `จองแล้ว = 0`.
- If `มีอยู่ในร้าน > 0` or `จองแล้ว > 0`, block closing and show a modal with affected SKUs/products.
- If `ขายได้ติดลบ` exists, show it as an additional reason when relevant.
- Reopening a color makes it usable again for products already linked to that color; those product-color links were not deleted.

### หมวดหมู่สินค้า / หมวดหมู่ย่อย

- Closing is allowed only when no active Product Models remain in that category/subcategory.
- If blocked, show a modal with active Product Models and buttons to open them.

### รายการลายรักสมุก / รายการลายแกะสลัก / รายการสีคริสตัล

- Closing is blocked only when active/in-progress Jobs still use the value.
- If blocked, show a modal with Job list and buttons to open Job.
- Historical Product/Order/Job usage alone does not block closing.

### แท็กสินค้า

- Tags can be closed at any time.
- Existing Product Models still show the tag with `ปิดใช้งาน` badge.
- Closed tags are hidden from new tag selection.

## 11. Add Color To Products

When adding a new color from `รายการสี`:

- User may leave it as a color-list record only.
- User may link it to selected Product Models.
- User may link it to selected categories.
- Category linking affects only existing Product Models in those categories at that time.
- Linked colors are enabled immediately and create SKU Variants.
- If a product-color pair already exists, skip it and summarize the skipped records.

## 12. Mini Manager Modal

Product creation/edit may open `modal จัดการรายการแบบย่อ` for permitted users.

The mini modal can:

- Add a new value.
- Search existing values.
- Reopen inactive values after confirmation.

The mini modal cannot:

- Replace the full settings page.
- Close values.
- Show a permanent "where used" report.

Context rules:

- Adding or reopening `รายการสี` from the mini modal links it to the current Product Model immediately and creates/reopens the SKU Variant.
- Adding `รายการลายรักสมุก`, `รายการลายแกะสลัก`, or `รายการสีคริสตัล` from the mini modal links it to the current Product Model immediately.

## 13. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Active | เปิดใช้งาน | Selectable for new work. | Positive chip. |
| Inactive | ปิดใช้งาน | Hidden from new selection, retained for history/admin view. | Gray chip. |
| Used | เคยใช้งานแล้ว | Cannot be deleted. | Neutral chip. |
| Code locked | ล็อกรหัสแล้ว | Code has appeared in SKU Variant code and cannot be edited. | Lock icon/chip. |
| Blocked | ปิดไม่ได้ | Active Product/SKU/Job blocker exists. | Warning chip/modal. |

## 14. Error / Modal States

- Duplicate color name/code: show `ชื่อสีหรือรหัสย่อซ้ำ` and button `เปิดสีเดิม`.
- Duplicate category code: show `รหัสหมวดหมู่ซ้ำ`.
- Used color code edit blocked: show `รหัสนี้ถูกใช้สร้าง SKU แล้ว`.
- Used category code edit blocked: show `รหัสนี้ถูกใช้สร้าง SKU แล้ว`.
- Close color blocked: show affected SKU rows, `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้` where useful.
- Close category/subcategory blocked: show active Product Models with `เปิดสินค้า`.
- Close pattern/decor blocked: show active/in-progress Jobs with `เปิด Job`.
- Permission fails: `ไม่มีสิทธิ์ตั้งค่าสินค้า`.

## 15. Permission Rules

- Users without product-settings permission do not see `ตั้งค่าสินค้า`.
- Product creation/edit mini manager appears only for users with product-settings permission.
- Read-only exposure of the settings menu is not in the starting workflow.
- Add/edit/close/reopen/delete actions create Management Log entries.

## 16. UX Notes For Designer

- Keep this screen compact and operational; it is a settings workbench, not a product catalogue.
- Use tabs rather than one mixed table.
- Keep `รายการสี` visually different from pattern/decor lists because it has code and SKU implications.
- Do not show product cost, pricing, formula, supplier, accounting, or production-recipe details here.
- Avoid permanent usage reports; show usage only when it blocks an action.
- Use normal Thai labels. Do not show `CRUD`, `Master`, or `ข้อมูลตั้งต้นสินค้า`.

## 17. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-012-product-settings.md` as the image generation prompt source.
