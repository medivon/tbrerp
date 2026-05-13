# SCR-JOB-002 — Job Detail

## 1. Purpose

The Job Detail screen is the shared view for one `Job / งานสั่งทำ`. It is used by admin and manager to inspect the full work context, and by department users in permission-limited variants. It shows Job source type, work identity, images, instructions, status, department movement, allowed actions, and timeline according to permission.

## 2. Primary Users

- Admin
- Manager / Owner
- Woodwork Department
- Coloring Department
- User with outsource permission
- Rak Samuk Worker in limited assigned-work view

## 3. User Goals

- Identify the work quickly from Job ID, label, image, and product/work name.
- Understand whether the Job is `JOB-O / งานลูกค้า` or `JOB-P / ผลิตเข้าสต๊อก`.
- See current status, department location, urgency, delivery date, and quantity.
- Review department-specific instructions and images.
- Take only the actions allowed for the current role.
- Review relevant timeline without exposing too much sensitive context.

## 4. Entry Points

- Order Detail item card action `เปิด Job`.
- Active Jobs overview row action `เปิด Job`.
- Job Creation Form after creating Job.
- Woodwork `งานที่ต้องทำ`.
- Coloring `งานที่ต้องทำ`.
- `รอรับเข้าโรงงานสี`.
- Rak Samuk workflow.
- Manager unfinished-work overview.
- Job Revision follow-up queue.

## 5. Exit Points

- Woodwork queue or history.
- Coloring queue or history.
- Rak Samuk send queue.
- `รอสร้างรอบจัดส่ง` when `JOB-O` is ready.
- Manager overview.
- Job Revision view.
- Related Order Line or Order Detail for admin.

## 6. Layout Structure

- Desktop admin shell for admin/manager entry points: approved sidebar, approved top bar, active `งานสั่งทำ / ผลิต`.
- Header: Job ID, source code/readable label, status, urgent chip, current department, related source, key action area.
- Main content should use stacked section cards arranged as clear rows, not one blended dashboard panel.
- Row 1: Work identity card with main image, product/work name, quantity, source, delivery date, and current state.
- Row 2: Woodwork instruction card.
- Row 3: Coloring/decoration instruction card.
- Row 4: Rak Samuk instruction card.
- Row 5: Revision, Hold, and waiting-material notices.
- Row 6: Activity timeline / work history.
- Right action panel: sticky or fixed-height `การดำเนินงาน` card with current department, allowed actions, and compact production stepper.
- Related context panel: Order Line/Order for admin; limited or hidden customer/order context for workshop and Rak Samuk Worker.
- Mobile/tablet behavior for later worker screens: image and action panel stay near top; timeline lower on page; do not force the desktop sidebar into worker/mobile screens.

## 7. Main Components

