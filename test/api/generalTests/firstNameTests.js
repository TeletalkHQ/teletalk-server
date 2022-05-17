const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomString } = require("@/functions/utilities/utils");
const { expect } = require("@/functions/utilities/testUtils");

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

const firstNameMaxLength = firstNameModel.maxlength.value;
const firstNameMinLength = firstNameModel.minlength.value;

const firstNameSuccessTests = (
  { firstNameMain, firstNameTest } = {},
  { stringEquality, modelCheck } = {}
) => {
  if (stringEquality) {
    expect(firstNameTest.length).equal(firstNameMain.length);
    expect(firstNameMain).equal(firstNameTest);
  }

  if (modelCheck) {
    expect(firstNameTest).to.be.an(firstNameModel.type.value);

    if (firstNameModel.empty.value === false) {
      expect(firstNameTest.length).to.be.greaterThan(0);

      expect(firstNameTest.length).greaterThanOrEqual(firstNameMinLength);
      expect(firstNameTest.length).lessThanOrEqual(firstNameMaxLength);
    }
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
