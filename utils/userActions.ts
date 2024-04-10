import { Locator, Page, expect } from "@playwright/test";

export class userActions {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly confirmAndContinueButton: Locator;
  readonly authenticateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole("button", { name: " Continue " });
    this.confirmAndContinueButton = page.getByRole("button", {name: "Confirm and continue"});
    this.authenticateButton = page.getByRole("button", {name: "Authenticate"});
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickConfirmAndContinue() {
    await this.confirmAndContinueButton.click();
  }

  async navigateToScreen(url: string) {
    await this.page.goto(url);
  }

  async clickAuthenticate() {
    await this.authenticateButton.click();
  }

  async enterUserInput(field: Locator, inputText: string) {
    await field.fill(inputText);
  }
}
