const { expect } = require("@/functions/utilities/testUtils");
const { envManager } = require("@/functions/utilities/EnvironmentManager");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  userRoutes: { userRouteBaseUrl, signInNormalRoute },
} = require("@/variables/routes/userRoutes");

const {
  userModels: { verificationCodeModel },
} = require("@/models/userModels/userModels");

const {
  countryCodeFailureTests,
} = require("$/api/generalTests/countryCodeTests");
const {
  countryNameFailureTests,
} = require("$/api/generalTests/countryNameTests");
const {
  phoneNumberFailureTests,
} = require("$/api/generalTests/phoneNumberTests");
const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");

const cellphone = userProps.makeTestCellphone();

describe("", () => {
  it("should set routes properties", async () => {
    customRequest.setRequestRequirements(userRouteBaseUrl, signInNormalRoute);
  });
});

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verify code`, async () => {
    const {
      body: {
        user: { countryCode, countryName, phoneNumber, verifyToken },
      },
    } = await customRequest.sendRequest(cellphone);

    const verificationCode = envManager.getTestVerificationCode();

    expect(countryCode).equal(cellphone.countryCode);
    expect(countryName).equal(cellphone.countryName);
    expect(phoneNumber).equal(cellphone.phoneNumber);
    expect(verificationCode).length(verificationCodeModel.length.value);

    envManager.setTestVerifyToken(verifyToken);
  });
});

describe("signInNormalApi test failure requests", () => {
  cellphoneFailureTests(cellphone);
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
});
