import { Page, expect } from "@playwright/test";
import { testConfig } from "../config/testConfig";
import { pageURL } from "../config/pageURL";
import { pageTitle } from "../config/pageTitle";

import { startPage } from "../pages/common/startPage";

export class globalSetUp {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async ACSPUserLogin() {
    if (!testConfig.userName || !testConfig.password) {
      throw new Error(testConfig.empty_credentials);
    }
    if (!testConfig.baseUrl) {
      throw new Error(testConfig.empty_url);
    }

    const username = testConfig.userName as string;
    const password = testConfig.password as string;
    const startPageUrl = testConfig.baseUrl as string;

    const startPageContext = new startPage(this.page);

    await this.page.goto(startPageUrl);
    await expect(this.page).toHaveTitle(pageTitle.startPageTitle);

    await expect(startPageContext.startnow).toBeVisible();
    await this.page.getByRole('button', { name: 'Accept analytics cookies' }).click();
    await this.page.getByRole('button', { name: 'Hide this message' }).click();

    await startPageContext.startnow.click();
    await expect(this.page.getByLabel("Email address")).toBeVisible();
    await this.page.getByLabel("Email address").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
    expect(this.page.url()).toContain(pageURL.typeOfBusiness);
  }
}
