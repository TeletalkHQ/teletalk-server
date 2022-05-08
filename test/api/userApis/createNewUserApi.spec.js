const { request } = require("@/functions/utilities/testUtils");
const {
  randomString,
  makeFullName,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const { firstNameFailureTests } = require("$/api/userTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/userTests/lastNameTests");

const {
  userRoutes: { userRouteBaseUrl, createNewUserRoute },
} = require("@/variables/routes/userRoutes");
const { CustomRequest } = require("@/functions/helpers/CustomRequest");

const lastNameMaxLength = lastNameModel.maxlength.value;
const firstNameMaxLength = firstNameModel.maxlength.value;

describe("", () => {
  it("should test routes properties for CustomRequest", async () => {
    CustomRequest.setBaseUrl(userRouteBaseUrl);
    CustomRequest.setRouteObject(createNewUserRoute);
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
