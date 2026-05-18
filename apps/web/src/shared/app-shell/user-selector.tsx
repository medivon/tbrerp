"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  fixtureUsers,
  type FixtureUser,
  type SectorOneRoleId,
} from "@/shared/fixtures/users";

type UserSelectorProps = {
  currentUser: FixtureUser;
};

export function UserSelector({ currentUser }: UserSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function changeUser(userId: SectorOneRoleId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("user", userId);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="grid gap-1 text-xs font-medium text-muted-foreground">
      ผู้ใช้งานทดสอบ
      <select
        className="h-10 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        onChange={(event) => changeUser(event.target.value as SectorOneRoleId)}
        value={currentUser.id}
      >
        {fixtureUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.roleLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
