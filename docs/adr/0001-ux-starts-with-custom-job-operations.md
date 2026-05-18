# UX Starts With Custom Job Operations

The first UX/UI scope starts with งานสั่งทำ (Job) as the operating center, because prior discovery identified custom work as the root cause of repeated questions, lost status, production mistakes, and delayed shipment. The first screen to design is the Admin Dashboard, since admin creates Orders, releases Jobs, creates Shipments, closes Shipments, and owns the shared queues that connect the rest of the workflow. This deliberately avoids a generic "ERP phase 1" and focuses the first screens on Order-to-Job-to-Outsource-to-Shipment visibility, with only the Product/SKU, ready-stock, expense, and Payment Voucher support needed for that workflow.

## Considered Options

- Start with generic ERP modules such as products, stock, accounting, and reports.
- Start with custom job operations and include only supporting modules needed to complete the work.

## Consequences

Full accounting, tax invoices, quotation, channel analytics, payroll automation, and shipping API integrations remain outside the first UX/UI scope.
