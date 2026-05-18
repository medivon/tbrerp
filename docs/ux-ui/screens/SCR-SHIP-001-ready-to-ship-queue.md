# SCR-SHIP-001 — Ready-to-Ship Queue

## 1. Purpose

The Ready-to-Ship Queue is the admin `รอสร้างรอบจัดส่ง` screen. It shows Orders with items that are ready for admin to create a Shipment: ready-stock Order Lines, completed `JOB-O` work, and ready Service Case items. Service Case items create Service Shipments only and do not affect the referenced Order's status or completion.

This screen is before the Shipment exists. It is not the delivery team's `รายการต้องจัดส่งวันนี้` screen.

Content-approved mockup:

- `docs/ux-ui/mockups/SCR-SHIP-001-ready-to-ship-queue/SCR-SHIP-001-content-approved.png`

Note: this mockup approves the inner content/workbench structure only. Its dark sidebar/altered logo is not a global app-shell decision.

## 2. Primary Users

- Admin
- Same-permission admin user
- Higher-permission admin user

## 3. User Goals

- Find Orders with ready-to-ship items.
- Work through dozens of ready Orders in one day without opening every row.
- See whether ready items come from stock, custom Job, or service.
- See stock-warning signals without treating stock shortage as a shipment blocker after Order acknowledgement.
- Search by Customer, phone, Order ID, or Job ID.
- Review recipient/address, item summary, delivery date, carrier, notes, and COD signal where allowed.
- Start Shipment creation without sending unfinished custom work to delivery.
- Avoid sending unfinished custom work to delivery.
- Keep this queue separate from delivery team's released Shipment work.

## 4. Entry Points

- `แดชบอร์ดแอดมิน` -> `รอสร้างรอบจัดส่ง`.
- Coloring marks `JOB-O` as `งานเสร็จ/พร้อมส่ง`.
- Ready-stock Order Line becomes ready after real Order creation/reservation.
- Mixed ready-stock/custom Orders appear only when there are ready lines eligible for shipment creation.
- Service Case item becomes ready to send back.

## 5. Exit Points

- Shipment Builder.
- Order Detail.
- Job Detail Work Card.
- Admin Dashboard.

## 6. Layout Structure

- Header: `รอสร้างรอบจัดส่ง`, total Order count, primary search.
- Subtitle: `รายการพร้อมส่งที่รอแอดมินสร้างรอบจัดส่ง`.
- Module sub menu below the page header: `รอสร้างรอบจัดส่ง`, `รายการต้องจัดส่งวันนี้`, `รายการรอวันจัดส่ง`, `ยืนยันการจัดส่ง`, `ประวัติรอบจัดส่ง`.
- Summary strip: total ready Orders, due today, stock-ready, completed custom, service, COD.
- Workbench toolbar: search, filter button, sort/group selector, and selected-count bulk action area.
- Filter chips below the toolbar: `ทั้งหมด`, `กำหนดส่งวันนี้`, `สินค้าพร้อมส่ง`, `งานสั่งทำเสร็จแล้ว`, `งานบริการ`, `COD`, `สร้างรวมได้`.
- Main content: dense Order-grouped table on desktop; compact stacked rows on tablet.
- Order row/card: Customer, recipient, item count, source chips, COD chip where allowed, delivery date/target date, age, primary action `สร้างรอบจัดส่ง`.
- Expandable item preview: thumbnails, item names, quantities, source badges.
- Right drawer: selected Order summary and shipment-start action.
- No separate Hold state here. Items that are not ready should not be in this queue; if a ready item should not leave after Shipment work begins, hold/handle it in the shipment/send-out step.

## 7. Main Components

- Queue header
- Module sub menu
- Summary strip
- Central search input
- Workbench toolbar
- Sort/group selector
- Selected-count bulk action bar
- Order-grouped ready row
- Source chips
- COD chip
- Delivery date chip
- Item thumbnail strip
- Selected Order drawer
- Create Shipment action
- Empty state

## 8. Data Shown

| Field | Thai Label | Example | Source object | Notes |
|---|---|---|---|---|
| Queue title | รอสร้างรอบจัดส่ง | รอสร้างรอบจัดส่ง | Ready-to-ship queue | Admin-facing label. |
| Order ID | เลขออเดอร์ | ORD-2568-0021 | Order | Grouping unit for queue. |
| Customer | ลูกค้า | คุณอร | Customer | Admin can search by Customer. |
| Recipient | ผู้รับสินค้า | คุณภพ | Address Entry / Shipment snapshot later | Verify before Shipment creation. |
| Phone | เบอร์โทร | 081-234-5678 | Customer / Recipient | Search and shipment prep. |
| Ready source | แหล่งที่มา | Stock / Custom / Service | Order Line / Job / Service Case | Badge source: stock, custom, service. |
| Item list | รายการสินค้า | ตู้โชว์ไม้สักแกะลาย | Order Line / Job | Show as Order-level summary with expandable details. |
| Quantity | จำนวน | 1 ชิ้น | Order Line / Job | Needed for delivery documents. |
| Product image | รูปสินค้า | Cabinet thumbnail | Order Line / Job / SKU | Use thumbnail for recognition. |
| Delivery target date | กำหนดส่ง | 20 พ.ค. 2569 | Order / Shipment planning | Planning signal before Shipment exists. |
| Carrier preview | ขนส่งที่ระบุไว้ | รถร้าน | Shipment planning | Confirm in builder. |
| COD signal | COD | COD 12,000 บาท | Shipment / Payment Term | Show amount only where permission allows. |
| Stock warning | แจ้งเตือนสต๊อก | สต๊อกติดลบ | Ready Stock / Order Line | Warning only; acknowledgement happens in Shipment Builder. |
| Notes | หมายเหตุ | โทรก่อนส่ง | Order / Shipment note | Short preview. |
| Shipment intent | วิธีจัดส่ง | ส่งรวม / ส่งบางรายการ | Order / Shipment selection | Context only; the selected ready lines determine the actual Shipment round. |
| Bulk eligibility | สร้างรวมได้ | สร้างรวมได้ / ต้องเปิดแยก | Shipment rule | Helps admin manage many ready Orders quickly. |

