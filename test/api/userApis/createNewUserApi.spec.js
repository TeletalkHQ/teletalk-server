const { userProps } = require("@/functions/helpers/UserProps");

const { firstNameFailureTests } = require("$/api/generalTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/generalTests/lastNameTests");

const {
  userRoutes: { userRouteBaseUrl, createNewUserRoute },
} = require("@/variables/routes/userRoutes");
const { customRequest } = require("@/functions/helpers/CustomRequest");

describe("", () => {
  it("should test routes properties for CustomRequest", async () => {
    customRequest.setBaseUrl(userRouteBaseUrl);
    customRequest.setRouteObject(createNewUserRoute);
  });
});

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    await customRequest.sendRequest(userProps.makeTestFullName());
  });
});

describe("failure tests for create new normal user", () => {
  firstNameFailureTests(userProps.makeTestFullName());
  lastNameFailureTests(userProps.makeTestFullName());
});
