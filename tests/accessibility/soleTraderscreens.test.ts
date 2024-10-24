import { test } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { pageURL } from "../../config/pageURL";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { globalSetUp } from "../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../pages/common/typeOfBusinessPage";
import { Console } from "console";
import { userActions } from "../../utils/userActions";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { globalTearDown } from "../../setUp/globalTearDown";

let randomUser;
test.beforeEach(
  "Log in to ACSP Service to register as Sole Trader",
  async ({ page }) => {
    const setUp = new globalSetUp(page);
    const typeOfbusinessContext = new typeOfBusinessPage(page);
    const userActionsContext = new userActions(page);

    // randomUser = await setUp.createACSPUser();
    const unhashedPassword = getEnvVar("CHS_PASSWORD");

    await setUp.ACSPUserLogin(randomUser, unhashedPassword);

    await typeOfbusinessContext.selectTypeOfBusiness(testConfig.soleTrader);
    await userActionsContext.clickContinue();
  },
);

test("Accessibility check for Sole-Trader-Name screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,

    process.env.URL + pageURL.soleTrader.name,

    testInfo,
  );
});

test("Accessibility check for Sole Trader Date of Birth screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.dateOfBirth,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Nationality screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.nationality,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Where do you Live screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.whereDoYouLive,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Correspondence Address Auto-lookup screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.addressAutoLookUp,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Correspondence Address Select Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.addressSelect,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Correspondence Address Manual Entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.addressManualEntry,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Confirm Correspondence Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.confirmAddress,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Which sector screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.whichSector,
    testInfo,
  );
});

test("Accessibility check for Sole Trader Which sector-Other screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.soleTrader.whichSectorOther,
    testInfo,
  );
});

test.afterEach("Delete the ACSP User from DB", async ({ page }) => {
  const tearDown = new globalTearDown(page);
  tearDown.deleteACSPUser(randomUser);
});
