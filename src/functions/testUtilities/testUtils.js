const supertest = require("supertest")(require("@/app").app);
const { expect } = require("chai");

const { stateManager } = require("@/functions/tools/StateManager");
const {
  errorThrower,
  getObjectLength,
  filterObject,
  concatBaseUrlWithUrl,
  customTypeof,
} = require("@/functions/utilities/utils");

const {
  initialValue: { stateKeys },
} = require("@/variables/constants/initialValues/initialValue");

const request = async (
  baseUrl,
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

    const response = await testRequest(
      {
        ...routeObject,
        url: concatBaseUrlWithUrl(baseUrl, routeObject),
      },
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
        `route specs=> url:${routeObject.url} reason:${errorObject.reason} errorKey:${errorKey}\n response.body:`,
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

const testRequest = (routeObject, data, authorization) => {
  try {
    const { method, url } = routeObject;

    const response = supertest[method](url)
      .send(data)
      .set("Content-Type", "application/json")
      .set(...authorization);

    return response;
  } catch (error) {
    logger.log("testRequest catch, error:", testRequest);
  }
};

const makeAuthorizationHeader = (token) => [
  "Authorization",
  customTypeof(token).type.undefined ? null : `Bearer ${token}`,
];

const getTestUsersFromState = () => {
  return stateManager.state.testUsers;
};
const setTestUsersIntoState = async (testUsers) => {
  return await stateManager.setStateObject(stateKeys.testUsers, testUsers);
};

module.exports = {
  expect,
  getTestUsersFromState,
  request,
  setTestUsersIntoState,
  testRequest,
};
