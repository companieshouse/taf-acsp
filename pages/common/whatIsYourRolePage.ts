import { Locator, Page } from "@playwright/test";
import { testConfig } from "../../config/testConfig";

export class whatIsYourRolePage {
  readonly page: Page;
  readonly soleTraderRole: Locator;
  readonly directorRole: Locator;
  readonly notRelevantRole: Locator;
  readonly generalPartner: Locator;
  readonly member: Locator;

  constructor(page: Page) {
    this.page = page;
    this.soleTraderRole = page.getByLabel("Sole trader");
    this.directorRole = page.getByLabel("I am a director of", { exact: false });
    this.generalPartner = page.getByLabel("I am a general partner of", {
      exact: false,
    });
    this.member = page.getByLabel("I am a member of", { exact: false });
    this.notRelevantRole = page.getByLabel("I am someone else");
  }

  async selectRole(role: string) {
    switch (role) {
      case testConfig.soleTrader:
        await this.soleTraderRole.check();
        break;

      case testConfig.director:
        await this.directorRole.check();
        break;
      case testConfig.generalPartner:
        await this.generalPartner.check();
        break;
      case testConfig.member:
        await this.member.check();
        break;
      case testConfig.notRelevantRole:
        await this.notRelevantRole.check();
        break;
    }
  }
}
