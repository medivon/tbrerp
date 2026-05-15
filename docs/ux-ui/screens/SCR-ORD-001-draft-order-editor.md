# SCR-ORD-001 — Order Create/Edit

Approved mockup:

- `docs/ux-ui/mockups/SCR-ORD-001-draft-order-editor/SCR-ORD-001-approved.png`

## 1. Purpose

Order Create/Edit lets admin or permitted sales users enter the information needed to create a real Order: Customer, Address Entry, ready-stock lines, custom-work lines, Payment Term, optional Payment Record, conditional shipment plan for mixed Orders, and `รายละเอียดงานสั่งทำ`.

This screen can be used for a new Order Entry Session or for an existing saved Draft Order. A persistent Draft No. exists only after the user explicitly saves the work as a Draft Order.

## 2. Primary Users

- Admin
- Sales/admin user with Order creation permission
- Draft creator
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Select or create Customer before adding Order Lines.
- Capture ready-stock and custom-work items without creating real operational work too early.
- Enter enough custom-work detail to create `JOB-O` immediately after Order confirmation.
- See stock-insufficient warnings without reserving stock before confirmation.
- Save unfinished work as Draft Order only when intended.
- Continue to Review before issuing a real Order ID.

## 4. Entry Points

- Order page -> `สร้างออเดอร์`.
- `ร่างออเดอร์` tab -> existing saved Draft Order.

## 5. Exit Points

- Order Review / Create Order.
- `ร่างออเดอร์` tab after `บันทึกร่าง` or `ออกและบันทึก`.
- Customer Detail or Address Entry select/create when allowed.

## 6. Layout Structure

- Header: page title `สร้างออเดอร์`, status, owner where relevant, and action buttons.
- If editing a saved Draft Order, show Draft No.; if creating unsaved work, do not show Draft No.
- Left/main content: sections for Customer, Address Entry, Order Lines, Payment, Shipment Plan, Custom Work Detail, and Review readiness.
- Right sticky summary panel: completeness, item count, total summary if allowed, warnings, and next action readiness.
- Order Line area: separate actions `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ`.
- Custom-work details are shown as `รายละเอียดงานสั่งทำ` under the custom line, not as `ร่าง Job`.
- Exit-warning modal appears only when there are unsaved changes.

## 7. Main Components

- Order entry header
- Customer selector
- Address Entry selector
- Ready-stock line editor
- Custom-work line editor
- `รายละเอียดงานสั่งทำ` section
- Shipment intent note only when mixed line types exist: default `ส่งพร้อมกัน`; actual split shipment is handled later by selecting ready lines during Shipment creation
- Price input
- Payment Term selector
- Optional Payment Record form
- Completeness / warning summary
- Save draft action
- Create Order action
- Unsaved changes modal

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Draft No. | เลขร่าง | DRAFT-00034 | Draft Order | Show only after saved as Draft Order. Not shown for unsaved new entry. |
| Entry status | สถานะ | กำลังกรอก | Order Entry / Draft Order | Must not look like a confirmed Order. |
| Owner | ผู้รับผิดชอบหลัก | แอดมินแพร | Owner | Same/higher permission can continue saved drafts. |
| Customer | ลูกค้า | คุณมาลี | Customer | Must be selected or created before items. |
| Customer phone | เบอร์ลูกค้า | 081-234-5678 | Customer | Customer phone is required in confirmed CRM rules. |
| Recipient | ผู้รับสินค้า | คุณภพ | Address Entry | Recipient can differ from Customer. |
| Address | ที่อยู่จัดส่ง | 99/12 ถ.เจริญกรุง กรุงเทพฯ | Address Entry / Order Recipient Detail | Becomes the Order recipient snapshot after confirmation; save back to Customer only when explicitly checked. |
| Ready-stock line | สินค้าพร้อมส่ง | เก้าอี้ไม้สักสีธรรมชาติ | Order Line | Reserves stock only after Order confirmation. |
| Custom line | งานสั่งทำ | ตู้โชว์ไม้สักแกะลาย | Order Line | Creates `JOB-O` only after Order confirmation. |
| Shipment intent | แผนจัดส่ง | ส่งพร้อมกัน | Order Shipment Plan | Shown only when Order mixes ready-stock and custom work; not a split-shipment action. |
| Quantity | จำนวน | 1 ชิ้น | Order Line | Custom Job should move and finish together. |
| Price | ราคา | 38,000 บาท | Order Line | Show by permission if needed. |
| Payment Term | เงื่อนไขการชำระเงิน | มัดจำ 50% ก่อนเริ่มงาน | Payment Term | Required before Order creation. |
| Payment Record | รายการรับเงิน | โอน 19,000 บาท | Payment Record | Optional in flow; should not over-block. |
| Custom detail | รายละเอียดงานสั่งทำ | สีโอ๊คเข้ม, ลายรักสมุกดอกพิกุล | Custom Work Detail | Must be complete enough to create `JOB-O`. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Select/create Customer | เลือกลูกค้า | Admin / permitted sales | Adds Customer and unlocks order-line entry. | No |
| Select/create Address Entry | เลือกที่อยู่จัดส่ง | Admin / permitted sales | Adds recipient/address. | No |
| Add ready-stock line | เพิ่มสินค้าพร้อมส่ง | Admin / permitted sales | Adds stock-backed line. | No |
| Add custom-work line | เพิ่มงานสั่งทำ | Admin / permitted sales | Adds custom line and `รายละเอียดงานสั่งทำ` area. | No |
| Review shipment intent | ส่งพร้อมกัน | Admin / permitted sales | Shows the default mixed-Order intent; split shipment is handled later by selected ready lines. | No |
| Add Payment Term | เพิ่มเงื่อนไขชำระเงิน | Admin / permitted sales | Sets required Payment Term. | No |
| Add Payment Record | เพิ่มรายการรับเงิน | Admin / permitted sales | Adds optional actual payment record. | No |
| Save draft | บันทึกร่าง | Creator, same-permission, higher-permission | Creates/updates saved Draft Order and returns to `ร่างออเดอร์` tab. | No |
| Create Order | สร้างออเดอร์ | Admin / permitted sales when required data is complete | Opens Order Review. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Unsaved entry | ยังไม่ได้บันทึกร่าง | User is creating/editing in the current screen only. | No Draft No. |
| Draft | ร่างออเดอร์ | Saved temporary entry, not real Order. | Neutral chip near Draft No. |
| Incomplete | ข้อมูลยังไม่ครบ | Required fields missing for Order creation. | Warning chip in summary panel. |
| Ready to review | พร้อมตรวจสอบ | Required information appears complete enough for Review. | Positive chip. |
| Converted | แปลงเป็นออเดอร์แล้ว | Draft became a real Order and is hidden from active draft UI. | Read-only archived state. |
| Ready-stock line | สินค้าพร้อมส่ง | Sellable stock line; no Job. | Source chip on line. |
| Custom line | งานสั่งทำ | Custom work line; requires Custom Work Detail. | Source chip on line. |
| Payment missing | ยังไม่มีเงื่อนไขชำระเงิน | Payment Term not set. | Blocking warning before Review. |
| Stock insufficient | สต๊อกไม่พอ | Ready-stock quantity exceeds available stock. | Warning in editor; fixed or acknowledged on Review before confirmation. |

