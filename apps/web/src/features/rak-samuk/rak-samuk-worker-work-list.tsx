import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, EmptyState, StatusChip, SurfaceCard } from "@thaiboran/ui";

import {
  getRakSamukWorkerWork,
  getRakSamukWorkerWorksForUser,
} from "@/features/jobs/fixtures/jobs";
import { jobHref, jobRoutes } from "@/features/jobs/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function RakSamukWorkerWorkList({
  currentUser,
  workId,
}: {
  currentUser: FixtureUser;
  workId?: string;
}) {
  const works = getRakSamukWorkerWorksForUser(currentUser.id);
  const selectedWork = workId
    ? getRakSamukWorkerWork(workId, currentUser.id)
    : undefined;

  if (workId && !selectedWork) {
    return (
      <EmptyState
        description="งานนี้ไม่ได้ถูกมอบหมายให้บัญชีนี้ หรือไม่มีอยู่ใน fixture"
        title="ไม่พบงานที่ดูได้"
      />
    );
  }

  return (
    <div className="grid gap-5">
      <section className="grid gap-3">
        {selectedWork ? (
          <WorkerDetail currentUser={currentUser} work={selectedWork} />
        ) : works.length > 0 ? (
          works.map((work) => (
            <WorkerWorkCard
              currentUser={currentUser}
              key={work.workId}
              work={work}
            />
          ))
        ) : (
          <EmptyState title="ยังไม่มีงานที่ต้องทำ" />
        )}
      </section>

      <SurfaceCard padding="md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-foreground">ประวัติการทำงาน</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
              foundation สำหรับประวัติงานของช่างรักสมุก แสดงเฉพาะงานของตัวเอง
            </p>
          </div>
          <StatusChip variant="neutral">ยังไม่เปิดรายละเอียดจริง</StatusChip>
        </div>
      </SurfaceCard>
    </div>
  );
}

function WorkerWorkCard({
  currentUser,
  work,
}: {
  currentUser: FixtureUser;
  work: ReturnType<typeof getRakSamukWorkerWorksForUser>[number];
}) {
  return (
    <SurfaceCard className="overflow-hidden p-0" padding="none">
      <article className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
        <WorkImage alt={work.imageAlt} src={work.imageSrc} />
        <div className="grid gap-4 p-4">
          <WorkSummary work={work} />
          <div className="grid gap-2 sm:grid-cols-2">
            <Button asChild size="lg" variant="outline">
              <Link
                href={jobHref(
                  jobRoutes.rakSamukWorkerDetail(work.workId),
                  currentUser,
                )}
              >
                เปิดงาน
                <ArrowUpRight aria-hidden className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {work.ownPriceState.kind === "missing" ? (
              <Button asChild size="lg">
                <Link
                  href={jobHref(
                    `${jobRoutes.rakSamukMissingPrice}?workId=${encodeURIComponent(
                      work.workId,
                    )}`,
                    currentUser,
                  )}
                >
                  ขอเสนอราคา
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </SurfaceCard>
  );
}

function WorkerDetail({
  currentUser,
  work,
}: {
  currentUser: FixtureUser;
  work: ReturnType<typeof getRakSamukWorkerWorksForUser>[number];
}) {
  return (
    <SurfaceCard className="overflow-hidden p-0" padding="none">
      <article className="grid gap-0 lg:grid-cols-[minmax(320px,44%)_minmax(0,1fr)]">
        <WorkImage alt={work.imageAlt} priority src={work.imageSrc} />
        <div className="grid content-start gap-4 p-5">
          <WorkSummary work={work} />
          <div className="rounded-lg border border-border bg-subtle p-4">
            <h2 className="text-base font-extrabold text-foreground">
              รายละเอียดรักสมุก
            </h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-foreground">
              {work.instructionSummary}
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h2 className="text-base font-extrabold text-foreground">
              การทำงาน
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted-foreground">
              ช่างรักสมุกดูงานและราคาของตัวเองได้ แต่ไม่ย้ายสถานะ workflow
              และไม่กดจบงานในรอบงานนี้
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href={jobHref(jobRoutes.rakSamukWorker, currentUser)}>
                กลับงานที่ต้องทำ
              </Link>
            </Button>
            {work.ownPriceState.kind === "missing" ? (
              <Button asChild>
                <Link
                  href={jobHref(
                    `${jobRoutes.rakSamukMissingPrice}?workId=${encodeURIComponent(
                      work.workId,
                    )}`,
                    currentUser,
                  )}
                >
                  ขอเสนอราคา
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </SurfaceCard>
  );
}

function WorkSummary({
  work,
}: {
  work: ReturnType<typeof getRakSamukWorkerWorksForUser>[number];
}) {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <StatusChip variant="revision">งานที่ต้องทำ</StatusChip>
        {work.urgent ? <StatusChip variant="danger">งานด่วน</StatusChip> : null}
        <OwnPriceChip work={work} />
      </div>
      <div>
        <h2 className="text-2xl font-extrabold leading-9 text-foreground">
          {work.workName}
        </h2>
        <p className="mt-1 text-sm font-semibold leading-6 text-muted-foreground">
          จำนวน {work.quantity} ชิ้น
        </p>
      </div>
      <p className="rounded-md border border-border bg-subtle px-3 py-2 text-sm font-semibold leading-6 text-foreground">
        {work.instructionSummary}
      </p>
    </div>
  );
}

function OwnPriceChip({
  work,
}: {
  work: ReturnType<typeof getRakSamukWorkerWorksForUser>[number];
}) {
  if (work.ownPriceState.kind === "approved") {
    return (
      <StatusChip variant="success">
        ราคางานของฉัน {work.ownPriceState.perPieceBaht.toLocaleString("th-TH")}{" "}
        บาท/ชิ้น
      </StatusChip>
    );
  }

  if (work.ownPriceState.kind === "submitted") {
    return <StatusChip variant="warning">ส่งราคาแล้ว / รออนุมัติ</StatusChip>;
  }

  return <StatusChip variant="warning">ไม่มีราคา / ให้แจ้งราคา</StatusChip>;
}

function WorkImage({
  alt,
  priority,
  src,
}: {
  alt: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <div className="relative aspect-[16/10] min-h-[210px] bg-subtle lg:aspect-auto">
      <Image
        alt={alt}
        className="object-cover"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 44vw, 100vw"
        src={src}
      />
    </div>
  );
}
