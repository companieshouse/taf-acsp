import {test ,expect, Page} from '@playwright/test';
import { namePage } from '../../../pages/soleTrader/namePage';
import { testConfig } from '../../../testConfig';
import { userActions } from '../../../common/userActions';
import { dobPage } from '../../../pages/soleTrader/dobPage';

    test('Verify Sole Trader can register as an ACSP, @smoke', async ({ context,page }) => {
        const namePageContext= new namePage(page);
        const userActionsContext = new userActions(page);
        const dobPageContext = new dobPage(page);
        
        await page.goto(testConfig.local.url);
    
        await namePageContext.firstName.fill('Test-');
        await namePageContext.middleName.fill('a');
        await namePageContext.lastName.fill('user');
        await userActionsContext.clickContinue();
        await expect(dobPageContext.dobDay).toBeVisible();


    });
