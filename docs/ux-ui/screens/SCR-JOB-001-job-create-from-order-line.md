# SCR-JOB-001 — Embedded Custom Work Detail

## 1. Purpose

This spec is retained as the detailed pattern for `รายละเอียดงานสั่งทำ` inside Order Create/Edit. Customer custom work no longer uses a separate post-confirmation `สร้างงานสั่งทำ` screen; complete custom-work details entered here become `JOB-O / งานลูกค้า` immediately when the Order is confirmed.

## 2. Primary Users

- Admin
- Sales/admin user with Order creation permission
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Fill each custom Order Line with enough production detail to create `JOB-O`.
- Make the future Job source clear as `JOB-O / งานลูกค้า`.
- Add production instructions and department images before Order Review.
- Check quantity, delivery date, urgency, and payment context where useful.
- Avoid sending incomplete or confusing work to Woodwork/Coloring/Rak Samuk.

## 4. Entry Points

- Order Create/Edit -> `เพิ่มงานสั่งทำ`.
- Existing saved Draft Order -> custom Order Line -> `รายละเอียดงานสั่งทำ`.
- Order Line Edit may show existing `JOB-O` custom-work detail as read-only after confirmation and route production changes to Job Detail / Job Revision.

## 5. Exit Points

- Order Review.
- Order Create/Edit line summary.
- Job Detail / Job Revision after the Order is already confirmed.

## 6. Layout Structure

- Embedded section title: `รายละเอียดงานสั่งทำ`.
- Source preview chip: `จะสร้าง JOB-O / งานลูกค้า` while still in Order entry.
- Source line summary: product/work name, quantity, price, delivery date if relevant.
- Main detail cards: work detail, main image, woodwork instructions, coloring/decorating instructions, Rak Samuk instructions where relevant.
- Right or inline readiness checklist: required custom-work detail and image completeness.
- No separate `สร้างงานสั่งทำ` confirmation modal in the Order workflow.

## 7. Main Components

- Future source badge: `JOB-O / งานลูกค้า`
- Custom Order Line reference panel
- Custom work instruction form
- Quantity display/input where allowed by order-entry state
- Delivery date display/input
- Department image group uploader
- Urgent Label control where allowed
- Required detail checklist
- Return to Order Review action through the parent Order Create/Edit screen

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Future Job source | ประเภทงานหลังยืนยัน | JOB-O / งานลูกค้า | Job Source Type preview | Preview only until Order confirmation. |
| Work name | ชื่องาน | ตู้โชว์ไม้สักแกะลาย | Order Line / Custom Work Detail | Main work identity. |
| Quantity | จำนวน | 1 ชิ้น | Order Line / Custom Work Detail | Customer Job should finish together. |
| Main image | รูปหลัก | Cabinet front image | Custom Work Detail | Helps departments identify work. |
| Woodwork images | รูปสำหรับช่างไม้ | Joinery reference image | Department Instruction Images | Department-specific instructions. |
| Coloring images | รูปสำหรับฝ่ายสี/ตกแต่ง | Dark oak color sample | Department Instruction Images | Department-specific instructions. |
| Rak Samuk images | รูปสำหรับรักสมุก | Floral pattern reference | Department Instruction Images | Used if sent to Rak Samuk. |
| Delivery date | วันจัดส่ง | 20 พ.ค. 2569 | Order / Order Line | Relevant for priority. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Set by authorized admin/manager. |
| Payment context | การชำระเงิน | ยังไม่มีรายการรับเงิน | Payment Term / Payment Record | Context only; not a `JOB-O` creation gate. |
| Production note | หมายเหตุงาน | ลูกค้าขอสีโอ๊คเข้มกว่าตัวอย่าง | Custom Work Detail | Becomes Job note after confirmation. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Add instruction image | เพิ่มรูปงาน | Admin / permitted sales | Adds image to selected instruction group. | No |
| Add work note | เพิ่มหมายเหตุงาน | Admin / permitted sales | Adds production-facing detail. | No |
| Set urgent | ตั้งงานด่วน | Authorized admin/manager | Adds Urgent Label. | No |
| Continue to Review | สร้างออเดอร์ | Admin / permitted sales | Parent Order Create/Edit opens Order Review when all required data is ready. | No |
| Open Job Revision | เปิด Job เพื่อแก้ไข / สร้าง Revision | Admin / higher permission | Used only after `JOB-O` already exists. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Future source Order | จะสร้าง JOB-O | Custom line will create customer Job at confirmation. | Pair with `งานลูกค้า`. |
| Ready for Review | พร้อมตรวจสอบ | Enough detail appears available for Order Review. | Positive but not confirmed. |
| Missing detail | ข้อมูลงานยังไม่ครบ | Required production detail is missing. | Blocking before Review/confirmation. |
| Urgent | งานด่วน | Priority label set by authorized user. | Yellow/high-attention chip. |

## 11. Empty State

If instruction image groups are empty, show `ยังไม่มีรูปงาน` with action `เพิ่มรูปงาน`. If work note is empty, show `ยังไม่มีหมายเหตุงาน`. The section itself appears only after a custom Order Line exists.

## 12. Error State

- Missing required detail: show field-level errors and readiness warning.
- Permission fails: `ไม่มีสิทธิ์แก้ไขรายละเอียดงานสั่งทำ`.
- Missing Payment Record: may be shown as financial context, but do not block `JOB-O` creation.
- Existing `JOB-O` after confirmation: disable direct production editing here and show `เปิด Job เพื่อแก้ไข / สร้าง Revision`.

## 13. Permission Rules

- Admin / permitted sales can fill Custom Work Detail before confirmation.
- Creating `JOB-O` does not require Payment Record or payment override.
- Finance-sensitive payment detail should be permission-aware.
- Urgent Label can be set or changed only by authorized admin/manager.
- After confirmation, the resulting `JOB-O` must show code and readable label so departments are not confused.

## 14. UX Notes for Designer

- Use the visible Thai section label `รายละเอียดงานสั่งทำ`, not `ร่าง Job`.
- Make `จะสร้าง JOB-O / งานลูกค้า` clear as a preview, but do not show a real Job ID before confirmation.
- Show source Order Line context, but keep production instructions as the main task.
- Use grouped image areas that match department needs: main, woodwork, coloring/decorating, Rak Samuk.
- Do not introduce a separate `รอสร้าง Job` queue for customer custom work.
- Use a realistic furniture example: custom teak cabinet, dark oak color, floral Rak Samuk pattern, one-piece quantity.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-JOB-001-job-create-from-order-line.md` as the image generation prompt source, but regenerate it as an embedded `รายละเอียดงานสั่งทำ` section rather than a separate post-confirmation page.

## 16. Open UX Questions

- None blocking for the next Order screen pass.
