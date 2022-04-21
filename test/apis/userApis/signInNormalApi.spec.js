const expect = require("chai").expect;

const { request } = require("~/functions/utilities/testUtils");
const { setEnvironment } = require("~/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userRoutes: {
    properties: { baseUrl: userRoutesBaseUrl, signInNormal },
  },
} = require("~/variables/routes/userRoutes");
const {
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED,
      PHONE_NUMBER_REQUIRED,
      COUNTRY_CODE_REQUIRED,
      COUNTRY_NAME_REQUIRED,
      COUNTRY_CODE_INVALID_TYPE,
      PHONE_NUMBER_INVALID_TYPE,
    },
  },
} = require("~/variables/errors/userErrors");
const { countries } = require("~/variables/constants/countries");

const country = countries[0];

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verify code`, async () => {
    const response = await request(userRoutesBaseUrl, signInNormal, {
      phoneNumber: "9012700470",
      countryName: "Iran, Islamic Republic of" || country.countryName,
      countryCode: "98" || country.countryCode,
    });
    setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN, response.token);
  });
});

describe("signInNormalApi test failure requests", () => {
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await request(
      userRoutesBaseUrl,
      signInNormal,
      {},
      CELLPHONE_REQUIRED,
      "cellphoneValidation"
    );
  });

  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await request(
      userRoutesBaseUrl,
      signInNormal,
      { countryCode: country.countryCode, countryName: country.countryName },
      PHONE_NUMBER_REQUIRED,
      "phoneNumberValidation"
    );
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await request(
      userRoutesBaseUrl,
      signInNormal,
      {
        countryCode: country.countryCode,
        countryName: country.countryName,
        phoneNumber: "101270047!",
      },
      PHONE_NUMBER_INVALID_TYPE,
      "phoneNumberValidation"
    );
  });

  it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
    await request(
      userRoutesBaseUrl,
      signInNormal,
      { phoneNumber: "9119119191", countryName: country.countryName },
      COUNTRY_CODE_REQUIRED,
      "countryCodeValidation"
    );
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await request(
      userRoutesBaseUrl,
      signInNormal,
      {
        phoneNumber: "9119119191",
        countryName: country.countryName,
        countryCode: "zoot!",
      },
      COUNTRY_CODE_INVALID_TYPE,
      "countryCodeValidation"
    );
  });

  it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
    await request(
      userRoutesBaseUrl,
      signInNormal,
      { phoneNumber: "9119119191", countryCode: country.countryCode },
      COUNTRY_NAME_REQUIRED,
      "countryNameValidation"
    );
  });
});
