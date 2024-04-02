import { expect, test } from "@playwright/test";
import { dobPage } from "../../../pages/soleTrader/dobPage";
import { namePage } from "../../../pages/soleTrader/namePage";
import { testConfig } from "../../../config/testConfig";
import { pageURL } from "../../../config/pageURL";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";
import { globalSetUp } from "../../../setUp/globalSetup";
import { pageTitle } from "../../../config/pageTitle";
import { typeOfBusinessPage } from "../../../pages/soleTrader/typeOfBusinessPage";
import { whatIsYourRolePage } from "../../../pages/common/whatIsYourRolePage";

test.beforeEach(async ({ page }) => {
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Verify Sole Trader can register as an ACSP, @smoke", async ({ page }) => {
  const namePageContext = new namePage(page);
  const userActionsContext = new userActions(page);
  const dobPageContext = new dobPage(page);
  const typeOfbusinessContext = new typeOfBusinessPage(page);
  const selectRoleContext = new whatIsYourRolePage(page);
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await userActionsContext.checkPageTitle(pageTitle.soleTraderRole);
  await selectRoleContext.selectRole(testConfig.soleTrader);
  await userActionsContext.clickContinue();
  await userActionsContext.navigateToScreen(
    testConfig.baseUrl + pageURL.soleTrader.name
  );
  await userActionsContext.checkPageTitle(pageTitle.nameTitle);
  await userActionsContext.checkElementvisible(namePageContext.firstName);
  await userActionsContext.enterUserInput(
    namePageContext.firstName,
    userInput.firstName
  );
  await userActionsContext.enterUserInput(
    namePageContext.middleName,
    userInput.middleName
  );

  await userActionsContext.enterUserInput(
    namePageContext.lastName,
    userInput.lastName
  );

  await userActionsContext.clickContinue();
  await userActionsContext.checkPageTitle(pageTitle.dobTitle);

  await userActionsContext.checkElementvisible(dobPageContext.dobDay);
});
