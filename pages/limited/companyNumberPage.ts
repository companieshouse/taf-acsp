import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";

export class companyNumberPage {
  readonly page: Page;
  readonly companyNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyNumber = page.locator("#companyNumber");
  }

  async enterCompanyNumber(companyNumber: string) {
    const userActionsContext = new userActions(this.page);
    userActionsContext.enterUserInput(this.companyNumber, companyNumber);
  }
}
