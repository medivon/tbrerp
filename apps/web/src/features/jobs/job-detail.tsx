import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  ExternalLink,
  FileText,
  PauseCircle,
} from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
} from "@thaiboran/ui";

import { JobSourceChip } from "@/features/jobs/components/job-source-chip";
import {
  getDepartmentChipVariant,
  getJobById,
  type JobFixture,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";
import {
  canAccessColoringQueue,
  canAccessJobOverview,
  canAccessRakSamukAssignment,
  canAccessWoodworkQueue,
} from "@/shared/permissions/access";

export function JobDetail({
  currentUser,
  jobId,
}: {
  currentUser: FixtureUser;
  jobId: string;
}) {
  const job = getJobById(jobId);
  const canSeeAdminContext = canAccessJobOverview(currentUser);

  if (!job) {
    return (
      <EmptyState
        description="ตรวจสอบรหัส Job หรือกลับไปที่ภาพรวมงานกำลังผลิต"
        title="ไม่พบ Job นี้"
      />
    );
  }

  if (!canSeeJobRecord(currentUser, job)) {
    return (
      <EmptyState
        description="เปิดงานจากคิวของแผนกที่รับผิดชอบ"
        title="ไม่มีสิทธิ์ดูรายละเอียดนี้"
      />
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={<JobActionPanel currentUser={currentUser} />}
        description="หน้าอ่านรายละเอียดงานก่อนดำเนินการ แสดงเฉพาะบริบทผลิตและประวัติการทำงานที่สิทธิ์นี้ดูได้"
        meta={
          <div className="flex flex-wrap gap-2">
            <JobSourceChip job={job} />
            <StatusChip
              variant={getDepartmentChipVariant(job.currentDepartment)}
            >
              {job.currentDepartment}
            </StatusChip>
            <StatusChip variant={job.waitingMaterial ? "warning" : "neutral"}>
              {job.status}
            </StatusChip>
            {job.urgent ? (
              <StatusChip variant="danger">งานด่วน</StatusChip>
            ) : null}
          </div>
        }
        title={`รายละเอียด Job ${job.id}`}
      />

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          <SurfaceCard className="overflow-hidden" padding="none">
            <div className="grid gap-0 lg:grid-cols-[minmax(320px,42%)_minmax(0,1fr)]">
              <div className="relative aspect-[16/10] min-h-[260px] bg-subtle lg:aspect-auto">
                <Image
                  alt={job.imageAlt}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src={job.imageSrc}
                />
              </div>
              <div className="grid content-start gap-4 p-5">
                <div>
                  <h2 className="text-2xl font-extrabold leading-9 text-foreground">
                    {job.workName}
                  </h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
                    จำนวน {job.quantity} ชิ้น
                    {job.deliveryDate ? ` • วันจัดส่ง ${job.deliveryDate}` : ""}
                  </p>
                </div>

                <dl className="grid rounded-lg border border-border md:grid-cols-2">
                  <Fact label="รหัส Job" value={job.id} />
                  <Fact label="สถานะ" value={job.status} />
                  <Fact label="แผนกปัจจุบัน" value={job.currentDepartment} />
                  <Fact label="อายุงานรวม" value={job.ageLabel} />
                  <Fact label="อายุในแผนก" value={job.departmentAgeLabel} />
                  <Fact
                    label="ประเภทงาน"
                    value={`${job.sourceCode} / ${job.sourceLabel}`}
                  />
                  {canSeeAdminContext && job.adminContext?.orderId ? (
                    <Fact
                      label="ออเดอร์ที่เกี่ยวข้อง"
                      value={job.adminContext.orderId}
                    />
                  ) : null}
                  {canSeeAdminContext && job.adminContext?.customerName ? (
                    <Fact
                      label="ลูกค้า"
                      value={job.adminContext.customerName}
                    />
                  ) : null}
                </dl>
              </div>
            </div>
          </SurfaceCard>

          <InstructionSection
            detail={job.instructions.woodwork}
            title="รายละเอียดช่างไม้"
          />
          <InstructionSection
            detail={job.instructions.coloring}
            title="รายละเอียดฝ่ายสี/ตกแต่ง"
          />
          <InstructionSection
            detail={job.instructions.rakSamuk}
            title="รายละเอียดรักสมุก"
          />

          <Notices job={job} />
          <Timeline canSeeFullTimeline={canSeeAdminContext} job={job} />
        </div>

        <aside className="grid h-fit gap-4 xl:sticky xl:top-24">
          <SurfaceCard padding="md">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary-soft p-2 text-primary">
                <FileText aria-hidden className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-foreground">
                  การดำเนินงาน
                </h2>
              </div>
            </div>

            <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
              เลือกคิวหรือขั้นตอนที่สอดคล้องกับสถานะงานปัจจุบัน
            </p>

            <JobOperationLinks currentUser={currentUser} job={job} />
          </SurfaceCard>
        </aside>
      </section>
    </div>
  );
}

function JobOperationLinks({
  currentUser,
  job,
}: {
  currentUser: FixtureUser;
  job: JobFixture;
}) {
  const canSendRakSamuk =
    job.currentDepartment === "ช่างไม้" || job.currentDepartment === "ฝ่ายสี";

  return (
    <div className="mt-4 grid gap-2">
      {canAccessWoodworkQueue(currentUser) ? (
        <ActionLink
          currentUser={currentUser}
          disabledReason={
            job.currentDepartment === "ช่างไม้"
              ? undefined
              : "งานนี้ไม่ได้อยู่คิวช่างไม้"
          }
          href={jobRoutes.woodwork}
          label="เปิดคิวช่างไม้"
        />
      ) : null}
      {canAccessColoringQueue(currentUser) ? (
        <ActionLink
          currentUser={currentUser}
          disabledReason={
            job.currentDepartment === "รอรับเข้าโรงงานสี" ||
            job.currentDepartment === "ฝ่ายสี"
              ? undefined
              : "งานนี้ยังไม่อยู่ขั้นตอนฝ่ายสี"
          }
          href={
            job.currentDepartment === "รอรับเข้าโรงงานสี"
              ? jobRoutes.coloringIntake
              : jobRoutes.coloring
          }
          label={
            job.currentDepartment === "รอรับเข้าโรงงานสี"
              ? "เปิดรอรับเข้าโรงงานสี"
              : "เปิดคิวฝ่ายสี"
          }
        />
      ) : null}
      {canAccessRakSamukAssignment(currentUser) ? (
        <ActionLink
          currentUser={currentUser}
          disabledReason={
            job.waitingMaterial
              ? "งานนี้รอวัตถุดิบ"
              : canSendRakSamuk
                ? undefined
                : "งานนี้ยังไม่อยู่ขั้นตอนส่งรักสมุก"
          }
          href={jobRoutes.rakSamuk}
          label="ส่งไปรักสมุก"
        />
      ) : null}
    </div>
  );
}

function ActionLink({
  currentUser,
  disabledReason,
  href,
  label,
}: {
  currentUser: FixtureUser;
  disabledReason?: string;
  href: string;
  label: string;
}) {
  if (disabledReason) {
    return (
      <div className="grid gap-1">
        <Button disabled type="button" variant="outline">
          {label}
        </Button>
        <p className="text-xs font-semibold leading-5 text-[#92400E]">
          {disabledReason}
        </p>
      </div>
    );
  }

  return (
    <Button asChild variant="outline">
      <Link href={jobHref(href, currentUser)}>
        {label}
        <ExternalLink aria-hidden className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

function canSeeJobRecord(currentUser: FixtureUser, job: JobFixture): boolean {
  if (canAccessJobOverview(currentUser)) {
    return true;
  }

  if (canAccessWoodworkQueue(currentUser)) {
    return job.currentDepartment === "ช่างไม้";
  }

  if (canAccessColoringQueue(currentUser)) {
    return (
      job.currentDepartment === "ฝ่ายสี" ||
      job.currentDepartment === "รอรับเข้าโรงงานสี"
    );
  }

  return false;
}

function JobActionPanel({ currentUser }: { currentUser: FixtureUser }) {
  if (!canAccessJobOverview(currentUser)) {
    return <StatusChip variant="neutral">มุมมองงานของแผนก</StatusChip>;
  }

  return (
    <Button asChild variant="outline">
      <Link href={jobHref(jobRoutes.overview, currentUser)}>กลับภาพรวมงาน</Link>
    </Button>
  );
}

function InstructionSection({
  detail,
  title,
}: {
  detail: string;
  title: string;
}) {
  return (
    <SurfaceCard padding="none">
      <div className="border-b border-border bg-subtle px-4 py-3">
        <h2 className="text-base font-extrabold text-foreground">{title}</h2>
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold leading-7 text-foreground">
          {detail || "ยังไม่มีรูปงานสำหรับแผนกนี้"}
        </p>
      </div>
    </SurfaceCard>
  );
}

function Notices({ job }: { job: JobFixture }) {
  const notices = [
    job.notices.revision
      ? {
          icon: AlertTriangle,
          text: job.notices.revision,
          title: "Revision",
          variant: "revision" as const,
        }
      : null,
    job.notices.hold
      ? {
          icon: PauseCircle,
          text: job.notices.hold,
          title: "Hold",
          variant: "danger" as const,
        }
      : null,
    job.notices.waitingMaterial
      ? {
          icon: Clock,
          text: job.notices.waitingMaterial,
          title: "รอวัตถุดิบ",
          variant: "warning" as const,
        }
      : null,
  ].filter(Boolean);

  if (notices.length === 0) {
    return null;
  }

  return (
    <SurfaceCard padding="md">
      <div className="grid gap-3">
        {notices.map((notice) => {
          if (!notice) {
            return null;
          }

          const Icon = notice.icon;

          return (
            <div
              className="grid gap-2 rounded-md border border-border bg-subtle p-3"
              key={notice.title}
            >
              <StatusChip variant={notice.variant}>
                <Icon aria-hidden className="h-4 w-4" />
                {notice.title}
              </StatusChip>
              <p className="text-sm font-semibold leading-6 text-foreground">
                {notice.text}
              </p>
            </div>
          );
        })}
      </div>
    </SurfaceCard>
  );
}

function Timeline({
  canSeeFullTimeline,
  job,
}: {
  canSeeFullTimeline: boolean;
  job: JobFixture;
}) {
  const events = canSeeFullTimeline
    ? job.activityPreview
    : job.activityPreview.slice(-1);

  return (
    <SurfaceCard padding="none">
      <div className="border-b border-border bg-subtle px-4 py-3">
        <h2 className="text-base font-extrabold text-foreground">
          ประวัติการทำงาน
        </h2>
      </div>
      <ol className="grid">
        {events.map((event) => (
          <li
            className="grid gap-1 border-b border-border p-4 last:border-b-0"
            key={`${event.title}-${event.detail}`}
          >
            <p className="text-sm font-bold text-foreground">{event.title}</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {event.detail}
            </p>
          </li>
        ))}
      </ol>
    </SurfaceCard>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border p-4">
      <dt className="text-xs font-bold text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  );
}
