import { Locator, Page, expect } from "@playwright/test";
import { userActions } from "../../utils/userActions";
import { userInput } from "../../testdata/userInput";

export class namePage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator("#first-name");
    this.middleName = page.locator("#middle-names");
    this.lastName = page.locator("#last-name");
  }

  async enterName(firstName:string,middleName:string,lastName:string){
    const userActionsContext = new userActions(this.page);
    await userActionsContext.enterUserInput(this.firstName, firstName);
    await userActionsContext.enterUserInput(this.middleName, middleName);

    await userActionsContext.enterUserInput(this.lastName, lastName);
    await expect(this.firstName).toHaveValue(userInput.firstName);
    await expect(this.lastName).toHaveValue(userInput.lastName);

  }
  
}
