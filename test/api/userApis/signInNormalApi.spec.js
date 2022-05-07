const {
  expect,
  makeTestCellphone,
} = require("@/functions/utilities/testUtils");
const { setEnvironment } = require("@/functions/utilities/utilsNoDeps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");
const {
  userRoutes: {
    properties: {
      userRouteBaseUrl: { properties: userRouteBaseUrl },
      signInNormalRoute: { properties: signInNormalRoute },
    },
  },
} = require("@/variables/routes/userRoutes");

const {
  userModels: {
    properties: {
      verificationCodeModel: { properties: verificationCodeModel },
    },
  },
} = require("@/models/userModels/userModels");

const { countryCodeFailureTests } = require("$/api/userTests/countryCodeTests");
const { countryNameFailureTests } = require("$/api/userTests/countryNameTests");
const { phoneNumberFailureTests } = require("$/api/userTests/phoneNumberTests");
const { cellphoneFailureTests } = require("$/api/userTests/cellphoneTests");

const cellphone = makeTestCellphone();

describe("", () => {
  it("should set routes properties", async () => {
    customRequest.setBaseUrl(userRouteBaseUrl);
    customRequest.setRouteObject(signInNormalRoute);
  });
});

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verify code`, async () => {
    const response = await customRequest.sendRequest(cellphone);

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
