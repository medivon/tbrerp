import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Clock, Filter, Hammer, Search } from "lucide-react";
import {
  Button,
  MetricCard,
  PageHeader,
  StatusChip,
  SurfaceCard,
  ToolbarShell,
} from "@thaiboran/ui";

import { JobSourceChip } from "@/features/jobs/components/job-source-chip";
import { JobTabs } from "@/features/jobs/components/job-tabs";
import {
  getActiveJobs,
  getDepartmentChipVariant,
  getSourceChipVariant,
  type JobFixture,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function JobOverview({ currentUser }: { currentUser: FixtureUser }) {
  const jobs = getActiveJobs();
  const urgentCount = jobs.filter((job) => job.urgent).length;
  const waitingMaterialCount = jobs.filter((job) => job.waitingMaterial).length;
  const woodworkCount = jobs.filter(
    (job) => job.currentDepartment === "ช่างไม้",
  ).length;
  const coloringCount = jobs.filter(
    (job) =>
      job.currentDepartment === "ฝ่ายสี" ||
      job.currentDepartment === "รอรับเข้าโรงงานสี",
  ).length;

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        description="ภาพรวมงานสั่งทำและงานผลิตที่ยัง active แสดงตำแหน่งงาน แผนก อายุงาน และเปิด Job ต่อได้"
        meta={<StatusChip variant="neutral">{jobs.length} Job</StatusChip>}
        title="งานกำลังผลิต"
      />

      <JobTabs activeTab="overview" currentUser={currentUser} />

      <section
        aria-label="สรุปงานกำลังผลิต"
        className="grid gap-3 md:grid-cols-4"
      >
        <MetricCard
          description="JOB-O และ JOB-P ที่ยังไม่จบงาน"
          icon={<Hammer aria-hidden className="h-5 w-5" />}
          title="งาน active"
          unit="Job"
          value={jobs.length}
        />
        <MetricCard
          description="งานที่ทีมต้องเร่งดู"
          statusLabel="งานด่วน"
          statusVariant="danger"
          title="งานด่วน"
          unit="Job"
          value={urgentCount}
        />
        <MetricCard
          description={`ช่างไม้ ${woodworkCount} • ฝ่ายสี ${coloringCount}`}
          statusLabel="แผนก"
          statusVariant="action"
          title="อยู่ในแผนก"
          unit="Job"
          value={woodworkCount + coloringCount}
        />
        <MetricCard
          description="ตัวบล็อกฝ่ายผลิต ไม่ใช่ Hold"
          statusLabel="รอวัตถุดิบ"
          statusVariant="warning"
          title="รอวัตถุดิบ"
          unit="Job"
          value={waitingMaterialCount}
        />
      </section>

      <ToolbarShell
        leading={
          <Search aria-hidden className="h-4 w-4 text-muted-foreground" />
        }
      >
        <label className="sr-only" htmlFor="job-search">
          ค้นหา Job
        </label>
        <input
          className="min-h-10 min-w-0 flex-1 basis-full rounded-md border border-border bg-surface px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:basis-auto sm:min-w-[20rem]"
          id="job-search"
          placeholder="ค้นหา Job ID, Order ID, ลูกค้า, ชื่องาน หรือแผนก"
          type="search"
        />
        <FilterGroup label="ประเภทงาน">
          {["ทั้งหมด", "งานลูกค้า (JOB-O)", "ผลิตเข้าสต๊อก (JOB-P)"].map(
            (filter) => (
              <FilterChip key={filter}>{filter}</FilterChip>
            ),
          )}
        </FilterGroup>
        <FilterGroup label="แผนก / สถานะ">
          {[
            "ทุกแผนก",
            "ช่างไม้",
            "ฝ่ายสี",
            "รักสมุก",
            "รอวัตถุดิบ",
            "งานด่วน",
          ].map((filter) => (
            <FilterChip key={filter}>{filter}</FilterChip>
          ))}
        </FilterGroup>
      </ToolbarShell>

      <SurfaceCard className="overflow-hidden" padding="none">
        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
            <thead className="bg-subtle text-xs font-bold text-muted-foreground">
              <tr>
                <th className="px-3 py-3" scope="col">
                  Job
                </th>
                <th className="px-3 py-3" scope="col">
                  งาน
                </th>
                <th className="px-3 py-3" scope="col">
                  ต้นทาง
                </th>
                <th className="px-3 py-3" scope="col">
                  แผนก
                </th>
                <th className="px-3 py-3" scope="col">
                  สถานะ
                </th>
                <th className="px-3 py-3" scope="col">
                  อายุ / วัน
                </th>
                <th className="px-3 py-3 text-right" scope="col">
                  การทำงาน
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <JobOverviewRow
                  currentUser={currentUser}
                  job={job}
                  key={job.id}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid xl:hidden">
          {jobs.map((job) => (
            <JobOverviewCard currentUser={currentUser} job={job} key={job.id} />
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}

function JobOverviewRow({
  currentUser,
  job,
}: {
  currentUser: FixtureUser;
  job: JobFixture;
}) {
  return (
    <tr className="border-t border-border bg-surface align-top transition-colors hover:bg-subtle/50">
      <td className="px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-md border border-border bg-subtle">
            <Image
              alt={job.imageAlt}
              className="object-cover"
              fill
              sizes="56px"
              src={job.imageSrc}
            />
          </div>
          <div>
            <p className="font-extrabold text-foreground">{job.id}</p>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">
              {job.adminContext?.orderId ??
                job.adminContext?.productionLot ??
                "งานผลิต"}
            </p>
          </div>
        </div>
      </td>
      <td className="max-w-[280px] px-3 py-4">
        <p className="font-bold leading-6 text-foreground">{job.workName}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          จำนวน {job.quantity} ชิ้น
          {job.adminContext?.customerName
            ? ` • ${job.adminContext.customerName}`
            : ""}
        </p>
      </td>
      <td className="px-3 py-4">
        <JobSourceChip job={job} />
      </td>
      <td className="px-3 py-4">
        <StatusChip variant={getDepartmentChipVariant(job.currentDepartment)}>
          {job.currentDepartment}
        </StatusChip>
      </td>
      <td className="px-3 py-4">
        <div className="flex flex-wrap gap-2">
          <StatusChip variant={job.waitingMaterial ? "warning" : "neutral"}>
            {job.status}
          </StatusChip>
          {job.urgent ? (
            <StatusChip variant="danger">งานด่วน</StatusChip>
          ) : null}
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="grid gap-2">
          <StatusChip variant="warning">{job.ageLabel}</StatusChip>
          <StatusChip variant="neutral">{job.departmentAgeLabel}</StatusChip>
          {job.deliveryDate ? (
            <span className="text-xs font-semibold text-muted-foreground">
              กำหนดส่ง {job.deliveryDate}
            </span>
          ) : null}
        </div>
      </td>
      <td className="px-3 py-4 text-right">
        <Button asChild size="sm" variant="outline">
          <Link href={jobHref(jobRoutes.detail(job.id), currentUser)}>
            เปิด Job
          </Link>
        </Button>
      </td>
    </tr>
  );
}

function JobOverviewCard({
  currentUser,
  job,
}: {
  currentUser: FixtureUser;
  job: JobFixture;
}) {
  return (
    <article className="grid gap-3 border-b border-border p-4 last:border-b-0 md:grid-cols-[140px_minmax(0,1fr)_auto]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-subtle md:aspect-square">
        <Image
          alt={job.imageAlt}
          className="object-cover"
          fill
          sizes="(min-width: 768px) 140px, 100vw"
          src={job.imageSrc}
        />
      </div>
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap gap-2">
          <StatusChip>{job.id}</StatusChip>
          <StatusChip variant={getSourceChipVariant(job)}>
            {job.sourceCode} / {job.sourceLabel}
          </StatusChip>
          {job.urgent ? (
            <StatusChip variant="danger">งานด่วน</StatusChip>
          ) : null}
          {job.waitingMaterial ? (
            <StatusChip variant="warning">รอวัตถุดิบ</StatusChip>
          ) : null}
        </div>
        <h2 className="text-lg font-extrabold leading-7 text-foreground">
          {job.workName}
        </h2>
        <p className="text-sm font-semibold leading-6 text-muted-foreground">
          จำนวน {job.quantity} ชิ้น • {job.currentDepartment} • {job.status}
        </p>
        <div className="flex flex-wrap gap-2">
          <StatusChip variant="warning">
            <Clock aria-hidden className="h-3.5 w-3.5" />
            {job.ageLabel}
          </StatusChip>
          <StatusChip variant="neutral">{job.departmentAgeLabel}</StatusChip>
          {job.deliveryDate ? (
            <StatusChip variant="neutral">
              กำหนดส่ง {job.deliveryDate}
            </StatusChip>
          ) : null}
        </div>
      </div>
      <div className="flex items-start md:justify-end">
        <Button asChild size="sm" variant="outline">
          <Link href={jobHref(jobRoutes.detail(job.id), currentUser)}>
            เปิด Job
          </Link>
        </Button>
      </div>
    </article>
  );
}

function FilterGroup({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2" role="group">
      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-muted-foreground">
        <Filter aria-hidden className="h-3.5 w-3.5" />
        {label}
      </span>
      {children}
    </div>
  );
}

function FilterChip({ children }: { children: ReactNode }) {
  return (
    <button
      className="min-h-9 cursor-pointer rounded-full border border-border bg-surface px-3 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      type="button"
    >
      {children}
    </button>
  );
}
