import { redirect } from "next/navigation";

import { JobOverview } from "@/features/jobs/job-overview";
import { JobShell } from "@/features/jobs/job-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessJobOverview,
  withUserParam,
} from "@/shared/permissions/access";

type JobsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessJobOverview(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <JobShell currentUser={currentUser} title="งานกำลังผลิต">
      <JobOverview currentUser={currentUser} />
    </JobShell>
  );
}
