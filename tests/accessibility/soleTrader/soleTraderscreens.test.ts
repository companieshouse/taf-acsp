import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { testConfig } from '../../../testConfig';


test('Accessibility check for Sole-Trader-Name screen @accessibility',async ({ page },testInfo) => {
    await page.goto('http://localhost:3000/sole-trader/name');
    
   const scanResults= await new AxeBuilder({page}).withTags(['wcag22aa']).analyze();
await testInfo.attach('accessibility-scan-results',{
body:JSON.stringify(scanResults,null,2),
contentType:'application/json'});
    expect(scanResults.violations).toEqual([]);
    
    

});

