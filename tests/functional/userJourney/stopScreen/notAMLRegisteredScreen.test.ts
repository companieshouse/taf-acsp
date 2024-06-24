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
import { limitedJourney } from "../../../../pages/common/limitedJourney";

let whatIsYourRoleContext;
let userActionsContext;
let assertionsContext;
let typeOfbusinessContext;
let amlNameRegisteredPageContext;
let limitedJourneyContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  const setUp = new globalSetUp(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  whatIsYourRoleContext = new whatIsYourRolePage(page);
  assertionsContext = new Assertions(page);
  amlNameRegisteredPageContext = new NameRegisteredWithAMLPage(page);
  limitedJourneyContext = new limitedJourney(page);

  await setUp.ACSPUserLogin();
  await setUp.createNewApplication();
});

test("Verify only business' AML registered with the business name can register as ACSPs for Limited Company, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedCompany,
    userInput.companyNumber
  );

  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.director);
  await userActionsContext.clickContinue();
  await amlNameRegisteredPageContext.selectAMLName(testConfig.yourNameRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.businessMustBeAMLRegistered);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true })
  );
  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", {
      name: "continue",
    })
  );
});

test("Verify only business' AML registered with the business name can register as ACSPs for Limited Partnership, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedPartnership,
    userInput.companyNumber
  );

  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.generalPartner);
  await userActionsContext.clickContinue();
  await amlNameRegisteredPageContext.selectAMLName(testConfig.yourNameRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.businessMustBeAMLRegistered);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true })
  );
  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", {
      name: "continue",
    })
  );
});

test("Verify only business' AML registered with the business name can register as ACSPs for Limited Liability Partnership, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedLiabilityPartnership,
    userInput.companyNumber
  );

  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.member);
  await userActionsContext.clickContinue();
  await amlNameRegisteredPageContext.selectAMLName(testConfig.yourNameRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.businessMustBeAMLRegistered);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true })
  );
  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", {
      name: "continue",
    })
  );
});
