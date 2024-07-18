import { Page, expect } from "@playwright/test";
import { testConfig } from "../config/testConfig";
import { pageURL } from "../config/pageURL";
import { pageTitle } from "../config/pageTitle";

import { startPage } from "../pages/common/startPage";
import {
  connectToMongoDB,
  disconnectFromMongoDB,
} from "taf-playwright-common/dist/src/utils/mongodb/service/connect-to-database.js";
import {
  deleteUserByEmailAddress,
  insertUser,
} from "taf-playwright-common/dist/src/utils/mongodb/service/login/user.js";
import {
  getVaultInfo,
  writeVaultDataToEnvVars,
} from "taf-playwright-common/dist/src/utils/vault/utils/extract-vault-data.js";
import { getEnvVar } from "taf-playwright-common/dist/src/utils/env/environment-var.js";
import {
  deleteRoleById,
  insertRole,
} from "taf-playwright-common/dist/src/utils/mongodb/service/login/role.js";

import randomstring from "randomstring";

export class globalSetUp {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async ACSPUserLogin(username: string, password: string) {
    const startPageUrl = getEnvVar("URL") as string;

    const startPageContext = new startPage(this.page);

    await this.page.goto(startPageUrl);
    await expect(this.page).toHaveTitle(pageTitle.startPageTitle);

    await expect(startPageContext.startnow).toBeVisible();
    await this.page
      .getByRole("button", { name: "Accept analytics cookies" })
      .click();
    await this.page.getByRole("button", { name: "Hide this message" }).click();

    await startPageContext.startnow.click();
    await expect(this.page.getByLabel("Email address")).toBeVisible();
    await this.page.getByLabel("Email address").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  async createNewApplication() {
    await this.page.locator("#savedApplication-2").click();
    await this.page
      .getByRole("button", { name: "  Save and continue " })
      .click();
    await expect(this.page.url()).toContain(pageURL.typeOfBusiness);
  }

  async createACSPUser(): Promise<string> {
    await this.getDetailsFromVault();

    const db = getEnvVar("ACCOUNT_DATABASE_URL");

    await connectToMongoDB(db);

    const bankruptScottishOfficerSearchPermission = getEnvVar(
      "USER_PERMISSIONS:BANKRUPT_SCOTTISH_OFFICER_SEARCH"
    );
    const extensionsDownloadPermission = getEnvVar(
      "USER_PERMISSIONS:EXTENSIONS_DOWNLOAD"
    );
    const rolesAdminPermission = getEnvVar("USER_PERMISSIONS:ROLE_ADMIN");

    // Create a new role
    const permissions: string[] = [];
    permissions.push(bankruptScottishOfficerSearchPermission);
    permissions.push(extensionsDownloadPermission);
    permissions.push(rolesAdminPermission);

    const roleId = await insertRole(permissions);
    console.log("Role is " + roleId);
    const currentDate = new Date();

    const randomStr: string = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    const randomNumber = parseInt(randomStr, 10);

    const randomUser =
      "ACSPAutomation" + randomNumber + "@test.companieshouse.gov.uk";

    console.debug("Creating random user " + randomUser);

    const unhashedPassword = getEnvVar("CHS_PASSWORD");
    const hashedPassword = getEnvVar("CHS_HASHED_PASSWORD");

    const roles: string[] = [];
    roles.push(roleId);

    await insertUser(
      randomUser,
      hashedPassword,
      currentDate,
      "GB_en",
      "Joe",
      "Bloggs",
      roles
    );
    return randomUser;
  }

  async getDetailsFromVault() {
    console.info("Getting environment specific config");

    // Get the vault key from the environment variables
    const vaultRoleId = getEnvVar("VAULT_ROLE_ID");
    const vaultSecretId = getEnvVar("VAULT_SECRET_ID");
    const vaultUrl = getEnvVar("VAULT_URL");
    const vaultGetAppRoleTokenUrl = getEnvVar("VAULT_GET_APP_ROLE_TOKEN_URL");

    try {
      // Call the Vault REST API to get the environment specific data
      const envSpecificVaultResponse = getVaultInfo(
        "testers/data/playwright/taf-authentication/" +
          getEnvVar("ENVIRONMENT"),
        vaultRoleId,
        vaultSecretId,
        vaultUrl,
        vaultGetAppRoleTokenUrl
      );

      console.log("Env specific response " + envSpecificVaultResponse);

      // Extract the environment specific config from Vault and create environment variables
      writeVaultDataToEnvVars(await envSpecificVaultResponse, "");
    } catch (error) {
      console.error(
        "Error loading environment specific details from Vault: ",
        error
      );
    }

    console.info("Getting user permissions");

    const userPermissionsFullVaultPath: string =
      "testers/data/playwright/user-permissions";
    const index: number = userPermissionsFullVaultPath.indexOf("playwright/");
    const userPermissionsVaultPath: string =
      userPermissionsFullVaultPath
        .substring(index + 11, userPermissionsFullVaultPath.length)
        .toUpperCase()
        .replace("-", "_")
        .replace("/", "_") + ":";

    // Get the vault key from the environment variables
    try {
      // Call the Vault REST API to get user permissions data
      const permissionsResponse = getVaultInfo(
        userPermissionsFullVaultPath,
        vaultRoleId,
        vaultSecretId,
        vaultUrl,
        vaultGetAppRoleTokenUrl
      );

      // Extract the User permissions and add them as environment variables
      writeVaultDataToEnvVars(
        await permissionsResponse,
        userPermissionsVaultPath
      );
    } catch (error) {
      console.error(
        "Error loading environment specific details from Vault: ",
        error
      );
    }
  }
}
