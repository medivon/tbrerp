import { expect, test } from "@playwright/test";

const viewports = [
  { height: 720, name: "phone", width: 375 },
  { height: 1000, name: "wide", width: 1440 },
];

const routes = [
  {
    heading: "ออเดอร์ที่ต้องติดตาม",
    path: "/modules/orders?user=admin-sales",
  },
  {
    heading: "ออเดอร์ทั้งหมด",
    path: "/modules/orders/all?user=admin-sales",
  },
  {
    heading: "ร่างออเดอร์",
    path: "/modules/orders/drafts?user=admin-sales",
  },
  {
    heading: "สร้างออเดอร์",
    path: "/modules/orders/create?user=admin-sales",
  },
  {
    heading: "ตรวจสอบก่อนสร้างออเดอร์",
    path: "/modules/orders/review?user=admin-sales",
  },
  {
    heading: "รายละเอียดออเดอร์ ORD-240602-009",
    path: "/modules/orders/ORD-240602-009?user=admin-sales",
  },
  {
    heading: "แก้ไขรายการออเดอร์",
    path: "/modules/orders/ORD-240522-018/lines/edit?user=admin-sales",
  },
];

for (const viewport of viewports) {
  test.describe(`Sector 3 orders smoke ${viewport.name}`, () => {
    test.use({ viewport });

    for (const route of routes) {
      test(`renders ${route.heading}`, async ({ page }) => {
        await page.goto(route.path);

        await expect(
          page.getByRole("heading", { name: route.heading }).first(),
        ).toBeVisible();
        await expect(page.getByText(/ต้นทุน|กำไร|payout/i)).toHaveCount(0);

        const hasHorizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        expect(hasHorizontalOverflow).toBe(false);
      });
    }

    test("keeps Draft queue free of real Order IDs", async ({ page }) => {
      await page.goto("/modules/orders/drafts?user=admin-sales");

      await expect(
        page.getByText("DRAFT-00034").nth(viewport.width < 1024 ? 1 : 0),
      ).toBeVisible();
      await expect(page.getByText(/ORD-\d/)).toHaveCount(0);
    });

    test("keeps Order Review confirmation disabled", async ({ page }) => {
      await page.goto("/modules/orders/review?user=admin-sales");

      await expect(
        page.getByRole("button", { name: "ยืนยันสร้างออเดอร์" }),
      ).toBeDisabled();
      await expect(page.getByText("จะจองสต๊อก").first()).toBeVisible();
      await expect(page.getByText("จะสร้าง JOB-O").first()).toBeVisible();
      await expect(
        page.getByText("ยังไม่สร้างรอบจัดส่ง").first(),
      ).toBeVisible();
    });

    test("separates Order and Shipment status in detail", async ({ page }) => {
      await page.goto("/modules/orders/ORD-240602-009?user=admin-sales");

      const orderStatus = page
        .getByText("สถานะออเดอร์", { exact: true })
        .first()
        .locator("..");
      const shipmentStatus = page
        .getByText("สถานะจัดส่ง", { exact: true })
        .first()
        .locator("..");

      await expect(orderStatus.getByText("กำลังดำเนินการ")).toBeVisible();
      await expect(shipmentStatus.getByText("รอยืนยันการจัดส่ง")).toBeVisible();
      await expect(orderStatus.getByText("รอยืนยันการจัดส่ง")).toHaveCount(0);
    });
  });
}
