# SCR-SUP-017 - Material Adjustment

## 1. Purpose

Material Adjustment lets staff enter actual counted quantities for selected materials and records the differences as material stock movements. It covers the practical `กระทบยอด` need without creating a separate visible feature name.

## 2. Primary Users

- Material stock adjustment-permission user
- Manager / Owner
- Admin with material adjustment permission

## 3. User Goals

- Search/select materials that were counted.
- See current `จำนวนที่มีอยู่` before entering the actual count.
- Enter actual counted quantity for one or many materials.
- Let the system calculate the difference.
- Attach optional evidence for the adjustment session.
- Save the adjustment with reason/mode and review summaries by date/range.

## 4. Entry Points

- Material Stock -> `ปรับยอดวัสดุ`.
- Material Stock selected material -> `ปรับยอดวัสดุ`.
- Material count work from staff routine.

## 5. Exit Points

- Material Stock with updated quantity.
- Material movement/history detail.
- Material Adjustment summary.

## 6. Layout Structure

- Header: `ปรับยอดวัสดุ`.
- Date/range context and reason/mode selector.
- Search/select material toolbar.
- Count entry table.
- Session attachment/evidence panel.
- Summary panel showing affected items and largest differences.
- Save/review action area.

## 7. Main Components

- Search input
- Material picker
- Count entry table
- Difference calculator
- Reason/mode selector
- Optional attachment uploader
- Summary cards
- Date/range filter for history

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Image | รูป | Material thumbnail | Material Item | Optional. |
| Material name | ชื่อวัสดุ | ลวดเย็บ | Material Item | Required. |
| Category | หมวดวัสดุ | วัสดุสิ้นเปลือง | Material Category | For scanning/filtering. |
| Unit | หน่วย | กล่อง | Material Item | Required. |
| Current qty | จำนวนที่มีอยู่ | 12 | Material Stock | Read-only before adjustment. |
| Actual count | จำนวนที่นับได้ | 10 | User input | Required for selected line. |
| Difference | ส่วนต่าง | -2 | Computed | System-calculated. |
| Reason/mode | เหตุผล | กระทบยอด | User input | Default can be `กระทบยอด`. |
| Note | หมายเหตุ | นับจริงประจำสัปดาห์ | User input | Optional. |
| Attachment | รูปประกอบ | count image | Attachment | Optional for session. |
| Recorder | ผู้บันทึก | Admin | User | Audit/management log. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search/select | เลือกวัสดุ | Material adjustment permission | Adds material to count session. | No |
| Enter actual qty | ใส่จำนวนที่นับได้ | Material adjustment permission | Calculates difference. | No |
| Attach evidence | แนบรูป | Material adjustment permission | Adds optional session evidence. | No |
| Remove line | เอาออก | Material adjustment permission | Removes unsaved line. | No |
| Save adjustment | บันทึกปรับยอด | Material adjustment permission | Updates stock and records movements. | Yes |
| View summary | ดูสรุป | Allowed viewers | Opens adjustment summary by date/range. | No |

## 10. Summary Rules

- Support filters such as today, last 7 days, weekly, and custom date/range.
- Show count of adjusted items.
- Show count of items with differences.
- Show largest differences.
- Show recorder and save time.
- Do not require a fixed daily-only workflow.

## 11. Empty State

If no selected items exist, show `เลือกวัสดุที่ต้องการปรับยอด` with a searchable material picker.

## 12. Error State

- Save fails: `บันทึกปรับยอดวัสดุไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์ปรับยอดวัสดุ`.
- Missing actual count: inline error on the line.
- Negative result policy should follow future validation rules if needed; for now, do not silently save impossible values.

## 13. Permission Rules

- Only material adjustment-permission users can save.
- View-only users may see historical summaries if allowed.
- Management Log should record who adjusted, when, what changed, and reason/mode.

## 14. UX Notes For Designer

- Use one visible feature name: `ปรับยอดวัสดุ`.
- Treat `กระทบยอด` as a reason/mode inside the form.
- Show before/after and difference clearly enough that staff do not need to calculate manually.
- Evidence attachment is optional and belongs to the session, not necessarily each line.
- Keep the flow flexible for daily, weekly, every-two-day, or ad hoc counting routines.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-017-material-adjustment.md` as the image generation prompt source.
