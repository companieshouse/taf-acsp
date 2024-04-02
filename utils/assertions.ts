import { Locator, Page, expect } from "@playwright/test";

export class assertions {
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

  async checkErrorHeadingPresent() {
    await this.checkElementvisible(
      this.page.getByRole("heading", { name: "There is a problem" })
    );
  }
}
