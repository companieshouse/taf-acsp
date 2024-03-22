import { expect, test } from "@playwright/test";
import { dobPage } from "../../../pages/soleTrader/dobPage";
import { namePage } from "../../../pages/soleTrader/namePage";
import { testConfig } from "../../../config/testConfig";
import { pageURL } from "../../../config/pageURL";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";
import { globalSetUp } from "../../../setUp/globalSetup";

test.beforeEach(async ({ page }) => {
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Verify Sole Trader can register as an ACSP, @smoke", async ({ page }) => {
  const namePageContext = new namePage(page);
  const userActionsContext = new userActions(page);
  const dobPageContext = new dobPage(page);
  await page.goto(testConfig.baseUrl + pageURL.soleTrader.name);
  await expect(page).toHaveTitle(testConfig.nameTitle);
  await expect(namePageContext.firstName).toBeVisible();
  await namePageContext.firstName.fill(userInput.firstName);
  await namePageContext.middleName.fill(userInput.middleName);
  await namePageContext.lastName.fill(userInput.lastName);
  await userActionsContext.clickContinue();
  await expect(page).toHaveTitle(testConfig.dobTitle);

  await expect(dobPageContext.dobDay).toBeVisible();
});
