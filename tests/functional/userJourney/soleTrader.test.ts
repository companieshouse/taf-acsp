import { expect, test } from "@playwright/test";
import { dobPage } from "../../../pages/soleTrader/dobPage";

import { namePage } from "../../../pages/soleTrader/namePage";
import { testConfig } from "../../../config/testConfig";
import { pageURL } from "../../../config/pageURL";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";
import { globalSetUp } from "../../../setUp/globalSetup";
import { pageTitle } from "../../../config/pageTitle";
import { typeOfBusinessPage } from "../../../pages/common/typeOfBusinessPage";
import { whatIsYourRolePage } from "../../../pages/common/whatIsYourRolePage";
import { Assertions } from "../../../utils/assertions";
import { nationalityPage } from "../../../pages/soleTrader/nationalityPage";
import { whereDoYouLivePage } from "../../../pages/soleTrader/whereDoYouLivePage";
import { BusinessNamePage } from "../../../pages/unincorportated/businessNamePage";
import { whichSector } from "../../../pages/common/whichSector";
import { address } from "../../../pages/common/address";
import { amlScreens } from "../../../pages/common/amlScreens";
import { checkAnswers } from "../../../pages/common/checkAnswers";
import { payment } from "../../../pages/common/payment";
import { globalTearDown } from "../../../setUp/globalTearDown";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import { correspondenceEmailAddress } from "../../../pages/common/correspondenceEmailAddress";

let namePageContext;
let userActionsContext;
let dobPageContext;
let typeOfbusinessContext;
let selectRoleContext;
let assertionsContext;
let nationalityPageContext;
let whereDoYouLivePageContext;
let businessNamePageContext;
let whichSectorcontext;
let addressContext;
let correspondenceEmailAddressContext;
let amlScreensContext;
let checkAnswersContext;
let paymentContext;
let randomUser;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  namePageContext = new namePage(page);
  userActionsContext = new userActions(page);
  dobPageContext = new dobPage(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  selectRoleContext = new whatIsYourRolePage(page);
  assertionsContext = new Assertions(page);
  nationalityPageContext = new nationalityPage(page);
  whereDoYouLivePageContext = new whereDoYouLivePage(page);
  businessNamePageContext = new BusinessNamePage(page);
  whichSectorcontext = new whichSector(page);
  addressContext = new address(page);
  correspondenceEmailAddressContext = new correspondenceEmailAddress(page);
  amlScreensContext = new amlScreens(page);
  checkAnswersContext = new checkAnswers(page);
  paymentContext = new payment(page);
  const setUp = new globalSetUp(page);

  // randomUser = await setUp.createACSPUser();
  const unhashedPassword = getEnvVar("CHS_PASSWORD");

  await setUp.ACSPUserLogin(randomUser, unhashedPassword);
});

test("Verify Sole Trader can register as an ACSP, @smoke @soleTrader", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderRole);
  await selectRoleContext.selectRole(testConfig.soleTrader);
  await userActionsContext.clickContinue();

  await assertionsContext.checkPageTitle(pageTitle.nameTitle);
  await assertionsContext.checkElementvisible(namePageContext.firstName);

  await namePageContext.enterName(
    userInput.firstName,
    userInput.middleName,
    userInput.lastName
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.dobTitle);
  
  await assertionsContext.checkElementvisible(dobPageContext.dobDay);
  await dobPageContext.enterDOB(userInput.day, userInput.month, userInput.year);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderNationality);
  await nationalityPageContext.enterFirstNationality(
    userInput.firstNationality
  );

  await nationalityPageContext.enterSecondNationality(
    userInput.secondNationality
  );

  await nationalityPageContext.enterThirdNationality(
    userInput.thirdNationality
  );

  await userActionsContext.clickContinue();

  await assertionsContext.checkPageTitle(pageTitle.soleTraderWhereDoYouLive);
  await whereDoYouLivePageContext.selectWhereDoyouLive(testConfig.england);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderbusinessName);

  await businessNamePageContext.enterDifferentBusinessNameforSoleTrader(
    userInput.soleTraderBusinessName
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);
  await whichSectorcontext.selectSector(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSectorOther);
  await whichSectorcontext.selectOtherSector(testConfig.casinos);
  await expect(
    page.locator("//*[@id='main-page-content']/form/div[2]/a")
  ).toBeVisible();

  await userActionsContext.clickSaveAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);

  await addressContext.addressLookUp(userInput.postcode);
  await addressContext.selectAddressFromList();
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);

  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmAddress);
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);
  
  await addressContext.confirmAddressEntered();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceEmailAddress);
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);
  await correspondenceEmailAddressContext.enterDiffCorrespondenceEmailAddress(userInput.diffCorrespondenceEmailAddress);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlBodies);
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);

  await amlScreensContext.selectAMLBodiesRegistered(
    userInput.amlBody1,
    userInput.amlBody2
  );
  await userActionsContext.clickSaveAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlNumber);
  await amlScreensContext.enterAMLMembNumber(
    userInput.amlMembId1,
    userInput.amlMembId2
  );
  await userActionsContext.clickSaveAndContinue(); 
  await assertionsContext.checkPageTitle(pageTitle.checkAMLDetails);
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);
  await amlScreensContext.checkAMLDetails();
  await userActionsContext.clickConfirmAndContinue(); 
  await assertionsContext.checkPageTitle(pageTitle.yourResponsibilities);
  await assertionsContext.checkIfNameDisplayedAboveh1(userInput.firstName);
  await userActionsContext.clickAcceptandContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkYourAnswers);

  await checkAnswersContext.verifySoleTraderCheckAnswersScreen();
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
