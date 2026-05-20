"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Clock, Filter, Hammer, Search } from "lucide-react";
import {
  Button,
  EmptyState,
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

type SourceFilter = "ทั้งหมด" | "งานลูกค้า (JOB-O)" | "ผลิตเข้าสต๊อก (JOB-P)";
type DepartmentFilter =
  | "ทุกแผนก"
  | "ช่างไม้"
  | "ฝ่ายสี"
  | "รักสมุก"
  | "รอวัตถุดิบ"
  | "งานด่วน";

export function JobOverview({ currentUser }: { currentUser: FixtureUser }) {
  const allJobs = getActiveJobs();
  const [departmentFilter, setDepartmentFilter] =
    useState<DepartmentFilter>("ทุกแผนก");
  const [query, setQuery] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(allJobs[0]?.id ?? "");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("ทั้งหมด");
  const urgentCount = allJobs.filter((job) => job.urgent).length;
  const waitingMaterialCount = allJobs.filter(
    (job) => job.waitingMaterial,
  ).length;
  const woodworkCount = allJobs.filter(
    (job) => job.currentDepartment === "ช่างไม้",
  ).length;
  const coloringCount = allJobs.filter(
    (job) =>
      job.currentDepartment === "ฝ่ายสี" ||
      job.currentDepartment === "รอรับเข้าโรงงานสี",
  ).length;
  const jobs = useMemo(
    () =>
      allJobs.filter((job) => {
        const normalizedQuery = query.trim().toLowerCase();
        const sourceMatches =
          sourceFilter === "ทั้งหมด" ||
          (sourceFilter === "งานลูกค้า (JOB-O)"
            ? job.sourceCode === "JOB-O"
            : job.sourceCode === "JOB-P");
        const departmentMatches =
          departmentFilter === "ทุกแผนก" ||
          (departmentFilter === "รอวัตถุดิบ"
            ? job.waitingMaterial
            : departmentFilter === "งานด่วน"
              ? job.urgent
              : job.currentDepartment === departmentFilter);
        const queryText = [
          job.id,
          job.adminContext?.orderId,
          job.adminContext?.customerName,
          job.adminContext?.productionLot,
          job.workName,
          job.currentDepartment,
          job.status,
          job.sourceCode,
          job.sourceLabel,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return (
          sourceMatches &&
          departmentMatches &&
          (normalizedQuery.length === 0 || queryText.includes(normalizedQuery))
        );
      }),
    [allJobs, departmentFilter, query, sourceFilter],
  );
  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? allJobs[0];

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        description="ภาพรวมงานสั่งทำและงานผลิตที่ยังอยู่ระหว่างดำเนินการ แสดงตำแหน่งงาน แผนก อายุงาน และเปิด Job ต่อได้"
        meta={
          <StatusChip variant="neutral">
            แสดง {jobs.length} จาก {allJobs.length} Job
          </StatusChip>
        }
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
          title="งานเปิดอยู่"
          unit="Job"
          value={allJobs.length}
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
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder="ค้นหา Job ID, Order ID, ลูกค้า, ชื่องาน หรือแผนก"
          type="search"
          value={query}
        />
        <FilterGroup label="ประเภทงาน">
          {(
            ["ทั้งหมด", "งานลูกค้า (JOB-O)", "ผลิตเข้าสต๊อก (JOB-P)"] as const
          ).map((filter) => (
            <FilterChip
              active={sourceFilter === filter}
              key={filter}
              onClick={() => setSourceFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </FilterGroup>
        <FilterGroup label="แผนก / สถานะ">
          {(
            [
              "ทุกแผนก",
              "ช่างไม้",
              "ฝ่ายสี",
              "รักสมุก",
              "รอวัตถุดิบ",
              "งานด่วน",
            ] as const
          ).map((filter) => (
            <FilterChip
              active={departmentFilter === filter}
              key={filter}
              onClick={() => setDepartmentFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </FilterGroup>
      </ToolbarShell>

      {jobs.length > 0 ? (
        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
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
                      onPreview={() => setSelectedJobId(job.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid xl:hidden">
              {jobs.map((job) => (
                <JobOverviewCard
                  currentUser={currentUser}
                  job={job}
                  key={job.id}
                  onPreview={() => setSelectedJobId(job.id)}
                />
              ))}
            </div>
          </SurfaceCard>
          {selectedJob ? (
            <JobPreviewPanel currentUser={currentUser} job={selectedJob} />
          ) : null}
        </section>
      ) : (
        <EmptyState
          description="ลองเปลี่ยนคำค้นหา ประเภทงาน หรือแผนก"
          title="ไม่พบงานที่ตรงกับเงื่อนไข"
        />
      )}
    </div>
  );
}

function JobOverviewRow({
  currentUser,
  job,
  onPreview,
}: {
  currentUser: FixtureUser;
  job: JobFixture;
  onPreview: () => void;
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
        <div className="flex flex-wrap justify-end gap-2">
          <Button onClick={onPreview} size="sm" type="button" variant="outline">
            ดูสรุป
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={jobHref(jobRoutes.detail(job.id), currentUser)}>
              เปิด Job
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}

function JobOverviewCard({
  currentUser,
  job,
  onPreview,
}: {
  currentUser: FixtureUser;
  job: JobFixture;
  onPreview: () => void;
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
      <div className="flex flex-wrap items-start gap-2 md:justify-end">
        <Button onClick={onPreview} size="sm" type="button" variant="outline">
          ดูสรุป
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={jobHref(jobRoutes.detail(job.id), currentUser)}>
            เปิด Job
          </Link>
        </Button>
      </div>
    </article>
  );
}

function JobPreviewPanel({
  currentUser,
  job,
}: {
  currentUser: FixtureUser;
  job: JobFixture;
}) {
  return (
    <SurfaceCard className="xl:sticky xl:top-24" padding="md">
      <div className="grid gap-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-subtle">
          <Image
            alt={job.imageAlt}
            className="object-cover"
            fill
            sizes="360px"
            src={job.imageSrc}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusChip>{job.id}</StatusChip>
          <StatusChip variant={getSourceChipVariant(job)}>
            {job.sourceCode} / {job.sourceLabel}
          </StatusChip>
          <StatusChip variant={getDepartmentChipVariant(job.currentDepartment)}>
            {job.currentDepartment}
          </StatusChip>
        </div>
        <div>
          <h2 className="text-lg font-extrabold leading-7 text-foreground">
            {job.workName}
          </h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
            จำนวน {job.quantity} ชิ้น • {job.status}
          </p>
        </div>
        <div className="grid gap-2 rounded-md border border-border bg-subtle p-3">
          <p className="text-sm font-bold text-foreground">
            รายละเอียดที่ต้องดูต่อ
          </p>
          <p className="text-sm font-semibold leading-6 text-muted-foreground">
            {job.instructions.woodwork}
          </p>
        </div>
        <Button asChild>
          <Link href={jobHref(jobRoutes.detail(job.id), currentUser)}>
            เปิด Job
          </Link>
        </Button>
      </div>
    </SurfaceCard>
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

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={`min-h-9 cursor-pointer rounded-full border px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
