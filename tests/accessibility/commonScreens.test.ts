import { test } from "@playwright/test";
import { globalSetUp } from "../../setUp/globalSetup";
import { testConfig } from "../../config/testConfig";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { typeOfBusinessPage } from "../../pages/common/typeOfBusinessPage";
import { globalTearDown } from "../../setUp/globalTearDown";

let startPageUrl;
let randomUser;

test.beforeEach(
  "Log in to ACSP Service to register as Unincorporated company",
  async ({ page }) => {
    const setUp = new globalSetUp(page);
    const typeOfbusinessContext = new typeOfBusinessPage(page);

    const unhashedPassword = getEnvVar("CHS_PASSWORD");
    randomUser = await setUp.createACSPUser();

  }
);

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

  await accessibilityContext.checkWcagCompliance(
    page,

    page.url(),

    testInfo
  );
});

test.afterEach("Delete the ACSP User from DB", async ({ page }) => {
  const tearDown = new globalTearDown(page);
  tearDown.deleteACSPUser(randomUser);
});

