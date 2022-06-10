const { customRequest } = require("@/classes/CustomRequest");
const { randomMaker } = require("@/classes/RandomMaker");

const {
  userModels: { firstNameModel },
} = require("@/models/userModels/userModels");
const {
  userErrors: {
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
  },
} = require("@/variables/errors/userErrors");
const { testBuilder } = require("@/classes/TestBuilder");

const firstNameMaxLength = firstNameModel.maxlength.value;
const firstNameMinLength = firstNameModel.minlength.value;

const firstNameSuccessTests = (
  { firstNameMain, firstNameTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder
    .setVariables(firstNameModel, firstNameMain, firstNameTest)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .execute();
};

const firstNameFailureTests = (data) => {
  const fn = (firstName) => ({ ...data, firstName });

  it("should get error, FIRST_NAME_REQUIRED", async () => {
    await customRequest.sendRequest(fn(""), FIRST_NAME_REQUIRED);
  });
  it("should get error, FIRST_NAME_MINLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomString(+firstNameMinLength - 1)),
      FIRST_NAME_MINLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_MAXLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomString(+firstNameMaxLength + 1)),
      FIRST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_INVALID_TYPE", async () => {
    await customRequest.sendRequest(fn(123456789), FIRST_NAME_INVALID_TYPE);
  });
};

module.exports = { firstNameFailureTests, firstNameSuccessTests };
