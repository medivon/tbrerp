# Order Confirmation Creates Order Jobs

Complete custom-work details are entered inside the Order Create/Edit flow and become `JOB-O` immediately when the admin confirms the Order. THAIBORAN will not use a separate "waiting to create Job" step for customer custom work in this Order workflow, because the review screen already shows the operational result before confirmation and the workshop should receive a real Job only after the Order is real.

## Considered Options

- Confirm the Order first, then send custom lines to a separate `รอสร้าง Job` queue.
- Create `JOB-O` immediately from complete custom lines at Order confirmation.

## Consequences

The Order Create/Edit screen must collect enough `รายละเอียดงานสั่งทำ` for each custom line before confirmation. After confirmation, production-affecting changes must go through Job Detail / Job Revision rather than being silently edited from Order Detail.
