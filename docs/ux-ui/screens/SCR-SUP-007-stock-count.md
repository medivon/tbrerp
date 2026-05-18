# SCR-SUP-007 - Stock Count

## 1. Purpose

`ตรวจนับสต๊อกสินค้า` is a count round for selected SKU Variants. It records the physical quantity found in the shop (`มีอยู่ในร้าน`) and creates Stock Movement entries when the round is completed.

Counters should count physical items only. They should not reason about `จองแล้ว` or `ขายได้` while counting.

## 2. Primary Actors

- Stock-permission user
- Manager / owner

## 3. Entry Points

- Ready Stock View -> `ตรวจนับสต๊อก`
- SKU Variant Detail -> `ตรวจนับสต๊อก`
- Stock navigation

## 4. Exit Points

- Ready Stock View
- SKU Stock Movement history
- Stock Adjustment detail for created adjustment movements

## 5. Layout

- Header: `ตรวจนับสต๊อกสินค้า`, count round status, user/date.
- SKU picker/filter panel: search by product, SKU code, color, category.
- Count table/card list:
  - SKU image
  - Product Model / SKU Variant / color
  - Current `มีอยู่ในร้าน`
  - `นับจริง`
  - Difference preview
  - Reason when different
  - Optional note/evidence
- Footer actions: `บันทึกไว้ก่อน`, `ยกเลิกรอบนับ`, `ปิดรอบนับ`.
- `ปิดรอบนับ` opens a separate Review page before movement creation.

Do not show `จองแล้ว` or `ขายได้` in count entry.

## 6. Data Shown

| Data | Thai Label | Example | Source | Notes |
|---|---|---|---|---|
| Count round no. | เลขรอบนับ | COUNT-2568-0012 | Stock Count | Optional/generated. |
| Status | สถานะ | กำลังนับ | Stock Count | `กำลังนับ`, `นับเสร็จแล้ว`, `ยกเลิก`. |
| SKU Variant | SKU ย่อย | TBR-TBL-123-OAK | SKU Variant | Required per line. |
| Current on hand | มีอยู่ในร้าน | 5 | Ready Stock | Count baseline only. |
| Actual count | นับจริง | 2 | User entry | Required before closing each counted line. |
| Difference | ส่วนต่าง | -3 | Computed | Creates movement on close. |
| Reason | เหตุผล | สูญหาย | User entry | Required when difference is non-zero. |
| Evidence | หลักฐาน | 2 photos | Attachment | Optional. |

## 7. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Add SKU | เพิ่มสินค้าเข้ารอบนับ | Stock permission | Adds selected SKU Variants to count round. | No |
| Save progress | บันทึกไว้ก่อน | Stock permission | Keeps round as `กำลังนับ`. | No |
| Close count | ปิดรอบนับ | Stock permission | Opens Review page; after confirmation creates Stock Movement for every counted SKU and marks `นับเสร็จแล้ว`. | Yes, via Review page |
| Cancel count | ยกเลิกรอบนับ | Stock permission / manager | Cancels round before movement creation with Activity Log. | Yes, no reason |

## 8. Movement Rules

- Closing the count creates Stock Movement entries for every counted SKU.
- Closing is blocked until every selected SKU has `นับจริง`.
- Review page shows counted SKUs, difference rows, missing reasons, and Stock Movement effects before confirmation.
- If actual count equals current `มีอยู่ในร้าน`, create zero-difference movement `ยืนยันสต๊อกถูกต้อง`.
- If actual count differs, create adjustment movement using the difference.
- Positive adjustment movements can be referenced by a Product Purchase Order line closed with reason `ปรับยอดแล้ว` when the SKU matches and the movement quantity covers the closed remaining quantity.
- If actual Stock On Hand becomes lower than Reserved Stock, save the physical truth. `ขายได้` may become negative in sales/admin views after save.
- Movement entries are immutable. If wrong, create a new adjustment.
- After close, navigate to the closed Stock Count detail / read-only summary.

## 9. Reasons

For non-zero differences, require one standard reason:

- `นับสต๊อกจริง`
- `สินค้าเสียหาย`
- `สูญหาย`
- `พบสินค้าเพิ่ม`
- `อื่น ๆ`

`ยืนยันสต๊อกถูกต้อง` is used automatically when difference is zero.

## 10. UX Notes

- The screen should be mobile/tablet friendly and image-led.
- Keep count entry calm and focused on physical stock.
- Avoid showing reservation/sales math in the counting surface.
