const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomStringNumber } = require("@/functions/utilities/utils");
const { expect } = require("@/functions/testUtilities/testUtils");

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
  { stringEquality, modelCheck } = {}
) => {
  if (stringEquality) {
    expect(phoneNumberTest.length).equal(phoneNumberMain.length);
    expect(phoneNumberMain).equal(phoneNumberTest);
  }

  if (modelCheck) {
    expect(phoneNumberTest).to.be.an(phoneNumberModel.type.value);

    if (phoneNumberModel.empty.value === false)
      expect(phoneNumberTest.length).to.be.greaterThan(0);

    expect(phoneNumberTest.length).greaterThanOrEqual(phoneNumberMinlength);
    expect(phoneNumberTest.length).lessThanOrEqual(phoneNumberMaxlength);

    expect(+phoneNumberTest).to.be.an("number");
  }
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
      fn(randomStringNumber(phoneNumberMinlength - 1)),
      PHONE_NUMBER_MINLENGTH_REACH
    );
  });
  it(`It should get error, PHONE_NUMBER_MAXLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomStringNumber(phoneNumberMaxlength + 1)),
      PHONE_NUMBER_MAXLENGTH_REACH
    );
  });
};

module.exports = { phoneNumberFailureTests, phoneNumberSuccessTests };
