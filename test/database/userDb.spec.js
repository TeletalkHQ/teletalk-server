const { stateManager } = require("@/functions/tools/StateManager");
const { expect } = require("@/functions/testUtilities/testUtils");

const {
  getAllUsers,
  userFinder,
} = require("@/models/userModels/userModelFunctions");

const {
  initialOptions: { stateKeys },
} = require("@/variables/others/initialOptions");

describe("save user data in state", () => {
  it("should get all users data", async () => {
    const users = await getAllUsers();

    expect(users).to.be.an("array");

    await stateManager.setStateObject(stateKeys.users, users);
  });

  it("should get specified user data", async () => {
    const allUsersFromState = stateManager.state.users;

    expect(allUsersFromState).to.be.an("array");

    if (allUsersFromState.length) {
      const userFromState = allUsersFromState[0];
      expect(userFromState).to.be.an("object");

      const user = await userFinder({ privateId: userFromState.privateId });
      expect(user).to.be.a("object");
    }
  });
});
