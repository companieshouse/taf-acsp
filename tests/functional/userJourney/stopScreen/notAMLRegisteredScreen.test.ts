import test, { expect } from "@playwright/test";
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
import { globalTearDown } from "../../../../setUp/globalTearDown";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { OtherTypeOfBusinessPage } from "../../../../pages/common/otherTypeOfBusinessPage";

let whatIsYourRoleContext;
let userActionsContext;
let assertionsContext;
let typeOfbusinessContext;
let amlNameRegisteredPageContext;
let limitedJourneyContext;
let randomUser;
let otherTypeOfbusinessContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  const setUp = new globalSetUp(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  whatIsYourRoleContext = new whatIsYourRolePage(page);
  assertionsContext = new Assertions(page);
  amlNameRegisteredPageContext = new NameRegisteredWithAMLPage(page);
  limitedJourneyContext = new limitedJourney(page);
  otherTypeOfbusinessContext = new OtherTypeOfBusinessPage(page);

  //randomUser = await setUp.createACSPUser();
  const unhashedPassword = getEnvVar("CHS_PASSWORD");

  await setUp.ACSPUserLogin(randomUser, unhashedPassword);
});

test("Verify only business' AML registered with the business name can register as ACSPs for Limited Company, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedCompany,
    userInput.companyNumber,
  );

  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.director);
  await userActionsContext.clickContinue();
  await amlNameRegisteredPageContext.selectAMLName(testConfig.yourNameRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.businessMustBeAMLRegistered);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true }),
  );
  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", {
      name: "continue",
    }),
  );
  await page.getByRole("link", { name: "apply as a sole trader." }).click();
  await expect(page.getByLabel(testConfig.soleTrader)).toBeChecked();
  await userActionsContext.clickContinue();
  await expect(page.getByText("I am the sole trader")).toBeVisible();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderRole);
});

test("Verify only business' AML registered with the business name can register as ACSPs for Corporate Body, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.otherTypeOfBusiness);
  await otherTypeOfbusinessContext.selectTypeOfBusiness(
    testConfig.corporateBody,
  );
  await userActionsContext.clickContinue();

  await limitedJourneyContext.enterCompanyNumber(userInput.companyNumber);
  await userActionsContext.clickContinue();
  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.generalPartner);
  await userActionsContext.clickContinue();
  await amlNameRegisteredPageContext.selectAMLName(testConfig.yourNameRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.businessMustBeAMLRegistered);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true }),
  );
  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", {
      name: "continue",
    }),
  );
  await page.getByRole("link", { name: "apply as a sole trader." }).click();
  await expect(page.getByLabel(testConfig.soleTrader)).toBeChecked();
  await userActionsContext.clickContinue();
  await expect(page.getByText("I am the sole trader")).toBeVisible();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderRole);
});

test("Verify only business' AML registered with the business name can register as ACSPs for Limited Liability Partnership, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedLiabilityPartnership,
    userInput.companyNumber,
  );

  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.member);
  await userActionsContext.clickContinue();
  await amlNameRegisteredPageContext.selectAMLName(testConfig.yourNameRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.businessMustBeAMLRegistered);
  await assertionsContext.checkElementNotVisible(
    page.getByRole("link", { name: "Back", exact: true }),
  );
  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", {
      name: "continue",
    }),
  );
  await page.getByRole("link", { name: "apply as a sole trader." }).click();
  await expect(page.getByLabel(testConfig.soleTrader)).toBeChecked();
  await userActionsContext.clickContinue();
  await expect(page.getByText("I am the sole trader")).toBeVisible();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderRole);
});

test.afterEach("Delete the ACSP User from DB", async ({ page }) => {
  const tearDown = new globalTearDown(page);
  tearDown.deleteACSPUser(randomUser);
});
