import { expect, test } from "@playwright/test";

const viewports = [
  { height: 720, name: "phone", width: 375 },
  { height: 900, name: "tablet", width: 768 },
  { height: 900, name: "desktop", width: 1024 },
  { height: 1000, name: "wide", width: 1440 },
];

const routes = [
  {
    heading: "รอสร้างรอบจัดส่ง",
    path: "/modules/shipments?user=admin-sales",
  },
  {
    heading: "สร้างรอบจัดส่ง",
    path: "/modules/shipments/builder/ORD-240522-018?user=admin-sales",
  },
  {
    heading: "ฝ่ายจัดส่ง",
    path: "/modules/shipments/delivery?user=delivery-team",
  },
  {
    heading: "ยืนยันการจัดส่ง",
    path: "/modules/shipments/confirmation?user=admin-sales",
  },
  {
    heading: "ใบส่งของ",
    path: "/modules/shipments/delivery-note/SHP-240606-001?user=admin-sales",
  },
  {
    heading: "ใบจัดส่ง",
    path: "/modules/shipments/shipping-sheet/SHP-240606-001?user=delivery-team",
  },
  {
    heading: "รอบจัดส่ง SHP-240606-001",
    path: "/modules/shipments/SHP-240606-001?user=delivery-team",
  },
];

for (const viewport of viewports) {
  test.describe(`Sector 6 shipment delivery ${viewport.name}`, () => {
    test.use({ viewport });

    for (const route of routes) {
      test(`renders ${route.heading}`, async ({ page }) => {
        await page.goto(route.path);

        await expect(
          page.getByRole("heading", { name: route.heading }).first(),
        ).toBeVisible();
        await expect(
          page.getByText(
            /ต้นทุน|กำไร|payout|profit|cost|Management Log|Audit Log/i,
          ),
        ).toHaveCount(0);
        await expect(
          page.getByText(/หลักฐานรับเงิน|สลิป|เลขบัญชี/),
        ).toHaveCount(0);

        const hasHorizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        expect(hasHorizontalOverflow).toBe(false);
      });
    }

    test("keeps Shipment Builder without saved draft or COD editing", async ({
      page,
    }) => {
      await page.goto(
        "/modules/shipments/builder/ORD-240522-018?user=admin-sales",
      );

      await expect(page.getByText("บันทึกเป็นร่าง")).toHaveCount(0);
      await expect(page.getByText("เปิด COD ได้เฉพาะรอบสุดท้าย")).toBeVisible();
      await expect(page.getByLabel(/COD/)).toHaveCount(0);
    });

    test("moves delivery send-out into same-day history", async ({ page }) => {
      await page.goto("/modules/shipments/delivery?user=delivery-team");

      const firstCard = page
        .getByText("SHP-240606-001")
        .locator("xpath=ancestor::article[1]");

      await expect(firstCard).toBeVisible();
      await firstCard.getByRole("button", { name: "ส่งออกแล้ว" }).click();
      await page
        .getByRole("dialog", { name: "ส่งออกแล้ว" })
        .getByRole("button", { name: "ส่งออกแล้ว" })
        .click();

      await expect(page.getByText(/ส่งออกแล้ว 1 รอบ/)).toBeVisible();
      await expect(page.getByText("SHP-240606-001")).toBeVisible();
      await page
        .getByRole("button", { name: "รายการต้องจัดส่งวันนี้" })
        .click();
      await expect(page.getByText("SHP-240606-001")).toHaveCount(0);
    });

    test("blocks admin close until tracking or evidence exists", async ({
      page,
    }) => {
      await page.goto("/modules/shipments/confirmation?user=admin-sales");

      await expect(
        page.getByText(
          "กรุณาเพิ่ม Tracking หรือรูปหลักฐานจัดส่งก่อนปิดรอบจัดส่ง",
        ),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "ยืนยันและปิดรอบจัดส่ง" }),
      ).toBeDisabled();

      await page.getByRole("textbox", { name: "Tracking" }).fill("TH-E2E-0001");
      await expect(
        page.getByRole("button", { name: "ยืนยันและปิดรอบจัดส่ง" }),
      ).toBeEnabled();
    });

    test("keeps Delivery Note free of COD while Shipping Sheet is permission-aware", async ({
      page,
    }) => {
      await page.goto(
        "/modules/shipments/delivery-note/SHP-240606-001?user=admin-sales",
      );

      await expect(
        page
          .getByRole("main")
          .getByRole("heading", { level: 1, name: "ใบส่งของ" }),
      ).toBeVisible();
      await expect(page.getByText(/COD|18,000 บาท/)).toHaveCount(0);

      await page.goto(
        "/modules/shipments/shipping-sheet/SHP-240606-001?user=delivery-team",
      );
      await expect(page.getByText("18,000 บาท").first()).toBeVisible();

      await page.goto(
        "/modules/shipments/shipping-sheet/SHP-240606-001?user=woodwork",
      );
      await expect(page.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeVisible();
    });
  });
}
