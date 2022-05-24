const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomString } = require("@/functions/utilities/utils");

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
const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

const firstNameMaxLength = firstNameModel.maxlength.value;
const firstNameMinLength = firstNameModel.minlength.value;

const firstNameSuccessTests = (
  { firstNameMain, firstNameTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder.setVariables(firstNameModel, firstNameMain, firstNameTest);

  if (stringEquality) testBuilder.stringEquality().execute(false);

  if (modelCheck) {
    testBuilder.typeCheck().emptyCheck().gteCheck().lteCheck().execute();
  }
};

const firstNameFailureTests = (data) => {
  const fn = (firstName) => ({ ...data, firstName });

  it("should get error, FIRST_NAME_REQUIRED", async () => {
    await customRequest.sendRequest(fn(""), FIRST_NAME_REQUIRED);
  });
  it("should get error, FIRST_NAME_MINLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomString(+firstNameMinLength - 1)),
      FIRST_NAME_MINLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_MAXLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomString(+firstNameMaxLength + 1)),
      FIRST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_INVALID_TYPE", async () => {
    await customRequest.sendRequest(fn(123456789), FIRST_NAME_INVALID_TYPE);
  });
};

module.exports = { firstNameFailureTests, firstNameSuccessTests };
