import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
  }));

  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
  expect(layout.bodyWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
}

async function expectReadableVisibleText(page: Page) {
  const undersizedText = await page.evaluate(() => {
    return Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .filter((element) => {
        const text = element.textContent?.trim();
        const rectangle = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);
        const isLeafText = element.children.length === 0 && Boolean(text);
        const isVisible =
          rectangle.width > 1 &&
          rectangle.height > 1 &&
          styles.visibility !== "hidden" &&
          styles.display !== "none";

        return isLeafText && isVisible && parseFloat(styles.fontSize) < 9.4;
      })
      .map((element) => ({
        text: element.textContent?.trim().slice(0, 80),
        fontSize: window.getComputedStyle(element).fontSize,
        className: element.className,
      }));
  });

  expect(undersizedText, JSON.stringify(undersizedText, null, 2)).toEqual([]);
}

async function expectModernSansTypography(page: Page) {
  const typography = await page.evaluate(() => {
    const heading = document.querySelector("h1");

    return {
      bodyFontFamily: window.getComputedStyle(document.body).fontFamily,
      headingFontFamily: heading ? window.getComputedStyle(heading).fontFamily : "",
    };
  });

  const bodyFontFamily = typography.bodyFontFamily.toLowerCase();
  const headingFontFamily = typography.headingFontFamily.toLowerCase();

  expect(bodyFontFamily).toContain("inter");
  expect(headingFontFamily).toContain("inter");
  expect(bodyFontFamily).not.toContain("times new roman");
  expect(headingFontFamily).not.toContain("times new roman");
}

async function saveQualityScreenshot(page: Page, name: string) {
  await page.screenshot({
    path: `test-results/visual/${name}.png`,
    fullPage: true,
  });
}

test.describe("landing experience", () => {
  test("remains visually stable and readable", async ({ page }, testInfo) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Good projects should not be buried in/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore live workspace/i })).toBeVisible();

    await expectNoHorizontalOverflow(page);
    await expectReadableVisibleText(page);
    await expectModernSansTypography(page);
    await saveQualityScreenshot(page, `landing-${testInfo.project.name}`);
  });
});

test.describe("opportunity workspace", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/opportunities");
  });

  test("renders a stable responsive decision queue", async ({ page }, testInfo) => {
    await expect(page.locator("article.opportunity-card")).toHaveCount(6);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Find the work that deserves your next proposal/i,
      }),
    ).toBeVisible();

    await expectNoHorizontalOverflow(page);
    await expectReadableVisibleText(page);
    await expectModernSansTypography(page);
    await saveQualityScreenshot(page, `workspace-${testInfo.project.name}`);
  });

  test("search and source filtering narrow the queue", async ({ page }) => {
    const searchField = page.getByRole("searchbox", { name: "Search opportunities" });

    await searchField.fill("GSAP");
    await expect(page.locator("article.opportunity-card")).toHaveCount(1);
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Premium marketing website for an AI product",
      }),
    ).toBeVisible();

    await searchField.clear();
    await page.getByRole("button", { name: "Upwork" }).click();
    await expect(page.locator("article.opportunity-card")).toHaveCount(2);
  });

  test("shortlisting is immediate and filterable", async ({ page }) => {
    const firstCard = page.locator("article.opportunity-card").first();
    const saveButton = firstCard.getByRole("button", { name: "Add to shortlist" });

    await saveButton.click();
    await expect(firstCard.getByRole("button", { name: "Remove from shortlist" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Shortlisted 1/i })).toBeVisible();

    await page.getByRole("button", { name: /Shortlisted 1/i }).click();
    await expect(page.locator("article.opportunity-card")).toHaveCount(1);
  });
});
