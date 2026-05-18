export const sectorOneRoleIds = [
  "owner",
  "manager",
  "admin-sales",
  "staff-base",
  "outsource-base",
] as const;

export type SectorOneRoleId = (typeof sectorOneRoleIds)[number];

export type UserType = "พนักงานภายใน" | "Outsource";

export type FixtureUser = {
  id: SectorOneRoleId;
  displayName: string;
  roleLabel: string;
  userType: UserType;
  initials: string;
};

export const fixtureUsers: FixtureUser[] = [
  {
    id: "owner",
    displayName: "คุณเจ้าของ",
    roleLabel: "Super Admin / Owner",
    userType: "พนักงานภายใน",
    initials: "จ",
  },
  {
    id: "manager",
    displayName: "คุณผู้จัดการ",
    roleLabel: "Manager",
    userType: "พนักงานภายใน",
    initials: "ผ",
  },
  {
    id: "admin-sales",
    displayName: "แอดมินฝ่ายขาย",
    roleLabel: "Admin / Sales",
    userType: "พนักงานภายใน",
    initials: "อ",
  },
  {
    id: "staff-base",
    displayName: "พนักงานไทยโบราณ",
    roleLabel: "พนักงานไทยโบราณ",
    userType: "พนักงานภายใน",
    initials: "ท",
  },
  {
    id: "outsource-base",
    displayName: "ผู้ใช้งาน Outsource",
    roleLabel: "Outsource",
    userType: "Outsource",
    initials: "O",
  },
];

export const defaultFixtureUserId = "admin-sales" satisfies SectorOneRoleId;

export function getFixtureUser(userId?: string | string[]): FixtureUser {
  const normalizedUserId = Array.isArray(userId) ? userId[0] : userId;

  return (
    fixtureUsers.find((user) => user.id === normalizedUserId) ??
    fixtureUsers.find((user) => user.id === defaultFixtureUserId) ??
    fixtureUsers[0]
  );
}
