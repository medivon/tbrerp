# SCR-JOB-005 - Production Review / Create Production Job

## 1. Purpose

Final review screen before issuing a real `JOB-P / งานผลิต`.

`สร้างงานผลิต` from Production Job Entry opens this screen. `JOB-P` is created only after the user presses `ยืนยันสร้างงานผลิต`.

## 2. Primary Actors

- Admin
- Production-permission user

## 3. Entry Points

- `SCR-JOB-004 Production Job Entry` -> `สร้างงานผลิต`
- Active `ร่างงานผลิต` -> `สร้างงานผลิต`

## 4. Exit Points

- `ยืนยันสร้างงานผลิต` -> new `JOB-P` Job Detail
- `กลับ` -> Production Job Entry with entered data preserved
- `บันทึกร่าง` -> `ร่างงานผลิต` queue / draft saved state

## 5. Layout

- Header: `ตรวจสอบก่อนสร้างงานผลิต`, source mode, draft number when available.
- Left/main review column:
  - Work identity: production mode, work name, quantity, starting queue.
  - SKU block for `ผลิตจาก SKU`: SKU หลัก, SKU ย่อย/color, SKU code, stock signal `ขายได้` / `หมด`, and image fallback source.
  - Special-work block for `งานผลิตพิเศษ`: work name, images/description, and `ยังไม่ผูกสินค้า`.
  - Department instruction summary: woodwork, coloring/decoration, Rak Samuk, and extra notes.
- Right confirmation panel:
  - Downstream result preview.
  - Warnings/blockers.
  - Final action buttons.

## 6. Data Shown

| Data | Thai Label | Example | Source | Notes |
|---|---|---|---|---|
| Draft number | รหัสร่าง | PROD-DRAFT-0008 | Draft Production Job | Optional; appears only after save. |
| Production mode | รูปแบบงานผลิต | ผลิตจาก SKU | Draft/entry | Required. |
| Work name | ชื่องาน | โต๊ะข้างไม้สัก สีโอ๊คเข้ม | Draft/entry | Required. |
| Quantity | จำนวนผลิต | 6 ชิ้น | Draft/entry | Required; default came from entry as `1` if not edited. |
| Starting queue | คิวเริ่มต้น | ช่างไม้ | Draft/entry | Required. |
| SKU Variant | SKU ย่อย | TBR-TBL-123-OAK | SKU Variant | Required for `ผลิตจาก SKU`. |
| Stock result | ผลลัพธ์สต๊อก | จบงานแล้วเพิ่มสต๊อก 6 ชิ้น | System preview | Only for SKU-tied production. |
| Special-work result | ผลลัพธ์งานผลิตพิเศษ | จบงานผลิต / ไม่เพิ่มสต๊อกอัตโนมัติ | System preview | For unlinked special production. |
| Routing result | เส้นทางเริ่มต้น | เข้า `รอรับเข้าโรงงานสี` | Job workflow | Derived from starting queue. |

## 7. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Back to edit | กลับ | Allowed editor | Returns to Production Job Entry without creating `JOB-P`. | No |
| Save draft | บันทึกร่าง | Creator, same-permission, higher-permission | Creates/updates `ร่างงานผลิต`. | No |
| Confirm create | ยืนยันสร้างงานผลิต | Admin / production permission | Creates `JOB-P`, archives draft read-only, routes Job, opens Job Detail. | No; this screen is the confirmation. |

## 8. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Ready to confirm | พร้อมสร้างงานผลิต | Required data is complete. | Positive chip. |
| Draft production | ร่างงานผลิต | Saved entry has no `JOB-P` yet. | Neutral chip. |
| SKU linked | ผูกสินค้าแล้ว | Completion will increase Ready Stock. | Positive stock chip. |
| Special production | งานผลิตพิเศษ | Not tied to SKU. | Neutral chip. |
| Blocked SKU | สินค้าไม่พร้อมใช้งาน | SKU/color was disabled before confirmation. | Blocking warning. |

## 9. Error / Blocking States

- Disabled/closed SKU: block confirmation and ask user to choose another SKU or reopen the color where allowed.
- Missing starting queue: block confirmation.
- Missing SKU in `ผลิตจาก SKU`: block confirmation.
- Missing work name in `งานผลิตพิเศษ`: block confirmation.
- Permission fails: `ไม่มีสิทธิ์ยืนยันสร้างงานผลิต`.

`ขายได้ 0` / `หมด` is context only. It does not block production.

## 10. System Effects

- `ยืนยันสร้างงานผลิต` creates `JOB-P`.
- If confirmation came from an existing draft, the draft becomes converted/archived/read-only.
- Created `JOB-P` routes to the selected starting point:
  - `ช่างไม้`
  - `รอรับเข้าโรงงานสี`
  - `รอระบุ/ส่งรักสมุก`
- If the `JOB-P` is tied to SKU, marking it complete later increases Ready Stock by `จำนวนผลิต`.
- If it is unlinked special production, marking it complete later ends the Job without stock change.

## 11. UX Notes

- Keep this screen review-first. Do not turn it into another full editor.
- Show downstream effects plainly before the confirm button.
- Do not show customer, Order, COD, payment, or shipment context.
- Do not add a separate receipt step after SKU-tied `JOB-P` completion. Thai UI may still use `รับเข้าสต๊อก` / `เข้าสต๊อก` wording; domain/code should distinguish this Product Ready Stock update from Material Stock Receipt.
