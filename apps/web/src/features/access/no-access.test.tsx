import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NoAccessState } from "@/features/access/no-access";
import { getFixtureUser } from "@/shared/fixtures/users";

describe("NoAccessState", () => {
  it("shows only the approved no-access state and own-home return action", () => {
    render(
      <NoAccessState
        currentUser={getFixtureUser("staff-base")}
        showUserSelector={false}
      />,
    );

    expect(screen.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeTruthy();
    expect(screen.getByText("กลับหน้าแรกของฉัน").getAttribute("href")).toBe(
      "/personal?user=staff-base",
    );
  });
});
