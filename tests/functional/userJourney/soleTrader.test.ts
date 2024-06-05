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
import { BusinessNamePage } from "../../../pages/unincorportated/businessNamePage";

let namePageContext;
let userActionsContext;
let dobPageContext;
let typeOfbusinessContext;
let selectRoleContext;
let assertionsContext;
let nationalityPageContext;
let businessNamePageContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  namePageContext = new namePage(page);
  userActionsContext = new userActions(page);
  dobPageContext = new dobPage(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  selectRoleContext = new whatIsYourRolePage(page);
  assertionsContext = new Assertions(page);
  nationalityPageContext = new nationalityPage(page);
  businessNamePageContext = new BusinessNamePage(page);
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
  await setUp.createNewApplication();
});

test("Verify Sole Trader can register as an ACSP, @smoke @soleTrader", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderRole);
  await selectRoleContext.selectRole(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await userActionsContext.navigateToScreen(
    testConfig.baseUrl + pageURL.soleTrader.name
  );
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
  await nationalityPageContext.whereDoYouLive(userInput.country);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.soleTraderbusinessName);

  await businessNamePageContext.enterDifferentBusinessNameforSoleTrader(userInput.soleTraderBusinessName);
  await userActionsContext.clickContinue();
  await assertionsContext.checkPageTitle(pageTitle.whichSector);
  await expect(page.locator("//*[@id='main-page-content']/form/span")).toContainText(userInput.firstName);

});
