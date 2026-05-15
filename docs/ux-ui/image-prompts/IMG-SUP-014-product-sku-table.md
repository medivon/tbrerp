# IMG-SUP-014 - Product / SKU Table

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-014-product-sku-table.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายการสินค้า / SKU”. This is the main Product/SKU table for the `สินค้า / สต๊อก` module. Product Models / SKU หลัก are the main table rows. SKU Variants / SKU ย่อย appear only as expanded read-only color rows when they have saleable stock. This screen is not a stock adjustment page and must not create production directly from the table row.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin searches Product Models, reviews saleable stock at product level, expands stocked rows to see saleable colors/SKU Variants, and opens Product Detail for deeper management.

Header area:
- Page title: รายการสินค้า / SKU
- Subtitle: ค้นหา SKU หลักและดูสีที่ขายได้
- Primary action: เพิ่มสินค้า
- Do not show a separate `เพิ่ม SKU` action in the header.

Top summary cards:
- สินค้าทั้งหมด 128
- เปิดใช้งาน 116
- ขายได้ 342 ชิ้น
- หมด 28
- มีรายการติดลบ 3

Toolbar:
- Search input placeholder: ค้นหาชื่อสินค้า / รหัสสินค้า / รหัส SKU / สี
- Filter button: ตัวกรอง
- Sort dropdown: เรียงตาม อัปเดตล่าสุด
- Filter chips:
  - ทั้งหมด
  - ขายได้
  - หมด
  - มีรายการติดลบ
  - สีโอ๊ค
  - หมวดโต๊ะ

Main layout:
Use a wide dense Product Model table. A right preview drawer is optional; if shown, it must preview Product Detail / SKU หลัก, not one SKU ย่อย as the primary object.

Table columns:
- expand +
- รูป
- SKU หลัก
- รหัสสินค้า
- หมวดหมู่
- กว้าง
- ลึก
- สูง
- ขายได้
- สถานะ
- จัดการ

Important: dimensions must be separate columns: `กว้าง`, `ลึก`, `สูง`, each with `ซม.`.

Show 5 realistic Product Model rows:
1. โต๊ะข้างไม้สัก; รหัส 123; category โต๊ะ; dimensions 45 / 45 / 55 ซม.; ขายได้ 5 ชิ้น; chip เปิดใช้งาน; action ดูสินค้า; expand enabled.
   Expanded color rows under it: สีโอ๊คเข้ม, TBR-TBL-123-OAK, ขายได้ 3 ชิ้น; สีทองโบราณ, TBR-TBL-123-GLD, ขายได้ 2 ชิ้น.
2. ตู้พระไม้สัก; รหัส 124; category ตู้พระ; dimensions 90 / 45 / 160 ซม.; ขายได้ 1 ชิ้น; chip เปิดใช้งาน; action ดูสินค้า; expand enabled.
3. ฐานพระไม้สัก; รหัส 125; category ฐานพระ; dimensions 60 / 35 / 28 ซม.; ขายได้ 3 ชิ้น; chip เปิดใช้งาน; action ดูสินค้า; expand enabled.
4. ตู้โชว์ไม้สักแกะลาย; รหัส 126; category ตู้โชว์; dimensions 120 / 45 / 180 ซม.; หมด; chip หมด; action ดูสินค้า; expand disabled.
5. โต๊ะหมู่บูชา; รหัส 127; category โต๊ะหมู่; dimensions 75 / 50 / 120 ซม.; หมด; chip มีรายการติดลบ; action ดูสินค้า; expand disabled.

Expanded row rules:
- Show only colors with `ขายได้ > 0`.
- Each expanded color row shows สี, รหัส SKU, and ขายได้.
- Expanded color rows are read-only; no action buttons inside them.
- If a Product Model is `หมด`, the expand control is disabled.

Right preview drawer if included:
Title: รายละเอียด SKU หลัก
Selected product: โต๊ะข้างไม้สัก
Large image of Thai teak side table
Show:
- รหัสสินค้า: 123
- หมวดหมู่: โต๊ะ
- ขนาด: กว้าง 45 ซม. / ลึก 45 ซม. / สูง 55 ซม.
- ขายได้รวม: 5 ชิ้น
- สีที่ขายได้: โอ๊คเข้ม 3, ทองโบราณ 2
- สถานะ: เปิดใช้งาน
Actions:
- ดูสินค้า
- ดูสต๊อก
- ตรวจนับสต๊อก
- ปรับยอดสต๊อก

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Use `ขายได้` and `หมด`; do not use `คงเหลือ`, `พร้อมขาย`, or `ไม่มีสต๊อก` on this screen
- Do not show production badges in the main table
- Do not show product cost, labor cost, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Do not allow direct stock editing in table cells
- Stock actions must look like navigation buttons, not inline quantity editing
- This page is a table/search workbench, not Product Detail
- Use image thumbnails for fast furniture recognition
- Keep `กว้าง`, `ลึก`, `สูง` as separate fields/columns
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Keep visual density high but readable
```
