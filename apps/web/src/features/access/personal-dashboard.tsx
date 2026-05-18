import {
  Button,
  EmptyState,
  PageHeader,
  SurfaceCard,
  UserBadge,
} from "@thaiboran/ui";

import { AppShell } from "@/shared/app-shell/app-shell";
import type { FixtureUser } from "@/shared/fixtures/users";
import { withUserParam } from "@/shared/permissions/access";

export function PersonalDashboard({
  currentUser,
}: {
  currentUser: FixtureUser;
}) {
  return (
    <AppShell currentUser={currentUser} title="แดชบอร์ดส่วนตัว">
      <div className="mx-auto grid max-w-3xl gap-4">
        <PageHeader
          description="พื้นที่ส่วนตัวสำหรับข้อมูลโปรไฟล์ เอกสาร และรายได้ของตัวเองในขอบเขตที่ได้รับอนุญาต"
          title="แดชบอร์ดส่วนตัว"
        />

        <SurfaceCard className="grid gap-4 p-5">
          <UserBadge
            displayName={currentUser.displayName}
            initials={currentUser.initials}
            roleLabel={currentUser.roleLabel}
          />

          <div className="grid gap-2 rounded-lg bg-subtle p-4 text-sm">
            <p className="font-medium text-muted-foreground">
              ประเภทผู้ใช้งาน: {currentUser.userType}
            </p>
            <p className="font-medium text-muted-foreground">
              เมนู ERP หลักจะแสดงเฉพาะเมื่อมีบทบาทงานที่เกี่ยวข้อง
            </p>
          </div>
        </SurfaceCard>

        <EmptyState
          action={
            <Button asChild variant="outline">
              <a href={withUserParam("/", currentUser.id)}>กลับหน้าแรก</a>
            </Button>
          }
          title="ยังไม่มีข้อมูลส่วนตัวในขอบเขตนี้"
        />
      </div>
    </AppShell>
  );
}
