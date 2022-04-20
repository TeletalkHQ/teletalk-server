const expect = require("chai").expect;

const { request } = require("~/functions/utilities/testUtils");
const { setEnvironment } = require("~/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userRoutes: {
    properties: { baseUrl: userRoutesBaseUrl, signInNormal },
  },
} = require("~/variables/routes/userRoutes");
const {
  userErrors: {
    properties: { CELLPHONE_REQUIRED, CELLPHONE_INVALID_TYPE },
  },
} = require("~/variables/errors/userErrors");

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verify code`, async () => {
    const response = await request(userRoutesBaseUrl, signInNormal, {
      phoneNumber: "1012700470",
      countryName: "iran",
      countryCode: "98",
    });

    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN, response.token);
  });
});

describe("signInNormalApi test failure requests", () => {
  it(`It should get error, cellphone required`, async () => {
    const response = await request(
      userRoutesBaseUrl,
      signInNormal,
      {},
      CELLPHONE_INVALID_TYPE
    );
    const routeObject = signInNormal.properties;
    const errorObject = CELLPHONE_INVALID_TYPE.properties;

    const errorCode = errorObject?.errorCode;
    const errorReason = errorObject?.reason;
    const statusCode = errorObject?.statusCode || routeObject?.statusCode;

    logger.log("response.body", response.body);
    expect(response.body?.statusCode).to.equal(statusCode);

    if (errorCode)
      expect(response.body.errors.cellphoneValidation?.errorCode).to.equal(
        errorCode
      );

    if (errorReason)
      expect(response.body.errors.cellphoneValidation?.reason).to.equal(
        errorReason
      );
  });
});
