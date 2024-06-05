import { Locator, Page, expect } from "@playwright/test";
import { userActions } from "../../utils/userActions";
import { userInput } from "../../testdata/userInput";

export class BusinessNamePage {
  readonly page: Page;
  readonly businessName: Locator;
  readonly soleTraderDiffBusinessName:Locator;
  readonly soleTraderBusinessName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.businessName = page.locator("#whatIsTheBusinessName");
    this.soleTraderDiffBusinessName =page.locator("#whatsTheBusinessNameRadio-2");
    this.soleTraderBusinessName=page.getByLabel('Enter the business name')

  }

  async enterBusinessName(businessName:string){
    const userActionsContext = new userActions(this.page);
    await userActionsContext.enterUserInput(this.businessName, businessName);
  }
  
  async enterDifferentBusinessNameforSoleTrader(businessName:string){
   await expect(this.page.locator("//*[@id='main-page-content']/form/div[1]/fieldset/div/div[1]/label[1]")).toContainText(userInput.firstName);
    await this.soleTraderDiffBusinessName.click();

    await expect(this.soleTraderBusinessName).toBeVisible();

    const userActionsContext = new userActions(this.page);

    await userActionsContext.enterUserInput(this.soleTraderBusinessName, businessName);

  }
}
