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
| `ออเดอร์ที่ต้องติดตาม` | Orders follow-up overview | `ออเดอร์` |
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

- `ออเดอร์ที่ต้องติดตาม`
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
- `แก้ไขรายการสินค้า` and `แก้ไขงานสั่งทำ` enter the guarded `แก้ไขรายการออเดอร์` edit mode from Order Detail, not casual inline editing inside the report and not a separate standalone module.

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
- Admin creates and confirms shipment rounds; delivery team marks sent, while admin records required tracking/evidence before closing.

### สินค้า / สต๊อก

Purpose:

- Product/SKU and ready-stock support for Order, Job, Shipment, and stock work.

Expected subcategories:

- Product/SKU management
- Ready Stock
- Material Stock
- Material Purchase Orders
- Material Adjustment
- Stock Count
- Stock Adjustment

Rules:

- `สต๊อกวัสดุ` is separate from `รายการสินค้า / SKU`.
- Material stock is lightweight in the starting workflow: no full warehouse, no BOM, no automatic Job material issue, and no automatic Expense creation.
- Material Items use one primary supplier in the starting workflow.
- Material Purchase Orders are one-supplier documents; they can create stock receipt and a payment-audit follow-up, but finance/payment remains under the finance permission flow.
- Material Purchase Orders linked to waiting-material Jobs can release those Jobs from `รอวัตถุดิบ` on receipt.

### ลูกค้า / CRM

Purpose:

- Customer search/list, Customer profile, CRM notes, address list, order history, service history, and Customer Sales Summary without entering the Order flow.

Expected subcategories:

- Customer search
- Customer profile
- CRM Note Timeline
- Address list
- Service Case History

Rules:

- Customer List row action is `เปิดลูกค้า`; creating Orders happens from Customer Detail or the Order module.
- Customer Detail is a single read-first page ordered as Summary, Address, CRM Notes, Order History, and Service Case History.
- `สร้างออเดอร์` from Customer Detail opens Order Create/Edit with the Customer and default Address Entry preselected.
- Deactivated Customers remain historical but are hidden from Order Create selection and cannot be edited until reactivated.
- Service Case History opens independent after-sales records. A Service Case may reference an Order for context only; it does not change Order status, totals, shipment completion, or cancellation state, and Order changes do not change the Service Case.

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

- Configuration, roles/permissions, product settings, and system settings.

Expected subcategories:

- Roles / Permissions
- ตั้งค่าสินค้า
- Carrier/evidence settings later

Rules:

- `ตั้งค่าสินค้า` contains tabs for `หมวดหมู่สินค้า`, `แท็กสินค้า`, `รายการสี`, `รายการลายรักสมุก`, `รายการลายแกะสลัก`, and `รายการสีคริสตัล`.
- Users without product-settings permission do not see `ตั้งค่าสินค้า`.
- Do not expose `CRUD`, `Master`, or `ข้อมูลตั้งต้นสินค้า` as staff-facing labels.

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
