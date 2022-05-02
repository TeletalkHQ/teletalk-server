const { request, expect } = require("@/functions/utilities/testUtils");
const {
  state: { getStateObject },
} = require("@/functions/tools/State");

const {
  initialValue: { stateKeys },
} = require("@/variables/constants/initialValues/initialValue");
const {
  cellphoneRoutes: {
    properties: {
      addContactRoute: { properties: addContactRoute },
      cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
    },
  },
} = require("@/variables/routes/cellphoneRoutes");
const { setEnvironment } = require("@/functions/utilities/utilsNoDeps");
const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

describe("add contact successfully", () => {
  it(`should add  to testUser contact list`, async () => {
    const testUser = await getStateObject(stateKeys.testUser);

    setEnvironment(ENVIRONMENT_KEYS.TEST_MAIN_TOKEN, testUser.tokens[0].token);

    const [user1, user2, user3] = (await getStateObject(stateKeys.users))
      .filter((u) => u.phoneNumber !== testUser.phoneNumber)
      .slice(0, 5);

    const result = await request(cellphoneRouteBaseUrl, addContactRoute, user1);

    logger.log(result);

    // users.forEach(async (user) => {
    // const result = await request(
    // cellphoneRouteBaseUrl,
    // addContactRoute,
    // user
    // );
    // logger.log(user, result);
    // });
  });
});

/* ${user.countryCode}:${user.phoneNumber}:${user.countryName} */
