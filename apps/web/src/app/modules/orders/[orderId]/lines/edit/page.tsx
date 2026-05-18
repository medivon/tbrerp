import { redirect } from "next/navigation";

import { OrderLineEdit } from "@/features/orders/order-line-edit";
import { OrderShell } from "@/features/orders/order-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessOrders, withUserParam } from "@/shared/permissions/access";

type OrderLineEditPageProps = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OrderLineEditPage({
  params,
  searchParams,
}: OrderLineEditPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessOrders(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <OrderShell currentUser={currentUser} title="แก้ไขรายการออเดอร์">
      <OrderLineEdit
        currentUser={currentUser}
        orderId={resolvedParams.orderId}
      />
    </OrderShell>
  );
}
