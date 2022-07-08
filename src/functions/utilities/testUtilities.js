const supertest = require("supertest")(require("@/app").app);
const { expect } = require("chai");

const { customTypeof } = require("@/classes/CustomTypeof");
const { stateManager } = require("@/classes/StateManager");
const { userProps } = require("@/classes/UserProps");

const {
  errorThrower,
  filterObject,
  getObjectLength,
} = require("@/functions/utilities/utils");

const request = async (
  routeObject,
  data,
  errorObject = {},
  { token, filterDataCondition = true } = {
    token: "",
    filterDataCondition: true,
  }
) => {
  try {
    // logger.log(
    // "//rm",
    //   "data: ",
    //   data,
    //   "\n",
    //   "routeObject data: ",
    //   routeObject.inputFields[0],
    //   "\n",
    //   "filterObject: ",
    //   filterObject(data, routeObject.inputFields[0])
    // );

    const response = await superTestRequest(
      routeObject,
      filterDataCondition
        ? filterObject(data, routeObject.inputFields[0])
        : data,
      makeAuthorizationHeader(token)
    );

    const statusCode = errorObject?.statusCode || routeObject?.statusCode;
    expect(response.statusCode).to.equal(statusCode);
    if (response.body?.statusCode) {
      expect(response.body.statusCode).to.equal(statusCode);
    }

    if (statusCode > 299) {
      errorThrower(
        getObjectLength(errorObject) < 4,
        "UnknownError, you need to send me correct error object"
      );

      const { errorKey, errorCode, errorReason } = errorObject;

      logger.log(
        `route specs=> url:${routeObject.fullUrl} reason:${errorObject.reason} errorKey:${errorKey}\n response.body:`,
        response.body
      );

      expect(response.body.errors[errorKey]?.errorReason).to.equal(errorReason);
      expect(response.body.errors[errorKey]?.errorCode).to.equal(errorCode);
    }

    return response;
  } catch (error) {
    logger.log("myRequest catch, error:", error);
    errorThrower(error, error);
  }
};

const superTestRequest = (routeObject, data, authorization) => {
  try {
    const { method, fullUrl } = routeObject;

    const response = supertest[method](fullUrl)
      .send(data)
      .set("Content-Type", "application/json")
      .set(...authorization);

    return response;
  } catch (error) {
    logger.log("testRequest catch, error:", superTestRequest);
  }
};

const makeAuthorizationHeader = (token) => [
  "Authorization",
  customTypeof.check(token).type.undefined ? null : `Bearer ${token}`,
];

const getTokenByTestUserNumber = (testUserNumber) => {
  const { testUsers } = stateManager.state;
  const user = testUsers[`testUser_${testUserNumber}`];
  return userProps.getTokenFromUserObjectByParam(user);
};

module.exports = {
  expect,
  getTokenByTestUserNumber,
  request,
  testRequest: superTestRequest,
};
