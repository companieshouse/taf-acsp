import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { testConfig } from '../../../testConfig';
//import { playAudit } from 'playwright-lighthouse';

test('Accessibility check for Sole-Trader-Name screen @accessibility',async ({ page },testInfo) => {
    await page.goto('http://localhost:3000/');
    
//const accessibilityScanResults= await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aaa','wcag21a','wcag21aa']).analyze();
   const scanResults= await new AxeBuilder({page}).withTags(['wcag22aaa']).analyze();
await testInfo.attach('accessibility-scan-results',{
body:JSON.stringify(scanResults,null,2),
contentType:'application/json'});
    expect(scanResults.violations).toEqual([]);
    

});

/*test('Accessibility check  Lighthouse for Sole-Trader-Name screen ',async ({page})=> {
    await page.goto('http://localhost:3000/');
    
await playAudit({page,port:9222,thresholds:{accessibility:100}});

});*/
