import { redirect } from "next/navigation";

import type { FixtureUser } from "@/shared/fixtures/users";
import { getOwnHomePath } from "@/shared/permissions/access";

export function RoleAwareLanding({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  return redirect(getOwnHomePath(currentUser));
}
