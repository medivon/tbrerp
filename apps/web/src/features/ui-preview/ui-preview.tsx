import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Boxes,
  ClipboardList,
  RefreshCw,
} from "lucide-react";
import {
  Button,
  EmptyState,
  MetricCard,
  NoAccessState,
  PageHeader,
  QueueLauncherCard,
  ResponsivePanel,
  RoleBadge,
  SectionHeader,
  StaleStateBanner,
  StatusChip,
  ToolbarShell,
  UserBadge,
  WorkPreviewCard,
} from "@thaiboran/ui";

const safeChips = [
  { label: "พร้อมใช้งาน", variant: "success" as const },
  { label: "รอตรวจ", variant: "warning" as const },
  { label: "สำคัญ", variant: "danger" as const },
  { label: "Revision", variant: "revision" as const },
];

export function UiPreview() {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1320px] gap-6">
        <div className="rounded-lg border border-shell-border bg-shell p-4 text-shell-foreground shadow-shell">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold">THAIBORAN ERP</p>
              <p className="mt-1 text-xs font-semibold text-shell-muted">
                Internal Visual Preview / ตัวอย่างระบบภาพภายใน
              </p>
            </div>
            <UserBadge
              displayName="ผู้ใช้งานตัวอย่าง"
              initials="TB"
              roleLabel="บทบาทตัวอย่าง"
              tone="shell"
            />
          </div>
        </div>

        <PageHeader
          description="หน้านี้ใช้ข้อมูลตัวอย่างปลอดภัยเท่านั้น และไม่ใช่หน้าจอทำงานของสินค้า ลูกค้า หรือการเงิน"
          meta={<RoleBadge>internal preview</RoleBadge>}
          title="ตัวอย่างระบบภาพ THAIBORAN"
        />

        <StaleStateBanner
          action={
            <Button size="sm" variant="outline">
              <RefreshCw aria-hidden className="mr-2 h-4 w-4" />
              รีเฟรช
            </Button>
          }
        />

        <section className="grid gap-4" aria-labelledby="preview-launchers">
          <SectionHeader
            description="ตัวอย่างการจัดจังหวะสำหรับหน้าทำงานที่มีข้อมูลหนาแน่น"
            title="การ์ดเปิดคิวและตัวเลขสรุป"
            titleId="preview-launchers"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <QueueLauncherCard
              actionIcon={
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              }
              actionLabel="เปิดรายการ"
              count={12}
              icon={<ClipboardList aria-hidden className="h-5 w-5" />}
              statusLabel="พร้อมตรวจ"
              statusVariant="action"
              subtext="ตัวอย่างข้อความสั้นสำหรับอ่านเร็ว"
              title="คิวตัวอย่าง"
              unit="รายการ"
            />
            <MetricCard
              description="ใช้กับแถบสรุปขนาดกะทัดรัด"
              icon={<Boxes aria-hidden className="h-5 w-5" />}
              statusLabel="สถานะปกติ"
              statusVariant="success"
              title="ตัวเลขสรุปตัวอย่าง"
              unit="รายการ"
              value={8}
            />
            <MetricCard
              description="สีเตือนใช้กับเรื่องที่ต้องดูต่อ ไม่ใช่ตกแต่ง"
              icon={<AlertTriangle aria-hidden className="h-5 w-5" />}
              statusLabel="ต้องตรวจ"
              statusVariant="warning"
              title="สถานะที่ต้องสนใจ"
              unit="รายการ"
              value={3}
            />
          </div>
        </section>

        <section className="grid gap-4" aria-labelledby="preview-work">
          <SectionHeader
            title="การ์ดตัวอย่างและแถบเครื่องมือ"
            titleId="preview-work"
          />
          <ToolbarShell
            actions={
              <Button size="sm" variant="outline">
                คำสั่งตัวอย่าง
              </Button>
            }
            filters={
              <div className="flex flex-wrap gap-2">
                {safeChips.map((chip) => (
                  <StatusChip key={chip.label} variant={chip.variant}>
                    {chip.label}
                  </StatusChip>
                ))}
              </div>
            }
            leading={
              <div className="min-h-10 min-w-48 rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold text-muted-foreground">
                ค้นหาตัวอย่าง
              </div>
            }
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <WorkPreviewCard
              chips={safeChips.slice(0, 2)}
              footerLabel="บริบทตัวอย่าง"
              footerValue="วันนี้"
              media={
                <div className="grid h-full w-full place-items-center bg-subtle text-sm font-bold text-muted-foreground">
                  พื้นที่รูปตัวอย่าง
                </div>
              }
              metadata={[
                { value: "วันที่ตัวอย่าง 19 พ.ค. 69" },
                { emphasis: true, value: "REF-SAFE-001" },
              ]}
              subtitle="ไม่มีข้อมูลลูกค้าจริง"
              title="รายการตัวอย่างที่ไม่ใช่ข้อมูลธุรกิจ"
            />
            <ResponsivePanel
              footer={
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">
                    ปิด
                  </Button>
                  <Button size="sm">ยืนยันตัวอย่าง</Button>
                </div>
              }
              title="แผงข้อมูลตอบสนอง"
              description="ใช้เป็นพื้นที่อ่านหรือตรวจข้อมูลที่ปรับตามขนาดจอ"
            >
              <div className="grid gap-3 text-sm leading-7 text-muted-foreground">
                <p>
                  เนื้อหาในแผงต้องไม่รับข้อมูลที่ถูกซ่อนด้วยสิทธิ์มาก่อน
                  ต้องมีเฉพาะข้อมูลที่ผู้ใช้เห็นได้เท่านั้น
                </p>
                <StatusChip variant="neutral">ข้อมูลตัวอย่าง</StatusChip>
              </div>
            </ResponsivePanel>
            <EmptyState
              icon={<Bell aria-hidden className="h-5 w-5" />}
              title="ยังไม่มีรายการตัวอย่าง"
            />
          </div>
        </section>

        <section className="grid gap-4" aria-labelledby="preview-states">
          <SectionHeader title="สถานะหน้าจอพื้นฐาน" titleId="preview-states" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <NoAccessState
              action={
                <Button size="sm" variant="outline">
                  กลับหน้าแรกของฉัน
                </Button>
              }
            />
            <EmptyState
              description="ใช้เมื่อหน้าจอไม่มีรายการ และมีคำสั่งได้เฉพาะเมื่อหน้านั้นเป็นเจ้าของคำสั่งนั้นจริง"
              title="ไม่มีรายการตามตัวกรองนี้"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
