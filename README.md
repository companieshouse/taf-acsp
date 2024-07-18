# taf-acsp

ACSP project UI test automation using Playwright-Typescript

Prerequisites:
node v20

VS code

Set Up:

Clone the repo from github and run the below command in terminal :

npm install

To run all tests:

ENVIRONMENT='$environment'  URL='$URL' npx playwright test

To run the test with tag:

ENVIRONMENT='$environment'  URL='$URL' npx playwright test --grep @tag

To run the test with 'accessibility' tag:

ENVIRONMENT='$environment'  URL='$URL' npx playwright test --grep @accessibility

To run test in UI mode
ENVIRONMENT='$environment'  URL='$URL' npx playwright test --grep @tag --ui

To view the test report:

npx playwright show-report
