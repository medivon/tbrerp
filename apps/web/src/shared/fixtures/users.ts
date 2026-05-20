export const sectorOneRoleIds = [
  "owner",
  "manager",
  "admin-sales",
  "finance",
  "woodwork",
  "coloring",
  "delivery-team",
  "rak-samuk-worker",
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
    roleLabel: "เจ้าของระบบ",
    userType: "พนักงานภายใน",
    initials: "จ",
  },
  {
    id: "manager",
    displayName: "คุณผู้จัดการ",
    roleLabel: "ผู้จัดการ",
    userType: "พนักงานภายใน",
    initials: "ผ",
  },
  {
    id: "admin-sales",
    displayName: "แอดมินฝ่ายขาย",
    roleLabel: "แอดมิน / ฝ่ายขาย",
    userType: "พนักงานภายใน",
    initials: "อ",
  },
  {
    id: "finance",
    displayName: "ฝ่ายการเงิน",
    roleLabel: "ฝ่ายการเงิน",
    userType: "พนักงานภายใน",
    initials: "ง",
  },
  {
    id: "woodwork",
    displayName: "ทีมช่างไม้",
    roleLabel: "ทีมช่างไม้",
    userType: "พนักงานภายใน",
    initials: "ม",
  },
  {
    id: "coloring",
    displayName: "ทีมฝ่ายสี",
    roleLabel: "ทีมฝ่ายสี",
    userType: "พนักงานภายใน",
    initials: "ส",
  },
  {
    id: "delivery-team",
    displayName: "ทีมจัดส่ง",
    roleLabel: "ทีมจัดส่ง",
    userType: "พนักงานภายใน",
    initials: "ด",
  },
  {
    id: "rak-samuk-worker",
    displayName: "ช่างสมชาย รักสมุก",
    roleLabel: "ช่างรักสมุก",
    userType: "Outsource",
    initials: "ร",
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
