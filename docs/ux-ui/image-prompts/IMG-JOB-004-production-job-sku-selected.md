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
Admin reviews the selected SKU ย่อย and production details before the Production Review step. Pressing `สร้างงานผลิต` opens `ตรวจสอบก่อนสร้างงานผลิต`; the real `JOB-P / งานผลิต` is issued only after `ยืนยันสร้างงานผลิต`. This screen must show that the work came from SKU selection, not from Order and not from `งานผลิตพิเศษ`. If the SKU was prefilled from Product Detail, this is still the normal `สร้างงานผลิต` screen and should not show a special Product Detail back/cancel path.

Header area:
- Page title: สร้างงานผลิต
- Context line: งานผลิตเข้าสต๊อก / เลือกจาก SKU ย่อย
- Large chips: ร่างงานผลิต, งานผลิต, ผลิตจาก SKU, ผูกสินค้าแล้ว, พร้อมตรวจสอบ
- Primary button: สร้างงานผลิต
- Secondary button: บันทึกร่าง

Main layout:
Use a clear two-column admin form. Main form on the left, readiness/source panel on the right. No modal is open in this state.

Left main column:
Row card 0: รูปแบบงานผลิต
- Tabs/segmented control:
  - ผลิตจาก SKU (active)
  - งานผลิตพิเศษ (inactive)
- Do not render `งานผลิตพิเศษ` body.

Row card 1: รายละเอียดสินค้า
- This card is populated from the selected color / SKU ย่อย and its parent SKU หลัก.
- Large product image of a dark oak Thai wooden side table.
- SKU หลัก: โต๊ะข้างไม้สัก
- SKU ย่อย: สีโอ๊คเข้ม
- SKU code: TBR-TBL-123-OAK
- Product model/category: โต๊ะ / ไม้สัก
- Color: สีโอ๊คเข้ม
- Stock signal: ขายได้ 0 / หมด
- Planned result: เมื่อจบงานจะเพิ่มสต๊อกตามจำนวนผลิต
- Quantity input: จำนวนผลิต 6 ชิ้น
- Starting queue selector: คิวเริ่มต้น ช่างไม้
- Compact chips: ผลิตจาก SKU, ผูกสินค้าแล้ว, หมด, จบงานแล้วเพิ่มสต๊อก
- Purple secondary button: เปลี่ยนสินค้า

Row card 2: ข้อมูลงานผลิต
- Fields prefilled from SKU but editable for this production work:
  - ชื่องาน: โต๊ะข้างไม้สัก สีโอ๊คเข้ม
  - จำนวนผลิต: 6 ชิ้น
  - คิวเริ่มต้น: ช่างไม้
  - ขนาดโดยรวม: กว้าง 45 ลึก 45 สูง 55 ซม.
  - หมายเหตุงาน: ผลิตเพิ่มสำหรับสต๊อกหน้าร้าน
- Keep form controls clean and readable.

Row card 3: รูปหลักจาก SKU
- Show a large image preview and thumbnail row inherited from SKU.
- Labels: รูปหลักจาก SKU ย่อย, ใช้รูปจาก SKU หลักถ้า SKU ย่อยไม่มี, เพิ่มรูปเฉพาะงานผลิต
- Make clear these images came from the SKU ย่อย when available, otherwise from SKU หลัก, and can be supplemented for this production run.

Row card 4: รายละเอียดช่างไม้จาก SKU
- Separate department card.
- Text: โครงโต๊ะข้างไม้สัก, ขาทรงโค้ง, ทำ 6 ชิ้นตามแบบเดียวกัน
- Thumbnail labels: รูปโครงสร้าง, รูปขนาด
- Button: เพิ่มรูปช่างไม้
- If SKU ย่อย has no woodwork-specific image group, show a small fallback label: ใช้รูปจาก SKU หลัก

Row card 5: สีและการตกแต่งจาก SKU
- Separate department card.
- Text: สีโอ๊คเข้ม เคลือบด้าน
- Thumbnail labels: รูปสี, รูปงานตกแต่ง
- Button: เพิ่มรูปฝ่ายสี
- If SKU ย่อย has a color-specific image group, show it before SKU หลัก fallback images

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
  - เลือกคิวเริ่มต้น
  - ตรวจรายละเอียดจาก SKU
  - มีรูปหลัก
  - มีรายละเอียดช่างไม้
  - มีรายละเอียดสี/ตกแต่ง
- Source summary:
  - แหล่งที่มา: งานผลิตเข้าสต๊อก
  - SKU ย่อย: TBR-TBL-123-OAK
  - รหัสร่าง: ยังไม่ได้บันทึก
  - รหัสงาน: จะสร้างหลังยืนยัน
  - ผลลัพธ์: จบงานแล้วเพิ่มสต๊อก 6 ชิ้น
  - คิวเริ่มต้น: ช่างไม้
  - สถานะ: พร้อมตรวจสอบ
- Primary action button at bottom should be enabled: สร้างงานผลิต

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, JOB-P, SKU, Production Lot, Revision
- Do not show customer name, phone, address, Order ID, COD, Payment, shipment, sales price, product cost, labor cost, profit, tax, accounting ledger, ad spend, or private CRM notes
- Do not show the SKU search modal in this state
- Do not show `งานผลิตพิเศษ` body in this state
- Do not make this look like an Order screen
- Do not show a real `JOB-P` number before the Review confirmation
- Do not imply a separate stock receipt screen for SKU-tied production; completion increases Ready Stock
- Do not imply that `สร้างงานผลิต` creates `JOB-P` directly; it opens Review first
- Make the selected SKU identity obvious
- Make `เปลี่ยนสินค้า` available but secondary
- If user selects another SKU or switches to `งานผลิตพิเศษ`, reset the initial SKU context like opening this screen fresh
- Use `ขายได้ X ชิ้น` and `หมด` for stock signals; do not use `คงเหลือ` or `พร้อมขาย`
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Keep `ผลิตจาก SKU` and `งานผลิตพิเศษ` visually separate
- Keep the design aligned with the approved desktop admin app shell
```
