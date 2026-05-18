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
