import { Locator ,Page} from '@playwright/test';

export class namePage {
    
    
    readonly page:Page;
    readonly firstName:Locator;
    readonly middleName:Locator;
    readonly lastName:Locator;


    constructor(page:Page)
    {
this.page=page;

this.firstName=page.locator('#first-name');
this.middleName=page.locator('#middle-names');
this.lastName=page.locator('#last-name');

    }

   




    }

