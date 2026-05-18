import { SurfaceCard } from "@thaiboran/ui";

import { AppShell } from "@/shared/app-shell/app-shell";
import type { FixtureUser } from "@/shared/fixtures/users";
import type {
  NavigationItem,
  NavigationItemId,
} from "@/shared/navigation/navigation";

export function ModulePlaceholder({
  currentUser,
  module,
}: {
  currentUser: FixtureUser;
  module: NavigationItem;
}) {
  return (
    <AppShell
      activeItemId={module.id as NavigationItemId}
      currentUser={currentUser}
      title={module.label}
    >
      <div className="mx-auto max-w-4xl">
        <SurfaceCard className="grid gap-3 p-5">
          <p className="text-xl font-bold text-foreground">{module.label}</p>
          <p className="text-sm leading-7 text-muted-foreground">
            พื้นที่นี้เป็นปลายทางเมนูที่อนุญาตให้เห็นใน Sector 1 เท่านั้น
            ยังไม่มีรายการงาน ฟอร์ม การสร้างข้อมูล หรือ action ทางธุรกิจใน slice
            นี้
          </p>
        </SurfaceCard>
      </div>
    </AppShell>
  );
}
