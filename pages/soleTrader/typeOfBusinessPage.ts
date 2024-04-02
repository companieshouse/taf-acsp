import { Locator, Page } from "@playwright/test";
import { userActions } from "../../utils/userActions";
import { testConfig } from "../../config/testConfig";

export class typeOfBusinessPage {
    
  readonly page: Page;
  readonly limitedCompany: Locator;
  readonly limitedPartnership: Locator;
  readonly limitedLiabilityPartnership: Locator;
  readonly partnership: Locator;
  readonly soleTrader: Locator;
  readonly otherType: Locator;




  constructor(page: Page) {
    this.page = page;

    this.limitedCompany = page.getByLabel('Limited company');
    this.limitedPartnership = page.locator('Limited partnership (LP)');
    this.limitedLiabilityPartnership = page.locator('Limited liability partnership');
    this.partnership = page.getByLabel('Partnership (not registered');
    this.soleTrader = page.getByLabel('Sole trader');
    this.otherType = page.getByLabel('Other');

   
    
  }

  async  selectTypeOfBusiness(type:string){

     switch(type){
      case testConfig.limitedCompany:
        await this.limitedCompany.check();
        break;
        case testConfig.limitedPartnership:
          await this.limitedPartnership.check();
          break;
          case testConfig.limitedLiabilityPartnership:
            await this.limitedLiabilityPartnership.check();
          break;
          case testConfig.partnership:
            await this.partnership.check();
            break;
            case testConfig.soleTrader:
              await this.soleTrader.check();
              break;
              case testConfig.otherType:
                await this.otherType.check();
              break;

     }
  }
}