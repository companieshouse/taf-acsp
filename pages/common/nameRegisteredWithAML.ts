import { Locator, Page } from "@playwright/test";
import { testConfig } from "../../config/testConfig";

export class NameRegisteredWithAMLPage {
    readonly page: Page;
    readonly nameOfBusinessRadio: Locator;
    readonly yourNameRadio: Locator;
    readonly bothRadio: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameOfBusinessRadio = page.getByLabel("Name of the business");
        this.yourNameRadio = page.getByLabel("Your name");
        this.bothRadio = page.getByLabel("Both");
    }

    async selectAMLName(aml: string) {
        switch (aml) {
          case testConfig.nameOfBusinessRadio:
            await this.nameOfBusinessRadio.check();
            break;
    
          case testConfig.yourNameRadio:
              await this.yourNameRadio.check();
              break;
    
          case testConfig.bothRadio:
            await this.bothRadio.check();
            break;
        }
      }
}