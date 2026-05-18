# Rak Samuk Pricing Is Owner/Manager Approved

Rak Samuk prices are deliberately kept out of Order, Production, and Job workflow pages. Rak Samuk Standard Rate is visible only to Owner, Manager, and Finance, while the assigned Rak Samuk Worker sees only their own work price and may use `ขอเสนอราคา` until the related payable item is included in a finalized PV. Owner/Manager approve proposed prices; Finance pays or creates PV from the approved price.

## Considered Options

- Let Finance/payment-permission users approve proposed Rak Samuk prices.
- Show Rak Samuk price in Job cost context wherever finance permission exists.
- Keep price approval with Owner/Manager and keep workflow pages price-free.

## Consequences

Production users can understand work detail without seeing outsource pricing. Finance still controls payment execution, but SKU/Product Model standard-rate changes require Owner/Manager approval and an explicit choice about whether to update the standard rate.
