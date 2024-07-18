import { test } from "@playwright/test";
import { globalSetUp } from "../../setUp/globalSetup";
import { testConfig } from "../../config/testConfig";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";

let startPageUrl;
let randomUser;

test("Accessibility check for Start page @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  startPageUrl = process.env.URL;
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

  const unhashedPassword = getEnvVar("CHS_PASSWORD");

  await setUp.ACSPUserLogin(randomUser, unhashedPassword);
  await setUp.createNewApplication();

  await accessibilityContext.checkWcagCompliance(
    page,

    page.url(),

    testInfo
  );
});
