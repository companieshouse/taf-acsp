import test from "@playwright/test";
import { globalSetUp } from "../../../../setUp/globalSetup";
import { userActions } from "../../../../utils/userActions";
import { Assertions } from "../../../../utils/assertions";
import { pageTitle } from "../../../../config/pageTitle";
import { whatIsYourRolePage } from "../../../../pages/common/whatIsYourRolePage";
import { testConfig } from "../../../../config/testConfig";
import { typeOfBusinessPage } from "../../../../pages/common/typeOfBusinessPage";
import { companyNumberPage } from "../../../../pages/limited/companyNumberPage";
import { userInput } from "../../../../testdata/userInput";
import { CompanyAuthPage } from "../../../../pages/limited/companyAuthCodePage";
import { NameRegisteredWithAMLPage } from "../../../../pages/common/nameRegisteredWithAML";
import { BusinessMustBeAMLRegistered } from "../../../../pages/limited/businessMustBeAMLRegisteredPage";

let whatIsYourRoleContext;
let userActionsContext;
let assertionsContext;
let typeOfbusinessContext;
let companyNumberPageContext;
let companyAuthNumberPageContext;
let amlNameRegisteredPageContext;
let businessMustBeAMLRegisteredPageContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
    const setUp = new globalSetUp(page);
    typeOfbusinessContext = new typeOfBusinessPage(page);
    companyNumberPageContext = new companyNumberPage(page);
    userActionsContext = new userActions(page);
    whatIsYourRoleContext = new whatIsYourRolePage(page);
    assertionsContext = new Assertions(page);
    companyAuthNumberPageContext = new CompanyAuthPage(page);
    amlNameRegisteredPageContext = new NameRegisteredWithAMLPage(page);
    businessMustBeAMLRegisteredPageContext = new BusinessMustBeAMLRegistered(page);
    await setUp.ACSPUserLogin();
});

test("Verify only business' AML registered with the business name can register as ACSPs, @Smoke @StopScreen", async () => {
    await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
    await userActionsContext.clickContinue();
    await assertionsContext.checkPageTitle(pageTitle.limitedCompanyNumber);
    await companyNumberPageContext.enterCompanyNumber(userInput.companyNumber);
    await userActionsContext.clickContinue();
    await assertionsContext.checkPageTitle(pageTitle.limitedIsThisYourCompany);
    await userActionsContext.clickConfirmAndContinue();
    await companyAuthNumberPageContext.enterCompanyAuthNumber(userInput.companyAuthCode);
    await userActionsContext.clickAuthenticate();
    await whatIsYourRoleContext.selectRole(testConfig.director);
    await userActionsContext.clickContinue();
    await amlNameRegisteredPageContext.selectAMLName(testConfig.yourNameRadio)
    await userActionsContext.clickContinue();
    await assertionsContext.checkPageTitle(pageTitle.businessMustBeAMLRegistered);
    // await assertionsContext.checkElementNotVisible(businessMustBeAMLRegisteredPageContext.page.getByRole("link", {name: "Back", exact: true}));
    await assertionsContext.checkElementNotVisible(businessMustBeAMLRegisteredPageContext.page.getByRole("button", {name: "continue"}));
})
