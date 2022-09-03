const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { testBuilder } = require("@/classes/TestBuilder");

const {
  userModels: { lastNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    LAST_NAME_INVALID_TYPE,
    LAST_NAME_MAXLENGTH_REACH,
    LAST_NAME_MINLENGTH_REACH,
  },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const lastNameMaxLength = lastNameModel.maxlength.value;
const lastNameMinLength = lastNameModel.minlength.value;

const lastNameSuccessTests = (
  { lastNameMain, lastNameTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  const ts = testBuilder
    .create()
    .setVariables(lastNameModel, lastNameMain, lastNameTest)
    .setOptions({ modelCheck, stringEquality });

  ts.stringEquality()
    .typeCheck()
    .emptyCheck()
    .checkAndExecute(lastNameModel.empty.value === false, () => ts.lteCheck())
    .execute();
};

const lastNameFailureTests = (configuredCustomRequest, data) => {
  const fn = (lastName) => ({ ...data, lastName });
  it("should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomString(lastNameMaxLength + 1)),
      LAST_NAME_MAXLENGTH_REACH
    );
  });

  if (lastNameMinLength > 1) {
    it("should get error, LAST_NAME_MINLENGTH_REACH", async () => {
      await configuredCustomRequest.sendFullFeaturedRequest(
        fn(randomMaker.randomString(lastNameMinLength - 1)),
        LAST_NAME_MINLENGTH_REACH
      );
    });
  }

  it("should get error, LAST_NAME_INVALID_TYPE", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      fn(randomMaker.randomNumber(lastNameMaxLength)),
      LAST_NAME_INVALID_TYPE
    );
  });
};

module.exports = {
  lastNameFailureTests,
  lastNameSuccessTests,
};
