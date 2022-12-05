const { expect } = require("$/functions/utilities/testUtilities");

const { services } = require("@/services");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

describe("save user data in state", () => {
  it("should get all users data", async () => {
    const users = await services.getAllUsers();
    expect(users).to.be.an(FIELD_TYPE.ARRAY);
  });

  it("should get specified user data", async () => {
    const users = await services.getAllUsers();

    expect(users).to.be.an(FIELD_TYPE.ARRAY);

    const user = await services.userFinder({
      userId: users[0].userId,
    });
    expect(user).to.be.a(FIELD_TYPE.OBJECT);
  });
});
