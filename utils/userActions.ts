import { Locator, Page, expect } from "@playwright/test";

export class userActions {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly confirmAndContinueButton: Locator;
  readonly authenticateButton: Locator;
  readonly acceptAndContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole("button", { name: " Continue " });
    this.confirmAndContinueButton = page.getByRole("button", {
      name: "Confirm and continue",
    });
    this.authenticateButton = page.getByRole("button", {
      name: "Authenticate",
    });
    this.acceptAndContinue = page.getByRole("button", {
      name: "Accept and continue",
    });
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
  async selectValue(field: Locator, inputText: string) {
    await field.fill(inputText);
    await this.page.getByText(inputText).first().click();
  }

  async clickAcceptandContinue() {
    await this.acceptAndContinue.click();
  }
}
