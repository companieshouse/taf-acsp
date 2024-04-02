import { expect, test } from "@playwright/test";
import { globalSetUp } from "../../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../../pages/soleTrader/typeOfBusinessPage";
import { testConfig } from "../../../config/testConfig";
import { companyNumberPage } from "../../../pages/limited/companyNumberPage";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";
import { assertions } from "../../../utils/assertions";

test.beforeEach(async ({ page }) => {
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Verify error shown when company id not found for Limited journey @smoke @limited", async ({
  page,
}) => {
  const typeOfbusinessContext = new typeOfBusinessPage(page);
  const companyNumberPageContext = new companyNumberPage(page);
  const userActionsContext = new userActions(page);
  const assetionsContext = new assertions(page);

  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
  await userActionsContext.clickContinue();

  await companyNumberPageContext.enterCompanyNumber(userInput.companyNumber);
  await userActionsContext.clickContinue();
  await assetionsContext.checkErrorHeadingPresent();

  await assetionsContext.checkElementvisible(
    page.getByRole("link", { name: "Enter a valid company number" })
  );
  await assetionsContext.checkElementvisible(
    page.getByText("Error: Enter a valid company")
  );
});
