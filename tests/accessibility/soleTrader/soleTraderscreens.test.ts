import { Page, expect, test } from "@playwright/test";
import { testConfig } from "../../../testConfig";
import { accessibilityScan } from "../../../utils/accessibilityScan";
import { globalSetUp } from "../../../setUp/globalSetup";

test.beforeEach(async ({ page }) => {
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Accessibility check for Sole-Trader-Name screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,

    testConfig.baseUrl + testConfig.soleTrader.name,

    testInfo
  );
});

test("Accessibility check for Sole Trader Date of Birth screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soleTrader.dateOfBirth,
    testInfo
  );
});

test("Accessibility check for Sole Trader Nationality screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soleTrader.nationality,
    testInfo
  );
});

test("Accessibility check for Sole Trader Where do you Live screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soleTrader.whereDoYouLive,
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Auto-lookup screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soleTrader.addressAutoLookUp,
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Select Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soleTrader.addressSelect,
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Manual Entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soleTrader.addressManualEntry,
    testInfo
  );
});

/*test("Accessibility check for Sole Trader Confirm Correspondence Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.cidev.soleTrader.addressConfirm,
    testInfo
  );
});*/

test("Accessibility check for Sole Trader Which sector screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    testConfig.baseUrl + testConfig.soleTrader.whichSector,
    testInfo
  );

  });

  test("Accessibility check for Sole Trader Which sector-Other screen @accessibility", async ({
    page,
  }, testInfo) => {
    const accessibilityContext = new accessibilityScan();
  
    await accessibilityContext.checkWcagCompliance(
      page,
      testConfig.baseUrl + testConfig.soleTrader.whichSectorOther,
      testInfo
    );
});

