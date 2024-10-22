import { expect, Locator, Page } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { userActions } from "../../utils/userActions";

export class whereDoYouLivePage {
  readonly page: Page;
  readonly england: Locator;
  readonly scotland: Locator;
  readonly wales: Locator;
  readonly northernIreland: Locator;
  readonly countryOrTerritoryOutsideOfTheUK: Locator;
  readonly countryOrTerritoryOutsideOfTheUKInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.england = page.getByLabel("England");
    this.scotland = page.getByLabel("Scotland");
    this.wales = page.getByLabel("Wales");
    this.northernIreland = page.getByLabel("Northern Ireland");
    this.countryOrTerritoryOutsideOfTheUK = page.getByLabel(
      "Country or territory outside of the UK",
    );
    this.countryOrTerritoryOutsideOfTheUKInput = page.locator("#countryInput");
  }

  async selectWhereDoyouLive(sector: string) {
    switch (sector) {
      case testConfig.england:
        await this.england.check();
        break;

      case testConfig.scotland:
        await this.scotland.check();
        break;
      case testConfig.wales:
        await this.wales.check();
        break;
      case testConfig.northernIreland:
        await this.northernIreland.check();
        break;
      case testConfig.countryOrTerritoryOutsideOfTheUK:
        await this.countryOrTerritoryOutsideOfTheUK.check();
        break;
    }
  }

  async selectCountryOrTerritoryOutsideOfTheUK(country: string) {
    const userActionsContext = new userActions(this.page);
    await expect(this.countryOrTerritoryOutsideOfTheUK).toBeVisible();
    await this.countryOrTerritoryOutsideOfTheUK.check();
    await userActionsContext.selectValue(
      this.countryOrTerritoryOutsideOfTheUKInput,
      country,
    );
  }
}
