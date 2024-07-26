import { Page } from "@playwright/test";
import { disconnectFromMongoDB } from "taf-playwright-common/dist/src/utils/mongodb/service/connect-to-database.js";
import { deleteUserByEmailAddress } from "taf-playwright-common/dist/src/utils/mongodb/service/login/user.js";

export class globalTearDown {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async deleteACSPUser(userName: string) {
    /* await deleteUserByEmailAddress(userName);
    console.debug("Deleted random user " + userName);

    await disconnectFromMongoDB();*/
  }
}
