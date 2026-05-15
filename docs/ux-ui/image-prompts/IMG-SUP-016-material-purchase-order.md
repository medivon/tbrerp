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
- บันทึกร่าง
- ส่งไปรอรับเข้า
- พิมพ์ A4
- ส่งออก JPG
- รับเข้าสต๊อกวัสดุ
- ยกเลิกใบสั่งซื้อ

Main form:
- วันที่: 22 พฤษภาคม 2567
- ผู้ขาย: ร้านสีเจริญ
- หมายเหตุ: ซื้อสำหรับงานรอวัตถุดิบสัปดาห์นี้
- Attachment area: รูป/เอกสารแนบ

Material lines table:
Columns:
- รูป
- ชื่อวัสดุ
- หมวดวัสดุ
- จำนวน
- หน่วย
- หมายเหตุ
- จัดการ

Rows:
1. สีทองโบราณ; สี/ตกแต่ง; 5; กระป๋อง; สำหรับ JOB-O-2567-0142
2. สีขาวเปลือกไข่; สี/ตกแต่ง; 2; กระป๋อง
3. แผ่นทองคำเปลว; รักสมุก; 3; แพ็ค

Right panel:
Title: สรุปใบสั่งซื้อวัสดุ
Show status timeline:
- ร่าง
- รอรับเข้า current
- รับเข้าสต๊อกแล้ว
Show rules:
- รับเข้าทั้งใบเท่านั้น
- ถ้าของยังไม่ครบ ให้รอก่อน
- รับเข้าแล้วแก้จำนวนไม่ได้ ต้องใช้ปรับยอดวัสดุ
Show Payment Audit Follow-up placeholder:
- หลังรับเข้าสต๊อก ระบบจะสร้างรายการรอตรวจจ่าย
- ยังไม่สร้าง Expense อัตโนมัติ

Visual rules:
- Do not show price, total, VAT, tax, ledger, or payment amount fields
- Do not show partial receipt controls
- `รับเข้าสต๊อกวัสดุ` should look important and require confirmation
- Attachments can be shown in any status
- Keep Thai UI labels primary; English only for SKU/Job if referenced
- Use quiet dense ERP styling consistent with approved admin shell
```
