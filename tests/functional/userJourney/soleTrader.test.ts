import { test } from "@playwright/test";
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
import { assertions } from "../../../utils/assertions";
import { nationalityPage } from "../../../pages/soleTrader/nationalityPage";

let namePageContext;
let userActionsContext;
let dobPageContext;
let typeOfbusinessContext;
let selectRoleContext;
let assetionsContext;
let nationalityPageContext;

test.beforeEach("Log in to use ACSP Service",async ({ page }) => {
  namePageContext = new namePage(page);
  userActionsContext = new userActions(page);
  dobPageContext = new dobPage(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  selectRoleContext = new whatIsYourRolePage(page);
  assetionsContext = new assertions(page);
  nationalityPageContext = new nationalityPage(page);
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Verify Sole Trader can register as an ACSP, @smoke @soleTrader", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await assetionsContext.checkPageTitle(pageTitle.soleTraderRole);
  await selectRoleContext.selectRole(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await userActionsContext.navigateToScreen(
    testConfig.baseUrl + pageURL.soleTrader.name
  );
  await assetionsContext.checkPageTitle(pageTitle.nameTitle);
  await assetionsContext.checkElementvisible(namePageContext.firstName);

  await namePageContext.enterName(
    userInput.firstName,
    userInput.middleName,
    userInput.lastName
  );
  await userActionsContext.clickContinue();
  await assetionsContext.checkPageTitle(pageTitle.dobTitle);

  await assetionsContext.checkElementvisible(dobPageContext.dobDay);
  await dobPageContext.enterDOB(userInput.day, userInput.month, userInput.year);
  await userActionsContext.clickContinue();
  await assetionsContext.checkPageTitle(pageTitle.soleTraderNationality);
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
  await assetionsContext.checkPageTitle(pageTitle.soleTraderWhereDoYouLive);
});
