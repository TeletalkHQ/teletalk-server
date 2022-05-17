const { customRequest } = require("@/functions/helpers/CustomRequest");
const { expect } = require("@/functions/utilities/testUtils");
const { randomStringNumber } = require("@/functions/utilities/utils");

const {
  userModels: { countryCodeModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NOT_SUPPORTED,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const countryCodeMaxlength = countryCodeModel.maxlength.value;
const countryCodeMinlength = countryCodeModel.minlength.value;

const countryCodeSuccessTests = (
  { countryCodeMain, countryCodeTest } = {},
  { stringEquality, modelCheck } = {}
) => {
  if (stringEquality) {
    expect(countryCodeTest.length).equal(countryCodeMain.length);
    expect(countryCodeMain).equal(countryCodeTest);
  }

  if (modelCheck) {
    expect(countryCodeTest).to.be.an(countryCodeModel.type.value);

    if (countryCodeModel.empty.value === false)
      expect(countryCodeTest.length).to.be.greaterThan(0);

    expect(countryCodeTest.length).greaterThanOrEqual(countryCodeMinlength);
    expect(countryCodeTest.length).lessThanOrEqual(countryCodeMaxlength);

    expect(+countryCodeTest).to.be.an("number");
  }
};

const countryCodeFailureTests = (data) => {
  const fn = (countryCode) => ({ ...data, countryCode });

  it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
    await customRequest.sendRequest(fn(""), COUNTRY_CODE_REQUIRED);
  });
  it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
    await customRequest.sendRequest(fn("98!"), COUNTRY_CODE_NUMERIC);
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await customRequest.sendRequest(fn(98), COUNTRY_CODE_INVALID_TYPE);
  });
  it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
    await customRequest.sendRequest(fn("010101"), COUNTRY_CODE_NOT_SUPPORTED);
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomStringNumber(countryCodeMinlength - 1)),
      COUNTRY_CODE_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomStringNumber(countryCodeMaxlength + 1)),
      COUNTRY_CODE_MAXLENGTH_REACH
    );
  });
};

module.exports = { countryCodeFailureTests, countryCodeSuccessTests };
