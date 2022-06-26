const { customRequest } = require("@/classes/CustomRequest");
const { randomMaker } = require("@/classes/RandomMaker");
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

const phoneNumberMaxlength = phoneNumberModel.maxlength.value;
const phoneNumberMinlength = phoneNumberModel.minlength.value;

const phoneNumberSuccessTests = (
  { phoneNumberMain, phoneNumberTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
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

const phoneNumberFailureTests = (data) => {
  const fn = (phoneNumber) => ({ ...data, phoneNumber });
  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await customRequest.sendRequest(fn(""), PHONE_NUMBER_REQUIRED);
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await customRequest.sendRequest(fn(9119119191), PHONE_NUMBER_INVALID_TYPE);
  });
  it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
    await customRequest.sendRequest(fn("9119119191!"), PHONE_NUMBER_NUMERIC);
  });
  it(`It should get error, PHONE_NUMBER_MINLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomStringNumber(phoneNumberMinlength - 1)),
      PHONE_NUMBER_MINLENGTH_REACH
    );
  });
  it(`It should get error, PHONE_NUMBER_MAXLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomStringNumber(phoneNumberMaxlength + 1)),
      PHONE_NUMBER_MAXLENGTH_REACH
    );
  });
};

module.exports = { phoneNumberFailureTests, phoneNumberSuccessTests };
