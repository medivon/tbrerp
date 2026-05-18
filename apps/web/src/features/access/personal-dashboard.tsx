import { Button, SurfaceCard } from "@thaiboran/ui";

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
        <SurfaceCard className="grid gap-4 p-5">
          <div>
            <p className="text-xl font-bold text-foreground">แดชบอร์ดส่วนตัว</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              พื้นที่ส่วนตัวสำหรับข้อมูลโปรไฟล์ เอกสาร
              และรายได้ของตัวเองในขอบเขต Sector 1
            </p>
          </div>

          <div className="grid gap-2 rounded-lg bg-subtle p-4 text-sm">
            <p className="font-bold text-foreground">
              {currentUser.displayName}
            </p>
            <p className="font-medium text-muted-foreground">
              สิทธิ์ปัจจุบัน: {currentUser.roleLabel}
            </p>
            <p className="font-medium text-muted-foreground">
              ประเภทผู้ใช้งาน: {currentUser.userType}
            </p>
          </div>

          <p className="text-sm leading-7 text-muted-foreground">
            ผู้ใช้ที่มีเฉพาะสิทธิ์พื้นฐานจะไม่เห็นเมนู ERP
            หลักจนกว่าจะได้รับบทบาทงาน
          </p>
        </SurfaceCard>

        <Button asChild variant="outline">
          <a href={withUserParam("/", currentUser.id)}>กลับหน้าแรก</a>
        </Button>
      </div>
    </AppShell>
  );
}
