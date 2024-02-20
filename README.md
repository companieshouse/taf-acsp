# taf-acsp
ACSP project UI test automation using Playwright-Typescript

Prerequisites:
node v20

VS code

Set Up:

Clone the repo from github and run the below command in terminal :

npm install

To run all tests:

npx playwright test

To run the test with 'smoke' tag:

npx playwright test --grep @smoke

To run the test with 'accessibility' tag:

npx playwright test --grep @accessibility

To view the test report:

npx playwright show-report


