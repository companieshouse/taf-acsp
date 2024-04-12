import { test } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { pageURL } from "../../config/pageURL";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { globalSetUp } from "../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../pages/common/typeOfBusinessPage";

test.beforeEach(
  "Log in to ACSP Service to register as Sole Trader",
  async ({ page }) => {
    const setUp = new globalSetUp(page);
    const typeOfbusinessContext = new typeOfBusinessPage(page);

    await setUp.ACSPUserLogin();
    await typeOfbusinessContext.selectTypeOfBusiness(testConfig.soleTrader);
  }
);

test("Accessibility check for Sole-Trader-Name screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,

    testConfig.baseUrl + pageURL.soleTrader.name,

    testInfo
  );
});

test("Accessibility check for Sole Trader Date of Birth screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.dateOfBirth,
    testInfo
  );
});

test("Accessibility check for Sole Trader Nationality screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.nationality,
    testInfo
  );
});

test("Accessibility check for Sole Trader Where do you Live screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.whereDoYouLive,
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Auto-lookup screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.addressAutoLookUp,
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Select Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.addressSelect,
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Manual Entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.addressManualEntry,
    testInfo
  );
});

test("Accessibility check for Sole Trader Confirm Correspondence Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.confirmAddress,
    testInfo
  );
});

test("Accessibility check for Sole Trader Which sector screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.whichSector,
    testInfo
  );
});

test("Accessibility check for Sole Trader Which sector-Other screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + pageURL.soleTrader.whichSectorOther,
    testInfo
  );
});
