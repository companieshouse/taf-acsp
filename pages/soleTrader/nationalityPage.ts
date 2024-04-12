import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";

export class nationalityPage {
  readonly page: Page;
  readonly firstNationality: Locator;
  readonly secondNationality: Locator;
  readonly thirdNationality: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNationality = page.locator("#nationality_input_0");
    this.secondNationality = page.locator("#nationality_input_1");
    this.thirdNationality = page.locator("#nationality_input_2");
  }

  async enterFirstNationality(firstNationality: string) {
    const userActionsContext = new userActions(this.page);
    await userActionsContext.selectValue(
      this.firstNationality,
      firstNationality
    );
  }
  async enterSecondNationality(secondNationality: string) {
    const userActionsContext = new userActions(this.page);
    await userActionsContext.selectValue(
      this.secondNationality,
      secondNationality
    );
  }
  async enterThirdNationality(thirdNationality: string) {
    const userActionsContext = new userActions(this.page);
    await userActionsContext.selectValue(
      this.thirdNationality,
      thirdNationality
    );
  }
}
