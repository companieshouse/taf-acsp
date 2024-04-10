import test from "@playwright/test";
import { globalSetUp } from "../../../../setUp/globalSetup";
import { userActions } from "../../../../utils/userActions";
import { Assertions } from "../../../../utils/assertions";
import { pageTitle } from "../../../../config/pageTitle";
import { testConfig } from "../../../../config/testConfig";
import { typeOfBusinessPage } from "../../../../pages/common/typeOfBusinessPage";
import { companyNumberPage } from "../../../../pages/limited/companyNumberPage";
import { userInput } from "../../../../testdata/userInput";

let userActionsContext;
let assertionsContext;
let typeOfbusinessContext;
let companyNumberPageContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
    const setUp = new globalSetUp(page);
    typeOfbusinessContext = new typeOfBusinessPage(page);
    companyNumberPageContext = new companyNumberPage(page);
    userActionsContext = new userActions(page);
    assertionsContext = new Assertions(page);
    await setUp.ACSPUserLogin();
});

test("Verify only active companies can register as ACSPs, @Smoke @StopScreen", async () => {
    await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
    await userActionsContext.clickContinue();
    await assertionsContext.checkPageTitle(pageTitle.limitedCompanyNumber);
    await companyNumberPageContext.enterCompanyNumber(userInput.inactiveCompanyNumber);
    await userActionsContext.clickContinue();
    await assertionsContext.checkPageTitle(pageTitle.limitedIsThisYourCompany);
    await userActionsContext.clickConfirmAndContinue();
    await assertionsContext.checkPageTitle(pageTitle.limitedCompanyInactive);
})
