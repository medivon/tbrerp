# Identity & Access Grill Notes - IA-BATCH-002

Temporary checkpoint notes for later Grill Doc consolidation. Not an official source-of-truth document.

## Batch Range

IA-026 to IA-050

## Questions Answered

- IA-026: All active Users use one login page. After login, the system sends each user to the appropriate first screen by role/permission.
- IA-027: If a User has multiple roles, the first screen is chosen by highest-priority role, not by user preference in the first scope.
- IA-028: First-screen priority order: `Super Admin / Owner` -> `Manager` -> `Admin / Sales` -> `Finance` -> `Product / Stock` -> `Woodwork` -> `Coloring` -> `Delivery Team` -> `Rak Samuk Worker` -> personal dashboard.
- IA-029: Users with only base roles (`พนักงานไทยโบราณ` or `Outsource`) land on the personal dashboard.
- IA-030: Base roles do not see main system menus. They see only personal dashboard/profile and their own documents/income where applicable.
- IA-031: `Admin / Sales` sees `แดชบอร์ด`, `ออเดอร์`, `งานสั่งทำ / ผลิต`, `รอบจัดส่ง`, `ลูกค้า / CRM`, and limited finance follow-up according to permission. `ตั้งค่า` is hidden unless extra permission is granted.
- IA-032: `Admin / Sales` can see Product/SKU lookup and Ready Stock availability for selling/selection, but not cost, stock adjustment, material purchase, or settings by default.
- IA-033: `Admin / Sales` can see sales price, discount, total, Payment Term, customer-facing Payment Record, and COD follow-up; they do not see cost, profit, labor, payout, expense detail, or Audit Log.
- IA-034: `Finance` sees finance dashboard/queues, COD/Payment follow-up, Expense, Payment Voucher, finance reports, and can open related Order/Shipment/Customer context for finance review.
- IA-035: `Finance` mainly views Order/Shipment for context and performs finance actions such as closing follow-up, recording/correcting payment evidence, approving Rak Samuk price, and creating PV. Finance does not automatically create/edit Orders or close Shipments.
- IA-036: `Product / Stock` sees practical Product/Stock work: Product/SKU, Ready Stock, stock count/adjustment, Material Stock, Material Purchase Orders. They can open Job/Order only for stock/material context and do not see sales money/profit.
- IA-037: `Product / Stock` can see and edit Product Settings such as categories, colors, Rak Samuk patterns, and carving patterns.
- IA-038: `Woodwork` sees its work queue, work-to-do area, production details, images/instructions, and relevant history. It does not see Order, customer, sales price, finance, full stock, or settings.
- IA-039: `Coloring` follows the same worker visibility rule as Woodwork, focused on coloring queue / coloring intake and relevant production details.
- IA-040: `Woodwork` and `Coloring` see Full Production Job Detail for both `JOB-O` and `JOB-P`, enough to inspect design and coordinate quality. They do not see customer/business details such as customer, price, payment, cost, or sensitive logs. The UI should highlight the department-relevant section.
- IA-041: `Woodwork` and `Coloring` see Job ID and source type (`JOB-O` / `JOB-P`) but not Order ID or customer name.
- IA-042: `Delivery Team` sees delivery-required Shipment data: Shipment ID, item list, product images, quantity, recipient, phone, address, carrier, notes, and related delivery context.
- IA-043: `Delivery Team` can see COD amount only for Shipments they are responsible for, both in the UI and on the Shipping Sheet.
- IA-044: `Delivery Team` does not perform finance actions. COD/payment follow-up closure remains with Admin/Finance permission.
- IA-045: `Admin / Sales` has full operational Shipment/Delivery authority: create Shipment, release to delivery team, see/print related COD, mark `ส่งออกแล้ว` on behalf of delivery team, record/correct tracking/evidence before close, and close Shipment. Closing COD/payment follow-up remains separate under Admin/Finance permission.
- IA-046: `Delivery Team` performs only field delivery work: view released delivery work, see COD for own work, add delivery note/evidence photo, and mark `ส่งออกแล้ว`. They cannot edit address, carrier, items, tracking, or close Shipment.
- IA-047: `Rak Samuk Worker` sees Full Production Job Detail only for work assigned to them, including production images/details/design/size/color/pattern/notes, Job ID/source type, quantity, and their own price. They do not see customer, Order ID, sales price, payment, cost, other workers' prices, other workers' work, Management Log, or Audit Log.
- IA-048: `Manager` sees all main work modules and management reports, including Order, Job/Production, Shipment, Product/Stock, CRM, finance summary, Expense/PV, and logs according to permission. Manager cannot set Role/Permission and does not have Owner-level Audit authority.
- IA-049: `Manager` sees management-level financial information such as sales, payment status, COD follow-up, expense summary, rough profit, and Rak Samuk payout summary. Detailed finance actions such as editing payment evidence, closing follow-up, creating PV, or changing detailed money records require Finance permission.
- IA-050: `Super Admin / Owner` is highest authority and can see/do everything, including Audit Log, Role/Permission, sensitive finance, overrides, and all User personal data. Important actions still require logs and, where appropriate, reasons.

