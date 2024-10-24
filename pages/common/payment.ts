import { Locator, Page, expect } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { userActions } from "../../utils/userActions";

export class payment {
  readonly page: Page;
  readonly fees: Locator;
  readonly cardNumber: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly nameOnCard: Locator;
  readonly cvc: Locator;
  readonly addressline1: Locator;
  readonly city: Locator;
  readonly postCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fees = page.locator("#page-total");
    this.cardNumber = page.locator("#card-no");
    this.expiryMonth = page.locator("#expiry-month");
    this.expiryYear = page.locator("#expiry-year");
    this.nameOnCard = page.locator("#cardholder-name");
    this.cvc = page.locator("#cvc");
    this.addressline1 = page.locator("#address-line-1");
    this.city = page.locator("#address-city");
    this.postCode = page.locator("#address-postcode");
  }

  async reviewPayment(fees: string) {
    await expect(this.fees).toContainText(testConfig.fees);
  }

  async enterCardDetails() {
    const userActionsContext = new userActions(this.page);

    await userActionsContext.enterUserInput(
      this.cardNumber,
      testConfig.cardNumber,
    );

    await userActionsContext.enterUserInput(
      this.expiryMonth,
      testConfig.expiryMonth,
    );

    await userActionsContext.enterUserInput(
      this.expiryYear,
      testConfig.expiryYear,
    );

    await userActionsContext.enterUserInput(
      this.nameOnCard,
      testConfig.nameOnCard,
    );

    await userActionsContext.enterUserInput(this.cvc, testConfig.cvc);

    await userActionsContext.enterUserInput(
      this.addressline1,
      testConfig.addressLine1,
    );

    await userActionsContext.enterUserInput(this.city, testConfig.city);

    await userActionsContext.enterUserInput(this.postCode, testConfig.postcode);
    this.page.setDefaultTimeout(6000);
  }
}
