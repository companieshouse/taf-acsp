import { Locator, Page, expect } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { userInput } from "../../testdata/userInput";

export class amlScreens {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectAMLBodiesRegistered(amlBody1: string, amlBody2: string) {
    await expect(
      this.page.locator("//*[@id='main-page-content']/form/span")
    ).toContainText(userInput.firstName);

    //*[@id="main-page-content"]/form/div[1]/fieldset/div[2]
    await expect(this.page.locator("data-module=govuk-checkboxes")).toHaveCount(
      26
    );
  }
}
