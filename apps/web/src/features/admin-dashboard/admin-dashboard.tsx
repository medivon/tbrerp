import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ClipboardList,
  CreditCard,
  Hammer,
  PackageCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { StatusChip, SurfaceCard } from "@thaiboran/ui";

import type { FixtureUser } from "@/shared/fixtures/users";
import {
  criticalPreviewItems,
  dashboardCards,
  type DashboardCardFixture,
} from "@/shared/fixtures/admin-dashboard";
import { getDashboardCardDestination } from "@/shared/navigation/navigation";

const dashboardCardIcons: Record<DashboardCardFixture["icon"], LucideIcon> = {
  finance: CreditCard,
  jobs: Hammer,
  orders: ClipboardList,
  production: AlertTriangle,
  shipments: Truck,
};

export function AdminDashboard({ currentUser }: { currentUser: FixtureUser }) {
  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <section
        aria-label="ภาพรวมคิวงาน"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {dashboardCards.map((card) => (
          <DashboardCard card={card} currentUser={currentUser} key={card.id} />
        ))}
      </section>

      <section aria-labelledby="critical-preview-title" className="grid gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2
            className="text-lg font-bold text-foreground"
            id="critical-preview-title"
          >
            งานที่ต้องรีบดู
          </h2>
          <Link
            className="text-sm font-semibold text-action hover:underline"
            href={getDashboardCardDestination("jobs", currentUser)}
          >
            ดูทั้งหมด
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {criticalPreviewItems.map((item) => (
            <Link
              href={getDashboardCardDestination(item.destination, currentUser)}
              key={item.id}
            >
              <SurfaceCard className="grid h-full overflow-hidden transition hover:border-primary/60 hover:shadow-md">
                <div className="relative aspect-[16/9] bg-subtle">
                  <Image
                    alt={item.workName}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 31vw, 100vw"
                    src={item.imageSrc}
                  />
                </div>
                <div className="grid gap-3 p-4">
                  <div>
                    <p className="text-base font-bold leading-7 text-foreground">
                      {item.workName}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      ลูกค้า {item.customerName}
                    </p>
                  </div>

                  <div className="grid gap-1 text-sm text-muted-foreground">
                    <p>วันที่รับงาน {item.receivedDate}</p>
                    <p className="font-semibold text-foreground">
                      {item.reference}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.chips.map((chip) => (
                      <StatusChip key={chip.label} variant={chip.variant}>
                        {chip.label}
                      </StatusChip>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-sm">
                    <span className="font-semibold text-muted-foreground">
                      {item.riskContext}
                    </span>
                    <span className="font-semibold text-foreground">
                      {item.relatedDate}
                    </span>
                  </div>
                </div>
              </SurfaceCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function DashboardCard({
  card,
  currentUser,
}: {
  card: DashboardCardFixture;
  currentUser: FixtureUser;
}) {
  const Icon =
    card.icon === "shipments" && card.id === "waiting-shipment"
      ? PackageCheck
      : dashboardCardIcons[card.icon];

  return (
    <Link href={getDashboardCardDestination(card.destination, currentUser)}>
      <SurfaceCard className="grid min-h-[188px] gap-4 p-4 transition hover:border-primary/60 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-2">
            <p className="text-sm font-bold text-foreground">{card.title}</p>
            <div className="flex items-end gap-2">
              <span className="font-mono text-4xl font-bold leading-none text-foreground">
                {card.count}
              </span>
              <span className="pb-1 text-xs font-semibold text-muted-foreground">
                {card.unit}
              </span>
            </div>
          </div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Icon aria-hidden className="h-5 w-5" />
          </span>
        </div>

        <div className="grid gap-2">
          <StatusChip variant={card.statusVariant}>{card.status}</StatusChip>
          <p className="min-h-5 text-sm font-medium text-muted-foreground">
            {card.subtext}
          </p>
        </div>

        <div className="border-t border-border pt-3 text-sm font-bold text-action">
          {card.actionLabel}
        </div>
      </SurfaceCard>
    </Link>
  );
}
