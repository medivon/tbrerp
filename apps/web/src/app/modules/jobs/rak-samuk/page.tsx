import { redirect } from "next/navigation";

import { RakSamukAssignment } from "@/features/rak-samuk/rak-samuk-assignment";
import { JobShell } from "@/features/jobs/job-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessRakSamukAssignment,
  withUserParam,
} from "@/shared/permissions/access";

type RakSamukPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RakSamukPage({
  searchParams,
}: RakSamukPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessRakSamukAssignment(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <JobShell currentUser={currentUser} title="รักสมุก">
      <RakSamukAssignment currentUser={currentUser} />
    </JobShell>
  );
}
