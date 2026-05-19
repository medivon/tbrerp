import { redirect } from "next/navigation";

import { ShipmentBuilder } from "@/features/shipments/shipment-builder";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessShipmentBuilder,
  withUserParam,
} from "@/shared/permissions/access";

type ShipmentBuilderPageProps = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShipmentBuilderPage({
  params,
  searchParams,
}: ShipmentBuilderPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessShipmentBuilder(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="สร้างรอบจัดส่ง">
      <ShipmentBuilder
        currentUser={currentUser}
        orderId={decodeURIComponent(resolvedParams.orderId)}
      />
    </ShipmentShell>
  );
}
