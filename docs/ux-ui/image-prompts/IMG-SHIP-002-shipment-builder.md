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
- Bulk creation uses saved Order Recipient Detail snapshots as delivery defaults and moves directly to creating Shipment documents.
- It opens from Order Detail after the admin selects ready lines in `จัดการรอบจัดส่ง` and presses `สร้างรอบจัดส่งจากรายการที่เลือก`.
- From Order Detail, it receives recipient name, address, phone, selected delivery items, each item's main image, quantity, and carrier name when already chosen.
- Item image, product name, color / SKU ย่อย, SKU code, and dimensions come from the Order Line snapshot, not live Product Model data.
- If selected ready-stock lines have negative/insufficient stock that was acknowledged earlier, show a warning acknowledgement here; do not block Shipment creation after acknowledgement.

Header:
- Page title: สร้างรอบจัดส่ง
- Subtitle: ตรวจรายการพร้อมส่งและข้อมูลผู้รับก่อนปล่อยให้ฝ่ายจัดส่ง
- Source reference: จากออเดอร์ ORD-240520-014
- Status chip: กำลังสร้างรอบจัดส่ง
- Selection chip: จัดส่งบางรายการจากออเดอร์

Layout:
Use a clean two-panel review layout with a fixed footer action bar.

Left panel title: รายการพร้อมส่ง
Show selected ready lines from one Order with:
- Order ID: ORD-240520-014
- Customer: ร้านบ้านศิลป์
- Item image from Order Line snapshot
- SKU หลัก / item name: โต๊ะกลางลงรักสมุก
- สี / SKU ย่อย: สีโอ๊คเข้ม / TBR-TBL-123-OAK
- Quantity: 1 ชิ้น
- Status chip: งานสั่งทำเสร็จแล้ว
- Related Job ID: JOB-O-0238
- Selection note: รายการนี้ถูกเลือกจากหน้า Order Detail เพื่อสร้างรอบจัดส่งนี้
- Buttons: ดูใบส่งของ, ดูใบจัดส่ง

Add a calm info box:
“ตรวจสอบรายการและข้อมูลจัดส่งแล้ว พร้อมสร้างรอบจัดส่ง 1 รายการ”
If useful, show a warning line:
“แจ้งเตือน: สต๊อกติดลบ 1 รายการ”

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
Note: edits here are Shipment-round snapshots only and do not update Customer or Order automatically.

Stock warning modal/inline state:
- Title: แจ้งเตือนสต๊อกติดลบ
- Message: รายการพร้อมส่งบางรายการมีสต๊อกติดลบ/ไม่พอ ระบบให้ดำเนินการต่อได้หลังรับทราบ
- Buttons: รับทราบและสร้างรอบจัดส่งต่อ, กลับไปตรวจสต๊อก
- Do not require Manager approval or reason field

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
- Do not show unselected items or items blocked by unfinished custom work
- Do not show Delivery Team controls
- Treat COD as admin/finance delivery setup: it appears on the Shipping Sheet where relevant, not in Delivery Team UI and not on Delivery Note
- Do not imply the Shipment is already sent
- Do not show “ส่งออกแล้ว”
- Do not show final Order completion
- Do not make stock shortage look like a hard block after acknowledgement
- Do not refresh Product/SKU images from live Product Model data; use the saved Order Line snapshot
- The screen should feel like a single/special-case shipment review editor before release
```
