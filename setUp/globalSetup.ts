import { Page, expect, test } from "@playwright/test";
import { testConfig } from "../testConfig";
import { startPage } from "../pages/common/startPage";

export class globalSetUp {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async ACSPUserLogin() {
    if (!process.env.USERNAME || !process.env.PASSWORD) {
      throw new Error(testConfig.empty_credentials);
    }
    if (!process.env.BASE_URL) {
      throw new Error(testConfig.empty_url);
    }
    const username = process.env.USERNAME as string;
    const password = process.env.PASSWORD as string;
    const startPageUrl = process.env.BASE_URL as string;

    const startPageContext = new startPage(this.page);

    await this.page.goto(startPageUrl);
    await expect(this.page).toHaveTitle(testConfig.startPageTitle);

    await expect(startPageContext.startnow).toBeVisible();

    await startPageContext.startnow.click();
    await expect(this.page.getByLabel("Email address")).toBeVisible();
    await this.page.getByLabel("Email address").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
    await expect(this.page.url()).toContain(testConfig.typeOfBusiness);
  }
}
