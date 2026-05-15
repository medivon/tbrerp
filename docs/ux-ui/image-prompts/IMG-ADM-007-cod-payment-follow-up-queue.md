# IMG-ADM-007 - COD/Payment Follow-up Queue

Related screen spec:

- `docs/ux-ui/screens/SCR-ADM-007-cod-payment-follow-up-queue.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ADM-007-cod-payment-follow-up-queue/SCR-ADM-007-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-005-shipment-confirmation-queue/SCR-ADM-005-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop ERP screen for THAIBORAN called “ติดตาม COD / Payment”. This is a finance-permission admin follow-up queue, not a full accounting ledger, tax screen, or audit screen.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed left sidebar with THAIBORAN logo/brand
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “รายจ่าย” as active because this is a finance-permission work area
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows

Screen purpose:
Admin or finance-permission user tracks COD and Payment follow-up separately from Order Completion and Shipment close. COD follow-up can exist from Shipment creation/release when the Shipment carries COD, and it stays open until a permitted admin/finance user closes it. This screen does not block delivery close. It helps answer: รายการไหนต้องตามเงิน, เกี่ยวกับ Order/รอบจัดส่งไหน, ยอดที่ต้องตามเท่าไหร่, สถานะล่าสุดคืออะไร.

Header:
- Page title: ติดตาม COD / Payment
- Subtitle: รายการเงินที่ต้องติดตาม แยกจากการปิดรอบจัดส่ง

Summary strip:
- ทั้งหมด 6
- รอเงิน COD กลับ 3
- ค้างชำระ 2
- รอตรวจหลักฐาน 2
- ยอด COD เกิน 1
- ปิดแล้ววันนี้ 1

Search and filters:
- Search placeholder: ค้นหา Order ID / เลขรอบจัดส่ง / ลูกค้า / เบอร์โทร / ยอดเงิน
- Filter button: ตัวกรอง
- Filter chips: ทั้งหมด, COD, ค้างชำระ, รอตรวจหลักฐาน, ต้องใส่เหตุผล, ปิดแล้ววันนี้

Main content:
Create a dense financial follow-up table/list. Each row should show:
- Follow-up ID
- Related Order ID
- Related shipment round where relevant
- Customer
- Type chip: COD, Payment, Deposit, Refund, Credit
- Expected amount
- Received amount
- Outstanding amount
- Current status chip
- Latest note
- Action button

Use realistic example rows:
1. PAY-FU-0008, ORD-240520-014, SHIP-2568-0061, ลูกค้า ร้านบ้านศิลป์, type COD, ยอดที่ต้องติดตาม 12,000 บาท, รับแล้ว 0 บาท, คงเหลือ 12,000 บาท, chip รอเงิน COD กลับ, note รอขนส่งโอนกลับ, action บันทึกรับเงิน
2. PAY-FU-0009, ORD-240522-018, no shipment, ลูกค้า คุณศิริพร, type Payment, ยอดที่ต้องติดตาม 18,000 บาท, รับแล้ว 5,000 บาท, คงเหลือ 13,000 บาท, chip ค้างชำระ, action เพิ่มหมายเหตุ
3. PAY-FU-0010, ORD-240516-006, SHIP-2568-0064, ลูกค้า คุณอรพิน, type COD, ยอดที่ต้องติดตาม 8,500 บาท, รับแล้ว 9,000 บาท, chip ยอด COD เกิน, action ใส่เหตุผลยอดเกิน
4. PAY-FU-0011, ORD-240515-011, ลูกค้า บริษัท เอ.ที.ดีไซน์, type Payment, chip รอตรวจหลักฐาน, action เปิดออเดอร์

Right detail drawer:
Show selected follow-up item:
- Title: รายละเอียดติดตามการเงิน
- Follow-up ID: PAY-FU-0008
- Related Order: ORD-240520-014
- Related shipment round: SHIP-2568-0061
- Customer: ร้านบ้านศิลป์
- Type: COD
- Expected amount: 12,000 บาท
- Received amount: 0 บาท
- Outstanding: 12,000 บาท
- Status: รอเงิน COD กลับ
- Related item summary with small thumbnail: โต๊ะกลางลงรักสมุก 1 ชิ้น
- Latest note: รอขนส่งโอนกลับ
- Small warning note: Financial Follow-up แยกจากการปิดรอบจัดส่ง
- Buttons: บันทึกรับเงิน, เพิ่มหมายเหตุ, ปิดรายการติดตาม, เปิดออเดอร์, เปิดรอบจัดส่ง

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: COD, Payment, Job, JOB-O, JOB-P, Tracking
- Do not show product cost, profit, tax filing detail, ad spend, or private CRM notes
- Do not make this a full accounting ledger
- Do not show shipment send-out or shipment close controls
- Do not imply COD/Payment blocks Order Completion or Shipment close
- Make “ยอด COD เกิน” visually obvious and show a reason action
- The screen should feel like a practical finance follow-up queue
```
