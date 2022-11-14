const { expect } = require("$/functions/utilities/testUtilities");

const { services } = require("@/services");

describe("save user data in state", () => {
  it("should get all users data", async () => {
    const users = await services.getAllUsers();
    expect(users).to.be.an("array");
  });

  it("should get specified user data", async () => {
    const users = await services.getAllUsers();

    expect(users).to.be.an("array");

    const user = await services.userFinder({
      userId: users[0].userId,
    });
    expect(user).to.be.a("object");
  });
});
