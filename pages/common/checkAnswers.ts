import { Locator, Page, expect } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { userInput } from "../../testdata/userInput";

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
}
