import { Page, expect } from "@playwright/test";


export class checkAnswers {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifySoleTraderCheckAnswersScreen() {
    await expect(this.page).toHaveScreenshot(
      "Verify-Sole-Trader-can-register-as-an-ACSP-smoke-soleTrader-1.png"
    );
  }

  async verifyLimitedCheckAnswersScreen() {
    await expect(
      this.page.getByRole("link", { name: "Change Correspondence address" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("link", { name: "Change Business sector" })
    ).toBeVisible();

   /* await expect(this.page).toHaveScreenshot(
      "Verify-Limited-company-can-register-as-an-ACSP-smoke-limitedCompany-1.png"
    );*/
  }

  async verifyUnincorporatedCheckAnswersScreen() {
    await expect(
      this.page.getByRole("link", { name: "Change Your name" })
    ).toBeVisible();
  }
}
