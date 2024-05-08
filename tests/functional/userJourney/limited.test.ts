import { test } from "@playwright/test";
import { globalSetUp } from "../../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../../pages/common/typeOfBusinessPage";
import { testConfig } from "../../../config/testConfig";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";
import { Assertions } from "../../../utils/assertions";
import { limitedJourney } from "../../../pages/common/limitedJourney";
import { whatIsYourRolePage } from "../../../pages/common/whatIsYourRolePage";
import { NameRegisteredWithAMLPage } from "../../../pages/common/nameRegisteredWithAML";
import { pageTitle } from "../../../config/pageTitle";

let typeOfbusinessContext;
let userActionsContext;
let assertionsContext;
let limitedJourneyContext;
let whatIsYourRoleContext;
let amlNameRegisteredPageContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  assertionsContext = new Assertions(page);
  limitedJourneyContext = new limitedJourney(page);
  whatIsYourRoleContext = new whatIsYourRolePage(page);
  amlNameRegisteredPageContext = new NameRegisteredWithAMLPage(page);

  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Verify error shown when company id not found for Limited journey @smoke @limited", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
  await userActionsContext.clickContinue();

  await limitedJourneyContext.enterCompanyNumber(
    userInput.invalidCompanyNumber
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkErrorHeadingPresent();

  await assertionsContext.checkElementvisible(
    page.getByRole("link", { name: "Enter a valid company number" })
  );
  await assertionsContext.checkElementvisible(
    page.getByText("Error: Enter a valid company")
  );
});

test("Verify Limited company can register as an ACSP @smoke @limited", async ({
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

  await amlNameRegisteredPageContext.selectAMLName(testConfig.bothRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
});

test("Verify Limited Partnership can register as an ACSP @smoke @limited", async ({
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

  await amlNameRegisteredPageContext.selectAMLName(testConfig.nameOfBusinessRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
});

test("Verify Limited Liability Partnership can register as an ACSP @smoke @limited", async ({
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

  await amlNameRegisteredPageContext.selectAMLName(testConfig.nameOfBusinessRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
});