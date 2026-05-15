# Product Model Owns Color-generated SKU Variants

Product/SKU management uses **Product Model** (`SKU หลัก` / `SKU ใหญ่`) as the primary product record, and color-specific **SKU Variants** (`SKU ย่อย`) are created from enabled `รายการสี` values on that Product Model. This keeps product setup small for admins, prevents duplicate variants for the same product-color pair, and lets Order, stock, and production workflows work from the same color-specific SKU when needed.

## Considered Options

- Create and manage each SKU Variant manually as a primary table row.
- Create every `รายการสี` value under every Product Model by default.
- Let each Product Model choose real color options and create/reuse the matching SKU Variants automatically.

## Consequences

Product lists show Product Models first, Product Detail owns color enable/disable work, and stock wording must distinguish `มีอยู่ในร้าน`, `จองแล้ว`, and `ขายได้`. Closed color options are hidden from new sale/production selection but remain visible in history.
