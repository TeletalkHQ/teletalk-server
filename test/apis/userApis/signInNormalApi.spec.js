const { request } = require("~/functions/utilities/testUtils");

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

describe("signInNormalApi test", () => {
  describe("sign in as normal user", () => {});

  it(`It should get success code ${signInNormal.properties.statusCode}`, async () => {
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

    return response;
  });

  it(`It should get all countries`, async () => {
    const response = await request(otherRoutesBaseUrl, countries);
  });
});
