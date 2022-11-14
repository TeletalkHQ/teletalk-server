const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

//! Require before internal files!
const { appConfigs } = require("@/classes/AppConfigs");
const { appOptions } = require("@/classes/AppOptions");
const { authManager } = require("@/classes/AuthManager");
const { eventManager } = require("@/classes/EventManager");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const {
  common: { userId: userIdCommonModel },
} = require("@/models/native/common");

const { countries } = require("@/variables/others/countries");

const { services } = require("@/services");

const tryToAddTestUser = async ({
  countryCode,
  countryName,
  index,
  testUsers,
}) => {
  const phoneNumber = `000000000${index}`;

  const userId = randomMaker.randomId(userIdCommonModel.maxlength.value);

  const mainToken = await authManager.tokenSigner({
    countryCode,
    countryName,
    phoneNumber,
    userId,
  });

  testUsers[`testUser_${index}`] = await services.addTestUser({
    countryCode,
    countryName,
    firstName: "test",
    lastName: `user_${index}`,
    mainToken,
    phoneNumber,
    userId,
  });
};

//TODO: Better random persons
describe("Add requirements to application state", () => {
  it("should make test users and save into state, also run configs", async () => {
    const { countryName, countryCode } = countries.find((c) =>
      c.countryName.toLowerCase().includes("iran")
    );

    const users = Array.from({ length: 100 });

    const testUsers = {};

    for (let index = 0; index < users.length; index++) {
      await trier(tryToAddTestUser.name).tryAsync(tryToAddTestUser, {
        countryCode,
        countryName,
        index,
        testUsers,
      });
    }

    testVariablesManager.setTestUsers(testUsers);
    await appConfigs.runConfigs();
    eventManager.emitEvent(
      appOptions.getOptions().eventKeys.requirementsGetDone
    );
  });
});
