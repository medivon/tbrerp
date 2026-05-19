import { redirect } from "next/navigation";

import { ReadyToShipQueue } from "@/features/shipments/ready-to-ship-queue";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessReadyToShipQueue,
  withUserParam,
} from "@/shared/permissions/access";

type ShipmentsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShipmentsPage({
  searchParams,
}: ShipmentsPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessReadyToShipQueue(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="รอสร้างรอบจัดส่ง">
      <ReadyToShipQueue currentUser={currentUser} />
    </ShipmentShell>
  );
}
