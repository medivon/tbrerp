# IMG-SUP-006 - Ready Stock View

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-006-ready-stock-view.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/mockups/SCR-SUP-004-sku-variant-detail/SCR-SUP-004-approved.png`
- `docs/ux-ui/mockups/SCR-SUP-003-product-model-detail/SCR-SUP-003-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สินค้าพร้อมส่ง”. This is the Ready Stock View for the `สินค้า / สต๊อก` module. It shows stock visibility for ready-to-ship SKU Variants: on-hand stock, reserved stock, available stock, and production-in-progress. It is not a stock adjustment form.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin and stock users review what is actually ready to sell/ship. They can open SKU details, start production, start stock count, or navigate to stock adjustment, but cannot edit stock numbers inline.

Header area:
- Page title: สินค้าพร้อมส่ง
- Subtitle: ดูจำนวนคงเหลือ จองแล้ว และพร้อมขายของ SKU ย่อย
- Primary action: ตรวจนับสต๊อก
- Secondary actions: ปรับยอดสต๊อก, กลับไปรายการสินค้า

Top summary cards:
- SKU พร้อมขาย 42
- ไม่มีสต๊อก 18
- มีจอง 12
- กำลังผลิต 14
- ควรตรวจนับ 6

Toolbar:
- Search input placeholder: ค้นหาชื่อสินค้า / รหัส SKU / สี / หมวดหมู่
- Filter button: ตัวกรอง
- Sort dropdown: เรียงตาม พร้อมขายน้อยสุด
- Filter chips:
  - ทั้งหมด
  - พร้อมขาย
  - ไม่มีสต๊อก
  - มีจอง
  - กำลังผลิต
  - ควรตรวจนับ

Main layout:
Use a wide dense table on the left and a right preview drawer for the selected SKU.
This should feel like a stock visibility workbench, not a product catalogue and not an edit form.

Table columns:
- checkbox
- รูป
- SKU ใหญ่ / SKU ย่อย
- รหัส SKU
- สี
- กว้าง
- ลึก
- สูง
- คงเหลือ
- จองแล้ว
- พร้อมขาย
- กำลังผลิต
- ตรวจล่าสุด
- สถานะ
- จัดการ

Important: dimensions must be separate columns: `กว้าง`, `ลึก`, `สูง`, each with `ซม.`.
Important: stock columns must look read-only. Do not show steppers, text inputs, plus/minus quantity buttons, or editable cells.

Show 5 realistic table rows with product thumbnails:
1. SKU ใหญ่: โต๊ะข้างไม้สัก; SKU ย่อย: โต๊ะข้างไม้สัก สีโอ๊คเข้ม; SKU-TEAK-TABLE-OAK-001; สีโอ๊คเข้ม; กว้าง 45; ลึก 45; สูง 55 ซม.; คงเหลือ 0; จองแล้ว 0; พร้อมขาย 0; กำลังผลิต 6; ตรวจล่าสุด 20 พ.ค. 67; chips ไม่มีสต๊อก and กำลังผลิต; action เปิด SKU
2. ตู้พระไม้สัก; ตู้พระไม้สัก สีทองโบราณ; SKU-ALTAR-CAB-GOLD-002; สีทองโบราณ; 90 / 45 / 160 ซม.; คงเหลือ 2; จองแล้ว 1; พร้อมขาย 1; กำลังผลิต -; ตรวจล่าสุด 19 พ.ค. 67; chips พร้อมขาย and มีจอง; action เปิด SKU
3. ฐานพระไม้สัก; ฐานพระไม้สัก สีขาวเปลือกไข่; SKU-BASE-WHITE-003; สีขาวเปลือกไข่; 60 / 35 / 28 ซม.; คงเหลือ 5; จองแล้ว 2; พร้อมขาย 3; กำลังผลิต 3; ตรวจล่าสุด 18 พ.ค. 67; chips พร้อมขาย and กำลังผลิต; action เปิด SKU
4. ตู้โชว์ไม้สักแกะลาย; ตู้โชว์ไม้สักแกะลาย สีโอ๊ค; SKU-CABINET-OAK-004; สีโอ๊ค; 120 / 45 / 180 ซม.; คงเหลือ 0; จองแล้ว 0; พร้อมขาย 0; กำลังผลิต -; ตรวจล่าสุด 10 พ.ค. 67; chips ไม่มีสต๊อก and ควรตรวจนับ; action เปิด SKU
5. โต๊ะหมู่บูชา; โต๊ะหมู่บูชา สีทองอคริลิก; SKU-ALTAR-TABLE-GOLD-005; สีทองอคริลิก; 75 / 50 / 120 ซม.; คงเหลือ 1; จองแล้ว 0; พร้อมขาย 1; กำลังผลิต -; ตรวจล่าสุด 21 พ.ค. 67; chip พร้อมขาย; action เปิด SKU

Right preview drawer:
Title: รายละเอียดสต๊อก
Selected SKU: SKU-ALTAR-CAB-GOLD-002
Large image of gold antique Thai altar cabinet
Show:
- SKU ใหญ่: ตู้พระไม้สัก
- SKU ย่อย: ตู้พระไม้สัก สีทองโบราณ
- สี: สีทองโบราณ
- ขนาด: กว้าง 90 ซม. / ลึก 45 ซม. / สูง 160 ซม.
- คงเหลือ: 2
- จองแล้ว: 1
- พร้อมขาย: 1
- กำลังผลิต: -
- ตรวจล่าสุด: 19 พ.ค. 67
- หมายเหตุสต๊อก: เหลือ 1 ชิ้นพร้อมขาย
Actions:
- เปิด SKU
- สร้างงานผลิต
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
- Keep `คงเหลือ`, `จองแล้ว`, and `พร้อมขาย` visually separate
- Keep `กว้าง`, `ลึก`, `สูง` as separate fields/columns
- Use image thumbnails for fast furniture recognition
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Keep visual density high but readable
```
