import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";

export class BusinessNamePage {
  readonly page: Page;
  readonly businessName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.businessName = page.locator("#whatIsTheBusinessName")
  }

  async enterBusinessName(businessName:string){
    const userActionsContext = new userActions(this.page);
    await userActionsContext.enterUserInput(this.businessName, businessName);
  }
  
}
