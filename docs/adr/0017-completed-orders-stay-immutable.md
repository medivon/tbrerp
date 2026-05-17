# Completed Orders Stay Immutable

After an Order is completed, the original Order data is not edited in normal workflow. Later problems are handled through completed-Order notes, Service Cases, finance notes, correction records, or an Owner/Manager-only `รอบจัดส่งพิเศษ` that is recorded on the Order but does not affect stock, sales totals, or Order Completion.

## Considered Options

- Reopen completed Orders and edit the original data.
- Let Admin/Sales create extra Shipments after completion.
- Keep completed Orders stable and route exceptions through explicit follow-up records.

## Consequences

Sales and completion history stays stable. Admin/Sales can still handle customer problems through Service Case, while the special shipment bypass is restricted to Owner/Manager with a required reason and Management Log to reduce hidden agenda risk.
