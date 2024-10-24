import { Locator, Page, expect } from "@playwright/test";
import { userActions } from "../../utils/userActions";

export class correspondenceEmailAddress {
  readonly page: Page;
  readonly correspondenceEmailAddress: Locator;
  readonly diffCorrespondenceEmailAddress: Locator;
  readonly emailAddress: Locator;
  readonly diffCorrespondenceEmailAddressInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.correspondenceEmailAddress = page.locator("#whatIsYourEmailRadio");
    this.diffCorrespondenceEmailAddress = page.locator(
      "#a-different-email-radio",
    );
    this.diffCorrespondenceEmailAddressInput = page.locator(
      "#whatIsYourEmailInput",
    );
  }

  async selectCorrespondenceEmailAddress() {
    await this.correspondenceEmailAddress.check();
  }

  async enterDiffCorrespondenceEmailAddress(
    diffCorrespondenceEmailAddress: string,
  ) {
    await this.diffCorrespondenceEmailAddress.click();
    await expect(this.diffCorrespondenceEmailAddressInput).toBeVisible();
    const userActionsContext = new userActions(this.page);
    await userActionsContext.enterUserInput(
      this.diffCorrespondenceEmailAddressInput,
      diffCorrespondenceEmailAddress,
    );
  }
}
