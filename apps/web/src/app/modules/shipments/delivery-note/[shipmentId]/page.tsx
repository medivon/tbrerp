import { redirect } from "next/navigation";

import { DeliveryNotePreview } from "@/features/print-preview/delivery-note-preview";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessShipments, withUserParam } from "@/shared/permissions/access";

type DeliveryNotePageProps = {
  params: Promise<{ shipmentId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DeliveryNotePage({
  params,
  searchParams,
}: DeliveryNotePageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessShipments(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="ใบส่งของ">
      <DeliveryNotePreview
        currentUser={currentUser}
        shipmentId={decodeURIComponent(resolvedParams.shipmentId)}
      />
    </ShipmentShell>
  );
}
