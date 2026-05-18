import { Button, NoAccessState as UiNoAccessState } from "@thaiboran/ui";

import { UserSelector } from "@/shared/app-shell/user-selector";
import type { FixtureUser } from "@/shared/fixtures/users";
import { getOwnHomePath } from "@/shared/permissions/access";

export function NoAccessState({
  currentUser,
  showUserSelector = true,
}: {
  currentUser: FixtureUser;
  showUserSelector?: boolean;
}) {
  return (
    <main className="grid min-h-screen bg-background px-4 py-6 text-foreground">
      <div className="mx-auto grid w-full max-w-2xl content-start gap-5">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-foreground">THAIBORAN ERP</p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {currentUser.displayName} • {currentUser.roleLabel}
            </p>
          </div>
          {showUserSelector ? <UserSelector currentUser={currentUser} /> : null}
        </header>

        <UiNoAccessState
          action={
            <Button asChild>
              <a href={getOwnHomePath(currentUser)}>กลับหน้าแรกของฉัน</a>
            </Button>
          }
        />
      </div>
    </main>
  );
}
