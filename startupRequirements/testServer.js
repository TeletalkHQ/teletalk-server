const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const { countries } = require("@/variables/others/countries");

const { userServices } = require("$/services/user");
const { User } = require("@/models/database/mongoDb/user");
const { PrivateChat } = require("@/models/database/mongoDb/privateChat");

const testServer = async () => {
  await deleteAllUsers();
  await deleteAllPrivateChats();

  const { countryName, countryCode } = countries.find((c) =>
    c.countryName.toLowerCase().includes("iran")
  );

  const users = Array.from({ length: 100 });

  const testUsers = {};

  for (let index = 0; index < users.length; index++) {
    await trier(tryToAddTestUser.name)
      .tryAsync(tryToAddTestUser, {
        countryCode,
        countryName,
        index,
        testUsers,
      })
      .runAsync();
  }

  testVariablesManager.setTestUsers(testUsers);
};

const deleteAllUsers = async () => {
  await User.deleteMany();
};

const deleteAllPrivateChats = async () => {
  await PrivateChat.deleteMany();
};

const tryToAddTestUser = async ({
  countryCode,
  countryName,
  index: i,
  testUsers,
}) => {
  const phoneNumber = `000000000${i}`;

  const userId = randomMaker.randomId(
    models.native.common.userId.maxlength.value
  );

  const token = authManager.signToken({
    countryCode,
    countryName,
    phoneNumber,
    userId,
  });

  const testUserKey = `testUser_${i}`;
  testUsers[testUserKey] = await userServices.addTestUser({
    bio: `bio_user${i}`,
    countryCode,
    countryName,
    firstName: `userFirstName_${i}`,
    lastName: `userLastName_${i}`,
    phoneNumber,
    token,
    userId,
    username: `username_${i}`,
  });

  logger.info(`${testUserKey} added!`);
};

module.exports = { testServer };
