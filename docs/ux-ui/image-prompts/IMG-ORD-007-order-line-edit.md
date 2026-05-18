# IMG-ORD-007 - Order Line Edit

Related screen spec:

- `docs/ux-ui/screens/SCR-ORD-007-order-line-edit.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ORD-005-order-detail/SCR-ORD-005-approved.png`
- `docs/ux-ui/mockups/SCR-ORD-001-draft-order-editor/SCR-ORD-001-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “แก้ไขรายการออเดอร์”. This is a guarded edit mode for an already confirmed Order. It is not a new Order, not a Draft Order, not an invoice, and not a full payment workflow.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active
- Top bar with page title, current date, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Header:
- Page title: แก้ไขรายการออเดอร์
- Source Order ID: ORD-240520-014
- Status chips: ส่งบางส่วน, จัดส่งยังไม่ครบ
- Back action: กลับไปหน้า รายละเอียดออเดอร์
- Primary footer action: ตรวจสอบการแก้ไข
- Show a clear edit-mode note: การแก้ไขนี้ต้องผ่าน Review Changes ก่อนบันทึก

Main content:
Use a Create/Edit-like layout but clearly mark it as editing existing confirmed Order lines. Keep blocked lines visible as read-only rows with reasons so the user can still edit other safe lines.

Section: สินค้าพร้อมส่ง
Rows:
1. SKU หลัก: โต๊ะกลางลงรักสมุก; สี / SKU ย่อย: สีโอ๊คเข้ม / TBR-TBL-123-OAK; quantity 1; ขายได้ 2 ชิ้น; editable because no Shipment yet. Show edit and remove controls.
2. SKU หลัก: ชุดเก้าอี้ไม้สัก; สี / SKU ย่อย: สีทองโบราณ / TBR-CHA-118-GLD; quantity 2; disabled/read-only with reason “รายการนี้ส่งออกแล้ว”.
3. SKU หลัก: ตู้ไม้สักเล็ก; สี / SKU ย่อย: สีขาว / TBR-CAB-119-WHT; in Shipment round SHIP-2568-0061, disabled with reason “อยู่ในรอบจัดส่งแล้ว ต้องเอาออกจากรอบก่อนแก้ไข”.
Button: เพิ่มสินค้าพร้อมส่ง
Ready-stock add/change flow:
- Adding or changing ready-stock starts by selecting SKU หลัก, then choosing an enabled color / SKU ย่อย inside that product.
- Default selector shows only items with `ขายได้ > 0`; `เลือกสินค้าที่ไม่มีสต๊อก` allows enabled colors that show `หมด`.
- Search can match product name, product code, SKU ย่อย code, color name, or color code; when SKU ย่อย code matches, show the parent SKU หลัก and highlight the color.
- If the chosen SKU ย่อย is `หมด` or quantity exceeds `ขายได้`, show an immediate warning and repeat it in Review Changes.

Section: งานสั่งทำ
Rows:
1. ตู้พระสั่งทำ, new custom-work line being added, editable detail fields visible, chip “จะสร้าง JOB-O หลังบันทึก”.
2. ตู้โชว์ไม้สักแกะลาย, related JOB-O-0238, disabled production-detail edit with action “เปิด Job” and note “แก้รายละเอียดผลิตในหน้า Job”.
3. โต๊ะหมู่บูชา, related JOB-O-0240, disabled/read-only because JOB-O already exists, show action “เปิด Job” with note “ยกเลิกงานสั่งทำจากหน้า Job ก่อน”.
Button: เพิ่มงานสั่งทำ

Right impact panel:
Title: ผลกระทบที่รอตรวจสอบ
- เพิ่ม 1 รายการ
- ลบ 1 รายการ
- แก้ไข 1 รายการ
- ยอดรวมเปลี่ยน +8,500
- กระทบสต๊อก 1 รายการ
- กระทบ JOB-O 1 รายการ
- กระทบรอบจัดส่ง 0 รายการ
Reason field: เหตุผลการแก้ไข, shown only for changes that require reason
Make it clear that these effects happen only after saving from Review Changes:
- Added ready-stock will reserve stock
- Removed safe ready-stock will release stock
- Ready-stock quantity changes adjust reserved stock by the difference
- SKU/color changes release the old SKU ย่อย reservation and reserve the newly selected SKU ย่อย after Review Changes is saved
- Changed ready-stock lines store a fresh selection snapshot for SKU code, product name, color, dimensions, display image, and relevant department images
- New complete custom-work line will create JOB-O
- Price/discount changes update net total and financial summary where allowed
- If Payment Records or COD records already exist and the edited total does not match financial evidence/notes, show a blocking Financial Reconciliation panel before save
- Financial Reconciliation supports adding Payment Record evidence, COD to collect, or adjustment/refund/credit note in a modal/drawer

Footer:
- ยกเลิก / กลับ
- ตรวจสอบการแก้ไข

Review Changes preview/state:
- Title: ตรวจสอบการแก้ไข
- Buttons: กลับไปแก้ไข, บันทึกการแก้ไข, ยกเลิก
- Show only changed lines and impact, not the whole Order again
- Require reason only when a line is removed, JOB-O is cancelled/closed, or the change affects existing Job or Shipment state; stock-negative acknowledgement is logged but does not require a manager approval reason
- Net total changes do not require a reason by themselves when the user already has price/amount edit permission
- Disable บันทึกการแก้ไข if sales total and financial evidence/notes do not reconcile
- After saving, return to Order Detail with a short toast “บันทึกการแก้ไขแล้ว”

Unsaved-exit warning:
- If user tries to leave with unsaved changes, show modal actions: อยู่ต่อ and ออกโดยไม่บันทึก
- Do not offer บันทึกร่าง and do not show autosave for this confirmed Order edit

Visual rules:
- Thai labels primary
- Keep these English terms unchanged: Job, JOB-O, JOB-P, COD, Payment, Revision, Tracking
- Do not show draft or autosave state for this confirmed Order edit
- Do not silently edit existing JOB-O production detail
- Existing JOB-O production detail changes and cancellation route to Job Detail / Job Revision / Job cancellation
- Do not allow sent/completed lines to look editable
- Do not silently remove items from Shipment rounds
- Do not remove any line that is already in Shipment Builder temporary work or an existing released Shipment until that shipment work is cancelled or the line is removed from it
- Do not show `คงเหลือ` or `พร้อมขาย` for stock availability; use `ขายได้ X ชิ้น` and `หมด`
- Do not show every SKU ย่อย as a separate top-level product when adding/changing a ready-stock line
- Do not show full payment workflow
- Make Review Changes feel required before save
- Do not make this screen look like a new Order create screen; it is a controlled edit mode for a live confirmed Order
```
