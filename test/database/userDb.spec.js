const {
  state: { setStateObject, getStateObject },
} = require("@/functions/tools/State");
const { expect } = require("@/functions/utilities/testUtils");

const {
  getAllUsers,
  userFinder,
} = require("@/models/userModels/userModelFunctions");

const {
  initialValue: { stateKeys },
} = require("@/variables/constants/initialValues/initialValue");

describe("save user data in state", () => {
  it("should get all users data", async () => {
    const users = await getAllUsers();

    expect(users).to.be.an("array");

    await setStateObject(stateKeys.users, users);
  });

  it("should get specified user data", async () => {
    const allUsersFromState = await getStateObject(stateKeys.users);

    expect(allUsersFromState).to.be.an("array");

    if (allUsersFromState.length) {
      const userFromState = allUsersFromState[0];
      expect(userFromState).to.be.an("object");

      const user = await userFinder({ privateId: userFromState.privateId });
      expect(user).to.be.a("object");
    }
  });
});
