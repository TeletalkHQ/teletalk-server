const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { testBuilder } = require("@/classes/TestBuilder");

const {
  userModels: { phoneNumberModel },
} = require("@/models/userModels/userModels");
const {
  userErrors: {
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const phoneNumberMaxlength = phoneNumberModel.maxlength.value;
const phoneNumberMinlength = phoneNumberModel.minlength.value;

const phoneNumberSuccessTests = (
  { phoneNumberMain, phoneNumberTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  testBuilder
    .create()
    .setVariables(phoneNumberModel, phoneNumberMain, phoneNumberTest)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .execute();
};

const phoneNumberFailureTests = (configuredCustomRequest, data) => {
  const fn = (phoneNumber) => ({ ...data, phoneNumber });
  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(""),
      PHONE_NUMBER_REQUIRED
    );
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomNumber(phoneNumberMaxlength)),
      PHONE_NUMBER_INVALID_TYPE
    );
  });
  it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomString(phoneNumberMaxlength - 1) + "!"),
      PHONE_NUMBER_NUMERIC
    );
  });
  it(`It should get error, PHONE_NUMBER_MINLENGTH_REACH`, async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomStringNumber(phoneNumberMinlength - 1)),
      PHONE_NUMBER_MINLENGTH_REACH
    );
  });
  it(`It should get error, PHONE_NUMBER_MAXLENGTH_REACH`, async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomStringNumber(phoneNumberMaxlength + 1)),
      PHONE_NUMBER_MAXLENGTH_REACH
    );
  });
};

module.exports = { phoneNumberFailureTests, phoneNumberSuccessTests };
