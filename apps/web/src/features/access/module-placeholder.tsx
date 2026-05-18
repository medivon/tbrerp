import { EmptyState, PageHeader } from "@thaiboran/ui";

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
      <div className="mx-auto grid max-w-4xl gap-4">
        <PageHeader title={module.label} />
        <EmptyState
          description="พื้นที่นี้เป็นปลายทางเมนูที่อนุญาตให้เห็นในขอบเขตปัจจุบันเท่านั้น ยังไม่มีรายการงาน ฟอร์ม การสร้างข้อมูล หรือคำสั่งงานทางธุรกิจ"
          title="ยังไม่มีหน้าจอทำงานในขอบเขตนี้"
        />
      </div>
    </AppShell>
  );
}
