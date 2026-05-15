# SCR-JOB-004 - Production Job Entry

## 1. Purpose

This screen creates a `JOB-P / งานผลิต` from an internal production source when production needs detailed work-card handling. The visible Thai UI should call this action `สร้างงานผลิต`, while internal docs and entities can continue using `Job` and `JOB-P`.

The screen can open as a normal standalone production entry or with an initial SKU Variant prefilled from Product Model Detail. A prefill is only a convenience for selection; it does not create a special return path or lock the user to that product.

Production work has two clear modes:

- `ผลิตจาก SKU`: admin starts by selecting an existing SKU Variant / `SKU ย่อย` from a search modal. After SKU selection, the body changes into that SKU Variant's production details.
- `งานผลิตพิเศษ`: admin enters a custom/internal production specification using the same custom-work detail body pattern as `รายละเอียดงานสั่งทำ`, but the source is `JOB-P` and there is no customer/order/shipment context.

If the work is tied to a SKU, it can later become stock receipt readiness. If it is custom/prototype work without SKU, it can end as Done or be used later as a reference for creating a SKU.

## 2. Primary Users

- Admin
- Manager / Owner
- Production-permission user

## 3. User Goals

- Create a clear production-source work unit from one of two modes: `ผลิตจาก SKU` or `งานผลิตพิเศษ`.
- For `ผลิตจาก SKU`, search and select a SKU Variant before showing SKU detail in the body.
- For `งานผลิตพิเศษ`, create a custom production work card similar to the `รายละเอียดงานสั่งทำ` pattern.
- Capture production quantity, SKU reference, department instructions, and images.
- Distinguish internal production from customer work.
- Avoid mixing Order, Customer, COD, or shipment concepts into stock production.

## 4. Entry Points

- Production Batch / Production Lot workflow.
- Active Jobs overview where admin chooses to create internal production work.
- Product/SKU page when creating stock production for a known SKU.
- Product Model Detail per-color `ผลิตเข้าสต๊อก` / `ผลิตสินค้าชิ้นนี้` action, which opens this screen in `ผลิตจาก SKU` mode with that SKU Variant preselected.
- Production creation flow where admin starts from a custom/internal production specification.

## 5. Exit Points

- Job Detail.
- Active Jobs overview.
- Production Batch / Production Lot detail.
- Future stock receipt readiness screen when production is tied to SKU.

## 6. Layout Structure

- Header: `สร้างงานผลิต`, source preview `JOB-P / งานผลิต`, and optional linked production source when the entry came from a Production Batch/Lot.
- Top body tabs: `ผลิตจาก SKU` and `งานผลิตพิเศษ`.
- `ผลิตจาก SKU` body before selection: clear empty state with prominent purple `เลือกสินค้า` button.
- SKU search modal: opens from `เลือกสินค้า`, lets admin search by product name/code, SKU Variant code, color, or category and choose one SKU Variant.
- `ผลิตจาก SKU` body after selection: replaces empty state with selected SKU Variant detail, parent Product Model, color, product image, dimensions, quantity, and inherited/fallback instruction data.
- If this screen opens with a preselected SKU from Product Detail, that preselection is only a starting helper. If the user chooses another SKU or switches to `งานผลิตพิเศษ`, reset the Product Detail context and behave like a normally opened Production Job Entry screen.
- `งานผลิตพิเศษ` body: uses the same form structure as `รายละเอียดงานสั่งทำ`, but without Order/Customer fields.
- Main form: production work details, department image groups, notes, urgent label display/set if authorized.
- Right readiness panel: production checklist, SKU/stock signal, create action.
- Image area: grouped upload/preview sections for main image and department instruction images.

## 7. Main Components

