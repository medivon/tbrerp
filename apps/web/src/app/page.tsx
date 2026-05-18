import { RoleAwareLanding } from "@/features/access/landing";
import { getFixtureUser } from "@/shared/fixtures/users";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;

  return <RoleAwareLanding currentUser={getFixtureUser(params.user)} />;
}
