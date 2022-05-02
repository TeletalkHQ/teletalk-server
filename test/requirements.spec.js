const {
  state: { setStateObject },
} = require("@/functions/tools/State");

const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const { randomId } = require("@/functions/utilities/randomId");

const {
  commonModels: {
    properties: {
      privateIdCommonModel: { properties: privateIdCommonModel },
    },
  },
} = require("@/models/commonModels/commonModels");
const { addTestUser } = require("@/models/userModels/userModelFunctions");

const { countries } = require("@/variables/constants/countries");
const {
  initialValue: { stateKeys },
} = require("@/variables/constants/initialValues/initialValue");

describe("Add requirements to application state", () => {
  it("should make test user and save into state", async () => {
    const { countryName, countryCode } = countries.find((c) =>
      c.countryName.toLowerCase().includes("iran")
    );

    const users = Array.from({ length: 5 });

    for (let i = 0; i < users.length; i++) {
      const phoneNumber = `000000000${i}`;

      const privateId = randomId(privateIdCommonModel.maxlength.value);

      const token = await tokenSigner({
        countryName,
        countryCode,
        phoneNumber,
        privateId,
      });

      const testUser = await addTestUser(
        countryCode,
        countryName,
        phoneNumber,
        "test",
        `user_${i}`,
        privateId,
        token
      );

      const key = [`testUser${i}`];

      stateKeys[key] = key;

      await setStateObject(key, testUser);
    }
  });
});
