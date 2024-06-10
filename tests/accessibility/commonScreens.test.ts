import { test } from "@playwright/test";
import { globalSetUp } from "../../setUp/globalSetup";
import { testConfig } from "../../config/testConfig";
import { accessibilityScan } from "../../utils/accessibilityScan";

let startPageUrl;

test("Accessibility check for Start page @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  startPageUrl = testConfig.baseUrl;
  await accessibilityContext.checkWcagCompliance(
    page,

    startPageUrl,

    testInfo
  );
});

test("Accessibility check for Type of business screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
  await setUp.createNewApplication();

  await accessibilityContext.checkWcagCompliance(
    page,

    page.url(),

    testInfo
  );
});
