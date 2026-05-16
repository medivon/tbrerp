# SKU Production Completion Adds Ready Stock

For the starting production workflow, a `JOB-P` tied to a SKU Variant increases Ready Stock immediately when the production work is marked complete, using that Job's production quantity. We are deliberately skipping a separate stock-receipt screen for this path because the shop wants the act of completing SKU production to be the stock handoff, while special/prototype `JOB-P` work that is not tied to a SKU simply ends as Done and can be followed up manually.

## Considered Options

- Send completed SKU production to a separate `รอรับเข้าสต๊อก` receipt queue.
- Increase Ready Stock automatically when the tied-SKU `JOB-P` is completed.

## Consequences

Production users must split different SKU/color outcomes into separate `JOB-P` records before starting work. If work is damaged or incomplete, the team repeats production until the Job can be completed; the first workflow does not model defect quantity or partial stock increase.
