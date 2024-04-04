import { Page, expect, test } from "@playwright/test";
import { globalSetUp } from "../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../pages/soleTrader/typeOfBusinessPage";
import { testConfig } from "../../config/testConfig";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { pageURL } from "../../config/pageURL";

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

  await accessibilityContext.checkWcagCompliance(
    page,

    page.url(),

    testInfo
  );
});
