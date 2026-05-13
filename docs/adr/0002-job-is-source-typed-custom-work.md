# Job Is Source-Typed Custom Work

Job is the shared work unit for custom production instructions, whether it originates from a customer Order or from internal Production. A Job carries a Job Source Type and uses clear prefixes such as JOB-O for Order work and JOB-P for Production work, so departments can use one work-card pattern while the downstream outcome remains different.

## Considered Options

- Create separate concepts for customer custom jobs, production custom jobs, and custom products.
- Use one Job concept with source type and source-specific downstream flow.

## Consequences

Order Jobs become ready for Shipment when done. Production Jobs tied to SKU become ready for stock receipt, while custom/prototype Production Jobs can simply become Done.
