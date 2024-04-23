import { Locator, Page } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { typeOfBusinessPage } from "./typeOfBusinessPage";
import { userActions } from "../../utils/userActions";
import { Assertions } from "../../utils/assertions";
import { pageTitle } from "../../config/pageTitle";
import { userInput } from "../../testdata/userInput";

export class limitedJourney {
  readonly page: Page;
  readonly companyAuthNumber: Locator;
  readonly companyNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyAuthNumber = page.locator("#auth_code");
    this.companyNumber = page.locator("#companyNumber");
  }

  async limitedJourneyCommonScreens(type: string, companyNumber: string) {
    const typeOfbusinessContext = new typeOfBusinessPage(this.page);
    const userActionsContext = new userActions(this.page);
    const assertionsContext = new Assertions(this.page);
    await typeOfbusinessContext.selectTypeOfBusiness(type);
    await userActionsContext.clickContinue();
    await assertionsContext.checkPageTitle(pageTitle.limitedCompanyNumber);
    await this.enterCompanyNumber(companyNumber);
    await userActionsContext.clickContinue();
    await assertionsContext.checkPageTitle(pageTitle.limitedIsThisYourCompany);
    await userActionsContext.clickConfirmAndContinue();
  }

  async enterCompanyAuthNumber(companyAuthNumber: string) {
    const userActionsContext = new userActions(this.page);
    userActionsContext.enterUserInput(
      this.companyAuthNumber,
      companyAuthNumber
    );
  }

  async enterCompanyNumber(companyNumber: string) {
    const userActionsContext = new userActions(this.page);
    userActionsContext.enterUserInput(this.companyNumber, companyNumber);
  }
}
