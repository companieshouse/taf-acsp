import { Locator, Page, expect } from "@playwright/test";

export class userActions {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly saveAndContinueButton: Locator;
  readonly confirmAndContinueButton: Locator;
  readonly authenticateButton: Locator;
  readonly acceptAndContinue: Locator;
  readonly continueToPayment: Locator;
  readonly confirmPayment: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole("button", {
      name: " Continue ",
    });
    this.saveAndContinueButton = page.getByRole("button", {
      name: "Save and continue",
    });
    this.confirmAndContinueButton = page.getByRole("button", {
      name: "Confirm and continue",
    });
    this.authenticateButton = page.getByRole("button", {
      name: "Authenticate",
    });
    this.acceptAndContinue = page.getByRole("button", {
      name: "Accept and continue",
    });
    this.continueToPayment = page.getByRole("button", {
      name: "Continue to payment",
    });
    this.confirmPayment = page.getByRole("button", {
      name: "Confirm payment",
    });
  }

  async clickContinue() {
    await this.continueButton.scrollIntoViewIfNeeded();
    await this.continueButton.click({ force: true });
  }

  async clickSaveAndContinue() {
    await this.saveAndContinueButton.scrollIntoViewIfNeeded();
    await this.saveAndContinueButton.click({ force: true });
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

  async clickContinueToPayment() {
    await this.continueToPayment.click();
  }

  async clickConfirmPayment() {
    await this.confirmPayment.click();
  }
}
