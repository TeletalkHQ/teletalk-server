const { randomMaker } = require("utility-store/src/classes/RandomMaker");

require("@/variables/others/customGlobals");
require("@/functions/helpers/requireDotenv").requireDotenv();
require("@/configs/databaseConnector").databaseConnector();

const { authManager } = require("@/classes/AuthManager");
const { eventManager } = require("@/classes/EventManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const { countries } = require("@/variables/others/countries");

const {
  commonModels: { privateIdCommonModel },
} = require("@/models/dataModels/commonModels");
const { addTestUser } = require("@/services/userServices");

describe("Add requirements to application state", () => {
  it("should make test users and save into state", async () => {
    const { countryName, countryCode } = countries.find((c) =>
      c.countryName.toLowerCase().includes("iran")
    );

    const users = Array.from({ length: 100 });

    const testUsers = {};

    for (let i = 0; i < users.length; i++) {
      try {
        const phoneNumber = `000000000${i}`;

        const privateId = randomMaker.randomId(
          privateIdCommonModel.maxlength.value
        );

        const mainToken = await authManager.tokenSigner({
          countryName,
          countryCode,
          phoneNumber,
          privateId,
        });

        testUsers[`testUser_${i}`] = await addTestUser(
          countryCode,
          countryName,
          phoneNumber,
          "test",
          `user_${i}`,
          privateId,
          mainToken
        );
      } catch (error) {
        logger.log("requirements.spec adding users catch, error:", error);
        errorThrower(error, error);
      }
    }

    await userPropsUtilities.setTestUsers(testUsers);

    const { requirementsGetDone } = eventManager.eventKeys;
    eventManager.emitEvent(requirementsGetDone);
  });
});
