import { expect, test } from "@playwright/test";

const viewports = [
  { height: 720, name: "phone", width: 375 },
  { height: 900, name: "tablet", width: 768 },
  { height: 900, name: "desktop", width: 1024 },
  { height: 1000, name: "wide", width: 1440 },
];

const routes = [
  {
    heading: "งานกำลังผลิต",
    path: "/modules/jobs?user=admin-sales",
  },
  {
    heading: "รายละเอียด Job JOB-O-0241",
    path: "/modules/jobs/JOB-O-0241?user=admin-sales",
  },
  {
    heading: "งานที่ต้องทำ",
    path: "/modules/jobs/woodwork?user=woodwork",
  },
  {
    heading: "รอรับเข้าโรงงานสี",
    path: "/modules/jobs/coloring/intake?user=coloring",
  },
  {
    heading: "งานที่ต้องทำ",
    path: "/modules/jobs/coloring?user=coloring",
  },
  {
    heading: "รักสมุก",
    path: "/modules/jobs/rak-samuk?user=admin-sales",
  },
  {
    heading: "งานที่ต้องทำ",
    path: "/modules/jobs/rak-samuk/worker?user=rak-samuk-worker",
  },
  {
    heading: "เปิดงาน",
    path: "/modules/jobs/rak-samuk/worker/RS-WORK-001?user=rak-samuk-worker",
  },
  {
    heading: "ไม่มีราคา / ให้แจ้งราคา",
    path: "/modules/jobs/rak-samuk/missing-price?user=rak-samuk-worker&workId=RS-WORK-001",
  },
  {
    heading: "อนุมัติราคา",
    path: "/modules/jobs/rak-samuk/approval?user=owner",
  },
  {
    heading: "รับงานรักสมุกกลับ",
    path: "/modules/jobs/rak-samuk/receive-back?user=coloring",
  },
];

for (const viewport of viewports) {
  test.describe(`Sector 5 jobs worker Rak Samuk ${viewport.name}`, () => {
    test.use({ viewport });

    for (const route of routes) {
      test(`renders ${route.path}`, async ({ page }) => {
        await page.goto(route.path);

        await expect(
          page.getByRole("heading", { name: route.heading }).first(),
        ).toBeVisible();
        await expect(
          page.getByText(/ต้นทุน|กำไร|payout|profit|cost/i),
        ).toHaveCount(0);
        await expect(
          page.getByText(
            /fixture|mock|placeholder|in-memory|database|not implemented|future implementation|agent workflow|foundation|sector|ตัวอย่าง|SAMPLE/i,
          ),
        ).toHaveCount(0);

        const hasHorizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        expect(hasHorizontalOverflow).toBe(false);
      });
    }

    test("keeps Woodwork worker route free of business-sensitive context", async ({
      page,
    }) => {
      await page.goto("/modules/jobs/woodwork?user=woodwork");

      await expect(page.getByText(/คุณมาลี|ORD-2569/)).toHaveCount(0);
      await expect(
        page.getByText(/Payment|ชำระเงิน|Management Log|Audit Log/i),
      ).toHaveCount(0);
    });

    test("keeps Rak Samuk Worker to own assigned work only", async ({
      page,
    }) => {
      await page.goto("/modules/jobs/rak-samuk/worker?user=rak-samuk-worker");

      await expect(page.getByText("ตู้โชว์รักสมุกสองบาน")).toBeVisible();
      await expect(page.getByText("งานของช่างคนอื่น")).toHaveCount(0);
      await expect(page.getByText(/ราคามาตรฐาน|Order ID|payout/i)).toHaveCount(
        0,
      );
    });

    test("hides receive-back navigation from Woodwork Rak Samuk sender", async ({
      page,
    }) => {
      await page.goto("/modules/jobs/rak-samuk?user=woodwork");

      await expect(
        page.getByRole("main").getByRole("heading", {
          exact: true,
          name: "รักสมุก",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "รับงานรักสมุกกลับ" }),
      ).toHaveCount(0);
      await expect(page.getByRole("link", { name: "งานทั้งหมด" })).toHaveCount(
        0,
      );
      await expect(
        page.getByRole("link", { name: "รอรับเข้าโรงงานสี" }),
      ).toHaveCount(0);
    });

    test("requires a note before Woodwork marks waiting materials", async ({
      page,
    }) => {
      await page.goto("/modules/jobs/woodwork?user=woodwork");

      await expect(
        page.getByRole("button", { name: "ส่งไปรักสมุก" }).first(),
      ).toBeDisabled();
      await expect(page.getByText("งานนี้รอวัตถุดิบ").first()).toBeVisible();
      await expect(
        page.getByRole("link", { name: /ส่งไปรักสมุก/ }),
      ).toHaveCount(1);

      await page.getByRole("button", { name: "รอวัตถุดิบ" }).nth(1).click();

      await expect(page.getByLabel("หมายเหตุรอวัตถุดิบ *")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "บันทึกรอวัตถุดิบ" }),
      ).toBeDisabled();

      await page.getByLabel("หมายเหตุรอวัตถุดิบ *").fill("รอไม้บัว");
      await page.getByRole("button", { name: "บันทึกรอวัตถุดิบ" }).click();

      await expect(page.getByText(/หมายเหตุ: รอไม้บัว/)).toBeVisible();
    });

    test("blocks Finance from price approval", async ({ page }) => {
      await page.goto("/modules/jobs/rak-samuk/approval?user=finance");

      await expect(page.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeVisible();
    });
  });
}
