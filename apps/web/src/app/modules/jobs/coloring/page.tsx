import { redirect } from "next/navigation";

import { ColoringWorkQueue } from "@/features/jobs/coloring-work-queue";
import { getColoringQueueJobs } from "@/features/jobs/fixtures/jobs";
import { WorkerShell } from "@/features/worker/worker-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessColoringQueue,
  withUserParam,
} from "@/shared/permissions/access";

type ColoringPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ColoringPage({
  searchParams,
}: ColoringPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessColoringQueue(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <WorkerShell
      activeCount={getColoringQueueJobs().length}
      currentUser={currentUser}
      title="งานที่ต้องทำ"
    >
      <ColoringWorkQueue currentUser={currentUser} />
    </WorkerShell>
  );
}
