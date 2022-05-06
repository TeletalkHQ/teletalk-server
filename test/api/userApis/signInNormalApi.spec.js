const { request, expect } = require("@/functions/utilities/testUtils");
const {
  setEnvironment,
  randomStringNumber,
  randomCountryCode,
} = require("@/functions/utilities/utilsNoDeps");

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
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
      COUNTRY_CODE_NOT_SUPPORTED: { properties: COUNTRY_CODE_NOT_SUPPORTED },
      COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
      COUNTRY_CODE_NUMERIC: { properties: COUNTRY_CODE_NUMERIC },
      COUNTRY_NAME_NOT_SUPPORTED: { properties: COUNTRY_NAME_NOT_SUPPORTED },
      COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
      PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
      PHONE_NUMBER_NUMERIC: { properties: PHONE_NUMBER_NUMERIC },
      PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
    },
  },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const {
  userModels: {
    properties: {
      verificationCodeModel: { properties: verificationCodeModel },
    },
  },
} = require("@/models/userModels/userModels");

const cellphone = {
  ...countries[randomCountryCode()],
  phoneNumber: randomStringNumber(10),
};

const myRequest = (data, errorObject) => {
  return request(userRouteBaseUrl, signInNormalRoute, data, errorObject);
};

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verify code`, async () => {
    const requestBody = {
      phoneNumber: cellphone.phoneNumber,
      countryName: cellphone.countryName,
      countryCode: cellphone.countryCode,
    };

    const response = await request(
      userRouteBaseUrl,
      signInNormalRoute,
      requestBody
    );

    const { countryCode, countryName, phoneNumber, verificationCode, token } =
      response.body;

    expect(countryCode).equal(requestBody.countryCode);
    expect(countryName).equal(requestBody.countryName);
    expect(phoneNumber).equal(requestBody.phoneNumber);
    expect(verificationCode).length(verificationCodeModel.length.value);

    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE, verificationCode);
    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN, token);
  });
});

describe("signInNormalApi test failure requests", () => {
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await myRequest({}, CELLPHONE_REQUIRED);
  });

  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: cellphone.countryName,
      },
      PHONE_NUMBER_REQUIRED
    );
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: cellphone.countryName,
        phoneNumber: 9119119191,
      },
      PHONE_NUMBER_INVALID_TYPE
    );
  });
  it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: cellphone.countryName,
        phoneNumber: "9119119191!",
      },
      PHONE_NUMBER_NUMERIC
    );
  });

  it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
    await myRequest(
      {
        phoneNumber: cellphone.phoneNumber,
        countryName: cellphone.countryName,
      },
      COUNTRY_CODE_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
    await myRequest(
      {
        phoneNumber: cellphone.phoneNumber,
        countryName: cellphone.countryName,
        countryCode: "98!",
      },
      COUNTRY_CODE_NUMERIC
    );
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await myRequest(
      {
        phoneNumber: cellphone.phoneNumber,
        countryName: cellphone.countryName,
        countryCode: 98,
      },
      COUNTRY_CODE_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
    await myRequest(
      {
        phoneNumber: cellphone.phoneNumber,
        countryName: cellphone.countryName,
        countryCode: "010101",
      },
      COUNTRY_CODE_NOT_SUPPORTED
    );
  });

  it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
    await myRequest(
      {
        phoneNumber: cellphone.phoneNumber,
        countryCode: cellphone.countryCode,
      },
      COUNTRY_NAME_REQUIRED
    );
  });

  it(`It should get error, COUNTRY_NAME_NOT_SUPPORTED`, async () => {
    await myRequest(
      {
        phoneNumber: cellphone.phoneNumber,
        countryCode: cellphone.countryCode,
        countryName: "Something wrong!",
      },
      COUNTRY_NAME_NOT_SUPPORTED
    );
  });
});
