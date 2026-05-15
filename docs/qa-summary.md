# THAIBORAN ERP Q&A Summary

This file is a handoff summary of the long discovery chat. It preserves the confirmed Q&A decisions so future work does not restart from zero.

It is not a verbatim transcript. It is a decision-grade Q&A summary grouped by domain. For the normal `grill-with-docs` structure, use `CONTEXT.md` as the canonical language file and `docs/adr/` for hard-to-reverse trade-offs. This file, `docs/decision-log.md`, and `docs/ux-ui/initial-scope.md` are supporting notes.

Legacy material has been moved to `docs/archive/` and is not part of the active source of truth.

## Source Priority

If documents conflict, use this order:

1. Latest chat Q&A decisions
2. `CONTEXT.md` for canonical domain terms and relationships
3. ADRs under `docs/adr/` for hard-to-reverse trade-off decisions
4. `docs/decision-log.md` for grouped confirmed decisions
5. This Q&A summary for readable handoff notes

## 1. Business Direction

**Q: What is the main business goal of the ERP?**
A: สร้างระบบกลางของร้าน THAIBORAN / ไทยโบราณ เพื่อรวมงานขาย ผลิต สต๊อก จัดส่ง บัญชี รูปภาพ CRM และ outsource ให้อยู่ในแหล่งข้อมูลเดียว ลด Excel กระดาษ แชท และความจำคน.

**Q: What is the biggest pain to solve first?**
A: งานสั่งทำ (Job) เป็นปัญหาอันดับ 1 เพราะเป็นต้นเหตุของการถามซ้ำ ผลิตผิด งานค้าง ตามงานไม่เจอ และกระทบไปถึงสินค้า สต๊อก จัดส่ง และเงิน.

**Q: What should success look like in the first 1-3 months?**
A: ลดการถามซ้ำ เห็นว่างานแต่ละชิ้นอยู่ไหน ทำถึงขั้นตอนไหน ใครต้องทำต่อ งานไหนด่วน งานไหนค้างนาน และงานไหนพร้อมส่ง.

**Q: What mistake is most damaging?**
A: งานใกล้จัดส่ง/ใกล้รับเงินแล้วผลิตผิด และงานเกือบเสร็จแต่ไม่มีใครปิดงานจนลูกค้าทวง.

**Q: What should not be built deeply in the first scope?**
A: บัญชีเต็มรูปแบบ ใบกำกับภาษี ใบเสนอราคา ช่องทางขาย/API โครงสร้าง BOM/ต้นทุนต่อบิล Payroll QC เต็ม และ carrier API.

**Q: What is the first UX/UI scope?**
A: เริ่มจากงานสั่งทำ (Job) เป็นแกน โดยมี Admin Dashboard เป็นหน้าจอแรก แล้วต่อไปยัง Order, Production, Rak Samuk, Shipment, Stock, CRM, Expense และ PV เท่าที่จำเป็น.

## 2. Scope and Documentation

**Q: What is the first screen to design?**
A: `Admin Dashboard` เพราะแอดมินเป็นจุดรวมงานจริง: เปิด Order, ยืนยัน Order ที่สร้าง `JOB-O`, สร้าง Shipment, ปิด Shipment, ตาม COD/payment และดู shared queue.

**Q: Should the first scope be generic ERP Phase 1?**
A: No. It must not start from generic modules. It starts from custom job operations and includes supporting modules only where needed.

**Q: Should previous chat decisions override old documents?**
A: Yes. Latest chat Q&A decisions are the top source of truth.

**Q: Which handoff documents now exist?**
A: `CONTEXT.md`, ADRs, `docs/decision-log.md`, `docs/ux-ui/initial-scope.md`, and this `docs/qa-summary.md`.

## 3. Core Terms

**Q: What is Order?**
A: Order คือออเดอร์ขายจริงที่ยืนยันแล้วและพร้อมเข้าสู่ระบบงาน ไม่ใช่ lead, quotation, draft หรือ payment.

**Q: What is Draft Order?**
A: ร่างออเดอร์ที่ผู้ใช้ตั้งใจบันทึกไว้เพื่อทำต่อภายหลัง มี Draft No. แต่ยังไม่ออก Order ID ไม่จองสต๊อก ไม่สร้าง Job ไม่สร้าง Shipment และไม่เข้ารายงาน.

**Q: What is Job?**
A: Job คือหน่วยงาน custom/งานผลิตเฉพาะที่มีรายละเอียดผลิต รูป คำอธิบาย และสถานะ workflow.

**Q: Does Job always mean customer order?**
A: No. Job มีได้ 2 source: `Order` และ `Production`.

**Q: What are JOB-O and JOB-P?**
A: `JOB-O` คือ Job จาก Order ลูกค้า. `JOB-P` คือ Job จาก Production ภายใน/ผลิตเข้าสต๊อก/ผลิตทดลอง.

**Q: What is Shipment?**
A: Shipment คือรอบจัดส่งที่แอดมินสร้างจากรายการพร้อมส่ง ไม่ใช่ Order.

**Q: What is Order Completion?**
A: Order จบเมื่อ Shipment ที่ต้องส่งทั้งหมดถูกปิดครบ ไม่ผูกกับการ audit เงิน.

**Q: What is Financial Follow-up?**
A: หน้าหรือสถานะติดตามเงิน เช่น COD, payment audit, ยอดค้าง, refund, deposit retained, credit แยกจาก Order Completion.

## 4. Users, Permissions, and Logs

**Q: What permission model is needed?**
A: ใช้ Role + Permission ที่ยืดหยุ่น สร้างตำแหน่งเพิ่มได้ และกำหนด permission ย่อยได้.

**Q: Can same-permission users continue another user's work?**
A: Yes. คน permission ระดับเดียวกันหรือสูงกว่าสามารถแก้/รับช่วงต่อได้ พร้อม log.

**Q: Does Owner still matter?**
A: Yes. Owner ใช้ trace ความรับผิดชอบ แต่ไม่ควรล็อกงานจนทีมช่วยกันไม่ได้.

**Q: Who is Order Owner?**
A: คนที่กดสร้าง Order จริง ไม่ใช่คนสร้าง Draft เสมอไป.

**Q: Who is Shipment Owner?**
A: คนที่สร้าง Shipment โดย default แต่ queue `รอปิด Shipment` เป็น shared queue ของแผนก/role.

**Q: How many log levels?**
A: 3 ระดับ: Activity Log, Management Log, Audit Log.

**Q: Should data be physically deleted?**
A: No. ใช้ปิดใช้งาน ซ่อน ยกเลิก หรือ archive พร้อม log ไม่ลบจริง.

**Q: Can images be deleted?**
A: ลบแบบซ่อน/ปิดการแสดงผล ไม่ลบจริงจาก storage/backup.

## 5. Admin Dashboard

**Q: What dashboard cards are confirmed?**
A: `ออเดอร์ที่ต้องติดตาม`, `งานกำลังผลิต`, `รอสร้างรอบจัดส่ง`, `ยืนยันการจัดส่ง`, `งานผลิตต้องติดตาม`, `ติดตาม COD / Payment`.

**Q: Should dashboard show all records?**
A: No. แสดงกล่องจำนวนและสรุปสั้น ๆ แล้วกดเข้า working queue.

**Q: Are admin queues personal or shared?**
A: Shared by role/permission.

**Q: Is admin workload heavy in first scope?**
A: Yes, accepted for first scope. Future UX can simplify later.

