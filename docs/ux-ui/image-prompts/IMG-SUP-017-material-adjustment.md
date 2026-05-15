# IMG-SUP-017 - Material Adjustment

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-017-material-adjustment.md`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-SUP-015-material-stock/README.md`
- `docs/ux-ui/mockups/SCR-SUP-014-product-sku-table/SCR-SUP-014-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “ปรับยอดวัสดุ”. This screen lets staff enter actual counted material quantities and records differences. `กระทบยอด` is a reason/mode inside this screen, not a separate page.

Use the approved THAIBORAN Admin Dashboard app shell with light sidebar and “สินค้า / สต๊อก” active.

Header:
- Page title: ปรับยอดวัสดุ
- Subtitle: ใส่จำนวนที่นับได้จริง แล้วระบบคำนวณส่วนต่าง
- Primary action: บันทึกปรับยอด
- Secondary action: กลับไปสต๊อกวัสดุ

Top controls:
- วันที่นับ: 22 พฤษภาคม 2567
- เหตุผล: กระทบยอด
- Search placeholder: ค้นหาชื่อวัสดุ / หมวดวัสดุ / ผู้ขาย
- Button: เพิ่มวัสดุ

Summary cards:
- รายการที่เลือก 5
- มีส่วนต่าง 3
- เพิ่มขึ้น 2
- ลดลง 5
- แนบรูปแล้ว 2

Main count table:
Columns:
- รูป
- ชื่อวัสดุ
- หมวดวัสดุ
- หน่วย
- จำนวนที่มีอยู่
- จำนวนที่นับได้
- ส่วนต่าง
- หมายเหตุ
- จัดการ

Rows:
1. สีทองโบราณ; กระป๋อง; จำนวนที่มีอยู่ 3; จำนวนที่นับได้ 4; ส่วนต่าง +1
2. ลวดเย็บ; กล่อง; จำนวนที่มีอยู่ 0; จำนวนที่นับได้ 0; ส่วนต่าง 0
3. รางลิ้นชัก 18 นิ้ว; ชิ้น; จำนวนที่มีอยู่ 24; จำนวนที่นับได้ 22; ส่วนต่าง -2
4. สีขาวเปลือกไข่; กระป๋อง; จำนวนที่มีอยู่ 1; จำนวนที่นับได้ 1; ส่วนต่าง 0
5. แผ่นทองคำเปลว; แพ็ค; จำนวนที่มีอยู่ 6; จำนวนที่นับได้ 3; ส่วนต่าง -3

Right panel:
Title: สรุปก่อนบันทึก
Show largest differences:
- แผ่นทองคำเปลว -3 แพ็ค
- รางลิ้นชัก 18 นิ้ว -2 ชิ้น
- สีทองโบราณ +1 กระป๋อง
Attachment area: แนบรูปประกอบการปรับยอด optional
Note area: หมายเหตุรอบการนับ
Footer warning: หลังบันทึก ระบบจะปรับจำนวนวัสดุและบันทึกประวัติ

History strip below or side:
Filter chips: วันนี้, 7 วันล่าสุด, เดือนนี้, กำหนดช่วงเอง
Show recent adjustment sessions with recorder and count of changed items.

Visual rules:
- Use one screen name: ปรับยอดวัสดุ
- Do not create a separate visible page called กระทบยอดวัสดุ
- Use `จำนวนที่มีอยู่`, not `คงเหลือ`, `พร้อมขาย`, `จองแล้ว`, or `ขายได้`
- No sales price, expense, tax, ledger, or payment fields
- Evidence images are optional for the session, not mandatory per line
- Keep the form dense, practical, and easy for staff to count many items
```
