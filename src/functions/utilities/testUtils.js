const request = require("supertest")(require("~/app").app);

const { expect } = require("chai");
const { getAllEnvironments } = require("~/functions/utilities/utilsNoDeps");

const {
  userRoutes: {
    properties: { verifySignInNormalRoute },
  },
} = require("~/variables/routes/userRoutes");

const myRequest = async (
  { properties: baseUrl },
  { properties: routeObject },
  data,
  { properties: errorObject } = {},
  errorKey,
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
    if (response.body?.statusCode)
      expect(response.body.statusCode).to.equal(statusCode);

    if (statusCode > 299) {
      logger.log(response.body);
      const errorCode = errorObject?.errorCode;
      const errorReason = errorObject?.reason;
      expect(response.body.errors[errorKey]?.errorCode).to.equal(errorCode);

      expect(response.body.errors[errorKey]?.reason).to.equal(errorReason);
    }

    return response;
  } catch (error) {
    logger.log("myRequest catch, error:", error);
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
      if (requestObject.url.includes(verifySignInNormalRoute.properties.url)) {
        response.set(...setTestToken(TEST_VERIFY_TOKEN));
      } else {
        response.set(...setTestToken(TEST_MAIN_TOKEN));
      }
    }

    return response;
  } catch (error) {
    logger.log("testRequest catch, error:", testRequest);
  }
};

const setTestToken = (token) => ["Authorization", `Bearer ${token}`];

module.exports = { request: myRequest, testRequest, expect };
