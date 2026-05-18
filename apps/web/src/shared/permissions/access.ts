import {
  canAccessColoringQueue as canAccessDomainColoringQueue,
  canAccessJobDetail as canAccessDomainJobDetail,
  canAccessJobOverview as canAccessDomainJobOverview,
  canAccessRakSamukAssignment as canAccessDomainRakSamukAssignment,
  canAccessRakSamukWorkerWork as canAccessDomainRakSamukWorkerWork,
  canAccessWoodworkQueue as canAccessDomainWoodworkQueue,
  canApproveRakSamukPrice as canApproveDomainRakSamukPrice,
  canConfirmOrder,
  canReceiveRakSamukBack as canReceiveDomainRakSamukBack,
} from "@thaiboran/domain";

import type { FixtureUser } from "@/shared/fixtures/users";

export type AppDestination = "dashboard" | "personal";

export function canAccessAdminDashboard(user: FixtureUser): boolean {
  return ["owner", "manager", "admin-sales"].includes(user.id);
}

export function canAccessMainNavigation(user: FixtureUser): boolean {
  return canAccessAdminDashboard(user);
}

export function canAccessOrders(user: FixtureUser): boolean {
  return canAccessMainNavigation(user);
}

export function canConfirmOrders(user: FixtureUser): boolean {
  return canAccessOrders(user) && canConfirmOrder(user.id);
}

export function canAccessJobs(user: FixtureUser): boolean {
  return (
    canAccessDomainJobOverview(user.id) ||
    canAccessDomainWoodworkQueue(user.id) ||
    canAccessDomainColoringQueue(user.id) ||
    canAccessDomainRakSamukAssignment(user.id) ||
    canAccessDomainRakSamukWorkerWork(user.id)
  );
}

export function canAccessJobOverview(user: FixtureUser): boolean {
  return canAccessDomainJobOverview(user.id);
}

export function canAccessJobDetail(user: FixtureUser): boolean {
  return canAccessDomainJobDetail(user.id);
}

export function canAccessWoodworkQueue(user: FixtureUser): boolean {
  return canAccessDomainWoodworkQueue(user.id);
}

export function canAccessColoringQueue(user: FixtureUser): boolean {
  return canAccessDomainColoringQueue(user.id);
}

export function canAccessRakSamukAssignment(user: FixtureUser): boolean {
  return canAccessDomainRakSamukAssignment(user.id);
}

export function canAccessRakSamukWorkerWork(user: FixtureUser): boolean {
  return canAccessDomainRakSamukWorkerWork(user.id);
}

export function canApproveRakSamukPrice(user: FixtureUser): boolean {
  return canApproveDomainRakSamukPrice(user.id);
}

export function canReceiveRakSamukBack(user: FixtureUser): boolean {
  return canReceiveDomainRakSamukBack(user.id);
}

export function getOwnHome(user: FixtureUser): AppDestination {
  return canAccessAdminDashboard(user) ? "dashboard" : "personal";
}

export function getOwnHomePath(user: FixtureUser): string {
  const path = getOwnHome(user) === "dashboard" ? "/dashboard" : "/personal";

  return withUserParam(path, user.id);
}

export function withUserParam(path: string, userId: string): string {
  const separator = path.includes("?") ? "&" : "?";

  return `${path}${separator}user=${encodeURIComponent(userId)}`;
}
