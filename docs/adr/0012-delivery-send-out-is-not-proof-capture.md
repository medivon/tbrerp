# Delivery Send-out Is Not Proof Capture

In the starting workflow, `ส่งออกแล้ว` is a Delivery Team handoff, not the moment where delivery proof is required. Delivery can mark one Shipment sent out from a row/card action or bulk-mark today's/no-date Shipments; admin later records Tracking or at least one delivery evidence photo in `ยืนยันการจัดส่ง` before closing the Shipment. Delivery reports use the `ส่งออกแล้ว` date, while Order Completion still waits for Shipment close.

## Considered Options

- Require Delivery Team to enter Tracking or attach a photo before `ส่งออกแล้ว`.
- Let Delivery Team send out first, then make admin responsible for Tracking/evidence before close.

## Consequences

Delivery screens stay fast for shop-floor work and do not expose Tracking entry or admin close controls. Shipment close remains protected because admin cannot close without Tracking or one delivery evidence photo.

This also separates operational delivery reporting from admin evidence cleanup: the business can see what left the shop on the send-out date without treating that as final Shipment close.
