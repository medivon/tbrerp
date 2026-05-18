import { redirect } from "next/navigation";

import { ModulePlaceholder } from "@/features/access/module-placeholder";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  getVisibleNavigation,
  modulePlaceholders,
  type NavigationItemId,
} from "@/shared/navigation/navigation";
import { withUserParam } from "@/shared/permissions/access";

type ModulePageProps = {
  params: Promise<{ module: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ModulePage({
  params,
  searchParams,
}: ModulePageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const currentUser = getFixtureUser(resolvedSearchParams.user);
  const moduleId = resolvedParams.module as NavigationItemId;
  const placeholderModule = modulePlaceholders.get(moduleId);
  const isVisible = getVisibleNavigation(currentUser).some(
    (item) => item.id === moduleId,
  );

  if (!placeholderModule || !isVisible) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <ModulePlaceholder currentUser={currentUser} module={placeholderModule} />
  );
}
