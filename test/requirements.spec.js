require("@/functions/helpers/requireDotenv").requireDotenv();
require("@/configs/databaseConnecter").databaseConnecter();
require("@/variables/globalVariables");

const {
  setEnvironment,
  errorThrower,
} = require("@/functions/utilities/utilsNoDeps");
const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const { randomId } = require("@/functions/utilities/randomId");
const {
  setTestUserAndTestToken,
  setTestUsersIntoState,
} = require("@/functions/utilities/testUtils");

const { countries } = require("@/variables/constants/countries");
const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const {
  commonModels: {
    properties: {
      privateIdCommonModel: { properties: privateIdCommonModel },
    },
  },
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

        const token = await tokenSigner({
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
          token
        );

        testUsers[`testUser_${i}`] = testUser;
      } catch (error) {
        logger.log("requirements.spec adding users catch, error:", error);
        errorThrower(error, error);
      }
    }

    setEnvironment(ENVIRONMENT_KEYS.TEST_USERS, testUsers);
    setTestUserAndTestToken(testUsers.testUser_0);
    await setTestUsersIntoState(testUsers);
  });
});
