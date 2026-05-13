# IMG-ORD-007 - Order Line Edit

Related screen spec:

- `docs/ux-ui/screens/SCR-ORD-007-order-line-edit.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “แก้ไขรายการออเดอร์”. This is an edit mode for an already confirmed Order, not a new Order and not an invoice.

Use the THAIBORAN admin app shell with sidebar active “ออเดอร์”.

Header:
- Page title: แก้ไขรายการออเดอร์
- Source Order ID: ORD-240520-014
- Status chips: กำลังดำเนินการ, จัดส่งยังไม่ครบ
- Back action: กลับไปหน้า รายละเอียดออเดอร์
- Primary footer action: ตรวจสอบการแก้ไข

Main content:
Use a Create/Edit-like layout but clearly mark it as editing existing Order lines.

Section: สินค้าพร้อมส่ง
Rows:
1. โต๊ะกลางลงรักสมุก, quantity 1, editable because no Shipment yet. Show edit and remove controls.
2. ชุดเก้าอี้ไม้สัก, quantity 2, disabled/read-only with reason “รายการนี้ส่งออกแล้ว”.
3. ตู้ไม้สักเล็ก, in Shipment round SHIP-2568-0061, disabled with reason “อยู่ในรอบจัดส่งแล้ว ต้องเอาออกจากรอบก่อนแก้ไข”.
Button: เพิ่มสินค้าพร้อมส่ง

Section: งานสั่งทำ
Rows:
1. ตู้พระสั่งทำ, new custom-work line being added, editable detail fields visible.
2. ตู้โชว์ไม้สักแกะลาย, related JOB-O-0238, disabled production-detail edit with action “เปิด Job” and note “แก้รายละเอียดผลิตในหน้า Job”.
3. โต๊ะหมู่บูชา, related JOB-O-0240, not started, show controlled remove action “ลบงานสั่งทำออกจากออเดอร์” requiring reason.
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
Reason field: เหตุผลการแก้ไข
Make it clear that added ready-stock will reserve stock, removed safe ready-stock will release stock, and the new custom-work line will create JOB-O only after saving from Review Changes.

Footer:
- ยกเลิก / กลับ
- ตรวจสอบการแก้ไข

Optional Review Changes preview/modal/state:
- Title: ตรวจสอบการแก้ไข
- Buttons: กลับไปแก้ไข, บันทึกการแก้ไข, ยกเลิก
- Show only changed lines and impact, not the whole Order again

Visual rules:
- Thai labels primary
- Keep English only for Order ID, Job, JOB-O, COD, Tracking
- Do not show draft or autosave state for this confirmed Order edit
- Do not silently edit existing JOB-O production detail
- Do not allow sent/completed lines to look editable
- Do not show full payment workflow
- Make Review Changes feel required before save
```
