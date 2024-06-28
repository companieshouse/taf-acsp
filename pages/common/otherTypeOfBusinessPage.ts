import { Locator, Page } from "@playwright/test";
import { testConfig } from "../../config/testConfig";

export class OtherTypeOfBusinessPage {
  readonly page: Page;
  readonly unincorporatedEntity: Locator;
  readonly corporateBody: Locator;
  

  constructor(page: Page) {
    this.page = page;

    this.unincorporatedEntity = page.getByLabel("Unincorporated entity");
    this.corporateBody = page.getByLabel("Corporate body (registered with Companies House)");
  }

  async selectTypeOfBusiness(type: string) {
    switch (type) {
      case testConfig.unincorporatedEntity:
        await this.unincorporatedEntity.check();
        break;
      case testConfig.corporateBody:
        await this.corporateBody.check();
        break;
    }
  }
}
