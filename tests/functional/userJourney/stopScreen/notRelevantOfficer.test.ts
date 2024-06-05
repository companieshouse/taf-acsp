import test from "@playwright/test";
import { globalSetUp } from "../../../../setUp/globalSetup";
import { userActions } from "../../../../utils/userActions";
import { Assertions } from "../../../../utils/assertions";
import { pageTitle } from "../../../../config/pageTitle";
import { whatIsYourRolePage } from "../../../../pages/common/whatIsYourRolePage";
import { testConfig } from "../../../../config/testConfig";
import { typeOfBusinessPage } from "../../../../pages/common/typeOfBusinessPage";
import { userInput } from "../../../../testdata/userInput";
import { NameRegisteredWithAMLPage } from "../../../../pages/common/nameRegisteredWithAML";
import { BusinessNamePage } from "../../../../pages/unincorportated/businessNamePage";
import { NotRelevantOfficerPage } from "../../../../pages/common/notRelevantOfficerPage";
import { limitedJourney } from "../../../../pages/common/limitedJourney";

let whatIsYourRoleContext;
let userActionsContext;
let assertionsContext;
let typeOfbusinessContext;
let amlNameRegisteredPageContext;
let businessNamePageContext;
let notRelevantOfficerContext;
let limitedJourneyContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  const setUp = new globalSetUp(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  whatIsYourRoleContext = new whatIsYourRolePage(page);
  assertionsContext = new Assertions(page);
  amlNameRegisteredPageContext = new NameRegisteredWithAMLPage(page);
  businessNamePageContext = new BusinessNamePage(page);
  notRelevantOfficerContext = new NotRelevantOfficerPage(page);
  limitedJourneyContext = new limitedJourney(page);

  await setUp.ACSPUserLogin();
  await setUp.createNewApplication();
});

test("Verify only directors of limted companies can register as ACSPs, @smoke @limited @StopScreen", async () => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedCompany,
    userInput.companyNumber
  );
  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.notRelevantRole);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.notRelevantOfficer);
  await assertionsContext.checkElementNotVisible(
    notRelevantOfficerContext.page.getByRole("link", {
      name: "Back",
      exact: true,
    })
  );
  await assertionsContext.checkElementNotVisible(
    notRelevantOfficerContext.page.getByRole("button", { name: "continue" })
  );
});
test("Verify only the sole trader can register as ACSP, @smoke @soleTrader @StopScreen", async () => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await whatIsYourRoleContext.selectRole(testConfig.notRelevantRole);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.notRelevantOfficer);
  await assertionsContext.checkElementNotVisible(
    notRelevantOfficerContext.page.getByRole("link", {
      name: "Back",
      exact: true,
    })
  );
  await assertionsContext.checkElementNotVisible(
    notRelevantOfficerContext.page.getByRole("button", { name: "continue" })
  );
});
test("Verify only a member of the partnership can register as ACSP for Unincorporated journey, @smoke @unincorporated @StopScreen", async () => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.partnership);
  await userActionsContext.clickContinue();
  await amlNameRegisteredPageContext.selectAMLName(
    testConfig.nameOfBusinessRadio
  );
  await userActionsContext.clickContinue();
  await businessNamePageContext.enterBusinessName(userInput.businessName);
  await userActionsContext.clickContinue();
  await whatIsYourRoleContext.selectRole(testConfig.notRelevantRole);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.notRelevantOfficer);
  await assertionsContext.checkElementNotVisible(
    notRelevantOfficerContext.page.getByRole("link", {
      name: "Back",
      exact: true,
    })
  );
  await assertionsContext.checkElementNotVisible(
    notRelevantOfficerContext.page.getByRole("button", { name: "continue" })
  );
});
