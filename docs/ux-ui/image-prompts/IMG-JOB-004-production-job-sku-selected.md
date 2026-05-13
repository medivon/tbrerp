# IMG-JOB-004 - Production Job SKU Selected

Related screen spec:

- `docs/ux-ui/screens/SCR-JOB-004-production-job-entry.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-selected-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-004-production-job-entry/SCR-JOB-004-sku-modal-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-001-job-create-from-order-line/SCR-JOB-001-approved.png`
- `docs/ux-ui/mockups/SCR-JOB-002-job-detail-work-card/SCR-JOB-002-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สร้างงานผลิต”. This is the next workflow state after the SKU search modal: the admin has selected one SKU, the modal is closed, and the active `ผลิตจาก SKU` tab now shows SKU details in the body.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “งานสั่งทำ / ผลิต” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin reviews the selected SKU and production details before creating `JOB-P / งานผลิต`. This screen must show that the work came from SKU selection, not from Order and not from `งานผลิตพิเศษ`.

Header area:
- Page title: สร้างงานผลิต
- Context line: จากชุดผลิต PROD-2568-0021 / LOT-001
- Large chips: JOB-P, งานผลิต, ผลิตจาก SKU, ผูกสินค้าแล้ว, พร้อมบันทึก
- Primary button: สร้างงานผลิต
- Secondary buttons: บันทึกไว้ก่อน, กลับไปชุดผลิต

Main layout:
Use a clear two-column admin form. Main form on the left, readiness/source panel on the right. No modal is open in this state.

Left main column:
Row card 0: รูปแบบงานผลิต
- Tabs/segmented control:
  - ผลิตจาก SKU (active)
  - งานผลิตพิเศษ (inactive)
- Do not render `งานผลิตพิเศษ` body.

Row card 1: รายละเอียดสินค้า
- This card is populated from the selected SKU.
- Large product image of a dark oak Thai wooden side table.
- SKU code: SKU-TEAK-TABLE-OAK-001
- Product name: โต๊ะข้างไม้สัก สีโอ๊คเข้ม
- Product model/category: โต๊ะ / ไม้สัก
- Color: สีโอ๊คเข้ม
- Current stock: คงเหลือ 0
- Planned result: รับเข้าสต๊อก
- Quantity input: จำนวนผลิต 6 ชิ้น
- Compact chips: ผลิตจาก SKU, ผูกสินค้าแล้ว, คงเหลือ 0
- Purple secondary button: เปลี่ยนสินค้า

Row card 2: ข้อมูลงานผลิต
- Fields prefilled from SKU but editable for this production work:
  - ชื่องาน: โต๊ะข้างไม้สัก สีโอ๊คเข้ม
  - จำนวนผลิต: 6 ชิ้น
  - ขนาดโดยรวม: กว้าง 45 ลึก 45 สูง 55 ซม.
  - หมายเหตุงาน: ผลิตเพิ่มสำหรับสต๊อกหน้าร้าน
- Keep form controls clean and readable.

Row card 3: รูปหลักจาก SKU
- Show a large image preview and thumbnail row inherited from SKU.
- Labels: รูปหลัก, รูปอ้างอิงสินค้า, เพิ่มรูปเฉพาะงานผลิต
- Make clear these images came from SKU but can be supplemented for this production run.

Row card 4: รายละเอียดช่างไม้จาก SKU
- Separate department card.
- Text: โครงโต๊ะข้างไม้สัก, ขาทรงโค้ง, ทำ 6 ชิ้นตามแบบเดียวกัน
- Thumbnail labels: รูปโครงสร้าง, รูปขนาด
- Button: เพิ่มรูปช่างไม้

Row card 5: สีและการตกแต่งจาก SKU
- Separate department card.
- Text: สีโอ๊คเข้ม เคลือบด้าน
- Thumbnail labels: รูปสี, รูปงานตกแต่ง
- Button: เพิ่มรูปฝ่ายสี

Row card 6: รายละเอียดรักสมุก
- Separate optional card.
- Text: ไม่มีงานรักสมุกสำหรับ SKU นี้
- Show calm optional state, not an error.
- Button: เพิ่มรูปรักสมุก

Right panel:
Title: ตรวจความพร้อม
- Checklist with checked items:
  - เลือกสินค้า
  - ระบุจำนวนผลิต
  - ตรวจรายละเอียดจาก SKU
  - มีรูปหลัก
  - มีรายละเอียดช่างไม้
  - มีรายละเอียดสี/ตกแต่ง
- Source summary:
  - ชุดผลิต: PROD-2568-0021
  - ล็อตผลิต: LOT-001
  - รหัสงาน: JOB-P-0018
  - ผลลัพธ์: รับเข้าสต๊อก
  - สถานะ: พร้อมบันทึก
- Primary action button at bottom should be enabled: สร้างงานผลิต

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, JOB-P, SKU, Production Lot, Revision
- Do not show customer name, phone, address, Order ID, COD, Payment, shipment, sales price, product cost, labor cost, profit, tax, accounting ledger, ad spend, or private CRM notes
- Do not show the SKU search modal in this state
- Do not show `งานผลิตพิเศษ` body in this state
- Do not make this look like an Order screen
- Make the selected SKU identity obvious
- Make `เปลี่ยนสินค้า` available but secondary
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Keep `ผลิตจาก SKU` and `งานผลิตพิเศษ` visually separate
- Keep the design aligned with the approved desktop admin app shell
```
