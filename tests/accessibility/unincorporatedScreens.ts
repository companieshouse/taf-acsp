import test from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { typeOfBusinessPage } from "../../pages/common/typeOfBusinessPage";
import { globalSetUp } from "../../setUp/globalSetup";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { pageURL } from "../../config/pageURL";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { globalTearDown } from "../../setUp/globalTearDown";

let randomUser;

test.beforeEach(
  "Log in to ACSP Service to register as Unincorporated company",
  async ({ page }) => {
    const setUp = new globalSetUp(page);
    const typeOfbusinessContext = new typeOfBusinessPage(page);

    randomUser = await setUp.createACSPUser();
    const unhashedPassword = getEnvVar("CHS_PASSWORD");


    await setUp.ACSPUserLogin(randomUser, unhashedPassword);

    await typeOfbusinessContext.selectTypeOfBusiness(testConfig.partnership);
  }
);
test("Accessibility check for unincorporated name registered with AML screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.nameRegisteredWithAML,
    testInfo
  );
});
test("Accessibility check for unincorporated what is your name screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.name,
    testInfo
  );
});
test("Accessibility check for unincorporated what the business name screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.businessName,
    testInfo
  );
});
test("Accessibility check for unincorporated what is your role screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.role,
    testInfo
  );
});
test("Accessibility check for unincorporated which sector screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.whichSector,
    testInfo
  );
});
test("Accessibility check for unincorporated which sector other screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.whichSectorOther,
    testInfo
  );
});
test("Accessibility check for unincorporated business address lookup screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.businessAddressLookup,
    testInfo
  );
});
test("Accessibility check for unincorporated business address list screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.businessAddressList,
    testInfo
  );
});
test("Accessibility check for unincorporated business address manual entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.businessAddressManual,
    testInfo
  );
});
test("Accessibility check for unincorporated business address confirm entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.businessAddressConfirm,
    testInfo
  );
});
test("Accessibility check for unincorporated what is the correspondence address screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.whatIsTheCorrespondenceAddress,
    testInfo
  );
});
test("Accessibility check for unincorporated correspondence address lookup screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.correspondenceAddressLookup,
    testInfo
  );
});
test("Accessibility check for unincorporated correspondence address list screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.correspondenceAddressList,
    testInfo
  );
});
test("Accessibility check for unincorporated correspondence address manual entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.correspondenceAddressManual,
    testInfo
  );
});
test("Accessibility check for unincorporated correspondence address confirm entry screen @accessibility", async ({
  page,
}, testInfo) => {
  const accessibilityContext = new accessibilityScan();
  await accessibilityContext.checkWcagCompliance(
    page,
    process.env.URL + pageURL.unincorporated.correspondenceAddressConfirm,
    testInfo
  );
});

test.afterEach("Delete the ACSP User from DB", async ({ page }) => {
  const tearDown = new globalTearDown(page);
  tearDown.deleteACSPUser(randomUser);
});
