const { request, expect } = require("~/functions/utilities/testUtils");
const { getEnvironment } = require("~/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: {
      FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
      LAST_NAME_MINLENGTH_REACH: { properties: LAST_NAME_MINLENGTH_REACH },
      LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
      FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
      FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
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

describe("success create new normal user", () => {
  it("It should create new user in db", async () => {
    const response = await request(
      userRouteBaseUrl,
      createNewUserRoute,
      userFullName("soheil", "ss")
    );
  });
});
