const { request } = require("@/functions/utilities/testUtils");
const {
  randomString,
  makeFullName,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userModels: {
    properties: {
      firstNameModel: { properties: firstNameModel },
      lastNameModel: { properties: lastNameModel },
    },
  },
} = require("@/models/userModels/userModels");

const { firstNameFailureTests } = require("$/api/userTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/userTests/lastNameTests");

const {
  userRoutes: {
    properties: {
      userRouteBaseUrl: { properties: userRouteBaseUrl },
      createNewUserRoute: { properties: createNewUserRoute },
    },
  },
} = require("@/variables/routes/userRoutes");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const lastNameMaxLength = lastNameModel.maxlength.value;
const firstNameMaxLength = firstNameModel.maxlength.value;

describe("", () => {
  it("should test routes properties for customRequest", async () => {
    customRequest.setBaseUrl(userRouteBaseUrl);
    customRequest.setRouteObject(createNewUserRoute);
  });
});

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    await request(
      userRouteBaseUrl,
      createNewUserRoute,
      makeFullName(
        randomString(firstNameMaxLength),
        randomString(lastNameMaxLength)
      )
    );
  });
});

describe("failure tests for create new normal user", () => {
  firstNameFailureTests({});
  lastNameFailureTests({});
});
