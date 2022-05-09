const { expect } = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { setEnvironment } = require("@/functions/utilities/utilsNoDeps");
const { CustomRequest } = require("@/functions/helpers/CustomRequest");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");
const {
  userRoutes: { userRouteBaseUrl, signInNormalRoute },
} = require("@/variables/routes/userRoutes");

const {
  userModels: { verificationCodeModel },
} = require("@/models/userModels/userModels");

const { countryCodeFailureTests } = require("$/api/userTests/countryCodeTests");
const { countryNameFailureTests } = require("$/api/userTests/countryNameTests");
const { phoneNumberFailureTests } = require("$/api/userTests/phoneNumberTests");
const { cellphoneFailureTests } = require("$/api/userTests/cellphoneTests");

const cellphone = userProps.makeTestCellphone();

describe("", () => {
  it("should set routes properties", async () => {
    CustomRequest.setBaseUrl(userRouteBaseUrl);
    CustomRequest.setRouteObject(signInNormalRoute);
  });
});

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verify code`, async () => {
    const response = await CustomRequest.sendRequest(cellphone);

    const { countryCode, countryName, phoneNumber, verificationCode, token } =
      response.body;

    expect(countryCode).equal(cellphone.countryCode);
    expect(countryName).equal(cellphone.countryName);
    expect(phoneNumber).equal(cellphone.phoneNumber);
    expect(verificationCode).length(verificationCodeModel.length.value);

    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE, verificationCode);
    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN, token);
  });
});

describe("signInNormalApi test failure requests", () => {
  cellphoneFailureTests();
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
});
