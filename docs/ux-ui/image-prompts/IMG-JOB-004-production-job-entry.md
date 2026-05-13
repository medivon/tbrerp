# IMG-JOB-004 - Production Job Entry

Related screen spec:

- `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-modal-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-001-job-create-from-order-line/SCR-JOB-001-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-002-job-detail-work-card/SCR-JOB-002-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-003-active-jobs-overview/SCR-ADM-003-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สร้างงานผลิต”. This is the admin/production screen for creating a `JOB-P / งานผลิต` from an internal production source. Production has two clear modes: `ผลิตจาก SKU` and `งานผลิตพิเศษ`. It is not an Order screen and must not show customer, COD, or shipment concepts.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline, not a dark sidebar
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “งานสั่งทำ / ผลิต” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin prepares one internal production item as a clear `JOB-P` work unit with images and department-specific instructions. The visible UI should make `ผลิตจาก SKU` and `งานผลิตพิเศษ` feel like separate modes, not a mixed form.

Header area:
- Page title: สร้างงานผลิต
- Context line: จากชุดผลิต PROD-2568-0021 / LOT-001
- Large chips: JOB-P, งานผลิต, ผลิตจาก SKU, ผูกสินค้าแล้ว, พร้อมบันทึก
- Primary button: สร้างงานผลิต
- Secondary buttons: บันทึกไว้ก่อน, กลับไปชุดผลิต

Main layout:
Use a clear two-column admin form. Main form on the left, readiness/source panel on the right.

Left main column:
Row card 0: รูปแบบงานผลิต
- Tabs/segmented control with two choices:
  - ผลิตจาก SKU (active)
  - งานผลิตพิเศษ
- Keep this compact and clear. Do not write long explanations.

Active `ผลิตจาก SKU` body before selection:
- Show a clean empty detail card titled รายละเอียดสินค้า
- Center a prominent purple button: เลือกสินค้า
- The empty card should not show custom production fields yet
- Short compact chips are okay: ยังไม่ได้เลือกสินค้า, JOB-P, ผลิตจาก SKU

Show SKU search modal open over the page:
- Modal title: เลือกสินค้า / SKU
- Search input placeholder: ค้นหาชื่อสินค้า / รหัส SKU / สี / หมวดหมู่
- Filter chips: ทั้งหมด, ตู้พระ, โต๊ะ, ฐานพระ, สีโอ๊ค, สีทอง
- SKU result list with 4 rows/cards, each with thumbnail, SKU code, product name, color, current stock, and action button เลือกสินค้านี้
- Highlight one example result:
  - SKU-TEAK-TABLE-OAK-001
  - โต๊ะข้างไม้สัก สีโอ๊คเข้ม
  - คงเหลือ 0 / ผลิตเพิ่ม
  - action เลือกสินค้านี้
- Modal footer buttons: ยกเลิก, เลือกสินค้านี้

Behind the modal, keep the main page visible but slightly dimmed. Do not show the `งานผลิตพิเศษ` form on the active SKU tab.

After-SKU-selected state should be implied by the modal result, not fully displayed in this image. The selected SKU would populate the detail body with SKU image, SKU name, quantity, and inherited department instructions.

Inactive `งานผลิตพิเศษ` tab:
- Visible as an inactive tab only
- Do not render its body in this mockup
- This mode would use the same body pattern as `รายละเอียดงานสั่งทำ`, but without customer/order/shipment context

Right panel:
Title: ตรวจความพร้อม
- Checklist:
  - เลือกสินค้า
  - ระบุจำนวนผลิต
  - ตรวจรายละเอียดจาก SKU
  - เพิ่มหมายเหตุถ้าจำเป็น
- Source summary:
  - ชุดผลิต: PROD-2568-0021
  - ล็อตผลิต: LOT-001
  - รหัสงาน: JOB-P-0018
  - สถานะ: รอเลือกสินค้า
- Primary action button repeated at bottom: สร้างงานผลิต
  - Button should look disabled or secondary until SKU is selected

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, JOB-P, SKU, Production Lot, Revision
- Do not show customer name, phone, address, Order ID, COD, Payment, shipment, sales price, product cost, labor cost, profit, tax, accounting ledger, ad spend, or private CRM notes
- Do not make this look like an Order screen
- Do not mix `ผลิตจาก SKU` and `งานผลิตพิเศษ` fields in one body
- Do not show custom-production fields on the active `ผลิตจาก SKU` tab before choosing SKU
- Do not use long explanatory helper text about automatic routing
- Make image upload and department image groups visually important
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Make `JOB-P / งานผลิต` clearly different from `JOB-O / งานลูกค้า`
- Show that production can be `ผลิตจาก SKU` or `งานผลิตพิเศษ`
- The purple `เลือกสินค้า` button and SKU search modal are the main focus of this mockup
- Keep the design aligned with the approved desktop admin app shell
```
