import test from "@playwright/test";
import { globalSetUp } from "../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../pages/common/typeOfBusinessPage";
import { testConfig } from "../../config/testConfig";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { pageURL } from "../../config/pageURL";
import { userActions } from "../../utils/userActions";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { globalTearDown } from "../../setUp/globalTearDown";

let randomUser;
test.beforeEach(
  "Log in to ACSP Service to register as Limited company",
  async ({ page }) => {
    const setUp = new globalSetUp(page);
    const typeOfbusinessContext = new typeOfBusinessPage(page);
    const userActionsContext = new userActions(page);

    // randomUser = await setUp.createACSPUser();
    const unhashedPassword = getEnvVar("CHS_PASSWORD");

    await setUp.ACSPUserLogin(randomUser, unhashedPassword);

    await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
    await userActionsContext.clickContinue();
  },
);

test("Accessibility check for limited what is the company number screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.companyNumber,
    testInfo,
  );
});
test("Accessibility check for limited is this your company screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.isThisYourCompany,
    testInfo,
  );
});
test("Accessibility check for limited company not active screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.companyInactive,
    testInfo,
  );
});
test("Accessibility check for limited what is your role screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.whatIsYourRole,
    testInfo,
  );
});
test("Accessibility check for limited name registered with AML screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.nameRegisteredWithAML,
    testInfo,
  );
});
test("Accessibility check for limited business must be AML registered screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.businessMustBeAMLRegistered,
    testInfo,
  );
});
test("Accessibility check for limited which sector screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.whichSector,
    testInfo,
  );
});
test("Accessibility check for limited which sector other screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.limited.whichSectorOther,
    testInfo,
  );
});

test.afterEach("Delete the ACSP User from DB", async ({ page }) => {
  const tearDown = new globalTearDown(page);
  tearDown.deleteACSPUser(randomUser);
});
