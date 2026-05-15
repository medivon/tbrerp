# SCR-SUP-005 - SKU Image Groups

## 1. Purpose

The SKU Image Groups screen is the full-option desktop image management screen for Product Model / `SKU หลัก` and SKU Variant / `SKU ย่อย`. It supports product images, department instruction images, Rak Samuk images, and Review Album links. This screen is for organizing image groups and optional explanation text; it is not a product edit form and not a stock screen.

## 2. Primary Users

- Admin
- Product-permission user
- Manager / Owner

## 3. User Goals

- Upload and organize images by purpose.
- Keep product recognition images separate from production instruction images.
- Add optional short text where a picture is not enough.
- Reorder images so the most useful images appear first.
- See which images are used by `SKU หลัก`, `SKU ย่อย`, or Review Album.
- Manage Product Model images as the default/fallback image set for SKU Variants.
- Add optional SKU Variant image overrides only where a color needs its own product or department images.
- Return to Product Model Detail or SKU Variant Detail.

## 4. Entry Points

- Product Model Detail -> `จัดการรูปสินค้า`.
- SKU Variant Detail -> `จัดการรูปสินค้า`.
- Review Album link from SKU/Product context.
- Job creation support when selecting inherited image groups.

## 5. Exit Points

- Product Model Detail.
- SKU Variant Detail.
- Review Album.
- Job creation / Job detail where image groups are inherited.

## 6. Layout Structure

- Desktop admin app shell with `สินค้า / สต๊อก` active.
- Header identifies the current image owner: Product Model or SKU Variant.
- If the owner is a SKU Variant, show which image groups come from the SKU Variant and which groups fall back to Product Model.
- Left area uses grouped image sections with drag-and-drop visual affordance.
- Right panel shows selected group detail, usage notes, and save/publish actions.
- Image groups should be clear enough for non-technical staff to understand.

## 7. Main Components

- Owner selector / owner summary
- Image group navigation
- Drag-and-drop upload area
- Image grid with thumbnails
- Reorder handles
- Optional image note text
- Department-specific image groups
- Review Album shortcut
- Save changes action

## 8. Image Groups

| Group | Thai Label | Purpose | Notes |
|---|---|---|---|
| Main Images | รูปหลัก | Primary product recognition. | Usually 1 primary image plus alternates. |
| Additional Images | รูปเพิ่มเติม | Extra product angles/details. | Can be used by sales/admin. |
| Woodwork Images | รูปสำหรับช่างไม้ | Structure/workmanship instructions. | Can be inherited into Job when selected. |
| Coloring Images | รูปสำหรับฝ่ายสี/ตกแต่ง | Color/decorating instruction images. | Can include optional text. |
| Rak Samuk Images | รูปสำหรับรักสมุก | Pattern/lacquer-thread instruction images. | Often visual-first. |
| Review Album | คลังรีวิว | Customer/review image library. | Separate module/album; link here only. |

Default rule:

- Product Model image groups are the default images for all SKU Variants.
- SKU Variant image groups are optional overrides. If a SKU Variant has its own group for a purpose, use it; if not, use the Product Model group for that purpose.

## 9. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Owner type | ประเภทรูป | SKU หลัก / SKU ย่อย | Product Model / SKU Variant | Shows what record is being managed. |
| Owner name | ชื่อสินค้า | โต๊ะข้างไม้สัก | Product Model / SKU Variant | Context. |
| Fallback source | ใช้รูปจาก | SKU หลัก / SKU ย่อย | Product Model / SKU Variant | Shows whether this group is an override or fallback. |
| Image group | กลุ่มรูป | รูปสำหรับช่างไม้ | SKU Image Group | Required grouping. |
| Image count | จำนวนรูป | 6 รูป | SKU Image Group | Per group. |
| Image note | คำอธิบายรูป | ใช้ดูทรงขาโต๊ะ | Image note | Optional. |
| Sort order | ลำดับรูป | 1, 2, 3 | Image group order | Drag/reorder. |
| Review link | คลังรีวิว | 18 รูป | Review Album | Separate from normal product images. |

## 10. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Upload images | เพิ่มรูป | Product permission | Adds images to selected group. | No |
| Reorder images | จัดลำดับรูป | Product permission | Changes display order. | No |
| Add note | เพิ่มคำอธิบาย | Product permission | Adds optional text to an image/group. | No |
| Move image group | ย้ายกลุ่มรูป | Product permission | Moves image to another group. | Yes if moving multiple images. |
| Remove image | ลบรูป | Product permission | Soft deletes/hides image. | Yes |
| Save | บันทึกการจัดรูป | Product permission | Saves ordering/group/note changes. | No |
| Open Review Album | เปิดคลังรีวิว | Product/CRM permission | Opens Review Album. | No |
| Back | กลับไปรายละเอียดสินค้า | All allowed users | Returns to source detail page. | No |

## 11. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Unsaved | มีการแก้ไข | Changes not saved. | Orange chip. |
| Used by Job | ใช้ในงานสั่งทำ | Image group may be inherited into Job. | Blue chip. |
| Review Album | คลังรีวิว | Image belongs to review album area. | Green chip. |
| Hidden | ซ่อนแล้ว | Image is soft deleted/hidden. | Gray chip. |

## 12. Empty State

If a group has no images, show `ยังไม่มีรูปในกลุ่มนี้` with action `เพิ่มรูป`. For department groups, also show `เพิ่มคำอธิบายได้แม้ยังไม่มีรูป`.

## 13. Error State

- Upload fails: `อัปโหลดรูปไม่สำเร็จ`.
- Save fails: `บันทึกการจัดรูปไม่สำเร็จ`.
- Permission fails: `ไม่มีสิทธิ์จัดการรูปสินค้า`.
- File type unsupported: `ไฟล์นี้ยังไม่รองรับ`.

## 14. Permission Rules

- Images are soft deleted by default; hidden images remain searchable by high permission where required.
- Review Album is separate from product image groups.
- Product cost, labor cost, sales price, private CRM notes, and accounting data must not appear.
- Images used by Jobs should not be silently removed from historical Job records.
- Later edits to Product Model or SKU Variant image groups do not rewrite old Order/Job snapshots.

## 15. UX Notes for Designer

- Make image groups visually obvious and easy to scan.
- Use large enough thumbnails for handcrafted furniture details.
- Drag-and-drop should feel available, but the UI must still work with normal upload buttons.
- Keep optional text short and production-facing.
- Do not mix Review Album images into normal product image groups.
- The page should support both `SKU หลัก` and `SKU ย่อย` contexts.
- In SKU Variant context, make missing groups feel acceptable because they fall back to Product Model images.

## 16. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SUP-005-sku-image-groups.md` as the image generation prompt source.
