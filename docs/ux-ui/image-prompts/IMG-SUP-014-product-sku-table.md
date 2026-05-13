# IMG-SUP-014 - Product / SKU Table

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-014-product-sku-table.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-selected-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “รายการสินค้า / SKU”. This is the main Product/SKU table for the `สินค้า / สต๊อก` module. It is a dense admin workbench for searching and opening products/SKUs, not a stock adjustment page.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin searches Product Model and SKU Variant records, reviews high-level stock/production summaries, and opens detail pages. This screen must not allow direct stock quantity editing.

Header area:
- Page title: รายการสินค้า / SKU
- Subtitle: ค้นหาและจัดการสินค้าแบบ SKU ใหญ่ / SKU ย่อย
- Primary action: เพิ่มสินค้า
- Secondary action: เพิ่ม SKU

Top summary cards:
- SKU ทั้งหมด 486
- เปิดใช้งาน 312
- ไม่มีสต๊อก 28
- กำลังผลิต 14
- มีรีวิว 96

Toolbar:
- Search input placeholder: ค้นหาชื่อสินค้า / รหัส SKU / สี / หมวดหมู่
- Filter button: ตัวกรอง
- Sort dropdown: เรียงตาม อัปเดตล่าสุด
- Filter chips:
  - ทั้งหมด
  - เปิดใช้งาน
  - ไม่มีสต๊อก
  - กำลังผลิต
  - มีรีวิว
  - ปิดใช้งาน

Main layout:
Use a wide dense table on the left and a right preview drawer for the selected SKU.

Table columns:
- checkbox
- รูป
- SKU ใหญ่ / SKU ย่อย
- รหัส SKU
- หมวดหมู่
- สี
- กว้าง
- ลึก
- สูง
- สต๊อก
- งานผลิต
- สถานะ
- จัดการ

Important: dimensions must be separate columns: `กว้าง`, `ลึก`, `สูง`, each with `ซม.`.

Show 5 realistic table rows with image thumbnails:
1. Product Model: โต๊ะข้างไม้สัก; SKU Variant: โต๊ะข้างไม้สัก สีโอ๊คเข้ม; SKU code SKU-TEAK-TABLE-OAK-001; category โต๊ะ; color สีโอ๊คเข้ม; dimensions 45 / 45 / 55 ซม.; stock คงเหลือ 0, จอง 0; production กำลังผลิต 6; chips ไม่มีสต๊อก, กำลังผลิต; action เปิด SKU
2. ตู้พระไม้สัก; ตู้พระไม้สัก สีทองโบราณ; SKU-ALTAR-CAB-GOLD-002; category ตู้พระ; color สีทองโบราณ; dimensions 90 / 45 / 160 ซม.; stock คงเหลือ 2, จอง 1; production -; chips เปิดใช้งาน, มีรีวิว; action เปิด SKU
3. ฐานพระไม้สัก; ฐานพระไม้สัก สีขาวเปลือกไข่; SKU-BASE-WHITE-003; category ฐานพระ; color สีขาวเปลือกไข่; dimensions 60 / 35 / 28 ซม.; stock คงเหลือ 5, จอง 2; production กำลังผลิต 3; chips เปิดใช้งาน; action เปิด SKU
4. ตู้โชว์ไม้สักแกะลาย; ตู้โชว์ไม้สักแกะลาย สีโอ๊ค; SKU-CABINET-OAK-004; category ตู้โชว์; color สีโอ๊ค; dimensions 120 / 45 / 180 ซม.; stock คงเหลือ 0, จอง 0; production -; chips ไม่มีสต๊อก; action เปิด SKU
5. โต๊ะหมู่บูชา; โต๊ะหมู่บูชา สีทองอคริลิก; SKU-ALTAR-TABLE-GOLD-005; category โต๊ะหมู่; color สีทองอคริลิก; dimensions 75 / 50 / 120 ซม.; stock คงเหลือ 1, จอง 0; production -; chips เปิดใช้งาน; action เปิด SKU

Right preview drawer:
Title: รายละเอียด SKU
Selected SKU: SKU-TEAK-TABLE-OAK-001
Large image of dark oak Thai wooden side table
Show:
- SKU ใหญ่: โต๊ะข้างไม้สัก
- SKU ย่อย: โต๊ะข้างไม้สัก สีโอ๊คเข้ม
- สี: สีโอ๊คเข้ม
- ขนาด: กว้าง 45 ซม. / ลึก 45 ซม. / สูง 55 ซม.
- สถานะ: เปิดใช้งาน
- สต๊อก: คงเหลือ 0, จองแล้ว 0
- งานผลิต: กำลังผลิต 6
- รีวิว: 12 รูป
- อ้างอิง Job: ไม่มี
Actions:
- เปิด SKU
- สร้างงานผลิต
- ดูสต๊อก
- ตรวจนับสต๊อก
- ปรับยอดสต๊อก

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Do not show product cost, labor cost, profit, sales price, tax details, accounting ledger, ad spend, or private CRM notes
- Do not allow direct stock editing in table cells
- Stock actions must look like navigation buttons, not inline quantity editing
- This page is a table/search workbench, not a product detail page
- Use image thumbnails for fast furniture recognition
- Keep `กว้าง`, `ลึก`, `สูง` as separate fields/columns
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Keep visual density high but readable
```
