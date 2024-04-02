import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";

export class dobPage {
  readonly page: Page;
  readonly dobDay: Locator;
  readonly dobMonth: Locator;
  readonly dobYear: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dobDay = page.locator("#dob-day");
    this.dobMonth = page.locator("#dob-month");
    this.dobYear = page.locator("#dob-year");
  }

  async enterDOB(day: string, month: string, year: string) {
    const userActionsContext = new userActions(this.page);
    await userActionsContext.enterUserInput(this.dobDay, day);
    await userActionsContext.enterUserInput(this.dobMonth, month);

    await userActionsContext.enterUserInput(this.dobYear, year);
  }
}
