const request = require("supertest")(require("@/app").app);
const { expect } = require("chai");

const {
  getAllEnvironments,
  errorThrower,
  getEnvironment,
  setEnvironment,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userRoutes: {
    properties: {
      verifySignInNormalRoute: { properties: verifySignInNormalRoute },
      createNewUserRoute: { properties: createNewUserRoute },
    },
  },
} = require("@/variables/routes/userRoutes");
const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const myRequest = async (
  baseUrl,
  routeObject,
  data,
  errorObject = {},
  withoutToken
) => {
  try {
    const response = await testRequest(
      {
        ...routeObject,
        url: `${baseUrl.url}${routeObject.url}`,
      },
      data,
      withoutToken
    );

    const statusCode = errorObject?.statusCode || routeObject?.statusCode;
    expect(response.statusCode).to.equal(statusCode);
    if (response.body?.statusCode) {
      expect(response.body.statusCode).to.equal(statusCode);
    }

    if (statusCode > 299) {
      errorThrower(
        Object.keys(errorObject).length < 4,
        "UnknownError, you need to send me correct error object"
      );

      // logger.log("response.body:", response.body);

      const { errorKey, errorCode, errorReason } = errorObject;

      logger.log(
        `errorKey ${routeObject.url} ${errorObject.reason}`,
        errorKey,
        response.body
      );

      expect(response.body.errors[errorKey]?.errorReason).to.equal(errorReason);
      expect(response.body.errors[errorKey]?.errorCode).to.equal(errorCode);
    }

    return response;
  } catch (error) {
    logger.log("myRequest catch, error:", error);
    throw error;
  }
};

const testRequest = (requestObject, data, withoutToken) => {
  try {
    const { method, url } = requestObject;
    const { TEST_VERIFY_TOKEN, TEST_MAIN_TOKEN } = getAllEnvironments();

    const response = request[method](url)
      .send(data)
      .set("Content-Type", "application/json");

    if (!withoutToken) {
      if (
        requestObject.url.includes(verifySignInNormalRoute.url) ||
        requestObject.url.includes(createNewUserRoute.url)
      ) {
        response.set(...setTestRequestToken(TEST_VERIFY_TOKEN));
      } else {
        response.set(...setTestRequestToken(TEST_MAIN_TOKEN));
      }
    }

    return response;
  } catch (error) {
    logger.log("testRequest catch, error:", testRequest);
  }
};

const setTestRequestToken = (token) => ["Authorization", `Bearer ${token}`];

const getTestMainToken = () => {
  return getEnvironment(ENVIRONMENT_KEYS.TEST_MAIN_TOKEN);
};

const setTestMainToken = (token) => {
  setEnvironment(ENVIRONMENT_KEYS.TEST_MAIN_TOKEN, token);
};

const setTestUser = (user) => setEnvironment(ENVIRONMENT_KEYS.TEST_USER, user);

const setTestUserAndTestToken = (user) => {
  setTestUser(user);
  setTestMainToken(user.tokens[0].token);
};

module.exports = {
  expect,
  getTestMainToken,
  request: myRequest,
  setTestMainToken,
  setTestUserAndTestToken,
  testRequest,
};
