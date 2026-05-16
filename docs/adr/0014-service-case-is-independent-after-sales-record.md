# Service Case Is Independent After-sales Record

In the starting workflow, `Service Case` is an independent after-sales record. It may reference a Customer or old Order for context, but actions inside the Service Case do not reopen, close, recalculate, edit, or change the status of the referenced Order. Changes to the referenced Order also do not change the Service Case.

The starting Service Case scope supports records such as `คืนเงิน`, `ส่งของคืน`, `ส่งของกลับ`, claim notes, service notes, and Service Shipment creation. It does not create repair Jobs, `JOB-O`, or `JOB-P`.

## Considered Options

- Reopen or adjust the original Order when after-sales work happens.
- Let Service Case create repair Jobs in the same production workflow.
- Keep Service Case independent from the original Order and use it as an after-sales record with optional Service Shipment.

## Consequences

Original Order history remains stable for sales, shipment completion, and payment records. After-sales handling remains traceable without changing past operational history. Refunds, returned goods, or send-back work must be represented in Service Case notes, Financial Follow-up, Expense Entry, or Service Shipment as appropriate instead of mutating the original Order.

The first scope avoids pulling repair production, Order recalculation, stock return automation, and accounting adjustment rules into the main Job/Order workflow. If repeated repair-production cases become important later, they should be designed as a separate service-work workflow rather than silently reusing customer Order Jobs.
