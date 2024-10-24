import { Locator, Page } from "@playwright/test";

export class IsThisYourCompany {
  readonly page: Page;
  readonly confirmAndContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmAndContinue = page.getByRole("button", {
      name: "Confirm and continue",
    });
  }
}
