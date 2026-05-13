# IMG-SUP-004 - SKU Variant Detail

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-004-sku-variant-detail.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-004-sku-variant-detail/SCR-SUP-004-approved.png`
- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-selected-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายละเอียด SKU”. This is the full-option read-only detail page for one SKU Variant / SKU ย่อย. It supports product recognition, large images, department instructions, review links, Job reference, and stock/production summary. It is not an edit form and not a stock adjustment page.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin reviews one SKU Variant clearly before deciding whether to edit it. Stock and production are visible as summary/report-only, with navigation actions to dedicated screens.

Header area:
- Page title: รายละเอียด SKU
- SKU code: SKU-TEAK-TABLE-OAK-001
- Main name: โต๊ะข้างไม้สัก สีโอ๊คเข้ม
- Chips: SKU ย่อย, เปิดใช้งาน, ไม่มีสต๊อก, กำลังผลิต
- Primary action: แก้ไข SKU
- Secondary actions: เปิด SKU ใหญ่, กลับไปรายการสินค้า
- The header must feel like a read-only detail page. Do not show inline editable fields.

Main layout:
Use a card-based read-only detail layout. Main content should stack vertically in clear rows/cards, like a product record story. A compact sticky right summary/action card is allowed, but the main experience must not look like a form editor.

Left main column:
Card 1: ภาพสินค้า
- Make this the most visual card on the screen.
- Large main image of dark oak Thai wooden side table, around half-card width or a large banner-like image area.
- Add 4 small thumbnails below or beside it for additional angles.
- Show chips over/near the image: รูปหลัก, เปิดใช้งาน.
- This card should help staff recognize the item immediately.

Card 2: ข้อมูลสินค้า
- Use read-only label/value rows, not input fields.
- Fields:
  - SKU ใหญ่: โต๊ะข้างไม้สัก
  - SKU ย่อย: โต๊ะข้างไม้สัก สีโอ๊คเข้ม
  - รหัส SKU: SKU-TEAK-TABLE-OAK-001
  - หมวดหมู่: โต๊ะ
  - สี: สีโอ๊คเข้ม
  - สถานะ: เปิดใช้งาน
- Small button: เปิด SKU ใหญ่

Card 3: ขนาดสินค้า
- Show three separate fields, not one combined text:
  - กว้าง: 45 ซม.
  - ลึก: 45 ซม.
  - สูง: 55 ซม.
- Include note: ใช้สำหรับผลิต / ค้นหา / จัดส่ง
- Design as three compact metric tiles inside the card.

Card 4: รูปสินค้าและรูปตามแผนก
- Show image groups as separate subcards, not one compressed tab strip:
  - รูปหลัก
  - รูปเพิ่มเติม
  - รูปสำหรับช่างไม้
  - รูปสำหรับฝ่ายสี/ตกแต่ง
  - รูปสำหรับรักสมุก
- Each group shows 2-4 thumbnails large enough to inspect details.
- Include subtle counters, such as 1 รูป, 6 รูป, 3 รูป.
- Include a small read-only action link: ดูรูปทั้งหมด.
- Do not show upload dropzones on this read-only screen. Upload/edit belongs after clicking แก้ไข SKU or image management.

Card 5: คำอธิบายตามแผนก
- Separate mini cards:
  - ช่างไม้: โครงโต๊ะข้างไม้สัก ขาทรงโค้ง
  - ฝ่ายสี/ตกแต่ง: สีโอ๊คเข้ม เคลือบด้าน
  - รักสมุก: ไม่มีงานรักสมุกสำหรับ SKU นี้
- This section should be clearly production-facing.
- Show as read-only notes, not editable text areas.

Card 6: รีวิวและอ้างอิง
- Review Album summary: คลังรีวิว 12 รูป
- Show a large horizontal preview strip with 4 review thumbnails.
- Optional Customer/Order link preview: ไม่มีข้อมูลลูกค้าที่ผูกโดยตรง
- Job reference: อ้างอิง Job: ไม่มี
- Buttons: เปิดคลังรีวิว, เลือก Job อ้างอิง
- Make clear Job reference is traceability only, not copying data.

Card 7: สต๊อกและงานผลิต
- Report-only summary:
  - คงเหลือ 0
  - จองแล้ว 0
  - พร้อมขาย 0
  - กำลังผลิต 6
  - รอรับเข้าสต๊อก 0
- Include navigation buttons only: ดูสต๊อก, ตรวจนับสต๊อก, ปรับยอดสต๊อก.
- Do not show editable stock quantity fields.

Right panel:
Title: ภาพรวม SKU
Show:
- Main image thumbnail
- SKU code
- Stock summary:
  - คงเหลือ 0
  - จองแล้ว 0
  - พร้อมขาย 0
- Production summary:
  - กำลังผลิต 6
  - รอรับเข้าสต๊อก 0
- Review summary:
  - รีวิว 12 รูป
- Status:
  - เปิดใช้งาน
Actions as vertical buttons:
- สร้างงานผลิต
- เปิดคลังรีวิว
- ปิดใช้งาน
- The right panel should be secondary. The stacked cards are the main detail experience.

Important stock rule:
Actions `ดูสต๊อก`, `ตรวจนับสต๊อก`, and `ปรับยอดสต๊อก` are navigation buttons. Do not show editable quantity fields here.

Important edit rule:
This page is read-only. Do not render editable inputs, upload dropzones, inline text areas, save buttons, or form controls for changing SKU data. Show `แก้ไข SKU` as the only path into editing.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Do not show product cost, labor cost, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Do not allow direct stock editing in this page
- Do not show `บันทึก`, `ยกเลิก`, or editable form controls
- Keep dimensions as separate fields: กว้าง, ลึก, สูง
- Keep Product Model and SKU Variant clearly distinct
- Keep Review Album separate from product image groups
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Make the page feel like detail management, not a catalogue landing page
```
