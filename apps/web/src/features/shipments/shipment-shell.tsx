import type { ReactNode } from "react";

import { WorkerShell } from "@/features/worker/worker-shell";
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
  if (currentUser.id === "delivery-team") {
    return (
      <WorkerShell currentUser={currentUser} title={title}>
        {children}
      </WorkerShell>
    );
  }

  return (
    <AppShell activeItemId="shipments" currentUser={currentUser} title={title}>
      {children}
    </AppShell>
  );
}
