import { redirect } from "next/navigation";

import { AdminDashboard } from "@/features/admin-dashboard/admin-dashboard";
import { AppShell } from "@/shared/app-shell/app-shell";
import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessAdminDashboard,
  withUserParam,
} from "@/shared/permissions/access";

type DashboardPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const currentUser = getFixtureUser(params.user);

  if (!canAccessAdminDashboard(currentUser)) {
    redirect(withUserParam("/no-access", currentUser.id));
  }

  return (
    <AppShell
      activeItemId="dashboard"
      currentUser={currentUser}
      title="แดชบอร์ดแอดมิน"
    >
      <AdminDashboard currentUser={currentUser} />
    </AppShell>
  );
}
