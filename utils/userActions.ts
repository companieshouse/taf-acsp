import {Locator, Page} from '@playwright/test'

export class userActions{

    readonly page:Page;
    readonly continueButton:Locator;

    constructor(page:Page){
     this.page=page;
     this.continueButton=page.getByRole('button',{name:' Continue '});

    }

    async clickContinue(){

        await this.continueButton.click();
    }
}