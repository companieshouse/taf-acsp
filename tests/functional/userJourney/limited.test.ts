import { expect, test } from "@playwright/test";
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
import { address } from "../../../pages/common/address";
import { whichSector } from "../../../pages/common/whichSector";
import { amlScreens } from "../../../pages/common/amlScreens";
import { checkAnswers } from "../../../pages/common/checkAnswers";
import { payment } from "../../../pages/common/payment";
import { globalTearDown } from "../../../setUp/globalTearDown";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { OtherTypeOfBusinessPage } from "../../../pages/common/otherTypeOfBusinessPage";

let typeOfbusinessContext;
let userActionsContext;
let assertionsContext;
let limitedJourneyContext;
let whatIsYourRoleContext;
let amlNameRegisteredPageContext;
let addressContext;
let whichSectorcontext;
let amlScreensContext;
let checkAnswersContext;
let paymentContext;
let randomUser;
let otherTypeOfbusinessContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  assertionsContext = new Assertions(page);
  limitedJourneyContext = new limitedJourney(page);
  whatIsYourRoleContext = new whatIsYourRolePage(page);
  amlNameRegisteredPageContext = new NameRegisteredWithAMLPage(page);
  addressContext = new address(page);
  whichSectorcontext = new whichSector(page);
  amlScreensContext = new amlScreens(page);
  checkAnswersContext = new checkAnswers(page);
  paymentContext = new payment(page);
  otherTypeOfbusinessContext = new OtherTypeOfBusinessPage(page);

  const setUp = new globalSetUp(page);

  // randomUser = await setUp.createACSPUser();
  const unhashedPassword = getEnvVar("CHS_PASSWORD");

  await setUp.ACSPUserLogin(randomUser, unhashedPassword);
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
  // test.slow();

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
  await addressContext.whatIsTheaddress("different");
  await userActionsContext.clickContinue();

  await addressContext.addressLookUp(userInput.postcode);
  await addressContext.selectAddressFromList();
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);

  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmAddress);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);

  await addressContext.confirmAddressEntered();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await whichSectorcontext.selectSector(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSectorOther);
  await whichSectorcontext.selectOtherSector(testConfig.casinos);
  await expect(
    page.locator("//*[@id='main-page-content']/form/div[2]/a")
  ).toBeVisible();

  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.amlBodies);

  await amlScreensContext.selectAMLBodiesRegistered(
    userInput.amlBody1,
    userInput.amlBody2
  );
  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.amlNumber);
  await amlScreensContext.enterAMLMembNumber(
    userInput.amlMembId1,
    userInput.amlMembId2
  );
  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.checkAMLDetails);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);
  await amlScreensContext.checkAMLDetails();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.yourResponsibilities);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);
  await userActionsContext.clickAcceptandContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkYourAnswers);
  await checkAnswersContext.verifyLimitedCheckAnswersScreen();
  await userActionsContext.clickContinueToPayment();
  await assertionsContext.checkPageTitle(pageTitle.reviewPayment);
  await paymentContext.reviewPayment();
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.cardDetails);
  await paymentContext.enterCardDetails();
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmPayment);
  await userActionsContext.clickConfirmPayment();
  await assertionsContext.checkPageTitle(pageTitle.applicationSubmit);
});

test("Verify Corporate Body can register as an ACSP @smoke @limited", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.otherTypeOfBusiness);
  await otherTypeOfbusinessContext.selectTypeOfBusiness(
    testConfig.corporateBody
  );
  await limitedJourneyContext.enterCompanyNumber(userInput.companyNumber);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.limitedIsThisYourCompany);
  await userActionsContext.clickConfirmAndContinue();
  await limitedJourneyContext.enterCompanyAuthNumber(userInput.companyAuthCode);
  await userActionsContext.clickAuthenticate();
  await whatIsYourRoleContext.selectRole(testConfig.generalPartner);
  await userActionsContext.clickContinue();

  await amlNameRegisteredPageContext.selectAMLName(
    testConfig.nameOfBusinessRadio
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
  await addressContext.whatIsTheaddress("different");
  await userActionsContext.clickContinue();

  await addressContext.addressLookUp(userInput.postcode);
  await addressContext.selectAddressFromList();
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);

  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmAddress);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);

  await addressContext.confirmAddressEntered();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await whichSectorcontext.selectSector(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSectorOther);
  await whichSectorcontext.selectOtherSector(testConfig.casinos);
  await expect(
    page.locator("//*[@id='main-page-content']/form/div[2]/a")
  ).toBeVisible();

  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.amlBodies);

  await amlScreensContext.selectAMLBodiesRegistered(
    userInput.amlBody1,
    userInput.amlBody2
  );
  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.amlNumber);
  await amlScreensContext.enterAMLMembNumber(
    userInput.amlMembId1,
    userInput.amlMembId2
  );
  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.checkAMLDetails);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);
  await amlScreensContext.checkAMLDetails();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.yourResponsibilities);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);
  await userActionsContext.clickAcceptandContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkYourAnswers);
  await checkAnswersContext.verifyLimitedCheckAnswersScreen();
  await userActionsContext.clickContinueToPayment();
  await assertionsContext.checkPageTitle(pageTitle.reviewPayment);
  await paymentContext.reviewPayment();
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.cardDetails);
  await paymentContext.enterCardDetails();
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmPayment);
  await userActionsContext.clickConfirmPayment();
  await assertionsContext.checkPageTitle(pageTitle.applicationSubmit);
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

  await amlNameRegisteredPageContext.selectAMLName(
    testConfig.nameOfBusinessRadio
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
  await addressContext.whatIsTheaddress("different");
  await userActionsContext.clickContinue();

  await addressContext.addressLookUp(userInput.postcode);
  await addressContext.selectAddressFromList();
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);

  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmAddress);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);

  await addressContext.confirmAddressEntered();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await whichSectorcontext.selectSector(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSectorOther);
  await whichSectorcontext.selectOtherSector(testConfig.casinos);
  await expect(
    page.locator("//*[@id='main-page-content']/form/div[2]/a")
  ).toBeVisible();

  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.amlBodies);

  await amlScreensContext.selectAMLBodiesRegistered(
    userInput.amlBody1,
    userInput.amlBody2
  );
  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.amlNumber);
  await amlScreensContext.enterAMLMembNumber(
    userInput.amlMembId1,
    userInput.amlMembId2
  );
  await page.getByRole("button", { name: "  Save and continue " }).click();
  await assertionsContext.checkPageTitle(pageTitle.checkAMLDetails);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);
  await amlScreensContext.checkAMLDetails();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.yourResponsibilities);
  await assertionsContext.checkIfNameDisplayedAboveh1(testConfig.companyName);
  await userActionsContext.clickAcceptandContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkYourAnswers);
  await checkAnswersContext.verifyLimitedCheckAnswersScreen();
  await userActionsContext.clickContinueToPayment();
  await assertionsContext.checkPageTitle(pageTitle.reviewPayment);
  await paymentContext.reviewPayment();
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.cardDetails);
  await paymentContext.enterCardDetails();
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmPayment);
  await userActionsContext.clickConfirmPayment();
  await assertionsContext.checkPageTitle(pageTitle.applicationSubmit);
});

test.afterEach("Delete the ACSP User from DB", async ({ page }) => {
  const tearDown = new globalTearDown(page);
  tearDown.deleteACSPUser(randomUser);
});
