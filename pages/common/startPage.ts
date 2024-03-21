import { Locator, Page } from "@playwright/test";

export class startPage {
  readonly page: Page;
  readonly startnow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startnow = page.getByRole("button", { name: "Start now" });
  }
}
