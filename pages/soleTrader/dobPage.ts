import { Locator, Page } from "@playwright/test";

export class dobPage {
  readonly page: Page;
  readonly dobDay: Locator;
  readonly dobMonth: Locator;
  readonly dobYear: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dobDay = page.locator("#dob-day");
    this.dobMonth = page.locator("#dob_month");
    this.dobYear = page.locator("#dob_year");
  }
}
