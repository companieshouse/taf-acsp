import test from "@playwright/test";
import { globalSetUp } from "../../../../setUp/globalSetup";
import { userActions } from "../../../../utils/userActions";
import { assertions } from "../../../../utils/assertions";
import { pageTitle } from "../../../../config/pageTitle";
import { whatIsYourRolePage } from "../../../../pages/common/whatIsYourRolePage";
import { testConfig } from "../../../../config/testConfig";
import { typeOfBusinessPage } from "../../../../pages/common/typeOfBusinessPage";
import { companyNumberPage } from "../../../../pages/limited/companyNumberPage";
import { userInput } from "../../../../testdata/userInput";
import { CompanyAuthPage } from "../../../../pages/limited/companyAuthCodePage";

let whatIsYourRoleContext;
let userActionsContext;
let assetionsContext;
let typeOfbusinessContext;
let companyNumberPageContext;
let companyAuthNumberPageContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
    const setUp = new globalSetUp(page);
    typeOfbusinessContext = new typeOfBusinessPage(page);
    companyNumberPageContext = new companyNumberPage(page);
    userActionsContext = new userActions(page);
    whatIsYourRoleContext = new whatIsYourRolePage(page);
    assetionsContext = new assertions(page);
    companyAuthNumberPageContext = new CompanyAuthPage(page);
    await setUp.ACSPUserLogin();
});

test("Verify only directors of limted companies can register as ACSPs, @Smoke @StopScreen", async () => {
    await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
    await userActionsContext.clickContinue();
    await assetionsContext.checkPageTitle(pageTitle.limitedCompanyNumber);
    await companyNumberPageContext.enterCompanyNumber(userInput.companyNumber);
    await userActionsContext.clickContinue();
    await assetionsContext.checkPageTitle(pageTitle.limitedIsThisYourCompany);
    await userActionsContext.clickConfirmAndContinue();
    await companyAuthNumberPageContext.enterCompanyAuthNumber(userInput.companyAuthCode);
    await userActionsContext.clickAuthenticate();
    await whatIsYourRoleContext.selectRole(testConfig.notRelevantRole);
    await userActionsContext.clickContinue();
    await assetionsContext.checkPageTitle(pageTitle.notRelevantOfficer);
})
