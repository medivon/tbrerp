# IMG-ADM-003 - Active Jobs Overview

Related screen spec:

- `docs/ux-ui/screens/SCR-ADM-003-active-jobs-overview.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “งานกำลังผลิต”. This is the next screen after clicking the approved Admin Dashboard card “งานกำลังผลิต”.

Use the current Admin Dashboard screen spec and app-shell docs as the app-shell direction:
- Fixed left sidebar with THAIBORAN logo/brand at top
- Approved main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight the sidebar item “งานสั่งทำ / ผลิต” as active
- Top bar with page title, current date, user avatar, user name “Admin (Full Access)”, role “ผู้ดูแลระบบ”, and account menu
- Quiet operational ERP style, white cards, subtle shadows, modest rounded corners, dark navy count typography, compact colored chips, Thai-first UI labels

Screen purpose:
Show active Jobs currently in production. Include both JOB-O customer work and JOB-P internal production work. This screen is for tracking where production work is, which department owns the next action, and which Jobs are urgent, old, waiting for materials, or need attention.

Do not show “รอสร้าง Job”. Jobs should already exist from confirmed Order or internal Production flows.

Header:
- Page title: งานกำลังผลิต
- Small subtitle: ติดตามงานสั่งทำและงานผลิตที่ยังไม่เสร็จ
- No primary creation shortcut in the header

Summary strip below the header:
Use compact cards or chips:
- ทั้งหมด 17
- ช่างไม้ 8
- ฝ่ายสี 6
- รักสมุก 3
- งานด่วน 2
- รอวัตถุดิบ 1

Source toggle:
- ทั้งหมด
- งานลูกค้า (JOB-O)
- ผลิตเข้าสต๊อก (JOB-P)

Department/status tabs:
- ทุกแผนก
- ช่างไม้
- ฝ่ายสี
- รักสมุก
- รอวัตถุดิบ
- งานด่วน

Search area:
Include a search box with placeholder “ค้นหา Job ID / Order ID / ลูกค้า / ชื่องาน / แผนก”. Add a small filter button “ตัวกรอง”.

Main content:
Create a dense but readable table/list of active Jobs. Use image-led rows, not a plain report table. Each row should show:
- Small product/work thumbnail
- Job ID such as JOB-O-0241 or JOB-P-0018
- Source badge: งานลูกค้า or ผลิตเข้าสต๊อก
- Related Order ID for JOB-O, such as ORD-240522-018
- Customer name for JOB-O where relevant
- Work/product name
- Quantity
- Current department
- Current status
- วันที่รับงาน
- กำหนดส่ง where relevant
- Total age and department age chips
- Short action link/button

Use realistic example rows:
1. JOB-O-0241, งานลูกค้า, ORD-240522-018, ลูกค้า คุณศิริพร, ตู้โชว์ไม้สักแกะลาย, จำนวน 1 ชิ้น, แผนก ช่างไม้, สถานะ อยู่คิวช่างไม้, วันที่รับงาน 08 พ.ค. 67, กำหนดส่ง 26 พ.ค. 67, chips: งานด่วน, ค้าง 18 วัน, อายุในแผนก 4 วัน, action: เปิด Job
2. JOB-O-0238, งานลูกค้า, ORD-240520-014, ลูกค้า ร้านบ้านศิลป์, โต๊ะกลางลงรักสมุก, จำนวน 1 ชิ้น, แผนก รักสมุก, สถานะ อยู่กับช่างรักสมุก, วันที่รับงาน 10 พ.ค. 67, กำหนดส่ง 24 พ.ค. 67, chips: ใกล้ส่ง, action: เปิด Job
3. JOB-P-0018, ผลิตเข้าสต๊อก, โต๊ะข้างไม้สัก, จำนวน 6 ชิ้น, แผนก ฝ่ายสี, สถานะ กำลังทำสี, วันที่รับงาน 12 พ.ค. 67, chips: ผลิตเข้าสต๊อก, action: เปิด Job
4. JOB-O-0231, งานลูกค้า, ORD-240516-006, ลูกค้า คุณอรพิน, ตู้พระสั่งทำพร้อมฐาน, จำนวน 1 ชิ้น, แผนก ฝ่ายสี, สถานะ รอวัตถุดิบ, วันที่รับงาน 05 พ.ค. 67, กำหนดส่ง 28 พ.ค. 67, chips: รอวัตถุดิบ, ค้าง 12 วัน, action: ติดตามงานผลิต

Right detail drawer:
Show a selected Job preview on the right side. Include:
- Job ID
- Source type: JOB-O / งานลูกค้า or JOB-P / ผลิตเข้าสต๊อก
- Main image
- Current department
- Status chips
- Work quantity
- Related Order ID if JOB-O
- Short timeline preview: รับงาน, อยู่คิวช่างไม้, ส่งไปรักสมุก, เข้าโรงงานสี
- Buttons: เปิด Job, เปิดออเดอร์ if JOB-O, ดูคิวแผนก

Visual rules:
- Use Thai labels as the visible UI language
- Keep English only for important internal terms: Job, JOB-O, JOB-P, COD, Payment, Revision
- Use “งานสั่งทำ / ผลิต” in the sidebar
- Clearly distinguish JOB-O and JOB-P
- Do not show “รอสร้าง Job”
- Do not show sales price, profit, payment amount, accounting data, or private CRM notes
- Do not make this a generic manager report or accounting dashboard
- Preserve the calm THAIBORAN Admin Dashboard design system
- The screen should look practical for office admin and manager users tracking daily production work
```
