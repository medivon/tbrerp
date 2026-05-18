import { redirect } from "next/navigation";

import { JobShell } from "@/features/jobs/job-shell";
import { RakSamukReceiveBack } from "@/features/rak-samuk/rak-samuk-receive-back";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canReceiveRakSamukBack,
  withUserParam,
} from "@/shared/permissions/access";

type RakSamukReceiveBackPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RakSamukReceiveBackPage({
  searchParams,
}: RakSamukReceiveBackPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canReceiveRakSamukBack(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <JobShell currentUser={currentUser} title="รับงานรักสมุกกลับ">
      <RakSamukReceiveBack currentUser={currentUser} />
    </JobShell>
  );
}
