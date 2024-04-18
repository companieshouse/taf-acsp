/*import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";

export class CompanyAuthPage {
  readonly page: Page;
  readonly companyAuthNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyAuthNumber = page.locator("#auth_code");
  }

  async enterCompanyAuthNumber(companyAuthNumber: string) {
    const userActionsContext = new userActions(this.page);
    userActionsContext.enterUserInput(this.companyAuthNumber, companyAuthNumber);
  }
}*/