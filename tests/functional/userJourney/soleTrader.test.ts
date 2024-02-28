import { test, expect, Page } from "@playwright/test";
import { namePage } from "../../../pages/soleTrader/namePage";
import { testConfig } from "../../../testConfig";
import { userActions } from "../../../utils/userActions";
import { dobPage } from "../../../pages/soleTrader/dobPage";
import { userInput } from "../../../testdata/userInput";
import playwrightConfig from "../../../playwright.config";

test("Verify Sole Trader can register as an ACSP, @smoke", async ({ page }) => {
  const namePageContext = new namePage(page);
  const userActionsContext = new userActions(page);
  const dobPageContext = new dobPage(page);
  await page.goto(testConfig.baseUrl + testConfig.soletrader.name);
  await namePageContext.firstName.fill(userInput.firstName);
  await namePageContext.middleName.fill(userInput.middleName);
  await namePageContext.lastName.fill(userInput.lastName);
  await userActionsContext.clickContinue();
  await expect(dobPageContext.dobDay).toBeVisible();
});
