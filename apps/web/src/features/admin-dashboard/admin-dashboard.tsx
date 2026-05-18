import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
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
import { cn } from "@/lib/utils";

const dashboardCardIcons: Record<DashboardCardFixture["icon"], LucideIcon> = {
  finance: CreditCard,
  jobs: Hammer,
  orders: ClipboardList,
  production: AlertTriangle,
  shipments: Truck,
};

const cardToneStyles = {
  action: {
    accent: "bg-[#2563EB]",
    footer: "text-[#1D4ED8]",
    icon: "bg-[#E0ECFF] text-[#1D4ED8]",
    ring: "ring-[#B9D1FF]",
  },
  danger: {
    accent: "bg-[#B42318]",
    footer: "text-[#9F1239]",
    icon: "bg-[#FEE4E2] text-[#9F1239]",
    ring: "ring-[#FDB8B3]",
  },
  neutral: {
    accent: "bg-primary",
    footer: "text-primary",
    icon: "bg-primary-soft text-primary",
    ring: "ring-border",
  },
  revision: {
    accent: "bg-[#6D5BD0]",
    footer: "text-[#5B21B6]",
    icon: "bg-[#ECE9FE] text-[#5B21B6]",
    ring: "ring-[#D9D3FD]",
  },
  success: {
    accent: "bg-[#15803D]",
    footer: "text-[#166534]",
    icon: "bg-[#E6F4EA] text-[#166534]",
    ring: "ring-[#BFE5C9]",
  },
  warning: {
    accent: "bg-[#B45309]",
    footer: "text-[#92400E]",
    icon: "bg-[#FEF3C7] text-[#92400E]",
    ring: "ring-[#FAD980]",
  },
} satisfies Record<
  NonNullable<DashboardCardFixture["statusVariant"]>,
  {
    accent: string;
    footer: string;
    icon: string;
    ring: string;
  }
>;

export function AdminDashboard({ currentUser }: { currentUser: FixtureUser }) {
  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-6">
      <section
        aria-label="ภาพรวมคิวงาน"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {dashboardCards.map((card) => (
          <DashboardCard card={card} currentUser={currentUser} key={card.id} />
        ))}
      </section>

      <section aria-labelledby="critical-preview-title" className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2
            className="text-lg font-bold text-foreground"
            id="critical-preview-title"
          >
            งานที่ต้องรีบดู
          </h2>
          <Link
            className="inline-flex min-h-10 items-center rounded-md px-3 text-sm font-semibold text-action transition hover:bg-[#E0ECFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            href={getDashboardCardDestination("jobs", currentUser)}
          >
            ดูทั้งหมด
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {criticalPreviewItems.map((item) => (
            <Link
              className="group block h-full cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              href={getDashboardCardDestination(item.destination, currentUser)}
              key={item.id}
            >
              <SurfaceCard className="grid h-full overflow-hidden p-2 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-lifted">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-subtle">
                  <Image
                    alt={item.workName}
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    fill
                    sizes="(min-width: 1024px) 31vw, 100vw"
                    src={item.imageSrc}
                  />
                </div>
                <div className="grid gap-3 p-3">
                  <div>
                    <p className="text-base font-bold leading-7 text-foreground group-hover:text-primary">
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

                  <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md bg-subtle px-3 py-2 text-sm">
                    <span className="font-semibold text-muted-foreground">
                      {item.riskContext}
                    </span>
                    <span className="text-right font-semibold text-foreground">
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
  const tone = cardToneStyles[card.statusVariant ?? "neutral"];

  return (
    <Link
      className="group block h-full cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
      href={getDashboardCardDestination(card.destination, currentUser)}
    >
      <SurfaceCard className="relative grid min-h-[204px] overflow-hidden p-4 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-lifted">
        <span
          aria-hidden
          className={cn("absolute inset-x-0 top-0 h-1", tone.accent)}
        />
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-2">
            <p className="text-sm font-bold text-foreground group-hover:text-primary">
              {card.title}
            </p>
            <div className="flex items-end gap-2">
              <span className="font-mono text-[44px] font-bold leading-none text-foreground">
                {card.count}
              </span>
              <span className="pb-1 text-xs font-semibold text-muted-foreground">
                {card.unit}
              </span>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full ring-1",
              tone.icon,
              tone.ring,
            )}
          >
            <Icon aria-hidden className="h-5 w-5" />
          </span>
        </div>

        <div className="grid gap-2">
          <StatusChip variant={card.statusVariant}>{card.status}</StatusChip>
          <p className="min-h-5 text-sm font-semibold text-muted-foreground">
            {card.subtext}
          </p>
        </div>

        <div
          className={cn(
            "mt-auto flex items-center justify-between border-t border-border pt-3 text-sm font-bold",
            tone.footer,
          )}
        >
          <span>{card.actionLabel}</span>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </SurfaceCard>
    </Link>
  );
}