## 11. Empty State

For a new entry, start with Customer selection. Before Customer exists, show `เลือกลูกค้าก่อนเพิ่มรายการ`. In the Order Lines section, show `ยังไม่มีรายการในออเดอร์` with actions `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ` after Customer is selected.

## 12. Error / Modal States

- Save fails: `บันทึกร่างไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์แก้ไขรายการนี้`.
- Required field missing on create: show field-level errors and keep user in editor.
- Draft already converted: show read-only state `แปลงเป็นออเดอร์แล้ว`.
- Stock insufficient: allow the line to remain visible with warning; final fix or permitted acknowledgement happens inline on Review.
- Exit with unsaved changes: modal text warns that unsaved changes may be lost, with actions `ออกและบันทึก` and `ออกทันที`.
- `ออกและบันทึก`: saves the current state as Draft Order and returns to the intended destination.
- `ออกทันที`: discards unsaved changes and leaves; it does not create an autosave draft.

## 13. Permission Rules

- Admin or permitted sales users can create Orders.
- Draft creator, same-permission users, and higher-permission users can edit active saved Draft Orders.
- Saving a Draft Order requires a selected/created Customer first.
- Converted drafts are hidden from active draft UI and read-only if opened historically.
- Draft Order has Draft No. but no Order ID.
- Draft Order does not reserve stock, create Job, create Shipment, or enter reports.
- Payment Term is required before real Order creation.
- Payment Record can be entered but should not over-block normal operations.
- Creating `JOB-O` does not require Payment Record or payment override.
- Confirmed Order Line changes happen in `แก้ไขรายการออเดอร์`, not in this Draft/Create screen.

## 14. UX Notes for Designer

- Use `สร้างออเดอร์` as the main page label even when a saved Draft Order is being edited.
- Make saved Draft No. visually different from Order ID.
- Do not show Draft No. for a new unsaved Order Entry Session.
- Use one clear editor flow, with a sticky completeness summary.
- Put `เพิ่มสินค้าพร้อมส่ง` and `เพิ่มงานสั่งทำ` as separate actions.
- For custom lines, show a clear `รายละเอียดงานสั่งทำ` section without making it look like a separate Job screen.
- Avoid Lead/Quotation concepts; they are outside the starting scope.
- Use realistic examples: `เก้าอี้ไม้สักสีธรรมชาติพร้อมส่ง`, `ตู้โชว์ไม้สักแกะลายสั่งทำ`.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-ORD-001-draft-order-editor.md`.

## 16. Open UX Questions

- None blocking for the next Order mockup pass.
