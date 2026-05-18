import { describe, expect, it } from "vitest";

import { getFixtureUser } from "@/shared/fixtures/users";
import { getVisibleNavigation } from "@/shared/navigation/navigation";

describe("navigation visibility", () => {
  it("hides main ERP navigation for base-role users", () => {
    expect(getVisibleNavigation(getFixtureUser("staff-base"))).toEqual([]);
    expect(getVisibleNavigation(getFixtureUser("outsource-base"))).toEqual([]);
  });

  it("shows approved admin navigation for Admin/Sales without settings", () => {
    const labels = getVisibleNavigation(getFixtureUser("admin-sales")).map(
      (item) => item.label,
    );

    expect(labels).toContain("แดชบอร์ด");
    expect(labels).toContain("ออเดอร์");
    expect(labels).toContain("งานสั่งทำ / ผลิต");
    expect(labels).not.toContain("ตั้งค่า");
  });

  it("keeps Owner-level settings visible only for the highest-authority fixture user", () => {
    const ownerLabels = getVisibleNavigation(getFixtureUser("owner")).map(
      (item) => item.label,
    );
    const managerLabels = getVisibleNavigation(getFixtureUser("manager")).map(
      (item) => item.label,
    );

    expect(ownerLabels).toContain("ตั้งค่า");
    expect(managerLabels).not.toContain("ตั้งค่า");
  });
});
