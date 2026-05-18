# IMG-SUP-006 - Ready Stock View

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-006-ready-stock-view.md`

Visual/content anchors:
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สินค้าพร้อมส่ง”. This is the Ready Stock View for the `สินค้า / สต๊อก` module. It shows stock visibility for SKU Variants using three clear stock labels: `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`. It is not a stock adjustment form.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin and stock users review what physically exists, what is reserved, and what can be sold. They can open SKU details, start stock count, or navigate to stock adjustment, but cannot edit stock numbers inline.

Header area:
- Page title: สินค้าพร้อมส่ง
- Subtitle: ดูจำนวนมีอยู่ในร้าน จองแล้ว และขายได้ของ SKU ย่อย
- Primary action: ตรวจนับสต๊อก
- Secondary actions: ปรับยอดสต๊อก, กลับไปรายการสินค้า

Top summary cards:
- SKU ย่อยขายได้ 42
- หมด 18
- มีจอง 12
- ขายได้ติดลบ 3
- ควรตรวจนับ 6

Toolbar:
- Search input placeholder: ค้นหาชื่อสินค้า / รหัส SKU / สี / หมวดหมู่
- Filter button: ตัวกรอง
- Sort dropdown: เรียงตาม ขายได้น้อยสุด
- Filter chips:
  - ทั้งหมด
  - ขายได้
  - หมด
  - มีจอง
  - ขายได้ติดลบ
  - ควรตรวจนับ

Main layout:
Use a wide dense table on the left and a right preview drawer for the selected SKU Variant.
This should feel like a stock visibility workbench, not a product catalogue and not an edit form.

Table columns:
- checkbox
- รูป
- SKU หลัก / SKU ย่อย
- รหัส SKU
- สี
- กว้าง
- ลึก
- สูง
- มีอยู่ในร้าน
- จองแล้ว
- ขายได้
- ตรวจล่าสุด
- สถานะ
- จัดการ

Important: dimensions must be separate columns: `กว้าง`, `ลึก`, `สูง`, each with `ซม.`.
Important: stock columns must look read-only. Do not show steppers, text inputs, plus/minus quantity buttons, or editable cells.

Show 5 realistic table rows with product thumbnails:
1. SKU หลัก: โต๊ะข้างไม้สัก; SKU ย่อย: สีโอ๊คเข้ม; TBR-TBL-123-OAK; สีโอ๊คเข้ม; กว้าง 45; ลึก 45; สูง 55 ซม.; มีอยู่ในร้าน 4; จองแล้ว 1; ขายได้ 3; ตรวจล่าสุด 20 พ.ค. 67; chip ขายได้; action เปิด SKU
2. ตู้พระไม้สัก; สีทองโบราณ; TBR-CAB-124-GLD; 90 / 45 / 160 ซม.; มีอยู่ในร้าน 2; จองแล้ว 1; ขายได้ 1; ตรวจล่าสุด 19 พ.ค. 67; chips ขายได้ and มีจอง; action เปิด SKU
3. ฐานพระไม้สัก; สีขาวเปลือกไข่; TBR-BASE-125-WHT; 60 / 35 / 28 ซม.; มีอยู่ในร้าน 5; จองแล้ว 2; ขายได้ 3; ตรวจล่าสุด 18 พ.ค. 67; chip ขายได้; action เปิด SKU
4. ตู้โชว์ไม้สักแกะลาย; สีโอ๊ค; TBR-CAB-126-OAK; 120 / 45 / 180 ซม.; มีอยู่ในร้าน 0; จองแล้ว 0; ขายได้ 0; ตรวจล่าสุด 10 พ.ค. 67; chips หมด and ควรตรวจนับ; action เปิด SKU
5. โต๊ะหมู่บูชา; สีดำ; TBR-ALT-127-BLK; 75 / 50 / 120 ซม.; มีอยู่ในร้าน 0; จองแล้ว 1; ขายได้ -1; ตรวจล่าสุด 21 พ.ค. 67; chip ขายได้ติดลบ; action เปิด SKU

Right preview drawer:
Title: รายละเอียดสต๊อก
Selected SKU: TBR-CAB-124-GLD
Large image of gold antique Thai altar cabinet
Show:
- SKU หลัก: ตู้พระไม้สัก
- SKU ย่อย: สีทองโบราณ
- สี: สีทองโบราณ
- ขนาด: กว้าง 90 ซม. / ลึก 45 ซม. / สูง 160 ซม.
- มีอยู่ในร้าน: 2
- จองแล้ว: 1
- ขายได้: 1
- ตรวจล่าสุด: 19 พ.ค. 67
- หมายเหตุสต๊อก: ขายได้ 1 ชิ้น
Actions:
- เปิด SKU
- ตรวจนับสต๊อก
- ปรับยอดสต๊อก
- ดูประวัติสต๊อก

Inline info card:
- การปรับจำนวนสต๊อกต้องทำผ่านหน้าตรวจนับหรือปรับยอดเท่านั้น

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Do not show product cost, labor cost, sales price, profit, tax details, accounting ledger, ad spend, or private CRM notes
- Do not allow direct stock editing in table cells or drawer
- Stock action buttons must look like navigation buttons
- Use `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`; do not use `คงเหลือ` or `พร้อมขาย`
- Keep `กว้าง`, `ลึก`, `สูง` as separate fields/columns
- Use image thumbnails for fast furniture recognition
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Keep visual density high but readable
```
