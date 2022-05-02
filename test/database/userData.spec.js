const {
  state: { setStateObject, getStateObject },
} = require("@/functions/tools/State");
const { expect } = require("@/functions/utilities/testUtils");
const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const { randomId } = require("@/functions/utilities/randomId");

const {
  getAllUsers,
  userFinder,
  addTestUser,
} = require("@/models/userModels/userModelFunctions");
const {
  commonModels: {
    properties: {
      privateIdCommonModel: { properties: privateIdCommonModel },
    },
  },
} = require("@/models/commonModels/commonModels");

const {
  initialValue: { stateKeys },
} = require("@/variables/constants/initialValues/initialValue");
const { countries } = require("@/variables/constants/countries");

describe("save user data in state", () => {
  it("should get all users data", async () => {
    const users = await getAllUsers();

    expect(users).to.be.a("array");

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

  it("should make test user and save into state", async () => {
    const { countryName, countryCode } = countries.find((c) =>
      c.countryName.toLowerCase().includes("iran")
    );
    const phoneNumber = "9119119191";
    const privateId = randomId(privateIdCommonModel.maxlength.value);

    const user = await addTestUser(
      countryCode,
      countryName,
      phoneNumber,
      privateId,
      await tokenSigner({ countryName, countryCode, phoneNumber, privateId })
    );

    await setStateObject(stateKeys.testUser, user);
  });
});
