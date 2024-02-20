import AxeBuilder from "@axe-core/playwright";
import { test, expect, Page } from "@playwright/test";

export class accessibilityScan {
  async checkWcagCompliance(page, url: string, testInfo) {
    await page.goto(url);
    const scanResults = await new AxeBuilder({ page })
      .withTags(["wcag22aa"])
      .analyze();
    await testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(scanResults, null, 2),
      contentType: "application/json",
    });
    expect(scanResults.violations).toEqual([]);
  }
}
