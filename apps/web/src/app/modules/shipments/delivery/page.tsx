import { redirect } from "next/navigation";

import { DeliveryDashboard } from "@/features/shipments/delivery-dashboard";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessDeliveryDashboard,
  withUserParam,
} from "@/shared/permissions/access";

type DeliveryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DeliveryPage({
  searchParams,
}: DeliveryPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);
  const tab = params.tab === "waiting" ? "waiting" : "today";

  if (!canAccessDeliveryDashboard(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="ฝ่ายจัดส่ง">
      <DeliveryDashboard currentUser={currentUser} initialTab={tab} />
    </ShipmentShell>
  );
}
