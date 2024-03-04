import { expect, test } from "@playwright/test";
import { dobPage } from "../../../pages/soleTrader/dobPage";
import { namePage } from "../../../pages/soleTrader/namePage";
import { testConfig } from "../../../testConfig";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";

test("Verify Sole Trader can register as an ACSP, @smoke", async ({ page }) => {
  const namePageContext = new namePage(page);
  const userActionsContext = new userActions(page);
  const dobPageContext = new dobPage(page);
  await page.goto(testConfig.local.soleTrader.name);

  await namePageContext.firstName.fill(userInput.firstName);
  await namePageContext.middleName.fill(userInput.middleName);
  await namePageContext.lastName.fill(userInput.lastName);
  await userActionsContext.clickContinue();
  await expect(dobPageContext.dobDay).toBeVisible();
});
