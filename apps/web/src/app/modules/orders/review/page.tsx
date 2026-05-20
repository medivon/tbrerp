import { redirect } from "next/navigation";

import { OrderReview } from "@/features/orders/order-review";
import { OrderShell } from "@/features/orders/order-shell";
import {
  getOrderReviewScenarioId,
  orderReviewScenarioIds,
  type OrderReviewScenarioId,
} from "@/features/orders/fixtures/orders";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canConfirmOrders, withUserParam } from "@/shared/permissions/access";

type OrderReviewPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OrderReviewPage({
  searchParams,
}: OrderReviewPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);
  const requestedScenario = Array.isArray(params.case)
    ? params.case[0]
    : params.case;
  const hasExplicitScenario =
    typeof requestedScenario === "string" &&
    orderReviewScenarioIds.includes(requestedScenario as OrderReviewScenarioId);
  const scenarioId = getOrderReviewScenarioId(
    hasExplicitScenario ? requestedScenario : undefined,
  );

  if (!canConfirmOrders(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <OrderShell currentUser={currentUser} title="ตรวจสอบก่อนสร้างออเดอร์">
      <OrderReview
        allowSeedScenario={hasExplicitScenario}
        currentUser={currentUser}
        scenarioId={scenarioId}
      />
    </OrderShell>
  );
}
