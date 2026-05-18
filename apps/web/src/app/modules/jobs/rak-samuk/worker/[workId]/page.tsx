import { redirect } from "next/navigation";

import { jobRoutes } from "@/features/jobs/routes";
import { RakSamukWorkerWorkList } from "@/features/rak-samuk/rak-samuk-worker-work-list";
import { WorkerShell } from "@/features/worker/worker-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessRakSamukWorkerWork,
  withUserParam,
} from "@/shared/permissions/access";

type RakSamukWorkerDetailPageProps = {
  params: Promise<{ workId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RakSamukWorkerDetailPage({
  params,
  searchParams,
}: RakSamukWorkerDetailPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessRakSamukWorkerWork(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <WorkerShell
      backHref={jobRoutes.rakSamukWorker}
      currentUser={currentUser}
      title="เปิดงาน"
    >
      <RakSamukWorkerWorkList
        currentUser={currentUser}
        workId={resolvedParams.workId}
      />
    </WorkerShell>
  );
}
