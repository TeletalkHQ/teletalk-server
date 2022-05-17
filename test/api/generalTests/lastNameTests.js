const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomString } = require("@/functions/utilities/utils");
const { expect } = require("@/functions/utilities/testUtils");

const {
  userModels: { lastNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: { LAST_NAME_INVALID_TYPE, LAST_NAME_MAXLENGTH_REACH },
} = require("@/variables/errors/userErrors");

const lastNameMaxLength = lastNameModel.maxlength.value;

const lastNameSuccessTests = (
  { lastNameMain, lastNameTest } = {},
  { stringEquality, modelCheck } = {}
) => {
  if (stringEquality) {
    expect(lastNameTest.length).equal(lastNameMain.length);
    expect(lastNameMain).equal(lastNameTest);
  }

  if (modelCheck) {
    expect(lastNameTest).to.be.an(lastNameModel.type.value);

    if (lastNameModel.empty.value === false) {
      expect(lastNameTest.length).to.be.greaterThan(0);
      expect(lastNameTest.length).lessThanOrEqual(lastNameMaxLength);
    }
  }
};

const lastNameFailureTests = (data) => {
  const fn = (lastName) => ({ ...data, lastName });
  it("should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomString(lastNameMaxLength + 1)),
      LAST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, LAST_NAME_INVALID_TYPE", async () => {
    await customRequest.sendRequest(fn(123456789), LAST_NAME_INVALID_TYPE);
  });

  // it("should get error, LAST_NAME_MINLENGTH_REACH", async () => {
  //   await myRequest(
  //     userFullName(
  //       randomString(firstNameMaxLength),
  //       randomString(lastNameMinLength - 1)
  //     ),
  //     LAST_NAME_MINLENGTH_REACH
  //   );
  // });
};

module.exports = {
  lastNameFailureTests,
  lastNameSuccessTests,
};
