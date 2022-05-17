const { customRequest } = require("@/functions/helpers/CustomRequest");
const { userProps } = require("@/functions/helpers/UserProps");

const {
  firstNameFailureTests,
  firstNameSuccessTests,
} = require("$/api/generalTests/firstNameTests");
const {
  lastNameFailureTests,
  lastNameSuccessTests,
} = require("$/api/generalTests/lastNameTests");
const {
  countryCodeSuccessTests,
} = require("$/api/generalTests/countryCodeTests");
const {
  countryNameSuccessTests,
} = require("$/api/generalTests/countryNameTests");

const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");

const {
  userRoutes: { userRouteBaseUrl, createNewUserRoute },
} = require("@/variables/routes/userRoutes");

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
        user: {
          countryCode,
          countryName,
          firstName,
          lastName,
          mainToken,
          phoneNumber,
          privateId,
        },
      },
    } = await customRequest.sendRequest(userProps.makeTestFullName());

    countryCodeSuccessTests(
      { countryCodeTest: countryCode },
      { modelCheck: true }
    );

    countryNameSuccessTests(
      { countryNameTest: countryName },
      { modelCheck: true }
    );

    firstNameSuccessTests({ firstNameTest: firstName }, { modelCheck: true });
    lastNameSuccessTests({ lastNameTest: lastName }, { modelCheck: true });
  });
});

describe("failure tests for create new normal user", () => {
  firstNameFailureTests(userProps.makeTestFullName());
  lastNameFailureTests(userProps.makeTestFullName());
  authenticationFailureTests();
});
