const { request } = require("~/functions/utilities/testUtils");
const { setEnvironment } = require("~/functions/utilities/utilsNoDeps");
const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");

const {
  userErrors: {
    properties: { CELLPHONE_REQUIRED },
  },
} = require("~/variables/errors/userErrors");
const {
  otherRoutes: {
    properties: { baseUrl: otherRoutesBaseUrl, countries },
  },
} = require("~/variables/routes/otherRoutes");

const {
  userRoutes: {
    properties: { baseUrl: userRoutesBaseUrl, signInNormal },
  },
} = require("~/variables/routes/userRoutes");

describe("signInNormalApi test", (done) => {
  it(`It should get sign in data like token and verify code`, async () => {
    const response = await request(
      userRoutesBaseUrl,
      signInNormal,
      {
        phoneNumber: "1012700470",
        countryName: "iran",
        countryCode: "98",
      },
      CELLPHONE_REQUIRED
    );

    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN, response.token);

    done();
  });

  it(`It should get all countries`, async () => {
    const response = await request(otherRoutesBaseUrl, countries);
  });
});
