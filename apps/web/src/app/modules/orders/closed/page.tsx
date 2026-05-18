import { redirect } from "next/navigation";

import { OrderList } from "@/features/orders/order-list";
import { OrderShell } from "@/features/orders/order-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessOrders, withUserParam } from "@/shared/permissions/access";

type ClosedOrdersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ClosedOrdersPage({
  searchParams,
}: ClosedOrdersPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessOrders(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <OrderShell currentUser={currentUser} title="ปิดแล้ว / ยกเลิก">
      <OrderList currentUser={currentUser} mode="closed" />
    </OrderShell>
  );
}
