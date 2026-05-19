import { redirect } from "next/navigation";

import { AdminShipmentConfirmationQueue } from "@/features/shipments/admin-confirmation-queue";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessShipmentConfirmationQueue,
  withUserParam,
} from "@/shared/permissions/access";

type ShipmentConfirmationPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShipmentConfirmationPage({
  searchParams,
}: ShipmentConfirmationPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessShipmentConfirmationQueue(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="ยืนยันการจัดส่ง">
      <AdminShipmentConfirmationQueue currentUser={currentUser} />
    </ShipmentShell>
  );
}