## 6. Draft Order and Order Entry

**Q: Should Draft Order exist?**
A: Yes, but only when the user explicitly saves unfinished work. Starting `สร้างออเดอร์` does not automatically create a persistent Draft Order.

**Q: Does order entry have persistent autosave?**
A: No. Autosave-like behavior is only temporary while the user is on the screen. If the user exits without saving, there is no autosave draft left behind.

**Q: When is Draft No. created?**
A: Only when the user clicks `บันทึกร่าง` or `ออกและบันทึก`. If the user completes the flow in one sitting, the system can create the real Order without ever creating a saved Draft No.

**Q: Does Draft Order reserve stock?**
A: No.

**Q: Does Draft Order create Job or Shipment?**
A: No.

**Q: Does Draft Order get Order ID?**
A: No. Draft Order ที่บันทึกแล้วมี Draft No. เท่านั้น.

**Q: Who can edit Draft Order?**
A: คนสร้าง, คน permission เท่ากัน, และคนสูงกว่า.

**Q: What happens after Draft becomes Order?**
A: Draft is hidden from active Draft UI by status such as converted/archived/read-only; it is not physically deleted.

**Q: When is Order ID created?**
A: เมื่อกรอกข้อมูลสำคัญครบและกดสร้าง Order จริง.

**Q: Should Lead/Quotation be included first?**
A: No. ยังไม่ทำ Lead/Quotation ใน first scope.

**Q: Should unfinished customer discussion enter system?**
A: No. ถ้ายังไม่พร้อมรับงานจริง ไม่ควรคีย์เข้าระบบ.

**Q: What is the recommended order entry flow?**
A: สร้างออเดอร์ -> เลือก/เพิ่มลูกค้า -> เลือกที่อยู่ -> เพิ่มสินค้าพร้อมส่งหรือเพิ่มงานสั่งทำด้วยปุ่มแยก -> ราคา/payment term -> ถ้ามีงานสั่งทำให้กรอก `รายละเอียดงานสั่งทำ` ให้ครบ -> Review -> ยืนยันสร้าง Order ID.

**Q: Should customer be selected before adding items?**
A: Yes. Customer comes first, then address/recipient, then Order Lines.

**Q: How are ready-stock and custom work added?**
A: Use separate buttons: `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`.

**Q: Is custom work created as a separate Job later?**
A: No. The custom line contains `รายละเอียดงานสั่งทำ` inside Order Create/Edit. When the Order is confirmed, complete custom lines create `JOB-O` immediately.

**Q: What does Review do?**
A: Review is the final check before a real Order ID. It shows all entered information in detailed row/cards, separated into ready-stock and custom sections, with `กลับ`, `บันทึกร่าง`, and `ยืนยันสร้างออเดอร์`.

**Q: Should `ยืนยันสร้างออเดอร์` open another confirmation modal?**
A: No. The Review screen itself is the final confirmation step. Warnings and acknowledgement controls appear inline and block confirmation until resolved.

**Q: Where does the user go after confirming Order?**
A: Order Detail, immediately after real Order ID creation.

**Q: Is Payment Term required?**
A: Yes.

**Q: Is Payment Record required to create Order?**
A: No, but can be entered in flow. It should not over-block operations.

**Q: Can Job be created without payment?**
A: Yes. `JOB-O` creation is not gated by Payment Record. It depends on confirmed Order and complete Custom Work Detail; payment follow-up remains separate.

**Q: What if an Order has both ready-stock and custom work?**
A: เฉพาะออเดอร์ที่มีทั้งสินค้าพร้อมส่งและงานสั่งทำเท่านั้นที่มี shipment intent. Default เป็น `ส่งพร้อมกัน`; การส่งแยกจริงทำโดยเลือกเฉพาะรายการพร้อมส่งตอนสร้างรอบจัดส่ง.

**Q: What are the main Order tabs?**
A: `ออเดอร์ที่ต้องติดตาม`, `ออเดอร์ทั้งหมด`, `ร่างออเดอร์`, and `ปิดแล้ว / ยกเลิก`.

**Q: What appears in `ออเดอร์ที่ต้องติดตาม`?**
A: Only real Orders that still need operational follow-up. Drafts do not appear there. Rows with custom work show a simple `มีงานสั่งทำ` label.

