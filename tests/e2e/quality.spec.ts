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

async function expectReadableTypography(page: Page) {
  const typography = await page.evaluate(() => {
    const heading = document.querySelector("h1");
    return {
      bodyFontFamily: getComputedStyle(document.body).fontFamily.toLowerCase(),
      headingFontFamily: heading ? getComputedStyle(heading).fontFamily.toLowerCase() : "",
    };
  });

  expect(typography.bodyFontFamily).not.toContain("times");
  expect(typography.headingFontFamily).not.toContain("times");
  expect(typography.bodyFontFamily).toMatch(/inter|helvetica|arial|sans-serif/);
}

async function expectNoConsoleErrors(page: Page, errors: string[]) {
  expect(errors, errors.join("\n")).toEqual([]);
}

async function saveQualityScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `test-results/visual/${name}.png`, fullPage: true });
}

function captureConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("landing experience", () => {
  test("renders the signal-extraction concept without layout or console failures", async ({ page }, testInfo) => {
    const consoleErrors = captureConsoleErrors(page);
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /Turn marketplace noise into your next project/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Enter decision feed/i })).toBeVisible();
    await expect(page.locator(".hero-signal-row")).toHaveCount(4);

    await expectNoHorizontalOverflow(page);
    await expectReadableTypography(page);
    await expectNoConsoleErrors(page, consoleErrors);
    await saveQualityScreenshot(page, `landing-${testInfo.project.name}`);
  });

  test("primary navigation reaches the real workspace", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Enter decision feed/i }).click();
    await expect(page).toHaveURL(/\/opportunities$/);
    await expect(page.getByRole("heading", { level: 1, name: /Work worth opening/i })).toBeVisible();
  });
});

test.describe("opportunity workspace", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/opportunities");
  });

  test("renders a stable decision queue", async ({ page }, testInfo) => {
    const consoleErrors = captureConsoleErrors(page);
    await expect(page.locator("article.opportunity-row")).toHaveCount(6);
    await expectNoHorizontalOverflow(page);
    await expectReadableTypography(page);
    await expectNoConsoleErrors(page, consoleErrors);
    await saveQualityScreenshot(page, `workspace-${testInfo.project.name}`);
  });

  test("search, source filter, and sorting change the queue", async ({ page }) => {
    const searchField = page.getByRole("searchbox", { name: "Search opportunities" });

    await searchField.fill("GSAP");
    await expect(page.locator("article.opportunity-row")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 3, name: "Premium marketing website for an AI product" })).toBeVisible();

    await searchField.clear();
    await page.getByRole("button", { name: "Upwork" }).click();
    await expect(page.locator("article.opportunity-row")).toHaveCount(2);

    await page.getByLabel("Sort opportunities").selectOption("budget");
    await expect(page.locator("article.opportunity-row").first()).toContainText("Build a polished SaaS dashboard from Figma");
  });

  test("detail inspection traps attention in context and restores it on close", async ({ page }, testInfo) => {
    const trigger = page.getByRole("button", { name: /View details for Build a polished SaaS dashboard/i });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    const closeButton = dialog.getByRole("button", { name: "Close opportunity details" });
    const openOriginalLink = dialog.getByRole("link", { name: /Open original/i });

    await expect(dialog).toBeVisible();
    await expect(closeButton).toBeFocused();
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText("Build a polished SaaS dashboard from Figma");
    await expect(dialog).toContainText("$1,200–$1,800");
    await expect(dialog).toContainText("Prototype fit context");
    await expect(openOriginalLink).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    await page.keyboard.press("Shift+Tab");
    await expect(openOriginalLink).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(closeButton).toBeFocused();

    await saveQualityScreenshot(page, `detail-${testInfo.project.name}`);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
  });

  test("shortlist persists across reload and is filterable", async ({ page }) => {
    const firstCard = page.locator("article.opportunity-row").first();
    await firstCard.getByRole("button", { name: "Add to shortlist" }).click();
    await expect(firstCard.getByRole("button", { name: "Remove from shortlist" })).toBeVisible();

    await page.reload();
    await expect(page.getByRole("button", { name: /Shortlist 1/i })).toBeVisible();
    await page.getByRole("button", { name: /Shortlist 1/i }).click();
    await expect(page.locator("article.opportunity-row")).toHaveCount(1);
  });

  test("keyboard shortcut focuses search", async ({ page }) => {
    const searchField = page.getByRole("searchbox", { name: "Search opportunities" });
    await page.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
    await expect(searchField).toBeFocused();
  });
});

test.describe("reduced motion", () => {
  test("keeps the experience composed without continuous scene animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const scanAnimation = await page.locator(".signal-stage__scan").evaluate((element) =>
      getComputedStyle(element).animationDuration,
    );

    expect(Number.parseFloat(scanAnimation)).toBeLessThanOrEqual(0.01);
    await expect(page.getByRole("link", { name: /Enter decision feed/i })).toBeVisible();
  });
});
