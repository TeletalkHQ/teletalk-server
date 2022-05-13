const { userProps } = require("@/functions/helpers/UserProps");
const { randomString } = require("@/functions/utilities/utils");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const { firstNameFailureTests } = require("$/api/userTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/userTests/lastNameTests");

const {
  userRoutes: { userRouteBaseUrl, createNewUserRoute },
} = require("@/variables/routes/userRoutes");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const lastNameMaxLength = lastNameModel.maxlength.value;
const firstNameMaxLength = firstNameModel.maxlength.value;

describe("", () => {
  it("should test routes properties for CustomRequest", async () => {
    customRequest.setBaseUrl(userRouteBaseUrl);
    customRequest.setRouteObject(createNewUserRoute);
  });
});

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    await customRequest.sendRequest(
      userProps.makeFullName(
        randomString(firstNameMaxLength),
        randomString(lastNameMaxLength)
      )
    );
  });
});

describe("failure tests for create new normal user", () => {
  firstNameFailureTests(userProps.makeTestFullName());
  lastNameFailureTests(userProps.makeTestFullName());
});
