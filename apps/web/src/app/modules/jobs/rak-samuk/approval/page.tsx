import { redirect } from "next/navigation";

import { JobShell } from "@/features/jobs/job-shell";
import { RakSamukPriceApproval } from "@/features/rak-samuk/rak-samuk-price-approval";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canApproveRakSamukPrice,
  withUserParam,
} from "@/shared/permissions/access";

type RakSamukApprovalPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RakSamukApprovalPage({
  searchParams,
}: RakSamukApprovalPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canApproveRakSamukPrice(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <JobShell currentUser={currentUser} title="อนุมัติราคา">
      <RakSamukPriceApproval currentUser={currentUser} />
    </JobShell>
  );
}
