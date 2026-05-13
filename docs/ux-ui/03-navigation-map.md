# Navigation Map

This file records the current UX/UI navigation baseline. It is derived from the approved Admin Dashboard mockup and the active domain documents. It is not a new requirements summary.

Approved visual anchor:

- `docs/ux-ui/mockups/SCR-ADM-001-admin-dashboard/SCR-ADM-001-approved.png`

Reusable shell reference:

- `docs/ux-ui/design-system/app-shell.md`

## Current Main Navigation

The approved main sidebar navigation is:

- `แดชบอร์ด`
- `ออเดอร์`
- `งานสั่งทำ / ผลิต`
- `รอบจัดส่ง`
- `สินค้า / สต๊อก`
- `ลูกค้า / CRM`
- `รายจ่าย`
- `ตั้งค่า`

Rules:

- Treat this sidebar as the current desktop admin navigation baseline.
- Keep sidebar labels Thai-first.
- Keep English only where it is an established internal term, such as `CRM`.
- Do not show `ร่างออเดอร์` as a dashboard card or sidebar badge.
- `ร่างออเดอร์` belongs under `ออเดอร์`.
- `งานสั่งทำ / ผลิต` is the navigation home for Job Tracking, including `JOB-O` and `JOB-P`.
- `รอบจัดส่ง` remains a main navigation item, not only a subpage under Order.

## Dashboard Card Navigation

The approved Admin Dashboard cards route users into working queues or overviews.

| Dashboard Card | Routes To | Navigation Area |
|---|---|---|
| `ออเดอร์กำลังดำเนินการ` | Active Orders overview | `ออเดอร์` |
| `งานกำลังผลิต` | Job overview across `JOB-O` and `JOB-P` | `งานสั่งทำ / ผลิต` |
| `รอสร้างรอบจัดส่ง` | Ready-to-ship / shipment-round creation queue | `รอบจัดส่ง` |
| `ยืนยันการจัดส่ง` | Shipment confirmation queue | `รอบจัดส่ง` |
| `งานผลิตต้องติดตาม` | Production follow-up queue | `งานสั่งทำ / ผลิต` |
| `ติดตาม COD / Payment` | Financial follow-up queue | `รายจ่าย` or finance-permission work area |

Notes:

- Dashboard cards are shortcuts, not the only navigation path.
- The dashboard does not create Orders or Jobs directly.
- Order creation actions live under `ออเดอร์`.
- Draft Orders live under `ออเดอร์` as a subcategory, tab, or filter.

## Main Navigation Detail

### แดชบอร์ด

Purpose:

- Main operational overview and queue launcher.

Primary screen:

- `SCR-ADM-001-admin-dashboard`

Contains:

- Six approved dashboard cards.
- `งานที่ต้องรีบดู` critical work preview.

### ออเดอร์

Purpose:

- Work with confirmed Orders and Order entry.

Expected subcategories:

- `ออเดอร์กำลังดำเนินการ`
- `ออเดอร์ทั้งหมด`
- `ร่างออเดอร์`
- `ปิดแล้ว / ยกเลิก`

Rules:

- `ร่างออเดอร์` is not shown as a main dashboard card.
- `ร่างออเดอร์` is a saved-draft tab; unsaved Order Create/Edit work does not appear there.
- Draft Orders do not create Order ID, reserve stock, create Job, create Shipment, or enter reports.
- `ออเดอร์ทั้งหมด` shows all real Orders across all main statuses and excludes Draft Orders.
- `ออเดอร์ทั้งหมด` has a page-level `สร้างออเดอร์ใหม่` action that opens Order Create/Edit directly.
- From `ออเดอร์ทั้งหมด`, row action `เปิดออเดอร์` routes to Order Detail.
- Shipment creation, payment follow-up, and other operational actions happen after opening Order Detail, not as crowded row actions in `ออเดอร์ทั้งหมด`.
- In Order Detail, `จัดการออเดอร์` is the header shortcut menu; line shipment creation happens in `จัดการรอบจัดส่ง`.
- `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` route to `แก้ไขรายการออเดอร์`, not to casual inline editing inside the report.

### งานสั่งทำ / ผลิต

Purpose:

- Job Tracking for both customer custom work and internal production work.

Expected subcategories:

- `งานทั้งหมด`
- `งานลูกค้า (JOB-O)`
- `ผลิตเข้าสต๊อก / ผลิตทดลอง (JOB-P)`
- `คิวช่างไม้`
- `คิวฝ่ายสี`
- `รักสมุก`
- `ติดตามงานผลิต`

Rules:

- Use this navigation item instead of `งานผลิต` alone.
- `งานกำลังผลิต` on the dashboard counts Jobs, not Orders.
- `รอสร้าง Job` is not a dashboard concept because Jobs are created as part of confirmed Order or Production flows.

### รอบจัดส่ง

Purpose:

- Create shipment rounds and confirm shipment completion evidence.

Expected subcategories:

- `รอสร้างรอบจัดส่ง`
- `รายการต้องจัดส่งวันนี้`
- `รายการรอวันจัดส่ง`
- `ยืนยันการจัดส่ง`
- `ปิดแล้ว`

Rules:

- Desktop admin screens in this module should show these subcategories as a compact module sub menu, separate from filter chips.
- `รอสร้างรอบจัดส่ง` dashboard count uses number of Orders.
- `รอสร้างรอบจัดส่ง` is an admin pre-creation queue; it shows ready Orders before Shipment exists.
- `รายการต้องจัดส่งวันนี้` is a delivery work screen for released Shipments due today or without delivery date; Admin may view it, but creation controls do not belong there.
- `รายการรอวันจัดส่ง` is a delivery work screen for released future-date Shipments.
- `ยืนยันการจัดส่ง` dashboard count uses number of shipment rounds.
- Admin creates and confirms shipment rounds; delivery team marks sent and adds required evidence.

### สินค้า / สต๊อก

Purpose:

- Product/SKU and ready-stock support for Order, Job, Shipment, and stock work.

Expected subcategories:

- Product/SKU management
- Ready Stock
- Stock Count
- Stock Adjustment

### ลูกค้า / CRM

Purpose:

- Customer profile, CRM notes, address/recipient history, order history, and service history.

Expected subcategories:

- Customer search
- Customer profile
- CRM Note Timeline
- Address / Recipient History
- Service Case History

### รายจ่าย

Purpose:

- Simple expense tracking and payment documents.

Expected subcategories:

- Expense Entry
- Payment Voucher
- Financial Follow-up where permission allows

Rules:

- Dashboard may show `ติดตาม COD / Payment`, but detailed finance-sensitive information remains permission-aware.

### ตั้งค่า

Purpose:

- Configuration, roles/permissions, masters, and system settings.

Expected subcategories:

- Roles / Permissions
- Product masters
- Color Master
- Pattern masters
- Carrier/evidence settings later

## Top Bar Navigation Pattern

Approved top bar:

- Menu/collapse icon
- Page title
- Current date
- User avatar
- User name
- Role label
- Account menu

Rules:

- Do not place primary creation actions in the Admin Dashboard top bar.
- Keep creation actions inside the relevant module.
- Keep account/role information visible because permission affects queue visibility.

## Conflicts Found

None found between the approved navigation baseline and current active business rules, ADRs, `CONTEXT.md`, or what-not-to-show rules.
