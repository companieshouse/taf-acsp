import { Locator, Page } from "@playwright/test";

export class whichSector {
  readonly page: Page;
  readonly otherSector:Locator

  constructor(page: Page) {
    this.page = page;
    this.otherSector= page.getByLabel("Other");
  }
}
