import { redirect } from "next/navigation";

import { DeliveryDashboard } from "@/features/shipments/delivery-dashboard";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessDeliveryDashboard,
  withUserParam,
} from "@/shared/permissions/access";

type ReleasedDeliveryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ReleasedDeliveryPage({
  searchParams,
}: ReleasedDeliveryPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessDeliveryDashboard(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="รายการต้องจัดส่งวันนี้">
      <DeliveryDashboard currentUser={currentUser} />
    </ShipmentShell>
  );
}
