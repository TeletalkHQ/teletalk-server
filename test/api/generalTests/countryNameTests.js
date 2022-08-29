const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { testBuilder } = require("@/classes/TestBuilder");

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
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const countryNameMaxlength = countryNameModel.maxlength.value;
const countryNameMinlength = countryNameModel.minlength.value;

const countryNameSuccessTests = (
  { countryNameMain, countryNameTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  testBuilder
    .create()
    .setVariables(countryNameModel, countryNameMain, countryNameTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .execute();
};

const countryNameFailureTests = (configuredCustomRequest, data) => {
  const fn = (countryName) => ({ ...data, countryName });

  it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
    await configuredCustomRequest.sendRequest(fn(""), COUNTRY_NAME_REQUIRED);
  });
  it(`It should get error, COUNTRY_NAME_NOT_SUPPORTED`, async () => {
    await configuredCustomRequest.sendRequest(
      fn("Something wrong!"),
      COUNTRY_NAME_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_NAME_INVALID_TYPE`, async () => {
    await configuredCustomRequest.sendRequest(
      fn(1235468),
      COUNTRY_NAME_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await configuredCustomRequest.sendRequest(
      fn(randomMaker.randomString(countryNameMinlength - 1)),
      COUNTRY_NAME_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await configuredCustomRequest.sendRequest(
      fn(randomMaker.randomString(countryNameMaxlength + 1)),
      COUNTRY_NAME_MAXLENGTH_REACH
    );
  });
};

module.exports = { countryNameFailureTests, countryNameSuccessTests };
