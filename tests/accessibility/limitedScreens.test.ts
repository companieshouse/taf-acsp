import test from "@playwright/test";
import { globalSetUp } from "../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../pages/common/typeOfBusinessPage";
import { testConfig } from "../../config/testConfig";
import { accessibilityScan } from "../../utils/accessibilityScan";
import { pageURL } from "../../config/pageURL";

test.beforeEach(
    "Log in to ACSP Service to register as Sole Trader",
    async ({ page }) => {
      const setUp = new globalSetUp(page);
      const typeOfbusinessContext = new typeOfBusinessPage(page);
  
      await setUp.ACSPUserLogin();
      await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
    }
);

test("Accessibility check for limited what is the company number screen @accessibility", async ({page}, testInfo) => {
    const accessibilityContext = new accessibilityScan();
    await accessibilityContext.checkWcagCompliance(
      page,
      testConfig.baseUrl + pageURL.limited.companyNumber,
      testInfo
    );
});
test("Accessibility check for limited is this your company screen @accessibility", async ({page}, testInfo) => {
    const accessibilityContext = new accessibilityScan();
    await accessibilityContext.checkWcagCompliance(
      page,
      testConfig.baseUrl + pageURL.limited.isThisYourCompany,
      testInfo
    );
});
test("Accessibility check for limited company not active screen @accessibility", async ({page}, testInfo) => {
    const accessibilityContext = new accessibilityScan();
    await accessibilityContext.checkWcagCompliance(
      page,
      testConfig.baseUrl + pageURL.limited.companyInactive,
      testInfo
    );
});
test("Accessibility check for limited what is your role screen @accessibility", async ({page}, testInfo) => {
    const accessibilityContext = new accessibilityScan();
    await accessibilityContext.checkWcagCompliance(
      page,
      testConfig.baseUrl + pageURL.limited.whatIsYourRole,
      testInfo
    );
});
test("Accessibility check for limited business must be AML registered screen @accessibility", async ({page}, testInfo) => {
    const accessibilityContext = new accessibilityScan();
    await accessibilityContext.checkWcagCompliance(
      page,
      testConfig.baseUrl + pageURL.limited.businessMustBeAMLRegistered,
      testInfo
    );
});