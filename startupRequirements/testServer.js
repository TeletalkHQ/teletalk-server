const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const {
  common: { userId: userIdCommonModel },
} = require("@/models/native/common");

const { countries } = require("@/variables/others/countries");

const { userServices: testServices } = require("$/services/user");

const tryToAddTestUser = async ({
  countryCode,
  countryName,
  index,
  testUsers,
}) => {
  const phoneNumber = `000000000${index}`;

  const userId = randomMaker.randomId(userIdCommonModel.maxlength.value);

  const token = await authManager.tokenSigner({
    countryCode,
    countryName,
    phoneNumber,
    userId,
  });

  const testUserName = `testUser_${index}`;
  testUsers[testUserName] = await testServices.addTestUser({
    countryCode,
    countryName,
    firstName: "test",
    lastName: `user_${index}`,
    token,
    phoneNumber,
    userId,
  });

  logger.info(`${testUserName} added!`);
};

const testServer = async () => {
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
};

module.exports = { testServer };
