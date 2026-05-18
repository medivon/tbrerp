import { describe, expect, it } from "vitest";

import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessAdminDashboard,
  getOwnHome,
  getOwnHomePath,
} from "@/shared/permissions/access";

describe("role-aware access helpers", () => {
  it("lands operational Sector 1 users on the Admin Dashboard", () => {
    expect(getOwnHome(getFixtureUser("owner"))).toBe("dashboard");
    expect(getOwnHome(getFixtureUser("manager"))).toBe("dashboard");
    expect(getOwnHome(getFixtureUser("admin-sales"))).toBe("dashboard");
  });

  it("lands base-role users on the Personal Dashboard placeholder", () => {
    expect(getOwnHome(getFixtureUser("staff-base"))).toBe("personal");
    expect(getOwnHome(getFixtureUser("outsource-base"))).toBe("personal");
  });

  it("blocks base-role users from the Admin Dashboard", () => {
    expect(canAccessAdminDashboard(getFixtureUser("staff-base"))).toBe(false);
    expect(canAccessAdminDashboard(getFixtureUser("outsource-base"))).toBe(
      false,
    );
  });

  it("preserves fixture user URL state in own-home links", () => {
    expect(getOwnHomePath(getFixtureUser("staff-base"))).toBe(
      "/personal?user=staff-base",
    );
  });
});
