"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  fixtureUsers,
  type FixtureUser,
  type SectorOneRoleId,
} from "@/shared/fixtures/users";
import { cn } from "@/lib/utils";

type UserSelectorProps = {
  currentUser: FixtureUser;
  tone?: "dark" | "light";
};

export function UserSelector({
  currentUser,
  tone = "light",
}: UserSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function changeUser(userId: SectorOneRoleId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("user", userId);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label
      className={cn(
        "grid gap-1 text-xs font-semibold",
        tone === "dark" ? "text-shell-muted" : "text-muted-foreground",
      )}
    >
      ผู้ใช้งาน
      <select
        className={cn(
          "h-10 cursor-pointer rounded-md border px-3 text-sm font-semibold shadow-soft outline-none transition duration-200 focus:ring-2",
          tone === "dark"
            ? "border-shell-border bg-shell-surface text-shell-foreground hover:border-accent/60 focus:border-accent focus:ring-accent/25"
            : "border-border bg-surface text-foreground hover:border-primary/40 focus:border-primary focus:ring-primary/20",
        )}
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