**Q: What are the main Order statuses?**
A: `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `จัดส่งครบแล้ว`, and `ยกเลิก`. `รอยืนยันการจัดส่ง` is a Shipment status shown under `สถานะการจัดส่ง`, not an Order status.

**Q: What are the main Order Detail header buttons?**
A: The new Order Detail direction uses `จัดการออเดอร์` as the header action, with section-level edit buttons in the page. Shipment creation is handled from the `จัดการรอบจัดส่ง` section, not as a competing header button.

**Q: Where does `สร้างรอบจัดส่ง` go?**
A: From Order Detail, admin selects ready lines in `จัดการรอบจัดส่ง` and presses `สร้างรอบจัดส่งจากรายการที่เลือก`; this opens Shipment Builder with those selected lines.

**Q: How does editing work after Order confirmation?**
A: Order Detail is read-first. Light changes can happen from the relevant section, while item changes go to `แก้ไขรายการออเดอร์`, a full-page edit mode with `Review Changes` before save. Existing `JOB-O` production-detail changes go through Job Detail / Job Revision.

## 6.1 Order List - `ออเดอร์ทั้งหมด`

**Q: What should `ออเดอร์ทั้งหมด` contain?**
A: ทุก Order จริงทุกสถานะ รวมถึงที่จัดส่งครบแล้วและยกเลิก แต่ไม่รวม Draft Order.

**Q: What is the default order and date behavior?**
A: เรียงตามวันที่สร้างล่าสุดก่อน, ค่าเริ่มต้นแสดงทั้งหมดไม่จำกัดวันที่, และ filter วันที่ใช้ `วันที่สร้างออเดอร์`.

**Q: What created-date quick filters are needed?**
A: `วันนี้`, `7 วันล่าสุด`, `เดือนนี้`, `เดือนที่แล้ว`, และ `กำหนดช่วงเอง`.

**Q: What status filters are needed?**
A: Order status filters: `ทั้งหมด`, `กำลังดำเนินการ`, `กำลังผลิต`, `พร้อมสร้างรอบจัดส่ง`, `ส่งบางส่วน`, `จัดส่งครบแล้ว`, และ `ยกเลิก`. Shipment filters may include `รอยืนยันการจัดส่ง` separately.

**Q: What can admin search in `ออเดอร์ทั้งหมด`?**
A: เลขออเดอร์, ชื่อลูกค้า, เบอร์ลูกค้าหรือผู้รับ, ชื่อผู้รับ, ที่อยู่/จังหวัด/รหัสไปรษณีย์, Job ID, และชื่อสินค้า/ชื่องาน.

**Q: What columns are confirmed for the main table?**
A: `เลขออเดอร์`, `ชื่อลูกค้า`, `เบอร์โทร`, `รายการสินค้า`, `สถานะการจัดส่ง`, `ยอดรวม`, สัญลักษณ์งานสั่งทำ, `วันที่สร้าง`, และ action.

**Q: Should creator or owner appear as columns?**
A: No. ไม่ต้องมี `ผู้สร้างออเดอร์` หรือ `ผู้รับผิดชอบ` ในตารางหลัก เพื่อลดรายละเอียดซ้ำซ้อน.

**Q: What actions appear in each row?**
A: มีแค่ `เปิดออเดอร์`. แถวตารางเองไม่ใช่ click target หลัก เพื่อลดการกดพลาด. การทำงานอื่นให้เข้าไปทำใน Order Detail.

**Q: How should the product list fit inside a narrow table?**
A: แสดงรายการสินค้าเป็น text สั้น ๆ หนึ่งบรรทัด พร้อม `+N รายการ` เมื่อมีหลายรายการ แล้วใช้ popover ดูรายละเอียดเต็ม.

**Q: What appears in the product popover?**
A: ชื่อรายการ, จำนวน, และราคาต่อบรรทัดเฉพาะคนที่มีสิทธิ์เห็นราคา. ไม่ต้องแสดงน้ำหนัก. ถ้ามีทั้งสินค้าพร้อมส่งและงานสั่งทำ ให้แยกหัวข้อ `สินค้า` และ `งานสั่งทำ`; งานสั่งทำแสดงรายละเอียดสำคัญ เช่น ขนาด สี และกำหนดส่งถ้ามี.

**Q: How should product popovers behave?**
A: Desktop เปิดได้ด้วย hover/click, tablet/mobile ใช้ click. ข้อความยาวให้ wrap ใน popover ที่จำกัดความกว้าง และ popover ปิดอัตโนมัติเมื่อเลื่อนหน้าหรือเปลี่ยนหน้า pagination.

**Q: How should shipment state be shown?**
A: แสดงสรุปสั้นในตารางและเปิด popover เพื่อดูรอบจัดส่ง/tracking หลายรายการ.

**Q: What if the Order has no Shipment round?**
A: แสดง `ยังไม่ได้จัดส่ง` เป็นตัวหนังสือสีแดง.

**Q: What if a Shipment round exists but carrier/tracking is not recorded yet?**
A: ยังแสดง `ยังไม่ได้จัดส่ง` แต่ใช้ตัวหนังสือสีฟ้า และ popover แสดงเลขรอบจัดส่งได้.

**Q: What if tracking exists?**
A: แสดงเป็น `ชื่อขนส่ง : tracking`, เช่น `Kerry : xxxxx`.

**Q: What if there are multiple shipment rounds?**
A: ถ้ายังจัดส่งไม่ครบให้แสดง `จัดส่งยังไม่ครบ` และ popover แสดง tracking ก่อนหน้า. ถ้าจัดส่งครบแล้วให้แสดง tracking ล่าสุดพร้อม `+N รอบ` และ popover แสดงทุก tracking.

**Q: What does `ยอดรวม` mean and who sees it?**
A: คือยอดรวมสุทธิหลังหักส่วนลด ไม่ใช่ยอดค้างชำระ. ผู้ใช้ที่มีสิทธิ์ดูหน้า Order List เห็นยอดนี้ได้ เพราะต้องใช้สรุปรายการและคุยกับลูกค้า.

**Q: How should custom work be signaled?**
A: ใช้สัญลักษณ์ tool/hammer ใกล้ท้ายแถวก่อน `วันที่สร้าง` พร้อม tooltip `มีงานสั่งทำ`; ถ้าไม่มีงานสั่งทำให้เว้นว่าง.

**Q: How should date, cancelled, and completed rows display?**
A: `วันที่สร้าง` ใช้วันที่สั้น เช่น `22 พ.ค. 67`. Order ที่ยกเลิกให้แถวจางลงแต่ยังค้นหา/เปิดดูได้. Order ที่จัดส่งครบแล้วใช้สีหรือ icon ของสถานะพอ ไม่ต้องทำทั้งแถวจาง.

**Q: What top-level actions and empty states are confirmed?**
A: มีปุ่ม `สร้างออเดอร์ใหม่` ด้านบนขวาและไป Order Create/Edit โดยตรง. Empty state จากการค้นหา/filter มีปุ่ม `ล้างตัวกรอง`. ยังไม่ต้องมี export ใน mockup รอบแรก.

**Q: Should filters be remembered?**
A: จำ filter/search เฉพาะระหว่าง session การใช้งานปัจจุบัน ไม่จำถาวรเป็น user preference.

**Q: What pagination pattern should be used?**
A: ทุกตารางหลักในโปรเจคควรมีตัวเลือกจำนวนรายการต่อหน้า, ปุ่ม `ก่อนหน้า` / `ถัดไป`, และเลขหน้า. สำหรับ `ออเดอร์ทั้งหมด` ใช้ตัวเลือก `25 / 50 / 100` และค่าเริ่มต้น `25`.

## 6.2 Order Detail and Order Line Editing

**Q: What is the main mental model for Order Detail?**
A: เป็นหน้า report/read-first ที่รวมข้อมูลทุกอย่างเกี่ยวกับออเดอร์เพื่อดูรายละเอียดและติดตามงาน ไม่ใช่หน้าแก้ไขใหญ่ ไม่ใช่ invoice และไม่ใช่ production dashboard.

**Q: What should the top of Order Detail show?**
A: สรุปสถานะใหญ่ 2 เรื่อง: สถานะออเดอร์และสถานะจัดส่ง. การเงินอยู่ใน section ของตัวเอง ไม่ปนเป็นสถานะหลักบนหัวหน้า.

**Q: Should Order Detail use tabs?**
A: No. เปลี่ยนเป็นหน้าเดียวเรียงลงมาเป็น sections เช่น สรุป, รายการในออเดอร์, จัดการรอบจัดส่ง, รอบจัดส่งที่เกี่ยวข้อง, การชำระเงิน, และประวัติ.

**Q: How should Order items be organized?**
A: แยกกลุ่มตามประเภทรายการก่อน: `สินค้าพร้อมส่ง` และ `งานสั่งทำ`, แล้วแสดงสถานะของแต่ละรายการในแถวนั้น.

**Q: How should delivery recipient/address appear on lines?**
A: ถ้าทุกรายการส่งที่อยู่เดียวกัน ให้แสดงที่อยู่หลักในสรุปออเดอร์และในแถวแสดงเฉพาะสถานะ. ถ้ารายการใดจัดส่งแยกหรือส่งไปผู้รับ/ที่อยู่อื่น ให้แสดงรายละเอียดจัดส่งเฉพาะของรายการนั้น.

**Q: Should `แผนจัดส่ง` be a top summary chip?**
A: No. Order Detail ควรเน้นสถานะใหญ่ว่าออเดอร์เรียบร้อยหรือยังและจัดส่งครบหรือยัง. รายละเอียดส่งรวม/ส่งแยกให้จัดการจากรายการและ section จัดการรอบจัดส่ง.

**Q: When should `แผนจัดส่ง` exist?**
A: มีเฉพาะออเดอร์ที่ผสม `สินค้าพร้อมส่ง` กับ `งานสั่งทำ`. ถ้ามีประเภทเดียวไม่ต้องมี field นี้. ในออเดอร์ผสม `แผนจัดส่ง` ใช้เป็น guard ตอนเลือกสร้างรอบจัดส่ง.

**Q: What are the header actions?**
A: มี `จัดการออเดอร์` ด้านบน และมีปุ่มแก้ไขเฉพาะ section. เมนูด้านบนเป็น shortcut ไป action สำคัญของแต่ละ section.

**Q: What is inside `จัดการออเดอร์`?**
A: `เปิดลูกค้า`, `แก้ไขรายการสินค้า`, `แก้ไขงานสั่งทำ`, `จัดการรอบจัดส่ง`, `เปิดติดตามการเงิน`, และ `ยกเลิกออเดอร์`.

**Q: How should customer/recipient editing be separated?**
A: Customer master/default address changes happen in Customer Detail/Profile. A confirmed Order keeps its own Order Recipient Detail snapshot. Shipment recipient/address changes happen in Shipment Builder/Detail as Shipment snapshots.

**Q: If Order recipient detail changes after a Shipment round was created, what happens?**
A: ไม่กระทบรอบจัดส่งที่สร้างแล้ว. ถ้าต้องแก้รอบจัดส่งที่สร้างแล้ว ให้ไปแก้ในหน้า `รอบจัดส่ง`. Shipment snapshot ไม่แก้ Customer/Order อัตโนมัติ.

**Q: Should Order Detail have both `เปิดลูกค้า` and `แก้ข้อมูลลูกค้าหลัก`?**
A: No. มีแค่ `เปิดลูกค้า`; ถ้าจะแก้ข้อมูลลูกค้าหลัก ให้ไปกดแก้ในหน้า Customer Detail/Profile เอง.

**Q: Can Order recipient detail use the Customer address book?**
A: During Order creation, default to the Customer primary address and allow changing to another saved address or adding a new address.

**Q: If a new address is entered, should it save back to Customer address book?**
A: ให้มี checkbox `บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า`. ไม่บันทึกอัตโนมัติ.

**Q: If an existing Address Entry is selected and edited, what is edited?**
A: แก้เฉพาะข้อมูลในออเดอร์นี้ก่อน ไม่แก้ Address Entry เดิม เว้นแต่ผู้ใช้เลือก `บันทึกกลับไปที่ข้อมูลลูกค้า`.

**Q: If the Order has multiple delivery addresses, where should those edits happen?**
A: This wording is deprecated. Delivery recipient/address changes should be handled in Shipment Builder/Detail once shipment work exists.

**Q: How should shipment creation work from Order Detail?**
A: มี section `จัดการรอบจัดส่ง` ใต้รายการออเดอร์ ให้ติ๊กเลือกรายการที่พร้อมส่ง แล้วกด `สร้างรอบจัดส่งจากรายการที่เลือก`. เลือกหลายรายการคือส่งรวม เลือกบางรายการคือส่งแยก.

**Q: Which shipment lines are selected by default?**
A: ติ๊กเฉพาะรายการที่พร้อมส่งและยังไม่อยู่ในรอบจัดส่งใด ๆ.

**Q: What happens to lines that cannot be selected for shipment?**
A: ยังแสดงใน section นี้แต่ disabled พร้อมเหตุผล เช่น `ยังผลิตไม่เสร็จ`, `อยู่ในรอบจัดส่งแล้ว`, หรือ `ส่งแล้ว`.

**Q: Where does `สร้างรอบจัดส่งจากรายการที่เลือก` go?**
A: ไปหน้า Shipment Builder พร้อมรายการที่เลือกถูกส่งต่อไปแล้ว.

**Q: What should `รอบจัดส่งที่เกี่ยวข้อง` show?**
A: แสดงเลขรอบจัดส่ง, วันที่สร้างรอบ, วันที่ส่งออก, ขนส่ง, tracking, สถานะ, และ action.

**Q: What action should related shipment rows have?**
A: มีแค่ `เปิดรอบจัดส่ง`. การแก้ไข/พิมพ์/ยกเลิกให้ไปทำใน Shipment screens.

**Q: Should there be a separate `งานที่เกี่ยวข้อง` section?**
A: No. เปลี่ยนภาษานี้เป็น `งานสั่งทำ` และไม่ทำ section ซ้ำ. ให้แสดง Job ID และสถานะผลิตอยู่ในแถวรายการงานสั่งทำโดยตรง.

**Q: What should the payment section show?**
A: สรุปเท่านั้น เช่น เงื่อนไขชำระเงิน, ยอดรวม, ยอดรับแล้ว, ยอดค้าง, สถานะติดตาม, และปุ่ม `เปิดติดตามการเงิน`.

**Q: What should history show?**
A: Timeline สั้นเฉพาะเหตุการณ์สำคัญ เช่น สร้างออเดอร์, แก้ไขออเดอร์, สร้างรอบจัดส่ง, ส่งออก, ปิดรอบจัดส่ง, และยกเลิก.

**Q: What happens when an Order is cancelled?**
A: Order Detail เป็น read-only, ซ่อน/disable action ที่สร้างงานต่อ, และปุ่มจัดการด้านบนเปลี่ยนเป็นสถานะ/ป้าย `ยกเลิกแล้ว`.

**Q: What happens when an Order is completed?**
A: ยังแก้ข้อมูลทั่วไปได้ เช่น หมายเหตุหรือข้อมูลลูกค้า/ติดต่อที่ปลอดภัย แต่ห้ามแก้รายการสินค้าและข้อมูลที่กระทบงานหรือการจัดส่ง.

**Q: How should item changes work after confirmation?**
A: `แก้ไขรายการสินค้า` และ `แก้ไขงานสั่งทำ` ไปหน้า/โหมด `แก้ไขรายการออเดอร์` แบบ full page คล้าย Create/Edit แต่เป็น edit mode และมี `Review Changes` ก่อนบันทึก.

**Q: What can be edited when an Order line has no Job/Shipment and has not been sent?**
A: แก้ได้เต็ม เช่น เพิ่ม/ลบ/เปลี่ยนสินค้า, จำนวน, ราคา, และรายละเอียดงานสั่งทำ.

**Q: Can existing `JOB-O` production detail be edited from Order editing?**
A: No. ถ้าต้องเปลี่ยนขนาด สี ลาย หรือรายละเอียดผลิตของ `JOB-O` ที่สร้างแล้ว ให้ไปหน้า Job Detail / Job Revision ของ Job นั้น.

**Q: Can a custom-work line with `JOB-O` be removed from the Order?**
A: ไม่ลบจาก Order Line Edit โดยตรงถ้า `JOB-O` ถูกสร้างแล้ว. ต้องยกเลิกจากฝั่ง Job ก่อนเสมอ ไม่ว่าจะเริ่มผลิตหรือยัง แล้ว Order Detail แสดงสถานะยกเลิกพร้อมเหตุผล.

**Q: Can a ready-stock line already in a Shipment round be edited or removed?**
A: ถ้ายังไม่ส่งออก ต้องเอาออกจากรอบจัดส่งก่อน แล้วจึงแก้/ลบใน `แก้ไขรายการออเดอร์` ได้.

**Q: Can sent-out or completed lines be edited or removed from the Order?**
A: No. ให้ใช้ service/return/adjustment flow ภายหลัง.

**Q: What should Review Changes show?**
A: แสดงเฉพาะรายการที่เปลี่ยน: เพิ่มอะไร, ลบอะไร, แก้อะไร, ผลกระทบต่อยอดรวม/สต๊อก/Job/รอบจัดส่ง และช่องเหตุผล.

**Q: Where does the user go after saving Order line changes?**
A: กลับไป Order Detail ปกติ ไม่ต้องมีแถบสรุปใหญ่ เพราะสรุปผลกระทบดูไปแล้วใน Review Changes ก่อนบันทึก.

### Final Order Detail / Order Line Edit UX decisions

**Q: After confirmation, what does "Order Edit" mean?**
A: ไม่มีหน้าแก้ไขออเดอร์ทั้งหมดหน้าเดียว. Order Detail เป็นหน้ารายงานหลัก และแก้เป็นส่วนๆ: รายการผ่าน `แก้ไขรายการออเดอร์`, รายละเอียดผลิตของ `JOB-O` ผ่าน Job, รอบจัดส่ง/ผู้รับจัดส่งผ่าน Shipment, ข้อมูลลูกค้าหลักผ่าน Customer Detail/Profile, และการเงินผ่าน Financial Follow-up.

**Q: When adding a new custom-work line to a confirmed Order, when is `JOB-O` created?**
A: สร้าง `JOB-O` ตอนกด `บันทึกการแก้ไข` จาก Review Changes ถ้ากรอก `รายละเอียดงานสั่งทำ` ครบแล้ว.

**Q: When adding a ready-stock line to a confirmed Order, when is stock reserved?**
A: จองสต๊อกตอนกด `บันทึกการแก้ไข` จาก Review Changes.

**Q: When removing a safe ready-stock line, when is reserved stock released?**
A: คืนสต๊อกตอนกด `บันทึกการแก้ไข` จาก Review Changes พร้อมเหตุผล/log.

**Q: How should quantity changes affect stock reservation?**
A: Review Changes แสดงผลต่าง แล้วตอนบันทึกระบบปรับยอดจองเพิ่ม/ลดตามจำนวนใหม่.

**Q: Can price/discount be changed after confirmation?**
A: ได้ถ้ายังไม่ปิดออเดอร์และผู้ใช้มีสิทธิ์. Review Changes แสดงยอดรวมใหม่ และหลังบันทึกให้สรุปการเงิน/ยอดค้างชำระอัปเดตตาม.

**Q: When can the whole Order be cancelled?**
A: เฉพาะเมื่อยังไม่มีรายการที่ส่งออกแล้ว และไม่มี `JOB-O` ที่เริ่มผลิตแล้ว. ถ้ามี downstream work แล้วให้จัดการรายรายการ/Job/Shipment ที่เกี่ยวข้องแทน.

**Q: Where should `ยกเลิกออเดอร์` appear?**
A: อยู่ท้ายเมนู `จัดการออเดอร์` เป็น action สีเตือน. ถ้ายกเลิกได้ให้เปิด confirm modal พร้อมเหตุผล; ถ้ายกเลิกไม่ได้ให้ปุ่ม disabled พร้อมเหตุผล ไม่เปิด flow ที่ล้มเหลว.

**Q: How should high-impact post-confirmation edits be permissioned?**
A: ผู้ใช้ที่มีสิทธิ์แก้ Order สามารถแก้ราคา/ส่วนลดและรับทราบ stock warning ได้ผ่าน Review Changes + log. งานที่มีเจ้าของ downstream แล้วต้องไป flow เจ้าของงาน เช่น `JOB-O` ยกเลิกจาก Job และ line ใน Shipment ต้องจัดการ Shipment ก่อน.

**Q: If an Order has both editable and non-editable lines, should the edit button still appear?**
A: ยังแสดง `แก้ไขรายการออเดอร์`; ในหน้า edit ให้รายการที่แก้ไม่ได้เป็น read-only พร้อมเหตุผล เช่น `ส่งออกแล้ว` หรือ `JOB-O เริ่มผลิตแล้ว`.

**Q: Does post-confirmation Order Line Edit have draft or autosave?**
A: No. ถ้าออกตอนมีการแก้ค้าง ให้เตือนด้วย modal `อยู่ต่อ` / `ออกโดยไม่บันทึก`.

**Q: What buttons should Review Changes have?**
A: `กลับไปแก้ไข`, `บันทึกการแก้ไข`, และ `ยกเลิก`. ถ้าออกตอนมีการแก้ค้างให้เตือนอีกครั้ง.

**Q: If the admin needs to split shipment, where is it handled?**
A: ไม่ต้องทำเป็น flow เปลี่ยนแผนหนักอีกชุด. ใช้ checkbox เลือกรายการพร้อมส่งใน section `จัดการรอบจัดส่ง`; เลือกหลายรายการคือส่งรวม เลือกบางรายการคือส่งแยก.

**Q: Where is line-specific delivery detail edited?**
A: เมื่อสร้างหรือมีรอบจัดส่งแล้ว ให้แก้ใน Shipment Builder/Detail เป็น snapshot ของรอบจัดส่งนั้น.

**Q: What recipient/address does a new Shipment round start from?**
A: ใช้ Order Recipient Detail snapshot ของออเดอร์เป็นค่าเริ่มต้นของรอบจัดส่งใหม่ แล้วผู้ใช้สามารถกรอกผู้รับ/ที่อยู่เฉพาะรอบจัดส่งใน Shipment Builder ได้. การแก้ Customer Detail ภายหลังไม่เปลี่ยน snapshot ของออเดอร์เก่า.

**Q: What feedback appears after saving Review Changes?**
A: กลับ Order Detail พร้อม toast/แถบสั้นๆ ว่า `บันทึกการแก้ไขแล้ว` และ highlight section ที่เปลี่ยนเล็กน้อย.

**Q: Should Order Detail show edit reasons?**
A: แสดงแบบสั้นใน `ประวัติ` เช่น `แก้ไขรายการออเดอร์ - เหตุผล: ลูกค้าเปลี่ยนจำนวน`; รายละเอียดเต็มอยู่ใน log/audit.

**Q: When is an edit reason required?**
A: บังคับเมื่อลบรายการ, ยกเลิก/ปิด `JOB-O`, หรือกระทบ Job/Shipment ที่มีอยู่แล้ว. การรับทราบ stock-negative ให้ log ไว้แต่ไม่ต้องใช้เหตุผลพิเศษ. ยอดรวมเปลี่ยนไม่ต้องบังคับเหตุผลเองถ้าผู้ใช้มีสิทธิ์แก้ราคา/ยอดอยู่แล้ว.

**Q: If shipment is complete but payment is still outstanding, what should the header show?**
A: Header ยังแสดง operational/shipment state เช่น `จัดส่งครบแล้ว`; เงินค้างอยู่ใน section การชำระเงินแยกกัน.

**Q: What should Order Detail / Order Line Edit explicitly forbid?**
A: ห้ามแก้หรือลบสิ่งที่ส่งออกแล้วจาก Order Line Edit โดยตรง, ห้ามแก้รายละเอียดผลิตของ `JOB-O` จาก Order Line Edit, ห้าม autosave/draft edit หลังยืนยันออเดอร์, และห้ามสร้างรอบจัดส่งจาก header โดยไม่เลือก lines.

### Final Order Functional Readiness Decisions

**Q: How are `สถานะออเดอร์` and `สถานะการจัดส่ง` separated?**
A: `สถานะออเดอร์` is calculated from active Order Lines. `สถานะการจัดส่ง` summarizes Shipment rounds/tracking. `รอยืนยันการจัดส่ง` belongs to Shipment, not Order.

**Q: When is an Order `ส่งบางส่วน`?**
A: เมื่อมีอย่างน้อยหนึ่ง active deliverable line จบบันทึกการจัดส่งแล้วจริง พร้อม tracking/evidence และยังมี active line อื่นที่ยังไม่จบ.

**Q: When is an Order `จัดส่งครบแล้ว`?**
A: เมื่อ active deliverable lines ทั้งหมดจบบันทึกการจัดส่งแล้ว พร้อม tracking/evidence. Payment/Financial Follow-up ไม่เปลี่ยนสถานะนี้.

**Q: When is an Order `พร้อมสร้างรอบจัดส่ง`?**
A: เมื่อมี active line อย่างน้อยหนึ่งรายการพร้อมส่งและยังไม่อยู่ใน Shipment round เช่น ready-stock ที่ยืนยันแล้ว หรือ `JOB-O` ที่ผลิตเสร็จแล้ว.

**Q: If some lines are shipped and other lines still producing, what is the Order status?**
A: `ส่งบางส่วน`.

**Q: How should stock-insufficient Orders behave after acknowledgement?**
A: Flow ดำเนินต่อได้ตามปกติ. Stock เป็น report/warning ไม่ใช่ตัว block operation หลังผู้มีสิทธิ์รับทราบ; อาจแสดง warning ใน Order Detail, Shipment Builder, Stock view และ text/icon สั้นใน Order List.

**Q: What happens when creating Shipment for stock-negative ready-stock lines?**
A: เปิด Shipment Builder ได้ แต่แสดง acknowledgement modal เช่น `รับทราบและสร้างรอบจัดส่งต่อ` / `กลับไปตรวจสต๊อก`. ไม่ต้อง Manager approve หรือ reason แต่ควร log การรับทราบ.

**Q: Who can acknowledge stock shortage?**
A: ผู้ใช้ที่มีสิทธิ์สร้าง/ยืนยัน/แก้ Order ใน flow นั้น.

**Q: How should Order total edits handle Payment/COD records?**
A: ถ้าแก้ราคา/ส่วนลด/ยอดรวมแล้วมี Payment/COD records เกี่ยวข้อง ต้อง reconcile ยอดขายกับหลักฐานการเงิน/adjustment note ให้ตรงก่อนบันทึก. ถ้ายอดไม่ตรง `บันทึกการแก้ไข` ต้อง disabled.

**Q: What does Review Changes show when financial totals do not match?**
A: แสดง blocking panel `ตรวจยอดการเงิน` พร้อมปุ่มเปิด modal/drawer เพื่อเพิ่ม Payment Record, บันทึก COD ที่ต้องเก็บ, หรือบันทึก adjustment/refund/credit note จนยอดตรง.

**Q: Does refund/credit change Order status?**
A: No. Refund/credit เป็น note/financial follow-up/customer record ใน first scope. Order ที่จบแล้วไม่ถูกเปิดใหม่เพราะมี refund/credit.

**Q: Does cancelling an Order with Payment Record block cancellation?**
A: No. Payment Record ไม่ block การยกเลิก Order. แสดง note ใน Payment/Financial section ว่าอาจต้องติดตามคืนเงิน/เครดิตภายหลัง และเก็บ Payment Record เดิมไว้.

**Q: Can ready-stock lines in a Shipment round be edited or removed from Order Line Edit?**
A: No. ต้องเอาออกจากรอบจัดส่งหรือยกเลิกรอบจัดส่งก่อน ไม่ว่าจะเป็น Draft หรือ Released Shipment. ถ้ายกเลิกรอบแล้ว line ยัง active และพร้อมส่ง จะกลับไป `พร้อมสร้างรอบจัดส่ง`.

**Q: Can sent/completed lines be edited or removed?**
A: No. ใช้ service/return/adjustment flow ในอนาคต.

**Q: Can a new ready-stock line be added after some Shipment rounds are closed?**
A: ทำได้ถ้า Order ยังไม่ `จัดส่งครบแล้ว`. รายการใหม่รอสร้างรอบจัดส่งใหม่. ถ้า Order `จัดส่งครบแล้ว` แล้ว ลูกค้าขอเพิ่มสินค้า ให้สร้าง Order ใหม่.

**Q: How is an existing `JOB-O` cancelled from Order context?**
A: ถ้า `JOB-O` ถูกสร้างแล้ว ต้องยกเลิกจากฝั่ง Job ก่อนเสมอ ไม่ว่าจะเริ่มผลิตหรือยัง. Order Detail แสดง custom line นั้นเป็น `ยกเลิกงานสั่งทำ` พร้อมเหตุผล.

**Q: Does Job cancellation automatically change Order total?**
A: No. Job cancellation only changes production/work state. Admin must adjust Order/financial totals through Order Line Edit / Review Changes / Financial Reconciliation when needed.

**Q: Do cancelled lines remain visible?**
A: Yes. Order Detail shows them under `รายการที่ยกเลิกแล้ว` with reason/user/time. They do not count in active item count, active total, Order List product popover, or shipment selection.

**Q: What happens if the last active line is cancelled and nothing has shipped?**
A: ระบบต้องยืนยันด้วย modal ว่าการยกเลิกรายการสุดท้ายนี้เท่ากับยกเลิก Order ทั้งใบ พร้อมเหตุผล/log.

**Q: What happens if some lines shipped and all remaining lines are cancelled?**
A: Order becomes `จัดส่งครบแล้ว`; cancelled lines remain history.

## 7. Payment and Finance Follow-up

**Q: Should Payment Term and Payment Record be separate?**
A: Yes. Payment Term คือข้อตกลง, Payment Record คือเงินเข้าจริง.

**Q: Should payment audit block work?**
A: No. Audit is management layer and separate.

**Q: Where does COD belong?**
A: COD amount can be set on Shipment while Payment Term stays on Order.

**Q: Should system suggest COD amount?**
A: Yes. Suggest remaining amount but admin can edit.

**Q: What if COD exceeds expected amount?**
A: Warn and require note, but do not necessarily block.

**Q: What happens when Order is cancelled after payment?**
A: Keep payment history and create Financial Adjustment: refund, retained deposit, customer credit, or pending decision.

**Q: Is Order Completion tied to payment confirmation?**
A: No. Order Completion is shipment closure; financial follow-up remains separate.

## 8. Order Line Changes

**Q: Can Order Line be edited before Job/Shipment exists?**
A: Yes. If the line has no Job, Shipment, or sent-out state, it can be edited fully inside `แก้ไขรายการออเดอร์`, with Review Changes and log.

**Q: Can Order Line be overwritten after Job/Shipment exists?**
A: No. Existing downstream work must be respected. `JOB-O` production-detail changes go through Job Detail / Revision; ready-stock lines already in a Shipment round must be removed from that round before editing; sent/completed lines use service/return/adjustment flow later.

**Q: How are price differences handled after replacement?**
A: Use Financial Adjustment.

**Q: If a produced item is cancelled, should stock update automatically?**
A: No. Authorized users decide manually, often through stock adjustment or later SKU/stock handling.

## 9. Job Workflow

**Q: What does one customer Job represent?**
A: One custom work unit that should complete together.

**Q: Can customer Job partially complete or partially ship?**
A: No. Use one job one done. If it needs separate shipment, split Jobs at entry.

**Q: Can one Job have multiple pieces?**
A: Yes, if they move and finish together.

**Q: What should happen if Job details change after workshop accepts work?**
A: Affected department receives Job Revision Notification.

**Q: What can worker do on revision?**
A: Choose `รับทราบ` or `ไม่เข้าใจให้ติดต่อหา`.

**Q: Should revision history be visible?**
A: Yes, but collapsed/hidden by default to avoid clutter.

**Q: Is Order internal note the same as Job note?**
A: No. Job note affects production; Order note is internal/admin-level.

**Q: Can Job be held?**
A: Yes, Hold is Job-level pause.

**Q: Is waiting for materials the same as Hold?**
A: No. `รอวัตถุดิบ` is department blocker.

## 10. Production Queue and Aging

**Q: What should management overview answer?**
A: งานไหนยังไม่เสร็จ, อยู่แผนกไหน, ด่วนไหม, ค้างนานไหม, ใกล้วันจัดส่งไหม.

**Q: Should unfinished work include both JOB-O and JOB-P?**
A: Yes, with labels and toggle all/customer/production.

**Q: What age metrics are needed?**
A: Total Job age from Job creation and department age from department intake.

**Q: Are aging thresholds fixed?**
A: No. Configurable, example 15/30/60 days.

**Q: How should unfinished jobs be sorted?**
A: Urgent first, nearest delivery date, oldest total age, longest department age.

**Q: Should Job Detail have timeline?**
A: Yes. Manager/admin see full timeline; workers see limited timeline.

## 11. Woodwork Department

**Q: What is the main Woodwork screen?**
A: `งานที่ต้องทำ`.

**Q: Should Woodwork have many filters?**
A: No. Simple list.

**Q: How is urgent work shown?**
A: Color/icon such as yellow and lightning.

**Q: What happens when Woodwork sends work onward?**
A: It leaves Woodwork active list.

**Q: Does Woodwork have history?**
A: Yes, `ประวัติงานของฉัน` as secondary screen.

**Q: What Woodwork actions are confirmed?**
A: `รับงาน`, `รอวัตถุดิบ`, `ส่งไปสี`, `ส่งไปรักสมุก`, `กำลังส่งไปแกะสลัก`.

## 12. Coloring Department

**Q: Does Coloring use same simple pattern as Woodwork?**
A: Yes.

**Q: What is Coloring main screen?**
A: `งานที่ต้องทำ`.

**Q: What secondary section is needed?**
A: `รอรับเข้าโรงงานสี`.

**Q: When does work enter active Coloring Queue?**
A: When Coloring confirms `รับเข้าโรงงานสี`.

**Q: Who can confirm intake?**
A: Coloring/head of Coloring; higher permission can act on behalf with log.

**Q: What happens when Coloring marks Order Job ready?**
A: It goes to admin `รอสร้าง Shipment`, not delivery dashboard.

## 13. Rak Samuk Outsource

**Q: Which outsource flow is first automated?**
A: Rak Samuk only.

**Q: Are crystal, gold leaf, carving, special decoration automated first?**
A: No. Keep as future/note/manual expense first.

**Q: Does Rak Samuk Worker have user login?**
A: Yes, to see own work and reduce questions.

**Q: Can Rak Samuk Worker move workflow?**
A: No.

**Q: Can Rak Samuk Worker mark work done?**
A: No.

**Q: Can Rak Samuk Worker see customer data or Order ID?**
A: No.

**Q: Can Rak Samuk Worker see own price?**
A: Yes, limited to own work.

**Q: Can internal workshop/delivery staff see Rak Samuk price?**
A: No, unless finance permission.

**Q: When can Rak Samuk Worker propose price?**
A: Only when item has no standard rate and shows `ไม่มีราคา / ให้แจ้งราคา`.

**Q: If standard rate exists, can worker request price change in system?**
A: No. If they want higher rate, discuss outside chat; finance user edits during payout if accepted.

**Q: Where is Rak Samuk standard rate stored?**
A: Product Model (SKU ใหญ่).

**Q: What if approved paid rate differs from standard rate?**
A: After PV process, approver chooses whether to update standard rate.

**Q: Does standard rate change affect old work?**
A: No. Only future work.

**Q: What happens to custom job Rak Samuk cost?**
A: Stored as Job cost history visible only to finance permission; no standard rate update.

**Q: Does Rak Samuk have deadline?**
A: No, but urgent label can show.

**Q: Can one customer Job be split to multiple Rak Samuk workers?**
A: No in first scope.

**Q: How should large production quantities be handled?**
A: Split Production Lots, not one huge Job.

## 14. Production

**Q: Is Production separate from Order?**
A: Yes.

**Q: Why Production Batch + Lot?**
A: Large production quantity can be split by actual routing, outsource, receiving, payout, and stock receipt.

**Q: Can Production use same Job card shape?**
A: Yes, if it needs custom instructions, but with clear `JOB-P` and `ผลิตเข้าสต๊อก` label.

**Q: What happens to JOB-P tied to SKU when done?**
A: Goes to `รอรับเข้าสต๊อก`.

**Q: What happens to JOB-P custom/prototype not tied to SKU?**
A: It can simply become Done.

**Q: Is there a separate Custom Product entity?**
A: No. Job itself carries custom details. SKU may reference Job for traceability only.

## 15. Product, SKU, and Masters

**Q: What is Product Model?**
A: SKU ใหญ่ / parent product design family.

**Q: What is SKU Variant?**
A: SKU ย่อย / concrete sellable-stockable version, usually by color.

**Q: Does color split SKU Variant?**
A: Yes.

**Q: Does size split variant?**
A: Usually no. Size belongs to Product Model or new SKU if materially different.

**Q: Can SKU reference Job?**
A: Yes, optional lookup reference only.

**Q: Does referencing Job copy data/images into SKU?**
A: No.

**Q: Can one Job create/source many SKUs?**
A: Yes. It is source reference only.

**Q: Can SKU be deactivated with stock remaining?**
A: No. Clear stock first.

**Q: Can deactivated SKU reopen?**
A: Yes, by permission with log.

**Q: Which masters are in first scope?**
A: Category/Subcategory, Product Tag, Color Master, Rak Samuk Pattern Master, Carving Pattern Master, Crystal Color Master.

**Q: Is Material Master in first scope?**
A: No.

**Q: Are sales description and production description separate first?**
A: No.

## 16. Images and Review Album

**Q: Is there a central media library first?**
A: No.

**Q: How are old 50,000 images handled?**
A: Users upload selected images into the relevant context themselves.

**Q: Which SKU image groups exist?**
A: รูปหลัก, รูปเพิ่มเติม, รูปสำหรับช่างไม้, รูปสำหรับฝ่ายสี/ตกแต่ง, รูปสำหรับรักสมุก, รูปรีวิว via Review Album.

**Q: Does delivery need a separate SKU image group?**
A: No. Delivery needs main image, quantity, item list.

**Q: Should images support drag & drop?**
A: Yes.

**Q: Should mobile upload/camera attachment work?**
A: Yes.

**Q: Should images be compressed?**
A: Good if possible, but do not sacrifice quality.

**Q: What is Review Album?**
A: A review image collection, separate from product images and CRM images.

**Q: Can Review Album link to many SKUs?**
A: Yes, zero or many.

**Q: Can Review Album link to Customer/Order?**
A: Yes, optional.

**Q: Does Review Album need publish/private status first?**
A: No. It is internal review library first.

## 17. Customer and CRM

**Q: Must Customer have phone?**
A: Yes.

**Q: Can Customer have multiple phone numbers?**
A: Yes.

**Q: Can Customer have multiple addresses?**
A: Yes, address list with one default.

**Q: Does Address Entry have recipient name and phone?**
A: Yes.

**Q: If new address is added during Order, save it?**
A: During initial Order creation, yes, auto-save to customer address list. During confirmed Order recipient edit, save back only when the user explicitly selects the save-to-customer checkbox.

**Q: Does Shipment snapshot address?**
A: Yes.

**Q: Should customer search include recipient phone/address?**
A: Yes.

**Q: Is customer merge in first scope?**
A: No.

**Q: What sections are on Customer page?**
A: CRM Note Timeline, Order History, Service Case History, Address / Recipient History.

**Q: Does CRM Note auto-create from orders?**
A: No. User creates manually.

**Q: Can CRM Note attach images?**
A: Yes.

**Q: Are CRM Note images part of review/product images?**
A: No.

**Q: Are Customer Tags included?**
A: Yes, public and private.

**Q: Are Customer Tiers included?**
A: No.

**Q: Are wholesale rules included?**
A: No.

## 18. Shipment and Delivery

**Q: Who creates Shipment?**
A: Admin.

**Q: Can delivery team create/split Shipment?**
A: No.

**Q: Is Draft Shipment allowed?**
A: Yes, if admin not ready to release. Default can release immediately.

**Q: What happens to items inside Draft Shipment?**
A: Not shipped, not complete, but marked as being prepared to prevent duplicate Shipment.

**Q: What documents does Shipment create?**
A: Delivery Note and Shipping Sheet together.

**Q: Can print only one document?**
A: Yes, both or either.

**Q: Does Delivery Note show price?**
A: No.

**Q: Does Delivery Note show item image?**
A: Yes, small image if available.

**Q: What does Shipping Sheet focus on?**
A: Recipient, address, phone, carrier, and short item summary.

**Q: Is A4 enough first?**
A: Yes. Label/QR/barcode later.

**Q: What is admin ready-to-ship queue?**
A: `รายการรอจัดส่ง/รอสร้างใบส่งของ`, showing Orders to prepare Shipment.

**Q: Does ready-to-ship queue need many filters?**
A: No. Simple central search.

**Q: Is there Hold in ready-to-ship queue?**
A: No. If not ready, it stays there.

**Q: When is bulk shipment allowed?**
A: Simple Orders without Jobs; one Order one Shipment. Service Case can be included if details complete.

**Q: Does COD block bulk?**
A: No, show badge.

**Q: What are delivery team tabs?**
A: `รายการต้องจัดส่งวันนี้` and `รายการรอวันจัดส่ง`.

**Q: Where does no-date Shipment go?**
A: Today's tab.

**Q: Does first scope need overdue delivery logic?**
A: No.

**Q: What can delivery team do?**
A: View, attach required evidence, mark sent, add short note.

**Q: What can't delivery team do?**
A: Change items, address, carrier, COD, or close Shipment.

**Q: Who closes Shipment?**
A: Admin/shared admin role after evidence/tracking review.

## 19. Delivery Date

**Q: Should Order have main delivery date?**
A: Optional main delivery date for UX simplicity.

**Q: Can item/shipment date differ?**
A: Yes for special cases.

**Q: Does Job with delivery date show to departments?**
A: Yes.

**Q: Should custom Job without done appear in delivery dashboard?**
A: No.

## 20. Service Case

**Q: Does Service Case reopen original Order?**
A: No.

**Q: Does Service Case create repair Job first scope?**
A: No. Repair work handled internally first.

**Q: Can Service Case create Shipment?**
A: Yes, Service Shipment for sending back.

**Q: Does Service Shipment affect original Order Completion or sales?**
A: No.

**Q: What payment modes for Service Case?**
A: ฟรี, มีค่าใช้จ่าย, รอตัดสินใจ. Default often free.

**Q: What Service Case statuses are discussed?**
A: รอรับของกลับ, รับของกลับแล้ว, กำลังแก้ไข/ซ่อม, พร้อมส่งกลับ, ส่งกลับแล้ว, ปิดเคส.

## 21. Stock

**Q: How many warehouses first?**
A: One warehouse concept first, even if real locations differ.

**Q: Are all items counted?**
A: No. Some counted, some not counted.

**Q: When ready-stock Order is created, what happens?**
A: Stock is reserved.

**Q: Can over-reservation be allowed?**
A: Yes, through acknowledgement by a user with Order create/edit permission. Stock is reporting/warning, not an operational blocker after acknowledgement; shortage may stay negative and visible.

**Q: Does Shipment cancellation auto-return stock?**
A: Avoid risky automatic return; use Stock Adjustment with reason if needed.

**Q: Should Stock Count exist?**
A: Yes, weekly/biweekly, mobile-friendly, image-heavy.

**Q: Should smart cycle count exist?**
A: It can suggest active/moving and positive-stock items.

**Q: Are Stock and Expense linked automatically?**
A: No. Separate systems.

## 22. Expense

**Q: What is Expense Entry for?**
A: Simple business expense tracking and evidence storage, not full accounting.

**Q: Does Expense need approval flow?**
A: No.

**Q: Are categories fixed?**
A: No, user-defined.

**Q: Can Expense have multiple line items?**
A: Yes, optional.

**Q: Can Expense attach evidence?**
A: Yes.

**Q: Can Expense edit later?**
A: Yes, by permission with log.

**Q: Can Expense cancel/delete?**
A: Cancel but not delete.

**Q: Can Expense export?**
A: Yes, Excel/CSV.

**Q: Which date is used for reporting?**
A: Actual payment date.

## 23. Payment Voucher

**Q: What is PV used for first?**
A: General document type, with first automated flow for Rak Samuk payout.

**Q: When is PV number issued?**
A: After payment is confirmed.

**Q: What is PV number pattern?**
A: Buddhist year/month running, e.g. `PV-2568-03-004`.

**Q: What sample form style?**
A: Similar to existing A4 Payment Voucher PDF.

**Q: What signature roles?**
A: ผู้จัดทำ, ผู้อนุมัติ, ผู้จ่ายเงิน, ผู้รับเงิน.

**Q: Which signatures are digital?**
A: ผู้จัดทำ/ผู้อนุมัติ/ผู้จ่ายเงิน can be digital. ผู้รับเงิน signs printed document.

**Q: Can one person hold multiple internal roles?**
A: Yes in first scope.

**Q: Is exact Rak Samuk PV line-item layout decided?**
A: No, deferred intentionally.

## 24. Reports

**Q: Are reports accounting statements?**
A: No, first-scope management summaries.

**Q: What sales report basis?**
A: Default by Order creation date.

**Q: What delivery report basis?**
A: Shipment/Order closed date.

**Q: What expense report basis?**
A: Actual payment date.

**Q: Is sales channel reporting included?**
A: No first scope; structure may support future funnel/channel category.

**Q: Is profit per bill included?**
A: No. Use rough view sales minus expenses only.

## 25. Printing and Documents

**Q: What printable docs are first scope?**
A: Delivery Note, Shipping Sheet, Payment Voucher.

**Q: Are tax invoice and quotation first scope?**
A: No.

**Q: Is label printer/QR/barcode first scope?**
A: No, future phase.

## 26. Deferred Items

**Q: Which items were intentionally deferred?**
A: PV line-item detail, full accounting, tax, quotation, channel analytics, payroll, Material Master, supplier deep management, BOM/costing, QC, media library, customer merge, carrier API, wholesale pricing.

## 27. Current UX Q&A Status

**Q: Has UX/UI Question 1 been resolved?**
A: Yes. The first screen is `Admin Dashboard`.

**Q: What was the next UX question proposed?**
A: Whether Admin Dashboard should be cards/counts first, then click into queues.

**Q: Has UX/UI Question 2 been answered?**
A: Not yet at the time this summary was created.
