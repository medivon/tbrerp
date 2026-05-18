import { expect, test } from "@playwright/test";

const viewports = [
  { height: 720, name: "phone", width: 375 },
  { height: 900, name: "tablet", width: 768 },
  { height: 900, name: "desktop", width: 1024 },
  { height: 1000, name: "wide", width: 1440 },
];

for (const viewport of viewports) {
  test.describe(`Sector 1 smoke ${viewport.name}`, () => {
    test.use({ viewport });

    test("routes operational users to the Admin Dashboard", async ({
      page,
    }) => {
      await page.goto("/?user=admin-sales");

      await expect(page).toHaveURL(/\/dashboard\?user=admin-sales/);
      await expect(
        page.getByRole("heading", { name: "งานที่ต้องรีบดู" }),
      ).toBeVisible();
      await expect(page.getByText("ออเดอร์ที่ต้องติดตาม")).toBeVisible();
      await expect(page.getByText("ติดตาม COD / Payment")).toBeVisible();
      await expect(page.getByText("฿")).toHaveCount(0);

      if (viewport.width < 1024) {
        await page.getByLabel("เมนู", { exact: true }).click();
        await expect(
          page
            .getByRole("navigation", { name: "เมนูหลักขนาดเล็ก" })
            .getByText("ออเดอร์", { exact: true }),
        ).toBeVisible();
      } else {
        await expect(
          page.getByRole("navigation", { name: "เมนูหลัก" }),
        ).toBeVisible();
      }
    });

    test("routes base-role users to the Personal Dashboard", async ({
      page,
    }) => {
      await page.goto("/?user=staff-base");

      await expect(page).toHaveURL(/\/personal\?user=staff-base/);
      await expect(page.getByText("แดชบอร์ดส่วนตัว").first()).toBeVisible();
      await expect(
        page.getByRole("navigation", { name: "เมนูหลัก" }),
      ).toHaveCount(0);
    });

    test("blocks direct Admin Dashboard access for base-role users", async ({
      page,
    }) => {
      await page.goto("/dashboard?user=outsource-base");

      await expect(page).toHaveURL(/\/no-access\?user=outsource-base/);
      await expect(page.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeVisible();
      await expect(
        page.getByRole("link", { name: "กลับหน้าแรกของฉัน" }),
      ).toHaveAttribute("href", "/personal?user=outsource-base");
      await expect(page.getByRole("combobox")).toHaveCount(0);
    });

    test("renders approved future modules as non-business placeholders", async ({
      page,
    }) => {
      await page.goto("/modules/shipments?user=admin-sales");

      await expect(
        page.getByRole("heading", { name: "รอบจัดส่ง" }).first(),
      ).toBeVisible();
      await expect(page.getByText(/ยังไม่มีรายการงาน/)).toBeVisible();
    });
  });
}
