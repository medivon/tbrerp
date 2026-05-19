import type { ReactNode } from "react";

import { AppShell } from "@/shared/app-shell/app-shell";
import type { FixtureUser } from "@/shared/fixtures/users";

export function ShipmentShell({
  children,
  currentUser,
  title,
}: {
  children: ReactNode;
  currentUser: FixtureUser;
  title: string;
}) {
  return (
    <AppShell activeItemId="shipments" currentUser={currentUser} title={title}>
      {children}
    </AppShell>
  );
}
