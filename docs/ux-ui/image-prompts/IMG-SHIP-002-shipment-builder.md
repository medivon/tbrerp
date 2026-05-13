# IMG-SHIP-002 - Shipment Builder

Related screen spec:

- `docs/ux-ui/screens/SCR-SHIP-002-shipment-builder.md`

Approved mockup:

- `docs/ux-ui/mockups/SCR-SHIP-002-shipment-builder/SCR-SHIP-002-approved.png`

Visual/content anchors:

- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-002-active-orders-overview/SCR-ADM-002-approved.png`
- `docs/ux-ui/mockups/SCR-ADM-003-active-jobs-overview/SCR-ADM-003-approved.png`
- `docs/ux-ui/mockups/SCR-SHIP-001-ready-to-ship-queue/SCR-SHIP-001-content-approved.png`
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “สร้างรอบจัดส่ง”. This screen is for selected ready-to-ship items from one Order, or a special-case Shipment that needs manual review before release.

Use the approved THAIBORAN admin app shell and the approved content direction from the previous “รอสร้างรอบจัดส่ง” workbench. Do not turn this screen into a bulk builder.

Important workflow rule:
- This screen is for selected lines from a single Order / special case only.
- Bulk creation does not enter this screen.
- Bulk creation uses default Customer/Order delivery data and moves directly to creating Shipment documents.
- It opens from Order Detail after the admin selects ready lines in `จัดการรอบจัดส่ง` and presses `สร้างรอบจัดส่งจากรายการที่เลือก`.

Header:
- Page title: สร้างรอบจัดส่ง
- Subtitle: ตรวจรายการพร้อมส่งและข้อมูลผู้รับก่อนปล่อยให้ฝ่ายจัดส่ง
- Source reference: จากออเดอร์ ORD-240520-014
- Status chip: กำลังสร้างรอบจัดส่ง
- Shipment plan chip: จัดส่งแยกได้, shown only because this example is a mixed ready-stock/custom Order

Layout:
Use a clean two-panel review layout with a fixed footer action bar.

Left panel title: รายการพร้อมส่ง
Show selected ready lines from one Order with:
- Order ID: ORD-240520-014
- Customer: ร้านบ้านศิลป์
- Item image
- Item name: โต๊ะกลางลงรักสมุก
- Quantity: 1 ชิ้น
- Status chip: งานสั่งทำเสร็จแล้ว
- Related Job ID: JOB-O-0238
- Shipment plan note: ออเดอร์นี้จัดส่งแยกได้, shown only for mixed ready-stock/custom Orders
- Buttons: ดูใบส่งของ, ดูใบจัดส่ง

Add a calm info box:
“ตรวจสอบรายการและข้อมูลจัดส่งแล้ว พร้อมสร้างรอบจัดส่ง 1 รายการ”

Right panel title: ข้อมูลจัดส่ง
Show delivery data as editable special-case fields:
- ผู้รับสินค้า: คุณณัฐพล
- เบอร์โทร: 081-234-5678
- ที่อยู่จัดส่ง: 88/14 ถ.ราชพฤกษ์ ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110
- ขนส่ง: ไปรษณีย์ไทย EMS
- วันจัดส่ง: 24 พ.ค. 67
- การชำระเงิน: COD
- ยอด COD: 12,000 บาท
- หมายเหตุ COD: เก็บปลายทางตามยอดที่เก็บเงินแล้ว
- หมายเหตุจัดส่ง: โทรก่อนเข้าจัดส่ง / ชิ้นงานระวังกระแทก

Show edit buttons:
- แก้ไขข้อมูลจัดส่ง
- แก้ยอด COD
- แก้หมายเหตุ

Footer action bar:
- Primary button: พร้อมจัดส่ง
- Secondary button: บันทึกเป็นร่าง
- Secondary button: ยกเลิก

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: Job, JOB-O, COD, Payment, Revision
- Use “รอบจัดส่ง” instead of “Shipment” in visible Thai UI
- Do not show product prices, sales price, profit, accounting totals, tax, ad spend, or private CRM notes
- Do not show bulk selection or multi-order table here
- Do not show the Order Detail selection control “สร้างรอบจัดส่งจากรายการที่เลือก” here; by this point the selected items are already inside Shipment Builder
- Do not show items blocked by ส่งพร้อมกัน / unfinished custom work
- Do not show Delivery Team controls
- Do not imply the Shipment is already sent
- Do not show “ส่งออกแล้ว”
- Do not show final Order completion
- The screen should feel like a single/special-case shipment review editor before release
```
