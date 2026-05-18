# IMG-SUP-004 - SKU Variant Detail

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-004-sku-variant-detail.md`

Visual/content anchors:
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายละเอียด SKU ย่อย”. This is the read-only detail page for one color-specific SKU Variant under a Product Model / SKU หลัก. It supports exact SKU/color inspection, image fallback, stock visibility, and navigation to stock or production actions.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin reviews one SKU Variant as the exact color-specific stock unit. Product-level editing and color open/close decisions belong in Product Model Detail.

Header area:
- Page title: รายละเอียด SKU ย่อย
- SKU code: TBR-TBL-123-OAK
- Main name: โต๊ะข้างไม้สัก สีโอ๊คเข้ม
- Chips: SKU ย่อย, สีเปิดใช้งาน, ขายได้ 3 ชิ้น
- Primary action: เปิด SKU หลัก
- Secondary actions: จัดการรูปสินค้า, กลับไปรายการสินค้า
- The header must feel read-only. Do not show inline editable fields.

Main layout:
Use a card-based read-only detail layout with stacked cards and a compact right summary panel.

Left main column:
Card 1: ภาพสินค้า
- Large image of dark oak Thai wooden side table.
- If this color has its own SKU ย่อย image, show chip `รูปเฉพาะสี`.
- Also show a subtle fallback label where useful: ถ้าไม่มีรูปเฉพาะสี ใช้รูปจาก SKU หลัก.
- Add 3 small thumbnails.

Card 2: ข้อมูล SKU ย่อย
- Read-only label/value rows:
  - SKU หลัก: โต๊ะข้างไม้สัก
  - รหัส SKU หลัก: 123
  - SKU ย่อย: สีโอ๊คเข้ม
  - รหัส SKU: TBR-TBL-123-OAK
  - หมวดหมู่: โต๊ะ
  - สี: สีโอ๊คเข้ม
  - สถานะสี: เปิดใช้งาน
- Small button: เปิด SKU หลัก

Card 3: ขนาดสินค้า
- Show three separate fields inherited from SKU หลัก:
  - กว้าง: 45 ซม.
  - ลึก: 45 ซม.
  - สูง: 55 ซม.
- Include note: ขนาดมาจาก SKU หลัก.

Card 4: รูปตามแผนก
- Show groups with fallback indicators:
  - รูปหลัก: ใช้รูปจาก SKU ย่อย
  - รูปสำหรับช่างไม้: ใช้รูปจาก SKU หลัก
  - รูปสำหรับฝ่ายสี/ตกแต่ง: ใช้รูปจาก SKU ย่อย
  - รูปสำหรับรักสมุก: ใช้รูปจาก SKU หลัก
- Each group shows thumbnails large enough to inspect.
- Include action: จัดการรูปสินค้า.
- Do not show upload dropzones here.

Card 5: สต๊อกและงานผลิต
- Report-only stock summary with three explicit labels:
  - มีอยู่ในร้าน 4
  - จองแล้ว 1
  - ขายได้ 3
- Production summary:
  - กำลังผลิต 0
  - รอรับเข้า 0
- Navigation buttons only: ดูสต๊อก, ปรับยอดสต๊อก, ผลิตเข้าสต๊อก.
- Do not show editable stock quantity fields.

Card 6: รีวิวและบริบท
- Review Album is reached from SKU หลัก context.
- Show link/button: เปิดคลังรีวิว
- Job reference should not appear as a SKU ย่อย-owned field; if shown, make it clear it belongs to SKU หลัก.

Right panel:
Title: ภาพรวม SKU ย่อย
Show:
- Main image thumbnail
- SKU code TBR-TBL-123-OAK
- สีโอ๊คเข้ม
- สถานะสี เปิดใช้งาน
- มีอยู่ในร้าน 4
- จองแล้ว 1
- ขายได้ 3
Actions as vertical buttons:
- เปิด SKU หลัก
- ผลิตเข้าสต๊อก
- ปรับยอดสต๊อก
- จัดการรูปสินค้า

Important stock rule:
Use `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`. Do not use `คงเหลือ` or `พร้อมขาย`. If `ขายได้` is negative, show the negative number with a warning.

Important edit rule:
This page is read-only. Do not render editable inputs, upload dropzones, inline text areas, save buttons, or form controls for changing SKU data. Color open/close happens in Product Model Detail.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Do not show product cost, labor cost, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Do not allow direct stock editing in this page
- Keep dimensions as separate fields: กว้าง, ลึก, สูง
- Keep Product Model / SKU หลัก and SKU Variant / SKU ย่อย clearly distinct
- Keep Review Album separate from product image groups
- Use the approved light sidebar baseline; do not switch to a dark sidebar
```
