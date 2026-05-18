# Customer, CRM, and Settings Visual Guidance

Use with `docs/ux-ui/design-system/visual-design-system.md`, active Customer/CRM decisions, `docs/ux-ui/03-navigation-map.md`, and the active interaction behavior file.

This file gives visual guidance for:

- Customer / CRM
- Address list
- CRM Notes
- Customer Sales Summary
- Service Case history
- Settings
- Roles/permissions settings visibility
- Controlled lists
- No-access / restricted settings behavior

## Visual Role

Customer/CRM supports Order creation, lookup, address selection, customer relationship notes, and history. It should feel like a practical customer operations file, not a sales funnel CRM or marketing contact database.

Settings should feel controlled and permission-aware. Use compact tables and modals, not configuration sprawl.

## Customer List

Visual structure:

- Sidebar active: `ลูกค้า / CRM`.
- Header: `ลูกค้า / CRM`.
- Search-first toolbar with instant search.
- Filters: Customer Tier, province, total sales, Customer Status, Customer Tag.
- Dense table with explicit `เปิดลูกค้า` action.

Columns:

- Customer name.
- Tier.
- Primary phone.
- Social.
- Default-address province/postal code.
- `ยอดซื้อรวม`.
- Status/match chips.
- Action.

Do not show Order count as a separate column in starting workflow. Do not show private CRM notes. Do not add bulk actions or export.

Search result chips:

- `ตรงกับเบอร์`
- `ตรงกับ Social`
- `ตรงกับที่อยู่`

Deactivated Customers appear only when `รวมลูกค้าที่ปิดใช้งาน` is enabled.

## Customer Detail

Customer Detail is a single read-first page, not a tabbed workspace.

Section order:

1. Summary
2. Address
3. `CRM Note Timeline`
4. `Order History`
5. `Service Case History`

Summary visual rules:

- Customer name and primary phone are primary.
- Show Customer Code as stable metadata.
- Show Social section starting with `Facebook`.
- Show Customer Tier and tags as chips.
- Show `ยอดซื้อรวม` and `ออเดอร์สำเร็จ X รายการ` where permission allows.
- Top actions: `แก้ไขข้อมูลลูกค้า`, `สร้างออเดอร์`.

If Customer is deactivated:

- Strong but calm `ปิดใช้งาน` state.
- Hide `สร้างออเดอร์`.
- Editing unavailable until reactivation where allowed.

## Address List

Visual structure:

- Default address card first with `ที่อยู่หลัก` badge.
- Up to three saved Address Entry cards.
- Each card shows recipient, phone, structured address, label if present, and action area.
- Incomplete address state uses chip `ข้อมูลที่อยู่ยังไม่ครบ`.

Rules:

- Address fields should be structured and readable.
- Show three-address limit when add is disabled.
- New Order/Shipment addresses are snapshots first.
- Saving a new Order/Shipment address back to Customer must be an explicit checkbox/action such as `บันทึกที่อยู่นี้ไว้ในข้อมูลลูกค้า`.
- Do not imply old Orders or Shipments will update when Customer address changes.

## CRM Notes

CRM Notes use a timeline style.

Visual structure:

- Section header: `บันทึก CRM`.
- Action in section header: `เพิ่มบันทึก CRM`.
- Timeline item: author, date/time, optional type, content, optional linked Order, optional images, optional pin/star.
- Hide/deactivate treatment rather than hard-delete treatment.

Do not place `เพิ่มบันทึก CRM` as the top-level Customer Detail action. Private CRM Notes are outside the starting scope.

## Customer Sales Summary

Use compact summary cards or inline metrics:

- `ยอดซื้อรวม`
- `ออเดอร์สำเร็จ X รายการ`

Visual rules:

- Show only to Customer/CRM-permission users allowed by active docs.
- Treat as maintained operational sales summary, not an accounting ledger.
- Do not show outstanding balance, accounting ageing, or forecasts.

## Order History

Visual structure:

