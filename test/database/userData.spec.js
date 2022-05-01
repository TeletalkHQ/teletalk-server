const {
  state: { setStateObject, getStateObject },
} = require("~/functions/tools/State");
const { expect } = require("~/functions/utilities/testUtils");

const {
  getAllUsers,
  userFinder,
} = require("~/models/userModels/userModelFunctions");

const {
  initialValue: { stateKeys },
} = require("~/variables/constants/initialValues/initialValue");

describe("test and save user data in environments", () => {
  it("should get all users data", async () => {
    const users = await getAllUsers();
    expect(users).to.be.a("array");

    await setStateObject(stateKeys.users, users);
  });

  it("should get specified user data", async () => {
    const userFromState = (await getStateObject(stateKeys.users))?.at(0);
    expect(userFromState).to.be.an("object");

    const user = await userFinder({ privateId: userFromState.privateId });
    expect(user).to.be.a("object");
  });
});
