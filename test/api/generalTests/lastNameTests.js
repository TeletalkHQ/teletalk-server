const { randomMaker } = require("@/classes/RandomMaker");
const { testBuilder } = require("@/classes/TestBuilder");

const {
  userModels: { lastNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: { LAST_NAME_INVALID_TYPE, LAST_NAME_MAXLENGTH_REACH },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const lastNameMaxLength = lastNameModel.maxlength.value;

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

const lastNameFailureTests = (customRequest, data) => {
  const fn = (lastName) => ({ ...data, lastName });
  it("should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomMaker.randomString(lastNameMaxLength + 1)),
      LAST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, LAST_NAME_INVALID_TYPE", async () => {
    await customRequest.sendRequest(fn(123456789), LAST_NAME_INVALID_TYPE);
  });

  // it("should get error, LAST_NAME_MINLENGTH_REACH", async () => {
  //   await myRequest(
  //     userFullName(
  //       randomMaker.randomString(firstNameMaxLength),
  //       randomMaker.randomString(lastNameMinLength - 1)
  //     ),
  //     LAST_NAME_MINLENGTH_REACH
  //   );
  // });
};

module.exports = {
  lastNameFailureTests,
  lastNameSuccessTests,
};
