import { NoAccessState } from "@/features/access/no-access";
import { getFixtureUser } from "@/shared/fixtures/users";

type NoAccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NoAccessPage({
  searchParams,
}: NoAccessPageProps) {
  const params = await searchParams;

  return (
    <NoAccessState
      currentUser={getFixtureUser(params.user)}
      showUserSelector={false}
    />
  );
}
