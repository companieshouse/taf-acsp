# taf-acsp

ACSP project UI test automation using Playwright-Typescript

Prerequisites:
node v20

VS code

Set Up:

Clone the repo from github and run the below command in terminal :

npm install

To run all tests:

USERNAME='$username' PASSWORD='$password' BASE_URL='$url' npx playwright test

To run the test with tag:

USERNAME='$username' PASSWORD='$password' BASE_URL='$url' npx playwright test --grep @tag

To run the test with 'accessibility' tag:

USERNAME='$username' PASSWORD='$password' BASE_URL='$url' npx playwright test --grep @accessibility

To run test in UI mode
USERNAME='$username' PASSWORD='$password' BASE_URL='$url' npx playwright test --grep @tag --ui

To view the test report:

npx playwright show-report
