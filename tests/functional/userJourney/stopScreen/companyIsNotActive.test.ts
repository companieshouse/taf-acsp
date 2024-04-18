import test from "@playwright/test";
import { globalSetUp } from "../../../../setUp/globalSetup";
import { userActions } from "../../../../utils/userActions";
import { Assertions } from "../../../../utils/assertions";
import { pageTitle } from "../../../../config/pageTitle";
import { testConfig } from "../../../../config/testConfig";
import { typeOfBusinessPage } from "../../../../pages/common/typeOfBusinessPage";
import { userInput } from "../../../../testdata/userInput";
import { limitedJourney } from "../../../../pages/common/limitedJourney";

let userActionsContext;
let assertionsContext;
let typeOfbusinessContext;
let companyNumberPageContext;
let companyNotActivePageContext;
let limitedJourneyContext;

test.beforeEach("Log in to use ACSP Service", async ({ page }) => {
  const setUp = new globalSetUp(page);
  typeOfbusinessContext = new typeOfBusinessPage(page);
  userActionsContext = new userActions(page);
  assertionsContext = new Assertions(page);
  limitedJourneyContext = new limitedJourney(page);
  await setUp.ACSPUserLogin();
});

test("Verify only active companies can register as ACSPs for Limited Company, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedCompany,
    userInput.inactiveCompanyNumber
  );

  await assertionsContext.checkPageTitle(pageTitle.limitedCompanyInactive);
  // await assertionsContext.checkElementNotVisible(page.getByRole("link", {name: "Back", exact: true}));

  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", { name: "continue" })
  );
});

test("Verify only active companies can register as ACSPs for Limited Partnership, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedPartnership,
    userInput.inactiveCompanyNumber
  );

  await assertionsContext.checkPageTitle(pageTitle.limitedCompanyInactive);
  // await assertionsContext.checkElementNotVisible(page.getByRole("link", {name: "Back", exact: true}));

  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", { name: "continue" })
  );
});

test("Verify only active companies can register as ACSPs for Limited liability partnership, @smoke @limited @StopScreen", async ({
  page,
}) => {
  await limitedJourneyContext.limitedJourneyCommonScreens(
    testConfig.limitedLiabilityPartnership,
    userInput.inactiveCompanyNumber
  );

  await assertionsContext.checkPageTitle(pageTitle.limitedCompanyInactive);
  // await assertionsContext.checkElementNotVisible(page.getByRole("link", {name: "Back", exact: true}));

  await assertionsContext.checkElementNotVisible(
    page.getByRole("button", { name: "continue" })
  );
});
