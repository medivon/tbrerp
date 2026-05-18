import { PersonalDashboard } from "@/features/access/personal-dashboard";
import { getFixtureUser } from "@/shared/fixtures/users";

type PersonalPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PersonalPage({
  searchParams,
}: PersonalPageProps) {
  const params = await searchParams;

  return <PersonalDashboard currentUser={getFixtureUser(params.user)} />;
}
