import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const viewports = [
  { height: 720, name: "phone", width: 375 },
  { height: 900, name: "tablet", width: 768 },
  { height: 900, name: "desktop", width: 1024 },
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
    heading: "ปิดแล้ว / ยกเลิก",
    path: "/modules/orders/closed?user=admin-sales",
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
    heading: "รายละเอียดออเดอร์ ORD-240606-010",
    path: "/modules/orders/ORD-240606-010?user=admin-sales",
  },
  {
    heading: "แก้ไขรายการออเดอร์",
    path: "/modules/orders/ORD-240522-018/lines/edit?user=admin-sales",
  },
];

const forbiddenProductCopy =
  /fixture|mock|placeholder|sector|in-memory|database|ฐานข้อมูล|หน่วยความจำ|ยังไม่เชื่อมฐานข้อมูล|รอทำใน sector|ไม่จองสต๊อกจริง|ไม่เขียนฐานข้อมูลจริง|ยังไม่ได้เชื่อมฐานข้อมูล|ปุ่มนี้|foundation|dev result|upload จริง|บันทึกจริง|จองสต๊อกจริง|Customer\/CRM|mutation|persistence|ข้อมูลตัวอย่าง|ยอดรวมตัวอย่าง|กิจกรรมตัวอย่าง|ปุ่มตัวอย่าง|เป็นปุ่มตัวอย่าง|ในตัวอย่างนี้|ถ\.ตัวอย่าง|\bReview\b|Order Detail|acknowledgement|modal/i;

function visibleText(page: Page, text: string) {
  return page.getByText(text).filter({ visible: true });
}

async function expectNoInternalProductCopy(page: Page) {
  const bodyText = await page.evaluate(() => document.body.innerText);

  expect(bodyText).not.toMatch(forbiddenProductCopy);
}

