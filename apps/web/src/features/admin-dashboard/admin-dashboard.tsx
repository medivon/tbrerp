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
import {
  QueueLauncherCard,
  SectionHeader,
  WorkPreviewCard,
} from "@thaiboran/ui";

import type { FixtureUser } from "@/shared/fixtures/users";
import {
  criticalPreviewItems,
  dashboardCards,
  type DashboardCardFixture,
} from "@/shared/fixtures/admin-dashboard";
import { getDashboardCardDestination } from "@/shared/navigation/navigation";
import { withUserParam } from "@/shared/permissions/access";

const dashboardCardIcons: Record<DashboardCardFixture["icon"], LucideIcon> = {
  finance: CreditCard,
  jobs: Hammer,
  orders: ClipboardList,
  production: AlertTriangle,
  shipments: Truck,
};

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
        <SectionHeader
          action={
            <Link
              className="inline-flex min-h-10 items-center rounded-md px-3 text-sm font-semibold text-action transition hover:bg-[#E0ECFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none"
              href={getDashboardCardDestination("jobs", currentUser)}
            >
              ดูทั้งหมด
            </Link>
          }
          title="งานที่ต้องรีบดู"
          titleId="critical-preview-title"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {criticalPreviewItems.map((item) => (
            <Link
              className="group block h-full cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              href={getDashboardCardDestination(item.destination, currentUser)}
              key={item.id}
            >
              <WorkPreviewCard
                chips={item.chips}
                footerLabel={item.riskContext}
                footerValue={item.relatedDate}
                media={
                  <Image
                    alt={item.workName}
                    className="object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    fill
                    priority
                    sizes="(min-width: 1024px) 31vw, 100vw"
                    src={item.imageSrc}
                  />
                }
                metadata={[
                  { value: `วันที่รับงาน ${item.receivedDate}` },
                  { emphasis: true, value: item.reference },
                ]}
                subtitle={`ลูกค้า ${item.customerName}`}
                title={item.workName}
              />
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
    <Link
      className="group block h-full cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
      href={
        card.destinationPath
          ? withUserParam(card.destinationPath, currentUser.id)
          : getDashboardCardDestination(card.destination, currentUser)
      }
    >
      <QueueLauncherCard
        actionIcon={
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
          />
        }
        actionLabel={card.actionLabel}
        count={card.count}
        icon={<Icon aria-hidden className="h-5 w-5" />}
        statusLabel={card.status}
        statusVariant={card.statusVariant}
        subtext={card.subtext}
        title={card.title}
        unit={card.unit}
      />
    </Link>
  );
}
