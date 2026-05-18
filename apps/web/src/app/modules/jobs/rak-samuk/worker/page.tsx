import { redirect } from "next/navigation";

import { getRakSamukWorkerWorksForUser } from "@/features/jobs/fixtures/jobs";
import { RakSamukWorkerWorkList } from "@/features/rak-samuk/rak-samuk-worker-work-list";
import { WorkerShell } from "@/features/worker/worker-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessRakSamukWorkerWork,
  withUserParam,
} from "@/shared/permissions/access";

type RakSamukWorkerPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RakSamukWorkerPage({
  searchParams,
}: RakSamukWorkerPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessRakSamukWorkerWork(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <WorkerShell
      activeCount={getRakSamukWorkerWorksForUser(currentUser.id).length}
      currentUser={currentUser}
      title="งานที่ต้องทำ"
    >
      <RakSamukWorkerWorkList currentUser={currentUser} />
    </WorkerShell>
  );
}
