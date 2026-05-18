import { describe, expect, it } from "vitest";

import { getFixtureUser } from "@/shared/fixtures/users";
import {
  canAccessAdminDashboard,
  canAccessColoringQueue,
  canAccessJobOverview,
  canAccessRakSamukWorkerWork,
  canAccessWoodworkQueue,
  canApproveRakSamukPrice,
  canConfirmOrders,
  canReceiveRakSamukBack,
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
    expect(getOwnHome(getFixtureUser("finance"))).toBe("personal");
  });

  it("blocks base-role users from the Admin Dashboard", () => {
    expect(canAccessAdminDashboard(getFixtureUser("staff-base"))).toBe(false);
    expect(canAccessAdminDashboard(getFixtureUser("outsource-base"))).toBe(
      false,
    );
  });

  it("allows only Owner, Manager, and Admin/Sales fixtures to confirm Orders", () => {
    expect(canConfirmOrders(getFixtureUser("owner"))).toBe(true);
    expect(canConfirmOrders(getFixtureUser("manager"))).toBe(true);
    expect(canConfirmOrders(getFixtureUser("admin-sales"))).toBe(true);
    expect(canConfirmOrders(getFixtureUser("staff-base"))).toBe(false);
    expect(canConfirmOrders(getFixtureUser("outsource-base"))).toBe(false);
  });

  it("scopes Sector 5 job and worker access by fixture role", () => {
    expect(canAccessJobOverview(getFixtureUser("admin-sales"))).toBe(true);
    expect(canAccessWoodworkQueue(getFixtureUser("woodwork"))).toBe(true);
    expect(canAccessColoringQueue(getFixtureUser("coloring"))).toBe(true);
    expect(
      canAccessRakSamukWorkerWork(getFixtureUser("rak-samuk-worker")),
    ).toBe(true);
    expect(canAccessJobOverview(getFixtureUser("woodwork"))).toBe(false);
    expect(canAccessWoodworkQueue(getFixtureUser("rak-samuk-worker"))).toBe(
      false,
    );
  });

  it("keeps Rak Samuk price approval with Owner/Manager and receive-back out of Woodwork", () => {
    expect(canApproveRakSamukPrice(getFixtureUser("owner"))).toBe(true);
    expect(canApproveRakSamukPrice(getFixtureUser("manager"))).toBe(true);
    expect(canApproveRakSamukPrice(getFixtureUser("finance"))).toBe(false);
    expect(canReceiveRakSamukBack(getFixtureUser("coloring"))).toBe(true);
    expect(canReceiveRakSamukBack(getFixtureUser("woodwork"))).toBe(false);
  });

  it("preserves fixture user URL state in own-home links", () => {
    expect(getOwnHomePath(getFixtureUser("staff-base"))).toBe(
      "/personal?user=staff-base",
    );
  });
});
