# IMG-JOB-004 - Production Special Work

Related screen spec:

- `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-special-work-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-selected-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-modal-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-001-job-create-from-order-line/SCR-JOB-001-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-002-job-detail-work-card/SCR-JOB-002-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สร้างงานผลิต”. This is the `งานผลิตพิเศษ` tab of the production workflow. It creates `JOB-P / งานผลิต` from a custom/internal production specification, similar to the `รายละเอียดงานสั่งทำ` body pattern, but without customer, Order, COD, payment, or shipment context.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “งานสั่งทำ / ผลิต” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin creates an internal special production work item that is not selected from an existing SKU. This screen should feel like custom-work detail entry, but its source is internal production (`JOB-P / งานผลิต`) and it must not include customer/order/shipment fields.

Header area:
- Page title: สร้างงานผลิต
- Context line: งานผลิตภายใน / งานผลิตพิเศษ
- Large chips: JOB-P, งานผลิต, งานผลิตพิเศษ, ยังไม่ผูกสินค้า, พร้อมบันทึก
- Primary button: สร้างงานผลิต
- Secondary buttons: บันทึกไว้ก่อน, กลับไปงานผลิต

Main layout:
Use a clear two-column admin form. Main form on the left, readiness/source panel on the right.

Left main column:
Row card 0: รูปแบบงานผลิต
- Tabs/segmented control:
  - ผลิตจาก SKU (inactive)
  - งานผลิตพิเศษ (active)
- Do not show SKU modal or SKU result list in this state.

Row card 1: ข้อมูลงานผลิตพิเศษ
- This card mirrors the `รายละเอียดงานสั่งทำ` work-detail form, but with no customer/order fields.
- Fields with filled sample values:
  - ชื่องาน: ตู้พระต้นแบบลายพิกุล
  - จำนวนผลิต: 1 ชิ้น
  - ขนาดโดยรวม: กว้าง 90 ลึก 45 สูง 160 ซม.
  - ประเภทงาน: งานต้นแบบ / ยังไม่ผูกสินค้า
  - หมายเหตุงาน: ทดลองขนาดใหม่ก่อนตัดสินใจสร้าง SKU
- Compact chips: งานผลิตพิเศษ, ยังไม่ผูกสินค้า, งานต้นแบบ
- Secondary action: ผูกกับ SKU ภายหลัง

Row card 2: รูปหลัก
- Drag-and-upload image area with a large preview of an ornate Thai wooden altar cabinet/prototype.
- Thumbnail row labels: รูปหลัก, รูปอ้างอิงงาน, เพิ่มรูป
- This image area should look like admin uploads production reference images.

Row card 3: รูป/คำอธิบายสำหรับช่างไม้
- Separate department card.
- Text: ทำโครงตู้พระต้นแบบ, บานคู่, ขอบโค้ง, ทดลองสัดส่วนใหม่
- Thumbnail labels: รูปโครงสร้าง, รูปขนาด
- Button: เพิ่มรูปช่างไม้

Row card 4: รูป/คำอธิบายสำหรับฝ่ายสีและตกแต่ง
- Separate department card.
- Text: สีทองโบราณ ท๊อปแดง ทดลองเฉดสีใหม่
- Thumbnail labels: รูปสี, รูปงานตกแต่ง
- Button: เพิ่มรูปฝ่ายสี

Row card 5: รูป/คำอธิบายสำหรับรักสมุก
- Separate department card.
- Text: ลายพิกุลหน้าบาน ทดลองตำแหน่งลาย
- Thumbnail labels: รูปลาย, รูปหน้าบาน
- Button: เพิ่มรูปรักสมุก

Right panel:
Title: ตรวจความพร้อม
- Checklist:
  - มีชื่องาน
  - ระบุจำนวนผลิต
  - มีรูปหลัก
  - มีรายละเอียดช่างไม้
  - มีรายละเอียดสี/ตกแต่ง
  - ตรวจว่าต้องผูก SKU หรือไม่
- Source summary:
  - แหล่งที่มา: งานผลิตภายใน
  - รูปแบบ: งานผลิตพิเศษ
  - รหัสงาน: JOB-P-0019
  - ผลลัพธ์: จบงานผลิต / ยังไม่รับเข้าสต๊อก
  - สถานะ: พร้อมบันทึก
- Primary action button at bottom should be enabled: สร้างงานผลิต

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, JOB-P, SKU, Production Lot, Revision
- Do not show customer name, phone, address, Order ID, COD, Payment, shipment, sales price, product cost, labor cost, profit, tax, accounting ledger, ad spend, or private CRM notes
- Do not show SKU search modal in this state
- Do not show selected SKU detail in this state
- Do not make this look like an Order screen
- Make `งานผลิตพิเศษ` clearly active
- Make the body feel like custom-work detail entry, but with internal production source
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Keep `ผลิตจาก SKU` and `งานผลิตพิเศษ` visually separate
- Keep the design aligned with the approved desktop admin app shell
```
