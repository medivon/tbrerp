import { redirect } from "next/navigation";

import { getWoodworkQueueJobs } from "@/features/jobs/fixtures/jobs";
import { WoodworkQueue } from "@/features/jobs/woodwork-queue";
import { WorkerShell } from "@/features/worker/worker-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessWoodworkQueue,
  withUserParam,
} from "@/shared/permissions/access";

type WoodworkPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WoodworkPage({
  searchParams,
}: WoodworkPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessWoodworkQueue(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <WorkerShell
      activeCount={getWoodworkQueueJobs().length}
      currentUser={currentUser}
      title="งานที่ต้องทำ"
    >
      <WoodworkQueue currentUser={currentUser} />
    </WorkerShell>
  );
}
