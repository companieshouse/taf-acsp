import { test } from "@playwright/test";
import { globalSetUp } from "../../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../../pages/common/typeOfBusinessPage";
import { testConfig } from "../../../config/testConfig";
import { userActions } from "../../../utils/userActions";
import { Assertions } from "../../../utils/assertions";
import { pageTitle } from "../../../config/pageTitle";
import { NameRegisteredWithAMLPage } from "../../../pages/common/nameRegisteredWithAML";
import { userInput } from "../../../testdata/userInput";
import { namePage } from "../../../pages/soleTrader/namePage";
import { BusinessNamePage } from "../../../pages/unincorportated/businessNamePage";
import { whatIsYourRolePage } from "../../../pages/common/whatIsYourRolePage";
import { whichSector } from "../../../pages/common/whichSector";
import { address } from "../../../pages/common/address";
import { amlScreens } from "../../../pages/common/amlScreens";
import { checkAnswers } from "../../../pages/common/checkAnswers";
import { payment } from "../../../pages/common/payment";
import { OtherTypeOfBusinessPage } from "../../../pages/common/otherTypeOfBusinessPage";
import { globalTearDown } from "../../../setUp/globalTearDown";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
//import { Env } from "../../../setUp/env";

let typeOfbusinessContext;
let otherTypeOfbusinessContext;
let userActionsContext;
let assertionsContext;
let amlNameRegisteredPageContext;
let namePageContext;
let businessNamePageContext;
let selectRoleContext;
let whichSectorcontext;
let addressContext;
let amlScreensContext;
let checkAnswersContext;
let paymentContext;
let randomUser;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  typeOfbusinessContext = new typeOfBusinessPage(page);
  otherTypeOfbusinessContext = new OtherTypeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  assertionsContext = new Assertions(page);
  amlNameRegisteredPageContext = new NameRegisteredWithAMLPage(page);
  namePageContext = new namePage(page);
  businessNamePageContext = new BusinessNamePage(page);
  selectRoleContext = new whatIsYourRolePage(page);
  whichSectorcontext = new whichSector(page);
  addressContext = new address(page);
  amlScreensContext = new amlScreens(page);
  checkAnswersContext = new checkAnswers(page);
  paymentContext = new payment(page);

  const setUp = new globalSetUp(page);

  //randomUser = await setUp.createACSPUser();
  const unhashedPassword = getEnvVar("CHS_PASSWORD");

  await setUp.ACSPUserLogin(randomUser, unhashedPassword);
});

test("Verify partnership can register as an ACSP, @smoke @unincorporated", async () => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.partnership);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichNameRegisteredWithAML);
  await amlNameRegisteredPageContext.selectAMLName(testConfig.bothRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.nameTitle);
  await namePageContext.enterName(
    userInput.firstName,
    userInput.middleName,
    userInput.lastName
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.unincorporatedBusinessName);
  await businessNamePageContext.enterBusinessName(userInput.businessName);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.unincorporatedRole);
  await selectRoleContext.selectRole(testConfig.member);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await whichSectorcontext.selectSector(testConfig.legalProfessionals);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(
    pageTitle.unincorporatedBusinessAddressSearch
  );
  await addressContext.addressLookUp(userInput.postcode);
  await addressContext.selectAddressFromList();
  await assertionsContext.checkPageTitle(pageTitle.chooseAddress);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmBusinessAddress);
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
  await addressContext.whatIsTheaddress("same");
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlBodies);
  await amlScreensContext.selectAMLBodiesRegistered(
    userInput.amlBody1,
    userInput.amlBody2
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlNumber);
  await amlScreensContext.enterAMLMembNumber(
    userInput.amlMembId1,
    userInput.amlMembId2
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkAMLDetails);
  await amlScreensContext.checkAMLDetails();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.yourResponsibilities);
  await userActionsContext.clickAcceptandContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkYourAnswers);
  await checkAnswersContext.verifyUnincorporatedCheckAnswersScreen();
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

test("Verify unincorporated entity can register as an ACSP, @smoke @unincorporated", async () => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.other);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.otherTypeOfBusiness);
  await otherTypeOfbusinessContext.selectTypeOfBusiness(
    testConfig.unincorporatedEntity
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichNameRegisteredWithAML);
  await amlNameRegisteredPageContext.selectAMLName(testConfig.bothRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.nameTitle);
  await namePageContext.enterName(
    userInput.firstName,
    userInput.middleName,
    userInput.lastName
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.unincorporatedBusinessName);
  await businessNamePageContext.enterBusinessName(userInput.businessName);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.unincorporatedRole);
  await selectRoleContext.selectRole(testConfig.memberGoverningBody);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await whichSectorcontext.selectSector(testConfig.legalProfessionals);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(
    pageTitle.unincorporatedBusinessAddressSearch
  );
  await addressContext.addressLookUp(userInput.postcode);
  await addressContext.selectAddressFromList();
  await assertionsContext.checkPageTitle(pageTitle.chooseAddress);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmBusinessAddress);
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
  await addressContext.whatIsTheaddress("same");
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlBodies);
  await amlScreensContext.selectAMLBodiesRegistered(
    userInput.amlBody1,
    userInput.amlBody2
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlNumber);
  await amlScreensContext.enterAMLMembNumber(
    userInput.amlMembId1,
    userInput.amlMembId2
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkAMLDetails);
  await amlScreensContext.checkAMLDetails();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.yourResponsibilities);
  await userActionsContext.clickAcceptandContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkYourAnswers);
  await checkAnswersContext.verifyUnincorporatedCheckAnswersScreen();
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

test("Verify Limited Partnership can register as an ACSP, @smoke @unincorporated", async () => {
  await typeOfbusinessContext.selectTypeOfBusiness(
    testConfig.limitedPartnership
  );
  await userActionsContext.clickContinue();

  await assertionsContext.checkPageTitle(pageTitle.whichNameRegisteredWithAML);
  await amlNameRegisteredPageContext.selectAMLName(testConfig.bothRadio);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.nameTitle);
  await namePageContext.enterName(
    userInput.firstName,
    userInput.middleName,
    userInput.lastName
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.unincorporatedBusinessName);
  await businessNamePageContext.enterBusinessName(userInput.businessName);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.unincorporatedRole);
  await selectRoleContext.selectRole(testConfig.memberGoverningBody);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await whichSectorcontext.selectSector(testConfig.legalProfessionals);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(
    pageTitle.unincorporatedBusinessAddressSearch
  );
  await addressContext.addressLookUp(userInput.postcode);
  await addressContext.selectAddressFromList();
  await assertionsContext.checkPageTitle(pageTitle.chooseAddress);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.confirmBusinessAddress);
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.correspondenceAddress);
  await addressContext.whatIsTheaddress("same");
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlBodies);
  await amlScreensContext.selectAMLBodiesRegistered(
    userInput.amlBody1,
    userInput.amlBody2
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.amlNumber);
  await amlScreensContext.enterAMLMembNumber(
    userInput.amlMembId1,
    userInput.amlMembId2
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkAMLDetails);
  await amlScreensContext.checkAMLDetails();
  await userActionsContext.clickConfirmAndContinue();
  await assertionsContext.checkPageTitle(pageTitle.yourResponsibilities);
  await userActionsContext.clickAcceptandContinue();
  await assertionsContext.checkPageTitle(pageTitle.checkYourAnswers);
  await checkAnswersContext.verifyUnincorporatedCheckAnswersScreen();
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
  //tearDown.deleteACSPUser(randomUser);
});
