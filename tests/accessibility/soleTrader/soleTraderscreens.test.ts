import { test } from "@playwright/test";
import { testConfig } from "../../../testConfig";
import { accessibilityScan } from "../../../utils/accessibilityScan";

const soleTraderURL = testConfig.local.url + "sole-trader/"

test("Accessibility check for Sole-Trader-Name screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "what-is-your-name",
    testInfo
  );
});

test("Accessibility check for Sole Trader Date of Birth screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "what-is-your-date-of-birth",
    testInfo
  );
});

test("Accessibility check for Sole Trader Nationality screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "what-is-your-nationality",
    testInfo
  );
});

test("Accessibility check for Sole Trader Where do you Live screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "where-do-you-live",
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Auto-lookup screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "correspondence-address-lookup",
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Select Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "select-your-correspondence-address",
    testInfo
  );
});

test("Accessibility check for Sole Trader Correspondence Address Manual Entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "correspondence-address-manual-entry",
    testInfo
  );
});

test("Accessibility check for Sole Trader Confirm Correspondence Address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();

  await accessibilityContext.checkWcagCompliance(
    page,
    soleTraderURL + "confirm-your-correspondence-address",
    testInfo
  );
});