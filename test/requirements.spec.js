require("@/functions/helpers/requireDotenv").requireDotenv();
require("@/configs/databaseConnecter").databaseConnecter();
require("@/variables/globalVariables");

const { errorThrower } = require("@/functions/utilities/utils");
const { envManager } = require("@/functions/utilities/EnvironmentManager");
const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const { randomId } = require("@/functions/utilities/randomId");
const { setTestUsersIntoState } = require("@/functions/utilities/testUtils");

const { countries } = require("@/variables/constants/countries");

const {
  commonModels: { privateIdCommonModel },
} = require("@/models/commonModels/commonModels");
const { addTestUser } = require("@/models/userModels/userModelFunctions");

describe("Add requirements to application state", () => {
  it("should make test users and save into state", async () => {
    const { countryName, countryCode } = countries.find((c) =>
      c.countryName.toLowerCase().includes("iran")
    );

    const users = Array.from({ length: 50 });

    const testUsers = {};
    for (let i = 0; i < users.length; i++) {
      try {
        const phoneNumber = `000000000${i}`;

        const privateId = randomId(privateIdCommonModel.maxlength.value);

        const mainToken = await tokenSigner({
          countryName,
          countryCode,
          phoneNumber,
          privateId,
        });

        const testUser = await addTestUser(
          countryCode,
          countryName,
          phoneNumber,
          "test",
          `user_${i}`,
          privateId,
          mainToken
        );

        testUsers[`testUser_${i}`] = testUser;
      } catch (error) {
        logger.log("requirements.spec adding users catch, error:", error);
        errorThrower(error, error);
      }
    }

    envManager.setTestUsers(testUsers);
    envManager.setTestUserProps(testUsers.testUser_0);
    await setTestUsersIntoState(testUsers);
  });
});
