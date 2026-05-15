# IMG-SUP-015 - Material Stock

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-015-material-stock.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/screens/SCR-SUP-006-ready-stock-view.md`
- `docs/ux-ui/image-prompts/IMG-SUP-006-ready-stock-view.md`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สต๊อกวัสดุ”. This is a lightweight material stock screen under `สินค้า / สต๊อก`, separate from Product/SKU ready stock.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense readable tables, compact chips, white panels, subtle shadows, dark navy emphasis

Screen purpose:
Staff review internal material quantities, see Jobs waiting for materials, and open purchase/adjustment actions. This is not SKU stock, not warehouse transfer, not BOM, and not accounting.

Header:
- Page title: สต๊อกวัสดุ
- Subtitle: ดูจำนวนที่มีอยู่ของวัสดุ และรายการรอวัตถุดิบ
- Primary action: เพิ่มวัสดุ
- Secondary actions: สร้างใบสั่งซื้อวัสดุ, ปรับยอดวัสดุ

Top alert panel:
Title: รายการรอวัตถุดิบ
Show 3 compact waiting Job rows:
- JOB-O-2567-0142; ตู้พระไม้สัก; ต้องใช้ สีทองโบราณ; note รอสีเพิ่ม
- JOB-P-2567-0031; โต๊ะหมู่บูชา; ต้องใช้ รางลิ้นชัก 18 นิ้ว
- JOB-O-2567-0148; ฐานพระไม้สัก; ต้องใช้ ลวดเย็บ
Button: สรุปรายการสั่งซื้อ
Make clear these are notes/requests, not reservations.
Show helper text that free-text material notes must be matched to a material item before purchase.
Do not show waiting notes that are already linked to an active Material Purchase Order as new purchase-summary candidates.

Summary cards:
- วัสดุทั้งหมด 86
- มีของ 54
- หมด 12
- มีงานรอวัตถุดิบ 7
- ควรตรวจนับ 9

Toolbar:
- Search placeholder: ค้นหาชื่อวัสดุ / หมวดวัสดุ / ผู้ขาย
- Filter: หมวดวัสดุ
- Filter: ผู้ขาย
- Chips: ทั้งหมด, มีของ, หมด, มีงานรอวัตถุดิบ, ควรตรวจนับ, ไม่มีรูป

Main table columns:
- รูป
- รหัสวัสดุ
- ชื่อวัสดุ
- หมวดวัสดุ
- ผู้ขายหลัก
- หน่วย
- จำนวนที่มีอยู่
- รับเข้าล่าสุด
- ปรับยอดล่าสุด
- งานรอวัตถุดิบ
- สถานะ
- จัดการ

Show realistic rows:
1. MAT-0001; สีทองโบราณ; หมวด สี/ตกแต่ง; ผู้ขายหลัก ร้านสีเจริญ; หน่วย กระป๋อง; จำนวนที่มีอยู่ 3; งานรอวัตถุดิบ 2; chips มีของ, มีงานรอวัตถุดิบ
2. MAT-0002; รางลิ้นชัก 18 นิ้ว; หมวด อุปกรณ์เฟอร์นิเจอร์; ผู้ขายหลัก ร้านอุปกรณ์เอ; หน่วย ชิ้น; จำนวนที่มีอยู่ 24; chip มีของ
3. MAT-0003; ลวดเย็บ; หมวด วัสดุสิ้นเปลือง; ผู้ขายหลัก ร้านเครื่องมือบี; หน่วย กล่อง; จำนวนที่มีอยู่ 0; chips หมด, มีงานรอวัตถุดิบ
4. MAT-0004; สีขาวเปลือกไข่; หมวด สี/ตกแต่ง; ผู้ขายหลัก ร้านสีเจริญ; หน่วย กระป๋อง; จำนวนที่มีอยู่ 1; chip ควรตรวจนับ
5. MAT-0005; แผ่นทองคำเปลว; หมวด รักสมุก; ผู้ขายหลัก ร้านงานศิลป์; หน่วย แพ็ค; จำนวนที่มีอยู่ 6; chip ไม่มีรูป

Right preview drawer:
Title: รายละเอียดวัสดุ
Selected item: สีทองโบราณ
Show image placeholder or material image, material code, category, primary supplier, unit, จำนวนที่มีอยู่, latest receipt, latest adjustment, waiting jobs.
Actions: สร้างใบสั่งซื้อวัสดุ, ปรับยอดวัสดุ, ดูประวัติ
Info card: รายการรอวัตถุดิบเป็นบันทึกความต้องการ ไม่ได้จองหรือตัดสต๊อก

Visual rules:
- Use `จำนวนที่มีอยู่` only for material stock
- Do not use `คงเหลือ`, `พร้อมขาย`, `จองแล้ว`, or `ขายได้`
- One material item has one primary supplier in this starting workflow
- Show newly added zero-quantity materials in the table
- Do not show per-material low-stock threshold controls
- Do not show product sales price, profit, tax, accounting ledger, or Expense fields
- Do not show inline quantity editors in the stock table
- Missing images are allowed but visible
- Keep the screen dense, practical, and operational
```