## Decisions Captured

- One login entry is used for all active Users.
- First screen after login is role-priority based in the first scope.
- Base roles land on personal dashboard and do not see main ERP menus.
- Admin/Sales owns the main customer-facing operational flow and has full Shipment/Delivery operational authority.
- Finance is separated from operational Order/Shipment work, but can act on finance follow-up, evidence, Rak Samuk price approval, and PV.
- Product/Stock can manage product/stock operations and Product Settings, without sales/profit visibility by default.
- Worker roles should see full production detail needed for quality, not just a narrow department fragment.
- Full Production Job Detail is distinct from Full Business Detail.
- Woodwork, Coloring, and Rak Samuk Worker do not see customer identity, Order ID, sales price, payment, cost, or sensitive logs by default.
- Delivery Team can see COD for its own Shipments. This is a deliberate change from earlier rules.
- Delivery Team remains field-operation only and cannot close Shipments or finance follow-ups.
- Manager gets broad management visibility but not Owner-level permission management or Audit authority.
- Owner is highest authority with complete visibility and override scope, subject to logs/reasons.

## Unclear Areas / Follow-Up Questions

- Exact module visibility matrix is partially clear but still needs grouped confirmation for Settings, Reports, Logs, CRM, Expense/PV, Material Stock, and Finance screens per role.
- Exact action permission matrix is not complete for create/edit/cancel/close/export/print across modules.
- Exact sensitive-field matrix still needs confirmation: product cost, profit, expense detail, supplier payment, Rak Samuk rate, worker payout, customer contact/private notes, attachments/evidence, and logs.
- Exact definition of Full Production Job Detail needs later consolidation into official terms.
- Whether Admin/Sales can edit Product/SKU data or only lookup/select remains not fully confirmed.
- Whether Manager can act operationally in each module or only view/manage exceptions needs more detailed permission questions.
- Whether Delivery Team COD visibility should be tied to role or to assigned/released Shipment responsibility needs later precise business wording.

## Conflicts With Existing Docs

- Existing docs say Delivery Team does not see COD amount in the system UI.
- Existing docs say Shipping Sheet COD amount is visible/printable only to users with COD/payment permission.
- IA-043 changes this: Delivery Team can see COD amount for their responsible Shipments in UI and Shipping Sheet.
- Existing docs describe worker views as limited. IA-040 and IA-047 refine this: worker views should be full production detail but limited business detail.

## Terms That May Need CONTEXT.md Updates Later

- `Full Production Job Detail`
- `Full Business Detail`
- `Personal Dashboard`
- `Role Priority / First Screen Priority`
- `Finance Action`
- `Operational Shipment Authority`
- `Delivery Team Field Work`
- `Manager Financial Summary`
- `Owner Highest Authority`

## Decisions That May Need docs/decision-log.md Updates Later

- Single login page for all active Users.
- Role-priority first-screen order.
- Base roles see only personal dashboard/profile/documents/income.
- Admin/Sales has full operational Shipment/Delivery authority.
- Delivery Team sees COD for responsible Shipments but cannot close finance follow-up.
- Worker roles see full production detail while sensitive business details remain hidden.
- Manager has broad module visibility and finance summary visibility but not Owner-level permission/Audit power.
- Owner has complete authority and visibility, with logs/reasons for critical actions.

## Possible ADR Candidates

- Possibly: separate Full Production Job Detail from Full Business Detail for worker-facing access. This may be worth an ADR if it shapes many screens and permission rules.
- Possibly: allow Delivery Team COD visibility despite earlier stricter finance-permission rule. This is a business trade-off between privacy and delivery simplicity.
- Possibly: use role-priority first-screen routing instead of configurable user landing pages in the first scope. This is probably not ADR-worthy unless later debated.

## Suggested Focus For Next Batch

- Complete module visibility for remaining modules and roles at grouped level.
- Start action permissions by module: create, edit, cancel/archive/close, export/print, evidence access, and direct-link behavior.
- Clarify sensitive-field visibility groups before drilling into individual screens.
- Clarify which actions require reason, evidence, Activity Log, Management Log, or Audit Log.
