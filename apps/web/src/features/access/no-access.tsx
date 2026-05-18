import { Button, SurfaceCard } from "@thaiboran/ui";

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

        <SurfaceCard className="grid gap-4 p-6">
          <div>
            <p className="text-2xl font-bold text-foreground">
              ไม่มีสิทธิ์เข้าถึงหน้านี้
            </p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              หน้านี้ไม่แสดงข้อมูลหรือรายการที่ผู้ใช้งานไม่มีสิทธิ์ดู
            </p>
          </div>

          <Button asChild>
            <a href={getOwnHomePath(currentUser)}>กลับหน้าแรกของฉัน</a>
          </Button>
        </SurfaceCard>
      </div>
    </main>
  );
}
