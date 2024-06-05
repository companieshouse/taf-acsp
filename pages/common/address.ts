import { Locator, Page, expect } from "@playwright/test";
import { testConfig } from "../../config/testConfig";
import { userInput } from "../../testdata/userInput";

export class address {
  readonly page: Page;
  readonly postcodeLookUp: Locator;
  readonly selectAddress: Locator;
  readonly manualAddressLink: Locator;
  readonly editAddressLink: Locator;
  readonly findAddressButton: Locator;
  readonly propertyNumberfield: Locator;
  readonly confirmAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postcodeLookUp = page.locator("#postCode");
    this.selectAddress = page.locator('//*[@id="44"]');
    this.manualAddressLink = page.getByRole("link", {
      name: "Enter Address Manually",
    });
    this.editAddressLink = page.getByRole("link", { name: "Edit address" });
    this.findAddressButton = page.getByRole("button", { name: "Find address" });
    this.propertyNumberfield = page.locator("#premise");
    this.confirmAddress = page.locator('//*[@id="main-page-content"]/form/ul');
  }

  async addressLookUp(postCode: string) {
    await expect(
      this.page.locator("//*[@id='main-page-content']/form/span")
    ).toContainText(userInput.firstName);
    await this.postcodeLookUp.fill(postCode);
    await expect(this.manualAddressLink).toBeVisible();
    await expect(this.propertyNumberfield).toBeVisible();
    await this.findAddressButton.click();
  }

  async selectAddressFromList() {
    await expect(
      this.page.locator("//*[@id='main-page-content']/form/span")
    ).toContainText(userInput.firstName);
    await expect(this.manualAddressLink).toBeVisible();
    await this.selectAddress.check();
  }

  async confirmAddressEntered() {
    await expect(
      this.page.locator("//*[@id='main-page-content']/form/span")
    ).toContainText(userInput.firstName);
    await expect(this.editAddressLink).toBeVisible();

    /* await expect(
        this.confirmAddress
      ).toContainText(userInput.postcode);*/
  }
}
