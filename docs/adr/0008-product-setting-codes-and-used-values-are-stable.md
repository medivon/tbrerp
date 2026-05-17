# Product Setting Codes And Used Values Are Stable

Product settings use `ตั้งค่าสินค้า` as the staff-facing area, and records that have already affected SKU, Product, Order, or Job history are not silently deleted or rewritten. Color/category codes that have appeared in SKU Variant codes become locked. Used records may be renamed when the business meaning stays the same, but old Order/Job/document snapshots keep the values captured at the time of work. When the meaning changes or the value is retired, close it with `ปิดใช้งาน` instead of deleting it.

## Considered Options

- Let admins freely edit/delete product setting records and update historical records.
- Never allow edits after first use.
- Allow safe display cleanup while locking SKU-affecting codes and using `ปิดใช้งาน` for used values.

## Consequences

Product Settings needs blocking modals for close actions, Management Log for setting changes, and a mini manager in product flows that can add/search/reopen values without exposing full settings complexity.
