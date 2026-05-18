import { redirect } from "next/navigation";

import { OrderList } from "@/features/orders/order-list";
import { OrderShell } from "@/features/orders/order-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessOrders, withUserParam } from "@/shared/permissions/access";

type AllOrdersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AllOrdersPage({
  searchParams,
}: AllOrdersPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessOrders(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <OrderShell currentUser={currentUser} title="ออเดอร์ทั้งหมด">
      <OrderList currentUser={currentUser} mode="all" />
    </OrderShell>
  );
}
