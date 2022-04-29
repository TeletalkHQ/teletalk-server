const { expect } = require("~/functions/utilities/testUtils");
const { setEnvironment } = require("~/functions/utilities/utilsNoDeps");

const { getAllUsers } = require("~/models/userModels/userModelFunctions");

describe("test and save user data in environments", () => {
  it("should get all users data", async () => {
    const users = await getAllUsers();

    logger.log(users);
    logger.log("users length", users.length);
  });
});
