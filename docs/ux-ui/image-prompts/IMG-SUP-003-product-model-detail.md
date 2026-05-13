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
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายละเอียด SKU ใหญ่”. This is the full-option read-only detail page for one Product Model / SKU ใหญ่. It shows the parent product family, shared product identity, default images/instructions, and related SKU Variant / SKU ย่อย records. It is not an edit form and not a stock adjustment page.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin reviews one Product Model / SKU ใหญ่ before opening or creating SKU ย่อย. The page explains the product family and helps staff see related variants quickly.

Header area:
- Page title: รายละเอียด SKU ใหญ่
- Product Model code: PM-TEAK-TABLE-001
- Product Model name: โต๊ะข้างไม้สัก
- Chips: SKU ใหญ่, เปิดใช้งาน, มี SKU ย่อย 4, มีรีวิว
- Primary action: แก้ไข SKU ใหญ่
- Secondary actions: เพิ่ม SKU ย่อย, กลับไปรายการสินค้า
- The header must feel like a read-only detail page. Do not show inline editable fields.

Main layout:
Use a card-based read-only detail layout. Main content should stack vertically in clear cards. A compact sticky right summary/action card is allowed, but the page must not look like a form editor.

Left main column:
Card 1: ภาพสินค้า
- Large hero image of a Thai teak side table product family, with visible wood carving/detail.
- Add 4 thumbnails for different colors/angles: สีโอ๊คเข้ม, สีทองโบราณ, สีขาวเปลือกไข่, รายละเอียดลาย.
- Show chips: รูปหลัก, รูปมาตรฐาน SKU ใหญ่.
- This card should help staff recognize the product family immediately.

Card 2: ข้อมูล SKU ใหญ่
- Use read-only label/value rows, not input fields.
- Fields:
  - SKU ใหญ่: โต๊ะข้างไม้สัก
  - รหัส SKU ใหญ่: PM-TEAK-TABLE-001
  - หมวดหมู่: โต๊ะ
  - สถานะ: เปิดใช้งาน
  - จำนวน SKU ย่อย: 4 รายการ
  - อ้างอิง Job: JOB-O-0241
- Small link/action: เปิด Job อ้างอิง
- Make clear Job reference is traceability only, not copying data.

Card 3: ขนาดมาตรฐาน
- Show three separate metric tiles:
  - กว้างมาตรฐาน: 45 ซม.
  - ลึกมาตรฐาน: 45 ซม.
  - สูงมาตรฐาน: 55 ซม.
- Include note: ใช้เป็นค่าเริ่มต้นตอนสร้าง SKU ย่อย / งานสั่งทำ

Card 4: SKU ย่อยในกลุ่มนี้
- Dense table/list with 4 rows and thumbnails.
- Columns:
  - รูป
  - SKU ย่อย
  - รหัส SKU
  - สี
  - กว้าง
  - ลึก
  - สูง
  - สต๊อก
  - งานผลิต
  - สถานะ
  - จัดการ
- Example rows:
  1. โต๊ะข้างไม้สัก สีโอ๊คเข้ม, SKU-TEAK-TABLE-OAK-001, สีโอ๊คเข้ม, 45 / 45 / 55 ซม., คงเหลือ 0, กำลังผลิต 6, chips ไม่มีสต๊อก and กำลังผลิต, action เปิด SKU
  2. โต๊ะข้างไม้สัก สีทองโบราณ, SKU-TEAK-TABLE-GOLD-002, สีทองโบราณ, 45 / 45 / 55 ซม., คงเหลือ 2, งานผลิต -, chip เปิดใช้งาน, action เปิด SKU
  3. โต๊ะข้างไม้สัก สีขาวเปลือกไข่, SKU-TEAK-TABLE-WHITE-003, สีขาวเปลือกไข่, 45 / 45 / 55 ซม., คงเหลือ 1, งานผลิต -, chip มีรีวิว, action เปิด SKU
  4. โต๊ะข้างไม้สัก สีโอ๊คแดง, SKU-TEAK-TABLE-REDOAK-004, สีโอ๊คแดง, 45 / 45 / 55 ซม., คงเหลือ 0, งานผลิต -, chip ไม่มีสต๊อก, action เปิด SKU
- Include an action above the table: เพิ่ม SKU ย่อย.
- Important: dimensions must appear as separate fields/columns: กว้าง, ลึก, สูง.

Card 5: รูปสินค้าและคำอธิบายมาตรฐาน
- Show image groups as separate subcards:
  - รูปหลัก 1 รูป
  - รูปเพิ่มเติม 8 รูป
  - รูปสำหรับช่างไม้ 3 รูป
  - รูปสำหรับฝ่ายสี/ตกแต่ง 4 รูป
  - รูปสำหรับรักสมุก 2 รูป
- Each group shows thumbnails large enough to inspect.
- Include small read-only action link: ดูรูปทั้งหมด.
- Do not show upload dropzones on this read-only screen.

Card 6: คำอธิบายตามแผนก
- Separate mini cards:
  - ช่างไม้: โครงโต๊ะข้างไม้สัก ขาทรงโค้ง ใช้ขนาดมาตรฐาน
  - ฝ่ายสี/ตกแต่ง: เลือกสีตาม SKU ย่อย
  - รักสมุก: ใช้รูปแบบลายตาม SKU ย่อย หรือแนบเพิ่มใน Job
- Show as read-only notes, not editable text areas.

Card 7: รีวิวและข้อมูลจำกัดสิทธิ์
- Review Album summary: คลังรีวิว 18 รูป
- Show a horizontal preview strip with 4 review thumbnails.
- Show a permission-safe restricted indicator: ข้อมูลค่าจ้างมาตรฐาน: จำกัดสิทธิ์
- Do not show any amount, cost, labor rate, price, profit, or accounting data.
- Buttons: เปิดคลังรีวิว, จัดการรูปสินค้า

Right panel:
Title: ภาพรวม SKU ใหญ่
Show:
- Main image thumbnail
- Product Model code PM-TEAK-TABLE-001
- จำนวน SKU ย่อย 4
- เปิดใช้งาน 4
- ไม่มีสต๊อก 2
- กำลังผลิต 1
- รีวิว 18 รูป
- อ้างอิง Job: JOB-O-0241
Actions as vertical buttons:
- เพิ่ม SKU ย่อย
- จัดการรูปสินค้า
- เปิดคลังรีวิว
- เปิด Job อ้างอิง
- ปิดใช้งาน

Important edit rule:
This page is read-only. Do not render editable inputs, upload dropzones, inline text areas, save buttons, or form controls for changing Product Model data. Show `แก้ไข SKU ใหญ่` as the path into editing.

Important stock rule:
Do not show editable quantity fields. Stock appears only as report-only summary on SKU ย่อย rows.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Do not show product cost, labor cost, standard labor rate amount, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Keep `SKU ใหญ่` and `SKU ย่อย` clearly distinct
- Keep dimensions as separate fields: กว้าง, ลึก, สูง
- Keep Review Album separate from product image groups
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Make the page feel like product family detail management, not a catalogue landing page
```