## 9. Actions

| Action | Thai Label | Who can do it | Result | Confirmation needed? |
|---|---|---|---|---|
| Search ready queue | ค้นหา | Admin | Filters by Customer, phone, Order ID, Job ID. | No |
| Open Order | เปิดออเดอร์ | Admin and same/higher permission | Opens Order Detail. | No |
| Open Job | เปิด Job | Admin and same/higher permission | Opens Job Detail for custom ready item. | No |
| Create Shipment | สร้างรอบจัดส่ง | Admin and same/higher permission | Opens Shipment Builder for selected Order/items. | No |
| Select eligible Orders | เลือกรายการ | Admin and same/higher permission | Adds eligible Order rows to selected action bar. | No |
| Bulk create simple Shipments | สร้างรอบจัดส่งจากที่เลือก | Admin and same/higher permission | Opens a bulk review flow for eligible Orders only. | Yes |
| Return dashboard | กลับแดชบอร์ด | Admin | Returns to Admin Dashboard. | No |

## 10. Status / Chips

| Status | Thai Label | Meaning | Visual note |
|---|---|---|---|
| Ready to ship | พร้อมจัดส่ง | Item is ready for Shipment creation. | Positive chip. |
| Stock source | สินค้าพร้อมส่ง | Ready-stock Order Line. | Neutral source chip. |
| Custom source | งานสั่งทำเสร็จแล้ว | Completed `JOB-O`. | Pair with `JOB-O` where useful. |
| Service source | งานบริการ | Ready Service Case item. | Distinct source chip. |
| COD | COD | Shipment may carry COD amount. | Permission-aware chip. |
| Bulk eligible | สร้างรวมได้ | Order has no custom-work line and can be included in bulk shipment creation under confirmed rules. | Subtle blue/green chip. |
| Requires separate review | ต้องเปิดแยก | Order has details that should be reviewed individually before Shipment creation. | Neutral/warning chip. |
| Combined shipment | ส่งรวม | Multiple ready lines can be selected into one Shipment round. | Context chip. |
| Split shipment | ส่งบางรายการ | Only selected ready lines are being prepared now. | Context chip. |
| Stock warning | สต๊อกติดลบ | Ready-stock shortage was acknowledged earlier. | Warning chip/text, not a blocker. |

## 11. Empty State

Show `ไม่มีรายการพร้อมส่งที่รอสร้างรอบจัดส่ง` with no extra workflow explanation. Keep a secondary link back to `แดชบอร์ดแอดมิน`.

## 12. Error State

- Loading fails: `โหลดรายการรอจัดส่งไม่สำเร็จ` with retry.
- Permission fails: `ไม่มีสิทธิ์ดูรายการรอจัดส่ง`.
- Item is already being created/released by another admin: show `รายการนี้กำลังถูกสร้างรอบจัดส่งอยู่`.
- Search returns no results: `ไม่พบรายการที่ค้นหา`.

## 13. Permission Rules

- Admin users with matching permission can work from this shared queue.
- Same-permission or higher-permission users can continue queue work.
- Finance-sensitive COD/payment amount is permission-aware.
- Delivery Team cannot access this admin creation queue.
- Custom Jobs appear only after production is complete and ready for Shipment.
- For mixed Orders, ready-line eligibility follows current Order Detail / shipment-selection rules; unfinished custom work must not be included.
- Stock-negative ready-stock lines may still be eligible after acknowledgement; show warning and let Shipment Builder collect acknowledgement before creation/release.
- Delivery Team cannot access this pre-creation queue; delivery work starts only after admin releases a Shipment.

## 14. UX Notes for Designer

- Keep the queue Order-grouped; avoid loose individual item rows as the main structure.
- Make the default desktop layout usable for dozens of ready Orders: dense rows, sticky column header, clear row selection, and strong search.
- Keep the right drawer as a preview/helper, not the only way to work.
- Use bulk actions only for ready-stock-only Orders with no custom-work line; other Orders should require opening the row or Shipment Builder.
- Respect current ready-line eligibility before enabling row or bulk shipment creation.
- Add sort/group controls for `กำหนดส่ง`, `ขนส่งที่ระบุไว้`, `แหล่งที่มา`, and `COD`.
- Make source badges visible so admin can distinguish stock, custom, and service.
- Keep search simple and central.
- Do not add Hold behavior here.
- Keep `กำหนดส่งวันนี้` as a planning signal only; do not make this screen look like the delivery team's `รายการต้องจัดส่งวันนี้`.
- Use realistic examples: ready-stock chair set, completed teak display cabinet `JOB-O`, and service return item.

## 15. Image Generation Prompt

Use `docs/ux-ui/image-prompts/IMG-SHIP-001-ready-to-ship-queue.md`.

## 16. Open UX Questions

- None blocking for this queue.
