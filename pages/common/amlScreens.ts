import { Locator, Page, expect } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { userInput } from "../../testdata/userInput";

export class amlScreens {
  readonly page: Page;
  readonly amlNumber1: Locator;
  readonly amlNumber2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amlNumber1 = page.locator("#membershipNumber_1");
    this.amlNumber2 = page.locator("#membershipNumber_2");
  }

  async selectAMLBodiesRegistered(amlBody1: string, amlBody2: string) {
    await expect(this.page.getByRole("checkbox")).toHaveCount(26);
    await this.page.getByLabel(amlBody1).check();
    await this.page.getByLabel(amlBody2).check();
  }

  async enterAMLMembNumber(id1: string, id2: string) {
    await this.amlNumber1.fill(id1);
    await this.amlNumber2.fill(id2);
  }

  async checkAMLDetails() {
    await expect(
      this.page.locator(
        '//*[@id="main-page-content"]/form/table/tbody/tr[1]/td[1]'
      )
    ).toContainText(userInput.amlMembId1);
    await expect(
      this.page.locator(
        '//*[@id="main-page-content"]/form/table/tbody/tr[2]/td[1]'
      )
    ).toContainText(userInput.amlMembId2);
    await expect(this.page.getByRole("link", { name: "Change" })).toHaveCount(
      2
    );
  }
}
