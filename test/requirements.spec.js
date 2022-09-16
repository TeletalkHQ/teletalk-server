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
const { trier } = require("utility-store/src/classes/Trier");

const tryToAddTestUser = async ({
  testUsers,
  countryCode,
  countryName,
  index,
}) => {
  const phoneNumber = `000000000${index}`;

  const privateId = randomMaker.randomId(privateIdCommonModel.maxlength.value);

  const mainToken = await authManager.tokenSigner({
    countryName,
    countryCode,
    phoneNumber,
    privateId,
  });

  testUsers[`testUser_${index}`] = await addTestUser({
    countryCode,
    countryName,
    phoneNumber,
    firstName: "test",
    lastName: `user_${index}`,
    privateId,
    mainToken,
  });
};

describe("Add requirements to application state", () => {
  it("should make test users and save into state", async () => {
    const { countryName, countryCode } = countries.find((c) =>
      c.countryName.toLowerCase().includes("iran")
    );

    const users = Array.from({ length: 100 });

    const testUsers = {};

    for (let index = 0; index < users.length; index++) {
      await trier(tryToAddTestUser.name).tryAsync(tryToAddTestUser, {
        testUsers,
        countryCode,
        countryName,
        index,
      });
    }

    await userPropsUtilities.setTestUsers(testUsers);

    const { requirementsGetDone } = eventManager.eventKeys;
    eventManager.emitEvent(requirementsGetDone);
  });
});
