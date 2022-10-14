const { stateManager } = require("@/classes/StateManager");

const { expect } = require("$/functions/utilities/testUtilities");

const { services } = require("@/services/services");

describe("save user data in state", () => {
  it("should get all users data", async () => {
    const users = await services.getAllUsers();
    expect(users).to.be.an("array");

    const { users: stateKey } = stateManager.stateKeys;
    await stateManager.setState(stateKey, users);
  });

  it("should get specified user data", async () => {
    const allUsersFromState = stateManager.state.users;

    expect(allUsersFromState).to.be.an("array");

    if (allUsersFromState.length) {
      const userFromState = allUsersFromState[0];
      expect(userFromState).to.be.an("object");

      const user = await services.userFinder({
        privateId: userFromState.privateId,
      });
      expect(user).to.be.a("object");
    }
  });
});
