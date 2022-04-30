const {
  state: { setStateObject, getState },
} = require("~/functions/tools/State");
const { expect } = require("~/functions/utilities/testUtils");
const { setEnvironment } = require("~/functions/utilities/utilsNoDeps");

const { getAllUsers } = require("~/models/userModels/userModelFunctions");

const {
  initialValue: { stateKeys },
} = require("~/variables/constants/initialValues/initialValue");

describe("test and save user data in environments", () => {
  it("should get all users data", async () => {
    const users = await getAllUsers();

    await setStateObject(stateKeys.users, users);
  });
});
