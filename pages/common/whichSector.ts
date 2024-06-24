import { Locator, Page } from "@playwright/test";
import { testConfig } from "../../config/testConfig";

export class whichSector {
  readonly page: Page;
  readonly otherSector: Locator;
  readonly auditors: Locator;
  readonly legalProfessionals: Locator;
  readonly companyServiceProviders: Locator;
  readonly creditInstitutions: Locator;
  readonly estateAgents: Locator;
  readonly highValueDealers: Locator;
  readonly casinos: Locator;

  constructor(page: Page) {
    this.page = page;
    this.otherSector = page.getByLabel("Other");
    this.auditors = page.getByLabel(
      "Auditors, insolvency practitioners, external accountants and tax advisers"
    );
    this.legalProfessionals = page.getByLabel(
      "Independent legal professionals"
    );
    this.companyServiceProviders = page.getByLabel(
      "Trust or company service providers"
    );
    this.creditInstitutions = page.getByLabel("Credit institutions");
    this.estateAgents = page.getByLabel("Estate agents");
    this.highValueDealers = page.getByLabel("High value dealers");
    this.casinos = page.getByLabel("Casinos");
  }

  async selectSector(sector: string) {
    switch (sector) {
      case testConfig.auditors:
        await this.auditors.check();
        break;

      case testConfig.legalProfessionals:
        await this.legalProfessionals.check();
        break;
      case testConfig.companyServiceProviders:
        await this.companyServiceProviders.check();
        break;
      case testConfig.creditInstitutions:
        await this.creditInstitutions.check();
        break;
      case testConfig.other:
        await this.otherSector.check();
        break;
    }
  }

  async selectOtherSector(otherSector: string) {
    switch (otherSector) {
      case testConfig.estateAgents:
        await this.estateAgents.check();
        break;

      case testConfig.highValueDealers:
        await this.highValueDealers.check();
        break;
      case testConfig.casinos:
        await this.casinos.check();
        break;
    }
  }
}
