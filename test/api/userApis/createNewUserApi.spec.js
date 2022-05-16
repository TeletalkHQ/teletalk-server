const { expect } = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");

const { firstNameFailureTests } = require("$/api/generalTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/generalTests/lastNameTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");

const {
  userRoutes: { userRouteBaseUrl, createNewUserRoute },
} = require("@/variables/routes/userRoutes");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  userModels: {
    countryCodeModel,
    countryNameModel,
    phoneNumberModel,
    firstNameModel,
    lastNameModel,
    privateIdModel,
    tokenModel,
    contactsModel,
    blacklistModel,
    bioModel,
    createdAtModel,
    macAddressModel,
    usernameModel,
  },
} = require("@/models/userModels/userModels");

describe("", () => {
  it("should test routes properties for CustomRequest", async () => {
    customRequest.setRequestRequirements(userRouteBaseUrl, createNewUserRoute);
    customRequest.setVerifyTokenFromEnv();
  });
});

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    const {
      body: {
        countryCode,
        countryName,
        firstName,
        lastName,
        mainToken,
        phoneNumber,
        privateId,
      },
    } = await customRequest.sendRequest(userProps.makeTestFullName());
    // expect(countryCode.length);
  });
});

describe("failure tests for create new normal user", () => {
  firstNameFailureTests(userProps.makeTestFullName());
  lastNameFailureTests(userProps.makeTestFullName());
  authenticationFailureTests();
});
