import { redirect } from "next/navigation";

import { OrderDetail } from "@/features/orders/order-detail";
import { OrderShell } from "@/features/orders/order-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessOrders, withUserParam } from "@/shared/permissions/access";

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OrderDetailPage({
  params,
  searchParams,
}: OrderDetailPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessOrders(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <OrderShell currentUser={currentUser} title="รายละเอียดออเดอร์">
      <OrderDetail currentUser={currentUser} orderId={resolvedParams.orderId} />
    </OrderShell>
  );
}
