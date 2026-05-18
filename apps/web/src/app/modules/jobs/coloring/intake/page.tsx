import { redirect } from "next/navigation";

import { ColoringIntakeQueue } from "@/features/jobs/coloring-intake-queue";
import { getColoringIntakeJobs } from "@/features/jobs/fixtures/jobs";
import { jobRoutes } from "@/features/jobs/routes";
import { WorkerShell } from "@/features/worker/worker-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessColoringQueue,
  withUserParam,
} from "@/shared/permissions/access";

type ColoringIntakePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ColoringIntakePage({
  searchParams,
}: ColoringIntakePageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessColoringQueue(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <WorkerShell
      activeCount={getColoringIntakeJobs().length}
      backHref={jobRoutes.coloring}
      currentUser={currentUser}
      title="รอรับเข้าโรงงานสี"
    >
      <ColoringIntakeQueue currentUser={currentUser} />
    </WorkerShell>
  );
}
