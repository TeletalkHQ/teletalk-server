const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomString } = require("@/functions/utilities/utils");
const { expect } = require("@/functions/utilities/testUtils");

const {
  userModels: { countryNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_NOT_SUPPORTED,
    COUNTRY_NAME_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const countryNameMaxlength = countryNameModel.maxlength.value;
const countryNameMinlength = countryNameModel.minlength.value;

const countryNameSuccessTests = (
  { countryNameMain, countryNameTest } = {},
  { stringEquality, modelCheck } = {}
) => {
  if (stringEquality) {
    expect(countryNameTest.length).equal(countryNameMain.length);
    expect(countryNameMain).equal(countryNameTest);
  }

  if (modelCheck) {
    expect(countryNameTest).to.be.an(countryNameModel.type.value);

    if (countryNameModel.empty.value === false)
      expect(countryNameTest.length).to.be.greaterThan(0);

    expect(countryNameTest.length).greaterThanOrEqual(countryNameMinlength);
    expect(countryNameTest.length).lessThanOrEqual(countryNameMaxlength);
  }
};

const countryNameFailureTests = (data) => {
  const fn = (countryName) => ({ ...data, countryName });

  it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
    await customRequest.sendRequest(fn(""), COUNTRY_NAME_REQUIRED);
  });
  it(`It should get error, COUNTRY_NAME_NOT_SUPPORTED`, async () => {
    await customRequest.sendRequest(
      fn("Something wrong!"),
      COUNTRY_NAME_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_NAME_INVALID_TYPE`, async () => {
    await customRequest.sendRequest(fn(1235468), COUNTRY_NAME_INVALID_TYPE);
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomString(countryNameMinlength - 1)),
      COUNTRY_NAME_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      fn(randomString(countryNameMaxlength + 1)),
      COUNTRY_NAME_MAXLENGTH_REACH
    );
  });
};

module.exports = { countryNameFailureTests, countryNameSuccessTests };
