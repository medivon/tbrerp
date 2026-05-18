import { redirect } from "next/navigation";

import { OrderCreate } from "@/features/orders/order-create";
import { OrderShell } from "@/features/orders/order-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessOrders, withUserParam } from "@/shared/permissions/access";

type OrderCreatePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OrderCreatePage({
  searchParams,
}: OrderCreatePageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);
  const draftNo = Array.isArray(params.draft) ? params.draft[0] : params.draft;

  if (!canAccessOrders(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <OrderShell currentUser={currentUser} title="สร้างออเดอร์">
      <OrderCreate currentUser={currentUser} draftNo={draftNo} />
    </OrderShell>
  );
}
