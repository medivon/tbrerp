import { StatusChip } from "@thaiboran/ui";

import {
  getJobSourceLabel,
  getSourceChipVariant,
  type JobFixture,
} from "@/features/jobs/fixtures/jobs";

export function JobSourceChip({ job }: { job: JobFixture }) {
  return (
    <StatusChip variant={getSourceChipVariant(job)}>
      {getJobSourceLabel(job)}
    </StatusChip>
  );
}
