const { request, expect } = require("~/functions/utilities/testUtils");
const {
  getEnvironment,
  randomString,
} = require("~/functions/utilities/utilsNoDeps");

const {
  userModel: {
    properties: {
      firstNameModel: { properties: firstNameModel },
      lastNameModel: { properties: lastNameModel },
    },
  },
} = require("~/models/userModels/userModel");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: {
      FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
      FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
      FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
      LAST_NAME_MINLENGTH_REACH: { properties: LAST_NAME_MINLENGTH_REACH },
      LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
    },
  },
} = require("~/variables/errors/userErrors");
const {
  userRoutes: {
    properties: {
      userRouteBaseUrl: { properties: userRouteBaseUrl },
      createNewUserRoute: { properties: createNewUserRoute },
    },
  },
} = require("~/variables/routes/userRoutes");

const userFullName = (firstName, lastName) => ({ firstName, lastName });

const myRequest = (data, errorObject) => {
  return request(userRouteBaseUrl, createNewUserRoute, data, errorObject);
};

describe("success create new normal user", () => {
  it("It should create new user in db", async () => {
    await request(
      userRouteBaseUrl,
      createNewUserRoute,
      userFullName("soheil", "ss")
    );
  });
});

describe("failure tests for create new normal user", () => {
  const lastNameMaxLength = lastNameModel.maxlength.value;
  const lastNameMinLength = lastNameModel.minlength.value;
  const firsNameMaxLength = firstNameModel.maxlength.value;
  const firstNameMinLength = firstNameModel.minlength.value;

  it("it should get error, FIRST_NAME_REQUIRED", async () => {
    const response = await myRequest(
      userFullName(null, randomString(randomString(lastNameMaxLength))),
      FIRST_NAME_REQUIRED
    );
  });

  it("it should get error, FIRST_NAME_MINLENGTH_REACH", async () => {
    const response = await myRequest(
      userFullName(randomString(+firstNameMinLength - 1)),
      FIRST_NAME_MINLENGTH_REACH
    );
  });

  it("it should get error, FIRST_NAME_MAXLENGTH_REACH", async () => {
    const response = await myRequest(
      userFullName(randomString(+firsNameMaxLength + 1)),
      FIRST_NAME_MAXLENGTH_REACH
    );
  });

  it("it should get error, LAST_NAME_MINLENGTH_REACH", async () => {
    const response = await myRequest(
      userFullName(
        randomString(firsNameMaxLength),
        randomString(lastNameMinLength - 1)
      ),
      LAST_NAME_MINLENGTH_REACH
    );
  });

  it("it should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    const response = await myRequest(
      userFullName(
        randomString(firsNameMaxLength),
        randomString(lastNameMaxLength + 1)
      ),
      LAST_NAME_MAXLENGTH_REACH
    );
  });
});