- Compact table/list under Customer Detail.
- Show Order ID, date, compact item summary, total where permission allows, Order status, Shipment status, and `เปิดออเดอร์`.
- Empty state: `ยังไม่มีประวัติออเดอร์` with action to create Order where Customer is active and user has permission.

Do not put Order editing controls inside Customer History.

## Service Case History

Visual structure:

- Compact list of independent after-sales records.
- Show status, service type, linked Order if any, latest activity, and open action.
- Creation action may open Service Case with Customer already linked.

Service Case is independent. Visual copy must not imply it reopens, recalculates, edits, or changes the referenced Order.

## Settings Visual Style

Settings live under `ตั้งค่า` and appear only when the user has relevant settings permission.

Use:

- Compact left/secondary nav for settings categories.
- Dense tables.
- Add/edit drawers or modals.
- Status chips.
- Blocking modals with links to records that prevent close/deactivation.
- Management Log reference where useful.

Do not create an overwhelming full "system admin" dashboard for starting scope.

## Roles and Permissions Visibility

`Roles / Permissions` is Owner-only.

Visual rules:

- Users without permission do not see the menu.
- Direct link access shows standard no-access page.
- If permission changes while user is on a restricted page, route to own first screen or no-access.
- Do not show disabled permission controls to non-owners.
- Role/permission changes should visually feel serious and write Audit Log according to active docs.

Base roles:

- `พนักงานไทยโบราณ` and `Outsource` should land on Personal Dashboard/profile/own documents/income.
- They should not see main ERP module navigation.

## Controlled Lists

Controlled lists should use normal Thai labels, not technical database labels.

Examples:

- Product Settings: `ตั้งค่าสินค้า`.
- Finance lists: Payment Method, Expense Category.
- Customer Tier.
- Carrier list.
- Service Case Type.
- Material category/unit mini managers.

Visual rules:

- Active/inactive chips.
- Used values cannot be deleted; use `ปิดใช้งาน`.
- Unused values may show delete where allowed.
- If closing is blocked, show the blocking records in a modal with `เปิดสินค้า`, `เปิด Job`, or relevant links.
- Mini managers inside product/material flows should be lightweight and scoped: add, search, reopen. They do not replace full settings.

Do not show `CRUD`, `Master`, or `ข้อมูลตั้งต้นสินค้า`.

## No-access and Restricted Settings Behavior

Use one consistent no-access surface:

- Message: `ไม่มีสิทธิ์เข้าถึงหน้านี้`.
- One action: return to own home/first screen.
- Do not render restricted data with hidden fields.
- Do not show masked sensitive values.

For state-blocked settings actions:

- Keep action visible but disabled.
- Show clear reason.
- Provide links to blocking records where active docs allow.

For missing permission:

- Hide the action or menu entirely.

## Sensitive and Permission-aware Customer Data

Customer/CRM is visible to Owner, Manager, Admin/Sales, and Finance, with Finance read-only for customer master data.

Hide or restrict:

- Customer master edit actions for Finance.
- Private CRM notes because they are outside starting scope.
- Exports where not approved.
- Finance-sensitive detail outside the finance permission context.

## Empty and Error States

Customer list:

- Filter empty: `ไม่พบลูกค้าที่ตรงกับตัวกรอง` with `ล้างตัวกรอง`.
- No customers: `ยังไม่มีลูกค้า`.

Customer detail:

- No Orders: `ยังไม่มีประวัติออเดอร์`.
- Incomplete address: `ข้อมูลที่อยู่ยังไม่ครบ`.
- Deactivated: visible `ปิดใช้งาน` state and no Order creation action.

Settings:

- No values: `ยังไม่มีรายการ`.
- Permission: standard no-access.
- Duplicate values: field-level error and link to existing record where helpful.

## Old Mockup References

Archived Customer/CRM or Settings visuals, if any, may inform only general density. Current docs override any visual that implies customer merge, private CRM notes, bulk customer actions, settings import/export, hidden-but-rendered permissions, or unrestricted role/permission access.