async function expectCleanResponsiveText(page: Page) {
  const textOffenders = await page.evaluate(() => {
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

  expect(textOffenders).toEqual([]);
}

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
        await expectNoInternalProductCopy(page);
        await expectCleanResponsiveText(page);
      });
    }

    test("keeps Draft queue free of real Order IDs", async ({ page }) => {
      await page.goto("/modules/orders/drafts?user=admin-sales");

      await expect(
        page.getByText("DRAFT-00034").nth(viewport.width < 1024 ? 1 : 0),
      ).toBeVisible();
      await expect(page.getByText(/ORD-\d/)).toHaveCount(0);
    });

    test("filters Order and Draft queues with operational state", async ({
      page,
    }) => {
      await page.goto("/modules/orders/all?user=admin-sales");

      await page.getByLabel("ค้นหาออเดอร์").fill("อรุณ");
      await expect(visibleText(page, "ORD-240602-009").first()).toBeVisible();
      await expect(visibleText(page, "ORD-240522-018")).toHaveCount(0);

      await page.getByRole("button", { name: "ล้างตัวกรอง" }).click();
      await expect(visibleText(page, "ORD-240522-018").first()).toBeVisible();

      await page.goto("/modules/orders/drafts?user=admin-sales");

      await page.getByLabel("ค้นหาร่างออเดอร์").fill("ปริญญา");
      await expect(visibleText(page, "DRAFT-00035").first()).toBeVisible();
      await expect(visibleText(page, "DRAFT-00034")).toHaveCount(0);
      await expect(page.getByText(/ORD-\d/)).toHaveCount(0);

      await page.getByRole("button", { name: "ล้างตัวกรอง" }).click();
      await expect(visibleText(page, "DRAFT-00034").first()).toBeVisible();
    });

    test("updates Order Create lines and carries them to Review", async ({
      page,
    }) => {
      await page.goto("/modules/orders/create?user=admin-sales");

      await expect(page.getByText("2 รายการ / 3 ชิ้น")).toBeVisible();
      await page.getByRole("button", { name: "เพิ่มสินค้าพร้อมส่ง" }).click();
      const productDialog = page.getByRole("dialog", {
        name: "เลือกสินค้าพร้อมส่ง",
      });
      await expect(productDialog).toBeVisible();
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
      await productDialog
        .getByLabel(/จำนวน โต๊ะข้างไม้สักพร้อมส่ง TBR-SID-DRK/)
        .fill("3");
      await productDialog
        .getByTestId("add-ready-stock-ready-side-table-dark")
        .click();
      await expect(page.getByTestId("entry-ready-added-1")).toBeVisible();
      await expect(page.getByText("3 รายการ / 6 ชิ้น")).toBeVisible();

      await page.getByRole("button", { name: "เพิ่มงานสั่งทำ" }).click();
      const customDialog = page.getByRole("dialog", {
        name: "รายละเอียดงานสั่งทำ",
      });
      await expect(customDialog.getByLabel("รายละเอียดช่างไม้")).toBeVisible();
      await expect(customDialog.getByText("รูปอ้างอิงงานสั่งทำ")).toBeVisible();
      await expect(
        customDialog.getByRole("button", {
          name: "เพิ่มรูปอ้างอิง รูปหลัก",
        }),
      ).toBeVisible();
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
      await customDialog
        .getByRole("button", {
          name: "เพิ่มรูปอ้างอิง รูปหลัก",
        })
        .click();
      await expect(
        customDialog
          .getByRole("button", {
            name: "เลือกแล้ว",
          })
          .first(),
      ).toBeDisabled();
      await customDialog
        .getByRole("button", {
          name: "เพิ่มรูปอ้างอิง รูปสำหรับช่างไม้",
        })
        .click();
      await expect(customDialog.getByLabel("รูปอ้างอิง")).toHaveValue(
        /รูปหลัก.*รูปสำหรับช่างไม้/,
      );
      await customDialog
        .getByLabel("ชื่องาน / รายการ")
        .fill("ตู้เตี้ยไม้สักสั่งทำ");
      await customDialog.getByLabel("จำนวน").fill("2");
      await customDialog
        .getByLabel("ขนาด / หมายเหตุขนาด")
        .fill("180 x 45 x 90 ซม.");
      await customDialog.getByLabel("กำหนดส่งที่คุยไว้").fill("30 มิ.ย. 67");
      await customDialog
        .getByLabel("สี / งานตกแต่งหลัก")
        .fill("โอ๊คอ่อน เคลือบด้าน");
      await customDialog
        .getByLabel("รายละเอียดช่างไม้")
        .fill("ทำโครงตู้เตี้ย บานเลื่อน และชั้นวางสองระดับ");
      await customDialog
        .getByLabel("รายละเอียดฝ่ายสี/ตกแต่ง")
        .fill("ทำสีโอ๊คอ่อน เคลือบด้าน ให้เห็นลายไม้");
      await customDialog
        .getByLabel("รายละเอียดรักสมุก")
        .fill("ไม่มีงานรักสมุกสำหรับรายการนี้");
      await customDialog
        .getByLabel("รูปอ้างอิง")
        .fill("ใช้ภาพตู้เตี้ยเป็นภาพอ้างอิง");
      await customDialog
        .getByRole("button", { name: "เพิ่มรายการสั่งทำ" })
        .click();
      await expect(page.getByTestId("entry-custom-added-1")).toBeVisible();
      await expect(page.getByText("4 รายการ / 8 ชิ้น")).toBeVisible();
      await expect(page.getByText("1 รายการยังไม่ครบ")).toHaveCount(0);

      await page
        .getByRole("link", { name: "ตรวจสอบก่อนสร้างออเดอร์" })
        .first()
        .click();

      await expect(page.getByText("ตู้เตี้ยไม้สักสั่งทำ")).toBeVisible();
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
    });

    test("saves a Draft and returns to the Draft queue", async ({ page }) => {
      await page.goto("/modules/orders/create?user=admin-sales");

      await page.getByRole("link", { name: "บันทึกร่าง" }).click();

      await expect(page).toHaveURL(
        /\/modules\/orders\/drafts\?user=admin-sales/,
      );
      await expect(visibleText(page, "DRAFT-00901").first()).toBeVisible();
      await expect(page.getByText(/ORD-\d/)).toHaveCount(0);
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
    });

    test("does not seed Review from an unknown scenario query", async ({
      page,
    }) => {
      await page.goto("/modules/orders/review?user=admin-sales&case=unknown");

      await expect(
        page.getByText("ยังไม่มีข้อมูลออเดอร์ให้ตรวจสอบ"),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "ยืนยันสร้างออเดอร์" }),
      ).toHaveCount(0);
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
    });

    test("can confirm valid Review without a second modal", async ({
      page,
    }) => {
      await page.goto("/modules/orders/review?user=admin-sales&case=valid");

      await expect(
        page.getByRole("button", { name: "ยืนยันสร้างออเดอร์" }),
      ).toBeDisabled();
      await page
        .getByRole("checkbox", { name: /รับทราบว่าสินค้าขายได้ไม่พอ/ })
        .setChecked(true, { force: true });
      await expect(
        page.getByRole("button", { name: "ยืนยันสร้างออเดอร์" }),
      ).toBeEnabled();
      await page.getByRole("button", { name: "ยืนยันสร้างออเดอร์" }).click();
      await expect(page.getByText("ORD-240606-010")).toBeVisible();
      await expect(
        page.getByText("JOB-O-0271", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        page.getByText("คาดขายได้หลังจอง -1 ชิ้น").first(),
      ).toBeVisible();
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(page.getByText(/จะจองสต๊อก 1 รายการ/).first()).toBeVisible();
      await expect(
        page.getByText(/จะสร้าง JOB-O 1 รายการ/).first(),
      ).toBeVisible();
      await expect(
        page.getByText("ยังไม่สร้างรอบจัดส่ง").first(),
      ).toBeVisible();
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
    });

    test("shows blocked Review reason", async ({ page }) => {
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
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
    });

    test("routes base role away from confirmation surface", async ({
      page,
    }) => {
      await page.goto("/modules/orders/review?user=staff-base");

      await expect(page.getByText("ไม่มีสิทธิ์เข้าถึงหน้านี้")).toBeVisible();
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
      await expectNoInternalProductCopy(page);
      await expectCleanResponsiveText(page);
    });
  });
}
