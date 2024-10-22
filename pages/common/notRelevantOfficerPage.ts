import { Page } from "@playwright/test";

export class NotRelevantOfficerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
