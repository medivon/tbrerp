# IMG-ORD-004 - Order Review / Create Order

Related screen spec:

- `docs/ux-ui/screens/SCR-ORD-004-order-review-create-order.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ORD-004-order-review-create-order/SCR-ORD-004-approved.png`
- `docs/ux-ui/mockups/SCR-ORD-001-draft-order-editor/SCR-ORD-001-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “ตรวจสอบก่อนสร้างออเดอร์”. This is the final admin review before issuing a real Order ID. It is not an Order Detail page yet.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “ออเดอร์” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin reviews current Order Create/Edit data before confirming. This is the final review screen before a real Order ID exists. The screen must show clearly that pressing “ยืนยันสร้างออเดอร์” will issue a real Order ID, reserve ready-stock lines, create JOB-O for complete custom-work lines, hide any saved draft from active draft lists by status, and not create shipment rounds yet.

Header:
- Page title: ตรวจสอบก่อนสร้างออเดอร์
- Subtitle: ตรวจข้อมูลครั้งสุดท้ายก่อนออกเลขออเดอร์จริง
- Status chip: พร้อมสร้างออเดอร์
- Small warning note: ยังไม่มี Order ID จนกว่าจะกดยืนยัน

Main layout:
Use a two-column review layout:
- Left/main column: review cards
- Right sticky confirmation panel: downstream result and final action

Left review cards:
1. ข้อมูลลูกค้า
   - ลูกค้า: คุณมาลี
   - เบอร์ลูกค้า: 081-234-5678
   - สถานะลูกค้า: ลูกค้าเดิม
   - Button/link: กลับไปแก้ไข

2. ข้อมูลผู้รับและที่อยู่จัดส่ง
   - ผู้รับสินค้า: คุณภพ
   - เบอร์ผู้รับ: 082-345-6789
   - ที่อยู่จัดส่ง: 99/12 ถ.เจริญกรุง แขวงบางรัก กรุงเทพฯ 10500
   - Note: ข้อมูลนี้จะถูกใช้เป็นข้อมูลหลักของออเดอร์ และ Shipment จะ snapshot ภายหลัง
   - Button/link: กลับไปแก้ไข

3. เงื่อนไขการชำระเงิน
   - Payment Term: มัดจำ 50% ก่อนเริ่มงาน
   - Show as a required business agreement, not a full payment page

4. รายการรับเงิน
   Show only if Payment Record exists:
   - Payment Record: รับมัดจำแล้ว 19,000 บาท
   - ยอดคงเหลือ: 37,000 บาท
   If no Payment Record exists, do not invent one; warning appears in the override area when custom work requires it.

5. สรุปสินค้าพร้อมส่ง
   Show only if ready-stock lines exist. Use detailed row/cards with thumbnails:
   - สินค้าพร้อมส่ง: เก้าอี้ไม้สักพร้อมส่ง, จำนวน 4 ชิ้น, ราคา 18,000 บาท
   - Result chip on the line: จะจองสต๊อก
   - Warning chip example on the line or section: สต๊อกไม่พอ 1 รายการ

6. สรุปงานสั่งทำ
   Show only if custom-work lines exist:
   - งานสั่งทำ: ตู้โชว์ไม้สักแกะลาย, จำนวน 1 ชิ้น, ราคา 38,000 บาท
   - Result chip: จะสร้าง JOB-O
   - Preview chip: จะสร้าง JOB-O / งานลูกค้า
   - Do not show a real Job ID yet

7. แผนจัดส่ง
   Show only if the Order mixes ready-stock and custom-work lines:
   - ส่งพร้อมกัน selected
   - If shown, note that จัดส่งแยกได้ can be managed later only through the appropriate Order management or shipment-selection flow when allowed

8. รายละเอียดงานสั่งทำที่จะสร้าง JOB-O
   Show only if custom-work lines exist:
   - อ้างอิงสินค้า: ตู้โชว์ไม้สักรุ่นหลัก
   - สีและการตกแต่ง: สีโอ๊คเข้ม / ลายรักสมุกดอกพิกุล
   - ขนาด: กว้าง 120 ลึก 45 สูง 180 ซม.
   - กำหนดส่ง: 26 พ.ค. 67
   - thumbnails for reference images
   - Department instruction preview if useful: ช่างไม้, สี/ตกแต่ง, รักสมุก

Warning / override area:
Place this inline before the final action, visible in the main content or right panel:
- Warning: สต๊อกไม่พอ 1 รายการ
- Warning: งานสั่งทำยังไม่มี Payment Record ต้องระบุเหตุผลอนุมัติ
- Permission-aware override reason field: เหตุผลอนุมัติ
- Show a small permission note such as ต้องใช้สิทธิ์ผู้จัดการ / ผู้มีสิทธิ์อนุมัติ
- If warnings are unresolved, show the primary “ยืนยันสร้างออเดอร์” button disabled and the readiness status as ต้องอนุมัติพิเศษ
- Do not use a modal for these warnings; they are resolved inline on Review

Right sticky confirmation panel:
Title: ผลหลังยืนยันสร้างออเดอร์
Show outcome chips:
- จะสร้าง Order ID
- จะจองสต๊อก
- จะสร้าง JOB-O
- ยังไม่สร้างรอบจัดส่ง
Then show a short checklist:
- ถ้ามีร่างออเดอร์ที่บันทึกไว้ จะซ่อนจากรายการร่างที่ใช้งานอยู่
- ยังไม่ปิดงานการเงิน
Buttons:
- Secondary: กลับ
- Secondary: บันทึกร่าง
- Primary blue: ยืนยันสร้างออเดอร์
If unresolved warning/override exists, render the primary button disabled and visibly explain why.

Inline warning example:
- Stock insufficient warning: สต๊อกไม่พอ 1 รายการ
- Payment override warning: งานสั่งทำยังไม่มี Payment Record ต้องระบุเหตุผลอนุมัติ
- Permission-aware override reason field visible only for users who can resolve it
- Do not use a modal for the final confirmation.

Visual rules:
- Thai UI labels are primary
- Keep these English terms unchanged: Job, JOB-O, JOB-P, COD, Payment, Revision
- Do not show a confirmed Order ID yet
- Do not show Draft No.
- Do not show shipment round as created
- Do not show product cost, profit, tax filing, accounting ledger, ad spend, or private CRM notes
- Do not make this look like a quotation or invoice
- Do not make this look like a payment page
- Make “จะสร้าง JOB-O” and “จะจองสต๊อก” clear downstream result chips
- Do not add a second confirmation modal; this Review screen is the final confirmation step
- The screen should feel like a final operational review, compact and serious
```
