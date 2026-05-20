import { redirect } from "next/navigation";
import { EmptyState } from "@thaiboran/ui";

import { ShipmentTabs } from "@/features/shipments/components/shipment-tabs";
import { ShipmentShell } from "@/features/shipments/shipment-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessReadyToShipQueue,
  withUserParam,
} from "@/shared/permissions/access";

type ShipmentHistoryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShipmentHistoryPage({
  searchParams,
}: ShipmentHistoryPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessReadyToShipQueue(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ShipmentShell currentUser={currentUser} title="ประวัติรอบจัดส่ง">
      <div className="mx-auto grid w-full max-w-[1180px] gap-5">
        <ShipmentTabs activeTab="history" currentUser={currentUser} />
        <EmptyState title="ยังไม่มีประวัติรอบจัดส่ง" />
      </div>
    </ShipmentShell>
  );
}
