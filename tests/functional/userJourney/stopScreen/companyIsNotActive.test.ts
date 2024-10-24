import test from "@playwright/test";
import { globalSetUp } from "../../../../setUp/globalSetup";
import { userActions } from "../../../../utils/userActions";
import { Assertions } from "../../../../utils/assertions";
import { pageTitle } from "../../../../config/pageTitle";
import { testConfig } from "../../../../config/testConfig";
import { typeOfBusinessPage } from "../../../../pages/common/typeOfBusinessPage";
import { userInput } from "../../../../testdata/userInput";
import { limitedJourney } from "../../../../pages/common/limitedJourney";
import { globalTearDown } from "../../../../setUp/globalTearDown";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { OtherTypeOfBusinessPage } from "../../../../pages/common/otherTypeOfBusinessPage";

let userActionsContext;
let assertionsContext;
let typeOfbusinessContext;
let companyNumberPageContext;
let companyNotActivePageContext;
let limitedJourneyContext;
let randomUser;
let otherTypeOfbusinessContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  const setUp = new globalSetUp(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  assertionsContext = new Assertions(page);
  limitedJourneyContext = new limitedJourney(page);
  otherTypeOfbusinessContext = new OtherTypeOfBusinessPage(page);

  // randomUser = await setUp.createACSPUser();
  const unhashedPassword = getEnvVar("CHS_PASSWORD");

  await setUp.ACSPUserLogin(randomUser, unhashedPassword);
});

test("Verify only active companies can register as ACSPs for Limited Company, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedCompany,
    userInput.inactiveCompanyNumber,
  );

  await assertionsContext.checkPageTitle(pageTitle.limitedCompanyInactive);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true }),
  );

  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", { name: "continue" }),
  );
});

test("Verify only active companies can register as ACSPs for Corporate Body, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.otherTypeOfBusiness);
  await otherTypeOfbusinessContext.selectTypeOfBusiness(
    testConfig.corporateBody,
  );
  await userActionsContext.clickContinue();

  await limitedJourneyContext.enterCompanyNumber(
    userInput.inactiveCompanyNumber,
  );
  await userActionsContext.clickContinue();

  await assertionsContext.checkPageTitle(pageTitle.limitedCompanyInactive);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true }),
  );

  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", { name: "continue" }),
  );
});

test("Verify only active companies can register as ACSPs for Limited liability partnership, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedLiabilityPartnership,
    userInput.inactiveCompanyNumber,
  );

  await assertionsContext.checkPageTitle(pageTitle.limitedCompanyInactive);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true }),
  );

  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", { name: "continue" }),
  );
});

test.afterEach("Delete the ACSP User from DB", async ({ page }) => {
  const tearDown = new globalTearDown(page);
  tearDown.deleteACSPUser(randomUser);
});
