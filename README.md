# taf-acsp

ACSP project UI test automation using Playwright-Typescript

Prerequisites:
node v20

VS code

Typescript

npm

Playwright

Set Up:

Clone the repo from github and run the below command in terminal :

npm install

The baseurl has to be passed via commandline

To run all tests:

URL='Pass the base url' npx playwright test

To run the test with 'smoke' tag:

URL='Pass the base url' npx playwright test --grep @smoke

To run the test with 'accessibility' tag:

URL='Pass the base url' npx playwright test --grep @accessibility

To view the test report:

npx playwright show-report
