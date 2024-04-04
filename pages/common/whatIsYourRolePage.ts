import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";
import { testConfig } from "../../config/testConfig";

export class whatIsYourRolePage {
  readonly page: Page;
  readonly soleTraderRole: Locator;
  readonly notRelevantRole: Locator;

  constructor(page: Page) {
    this.page = page;
    this.soleTraderRole = page.getByLabel("Sole trader");
    this.notRelevantRole = page.getByLabel("I am someone else");
  }

  async selectRole(role: string) {
    switch (role) {
      case testConfig.soleTrader:
        await this.soleTraderRole.check();
        break;

      case testConfig.notRelevantRole:
        await this.notRelevantRole.check();
        break;
    }
  }
}
