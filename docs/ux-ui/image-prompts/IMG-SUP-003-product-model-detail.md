# IMG-SUP-003 - Product Model Detail

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-003-product-model-detail.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-003-product-model-detail/SCR-SUP-003-approved.png`
- `docs/ux-ui/mockups/SCR-SUP-004-sku-variant-detail/SCR-SUP-004-approved.png`
- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายละเอียด SKU หลัก”. This is the Product Model detail page. Product Model / SKU หลัก is the parent product record; color-specific SKU Variants / SKU ย่อย are managed inside the `สีของสินค้า` section. This page is not an inline stock editor.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin reviews one Product Model, sees which colors are real options for this product, checks stock by color, and starts production or stock adjustment for a specific enabled color.

Header area:
- Page title: รายละเอียด SKU หลัก
- Product Model ID: 123
- Product Model name: โต๊ะข้างไม้สัก
- Chips: SKU หลัก, เปิดใช้งาน, สีเปิดใช้งาน 4, ขายได้ 5 ชิ้น
- Primary action: แก้ไข SKU หลัก
- Secondary actions: จัดการรูปสินค้า, กลับไปรายการสินค้า
- The header must feel like a detail/management page, not an edit form.

Main layout:
Use stacked sections with a compact right summary panel. The most important section after identity is `สีของสินค้า`.

Left main column:
Card 1: ภาพสินค้า
- Large hero image of a Thai teak side table product family.
- Show one main product image and small thumbnails for additional product images.
- Show chips: รูปหลัก, รูปจาก SKU หลัก.
- No upload dropzone here; image management is a separate action.

Card 2: ข้อมูล SKU หลัก
- Read-only label/value rows:
  - SKU หลัก: โต๊ะข้างไม้สัก
  - รหัสสินค้า: 123
  - หมวดหมู่: โต๊ะ
  - สถานะ: เปิดใช้งาน
  - อ้างอิง Job: JOB-O-0241
- Small link/action: เปิด Job อ้างอิง
- Make clear Job reference is traceability only, not copying data.

Card 3: ขนาดสินค้า
- Show three separate metric tiles:
  - กว้าง: 45 ซม.
  - ลึก: 45 ซม.
  - สูง: 55 ซม.
- Include note: ถ้าขนาดต่างจริง ให้สร้าง SKU หลักใหม่.

Card 4: สีของสินค้า
- This is the key table on the page.
- Show both enabled and disabled colors.
- Columns:
  - สี
  - สถานะสี
  - รหัส SKU
  - มีอยู่ในร้าน
  - จองแล้ว
  - ขายได้
  - งานผลิต
  - จัดการ
- Example rows:
  1. สีโอ๊คเข้ม, เปิดใช้งาน, TBR-TBL-123-OAK, มีอยู่ในร้าน 4, จองแล้ว 1, ขายได้ 3, กำลังผลิต -, actions ปรับยอดสต๊อก and ผลิตเข้าสต๊อก
  2. สีทองโบราณ, เปิดใช้งาน, TBR-TBL-123-GLD, มีอยู่ในร้าน 2, จองแล้ว 0, ขายได้ 2, รอรับเข้า 1, actions ปรับยอดสต๊อก and ผลิตสินค้าชิ้นนี้
  3. สีขาวเปลือกไข่, เปิดใช้งาน, TBR-TBL-123-WHT, มีอยู่ในร้าน 0, จองแล้ว 0, ขายได้ 0, กำลังผลิต -, action ผลิตเข้าสต๊อก
  4. สีโอ๊คแดง, ปิดใช้งาน, TBR-TBL-123-ROK, มีอยู่ในร้าน 0, จองแล้ว 0, ขายได้ 0, gray row, action เปิดใช้สีนี้
  5. สีดำ, เปิดใช้งาน, TBR-TBL-123-BLK, มีอยู่ในร้าน 0, จองแล้ว 1, ขายได้ -1, warning chip มีรายการติดลบ, action ปรับยอดสต๊อก
- Include action above the table: เพิ่มสีให้สินค้า.
- Production buttons appear only for enabled colors.
- Do not make stock numbers editable inline.

Card 5: รูปสินค้าและคำอธิบายมาตรฐาน
- Show Product Model image groups as default/fallback:
  - รูปหลัก
  - รูปรอง / รูปเพิ่มเติม
  - รูปสำหรับช่างไม้
  - รูปสำหรับฝ่ายสี/ตกแต่ง
  - รูปสำหรับรักสมุก
- Include small action: จัดการรูปสินค้า.
- Explain visually that SKU ย่อย can override missing/specific images later.

Card 6: งานผลิตและรีวิว
- Production summary: กำลังผลิต 6, รอรับเข้า 1
- Link: ดูงานผลิตที่เกี่ยวข้อง
- Review Album summary: คลังรีวิว 18 รูป with thumbnails
- Buttons: เปิดคลังรีวิว, ดูงานผลิตที่เกี่ยวข้อง

Right panel:
Title: ภาพรวม SKU หลัก
Show:
- Main image thumbnail
- รหัสสินค้า 123
- สีเปิดใช้งาน 4
- สีปิดใช้งาน 1
- ขายได้รวม 5 ชิ้น
- มีรายการติดลบ 1
- กำลังผลิต 6
- รอรับเข้า 1
Actions as vertical buttons:
- เพิ่มสีให้สินค้า
- จัดการรูปสินค้า
- เปิดคลังรีวิว
- เปิด Job อ้างอิง
- ปิดใช้งานสินค้า

Important stock rule:
Use `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`. Do not use `คงเหลือ` or `พร้อมขาย`. Negative `ขายได้` is shown directly with a warning.

Important edit rule:
This page is not a free-form edit form. Product fields are read-first. Color open/close and navigation actions may appear, but do not render inline product field inputs or direct stock quantity editing.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Do not show product cost, labor cost, standard labor rate amount, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Use `SKU หลัก` for Product Model and `SKU ย่อย` for color-specific stock units
- Keep dimensions as separate fields: กว้าง, ลึก, สูง
- Keep Review Album separate from product image groups
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Make the page feel like product detail management, not a catalogue landing page
```
