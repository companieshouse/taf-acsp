import { test } from "@playwright/test";
import { globalSetUp } from "../../../setUp/globalSetup";
import { typeOfBusinessPage } from "../../../pages/common/typeOfBusinessPage";
import { testConfig } from "../../../config/testConfig";
import { userInput } from "../../../testdata/userInput";
import { userActions } from "../../../utils/userActions";
import { Assertions } from "../../../utils/assertions";
import { limitedJourney } from "../../../pages/common/limitedJourney";

let typeOfbusinessContext;
let userActionsContext;
let assertionsContext;
let limitedJourneyContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  assertionsContext = new Assertions(page);
  limitedJourneyContext = new limitedJourney(page);

  const setUp = new globalSetUp(page);

  await setUp.ACSPUserLogin();
});

test("Verify error shown when company id not found for Limited journey @smoke @limited", async ({
  page,
}) => {
  await typeOfbusinessContext.selectTypeOfBusiness(testConfig.limitedCompany);
  await userActionsContext.clickContinue();

  await limitedJourneyContext.enterCompanyNumber(
    userInput.invalidCompanyNumber
  );
  await userActionsContext.clickContinue();
  await assertionsContext.checkErrorHeadingPresent();

  await assertionsContext.checkElementvisible(
    page.getByRole("link", { name: "Enter a valid company number" })
  );
  await assertionsContext.checkElementvisible(
    page.getByText("Error: Enter a valid company")
  );
});
