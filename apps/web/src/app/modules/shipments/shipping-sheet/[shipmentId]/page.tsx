import { redirect } from "next/navigation";

import { ShippingSheetPreview } from "@/features/print-preview/shipping-sheet-preview";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessShipments, withUserParam } from "@/shared/permissions/access";

type ShippingSheetPageProps = {
  params: Promise<{ shipmentId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShippingSheetPage({
  params,
  searchParams,
}: ShippingSheetPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessShipments(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="ใบจัดส่ง">
      <ShippingSheetPreview
        currentUser={currentUser}
        shipmentId={decodeURIComponent(resolvedParams.shipmentId)}
      />
    </ShipmentShell>
  );
}
