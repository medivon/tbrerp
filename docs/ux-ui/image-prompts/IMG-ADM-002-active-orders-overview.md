# IMG-ADM-002 - Orders Follow-up Overview

Approved visual anchor:

- `docs/ux-ui/mockups/SCR-ADM-002-active-orders-overview/SCR-ADM-002-approved.png`

Related screen spec:

- `docs/ux-ui/screens/SCR-ADM-002-active-orders-overview.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “ออเดอร์ที่ต้องติดตาม”. This is the next screen after clicking the Admin Dashboard card “ออเดอร์ที่ต้องติดตาม”.

Use the approved Admin Dashboard app shell as the visual baseline:
- Fixed left sidebar with THAIBORAN logo/brand at top
- Approved main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight the sidebar item “ออเดอร์” as active
- Top bar with page title, current date, user avatar, user name “Admin (Full Access)”, role “ผู้ดูแลระบบ”, and account menu
- Quiet operational ERP style, white cards, subtle shadows, modest rounded corners, dark navy count typography, compact colored chips, Thai-first UI labels

Screen purpose:
Show confirmed Orders that are not operationally complete. Do not show Draft Orders. Draft Order belongs under the Order page as a separate subcategory, not in this active operational list.

Header:
- Page title: ออเดอร์ที่ต้องติดตาม
- Small subtitle: ออเดอร์จริงที่ยังต้องตามงานต่อ
- A restrained primary action button inside this Order page: สร้างออเดอร์
- Show clear Order module tabs: ออเดอร์ที่ต้องติดตาม, ออเดอร์ทั้งหมด, ร่างออเดอร์, ปิดแล้ว / ยกเลิก

Summary strip below the header:
Use compact cards or chips:
- ทั้งหมด 18
- กำลังผลิต 11
- ส่งได้เลย 7
- รอยืนยันการจัดส่ง 4 (shipment follow-up)
- ส่งบางส่วน 2

Filter tabs:
- ทั้งหมด
- กำลังผลิต
- ส่งได้เลย
- รอยืนยันการจัดส่ง (Shipment follow-up, not Order status)
- ส่งบางส่วน

Search area:
Include a search box with placeholder “ค้นหา ชื่อลูกค้า / เบอร์โทร / Order ID / Job ID / ที่อยู่”. Add a small filter button “ตัวกรอง”.

Main content:
Create a dense but readable table/list of active Orders. Use image-led rows, not a plain accounting table. Each row should show:
- Small product/work thumbnail
- Order ID such as ORD-240522-018
- Customer name
- Recipient or phone
- Work/item summary
- Simple label มีงานสั่งทำ when the Order contains custom work
- Small Job ID if relevant, such as JOB-O-0241
- วันที่รับงาน
- กำหนดส่ง
- Operational status chip
- Separate shipment/tracking state where relevant
- Current next action
- Short action link/button
Important action rule: this follow-up page only signals what needs attention. Row actions should open the Order, not create Shipment, confirm Shipment, edit Job, or perform downstream work directly.
Sort the list by follow-up urgency first: overdue/near due, waiting too long, blocked, then created date.

Use realistic example rows:
1. ORD-240522-018, ลูกค้า คุณศิริพร, ตู้โชว์ไม้สักแกะลาย, JOB-O-0241, วันที่รับงาน 08 พ.ค. 67, กำหนดส่ง 26 พ.ค. 67, chips: กำลังผลิต, มีงานสั่งทำ, งานด่วน, ค้าง 18 วัน, current state: อยู่คิวช่างไม้, action: เปิดออเดอร์
2. ORD-240520-014, ลูกค้า ร้านบ้านศิลป์, โต๊ะกลางลงรักสมุก, JOB-O-0238, วันที่รับงาน 10 พ.ค. 67, กำหนดส่ง 24 พ.ค. 67, chips: ส่งได้เลย, มีงานสั่งทำ, COD, current state: รอสร้างรอบจัดส่ง, action: เปิดออเดอร์
3. ORD-240518-009, ลูกค้า คุณพิมพ์ชนก, ชุดเก้าอี้พร้อมส่ง, วันที่รับงาน 11 พ.ค. 67, กำหนดส่ง 23 พ.ค. 67, Order status: กำลังดำเนินการ or ส่งบางส่วน where appropriate, shipment chip: รอยืนยันการจัดส่ง, current state: เพิ่มเลขติดตามพัสดุ / หลักฐานขนส่ง, action: เปิดออเดอร์
4. ORD-240516-006, ลูกค้า คุณอรพิน, ตู้พระสั่งทำพร้อมฐาน, JOB-O-0231, วันที่รับงาน 05 พ.ค. 67, กำหนดส่ง 28 พ.ค. 67, chips: ส่งบางส่วน, กำลังผลิต, มีงานสั่งทำ, current state: ของพร้อมส่งส่งแล้ว / งานสั่งทำยังผลิตอยู่, action: เปิดออเดอร์

Right detail drawer:
Show a selected Order preview on the right side. Include:
- Order ID
- Customer
- Main image
- Status chips
- รายการในออเดอร์ summary
- Related Job ID
- Related shipment state
- Buttons: เปิดออเดอร์

Visual rules:
- Use Thai labels as the visible UI language
- Keep English only for important internal terms: Job, JOB-O, JOB-P, COD, Payment, Revision
- Use “รอบจัดส่ง” instead of “Shipment” in Thai UI
- Do not show Draft Orders in the active list
- Do not show direct สร้างรอบจัดส่ง, ยืนยันการจัดส่ง, or เปิด Job actions on this page; open Order Detail first
- Do not treat รอยืนยันการจัดส่ง as main Order status; it is a shipment/tracking state
- Do not show accounting totals, profit, tax, ad spend, or analytics charts
- Do not show private CRM notes
- Do not make the screen a full manager production report
- Preserve the calm THAIBORAN Admin Dashboard design system
- The screen should look practical for office admin staff managing daily Orders
```
