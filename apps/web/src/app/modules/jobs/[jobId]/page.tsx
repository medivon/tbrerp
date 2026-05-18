import { redirect } from "next/navigation";

import { JobDetail } from "@/features/jobs/job-detail";
import { JobShell } from "@/features/jobs/job-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import { canAccessJobDetail, withUserParam } from "@/shared/permissions/access";

type JobDetailPageProps = {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JobDetailPage({
  params,
  searchParams,
}: JobDetailPageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);

  if (!canAccessJobDetail(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <JobShell currentUser={currentUser} title="รายละเอียด Job">
      <JobDetail currentUser={currentUser} jobId={resolvedParams.jobId} />
    </JobShell>
  );
}
