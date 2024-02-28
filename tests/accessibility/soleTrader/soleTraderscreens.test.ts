import { test, expect } from "@playwright/test";
import { testConfig } from "../../../testConfig";
import { accessibilityScan } from "../../../utils/accessibilityScan";

test("Accessibility check for Sole-Trader-Name screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soletrader.name,
    testInfo
  );
});
