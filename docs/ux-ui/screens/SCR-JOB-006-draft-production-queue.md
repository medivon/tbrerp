# SCR-JOB-006 - Draft Production Queue

## 1. Purpose

List saved `ร่างงานผลิต` records that have not become real `JOB-P` records.

Drafts are work-in-progress production entries. They do not enter department queues, affect stock, or appear in active production reports.

## 2. Primary Actors

- Admin
- Production-permission user
- Creator of the draft
- Higher-permission user

## 3. Entry Points

- `งานสั่งทำ / ผลิต` -> `ร่างงานผลิต`
- Production Job Entry after `บันทึกร่าง`
- Exit warning after `ออกและบันทึก`

## 4. Exit Points

- Open draft -> Production Job Entry
- Create new production work -> Production Job Entry blank state
- Cancel/back -> previous production overview

## 5. Layout

- Header: `ร่างงานผลิต`, count, create new action.
- Filter row: search, mode, owner, last edited, draft status.
- Table/list:
  - Draft number
  - Production mode
  - Work/SKU name
  - Quantity
  - Last edited
  - Owner
  - Status
  - Actions

## 6. Data Shown

| Data | Thai Label | Example | Source | Notes |
|---|---|---|---|---|
| Draft number | รหัสร่าง | PROD-DRAFT-0008 | Draft Production Job | Primary identifier. |
| Production mode | รูปแบบ | ผลิตจาก SKU | Draft Production Job | `ผลิตจาก SKU` or `งานผลิตพิเศษ`. |
| Work/SKU name | ชื่องาน / SKU | โต๊ะข้างไม้สัก สีโอ๊คเข้ม | Draft/SKU | For SKU mode, show SKU identity clearly. |
| Quantity | จำนวนผลิต | 6 | Draft Production Job | Defaults to `1` when first entered. |
| Last edited | แก้ไขล่าสุด | 22 พ.ค. 2567 14:20 | Audit fields | Sortable. |
| Owner | ผู้บันทึก | Admin TBR | User | Used for ownership visibility. |
| Status | สถานะ | ร่าง | Draft Production Job | No active-production status. |

## 7. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Open draft | เปิดร่าง | Creator, same-permission, higher-permission | Opens Production Job Entry with saved data. | No |
| Continue draft | ทำต่อ | Creator, same-permission, higher-permission | Same as open draft. | No |
| Create new | สร้างงานผลิตใหม่ | Admin / production permission | Opens Production Job Entry blank state. | No |

## 8. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Draft | ร่าง | Saved but no `JOB-P` exists. | Neutral chip. |
| SKU draft | ผลิตจาก SKU | Draft intends to create SKU-tied production. | Pair with SKU identity. |
| Special draft | งานผลิตพิเศษ | Draft intends to create unlinked/special production. | Pair with `ยังไม่ผูกสินค้า` when relevant. |
| Converted | สร้างงานผลิตแล้ว | Draft already created `JOB-P`. | Read-only/archive state. |

## 9. Permission Rules

- Creator can edit their draft.
- Same-permission production users can edit drafts in the shared production context.
- Higher-permission users can edit or cancel drafts.
- Drafts do not expose customer, COD, payment, or shipment data because Production has no customer context.

## 10. UX Notes

- The queue must not look like an active Job queue.
- Do not show department status such as `ช่างไม้` or `ฝ่ายสี` for drafts.
- Do not show stock changes from drafts.
- Make `PROD-DRAFT-xxxx` visually different from `JOB-P-xxxx`.
