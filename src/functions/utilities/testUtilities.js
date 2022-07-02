const supertest = require("supertest")(require("@/app").app);
const { expect } = require("chai");

const { customTypeof } = require("@/classes/CustomTypeof");
const { stateManager } = require("@/classes/StateManager");

const {
  errorThrower,
  getObjectLength,
  filterObject,
  concatBaseUrlWithUrl,
} = require("@/functions/utilities/utils");

const {
  initialOptions: { stateKeys },
} = require("@/variables/others/initialOptions");

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

    const response = await superTestRequest(
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

const superTestRequest = (routeObject, data, authorization) => {
  try {
    const { method, url } = routeObject;

    const response = supertest[method](url)
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

//CLEANME move this methods to stateManager
const getTestUsersFromState = () => {
  return stateManager.state.testUsers;
};
const setTestUsersIntoState = async (testUsers) => {
  return await stateManager.setStateObject(stateKeys.testUsers, testUsers);
};

const getTokenByTestUserNumber = (testUserNumber) => {
  const testUsers = getTestUsersFromState();

  logger.log("rm", testUsers[`testUser_${testUserNumber}`]);
  return testUsers[`testUser_${testUserNumber}`]?.tokens[0]?.mainToken;
};

module.exports = {
  expect,
  getTestUsersFromState,
  getTokenByTestUserNumber,
  request,
  setTestUsersIntoState,
  testRequest: superTestRequest,
};