- Job header
- Source badge
- Readable work type chip
- Main image viewer
- Thumbnail gallery
- Instruction image group
- Current status chip
- Department location chip
- Urgent Label chip
- Delivery date chip
- Role-specific action bar
- Timeline
- Revision notice
- Hold / waiting materials notice
- Permission-aware related context panel

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Job ID | รหัส Job | JOB-O-2568-0042 | Job | Prefix must show source. |
| Source label | ประเภทงาน | งานลูกค้า | Job Source Type | Pair with `JOB-O`; `JOB-P` pairs with `ผลิตเข้าสต๊อก`. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Job | Main identity. |
| Main image | รูปหลัก | Cabinet thumbnail | Job / Department Instruction Images | Key visual identifier. |
| Quantity | จำนวน | 1 ชิ้น | Job | Customer Job completes together. |
| Current department | แผนกปัจจุบัน | ช่างไม้ | Job workflow | Shows who should act next. |
| Current status | สถานะ | รอรับงาน | Job workflow status | Status chips should be prominent. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Set by authorized user. |
| Delivery date | วันจัดส่ง | 20 พ.ค. 2569 | Job / Order | Relevant for priority. |
| Woodwork instructions | รายละเอียดช่างไม้ | ทำบานคู่ ขอบโค้ง | Department Instruction Images / Job note | Visible to woodwork and admin/manager. |
| Coloring instructions | รายละเอียดฝ่ายสี/ตกแต่ง | สีโอ๊คเข้ม เคลือบด้าน | Department Instruction Images / Job note | Visible to coloring and admin/manager. |
| Rak Samuk instructions | รายละเอียดรักสมุก | ลายดอกพิกุลหน้าบาน | Department Instruction Images / Job note | Visible when relevant and allowed. |
| Revision notice | Revision | เปลี่ยนสีจากโอ๊คอ่อนเป็นโอ๊คเข้ม | Job Revision | Collapsed history by default. |
| Timeline | ประวัติการทำงาน | รับงานโดยช่างไม้ 9 พ.ค. | Activity Log | Full for admin/manager; limited for workers. |
| Related Order | ออเดอร์ที่เกี่ยวข้อง | ORD-2568-0021 | Order / Order Line | Hidden from Rak Samuk Worker. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Accept work | รับงาน | Woodwork / Coloring where assigned | Job enters active department work. | No |
| Waiting materials | รอวัตถุดิบ | Woodwork / Coloring | Marks department-level blocker and stops department aging. | Yes |
| Send to coloring | ส่งไปสี | Woodwork | Leaves Woodwork active list and enters coloring intake path. | Yes |
| Send to Rak Samuk | ส่งไปรักสมุก | Woodwork / Coloring where allowed | Leaves current department list and enters `รอระบุ/ส่งรักสมุก`. | Yes |
| Send to carving | กำลังส่งไปแกะสลัก | Woodwork | Marks carving handoff note/status for first flow. | Yes |
| Receive coloring intake | รับเข้าโรงงานสี | Coloring / authorized higher permission | Moves work into active Coloring queue. | Yes |
| Mark ready | งานเสร็จ/พร้อมส่ง | Coloring | Sends `JOB-O` to admin `รอสร้างรอบจัดส่ง`. | Yes |
| Set urgent | ตั้งงานด่วน | Authorized admin/manager | Adds Urgent Label. | No |
| Acknowledge revision | รับทราบ | Affected department user | Marks revision acknowledged. | No |
| Ask for clarification | ไม่เข้าใจให้ติดต่อหา | Affected department user | Sends clarification follow-up to admin. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Order Job | งานลูกค้า | Job came from customer Order Line and ends at shipment readiness. | Show with `JOB-O`. |
| Production Job | ผลิตเข้าสต๊อก | Job came from internal Production. | Show with `JOB-P`; included for source clarity. |
| Waiting receive | รอรับงาน | Department has not accepted work yet. | Neutral action-needed chip. |
| In progress | กำลังทำ | Department accepted work. | Active chip. |
| Waiting materials | รอวัตถุดิบ | Department-level material blocker. | Distinct from Hold; warning chip. |
| Hold | Hold | Admin-level Job pause. | Strong pause chip; remains visible. |
| Waiting coloring intake | รอรับเข้าโรงงานสี | Work physically waiting for coloring intake. | Must not look like active Coloring Queue. |
| Ready for Shipment | งานเสร็จ/พร้อมส่ง | Completed `JOB-O` is ready for admin Shipment creation. | Positive chip. |
| Urgent | งานด่วน | Authorized priority label. | Yellow/high-attention chip. |
| Revision pending | รอรับทราบ Revision | Affected department must acknowledge change. | Prominent warning chip. |

## 11. Empty State

The screen should not be opened without a Job. For empty instruction groups, show `ยังไม่มีรูปงานสำหรับแผนกนี้` and, for admin/editing permission, an action to add images. For empty timeline, show `ยังไม่มีประวัติการทำงาน`.

## 12. Error State

- Loading fails: `โหลดรายละเอียด Job ไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูรายละเอียดนี้`.
- Action fails: show the failed action label, for example `ส่งไปสีไม่สำเร็จ`.
- Revision conflict: show `รายละเอียดงานมีการเปลี่ยนแปลง กรุณาโหลดใหม่`.
- Hidden context: for Rak Samuk Worker, do not show customer/order error; simply omit restricted panels.

## 13. Permission Rules

- Admin and manager can see full Job context and timeline according to permission.
- Workers see limited timeline relevant to their own work.
- Rak Samuk Worker sees only assigned work and limited own-payment information; no Customer data, Order ID, sales price, other workers' work, or workflow status controls.
- Role-specific action buttons only appear for allowed users.
- Urgent Label can be set or changed only by authorized admin/manager.
- Finance-sensitive cost/payment fields are hidden without finance permission.

## 14. UX Notes for Designer

- The top of the screen must answer: what is this, where is it, who acts next, and is it urgent?
- Always pair source code and readable label: `JOB-O / งานลูกค้า` or `JOB-P / ผลิตเข้าสต๊อก`.
- Use the main image large enough for furniture identification.
- Separate each instruction category into its own full-width row card so users do not confuse woodwork, coloring, and Rak Samuk details.
- Keep department actions large and clear on tablet/mobile.
- Keep revision history collapsed by default, but show current revision notice clearly.
- Make `Hold` and `รอวัตถุดิบ` visually distinct.
- For workshop views, avoid admin-heavy panels above the fold.
- Use sample work such as a teak display cabinet with dark oak finish and Rak Samuk floral pattern.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-JOB-002-job-detail-work-card.md` as the image generation prompt source. The first approved mockup should represent the desktop admin version opened from `Order Detail -> เปิด Job`.

## 16. Open UX Questions

- Later worker/mobile variants still need their own app-shell decision. Do not use this desktop admin mockup as the final mobile worker baseline.
