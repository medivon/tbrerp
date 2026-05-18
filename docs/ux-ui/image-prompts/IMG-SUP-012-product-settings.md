# IMG-SUP-012 - Product Settings

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-012-product-settings.md`

Visual/content anchors:
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP settings screen for THAIBORAN called “ตั้งค่าสินค้า”. This is under the main sidebar item “ตั้งค่า”. It maintains product settings lists used by Product Model, SKU Variant, and production instructions. It is not a product catalogue, not a stock screen, and not a report.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ตั้งค่า” as active
- Top bar with page title, date, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin with product-settings permission manages product setting lists: หมวดหมู่สินค้า, แท็กสินค้า, รายการสี, รายการลายรักสมุก, รายการลายแกะสลัก, and รายการสีคริสตัล. Do not show this menu for users without permission.

Header:
- Page title: ตั้งค่าสินค้า
- Subtitle: จัดการหมวดหมู่ สี ลาย และแท็กที่ใช้กับสินค้า
- Small chip: บันทึกใน Management Log
- Do not use the words CRUD, Master, or ข้อมูลตั้งต้นสินค้า anywhere in visible UI.

Tabs:
- หมวดหมู่สินค้า
- แท็กสินค้า
- รายการสี (active)
- รายการลายรักสมุก
- รายการลายแกะสลัก
- รายการสีคริสตัล

Active tab: รายการสี

Toolbar:
- Search placeholder: ค้นหาชื่อสี / รหัสย่อ
- Status filter chips: ทั้งหมด, เปิดใช้งาน, ปิดใช้งาน
- Primary button: เพิ่มสี

Main table columns:
- ชื่อสี
- รหัสย่อ
- รูปตัวอย่างสี
- สถานะ
- หมายเหตุ
- การใช้งาน
- จัดการ

Rows:
1. สีโอ๊คเข้ม, OAK, sample swatch/image, เปิดใช้งาน, note blank, chip ล็อกรหัสแล้ว, actions แก้ไข and ปิดใช้งาน
2. สีทองโบราณ, GLD, gold sample image, เปิดใช้งาน, note ใช้บ่อย, chip ล็อกรหัสแล้ว, actions แก้ไข and ปิดใช้งาน
3. สีขาวเปลือกไข่, WHT, white sample, เปิดใช้งาน, no note, action ปิดใช้งาน
4. สีโอ๊คแดง, ROK, red oak sample, ปิดใช้งาน, note เลิกใช้ชั่วคราว, action เปิดใช้งาน

Right side or lower panel:
Show a compact selected-row detail for สีโอ๊คเข้ม:
- ชื่อสี: สีโอ๊คเข้ม
- รหัสย่อ: OAK
- สถานะ: เปิดใช้งาน
- รหัสย่อถูกใช้สร้าง SKU แล้ว
- บันทึกล่าสุด: แก้ไขชื่อสี โดย Admin
- Buttons: แก้ไข, ปิดใช้งาน

Blocking modal example:
Show a modal for an attempted close:
- Title: ปิดสีนี้ไม่ได้
- Message: ยังมีสินค้าในร้านหรือรายการจองอยู่
- Mini table:
  - TBR-TBL-123-OAK, โต๊ะข้างไม้สัก, มีอยู่ในร้าน 4, จองแล้ว 1, ขายได้ 3, button เปิดสินค้า
  - TBR-ALT-127-OAK, โต๊ะหมู่บูชา, มีอยู่ในร้าน 0, จองแล้ว 1, ขายได้ -1, chips มีรายการจองอยู่ and ขายได้ติดลบ, button เปิดสินค้า
- Buttons: ปิด, กลับไปจัดการ

Mini manager note:
If showing a small callout, mention that product create/edit can open `modal จัดการรายการแบบย่อ` to add/search/reopen values for permitted users. Do not show this as the main screen.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, Management Log
- Do not show product cost, pricing, supplier, formula, tax, accounting, or production recipe fields
- Do not show a permanent “สีนี้ใช้กับสินค้าไหน” report
- Usage details appear only inside a blocking modal when the user tries to close a value
- Keep the screen practical and dense like settings, with tabs and tables
```
