const { expect } = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const {
  setEnvironment,
  getEnvironment,
} = require("@/functions/utilities/utils");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");
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
    customRequest.setBaseUrl(userRouteBaseUrl);
    customRequest.setRouteObject(signInNormalRoute);
  });
});

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verify code`, async () => {
    const response = await customRequest.sendRequest(cellphone);

    const {
      user: { countryCode, countryName, phoneNumber, verifyToken },
    } = response.body;

    const verificationCode = getEnvironment(
      ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE
    );

    expect(countryCode).equal(cellphone.countryCode);
    expect(countryName).equal(cellphone.countryName);
    expect(phoneNumber).equal(cellphone.phoneNumber);
    expect(verificationCode).length(verificationCodeModel.length.value);

    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN, verifyToken);
  });
});

describe("signInNormalApi test failure requests", () => {
  cellphoneFailureTests();
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
});
