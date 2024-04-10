import { Locator, Page, expect } from "@playwright/test";

export class Assertions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkPageTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async checkElementvisible(element: Locator) {
    await expect(element).toBeVisible();
  }

  async checkElementNotVisible(element: Locator) {
    await expect(element).toHaveCount(0);
  }

  async checkErrorHeadingPresent() {
    await this.checkElementvisible(
      this.page.getByRole("heading", { name: "There is a problem" })
    );
  }
}
