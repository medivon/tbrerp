import { redirect } from "next/navigation";

import { DraftOrderQueue } from "@/features/orders/draft-order-queue";
import { OrderShell } from "@/features/orders/order-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessOrders, withUserParam } from "@/shared/permissions/access";

type DraftOrdersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DraftOrdersPage({
  searchParams,
}: DraftOrdersPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessOrders(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <OrderShell currentUser={currentUser} title="ร่างออเดอร์">
      <DraftOrderQueue currentUser={currentUser} />
    </OrderShell>
  );
}
