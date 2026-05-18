import { redirect } from "next/navigation";

import { jobRoutes } from "@/features/jobs/routes";
import { RakSamukMissingPrice } from "@/features/rak-samuk/rak-samuk-missing-price";
import { WorkerShell } from "@/features/worker/worker-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessRakSamukWorkerWork,
  withUserParam,
} from "@/shared/permissions/access";

type RakSamukMissingPricePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RakSamukMissingPricePage({
  searchParams,
}: RakSamukMissingPricePageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);
  const workId = Array.isArray(params.workId)
    ? params.workId[0]
    : params.workId;

  if (!canAccessRakSamukWorkerWork(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <WorkerShell
      backHref={jobRoutes.rakSamukWorker}
      currentUser={currentUser}
      title="ไม่มีราคา / ให้แจ้งราคา"
    >
      <RakSamukMissingPrice currentUser={currentUser} workId={workId} />
    </WorkerShell>
  );
}
