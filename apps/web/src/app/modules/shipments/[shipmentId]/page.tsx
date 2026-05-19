import { redirect } from "next/navigation";

import { ShipmentDetail } from "@/features/shipments/shipment-detail";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessShipments, withUserParam } from "@/shared/permissions/access";

type ShipmentDetailPageProps = {
  params: Promise<{ shipmentId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShipmentDetailPage({
  params,
  searchParams,
}: ShipmentDetailPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessShipments(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="รอบจัดส่ง">
      <ShipmentDetail
        currentUser={currentUser}
        shipmentId={decodeURIComponent(resolvedParams.shipmentId)}
      />
    </ShipmentShell>
  );
}
