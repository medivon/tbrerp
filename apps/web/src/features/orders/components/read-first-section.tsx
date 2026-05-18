import type { ReactNode } from "react";
import { SectionHeader, SurfaceCard } from "@thaiboran/ui";

export function ReadFirstSection({
  action,
  children,
  description,
  title,
  titleId,
}: {
  action?: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  title: ReactNode;
  titleId?: string;
}) {
  return (
    <section aria-labelledby={titleId} className="grid gap-3">
      <SectionHeader
        action={action}
        description={description}
        title={title}
        titleId={titleId}
      />
      <SurfaceCard className="overflow-hidden" padding="none">
        {children}
      </SurfaceCard>
    </section>
  );
}
