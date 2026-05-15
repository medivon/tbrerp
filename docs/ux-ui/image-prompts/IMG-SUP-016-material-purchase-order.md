# IMG-SUP-016 - Material Purchase Order

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-016-material-purchase-order.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-015-material-stock/README.md`
- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “ใบสั่งซื้อวัสดุ”. This is an operational material purchase document, not an accounting invoice and not an Expense Entry.

Use the approved THAIBORAN Admin Dashboard app shell with light sidebar and “สินค้า / สต๊อก” active.

Header:
- Page title: ใบสั่งซื้อวัสดุ
- Document no: MAT-PO-2568-0001
- Status chip: รอรับเข้า
- Subtitle: เตรียมรายการซื้อวัสดุ พิมพ์หรือส่งออก แล้วรับเข้าสต๊อกเมื่อของครบ

Action bar:
- แก้ไขรายการ
- พิมพ์ A4
- ส่งออก JPG
- รับเข้าสต๊อกวัสดุ
- ยกเลิกใบสั่งซื้อ

Main form:
- วันที่: 22 พฤษภาคม 2567
- ผู้ขาย: ร้านสีเจริญ
- หมายเหตุ: ซื้อสำหรับงานรอวัตถุดิบสัปดาห์นี้
- Attachment area: รูป/เอกสารแนบ
Show note: ใบสั่งซื้อวัสดุ 1 ใบ มีผู้ขาย 1 เจ้า

Material lines table:
Columns:
- รูป
- รหัสวัสดุ
- ชื่อวัสดุ
- หมวดวัสดุ
- จำนวน
- หน่วย
- งานที่เกี่ยวข้อง
- หมายเหตุ
- จัดการ

Rows:
1. MAT-0001; สีทองโบราณ; สี/ตกแต่ง; 5; กระป๋อง; JOB-O-2567-0142; สำหรับงานฝ่ายสี
2. MAT-0004; สีขาวเปลือกไข่; สี/ตกแต่ง; 2; กระป๋อง; JOB-P-2567-0031
3. MAT-0005; แผ่นทองคำเปลว; รักสมุก; 3; แพ็ค; JOB-O-2567-0148

Right panel:
Title: สรุปใบสั่งซื้อวัสดุ
Show status timeline:
- รอรับเข้า current
- รับเข้าสต๊อกแล้ว
Show rules:
- รับเข้าทั้งใบเท่านั้น
- ถ้าของยังไม่ครบ ให้รอก่อน
- รับเข้าแล้วแก้จำนวนไม่ได้ ต้องใช้ปรับยอดวัสดุ
Show Payment Audit Follow-up placeholder:
- หลังรับเข้าสต๊อก ระบบจะสร้างรายการรอตรวจจ่าย
- ยังไม่สร้าง Expense อัตโนมัติ
Show related Job release preview:
- รับเข้าแล้วจะปลดรอวัตถุดิบ 3 งาน
- JOB-O-2567-0142 ตู้พระไม้สัก กลับเข้าคิว ฝ่ายสี
- JOB-P-2567-0031 โต๊ะหมู่บูชา กลับเข้าคิว ช่างไม้
- JOB-O-2567-0148 ฐานพระไม้สัก กลับเข้าคิว รักสมุก

Receipt confirmation modal state:
Show modal title: ยืนยันรับเข้าสต๊อกวัสดุ
Show message: ระบบจะรับเข้าวัสดุทั้งใบ และปลดรอวัตถุดิบของงานต่อไปนี้
Show table with Job ID, ชื่องาน/สินค้า, กลับเข้าคิว, วัสดุที่เกี่ยวข้อง
Actions: ยืนยันรับเข้า, กลับไปตรวจสอบ

Visual rules:
- Do not show price, total, VAT, tax, ledger, or payment amount fields
- Do not show draft status, save draft buttons, or approval status
- Do not show partial receipt controls
- Do not allow multiple suppliers in one document
- Material picker only uses active Material Items linked to the selected supplier
- Manual purchase orders must not show controls for linking Jobs later
- Job Detail should not be shown inside this prompt; related Jobs are shown only on the purchase document and receipt confirmation
- Do not show a `รับวัตถุดิบแล้ว` badge after receipt
- `รับเข้าสต๊อกวัสดุ` should look important and require confirmation
- Attachments can be shown in any status
- Keep Thai UI labels primary; English only for SKU/Job if referenced
- Use quiet dense ERP styling consistent with approved admin shell
```
