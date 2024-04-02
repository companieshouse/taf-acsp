import { Locator, Page, expect } from "@playwright/test";

export class userActions {
  readonly page: Page;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole("button", { name: " Continue " });
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async navigateToScreen(url: string) {
    await this.page.goto(url);
  }

  async enterUserInput(field: Locator, inputText: string) {
    await field.fill(inputText);
  }
}
