import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { height: 720, name: "phone", width: 375 },
  { height: 900, name: "tablet", width: 768 },
  { height: 900, name: "desktop", width: 1024 },
  { height: 1000, name: "wide", width: 1440 },
];

const forbiddenProductCopy =
  /fixture|mock|placeholder|sector|in-memory|database|ฐานข้อมูล|หน่วยความจำ|ยังไม่เชื่อมฐานข้อมูล|รอทำใน sector|ไม่จองสต๊อกจริง|ไม่เขียนฐานข้อมูลจริง|ยังไม่ได้เชื่อมฐานข้อมูล|ปุ่มนี้|foundation|dev result|upload จริง|บันทึกจริง|จองสต๊อกจริง|Customer\/CRM|mutation|persistence|ข้อมูลตัวอย่าง|ยอดรวมตัวอย่าง|กิจกรรมตัวอย่าง|ปุ่มตัวอย่าง|เป็นปุ่มตัวอย่าง|ในตัวอย่างนี้|ถ\.ตัวอย่าง|\bReview\b|Order Detail|acknowledgement|modal/i;

async function expectNoInternalProductCopy(page: Page) {
  const bodyText = await page.evaluate(() => document.body.innerText);

  expect(bodyText).not.toMatch(forbiddenProductCopy);
}

async function expectNoVisibleTextBleeding(page: Page) {
  const offenders = await page.evaluate(() => {
    const textSelectors = "h1,h2,h3,p,span,button,a,label,li,dt,dd,summary";
    const viewportWidth = document.documentElement.clientWidth;

    function isVisible(element: Element) {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);

      return (
        rect.width > 1 &&
        rect.height > 1 &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0"
      );
    }

    function hasIntentionalHorizontalScroller(element: Element) {
      let parent = element.parentElement;

      while (parent && parent !== document.body) {
        const style = window.getComputedStyle(parent);
        const scrollsHorizontally =
          (style.overflowX === "auto" || style.overflowX === "scroll") &&
          parent.scrollWidth > parent.clientWidth + 2;

        if (scrollsHorizontally) {
          return true;
        }

        parent = parent.parentElement;
      }

      return false;
    }

    return Array.from(document.querySelectorAll<HTMLElement>(textSelectors))
      .filter((element) => isVisible(element))
      .filter((element) => !hasIntentionalHorizontalScroller(element))
      .flatMap((element) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const clipsText =
          element.scrollWidth > element.clientWidth + 2 &&
          (style.overflowX === "hidden" || style.overflowX === "clip");
        const bleedsViewport = rect.left < -2 || rect.right > viewportWidth + 2;

        if (!clipsText && !bleedsViewport) {
          return [];
        }

        return [
          {
            clipsText,
            text: (element.textContent ?? "").trim().slice(0, 90),
            tag: element.tagName,
            width: Math.round(rect.width),
          },
        ];
      });
  });

  expect(offenders).toEqual([]);
}

async function expectCleanResponsiveText(page: Page) {
  await expectNoInternalProductCopy(page);
  await expectNoVisibleTextBleeding(page);
}

for (const viewport of viewports) {
  test.describe(`Sector 4 confirmation ${viewport.name}`, () => {
    test.use({ viewport });

    test("confirms a valid Review and shows generated result", async ({
      page,
    }) => {
      await page.goto("/modules/orders/review?user=admin-sales&case=valid");

      await expect(
        page.getByRole("heading", { name: "ตรวจสอบก่อนสร้างออเดอร์" }).first(),
      ).toBeVisible();
      await expect(
        page.getByText(/จะสร้าง JOB-O 1 รายการ/).first(),
      ).toBeVisible();
      await expectCleanResponsiveText(page);

      await page
        .getByRole("checkbox", { name: /รับทราบว่าสินค้าขายได้ไม่พอ/ })
        .setChecked(true, { force: true });
      await page.getByRole("button", { name: "ยืนยันสร้างออเดอร์" }).click();

      await expect(page.getByText("ORD-240606-010")).toBeVisible();
      await expect(
        page.getByText("JOB-O-0271", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        page.getByText("คาดขายได้หลังจอง -1 ชิ้น").first(),
      ).toBeVisible();
      await expect(page.getByText("ประวัติการสร้างออเดอร์")).toBeVisible();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expectCleanResponsiveText(page);

      await page.getByRole("link", { name: /เปิดรายละเอียดออเดอร์/ }).click();

      await expect(
        page.getByRole("heading", {
          name: "รายละเอียดออเดอร์ ORD-240606-010",
        }),
      ).toBeVisible();
      await expect(
        page.getByText("JOB-O-0271", { exact: true }).first(),
      ).toBeVisible();
      await expect(page.getByText("มีรายการรับเงิน").first()).toBeVisible();
      await expect(page.getByText(/ต้นทุน|กำไร|payout/i)).toHaveCount(0);
      await expectCleanResponsiveText(page);
    });

    test("keeps blocked Review disabled with visible reason", async ({
      page,
    }) => {
      await page.goto(
        "/modules/orders/review?user=admin-sales&case=missing-payment-term",
      );

      await expect(
        page.getByText("ต้องระบุเงื่อนไขการชำระเงินก่อนยืนยันออเดอร์").first(),
      ).toBeVisible();
      await page
        .getByRole("checkbox", { name: /รับทราบว่าสินค้าขายได้ไม่พอ/ })
        .setChecked(true, { force: true });
      await expect(
        page.getByRole("button", { name: "ยืนยันสร้างออเดอร์" }),
      ).toBeDisabled();
      await expectCleanResponsiveText(page);
    });

    test("routes base role away from confirmation surface", async ({
      page,
    }) => {
      await page.goto("/modules/orders/review?user=staff-base");

      await expect(page.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeVisible();
      await expectCleanResponsiveText(page);
    });
  });
}