- Source type badge
- Production type selector
- Purple `เลือกสินค้า` button for SKU mode
- SKU search modal
- Optional Production Batch/Lot reference panel
- SKU target card
- Production detail form
- Quantity field
- Department image group uploader
- Urgent Label control
- Required detail checklist
- Create production work button

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Job source type | ประเภทต้นทางของ Job | Production | Job Source Type | Source must be explicit. |
| Job prefix | รหัสงาน | JOB-P | Job | Internal Production work. |
| Readable label | ประเภทงาน | งานผลิต | Job | Show with `JOB-P`. |
| Production type | รูปแบบงานผลิต | ผลิตจาก SKU | Job / Production | Other option: `งานผลิตพิเศษ`. |
| SKU selection | เลือกสินค้า | TBR-TBL-123-OAK | SKU Variant | May be prefilled from Product Detail, but can be changed. |
| Product Model | SKU หลัก | โต๊ะข้างไม้สัก | Product Model | Parent product for the selected SKU Variant. |
| SKU Variant / color | สี / SKU ย่อย | สีโอ๊คเข้ม / TBR-TBL-123-OAK | SKU Variant | Concrete stock result for `ผลิตจาก SKU`. |
| Production Batch | ชุดผลิต | PROD-2568-0021 | Production Batch | Optional source when production starts from a batch. |
| Production Lot | ล็อตผลิต | LOT-001 | Production Lot | Optional source when production starts from a lot. |
| SKU target | สินค้าที่จะรับเข้า | โต๊ะข้างไม้สัก สีโอ๊คเข้ม | SKU Variant | Required for `ผลิตจาก SKU` and stock receipt. |
| Product dimensions | ขนาดสินค้า | 45 x 45 x 55 ซม. | Product Model snapshot | Prefilled when SKU is selected. |
| Custom production reference | อ้างอิงงานผลิตพิเศษ | โต๊ะต้นแบบปรับขนาด | Production | Used when not starting from SKU. |
| Quantity | จำนวนผลิต | 6 ชิ้น | Job / Production source | Required production quantity. |
| Main image | รูปหลัก | Table thumbnail | SKU Variant / Product Model / Job | Use SKU Variant image if present, otherwise Product Model fallback; user may add Job images. |
| Woodwork images | รูปสำหรับช่างไม้ | Wood structure image | SKU Variant / Product Model / Job | Use SKU Variant group if present, otherwise Product Model fallback; user may add Job images. |
| Coloring images | รูปสำหรับฝ่ายสี/ตกแต่ง | Oak color sample | SKU Variant / Product Model / Job | Use SKU Variant group if present, otherwise Product Model fallback; user may add Job images. |
| Rak Samuk images | รูปสำหรับรักสมุก | Pattern reference | SKU Variant / Product Model / Job | Optional when relevant, with the same fallback rule. |
| Urgent Label | งานด่วน | งานด่วน | Urgent Label | Set by authorized admin/manager. |
| Job note | หมายเหตุงาน | ผลิตเพิ่มสำหรับสต๊อกหน้าร้าน | Job | Production-facing note. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Create Production Job | สร้างงานผลิต | Admin / production permission | Creates `JOB-P` from production source. | Yes |
| Add instruction image | เพิ่มรูปงาน | Admin / production permission | Adds image to selected instruction group. | No |
| Add note | เพิ่มหมายเหตุงาน | Admin / production permission | Adds production-facing note. | No |
| Set urgent | ตั้งงานด่วน | Authorized admin/manager | Adds Urgent Label. | No |
| Open SKU modal | เลือกสินค้า | Admin / production permission | Opens SKU search modal. | No |
| Select SKU | เลือกสินค้านี้ | Admin / production permission | Populates SKU details, dimensions, image, and department instruction data. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Production source | งานผลิต | Job comes from Production. | Always pair with `JOB-P`. |
| SKU production | ผลิตจาก SKU | Production starts from SKU and can become stock receipt readiness. | Use with `ผูกสินค้าแล้ว`. |
| Custom production | งานผลิตพิเศษ | Production starts from custom/internal spec and may not enter stock. | Use with `ยังไม่ผูกสินค้า`. |
| Ready to create | พร้อมบันทึก | Enough detail appears available. | Positive but still confirm. |
| Missing detail | ข้อมูลงานยังไม่ครบ | Required production detail is missing. | Warning or blocker. |
| SKU linked | ผูกสินค้าแล้ว | Production result can later go to stock receipt readiness. | Positive stock signal. |
| Prototype | งานทดลอง / ยังไม่ผูกสินค้า | Production can end as Done without stock receipt. | Neutral warning. |
| Urgent | งานด่วน | Priority label set by authorized user. | Yellow/high-attention chip. |

## 11. Empty State

In `ผลิตจาก SKU`, the screen can open without a selected SKU Variant and show the `เลือกสินค้า` empty state. If opened from Product Detail, the selected color/SKU Variant may be prefilled. Empty image groups show `ยังไม่มีรูปงาน` with action `เพิ่มรูปงาน`.

## 12. Error State

- Create fails: `สร้างงานผลิตไม่สำเร็จ`.
- Missing required detail: field-level errors and readiness warning.
- Permission fails: `ไม่มีสิทธิ์สร้างงานผลิต`.
- Duplicate Job exists for this Production Lot, when a Production Lot source is present: disable creation and show link to existing Job.

## 13. Permission Rules

- Only admin, manager, or production-permission users can create `JOB-P`.
- `JOB-P` screens must not show customer, phone, address, COD, shipment, or customer CRM notes.
- Finance-sensitive cost/payment fields remain hidden unless future finance permission explicitly needs them.

## 14. UX Notes for Designer

- Make `JOB-P / งานผลิต` impossible to miss.
- Show whether the production is `ผลิตจาก SKU` or `งานผลิตพิเศษ`.
- In `ผลิตจาก SKU`, do not show the special-production form until the user switches to `งานผลิตพิเศษ`.
- In `ผลิตจาก SKU`, the first action should be `เลือกสินค้า`; after selection, the body should be the selected SKU detail.
- If opened from Product Detail, do not show a special back/cancel path to Product Detail. Treat it as the normal `สร้างงานผลิต` screen with an initial SKU prefill.
- After successful creation, navigate to the new Job Detail.
- In `งานผลิตพิเศษ`, reuse the `รายละเอียดงานสั่งทำ` form pattern as the body.
- Use Thai UI labels for staff-facing text.
- Keep English only for internal terms such as `JOB-P`, `SKU`, and `Production Lot`.
- Keep the form visually parallel to custom-work detail entry, but remove Order/Customer/Shipment concepts.
- Use stacked row cards for source, production detail, and department instructions.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-JOB-004-production-job-entry.md` as the image generation prompt source.
