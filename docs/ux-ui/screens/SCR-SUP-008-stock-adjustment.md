# SCR-SUP-008 - Stock Adjustment

## 1. Purpose

`ปรับยอดสต๊อกสินค้า` corrects product Stock On Hand by entering the actual physical quantity and recording an immutable Stock Movement.

This screen can be opened directly for one SKU or from a Stock Count round.

## 2. Primary Actors

- Stock-permission user
- Manager / owner

## 3. Entry Points

- Ready Stock View -> `ปรับยอดสต๊อกสินค้า`
- SKU Variant Detail -> `ปรับยอดสต๊อก`
- Stock Count line with difference
- Operational correction need

## 4. Exit Points

- Ready Stock View
- SKU Variant Detail
- Stock Movement history

## 5. Layout

- Header: `ปรับยอดสต๊อกสินค้า`.
- SKU identity card: image, SKU หลัก, SKU ย่อย/color, SKU code.
- Count form:
  - Current `มีอยู่ในร้าน`
  - Actual counted quantity `นับจริง`
  - Difference preview
  - Reason
  - Optional note
  - Optional evidence
- Footer actions: `บันทึกการปรับยอด`, `ยกเลิก`.

Do not show `จองแล้ว` or `ขายได้` in the adjustment entry form.

## 6. Data Shown

| Data | Thai Label | Example | Source | Notes |
|---|---|---|---|---|
| SKU Variant | SKU ย่อย | TBR-TBL-123-OAK | SKU Variant | Required. |
| Current on hand | มีอยู่ในร้าน | 5 | Ready Stock | Baseline before adjustment. |
| Actual count | นับจริง | 2 | User entry | Required. |
| Difference | ส่วนต่าง | -3 | Computed | Movement quantity. |
| Reason | เหตุผล | สูญหาย | User entry | Required if difference is non-zero. |
| Note | หมายเหตุ | เจอของจริง 2 ชิ้น | User entry | Optional. |
| Evidence | หลักฐาน | photos/files | Attachment | Optional. |

## 7. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Save adjustment | บันทึกการปรับยอด | Stock permission | Creates immutable Stock Movement and updates Stock On Hand. | Yes |
| Cancel | ยกเลิก | All allowed users | Leaves without movement. | No |

## 8. Movement Rules

- User enters actual physical `มีอยู่ในร้าน`; the system calculates difference.
- If the quantity matches the system, save a zero-difference movement `ยืนยันสต๊อกถูกต้อง`.
- If different, require a reason and save adjustment movement.
- Positive adjustment movements can be linked from a Product Purchase Order line closed with reason `ปรับยอดแล้ว` when the SKU matches and the movement quantity covers the closed remaining quantity.
- Movement entries cannot be edited. If wrong, create a new adjustment movement.
- `จองแล้ว` and `ขายได้` are recalculated/visible elsewhere after save.

## 9. Standard Reasons

- `ยืนยันสต๊อกถูกต้อง`
- `นับสต๊อกจริง`
- `สินค้าเสียหาย`
- `สูญหาย`
- `พบสินค้าเพิ่ม`
- `อื่น ๆ`

## 10. Permission Rules

- Stock-permission users can create adjustments.
- Manager/higher permission can view history and audit trail.
- No user edits old movement rows directly in the starting workflow.
