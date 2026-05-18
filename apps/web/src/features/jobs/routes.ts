import type { FixtureUser } from "@/shared/fixtures/users";
import { withUserParam } from "@/shared/permissions/access";

export type JobWorkspaceTab =
  | "overview"
  | "woodwork"
  | "coloring-intake"
  | "coloring"
  | "rak-samuk";

export const jobRoutes = {
  overview: "/modules/jobs",
  woodwork: "/modules/jobs/woodwork",
  coloring: "/modules/jobs/coloring",
  coloringIntake: "/modules/jobs/coloring/intake",
  rakSamuk: "/modules/jobs/rak-samuk",
  rakSamukWorker: "/modules/jobs/rak-samuk/worker",
  rakSamukMissingPrice: "/modules/jobs/rak-samuk/missing-price",
  rakSamukApproval: "/modules/jobs/rak-samuk/approval",
  rakSamukReceiveBack: "/modules/jobs/rak-samuk/receive-back",
  detail(jobId: string) {
    return `/modules/jobs/${encodeURIComponent(jobId)}`;
  },
  rakSamukWorkerDetail(workId: string) {
    return `/modules/jobs/rak-samuk/worker/${encodeURIComponent(workId)}`;
  },
};

export const jobWorkspaceTabs: Array<{
  href: string;
  id: JobWorkspaceTab;
  label: string;
}> = [
  {
    href: jobRoutes.overview,
    id: "overview",
    label: "งานทั้งหมด",
  },
  {
    href: jobRoutes.woodwork,
    id: "woodwork",
    label: "คิวช่างไม้",
  },
  {
    href: jobRoutes.coloringIntake,
    id: "coloring-intake",
    label: "รอรับเข้าโรงงานสี",
  },
  {
    href: jobRoutes.coloring,
    id: "coloring",
    label: "คิวฝ่ายสี",
  },
  {
    href: jobRoutes.rakSamuk,
    id: "rak-samuk",
    label: "รักสมุก",
  },
];

export function jobHref(path: string, currentUser: FixtureUser): string {
  return withUserParam(path, currentUser.id);
}
