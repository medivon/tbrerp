# IMG-SUP-005 - SKU Image Groups

Related screen spec:

- `docs/ux-ui/screens/SCR-SUP-005-sku-image-groups.md`

Visual/content anchors:
- `docs/ux-ui/design-system/app-shell.md`

## High-Fidelity GPT Image 2 Prompt

```text
Create a high-fidelity desktop/tablet ERP screen for THAIBORAN called “จัดการรูปสินค้า”. This is the full-option image management screen for Product Model / SKU หลัก and SKU Variant / SKU ย่อย. Product Model image groups are the default/fallback for SKU Variants; SKU Variant image groups are optional overrides for a specific color. It is not a product edit form and not a stock screen.

Use the approved THAIBORAN Admin Dashboard app shell:
- Fixed light left sidebar with THAIBORAN logo/brand, matching the approved light Admin Dashboard baseline
- Main navigation: แดชบอร์ด, ออเดอร์, งานสั่งทำ / ผลิต, รอบจัดส่ง, สินค้า / สต๊อก, ลูกค้า / CRM, รายจ่าย, ตั้งค่า
- Highlight “สินค้า / สต๊อก” as active
- Top bar with page title, date “22 พฤษภาคม 2567”, user avatar, Admin user and role ผู้ดูแลระบบ
- Quiet operational ERP style, dense but readable layout, compact chips, white cards, subtle shadows, dark navy emphasis

Screen purpose:
Admin organizes images for one product record so staff can recognize the product and production teams can see the right visual instructions. Images are grouped by purpose and can be reordered.

Header area:
- Page title: จัดการรูปสินค้า
- Context line: จาก SKU หลัก 123 • โต๊ะข้างไม้สัก
- Chips: SKU หลัก, เปิดใช้งาน, มีรูป 18, มีการแก้ไข
- Primary action: บันทึกการจัดรูป
- Secondary actions: กลับไปรายละเอียดสินค้า, เปิดคลังรีวิว

Main layout:
Use a two-column image-management workbench.
- Left/main area: image group navigation and selected group image grid.
- Right panel: selected image/group detail and usage summary.
- The page should feel like a practical admin tool for handling many product photos, not a gallery landing page.

Top owner card:
- Show a compact product thumbnail of a Thai teak side table.
- Show:
  - ประเภทรูป: SKU หลัก
  - SKU หลัก: โต๊ะข้างไม้สัก
  - รหัส: 123
  - SKU ย่อยที่เกี่ยวข้อง: 4 รายการ
  - คลังรีวิว: 18 รูป
- Button: เปลี่ยนไปดู SKU ย่อย

Left side group rail:
Show vertical image group list with icons/counters:
- รูปหลัก 1
- รูปเพิ่มเติม 8
- รูปสำหรับช่างไม้ 3
- รูปสำหรับฝ่ายสี/ตกแต่ง 4
- รูปสำหรับรักสมุก 2
- คลังรีวิว 18
Highlight “รูปสำหรับฝ่ายสี/ตกแต่ง” as selected.
Important: Review Album / คลังรีวิว should appear clearly separated from normal product image groups.

Selected group header:
- Title: รูปสำหรับฝ่ายสี/ตกแต่ง
- Subtitle: ใช้แสดงรายละเอียดสีและงานตกแต่งให้ฝ่ายสีเห็นตอนสร้าง Job
- Chips: ใช้ในงานสั่งทำ, 4 รูป, จัดลำดับได้
- Actions: เพิ่มรูป, เพิ่มคำอธิบาย, จัดลำดับรูป

Upload/drop area:
- A modest dashed upload zone at the top of the selected group, labeled: ลากรูปมาวาง หรือกดเพิ่มรูป
- Keep it compact; do not dominate the page.

Image grid:
Show 6 image tiles in a grid:
1. Main color reference image of a dark oak Thai wooden table, label ลำดับ 1, note สีโอ๊คเข้ม เคลือบด้าน
2. Detail close-up of wood finish, label ลำดับ 2, note รายละเอียดผิวสี
3. Gold antique finish reference, label ลำดับ 3, note สีทองโบราณ
4. Ivory white finish reference, label ลำดับ 4, note สีขาวเปลือกไข่
5. Decoration detail close-up, label ยังไม่บันทึก, note เพิ่มใหม่
6. Empty add tile with icon เพิ่มรูป

Each tile should show:
- Large thumbnail
- Small drag handle / reorder grip
- Group chip
- Short optional note text
- Menu button with actions: ย้ายกลุ่มรูป, ลบรูป
Do not show product price, cost, or stock fields.

Right panel:
Title: รายละเอียดกลุ่มรูป
Show:
- Selected group: รูปสำหรับฝ่ายสี/ตกแต่ง
- จำนวนรูป: 4 รูป
- ใช้งานกับ: SKU หลัก 123
- กฎ fallback: SKU ย่อยใช้รูปชุดนี้ถ้าไม่มีรูปเฉพาะสีของตัวเอง
- ใช้ใน Job: เลือกแนบตอนกรอกรายละเอียดงานสั่งทำหรือสร้างงานผลิต
- คำอธิบายกลุ่ม:
  “รูปสีและงานตกแต่งมาตรฐาน ใช้ให้ฝ่ายสีเห็นภาพอ้างอิง”
- Preview selected image larger with note:
  ลำดับ 1 • สีโอ๊คเข้ม เคลือบด้าน
- Buttons:
  - บันทึกการจัดรูป
  - ดูตัวอย่างในหน้า Job
  - เปิดคลังรีวิว
  - กลับไปรายละเอียดสินค้า

Bottom or inline warning/info:
- Info card: รูปที่ถูกใช้ใน Job เดิมจะไม่ถูกลบออกจากประวัติงานย้อนหลัง

Important behavior rules:
- This screen manages image groups and optional short notes only.
- It is not a Product Model edit page and not a SKU Variant edit page.
- Do not show editable product fields like name, SKU code, dimensions, stock, price, cost, or accounting data.
- Review Album is separate from normal product image groups.
- If managing a SKU Variant, show whether each group is `รูปจาก SKU ย่อย` or fallback `ใช้รูปจาก SKU หลัก`.
- Images can be soft deleted/hidden; do not imply permanent deletion.
- Keep optional text short and production-facing.

Visual rules:
- Thai UI labels are primary
- Keep English only for internal terms: SKU, Job, JOB-O, JOB-P
- Use the approved light sidebar baseline; do not switch to a dark sidebar
- Use large enough thumbnails for handcrafted furniture details
- Use compact status chips and calm ERP styling
- Make drag/drop and ordering obvious but not playful
- Keep the layout dense enough for many images without feeling crowded
```
