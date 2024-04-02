import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";

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
  }
  
}
