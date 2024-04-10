import { test } from "@playwright/test";
import { globalSetUp } from "../../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../../pages/common/typeOfBusinessPage";
import { testConfig } from "../../../config/testConfig";
import { companyNumberPage } from "../../../pages/limited/companyNumberPage";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";
import { assertions } from "../../../utils/assertions";

let typeOfbusinessContext;
let companyNumberPageContext;
let userActionsContext;
let assetionsContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  typeOfbusinessContext = new typeOfBusinessPage(page);
  companyNumberPageContext = new companyNumberPage(page);
  userActionsContext = new userActions(page);
  assetionsContext = new assertions(page);
  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Verify error shown when company id not found for Limited journey @smoke @limited", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
  await userActionsContext.clickContinue();

  await companyNumberPageContext.enterCompanyNumber(userInput.invalidCompanyNumber);
  await userActionsContext.clickContinue();
  await assetionsContext.checkErrorHeadingPresent();

  await assetionsContext.checkElementvisible(
    page.getByRole("link", { name: "Enter a valid company number" })
  );
  await assetionsContext.checkElementvisible(
    page.getByText("Error: Enter a valid company")
  );
});
